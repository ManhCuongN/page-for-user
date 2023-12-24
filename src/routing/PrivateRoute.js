import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../contexts/AuthContext"
import Spinner from "react-bootstrap/Spinner";


function ProtectedRoute() {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
console.log("authloading", authLoading);
  if (authLoading)
    return (
      <div className="Spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

    // return  (
    //   <>
       
    //     <Outlet />
    //   </>
    // ) 

  return isAuthenticated ? (
    <>
     
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
