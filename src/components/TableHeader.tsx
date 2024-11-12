import React from 'react';
import FilterDropdown from './FilterDropdown';

type TableHeaderProps = {
    selectedSpf: string;
    setSelectedSpf: (value: string) => void;
    selectedDkimGoogle: string;
    setSelectedDkimGoogle: (value: string) => void;
    selectedDkimMicrosoft: string;
    setSelectedDkimMicrosoft: (value: string) => void;
    selectedDmarc: string;
    setSelectedDmarc: (value: string) => void;
    sortOrder: string;
    setSortOrder: (value: string) => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({
                                                     selectedSpf,
                                                     setSelectedSpf,
                                                     selectedDkimGoogle,
                                                     setSelectedDkimGoogle,
                                                     selectedDkimMicrosoft,
                                                     setSelectedDkimMicrosoft,
                                                     selectedDmarc,
                                                     setSelectedDmarc,
                                                     sortOrder,
                                                     setSortOrder,
                                                 }) => {
    return (
        <thead>
        <tr className="bg-gray-100 border-b">
            <th className="p-4">Domain</th>
            <th className="p-4">
                SPF
                <FilterDropdown
                    label="SPF"
                    value={selectedSpf}
                    options={['All', 'Valid', 'Invalid']}
                    onChange={setSelectedSpf}
                />
            </th>
            <th className="p-4">
                DKIM (Google)
                <FilterDropdown
                    label="DKIM (Google)"
                    value={selectedDkimGoogle}
                    options={['All', 'Valid', 'Invalid']}
                    onChange={setSelectedDkimGoogle}
                />
            </th>
            <th className="p-4">
                DKIM (Microsoft)
                <FilterDropdown
                    label="DKIM (Microsoft)"
                    value={selectedDkimMicrosoft}
                    options={['All', 'Valid', 'Invalid']}
                    onChange={setSelectedDkimMicrosoft}
                />
            </th>
            <th className="p-4">
                DMARC
                <FilterDropdown
                    label="DMARC"
                    value={selectedDmarc}
                    options={['All', 'Valid', 'Invalid']}
                    onChange={setSelectedDmarc}
                />
            </th>
            <th className="p-4">
                Checked At
                <FilterDropdown
                    label="Sort"
                    value={sortOrder}
                    options={['Desc', 'Asc']}
                    onChange={setSortOrder}
                />
            </th>
        </tr>
        </thead>
    );
};

export default TableHeader;
