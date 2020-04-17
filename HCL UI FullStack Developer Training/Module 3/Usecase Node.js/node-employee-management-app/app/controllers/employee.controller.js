const Employee = require('../models/employee.model.js');

// Enter and save data of a new employee
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Employee name can not be empty"
        });
    }

    // Enter data of a new employee
    const employee = new Employee({
        id: Math.floor(Math.random() * 100000) + 1, 
        name: req.body.name,
        dept: req.body.dept,
        phoneNo: req.body.phoneNo,
        joiningDate: new Date()
    });

    // Save Employee data in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating entry of the Employee."
        });
    });
};


// Retrieve and return the data of all the employees from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving details of employees."
        });
    });
};

// Find an employee with Employee Id
exports.findOne = (req, res) => {
    //Employee.findById(req.params.employeeId)
   // Employee.findById(req.params.employeeId).where({ _id: req.params.employeeId })
    Employee.find().where('id').equals(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.employeeId
        });
    });
};

// Update data of an employee identified by the Employee Id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Employee name can not be empty"
        });
    }

    // Find Employee and update it with the request body
   // Employee.findByIdAndUpdate(req.params.employeeId, {
    Employee.findOneAndUpdate({id: req.params.employeeId}, { $set: { 
        name: req.body.name,
        dept: req.body.dept,
        phoneNo: req.body.phoneNo
    }}, {new: true},function (err, employee) {
        
    }) 
    /* Employee.update({id: req.params.employeeId}, { $set: { 
        name: req.body.name,
        dept: req.body.dept,
        phoneNo: req.body.phoneNo
    }}, {multi:true,new: true}) */
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating employee details with given id " + req.params.employeeId
        });
    });
};


// Delete data of an employee with the specified Employee Id in the request
exports.delete = (req, res) => {
    /* Employee.findByIdAndRemove(req.params.employeeId) */
    Employee.findOneAndDelete({id: req.params.employeeId})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send({message: "Employee details deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee details with id " + req.params.employeeId
        });
    });
};