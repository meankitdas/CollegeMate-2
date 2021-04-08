import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import TextInput from "../TextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FormField({
  name,
  iconName,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  width,
  ...otherProps
}) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
    handleSubmit
  } = useFormikContext();

  // const { handleSubmit } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
        width={width}
        style={{ flex: 1 }}
      />
      <TouchableWithoutFeedback onPress={handleSubmit}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name={iconName}
            color={iconColor}
            size={size * 0.5}
          />
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
