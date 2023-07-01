import React, { useState } from 'react'

const SortByComponent = () => {
    const [sortByValue, setsortByValue] = useState('');
    const handleSortByChange = (event) => {
        setsortByValue(event.target.value);
    };
    return (
        <div className='flex flex-col gap-4'>
            <label> <input type="radio" value="name" name="group" checked={sortByValue === 'name'} onChange={handleSortByChange} />  Name </label>
            <label> <input type="radio" value="salary" name="group" checked={sortByValue === 'salary'} onChange={handleSortByChange} />  Salary</label>
        </div>
    )
}

export default SortByComponent
