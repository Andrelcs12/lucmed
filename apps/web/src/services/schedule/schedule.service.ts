import { mockCreateAppointment, mockListAppointments } from "@/mocks/schedule";
import type { Appointment } from "@/types/appointment";

export const scheduleService = {
  list() {
    return mockListAppointments();
  },

  create(
    input: Omit<Appointment, "id" | "status"> & {
      status?: Appointment["status"];
    },
  ) {
    return mockCreateAppointment(input);
  },
};
