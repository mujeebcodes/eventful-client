import { Outlet, createBrowserRouter } from "react-router-dom";
import App, { loader as appLoader } from "../App";
import Homepage from "../pages/Homepage";
import EventPage, {
  action as eventAction,
  loader as eventLoader,
} from "../pages/EventPage";
import UserLogin from "../pages/UserLogin";
import UserSignUp, { action as userRegisterAction } from "../pages/UserSignUp";
import OrganizerSignup from "../pages/OrganizerSignup";
import OrganizerLogin, {
  action as organizerLoginAction,
} from "../pages/OrganizerLogin";
import UserDashBoard, {
  loader as userDashboardLoader,
} from "../pages/UserDashBoard";
import EnrollmentPage, {
  loader as enrollmentLoader,
} from "../pages/EnrollmentPage";
import OrganizerDashboard from "../pages/OrganizerDashboard";
import OrganizerHome from "../pages/OrganizerHome";
import CreateEventPage from "../pages/CreateEventPage";
import OrganizerAnalytics from "../pages/OrganizerAnalytics";
import OrganizerDashboardContent from "../pages/OrganizerDashboardContent";
import EditEventPage from "../pages/EditEventPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,

    children: [
      { path: "", element: <Homepage />, index: true },
      {
        path: "users/register",
        element: <UserSignUp />,
        action: userRegisterAction,
      },
      { path: "users/login", element: <UserLogin /> },
      {
        path: "users/:userId/dashboard",
        element: <UserDashBoard />,
        loader: userDashboardLoader,
      },
      {
        path: "users/enrollments/:enrollId",
        element: <EnrollmentPage />,
        loader: ({ params }) => {
          return enrollmentLoader(params.enrollId);
        },
      },
      {
        path: "events/:eventId",
        element: <EventPage />,
        loader: ({ params }) => {
          return eventLoader(params.eventId);
        },
        action: eventAction,
      },
    ],
  },
  {
    path: "/organizers",
    element: <OrganizerHome />,
    children: [
      {
        path: "register",
        element: <OrganizerSignup />,
      },
      {
        path: "login",
        element: <OrganizerLogin />,
        action: organizerLoginAction,
      },
      {
        path: ":organizerId",
        element: <OrganizerDashboard />,
        children: [
          { path: "", element: <OrganizerDashboardContent /> },
          { path: "create-event", element: <CreateEventPage /> },
          { path: "edit-event/:eventId", element: <EditEventPage /> },
          { path: "analytics", element: <OrganizerAnalytics /> },
        ],
      },
    ],
  },
]);
