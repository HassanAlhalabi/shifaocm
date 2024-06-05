import React, { useEffect, useState } from "react";

import { ActivityIndicator, Button, StyleSheet, View } from "react-native";

import CustomButton from "../../components/button";
import { useAppNavigation, useAppRouter } from "../../hooks";
import { colors } from "../../theme/dark";
import LayoutContainer from "../../components/layout-container";
import ButtonGroup from "../../components/button/button-group";
import AppText from "../../components/text";

import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : "ca-app-pub-5462521903743334/9986366657";

const adUnitId = "ca-app-pub-5462521903743334/9986366657";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion"],
});

const ResultsScreen = () => {
  const navigation = useAppNavigation();
  const route = useAppRouter("Results");

  const [adLoaded, setAdLoaded] = useState(false);
  const [adClosed, setAdClosed] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      }
    );
    // Start loading the interstitial straight away
    try {
      interstitial.load();
    } catch (error) {
      console.log(error);
    }

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (adLoaded) {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          setAdClosed(true);
        }
      );
      interstitial.show();
      // Unsubscribe from events on unmount
      return unsubscribe;
    }
  }, [adLoaded]);

  console.log(adLoaded);

  if (!adLoaded) {
    return (
      <LayoutContainer center>
        <ActivityIndicator />
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer center>
      <View style={styles.header}>
        <AppText style={styles.headerText}>
          الطول النهائي التقريبي المتوقع
        </AppText>
        <AppText
          style={{ ...styles.headerText, color: "green" }}
        >{`${route.params.futureHeight} سم`}</AppText>
      </View>

      <ButtonGroup>
        <CustomButton
          title="نتيجة الطول"
          onPress={() =>
            navigation.navigate("height", {
              age: route.params.age,
              childHeight: route.params.childHeight,
              gender: route.params.gender,
            })
          }
          icon="car"
        />
        <CustomButton
          title="نتيجة الوزن"
          onPress={() =>
            navigation.navigate("weight", {
              age: route.params.age,
              childWeight: route.params.childWeight,
              gender: route.params.gender,
            })
          }
          icon="home"
        />
      </ButtonGroup>
    </LayoutContainer>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.main,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
    minWidth: 285,
  },
  headerText: {
    fontSize: 21,
    textAlign: "center",
    color: colors.gray,
  },
});
