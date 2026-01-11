import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Message from "./Message";
import Rating from "./Rating";
import { Colors } from "../constants/Utils";
import React from "react";

const ProductReviewSections = ({ reviews, userInfo, onAddReviewPress }) => {
  return (
    <View style={styles.reviewSection}>
      <Text style={styles.sectionTitle}>Customer Reviews</Text>
      {reviews.length === 0 ? (
        <Message varient="info">No review yet</Message>
      ) : (
        <View>
          {reviews.map((review) => (
            <View style={styles.reviewCard} key={review._id}></View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductReviewSections;

const styles = StyleSheet.create({});
