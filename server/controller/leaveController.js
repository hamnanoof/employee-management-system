
import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

// =========================
// Add Leave
// =========================
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({
      success: true,
      message: "Leave applied successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Leave add server error",
    });
  }
};

// =========================
// Get Logged-in Employee Leaves
// =========================
const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Find employee by employee document ID
    let leaves = await Leave.find({ employeeId: id });

    // If found, return them
    if (leaves.length > 0) {
      return res.status(200).json({
        success: true,
        leaves,
      });
    }

    // Otherwise assume id is a User ID
    const employee = await Employee.findOne({ userId: id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    leaves = await Leave.find({
      employeeId: employee._id,
    });

    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Leave fetch server error",
    });
  }
};
// =========================
// Get All Leaves (Admin)
// =========================
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Leave fetch server error",
    });
  }
};

// =========================
// Get Leave Detail
// =========================
const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Leave detail fetch server error",
    });
  }
};

// =========================
// Update Leave Status
// =========================
const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Leave update server error",
    });
  }
};

export {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
};