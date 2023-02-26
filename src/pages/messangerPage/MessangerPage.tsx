import { FC } from "react";
import Header from "../modules/header/Header";
import MessangerBlock from "./messangerBlock/MessangerBlock";
import './messangerPage.scss';

interface IMessangerPage {}

const MessangerPage: FC<IMessangerPage> = () => {

    return(
        <div className="messanger-page">
            <Header/>
            <MessangerBlock/>
        </div>
    );
}

export default MessangerPage;