import React from "react";

import { GENDER } from "../../helpers/enum";
import AppLineChart from "../../components/line-chart";
import {
  useAgeLabels,
  useAppRouter,
  useFakeLabels,
  useWeightData,
} from "../../hooks";
import LayoutContainer from "../../components/layout-container";
import { colors } from "../../theme/dark";
import AppText from "../../components/text";

const WeightScreen = () => {
  const router = useAppRouter("weight");

  const childAge = router.params.age;
  const childWeight = router.params.childWeight;
  const gender = router.params.gender;

  const genderName = router.params.gender === GENDER.MALE ? "ذكور" : "إناث";

  const {
    labels,
    childAgeIndex: pointIndex,
    isNewLabel,
  } = useAgeLabels(childAge);
  const fakePoints = useFakeLabels(pointIndex, childWeight, 5);
  const { minWeights, avgWeights, maxWeights } = useWeightData(
    gender,
    pointIndex,
    isNewLabel
  );

  const instructions = [
    { key: "- إذا كانت النقطة فوق الخط الأزرق فالوزن أعلى من الطبيعي" },
    { key: "- إذا كانت النقطة تحت الخط الأحمر فالوزن أقل من الطبيعي" },
    { key: "- إذا كانت النقطة فوق الخط الأخضر فالوزن أعلى من المتوسط" },
    { key: "- إذا كانت النقطة تحت الخط الأخضر فالوزن أقل من المتوسط" },
  ];

  return (
    <LayoutContainer>
      <AppLineChart
        title={`مخطط الوزن لدى الأطفال ( الوزن بالنسبة للعمر - ${genderName} )`}
        pointIndex={pointIndex}
        yAxisSuffix="ك.غ"
        data={{
          labels,
          datasets: [
            {
              data: minWeights,
              color: () => "#900",
              withDots: false,
            },
            {
              data: avgWeights,
              color: () => "#090",
              withDots: false,
            },
            {
              data: maxWeights,
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
      {instructions.map((item) => (
        <AppText style={{ color: colors.gray }}>{item.key}</AppText>
      ))}
    </LayoutContainer>
  );
};

export default WeightScreen;
