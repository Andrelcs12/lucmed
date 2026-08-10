import { MOCK_PLANS, mockCheckout } from "@/mocks/payments";
import type { PaymentMethod, PlanId } from "@/types/payments";

/**
 * Checkout service prepared for future Asaas integration.
 * Never put API keys or secrets in the frontend.
 */
export const checkoutService = {
  listPlans() {
    return MOCK_PLANS;
  },

  checkout(input: {
    planId: PlanId;
    method: PaymentMethod;
    cardName?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
  }) {
    return mockCheckout(input);
  },
};
