import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import currentSlide from "./features/currentSlide";
//import currentTheme from "./features/theme";
//import server from "./features/server";
import storeRoutes from "./features/routes";

const rootReducer = combineReducers({
    storeRoutes
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false,
        })
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore  = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
