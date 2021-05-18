import React from 'react';
import s from './Settings.module.css';

type PropsType = {}

const Settings: React.FC<PropsType> = (props) =>{
    return (
        <div className = {s.content} >
            Settings
        </div>
    );
}

export default Settings;