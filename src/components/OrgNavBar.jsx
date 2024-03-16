import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useOrgDashboardContext } from "../pages/OrganizerDashboard";
import axios from "axios";
import API_BASE_URL from "../config/config";
import { toast } from "react-toastify";

const NavBar = () => {
  const { currentOrganizer } = useOrgDashboardContext();
  const navigate = useNavigate();

  const handleLogout = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/organizers/${id}/logout`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      localStorage.removeItem("currentOrganizer");
      return navigate("/organizers/login");
    } catch (error) {
      console.error("Logout error:", error);
      return navigate("/organizers/login");
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to={`/organizers/${currentOrganizer.id}`}>Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={`/organizers/${currentOrganizer.id}/create-event`}>
              <Button variant="light">Create a new event</Button>
            </Link>
            <Link to={`/organizers/${currentOrganizer.id}/analytics`}>
              <Button variant="light">Your analytics</Button>
            </Link>
            <NavDropdown title={currentOrganizer.organizationName}>
              <NavDropdown.Item
                onClick={() => handleLogout(currentOrganizer.id)}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
