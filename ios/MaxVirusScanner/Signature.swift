import Foundation

/// A single virus / threat signature loaded from `signatures.json`.
struct Signature: Codable, Identifiable, Hashable {
    let code: String
    let threatName: String
    let family: String
    let severity: Severity
    let description: String
    let token: String
    let appliesTo: AppliesTo

    // `Code` is unique within the database, so it makes a stable id.
    var id: String { code }

    enum CodingKeys: String, CodingKey {
        case code = "Code"
        case threatName = "ThreatName"
        case family = "Family"
        case severity = "Severity"
        case description = "Description"
        case token = "Token"
        case appliesTo = "AppliesTo"
    }
}

enum Severity: String, Codable, CaseIterable, Hashable {
    case threat = "Threat"
    case suspicious = "Suspicious"

    var label: String {
        switch self {
        case .threat: return "Threat"
        case .suspicious: return "Suspicious"
        }
    }
}

enum AppliesTo: String, Codable, CaseIterable, Hashable {
    case all = "All"
    case maxSceneOnly = "MaxSceneOnly"

    var label: String {
        switch self {
        case .all: return "All files"
        case .maxSceneOnly: return "Max scene only"
        }
    }
}

/// Top-level shape of `signatures.json`.
struct SignatureDatabase: Codable {
    let version: Int
    let updated: String
    let signatures: [Signature]

    enum CodingKeys: String, CodingKey {
        case version = "Version"
        case updated = "Updated"
        case signatures = "Signatures"
    }
}
