import UserContact from '~/pages/User/Contact';
import * as PageAdmin from '~/pages/Admin';
import * as PageUser from '~/pages/User';
import { AdminLayout, DefaultLayout } from '~/layouts';
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
    { path: '/admin/seat-chart', component: PageAdmin.AdminSeatChart, layout: AdminLayout },
    { path: '/admin/combo', component: PageAdmin.AdminCombo, layout: AdminLayout },
    { path: '/admin/discount', component: PageAdmin.AdminDiscount, layout: AdminLayout },
    { path: '/admin/event', component: PageAdmin.AdminEvent, layout: AdminLayout },
    { path: '/admin/movie-studio', component: PageAdmin.AdminMovieStudio, layout: AdminLayout },
    { path: '/admin/actor', component: PageAdmin.AdminActor, layout: AdminLayout },
    { path: '/admin/director', component: PageAdmin.AdminDirector, layout: AdminLayout },
    { path: '/admin/format', component: PageAdmin.AdminFormat, layout: AdminLayout },
    { path: '/admin/account', component: PageAdmin.AdminAccount, layout: AdminLayout },
    { path: '/admin/mpaaRating', component: PageAdmin.AdminMpaaRating, layout: AdminLayout },
    { path: '/admin/service', component: PageAdmin.AdminService, layout: AdminLayout },
    { path: '/admin/priceservice', component: PageAdmin.AdminPriceService, layout: AdminLayout },
    { path: '/admin/cinema-chains', component: PageAdmin.AdminCinemaChains, layout: AdminLayout },

    // User
    { path: '/movie/:id', component: PageUser.MovieDef, layout: DefaultLayout },
    { path: '/', component: PageUser.Home, layout: DefaultLayout },
    { path: '/login', component: LoginSignin, layout: DefaultLayout },
    { path: '/event', component: PageUser.Event, layout: DefaultLayout },
    { path: '/contact', component: UserContact, layout: DefaultLayout },
    { path: '/profile', component: PageUser.ProfilePage, layout: DefaultLayout },
    { path: '/movie-details/:movieId', component: PageUser.MovieDetails, layout: DefaultLayout },
];


const privateRoutes = [

];

export { publicRoutes, privateRoutes };
