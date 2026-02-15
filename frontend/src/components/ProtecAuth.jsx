import { Navigate } from "react-router-dom";

const ProtectedAuth = (props) => {
  const { children } = props;
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("token needed");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAuth;
