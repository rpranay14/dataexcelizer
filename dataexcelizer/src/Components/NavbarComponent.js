import React from 'react'

const NavbarComponent = () => {
    return (
        <div className='px-10 py-2 flex items-center justify-between shadow-lg'>
            <p className='bg-[#ef6c00] text-white px-2 py-1 rounded-md font-bold'>Data Excelizer</p>
            <div>
                <button className='bg-[#f57c00] text-white px-5 py-1 rounded-sm  mr-2'>Login</button>
                <button className='border border-[#ef6c00]  px-5 py-1 rounded-sm '>Signup</button>
            </div>

        </div>
    )
}

export default NavbarComponent
