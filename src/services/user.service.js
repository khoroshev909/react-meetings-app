import httpService from './http.service'

const baseEndpoint = 'user/'

const userService = {
    fetchAll: async () => {
        const { data } = await httpService.get(baseEndpoint)
        return data
    }
}

export default userService