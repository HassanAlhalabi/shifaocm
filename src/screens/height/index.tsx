import React from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import data from "../../../data.json";
import { GENDER } from "../../helpers/enum";
import { useAgeLabels, useAppRouter, useFakeLabels } from "../../hooks";
import AppLineChart from "../../components/line-chart";
import { INCH_TO_CM } from "../../helpers/constants";
import { colors } from "../../theme/dark";

const instructions = [
  { key: "- إذا كانت النقطة فوق الخط الأزرق فالطول أعلى من الطبيعي" },
  { key: "- إذا كانت النقطة تحت الخط الأحمر فالطول أقل من الطبيعي" },
  { key: "- إذا كانت النقطة فوق الخط الأخضر فالطول أعلى من المتوسط" },
  { key: "- إذا كانت النقطة تحت الخط الأخضر فالطول أقل من المتوسط" },
];

const HeightScreen = ({ gender }: { gender: GENDER }) => {
  const genderName = gender === GENDER.MALE ? "male" : "female";

  const router = useAppRouter("height");

  const childAge = router.params.age;
  const childHeight = router.params.childHeight;

  const { labels, childAgeIndex: pointIndex } = useAgeLabels(childAge);
  const fakePoints = useFakeLabels(pointIndex, childHeight);

  return (
    <View style={styles.wrapper}>
      <AppLineChart
        title="مخطط النمو لدى الأطفال (الطول بالنسبة للعمر)"
        pointIndex={pointIndex}
        yAxisSuffix="سم"
        data={{
          labels,
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
      <FlatList
        data={instructions}
        renderItem={({ item }) => (
          <Text style={{ color: colors.gray }}>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default HeightScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: "scroll",
    paddingVertical: 24,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
