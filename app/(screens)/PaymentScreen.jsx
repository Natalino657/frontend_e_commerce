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
  const { shippingAddress } = cart;

  const [PaymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!shippingAddress || !shippingAddress.address) {
      router.replace("(screens)/ShippingScreen");
    }
  }, [shippingAddress, router]);

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
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Method:</Text>
          <View style={styles.radiosGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPaymentMethod("PayPal")}
            >
              <MaterialIcons
                name={
                  PaymentMethod === "PayPal"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color={Colors.primary}
              />
              <Text style={styles.radioLabel}>Paypal or Credit Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </FormContainer>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    justifyContent: "center",
    padding: 15,
  },

  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textColor,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },

  radioLabel: {
    fontSize: 16,
    color: Colors.textColor,
    marginLeft: 10,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },

  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
