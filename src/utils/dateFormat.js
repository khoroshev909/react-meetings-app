export default function dateFormat(ms) {
    ms = typeof ms === 'number' ? ms : Number(ms)
    const dateVal = new Date(ms).getTime()
    const dateNow = Date.now()
    const dateDiff = dateNow - dateVal
    if (1000 * 60 * 30 >= dateDiff) {

        if (1000 * 60 >= dateDiff) {
            return 'меньше минуты назад'
        }

        if (1000 * 60 < dateDiff && 1000 * 60 * 2 > dateDiff) {
            return 'минуту назад'
        }

        const minutesVal = new Date(dateDiff).getMinutes()
        if (1000 * 60 * 2 < dateDiff && 1000 * 60 * 5 > dateDiff) {
            return `${minutesVal} минуты назад`
        }

        if (1000 * 60 * 5 <= dateDiff) {
            return `${minutesVal} минут назад`
        }
    }

    const date = new Date(dateVal)
    if (1000 * 60 * 60 * 24 >= dateDiff) {
        if (date.getHours() < 10 && date.getMinutes() < 10) {
            return `0${date.getHours()}:0${date.getMinutes()}`
        }

        if (date.getHours() < 10 && date.getMinutes() >= 10) {
            return `0${date.getHours()}:${date.getMinutes()}`
        }

        if (date.getHours() >= 10 && date.getMinutes() < 10) {
            return `${date.getHours()}:${date.getMinutes()}`
        }

        return `${date.getHours()}:${date.getMinutes()}`
    }

    if (1000 * 60 * 60 * 24 < dateDiff && 1000 * 60 * 60 * 24 * 30 > dateDiff) {
        if (date.getDate() < 10 && date.getMonth() + 1 >= 10) {
            return `0${date.getDate()}.${date.getMonth() + 1}`
        }

        if (date.getDate() >= 10 && date.getMonth() + 1 < 10) {
            return `${date.getDate()}.0${date.getMonth() + 1}`
        }

        if (date.getDate() < 10 && date.getMonth() + 1 < 10) {
            return `0${date.getDate()}.0${date.getMonth() + 1}`
        }

        return `${date.getDate()}.${date.getMonth() + 1}`
    }

    if (date.getDate() < 10 && date.getMonth() + 1 >= 10) {
        return `0${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }

    if (date.getDate() >= 10 && date.getMonth() + 1 < 10) {
        return `${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}`
    }

    if (date.getDate() < 10 && date.getMonth() + 1 < 10) {
        return `0${date.getDate()}.${date.getMonth() + 1}.0${date.getFullYear()}`
    }

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}