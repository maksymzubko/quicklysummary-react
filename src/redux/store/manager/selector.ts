import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import {Manager} from "./slice";

export const selectDomain = (state: RootState) => {
    return state.manager;
};

export const SelectTickets = createSelector(
    [selectDomain],
    (managerState: Manager) => managerState.tickets,
);

export const SelectStatuses = createSelector(
    [selectDomain],
    (managerState: Manager) => managerState.statuses,
);