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
  return (
    <SafeAreaView>
      <Text>profile</Text>
      <Text onPress={handleLoginPress}>Login</Text>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
