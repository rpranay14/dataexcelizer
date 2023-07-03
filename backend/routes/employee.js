const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const employeeRouter = express.Router();
const EMPLOYEE = require('../models/employees')
const moment = require('moment');

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
    .delete((req, res, next) => {
        EMPLOYEE.deleteMany({}).then(() => {
            res.status(200).json({ success: true })

        }).catch((error) => res.status(500).json({ success: false, msg: error }))
    })

    // Define the route for uploading employee data
    .post(upload.single('file'), async (req, res, next) => {
        const file = req.file;
        console.log(file)
        // Read the uploaded Excel file
        const workbook = xlsx.readFile(file.path, { cellDates: true });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert worksheet data to JSON
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        const previouslyStoredData = await EMPLOYEE.find({}).exec();


        // Extract and map employee data from JSON
        const filteredData = jsonData.filter(arr => arr.length > 0)

        const employees = filteredData.slice(1).map(col => {

            if (col.length !== 0) {
                if (previouslyStoredData.length !== 0) {

                    const isDifferent = previouslyStoredData.every((prevEmployee) => parseInt(prevEmployee.employeeId) !== col[0]);

                    if (isDifferent) {

                        return ({
                            employeeId: col[0],
                            employeeName: col[1],
                            employeeStatus: col[2],
                            joiningDate: moment(col[3], 'DD-MM-YYYY').toDate(),
                            birthDate: col[4],
                            skills: col[5],
                            salaryDetails: col[6],
                            address: col[7]
                        })

                    }
                    else {
                        return false;
                    }

                }
                else {
                    return ({
                        employeeId: col[0],
                        employeeName: col[1],
                        employeeStatus: col[2],
                        joiningDate: moment(col[3], 'DD-MM-YYYY').toDate(),
                        birthDate: col[4],
                        skills: col[5],
                        salaryDetails: col[6],
                        address: col[7]
                    })

                }


            }



        });
        console.log(employees)
        const filteredEmployees = employees.filter((element) => element !== false)

        console.log(filteredEmployees)


        // Insert employee data into the database
        EMPLOYEE.insertMany(filteredEmployees)
            .then((employees) => {
                EMPLOYEE.find({}).then((employees) => {
                    res.status(200).json({ success: true, employees: employees })

                }).catch((error) => res.status(500).json({ success: false, msg: error }))
            })
            .catch(error => {
                console.error('Error importing data:', error);
                res.status(500).json({ success: false, error: 'An error occurred while importing data' });
            });





    })
employeeRouter.route('/addemployee')

    .post((req, res, next) => {

        console.log(req.body.employee)
        EMPLOYEE.create(req.body.employee)
            .then((employee) => {
                EMPLOYEE.find({}).then((employees) => {
                    res.status(200).json({ success: true, employees: employees })

                }).catch((error) => res.status(500).json({ success: false, msg: error }))
            }).catch((error) => res.status(500).json({ success: false, msg: error }))
    })
employeeRouter.route('/:employeeid')
    .put((req, res, next) => {
        EMPLOYEE.findByIdAndUpdate(req.params.employeeid, {
            $set: req.body.updatedEmployee
        }, { new: true })
            .then((updatedEmployee) => {
                console.log(updatedEmployee)
                EMPLOYEE.find({}).then((employees) => {
                    res.status(200).json({ success: true, employees: employees })

                }).catch((error) => res.status(500).json({ success: false, msg: error }))
            }).catch(error => {
                console.error('Error importing data:', error);
                res.status(500).json({ success: false, error: 'An error occurred while importing data' });
            });

    })
    .delete((req, res, next) => {
        EMPLOYEE.findByIdAndRemove(req.params.employeeid)
            .then((product) => {
                EMPLOYEE.find({}).then((employees) => {
                    res.status(200).json({ success: true, employees: employees })

                }).catch((error) => res.status(500).json({ success: false, msg: error }))
            }).catch(error => {
                console.error('Error importing data:', error);
                res.status(500).json({ success: false, error: 'An error occurred while importing data' });
            });

    })
module.exports = employeeRouter;    