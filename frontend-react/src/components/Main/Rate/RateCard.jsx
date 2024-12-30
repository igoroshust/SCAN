import React from 'react';

const RateCard = ({
    title = '',
    description,
    image,
    activeColorClass, // нужно ли?
    isActive,
    isLoggedIn,
    price,
    outdatedPrice,
    priceParagraph,
    traits = [] // значение по умолчанию, чтобы не было ошибки, связанной с map (undefined elements)

}) => {
    return(
                    <div className={`rate__card rate__card-${title.toLowerCase()}`}>

                        <div className={`rate__header rate__header-${title.toLowerCase()}`}>
                            <div className="rate__title">
                                <p className="rate__title rate__title-title paragraph-30">{title}</p>
                                <p className="rate__title rate__title-desc paragraph-18">{description}</p>
                            </div>

                            <div className="rate__img">
                                <img src={image} alt={`СКАН тариф ${title} изображение`} />
                            </div>
                        </div>

                            <div className="rate__content">
                                {isActive && isLoggedIn && (
                                <div className="rate__badge">
                                    <p className="rate__badge-paragraph paragraph-14">Текущий тариф</p>
                                </div>
                                )}

                            <div className="rate__price">
                                <p className="rate__price rate__price-actually paragraph-30">{price}<span className="rate__price rate__price-outdated paragraph-25-500">{outdatedPrice}</span></p>
                                <p className="rate__price-paragraph paragraph-18">{priceParagraph}</p>
                            </div>

                            <div className="rate__tax">
                                <p className="rate__tax-paragraph paragraph-20-500">В тариф входит:</p>

                                {traits.map((trait, index) => (
                                <ul key={index} className="rate__list">
                                        <li className="paragraph-18">{trait}</li>
                                </ul>
                                ))}
                            </div>

                                {isLoggedIn && isActive
                                    ? <a className={`btn btn__rate btn__rate-${title.toLowerCase()} paragraph-20`} href="#!">Перейти в личный кабинет</a>
                                    : <a className="btn btn__rate btn__rate-md paragraph-20" href="#!">Подробнее</a>
                                }
                        </div>
                    </div>
    );
};

export default RateCard;