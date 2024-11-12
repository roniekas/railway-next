import React from 'react';

type FilterDropdownProps = {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, options, onChange }) => {
    return (
        <div className="inline-block ml-2">
            <label className="sr-only">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-300 p-1 rounded"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
