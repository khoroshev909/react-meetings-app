import httpService from './http.service'

const baseEndpoint = 'quality/'

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(baseEndpoint)
        return data
    }
}

export default qualityService