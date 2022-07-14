import { professions } from '../api/fake.api/professions.api'
// импорт профессий в виде объекта
// import { professionsObj } from '../api/fake.api/professions.api'
// const professions = professionsObj

export const profMap = {
    doctor: 'Доктор',
    waiter: 'Официант',
    physics: 'Физик',
    engineer: 'Инженер',
    actor: 'Актер',
    cook: 'Повар'
}

const defaultProf = {
    _id: Date.now(),
    name: 'Профессия не найдена'
}

const transformProfData = (key) => {
    if (!Array.isArray(professions)) {
        if (!professions[key]) {
            console.error(`Профессия с ключём ${key} не найдена в объекте данных professions`)
            return defaultProf
        }
        return professions[key]
    }

    const profName = profMap[key]
    if (!profName) {
        console.error(`Профессия ${profName} не найдена в объекте profMap`)
        return defaultProf
    } 

    const idx = professions.findIndex((prof) => prof.name === profName)
    if (idx === undefined) {
        console.error(`Профессия с именем ${profName} не найдена в массиве данных professions`)
        return defaultProf
    }

    return professions[idx]
}

export default transformProfData