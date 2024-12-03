document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel__track');
    const prevButton = document.querySelector('.carousel__btn--prev');
    const nextButton = document.querySelector('.carousel__btn--next');
    const images = track.querySelectorAll('.carousel__img');
    
    let currentIndex = 0;
    const imagesPerView = 3; // Número de imágenes visibles a la vez
    
    // Clonar las primeras imágenes y agregarlas al final para un scroll infinito
    images.forEach(img => {
        const clone = img.cloneNode(true);
        track.appendChild(clone);
    });

    function updateCarousel() {
        const imageWidth = images[0].offsetWidth;
        const gap = 20; // El mismo valor que definimos en CSS
        const offset = -currentIndex * (imageWidth + gap);
        track.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= images.length) {
            // Cuando llegamos al final, volvemos al inicio suavemente
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                updateCarousel();
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500);
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
            track.style.transition = 'none';
            updateCarousel();
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                currentIndex--;
                updateCarousel();
            }, 50);
        }
        updateCarousel();
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Autoplay opcional
    setInterval(nextSlide, 5000);
});