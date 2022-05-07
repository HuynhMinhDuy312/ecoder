/**
 * Author: Nam Dinh
 * Created At: Sun Apr 24 2022
 * File name: ProtectedRoute.js
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import controllers from '@controllers/controller-factory';

function ProtectedRoute() {
    const [outlet, setOutlet] = React.useState(<div></div>);

    React.useEffect(() => {
        var isAuth = controllers.user.getCurrentUser().token != null;

        if (isAuth) {
            setOutlet(<Outlet />);
        } else {
            setOutlet(<Navigate to="/authentication" />);
        }
    }, []);

    return outlet;
}

export default ProtectedRoute;
