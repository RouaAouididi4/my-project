import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../context/auth";
import ClientNavbar from "../ClientNavbar";

const AuthLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("auth layout", storedUser);
    if (!storedUser) {
      logout();
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  return (
    <div>
      {user?.role === "client" && <ClientNavbar />}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
