export type ClinicHours = {
  days: string[];
  startTime: string;
  endTime: string;
  defaultDurationMinutes: number;
};

export type ClinicAddress = {
  zip: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type ClinicProfile = {
  name: string;
  document: string;
  phone: string;
  email: string;
  logo?: string;
  publicInfo?: string;
};

export type Clinic = ClinicProfile & {
  id: string;
  address: ClinicAddress;
  hours: ClinicHours;
};

export type OnboardingDraft = {
  profile: ClinicProfile;
  address: ClinicAddress;
  hours: ClinicHours;
};
