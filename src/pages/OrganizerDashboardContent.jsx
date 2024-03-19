import { Container, Row } from "react-bootstrap";
import { useOrgDashboardContext } from "./OrganizerDashboard";
import NavBar from "../components/OrgNavBar";
import OrganizerEvent from "../components/OrganizerEvent";
import { Link } from "react-router-dom";

const OrganizerDashboardContent = () => {
  const { currentOrganizer, setCurrentOrganizer } = useOrgDashboardContext();
  console.log(currentOrganizer);

  return (
    <Container>
      <NavBar />
      <div
        style={{
          paddingTop: "70px",
        }}
      >
        <p>
          These are all your created events. Events in 'pending' state will not
          be public for people to enroll in until you mark them as 'scheduled'
        </p>
        {currentOrganizer.events.length > 0 ? (
          currentOrganizer.events.map((event) => {
            return <OrganizerEvent key={event.id} event={event} />;
          })
        ) : (
          <Row>
            <h3>You have no upcoming event scheduled</h3>
            <p>
              Create your next event{" "}
              <Link to={`/organizers/${currentOrganizer.id}/create-event`}>
                here
              </Link>
            </p>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default OrganizerDashboardContent;
