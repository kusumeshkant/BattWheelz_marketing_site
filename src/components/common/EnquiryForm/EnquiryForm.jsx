"use client";

import { useId, useState } from "react";
import { enquiryForm } from "@/content/siteContent";
import { web3formsKey } from "@/config/env";
import { Icon } from "@/assets/icons";
import Button from "@/components/common/Button";
import { validateEnquiry } from "@/utils/validators";
import clsx from "@/utils/clsx";
import styles from "./EnquiryForm.module.css";

const EMPTY = { reason: "", name: "", phone: "", email: "", message: "" };

/** Web3Forms' submit endpoint. Client-side POST — no server route involved. */
const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * The enquiry form. Shared by the home page's contact section and the Contact
 * page, so the two can never drift apart in fields or validation.
 *
 * Submits straight to Web3Forms from the browser, which is what lets this stay
 * a static export — there is no API route and no server runtime to add one to.
 * Web3Forms emails the enquiry to whichever address its access key belongs to.
 *
 * If no key is configured for the build, the form does NOT pretend to send:
 * it shows the not-wired notice instead. A form that silently swallows
 * enquiries is worse than no form at all, so keep that branch.
 *
 * The `source` prop names which form the enquiry came from and ends up in the
 * email subject — the same component renders on two pages and the inbox should
 * be able to tell them apart.
 *
 * Validation behaviour: errors appear on submit, not on every keystroke, and
 * once a field has an error it re-validates as you type so the message clears
 * the moment it is fixed. Validating an untouched field as someone tabs through
 * is the pattern that makes forms feel hostile.
 *
 * @param {object} props
 * @param {boolean} [props.condensed] Drops the message field's height and the
 *        hints under each reason — for the home page's shorter treatment.
 * @param {"home"|"contact"} [props.source] Which page this instance sits on.
 */
export function EnquiryForm({ condensed = false, source = "contact" }) {
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  /** idle | sending | success | error | unconfigured */
  const [status, setStatus] = useState("idle");

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => {
      const next = { ...current, [field]: value };
      // Only re-validate fields that are already showing an error.
      if (errors[field]) setErrors(validateEnquiry(next));
      return next;
    });
  };

  /**
   * Builds the payload Web3Forms will turn into an email.
   *
   * Keys are the human labels rather than the field names, because Web3Forms
   * renders every non-reserved key straight into the email body — "Phone
   * number" reads better than "phone" to whoever opens it. `reason` is sent as
   * its label for the same reason: "fleet" means nothing in an inbox.
   */
  const buildPayload = () => {
    const reason = enquiryForm.reasons.find((option) => option.id === values.reason);
    const sourceLabel = enquiryForm.sources[source] ?? source;

    return {
      access_key: web3formsKey,
      subject: `${enquiryForm.subjectPrefix} — ${sourceLabel}`,
      from_name: "Battwheelz website",
      // Lets whoever picks this up hit reply. Omitted when the (optional)
      // email field is blank, rather than sent empty.
      ...(values.email.trim() ? { replyto: values.email.trim() } : {}),
      [enquiryForm.reasonLabel]: reason?.label ?? values.reason,
      [enquiryForm.fields.name.label]: values.name.trim(),
      [enquiryForm.fields.phone.label]: values.phone.trim(),
      [enquiryForm.fields.email.label]: values.email.trim() || "—",
      [enquiryForm.fields.message.label]: values.message.trim(),
      "Sent from": sourceLabel,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field so a keyboard or screen-reader
      // user is taken to the problem rather than left guessing.
      const firstInvalid = document.getElementById(`${formId}-${Object.keys(nextErrors)[0]}`);
      firstInvalid?.focus();
      setStatus("idle");
      return;
    }

    // Honeypot. It is hidden from people and from assistive tech, so anything
    // that filled it is a bot: drop the submit and show the same success state
    // rather than telling the bot it was caught.
    if (new FormData(form).get("botcheck")) {
      setStatus("success");
      return;
    }

    if (!web3formsKey) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Web3Forms responded ${response.status}`);
      }

      setStatus("success");
      setValues(EMPTY);
      setErrors({});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("[EnquiryForm] Submit failed:", error);
      setStatus("error");
    }
  };

  const errorFor = (field) => (errors[field] ? enquiryForm.errors[errors[field]] : null);

  /** One text/textarea field, with its label, error and ARIA wiring. */
  const renderField = (field, { type = "text", multiline = false, optional = false, wide = false }) => {
    const config = enquiryForm.fields[field];
    const id = `${formId}-${field}`;
    const errorId = `${id}-error`;
    const message = errorFor(field);
    const Tag = multiline ? "textarea" : "input";

    return (
      <div className={clsx(styles.field, wide && styles.fieldWide)}>
        <label className={styles.label} htmlFor={id}>
          {config.label}
          {optional ? <span className={styles.optional}> {enquiryForm.optionalSuffix}</span> : null}
        </label>
        <Tag
          id={id}
          name={field}
          type={multiline ? undefined : type}
          className={clsx(multiline ? styles.textarea : styles.input, message && styles.inputError)}
          placeholder={config.placeholder}
          autoComplete={config.autoComplete}
          value={values[field]}
          onChange={setField(field)}
          disabled={status === "sending"}
          rows={multiline && condensed ? 3 : undefined}
          aria-invalid={message ? true : undefined}
          aria-describedby={message ? errorId : undefined}
        />
        {message ? (
          <p className={styles.error} id={errorId}>
            <Icon name="bolt" size={14} />
            {message}
          </p>
        ) : null}
      </div>
    );
  };

  const reasonError = errorFor("reason");

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/*
        `noValidate` turns off the browser's own bubbles so ours are the only
        messages shown — theirs cannot be styled, are not announced
        consistently, and would contradict the copy in siteContent.js.
      */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{enquiryForm.reasonLabel}</legend>
        <div className={styles.reasons}>
          {enquiryForm.reasons.map((reason) => (
            <label key={reason.id} className={styles.reason}>
              <input
                className={styles.reasonInput}
                type="radio"
                name="reason"
                value={reason.id}
                id={reason.id === enquiryForm.reasons[0].id ? `${formId}-reason` : undefined}
                checked={values.reason === reason.id}
                onChange={setField("reason")}
                disabled={status === "sending"}
                aria-describedby={reasonError ? `${formId}-reason-error` : undefined}
              />
              <span className={styles.reasonLabel}>{reason.label}</span>
              {condensed ? null : <span className={styles.reasonHint}>{reason.hint}</span>}
            </label>
          ))}
        </div>
        {reasonError ? (
          <p className={styles.error} id={`${formId}-reason-error`}>
            <Icon name="bolt" size={14} />
            {reasonError}
          </p>
        ) : null}
      </fieldset>

      <div className={styles.fields}>
        {renderField("name", {})}
        {renderField("phone", { type: "tel" })}
        {renderField("email", { type: "email", optional: true, wide: true })}
        {renderField("message", { multiline: true, wide: true })}
      </div>

      {/*
        Spam honeypot. Hidden from sight AND from assistive tech, and skipped in
        the tab order, so no real person can fill it in by accident — which is
        what makes a filled one a reliable bot signal.
      */}
      <input
        type="checkbox"
        name="botcheck"
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/*
        Announced when it appears, so a screen-reader user learns the outcome of
        their submit without having to go looking for it. The failure is an
        `alert` rather than a `status`: it needs acting on.
      */}
      {status === "success" ? (
        <p className={clsx(styles.notice, styles.noticeSuccess)} role="status">
          <Icon name="shield" size={18} className={styles.noticeIcon} />
          {enquiryForm.successNotice}
        </p>
      ) : null}

      {status === "error" ? (
        <p className={clsx(styles.notice, styles.noticeError)} role="alert">
          <Icon name="bolt" size={18} className={styles.noticeIcon} />
          {enquiryForm.errorNotice}
        </p>
      ) : null}

      {status === "unconfigured" ? (
        <p className={styles.notice} role="status">
          <Icon name="shield" size={18} className={styles.noticeIcon} />
          {enquiryForm.notWiredNotice}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button type="submit" size="lg" withArrow disabled={status === "sending"}>
          {status === "sending" ? enquiryForm.sendingLabel : enquiryForm.submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default EnquiryForm;
