import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignatureRow } from "@/components/SignatureRow";
import type { Severity } from "@/models/signature";
import { SEVERITIES } from "@/models/signature";
import { filterSignatures, signatures, version } from "@/store/signatures";

export default function SignaturesScreen() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<Severity | null>(null);

  const results = useMemo(
    () => filterSignatures(query, severity),
    [query, severity]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.input}
          placeholder="Search name, family, or token"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.filters}>
        <FilterChip
          label="All"
          active={severity === null}
          onPress={() => setSeverity(null)}
        />
        {SEVERITIES.map((s) => (
          <FilterChip
            key={s}
            label={s}
            active={severity === s}
            onPress={() => setSeverity(s)}
          />
        ))}
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.Code}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Link href={`/signature/${item.Code}`} asChild>
            <Pressable android_ripple={{ color: "#eee" }}>
              <SignatureRow signature={item} />
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No signatures match “{query}”.</Text>
        }
      />

      <Text style={styles.footer}>
        {results.length} of {signatures.length} signatures · DB v{version}
      </Text>
    </SafeAreaView>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
  },
  input: { flex: 1, fontSize: 16, color: "#111827" },
  filters: { flexDirection: "row", gap: 8, padding: 16 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  chipActive: { backgroundColor: "#E5484D" },
  chipText: { fontSize: 13, fontWeight: "600", color: "#374151" },
  chipTextActive: { color: "#fff" },
  separator: { height: 1, backgroundColor: "#F3F4F6", marginLeft: 16 },
  empty: { textAlign: "center", color: "#9CA3AF", marginTop: 40 },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
});
