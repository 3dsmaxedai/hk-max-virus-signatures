import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import type { Severity } from "@/models/signature";
import { severityColor } from "@/models/signature";

function iconFor(severity: Severity): keyof typeof Ionicons.glyphMap {
  return severity === "Threat" ? "warning" : "help-circle";
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const color = severityColor(severity);
  return (
    <View style={[styles.badge, { backgroundColor: color + "26" }]}>
      <Ionicons name={iconFor(severity)} size={12} color={color} />
      <Text style={[styles.label, { color }]}>{severity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
