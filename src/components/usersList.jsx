import React, {useState} from 'react'
import api from '../api'
import SearchStatus from './searchStatus'
import UserTableTamplate from './userTableTamplate'

const UsersList = () => {
  
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  }

  const handleToggleBookmark = id => {
    const idx = users.findIndex(u => u._id === id)
    const newUsers = [...users]
    newUsers[idx].bookmark = !newUsers[idx].bookmark
    setUsers(newUsers)
  } 

  const getUsersList = () => {
    return users.map(user => {
      return <UserTableTamplate 
        {...user} 
        key={user._id} 
        onDelete={handleDeleteUser}
        onToggleBookmark={handleToggleBookmark}/>
    })
  }

  return <>
  <SearchStatus count={users.length}/>
  <table className="table table-primary m-2">
  <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Избранное</th>
      <th scope="col">Оценка</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   {getUsersList()}
  </tbody>
</table>
</>
}

export default UsersList