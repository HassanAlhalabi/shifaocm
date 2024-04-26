import React from "react";
import { View } from "react-native";

export const renderPoint = (
  props: {
    x: number;
    y: number;
    index: number;
    indexData: number;
  },
  pointIndex: number
) => {
  const { x, y, index } = props;
  // leftOffset +
  // (chartWidth - leftOffset) * W(index / (data.labels.length - 1));
  // chartHeight -
  // (value / Math.max(...data.datasets[0].data)) * chartHeight +
  // 20;

  if (index === pointIndex) {
    return (
      <View
        key={`dot-to-render-${index}${x}${y}`}
        style={{
          left: x - 5,
          top: y + 55,
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: "orange",
        }}
      />
    );
  }
  return <View key={`dot-to-render-${index}${x}${y}`} />;
};