document.addEventListener('DOMContentLoaded', function () { // код выполняется после загрузки DOM

    const navBtn = document.querySelector('.nav__toggle'); // находим кнопку
    const nav = document.querySelector('.nav');
    const menuIcon = document.querySelector('.menu-icon');
    const logo = document.querySelector('.logo--header img');

    // проверяем, что navBtn существует
    if (navBtn) {
        navBtn.onclick = function () {
            nav.classList.toggle('nav--mobile'); // разворачивание/сворачивание подложки при клике на крестик бургера, доб./удал класс nav--mobile
            menuIcon.classList.toggle('menu-icon-active'); // анимация кнопки, доб. menuIcon класс active
            document.body.classList.toggle('no-scroll'); // убираем скролл на подложке

            // замена изображения (логотип на подложке в бургер-меню)
            if (nav.classList.contains('nav--mobile')) { // изменяем логотип в зависимости от состояния меню
                logo.src = './img/main/logo-footer.png';
            } else {
                logo.src = './img/main/logo-header.png';
            }
        };
    } else {
        console.error('Элемент с классом `.nav__toggle` не был найден');
    }

});