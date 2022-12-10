import { configureStore } from "@reduxjs/toolkit";
import global from "../reducers/global";

const store = configureStore({
  reducer:{
    global,
  }
})

// sagaMiddleware.run(rootSaga);

export default store;