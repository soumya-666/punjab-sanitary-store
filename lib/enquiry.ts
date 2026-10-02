import { site, whatsappLink } from "@/lib/site";

/**
 * Enquiry form: field definitions, validation and how an enquiry is delivered.
 *
 * There are three ways the form can deliver an enquiry — see `enquiryMode`:
 *
 *  - "endpoint"  NEXT_PUBLIC_ENQUIRY_ENDPOINT is set (a form service or your own
 *                API route): the enquiry is sent there as a JSON POST.
 *  - "whatsapp"  no endpoint, but a WhatsApp number is set in lib/site.ts: the
 *                form opens WhatsApp with the enquiry written out, and the
 *                visitor presses send. Nothing is sent or stored by the website.
 *  - "none"      neither is set: the form says honestly that it is not connected.
 *
 * The privacy policy (app/privacy-policy) reads `enquiryMode` and describes
 * whichever one is in use, so the two cannot drift apart.
 */

export const requirementOptions = [
  "Complete bathroom",
  "Sanitaryware",
  "Faucets",
  "Showers",
  "Wash basins",
  "Toilets",
  "Bathroom accessories",
  "Vanity units",
  "LED mirrors",
  "Something else",
] as const;

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  requirement: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  phone: "",
  email: "",
  requirement: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!digits) {
    errors.phone = "Please enter a phone number we can reach you on.";
  } else if (digits.length < 10 || digits.length > 13) {
    errors.phone = "Please enter a valid phone number, including all 10 digits.";
  }

  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address, or leave this blank.";
  }

  if (!values.requirement) {
    errors.requirement = "Please choose what you are looking for.";
  }

  if (values.message.trim().length > 1500) {
    errors.message = "Please keep your message under 1,500 characters.";
  }

  return errors;
}

const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim() || null;

export type EnquiryMode = "endpoint" | "whatsapp" | "none";

export const enquiryMode: EnquiryMode = endpoint ? "endpoint" : site.contact.whatsapp ? "whatsapp" : "none";

/** The enquiry written out as a WhatsApp message, and the link that opens it. */
export function enquiryWhatsAppUrl(values: EnquiryValues): string | null {
  const lines = [
    `Enquiry from the ${site.name} website`,
    "",
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    ...(values.email.trim() ? [`Email: ${values.email.trim()}`] : []),
    `Looking for: ${values.requirement}`,
    ...(values.message.trim() ? ["", values.message.trim()] : []),
  ];
  return whatsappLink(lines.join("\n"));
}

export type EnquiryResult = { status: "sent" } | { status: "unconfigured" } | { status: "error" };

/** Sends the enquiry to the configured endpoint. Only used in "endpoint" mode. */
export async function submitEnquiry(values: EnquiryValues): Promise<EnquiryResult> {
  if (!endpoint) return { status: "unconfigured" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(values),
    });
    return response.ok ? { status: "sent" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
