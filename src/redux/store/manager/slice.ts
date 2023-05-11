import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TicketResponse} from "../../../api/tickets/types";
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
        setTickets: (state, action: PayloadAction<{tickets: TicketResponse[] | null}>) => {
            state.tickets = action.payload.tickets;
        },
        addTicket: (state, action: PayloadAction<{ticket: TicketResponse | null}>) => {
            state.tickets.push(action.payload.ticket)
        },
        removeTicket: (state, action: PayloadAction<{ticketId: number | null}>) => {
            state.tickets = state.tickets.filter(t=>t.ticketId !== action.payload.ticketId)
        },
        setStatuses: (state, action: PayloadAction<{statuses: StatusInterface[] | null}>) => {
            state.statuses = action.payload.statuses;
        },
        addStatus: (state, action: PayloadAction<{status: StatusInterface | null}>) => {
            state.statuses.push(action.payload.status)
        },
        updateStatus: (state, action: PayloadAction<{status: StatusInterface | null}>) => {
            const index = state.statuses.findIndex(obj => obj.id === action.payload.status.id);
            if (index !== -1) {
                state.statuses[index] = { ...state.statuses[index], ...action.payload.status };
            }
        },
        removeStatus: (state, action: PayloadAction<{statusId: number | null}>) => {
            state.statuses = state.statuses.filter(t=>t.id !== action.payload.statusId)
        },
    }
})

export default managerSlice.reducer;
export const { setTickets, addTicket, removeTicket, removeStatus, addStatus, updateStatus, setStatuses, } = managerSlice.actions;
