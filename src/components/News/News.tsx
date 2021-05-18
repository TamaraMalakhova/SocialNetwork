import React from 'react';
import s from './News.module.css';

type PropsType = {}

const News: React.FC<PropsType> = (props) =>{
    return (
        <div className = {s.content} >
            News
        </div>
    );
}

export default News;