import { FC } from "react";
import Header from "../modules/header/Header";
import ShadowBlock from "../modules/shadowBlock/ShadowBlock";
import MessangerBlock from "./messangerBlock/MessangerBlock";
import './messangerPage.scss';

interface IMessangerPage {}

const MessangerPage: FC<IMessangerPage> = () => {

    return(
        <div className="messanger-page">
            <ShadowBlock/>
            <Header/>
            <MessangerBlock/>
        </div>
    );
}

export default MessangerPage;