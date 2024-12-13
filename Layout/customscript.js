document.addEventListener('DOMContentLoaded', function () {
    const navBtn = document.querySelector('.nav__toggle'); // находим кнопку
    const nav = document.querySelector('.nav');
    const menuIcon = document.querySelector('.menu-icon');

    if (navBtn) { // проверяем, что navBtn существует
        navBtn.onclick = function () {
            nav.classList.toggle('nav--mobile'); // разворачивание/сворачивание подложки при клике на крестик бургера, доб./удал класс nav--mobile
            menuIcon.classList.toggle('menu-icon-active'); // анимация кнопки, доб. menuIcon класс active
            document.body.classList.toggle('no-scroll'); // убираем скролл на подложке
        };
    } else {
        console.error('Element with class .nav__toggle not found');
    }
});