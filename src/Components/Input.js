import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const Input = ({
  label,
  inputStyle,
  containerStyle,
  touched,
  error,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <Text>{label}</Text>
      <TextInput ref={props.forwardRef} style={inputStyle} {...props} />
      <Text style={styles.errorInput}>{touched && error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    minHeight: 40,
    padding: 10,
  },
  errorInput: { color: "red", fontSize: 12 },
});

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);

Input.propTypes = {
  inputStyle: stylePropsType,
  containerStyle: stylePropsType,
  ...TextInput.propTypes,
};
Input.defaultProps = {
  inputStyle: styles.input,
  containerStyle: styles.containerStyle,
  touched: false,
  error: null,
};

export default Input;