import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user?._id || "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeave((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        console.error(error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">

          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>

            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              From Date
            </label>

            <input
              type="date"
              name="startDate"
              value={leave.startDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              To Date
            </label>

            <input
              type="date"
              name="endDate"
              value={leave.endDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="reason"
              value={leave.reason}
              placeholder="Reason"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;