import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Search_button = () => {
    return (
        <>
            <form action="" className="form_search">
                <input type="search" className="search_input" placeholder="Search..." />
                <button type="submit" className="search_button"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
        </>
    );
}

export default Search_button;