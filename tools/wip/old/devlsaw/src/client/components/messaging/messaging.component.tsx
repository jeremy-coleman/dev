import * as React from 'react';
import {ConversationsComponent} from './conversations.component';
import {GroupsComponent} from './groups.component';
import {ChatComponent} from './chat.component';



export class MessagingComponent extends React.Component<any, any> {

    onConversationScroll = (event) => {
        let srcElement = event.srcElement;
        if (srcElement.scrollHeight - srcElement.clientHeight === srcElement.scrollTop) {
            this.props.onScroll();
        }
    };

    onSelectConversation(room) {
        this.props.joinRoom.emit({room: room});
    };

    groupMembers = () => {
        this.props.getGroupMembers();
    };

    render() {
        return (
            <div
                className={(this.props.conversations[0] && this.props.groups[0]) ? 'row messaging' : ' row messaging noConversation'}>
                <div className="people-list" id="people-list">
                    <div className="search">
                        <input placeholder="search"/>
                        <i className="fa fa-search"/>
                    </div>
                    <div className="noPeople">
                        No Conversations
                    </div>
                    <p>Direct Messages</p>
                    <ul className="list" onScroll={(e) => {
                        this.onConversationScroll(e)
                    }}>
                        {
                            this.props.conversations.map((conversation) =>
                                <ConversationsComponent
                                    key={conversation._id}
                                    conversation={conversation}
                                    onSelectConversation={this.onSelectConversation}
                                />
                            )
                        }
                    </ul>
                    <p>Channels</p>
                    <p onClick={(e) => {
                        this.groupMembers()
                    }}>See Group Members</p>
                    <ul onScroll={(e) => {
                        this.onConversationScroll(e)
                    }}>
                        {
                            this.props.groups.map((group) =>
                                <GroupsComponent
                                    key={group._id}
                                    group={group}
                                    onSelectConversation={this.onSelectConversation}
                                />
                            )
                        }
                    </ul>
                </div>
                <ChatComponent
                    room={this.props.room}
                    loading={this.props.loading}
                    messages={this.props.messages}
                    typing_text={this.props.typing_text}
                    groups={this.props.groups}
                    conversations={this.props.conversations}
                />
                <div className="profile-info">

                </div>
            </div>
        )
    }
}



