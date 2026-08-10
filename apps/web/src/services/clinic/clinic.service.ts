import {
  mockCompleteOnboarding,
  mockGetClinic,
  mockSaveClinic,
} from "@/mocks/clinic";
import type { Clinic, OnboardingDraft } from "@/types/clinic";

export const clinicService = {
  getClinic(): Promise<Clinic> {
    return mockGetClinic();
  },

  saveClinic(input: Partial<Clinic>): Promise<Clinic> {
    return mockSaveClinic(input);
  },

  completeOnboarding(draft: OnboardingDraft): Promise<Clinic> {
    return mockCompleteOnboarding(draft);
  },
};
