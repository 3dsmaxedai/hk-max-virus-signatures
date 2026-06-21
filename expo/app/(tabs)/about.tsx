import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SeverityBadge } from "@/components/SeverityBadge";
import { SEVERITIES } from "@/models/signature";
import {
  countBySeverity,
  signatures,
  updated,
  version,
} from "@/store/signatures";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Section title="Database">
          <Row label="Version" value={`v${version}`} />
          <Row label="Updated" value={updated} />
          <Row label="Signatures" value={`${signatures.length}`} />
        </Section>

        <Section title="Breakdown by severity">
          {SEVERITIES.map((s) => (
            <View key={s} style={styles.row}>
              <SeverityBadge severity={s} />
              <Text style={styles.value}>{countBySeverity(s)}</Text>
            </View>
          ))}
        </Section>

        <Section title="About">
          <Text style={styles.body}>
            A reference and quick-scan tool for known 3ds Max malware signatures.
            The signature database is bundled offline; no data leaves your device.
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { padding: 16, gap: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: { fontSize: 15, color: "#6B7280" },
  value: { fontSize: 15, fontWeight: "600", color: "#111827" },
  body: { fontSize: 14, color: "#4B5563", lineHeight: 20, paddingVertical: 4 },
});
