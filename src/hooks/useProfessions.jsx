import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
import professionService from '../services/profession.service'

const ProfessionContext = React.createContext()

export const usePprofessions = () => useContext(ProfessionContext)

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function errorCatcher(error) {
        const { message } = error
        setError(message)
    }

    const getProfessions = async () => {
        try {
            const { content } = await professionService.fetchAll()
            setProfessions(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    const getProfessionById = (id) => professions.find((p) => p._id === id)

    useEffect(() => {
        getProfessions()       
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }     
    }, [error])

    return (
        <ProfessionContext.Provider value={{ professions, getProfessionById, loading }}>
            {loading ? <h4>Loading...</h4> : children}
        </ProfessionContext.Provider>
    )
}

ProfessionProvider.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
