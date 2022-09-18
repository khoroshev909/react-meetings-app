import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionById, getProfessionsLoading } from '../../store/profession'

const Profession = ({ id }) => {

    const loading = useSelector(getProfessionsLoading())
    
    const prof = useSelector(getProfessionById(id)) 

    if (!loading) {
        return <p>{prof.name}</p>
    } 
    return <p>Loading...</p>
    
}

Profession.propTypes = { id: propTypes.string.isRequired }
 
export default Profession