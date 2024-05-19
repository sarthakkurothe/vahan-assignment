import React from 'react';

function List({ employees, selectedEmployee, handleEdit, handleDelete }) {
  const formatter = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${monthNames[monthIndex]}-${year}`;
};

  return (
    <div className="overflow-x-auto w-screen">
      <table className="w-full border-collapse">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 text-center">S.NO</th>
            <th className="px-4 py-2 text-center">FIRST NAME</th>
            <th className="px-4 py-2 text-center">LAST NAME</th>
            <th className="px-4 py-2 text-center">EMAIL</th>
            <th className="px-4 py-2 text-center">MOBILE NUMBER</th>
            <th className="px-4 py-2 text-center">DATE OF BIRTH</th>
            <th className="px-4 py-2 col-span-2 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="border px-4 py-2 text-center">{i + 1}</td>
                <td className="border px-4 py-2 text-center">{employee.firstName}</td>
                <td className="border px-4 py-2 text-center">{employee.lastName}</td>
                <td className="border px-4 py-2 text-center">{employee.email}</td>
                <td className="border px-4 py-2 text-center">{employee.mobileNumber}</td>
                <td className="border px-4 py-2 text-center">{formatter(employee.dateOfBirth)}</td>

                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleEdit(employee.id)}
                  >
                    EDIT
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleDelete(employee.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 col-span-7 text-center">-----------NO EMPLOYEES TO DISPLAY-----------</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
