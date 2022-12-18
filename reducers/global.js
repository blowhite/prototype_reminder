import { createSlice } from "@reduxjs/toolkit";

const name = 'global';
const initialState = {
  scheduleItem: [],
};

const globalSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAddSchduleItem(state, action) {
      state.scheduleItem.push(action.payload);
    },
    setClearSchduleItem(state) {
      state.scheduleItem = [];
    }
  }
});

export const {
  setAddSchduleItem, setClearSchduleItem
} = globalSlice.actions;

export default globalSlice.reducer;