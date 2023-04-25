import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    if (!user?.isAdmin) {
      return <Navigate to="/" />;
    }
    
    return children;
  };
export default ProtectedRoute