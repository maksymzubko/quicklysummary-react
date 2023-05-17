import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Divider, Typography} from "@mui/material";
import cl from './style.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../../redux/store/user/selector";
import {setAuthorized, setUser} from "../../redux/store/user/slice";
import {useLocation, useNavigate} from "react-router-dom";
import {links} from "../../router";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HeaderContext from "../../contexts/headerContext";

const HeaderDropDown = () => {
    const [show, setShow] = useState(false)
    const {setHelpOpened} = useContext(HeaderContext);

    const userData = useSelector(SelectUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setShow(false)
        setHelpOpened(false)
    }, [location])

    const logOut = () => {
        localStorage.removeItem('quickly_summary_token')
        dispatch(setUser({user: null}))
        dispatch(setAuthorized({isAuthorized: false}))
        navigate(links.landing)

        setShow(false)
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelector(`.${cl.dropdown_container}`).setAttribute("data-dont-animate", "0");
        }, 500)
    }, [])

    return (
        <Box className={cl.container}>
            <Box onClick={() => setShow(!show)} className={cl.click_item}>
                <Avatar/>
            </Box>
            <Box data-dont-animate={"1"} className={[cl.dropdown_container, show ? cl.show : cl.hide].join(' ')}>
                <Box className={cl.header}>
                    <Avatar/>
                    <Box className={cl.info}>
                        <Typography className={cl.name}>{userData?.uuid ?? "Incorrect UID"}</Typography>
                        <Typography className={cl.email}>{userData?.email ?? "Incorrect email"}</Typography>
                    </Box>
                </Box>
                {/*<Box onClick={()=>setShow(false)} className={cl.content}>*/}
                {/*    <PortraitIcon fontSize={"small"}/> Profile Details*/}
                {/*</Box>*/}
                {/*<Box onClick={()=>setShow(false)} className={cl.content}>*/}
                {/*    <MonetizationOnOutlinedIcon fontSize={"small"}/> Plans and Billing*/}
                {/*</Box>*/}
                <Box onClick={() => setHelpOpened(true)} className={cl.content}>
                    <ChatBubbleOutlineIcon fontSize={"small"}/> Contact us
                </Box>
                <hr/>
                <Box onClick={logOut} className={cl.content}>
                    <LogoutIcon fontSize={"small"}/> Log Out
                </Box>
            </Box>
        </Box>
    );
};

export default HeaderDropDown;