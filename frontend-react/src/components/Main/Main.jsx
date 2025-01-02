import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MeetUs from './MeetUs/MeetUs';
import Factoids from './Factoids/Factoids';
import RateCardList from './Rate/RateCardList';

const Main = ({ isLoggedIn, userRate }) => {

    const location = useLocation();

    /* Прокрутка к якорному элементу при клике со сторонних (относительно Main) страниц */
    useEffect(() => {
        if (location.state && location.state.anchor) {
            const anchor = document.getElementById(location.state.anchor);
            if (anchor) {
                anchor.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <main className="main">
            <MeetUs isLoggedIn={isLoggedIn} />
            <Factoids />
            <RateCardList isLoggedIn={isLoggedIn} userRate={userRate} />
        </main>
    );
};

export default Main;

