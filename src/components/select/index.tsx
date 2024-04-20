import React from "react";
import { Control, Controller, Path } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export interface SelectItem {
  id: number | string;
  title: string;
  icon: string;
}

const Select = <T,>({
  options,
  control,
  name,
  error,
  label,
  required,
}: {
  options: SelectItem[];
  label?: string;
  error?: string;
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
}) => (
  <Controller
    control={control}
    name={name}
    rules={{
      required: { value: required, message: "هذا الحقل مطلوب" },
    }}
    render={({ field: { onChange } }) => (
      <View style={styles.inputHolder}>
        {Boolean(label) && <Text style={styles.inputLabel}>{label}</Text>}
        <SelectDropdown
          data={options}
          onSelect={(selectedItem: SelectItem) => onChange(selectedItem.id)}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View>
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Icon
                      name={selectedItem.icon}
                      style={styles.dropdownButtonIconStyle}
                    />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {selectedItem && selectedItem.title}
                  </Text>
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
                {Boolean(error) && <Text style={styles.error}>{error}</Text>}
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
    )}
  />
);

export default Select;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    maxWidth: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#999",
    borderStartEndRadius: 1,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    maxWidth: 310,
    width: "100%",
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  inputHolder: {
    paddingLeft: 25,
    paddingRight: 25,
    width: "100%",
    marginBottom: 10,
  },
  inputLabel: {
    color: "#999",
  },
  error: {
    color: "red",
  },
});
