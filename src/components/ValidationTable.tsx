import { useState, useCallback } from 'react';
//@ts-ignore
import debounce from 'lodash.debounce';
import SearchInput from './SearchInput';
import TableHeader from './TableHeader';
import PaginationControls from './PaginationControls';
import LoadingSpinner from './LoadingSpinner';
import useValidationData from '@/hooks/useValidationData';

export default function ValidationTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [selectedSpf, setSelectedSpf] = useState<string>('All');
    const [selectedDkimGoogle, setSelectedDkimGoogle] = useState<string>('All');
    const [selectedDkimMicrosoft, setSelectedDkimMicrosoft] = useState<string>('All');
    const [selectedDmarc, setSelectedDmarc] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<string>('desc');

    const { data, totalPages, loading } = useValidationData({
        currentPage,
        pageSize,
        searchTerm: debouncedSearchTerm,
        selectedSpf,
        selectedDkimGoogle,
        selectedDkimMicrosoft,
        selectedDmarc,
        sortOrder,
    });

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value);
        }, 500),
        []
    );

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
        setCurrentPage(1);
    };

    const renderTableBody = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={6}>
                        <LoadingSpinner />
                    </td>
                </tr>
            );
        }

        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                        No results found.
                    </td>
                </tr>
            );
        }

        return data.map((result) => (
            <tr key={result.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{result.domain}</td>
                <td className="p-4">{result.spf ? 'Valid' : 'Invalid'}</td>
                <td className="p-4">{result.dkimGoogle ? 'Valid' : 'Invalid'}</td>
                <td className="p-4">{result.dkimMicrosoft ? 'Valid' : 'Invalid'}</td>
                <td className="p-4">{result.dmarc ? 'Valid' : 'Invalid'}</td>
                <td className="p-4">{new Date(result.checkedAt).toLocaleString()}</td>
            </tr>
        ));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">DNS Validation Results</h1>

            <SearchInput value={searchTerm} onChange={handleSearchChange} />

            <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-lg">
                <table className="min-w-full bg-white">
                    {/* Table header */}
                    <TableHeader
                        selectedSpf={selectedSpf}
                        setSelectedSpf={setSelectedSpf}
                        selectedDkimGoogle={selectedDkimGoogle}
                        setSelectedDkimGoogle={setSelectedDkimGoogle}
                        selectedDkimMicrosoft={selectedDkimMicrosoft}
                        setSelectedDkimMicrosoft={setSelectedDkimMicrosoft}
                        selectedDmarc={selectedDmarc}
                        setSelectedDmarc={setSelectedDmarc}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />

                    <tbody>
                    {renderTableBody()}
                    </tbody>
                </table>
            </div>

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
}
