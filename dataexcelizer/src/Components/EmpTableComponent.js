import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { axiosapi } from '../api/axiosapi';
import { addEmployees } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { BiFilterAlt } from 'react-icons/bi';
import FilterModalComponent from './FilterModalComponent';
import AddNewEmployeeModal from './AddNewEmployeeModal';
import EditEmployeeComponent from './EditEmployeeComponent';


const EmpTableComponent = () => {

    const [showfiltermodal, setshowfiltermodal] = useState(false)
    const [showeditmodal, setshoweditmodal] = useState(false)
    const [showaddnewform, setshowaddnewform] = useState(false)
    const [employeeEdit, setEmployeeEdit] = useState()
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.employees);
    const [sortby, setsortby] = useState('salary')
    const [sortedData, setSortedData] = useState([])


    useEffect(() => {
        const getEmployee = async () => {
            const result = await axiosapi.get("employee")
            dispatch(addEmployees(result.data.employees))
        }
        getEmployee()

    }, [])
    useEffect(() => {
        console.log("HI")
        const sortedData = employees.slice().sort((a, b) => {
            if (sortby === 'name') {
                return a.employeeName.localeCompare(b.employeeName);
            } else if (sortby === 'salary') {
                return a.salary - b.salary;
            }

        });
        setSortedData(sortedData)
    }, [sortby, employees])
    const handleEdit = (row) => {
        console.log(row)
        setEmployeeEdit(row)
        setshoweditmodal(true)

    }
    const handleDelete = (id) => {
        console.log(id)

    }


    return (
        <div className='mt-12'>
            <div className="flex justify-between ml-4 ">
                <button onClick={() => { setshowfiltermodal(true) }} className='border border-gray-700 bg-gray-100 text-gray-700 px-3 rounded-sm py-1 flex gap-2 flex-wrap mb-4 items-center'><BiFilterAlt className="h-4 w-4" />Filters</button>
                <button onClick={() => { setshowaddnewform(true) }} className='border border-gray-700 bg-gray-100 text-gray-700 px-3 rounded-sm py-1 flex gap-2 flex-wrap mb-4 items-center'>Add New</button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>employeeId</TableCell>
                            <TableCell>employeeName</TableCell>
                            <TableCell>employeeStatus</TableCell>
                            <TableCell>joiningDate</TableCell>
                            <TableCell>birthDate</TableCell>
                            <TableCell>skills</TableCell>
                            <TableCell>salaryDetails</TableCell>
                            <TableCell>address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.length !== 0 ? sortedData?.map(row => (
                            <TableRow key={row.employeeId}>
                                <TableCell>{row.employeeId}</TableCell>
                                <TableCell>{row.employeeName}</TableCell>
                                <TableCell>{row.employeeStatus}</TableCell>
                                <TableCell>{row.joiningDate}</TableCell>
                                <TableCell>{row.birthDate}</TableCell>
                                <TableCell>{row.skills}</TableCell>
                                <TableCell>{row.salaryDetails}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell><button onClick={() => handleEdit(row)} className="mr-1 bg-blue-500 text-white px-1 py-1 rounded-sm">Edit</button><button onClick={() => handleDelete(row._id)} className="mr-1 px-1 py-1 rounded-sm bg-red-500 text-white">Delete</button></TableCell>

                            </TableRow>)) : (
                            <TableRow>
                                <TableCell colSpan={8}>Loading...</TableCell>
                            </TableRow>
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {showfiltermodal ? <FilterModalComponent setfiltermodal={(value) => { setshowfiltermodal(value) }} /> : <></>}
            {showaddnewform ? <AddNewEmployeeModal setshowaddnewform={(value) => { setshowaddnewform(value) }} /> : <></>}
            {showeditmodal ? <EditEmployeeComponent employeeEdit={employeeEdit}/>:<></>}

        </div>
    )
}

export default EmpTableComponent
