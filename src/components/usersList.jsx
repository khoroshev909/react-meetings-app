import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import api from '../api'
import customSort from '../utils/customSort'
import Pagination from './pagination'
import SearchStatus from './searchStatus'
import paginate from '../utils/paginate'
import GroupList from './groupList'
import UsersTable from './usersTable'

const UsersList = () => {
    const pageSize = 5
    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState([])
    const [currentProfession, setCurrentProfession] = useState(null)
    const [itemsCount, setItemsCount] = useState(users.length)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState({ columnValue: 'name', columnOrder: 'asc' })

    const filteredByProfession = currentProfession === null
        ? users
        : users.filter((user) => { 
            return JSON.stringify(user.profession) === JSON.stringify(currentProfession)
        })

    const count = filteredByProfession.length

    const sortedByColumn = _.sortBy(filteredByProfession, [sortBy.columnValue])
    // В новой версии lodash у функции sortBy нет третьего параметра для сортировки asc, desc
    const sortedAscDesc = customSort(sortedByColumn, sortBy)
        
    const userCrop = paginate(sortedAscDesc, currentPage, pageSize)

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
            .then(() => api.users.fetchAll())
            .then((data) => setUsers(data))
    }, [])
        
    useEffect(() => {
        setItemsCount(filteredByProfession.length)
        if (filteredByProfession.length <= 4) {
            setCurrentPage(1)
        }
    }, [filteredByProfession])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentProfession])

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
        setCurrentProfession(newProfession)
    }

    const resetProfessions = () => {
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

    return (
        <div className="d-flex p-2">
            {professions && (
            <div className="d-flex flex-column mt-2">

                <GroupList 
                    items={professions}
                    selectedItem={currentProfession}
                    onSelectItem={handleFilterUsersByProfession} />

                <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={resetProfessions}>
                    Очистить профессии
                </button>
            </div>
            )}

            {users && (
            <div className="d-flex flex-column flex-grow-1">

                <div className="d-flex flex-shrink-1">
                    <SearchStatus count={count} />
                </div>

                <UsersTable
                    users={userCrop}
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
