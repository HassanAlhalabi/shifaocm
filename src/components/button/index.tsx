import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { colors } from "../../theme/dark";

const CustomButton = (props: PressableProps & { title: string }) => {
  return (
    <Pressable {...props}>
      <Text style={styles.button}>{props.title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    color: "#FFF",
    minWidth: 120,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    textTransform: "uppercase",
    fontWeight: "600",
  },
});
