import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config/config";

const OrganizerSignup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("organizationName", data.organizationName);
    formData.append("bio", data.bio);
    formData.append("logo", data.logo[0]);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    try {
      await axios.post(`${API_BASE_URL}/organizers/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/organizers/login");
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <h4>Sign up to start creating events...</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Organization Name</Form.Label>
          <Form.Control
            type="text"
            {...register("organizationName")}
            required
            placeholder="Enter your company name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            {...register("bio")}
            required
            placeholder="Enter your company bio"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organization Logo</Form.Label>
          <Form.Control
            type="file"
            {...register("logo")}
            required
            placeholder="Enter your company bio"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organization Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            placeholder="Enter your company email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            {...register("phone")}
            required
            placeholder="Enter your company phone number"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            required
            placeholder="Enter a secure password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
        <p>
          Already registered?
          <Link to="/organizers/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};
export default OrganizerSignup;
