import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDEL: "idel",
    ERROR: "error",
    LOADING: "loading",
});

const ApiFetch = createSlice({
    name: "fetchData",
    initialState: {
        data: [],
        status: STATUSES.IDEL
    },
    reducers: {
        addData(state, action) {
            return state.data = action.payload;
        },
        setStatus(state, action) {
            return state.status = action.payload;
        }
    }
});

export const { addData, setStatus } = ApiFetch.actions;
export default ApiFetch.reducer;

export function fetchProduct() {
    return async function fetchProductData(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch("api name");
            const convert = await res.json();
            dispatch(addData(convert));
            dispatch(setStatus(STATUSES.IDEL));
        }
        catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
};