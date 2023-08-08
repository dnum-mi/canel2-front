import React, { Component } from 'react';


class Pagination extends Component {
  handlePageChange = (number) => {
    this.props.handlePageChange(number);
  };

  render() {
    const { totalItems, itemsPerPage, currentPage } = this.props;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxPagesToShow = 5;



    const createPageRange = (start, end) => {
      const range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    };

    let pageNumbers;
    if (totalPages <= maxPagesToShow) {
      pageNumbers = createPageRange(1, totalPages);
    } else {
      const pagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const pagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
      const startPage = Math.max(1, currentPage - pagesBeforeCurrentPage);
      const endPage = Math.min(totalPages, currentPage + pagesAfterCurrentPage);
      pageNumbers = createPageRange(startPage, endPage);
     
    }

    const renderPageNumbers = pageNumbers ? pageNumbers.map((number, index) => {
      if (index === 0 && number !== 1) {
        return (
          <li key="start-ellipsis">
            <span className="fr-pagination__link fr-pagination__link--ellipsis">...</span>
          </li>
        );
      } else if (index === pageNumbers.length - 1 && number !== totalPages) {
        return (
          <li key="end-ellipsis">
            <span className="fr-pagination__link fr-pagination__link--ellipsis">...</span>
          </li>
        );
      } else {
        return (
          <li key={number} className={currentPage === number ? 'active' : null}>
            <button onClick={() => this.handlePageChange(number)} className="fr-pagination__link">
              {number}
            </button>
          </li>
        );
      }
    }) : null;

    return (
      <div>
        <nav role="navigation" className="fr-pagination" aria-label="Pagination">
          <ul className="fr-pagination__list">
            <li>
              <button
                className="fr-pagination__link fr-pagination__link--first"
                aria-disabled={currentPage === 1}
                role="link"
                onClick={() => this.handlePageChange(1)}
              >
                Première page
              </button>
            </li>
            <li>
              <button
                className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
                aria-disabled={currentPage === 1}
                role="link"
                onClick={() => this.handlePageChange(currentPage - 1)}
              >
                Page précédente
              </button>
            </li>
            {renderPageNumbers}
            {totalPages}
            <li>
              <button
                className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
                aria-disabled={currentPage === totalPages}
                role="link"
                onClick={() => this.handlePageChange(currentPage + 1)}
              >
                Page suivante
              </button>
            </li>
            
            <li>
              <button
              className="fr-pagination__link fr-pagination__link--last"
              aria-disabled={currentPage === totalPages}
              role="link"
              onClick={() => this.handlePageChange(totalPages)}
            >
              Dernière page
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
  }
  }
  
  export default Pagination;