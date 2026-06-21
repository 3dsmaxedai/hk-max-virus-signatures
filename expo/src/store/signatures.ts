import database from "@/data/signatures.json";
import type { Severity, Signature, SignatureDatabase } from "@/models/signature";

// The bundled database is the single source of truth; loaded synchronously
// since it ships inside the JS bundle.
const db = database as SignatureDatabase;

export const signatures: Signature[] = db.Signatures;
export const version: number = db.Version;
export const updated: string = db.Updated;

export function getByCode(code: string): Signature | undefined {
  return signatures.find((s) => s.Code === code);
}

/** Filters by free-text query and optional severity. Empty query matches all. */
export function filterSignatures(
  query: string,
  severity: Severity | null
): Signature[] {
  const q = query.trim().toLowerCase();
  return signatures.filter((s) => {
    if (severity && s.Severity !== severity) return false;
    if (!q) return true;
    return (
      s.Code.toLowerCase().includes(q) ||
      s.ThreatName.toLowerCase().includes(q) ||
      s.Family.toLowerCase().includes(q) ||
      s.Token.toLowerCase().includes(q) ||
      s.Description.toLowerCase().includes(q)
    );
  });
}

/**
 * Scans arbitrary text (e.g. pasted MaxScript) for known malware tokens.
 * Case-insensitive, mirroring how MaxScript identifiers behave.
 */
export function scanText(text: string): Signature[] {
  const haystack = text.toLowerCase();
  if (!haystack) return [];
  return signatures.filter((s) => {
    const token = s.Token.toLowerCase();
    return token.length > 0 && haystack.includes(token);
  });
}

export function countBySeverity(severity: Severity): number {
  return signatures.filter((s) => s.Severity === severity).length;
}
