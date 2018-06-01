import * as React from 'react';
import {ChatHeaderComponent} from './chatHeader.component';
import {ChatHistoryComponent} from './chatHistory.component';
import {MessageComponent} from './message.component';




export const ChatComponent = ({room, loading, messages, typing_text, conversations, groups}) => (
    <div className="chat">
        <ChatHeaderComponent room={room} />
        <ChatHistoryComponent
            loading={loading}
            messages={messages}
        />

                <MessageComponent
                    onSendMessage
                    userIsTyping
                    typing_text={typing_text}
                />

        
    </div>
);

