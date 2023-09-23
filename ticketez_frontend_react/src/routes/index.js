import UserHome from '~/pages/User/Home';
import UserContact from '~/pages/User/Contact';

const publicRoutes = [
    //Admin

    // User
    { path: '/', component: UserHome },
    { path: '/contact', component: UserContact },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
