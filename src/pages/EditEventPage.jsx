import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useOrgDashboardContext } from "./OrganizerDashboard";
import API_BASE_URL from "../config/config";

const EditEventPage = () => {
  const { currentOrganizer } = useOrgDashboardContext();
  const { eventId } = useParams();
  let currentEvent = currentOrganizer.events.find(
    (event) => event.id == eventId
  );

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formattedDate = new Date(data.when + "Z").toISOString();
    console.log(data, data.eventImg.length);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.eventImg.length > 0) {
      formData.append("eventImg", data.eventImg[0]);
    }
    formData.append("venue", data.venue);
    formData.append("availableTickets", data.availableTickets);
    formData.append("eventStatus", data.eventStatus);
    formData.append("category", data.category);
    formData.append("when", formattedDate);

    try {
      await axios.patch(`${API_BASE_URL}/events/${currentEvent.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      navigate(`/organizers/${currentOrganizer.id}`);
      toast.success("Event modified successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <h4>{`Editing ${currentEvent.title} `}</h4>
      <form method="patch" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Event title</Form.Label>
          <Form.Control
            type="text"
            {...register("title")}
            required
            defaultValue={currentEvent ? currentEvent.title : ""}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            type="text"
            {...register("description")}
            required
            defaultValue={currentEvent ? currentEvent.description : ""}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Image/flyer</Form.Label>
          <Form.Control
            type="file"
            {...register("eventImg")}
            placeholder="Upload a flyer/image"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Venue</Form.Label>
          <Form.Control
            type="text"
            {...register("venue")}
            defaultValue={currentEvent ? currentEvent.venue : ""}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Available Tickets</Form.Label>
          <Form.Control
            type="text"
            {...register("availableTickets")}
            required
            defaultValue={currentEvent ? currentEvent.availableTickets : ""}
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
            defaultValue={currentEvent ? currentEvent.category : ""}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Date & Time</Form.Label>
          <Form.Control
            type="datetime-local"
            {...register("when")}
            required
            defaultValue={currentEvent ? currentEvent.when.slice(0, -1) : ""}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Edit Event
        </Button>
      </form>
    </>
  );
};
export default EditEventPage;
