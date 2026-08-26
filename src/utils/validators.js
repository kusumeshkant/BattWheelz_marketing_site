/**
 * Client-side form validation.
 *
 * Pure functions returning either `null` (valid) or a message KEY — never the
 * message itself. The copy lives in `enquiryForm.errors` in siteContent.js like
 * every other string on the site, so error text can be reworded or translated
 * without touching validation logic.
 *
 * This is convenience validation, not trust. When a backend is wired up it must
 * validate again server-side: anything here can be bypassed with devtools.
 */

/**
 * Indian mobile numbers: ten digits starting 6-9. Optional +91 / 0 prefix and
 * any spacing or dashes are stripped before checking, because people type their
 * own number in a dozen different shapes and rejecting "98765 43210" for having
 * a space in it is a self-inflicted wound.
 */
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/**
 * Email. Deliberately permissive — the only reliable test of an address is
 * sending mail to it, and an over-strict regex rejects valid addresses
 * (new TLDs, plus-addressing, apostrophes) far more often than it catches typos.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strips spaces, dashes, brackets and a leading +91 or 0. */
export function normalisePhone(value) {
  return String(value ?? "")
    .replace(/[\s\-()]/g, "")
    .replace(/^(\+91|0)/, "");
}

export function validateName(value) {
  return String(value ?? "").trim() ? null : "nameRequired";
}

export function validatePhone(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "phoneRequired";
  return INDIAN_MOBILE.test(normalisePhone(raw)) ? null : "phoneInvalid";
}

/** Optional field: empty is valid, malformed is not. */
export function validateEmail(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  return EMAIL.test(raw) ? null : "emailInvalid";
}

export function validateMessage(value) {
  return String(value ?? "").trim() ? null : "messageRequired";
}

export function validateReason(value) {
  return value ? null : "reasonRequired";
}

/**
 * Validates a whole enquiry.
 *
 * @returns {Record<string, string>} field name -> error key. Empty when valid.
 */
export function validateEnquiry(values) {
  const checks = {
    reason: validateReason(values.reason),
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    email: validateEmail(values.email),
    message: validateMessage(values.message),
  };

  return Object.fromEntries(Object.entries(checks).filter(([, error]) => error !== null));
}
