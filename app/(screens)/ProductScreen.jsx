import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetProductsDetailsQuery } from "../../Slices/productsApiSlice";

import Message from "../../components/Message";
const ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  return (
    <View>
      <Text>ProductScreen</Text>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
