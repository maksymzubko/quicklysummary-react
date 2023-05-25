import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Languages} from "../../../api/user/types";

export interface User {
    email: string | null,
    id: number | null,
    uuid: string | null,
    avatar: string | null,
    name: string | null
}

export interface UserState {
    isAuthorized: boolean | null,
    user: User | null,
    selectedLanguage: string,
    isMobile: boolean | null,
}

const INITIAL_STATE: UserState = {
    user: null,
    isAuthorized: false,
    selectedLanguage: "en",
    isMobile: false
};

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action: PayloadAction<{user: User | null}>) => {
            state.user = action.payload.user;
        },
        setAuthorized: (state, action: PayloadAction<{isAuthorized: boolean}>) => {
            state.isAuthorized = action.payload.isAuthorized;
        },
        setLanguage: (state, action: PayloadAction<{language: string}>) => {
            state.selectedLanguage = action.payload.language;
        },
        setIsMobile: (state, action: PayloadAction<{isMobile: boolean}>) => {
            state.isMobile = action.payload.isMobile;
        },
    }
})

export default userSlice.reducer;
export const { setUser, setAuthorized, setLanguage, setIsMobile } = userSlice.actions;
