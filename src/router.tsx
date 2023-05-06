import {lazy, Suspense} from "react";
import SuspenseLoader from "./components/SuspenseLoader";

const Loader = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader/>}>
            <Component {...props} />
        </Suspense>
    );

const AuthPage = Loader(
    lazy(() => import('./containers/LoginPage/Default/index'))
);

const GoogleAuthPage = Loader(
    lazy(() => import('./containers/LoginPage/Google/index'))
);

const HeaderLayout = lazy(() => import('./layouts/HeaderLayout/index'))

const LandingPage = Loader(
    lazy(() => import('./containers/Landing/index'))
);

const LoginPage = Loader(
    lazy(() => import('./containers/LoginPage/Login/index'))
);

const RegisterPage = Loader(
    lazy(() => import('./containers/LoginPage/Register/index'))
);

const MainPage = Loader(
    lazy(() => import('./containers/MainPage/index'))
);



export const links = {
    auth: '/auth',
    register: '/auth/register',
    landing: '/',
    main: '/main',
    login: '/auth/login',
}

export const routes =
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
                                element: <LandingPage/>,
                            },
                            {
                                path: '/main',
                                element: <MainPage/>,
                            },
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
                                element: <LandingPage/>,
                            },
                            {
                                path: '/auth',
                                element: <AuthPage/>,
                            },
                            {
                                path: '/auth/google',
                                element: <GoogleAuthPage/>
                            },
                            {
                                path: '/auth/login',
                                element: <LoginPage/>
                            },
                            {
                                path: '/auth/register',
                                element: <RegisterPage/>
                            }
                        ]
                }

            ]
    }

