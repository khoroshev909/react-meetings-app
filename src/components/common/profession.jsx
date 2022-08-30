import React from 'react'
import propTypes from 'prop-types'
import { usePprofessions } from '../../hooks/useProfessions'

const Profession = ({ id }) => {
    
    const { getProfessionById, loading } = usePprofessions()

    const prof = getProfessionById(id)

    if (!loading) {
        return <p>{prof.name}</p>
    } 
    return <p>Loading...</p>
    
}

Profession.propTypes = { id: propTypes.string.isRequired }
 
export default Profession