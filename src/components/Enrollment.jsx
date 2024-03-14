import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { useState } from "react";

const Enrollment = ({ enrollment, handleCancelEnrollment }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const onCancelEnrollment = async (enrollmentId) => {
    handleCancelEnrollment(enrollmentId);
  };
  return (
    <>
      <Card key={enrollment.id}>
        <Row>
          <Card.Title>{enrollment.event.title}</Card.Title>
        </Row>
        <Row>
          <Col>Date: {formatDate(enrollment.event.when)}</Col>
          <Col>Venue: {enrollment.event.venue}</Col>
        </Row>
        <Row>
          <Col>Category: {enrollment.event.category}</Col>
          <Col>Enrollment date: {formatDate(enrollment.enrollmentDate)}</Col>
        </Row>
        <Row>
          <Col>
            <Link to={`/users/enrollments/${enrollment.id}`}>
              <Button>More details</Button>
            </Link>
          </Col>
          <Col>
            <Button onClick={() => setShowConfirmation(true)}>
              Cancel enrollment
            </Button>
          </Col>
        </Row>
      </Card>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel enrollment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel your enrollment in this event?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => onCancelEnrollment(enrollment.id)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Enrollment;
