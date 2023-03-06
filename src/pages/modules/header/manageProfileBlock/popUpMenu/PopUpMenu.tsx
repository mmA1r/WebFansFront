import { FC } from "react";
import BlockType from "./blockType/BlockType";
import UserMiniView from "./userMiniView/UserMiniView";
import './popUpMenu.scss';

interface IPopUpMenu {}

const PopUpMenu: FC<IPopUpMenu> = () => {
    const settingsType: string[] = ['settings', 'logout'];
    return(
        <div className="pop-up-menu">
            <UserMiniView/>
            <BlockType blockType="settings" buttonsType={settingsType}/>
        </div>
    );
}

export default PopUpMenu;