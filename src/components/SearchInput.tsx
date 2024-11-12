import React from 'react';

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return (
        <div className="flex items-center mb-4">
            <input
                type="text"
                placeholder="Search by domain"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full max-w-xs"
            />
        </div>
    );
};

export default SearchInput;
