import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import LoginPage from './pages/loginPage/LoginPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import MainPage from './pages/mainPage/MainPage';
import MessangerPage from './pages/messangerPage/MessangerPage';
import SettingsPage from './pages/settingsPage/SettingsPage';

import './app.scss';
import ShadowBlock from './pages/modules/shadowBlock/ShadowBlock';
import Header from './pages/modules/header/Header';
import ProfileSettingsWrapper from './pages/settingsPage/settingsBlock/ProfileSettingsWrapper';

export default function App() {
    const routes = useAppSelector(state => state.storeRoutes.value);

    return (
        <div className="app">
            <Routes>
                <Route 
                    path={routes.main.path}
                    element={<LoginPage/>}
                />
                <Route 
                    path={routes.login.path}
                    element={<LoginPage/>}
                />
                <Route 
                    path={routes.content.path}
                    element={<MainPage/>}
                />
                <Route 
                    path={routes.messanger.path}
                    element={<MessangerPage/>}
                />
                <Route 
                    path={'/settings'}
                    element={<SettingsPage/>}
                >
                    <Route 
                        path={'profile'}
                        element={<ProfileSettingsWrapper/>}
                    />
                    <Route 
                        path={'location'}
                        element={<ProfileSettingsWrapper/>}
                    />
                </Route>
                <Route 
                    path={routes.notFound.path}
                    element={<NotFoundPage/>}
                />
            </Routes>
        </div>
    );
}