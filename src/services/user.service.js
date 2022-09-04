import httpService from './http.service'

const baseEndpoint = 'user/'

const userService = {
    fetchAll: async () => {
        const { data } = await httpService.get(baseEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(baseEndpoint + payload._id, payload)
        return data
    }
}

export default userService