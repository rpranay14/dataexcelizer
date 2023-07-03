import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFilters, updateFilter } from '../../redux/ActionCreators';

const SalaryComponent = () => {
    const filter = useSelector(state => state.filter.filterarray)

    const [minsalary, setminsalary] = useState()
    const [maxsalary, setmaxsalary] = useState()
    const dispatch = useDispatch();
    useEffect(() => {
        if (filter.length !== 0) {
            if ((filter.map((obj) => obj.salary).filter(Boolean)[0])) {
                setminsalary(filter.map((obj) => obj.salary).filter(Boolean)[0].minsalary)
                setmaxsalary(filter.map((obj) => obj.salary).filter(Boolean)[0].maxsalary)
            }

        }
    }, [])


    const handleChange = (e, value) => {
        let s;
        if (value) {
            setminsalary(e.target.value)
            s = {
                salary: { minsalary: e.target.value, maxsalary: maxsalary }
            }
            console.log(s)


        }
        else {
            setmaxsalary(e.target.value)
            s = {
                salary: { minsalary: minsalary, maxsalary: e.target.value }
            }
            console.log(s)
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
        <div className='flex flex-col lg:flex lg:flex-row   gap-4'>
            <input className='w-[50%] ' type='number' placeholder='Min salary' value={minsalary} onChange={(e) => handleChange(e, true)} />
            <input className='w-[50%] ' type='number' placeholder='Max salary' value={maxsalary} onChange={(e) => handleChange(e, false)} />

        </div>
    )
}

export default SalaryComponent
