import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/" />;
  }

  // Redirect if the role doesn't match
  if (role && userRole !== role) {
    // If user is a Counselor but trying to access student routes, redirect them
    if (userRole === "counselor") {
      return <Navigate to="/counselor/*" />;
    }
    // If user is a Student but trying to access counselor routes, redirect them
    if (userRole === "student") {
      return <Navigate to="/student/*" />;
    }

    if (userRole === "psychometrician") {
        return <Navigate to="/psychometrician/*" />;
    }
}

  // Otherwise, render the child components
  return children;
}

export default ProtectedRoute;
