import { Navigate, UserAuth } from "../Components/index";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
