import './Pagination.scss';

const Pagination = ({pageSize, currentPage, setPageHandler }) => {
  const pageNumber = [];

  for (let i = 1;i <= Math.ceil(pageSize / process.env.REACT_APP_PAGE_SIZE);i++) {
    pageNumber.push(i);
  }

  const paginationHandler = (pageNumber) => {
    setPageHandler(pageNumber);
  };

  return (
    <ul className="pagination">
      {pageNumber.map((page, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              paginationHandler(page);
            }}
            className={`${currentPage === page ? "active" : ""}`}
          >
            {page}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
