import React from 'react';

import MeetUs from './MeetUs/MeetUs';
import Factoids from './Factoids/Factoids';
import RateCardList from './Rate/RateCardList';

const Main = ({ isLoggedIn, userRate }) => {
    return (
        <main className="main">
            <MeetUs isLoggedIn={isLoggedIn} />
            <Factoids />
            <RateCardList />
        </main>
    );
};

export default Main;

