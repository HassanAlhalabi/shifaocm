import React from "react";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../../theme/dark";
import { Dimensions } from "react-native";
import { renderPoint } from "../../helpers";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

const AppLineChart = (props: AppLineChartProps) => {
  const { data, pointIndex } = props;
  return (
    <LineChart
      data={data}
      width={Dimensions.get("window").width - 20} // from react-native
      height={400}
      yAxisSuffix="سم"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: colors.main,
        backgroundGradientFrom: colors.blueGradientFrom,
        backgroundGradientTo: colors.blueGradientTo,
        decimalPlaces: 0, // optional, defaults to 2dp
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
  );
};

export default AppLineChart;

export interface AppLineChartProps {
  data: LineChartData;
  pointIndex: number;
}
