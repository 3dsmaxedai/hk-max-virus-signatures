import SwiftUI

struct SignatureDetailView: View {
    let signature: Signature

    var body: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 8) {
                    Text(signature.threatName)
                        .font(.title2.bold())
                    SeverityBadge(severity: signature.severity)
                }
                .padding(.vertical, 4)
            }

            Section("Description") {
                Text(signature.description)
            }

            Section("Details") {
                DetailRow(label: "Code", value: signature.code, monospaced: true)
                DetailRow(label: "Family", value: signature.family)
                DetailRow(label: "Detection token", value: signature.token, monospaced: true)
                DetailRow(label: "Applies to", value: signature.appliesTo.label)
                DetailRow(label: "Severity", value: signature.severity.label)
            }
        }
        .navigationTitle(signature.code)
        .navigationBarTitleDisplayMode(.inline)
    }
}

private struct DetailRow: View {
    let label: String
    let value: String
    var monospaced = false

    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            Text(label)
                .foregroundStyle(.secondary)
            Spacer()
            Text(value)
                .multilineTextAlignment(.trailing)
                .textSelection(.enabled)
                .font(monospaced ? .body.monospaced() : .body)
        }
    }
}

#Preview {
    NavigationStack {
        SignatureDetailView(signature: Signature(
            code: "ALC",
            threatName: "ALC (BetaCleaner)",
            family: "ALC",
            severity: .threat,
            description: "ALC / AutodeskLicSerStuckCleanBeta — registers a persistent global and drops scripts into the Max startup folder.",
            token: "AutodeskLicSerStuckCleanBeta",
            appliesTo: .all
        ))
    }
}
