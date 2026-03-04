import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useSelector, useDispatch } from "react-redux";
import { useProfileMutation } from "../../Slices/userApiSlice";
import { setCredentials } from "../../Slices/authSlice";

import Toast from "react-native-toast-message";
import { Colors } from "../../constants/Utils";
import Message from "../../components/Message";

const AccountInformation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

  console.log(showPassword);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    try {
      const res = await updateProfile({
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      setError("");
      setPassword("");
      setConfirmPassword("");

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated Successfully",
        position: "top",
        visibilityTime: 7000,
      });
    } catch (error) {
      setError(error?.data?.message);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error?.data?.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.ScrollContent}>
        <Text style={styles.title}>Account Information</Text>
        <View style={styles.fromContainer}>
          {error && (
            <Message variant="error">
              <Text>{error}</Text>
            </Message>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onchangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onchangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.PasswordInput}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.PasswordInput}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.upadateButton}
            onPress={submitHandler}
            disabled={loadingUpdateProfile}
          >
            {loadingUpdateProfile ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.upadateButtonText}>Upgrade</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountInformation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  ScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  fromContainer: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "start",
    padding: 20,
  },

  inputContainer: {
    marginBottom: 16,
  },

  lable: {
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.textColor,
    marginBottom: 8,
  },

  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
  },

  PasswordInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: Colors.textColor,
  },

  eyeIcon: {
    padding: 12,
  },

  upadateButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  upadateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
