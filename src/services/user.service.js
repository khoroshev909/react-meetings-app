import httpService from './http.service'
import { getUserId } from './localStorage.service'

const baseEndpoint = 'user/'

const userService = {
    fetchAll: async () => {
        const { data } = await httpService.get(baseEndpoint)
        return data
    },
    fetchById: async (userId = null) => {
        if (userId === null) {
            userId = getUserId()
        }
        const { data } = await httpService.get(baseEndpoint + userId)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(baseEndpoint + payload._id, payload)
        return data
    },
    edit: async (payload) => {
        const { data } = await httpService.put(baseEndpoint + payload._id, payload)
        return data
    }
}

export default userService