import React from 'react';

import MeetUs from './MeetUs/MeetUs';
import Factoids from './Factoids/Factoids';

const Main = ({ isLoggedIn, userRate }) => {
    return (
        <main className="main">
            <MeetUs isLoggedIn={isLoggedIn} />
            <Factoids />
        </main>
    );
};

export default Main;

