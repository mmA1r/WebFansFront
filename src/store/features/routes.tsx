import { createSlice } from "@reduxjs/toolkit";
import ROUTES from "../../pages/routes/routes";

interface RoutesState {
    value: any
}

const initialState: RoutesState = {
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

//export const { routes } = storeRoutes.actions; // Пока не нужны никуда
export default storeRoutes.reducer;