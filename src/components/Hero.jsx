import { Container, Button } from "react-bootstrap";
import { useAppContext } from "../App";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { upcomingEvents } = useAppContext();

  const randomEvent =
    upcomingEvents[Math.floor(Math.random() * upcomingEvents.length)];
  console.log(randomEvent);

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${randomEvent.eventImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container>
        <h1>{randomEvent.title}</h1>
        <p>{randomEvent.description}</p>
        <Button variant="primary">
          <Link style={{ color: "white" }} to={`/events/${randomEvent.id}`}>
            View Details
          </Link>
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;
