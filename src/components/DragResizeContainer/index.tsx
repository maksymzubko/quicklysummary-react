import React, {useEffect} from 'react';
import {Box, Divider} from "@mui/material";
import cl from './style.module.css'

export interface DragResizeInterface {
    maxHeight: string;
    minHeight: string;
    fontSize: number;
    text: string | null;
}

const DragResizeContainer = (data: DragResizeInterface) => {
    useEffect(() => {
        let startY = 0;
        let startHeight1 = 50;
        let startHeight2 = 50;

        const stick = document.querySelector(`.${cl.stick}`) as HTMLElement;
        const text = document.querySelector(`#text`) as HTMLElement;
        const text2 = document.querySelector(`#gpt`) as HTMLElement;
        const container = document.querySelector(`#content`) as HTMLElement;

        const mouseDown = (e: any) => {
            // Get the current mouse position
            startY = e.clientY;

            // Get the current height of the divs
            startHeight1 = text.clientHeight;
            startHeight2 = text2.clientHeight;

            document.addEventListener('mousemove', resize, false);
        }

        const resize = (e: any) => {
            // Calculate the distance the mouse has moved
            const deltaY = e.clientY - startY;

            // Calculate the new heights of the divs
            const newHeight1 = startHeight1 + deltaY;
            const newHeight2 = startHeight2 - deltaY;

            // Set the max-height of the container
            const containerHeight = container.clientHeight;
            const maxHeight = Math.min(containerHeight, newHeight1 + newHeight2);
            // container.style.maxHeight = `${maxHeight}px`;

            console.log(containerHeight, newHeight2, newHeight1)
            // Set the new heights of the divs
            if (newHeight1 > 0 && data.text) {
                text.style.height = `${newHeight1}px`;
                // text2.style.height = `${newHeight2}px`;
            }
        }

        const mouseUp = (e: any) => {
            document.removeEventListener('mousemove', resize, false)
        }

        stick.addEventListener('mousedown', mouseDown, false)
        document.addEventListener('mouseup', mouseUp, false)

        return () => {
            stick.removeEventListener('mousedown', mouseDown, false)
            document.removeEventListener('mouseup', mouseUp, false)
        }
    }, [data.text])

    return (
        <Box className={[cl.container, data.text ? '' : cl.disabled].join(' ')}>
            <Divider className={cl.divider}/>
            <Box id={"initial_text_content"} style={{fontSize: data.fontSize, height: "100%"}} className={cl.text}>
                {data.text ? data.text :
                    <Box sx={{display:"grid", placeContent:"center", width:"100%", height:"100%"}}>
                        This will show all text from your file
                    </Box>
                }
            </Box>
            <Box className={cl.custom_divider}>
                <Box className={cl.stick}>
                    <span></span>
                </Box>
            </Box>
        </Box>
    );
};

export default DragResizeContainer;