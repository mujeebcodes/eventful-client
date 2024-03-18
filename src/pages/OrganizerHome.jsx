import { Outlet } from "react-router-dom";

const OrganizerHome = () => {
  return (
    <div>
      <h1>Eventful for Event Organizers</h1>
      <Outlet />
    </div>
  );
};
export default OrganizerHome;
