import React from 'react';

const SortOptions = ({ sortBy, setSortBy }) => {
    const options = [
        { label: "Price ascending", value: "price-asc" },
        { label: "Price descending", value: "price-desc" }
    ];

    return (
        <div className="flex gap-2 my-4">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-4 py-1 text-sm rounded border ${
                        sortBy === option.value
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default SortOptions;
