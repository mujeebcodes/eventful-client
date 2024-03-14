import axios from "axios";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import API_BASE_URL from "../config/config";

export const loader = async (enrollId) => {
  try {
    console.log(enrollId);
    const response = await axios.get(
      `${API_BASE_URL}/users/enrollments/${enrollId}`,
      { withCredentials: true }
    );
    const enrollment = response.data;
    console.log(enrollment);
    return enrollment;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const EnrollmentPage = () => {
  const enrollment = useLoaderData();
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center">
            <Image src={enrollment.QRCode} alt="QR Code" fluid />
          </div>
          <div className="mt-4">
            <h3 className="mb-3">Enrollment Details</h3>
            <Row>
              <Col xs={6} className="font-weight-bold">
                Event Title:
              </Col>
              <Col xs={6}>{enrollment.event.title}</Col>
            </Row>
            <Row>
              <Col xs={6} className="font-weight-bold">
                Enrollment Date:
              </Col>
              <Col xs={6}>{enrollment.enrollmentDate}</Col>
            </Row>
            <Row>
              <Col xs={6} className="font-weight-bold">
                User:
              </Col>
              <Col
                xs={6}
              >{`${enrollment.user.firstname} ${enrollment.user.lastname}`}</Col>
            </Row>
            {/* Add more details as needed */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default EnrollmentPage;
