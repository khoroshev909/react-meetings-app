import React from 'react'
import propTypes from 'prop-types'

const SearchStatus = ({ count }) => {

    const getMeetingsCountPhrase = () => {
        let phrase = 'Ваш контакты'

        if (count === 0) {
            phrase = 'У вас не запланировано встреч'
        } else {
            const lastOne = Number(count.toString().slice(-1))
            if (count > 4 && count < 15) {
                phrase = `У вас запланировано ${count} встреч`
            } else if ([2, 3, 4].indexOf(lastOne) !== -1) {
                phrase = `У вас запланировано ${count} встречи`
            } else if (lastOne === 1) {
                phrase = `У вас запланирована ${count} встреча`
            }
        }

        return phrase
    }

    return (
        <span className="badge bg-primary p-2 m-2">
            <h6>{getMeetingsCountPhrase(count)}</h6>
        </span>
    )
}

SearchStatus.propTypes = { count: propTypes.number.isRequired }

export default SearchStatus
