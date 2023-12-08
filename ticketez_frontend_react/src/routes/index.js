import UserContact from '~/pages/User/Contact';
import * as PageAdmin from '~/pages/Admin';
import * as PageUser from '~/pages/User';
import { AdminLayout, DefaultLayout } from '~/layouts';
import RegisterForm from '~/components/Auth/Register/RegisterForm';
import LoginForm from '~/components/Auth/Login/LoginForm';
import OtpForm from '~/components/Otp/OtpForm';
import PasswordChangeForm from '~/components/Auth/ChangePassword/ChangePasswordForm';

const publicRoutes = [

    // User
    // { path: '/movie/:id', component: PageUser.MovieDef, layout: DefaultLayout },
    { path: '/', component: PageUser.Home, layout: DefaultLayout },
    { path: '/login', component: LoginForm, layout: DefaultLayout },
    { path: '/register', component: RegisterForm, layout: DefaultLayout },
    { path: '/otp', component: OtpForm, layout: DefaultLayout },
    { path: '/changepassword', component: PasswordChangeForm, layout: DefaultLayout },
    //sự kiện
    { path: '/su-kien/tin-tuc', component: PageUser.Event, layout: DefaultLayout },
    { path: '/su-kien/tin-tuc/:eventId', component: PageUser.EventDetails, layout: DefaultLayout },
    { path: '/su-kien/khuyen-mai', component: PageUser.Event, layout: DefaultLayout },
    { path: '/su-kien/khuyen-mai/:eventId', component: PageUser.EventDetails, layout: DefaultLayout },
    //liên hệ
    { path: '/contact', component: UserContact, layout: DefaultLayout },
    { path: '/profile', component: PageUser.ProfilePage, layout: DefaultLayout },
    { path: '/movie-details/:movieId', component: PageUser.MovieDetails, layout: DefaultLayout },
    { path: '/movie-search', component: PageUser.MovieSearch, layout: DefaultLayout },
    { path: '/connector-page', component: PageUser.ConnectorPage, layout: null },
    { path: '/booking-info', component: PageUser.BookingInfo, layout: DefaultLayout },
    { path: '/booking-combo', component: PageUser.BookingCombo, layout: DefaultLayout },
    { path: '/booking-history', component: PageUser.BookingHistory, layout: DefaultLayout },
    { path: '/review/', component: PageUser.ReviewMovie, layout: DefaultLayout },
    { path: '/movieTop/', component: PageUser.MovieTop, layout: DefaultLayout },
    { path: '/movieTop/:articleId', component: PageUser.MovieTopDetails, layout: DefaultLayout },
    { path: '/movie-cinema-complex/:ccxId', component: PageUser.MovieCinemaComplex, layout: DefaultLayout },
];



const privateRoutes = [
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
    { path: '/admin/price', component: PageAdmin.AdminPrice, layout: AdminLayout },
    { path: '/admin/article', component: PageAdmin.AdminArticle, layout: AdminLayout },
    { path: '/admin/movie-producer', component: PageAdmin.AdminProducer, layout: AdminLayout },
    { path: '/admin/accountStaff', component: PageAdmin.AdminAccountStaff, layout: AdminLayout },

];

export { publicRoutes, privateRoutes };
