import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/dark";

type Color = "main" | "success";

enum BadgeColor {
  MAIN = "main",
  SUCCESS = "success",
}

const Badge = (props: { title: string; color?: Color }) => {
  const { title, color = BadgeColor.MAIN } = props;
  const styles = getStyles(color);
  return (
    <View style={styles.badgeHolder}>
      <Text style={styles.badgeText}>{title}</Text>
    </View>
  );
};

export default Badge;

const getStyles = (color: Color) => {
  const styles = StyleSheet.create({
    badgeHolder: {
      borderRadius: 5,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: badgeColors[color],
    },
    badgeText: {
      fontSize: 18,
      color: "#FFF",
    },
  });
  return styles;
};

const badgeColors = {
  [BadgeColor.MAIN]: colors.main,
  [BadgeColor.SUCCESS]: colors.success,
};
