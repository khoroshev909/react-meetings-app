import React from 'react'
import propTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({ items, columns }) => {

    const renderData = (item, column) => {
        if (columns[column].component) {
            const { component } = columns[column]
            if (typeof component === 'function') {
                return component(item)
            }
            return component
        }
        return _.get(item, columns[column].path)
    }

    return ( 
        <tbody>
            {items.map((item) => (
                <tr key={item._id} className="table-primary">
                    {Object.keys(columns).map((column) => (
                        <td key={column} className="table-primary">
                            {renderData(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

TableBody.propTypes = {
    items: propTypes.array.isRequired,
    columns: propTypes.object.isRequired
}
 
export default TableBody
