import React from 'react';

import MeetUs from './MeetUs/MeetUs';
import Factoids from './Factoids/Factoids';
import Rate from './Rate/Rate';

const Main = ({ isLoggedIn, userRate }) => {
    return (
        <main className="main">
            <MeetUs isLoggedIn={isLoggedIn} />
            <Factoids />
            <Rate />
        </main>
    );
};

export default Main;

