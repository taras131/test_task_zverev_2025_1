import {RootState} from "../../../store";
import {ISeminar} from "../../../models/ISeminar";
import {createSelector} from "@reduxjs/toolkit";

const selectSeminarsState = (state: RootState) => state.seminars;

export const selectSeminarsIsLoading = createSelector(
    [selectSeminarsState],
    (seminarsState) => seminarsState.isLoading
);

export const selectSeminars = createSelector(
    [selectSeminarsState],
    (seminarsState) => seminarsState.list
);

export const selectSeminarById = (seminarId: number | null) =>
    createSelector([selectSeminars], (seminars): ISeminar | null =>
        seminarId ? seminars.find(seminar => seminar.id === seminarId) ?? null : null
    );