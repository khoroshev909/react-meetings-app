import { professionsObj as professions } from './professions.api'
import { qualities } from './qualities.api' 

const users = [
    {
        _id: '67rdca3eeb7f6fgeed47181f',
        name: 'Джоуи Триббиани',
        email: 'joe@trib.com',
        sex: 'male',
        profession: professions.actor,
        qualities: [qualities.uncertain, qualities.strange],
        completedMeetings: 434,
        rate: 3.5,
        bookmark: true
    },
    {
        _id: '67rdca3eeb7f6fgeed471818',
        name: 'Рэйчел Грин',
        email: 'green7311@fam.biz',
        sex: 'female',
        profession: professions.waiter,
        qualities: [qualities.uncertain],
        completedMeetings: 148,
        rate: 3.5,
        bookmark: true
    },
    {
        _id: '67rdca3eeb7f6fgeed471815',
        name: 'Джон Дориан',
        email: 'Jony7351@tw.com',
        sex: 'male',
        profession: professions.doctor,
        qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
        completedMeetings: 36,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471816',
        name: 'Кокс',
        email: 'white4571@twipet.com',
        sex: 'male',
        profession: professions.doctor,
        qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
        completedMeetings: 15,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471817',
        name: 'Боб Келсо',
        email: 'bob007@tw.com',
        sex: 'male',
        profession: professions.doctor,
        qualities: [qualities.buller],
        completedMeetings: 247,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471819',
        name: 'Шелдон Купер',
        email: 'mindgames6878@phis.tech',
        sex: 'male',
        profession: professions.physics,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 37,
        rate: 4.6,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471820',
        name: 'Леонард Хофстедтер',
        email: 'mindes000@phis.tech',
        sex: 'male',
        profession: professions.physics,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 147,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471821',
        name: 'Говард Воловиц',
        email: 'gov1903@phis.tech',
        sex: 'male',
        profession: professions.engineer,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 72,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471822',
        name: 'Никола Тесла',
        email: 'electro@underground.tech',
        sex: 'male',
        profession: professions.engineer,
        qualities: [qualities.handsome],
        completedMeetings: 72,
        rate: 5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471823',
        name: 'Моника Геллер',
        email: 'mono@super.com',
        sex: 'female',
        profession: professions.cook,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471824',
        name: 'Рататуй',
        email: 'ratatatata@underground.com',
        sex: 'male',
        profession: professions.cook,
        qualities: [qualities.handsome, qualities.buller],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed47181r',
        name: 'Брэд Питт',
        email: 'superstar@star.com',
        sex: 'male',
        profession: professions.actor,
        qualities: [qualities.handsome],
        completedMeetings: 434,
        rate: 5,
        bookmark: false
    }
]

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users))
}

const fetchAll = () => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem('users')))
        }, 100)
    })
}

const fetchById = (id) => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem('users')).find((user) => user._id === id))
        }, 100)
    })
}

const update = (id, data) => {
    return new Promise((resolve) => {
        const allUsers = JSON.parse(localStorage.getItem('users'))
        const idx = allUsers.findIndex((u) => u._id === id)
        allUsers[idx] = { ...allUsers[idx], ...data }
        localStorage.setItem('users', JSON.stringify(allUsers))
        resolve(allUsers[idx])
    })
}

export default { 
    fetchAll,
    fetchById,
    update
}
