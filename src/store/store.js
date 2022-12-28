import { configureStore } from "@reduxjs/toolkit";
import { territorySlice } from "./territory/territorySlice";


export const store = configureStore ({
    reducer:{
        territory: territorySlice.reducer
    },
})