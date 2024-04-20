import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { colors } from "../../theme/dark";

const CustomButton = (
  props: PressableProps & { title: string; icon?: string }
) => {
  return (
    <Pressable {...props}>
      <View style={styles.button}>
        {Boolean(props.icon) && (
          <Icon style={styles.btnText} name={props.icon} />
        )}
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
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

    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
  },
  btnText: {
    color: "#FFF",
    textTransform: "uppercase",
    fontWeight: "600",
  },
});
