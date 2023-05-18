import {createSlice, PayloadAction, current} from "@reduxjs/toolkit";
import {GptResponseDto, TicketResponse} from "../../../api/user/types";
import {StatusInterface} from "../../../containers/MainPage/Sidebar/StatusComponent";

export interface Manager {
    tickets: TicketResponse[] | null,
    statuses: StatusInterface[] | null
}

const INITIAL_STATE: Manager = {
    tickets: [],
    statuses: []
};

const managerSlice = createSlice({
    name: "manager",
    initialState: INITIAL_STATE,
    reducers: {
        setTickets: (state: Manager, action: PayloadAction<{tickets: TicketResponse[] | null}>) => {
            state.tickets = action.payload.tickets;
        },
        addTicket: (state: Manager, action: PayloadAction<{ticket: TicketResponse | null}>) => {
            state.tickets.push(action.payload.ticket)
        },
        addGPTResponse: (state: Manager, action: PayloadAction<{id: number, gpt: GptResponseDto[] | null}>) => {
            const index = state.tickets.findIndex(obj => obj.ticketId === action.payload.id);
            if (index !== -1) {
                state.tickets[index].gptFiles = [ ...state.tickets[index].gptFiles, ...action.payload.gpt ];
            }
        },
        addOrUpdateGptResponse: (state: Manager, action: PayloadAction<{id: number, gpt: GptResponseDto[] | null}>) => {
            const index = state.tickets.findIndex(obj => obj.ticketId === action.payload.id);
            if (index !== -1) {
                action.payload.gpt.map(g=>{
                    const gptIndex = state.tickets[index].gptFiles.findIndex(obj => obj.reqId === g.reqId);
                    if(gptIndex !== -1)
                        state.tickets[index].gptFiles[gptIndex] = g;
                    else
                        state.tickets[index].gptFiles = [ ...state.tickets[index].gptFiles, g ];
                })

            }
        },
        removeTicket: (state: Manager, action: PayloadAction<{ticketId: number | null}>) => {
            state.tickets = state.tickets.filter(t=>t.ticketId !== action.payload.ticketId)
        },
        setStatuses: (state: Manager, action: PayloadAction<{statuses: StatusInterface[] | null}>) => {
            state.statuses = action.payload.statuses;
        },
        addStatus: (state:Manager, action: PayloadAction<{status: StatusInterface | null}>) => {
            state.statuses = [action.payload.status, ...state.statuses]
        },
        updateStatus: (state:Manager, action: PayloadAction<{status: StatusInterface | null}>) => {
            const index = state.statuses.findIndex(obj => obj.id === action.payload.status.id);
            if (index !== -1) {
                state.statuses[index] = { ...state.statuses[index], ...action.payload.status };
            }
        },
        updateTicketName: (state:Manager, action: PayloadAction<{id: number, name: string | null}>) => {
            const index = state.tickets.findIndex(obj => obj.ticketId === action.payload.id);
            if (index !== -1) {
                state.tickets[index] = { ...state.tickets[index], ticketName: action.payload.name };
            }
        },
        removeStatus: (state:Manager, action: PayloadAction<{statusId: number | null}>) => {
            state.statuses = state.statuses.filter(t=>t.id !== action.payload.statusId)
        },
    }
})

export default managerSlice.reducer;
export const { setTickets, addTicket, removeTicket, removeStatus, addStatus, updateStatus, setStatuses, addGPTResponse, updateTicketName, addOrUpdateGptResponse } = managerSlice.actions;
