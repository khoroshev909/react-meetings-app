import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import _ from 'lodash'
import query from 'query-string'
import customSort from '../../../utils/customSort'
import Pagination from '../../common/pagination'
import SearchStatus from '../../ui/searchStatus'
import paginate from '../../../utils/paginate'
import GroupList from '../../common/groupList'
import UsersTable from '../../ui/usersTable'
import SearchForm from '../../ui/searchForm'
import { getProfessions, getProfessionsLoading } from '../../../store/profession'
import { getCurrentUserId, getIsDataLoaded, getUsersList } from '../../../store/users'
import getQueryParams from '../../../utils/getQueryParams'

const UsersListPage = () => {
    const history = useHistory()
    const location = useLocation()
    const parsedQuery = query.parse(location.search)
    const { page, prof } = query.parse(location.search)
    const isDataLoaded = useSelector(getIsDataLoaded)
    const users = useSelector(getUsersList())
    const currentUserId = useSelector(getCurrentUserId())
    const pageSize = 5
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoading())
    const [currentProfession, setCurrentProfession] = useState(prof || null)
    const [itemsCount, setItemsCount] = useState(users.length)
    const [currentPage, setCurrentPage] = useState(+page || 1)
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
                const current = professions.find((p) => p.alias === currentProfession)
                if (current) {
                    return JSON.stringify(user.profession) === JSON.stringify(current._id)
                }
                return user
            })
        } else {
            filtered = users
        }
        return filtered.filter((u) => u._id !== currentUserId)
    }

    const filterUsers = filteredUsers(users)

    const sortedByColumn = _.sortBy(filterUsers, [sortBy.columnValue])
    // В новой версии lodash у функции sortBy нет третьего параметра для сортировки asc, desc
    const sortedAscDesc = customSort(sortedByColumn, sortBy)

    const userCrop = paginate(sortedAscDesc, currentPage, pageSize)
    const count = filterUsers.length

    useEffect(() => {
        const lastPage = Math.ceil(count / pageSize)
        if (currentPage > lastPage) {
            setCurrentPage(lastPage)
            history.push('/users?' + getQueryParams(parsedQuery, { page: lastPage }))
        }
    }, [currentPage])
    
    useEffect(() => {
        setItemsCount(filterUsers.length)
    }, [filterUsers])

    useEffect(() => {
        if (search !== '') {
            setCurrentPage(1)
            history.push('/users')
        }
    }, [search])

    // useEffect(() => {
    //     if ((users.length + pageSize <= pageSize * currentPage) && currentPage > 1) {
    //         setCurrentPage(currentPage - 1)
    //     }
    // }, [users])

    const handleUserSort = (newSortBy) => {
        setSortBy(newSortBy)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
        history.push('/users?' + getQueryParams(parsedQuery, { page: pageIndex }))
    }

    const handleFilterUsersByProfession = (newProfession) => {
        setSerch('')
        setCurrentPage(1)
        setCurrentProfession(newProfession.alias)
        history.push(`/users?prof=${newProfession.alias}`)
    }

    const resetProfessions = () => {
        setSerch('')
        setCurrentProfession(null)
        history.push('/users')
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

    if (!isDataLoaded) return <h4>Loading...</h4>

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

            <div className="d-flex flex-column flex-grow-1 p-2 m-2">

                <div className="d-flexflex-column flex-shrink-1">
                    <SearchStatus count={count} />
                    <SearchForm
                        search={search}
                        handleSearch={handleSearch} />
                </div>

                <UsersTable
                    users={userCrop}
                    selectedSort={sortBy}
                    onSort={handleUserSort}
                    onToggleBookmark={handleToggleBookmark} />

                {(count > pageSize - 1) && (
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={itemsCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UsersListPage
