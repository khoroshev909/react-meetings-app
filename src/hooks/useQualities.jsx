import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
import qualityService from '../services/quality.service'

const QualityContext = React.createContext()

export const useQualities = () => {
    return useContext(QualityContext)
}

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function errorCatcher(error) {
        const { message } = error
        setError(message)
    }

    const getQualities = async () => {
        try {
            const { content } = await qualityService.fetchAll()
            setQualities(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    const getQualityById = (id) => qualities.find((p) => p._id === id)

    const getQualitiesForUser = (ids) => ids.map((id) => getQualityById(id))

    useEffect(() => {
        getQualities()       
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }     
    }, [error])

    return (
        <QualityContext.Provider value={{ 
            qualities,
            getQualityById,
            getQualitiesForUser,
            loading
        }}>
            {children}
        </QualityContext.Provider>
    )
}

QualityProvider.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
