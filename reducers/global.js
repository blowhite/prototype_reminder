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
    }
  }
});

export const {
  setAddSchduleItem
} = globalSlice.actions;

export default globalSlice.reducer;