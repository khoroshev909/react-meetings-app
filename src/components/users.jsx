import React, {useState} from 'react'
import api from '../api'

const Users = () => {
  
  const [users, setUsers] = useState(api.users.fetchAll())
  // console.log('users: ', users)

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
};

  const getUserQualities = (qualities) => {
    return qualities.map(quality => {
      return <span key={quality._id} className={'badge bg-' + quality.color + ' mgi-1'}>{quality.name}</span>
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
        <button type="button" onClick={() => handleDeleteUser(user._id)} className="btn btn-danger">Удалить</button>
        </td>
      </tr>
    })
  }

  const getMeetingsCountPhrase = (count) => {
    if (count === 0) {
      return "У вас не запланировано встреч"
    } else {
      const lastOne = Number(count.toString().slice(-1));
      if (count > 4 && count < 15) {
        return `У вас запланировано ${count} встреч`
      } else if ([2, 3, 4].indexOf(lastOne) !== -1) {
        return `У вас запланировано ${count} встречи`
      } else if (lastOne === 1) {
        return `У вас запланирована ${count} встреча`
      }
    }
}

  return <><span className="badge bg-primary">{getMeetingsCountPhrase(users.length)}</span>
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