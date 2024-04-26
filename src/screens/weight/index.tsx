import React from "react";

import { StyleSheet, Text, View } from "react-native";

import data from "../../../data.json";
import { GENDER } from "../../helpers/enum";
import AppLineChart from "../../components/line-chart";
import { useAgeLabels, useAppRouter, useFakeLabels } from "../../hooks";
import { POUND_TO_KG } from "../../helpers/constants";

const WeightScreen = ({ gender }: { gender: GENDER }) => {
  const genderName = gender === GENDER.MALE ? "male" : "female";

  const router = useAppRouter("weight");

  const childAge = router.params.age;
  const childWeight = router.params.childWeight;

  const { labels, childAgeIndex: pointIndex } = useAgeLabels(childAge);
  const fakePoints = useFakeLabels(pointIndex, childWeight);

  return (
    <View style={styles.wrapper}>
      <Text>مخطط الوزن لدى الأطفال (الوزن بالنسبة للعمر)</Text>
      <AppLineChart
        pointIndex={pointIndex}
        data={{
          labels,
          legend: ["Min", "Avg", "Max"],
          datasets: [
            {
              data: data.weight[genderName].min.map(
                (weightInPound) => weightInPound * POUND_TO_KG
              ),
              color: () => "#900",
              withDots: false,
            },
            {
              data: data.weight[genderName].avg.map(
                (weightInPound) => weightInPound * POUND_TO_KG
              ),
              color: () => "#090",
              withDots: false,
            },
            {
              data: data.weight[genderName].max.map(
                (weightInPound) => weightInPound * POUND_TO_KG
              ),
              color: () => "#009",
              withDots: false,
            },
            {
              data: fakePoints,
              strokeWidth: 0,
              withDots: true,
              color: () => "#00000000",
            },
          ],
        }}
      />
    </View>
  );
};

export default WeightScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "cyan",
    height: 100,
  },
  slogan: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 20,
    color: "#999",
    backgroundColor: "#FFF",
  },
  wrapper: {
    flex: 1,
    overflow: "scroll",
    display: "flex",
    paddingVertical: 24,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  container: {
    flex: 1,
  },
});
