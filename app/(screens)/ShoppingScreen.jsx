import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { use, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { saveShippingAddress } from "../../Slices/CartSlice";
import { Color } from "../../constants/Utils";

const ShoppingScreen = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispach = useDispatch();
  const router = useRouter();

  const submitHandler = () => {
    Keyboard.dismiss();

    if (!address || !city || !postalCode || !country) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please Fill in all shipping details to continue",
        position: "top",
        visibilityTime: 7000,
      });
      return;
    }

    dispach(saveShippingAddress({ address, city, postalCode, country }));
    router.push("(screen)/PaymentScreen");
  };

  return (
    <View>
      <Text>ShoppingScreen</Text>
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({});
