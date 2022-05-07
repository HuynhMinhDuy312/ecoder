import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';
import { UserContext } from './context';
import controllers from '@controllers/controller-factory';

function Wrapper() {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        setUser(controllers.user.getCurrentUser(user));
    }, []);

    return (
        <UserContext.Provider value={user}>
            <Navigation setUser={setUser} />
            <Menu />
            <Outlet context={setUser} />
            <Footer />
        </UserContext.Provider>
    );
}

export default Wrapper;
