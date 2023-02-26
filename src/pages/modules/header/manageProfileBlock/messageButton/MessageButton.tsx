import { FC } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useAppSelector } from "../../../../../hooks/redux";
import MessageIcon from "./messageIcon/MessageIcon";

import './messageButton.scss';

interface IMessageButton {}

const MessageButton: FC<IMessageButton> = () => {
    const navigte: NavigateFunction = useNavigate();
    const routes = useAppSelector(state => state.storeRoutes.value);
    function routeToChat(): void {
        return navigte(routes.messanger.path);
    }

    return(
        <button
            onClick={routeToChat}
            className="message-button"
        >
            <MessageIcon/>
        </button>
    );
}

export default MessageButton;