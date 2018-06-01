import * as React from 'react';


export const ChatHistoryComponent = ({
    loading,
    messages
}) => (
    <div className="chat-history">
        <div className = {loading ? 'loading chat-loading' : 'chat-loading'}>
            <div className='preloader'>
                <i>.</i>
                <i>.</i>
                <i>.</i>
            </div>
        </div>
        <ul>
            {
                messages.map((message) =>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">{message.updatedAt}</span>
                            <span className="message-data-name">{message.displayName}</span>
                            <div className="message-data-image"
                                 style={{backgroundImage: 'url(' + message.photoURL + ')'}} />
                        </div>
                        <div className="message other-message">
                            {message.message}
                        </div>
                    </li>
                )
            }
        </ul>
    </div>
);


