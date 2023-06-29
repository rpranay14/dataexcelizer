const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    employeeStatus: {
        type: String,
        required: true
    },
    joiningDate: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    salaryDetails: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee