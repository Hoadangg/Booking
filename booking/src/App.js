import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

import { UserContextProvider } from "./globalState.js";
import { SearchContextProvider } from "./context/SearchContext.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import Admin from "./admin/Admin.js";
import ProtectedRoute from "./admin/utils/ProtectedRoute.js";
import Users from "./admin/components/user/Users.jsx";
import Hotels from "./admin/components/hotels/Hotels.jsx";
import Rooms from "./admin/components/rooms/Rooms.jsx";
import New from "./admin/pages/new/New.jsx";
import NewHotel from "./admin/pages/newHotel/NewHotel.jsx";
import NewRoom from "./admin/pages/newRoom/NewRoom.jsx";
import Mails from "./admin/components/mails/Mails.jsx";
import UpdateHotel from "./admin/pages/updateHotel/UpdateHotel.jsx";

import { userInputs, hotelInputs, roomInputs } from "./admin/formSource.js";
import EditContent from "./admin/pages/editContent/EditContent.jsx";
import Tour from "./components/tours/Tour";
import Tours from "./pages/tour/Tours";
function App() {
  
  
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<List />} />
              <Route path="/hotels/:id" element={<Hotel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tours/:id" element={<Tours/>}/>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              >
                <Route path="users" element={<Users />} />
                <Route path="hotels" element={<Hotels />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="mails" element={<Mails />} />
                <Route path="mails/edit" element={<EditContent />} />
                <Route
                  path="users/new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
                <Route
                  path="hotels/new"
                  element={
                    <NewHotel inputs={hotelInputs} title="Add New Hotel" />
                  }
                />
                <Route
                  path="hotels/update"
                  element={
                    <UpdateHotel inputs={hotelInputs} title="Update Hotel" />
                  }
                />

                <Route
                  path="rooms/new"
                  element={<NewRoom inputs={roomInputs} title="Add New Room" />}
                />
              </Route>
              {/* <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              /> */}
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </AuthContextProvider>
    </UserContextProvider>
  );
}

export default App;
