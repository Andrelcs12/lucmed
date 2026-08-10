import type { Patient } from "@/types/patient";

let patients: Patient[] = [
  {
    id: "pat_1",
    name: "Ana Souza",
    document: "123.456.789-00",
    phone: "(11) 90000-1111",
    email: "ana@email.com",
    status: "active",
    lastAppointmentAt: "2026-08-01",
    birthDate: "1990-04-12",
    notes: "Retorno cardiológico.",
  },
  {
    id: "pat_2",
    name: "Carlos Lima",
    document: "222.333.444-55",
    phone: "(11) 90000-2222",
    email: "carlos@email.com",
    status: "active",
    lastAppointmentAt: "2026-07-20",
    birthDate: "1985-11-03",
  },
  {
    id: "pat_3",
    name: "Marina Dias",
    document: "333.444.555-66",
    phone: "(11) 90000-3333",
    email: "marina@email.com",
    status: "active",
    lastAppointmentAt: "2026-08-05",
  },
  {
    id: "pat_4",
    name: "Pedro Alves",
    document: "987.654.321-00",
    phone: "(11) 90000-4444",
    email: "pedro@email.com",
    status: "active",
    lastAppointmentAt: "2026-07-28",
  },
  {
    id: "pat_5",
    name: "Julia Rocha",
    document: "111.222.333-44",
    phone: "(11) 90000-5555",
    email: "julia@email.com",
    status: "inactive",
    lastAppointmentAt: "2026-06-12",
  },
];

export type PatientFilters = {
  query?: string;
  status?: "all" | "active" | "inactive";
  sort?: "name" | "lastAppointment";
};

export async function mockListPatients(filters: PatientFilters = {}) {
  await delay(400);
  const query = filters.query?.trim().toLowerCase() ?? "";
  const status = filters.status ?? "all";
  const sort = filters.sort ?? "name";

  let result = [...patients];

  if (query) {
    result = result.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.document.includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.phone.includes(query),
    );
  }

  if (status !== "all") {
    result = result.filter((patient) => patient.status === status);
  }

  result.sort((a, b) => {
    if (sort === "lastAppointment") {
      return (b.lastAppointmentAt ?? "").localeCompare(
        a.lastAppointmentAt ?? "",
      );
    }
    return a.name.localeCompare(b.name, "pt-BR");
  });

  return result;
}

export async function mockGetPatient(id: string) {
  await delay(300);
  return patients.find((patient) => patient.id === id) ?? null;
}

export async function mockCreatePatient(
  input: Omit<Patient, "id" | "lastAppointmentAt">,
) {
  await delay(500);
  const patient: Patient = {
    ...input,
    id: `pat_${Date.now()}`,
  };
  patients = [patient, ...patients];
  return patient;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
