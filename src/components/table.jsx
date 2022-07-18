import React from 'react'
import propTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ users, selectedSort, columns, onSort, children }) => {
    return ( 
        <table className="table table-primary m-2">
            {children || (
                <>
                    <TableHeader {...{ selectedSort, columns, onSort }} />
                    <TableBody 
                        items={users} 
                        {...{ columns }} />
                </>)}
        </table>
    )
}

Table.propTypes = {
    users: propTypes.array.isRequired,
    selectedSort: propTypes.object.isRequired,
    columns: propTypes.object.isRequired,
    children: propTypes.array,
    onSort: propTypes.func
}
 
export default Table
