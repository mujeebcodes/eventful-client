import axios from "axios";
import { Button, Container, Image } from "react-bootstrap";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { Form as BootstrapForm } from "react-bootstrap";
import { useAppContext } from "../App";
import { toast } from "react-toastify";
import { formatDate } from "../utils/helpers";
import API_BASE_URL from "../config/config";
import moment from "moment";

export async function loader(eventId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
    const event = response.data;
    return event;
  } catch (error) {
    console.log(error);
    return null;
  }
}
let user;

export const action = async ({ request, params }) => {
  console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const payload = { whenToRemind: `${data.prefix} ${data.suffix}` };

  try {
    await axios.post(
      `${API_BASE_URL}/events/${params.eventId}/enroll`,
      payload,
      {
        withCredentials: true,
      }
    );
    toast.success("enrollment successful");
    return redirect(`/users/${user.id}/dashboard`);
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.message);
  }
};

const EventPage = () => {
  const event = useLoaderData();
  const { currentUser } = useAppContext();
  user = currentUser;

  return (
    <Container className="my-4">
      <div className="text-center">
        <h1 className="mb-3">{event.title}</h1>
        <Image src={event.eventImg} alt={event.title} fluid />
      </div>

      <div className="mt-4">
        <p className="lead">{event.description}</p>
        <ul className="list-unstyled">
          <li>
            <strong>Venue:</strong> {event.venue}
          </li>
          <li>
            <strong>When:</strong>{" "}
            {moment(event.when).format("MMMM D, YYYY h:mm A")}
          </li>
          <li>
            <strong>Available Tickets:</strong> {event.availableTickets}
          </li>
          <li>
            <strong>Event Status:</strong> {event.eventStatus}
          </li>
          <li>
            <strong>Category:</strong> {event.category}
          </li>
          <li>
            <strong>Organizer:</strong> {event.organizer.organizationName}
          </li>
        </ul>

        {currentUser ? (
          <Form method="post">
            <h5 className="mb-3">Set your pre-event reminder</h5>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Select
                aria-label="Default select example"
                name="prefix"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </BootstrapForm.Select>
              <BootstrapForm.Select
                aria-label="Default select example"
                name="suffix"
              >
                <option value="hour">hour(s)</option>
                <option value="day">day(s)</option>
                <option value="week">week(s)</option>
              </BootstrapForm.Select>
            </BootstrapForm.Group>
            <Button type="submit" variant="primary" size="lg">
              Enroll in Event
            </Button>
          </Form>
        ) : (
          <div className="mt-4">
            <p>
              To enroll in this event,{" "}
              <Link to={"/users/register"}>Register</Link> or{" "}
              <Link to={"/users/login"}>Login</Link>
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};
export default EventPage;
