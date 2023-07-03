import { Modal } from '@mui/material'
import React, { useState } from 'react'
import ModalComponent from './ModalComponent'

const ImportButtonComponent = () => {
    const [modalstate, setmodalstate] = useState(false)
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-4xl mb-6">Streamline Employee Management: Simplify Your HR Processes</p>
            <p className="w-full lg:w-3/5 text-center mb-5">Empower your HR team with a powerful and efficient employee data management system that enables seamless organization, retrieval, and analysis of crucial employee information.</p>

            <button
                onClick={() => { setmodalstate(true) }}
                className="text-lg bg-[#e65100] text-white px-10 py-1 rounded-sm"
            >
                Import File
            </button>
            {modalstate ? <ModalComponent onClick={(value) => { setmodalstate(value) }} /> : <></>}
        </div>

    )
}

export default ImportButtonComponent
