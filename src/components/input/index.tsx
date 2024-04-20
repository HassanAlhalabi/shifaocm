import React from "react";
import { Control, Controller, Path, RegisterOptions } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

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
            style={styles.inputStyle}
            onChangeText={onChange}
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
    paddingLeft: 25,
    paddingRight: 25,
    width: "100%",
    marginBottom: 10,
  },
  inputLabel: {
    color: "#999",
  },
  inputStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#999",
    padding: 8,
    borderRadius: 5,
  },
  error: {
    color: "red",
  },
});
