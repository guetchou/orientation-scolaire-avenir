
import { AppointmentCalendar } from "../appointments/AppointmentCalendar";
import { AppointmentHistory } from "../appointments/AppointmentHistory";

export const AppointmentManagement = () => {
  return (
    <div className="space-y-6">
      <AppointmentCalendar />
      <AppointmentHistory />
    </div>
  );
};
