import { FC, useState, useEffect } from "react";
import server from "../../../../services/server/Server";
import './messagesWrapper.scss';

interface IMessagesWrapper {}

const MessagesWrapper: FC<IMessagesWrapper> = () => {
    const [messages, setMessages]:any = useState([]);

    useEffect(() => {
        const getMessagesInterval: NodeJS.Timer = setInterval(() => {
            return getMessages();
        }, 400);

        return () => {
            clearInterval(getMessagesInterval);
            clearChatHash();
        };
    });

    async function clearChatHash() {
        return await server.zeroingChatHash();
    }

    async function getMessages() {
        const allMessages = await server.getMessages();
        if(allMessages) {
            if(allMessages.length !== messages.length) {
                const user = await server.getUser();
                const newMessages = allMessages.map(message => {
                    message.senderId === user.id ? message.self = true : message.self = false;
                    return message;
                });
                return setMessages(newMessages.reverse());
            }
        }
    }

    return(
        <div className="messages-wrapper">
            {
                messages.map((message:any) => {
                    return(
                        <div
                            key={message.id} 
                            className={`message-item ${ message.self ? 'your-message' : ''}`}
                        >
                            <div className={`message-image`}></div>
                            <div className="message-block">
                                <p className="message-line">
                                    {`${message.message.join("\r\n")}`}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MessagesWrapper;