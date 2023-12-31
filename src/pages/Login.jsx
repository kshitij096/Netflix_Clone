import {
  useState,
  useNavigate,
  UserAuth,
  ToastContainer,
  toast,
} from "../Components/index";

import "react-toastify/dist/ReactToastify.css";
// import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);

      // console.log(auth);

      navigate("/");
      toast.success("LogIn Successfully", {
        theme: "dark",
      });
    } catch (error) {
      // console.log(error);
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/user-not-found":
          setError("User not found or not registered");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        default:
          setError(error.message);
          break;
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <ToastContainer autoClose={2000} />

      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="/"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>
            {error ? <p className="p-3 bg-red-400 my-2">{error}</p> : null}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                htmlFor="email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-gray-700 rouded"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-gray-700 rouded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button className="bg-red-600 py-3 my-6 rounded font-bold">
                Sign In
              </button>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>
                  <input className="mr-2" type="checkbox" />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-4">
                <span className="text-gray-500">New to Netflix?</span>{" "}
                {/* <Link to="/signup">Sign Up</Link> */}
              </p>
              <p className="bg-red-800">
                <span className="text-gray-400 ">
                  For Test Purpose Only Sign In option is there- Please Login
                  Using Email and Password Provided Below<br></br>{" "}
                  <span className="text-gray-300 ">
                    Email - test@test.com <br></br>
                    Password - 123456
                  </span>
                </span>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
