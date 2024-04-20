import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import CustomButton from "../../components/button";
import { RootStackParamList } from "../../../App";
import { colors } from "../../theme/dark";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.welcome}>أهلاً بك</Text>
        <Text style={styles.desc}>
          هنا ستتمكن من معرفة عمر طفلك المستقبلي و تتأكد من أن طوله و وزنه
          الحاليين هما ضمن النطاق الطبيعي, كما يمكنك زيارة موقعنا الإلكتروني
          للإطلاع على اخر المستجدات و النصائح الطبية
        </Text>
        <View style={styles.buttonGroup}>
          <CustomButton
            onPress={() => navigation.navigate("ChildForm")}
            title="متابعة"
          />
          <CustomButton
            onPress={() => navigation.navigate("ChildForm")}
            title="زر موقعنا"
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapper: {
    flex: 1,
    overflow: "scroll",
    display: "flex",
    justifyContent: "center",
    padding: 24,
  },
  welcome: {
    textAlign: "center",
    fontSize: 34,
    marginBottom: 20,
    color: colors.main,
  },
  desc: {
    textAlign: "center",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
});
