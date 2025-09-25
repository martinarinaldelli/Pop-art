document.addEventListener('DOMContentLoaded', function () {
    AOS.init();

    // Index Page - Art Carousel (Manual Slider)
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
    dot.addEventListener('click', () => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        const index = parseInt(dot.dataset.slide);
        slides[index].classList.add('active');
        dot.classList.add('active');
    });
    });

    // Product Carousel (Swiper)
    const productSwiper = new Swiper('.product-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.product-carousel .swiper-button-next',
            prevEl: '.product-carousel .swiper-button-prev',
        },
        pagination: {
            el: '.product-carousel .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        }
    });

    // Obras Page - Obras Carousel (Swiper)
    const obrasSwiper = new Swiper('.obras-swiper', {
        loop: true,
        slidesPerView: 1,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            nextEl: null,
            prevEl: null,
        },
        pagination: {
            el: '.obras-carousel .swiper-pagination',
            clickable: true,
        },
    });

    // Index Page - Index Carousel (Swiper) - This seems redundant with the manual slider, might need review
    const indexSwiper = new Swiper('.index-swiper', {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: null,
            prevEl: null,
        },
        pagination: {
            el: '.index-carousel .swiper-pagination',
            clickable: true,
        },
    });

    // Advertising Carousel (Swiper)
    const advertisingSwiper = new Swiper('.advertising-swiper', {
        loop: true,
        navigation: {
            nextEl: '.advertising-carousel-container .swiper-button-next',
            prevEl: '.advertising-carousel-container .swiper-button-prev',
        },
    });

    // Palettes Carousel (Swiper)
    const palettesSwiper = new Swiper('.palettes-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.palettes-section .swiper-button-next',
            prevEl: '.palettes-section .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    // Artists Carousel (Swiper)
    const artistsSwiper = new Swiper('.artists-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.artists-swiper .swiper-pagination',
        },
    });

    // Origenes Carousel (Swiper)
    const origenesSwiper = new Swiper('.origenes-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // Global - Interactive Nav-bar hover effect
    const navContainer = document.querySelector('.main-nav .nav-links');
    const navButtons = document.querySelectorAll('.main-nav .nav-button');

    const buttonImageMap = {
      'historia.html': 'img/lata-rosa.png',
      'obras.html': 'img/lata-amarillo.png',
      'repercusion.html': 'img/lata-celeste.png',
      'experiencia-visual.html': 'img/lata-rojo.png',
      'actualidad.html': 'img/lata-violeta.png',
      'contacto.html': 'img/lata-naranja.png'
    };

    if (navContainer && navButtons.length > 0) {
        navContainer.addEventListener('mouseenter', () => {
            navButtons.forEach(button => {
                const href = button.getAttribute('href');
                const imageUrl = buttonImageMap[href];

                if (imageUrl) {
                    button.style.backgroundImage = `url('${imageUrl}')`;
                    button.style.color = 'transparent';
                }
            });
        });

        navContainer.addEventListener('mouseleave', () => {
            navButtons.forEach(button => {
                button.style.backgroundImage = '';
                button.style.color = '';
            });
        });
    }

    // Global - Page-specific custom cursor
    const pageClassMap = {
      'historia.html': 'cursor-historia',
      'obras.html': 'cursor-obras',
      'repercusion.html': 'cursor-repercusion',
      'experiencia-visual.html': 'cursor-experiencia',
      'actualidad.html': 'cursor-actualidad',
      'contacto.html': 'cursor-contacto',
      'index.html': 'cursor-default'
    };
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const cursorClass = pageClassMap[page] || 'cursor-default';
    document.body.classList.add(cursorClass);

    // Global - Pop Art Accordion Cards (used in multiple pages?)
    const popCards = document.querySelectorAll('.pop-card');
    const swiperInstances = new Map();

    popCards.forEach(card => {
        const header = card.querySelector('.pop-card-header');
        const content = card.querySelector('.pop-card-content');
        const swiperEl = content.querySelector('.pop-card-swiper');

        header.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');

            popCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('open');
                }
            });

            card.classList.toggle('open');

            if (card.classList.contains('open') && swiperEl && !swiperInstances.has(swiperEl)) {
                const swiper = new Swiper(swiperEl, {
                    loop: true,
                    autoplay: {
                        delay: 3000,
                    },
                    effect: 'fade',
                });
                swiperInstances.set(swiperEl, swiper);
            } else if (swiperEl && swiperInstances.has(swiperEl)) {
                const swiper = swiperInstances.get(swiperEl);
                swiper.update();
                if (card.classList.contains('open')) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            }
        });
    });

    // Global - Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Obras Page - Asymmetric Gallery Modal
    if (document.querySelector('.asymmetric-gallery')) {
        const modal = document.getElementById('rectangular-gallery-modal');
        if (modal) {
            const galleryItems = document.querySelectorAll('.asymmetric-gallery .gallery-item');
            const closeButton = modal.querySelector('.close-button');
            const prevButton = modal.querySelector('.prev-button');
            const nextButton = modal.querySelector('.next-button');
            const modalImage = document.getElementById('rectangular-modal-image');
            const modalTitle = document.getElementById('rectangular-modal-title');
            const modalDescription = document.getElementById('rectangular-modal-description');
            let currentIndex = 0;

            const slidesData = Array.from(galleryItems).map(item => ({
                src: item.querySelector('img').src,
                title: item.dataset.title,
                description: item.dataset.description
            }));

            const openModal = (index) => {
                currentIndex = index;
                updateModalContent();
                modal.style.display = 'flex';
            };

            const closeModal = () => {
                modal.style.display = 'none';
            };

            const updateModalContent = () => {
                const slide = slidesData[currentIndex];
                modalImage.src = slide.src;
                modalTitle.textContent = slide.title;
                modalDescription.textContent = slide.description;
            };

            const showNext = () => {
                currentIndex = (currentIndex + 1) % slidesData.length;
                updateModalContent();
            };

            const showPrev = () => {
                currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
                updateModalContent();
            };

            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => openModal(index));
            });

            closeButton.addEventListener('click', closeModal);
            nextButton.addEventListener('click', showNext);
            prevButton.addEventListener('click', showPrev);

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'flex') {
                    if (e.key === 'Escape') {
                        closeModal();
                    } else if (e.key === 'ArrowRight') {
                        showNext();
                    } else if (e.key === 'ArrowLeft') {
                        showPrev();
                    }
                }
            });
        }
    }

    
});

// Global - Tab functionality (used in multiple pages?)
function openArtist(evt, artistName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(artistName).classList.add("active");
    evt.currentTarget.classList.add("active");

    AOS.refresh();
}

// Global - Click default tab on load (used in multiple pages?)
if (document.querySelector('.tab-link')) {
    document.querySelector('.tab-link').click();
}
