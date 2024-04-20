import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

import CustomButton from "../../components/button";
import { RootStackParamList } from "../../../App";
import { colors } from "../../theme/dark";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.logoHolder}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
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
            icon="arrow-left"
          />
          <CustomButton
            onPress={() => Linking.openURL("https://shifacom.com")}
            title="زر موقعنا"
            icon="globe"
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
    gap: 10,
  },
  logoHolder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 200,
    height: 40,
    margin: "auto",
  },
  welcome: {
    textAlign: "center",
    fontSize: 34,
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
