import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  API_URL  from "./api";

const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this department?"
    );

    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `${API_URL}/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        onDepartmentDelete();
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error || "Failed to delete department"
      );
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() =>
          navigate(`/admin-dashboard/edit-department/${_id}`)
        }
      >
        Edit
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};

export default DepartmentButtons;