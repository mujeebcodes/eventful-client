import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import API_BASE_URL from "../config/config";

const OrgDashboardContext = createContext({});

export const fetchCurrentOrganizer = async (organizerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/organizers/${organizerId}`,
    { withCredentials: true }
  );
  return response.data;
};

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { organizerId } = useParams();
  const [currentOrganizer, setCurrentOrganizer] = useState(
    JSON.parse(localStorage.getItem("currentOrganizer")) || null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentOrgInUseEffect = async () => {
      try {
        const organizer = await fetchCurrentOrganizer(organizerId);
        setCurrentOrganizer(organizer);
        localStorage.setItem("currentOrganizer", JSON.stringify(organizer));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("currentOrganizer");
        return navigate("/organizers/login");
      }
    };
    fetchCurrentOrgInUseEffect();
  }, [organizerId]);

  return (
    <OrgDashboardContext.Provider
      value={{ currentOrganizer, setCurrentOrganizer }}
    >
      <>{isLoading ? <p>Loading ....</p> : <Outlet />}</>
    </OrgDashboardContext.Provider>
  );
};
export default OrganizerDashboard;
export const useOrgDashboardContext = () => useContext(OrgDashboardContext);
