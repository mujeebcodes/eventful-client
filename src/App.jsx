import { createContext, useContext } from "react";
import "./App.css";
import { Outlet } from "react-router";
import NavBar from "./components/UserNavbar";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import API_BASE_URL from "./config/config";

export async function loader() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/users/current-user`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const AppContext = createContext({});

function App() {
  let currentUser = useLoaderData();

  const onLogout = () => {
    currentUser = null;
  };

  return (
    <AppContext.Provider value={{ currentUser, onLogout }}>
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
