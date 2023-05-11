import React, {useCallback, useState} from 'react';
import {Box, Divider, IconButton, SvgIcon} from "@mui/material";
import cl from './style.module.css'
import Sidebar from "./Sidebar";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Adobe from './assets/adobe-acrobat-dc-logo-2020-1 1.svg'
import PDFButton from "../../components/Button/PDFButton";
import DragResizeContainer from "../../components/DragResizeContainer";
import CustomSelector, {AnimationSides} from "../../components/CustomSelector";
import {TicketResponse} from "../../api/tickets/types";
import {StatusInterface} from "./Sidebar/StatusComponent";

const MainPage = () => {
    const [tickets, setTickets] = useState<TicketResponse[]>(
        [
            {
                ticketId: 1,
                ticketName: "File1.txt",
                gptFiles: [{id: 0, content: "Gpt content"}],
                ticketFileText: "Initial file text"
            },
            {
                ticketId: 255,
                ticketName: "File2.txt",
                gptFiles: [{id: 0, content: "Gpt content"}, {id: 1, content: "Content"}],
                ticketFileText: "Lorem"
            },
            {
                ticketId: 2534,
                ticketName: "File2.txt",
                gptFiles: [{id: 0, content: "Gpt content"}, {id: 1, content: "Content"}],
                ticketFileText: "Lorem"
            },
            {
                ticketId: 2566,
                ticketName: "File2.txt",
                gptFiles: [{id: 0, content: "Gpt content"}, {id: 1, content: "Content"}],
                ticketFileText: "Lorem"
            },
            {
                ticketId: 223,
                ticketName: "File2.txt",
                gptFiles: [{id: 0, content: "Gpt content"}, {id: 1, content: "Content"}],
                ticketFileText: "Lorem"
            },
            {
                ticketId: 2123,
                ticketName: "File2.txt",
                gptFiles: [{id: 0, content: "Gpt content"}, {id: 1, content: "Content"}],
                ticketFileText: "Lorem"
            },
            {
                ticketId: 25,
                ticketName: "File2.txt",
                gptFiles: [{id: 0, content: "Gpt content"}, {id: 1, content: "Content"}],
                ticketFileText: "Lorem"
            },
            {
                ticketId: 23,
                ticketName: "File2.txt",
                gptFiles: [{id: 0, content: "Gpt content"}, {id: 1, content: "Content"}],
                ticketFileText: "Lorem"
            },
        ])
    const [statuses, setStatuses] = useState<StatusInterface[]>(
        [
            {id: 1, status: "Done", name: "File123.txt"},
            {
                id: 2,
                status: "In process",
                name: "File123123312x.txt"
            },
            {
                id: 22,
                status: "In process",
                name: "File123123312x.txt"
            },
            {
                id: 4,
                status: "In process",
                name: "File123123312x.txt"
            }
        ])

    const [selectedTicket, setSelectedTicket] = useState(null)
    const [scale, setScale] = useState(100)
    const [selectedGpt, setSelectedGpt] = useState(null)

    const scaleUp = () => {
        setScale(scale < 200 ? scale + 25 : scale)
    }

    const scaleDown = () => {
        setScale(scale > 100 ? scale - 25 : scale)
    }

    const reset = () => {
        setScale(100)
    }

    const getFontSize = useCallback(() => {
        const fontSize = 14 + (scale - 100) / 25;
        return fontSize;
    }, [scale])

    const changeActiveGpt = (id: number) => {
        setSelectedGpt(id)
    }

    const onChangeTicket = (id: number) => {
        setSelectedGpt(0);
        setSelectedTicket(id);
    }

    const initialText = useCallback(() => {
        return tickets.find(i=>i.ticketId===selectedTicket)?.ticketFileText;
    }, [selectedTicket])

    const gptText = useCallback(() => {
        return tickets.find(i=>i.ticketId===selectedTicket)
            ?.gptFiles.find(g=>g.id === selectedGpt)?.content;
    }, [selectedTicket, selectedGpt])

    return (
        <Box className={[cl.container].join(' ')}>
            <Sidebar onSelectTicket={onChangeTicket} statuses={statuses} tickets={tickets}/>
            <Box id={"content"} className={[cl.content, !initialText() ? cl.disabled : ''].join(' ')}>
                <Box style={{height: "50%"}} id={"text"} className={cl.text_reader}>
                    <Box className={cl.reader_actions}>
                        <Box className={cl.left_side}>
                            <Box className={cl.scale}>{scale}%</Box>
                            <Box className={cl.buttons}>
                                <IconButton onClick={scaleUp} size={"small"}>
                                    <AddIcon color={"primary"}/>
                                </IconButton>
                                <IconButton onClick={scaleDown} size={"small"}>
                                    <RemoveIcon color={"primary"}/>
                                </IconButton>
                                {scale > 100 && <IconButton onClick={reset} size={"small"}>
                                    <SvgIcon viewBox={"0 0 20 20"}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="none"/>
                                            <path
                                                d="M9.22307 6.67391L6.33911 3.84783C5.98786 3.50362 5.90948 3.10978 6.10396 2.6663C6.29844 2.22283 6.64489 2.00072 7.14329 2H12.8557C13.3549 2 13.7017 2.2221 13.8962 2.6663C14.0907 3.11051 14.0119 3.50435 13.6599 3.84783L10.776 6.67391C10.665 6.78261 10.5449 6.86413 10.4155 6.91848C10.2861 6.97283 10.1474 7 9.99952 7C9.85162 7 9.71297 6.97283 9.58356 6.91848C9.45415 6.86413 9.33399 6.78261 9.22307 6.67391Z"
                                                fill="#1A191D"/>
                                            <path
                                                d="M10.7769 13.3261L13.6609 16.1522C14.0121 16.4964 14.0905 16.8902 13.896 17.3337C13.7016 17.7772 13.3551 17.9993 12.8567 18L7.14426 18C6.64512 18 6.2983 17.7779 6.10382 17.3337C5.90934 16.8895 5.98809 16.4957 6.34008 16.1522L9.22404 13.3261C9.33496 13.2174 9.45512 13.1359 9.58453 13.0815C9.71394 13.0272 9.85259 13 10.0005 13C10.1484 13 10.287 13.0272 10.4164 13.0815C10.5458 13.1359 10.666 13.2174 10.7769 13.3261Z"
                                                fill="#1A191D"/>
                                        </svg>
                                    </SvgIcon>
                                </IconButton>}
                            </Box>
                        </Box>
                        {initialText() && <PDFButton onClick={() => {
                            console.log('click')
                        }} icon_data={{icon: Adobe, position: 'end'}}>Download as PDF</PDFButton>}
                    </Box>
                    <Box className={cl.drag_container}>
                        <DragResizeContainer text={initialText()} fontSize={getFontSize()} minHeight={"10%"}
                                             maxHeight={"70%"}/>
                    </Box>
                </Box>
                <Box id={"gpt"} className={cl.gpt_context}>
                    {/*<Box className={cl.top_content}>*/}
                    <Box className={cl.gpt_buttons}>
                        <Box onClick={() => changeActiveGpt(0)}
                             className={[cl.gpt_button, selectedGpt === 0 ? cl.active : ""].join(" ")}>Summary</Box>
                        <Box onClick={() => changeActiveGpt(1)}
                             className={[cl.gpt_button, selectedGpt === 1 ? cl.active : ""].join(" ")}>10
                            Sentences</Box>
                        <Box onClick={() => changeActiveGpt(2)}
                             className={[cl.gpt_button, selectedGpt === 2 ? cl.active : ""].join(" ")}>Main
                            Keywords</Box>
                        <Box onClick={() => changeActiveGpt(3)}
                             className={[cl.gpt_button, selectedGpt === 3 ? cl.active : ""].join(" ")}>People
                            Mentioned</Box>
                        <Box onClick={() => changeActiveGpt(4)}
                             className={[cl.gpt_button, selectedGpt === 4 ? cl.active : ""].join(" ")}>Issues
                            Discussed</Box>
                        <Box onClick={() => changeActiveGpt(5)}
                             className={[cl.gpt_button, selectedGpt === 5 ? cl.active : ""].join(" ")}>Custom</Box>
                    </Box>
                    <Box sx={{fontSize: getFontSize()}} className={cl.gpt_text}>
                        {gptText() ??
                            <Box sx={{display:"grid", placeContent:"center", width:"100%", height:"100%"}}>
                                This will show the general summary of the text above
                            </Box>
                        }
                    </Box>
                    {/*</Box>*/}
                    <Divider className={cl.divider}/>
                    <Box className={cl.gpt_buttons_bottom}>
                        <Box className={cl.left}>
                            <PDFButton disabled={true} onClick={() => {
                            }}>Start</PDFButton>
                            {initialText() && <CustomSelector theme={'black'} data={['en', 'jp', 'ua', 'ru']}
                                                              animationSide={AnimationSides.right}
                                                              onChangeValue={() => {
                                                              }}/>}
                        </Box>
                        {initialText() && <PDFButton onClick={() => {
                            console.log('click')
                        }} icon_data={{icon: Adobe, position: 'end'}}>Download as PDF</PDFButton>}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainPage;