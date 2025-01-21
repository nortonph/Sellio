import { useState } from "react";

type Props = {
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}

function Pagination ({totalPages, handlePageChange}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handlePageChange(nextPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      handlePageChange(prevPage);
    }
  };


  return (
    <div className="pagination flex justify-center gap-4 mt-4">
      
      <button 
      onClick={handlePrev} 
      disabled={currentPage === 1}
      className={`text-gray-800 ${currentPage === 1 ? 'text-gray-300': '' }`}
      >
        Previous
      </button>
      
      <span> {currentPage} / {totalPages}</span>
      
      <button 
      onClick={handleNext} 
      disabled={currentPage === totalPages}
      className={`text-gray-800 ${currentPage === totalPages ? 'text-gray-300': '' }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;