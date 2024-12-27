import React from 'react';
// import { useNavigate } from 'react-router-dom';

import womenHeader from '../../../assets/images/main/women-header-2.png';

const MeetUs = ({ isLoggedIn }) => {

    // const navigate = useNavigate();

    const handleRequestDataClick = () => {
//         if (isLoggedIn) {
//             navigate('/search');
//         } else {
//             navigate('/auth');
//         }
    };

    return(
        <section className="meet-us">
            <div className="container">
                <div className="header__row">

                    <div className="header__content">
                        <h1 className="header__title header__title_main-h1 paragraph-60-500">Сервис по поиску публикаций о компании по его ИНН</h1>
                        <div className="header__text">
                            <p className="header__paragraph paragraph-20">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                        </div> <br />

                            {isLoggedIn && <button
                                 className="btn header__text_btn header__text_btn-request paragraph-22"
                                 id="requestDataButton"
                                 onClick={handleRequestDataClick}>
                                 Запросить данные
                                 </button>
                            }
                    </div>

                    <div className="header__img">
                        <img src={womenHeader} alt="СКАН главная страница" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetUs;

