import { Outlet } from 'react-router-dom'; 
import { FC } from 'react';
import Header from '../modules/header/Header';
import ShadowBlock from '../modules/shadowBlock/ShadowBlock';
import ProfileSettingsWrapper from './settingsBlock/ProfileSettingsWrapper';

import './settingsPage.scss';

interface ISettingsPage {};

const SettingsPage: FC<ISettingsPage> = () => {
    return(
        <div className="settings-page">
            <ShadowBlock/>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default SettingsPage;