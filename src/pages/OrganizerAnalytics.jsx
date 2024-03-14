import axios from "axios";
import { Card, Container, Table } from "react-bootstrap";
import API_BASE_URL from "../config/config";
import { useEffect, useState } from "react";
import { useOrgDashboardContext } from "./OrganizerDashboard";
import NavBar from "../components/OrgNavBar";
import { useNavigate } from "react-router-dom";

const OrganizerAnalytics = () => {
  const navigate = useNavigate();
  const { currentOrganizer } = useOrgDashboardContext();
  const [analytics, setAnalytics] = useState();
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/organizers/${currentOrganizer.id}/analytics`,
          { withCredentials: true }
        );
        const { organizerAnalytics } = response.data;
        setAnalytics(organizerAnalytics);
      } catch (error) {
        if (error?.response?.data?.statusCode === 401) {
          return navigate("/organizers/login");
        }
      }
    };

    fetchAnalytics();
  }, []);
  console.log(analytics);
  if (!analytics) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <NavBar />
      <Card>
        <Card.Header>
          <h4>Your Analytics</h4>
        </Card.Header>
        <Card.Body>
          <p>Total Events Organized: {analytics.totalEventsOrganized}</p>
          <p>All-Time Enrollments: {analytics.allTimeEnrollments}</p>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event</th>
                <th>Total Enrollment</th>
                <th>Scanned In</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(analytics.individualEventsStats).map(
                ([eventName, stats]) => (
                  <tr key={eventName}>
                    <td>{eventName}</td>
                    <td>{stats.totalEnrollment}</td>
                    <td>{stats.scannedIn}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default OrganizerAnalytics;
