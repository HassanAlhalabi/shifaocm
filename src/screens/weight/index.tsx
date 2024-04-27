import React from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import data from "../../../data.json";
import { GENDER } from "../../helpers/enum";
import AppLineChart from "../../components/line-chart";
import { useAgeLabels, useAppRouter, useFakeLabels } from "../../hooks";
import { POUND_TO_KG } from "../../helpers/constants";
import { colors } from "../../theme/dark";

const WeightScreen = ({ gender }: { gender: GENDER }) => {
  const genderName = gender === GENDER.MALE ? "male" : "female";

  const router = useAppRouter("weight");

  const childAge = router.params.age;
  const childWeight = router.params.childWeight;

  const { labels, childAgeIndex: pointIndex } = useAgeLabels(childAge);
  const fakePoints = useFakeLabels(pointIndex, childWeight);

  const instructions = [
    { key: "- إذا كانت النقطة فوق الخط الأزرق فالوزن أعلى من الطبيعي" },
    { key: "- إذا كانت النقطة تحت الخط الأحمر فالوزن أقل من الطبيعي" },
    { key: "- إذا كانت النقطة فوق الخط الأخضر فالوزن أعلى من المتوسط" },
    { key: "- إذا كانت النقطة تحت الخط الأخضر فالوزن أقل من المتوسط" },
  ];

  return (
    <View style={styles.wrapper}>
      <AppLineChart
        title="مخطط الوزن لدى الأطفال (الوزن بالنسبة للعمر)"
        pointIndex={pointIndex}
        yAxisSuffix="ك.غ"
        data={{
          labels,
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
      <FlatList
        data={instructions}
        renderItem={({ item }) => (
          <Text style={{ color: colors.gray }}>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default WeightScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: "scroll",
    paddingVertical: 24,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
