const BookmarkIcon = (props) => {

  return props.isBookmarked === false ? 
  <i className="bi bi-bookmark" onClick={() => props.onToggle(props.id)}></i> 
  : <i className="bi bi-bookmark-fill" onClick={() => props.onToggle(props.id)}></i>
}

export default BookmarkIcon