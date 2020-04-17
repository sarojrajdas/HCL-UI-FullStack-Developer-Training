module.exports = (app) => {
    const employees = require('../controllers/employee.controller.js');

    // Enter data for a new Employee 
    app.post('/employees', employees.create);

    // Retrieve data for all Employees
    app.get('/employees', employees.findAll);

    // Retrieve data of an Employee with Employee Id
    app.get('/employees/:employeeId', employees.findOne);//.where({ _id: item.id })

    // Update data of an Employee with Employee Id
    app.put('/employees/:employeeId', employees.update);

    // Delete a Employee with Employee Id
    app.delete('/employees/:employeeId', employees.delete);
}