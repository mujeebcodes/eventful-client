import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useOrgDashboardContext } from "./OrganizerDashboard";
import API_BASE_URL from "../config/config";

const CreateEventPage = () => {
  const { currentOrganizer } = useOrgDashboardContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("eventImg", data.eventImg[0]);
    formData.append("venue", data.venue);
    formData.append("availableTickets", data.availableTickets);
    formData.append("eventStatus", data.eventStatus);
    formData.append("category", data.category);
    formData.append("when", data.when);

    try {
      await axios.post(`${API_BASE_URL}/events`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      navigate(`/organizers/${currentOrganizer.id}`);
      toast.success("Event created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <h4>Create a new Event ...</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Event title</Form.Label>
          <Form.Control
            type="text"
            {...register("title")}
            required
            placeholder="Enter event name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            type="text"
            {...register("description")}
            required
            placeholder="Describe the event"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Image/flyer</Form.Label>
          <Form.Control
            type="file"
            {...register("eventImg")}
            required
            placeholder="Upload a flyer/image"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Venue</Form.Label>
          <Form.Control
            type="text"
            {...register("venue")}
            placeholder="Where will the event be held?"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Available Tickets</Form.Label>
          <Form.Control
            type="text"
            {...register("availableTickets")}
            required
            placeholder="How many tickets are available?"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Event Status</Form.Label>
          <Form.Select {...register("eventStatus")}>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Category</Form.Label>
          <Form.Control
            type="text"
            {...register("category")}
            required
            placeholder="Enter a category"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Date & Time</Form.Label>
          <Form.Control type="datetime-local" {...register("when")} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Event
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
export default CreateEventPage;
