import UserHome from '~/pages/User/Home';
import UserContact from '~/pages/User/Contact';
import * as PageAdmin from '~/pages/Admin';
import { MovieDef } from '~/pages/User';
import { AdminLayout, DefaultLayout } from '~/layouts';
import LoginPage from '~/pages/Templates/LoginPage';
import LoginSignin from '~/components/Auth/LoginResgiter';

const publicRoutes = [
    //Admin
    { path: '/admin/index', component: PageAdmin.AdminIndex, layout: AdminLayout },
    { path: '/admin/movie', component: PageAdmin.AdminMovie, layout: AdminLayout },
    { path: '/admin/cinema-complex', component: PageAdmin.AdminCinemaComplex, layout: AdminLayout },
    { path: '/admin/cinema', component: PageAdmin.AdminCinema, layout: AdminLayout },
    { path: '/admin/cinema-type', component: PageAdmin.AdminCinemaType, layout: AdminLayout },
    { path: '/admin/province', component: PageAdmin.AdminProvince, layout: AdminLayout },
    { path: '/admin/showtime', component: PageAdmin.AdminShowtime, layout: AdminLayout },
    { path: '/admin/seat', component: PageAdmin.AdminSeat, layout: AdminLayout },
    { path: '/admin/seat-type', component: PageAdmin.AdminSeatType, layout: AdminLayout },
    { path: '/admin/combo', component: PageAdmin.AdminCombo, layout: AdminLayout },
    { path: '/admin/discount', component: PageAdmin.AdminDiscount, layout: AdminLayout },
    { path: '/admin/event', component: PageAdmin.AdminEvent, layout: AdminLayout },
    { path: '/admin/movie-studio', component: PageAdmin.AdminMovieStudio, layout: AdminLayout },
    { path: '/admin/actor', component: PageAdmin.AdminActor, layout: AdminLayout },
    { path: '/admin/director', component: PageAdmin.AdminDirector, layout: AdminLayout },
    { path: '/admin/format', component: PageAdmin.AdminFormat, layout: AdminLayout },
    { path: '/admin/account', component: PageAdmin.AdminAccount, layout: AdminLayout },
    { path: '/admin/mpaaRating', component: PageAdmin.AdminMpaaRating, layout: AdminLayout },

    // User
    { path: '/movie/:id', component: MovieDef, layout: DefaultLayout },
    { path: '/', component: UserHome, layout: DefaultLayout },
    { path: '/contact', component: UserContact, layout: DefaultLayout },
    { path: '/login', component: LoginSignin, layout: DefaultLayout },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
