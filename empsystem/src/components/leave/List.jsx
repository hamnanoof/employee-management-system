import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import API_URL from "../../utils/api";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!user || !user._id) return;

      try {
        const response = await axios.get(
          `${API_URL}/api/leave/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        console.error(error);

        if (error.response) {
          alert(error.response.data.error || error.message);
        }
      }
    };

    fetchLeaves();
  }, [user]);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mt-6">
        <input
          type="text"
          placeholder="Search By Leave Type"
          className="px-4 py-1 border rounded"
        />

        {user?.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3">Applied Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr key={leave._id} className="bg-white border-b">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">
                    {new Date(leave.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        leave.status === "Approved"
                          ? "bg-green-500"
                          : leave.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;