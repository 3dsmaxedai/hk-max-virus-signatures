import { StyleSheet, Text, View } from "react-native";
import type { Signature } from "@/models/signature";
import { SeverityBadge } from "./SeverityBadge";

export function SignatureRow({ signature }: { signature: Signature }) {
  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {signature.ThreatName}
        </Text>
        <SeverityBadge severity={signature.Severity} />
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {signature.Description}
      </Text>
      <Text style={styles.code}>{signature.Code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingVertical: 12, paddingHorizontal: 16, gap: 4 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: { fontSize: 16, fontWeight: "700", flexShrink: 1 },
  description: { fontSize: 14, color: "#6B7280" },
  code: { fontSize: 12, color: "#9CA3AF", fontFamily: "Courier" },
});
