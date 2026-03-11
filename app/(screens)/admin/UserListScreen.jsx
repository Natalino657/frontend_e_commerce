import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Message from "../../../components/Message";
import { Colors } from "../../../constants/Utils";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../Slices/userApiSlice";

const UserListScreen = () => {
  const { data: users, refecth, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const router = useRouter();
  const deleteHandler = async (id) => {
    Alert.alert(
      "Delete user",
      "Are you sure you want to delete this user ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUser(id);
              refecth();
              Toast.show({
                type: "success",
                text1: "Success",
                text2: "User deleted successfull",
                position: "top",
                visibilityTime: 3000,
              });
            } catch (error) {
              Toast.show({
                text1: "error",
                text2: error?.data?.message || error.error,
                position: "top",
                visibilityTime: 3000,
              });
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (isLoading) {
    return (
      <View styles={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View styles={styles.container}>
        <Message variant="error">
          <Text>{error?.data?.message || error.error}</Text>
        </Message>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Users</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Admin</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Actions</Text>
        </View>

        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item: user }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 2 }]}>{user.name}</Text>
              <TouchableOpacity
                style={[styles.cell, { flex: 2 }]}
                onPress={() =>
                  router.push({
                    pathname: "/admin/UserEditScreen",
                    params: {
                      id: user._id,
                    },
                  })
                }
              >
                {user.isAdmin ? (
                  <FontAwesome name="check" size={16} color={Colors.primary} />
                ) : (
                  <FontAwesome name="times" size={16} color={Colors.textRed} />
                )}
              </TouchableOpacity>

              <View style={[styles.cell, { flex: 2 }]}>
                {!user.isAdmin && (
                  <View style={styles.actionButton}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        router.push({
                          pathname: "/admin/UserEditScreen",
                          params: {
                            id: user._id,
                          },
                        })
                      }
                    >
                      <FontAwesome
                        name="edit"
                        size={20}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => deleteHandler(user._id)}
                    >
                      <FontAwesome
                        name="trash"
                        size={20}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "start",
    margin: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },

  headerCell: {
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
    marginVertical: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: "center",
  },

  cell: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.textColor,
    alignItems: "center",
    justifyContent: "center",
  },

  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
