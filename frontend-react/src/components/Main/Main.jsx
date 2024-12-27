import React from 'react';

import MeetUs from './MeetUs/MeetUs';
import Factoids from './Factoids/Factoids';
import RateCardList from './Rate/RateCardList';
import Auth from '../Auth/Auth';

const Main = ({ isLoggedIn, userRate }) => {
    return (
        <main className="main">
                <Auth />
            <MeetUs isLoggedIn={isLoggedIn} />
            <Factoids />
            <RateCardList />
        </main>
    );
};

export default Main;

