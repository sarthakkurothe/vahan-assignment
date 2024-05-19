const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { firstName, lastName, email, mobileNumber, dateOfBirth } = req.body;
  try {
    const employee = new Employee({
      id: uuidv4(), 
      firstName,
      lastName,
      email,
      mobileNumber,
      dateOfBirth
    });
    const newEmployee = await employee.save();
    const formattedEmployee = {
      ...newEmployee.toObject(),
      dateOfBirth: newEmployee.dateOfBirth.toISOString().split('T')[0]
    };
    res.status(201).json(formattedEmployee);
  } catch (error) {
    console.error("Error saving employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.email = req.body.email;
    employee.mobileNumber = req.body.mobileNumber;
    employee.dateOfBirth = req.body.dateOfBirth;
    const updatedEmployee = await employee.save();
    const formattedEmployee = {
      ...updatedEmployee.toObject(),
      dateOfBirth: updatedEmployee.dateOfBirth.toISOString().split('T')[0]
    };
    res.json(formattedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOneAndDelete({ id: id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;