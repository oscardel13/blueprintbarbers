

const Searchbar = ({searchQuery, handleSearchChange}) => {
    return (
        <div className="py-4 flex flex-row gap-2">
            <label htmlFor="search" className="text-lg font-semibold">Search: </label>
            <input
                type="text"
                placeholder="Search by ID, Name, Email, Address, or Phone"
                className="w-96"
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default Searchbar;