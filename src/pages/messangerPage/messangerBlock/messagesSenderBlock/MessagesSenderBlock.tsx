import { FC, useRef } from "react";
import { gsap } from "gsap";
import './messagesSenderBlock.scss';
import server from "../../../../services/server/Server";

interface IMessagesSenderBlock {}

type DivElem = HTMLDivElement | null;

const MessagesSenderBlock: FC<IMessagesSenderBlock> = () => {
    const messageSenderRef:any = useRef();

    function sendMessage() {
        const messageStr: string = messageSenderRef.current.value;
        const messagesArr: string[] = messageStr.split(/[\r\n]/).filter((elem: string) => elem !== '');
        const messageArr: any = messagesArr.map((message: string) => {
            return message.split(/[\s]/).filter((elem: string) => elem !== '').join(' ');
        })
        const messages = messageArr.filter((elem: string) => elem !== '');
        if(messages[0]) {
            send(messages);
        }
        return messageSenderRef.current.value = '';
    }

    async function send(message: string[]) {
        const user = await server.getUser();
        await server.sendPublicMessage(message, user.id);
    }

    function enterSend(e: any):void {
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            const message: string = messageSenderRef.current.value;
            if(message !== '') {
                const loginButton: DivElem = document.querySelector('.send-message-button');
                gsap.set('.send-messages-input-wrapper', {
                    height: 30,
                });
                return loginButton?.click();
            }
        } else if(e.keyCode === 13 && e.shiftKey) {
            gsap.set('.send-messages-input-wrapper', {
                height: 60,
            });
        }
    }

    return(
        <div className="messages-sender-block">
            <div className="send-messages-input-wrapper">
                <textarea
                    className="send-messages-input"
                    ref={messageSenderRef}
                    onKeyDown={enterSend}
                />
            </div>
            <button 
                className="send-message-button"
                onClick={sendMessage}
            >Send</button>
        </div>
    );
}

export default MessagesSenderBlock;