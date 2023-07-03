import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleChart } from '../redux/ActionCreators';



const NavbarComponent = () => {
    const dispatch = useDispatch();
    const showChart = useSelector(state => state.chart.showChart)
    const handleGenerateChart = () => {
        if (showChart) {
            dispatch(toggleChart(false))
        }
        else {
            dispatch(toggleChart(true))
        }
    }



    return (

        <div className='px-10 py-2 flex items-center justify-between shadow-lg'>
            <p className='bg-[#ef6c00] text-white px-2 py-1 rounded-md font-bold'>Data Excelizer</p>
            <button className='bg-green-500 text-white px-2 py-1 rounded-md font-bold' onClick={() => handleGenerateChart()}>{showChart ? "Hide Chart" : "Show Chart"}</button>



        </div>

    )
}

export default NavbarComponent
