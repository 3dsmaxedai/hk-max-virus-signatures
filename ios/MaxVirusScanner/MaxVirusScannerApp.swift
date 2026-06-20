import SwiftUI

@main
struct MaxVirusScannerApp: App {
    @StateObject private var store = SignatureStore()

    var body: some Scene {
        WindowGroup {
            RootTabView()
                .environmentObject(store)
        }
    }
}
