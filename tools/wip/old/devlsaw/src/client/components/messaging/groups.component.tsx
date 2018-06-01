import * as React from 'react';


export const GroupsComponent = ({group, onSelectConversation}) => (
    <li className="clearfix d-flex" onClick={() => {onSelectConversation(group)}}>
        <div className="about">
            <div className="name">{group.name}</div>
 <i className="msgCount">{group.notifications}</i>
            
        </div>
    </li>
);

