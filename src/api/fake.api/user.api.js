import transformProfData from '../../utils/transformProfData'

const qualities = {
    tedious: {
        _id: '67rdca3eeb7f6fgeed471198',
        name: 'Нудила',
        color: 'primary'
    },
    strange: {
        _id: '67rdca3eeb7f6fgeed471100',
        name: 'Странный',
        color: 'secondary'
    },
    buller: {
        _id: '67rdca3eeb7f6fgeed4711012',
        name: 'Троль',
        color: 'success'
    },
    alcoholic: {
        _id: '67rdca3eeb7f6fgeed471101',
        name: 'Алкоголик',
        color: 'danger'
    },
    handsome: {
        _id: '67rdca3eeb7f6fgeed471102',
        name: 'Красавчик',
        color: 'info'
    },
    uncertain: {
        _id: '67rdca3eeb7f6fgeed471103',
        name: 'Неуверенный',
        color: 'dark'
    }
}

const users = [
    {
        _id: '67rdca3eeb7f6fgeed471815',
        name: 'Джон Дориан',
        profession: transformProfData('doctor'),
        qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
        completedMeetings: 36,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471816',
        name: 'Кокс',
        profession: transformProfData('doctor'),
        qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
        completedMeetings: 15,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471817',
        name: 'Боб Келсо',
        profession: transformProfData('doctor'),
        qualities: [qualities.buller],
        completedMeetings: 247,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471818',
        name: 'Рэйчел Грин',
        profession: transformProfData('waiter'),
        qualities: [qualities.uncertain],
        completedMeetings: 148,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471819',
        name: 'Шелдон Купер',
        profession: transformProfData('physics'),
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 37,
        rate: 4.6,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471820',
        name: 'Леонард Хофстедтер',
        profession: transformProfData('physics'),
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 147,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471821',
        name: 'Говард Воловиц',
        profession: transformProfData('engineer'),
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 72,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471822',
        name: 'Никола Тесла',
        profession: transformProfData('engineer'),
        qualities: [qualities.handsome],
        completedMeetings: 72,
        rate: 5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471823',
        name: 'Моника Геллер',
        profession: transformProfData('cook'),
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471824',
        name: 'Рататуй',
        profession: transformProfData('cook'),
        qualities: [qualities.handsome, qualities.buller],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed47181f',
        name: 'Джоуи Триббиани',
        profession: transformProfData('actor'),
        qualities: [qualities.uncertain, qualities.strange],
        completedMeetings: 434,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed47181r',
        name: 'Брэд Питт',
        profession: transformProfData('actor'),
        qualities: [qualities.handsome],
        completedMeetings: 434,
        rate: 5,
        bookmark: false
    }
]

const fetchAll = () => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve(users)
        }, 100)
    })
}

const fetchById = (id) => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            const user = users.find((u) => u._id === id)
            resolve(user)
        }, 100)
    })
}

export default { 
    fetchAll,
    fetchById
}
