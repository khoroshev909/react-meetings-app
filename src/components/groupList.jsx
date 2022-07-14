import React from 'react'
import propTypes, { oneOfType } from 'prop-types'

const GroupList = ({ items, onSelectItem, selectedItem, keyProp, valProp }) => {

    // if (Array.isArray(items)) {
    //     console.log('array')
    // } else {
    //     console.log('object')
    // }

    return ( 
        <ul className="list-group">
            {Object.keys(items).map((itemKey) => {
                return (
                    <button 
                        type="button"
                        key={items[itemKey][keyProp]}
                        className={`list-group-item${(items[itemKey] === selectedItem ? ' active' : '')}`}
                        onClick={() => onSelectItem(items[itemKey])}>
                        {items[itemKey][valProp]}
                    </button>
                )
            })}     
        </ul>
    )
}

GroupList.defaultProps = {
    keyProp: '_id',
    valProp: 'name',
    selectedItem: undefined
}

GroupList.propTypes = {
    items: oneOfType([propTypes.object, propTypes.array]).isRequired, 
    onSelectItem: propTypes.func.isRequired,
    selectedItem: propTypes.object,
    keyProp: propTypes.string,
    valProp: propTypes.string
}
 
export default GroupList
