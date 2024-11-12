import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <span className="ml-2 text-blue-500">Loading...</span>
    </div>
);

export default LoadingSpinner;
