import axios from "axios";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import API_BASE_URL from "../config/config";
import { useForm } from "react-hook-form";
import { getCurrentUser, useAppContext } from "../App";

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   try {
//     await axios.post(`${API_BASE_URL}/users/login`, data, {
//       withCredentials: true,
//     });
//     toast.success("Logged in successfully");
//     return redirect("/");
//   } catch (error) {
//     console.log(error);
//     return toast.error(error?.response?.data?.message);
//   }
// };

const UserLogin = () => {
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      await axios.post(`${API_BASE_URL}/users/login`, data, {
        withCredentials: true,
      });
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
      toast.success("Logged in successfully");
      return navigate("/");
    } catch (error) {
      console.log(error);
      return toast.error(error?.response?.data?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Email address</BootstrapForm.Label>
        <BootstrapForm.Control
          type="email"
          {...register("email")}
          placeholder="Enter email"
        />
      </BootstrapForm.Group>
      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Password</BootstrapForm.Label>
        <BootstrapForm.Control
          type="password"
          {...register("password")}
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
    </form>
  );
};
export default UserLogin;
