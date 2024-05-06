import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  body:[],
  value:'Todo',
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {

    initialBody: (state,action)=>{
        state.body=action.payload;
    },
    setBody: (state, action) => {
      state.body = [...state.body,action.payload];
    },
    deleteBody:(state,action)=>{
        state.body = state.body.filter(note=> note._id !== action.payload);
    },
    changeBody: (state, action) => {
      state.body = state.body.filter(note => String(note._id) !== String(action.payload.id));
    },
    changeTodo:(state,action)=>{
      state.value=action.payload;
    }
  
  
  }
});

export const { initialBody,setBody,deleteBody,changeBody,changeTodo } = notesSlice.actions;

export default notesSlice.reducer;
