import * as React from 'react';
import NavLink from 'react-router-dom/NavLink';

const NotFoundPage = () => (
    <div>
        404 - <NavLink to="/">Go home</NavLink>
    </div>
);

export default NotFoundPage;
