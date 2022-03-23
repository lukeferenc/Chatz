Chatz

    Chatz is a mobile chat application built using React Native, Expo, Gifted Chat, and Firebase. Users can choose a background color and username of their choosing before entering the application's chat screen.

    Key Features:

        - A page where users can enter their name and choose a background color for the chat screen before joining the chat.
        - A page displaying the conversation, as well as an input field and submit button.
        - The chat must provide users with two additional communication features: sending images and location data.
        - Data gets stored online and offline.

    Built with:

        - React Native
        - Expo
        - Firebase

        "dependencies": {
            "@react-native-async-storage/async-storage": "~1.15.0",
            "@react-native-community/masked-view": "^0.1.11",
            "@react-native-community/netinfo": "7.1.3",
            "@react-navigation/native": "^6.0.6",
            "@react-navigation/stack": "^6.0.11",
            "expo": "~44.0.0",
            "expo-image-picker": "~12.0.1",
            "expo-location": "~14.0.1",
            "expo-permissions": "~13.1.0",
            "expo-speech": "~10.1.0",
            "expo-status-bar": "~1.2.0",
            "firebase": "^8.2.3",
            "react": "17.0.1",
            "react-dom": "17.0.1",
            "react-native": "0.64.3",
            "react-native-gesture-handler": "~2.1.0",
            "react-native-gifted-chat": "^0.16.3",
            "react-native-reanimated": "~2.3.1",
            "react-native-safe-area-context": "3.3.2",
            "react-native-screens": "~3.10.1",
            "react-native-web": "0.17.1",
            "react-navigation": "^4.4.4",
            "react-native-maps": "0.29.4"
        },

    Installation:

        1. Clone this repo
        2. Install all the dependencies listed above using npm install
        3. Tweak code depending on local settings
        4. Run npm start or expo start in your terminal to start local server
        5. Scan the QR code provided by Expo in the terminal or development tools to load the project on a physical device. Alternatively, launch the project using an Android Studio or Xcode.
