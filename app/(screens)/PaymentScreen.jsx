import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { use, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../Slices/CartSlice";
import FormContainer from "../../components/FormContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../constants/Utils";

const PaymentScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { ShippingAddress } = cart;

  const [PaymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!ShippingAddress || !ShippingAddress.addrese) {
      router.replace("(sreens)/ShippingScreen");
    }
  }, [ShippingAddress, router]);

  const submitHandler = () => {
    if (!PaymentMethod) {
      Alert.alert("Erro", "Pleas Select Payment method");
      return;
    }

    dispatch(savePaymentMethod(PaymentMethod));

    router.push("(screens)/PalceOrderScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FormContainer>
        <View style={styles.FormGroup}>
          <Text Style={styles.label}>Select Method</Text>
        </View>
      </FormContainer>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
