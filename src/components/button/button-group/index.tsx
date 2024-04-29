import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const ButtonGroup = ({ children }: { children: ReactNode }) => {
  return <View style={styles.buttonGroup}>{children}</View>;
};

export default ButtonGroup;

const styles = StyleSheet.create({
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
    justifyContent: "center",
  },
});
