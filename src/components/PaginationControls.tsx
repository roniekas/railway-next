import React from 'react';

type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    onPageSizeChange: (value: number) => void;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
                                                                   currentPage,
                                                                   totalPages,
                                                                   onPageChange,
                                                                   pageSize,
                                                                   onPageSizeChange,
                                                               }) => {
    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
            <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded"
            >
                {[5, 10, 25, 50, 100].map(size => <option key={size} value={size}>{size}</option>)}
            </select>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
