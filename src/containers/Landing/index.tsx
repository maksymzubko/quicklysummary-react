import {Box, Typography} from "@mui/material";
import cl from './style.module.css'
import Image from './assets/element_1.png'
import CustomButton from "../../components/Button";
import {useEffect} from "react";
import LayoutButton from "../../components/Button/LayoutButton";
import {useSelector} from "react-redux";
import {SelectIsAuthorized} from "../../redux/store/user/selector";
import {useNavigate} from "react-router-dom";
import {links} from "../../router";

const LandingPage = () => {
    const isAuthorized = useSelector(SelectIsAuthorized);
    const navigate = useNavigate();
    useEffect(() => {

    }, [])

    return (
        <Box className={[cl.container].join(' ')}>
            <Box className={cl.content}>
                <Typography data-content={'quickly'} className={cl.quickly}>quickly</Typography>
                <Typography className={cl.summary}>summary</Typography>
                <Typography className={cl.text}>Lorem ipsum dolor sit amet consectetur. Enim ac scelerisque elementum gravida. Adipiscing in
                    tincidunt ut vel. Ut vitae eget tortor volutpat. Massa auctor massa vulputate nunc purus tempus.
                    Nulla dapibus enim nec sed sapien feugiat aliquam.</Typography>
                <LayoutButton onClick={() => {navigate(isAuthorized ? links.main : links.auth)}}>Get started</LayoutButton>
            </Box>
            <img src={Image} alt={'image'}/>
        </Box>
    );
};

export default LandingPage;