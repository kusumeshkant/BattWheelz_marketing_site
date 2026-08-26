"use client";

import { useId, useState } from "react";
import { enquiryForm } from "@/content/siteContent";
import { Icon } from "@/assets/icons";
import Button from "@/components/common/Button";
import { validateEnquiry } from "@/utils/validators";
import clsx from "@/utils/clsx";
import styles from "./EnquiryForm.module.css";

const EMPTY = { reason: "", name: "", phone: "", email: "", message: "" };

/**
 * The enquiry form. Shared by the home page's contact section and the Contact
 * page, so the two can never drift apart in fields or validation.
 *
 * ========================= NOT CONNECTED TO A BACKEND ========================
 * `handleSubmit` below does NOT send anything anywhere. See the TODO there.
 * Rather than showing a success message that would lead a visitor to believe
 * their enquiry had been received, a valid submit renders a visible notice
 * saying the form is not wired up yet. Do not replace that with a success state
 * until a real endpoint exists — a form that silently swallows enquiries is
 * worse than no form at all.
 * ============================================================================
 *
 * Validation behaviour: errors appear on submit, not on every keystroke, and
 * once a field has an error it re-validates as you type so the message clears
 * the moment it is fixed. Validating an untouched field as someone tabs through
 * is the pattern that makes forms feel hostile.
 *
 * @param {object} props
 * @param {boolean} [props.condensed] Drops the message field's height and the
 *        hints under each reason — for the home page's shorter treatment.
 */
export function EnquiryForm({ condensed = false }) {
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => {
      const next = { ...current, [field]: value };
      // Only re-validate fields that are already showing an error.
      if (errors[field]) setErrors(validateEnquiry(next));
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field so a keyboard or screen-reader
      // user is taken to the problem rather than left guessing.
      const firstInvalid = document.getElementById(`${formId}-${Object.keys(nextErrors)[0]}`);
      firstInvalid?.focus();
      setSubmitted(false);
      return;
    }

    // TODO: wire to backend endpoint. Nothing is sent — there is no API call
    // here, no fetch, no mailto. When an endpoint exists, POST `values` to it,
    // handle the failure case, and only then replace the not-wired notice with
    // a real success state.
    // eslint-disable-next-line no-console
    console.warn("[EnquiryForm] Not wired to a backend. Payload would be:", values);
    setSubmitted(true);
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
        Announced politely when it appears, so a screen-reader user learns the
        outcome of their submit without having to go looking for it.
      */}
      {submitted ? (
        <p className={styles.notice} role="status">
          <Icon name="shield" size={18} className={styles.noticeIcon} />
          {enquiryForm.notWiredNotice}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button type="submit" size="lg" withArrow>
          {enquiryForm.submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default EnquiryForm;
