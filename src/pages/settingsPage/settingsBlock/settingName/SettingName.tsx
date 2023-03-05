import { FC } from "react";
import './settingName.scss';

interface ISettingName {}

const SettingName: FC<ISettingName> = () => {
    return(
        <div className="setting-name-wrapper">
            <div className="setting-name">
                Setting name
            </div>
            <div className="setting-name-description">
                setting name description
            </div>
        </div>
    );
}

export default SettingName;