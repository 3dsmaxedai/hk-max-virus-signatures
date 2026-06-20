import SwiftUI

struct AboutView: View {
    @EnvironmentObject private var store: SignatureStore

    var body: some View {
        NavigationStack {
            List {
                Section("Database") {
                    LabeledContent("Version", value: "v\(store.version)")
                    LabeledContent("Updated", value: store.updated)
                    LabeledContent("Signatures", value: "\(store.signatures.count)")
                }

                Section("Breakdown by severity") {
                    ForEach(Severity.allCases, id: \.self) { sev in
                        LabeledContent {
                            Text("\(store.signatures.filter { $0.severity == sev }.count)")
                        } label: {
                            SeverityBadge(severity: sev)
                        }
                    }
                }

                Section("About") {
                    Text("A reference and quick-scan tool for known 3ds Max malware signatures. The signature database is bundled offline; no data leaves your device.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }
            .navigationTitle("About")
        }
    }
}

#Preview {
    AboutView()
        .environmentObject(SignatureStore())
}
