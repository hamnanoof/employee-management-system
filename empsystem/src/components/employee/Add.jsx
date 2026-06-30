import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "employee",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartments();
      setDepartments(data || []);
    };

    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error || "Failed to add employee"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Department
            </label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option
                  key={dep._id}
                  value={dep._id}
                >
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          {/* Role */}
<div>
  <label className="block text-sm font-medium">
    Role
  </label>

  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="mt-1 p-2 block w-full border  rounded-md"
    required
  >
    <option value="">Select Role</option>
    <option value="admin">Admin</option>
    <option value="employee">Employee</option>
  </select>
</div>

          <div>
            <label className="block text-sm font-medium">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
            />
          </div>

        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;