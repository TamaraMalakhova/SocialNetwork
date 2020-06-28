import React from 'react';
import s from './../Dialogs.module.css';


const Message = (props) => {

    return (
        <div className={s.message}>
            <div className={props.from === 'me' ? s.myMessage : s.otherUserMessage}>
                <div className="badge badge-secondary"> {props.from}: </div>
                <div>{props.message}</div>
            </div>
        </div>);
}

export default Message;