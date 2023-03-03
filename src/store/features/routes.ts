import { createSlice } from "@reduxjs/toolkit";
import ROUTES from "../../routes/routes";

interface IRoutesState {
    value: any
}

const initialState: IRoutesState = {
    value: ROUTES,
}

export const storeRoutes = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        routes: (state) => {
            state.value = ROUTES;
        }
    }
});

export default storeRoutes.reducer;