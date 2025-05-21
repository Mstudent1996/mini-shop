import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span>
        Side {currentPage} af {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
