import { combineReducers,configureStore } from "@reduxjs/toolkit";
import notesSlice from "./slice";


const reducer = combineReducers({
  notes: notesSlice,
});

const store = configureStore({
  reducer: reducer
});

export default store;
