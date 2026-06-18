export interface ParsedInfo {
  description: string;
  experience: string[];
}

export interface ParsedCertificates {
  certificates: string[];
}

/**
 * Parses the teacher's info field.
 * Handles both JSON strings containing description/experience and raw text.
 */
export function parseTeacherInfo(infoStr?: string): ParsedInfo {
  if (!infoStr) return { description: "", experience: [] };
  try {
    const parsed = JSON.parse(infoStr);
    if (parsed && typeof parsed === "object") {
      return {
        description: parsed.description || "",
        experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      };
    }
  } catch {
    // Not valid JSON, treat as raw description
  }
  return { description: infoStr, experience: [] };
}

/**
 * Parses the teacher's certificates field.
 * Handles both JSON strings containing a certificates array and raw text (split by newline).
 */
export function parseTeacherCertificates(certStr?: string): ParsedCertificates {
  if (!certStr) return { certificates: [] };
  try {
    const parsed = JSON.parse(certStr);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.certificates)) {
      return {
        certificates: parsed.certificates,
      };
    }
  } catch {
    // Not valid JSON, handle as raw text with possible newlines
  }

  // Fallback: split raw text by newlines and trim each item
  const list = certStr
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return { certificates: list };
}

/**
 * Serializes the description and experience list into a JSON string.
 */
export function serializeTeacherInfo(description: string, experience: string[]): string {
  return JSON.stringify({
    description: description.trim(),
    experience: experience.map((e) => e.trim()).filter(Boolean),
  });
}

/**
 * Serializes the certificates list into a JSON string.
 */
export function serializeTeacherCertificates(certificates: string[]): string {
  return JSON.stringify({
    certificates: certificates.map((c) => c.trim()).filter(Boolean),
  });
}
