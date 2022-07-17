import React, { FC, useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  numberOfPages : number;
  setPageNumber : (pageNumber : number) => void
}
let list : number[] = [];
const Pagination: FC<PaginationProps> = (props : PaginationProps) => {

  const [pageNo, setPageNo] = useState<number>(1);
  const [list, setList] = useState<number[]>([]);
  

  useEffect(() => {

    const tempList : number[] = [];

    for(let i = 0; i < (props.numberOfPages as number); i++) { 
      tempList.push(i);
    }
    setList(tempList);
  }, [])

  useEffect(() => {

    
    props.setPageNumber(pageNo);
  }, [pageNo])

  
  return(
  <div className={styles.Pagination}>
    <table>
      <tbody>
        <tr>{list.map((value, index) => 
          <td 
            onClick={() => setPageNo(value+1)} 
            key={index}
            className={value +1 === pageNo ? styles.selectedPageNumber : ''} >
            {value+1}
          </td>)}
        </tr>
      </tbody>
    </table>
  </div>
  )
  };

export default React.memo(Pagination);
