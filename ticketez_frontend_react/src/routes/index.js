import UserHome from '~/pages/User/Home';
import UserContact from '~/pages/User/Contact';
import * as PageAdmin from '~/pages/Admin';
import { AdminLayout, DefaultLayout } from '~/layouts';

const publicRoutes = [
    //Admin
    { path: '/admin/index', component: PageAdmin.AdminIndex, layout: AdminLayout },
    { path: '/admin/movie', component: PageAdmin.AdminMovie, layout: AdminLayout },
    { path: '/admin/cinema-complex', component: PageAdmin.AdminCinemaComplex, layout: AdminLayout },
    { path: '/admin/cinema', component: PageAdmin.AdminCinema, layout: AdminLayout },

    // User
    { path: '/', component: UserHome, layout: DefaultLayout },
    { path: '/contact', component: UserContact },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
