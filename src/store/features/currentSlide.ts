import { createSlice } from "@reduxjs/toolkit";

interface ISlideNumber {
    value: number
}

const initialState: ISlideNumber = {
    value: 0,
}

export const currentSLide = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        changeSide: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { changeSide } = currentSLide.actions;
export default currentSLide.reducer;