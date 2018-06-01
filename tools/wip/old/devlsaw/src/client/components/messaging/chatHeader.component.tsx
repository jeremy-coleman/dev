import * as React from 'react';


export const ChatHeaderComponent = ({room}) => (
    <div className="chat-header clearfix">
<img src={room.photoURL} alt="avatar"/>
        
<div className="chat-about">
<div className="chat-with">{room.displayName}</div>
<div className="chat-with">{room.name}</div>
            
        </div>
        <i className="fa fa-star" />
    </div>
);


