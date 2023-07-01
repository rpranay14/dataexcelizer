import React, { useCallback, useMemo, useState } from 'react';
import ReactDom from 'react-dom'
import { useDropzone } from 'react-dropzone';
import { AiFillCloseCircle } from 'react-icons/ai'
import { axiosapi } from '../api/axiosapi';
import { useDispatch } from 'react-redux';
import { addEmployees } from '../redux/ActionCreators';

const ModalComponent = (props) => {
    const [file, setfile] = useState();
    const dispatch = useDispatch();


    const onDrop = useCallback(async (acceptedFiles) => {
        setfile(acceptedFiles[0]);

        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('files', file);
        });


    }, []);
    const handleImport = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axiosapi.post('employee', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(response.data.employees)
                dispatch(addEmployees(response.data.employees))

                // Clear the selected file after successful upload

            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return ReactDom.createPortal(
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50'>

            <div className="bg-white fixed top-[30%]  left-[30%] border-black rounded-md ">
                <div className="flex justify-between items-center border-b-2 mb-5 p-2 border-black">
                    <p>Import File</p>
                    <AiFillCloseCircle onClick={() => props.onClick(false)} className='cursor-pointer  text-[#e65100] right-4 h-6 w-6' />
                </div>

                <div  {...getRootProps()} className={`dropzone border border-dashed mx-8 p-24 ${isDragActive ? 'active' : ''}`}>
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the files here...</p> : <p>Drag and drop files here or click to select files</p>}
                </div>
                <div className="flex justify-between items-center mx-2 mt-2 mb-2">
                    <button onClick={() => props.onClick(false)} className="border border-black px-6 py-1">Cancel</button>
                    <button onClick={() => handleImport()} className='bg-[#e65100] text-white px-8 py-1 rounded-sm'>Import</button>
                </div>
            </div>

        </div>,
        document.getElementById('portal')
    )
}

export default ModalComponent
