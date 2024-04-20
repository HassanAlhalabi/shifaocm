import React from "react";

import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../../../App";

const ResultsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Results">>();

  return (
    <View style={styles.wrapper}>
      <Text>{route.params.futureHeight}</Text>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "cyan",
    height: 100,
  },
  slogan: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 20,
    color: "#999",
  },
  wrapper: {
    flex: 1,
    overflow: "scroll",
  },
  containerContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
});
