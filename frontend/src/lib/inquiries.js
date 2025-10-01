// Minimal, framework-agnostic helper.
// If you already have an axios client, you can swap fetch for that.
const API_BASE = import.meta.env?.VITE_API_BASE || "";

export async function sendUnifiedInquiry(payload) {
  // payload MUST have these 8 fields
  const body = {
    fullName: payload.fullName ?? "",
    firstName: payload.firstName ?? "",
    lastName: payload.lastName ?? "",
    email: payload.email ?? "",
    phone: payload.phone ?? "",
    subject: payload.subject ?? "",
    message: payload.message ?? "",
    contactOrSample: payload.contactOrSample ?? "", // "CONTACT" or "SAMPLE"
  };

  const res = await fetch(`${API_BASE}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json().catch(() => ({}));
}