import React from "react";

import { StyleSheet, Text, View } from "react-native";

import CustomButton from "../../components/button";
import { useAppNavigation, useAppRouter } from "../../hooks";
import { colors } from "../../theme/dark";

const ResultsScreen = () => {
  const navigation = useAppNavigation();
  const route = useAppRouter("Results");

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>الطول النهائي التقريبي المتوقع</Text>
        <Text
          style={{ ...styles.headerText, color: "green" }}
        >{`${route.params.futureHeight} سم`}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <CustomButton
          title="نتيجة الطول"
          onPress={() =>
            navigation.navigate("height", {
              age: route.params.age,
              childHeight: route.params.childHeight,
            })
          }
          icon="car"
        />
        <CustomButton
          title="نتيجة الوزن"
          onPress={() =>
            navigation.navigate("weight", {
              age: route.params.age,
              childWeight: route.params.childWeight,
            })
          }
          icon="home"
        />
      </View>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.main,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
    minWidth: 285,
  },
  headerText: {
    fontSize: 21,
    textAlign: "center",
    color: colors.gray,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
});
