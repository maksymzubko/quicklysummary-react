import {Box, Typography} from "@mui/material";
import cl from './style.module.css'
import Image from './assets/element_1.png'
import LayoutButton from "@components/Button/LayoutButton";
import {useSelector} from "react-redux";
import {SelectIsAuthorized} from "redux/store/user/selector";
import {useNavigate} from "react-router-dom";
import {linksDesktop} from "router";
import {useTranslation} from "react-i18next";
import {messages} from "languages/messages";

const LandingPage = () => {
    const isAuthorized = useSelector(SelectIsAuthorized);
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box className={[cl.container].join(' ')}>
            <Box className={cl.content}>
                <Typography data-content={'quickly'} className={cl.quickly}>quickly</Typography>
                <Typography className={cl.summary}>summary</Typography>
                <Typography className={cl.text}>Lorem ipsum dolor sit amet consectetur. Enim ac scelerisque elementum gravida. Adipiscing in
                    tincidunt ut vel. Ut vitae eget tortor volutpat. Massa auctor massa vulputate nunc purus tempus.
                    Nulla dapibus enim nec sed sapien feugiat aliquam.</Typography>
                <LayoutButton onClick={() => {navigate(isAuthorized ? linksDesktop.main : linksDesktop.auth)}}>{t(messages.buttons.startBtn())}</LayoutButton>
            </Box>
            <img src={Image} alt={'image'}/>
        </Box>
    );
};

export default LandingPage;