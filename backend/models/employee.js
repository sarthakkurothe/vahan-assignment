const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true 
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  mobileNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
