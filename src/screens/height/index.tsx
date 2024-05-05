import React from "react";

import data from "../../../data.json";
import { GENDER } from "../../helpers/enum";
import {
  useAgeLabels,
  useAppRouter,
  useFakeLabels,
  useHeightData,
} from "../../hooks";
import AppLineChart from "../../components/line-chart";
import LayoutContainer from "../../components/layout-container";
import { colors } from "../../theme/dark";
import AppText from "../../components/text";

const instructions = [
  { key: "- إذا كانت النقطة فوق الخط الأزرق فالطول أعلى من الطبيعي" },
  { key: "- إذا كانت النقطة تحت الخط الأحمر فالطول أقل من الطبيعي" },
  { key: "- إذا كانت النقطة فوق الخط الأخضر فالطول أعلى من المتوسط" },
  { key: "- إذا كانت النقطة تحت الخط الأخضر فالطول أقل من المتوسط" },
];

const HeightScreen = ({ gender }: { gender: GENDER }) => {
  const router = useAppRouter("height");

  const childAge = router.params.age;
  const childHeight = router.params.childHeight;

  const {
    labels,
    childAgeIndex: pointIndex,
    isNewLabel,
  } = useAgeLabels(childAge);
  const fakePoints = useFakeLabels(pointIndex, childHeight);
  const { minHeights, avgHeights, maxHeights } = useHeightData(
    gender,
    pointIndex,
    isNewLabel
  );

  return (
    <LayoutContainer>
      <AppLineChart
        title="مخطط النمو لدى الأطفال (الطول بالنسبة للعمر)"
        pointIndex={pointIndex}
        yAxisSuffix="سم"
        data={{
          labels,
          datasets: [
            {
              data: minHeights,
              color: () => "#900",
              withDots: false,
            },
            {
              data: avgHeights,
              color: () => "#090",
              withDots: false,
            },
            {
              data: maxHeights,
              color: () => "#009",
              withDots: false,
            },
            {
              data: fakePoints,
              withDots: true,
              color: () => "#00000000",
            },
          ],
        }}
      />
      {instructions.map((item) => (
        <AppText style={{ color: colors.gray }}>{item.key}</AppText>
      ))}
    </LayoutContainer>
  );
};

export default HeightScreen;
