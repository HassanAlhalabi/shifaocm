import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";

import Input from "../../components/input";
import CustomButton from "../../components/button";
import { GENDER } from "../../helpers/enum";
import Select from "../../components/select";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

// Add the mother's height to the father's height in either inches or centimeters.
// Add 5 inches (13 centimeters) for boys or subtract 5 inches (13 centimeters) for girls. Divide by 2.

export interface HeightPredictInfo {
  gender: GENDER;
  height: number;
  weight: number;
  age: number;
  fatherHeight: number;
  motherHeight: number;
}

const ChildFormScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<HeightPredictInfo>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCalculate = () => {
    const gender = Number(watch("gender"));
    const childHeight = Number(watch("height"));
    const motherHeight = Number(watch("motherHeight"));
    const fatherHeight = Number(watch("fatherHeight"));
    const childWeight = Number(watch("weight"));
    let futureHeight = null;
    if (gender === GENDER.MALE) {
      futureHeight = (motherHeight + fatherHeight + 13) / 2;
    } else if (gender === GENDER.FEMALE) {
      futureHeight = (motherHeight + fatherHeight - 13) / 2;
    }

    navigation.navigate("Results", {
      futureHeight,
      childWeight,
      childHeight,
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
      >
        <Text style={styles.slogan}>أدخل بيانات طفلك</Text>

        <Select
          options={sexes}
          control={control}
          name="gender"
          label="جنس الطفل :"
          error={errors?.gender?.message}
          required
        />

        <Input
          control={control}
          name="height"
          keyboardType="numeric"
          label="طول الطفل الحالي (سم) :"
          error={errors?.height?.message}
          required
        />
        <Input
          control={control}
          name="age"
          keyboardType="numeric"
          label="عمر الطفل بالسنوات :"
          required
          error={errors?.weight?.message}
        />
        <Input
          control={control}
          name="weight"
          keyboardType="numeric"
          label="وزن الطفل (ك.غ) :"
          required
          error={errors?.weight?.message}
        />
        <Input
          control={control}
          name="fatherHeight"
          keyboardType="numeric"
          label="طول الأب (سم) :"
          required
          error={errors?.fatherHeight?.message}
        />
        <Input
          control={control}
          name="motherHeight"
          keyboardType="numeric"
          label="طول الأم (سم) :"
          required
          error={errors?.motherHeight?.message}
        />
        <View style={styles.buttonGroup}>
          <CustomButton title={"مسح"} onPress={() => reset()} />
          <CustomButton
            title={"حساب"}
            onPress={handleSubmit(handleCalculate)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChildFormScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "cyan",
    height: 100,
  },
  slogan: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 20,
    color: "#999",
  },
  wrapper: {
    flex: 1,
    overflow: "scroll",
    display: "flex",
    justifyContent: "center",
  },
  containerContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
});

const sexes = [
  { id: GENDER.MALE, title: "Boy", icon: "human-male" },
  { id: GENDER.FEMALE, title: "Girl", icon: "human-female" },
];
