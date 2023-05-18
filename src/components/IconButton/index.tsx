import React from 'react';
import {IconButton, IconButtonProps, styled, Button} from "@mui/material";

const CustomIconBtn = styled(IconButton)((props) => ({
    "&":{outline:"1px solid transparent", width:"32px", height:"32px", fontSize:"2rem !important"},
    "&:hover":{background:"none", outline:"1px solid black"},
    "&:focus":{background:"none"},
    "& svg":{fontSize:"2rem"}
}));

const IconBtn = (data: IconButtonProps) => {
    return (
        <CustomIconBtn {...data}>
            {data.children}
        </CustomIconBtn>
    );
};

export default IconBtn;