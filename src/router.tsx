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

const HeaderLayout = Loader(
    lazy(() => import('./layouts/HeaderLayout/index'))
);

const LandingPage = Loader(
    lazy(() => import('./containers/Landing/index'))
);

export const links = {
    auth: '/auth',
    register: '/register',
    main: '/',
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
                                path: '/auth',
                                element: <AuthPage/>,
                            },
                            {
                                path: '/auth/google',
                                element: <GoogleAuthPage/>
                            },
                            {
                                path: '/auth/login',
                                element: <GoogleAuthPage/>
                            },
                            {
                                path: '/auth/register',
                                element: <GoogleAuthPage/>
                            }
                        ]
                }
            ],
        'not-authorized':
            [
                {}
            ]
    }

