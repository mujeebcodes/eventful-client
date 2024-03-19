import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useAppContext } from "../App";

const NavBar = () => {
  const { currentUser, logoutUser, setCurrentUser } = useAppContext();
  console.log(currentUser);

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

                <NavDropdown.Item onClick={() => logoutUser(currentUser.id)}>
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
