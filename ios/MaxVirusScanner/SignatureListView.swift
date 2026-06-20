import SwiftUI

struct SignatureListView: View {
    @EnvironmentObject private var store: SignatureStore
    @State private var query = ""
    @State private var severityFilter: Severity?

    private var results: [Signature] {
        store.filtered(query: query, severity: severityFilter)
    }

    var body: some View {
        NavigationStack {
            Group {
                if let error = store.loadError {
                    ContentUnavailableView("Couldn't load signatures",
                                           systemImage: "exclamationmark.triangle",
                                           description: Text(error))
                } else if results.isEmpty {
                    ContentUnavailableView.search(text: query)
                } else {
                    List(results) { sig in
                        NavigationLink(value: sig) {
                            SignatureRow(signature: sig)
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Signatures")
            .navigationDestination(for: Signature.self) { SignatureDetailView(signature: $0) }
            .searchable(text: $query, prompt: "Search name, family, or token")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Picker("Severity", selection: $severityFilter) {
                            Text("All severities").tag(Severity?.none)
                            ForEach(Severity.allCases, id: \.self) { sev in
                                Text(sev.label).tag(Severity?.some(sev))
                            }
                        }
                    } label: {
                        Label("Filter", systemImage: severityFilter == nil
                              ? "line.3.horizontal.decrease.circle"
                              : "line.3.horizontal.decrease.circle.fill")
                    }
                }
            }
            .safeAreaInset(edge: .bottom) {
                Text("\(results.count) of \(store.signatures.count) signatures · DB v\(store.version)")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .padding(.vertical, 6)
                    .frame(maxWidth: .infinity)
                    .background(.bar)
            }
        }
    }
}

struct SignatureRow: View {
    let signature: Signature

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(signature.threatName)
                    .font(.headline)
                Spacer()
                SeverityBadge(severity: signature.severity)
            }
            Text(signature.description)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .lineLimit(2)
            Text(signature.code)
                .font(.caption.monospaced())
                .foregroundStyle(.tertiary)
        }
        .padding(.vertical, 2)
    }
}

#Preview {
    SignatureListView()
        .environmentObject(SignatureStore())
}
