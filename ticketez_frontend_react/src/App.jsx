import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { AdminLayout, DefaultLayout } from '~/layouts';
import { Fragment } from 'react';
import NotFound from './pages/NotFound/notFound';
import { ToastContainer } from 'react-toastify';
import { getRolesFromLocalStorage, hasSuperAdminRole } from './utils/authUtils';

function App() {
    const roles = getRolesFromLocalStorage();
    const isAuthenticated = roles && roles.length > 0;
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                        <ToastContainer />
                                    </Layout>
                                }
                            />
                        );

                    })}



                    {privateRoutes.map((route, index) => {
                        const hasRequiredRole = roles.includes('SUPER_ADMIN') ||
                            roles.includes('MOVIE_MANAGEMENT_ADMIN') ||
                            roles.includes('SCHEDULING_PRICING_ADMIN') ||
                            roles.includes('USER_MANAGEMENT_ADMIN');

                        if (!isAuthenticated || !hasRequiredRole) {
                            return null;
                        }

                        const Page = route.component;
                        let Layout = route.layout || Fragment;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                        <ToastContainer />
                                    </Layout>
                                }
                            />
                        );
                    })}


                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
