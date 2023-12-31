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
import { addEmployees, deleteFilters, } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { BiFilterAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import FilterModalComponent from './FilterModalComponent';
import AddNewEmployeeModal from './AddNewEmployeeModal';
import EditEmployeeComponent from './EditEmployeeComponent';
import ChartComponent from './ChartComponent';
import moment from 'moment';



const EmpTableComponent = () => {
    const filter = useSelector(state => state.filter.filterarray)
    const [showfiltermodal, setshowfiltermodal] = useState(false)
    const [showeditmodal, setshoweditmodal] = useState(false)
    const [showaddnewform, setshowaddnewform] = useState(false)
    const [employeeEdit, setEmployeeEdit] = useState()
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.employees);
    const [sortby, setsortby] = useState('salary')
    const [sortedData, setSortedData] = useState([])
    const showChart = useSelector(state => state.chart.showChart)


    useEffect(() => {
        const getEmployee = async () => {
            try {
                const result = await axiosapi.get("employee")
                if (result.data.success) {
                    dispatch(addEmployees(result.data.employees))
                } else {
                    alert(result.data.msg)
                }
            }
            catch (error) {
                alert(error)
            }
        }
        getEmployee()
    }, [])


    useEffect(() => {
        setSortedData(employees)
    }, [employees])


    const handleApplyfilter = (remove) => {
        let newArrayOfEmployees
        if (remove) {
            newArrayOfEmployees = employees;
        }
        else {
            newArrayOfEmployees = sortedData;
        }
        if (filter.length !== 0) {
           
            const statusvalue = filter.map((obj) => obj.status).filter(Boolean)[0];
            const salaryvalue = filter.map((obj) => obj.salary).filter(Boolean)[0];
            if (statusvalue) {
                newArrayOfEmployees = newArrayOfEmployees.filter((x) => x.employeeStatus === statusvalue)
            }
            if (salaryvalue) {
                newArrayOfEmployees = newArrayOfEmployees.filter((x) => x.salaryDetails >= salaryvalue.minsalary && x.salaryDetails <= salaryvalue.maxsalary)
            }
        }
        setSortedData(newArrayOfEmployees)
    }


    const handleEdit = (row) => {
        setEmployeeEdit(row)
        setshoweditmodal(true)
    }


    const handleDelete = async (id) => {
        try {
            const response = await axiosapi.delete(`employee/${id}`)
            if (response.data.success) {
                dispatch(addEmployees(response.data.employees))
            }
            else {
                alert(response.data.msg)
            }

        }
        catch (error) {
            alert(error)
        }
    }


    const handleRemoveFilter = (filterss) => {
        dispatch(deleteFilters(filterss));
        let newArrayOfEmployees = employees
        if (filterss.status) {
            const salaryvalue = filter.map((obj) => obj.salary).filter(Boolean)[0];
            if (salaryvalue) {
                newArrayOfEmployees = newArrayOfEmployees.filter((x) => x.salaryDetails >= salaryvalue.minsalary && x.salaryDetails <= salaryvalue.maxsalary)
            }
        }
        else {
            const statusvalue = filter.map((obj) => obj.status).filter(Boolean)[0];
            if (statusvalue) {
                newArrayOfEmployees = newArrayOfEmployees.filter((x) => x.employeeStatus === statusvalue)
            }
        }
        setSortedData(newArrayOfEmployees)
    }


    return (
        <div className="mt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center mx-4">
                <div className="flex gap-2 mb-4">
                    <button onClick={() => { setshowfiltermodal(true) }} className="border border-gray-700 bg-gray-100 text-gray-700 px-3 rounded-sm py-1 flex gap-2 flex-wrap items-center">{filter.length !== 0 ? (<p className="text-[#ef6c00]">{filter.length}</p>) : (<BiFilterAlt className="h-4 w-4" />)}Filters</button>
                    {filter.length !== 0 ? (
                        filter.map((x) => (
                            <button onClick={() => { handleRemoveFilter(x) }} className="border bg-[#ef6c00] text-white px-3 rounded-md py-1 flex gap-2 flex-wrap mb-4 items-center">{Object.keys(x)} <AiOutlineClose className="h-4 w-4" /> </button>))) : (<></>
                    )}
                </div>
                <button onClick={() => { setshowaddnewform(true) }} className="border border-gray-700 bg-gray-100 text-gray-700 px-3 rounded-sm py-1 flex gap-2 flex-wrap mb-4 items-center" >
                    Add New
                </button>
            </div>

            <div className="overflow-x-auto">
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
                            {sortedData.length !== 0 ? (
                                sortedData?.map((row) => (
                                    <TableRow key={row.employeeId}>
                                        <TableCell>{row.employeeId}</TableCell>
                                        <TableCell>{row.employeeName}</TableCell>
                                        <TableCell>{row.employeeStatus}</TableCell>
                                        <TableCell>
                                            {new Date((new Date(row.joiningDate)).getTime() + 330 * 60 * 1000).toLocaleDateString('en-In')}


                                        </TableCell>
                                        <TableCell>
                                            {new Date((new Date(row.birthDate)).getTime() + 330 * 60 * 1000).toLocaleDateString('en-In')}
                                        </TableCell>
                                        <TableCell>{row.skills}</TableCell>
                                        <TableCell>{row.salaryDetails}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => handleEdit(row)}
                                                className="mr-1 bg-blue-500 text-white px-1 py-1 rounded-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row._id)}
                                                className="mr-1 px-1 py-1 rounded-sm bg-red-500 text-white"
                                            >
                                                Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8}>No Data</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {employees ? (showChart ? (<ChartComponent employeeData={employees} />) : (<></>)) : (<p>Loading</p>)}
            {showfiltermodal ? (<FilterModalComponent applyFilter={(value) => handleApplyfilter(value)} setfiltermodal={(value) => { setshowfiltermodal(value); }} />) : (<></>)}
            {showaddnewform ? (<AddNewEmployeeModal setshowaddnewform={(value) => { setshowaddnewform(value); }} />) : (<></>)}
            {showeditmodal ? (<EditEmployeeComponent toggleEdit={(value) => setshoweditmodal(value)} employeeEdit={employeeEdit} />) : (<></>)} </div>
    )
}

export default EmpTableComponent
