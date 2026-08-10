import {
  mockCreatePatient,
  mockGetPatient,
  mockListPatients,
  type PatientFilters,
} from "@/mocks/patients";
import type { Patient } from "@/types/patient";

export const patientsService = {
  list(filters?: PatientFilters) {
    return mockListPatients(filters);
  },

  getById(id: string) {
    return mockGetPatient(id);
  },

  create(input: Omit<Patient, "id" | "lastAppointmentAt">) {
    return mockCreatePatient(input);
  },
};
