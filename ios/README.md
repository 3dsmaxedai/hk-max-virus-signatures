# MaxVirusScanner (iOS)

A small SwiftUI app that turns the `signatures.json` threat database in this repo
into an iPhone/iPad app. It's a **reference browser** plus a **paste-to-scan** tool
for known 3ds Max malware signatures. The database is bundled offline — nothing
leaves the device.

## Features

- **Signatures tab** — searchable, severity-filterable list of all signatures with
  a detail view (code, family, detection token, scope, severity, description).
- **Scan tab** — paste MaxScript / scene text and check it against every known
  malware token. Matches are flagged and link straight to the signature detail.
- **About tab** — database version, last-updated date, and severity breakdown.

> Note: iOS sandboxing means the app can't read `.max` binaries directly, so the
> scanner works on pasted text. The browser works fully offline regardless.

## Project layout

```
ios/
├── MaxVirusScanner.xcodeproj        # Xcode project (objectVersion 77, Xcode 16+)
└── MaxVirusScanner/
    ├── MaxVirusScannerApp.swift     # App entry point
    ├── RootTabView.swift            # Tab container
    ├── Signature.swift              # Codable models matching signatures.json
    ├── SignatureStore.swift         # Loads JSON, filtering + scanning logic
    ├── SignatureListView.swift      # Browser list + search/filter
    ├── SignatureDetailView.swift    # Per-signature detail
    ├── ScanView.swift               # Paste-to-scan
    ├── AboutView.swift              # Database stats
    ├── SeverityBadge.swift          # Shared severity pill
    ├── signatures.json              # Bundled copy of the threat database
    └── Assets.xcassets              # App icon + accent color slots
```

The project uses Xcode 16 **file-system-synchronized groups**, so any file you add
under `MaxVirusScanner/` is picked up automatically — no need to edit the project.

## Requirements

- **Xcode 16 or newer** (uses `objectVersion = 77` and SwiftUI APIs like
  `ContentUnavailableView`).
- iOS 17.0+ deployment target.

## Build & run on your iPhone (needs a Mac)

1. On a Mac, open `ios/MaxVirusScanner.xcodeproj` in Xcode.
2. Select the `MaxVirusScanner` scheme and your iPhone as the run destination.
3. In **Signing & Capabilities**, set your own Team and a unique Bundle Identifier
   (the default is `com.thethirddimension.MaxVirusScanner`). A free Apple ID works
   for installing on your own device (the app expires after 7 days; a paid Apple
   Developer account avoids that).
4. Press **Run** (⌘R). Trust the developer profile on the iPhone if prompted under
   *Settings → General → VPN & Device Management*.

## No Mac? Build in the cloud

A GitHub Actions workflow at `.github/workflows/ios-build.yml` compiles the app on a
macOS runner for the simulator on every push. That verifies the project builds, but
**installing on a physical iPhone still requires code signing** with your Apple
account — which needs either:

- a Mac, or
- a cloud Mac CI service (e.g. Codemagic, Xcode Cloud, or a self-hosted macOS
  runner) configured with your signing certificate and provisioning profile.

## Keeping the data in sync

`MaxVirusScanner/signatures.json` is a copy of the repo-root `signatures.json`.
If the root file changes, refresh the bundled copy:

```sh
cp signatures.json ios/MaxVirusScanner/signatures.json
```
