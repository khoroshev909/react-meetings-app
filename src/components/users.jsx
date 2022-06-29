import React, {useState} from 'react'
import api from '../api'

const Users = () => {
  
  const [users, setUsers] = useState(api.users.fetchAll())
  console.log('users: ', users)

  const removeUser = (id) => {
    setUsers(prevState => prevState.filter(user => user._id !== id))
  }

  const getUserQualities = (qualities) => {
    return qualities.map(quality => {
      return <span key={quality._id} className={'badge bg-' + quality.color}>{quality.name}</span>
    })
  }
  
  const getUsersList = () => {
    return users.map(user => {
      return <tr className="table-primary" key={user._id}>
        <td className="table-primary">{user.name}</td>
        <td className="table-primary">{getUserQualities(user.qualities)}</td>
        <td className="table-primary">{user.profession.name}</td>
        <td className="table-primary">{user.completedMeetings}</td>
        <td className="table-primary">{user.rate}</td>
        <td className="table-primary">
        <button type="button" onClick={() => removeUser(user._id)} className="btn btn-danger">Удалить</button>
        </td>
      </tr>
    })
  }


  return <><span className="badge bg-primary">{users.length} человек тусанут с тобой сегодня</span>
  <table className="table table-primary">
  <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
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

export default Users