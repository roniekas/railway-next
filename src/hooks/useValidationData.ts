import { useEffect, useState } from 'react';

type Validation = {
    id: number;
    domain: string;
    spf: boolean;
    dkimGoogle: boolean;
    dkimMicrosoft: boolean;
    dmarc: boolean;
    checkedAt: string;
};

type UseValidationDataProps = {
    currentPage: number;
    pageSize: number;
    searchTerm: string;
    selectedSpf: string;
    selectedDkimGoogle: string;
    selectedDkimMicrosoft: string;
    selectedDmarc: string;
    sortOrder: string;
};

export default function useValidationData({
                                              currentPage,
                                              pageSize,
                                              searchTerm,
                                              selectedSpf,
                                              selectedDkimGoogle,
                                              selectedDkimMicrosoft,
                                              selectedDmarc,
                                              sortOrder,
                                          }: UseValidationDataProps) {
    const [data, setData] = useState<Validation[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                pageSize: pageSize.toString(),
                search: searchTerm,
                spf: selectedSpf !== 'All' ? selectedSpf : '',
                dkimGoogle: selectedDkimGoogle !== 'All' ? selectedDkimGoogle : '',
                dkimMicrosoft: selectedDkimMicrosoft !== 'All' ? selectedDkimMicrosoft : '',
                dmarc: selectedDmarc !== 'All' ? selectedDmarc : '',
                sortOrder,
            });

            try {
                const response = await fetch(`/api/result?${params.toString()}`);
                const json = await response.json();

                setData(json.results);
                setTotalPages(json.totalPages);
            } catch (error) {
                console.error('Error fetching validation data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, pageSize, searchTerm, selectedSpf, selectedDkimGoogle, selectedDkimMicrosoft, selectedDmarc, sortOrder]);

    return { data, totalPages, loading };
}
