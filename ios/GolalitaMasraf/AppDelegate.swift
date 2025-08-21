import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import GoogleMaps
import Firebase
import UserNotifications
import Notifee
import CodePush

@main
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    
    // Configure Google Maps
    GMSServices.provideAPIKey("AIzaSyAYjhzanBtI_zeCxlnel5cw7zriaWTcOTo")
    
    // Configure Firebase
    FirebaseApp.configure()
    
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "GolalitaMasraf", // Matches app.json name
      in: window,
      launchOptions: launchOptions
    )
    
    // Configure Push Notifications
    UNUserNotificationCenter.current().delegate = self
    
    let center = UNUserNotificationCenter.current()
    let authOptions: UNAuthorizationOptions = [.alert, .sound, .badge]
    center.requestAuthorization(options: authOptions) { granted, error in
      // Handle authorization result
    }
    
    // Register for remote notifications
    application.registerForRemoteNotifications()

    return true
  }
  
  // MARK: - Push Notification Methods
  
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let fcmToken = Messaging.messaging().fcmToken
    print("FCM registration token: \(fcmToken ?? "nil")")
    
    // Notifee handles device token registration automatically
    Notifee.setNotificationCategories([])
  }
  
  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    print("Failed to register for remote notifications: \(error)")
  }
  
  func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    // Notifee handles remote notifications automatically
    completionHandler(.newData)
  }
  
  // MARK: - UNUserNotificationCenterDelegate
  
  func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    // Notifee handles notification responses automatically
    completionHandler()
  }
  
  func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    let userInfo = notification.request.content.userInfo
    print("APP_PUSH from foreground \(userInfo)")
    
    // Notifee handles foreground notifications automatically
    completionHandler([.sound, .alert, .badge])
  }
  
  // MARK: - Deep Linking
  
  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    return RCTLinkingManager.application(app, open: url, options: options)
  }
  
  // MARK: - RCTBridgeDelegate
  
  func sourceURL(for bridge: RCTBridge!) -> URL! {
    return self.sourceURL()
  }
  
  func sourceURL() -> URL! {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return CodePush.bundleURL()
#endif
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return CodePush.bundleURL()
#endif
  }
}
