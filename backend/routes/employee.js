const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const employeeRouter = express.Router();
const EMPLOYEE = require('../models/employees')

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})


employeeRouter.route("/")
    // Define the route to get  employee data
    .get((req, res, next) => {
        EMPLOYEE.find({}).then((employees) => {
            res.status(200).json({ success: true, employees: employees })

        }).catch((error) => res.status(500).json({ success: false, msg: error }))
    })

    // Define the route for uploading employee data
    .post(upload.single(), (req, res, next) => {
        const file = req.file;
        // Read the uploaded Excel file
        const workbook = xlsx.readFile(file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert worksheet data to JSON
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

        // Extract and map employee data from JSON
        const employees = jsonData.slice(1).map(col => ({
            employeeId: col[0],
            employeeName: col[1],
            employeeStatus: col[2],
            joiningDate: col[3],
            birthDate: col[4],
            skills: col[5],
            salaryDetails: col[6],
            address: col[7]

        }));

        // Insert employee data into the database
        EMPLOYEE.insertMany(employees)
            .then(() => {
                res.status(200).json({ success: true, message: 'Data imported successfully' });
            })
            .catch(error => {
                console.error('Error importing data:', error);
                res.status(500).json({ success: false, error: 'An error occurred while importing data' });
            });





    }
    )
module.exports = employeeRouter;    