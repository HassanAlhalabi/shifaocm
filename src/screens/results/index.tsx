import React, { useEffect, useState } from "react";

import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import MaterialCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FAIcon from "react-native-vector-icons/FontAwesome5";

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

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-5462521903743334/9986366657";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["health, fitness"],
});

const ResultsScreen = () => {
  const navigation = useAppNavigation();
  const route = useAppRouter("Results");

  const [adLoaded, setAdLoaded] = useState(false);
  const [adClosed, setAdClosed] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
        console.log("Ad loaded successfully");
      }
    );

    const unsubscribeError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error("Ad failed to load:", error);
      }
    );

    console.log("Attempting to load the ad");
    interstitial.load();

    // Cleanup event listeners on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeError();
    };
  }, []);

  useEffect(() => {
    if (adLoaded) {
      const unsubscribeClosed = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          setAdClosed(true);
          console.log("Ad was closed");
        }
      );
      interstitial.show();

      return unsubscribeClosed;
    }
  }, [adLoaded]);

  // if (!adLoaded || !adClosed) {
  //   return (
  //     <LayoutContainer center>
  //       <ActivityIndicator />
  //     </LayoutContainer>
  //   );
  // }

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
          icon={<MaterialCIcon name="human-male-height" />}
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
          icon={<FAIcon name="weight" />}
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
