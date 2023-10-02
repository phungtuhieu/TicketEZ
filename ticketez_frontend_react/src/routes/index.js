import UserHome from '~/pages/User/Home';
import { Route } from 'react-router-dom';
import UserContact from '~/pages/User/Contact';
import { AdminIndex, AdminMovie, AdminCinemaComplex } from '~/pages/Admin';
import {  MovieDef} from '~/pages/User';

import { AdminLayout, DefaultLayout } from '~/layouts';

const publicRoutes = [
    //Admin
    { path: '/admin/index', component: AdminIndex, layout: AdminLayout },
    { path: '/admin/movie', component: AdminMovie, layout: AdminLayout },
    { path: '/admin/cinema-complex', component: AdminCinemaComplex, layout: AdminLayout },

    // User
    { path: '/movie/:id', component: MovieDef, layout: DefaultLayout },
    { path: '/', component: UserHome, layout: DefaultLayout },
    { path: '/contact', component: UserContact, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
