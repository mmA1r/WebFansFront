import { FC } from 'react';
import ProfileImage from './profileImage/ProfileImage';
import SettingName from './settingName/SettingName';
import SettingsList from './settingsList/SettingsList';
import SettingsValues from './settingValues/SettingsValues';

import './profileSettingsWrapper.scss';

interface IProfileSettingsWrapper {
    settingType: number;
        // 1 - profile general
        // 2 - location
}

const ProfileSettingsWrapper: FC<IProfileSettingsWrapper> = ({ settingType }) => {
    return(
        <div className="profile-settings-wrapper">
            <ProfileImage/>
            <SettingName settingType={settingType}/>
            <SettingsList/>
            <SettingsValues settingType={settingType}/>
        </div>
    );
}

export default ProfileSettingsWrapper;