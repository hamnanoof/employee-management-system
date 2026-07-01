import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../utils/api";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.error(error);

        if (error.response) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/leave/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  if (!leave) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!leave.employeeId || !leave.employeeId.userId) {
    return (
      <div className="text-center mt-10 text-red-600">
        Employee data not found.
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-8">
        Leave Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={`${API_URL}/${leave.employeeId.userId.profileImage}`}
            alt={leave.employeeId.userId.name}
            className="w-64 h-64 object-cover rounded-full border"
          />
        </div>

        <div>
          <div className="flex mb-2">
            <p className="font-bold w-32">Name :</p>
            <p>{leave.employeeId.userId.name}</p>
          </div>

          <div className="flex mb-2">
            <p className="font-bold w-32">Employee ID :</p>
            <p>{leave.employeeId.employeeId}</p>
          </div>

          <div className="flex mb-2">
            <p className="font-bold w-32">Leave Type :</p>
            <p>{leave.leaveType}</p>
          </div>

          <div className="flex mb-2">
            <p className="font-bold w-32">Department :</p>
            <p>{leave.employeeId.department?.dep_name}</p>
          </div>

          <div className="flex mb-2">
            <p className="font-bold w-32">Reason :</p>
            <p>{leave.reason}</p>
          </div>

          <div className="flex mb-2">
            <p className="font-bold w-32">Start Date :</p>
            <p>{new Date(leave.startDate).toLocaleDateString()}</p>
          </div>

          <div className="flex mb-2">
            <p className="font-bold w-32">End Date :</p>
            <p>{new Date(leave.endDate).toLocaleDateString()}</p>
          </div>

          <div className="flex items-center mb-2">
            <p className="font-bold w-32">
              {leave.status === "Pending" ? "Action :" : "Status :"}
            </p>

            {leave.status === "Pending" ? (
              <div className="flex space-x-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                  onClick={() => changeStatus(leave._id, "Approved")}
                >
                  Approve
                </button>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  onClick={() => changeStatus(leave._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="font-medium">{leave.status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;