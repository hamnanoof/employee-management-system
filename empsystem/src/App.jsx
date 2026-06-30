import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

import AdminSummary from "./components/dashboard/AdminSummary";

import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";

import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";

import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route
          path="/"
          element={<Navigate to="/admin-dashboard" replace />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />

          {/* Department */}
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="edit-department/:id" element={<EditDepartment />} />

          {/* Employee */}
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />

          {/* Salary */}
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />

          {/* Leave */}
          <Route path="leaves" element={<Table />} />
          <Route path="leave/:id" element={<Detail />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />

          {/* Setting */}
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* ================= EMPLOYEE ================= */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />} />

          {/* Profile */}
          <Route path="profile/:id" element={<View />} />

          {/* Leave */}
          <Route path="leaves" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />

          {/* Salary */}
          <Route path="salary/:id" element={<ViewSalary />} />

          {/* Setting */}
          <Route path="setting" element={<Setting />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;