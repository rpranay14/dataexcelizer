import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFilters } from '../../redux/ActionCreators';

const StatusComponent = (props) => {
    const [selectedvalue, setselectedvalue] = useState();
    const dispatch = useDispatch()
    const handleRadioChange = (event) => {
        setselectedvalue(event.target.value);
        const s = {
            status: event.target.value
        }
        console.log(s)
        dispatch(addFilters(s))


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
