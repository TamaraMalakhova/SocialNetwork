import React, { useState }  from 'react';
import s from './Paginator.module.css';

type PropsType = {
    totalItemsCount: number
    pageSize: number 
    currentPage?: number 
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number 
}

let Paginator: React.FC<PropsType> = ({
    totalItemsCount, 
    pageSize, 
    currentPage=1, 
    onPageChanged= (pageNumber: number) => {}, 
    portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={s.pages}>
        {portionNumber > 1 && 
        <button className="btn btn-outline-secondary" onClick = {() => {setPortionNumber(portionNumber -1)}}>&laquo;</button>}
            {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
            .map(p => {
                return <span key = {p} className={currentPage === p ? s.selectedPage : s.pagesNumber}
                    onClick={(e) => { onPageChanged(p); }}> {p} </span>
            })}
            {portionCount > portionNumber && <button className="btn btn-outline-secondary" 
            onClick = {() => {setPortionNumber(portionNumber + 1)}} >
            &raquo;</button>}
    </div>
}

export default Paginator;