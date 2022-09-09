import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import customSort from '../../../utils/customSort'
import Pagination from '../../common/pagination'
import SearchStatus from '../../ui/searchStatus'
import paginate from '../../../utils/paginate'
import GroupList from '../../common/groupList'
import UsersTable from '../../ui/usersTable'
import SearchForm from '../../ui/searchForm'
import { useUsers } from '../../../hooks/useUsers'
import { usePprofessions } from '../../../hooks/useProfessions'
import { useAuth } from '../../../hooks/useAuth'

const UsersListPage = () => {
    const { users } = useUsers()
    const { currentUser } = useAuth()
    const pageSize = 5
    const { professions, loading: professionsLoading } = usePprofessions()
    const [currentProfession, setCurrentProfession] = useState(null)
    const [itemsCount, setItemsCount] = useState(users.length)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState({ columnValue: 'bookmark', columnOrder: 'desc' })
    const [search, setSerch] = useState('')

    function filteredUsers(data) {
        let filtered = []
        if (search) {
            const filteredBySearch = data.filter(({ name }) => { 
                return name.toLowerCase().includes(search.toLowerCase())
            })
    
            filtered = filteredBySearch.length === 0
                ? []
                : filteredBySearch
        } else if (currentProfession !== null) {
            filtered = data.filter((user) => {
                return JSON.stringify(user.profession) === JSON.stringify(currentProfession._id)
            })
        } else {
            filtered = users
        }
        return filtered.filter((u) => u._id !== currentUser._id)
    }

    const filterUsers = useCallback(filteredUsers(users), [
        users, search, currentProfession, currentUser
    ]) 

    // if (search) {
    //     const filteredBySearch = users.filter(({ name }) => { 
    //         return name.toLowerCase().includes(search.toLowerCase())
    //     })

    //     filterUsers = filteredBySearch.length === 0
    //         ? []
    //         : filteredBySearch
    // } else if (currentProfession !== null) {
    //     filterUsers = users.filter((user) => {
    //         return JSON.stringify(user.profession) === JSON.stringify(currentProfession._id)
    //     })
    // } else {
    //     filterUsers = users
    // }
    
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
    }

    const handleSearch = (target) => {
        const { value } = target
        setCurrentProfession(null)
        setSerch(value)
    }

    return (
        <div className="d-flex p-2">
            {professions && !professionsLoading && (
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
                    loading={false}
                    selectedSort={sortBy}
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

export default UsersListPage
