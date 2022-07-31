import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import api from '../api'
import customSort from '../utils/customSort'
import Pagination from './pagination'
import SearchStatus from './searchStatus'
import paginate from '../utils/paginate'
import GroupList from './groupList'
import UsersTable from './usersTable'
import SearchForm from './searchForm'

const UsersList = () => {
    const pageSize = 5
    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState([])
    const [currentProfession, setCurrentProfession] = useState(null)
    const [itemsCount, setItemsCount] = useState(users.length)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState({ columnValue: 'name', columnOrder: 'asc' })
    const [search, setSerch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
            .then(() => api.users.fetchAll())
            .then((data) => setUsers(data))
            .then(() => setLoading(false))
    }, [])

    let filterUsers = []
    if (search) {
        const filteredBySearch = users.filter(({ name = 'placeHolder' }) => { 
            return name.toLowerCase().includes(search.toLowerCase())
        })

        filterUsers = filteredBySearch.length === 0
            ? []
            : filteredBySearch
    } else if (currentProfession !== null) {
        filterUsers = users.filter((user) => { 
            return JSON.stringify(user.profession) === JSON.stringify(currentProfession)
        })
    } else {
        filterUsers = users
    }
    
    const count = filterUsers.length

    const sortedByColumn = _.sortBy(filterUsers, [sortBy.columnValue])
    // В новой версии lodash у функции sortBy нет третьего параметра для сортировки asc, desc
    const sortedAscDesc = customSort(sortedByColumn, sortBy)
        
    const userCrop = paginate(sortedAscDesc, currentPage, pageSize)
 
    useEffect(() => {
        setItemsCount(filterUsers.length)
        if (filterUsers.length <= 4) {
            setCurrentPage(1)
        }
    }, [filterUsers])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentProfession, search])

    useEffect(() => {
        if ((users.length + pageSize <= pageSize * currentPage) && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }, [users])

    const handleUserSort = (newSortBy) => {
        setSortBy(newSortBy)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleFilterUsersByProfession = (newProfession) => {
        setSerch('')
        setCurrentProfession(newProfession)
    }

    const resetProfessions = () => {
        setSerch('')
        setCurrentProfession(null)
    }

    const handleToggleBookmark = (id) => {
        const idx = users.findIndex((user) => user._id === id)
        const newUsers = [...users]
        newUsers[idx].bookmark = !newUsers[idx].bookmark
        setUsers(newUsers)
    }

    const handleDeleteUsers = (id) => {
        setUsers(users.filter((user) => user._id !== id))
    }

    const handleSearch = ({ target }) => {
        const { value } = target
        setCurrentProfession(null)
        setSerch(value)
    }

    return (
        <div className="d-flex p-2">
            {professions && (
            <div className="d-flex flex-column mt-2">

                <GroupList 
                    items={professions}
                    selectedItem={currentProfession}
                    onSelectItem={handleFilterUsersByProfession} />

                <button
                    disabled={!currentProfession}
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={resetProfessions}>
                    Очистить профессии
                </button>
            </div>
            )}

            {users && (
            <div className="d-flex flex-column flex-grow-1 p-2 m-2">

                <div className="d-flexflex-column flex-shrink-1">
                    <SearchStatus count={count} />
                    <SearchForm
                        search={search}
                        handleSearch={handleSearch} />
                </div>

                <UsersTable
                    users={userCrop}
                    loading={loading}
                    selectedSort={sortBy}
                    onDelete={handleDeleteUsers}
                    onSort={handleUserSort}
                    onToggleBookmark={handleToggleBookmark} />

                {count > 4 && (
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={itemsCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange} />
                    </div>
                )}
            </div>
            )}
        </div>
    )
}

export default UsersList
