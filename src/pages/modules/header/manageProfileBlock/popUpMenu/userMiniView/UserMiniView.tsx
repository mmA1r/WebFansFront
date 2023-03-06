import { FC } from "react";
import ThemeChangerButton from "../../../../themeChangeButton/ThemeChangeButton";

import './userMiniView.scss';

interface IUserMiniView {};

const UserMiniView: FC<IUserMiniView> = () => {
    return(
        <div className="user-mini-view">
            <div className="change-theme-button-main-page">
                <ThemeChangerButton/>
            </div>
        </div>
    );
}

export default UserMiniView;