import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import API_BASE_URL from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const { currentUser, onLogout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}/logout`, {
        withCredentials: true,
      });
      onLogout();
      navigate("/");
      return toast.success(response.data.message);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>EventFul</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {currentUser && (
            <Nav className="me-auto">
              <NavDropdown title={currentUser.firstname}>
                <NavDropdown.Item>
                  <Link to={`/users/${currentUser.id}/dashboard`}>
                    Your Dashboard
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => handleLogout(currentUser.id)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {!currentUser && (
            <Nav className="me-auto">
              <NavDropdown title="Event Organizers" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to={"/organizers/register"}>
                    Register as Event Organizer
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to={"/organizers/login"}>Login as Event Organizer</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to={"/users/register"}>Signup as User</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to={"/users/login"}>Login to User account</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
