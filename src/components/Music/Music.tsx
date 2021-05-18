import React from 'react';
import s from './Music.module.css';

type PropsType = {}

const Music: React.FC<PropsType> = (props) =>{
    return (
        <div className = {s.content} >
            Music
        </div>
    );
}

export default Music;