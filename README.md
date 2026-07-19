firebase login
firebase logout
firebase init
D:\new_fokatindia\fokatindia\apps\user> npm run build

Dell@DESKTOP-1JGKE3A MINGW64 /d/new_fokatindia/fokatindia (main)
$ firebase deploy --only hosting


1.To open and run on Android
Requires Android Studio installed.


cd apps/user
npm run cap:android        # Opens the android/ project in Android Studio
Then in Android Studio: Run > Run 'app' on a device or emulator.
./gradlew bundleRelease
2.For iOS (needs a Mac)

npm run cap:ios            # Opens in Xcode
After any code change

npm run build:mobile       # Rebuilds Vite + syncs to android/ and ios/
Push notifications — what you still need to do
For FCM to work on Android, add your google-services.json file (download from Firebase Console > Project Settings > Your apps) into:


android/app/google-services.json

#for sync
npm run build
npx cap sync android
npx cap copy android