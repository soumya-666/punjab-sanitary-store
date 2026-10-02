"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";

import { TextLink } from "@/components/ui/TextLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";
import {
  emptyEnquiry,
  enquiryMode,
  enquiryWhatsAppUrl,
  requirementOptions,
  submitEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "@/lib/enquiry";
import { directionsUrl, privacyNav, site, whatsappDisplay } from "@/lib/site";

type Status = "idle" | "submitting" | "sent" | "whatsapp" | "unconfigured" | "error";

const FIELD_ORDER: Array<keyof EnquiryValues> = ["name", "phone", "email", "requirement", "message"];

const labelClass = "eyebrow block text-ink/70";
const controlClass =
  "mt-2 block w-full rounded-none border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-[1.0625rem] text-ink placeholder:text-ink/40 transition-[border-color,box-shadow] duration-300 focus:border-walnut focus:shadow-[0_2px_0_0_var(--color-walnut)] focus:outline-none focus-visible:outline-none aria-invalid:border-[#9b3a2e]";
const errorClass = "mt-2 text-[0.875rem] font-medium text-[#8a3226]";

/**
 * Enquiry form with client-side validation and accessible error reporting.
 * How the enquiry is delivered depends on `enquiryMode` (lib/enquiry.ts): to
 * a configured endpoint, or — as set up now — by opening WhatsApp with the
 * enquiry written out for the visitor to send.
 */
export function EnquiryForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const viaWhatsApp = enquiryMode === "whatsapp";

  const fieldId = (name: keyof EnquiryValues) => `${id}-${name}`;
  const errorId = (name: keyof EnquiryValues) => `${id}-${name}-error`;

  const update = (name: keyof EnquiryValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== "idle" && status !== "submitting") setStatus("idle");
  };

  const describe = (name: keyof EnquiryValues) => ({
    id: fieldId(name),
    name,
    value: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    if (viaWhatsApp) {
      // Opened straight from the click, before anything asynchronous, so the
      // browser treats it as the visitor's own action and does not block it.
      const url = enquiryWhatsAppUrl(values);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      setWhatsappUrl(url);
      setStatus("whatsapp");
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry(values);
    setStatus(result.status);
    if (result.status === "sent") setValues(emptyEnquiry);
  };

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-ink/15 pt-10">
        <p className="text-h3 text-ink">Thank you. Your enquiry has been sent.</p>
        <p className="mt-4 max-w-md text-ink/75">
          We will be in touch. In the meantime, you are welcome to visit the showroom in Dhakoli, Zirakpur.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="eyebrow link-underline mt-8 inline-flex min-h-11 items-center text-walnut"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  if (status === "whatsapp") {
    return (
      <div role="status" className="border-t border-ink/15 pt-10">
        <p className="text-h3 text-ink">Your enquiry is ready in WhatsApp.</p>
        <p className="mt-4 max-w-md text-ink/75">
          We have opened a chat with {site.name} with your enquiry written out. Press send there and it will reach
          us. If WhatsApp did not open, use the button below.
        </p>
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-13 items-center gap-3 bg-walnut px-7 text-[0.75rem] font-semibold tracking-[0.2em] text-ivory uppercase transition-colors duration-500 ease-editorial hover:bg-timber"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span>Open WhatsApp</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
        <div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="eyebrow link-underline mt-6 inline-flex min-h-11 items-center text-walnut"
          >
            Edit the enquiry
          </button>
        </div>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Enquiry form" className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <p className="text-[0.875rem] text-ink/70 sm:col-span-2">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div>
        <label htmlFor={fieldId("name")} className={labelClass}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          {...describe("name")}
          type="text"
          autoComplete="name"
          required
          onChange={(event) => update("name", event.target.value)}
          className={controlClass}
        />
        {errors.name ? (
          <p id={errorId("name")} className={errorClass}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("phone")} className={labelClass}>
          Phone <span aria-hidden="true">*</span>
        </label>
        <input
          {...describe("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          onChange={(event) => update("phone", event.target.value)}
          className={controlClass}
        />
        {errors.phone ? (
          <p id={errorId("phone")} className={errorClass}>
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("email")} className={labelClass}>
          Email <span className="tracking-normal normal-case">(optional)</span>
        </label>
        <input
          {...describe("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          onChange={(event) => update("email", event.target.value)}
          className={controlClass}
        />
        {errors.email ? (
          <p id={errorId("email")} className={errorClass}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("requirement")} className={labelClass}>
          Requirement <span aria-hidden="true">*</span>
        </label>
        <select
          {...describe("requirement")}
          required
          onChange={(event) => update("requirement", event.target.value)}
          className={cn(controlClass, "cursor-pointer appearance-none bg-[length:1rem] bg-[right_center] bg-no-repeat pr-8", !values.requirement && "text-ink/70")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232b1e15' stroke-width='1.25'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Select an option
          </option>
          {requirementOptions.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        {errors.requirement ? (
          <p id={errorId("requirement")} className={errorClass}>
            {errors.requirement}
          </p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={fieldId("message")} className={labelClass}>
          Message <span className="tracking-normal normal-case">(optional)</span>
        </label>
        <textarea
          {...describe("message")}
          rows={4}
          onChange={(event) => update("message", event.target.value)}
          className={cn(controlClass, "resize-y")}
        />
        {errors.message ? (
          <p id={errorId("message")} className={errorClass}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        {/* Announces validation problems and submission outcomes to assistive technology. */}
        <div aria-live="polite" role="status">
          {errorCount > 0 ? (
            <p className={cn(errorClass, "mt-0 mb-6")}>
              Please correct {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} and
              try again.
            </p>
          ) : null}

          {status === "unconfigured" ? (
            <div className="mb-8 border-l-2 border-copper bg-linen p-5">
              <p className="font-semibold text-ink">Your message was not sent.</p>
              <p className="mt-2 text-ink/80">
                Online enquiries are not connected yet. Please visit {site.name} at {site.address.street},{" "}
                {site.address.area}, {site.address.locality} and our team will be glad to help.
              </p>
              <TextLink href={directionsUrl} external className="mt-3 text-walnut">
                Get Directions
              </TextLink>
            </div>
          ) : null}

          {status === "error" ? (
            <div className="mb-8 border-l-2 border-[#9b3a2e] bg-linen p-5">
              <p className="font-semibold text-ink">Something went wrong and your message was not sent.</p>
              <p className="mt-2 text-ink/80">Please try again, or visit the showroom in person.</p>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn group inline-flex min-h-13 w-full items-center justify-center gap-3 bg-walnut px-8 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ivory disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          <span aria-hidden="true" className="btn-fill bg-timber" />
          {viaWhatsApp ? <WhatsAppIcon className="size-4 shrink-0" /> : null}
          <span>{status === "submitting" ? "Sending…" : viaWhatsApp ? "Send on WhatsApp" : "Send Enquiry"}</span>
          <span aria-hidden="true" className="btn-arrow size-4">
            <ArrowRight strokeWidth={1.25} className="size-4" />
            <ArrowRight strokeWidth={1.25} className="size-4" />
          </span>
        </button>

        <p className="mt-5 max-w-md text-[0.8125rem] leading-relaxed text-ink/65">
          {viaWhatsApp
            ? `This opens WhatsApp with your enquiry written out, ready to send to ${whatsappDisplay}. Nothing is sent until you press send there. `
            : null}
          See our{" "}
          <Link href={privacyNav.href} className="font-medium text-walnut underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut">
            privacy policy
          </Link>{" "}
          for how your details are used.
        </p>
      </div>
    </form>
  );
}
