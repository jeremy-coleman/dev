import * as React from 'react';


export const ConversationsComponent = ({conversation, onSelectConversation}) => (
    <li className="clearfix d-flex" onClick={() => {onSelectConversation(conversation)}}>
        <div>
            <img src={conversation.photoURL} alt="avatar" width="32"/>
        </div>
        <div className="about">
            <div className="name">{conversation.displayName}</div>
            <div className="status">
                <i className={ conversation.status === 'online' ? 'fa fa-circle online' : 'fa fa-circle offline' } />
                {conversation.notifications !== 0 ? <i className="msgCount">{conversation.notifications}</i> : ''}
                { conversation.status !== 'online' ? <span >{conversation.lastSeen }</span> : '' }
            </div>
        </div>
    </li>
);

