import React from 'react'
import _ from 'lodash'
import propTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = itemsCount > 1 ? Math.ceil(itemsCount / pageSize) : 1
    if (pageCount <= 1) return null

    const pages = _.range(1, pageCount + 1)

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li
                            className={`page-item${(page === currentPage ? ' active' : '')}`}
                            key={`page_${page}`}>
                            <button type="button" className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    itemsCount: propTypes.number.isRequired,
    pageSize: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired,
    currentPage: propTypes.number.isRequired
}

export default Pagination
