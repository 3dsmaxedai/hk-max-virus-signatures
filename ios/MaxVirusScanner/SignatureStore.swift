import Foundation

/// Loads the bundled signature database and exposes it to the UI.
@MainActor
final class SignatureStore: ObservableObject {
    @Published private(set) var database: SignatureDatabase?
    @Published private(set) var loadError: String?

    var signatures: [Signature] { database?.signatures ?? [] }
    var version: Int { database?.version ?? 0 }
    var updated: String { database?.updated ?? "—" }

    init() {
        load()
    }

    func load() {
        guard let url = Bundle.main.url(forResource: "signatures", withExtension: "json") else {
            loadError = "signatures.json was not found in the app bundle."
            return
        }
        do {
            let data = try Data(contentsOf: url)
            database = try JSONDecoder().decode(SignatureDatabase.self, from: data)
            loadError = nil
        } catch {
            loadError = "Could not read signatures.json: \(error.localizedDescription)"
        }
    }

    /// Filters by free-text query and severity. Empty query matches everything.
    func filtered(query: String, severity: Severity?) -> [Signature] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return signatures.filter { sig in
            let matchesSeverity = severity == nil || sig.severity == severity
            guard matchesSeverity else { return false }
            guard !trimmed.isEmpty else { return true }
            return sig.code.lowercased().contains(trimmed)
                || sig.threatName.lowercased().contains(trimmed)
                || sig.family.lowercased().contains(trimmed)
                || sig.token.lowercased().contains(trimmed)
                || sig.description.lowercased().contains(trimmed)
        }
    }

    /// Scans arbitrary text (e.g. pasted MaxScript) for known malware tokens.
    /// Matching is case-insensitive, which mirrors how MaxScript identifiers behave.
    func scan(text: String) -> [Signature] {
        let haystack = text.lowercased()
        guard !haystack.isEmpty else { return [] }
        return signatures.filter { sig in
            let token = sig.token.lowercased()
            return !token.isEmpty && haystack.contains(token)
        }
    }
}
