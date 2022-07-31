import React from 'react'
import propTypes from 'prop-types'
import TextField from '../common/form/textField'

const SearchForm = ({ search, handleSearch }) => {
    return (
        <form>
            <TextField
                className=""
                labelText=""
                name="search"
                value={search}
                onChange={handleSearch}
                error=""
                showLabel={false}
                hasValidation={false}
                placeHolder="Поиск по имени" />
        </form>
    )
}

SearchForm.propTypes = {
    search: propTypes.string.isRequired,
    handleSearch: propTypes.func.isRequired
}
 
export default SearchForm