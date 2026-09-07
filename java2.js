// Variables globales
let isPlaying = false;
let player = null;
let playerReady = false;
const totalSlides = 10;
let enableMusic = false;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeModal();       // Se inicializa de inmediato para que los botones respondan sin demora
    initializeCountdown();
    initializeCarousel();
    initializeParallax();
    loadYouTubeAPI();
});

// Modal de bienvenida (Entrar con o sin música)
function initializeModal() {
    const enterWithMusic = document.getElementById('enterWithMusic');
    const enterWithoutMusic = document.getElementById('enterWithoutMusic');
    const modal = document.getElementById('welcomeModal');
    const musicPlayer = document.getElementById('musicPlayer');

    if (!modal || !enterWithMusic || !enterWithoutMusic) return;

    enterWithMusic.addEventListener('click', function() {
        enableMusic = true;
        modal.style.display = 'none';
        if (musicPlayer) musicPlayer.style.display = 'block';

        if (playerReady && player && typeof player.playVideo === 'function') {
            player.playVideo();
            isPlaying = true;
            updateMusicIcon();
        }
    });

    enterWithoutMusic.addEventListener('click', function() {
        enableMusic = false;
        modal.style.display = 'none';
    });
}

// Cargar la API de YouTube
function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
        initializeYouTubePlayer();
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
    window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
}

// Inicializar reproductor
function initializeYouTubePlayer() {
    player = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: 'jwP1HRmDVII',
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playlist: 'jwP1HRmDVII'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    playerReady = true;
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    if (enableMusic && !isPlaying) {
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer) musicPlayer.style.display = 'block';
        event.target.playVideo();
        isPlaying = true;
        updateMusicIcon();
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
    }
    updateMusicIcon();
}

function onPlayerError(event) {
    console.warn('Audio no disponible o bloqueado.');
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) musicPlayer.style.display = 'block';
    isPlaying = false;
    updateMusicIcon();
}

function toggleMusic() {
    if (player && typeof player.playVideo === 'function') {
        if (isPlaying) {
            player.pauseVideo();
            isPlaying = false;
        } else {
            player.playVideo();
            isPlaying = true;
        }
        updateMusicIcon();
    }
}

function updateMusicIcon() {
    const volumeIcon = document.getElementById('volumeIcon');
    if (!volumeIcon) return;
    
    if (isPlaying) {
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#ffffff" stroke="#ffffff"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#ffffff" stroke-width="2" fill="none"></path>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.08" stroke="#ffffff" stroke-width="2" fill="none"></path>
        `;
    } else {
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#ffffff" stroke="#ffffff"></polygon>
            <line x1="23" y1="9" x2="17" y2="15" stroke="#ffffff" stroke-width="2"></line>
            <line x1="17" y1="9" x2="23" y2="15" stroke="#ffffff" stroke-width="2"></line>
        `;
    }
}

// Cuenta regresiva ajustada para la fecha de los XV (15 de Junio 2026)
function initializeCountdown() {
    const targetDate = new Date('2026-06-15T21:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Carrusel
let carouselIndex = 1;
let carouselTransitioning = false;

function initializeCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalSlidesElement = document.getElementById('totalSlides');

    if (!track || !prevBtn || !nextBtn || !totalSlidesElement) return;

    totalSlidesElement.textContent = totalSlides;

    track.style.transition = 'none';
    track.style.transform = `translateX(${-carouselIndex * 100}%)`;
    updateSlideCounter();

    track.addEventListener('transitionend', () => {
        if (carouselIndex === totalSlides + 1) {
            carouselIndex = 1;
            track.style.transition = 'none';
            track.style.transform = `translateX(${-carouselIndex * 100}%)`;
            void track.offsetWidth;
        } else if (carouselIndex === 0) {
            carouselIndex = totalSlides;
            track.style.transition = 'none';
            track.style.transform = `translateX(${-carouselIndex * 100}%)`;
            void track.offsetWidth;
        }
        carouselTransitioning = false;
    });

    prevBtn.addEventListener('click', () => {
        if (carouselTransitioning) return;
        carouselTransitioning = true;
        carouselIndex--;
        goToCarouselSlide();
    });

    nextBtn.addEventListener('click', () => {
        if (carouselTransitioning) return;
        carouselTransitioning = true;
        carouselIndex++;
        goToCarouselSlide();
    });

    setInterval(() => {
        if (carouselTransitioning) return;
        carouselTransitioning = true;
        carouselIndex++;
        goToCarouselSlide();
    }, 3000);
}

function goToCarouselSlide() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${-carouselIndex * 100}%)`;
    updateSlideCounter();
}

function updateSlideCounter() {
    const currentSlideElement = document.getElementById('currentSlide');
    if (!currentSlideElement) return;
    let display = carouselIndex;
    if (display === 0) display = totalSlides;
    else if (display === totalSlides + 1) display = 1;
    currentSlideElement.textContent = display;
}

// Efecto parallax en la foto principal
function initializeParallax() {
    const heroLeft = document.querySelector('.hero-left');
    const heroLayer = document.querySelector('.hero-left .hero-left-bg');
    if (!heroLeft || !heroLayer) return;

    let lastScrollY = window.scrollY || window.pageYOffset;
    let ticking = false;

    const render = () => {
        const BUFFER_PX = 60;
        let translateY = lastScrollY * 0.4;
        translateY = Math.max(0, Math.min(BUFFER_PX, translateY));
        heroLayer.style.transform = `translate3d(0, ${Math.round(translateY)}px, 0)`;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY || window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(render);
            ticking = true;
        }
    }, { passive: true });
}

// Funciones de botones auxiliares
function showDressCode() {
    showToast("Dress Code", "Elegante / De Gala. ¡Prepárate para una noche mágica! 👗✨");
}

function sharePhotos() {
    window.open('https://photos.app.goo.gl/', '_blank');
}

function openGiftLink() {
    window.open('https://invitacionesdigital-04.github.io/Numerodecuenta/', '_blank');
}

function confirmAttendance() {
    window.open('https://docs.google.com/forms/', '_blank');
}

function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastContent = document.getElementById('toastContent');
    if (!toast || !toastContent) return;
    
    toastContent.innerHTML = `
        <h4 style="font-weight: 600; color: #433258; margin-bottom: 0.5rem; font-family: 'Cinzel', serif;">${title}</h4>
        <p style="color: #6E5F80; font-size: 0.85rem;">${message}</p>
    `;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
