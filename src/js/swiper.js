class TouchSwiper {
    constructor(element) {
        this.element = element;
        this.slides = Array.from(element.children);
        this.currentIndex = 0;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.slidesCount = this.slides.length;

        this.init();
    }

    init() {
        if (window.innerWidth > 360) return;
        this.addEventListeners();
    }

    addEventListeners() {
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.isDragging = true;
        this.element.style.transition = 'none';
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;

        this.currentX = e.touches[0].clientX;
        const diff = this.currentX - this.startX;
        const slideWidth = this.element.offsetWidth;
        const offset = (diff / slideWidth) * 100;
        const newPosition = -this.currentIndex * (100 / this.slidesCount) + offset;

        this.element.style.transform = `translateX(${newPosition}%)`;
    }

    handleTouchEnd() {
        if (!this.isDragging) return;

        const diff = this.currentX - this.startX;
        const slideWidth = this.element.offsetWidth;
        const threshold = slideWidth * 0.2;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && this.currentIndex > 0) {
                this.currentIndex--;
            } else if (diff < 0 && this.currentIndex < this.slidesCount - 1) {
                this.currentIndex++;
            }
        }

        this.slideTo(this.currentIndex);
        this.isDragging = false;
    }

    slideTo(index) {
        this.currentIndex = index;
        this.element.style.transition = 'transform 0.3s ease-out';
        this.element.style.transform = `translateX(-${index * (100 / this.slidesCount)}%)`;
    }
}

export function initTouchSwiper() {
    const gallery = document.querySelector('.fragrance-gallery');
    if (gallery) {
        new TouchSwiper(gallery);
    }
} 