import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./AgentLayout.css";
import userImg from "../../assets/user.jpg";

const AgentLayout = () => {
  return (
    <div className="agent-layout">
      <Outlet />
    </div>
  );
};

export default AgentLayout;
