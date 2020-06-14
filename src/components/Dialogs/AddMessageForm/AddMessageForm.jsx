import React from 'react';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCrator, required } from '../../../utils/validators/validators';
import {Field, reduxForm} from 'redux-form';
import s from './../Dialogs.module.css';

const maxLength50 = maxLengthCrator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div className={s.textNewMessage}>
                <Field component = {Textarea} validate = {[required, maxLength50]}
                 name = 'newMessageBody' placeholder = 'Enter your message'/>
            </div>
            <div className={s.buttonNewMessage}>
                <button>Отправить</button>
            </div>
        </form>
    );
}

export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);