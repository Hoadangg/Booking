// import Home from "./pages/home/Home";

import New from "./pages/new/New";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Navbar from "../components/navbar/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Datatable from "./components/datatable/Datatable.jsx";
import "./admin.css";
function Admin() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <div className="admin">
      <Navbar type="list" />
      <div className="admin_content-wrapper"></div>
      <div className="admin_content">
        <Sidebar />
        <Outlet />
        {/* <h3 className="admin_content-text" >WELCOME TO ADMIN DASHBOARD</h3> */}
      </div>
      </div>
    </>
    // <div className={darkMode ? "app dark" : "app"}>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/">
    //         <Route path="users">
    //           <Route
    //             index
    //             element={
    //               <ProtectedRoute>
    //                 <Link>
    //                     <List columns={userColumns} />
    //                 </Link>
    //               </ProtectedRoute>
    //             }
    //           />

    //           <Route
    //             path="new"
    //             element={
    //               <ProtectedRoute>
    //                 <New inputs={userInputs} title="Add New User" />
    //               </ProtectedRoute>
    //             }
    //           />
    //         </Route>
    //         <Route path="hotels">
    //           <Route
    //             index
    //             element={
    //               <ProtectedRoute>
    //                 <List columns={hotelColumns} />
    //               </ProtectedRoute>
    //             }
    //           />

    //           <Route
    //             path="new"
    //             element={
    //               <ProtectedRoute>
    //                 <NewHotel />
    //               </ProtectedRoute>
    //             }
    //           />
    //         </Route>
    //         <Route path="rooms">
    //           <Route
    //             index
    //             element={
    //               <ProtectedRoute>
    //                 <List columns={roomColumns} />
    //               </ProtectedRoute>
    //             }
    //           />

    //           <Route
    //             path="new"
    //             element={
    //               <ProtectedRoute>
    //                 <NewRoom />
    //               </ProtectedRoute>
    //             }
    //           />
    //         </Route>
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default Admin;
