import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";

import Input from "../../components/input";
import CustomButton from "../../components/button";
import { GENDER } from "../../helpers/enum";
import Select from "../../components/select";
import { useAppNavigation } from "../../hooks";

// Add the mother's height to the father's height in either inches or centimeters.
// Add 5 inches (13 centimeters) for boys or subtract 5 inches (13 centimeters) for girls. Divide by 2.

export interface HeightPredictInfo {
  gender: GENDER;
  height: string;
  weight: string;
  age: string;
  fatherHeight: string;
  motherHeight: string;
}

const ChildFormScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<HeightPredictInfo>({
    defaultValues: {
      gender: GENDER.MALE,
    },
  });
  const navigation = useAppNavigation();

  const gender = watch("gender");
  const childHeight = watch("height");
  const motherHeight = watch("motherHeight");
  const fatherHeight = watch("fatherHeight");
  const childWeight = watch("weight");
  const childAge = watch("age");

  const handleCalculate = () => {
    let futureHeight = null;
    if (gender === GENDER.MALE) {
      futureHeight = (Number(motherHeight) + Number(fatherHeight) + 13) / 2;
    } else if (gender === GENDER.FEMALE) {
      futureHeight = (Number(motherHeight) + Number(fatherHeight) - 13) / 2;
    }

    navigation.navigate("Results", {
      futureHeight: Number(futureHeight),
      childWeight: Number(childWeight),
      childHeight: Number(childHeight),
      age: Number(childAge),
      gender,
    });
  };

  const resetForm = () => {
    reset();
    setValue("gender", GENDER.MALE);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
      >
        <View style={styles.innerContent}>
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
            value={childHeight}
          />
          <Input
            control={control}
            name="age"
            keyboardType="numeric"
            label="عمر الطفل بالسنوات :"
            required
            value={childAge}
            rules={{
              validate: (value) => {
                return Number(value) <= 0 || Number(value) > 18
                  ? "العمر يجب أن يكون بين سنة و 18 سنة"
                  : true;
              },
            }}
            error={errors?.age?.message}
          />
          <Input
            control={control}
            name="weight"
            keyboardType="numeric"
            label="وزن الطفل (ك.غ) :"
            required
            value={childWeight}
            error={errors?.weight?.message}
          />
          <Input
            control={control}
            name="fatherHeight"
            keyboardType="numeric"
            label="طول الأب (سم) :"
            required
            value={fatherHeight}
            error={errors?.fatherHeight?.message}
          />
          <Input
            control={control}
            name="motherHeight"
            keyboardType="numeric"
            label="طول الأم (سم) :"
            required
            error={errors?.motherHeight?.message}
            value={motherHeight}
          />
          <View style={styles.buttonGroup}>
            <CustomButton
              title={"مسح"}
              onPress={resetForm}
              icon="refresh"
              variant="outlined"
            />
            <CustomButton
              title={"حساب"}
              onPress={handleSubmit(handleCalculate)}
              icon="calculator"
            />
          </View>
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

    display: "flex",
    justifyContent: "center",
  },
  containerContent: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
  },
  innerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
  { id: GENDER.MALE, title: "ذكر", icon: "human-male" },
  { id: GENDER.FEMALE, title: "أنثى", icon: "human-female" },
];
