import React, { useState, useEffect } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    const getDepartmentsData = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    getDepartmentsData();
  }, []);

  // Fetch employees based on department
  const handleDepartment = async (e) => {
    const departmentId = e.target.value;

    setSalary((prev) => ({
      ...prev,
      department: departmentId,
      employeeId: "",
    }));

    try {
      const emps = await getEmployees(departmentId);
      setEmployees(emps || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSalary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit salary
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to add salary");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Department */}
          <div>
            <label className="block text-sm font-medium">
              Department
            </label>

            <select
              name="department"
              value={salary.department}
              onChange={handleDepartment}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Department</option>

              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee */}
          <div>
            <label className="block text-sm font-medium">
              Employee
            </label>

            <select
              name="employeeId"
              value={salary.employeeId}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium">
              Basic Salary
            </label>

            <input
              type="number"
              name="basicSalary"
              value={salary.basicSalary}
              onChange={handleChange}
              placeholder="Basic Salary"
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Allowances */}
          <div>
            <label className="block text-sm font-medium">
              Allowances
            </label>

            <input
              type="number"
              name="allowances"
              value={salary.allowances}
              onChange={handleChange}
              placeholder="Allowances"
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Deductions */}
          <div>
            <label className="block text-sm font-medium">
              Deductions
            </label>

            <input
              type="number"
              name="deductions"
              value={salary.deductions}
              onChange={handleChange}
              placeholder="Deductions"
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Pay Date */}
          <div>
            <label className="block text-sm font-medium">
              Pay Date
            </label>

            <input
              type="date"
              name="payDate"
              value={salary.payDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default Add;