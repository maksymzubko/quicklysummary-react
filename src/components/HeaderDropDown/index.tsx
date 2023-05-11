import React, {useEffect, useState} from 'react';
import {Avatar, Box, Divider, Typography} from "@mui/material";
import cl from './style.module.css'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../../redux/store/user/selector";
import {setAuthorized, setUser} from "../../redux/store/user/slice";
import {useLocation, useNavigate} from "react-router-dom";
import {links} from "../../router";

const HeaderDropDown = () => {
    const [show, setShow] = useState(false)
    const userData = useSelector(SelectUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setShow(false)
    }, [location])

    const logOut = () => {
        localStorage.removeItem('quickly_summary_token')
        dispatch(setUser({user: null}))
        dispatch(setAuthorized({isAuthorized: false}))
        navigate(links.landing)

        setShow(false)
    }

    return (
        <Box className={cl.container}>
            <Box onClick={() => setShow(!show)} className={cl.click_item}>
                <Avatar/>
            </Box>
            <Box className={[cl.dropdown_container, show ? cl.show : cl.hide].join(' ')}>
                <Box className={cl.header}>
                    <Avatar/>
                    <Box className={cl.info}>
                        <Typography className={cl.name}>{userData?.uuid ?? "Incorrect UID"}</Typography>
                        <Typography className={cl.email}>{userData?.email ?? "Incorrect email"}</Typography>
                    </Box>
                </Box>
                <Box onClick={()=>setShow(false)} className={cl.content}>
                    <PortraitIcon fontSize={"small"}/> Profile Details
                </Box>
                <Box onClick={()=>setShow(false)} className={cl.content}>
                    <MonetizationOnOutlinedIcon fontSize={"small"}/> Plans and Billing
                </Box>
                <hr/>
                <Box onClick={()=>setShow(false)} className={cl.content}>
                    <HelpOutlineIcon fontSize={"small"}/> Help Center
                </Box>
                <Box onClick={logOut} className={cl.content}>
                    <LogoutIcon fontSize={"small"}/> Log Out
                </Box>
            </Box>
        </Box>
    );
};

export default HeaderDropDown;