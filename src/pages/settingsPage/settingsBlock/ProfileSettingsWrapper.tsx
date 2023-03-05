import { FC } from 'react';
import ProfileImage from './profileImage/ProfileImage';
import SettingName from './settingName/SettingName';
import SettingsList from './settingsList/SettingsList';
import SettingsValues from './settingValues/SettingsValues';

import './profileSettingsWrapper.scss';

interface IProfileSettingsWrapper {}

const ProfileSettingsWrapper: FC<IProfileSettingsWrapper> = () => {

    return(
        <div className="profile-settings-wrapper">
            <ProfileImage/>
            <SettingName/>
            <SettingsList/>
            <SettingsValues/>
        </div>
    );
}

export default ProfileSettingsWrapper;