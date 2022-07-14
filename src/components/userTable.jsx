import React, { useState, useEffect } from 'react'
import api from '../api'
import Pagination from './pagination'
import SearchStatus from './searchStatus'
import UserTableRow from './userTableRow'
import paginate from '../utils/paginate'
import GroupList from './groupList'

const UsersTable = () => {
    const pageSize = 4
    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState([])
    const [currentProf, setCurrentProf] = useState()
    const [itemsCount, setItemsCount] = useState(users.length)
    const [currentPage, setCurrentPage] = useState(1)
    const filteredByProf = currentProf === undefined
        ? users
        : users.filter((user) => { 
            return JSON.stringify(user.profession) === JSON.stringify(currentProf)
        })
    const count = filteredByProf.length
    const userCrop = paginate(filteredByProf, currentPage, pageSize)

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
            .then(() => api.users.fetchAll())
            .then((data) => setUsers(data))
    }, [])
        
    useEffect(() => {
        setItemsCount(filteredByProf.length)
        if (filteredByProf.length <= 4) {
            setCurrentPage(1)
        }
    }, [filteredByProf])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentProf])

    useEffect(() => {
        if ((users.length + pageSize <= pageSize * currentPage) && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }, [users])

    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleToggleBookmark = (id) => {
        const idx = users.findIndex((user) => user._id === id)
        const newUsers = [...users]
        newUsers[idx].bookmark = !newUsers[idx].bookmark
        setUsers(newUsers)
    }

    const handleOnSelectItem = (item) => {
        setCurrentProf(item)
    }

    const resetProfessions = () => {
        setCurrentProf()
    }

    const getUsersList = () => {
        return count ? (
            userCrop.map((user) => {
                return (
                    <UserTableRow
                        key={user._id}
                        {...user}
                        onDelete={handleDeleteUser}
                        onToggleBookmark={handleToggleBookmark} />
                )
            })
        ) : (
            <tr>
                <td>Вы удалили все контакты</td>
            </tr>
        )
    }

    return (
        <div className="d-flex p-2">
            {professions && (
            <div className="d-flex flex-column mt-2">
                <GroupList 
                    items={professions}
                    selectedItem={currentProf}
                    onSelectItem={handleOnSelectItem} />
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
                <table className="table table-primary m-2">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Избранное</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">
                                <i className="bi bi-trash3" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>{getUsersList()}</tbody>
                </table>
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

export default UsersTable
