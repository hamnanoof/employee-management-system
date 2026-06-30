import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

// =======================
// Multer Storage Config
// =======================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// =======================
// Add Employee
// =======================

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Check existing user
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        error: "User already registered",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    // Create Employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Server error while adding employee",
    });
  }
};


// =======================
// Get All Employees
// =======================

const getEmployees = async (req, res) => {

  try {

    const employees = await Employee.find()
      .populate("userId", "-password")
      .populate("department");

    return res.status(200).json({
      success: true,
      employees,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Get employees server error",
    });
  }
};


// =======================
// Get Single Employee
// =======================

// =======================
// Get Single Employee
// =======================

const getEmployee = async (req, res) => {
  const { id } = req.params;

  console.log("Received ID:", id);

  try {

    // First try Employee _id (Admin Dashboard)
    let employee = await Employee.findById(id)
      .populate("userId", "-password")
      .populate("department");

    // If not found, try User _id (Employee Dashboard)
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", "-password")
        .populate("department");
    }

    console.log(employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Get employee server error",
    });
  }
};
// =======================
// Update Employee
// =======================

const updateEmployee = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {

      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    const user = await User.findById(employee.userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Update User
    await User.findByIdAndUpdate(
      employee.userId,
      { name },
      { new: true }
    );

    // Update Employee
    await Employee.findByIdAndUpdate(
      id,
      {
        maritalStatus,
        designation,
        department,
        salary,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Update employee server error",
    });
  }
};


// =======================
// Fetch Employees By Department
// =======================

const fetchEmployeesByDepId = async (req, res) => {

  const { id } = req.params;

  try {

    const employees = await Employee.find({
      department: id,
    })
      .populate("userId", "-password")
      .populate("department");

    return res.status(200).json({
      success: true,
      employees,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Get employees by department server error",
    });
  }
};


// =======================
// Export
// =======================

export {
  upload,
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
};