import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { formatDate } from "../utils/helpers";
import API_BASE_URL from "../config/config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const OrganizerEvent = ({ event }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancelEvent = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/events/${id}`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setShowConfirmation(false);
      return navigate(`/organizers/${event.organizerId}`);
    } catch (error) {
      console.error("Error canceling event:", error);
      toast.error(error?.response?.data?.message);
    }

    setShowConfirmation(false);
  };
  return (
    <React.Fragment>
      <Card>
        <Col>
          <Row>
            <p>
              <strong>{event.title}</strong>
            </p>
            <p>Date: {formatDate(event.when)}</p>
            <p>Venue: {event.venue}</p>
            <p>Tickets Remaining: {event.availableTickets}</p>
          </Row>
        </Col>
        <Col>
          <Button variant="primary" className="m-2">
            <Link
              style={{ color: "white" }}
              to={`/organizers/${event.organizerId}/edit-event/${event.id}`}
            >
              {" "}
              Edit event
            </Link>
          </Button>

          <Button variant="danger" onClick={() => setShowConfirmation(true)}>
            Cancel event
          </Button>
        </Col>
      </Card>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this event?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            No
          </Button>
          <Button variant="primary" onClick={() => handleCancelEvent(event.id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default OrganizerEvent;
