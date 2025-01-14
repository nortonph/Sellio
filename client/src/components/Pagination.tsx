function Pagination ({currentPage, totalPages, handlePageChange}) {
  return (
    <div className="pagination flex justify-center gap-4 mt-4">
      <button 
      onClick={() => handlePageChange(currentPage - 1)} 
      disabled={currentPage === 1}
      className={`text-gray-800 ${currentPage === 1 ? 'text-gray-300': '' }`}
      >
        Previous
      </button>
      
      <span> {currentPage} / {totalPages}</span>
      
      <button 
      onClick={() => handlePageChange(currentPage + 1)} 
      disabled={currentPage === totalPages}
      className={`text-gray-800 ${currentPage === totalPages ? 'text-gray-300': '' }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;