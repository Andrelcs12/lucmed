import type {
  CheckoutResult,
  PaymentMethod,
  Plan,
  PlanId,
} from "@/types/payments";

export const MOCK_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 97,
    description: "Para clínicas começando a organizar a rotina.",
    features: ["Até 2 usuários", "Agenda e pacientes", "Suporte por e-mail"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 197,
    description: "Para equipes que precisam de mais produtividade.",
    features: [
      "Até 8 usuários",
      "Agenda avançada",
      "Histórico e relatórios básicos",
    ],
  },
  {
    id: "clinic",
    name: "Clinic",
    price: 347,
    description: "Para operações com múltiplos profissionais.",
    features: [
      "Usuários ilimitados",
      "Preferências avançadas",
      "Prioridade no suporte",
    ],
  },
];

export async function mockCheckout(input: {
  planId: PlanId;
  method: PaymentMethod;
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}): Promise<CheckoutResult> {
  await delay(900);

  if (input.method === "card") {
    if (
      !input.cardName?.trim() ||
      !input.cardNumber?.trim() ||
      !input.cardExpiry?.trim() ||
      !input.cardCvv?.trim()
    ) {
      return {
        status: "error",
        message: "Preencha todos os dados do cartão.",
      };
    }

    if (input.cardNumber.replace(/\s/g, "").endsWith("0000")) {
      return {
        status: "error",
        message: "Pagamento recusado (simulação Asaas).",
      };
    }

    return {
      status: "success",
      message: "Pagamento aprovado (mock Asaas).",
    };
  }

  return {
    status: "pending",
    message: "Aguardando pagamento PIX (mock Asaas).",
    pixCode:
      "00020126580014BR.GOV.BCB.PIX0136lucmed-mock-checkout-asaas520400005303986540597.005802BR5925LUCMED CLINICA DEMO6009SAO PAULO62070503***6304ABCD",
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
