import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    getDepartments();
  }, []);

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const emp = response.data.employee;
          // Flatten the nested userId.name into top-level state
          setEmployee({
            name: emp.userId?.name || "",
            maritalStatus: emp.maritalStatus || "",
            designation: emp.designation || "",
            salary: emp.salary || "",
            department: emp.department?._id || emp.department || "",
          });
        }
      } catch (error) {
        console.error(error);
        alert(
          error.response?.data?.error || "Failed to fetch employee details"
        );
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        {
          name: employee.name,
          maritalStatus: employee.maritalStatus,
          designation: employee.designation,
          salary: employee.salary,
          department: employee.department,
        },
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
      alert(
        error.response?.data?.error || "Failed to update employee"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium">Marital Status</label>
            <select
              name="maritalStatus"
              value={employee.maritalStatus}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium">Designation</label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Department</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
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
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default Edit;