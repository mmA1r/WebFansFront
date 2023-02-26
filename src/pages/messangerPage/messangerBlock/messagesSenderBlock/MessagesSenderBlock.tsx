import { FC, useRef } from "react";
import './messagesSenderBlock.scss';
import server from "../../../../services/server/Server";

interface IMessagesSenderBlock {}

const MessagesSenderBlock: FC<IMessagesSenderBlock> = () => {
    const messageSenderRef:any = useRef();

    async function sendMessage() {
        const message = messageSenderRef.current.value;
        const user = await server.getUser();
        await server.sendGeneralMessage(message, user.id);
    }

    return(
        <div className="messages-sender-block">
            <div className="send-messages-input-wrapper">
                <input 
                    className="send-messages-input"
                    ref={messageSenderRef}
                />
            </div>
            <button 
                className="send-message-button"
                onClick={sendMessage}
            >Click!</button>
        </div>
    );
}

export default MessagesSenderBlock;