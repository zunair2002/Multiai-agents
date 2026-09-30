import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Mainpage from "./pages/Mainpage/Mainhome.jsx"
import Login from "./pages/authentication/Login.jsx";
import Landing from "./pages/Landing.jsx";
import { getcurrentUser } from "./features/GetcurrentUser.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userdatasclice.js";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getcurrentUser();
        if (currentUser) {
          const user = { ...currentUser };
          delete user.firebaseId;
          console.log("App.js sy fetch data:", user);
          dispatch(setUser(user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        dispatch(setUser(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/workspace"
          element={user ? <Mainpage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
