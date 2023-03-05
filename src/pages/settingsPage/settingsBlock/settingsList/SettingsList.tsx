import { FC } from "react";
import SettingButton from "./settingButton/SettingButton";
import './settingsList.scss';

interface ISettingsList {}

const SettingsList: FC<ISettingsList> = () => {
    return(
        <div className="settings-list">
            <SettingButton buttonType={1}/>
            <SettingButton buttonType={2}/>
        </div>
    );
}

export default SettingsList;