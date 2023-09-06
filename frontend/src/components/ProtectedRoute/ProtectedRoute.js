import { Navigate } from "react-router-dom"
import Header from "../Header/Header";

const ProtectedRoute = ({ element: Component, ...props  }) => {
    return (
      props.loggedIn ? 
      (
      <>
        <Component {...props} />
      </>
      ) : (
      <Navigate to="/sign-in" replace />
      )
  )}

  
export default ProtectedRoute;