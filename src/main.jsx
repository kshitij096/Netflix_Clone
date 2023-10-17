import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
// import Layout from "./Layout";
// import DashBoard from "./Components/DashBoard";
// import Header from "./Components/Header";
// import List from "./Components/List";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     //Here in place of Layout  youcan also put App component same
//     <Route path="/" element={<Layout />}>
//       <Route
//         path=""
//         element={
//           <>
//             <Header />
//             <Home />
//           </>
//         }
//       />
//       <Route
//         path="/signin"
//         element={
//           <>
//             <Header />
//             <Login />
//           </>
//         }
//       />
//       <Route
//         path="/dashboard"
//         element={
//           <>
//             {/* <Header /> */}
//             <DashBoard />
//             <List />
//           </>
//         }
//       />
//     </Route>
//   )
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
