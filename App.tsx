import "react-native-gesture-handler";

import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./src/screens/home";
import ResultsScreen from "./src/screens/results";
import ChildFormScreen from "./src/screens/child-form";
import HeightScreen from "./src/screens/height";
import WeightScreen from "./src/screens/weight";
import { colors } from "./src/theme/dark";
import { RootStackParamList } from "./src/hooks";

const Stack = createStackNavigator<RootStackParamList>();

StatusBar.setHidden(true);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load resources here
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.wrapper} onLayout={onLayoutRootView}>
      {/* <View style={styles.header}>
        <View style={styles.logoHolder}>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
        </View>
      </View> */}
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
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoHolder: {
    width: "100%",
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    width: 150,
    height: 30,
    margin: "auto",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    padding: 10,
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "#FFF",
  },
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: "#FFF",
  },
});
