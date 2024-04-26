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
      <Text style={styles.header}>
        طول طفلك النهائي عند البلوغ سيكون بشكل تقريبي{" "}
        <Text
          style={{ color: "green" }}
        >{`${route.params.futureHeight} سم`}</Text>
      </Text>
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
    fontSize: 21,
    textAlign: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.main,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
});
