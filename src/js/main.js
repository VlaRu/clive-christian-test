import { renderFragranceItems } from './fragranceItems.js';
import { initTouchSwiper } from './swiper.js';

document.addEventListener('DOMContentLoaded', async () => {
    await renderFragranceItems();
    function initApp() {
        initTouchSwiper();
    }
    initApp();
});
