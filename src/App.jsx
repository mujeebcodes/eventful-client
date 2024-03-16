import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import NavBar from "./components/UserNavbar";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config/config";
import { toast } from "react-toastify";

const AppContext = createContext({});

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/users/current-user`, {
          withCredentials: true,
        });
        console.log(data);

        setCurrentUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
    };
    getCurrentUser();
  }, []);

  const logoutUser = async (id) => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      navigate("/");
      await axios.get(`${API_BASE_URL}/users/${id}/logout`, {
        withCredentials: true,
      });

      toast.success("Logging out...");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{ currentUser, logoutUser }}>
      <>
        <NavBar />
        <div
          style={{
            paddingTop: "70px",
          }}
        >
          <Outlet />
        </div>
      </>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default App;
