import React from 'react';
import '../../styles/styles.css';
import womenResult from '../../assets/images/result/women-result.png';

const NotFound = () => {
    return(
        <div class="results">
            <div className="container">
                <section className="result">
                        <div className="result__row">
                            <div className="result__content not-found">
                                <h2 className="result__title result__title-not-found">Страница не найдена.</h2>
                                <div className="result__text result__text-not-found">
                                    <p className="result__paragraph result__paragraph-not-found paragraph-20">
                                        Проверьте корректность указанного адреса, и повторите попытку снова.
                                    </p>
                                </div>
                            </div>
                            <div className="result__img result__img-not-found">
                                <img src={womenResult} alt="СКАН Результаты поиска" style={{ width: '450px' }}/>
                            </div>
                        </div>
                    </section>
                    </div>
                    </div>
    );
};

export default NotFound;