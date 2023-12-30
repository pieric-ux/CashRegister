import { useTranslation } from 'react-i18next';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const { t } = useTranslation();
    const handlePreviousPage = () => {
        onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className='mt-4 flex items-center justify-between px-4'>
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-25 dark:bg-sky-400 dark:hover:bg-sky-300 dark:focus:bg-sky-300 dark:focus:ring-offset-sky-600 dark:active:bg-sky-200'
            >
                {t('Previous')}
            </button>
            <span className='text-gray-900 transition duration-150 ease-in-out dark:text-white'>
                {currentPage} {t('of')} {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-25 dark:bg-sky-400 dark:hover:bg-sky-300 dark:focus:bg-sky-300 dark:focus:ring-offset-sky-600 dark:active:bg-sky-200'
            >
                {t('Next')}
            </button>
        </div>
    );
}
