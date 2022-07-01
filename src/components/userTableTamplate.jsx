import BookmarkIcon from './bookmarkIcon'
import UserQualities from './userQualities'

const UserTableTamplate = (props) => {

  const handleToggleBookmark = id => {
    return props.onToggleBookmark(id)
  }

  return <tr className="table-primary">
  <td className="table-primary">{props.name}</td>
  <td className="table-primary">
    <UserQualities {...props.qualities}/>
  </td>
  <td className="table-primary">{props.profession.name}</td>
  <td className="table-primary">{props.completedMeetings}</td>
  <td className="table-primary">
    <BookmarkIcon id={props._id} isBookmarked={props.bookmark} onToggle={handleToggleBookmark} />
  </td>
  <td className="table-primary">{props.rate}</td>
  <td className="table-primary">
  <button type="button" onClick={() => props.onDelete(props._id)} className="btn btn-danger">Удалить</button>
  </td>
</tr>
}

export default UserTableTamplate