import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Edit({ employees, selectedEmployeeId, setEmployees, setISEditing }) {
  
  const id = selectedEmployeeId; 

  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');

  useEffect(() => {
    fetchEmployeeDetails(id);
  }, [id]);

  const fetchEmployeeDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/employees/${id}`);
      const employee = response.data;
      setSelectedEmployee(employee);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setmobileNumber(employee.mobileNumber);
      setdateOfBirth(employee.dateOfBirth);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !mobileNumber || !dateOfBirth) {
      return Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'All fields are required',
        showConfirmButton: true
      });
    }
    try {
      const response = await axios.put(`http://localhost:5000/employees/${id}`, {
        firstName,
        lastName,
        email,
        mobileNumber,
        dateOfBirth
      });

      const updatedEmployee = response.data;
      console.log({employees})
      const updatedEmployees = [...employees];
      const index = updatedEmployees.findIndex((employee) => employee.id === id);

      if (index !== -1) {
        updatedEmployees[index] = updatedEmployee;
        setEmployees(updatedEmployees);

        Swal.fire({
          icon: 'success',
          title: 'UPDATED',
          text: `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s data has been updated`,
          showConfirmButton: false,
          timer: 1500
        });

        setISEditing(false);
      } else {
        console.error("Employee not found");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Failed to update employee data',
        showConfirmButton: true
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleUpdate} className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">UPDATE EMPLOYEE</h1>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
          FIRST NAME
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
          LAST NAME
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-600">
          MOBILE NUMBER
        </label>
        <input
          id="mobileNumber"
          type="text"
          name="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setmobileNumber(e.target.value)}
          className="border rounded-md p-2 w-full"
        />


        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600">
          DATE OF BIRTH
        </label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setdateOfBirth(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <div className="mt-4 flex space-x-2">
          <input
            type="submit"
            value="CONFIRM"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 cursor-pointer"
          />
          <input
            type="button"
            value="CANCEL"
            onClick={() => setISEditing(false)}
            className="bg-gray-300 text-gray-600 rounded-md px-4 py-2 hover:bg-gray-400 cursor-pointer"
          />
        </div>
      </form>
    </div>
  )
}

export default Edit;
