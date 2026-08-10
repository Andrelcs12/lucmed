export type PlanId = "starter" | "pro" | "clinic";

export type PaymentMethod = "pix" | "card";

export type CheckoutStatus =
  | "idle"
  | "processing"
  | "pending"
  | "success"
  | "error";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  description: string;
  features: string[];
};

export type CheckoutResult = {
  status: CheckoutStatus;
  message: string;
  pixCode?: string;
};
