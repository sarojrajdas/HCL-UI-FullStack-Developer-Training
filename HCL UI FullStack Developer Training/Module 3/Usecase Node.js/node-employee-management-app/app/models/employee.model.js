const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    id: Number,
    name: String,
    dept: String,
    phoneNo: Number,
    joiningDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);
