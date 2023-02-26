import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import LoginPage from './pages/loginPage/LoginPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import MainPage from './pages/mainPage/MainPage';
import MessangerPage from './pages/messangerPage/MessangerPage';

import './app.scss';

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
                    path={routes.notFound.path}
                    element={<NotFoundPage/>}
                />
            </Routes>
        </div>
    );
}