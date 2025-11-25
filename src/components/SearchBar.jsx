import React, { useState } from 'react';

const SearchBar = ({ onSearch, resultsCount }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value) => {
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search keys or values..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
            {searchTerm && (
                <span className="search-results">
                    {resultsCount} {resultsCount === 1 ? 'match' : 'matches'}
                </span>
            )}
        </div>
    );
};

export default SearchBar;
