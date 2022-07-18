import React from 'react'
import propTypes from 'prop-types'

const TableHeader = ({ selectedSort, columns, onSort }) => {

    const handleSort = (newColumnValue) => {
        if (selectedSort.columnValue === newColumnValue) {
            const newColumnOrder = selectedSort.columnOrder === 'asc' ? 'desc' : 'asc' 
            onSort(() => ({ ...selectedSort, columnOrder: newColumnOrder }))
        } else {
            onSort(() => ({ columnValue: newColumnValue, columnOrder: 'asc' }))
        }    
    }

    return ( 
        <thead>
            <tr>
                {Object.keys(columns).map((key) => {
                    const { path, name: columnName } = columns[key]                    
                    return ( 
                        <th 
                            key={key} 
                            onClick={path && (() => handleSort(path))}
                            {...{ role: path && 'button' }}>
                            {columnName}
                            {selectedSort.columnValue === path && (
                                <i className={selectedSort.columnOrder === 'desc' 
                                    ? 'bi bi-caret-down-fill' 
                                    : 'bi bi-caret-up-fill'} />
                            )}
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    selectedSort: propTypes.object.isRequired,
    columns: propTypes.object.isRequired,
    onSort: propTypes.func.isRequired
}
 
export default TableHeader