import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import httpService from '../services/http.service'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'

const UseMockData = () => {

    const statusMap = {
        off: 'Не загружено',
        pending: 'Загружаю...',
        succsess: 'Готово!',
        error: 'Упс, что-то пошло не так...'
    }

    const requstsSum = professions.length + qualities.length + users.length

    const [status, setStatus] = useState(statusMap.off)
    const [error, setError] = useState(null)
    const [count, setCount] = useState(0)
    const [progress, setProggres] = useState(0)

    useEffect(() => {
        if (count === requstsSum) {
            setProggres(100)
        } else if (count === 0 && status !== statusMap.off) {
            setProggres(0)
        } else if (status === statusMap.pending) {
            setProggres(Math.floor((count / requstsSum) * 100))
        }
    }, [count])

    const countInctement = () => {
        setCount((prevState) => setCount(prevState + 1))
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }  
    }, [error])

    const updateDataBase = async () => {
        setCount(0)
        setStatus(statusMap.pending)
        try {
            for (const user of users) {
                await httpService.put(`user/${user._id}`, user)
                countInctement()
            }
    
            for (const profession of professions) {
                await httpService.put(`profession/${profession._id}`, profession)
                countInctement()
            }
    
            for (const quality of qualities) {
                await httpService.put(`quality/${quality._id}`, quality)
                countInctement()
            }
            setStatus(statusMap.succsess)
        } catch (error) {
            const { message } = error
            setError(message)
            setStatus(statusMap.error)
        }
    }

    return { updateDataBase, status, progress }
}
 
export default UseMockData