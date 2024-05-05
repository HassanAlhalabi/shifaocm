import { Text, TextProps } from "react-native";

const AppText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={{
        fontFamily: "Cairo_400Regular",
        ...(props.style as Record<any, any>),
      }}
    />
  );
};

export default AppText;
