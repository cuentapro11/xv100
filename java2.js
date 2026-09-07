// Variables globales
let isPlaying = false;
let player = null;
let playerReady = false;
const totalSlides = 10;
let enableMusic = false;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeCarousel();
    initializeModal();
    initializeParallax();
    initializeGuestGreeting();
    loadYouTubeAPI(); // Se precarga desde el inicio (no en el click) para que
                       // playVideo() pueda ejecutarse de forma síncrona dentro
                       // del gesto del usuario. Esto es lo que exige iOS Safari.
});

// Sección de saludo personalizado por invitado/familia, leída desde la URL.
// Formatos soportados:
//   ?invitados=Juan Arias,Yerianny Arias,Valery Arias
//   ?familia=Arias
// Muestra un badge con el total, título "Invitados", el número de
// acompañantes (si aplica) y cada nombre como fila con colores intercalados
// de la paleta del sitio (marrón / dorado), ciclando si hay más de 4 nombres.
function initializeGuestGreeting() {
    const params = new URLSearchParams(window.location.search);
    const invitadosParam = params.get('invitados');
    const familiaParam = params.get('familia');

    const section = document.getElementById('guestSection');
    const badge = document.getElementById('guestBadge');
    const subtitle = document.getElementById('guestSubtitle');
    const greeting = document.getElementById('guestGreeting');
    if (!section || !badge || !subtitle || !greeting) return;

    let names = [];

    if (invitadosParam) {
        names = invitadosParam.split(',').map(n => decodeURIComponent(n.trim())).filter(Boolean);
    } else if (familiaParam) {
        names = [`Familia ${familiaParam.trim()}`];
    }

    if (names.length === 0) return;

    // Badge con el total de invitados
    badge.textContent = names.length;

    // Subtítulo de acompañantes
    const companions = invitadosParam ? names.length - 1 : 0;

    if (companions > 0) {
        subtitle.textContent = `(${companions} acompañante${companions > 1 ? 's' : ''})`;
        subtitle.style.display = 'block';
    } else {
        subtitle.style.display = 'none';
    }

    // Limpiar contenido previo
    greeting.innerHTML = '';

    names.forEach((name, index) => {
        const nameSpan = document.createElement('span');
        const colorIndex = (index % 4) + 1;

        nameSpan.className = `guest-name color-${colorIndex}`;
        nameSpan.textContent = name;

        greeting.appendChild(nameSpan);
    });

    section.style.display = 'block';
}


// Modal de bienvenida
function initializeModal() {
    const enterWithMusic = document.getElementById('enterWithMusic');
    const enterWithoutMusic = document.getElementById('enterWithoutMusic');
    const modal = document.getElementById('welcomeModal');

    enterWithMusic.addEventListener('click', function() {
        enableMusic = true;

        modal.style.display = 'none';

        document.getElementById('musicPlayer').style.display = 'block';

        // El player ya existe porque se precargó en DOMContentLoaded.
        // playVideo() se llama dentro del mismo gesto del usuario.
        if (playerReady && player) {
            player.playVideo();
            isPlaying = true;
            updateMusicIcon();
        }

        // Si el player todavía no está listo por conexión lenta,
        // onPlayerReady se encargará de reproducirlo.
    });

    enterWithoutMusic.addEventListener('click', function() {
        enableMusic = false;
        modal.style.display = 'none';
    });
}


// Cargar la API de YouTube
function loadYouTubeAPI() {
    const script = document.createElement('script');

    script.src = 'https://www.youtube.com/iframe_api';

    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
}


// Inicializar reproductor de YouTube
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


// Cuando YouTube está listo
function onPlayerReady(event) {
    playerReady = true;

    const musicToggle = document.getElementById('musicToggle');

    musicToggle.addEventListener('click', toggleMusic);

    // Si el usuario ya seleccionó "Ingresar con música"
    // antes de que YouTube terminara de cargar.
    if (enableMusic && !isPlaying) {
        document.getElementById('musicPlayer').style.display = 'block';

        event.target.playVideo();

        isPlaying = true;

        updateMusicIcon();
    }
}


// Cambios de estado del reproductor
function onPlayerStateChange(event) {

    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;

    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
    }

    updateMusicIcon();
}


// Error de YouTube
function onPlayerError(event) {
    console.log('Error al cargar el video de YouTube');

    const musicPlayer = document.getElementById('musicPlayer');

    musicPlayer.style.display = 'block';

    isPlaying = false;

    updateMusicIcon();
}


// Reproducir / pausar música
function toggleMusic() {

    if (player) {

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


// Actualizar icono de música
function updateMusicIcon() {
    const volumeIcon = document.getElementById('volumeIcon');

    if (isPlaying) {

        volumeIcon.innerHTML = `
            <polygon
                points="11 5 6 9 2 9 2 15 6 15 11 19 11 5">
            </polygon>

            <path
                d="M19.07 4.93a10 10 0 0 1 0 14.14
                   M15.54 8.46a5 5 0 0 1 0 7.08">
            </path>
        `;

    } else {

        volumeIcon.innerHTML = `
            <polygon
                points="11 5 6 9 2 9 2 15 6 15 11 19 11 5">
            </polygon>

            <line
                x1="23"
                y1="9"
                x2="17"
                y2="15">
            </line>

            <line
                x1="17"
                y1="9"
                x2="23"
                y2="15">
            </line>
        `;
    }
}


// ======================================================
// CONTADOR REGRESIVO
// ======================================================

function initializeCountdown() {

    const targetDate =
        new Date('2026-11-28T17:00:00').getTime();

    function updateCountdown() {

        const now = new Date().getTime();

        const difference = targetDate - now;

        if (difference > 0) {

            const days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24))
                / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (difference % (1000 * 60 * 60))
                / (1000 * 60)
            );

            const seconds = Math.floor(
                (difference % (1000 * 60))
                / 1000
            );

            document.getElementById('days').textContent =
                days.toString().padStart(2, '0');

            document.getElementById('hours').textContent =
                hours.toString().padStart(2, '0');

            document.getElementById('minutes').textContent =
                minutes.toString().padStart(2, '0');

            document.getElementById('seconds').textContent =
                seconds.toString().padStart(2, '0');

        } else {

            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}


// ======================================================
// CARRUSEL
// ======================================================

let carouselIndex = 1;
let carouselTransitioning = false;


function initializeCarousel() {

    const track =
        document.getElementById('carouselTrack');

    const prevBtn =
        document.getElementById('prevBtn');

    const nextBtn =
        document.getElementById('nextBtn');

    const totalSlidesElement =
        document.getElementById('totalSlides');


    totalSlidesElement.textContent = totalSlides;


    // Posición inicial sin animación
    track.style.transition = 'none';

    track.style.transform =
        `translateX(${-carouselIndex * 100}%)`;

    updateSlideCounter();


    // Detectar cuando termina la transición
    track.addEventListener('transitionend', () => {

        if (carouselIndex === totalSlides + 1) {

            // Llegó al clon de la primera foto
            carouselIndex = 1;

            track.style.transition = 'none';

            track.style.transform =
                `translateX(${-carouselIndex * 100}%)`;

            void track.offsetWidth;

        } else if (carouselIndex === 0) {

            // Llegó al clon de la última foto
            carouselIndex = totalSlides;

            track.style.transition = 'none';

            track.style.transform =
                `translateX(${-carouselIndex * 100}%)`;

            void track.offsetWidth;
        }

        carouselTransitioning = false;
    });


    // Botón anterior
    prevBtn.addEventListener('click', () => {

        if (carouselTransitioning) return;

        carouselTransitioning = true;

        carouselIndex--;

        goToCarouselSlide();
    });


    // Botón siguiente
    nextBtn.addEventListener('click', () => {

        if (carouselTransitioning) return;

        carouselTransitioning = true;

        carouselIndex++;

        goToCarouselSlide();
    });


    // Auto-play
    setInterval(() => {

        if (carouselTransitioning) return;

        carouselTransitioning = true;

        carouselIndex++;

        goToCarouselSlide();

    }, 2500);
}


// Ir a una diapositiva
function goToCarouselSlide() {

    const track =
        document.getElementById('carouselTrack');

    track.style.transition =
        'transform 0.5s ease-in-out';

    track.style.transform =
        `translateX(${-carouselIndex * 100}%)`;

    updateSlideCounter();
}


// Actualizar contador del carrusel
function updateSlideCounter() {

    const currentSlideElement =
        document.getElementById('currentSlide');

    let display = carouselIndex;

    if (display === 0) {
        display = totalSlides;

    } else if (display === totalSlides + 1) {
        display = 1;
    }

    currentSlideElement.textContent = display;
}


// ======================================================
// PARALLAX DE LA PORTADA
// ======================================================

function initializeParallax() {

    const heroLeft =
        document.querySelector('.hero-left');

    const heroLayer =
        document.querySelector('.hero-left .hero-left-bg');


    if (!heroLeft || !heroLayer) return;


    const prefersReducedMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );


    let lastScrollY =
        window.scrollY || window.pageYOffset;

    let ticking = false;


    const computeSpeed = () =>
        (window.innerWidth <= 768 ? 0.65 : 0.5);


    const render = () => {

        if (prefersReducedMotion.matches) {

            heroLayer.style.transform =
                'translate3d(0,0,0)';

        } else {

            const speed = computeSpeed();

            // Límite de desplazamiento
            const BUFFER_PX = 60;

            let translateY =
                lastScrollY * speed;

            translateY =
                Math.max(
                    0,
                    Math.min(
                        BUFFER_PX,
                        translateY
                    )
                );


            heroLayer.style.transform =
                `translate3d(0, ${Math.round(translateY)}px, 0)`;
        }

        ticking = false;
    };


    const onScroll = () => {

        lastScrollY =
            window.scrollY || window.pageYOffset;

        if (!ticking) {

            window.requestAnimationFrame(render);

            ticking = true;
        }
    };


    render();

    window.addEventListener(
        'scroll',
        onScroll,
        { passive: true }
    );

    window.addEventListener(
        'resize',
        render
    );
}


// ======================================================
// FUNCIONES DE LOS BOTONES
// ======================================================


// Código de vestimenta
function showDressCode() {

    showToast(
        "Código de Vestimenta",
        "Formal. Nota: por favor no asistir con los siguientes colores: vino tinto, malva, beige y blanco 👗"
    );
}


// Compartir / subir fotos
function sharePhotos() {

    window.open(
        'https://photos.app.goo.gl/5gzRABHjuNhGsoVP8',
        '_blank'
    );
}


// Regalos
function openGiftLink() {

    window.open(
        'https://invitacionesdigital-04.github.io/Numerodecuenta/',
        '_blank'
    );
}


// Confirmación de asistencia
function confirmAttendance() {

    window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLScE--FHaXBwnoUl_yjudMz-rZywKmJ2TRczQNtEuV9yKi-CcQ/viewform?usp=header',
        '_blank'
    );
}


// ======================================================
// SISTEMA DE TOAST
// ======================================================

function showToast(title, message) {

    const toast =
        document.getElementById('toast');

    const toastContent =
        document.getElementById('toastContent');


    toastContent.innerHTML = `
        <h4
            style="
                font-weight: 600;
                color: hsl(var(--brown));
                margin-bottom: 0.5rem;
            "
        >
            ${title}
        </h4>

        <p
            style="
                color: hsl(var(--foreground) / 0.7);
            "
        >
            ${message}
        </p>
    `;


    toast.classList.add('show');


    setTimeout(() => {

        toast.classList.remove('show');

    }, 4000);
}
