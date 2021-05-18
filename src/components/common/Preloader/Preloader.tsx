import React from 'react';
import preloader from '../../../assets/images/preloader.svg';

type PropsType = {}

let Preloader: React.FC<PropsType> = (props) => {
    return <img src={preloader} alt =''/>
}

export default Preloader;