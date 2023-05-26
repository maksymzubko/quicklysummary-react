import {lazy, Suspense} from "react";
import SuspenseLoader from "@components/SuspenseLoader";
import {Navigate} from "react-router-dom";

const Loader = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader/>}>
            <Component {...props} />
        </Suspense>
    );

const AuthPageDesktop = Loader(
    lazy(() => import('@containers/Desktop/LoginPage/Default'))
);

const AuthPageMobile = Loader(
    lazy(() => import('@containers/Mobile/Login/Default'))
);

const GoogleAuthPageDesktop = Loader(
    lazy(() => import('@containers/Desktop/LoginPage/Google'))
);

const GoogleAuthPageMobile = Loader(
    lazy(() => import('@containers/Mobile/Login/Google'))
);

const HeaderLayout = lazy(() => import('@layouts/HeaderLayout'))

const LandingPageDesktop = Loader(
    lazy(() => import('@containers/Desktop/Landing'))
);

const LandingPageMobile = Loader(
    lazy(() => import('@containers/Mobile/Landing'))
);

const LoginPageDesktop = Loader(
    lazy(() => import('@containers/Desktop/LoginPage/Login'))
);

const LoginPageMobile = Loader(
    lazy(() => import('@containers/Mobile/Login/Login'))
);

const RegisterPageDesktop = Loader(
    lazy(() => import('@containers/Desktop/LoginPage/Register'))
);

const RegisterPageMobile = Loader(
    lazy(() => import('@containers/Mobile/Login/Register'))
);

const MainPageDesktop = Loader(
    lazy(() => import('@containers/Desktop/MainPage'))
);



export const linksDesktop = {
    auth: '/auth',
    register: '/auth/register',
    landing: '/',
    main: '/main',
    login: '/auth/login',
}
export const linksMobile = {
    auth: '/auth',
    register: '/auth/register',
    landing: '/',
    main: '/main',
    login: '/auth/login',
}


export const routesDesktop =
    {
        'authorized':
            [
                {
                    path: '/',
                    element: <HeaderLayout/>,
                    children:
                        [
                            {
                                path: '/',
                                element: <LandingPageDesktop/>,
                            },
                            {
                                path: '/main',
                                element: <MainPageDesktop/>,
                            },
                            {
                                path: "*",
                                element: <Navigate to={"/"}/>
                            }
                        ]
                }
            ],
        'not-authorized':
            [

                {
                    path: '/',
                    element: <HeaderLayout/>,
                    children:
                        [
                            {
                                path: '/',
                                element: <LandingPageDesktop/>,
                            },
                            {
                                path: '/auth',
                                element: <AuthPageDesktop/>,
                            },
                            {
                                path: '/auth/google',
                                element: <GoogleAuthPageDesktop/>
                            },
                            {
                                path: '/auth/login',
                                element: <LoginPageDesktop/>
                            },
                            {
                                path: '/auth/register',
                                element: <RegisterPageDesktop/>
                            },
                            {
                                path: "*",
                                element: <Navigate to={"/"}/>
                            }
                        ]
                }

            ]
    }

export const routesMobile =
    {
        'authorized':
            [
                {
                    path: '/',
                    element: <HeaderLayout/>,
                    children:
                        [
                            {
                                path: '/',
                                element: <LandingPageMobile/>,
                            },
                            {
                                path: "*",
                                element: <Navigate to={"/"}/>
                            }
                        ]
                }
            ],
        'not-authorized':
            [

                {
                    path: '/',
                    element: <HeaderLayout/>,
                    children:
                        [
                            {
                                path: '/',
                                element: <LandingPageMobile/>,
                            },
                            {
                                path: '/auth',
                                element: <AuthPageMobile/>,
                            },
                            {
                                path: '/auth/google',
                                element: <GoogleAuthPageMobile/>
                            },
                            {
                                path: '/auth/login',
                                element: <LoginPageMobile/>
                            },
                            {
                                path: '/auth/register',
                                element: <RegisterPageMobile/>
                            },
                            {
                                path: "*",
                                element: <Navigate to={"/"}/>
                            }
                        ]
                }

            ]
    }

