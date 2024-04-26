import React from "react";

import { StyleSheet, Text, View } from "react-native";
import data from "../../../data.json";
import { GENDER } from "../../helpers/enum";
import { useAgeLabels, useAppRouter, useFakeLabels } from "../../hooks";
import AppLineChart from "../../components/line-chart";
import { INCH_TO_CM } from "../../helpers/constants";

const HeightScreen = ({ gender }: { gender: GENDER }) => {
  const genderName = gender === GENDER.MALE ? "male" : "female";

  const router = useAppRouter("height");

  const childAge = router.params.age;
  const childHeight = router.params.childHeight;

  const { labels, childAgeIndex: pointIndex } = useAgeLabels(childAge);
  const fakePoints = useFakeLabels(pointIndex, childHeight);

  return (
    <View style={styles.wrapper}>
      <Text>مخطط النمو لدى الأطفال (الطول بالنسبة للعمر)</Text>
      <View>
        <AppLineChart
          pointIndex={pointIndex}
          data={{
            labels,
            legend: ["Min", "Avg", "Max"],
            datasets: [
              {
                data: data.height[genderName].min.map(
                  (heightInInch) => heightInInch * INCH_TO_CM
                ),
                color: () => "#900",
                withDots: false,
              },
              {
                data: data.height[genderName].avg.map(
                  (heightInInch) => heightInInch * INCH_TO_CM
                ),
                color: () => "#090",
                withDots: false,
              },
              {
                data: data.height[genderName].max.map(
                  (heightInInch) => heightInInch * INCH_TO_CM
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
    </View>
  );
};

export default HeightScreen;

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
    paddingVertical: 24,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
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
