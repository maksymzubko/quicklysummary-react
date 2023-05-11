import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface User {
    email: string | null,
    id: number | null,
    uuid: string | null,
}

export interface UserState {
    isAuthorized: boolean | null,
    user: User | null
}

const INITIAL_STATE: UserState = {
    user: null,
    isAuthorized: false
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
    }
})

export default userSlice.reducer;
export const { setUser, setAuthorized } = userSlice.actions;
