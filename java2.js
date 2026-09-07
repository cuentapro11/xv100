<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Florencia - Mis XV Años</title>
    
    <!-- Tipografías Cinzel y Montserrat -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="image" href="foto0.jpeg" imagesizes="100vw">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="ccs-2.css?v=force-2026-xv">
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
</head>
<body>
    <!-- Modal de Bienvenida -->
    <div id="welcomeModal" class="modal-overlay">
        <div class="modal-content welcome-hero">
            <div class="welcome-date">15·06·2026</div>
            <h1 class="welcome-heading">Bienvenidos a la celebración de<br class="welcome-break" />
                <span class="names">Florencia</span>
            </h1>
            <p class="welcome-subtitle">Mis XV Años · La música de fondo es parte de la experiencia</p>
            <div class="modal-buttons">
                <button id="enterWithMusic" class="btn-wedding">Ingresar con música</button>
                <button id="enterWithoutMusic" class="btn-wedding btn-secondary">Ingresar sin música</button>
            </div>
        </div>
    </div>

    <!-- Reproductor de música -->
    <div id="musicPlayer" class="music-player" style="display: none;">
        <button id="musicToggle" class="music-button animated-volume" title="Reproducir/Pausar música">
            <svg id="volumeIcon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <defs>
                    <linearGradient id="volumeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#7B5B96;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#433258;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="url(#volumeGradient)" stroke="url(#volumeGradient)" class="speaker">
                    <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="2s" repeatCount="indefinite"/>
                </polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="url(#volumeGradient)" stroke-width="2" fill="none" opacity="0" class="sound-wave-outer">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s"/>
                </path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.08" stroke="url(#volumeGradient)" stroke-width="2" fill="none" opacity="0" class="sound-wave-inner">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
                </path>
            </svg>
        </button>
        <div id="youtube-player" style="position: absolute; top: -9999px; left: -9999px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"></div>
    </div>
    
    <main>
    <!-- Portada Hero -->
    <div class="hero-wrapper">
        <div class="site-container hero-container">
            <div class="hero-split hero-split--single">
                <div class="hero-left">
                    <div class="hero-left-bg"></div>
                    <div class="hero-overlay"></div>
                    <div class="hero-content-cover">
                        <div class="hero-date-top">15.06.2026</div>
                        <div class="hero-xv-badge">15</div>
                        <h1 class="hero-title-name">Florencia</h1>
                        <p class="hero-sub-xv">Mis XV años</p>
                        <p class="hero-phrase">Te espero para compartir la alegría de esa noche que será para mí mágica, inolvidable y única.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Separador Floral 1 -->
    <div class="floral-divider"></div>

    <!-- Contenido Principal -->
    <div class="page-shell">
        <div class="content">
            <div class="site-container">
                
                <!-- Countdown -->
                <section class="countdown-section section-shadow-seam">
                    <h2 class="section-title">Falta</h2>
                    <div class="countdown-container">
                        <div class="countdown-item">
                            <div class="countdown-number" id="days">00</div>
                            <div class="countdown-label">días</div>
                        </div>
                        <div class="countdown-separator">|</div>
                        <div class="countdown-item">
                            <div class="countdown-number" id="hours">00</div>
                            <div class="countdown-label">hs</div>
                        </div>
                        <div class="countdown-separator">|</div>
                        <div class="countdown-item">
                            <div class="countdown-number" id="minutes">00</div>
                            <div class="countdown-label">min</div>
                        </div>
                        <div class="countdown-separator">|</div>
                        <div class="countdown-item">
                            <div class="countdown-number" id="seconds">00</div>
                            <div class="countdown-label">seg</div>
                        </div>
                    </div>
                    <div class="heart-divider">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#6A4E82">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                </section>

                <div class="floral-divider"></div>

                <!-- Ceremonia (Tarjeta estilo Celebración de la imagen) -->
                <section class="events-section section-shadow-seam">
                    <div class="events-container">
                        <div class="event-card-box">
                            <div class="event-box-icon">
                                <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="#9A7AA0" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5.8 11.3 2 22l10.7-3.79"/>
                                    <path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/>
                                    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.8 0-1.48.57-1.6 1.36-.2 1.37-1.47 2.34-2.82 2.14L11 11"/>
                                    <path d="m22 13-.75 2.24a2.9 2.9 0 0 1-3.12 1.96v0c-.86-.1-1.63.57-1.63 1.45v.38c0 .8-.57 1.48-1.36 1.6-1.37.2-2.34 1.47-2.14 2.82L13 22"/>
                                </svg>
                            </div>
                            
                            <h3 class="box-title">Ceremonia</h3>
                            
                            <div class="event-info-group">
                                <span class="event-info-label">Día</span>
                                <p class="event-info-value">Sábado 28 de Noviembre - 5:00 PM</p>
                                <button class="btn-wedding" onclick="window.open('https://calendar.google.com', '_blank')">Agendar</button>
                            </div>

                            <div class="event-info-group">
                                <span class="event-info-label">Lugar</span>
                                <p class="event-info-value">La Rambla Restaurante y Eventos</p>
                                <button class="btn-wedding" onclick="confirmAttendance()">Confirmar asistencia</button>
                            </div>

                            <div class="event-info-group">
                                <span class="event-info-label">Dirección</span>
                                <p class="event-info-value">C/ Cesar Nicolás Penson, 157, La Esperilla - República Dominicana</p>
                                <button class="btn-wedding" onclick="window.open('https://maps.app.goo.gl/PrQRiexKK29VRMkc6', '_blank')">¿Cómo llegar?</button>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="floral-divider"></div>

                <!-- Recorrido de estos 15 años / Carrusel -->
                <section class="gallery-section section-shadow-seam">
                    <div class="gallery-container">
                        <h2 class="section-title">Un recorrido de estos 15 años</h2>
                        <p class="section-subtitle">Junto a personas que son muy importantes en mi vida</p>
                        
                        <div class="camera-icon-flat">
                            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#9A7AA0" stroke-width="1.2">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                        </div>

                        <!-- Carrusel con tarjetas moradas tipo Polaroid -->
                        <div class="carousel-container">
                            <button class="carousel-btn carousel-prev" id="prevBtn">❮</button>
                            <div class="carousel-track-container">
                                <div class="carousel-track" id="carouselTrack">
                                    <div class="carousel-item" aria-hidden="true">
                                        <div class="polaroid-card"><img src="foto10.jpeg" alt="" loading="lazy"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto1.jpeg" alt="Foto 1"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto2.jpeg" alt="Foto 2"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto3.jpeg" alt="Foto 3"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto4.jpeg" alt="Foto 4"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto5.jpeg" alt="Foto 5"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto6.jpeg" alt="Foto 6"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto7.jpeg" alt="Foto 7"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto8.jpeg" alt="Foto 8"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto9.jpeg" alt="Foto 9"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="polaroid-card"><img src="foto10.jpeg" alt="Foto 10"></div>
                                    </div>
                                    <div class="carousel-item" aria-hidden="true">
                                        <div class="polaroid-card"><img src="foto1.jpeg" alt="" loading="lazy"></div>
                                    </div>
                                </div>
                            </div>
                            <button class="carousel-btn carousel-next" id="nextBtn">❯</button>
                        </div>

                        <div class="carousel-counter">
                            <span id="currentSlide">1</span> / <span id="totalSlides">10</span> fotos
                        </div>
                    </div>
                </section>

                <div class="floral-divider"></div>

                <!-- Fiesta -->
                <section class="party-section section-shadow-seam">
                    <div class="party-container">
                        <h2 class="section-title">Fiesta</h2>
                        <p class="section-subtitle">Hagamos juntos una fiesta épica. Aquí algunos detalles a tener en cuenta.</p>

                        <div class="party-grid">
                            <div class="party-card">
                                <div class="card-outline-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A7AA0" stroke-width="1.3">
                                        <path d="M9 18V5l12-2v13"></path>
                                        <circle cx="6" cy="18" r="3"></circle>
                                        <circle cx="18" cy="16" r="3"></circle>
                                    </svg>
                                </div>
                                <h3 class="party-card-title">Música</h3>
                                <p>¿Cuál es la canción que no debe faltar en la PlayList de la fiesta?</p>
                                <button class="btn-wedding" onclick="showToast('Sugerir Canción', '¡Envíanos tu canción favorita!')">Sugerir canción</button>
                            </div>

                            <div class="party-card">
                                <div class="card-outline-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A7AA0" stroke-width="1.3">
                                        <path d="M4 8l4 4-4 4V8z"></path>
                                        <path d="M20 8l-4 4 4 4V8z"></path>
                                        <circle cx="12" cy="12" r="2"></circle>
                                    </svg>
                                </div>
                                <h3 class="party-card-title">Dress Code</h3>
                                <p>Una orientación para tu vestuario</p>
                                <button class="btn-wedding" onclick="showDressCode()">Ver más</button>
                            </div>

                            <div class="party-card">
                                <div class="card-outline-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A7AA0" stroke-width="1.3">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                        <path d="m9 14 2 2 4-4"></path>
                                    </svg>
                                </div>
                                <h3 class="party-card-title">Tips y Notas</h3>
                                <p>Información adicional para tener en cuenta</p>
                                <button class="btn-wedding" onclick="sharePhotos()">+ Info</button>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="floral-divider"></div>

                <!-- Regalos -->
                <section class="gifts-section section-shadow-seam">
                    <div class="gifts-container">
                        <h2 class="section-title">Regalos</h2>
                        <p class="section-subtitle">Si deseas regalarme algo más que tu hermosa presencia...</p>
                        <div class="card-outline-icon center-icon">
                            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#9A7AA0" stroke-width="1.3">
                                <rect x="3" y="8" width="18" height="13" rx="2"></rect>
                                <path d="M12 8v13"></path>
                                <path d="M19 8a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3"></path>
                                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 4.5-4.5 2.5 2.5 0 0 1 0 5"></path>
                            </svg>
                        </div>
                        <button class="btn-wedding" onclick="openGiftLink()">Datos bancarios</button>
                    </div>
                </section>

                <div class="floral-divider"></div>

                <!-- Confirmación de Asistencia -->
                <section class="rsvp-section section-shadow-seam">
                    <div class="rsvp-container">
                        <h2 class="section-title">Confirma tu asistencia</h2>
                        <p class="section-subtitle">Es importante que confirmes tu asistencia</p>
                        <button class="btn-wedding" onclick="confirmAttendance()">Confirmar asistencia</button>
                    </div>
                </section>

                <div class="floral-divider"></div>

            </div>
        </div>
    </div>
    </main>

    <!-- Toast de alertas -->
    <div id="toast" class="toast">
        <div id="toastContent"></div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <h3>Florencia</h3>
            <p class="footer-date">15 de Junio de 2026</p>
        </div>
    </footer>

    <script src="java2.js?v=force-2026-xv"></script>
</body>
</html>
