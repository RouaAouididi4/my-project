import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-dashboard-container">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
