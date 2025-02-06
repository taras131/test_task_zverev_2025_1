import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import SeminarsReducer from "features/seminars/model/slice";
import MessageReducer from "features/message/model/slice";

const rootReducer = combineReducers({
  seminars: SeminarsReducer,
  message: MessageReducer,

});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
