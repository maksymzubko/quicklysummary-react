import {Box, CircularProgress} from "@mui/material";
import cl from './style.module.css'

export interface ArgsButton {
    data_background_color?: string;
    data_background_color_hover?: string;
    data_color_hover?: string;
    data_color?: string;
    data_outline?: string;
    data_outline_hover?: string;
}

export interface ButtonData {
    children: any;
    onClick: () => void;
    args?: ArgsButton;
    icon_data?: {
        icon: any;
        needRevert?: boolean;
        position?: "start" | "end";
    };
    loading?: boolean;
    disabled?: boolean;
}

const CustomButton = (data: ButtonData) => {
    return (
        <Box
            sx={{
                "--data-backgroundcolor": data.args?.data_background_color ?? "none",
                "--data-backgroundcolorhover": data.args?.data_background_color_hover ?? "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
                "--data-colorhover": data.args?.data_color_hover ?? "#1A191D",
                "--data-color": data.args?.data_color ?? "white",
                "--data-outline": data.args?.data_outline ?? "white",
                "--data-outlinehover": data.args?.data_outline_hover ?? "none",
            }}
            onClick={data.onClick} className={
            [
                cl.container,
                data.loading ? cl.disabled : '',
                data.disabled ? cl.disabled : '',
                data?.icon_data?.position === 'end' ? cl.end_icon : ""
            ].join(' ')}>
            {data.loading && <CircularProgress sx={{height: '16px !important', width: '16px !important'}}/>}
            {!data.loading && <>
                {data.icon_data &&
                    <img src={data.icon_data.icon} className={data.icon_data.needRevert ? cl.need_revert : ''}
                         alt={''}/>}
                {data.children}
            </>}
        </Box>
    );
};

export default CustomButton;