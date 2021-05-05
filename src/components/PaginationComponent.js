import React from 'react';
import '../styles/PaginationComponent.css'

const PaginationComponent = ({ currentPage, postsPerPage, totalPosts, paginate, firstPage=1 }) => {

  currentPage = parseInt(currentPage);
  postsPerPage = parseInt(postsPerPage);

  const pageNumbers = [];

  if (firstPage === 0){
    for (let i = firstPage; i <= Math.ceil(totalPosts / postsPerPage) - 1 ; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = firstPage; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  }


  return (
      <div className="pagination">
        {currentPage>1 ? (
            <button onClick={() => paginate(currentPage-1)}>&laquo;</button>
        ) : (<></>) }
        {pageNumbers.map(number => {
          if (number === currentPage){
            return (
                <button key={number} onClick={() => paginate(number)} className={"active"}>
                  {number}
                </button>
            )
          }
          return (

              <button key={number} onClick={() => paginate(number)}>
                {number}
              </button>
          )
        })}
        {currentPage!==pageNumbers.length ? (
             <button onClick={() => paginate(currentPage+1)}>&raquo;</button>
        ) : (<></>) }

      </div>
  );
};

export default PaginationComponent;
