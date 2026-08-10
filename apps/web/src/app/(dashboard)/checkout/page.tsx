import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <DashboardShell title="Checkout">
      <CheckoutFlow />
    </DashboardShell>
  );
}
