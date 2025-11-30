import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(Screens)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </Provider>
  );
};

export default RootLayout;
