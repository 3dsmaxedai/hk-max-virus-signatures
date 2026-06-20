import SwiftUI

/// Paste MaxScript / scene text and check it against known malware tokens.
/// iOS apps can't read `.max` binaries directly, but pasted script text works.
struct ScanView: View {
    @EnvironmentObject private var store: SignatureStore
    @State private var text = ""
    @State private var matches: [Signature]?

    var body: some View {
        NavigationStack {
            Form {
                Section("Paste script or scene text") {
                    TextEditor(text: $text)
                        .frame(minHeight: 160)
                        .font(.body.monospaced())
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                }

                Section {
                    Button {
                        matches = store.scan(text: text)
                    } label: {
                        Label("Scan text", systemImage: "magnifyingglass")
                            .frame(maxWidth: .infinity)
                    }
                    .disabled(text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)

                    if !text.isEmpty {
                        Button(role: .destructive) {
                            text = ""
                            matches = nil
                        } label: {
                            Label("Clear", systemImage: "trash")
                                .frame(maxWidth: .infinity)
                        }
                    }
                }

                if let matches {
                    resultSection(matches)
                }
            }
            .navigationTitle("Scan")
        }
    }

    @ViewBuilder
    private func resultSection(_ matches: [Signature]) -> some View {
        if matches.isEmpty {
            Section {
                Label("No known threats found", systemImage: "checkmark.seal.fill")
                    .foregroundStyle(.green)
            } footer: {
                Text("This only checks the \(store.signatures.count) known signatures in the bundled database. A clean result is not a guarantee of safety.")
            }
        } else {
            Section {
                ForEach(matches) { sig in
                    NavigationLink(value: sig) {
                        SignatureRow(signature: sig)
                    }
                }
            } header: {
                Label("\(matches.count) threat\(matches.count == 1 ? "" : "s") detected",
                      systemImage: "exclamationmark.triangle.fill")
                    .foregroundStyle(.red)
            }
            .navigationDestination(for: Signature.self) { SignatureDetailView(signature: $0) }
        }
    }
}

#Preview {
    ScanView()
        .environmentObject(SignatureStore())
}
