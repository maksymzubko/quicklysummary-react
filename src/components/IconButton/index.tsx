import React, {forwardRef} from 'react';
import {IconButton, IconButtonProps, styled, Button} from "@mui/material";

export interface CustomIconButtonProps extends IconButtonProps {
    invert?: boolean,
    disableoutline?: boolean
}

const CustomIconBtn = styled(IconButton)((props: CustomIconButtonProps) => ({
    "&":{outline:"1px solid transparent", width:"32px", height:"32px", fontSize:"2rem !important"},
    "&:hover":{background:"none", outline:`1px solid ${props.invert ? props.disableoutline ? "transparent" : "white" : "black"}`},
    "&:focus":{background:"none"},
    "& svg":{fontSize:"2rem"}
}));

const IconBtn = (data:CustomIconButtonProps, ref: any) => {
    return (
        <CustomIconBtn ref={ref} {...data}>
            {data.children}
        </CustomIconBtn>
    );
};

export default forwardRef(IconBtn);