import type { Clinic, OnboardingDraft } from "@/types/clinic";

let clinicStore: Clinic = {
  id: "clinic_demo",
  name: "Clínica LucMed Demo",
  document: "12.345.678/0001-90",
  phone: "(11) 98888-0000",
  email: "contato@clinicademo.com",
  logo: "",
  publicInfo: "Clínica de exemplo para desenvolvimento da interface.",
  address: {
    zip: "01310-100",
    street: "Av. Paulista",
    number: "1000",
    complement: "Sala 12",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
  },
  hours: {
    days: ["seg", "ter", "qua", "qui", "sex"],
    startTime: "08:00",
    endTime: "18:00",
    defaultDurationMinutes: 30,
  },
};

export async function mockGetClinic(): Promise<Clinic> {
  await delay(400);
  return structuredClone(clinicStore);
}

export async function mockSaveClinic(
  input: Partial<Clinic> | OnboardingDraft,
): Promise<Clinic> {
  await delay(700);

  if ("profile" in input) {
    clinicStore = {
      ...clinicStore,
      ...input.profile,
      address: input.address,
      hours: input.hours,
    };
  } else {
    clinicStore = {
      ...clinicStore,
      ...input,
      address: input.address ?? clinicStore.address,
      hours: input.hours ?? clinicStore.hours,
    };
  }

  return structuredClone(clinicStore);
}

export async function mockCompleteOnboarding(
  draft: OnboardingDraft,
): Promise<Clinic> {
  return mockSaveClinic(draft);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
