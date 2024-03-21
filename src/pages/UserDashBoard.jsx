import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import API_BASE_URL from "../config/config";
import { toast } from "react-toastify";
import Enrollment from "../components/Enrollment";

export const loader = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/users/enrollments`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);

    return redirect("/users/login");
  }
};

const UserDashBoard = () => {
  const { currentUser } = useAppContext();
  console.log(currentUser);
  const enrollments = useLoaderData();
  const navigate = useNavigate();

  const handleCancelEnrollment = async (enrollmentId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/events/enrollment/${enrollmentId}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      return navigate(`/users/${currentUser.id}/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{`${currentUser.firstname} ${currentUser.lastname}`}</h2>
        </Col>
        <Col>
          <h2>{currentUser.email}</h2>
        </Col>
      </Row>
      <Row>
        <h3>Your upcoming events</h3>
        {Array.isArray(enrollments) ? (
          enrollments.map((enrollment) => {
            return (
              <Enrollment
                key={enrollment.id}
                enrollment={enrollment}
                handleCancelEnrollment={handleCancelEnrollment}
              />
            );
          })
        ) : (
          <Col>
            <h3>{enrollments.msg}</h3>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default UserDashBoard;
