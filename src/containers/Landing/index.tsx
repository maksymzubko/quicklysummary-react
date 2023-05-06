import {Box, Typography} from "@mui/material";
import cl from './style.module.css'
import Image from './assets/element_1.png'
import CustomButton from "../../components/Button";
import {useEffect} from "react";
import LayoutButton from "../../components/Button/LayoutButton";

const LandingPage = () => {
    useEffect(() => {

    }, [])

    return (
        <Box className={[cl.container].join(' ')}>
            <Box className={cl.content}>
                <Typography className={cl.quickly}>quickly</Typography>
                <Typography className={cl.summary}>summary</Typography>
                <Typography className={cl.text}>Lorem ipsum dolor sit amet consectetur. Enim ac scelerisque elementum gravida. Adipiscing in
                    tincidunt ut vel. Ut vitae eget tortor volutpat. Massa auctor massa vulputate nunc purus tempus.
                    Nulla dapibus enim nec sed sapien feugiat aliquam.</Typography>
                <LayoutButton onClick={() => {}}>Get started</LayoutButton>
            </Box>
            <img src={Image} alt={'image'}/>
        </Box>
    );
};

export default LandingPage;