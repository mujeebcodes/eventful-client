import axios from "axios";
import { Outlet, useParams } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import API_BASE_URL from "../config/config";

const OrgDashboardContext = createContext({});

const OrganizerDashboard = () => {
  const { organizerId } = useParams();
  const [currentOrganizer, setCurrentOrganizer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCurrentOrganizer = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/organizers/${organizerId}`,
          { withCredentials: true }
        );
        const organizer = response.data;
        setCurrentOrganizer(organizer);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    fetchCurrentOrganizer();
  }, [organizerId]);

  return (
    <OrgDashboardContext.Provider value={{ currentOrganizer }}>
      <>{isLoading ? <p>Loading ....</p> : <Outlet />}</>
    </OrgDashboardContext.Provider>
  );
};
export default OrganizerDashboard;
export const useOrgDashboardContext = () => useContext(OrgDashboardContext);
