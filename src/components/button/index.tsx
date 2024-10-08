import React, { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons";

import { colors } from "../../theme/dark";

const CustomButton = (
  props: PressableProps & {
    title: string;
    icon?: ReactNode;
    color?: Color;
    variant?: Variant;
  }
) => {
  const { title, icon, color, variant, ...rest } = props;
  const styles = getStyles(color, variant);
  return (
    <Pressable {...rest}>
      <View style={styles.button}>
        <Text style={styles.btnText}>{title}</Text>
        {Boolean(props.icon) && (
          <Text style={styles.btnText}>{props.icon}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default CustomButton;

type Color = "main" | "success" | "secondary";

type Variant = "outlined" | "contained";

const ButtonColors = {
  main: colors.main,
  success: colors.success,
  secondary: colors.blueGradientTo,
};

const getStyles = (color: Color = "main", variant: Variant = "contained") => {
  return StyleSheet.create({
    button: {
      backgroundColor: variant === "contained" ? ButtonColors[color] : "#FFF",
      color: variant === "contained" ? "#FFF" : colors.main,
      minWidth: 120,
      borderRadius: 18,
      textAlign: "center",
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 25,
      paddingRight: 25,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.main,
      gap: 7,
    },
    btnText: {
      color: variant === "contained" ? "#FFF" : colors.main,
      textTransform: "uppercase",
      fontWeight: "600",
      fontFamily: "Cairo_400Regular",
    },
  });
};
