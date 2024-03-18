import axios from "axios";
import { Form, Link, redirect } from "react-router-dom";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import API_BASE_URL from "../config/config";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/organizers/login`,
      data,
      {
        withCredentials: true,
      }
    );

    const organizerId = response.data.organizerId;

    toast.success("Logged in successfully");
    return redirect(`/organizers/${organizerId}`);
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
};

const OrganizerLogin = () => {
  return (
    <>
      <h4>Login to your Event organizer account ...</h4>
      <Form method="post" className="form">
        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label>Email address</BootstrapForm.Label>
          <BootstrapForm.Control
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </BootstrapForm.Group>
        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label>Password</BootstrapForm.Label>
          <BootstrapForm.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </BootstrapForm.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>
          Don't have an event organizer account?
          <Link to="/organizers/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </>
  );
};
export default OrganizerLogin;
