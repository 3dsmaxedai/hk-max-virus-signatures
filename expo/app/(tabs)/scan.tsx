import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignatureRow } from "@/components/SignatureRow";
import type { Signature } from "@/models/signature";
import { scanText, signatures } from "@/store/signatures";

export default function ScanScreen() {
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<Signature[] | null>(null);

  const canScan = text.trim().length > 0;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Paste script or scene text</Text>
        <TextInput
          style={styles.editor}
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Paste MaxScript here…"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Pressable
          style={[styles.button, !canScan && styles.buttonDisabled]}
          disabled={!canScan}
          onPress={() => setMatches(scanText(text))}
        >
          <Ionicons name="search" size={18} color="#fff" />
          <Text style={styles.buttonText}>Scan text</Text>
        </Pressable>

        {text.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={() => {
              setText("");
              setMatches(null);
            }}
          >
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        )}

        {matches !== null && <Results matches={matches} />}
      </ScrollView>
    </SafeAreaView>
  );
}

function Results({ matches }: { matches: Signature[] }) {
  if (matches.length === 0) {
    return (
      <View style={styles.clean}>
        <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
        <View style={{ flex: 1 }}>
          <Text style={styles.cleanTitle}>No known threats found</Text>
          <Text style={styles.cleanNote}>
            Only the {signatures.length} bundled signatures were checked. A clean
            result is not a guarantee of safety.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.results}>
      <View style={styles.resultsHeader}>
        <Ionicons name="warning" size={18} color="#E5484D" />
        <Text style={styles.resultsTitle}>
          {matches.length} threat{matches.length === 1 ? "" : "s"} detected
        </Text>
      </View>
      {matches.map((sig) => (
        <Link key={sig.Code} href={`/signature/${sig.Code}`} asChild>
          <Pressable>
            <SignatureRow signature={sig} />
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, gap: 12 },
  heading: { fontSize: 14, fontWeight: "600", color: "#6B7280" },
  editor: {
    minHeight: 160,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    fontFamily: "Courier",
    color: "#111827",
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E5484D",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  clearButton: { alignItems: "center", paddingVertical: 8 },
  clearText: { color: "#E5484D", fontWeight: "600" },
  clean: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F0FDF4",
    padding: 14,
    borderRadius: 10,
  },
  cleanTitle: { color: "#16A34A", fontWeight: "700", fontSize: 15 },
  cleanNote: { color: "#4B5563", fontSize: 13, marginTop: 2 },
  results: { gap: 4 },
  resultsHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  resultsTitle: { color: "#E5484D", fontWeight: "700", fontSize: 15 },
});
