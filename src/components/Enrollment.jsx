import { Card, Row, Col, Button, Modal, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { useState } from "react";

const Enrollment = ({ enrollment, handleCancelEnrollment }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onCancelEnrollment = async (enrollmentId) => {
    handleCancelEnrollment(enrollmentId);
  };

  return (
    <Card key={enrollment.id} className="mb-3">
      <Card.Body>
        <Row>
          <Col sm={4}>
            <div className="image-container">
              <Image src={enrollment.event.eventImg} thumbnail />
            </div>
          </Col>
          <Col sm={8}>
            <Card.Title>{enrollment.event.title}</Card.Title>
            <Card.Text>
              Event Date: {formatDate(enrollment.event.when)}
            </Card.Text>
            <Card.Text>Venue: {enrollment.event.venue}</Card.Text>
            <Card.Text>Category: {enrollment.event.category}</Card.Text>
            <Card.Text>
              Enrollment date: {formatDate(enrollment.enrollmentDate)}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-between">
        <Link to={`/users/enrollments/${enrollment.id}`}>
          <Button variant="primary">More details</Button>
        </Link>
        <Button onClick={() => setShowConfirmation(true)} variant="danger">
          Cancel enrollment
        </Button>
      </Card.Footer>

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
    </Card>
  );
};

export default Enrollment;
