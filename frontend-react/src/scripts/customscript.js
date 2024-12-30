import logoFooter from '../assets/images/main/logo-footer.png';
import logoHeader from '../assets/images/main/logo-header.png';

window.onload = () => { // код выполняется после загрузки DOM

    const navBtn = document.querySelector('.nav__toggle'); // находим кнопку
    const nav = document.querySelector('.nav');
    const menuIcon = document.querySelector('.menu-icon');
    const logo = document.querySelector('.nav__logo_logo-header img');
    const label = document.querySelector('.paragraph-18');
    const select1 = document.getElementById('searchSelect1');
    const select2 = document.getElementById('searchSelect2');

    // проверяем, что navBtn существует
    if (navBtn) {
        navBtn.onclick = function () {
            nav.classList.toggle('nav--mobile'); // разворачивание/сворачивание подложки при клике на крестик бургера, доб./удал класс nav--mobile
            menuIcon.classList.toggle('menu-icon-active'); // анимация кнопки, доб. menuIcon класс active
            document.body.classList.toggle('no-scroll'); // убираем скролл на подложке

            // замена изображения (логотип на подложке в бургер-меню)
            if (nav.classList.contains('nav--mobile')) { // изменяем логотип в зависимости от состояния меню
                logo.src = logoFooter;
            } else {
                logo.src = logoHeader;
            }
        };
    } else {
        console.error('Элемент с классом `.nav__toggle` не был найден');
    }


//    label.addEventListener('click', function() {
//    // Переключаем фокус между селектами
//    if (document.activeElement === select1) {
//        select2.focus();
//    } else {
//        select1.focus();
//    }});

        function scrollTable(direction) {
    const tableRow = document.querySelector('.table__row');
    const scrollAmount = 133; // Ширина одной ячейки
    tableRow.scrollBy({
        left: direction * scrollAmount * 2,
        behavior: 'smooth'
    });
}

    function scrollFactoids(direction) {
    const factoidsRow = document.querySelector('.factoids__content');
    const itemWidth = 400; // Ширина одного элемента карусели
    factoidsRow.scrollBy({
        left: direction * itemWidth,
        behavior: 'smooth'
    });
}

};

