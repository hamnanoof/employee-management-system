import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import axios from "axios";
import API_URL from "../../utils/api";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);

      try {
        const response = await axios.get(
          `${API_URL}/api/employee`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;

          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name,
            name: emp.userId?.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`${API_URL}/${emp.userId?.profileImage}`}
                alt="Employee"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error(error);

        if (error.response) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name?.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredEmployees(records);
  };

  return (
    <div className="p-5">
      <div>
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center mt-5">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          progressPending={empLoading}
          pagination
        />
      </div>
    </div>
  );
};

export default List;