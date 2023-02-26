import { FC } from 'react';
import PrivateMessagesChooser from './privateMessagesChooser/PrivateMessagesChooser';
import MessagesSenderBlock from './messagesSenderBlock/MessagesSenderBlock';
import MessagesWrapper from './messagesWrapper/MessagesWrapper';
import './messangerBlock.scss';

interface IMessangerBlock {}

const MessangerBlock: FC<IMessangerBlock> = () => {
    return(
        <div className="messanger-block">
            <PrivateMessagesChooser/>
            <div className="chat-wrapper">
                <MessagesWrapper/>
                <MessagesSenderBlock/>
            </div>
        </div>
    );
}

export default MessangerBlock;