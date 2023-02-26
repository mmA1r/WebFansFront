import { FC, useState, useEffect } from "react";
import server from "../../../../services/server/Server";
import './messagesWrapper.scss';

interface IMessagesWrapper {}

const MessagesWrapper: FC<IMessagesWrapper> = () => {
    const [messages, setMessages]:any = useState([]);

    useEffect(() => {
        const getMessagesInterval: NodeJS.Timer = setInterval(() => {
            getMessages();
        }, 600);

        return () => clearInterval(getMessagesInterval);
    });

    async function getMessages() {
        const newMessages = await server.getMessages();
        if(newMessages) {
            console.log(messages)
            if(newMessages.length !== messages.length) {
                return setMessages(newMessages.reverse());
            }
        }
    }

    return(
        <div className="messages-wrapper">
            {
                messages.map((message:any) => {
                    return(
                        <p key={message.id} className="message-line">
                            {`${message.senderName}: ${message.message}`}
                        </p>
                    )
                })
            }
        </div>
    );
}

export default MessagesWrapper;