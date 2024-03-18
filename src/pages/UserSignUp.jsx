import axios from "axios";
import { Form, Link, redirect } from "react-router-dom";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import API_BASE_URL from "../config/config";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post(`${API_BASE_URL}/users/signup`, data);
    toast.success("User registered successfully");
    return redirect("/users/login");
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
};
const UserSignUp = () => {
  return (
    <>
      <h3>New User Registration</h3>
      <Form method="post">
        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label>First Name</BootstrapForm.Label>
          <BootstrapForm.Control
            type="text"
            name="firstname"
            required
            placeholder="Enter your first name"
          />
        </BootstrapForm.Group>
        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label>Last Name</BootstrapForm.Label>
          <BootstrapForm.Control
            type="text"
            name="lastname"
            required
            placeholder="Enter your last name"
          />
        </BootstrapForm.Group>

        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label>Email address</BootstrapForm.Label>
          <BootstrapForm.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            required
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
          Already a member?
          <Link to="/users/login">Login</Link>
        </p>
      </Form>
    </>
  );
};
export default UserSignUp;
