import httpService from './http.service'

const baseEndpoint = 'comment/'

const commentService = {
    fetch: async (pageId) => {
        const { data } = await httpService.get(baseEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        })
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(baseEndpoint + payload._id, payload)
        return data
    },
    delete: async (id) => {
        const { data } = await httpService.delete(baseEndpoint + id)
        return data
    }
}

export default commentService