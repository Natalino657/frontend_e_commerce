import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, use } from "react";

import { Link, useRouter, useLocalSearchParams } from "expo-router";

import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../Slices/userApiSlice";
import { setCredentials } from "../../Slices/authSlice";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Toast from "react-native-toast-message";
import FormContainer from "../../components/FormContainer";
import { Colors } from "../../constants/Utils";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const localSearchParams = useLocalSearchParams();

  const redirect = localSearchParams.redirect || "/";

  useEffect(() => {
    if (userInfo) {
      router.replace(redirect);
    }
  }, [userInfo, redirect, router]);

  const submitHandler = async () => {
    Keyboard.dismiss();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));

      router.replace(redirect);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Loagin Failed",
        text2: error?.data?.message || error.error,
        position: "top",
        visibilityTime: 7000,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
