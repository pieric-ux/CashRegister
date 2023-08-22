import { useState } from "react";
import { Head } from "@inertiajs/react";
import { sortData, filterData } from "@/Utils/useTableUtils";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import TextInput from "@/Components/TextInput";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import PaginationItemsPerPage from "@/Components/PaginationItemsPerPage";
import { useTranslation } from "react-i18next";
import DeleteTransactionForm from "./Partials/DeleteTransactionForm";
import ShowDetailsTransactionForm from "./Partials/ShowDetailsTransactionForm";

export default function Index({ customerAuth, application, transactions, localization }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionPerPage, setTransactionPerPage] = useState(10);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handletransactionPerPage = (e) => {
        setTransactionPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const transactionsColumns = [
        { key: "or_number", label: t('OR Number') },
        { key: "employee", label: t('Employee'), className: "hidden md:table-cell" },
        { key: "workstation", label: t('Workstation'), className: "hidden lg:table-cell" },
        { key: "total", label: t('Total'), className: "hidden xl:table-cell", render: (transaction) => `${transaction.total} ${t('currency_symbol')}` },
        { key: "paymentMethod", label: t('Payment Method'), className: "hidden xl:table-cell", render: (transaction) => `${t(transaction.cr_payment_methods.name)}` },
    ];

    const renderTransactionsAction = {
        header: () => t('Actions'),
        render: (transaction) => (
            <div className="flex items-center justify-center gap-2">
                <ShowDetailsTransactionForm transaction={transaction} />
                <DeleteTransactionForm transaction={transaction} />
            </div>
        )
    };

    const sortedTransactions = sortData(transactions, sortColumn, sortDirection);
    const filteredTransactions = filterData(sortedTransactions, searchTerm, transactionsColumns, t);

    const indexOfLastTransactions = currentPage * transactionPerPage;
    const indexOfFirstTransactions = indexOfLastTransactions - transactionPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransactions, indexOfLastTransactions);

    return (
        <CR_AppAdminLayout auth={customerAuth} application={application} localization={localization}>
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-col sm:flex-row items-center justify-end pr-4 mt-4 gap-2">
                    <PaginationItemsPerPage
                        itemsPerPage={transactionPerPage}
                        onChange={handletransactionPerPage}
                        itemName={t('transactions')}
                    />
                    <TextInput
                        placeholder={t('Search transactions')}
                        className="w-64 dark:!bg-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {filteredTransactions.length > 0 ? (
                    <>
                        <Table
                            data={currentTransactions}
                            columns={transactionsColumns}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                            actionsRenderer={renderTransactionsAction}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredTransactions.length / transactionPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className="text-gray-900 dark:text-gray-100">{t('No transactions found.')}</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}