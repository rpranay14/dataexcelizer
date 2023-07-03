import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFilters, updateFilter } from '../../redux/ActionCreators';

const SalaryComponent = () => {
    const filter = useSelector(state => state.filter.filterarray)
    console.log(filter.map((obj) => obj.salary).filter(Boolean)[0])
    const [minsalary, setminsalary] = useState()
    const [maxsalary, setmaxsalary] = useState()
    const dispatch = useDispatch();

    const handleapply = () => {

        const s = {
            salary: { minsalary, maxsalary }
        }


        console.log(s)
        if (filter.length !== 0) {
            const hasStatus = filter.some((obj) => 'salary' in obj);
            if (hasStatus) {
                dispatch(updateFilter(s))
            }
            else {
                dispatch(addFilters(s))
            }
        }
        else {
            dispatch(addFilters(s))
        }

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
