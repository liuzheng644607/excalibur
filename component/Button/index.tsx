
import React, { Component } from 'react';
import {StyleProp, View, ViewStyle, Text} from 'react-native';
import {globalStyle} from '../style';

export interface IButtonProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Button
 */
export class Button extends Component<IButtonProps> {
  render() {
    const {style, ...otherProps} = this.props;
    return (
      <View
        {...otherProps}
        style={[
          {
            width: globalStyle.gap.n,
          },
          style,
      ]}>
        <Text>Button</Text>
      </View>
    );
  }
}
