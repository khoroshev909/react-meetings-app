const SearchStatus = ({ count }) => {

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
 
  return <span className="badge bg-primary p-2 m-2">
  <h6>{getMeetingsCountPhrase(count)}</h6></span>
}

export default SearchStatus