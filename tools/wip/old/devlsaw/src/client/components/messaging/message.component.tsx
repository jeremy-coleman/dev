import * as React from 'react';




export const MessageComponent = ({typing_text, userIsTyping, onSendMessage}) => (
    <div className="chat-message clearfix">
        <form onSubmit={(e) => {
            e.preventDefault();
            onSendMessage();
        }}>
            <textarea name="message" id="message-to-send"
                onKeyUp={this.console.log(this)} placeholder="Type your message" rows={3}/>
            <i className="fa fa-file-o"/>
            <i className="fa fa-file-image-o"/>
            {typing_text}
            <button>Send</button>
        </form>
    </div>
);


