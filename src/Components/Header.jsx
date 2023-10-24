import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logout Successfully", {
        theme: "dark",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUp = () => {
    toast.success(
      "SignUp functionality is Disabled. Please Proceed to Sign In. Credentials are Provided There.",
      {
        theme: "dark",
      }
    );
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      <ToastContainer autoClose={2000} />
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleSignUp}
            className="text-white pr-4 border-2 px-4 py-[6px] rounded mr-2"
          >
            Sign Up
          </button>

          <Link to="/login">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded cursor-pointer text-white">
              Sign In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
