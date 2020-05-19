import React, {Component} from 'react';
import {View, StyleSheet, TouchableHighlight, TouchableHighlightProps, StyleProp, Text, ViewStyle} from 'react-native';

type State = {}

export type ButtonProps = {
  fill?: boolean;
  round?: boolean;
  outline?: boolean;
  raised?: boolean;
  style?: StyleProp<ViewStyle>,
} & TouchableHighlightProps

export default class Button extends Component<ButtonProps, State> {
  componentDidMount() {}

  render() {
    const { style, fill, outline, round, raised, ...other } = this.props;
    return (
      <TouchableHighlight
        style={[
          styles.wrapperStyle,
          fill ? styles.btnFill : {},
          round ? styles.btnRound : {},
          outline ? styles.btnOutline: {},
          raised ? styles.btnRaised : {},
          style
        ]}
        underlayColor={fill ? 'rgb(41, 143, 255)' : 'rgba(0, 122, 255, 0.15)'}
        {...other}
      >
        <Text style={[
          styles.btnText,
          fill ? styles.btnTextFill : {},
        ]}>Button</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 29,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnFill: {
    backgroundColor: 'rgb(0, 122, 255)'
  },
  btnRound: {
    borderRadius: 29,
  },
  btnOutline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(0, 122, 255)',
  },
  // 0px 3px 6px 0px, rgba(0, 0, 0, 0.23) 0px 3px 6px 0px;
  btnRaised: {
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 3,
      height: 6,
    },
    // shadowRadius: 0
  },
  btnTextFill: {
    color: '#fff',
  },
  btnText: {
    fontSize: 14,
    color: 'rgb(0, 122, 255)',
  },
});
