import _class from './style.module.css'
import GoogleAuthDesktop from '@containers/Desktop/LoginPage/Google'

const GoogleAuth = () => {
    return (
        <GoogleAuthDesktop {...{_class}}/>
    );
};

export default GoogleAuth;