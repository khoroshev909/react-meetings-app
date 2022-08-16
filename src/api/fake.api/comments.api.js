const comments = [
    {
        _id: '67rdca3eeb7f6fg',
        pageId: '67rdca3eeb7f6fgeed47181f',
        userId: '67rdca3eeb7f6fgeed471821',
        content: 'Lorem ipsum dolor',
        created_at: '1633576399367'
    },
    {
        _id: '67rdca3eeb7f6fgdasd',
        pageId: '67rdca3eeb7f6fgeed47181f',
        userId: '67rdca3eeb7f6fgeed471816',
        content: 'Lorem ipsum dolor and etc',
        created_at: '1633573058520'
    },
    {
        _id: '67rdca3eeb7f6fgdaasd0',
        pageId: '67rdca3eeb7f6fgeed47181f',
        userId: '67rdca3eeb7f6fgeed471815',
        content: 'Lorem ipsum dolor and etc',
        created_at: '1660549329045'
    },
    {
        _id: '67rdca3eeb7f6fgdaasd1',
        pageId: '67rdca3eeb7f6fgeed47181f',
        userId: '67rdca3eeb7f6fgeed471815',
        content: 'Lorem ipsum dolor and etc',
        created_at: '1633573058520'
    },
    {
        _id: '67rdca3eeb7f6fgdaasd2',
        pageId: '67rdca3eeb7f6fgeed47181f',
        userId: '67rdca3eeb7f6fgeed471815',
        content: 'Lorem ipsum dolor and etc',
        created_at: '1660632230941'
    },
    {
        _id: '67rdca3eeb7f6fg111',
        pageId: '67rdca3eeb7f6fgeed471818',
        userId: '67rdca3eeb7f6fgeed471823',
        content: 'Lorem ipsum dolor',
        created_at: '1633576399367'
    },
    {
        _id: '67rdca3eeb7f6fgdasd222',
        pageId: '67rdca3eeb7f6fgeed471818',
        userId: '67rdca3eeb7f6fgeed47181r',
        content: 'Lorem ipsum dolor and etc',
        created_at: '1633573058520'
    }
]

if (!localStorage.getItem('comments')) {
    localStorage.setItem('comments', JSON.stringify(comments))
}

const fetchAll = () => {
    return new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(comments)
        }, 100)
    })
}

const fetchCommentsForUser = (userId) => {
    return new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem('comments')).filter(
                    (c) => c.pageId === userId
                )
            )
        }, 100)
    })
}

const add = (data) => {
    return new Promise((resolve) => {
        window.setTimeout(function () {
            const comments = JSON.parse(localStorage.getItem('comments'))
            const newComment = {
                ...data,
                created_at: String(Date.now()),
                _id: Math.random().toString(36).substring(2, 9)
            }
            comments.push(newComment)
            localStorage.setItem('comments', JSON.stringify(comments))
            resolve(newComment)
        }, 100)
    })
}

const remove = (id) => {
    return new Promise((resolve) => {
        window.setTimeout(function () {
            const comments = JSON.parse(localStorage.getItem('comments'))
            const newComments = comments.filter((x) => x._id !== id)
            localStorage.setItem('comments', JSON.stringify(newComments))
            resolve(id)
        }, 100)
    })
}

export default {
    fetchAll,
    fetchCommentsForUser,
    add,
    remove
}
