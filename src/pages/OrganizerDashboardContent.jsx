import { Container } from "react-bootstrap";
import { useOrgDashboardContext } from "./OrganizerDashboard";
import NavBar from "../components/OrgNavBar";
import OrganizerEvent from "../components/OrganizerEvent";
import { useEffect } from "react";

const OrganizerDashboardContent = () => {
  const { currentOrganizer } = useOrgDashboardContext();
  useEffect(() => {
    console.log("Current Organizer updated:", currentOrganizer);
  }, [currentOrganizer]);
  return (
    <Container>
      <NavBar />
      {currentOrganizer.events.map((event) => {
        return <OrganizerEvent key={event.id} event={event} />;
      })}
    </Container>
  );
};

export default OrganizerDashboardContent;
