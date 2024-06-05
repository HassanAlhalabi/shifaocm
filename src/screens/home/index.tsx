import React, { useEffect, useRef } from "react";

import { StyleSheet, View, Image } from "react-native";
import * as Linking from "expo-linking";

import CustomButton from "../../components/button";
import { colors } from "../../theme/dark";
import { useAppNavigation } from "../../hooks";
import LayoutContainer from "../../components/layout-container";
import ButtonGroup from "../../components/button/button-group";
import AppText from "../../components/text";

const HomeScreen = () => {
  const navigation = useAppNavigation();

  return (
    <LayoutContainer center>
      <View style={styles.logoHolder}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
      </View>
      <AppText style={styles.welcome}>أهلاً بك</AppText>
      <AppText style={styles.desc}>
        ستتمكن من معرفة طول طفلك المستقبلي و تتأكد من أن طوله و وزنه الحاليين
        هما ضمن النطاق الطبيعي, كما يمكنك زيارة موقعنا الإلكتروني للإطلاع على
        اخر المستجدات و النصائح الطبية
      </AppText>
      <CustomButton
        onPress={() => navigation.navigate("ChildForm")}
        title="متابعة"
        icon="arrow-left"
        style={{ width: 300, maxWidth: 250, alignSelf: "center" }}
      />
      <ButtonGroup>
        <CustomButton
          onPress={() => Linking.openURL("https://shifacom.com")}
          title="زر موقعنا"
          icon="globe"
          variant="outlined"
        />
        <CustomButton
          onPress={() => Linking.openURL("https://shifaestore.com/")}
          title="المتجر"
          icon="shopping-cart"
          variant="outlined"
        />
      </ButtonGroup>
    </LayoutContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
    color: colors.gray,
    marginBottom: 10,
  },
});
