import React from "react";

import { LineChart } from "react-native-chart-kit";
import { Dimensions, FlatList, StyleSheet, Text } from "react-native";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

import { colors } from "../../theme/dark";
import { renderPoint } from "../../helpers";

const instructions = [
  { key: "- الخط الأزرق هو الحد الأعلى الطبيعي", pointColor: "blue" },
  { key: "- الخط الأحمر هو الحد الأدنى الطبيعي", pointColor: "red" },
  { key: "- الخط الأخضر هو متوسط الطول عالمياً ", pointColor: "green" },
];

const AppLineChart = (props: AppLineChartProps) => {
  const { title, data, pointIndex, yAxisSuffix } = props;
  return (
    <>
      {Boolean(title) && <Text style={styles.title}>{title}</Text>}
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={400}
        yAxisSuffix={yAxisSuffix}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: colors.main,
          backgroundGradientFrom: colors.blueGradientFrom,
          backgroundGradientTo: colors.blueGradientTo,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withDots={true}
        renderDotContent={(props) => renderPoint(props, pointIndex)}
      />
      <FlatList
        data={instructions}
        renderItem={({ item }) => (
          <Text style={{ color: item.pointColor }}>{item.key}</Text>
        )}
      />
    </>
  );
};

export default AppLineChart;

const styles = StyleSheet.create({
  title: {
    color: "#999",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
export interface AppLineChartProps {
  title?: string;
  data: LineChartData;
  pointIndex: number;
  yAxisSuffix: string;
}
