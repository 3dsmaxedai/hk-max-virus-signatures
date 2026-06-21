# Max Virus Scanner (Expo / React Native)

A standalone **Expo** app that turns the `signatures.json` threat database in this
repo into an iPhone/iPad app you can run live via **Expo Go** — no Mac or Xcode
required for development. It's a **reference browser** plus a **paste-to-scan** tool
for known 3ds Max malware signatures. The database is bundled offline.

## Features

- **Signatures tab** — searchable, severity-filterable list with a detail screen
  (code, family, detection token, scope, severity, description).
- **Scan tab** — paste MaxScript / scene text and match it against every known
  malware token; matches link to the signature detail.
- **About tab** — database version, last-updated date, severity breakdown.

> iOS can't hand a `.max` binary to a JS app, so the scanner works on pasted text.
> The browser works fully offline regardless.

## Stack

- Expo SDK 52, React Native 0.76, TypeScript
- **expo-router** (file-based routing, typed routes enabled)

## Project layout

```
expo/
├── app/                          # expo-router screens
│   ├── _layout.tsx               # root stack
│   ├── (tabs)/                   # tab navigator
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Signatures browser
│   │   ├── scan.tsx              # Paste-to-scan
│   │   └── about.tsx             # DB stats
│   └── signature/[code].tsx      # Signature detail
├── src/
│   ├── data/signatures.json      # Bundled copy of the threat database
│   ├── models/signature.ts       # Types + helpers
│   ├── store/signatures.ts       # Load / filter / scan logic
│   └── components/                # SeverityBadge, SignatureRow
├── app.json
├── package.json
└── tsconfig.json
```

## Run it on your iPhone

1. `cd expo`
2. `npm install`
3. `npx expo start`
4. Open the **Expo Go** app on your iPhone and scan the QR code (or press `i` for a
   simulator if you have one).

That's it — changes hot-reload on the device. To ship a real standalone build later,
use EAS: `npx eas build -p ios`.

## Keeping the data in sync

`src/data/signatures.json` is a copy of the repo-root `signatures.json`. If the root
file changes, refresh it:

```sh
cp ../signatures.json src/data/signatures.json
```
