import React from 'react';
import Cover from '../cover/Cover';
import Options from '../options/Options';
import Pricing from '../pricing/Pricing';

const Main = ({ isLoggedIn, userOption="Beginner" }) => {
    return (
        <div className="main-content">
            <Cover isLoggedIn={isLoggedIn} userOption={userOption} />
                <Options />
            <Pricing isLoggedIn={isLoggedIn} />
        </div>
    )
}

export default Main