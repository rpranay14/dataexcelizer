import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { AiFillCloseCircle } from 'react-icons/ai'

import StatusComponent from './FilterModal/StatusComponent'
import SalaryComponent from './FilterModal/SalaryComponent'
import { useDispatch } from 'react-redux'
import { clearFilters } from '../redux/ActionCreators'
const filtersarray = ['Status', 'Salary']

const FilterModalComponent = (props) => {
    const dispatch = useDispatch();


    const [sectionclicked, setsectionclicked] = useState(0)
    const onApplyButtonPressed = () => {
        props.applyFilter(false)
        props.setfiltermodal(false)


    }
    const onCancelPressed = () => {
        dispatch(clearFilters())
        props.setfiltermodal(false)



    }
    return ReactDom.createPortal(
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50'>

            <div className="bg-white fixed top-[10%]  left-[30%] border-black rounded-md w-[50%] ">
                <div className="flex justify-between items-center border-b-2  p-2 border-black">
                    <p>Filters</p>
                    <AiFillCloseCircle onClick={() => onCancelPressed()} className='cursor-pointer  text-[#e65100] right-4 h-6 w-6' />
                </div>
                <div className=' flex  gap-2'>
                    <div>
                        {filtersarray.map((x, index) => (
                            <div onClick={() => setsectionclicked(index)} className={sectionclicked === index ? 'cursor-pointer bg-[#e65100] pl-4 pr-24 py-4 text-lg font-semibold' : 'cursor-pointer hover:bg-gray-100 pl-4 pr-24 py-4 text-lg font-semibold'} key={index} >
                                <p>{x}</p>
                            </div>
                        ))}

                    </div>
                    <div>

                        {sectionclicked === 0 ? <StatusComponent /> : <></>}
                        {sectionclicked === 1 ? <SalaryComponent /> : <></>}


                    </div>

                </div>


                <div className="flex justify-end items-center mx-2 mt-2 mb-2 gap-2">
                    <button onClick={() => onCancelPressed()} className="border border-black px-6 py-1">Clear Filters</button>
                    <button onClick={() => onApplyButtonPressed()} className='bg-[#e65100] text-white px-8 py-1 rounded-sm'>Apply</button>
                </div>
            </div>

        </div >,
        document.getElementById('portal')
    )
}

export default FilterModalComponent
