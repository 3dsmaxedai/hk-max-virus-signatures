import SwiftUI

struct RootTabView: View {
    var body: some View {
        TabView {
            SignatureListView()
                .tabItem { Label("Signatures", systemImage: "list.bullet.rectangle") }

            ScanView()
                .tabItem { Label("Scan", systemImage: "doc.text.magnifyingglass") }

            AboutView()
                .tabItem { Label("About", systemImage: "info.circle") }
        }
    }
}

#Preview {
    RootTabView()
        .environmentObject(SignatureStore())
}
