import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGetOrdersQuery } from "../../../Slices/orderApiSlice";
import Message from "../../../components/Message";
import { Colors } from "../../../constants/Utils";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.container, styles.messageContainer]}>
        <Message variant="error">
          <Text style={styles.messageText}>
            {error?.data?.message || error.error}
          </Text>
        </Message>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Orders</Text>
        <View style={styles.TableHeader}>
          <Text style={[styles.headcell, { flex: 0.5 }]}>#</Text>
          <Text style={[styles.headcell, { flex: 0.5 }]}>user</Text>
          <Text style={[styles.headcell, { flex: 0.5 }]}>Paid</Text>
          <Text style={[styles.headcell, { flex: 0.5 }]}>Delivered</Text>
          <Text style={[styles.headcell, { flex: 0.5 }]}>View</Text>
        </View>

        <FlatList 
        data={orders}
        keyExtractor={(item)=>item._id}
        contentContainerStyle={{paddingBottom:20}}
        renderItem={({item:orders, index})=>{
          
        }}
      </View>
    </SafeAreaView>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.offWhite,
  },

  messageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
    margin: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  messageText: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.textColor,
  },
  TableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },

  headcell: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: Colors.secondaryTextColor,
  },

  tableRow: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
    alignItems: "center",
  },
});
