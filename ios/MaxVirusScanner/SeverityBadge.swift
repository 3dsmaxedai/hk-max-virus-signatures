import SwiftUI

extension Severity {
    var color: Color {
        switch self {
        case .threat: return .red
        case .suspicious: return .orange
        }
    }

    var systemImage: String {
        switch self {
        case .threat: return "exclamationmark.triangle.fill"
        case .suspicious: return "questionmark.diamond.fill"
        }
    }
}

/// Small colored pill used in lists and detail headers.
struct SeverityBadge: View {
    let severity: Severity

    var body: some View {
        Label(severity.label, systemImage: severity.systemImage)
            .font(.caption2.weight(.semibold))
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(severity.color.opacity(0.15), in: Capsule())
            .foregroundStyle(severity.color)
    }
}

#Preview {
    HStack {
        SeverityBadge(severity: .threat)
        SeverityBadge(severity: .suspicious)
    }
    .padding()
}
