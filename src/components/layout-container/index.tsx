import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const LayoutContainer = ({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={{
          ...styles.containerContent,
          flex: center ? 1 : 0,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default LayoutContainer;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerContent: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    gap: 10,
  },
});
