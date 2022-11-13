import { Form } from "semantic-ui-react"
import { useState } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const SearchBar = props => {
    const [query, setQuery] = useState('')
    const router = useRouter()

    useEffect(() => {
        setQuery(props.query);
    }, [props.query]);

    const handleFormSubmit = () => {
        router.push(
            { pathname: "/search_results", query: { query } },
            "/search_results/" + query.replace(/\s/g, '_')
        );
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <Form className="search-bar-form" onSubmit={handleFormSubmit}>
            <Form.Input  placeholder='Search...' value={query} onChange={handleInputChange}/>
        </Form>
    )
}

export default SearchBar