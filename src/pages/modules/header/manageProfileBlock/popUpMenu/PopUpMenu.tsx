import { FC } from "react";
import BlockType from "./block/Block";
import './popUpMenu.scss';

interface IPopUpMenu {}

const PopUpMenu: FC<IPopUpMenu> = () => {
    const settingsType: string[] = ['settings', 'logout'];
    return(
        <div className="pop-up-menu">
            <div className="mini-profile-block">

            </div>
            <BlockType blockType="settings" buttonsType={settingsType}/>
        </div>
    );
}

export default PopUpMenu;