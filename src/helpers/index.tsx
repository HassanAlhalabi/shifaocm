import React from "react";
import { Dimensions, View } from "react-native";

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
  const leftOffset = Dimensions.get("window").width - 23 - x;

  if (index === pointIndex) {
    return (
      <View
        key={`dot-to-render-${index}${x}${y}`}
        style={{
          left: leftOffset,
          top: y - 3,
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: 10,
          backgroundColor: "orange",
        }}
      />
    );
  }
  return <View key={`dot-to-render-${index}${x}${y}`} />;
};

export const sortNumbersAsc = (a: number, b: number) => (a > b ? a : -1);
