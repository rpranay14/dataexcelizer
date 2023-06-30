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

const EmpTableComponent = () => {
    const [employees, setemployees] = useState();
    useEffect(() => {
        const getEmployee = async () => {
            const result = await axiosapi.get("employee")
            setemployees(result.data)
        }
        getEmployee()

    }, [employees])

    const tableData = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        // Add more data as needed
    ];
    return (
        <div>
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
                        {employees?.map(row => (
                            <TableRow key={row.employeeId}>
                                <TableCell>{row.employeeName}</TableCell>
                                <TableCell>{row.employeeStatus}</TableCell>
                                <TableCell>{row.joiningDate}</TableCell>
                                <TableCell>{row.birthDate}</TableCell>
                                <TableCell>{row.skills}</TableCell>
                                <TableCell>{row.salaryDetails}</TableCell>
                                <TableCell>{row.address}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default EmpTableComponent
