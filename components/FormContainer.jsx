import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const FormContainer = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 0 : 20}>
      <ScrollView
        contentContainerStyle={styles.KeyboardAvoidingView}
      ></ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormContainer;

const styles = StyleSheet.create({});
