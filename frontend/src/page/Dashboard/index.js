import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "./Header";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import { useEffect } from "react";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setISEditing] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); 

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        throw new Error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch employee details with ID: ${id}`);
      }
      const employee = await response.json();
      setSelectedEmployee(employee);
      setSelectedEmployeeId(id); 
      setISEditing(true);
    } catch (error) {
      console.error("Error fetching or setting employee details:", error);
    }
  };

const handleDelete = async (id) => {
  console.log("Delete requested for ID:", id);
  const employeeToDelete = employees.find((employee) => employee.id === id);
  if (!employeeToDelete) {
    console.log("Employee not found for ID:", id);
    return;
  }

  Swal.fire({
    icon: "warning",
    title: "Please confirm to delete",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.value) {
      try {
        console.log("Deleting employee with ID:", id);

        const response = await fetch(`http://localhost:5000/employees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Received response from DELETE request:", response);

        if (response.ok) {
          console.log("Employee deleted successfully");
          setEmployees(employees.filter((employee) => employee.id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted Successfully!",
            text: `${employeeToDelete.firstName} ${employeeToDelete.lastName}'s data has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.error("Failed to delete employee, response status:", response.status);
          const errorData = await response.json();
          console.error("Error details:", errorData);
          Swal.fire({
            icon: "error",
            title: "Failed to Delete",
            text: errorData.message || "Failed to delete employee",
          });
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while deleting the employee. Please try again later.",
        });
      }
    } else {
      console.log("Delete action was cancelled");
    }
  });
};


  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
      )}

      {isAdding && <Add setEmployees={setEmployees} setIsAdding={setIsAdding} />}

      {isEditing && (
        <Edit
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setISEditing={setISEditing}
          selectedEmployeeId={selectedEmployeeId} 
          employees={employees} 
        />
      )}
    </div>
  );
}

export default Dashboard;
