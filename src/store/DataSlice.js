import {createSlice} from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {
        addItem (state, action) {
            return state = action.payload;
        },
        removeItem () {},
        updateItem () {},
    }
});

export const {addItem, removeItem, updateItem} = DataSlice.actions;
export default DataSlice.reducer;
