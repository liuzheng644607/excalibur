import React, { useState, useRef, Component } from 'react';
import {View, StyleSheet, Animated, StyleProp, Text, Image, TextInput , TouchableHighlight, TouchableHighlightProps, TextInputProps, NativeEventEmitter, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import ListItem from '../ListItem';
import Input from './Input';

type Props = {
  label?: React.ReactNode;
  clear?: boolean;
  helper?: React.ReactNode;
  labelType?: 'float' | 'inline' | 'stacked';
} & TextInputProps


class FloatLabelInput extends Component<Props> {
  state = {
    isFocused: false,
  };

  private animatedIsFocused = new Animated.Value(this.props.labelType === 'float' ? 0 : 1);
  private value: string = '';

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });
  handleTextChange = (v: string) => this.value = v;

  componentDidUpdate() {
    const { isFocused } = this.state;
    const { label, labelType } = this.props;
    if (labelType !== 'float' || !label) return;
    Animated.timing(this.animatedIsFocused, {
      toValue: (isFocused || this.value) ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const {
      label,
      clear,
      helper,
      labelType = 'inline',
      ...otherProps
    } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [8, -10],
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      backgroundColor: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      }),
      zIndex: 10,
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    const { isFocused } = this.state;
    const labelText = <Text>{label}</Text>;
    const helperText = <Text style={styles.helperText}>{helper}</Text>;
    const placeholderTextColor = (labelType === 'float' && label) ? isFocused ? undefined : 'rgba(0,0,0,0)' : undefined;
    return (
      <ListItem
      arrow={false}
      align={otherProps.multiline ? 'top' : undefined}
      contentStyle={[styles.contentStyle, { width: 'auto' }]}
      contentViewStyle={{ paddingBottom: 8, paddingTop: label ? 18 : 8}}
      extra={(<>
        <View style={styles.inputContentWrap}>
          <Animated.Text pointerEvents="none" style={[styles.stackedLabelWrap, labelStyle]}>
            {labelText}
          </Animated.Text>
          <Input
            style={styles.input}
            placeholderTextColor={placeholderTextColor}
            {...otherProps}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChangeText={this.handleTextChange}
          />
          {helper ? (
            <View style={styles.helperWrap}>
              {helperText}
            </View>
          ) : null}
        </View>
        </>
      )}
    >
      { labelType === 'inline' && label ? <View style={styles.inlineLabelWrap}>{labelText}</View> : null }
    </ListItem>
    )
  }
}

const InputItem: React.SFC<Props> = (props) => {
  const {
    label,
    clear,
    helper,
    labelType = 'inline',
    ...otherProps
  } = props;
  const [textValue, setValue] = useState(props.defaultValue || props.value);
  const labelText = <Text style={[styles.label, labelType !== 'inline' ? styles.labelInline : {}]}>{label}</Text>
  const helperText = <Text style={styles.helperText}>{helper}</Text>;
  const onValueChange = (v: string) => {
    setValue(v);
  }
  const onClear = () => {
    setValue('');
  }

  if (labelType !== 'inline') {
    return <FloatLabelInput {...props} />;
  }
  return (
    <ListItem
      arrow={false}
      align={otherProps.multiline ? 'top' : undefined}
      contentStyle={[styles.contentStyle, labelType !== 'inline' ? { width: 'auto' } : {}]}
      contentViewStyle={labelType !== 'inline' ? { paddingBottom: 8, paddingTop: 8} : {}}
      extra={(<>
        <View style={styles.inputContentWrap}>
          {labelType !== 'inline' ? (
            <View style={styles.stackedLabelWrap}>
              {labelText}
            </View>
          ) : null}
          <Input style={styles.input} value={textValue} {...otherProps} onChangeText={onValueChange} />
          {helper ? (
            <View style={styles.helperWrap}>
              {helperText}
            </View>
          ) : null}
        </View>
        
        {clear && textValue ?
          <View style={styles.clearWrap} onTouchStart={onClear}>
            <Image
              source={require('../assets/clear.png')}
              style={styles.clearIcon}
            />
          </View>
        : null
      }
        </>
      )}
    >
      { labelType === 'inline' && label ? <View style={styles.inlineLabelWrap}>{labelText}</View> : null }
    </ListItem>
  );
}

const styles = StyleSheet.create({
  inputContentWrap: {
    flex: 1,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 17,
    paddingTop: 0,
    minHeight: 44,
    paddingBottom: 0,
    marginBottom: -8,
  },
  label: {
    fontSize: 17,
  },
  labelInline: {
    fontSize: 12,
  },
  helperWrap: {
    // marginTop: -8,
    height: 14,
  },
  helperText: {
    fontSize: 12,
    color: 'rgb(142, 142, 147)',
  },
  inlineLabelWrap: {
    flex: 0.35,
    height: 44,
    justifyContent: 'center' 
  },
  stackedLabelWrap: {
    marginBottom: 10,
  },
  clearWrap: {
    width: 24,
    height: 24,
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  clearIcon: {
    width: 14,
    height: 14,
  },
  contentStyle: {
    flex: 0,
    width: 85,
    marginRight: 5,
  }
})

export default InputItem;
