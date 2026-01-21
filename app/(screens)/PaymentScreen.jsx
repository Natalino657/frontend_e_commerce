import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { use, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../Slices/CartSlice";
import FormContainer from "../../components/FormContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const PaymentScreen = () => {
  return (
    <View>
      <Text>PaymentScreen</Text>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
