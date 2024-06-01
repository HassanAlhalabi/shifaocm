import React from "react";

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

const HeightScreen = () => {
  const router = useAppRouter("height");

  const childAge = router.params.age;
  const childHeight = router.params.childHeight;
  const gender = router.params.gender;

  const genderName = router.params.gender === GENDER.MALE ? "ذكور" : "إناث";

  const {
    labels,
    childAgeIndex: pointIndex,
    isNewLabel,
  } = useAgeLabels(childAge);
  const fakePoints = useFakeLabels(pointIndex, childHeight, 50);
  const { minHeights, avgHeights, maxHeights } = useHeightData(
    gender,
    pointIndex,
    isNewLabel
  );

  return (
    <LayoutContainer>
      <AppLineChart
        title={`مخطط النمو لدى الأطفال ( الطول بالنسبة للعمر - ${genderName} )`}
        pointIndex={pointIndex}
        yAxisSuffix="سم"
        data={{
          labels,
          datasets: [
            {
              data: fakePoints,
              withDots: true,
              color: () => "#00000000",
            },
            {
              key: "min-heights",
              data: minHeights,
              color: () => "#900",
              withDots: false,
            },
            {
              key: "avg-heights",
              data: avgHeights,
              color: () => "#090",
              withDots: false,
            },
            {
              key: "max-heights",
              data: maxHeights,
              color: () => "#009",
              withDots: false,
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
