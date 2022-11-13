const SearchResult = props => {
    return (
        <a className="search-result-card">
            <p className="search-result-title">
                props.title
            </p>
            <p className="search-result-desc">
                props.desc
            </p>
        </a>
    )
}

export default SearchResult