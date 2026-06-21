import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SeverityBadge } from "@/components/SeverityBadge";
import { appliesToLabel } from "@/models/signature";
import { getByCode } from "@/store/signatures";

export default function SignatureDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const signature = getByCode(code);

  if (!signature) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Signature “{code}” not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: signature.Code }} />

      <Text style={styles.title}>{signature.ThreatName}</Text>
      <SeverityBadge severity={signature.Severity} />

      <Section title="Description">
        <Text style={styles.body}>{signature.Description}</Text>
      </Section>

      <Section title="Details">
        <Row label="Code" value={signature.Code} mono />
        <Row label="Family" value={signature.Family} />
        <Row label="Detection token" value={signature.Token} mono />
        <Row label="Applies to" value={appliesToLabel(signature.AppliesTo)} />
        <Row label="Severity" value={signature.Severity} />
      </Section>
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[styles.value, mono && styles.mono]}
        selectable
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { padding: 16, gap: 16 },
  title: { fontSize: 24, fontWeight: "800", color: "#111827" },
  section: { gap: 8 },
  sectionTitle: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, gap: 10 },
  body: { fontSize: 15, color: "#1F2937", lineHeight: 22 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  label: { fontSize: 15, color: "#6B7280" },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    flexShrink: 1,
    textAlign: "right",
  },
  mono: { fontFamily: "Courier" },
  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  missingText: { color: "#9CA3AF" },
});
