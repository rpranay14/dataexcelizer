import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { AiFillCloseCircle } from 'react-icons/ai'
import SortByComponent from './FilterModal/SortByComponent'
import StatusComponent from './FilterModal/StatusComponent'
import SalaryComponent from './FilterModal/SalaryComponent'
const filtersarray = ['Sort By', 'Status', 'Salary']

const FilterModalComponent = (props) => {


    const [sectionclicked, setsectionclicked] = useState(0)
    return ReactDom.createPortal(
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50'>

            <div className="bg-white fixed top-[10%]  left-[30%] border-black rounded-md w-[50%] ">
                <div className="flex justify-between items-center border-b-2 mb-5 p-2 border-black">
                    <p>Filters</p>
                    <AiFillCloseCircle onClick={() => props.setfiltermodal(false)} className='cursor-pointer  text-[#e65100] right-4 h-6 w-6' />
                </div>
                <div className='ml-4 flex gap-24 '>
                    <div>
                        {filtersarray.map((x, index) => (
                            <div onClick={() => setsectionclicked(index)} className='cursor-pointer hover:bg-gray-100 py-6 text-lg font-semibold' key={index}>
                                <p>{x}</p>
                            </div>
                        ))}

                    </div>
                    <div>
                        {sectionclicked === 0 ? <SortByComponent /> : <></>}
                        {sectionclicked === 1 ? <StatusComponent /> : <></>}
                        {sectionclicked === 2 ? <SalaryComponent /> : <></>}


                    </div>

                </div>


                <div className="flex justify-end items-center mx-2 mt-2 mb-2">
                    <button onClick={() => props.setfiltermodal(false)} className="border border-black px-6 py-1">Cancel</button>
                    <button className='bg-[#e65100] text-white px-8 py-1 rounded-sm'>Apply</button>
                </div>
            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default FilterModalComponent
