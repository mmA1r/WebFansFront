import { FC } from "react";
import BlockType from "./block/Block";
import './popUpMenu.scss';

interface IPopUpMenu {}

const PopUpMenu: FC<IPopUpMenu> = () => {
    const prfileActionsType: string[] = ['smth', 'smth2', 'smth3'];
    const settingsType: string[] = ['settings', 'logout'];
    return(
        <div className="pop-up-menu">
            <BlockType blockType="mini-profile" buttonsType={[]}/>
            <BlockType blockType="profile-actions" buttonsType={prfileActionsType}/>
            <BlockType blockType="settings" buttonsType={settingsType}/>
        </div>
    );
}

export default PopUpMenu;