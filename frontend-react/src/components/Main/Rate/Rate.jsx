import React from 'react';

import lampRate from '../../../assets/images/main/lamp-rate.png';
import goalRate from '../../../assets/images/main/goal-rate.png';
import laptopRate from '../../../assets/images/main/laptop-rate.png';

const Rate = () => {
    return (
        <section className="rate">
            <div className="container">
              <h2 className="container__title rate__title paragraph-45">НАШИ ТАРИФЫ</h2>
                <div className="rate__row">

                    {/* BEGINNER */}
                    <div className="rate__card rate__card-beginner">
                        <div className="rate__header rate__header-beginner">
                            <div className="rate__title">
                                <p className="rate__title rate__title-title paragraph-30">Beginner</p>
                                <p className="rate__title rate__title-desc paragraph-18">Для небольшого исследования</p>
                            </div>

                            <div className="rate__img">
                                <img src={lampRate} alt="СКАН ТАРИФ Beginner для небольшого исследования" />
                            </div>
                        </div>

                            <div className="rate__content">
                                <div className="rate__badge">
                                    <p className="rate__badge-paragraph paragraph-14">Текущий тариф</p>
                                </div>

                            <div className="rate__price">
                                <p className="rate__price rate__price-actually paragraph-30">799 ₽<span className="rate__price rate__price-outdated paragraph-25-500">1 200 ₽</span></p>
                                <p className="rate__price-paragraph paragraph-18">или 150 ₽/мес. при рассрочке на 24 мес.</p>
                            </div>

                            <div className="rate__tax">
                                <p className="rate__tax-paragraph paragraph-20-500">В тариф входит:</p>
                                <ul className="rate__list">
                                    <li className="paragraph-18">Безлимитная история запросов</li>
                                    <li className="paragraph-18">Безопасная сделка</li>
                                    <li className="paragraph-18">Безопасная сделка</li>
                                </ul>
                            </div>

                                <a className="btn btn__rate btn__rate-beginner paragraph-20" href="#!">Перейти в личный кабинет</a>
                        </div>
                    </div>

                     {/* PRO */}
                    <div className="rate__card rate__card-pro">

                        <div className="rate__header rate__header-pro">
                            <div className="rate__title rate__title-pro">
                                <p className="rate__title rate__title-title paragraph-30">Pro</p>
                                <p className="rate__title rate__title-desc paragraph-18">Для HR и фрилансеров</p>
                            </div>

                            <div className="rate__img">
                                <img src={goalRate} alt="СКАН ТАРИФ PRO для HR и фрилансеров" />
                            </div>
                        </div>

                            <div className="rate__content">

                            <div className="rate__price">
                                <p className="rate__price rate__price-actually paragraph-30">1 299 ₽<span className="rate__price rate__price-outdated paragraph-25-500">2 600 ₽</span></p>
                                <p className="rate__price-paragraph paragraph-18 ">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                            </div>

                            <div className="rate__tax">
                                <p className="rate__tax-paragraph paragraph-20-500">В тариф входит:</p>
                                <ul className="rate__list">
                                    <li className="paragraph-18">Все пункты тарифа Beginner</li>
                                    <li className="paragraph-18">Экспорт истории</li>
                                    <li className="paragraph-18">Рекомендации по приоритетам</li>
                                </ul>
                            </div>

                                <a className="btn btn__rate btn__rate-md paragraph-20" href="#!">Подробнее</a>

                        </div>
                    </div>

                     {/* Business */}
                    <div className="rate__card rate__card-business">

                        <div className="rate__header rate__header-business">
                            <div className="rate__title">
                                <p className="rate__title rate__title-title paragraph-30">Business</p>
                                <p className="rate__title rate__title-desc paragraph-18">Для корпоративных клиентов</p>
                            </div>

                            <div className="rate__img">
                                <img src={laptopRate} alt="СКАН ТАРИФ Business для корпоративных клиентов" />
                            </div>
                        </div>

                            <div className="rate__content">
                                <div className="rate__price">
                                    <p className="rate__price rate__price-actually paragraph-30">2 379 ₽<span className="rate__price rate__price-outdated paragraph-25-500">3 700 ₽</span></p>
                                </div>

                                <div className="rate__tax rate__tax-business">
                                    <p className="rate__tax-paragraph paragraph-20-500">В тариф входит:</p>
                                    <ul className="rate__list">
                                        <li className="paragraph-18">Все пункты тарифа Pro</li>
                                        <li className="paragraph-18">Безлимитное количество запросов</li>
                                        <li className="paragraph-18">Приоритетная поддержка</li>
                                    </ul>
                                </div>

                                <a className="btn btn__rate btn__rate-md paragraph-20" href="#!">Подробнее</a>

                            </div>
                        </div>
                </div>
            </div>
    </section>
    );
};

export default Rate;