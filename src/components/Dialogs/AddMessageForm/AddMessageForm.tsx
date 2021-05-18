import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';

import { createField, Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCrator, required } from '../../../utils/validators/validators';
import s from './../Dialogs.module.css';
import { NewMessageFormValuesType } from '../Dialogs'

const maxLength50 = maxLengthCrator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> 
    = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div className={s.textNewMessage}>
            {createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div className={s.buttonNewMessage}>
                <button>Отправить</button>
            </div>
        </form>
    );
}

export default reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm);