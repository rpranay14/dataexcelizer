import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilters, updateFilter } from '../../redux/ActionCreators';

const StatusComponent = (props) => {
    const filter = useSelector(state => state.filter.filterarray)
    const [selectedvalue, setselectedvalue] = useState(filter.map((obj) => obj.status).filter(Boolean)[0]);
    const dispatch = useDispatch()
    const handleRadioChange = (event) => {
        setselectedvalue(event.target.value);
        const s = {
            status: event.target.value
        }
        if (filter.length !== 0) {
            const hasStatus = filter.some((obj) => 'status' in obj);
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
    };
    return (
        <div className='flex flex-col gap-4'>
            <label> <input type="radio" value="active" name="group" checked={selectedvalue === 'active'} onChange={handleRadioChange} /> Active </label>
            <label> <input type="radio" value="inactive" name="group" checked={selectedvalue === 'inactive'} onChange={handleRadioChange} /> Inactive</label>
            <label> <input type="radio" value="leave" name="group" checked={selectedvalue === 'leave'} onChange={handleRadioChange} /> Leave</label>
        </div>
    )
}

export default StatusComponent
