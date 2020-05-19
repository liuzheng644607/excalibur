import React, { useState, useRef, Component } from 'react';
import {View, StyleSheet, Animated, StyleProp, Text, Image, TextInput , TouchableHighlight, TouchableHighlightProps, TextInputProps, NativeEventEmitter, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

type Props = {
  bordered?: boolean;
} & TextInputProps

const Input: React.SFC<Props> = ({
  style,
  bordered = false,
  ...other
}) => {
  return (
    <TextInput
      style={[
      styles.input,
      bordered ? styles.inputWithBoder : {},
      other.multiline? styles.withMultiLine : {},
      style
    ]} {...other} />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    fontSize: 17,
  },
  inputWithBoder: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(153, 153, 153)',
    borderRadius: 4,
    paddingLeft: 12,
    paddingRight: 12,
    minHeight: 40,
  },

  withMultiLine: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Input;
