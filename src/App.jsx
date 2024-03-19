import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import NavBar from "./components/UserNavbar";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config/config";
import { toast } from "react-toastify";

export const loader = async () => {
  const response = await axios.get(`${API_BASE_URL}/events`);
  localStorage.setItem("upcoming", JSON.stringify(response.data));
  return response.data;
};

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/users/current-user`, {
    withCredentials: true,
  });
  return data;
};

const AppContext = createContext({});

function App() {
  const loadedEvents = useLoaderData();
  const [upcomingEvents, setUpcomingEvents] = useState(loadedEvents || []);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUserInEffect = async () => {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
    };
    getCurrentUserInEffect();
  }, []);

  const logoutUser = async (id) => {
    try {
      navigate("/");
      await axios.get(`${API_BASE_URL}/users/${id}/logout`, {
        withCredentials: true,
      });
      setCurrentUser(null);
      localStorage.removeItem("currentUser");

      toast.success("Logging out...");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{ currentUser, setCurrentUser, logoutUser, upcomingEvents }}
    >
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
