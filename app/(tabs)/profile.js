import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { use } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLoginMutation } from "../../Slices/userApiSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  const router = useRouter();

  const handleLoginPress = () => router.push("/LoginScreen");
  const handleRegisterPress = () => router.push("/RegisterScreen");

  return (
    <SafeAreaView>
      <Text>profile</Text>
      <Text onPress={handleLoginPress} style={[{ padding: 20 }]}>
        Login
      </Text>

      <Text onPress={handleRegisterPress} style={[{ padding: 20 }]}>
        Register
      </Text>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
