import {Avatar, Box, Button, SvgIcon} from "@mui/material";
import Logo from './assets/logo.svg';
import cl from './style.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import {linksMobile} from "router";
import HeaderDropDown from "@components/Mobile/HeaderDropDown";

const Header = () => {
    const navigate = useNavigate()

    return (
        <Box className={[cl.container, 'header'].join(' ')}>
            <Box onClick={() => {
                navigate(linksMobile.landing)
            }} className={cl.logo}>
                <img src={Logo} alt='logo'/>
                QuicklySummary
            </Box>
            <Box className={cl.menu}>
                <HeaderDropDown opened={false} onClose={() => {}}/>
            </Box>
        </Box>
    );
};

export default Header;