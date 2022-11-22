import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";

const Store = configureStore({
    reducer: {
        data: DataSlice
    }
});

export default Store;