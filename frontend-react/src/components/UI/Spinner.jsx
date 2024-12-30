import React from 'react';
import '../../styles/styles.css';
import spinner from '../../assets/images/UI/spinner.svg';

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={spinner} alt="СКАН Spinner Загрузка" />
        </div>
    );
};

export default Spinner;