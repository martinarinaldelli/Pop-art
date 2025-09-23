document.addEventListener('DOMContentLoaded', function () {

    // Art Carousel
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
    dot.addEventListener('click', () => {
        // quitar clase active de todos
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // agregar active al slide y dot correspondiente
        const index = parseInt(dot.dataset.slide);
        slides[index].classList.add('active');
        dot.classList.add('active');
    });
    });


    // Product Carousel
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
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            // when window width is >= 1440px
            1440: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        }
    });

    // Obras Carousel
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

    // Index Carousel
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

    // Advertising Carousel
    const advertisingSwiper = new Swiper('.advertising-swiper', {
        loop: true,
        navigation: {
            nextEl: '.advertising-carousel-container .swiper-button-next',
            prevEl: '.advertising-carousel-container .swiper-button-prev',
        },
    });

    // Palettes Carousel
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

    // Artists Carousel
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

// Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Generic Modal Gallery Setup
    function setupModal(gallerySelector) {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;

        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const galleryItems = document.querySelectorAll(gallerySelector);
        const closeButton = document.querySelector('.close-button');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');

        if (galleryItems.length === 0) return;

        let currentItemIndex = 0;

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentItemIndex = index;
                updateModalContent();
                modal.style.display = 'flex';
            });
        });

        function updateModalContent() {
            const item = galleryItems[currentItemIndex];
            const imageSrc = item.querySelector('img').src;
            const title = item.dataset.title;
            const description = item.dataset.description;

            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        function showPrevItem() {
            currentItemIndex = (currentItemIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModalContent();
        }

        function showNextItem() {
            currentItemIndex = (currentItemIndex + 1) % galleryItems.length;
            updateModalContent();
        }

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        prevButton.addEventListener('click', showPrevItem);
        nextButton.addEventListener('click', showNextItem);

        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    showPrevItem();
                } else if (e.key === 'ArrowRight') {
                    showNextItem();
                } else if (e.key === 'Escape') {
                    closeModal();
                }
            }
        });
    }

    setupModal('.gallery-item');
    setupModal('.balloon');
});

function openArtist(evt, artistName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Deactivate all tab links
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content and activate the tab link
    document.getElementById(artistName).classList.add("active");
    evt.currentTarget.classList.add("active");

    // Refresh AOS
    AOS.refresh();
}

// Get the element with id="defaultOpen" and click on it
if (document.querySelector('.tab-link')) {
    document.querySelector('.tab-link').click();
}
