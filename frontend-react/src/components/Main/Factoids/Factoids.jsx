import React, { useRef } from 'react';

import arrowLeft from '../../../assets/images/UI/arrow-left.svg';
import arrowRight from '../../../assets/images/UI/arrow-right.svg';
import clockFacts from '../../../assets/images/main/clock-facts.svg';
import searchFacts from '../../../assets/images/main/search-facts.svg';
import lockFacts from '../../../assets/images/main/lock-facts.svg';
import manFactoids from '../../../assets/images/main/man-factoids.png';

const Factoids = () => {

  const sliderRef = useRef(null);

  // Управление горизонтальной прокруткой элемента таблицы
    const scrollFactoids = (direction) => {
        const rootStyles = getComputedStyle(document.documentElement);
        const scrollAmount = direction === 'left'
            ? -parseInt(rootStyles.getPropertyValue('--scroll-factoids-amount-left'))
            : parseInt(rootStyles.getPropertyValue('--scroll-factoids-amount-right'));

        if (sliderRef.current) {
            sliderRef.current.scrollLeft += scrollAmount; // прокрутка элемента
        }
    };

    return (
         <section className="factoids" id="factoids">
            <div className="container">
              <h2 className="factoids__title paragraph-45">ПОЧЕМУ ИМЕННО МЫ</h2>
                <div className="factoids__column">

                    <button className="slider__btn slider__btn-prev" onClick={() => scrollFactoids('left')}>
                        <img src={arrowLeft} alt="СКАН стрелочка влево" />
                    </button>

                    <div className="factoids__content" ref={sliderRef} style={{ transition: 'transform 0.3s ease' }}>
                        <div className="factoids__item item-1">
                            <img src={clockFacts} alt="СКАН Высокая и оперативная скорость обработки заявки" />
                            <p className="factoids-paragraph paragraph-18">Высокая и оперативная скорость обработки заявки</p>
                        </div>

                        <div className="factoids__item item-2">
                            <img src={searchFacts} alt="СКАН Огромная база данных" />
                            <p className="factoids-paragraph paragraph-18">Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
                        </div>

                        <div className="factoids__item item-3">
                            <img src={lockFacts} alt="СКАН защита конфиденциальных сведений" />
                            <p className="factoids-paragraph paragraph-18">Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
                        </div>
                    </div>

                    <button className="slider__btn slider__btn-next" onClick={() => scrollFactoids('right')}>
                        <img src={arrowRight}  alt="СКАН стрелочка вправо" />
                    </button>

                    <div className="factoids__img">
                        <img src={manFactoids} alt="Почему именно СКАН" />
                    </div>

                </div>
            </div>
    </section>
    );
};

export default Factoids;