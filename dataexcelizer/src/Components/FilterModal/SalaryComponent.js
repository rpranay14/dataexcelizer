import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFilters } from '../../redux/ActionCreators'

const SalaryComponent = () => {
    const [minsalary, setminsalary] = useState('')
    const [maxsalary, setmaxsalary] = useState('')
    const dispatch = useDispatch();

    const handleapply = () => {

        const s = {
            salary: { minsalary, maxsalary }
        }

        console.log(s)
        dispatch(addFilters(s))

    }
    return (
        <div className='flex  gap-8'>
            <input type='number' placeholder='Min salary' value={minsalary} onChange={(e) => setminsalary(e.target.value)} />
            <input type='number' placeholder='Max salary' value={maxsalary} onChange={(e) => setmaxsalary(e.target.value)} />
            <button onClick={() => handleapply()} className=''>Apply</button>
        </div>
    )
}

export default SalaryComponent
