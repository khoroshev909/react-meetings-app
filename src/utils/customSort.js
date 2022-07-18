// сортирует массив по asc, desc
const customSort = (arr, sortBy) => {
    return arr.sort((a, b) => {
        const prev = a[sortBy.columnValue]
        const next = b[sortBy.columnValue]
        if (typeof prev === 'number') {
            return sortBy.columnOrder === 'asc' 
                ? prev - next
                : next - prev
        }
        if (typeof prev === 'boolean') {
            return sortBy.columnOrder === 'asc' 
                ? prev - next
                : next - prev
        } 
        // если в названии свойства есть точка возможно это вложенный объект
        if ((sortBy.columnValue).includes('.')) {
            const properties = sortBy.columnValue.split('.')
            if (a?.[properties[0]]?.[properties[1]]) {
                // hешение не унивирсальное, логика прописана для двух уровней вложенности
                const prevEl = a[properties[0]][properties[1]]
                const nextEl = b[properties[0]][properties[1]]
                return sortBy.columnOrder === 'asc'
                    ? prevEl.localeCompare(nextEl)
                    : nextEl.localeCompare(prevEl)
            }
        }
        if (!([sortBy.columnValue] in a)) return
        return sortBy.columnOrder === 'asc'  
            ? a[sortBy.columnValue].localeCompare(b[sortBy.columnValue])
            : b[sortBy.columnValue].localeCompare(a[sortBy.columnValue])
    })
}

export default customSort