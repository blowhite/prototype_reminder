import { createSlice } from "@reduxjs/toolkit";

const name = 'global';
const initialState = {
  checkStatus: {
    dataBase: false,
  }
};

const globalSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCheckStatusDB(state) {
      state.checkStatus.dataBase = true;
    },
    setCheckAgain(state) {
      state.checkStatus.dataBase = false;
    }
  }
});

export const {
  setCheckStatusDB, setCheckAgain,
} = globalSlice.actions;

export default globalSlice.reducer;