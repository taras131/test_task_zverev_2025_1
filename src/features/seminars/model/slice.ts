import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISeminar} from "../../../models/ISeminar";
import {fetchDeleteSeminar, fetchGetSeminars, fetchUpdateSeminar} from "./actions";


export interface ISeminarsState {
    errorMessage: string;
    isLoading: boolean;
    list: ISeminar [];
}

const initialState: ISeminarsState = {
    errorMessage: "",
    isLoading: false,
    list: [],
};

const handlePending = (state: ISeminarsState) => {
    state.isLoading = true;
};

const handleRejected = (state: ISeminarsState) => {
    state.isLoading = false;
};

export const SeminarsSlice = createSlice({
    name: "seminars",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetSeminars.fulfilled, (state, action: PayloadAction<ISeminar []>) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchUpdateSeminar.fulfilled, (state, action: PayloadAction<ISeminar>) => {
                state.list = state.list.map(seminar => {
                    if (seminar.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return seminar;
                    }
                });
                state.isLoading = false;
            })
            .addCase(fetchDeleteSeminar.fulfilled, (state, action: PayloadAction<number>) => {
                state.list = state.list.filter(seminar => seminar.id !== action.payload);
                state.isLoading = false;
            })
            // общее действия для состояний pending и rejected
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                handlePending
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                handleRejected
            );
    },
});

export default SeminarsSlice.reducer;