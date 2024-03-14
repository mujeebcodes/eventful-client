import axios from "axios";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import API_BASE_URL from "../../config/config";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post(`${API_BASE_URL}/users/login`, data, {
      withCredentials: true,
    });
    toast.success("Logged in successfully");
    return redirect("/");
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.message);
  }
};

const UserLogin = () => {
  return (
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
        Not a member?
        <Link to="/users/register">Register</Link>
      </p>
    </Form>
  );
};
export default UserLogin;
