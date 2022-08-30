import httpService from './http.service'

const baseEndpoint = 'profession/'

const professionService = {
    fetchAll: async () => {
        const { data } = await httpService.get(baseEndpoint)
        return data
    }
}

export default professionService