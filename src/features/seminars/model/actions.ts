import {createAsyncThunk} from "@reduxjs/toolkit";
import {seminarsAPI} from "../api";
import {ISeminar} from "../../../models/ISeminar";
import {thunkHandlers} from "../../../store/thunkHandlers";
import {AppDispatch} from "../../../store";

const messages = {
    getSeminars: {error: "Не удалось получить семинары."},
    updateSeminar: {error: "Не удалось обновить семинар.", success: "Семинар успешно обновлён."},
    deleteSeminar: {error: "Не удалось удалить семинар.", success: "Семинар успешно удалён."},
};

type ThunkConfig = {
    dispatch: AppDispatch;
    rejectValue: string;
}

export const fetchGetSeminars = createAsyncThunk<ISeminar[], void, ThunkConfig>(
    "seminars/fetchGetSeminars",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            return await seminarsAPI.getAll();
        } catch (e) {
            return rejectWithValue(thunkHandlers.error(e, messages.getSeminars.error, dispatch));
        }
    }
);

export const fetchUpdateSeminar = createAsyncThunk<ISeminar, ISeminar, ThunkConfig>(
    "seminars/fetchUpdateSeminar",
    async (updatedSeminar, {dispatch, rejectWithValue}) => {
        try {
            const res = await seminarsAPI.update(updatedSeminar);
            thunkHandlers.success(messages.updateSeminar.success, dispatch);
            return res;
        } catch (e) {
            return rejectWithValue(thunkHandlers.error(e,messages.updateSeminar.error, dispatch));
        }
    }
);

export const fetchDeleteSeminar = createAsyncThunk<number, number, ThunkConfig>(
    "seminars/fetchDeleteSeminar",
    async (seminarId, {dispatch, rejectWithValue}) => {
        try {
            const res = await seminarsAPI.delete(seminarId);
            thunkHandlers.success(messages.deleteSeminar.success, dispatch);
            return res.id;
        } catch (e) {
            return rejectWithValue(thunkHandlers.error(e, messages.deleteSeminar.error, dispatch));
        }
    }
);
