import React, { useState } from 'react'
import api from '../api'
import Pagination from './pagination'
import SearchStatus from './searchStatus'
import UserTableRow from './userTableRow'
import paginate from '../utils/paginate'

const UsersTable = () => {
    const pageSize = 4
    const [users, setUsers] = useState(api.users.fetchAll())
    const itemsCount = users.length
    const [currentPage, setCurrentPage] = useState(1)
    const userCrop = paginate(users, currentPage, pageSize)

    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
        if (userCrop.length - 1 === 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleToggleBookmark = (id) => {
        const idx = users.findIndex((u) => u._id === id)
        const newUsers = [...users]
        newUsers[idx].bookmark = !newUsers[idx].bookmark
        setUsers(newUsers)
    }

    const getUsersList = () => {
        return users.length ? (
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
        <>
            <SearchStatus count={users.length} />
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
            <Pagination
                itemsCount={itemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default UsersTable
