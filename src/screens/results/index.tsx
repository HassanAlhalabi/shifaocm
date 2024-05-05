import React from "react";

import { StyleSheet, Text, View } from "react-native";

import CustomButton from "../../components/button";
import { useAppNavigation, useAppRouter } from "../../hooks";
import { colors } from "../../theme/dark";
import LayoutContainer from "../../components/layout-container";
import ButtonGroup from "../../components/button/button-group";
import AppText from "../../components/text";

const ResultsScreen = () => {
  const navigation = useAppNavigation();
  const route = useAppRouter("Results");

  return (
    <LayoutContainer center>
      <View style={styles.header}>
        <AppText style={styles.headerText}>
          الطول النهائي التقريبي المتوقع
        </AppText>
        <AppText
          style={{ ...styles.headerText, color: "green" }}
        >{`${route.params.futureHeight} سم`}</AppText>
      </View>

      <ButtonGroup>
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
      </ButtonGroup>
    </LayoutContainer>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
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
});
