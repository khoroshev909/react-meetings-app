import React from 'react'
import UseMockData from '../../hooks/useMockData'

const Main = () => {

    const { updateDataBase, status, progress } = UseMockData()

    const handleClick = () => {
        updateDataBase()
    }

    return (
        <div className="container">
            <h2>Инициалзация данных</h2>
            <h4>Состояние загрузки: {progress} %</h4>
            <h4>Статус загрузки: {status}</h4>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}>
                Загрузить базу
            </button>
        </div>
    )
}
 
export default Main
