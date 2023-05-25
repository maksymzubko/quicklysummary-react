import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { UserState} from './slice';

export const selectDomain = (state: RootState) => {
    return state.user;
};

export const SelectUser = createSelector(
    [selectDomain],
    (userState: UserState) => userState.user,
);

export const SelectIsAuthorized = createSelector(
    [selectDomain],
    (userState: UserState) => userState.isAuthorized,
);

export const SelectLanguage = createSelector(
    [selectDomain],
    (userState: UserState) => userState.selectedLanguage,
);

export const SelectIsMobile = createSelector(
    [selectDomain],
    (userState: UserState) => userState.isMobile,
);