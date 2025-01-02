import React from 'react';
import RateCard from './RateCard';
import lampRate from '../../../assets/images/main/lamp-rate.png';
import goalRate from '../../../assets/images/main/goal-rate.png';
import laptopRate from '../../../assets/images/main/laptop-rate.png';

const Rate = ({ isLoggedIn, userRate }) => {
    return (
        <section className="rate" id="rate">
            <div className="container">
              <h2 className="container__title rate__title paragraph-45">НАШИ ТАРИФЫ</h2>
                <div className="rate__row">

                    <RateCard
                        title="Beginner"
                        description="Для небольшого исследования"
                        image={lampRate}
                        isActive={userRate === 'beginner'}
                        isLoggedIn={isLoggedIn}
                        price="799 ₽"
                        outdatedPrice="1 200 ₽"
                        priceParagraph="или 150 ₽/мес. при рассрочке на 24 мес."
                        traits={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}
                     />

                    <RateCard
                        title="Pro"
                        description="Для HR и фрилансеров"
                        image={goalRate}
                        isActive={userRate === 'pro'}
                        isLoggedIn={isLoggedIn}
                        price="1 229 ₽"
                        outdatedPrice="2 600 ₽"
                        priceParagraph="или 279 ₽/мес. при рассрочке на 24 мес."
                        traits={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
                    />

                   <RateCard
                        title="Business"
                        description="Для корпоративных клиентов"
                        image={laptopRate}
                        isActive={userRate === 'business'}
                        isLoggedIn={isLoggedIn}
                        price="2 379 ₽"
                        outdatedPrice="3 700 ₽"
                        priceParagraph=""
                        traits={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
                   />

                </div>
            </div>
        </section>
    );
};

export default Rate;