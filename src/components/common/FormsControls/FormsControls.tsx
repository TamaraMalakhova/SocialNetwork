import React from 'react';
import styles from './FormsControls.module.css';
import { Field, WrappedFieldMetaProps } from 'redux-form';
import { ValidatorType } from '../../../utils/validators/validators';

type FormControlType = (params: FormControlPropsType) => React.ReactNode

type FormControlPropsType = {
    meta: WrappedFieldMetaProps,
    input: any
}

const Element = (Element: string): FormControlType => ({ input, meta: {touched , error}, ...props }) => {

    const hasError = touched && error;

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                <Element {...input} {...props} />
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}

export const Textarea = Element('textarea');

export const Input = Element('input');

export function createField<FormKeysType extends string>(placeholder: string | undefined,  
                            name: FormKeysType, 
                            validators: Array<ValidatorType>, 
                            component: FormControlType, 
                            props = {},
                            text = ''
                            ) {
    return (
        <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} /> {text}
        </div>
    )  
}

export type GetStringKeys<T> = Extract<keyof T, string>