export default function Pagination({ currentPage, totalPages, onPageChange, translations }) {

    const handlePreviousPage = () => {
        onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-between px-4 mt-4">
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="inline-flex items-center px-4 py-2 bg-sky-500 dark:bg-sky-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sky-600 dark:hover:bg-sky-300 focus:bg-sky-600 dark:focus:bg-sky-300 active:bg-sky-900 dark:active:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-sky-600 transition ease-in-out duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
            >
                {translations.previousButton}
            </button>
            <span className="text-gray-900 dark:text-white transition ease-in-out duration-150">
                {currentPage} {translations.pagination} {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-4 py-2 bg-sky-500 dark:bg-sky-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sky-600 dark:hover:bg-sky-300 focus:bg-sky-600 dark:focus:bg-sky-300 active:bg-sky-900 dark:active:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-sky-600 transition ease-in-out duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
            >
                {translations.nextButton}
            </button>
        </div>
    );
}