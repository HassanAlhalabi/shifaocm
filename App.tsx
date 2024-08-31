import React, { useCallback, useEffect, useState } from "react";

import { I18nManager, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Cairo_400Regular, useFonts } from "@expo-google-fonts/cairo";
import mobileAds from "react-native-google-mobile-ads";
import "react-native-gesture-handler";

import HomeScreen from "./src/screens/home";
import ResultsScreen from "./src/screens/results";
import ChildFormScreen from "./src/screens/child-form";
import HeightScreen from "./src/screens/height";
import WeightScreen from "./src/screens/weight";
import { colors } from "./src/theme/dark";
import { RootStackParamList } from "./src/hooks";

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    // Initialization complete!
    console.log("Ads Initialized");
  });

const Stack = createStackNavigator<RootStackParamList>();

StatusBar.setHidden(true);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontLoaded] = useFonts({
    Cairo_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      try {
        I18nManager.forceRTL(true);
        // Load resources here
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontLoaded) {
      console.log({ fontLoaded, appIsReady });
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.wrapper} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChildForm"
            component={ChildFormScreen}
            options={{
              headerTintColor: "#FFF",
              headerTitle: "بيانات الطفل",
              headerTitleAlign: "center",
              headerTitleStyle: { fontFamily: "Cairo_400Regular" },
              headerRightContainerStyle: {
                backgroundColor: colors.main,
              },
              headerStyle: {
                backgroundColor: colors.main,
              },
            }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{
              headerTitle: "النتائج",
              headerTintColor: "#FFF",
              headerTitleAlign: "center",
              headerTitleStyle: { fontFamily: "Cairo_400Regular" },
              headerStyle: {
                backgroundColor: colors.main,
              },
            }}
          />
          <Stack.Screen
            name="height"
            component={HeightScreen}
            options={{
              headerTitle: "نتيجة الطول",
              headerTintColor: "#FFF",
              headerTitleStyle: { fontFamily: "Cairo_400Regular" },
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.main,
              },
            }}
          />
          <Stack.Screen
            name="weight"
            component={WeightScreen}
            options={{
              headerTitle: "نتيجة الوزن",
              headerTintColor: "#FFF",
              headerTitleStyle: { fontFamily: "Cairo_400Regular" },
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.main,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: "#FFF",
    direction: "rtl",
  },
});
