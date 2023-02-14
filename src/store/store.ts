import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import currentTheme from "./features/theme";
//import server from "./features/server";
import storeRoutes from "./features/routes";
import currentSlide from "./features/currentSlide";

const rootReducer = combineReducers({
    storeRoutes,
    currentSlide
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
