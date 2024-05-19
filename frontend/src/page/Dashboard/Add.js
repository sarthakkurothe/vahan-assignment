import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Add({ setEmployees, setIsAdding }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const textInput = useRef(null);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    console.log("Request Data:", { firstName, lastName, email, mobileNumber, dateOfBirth });
    if (!firstName || !lastName || !email || !mobileNumber || !dateOfBirth) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required.',
        showConfirmButton: true,
        timer: 1500,
      });
    }
    const employeeData = {
    firstName,
    lastName,
    email,
    mobileNumber,
    dateOfBirth
  };

     try {
    const response = await axios.post('http://localhost:5000/employees', employeeData);
    console.log("Response:", response.data);
    console.log(dateOfBirth)
    setEmployees((prevEmployees) => [...prevEmployees, response.data]);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'ADDED',
      text: `${firstName} ${lastName}'s data has been added`,
      showConfirmButton: false,
      timer: 1500,
    });
  } 
  catch (error) {
    console.error('Error adding employee:', error);
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Failed to add employee. Please try again later.',
      showConfirmButton: true,
      timer: 1500,
    });
  }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleAdd} className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">ADD EMPLOYEE</h1>
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
            onClick={() => setIsAdding(false)}
            className="bg-gray-300 text-gray-600 rounded-md px-4 py-2 hover:bg-gray-400 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
