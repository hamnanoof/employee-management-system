import axios from "axios";
import { useNavigate } from "react-router-dom";
import  API_URL  from "./api";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/department`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return [];
};

// Employees for Salary Form
export const getEmployees = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return [];
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log("Delete Employee:", id);

    // Add delete API here later
  };

  return (
    <div className="flex space-x-3">
      {/* View */}
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>

      {/* Edit */}
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>

      {/* Salary */}
      <button
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={() =>
          navigate(`/admin-dashboard/employees/salary/${Id}`)
        }
      >
        Salary
      </button>

      {/* Leave */}
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded"
        onClick={() =>
          navigate(`/admin-dashboard/employees/leaves/${Id}`)
        }
      >
        Leave
      </button>
    </div>
  );
};