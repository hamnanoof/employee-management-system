import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import API_URL from "../../utils/api";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/leave`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;

        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId,
          name: leave.employeeId?.userId?.name,
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name,
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();

    const data = leaves.filter((leave) =>
      leave.employeeId?.toLowerCase().includes(value)
    );

    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status?.toLowerCase().includes(status.toLowerCase())
    );

    setFilteredLeaves(data);
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-10 text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mt-6">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-1 border rounded"
              onChange={filterByInput}
            />

            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>

              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>

              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-6">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Table;