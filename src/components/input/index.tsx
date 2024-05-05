import React, { useState } from "react";
import { Control, Controller, Path, RegisterOptions } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../../theme/dark";

const Input = <T,>(
  props: TextInputProps & {
    label?: string;
    error?: string;
    control: Control<T>;
    name: Path<T>;
    required?: boolean;
    rules?: Omit<
      RegisterOptions<T, Path<T>>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
  }
) => {
  const { label, error, control, name, required, rules = {}, ...rest } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: { value: required, message: "هذا الحقل مطلوب" },
        ...rules,
      }}
      render={({ field: { onChange } }) => (
        <View style={styles.inputHolder}>
          {Boolean(label) && <Text style={styles.inputLabel}>{label}</Text>}
          <TextInput
            style={{
              ...styles.inputStyle,
              borderColor: getBorderColor(isFocused),
            }}
            onChangeText={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
          {Boolean(error) && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputHolder: {
    width: "100%",
    marginBottom: 10,
  },
  inputLabel: {
    color: colors.gray,
    marginBottom: 2,
    fontFamily: "Cairo_400Regular",
  },
  inputStyle: {
    width: "100%",
    borderWidth: 1,
    color: colors.gray,
    padding: 8,
    borderRadius: 5,
    fontFamily: "Cairo_400Regular",
  },
  error: {
    color: "red",
    fontFamily: "Cairo_400Regular",
  },
});

const getBorderColor = (isFocused: boolean) =>
  isFocused ? colors.blueGradientFrom : colors.gray;
