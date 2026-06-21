export type Severity = "Threat" | "Suspicious";
export type AppliesTo = "All" | "MaxSceneOnly";

export interface Signature {
  Code: string;
  ThreatName: string;
  Family: string;
  Severity: Severity;
  Description: string;
  Token: string;
  AppliesTo: AppliesTo;
}

export interface SignatureDatabase {
  Version: number;
  Updated: string;
  Signatures: Signature[];
}

export const SEVERITIES: Severity[] = ["Threat", "Suspicious"];

export function appliesToLabel(value: AppliesTo): string {
  return value === "All" ? "All files" : "Max scene only";
}

export function severityColor(severity: Severity): string {
  return severity === "Threat" ? "#E5484D" : "#F76B15";
}
