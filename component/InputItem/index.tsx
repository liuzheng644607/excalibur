import React, { useState, useRef, Component } from 'react';
import {View, StyleSheet, Animated, StyleProp, Text, Image, TextInput , TouchableHighlight, TouchableHighlightProps, TextInputProps, NativeEventEmitter, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import ListItem from '../ListItem';

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
    if (this.props.labelType !== 'float') return;
    Animated.timing(this.animatedIsFocused, {
      toValue: (isFocused || this.value) ? 1 : 0,
      duration: 200,
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
        outputRange: [-2, -22],
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    const { isFocused } = this.state;
    const labelText = <Text>{label}</Text>;
    const helperText = <Text style={styles.helperText}>{helper}</Text>;
    const placeholderTextColor = labelType === 'float' ? isFocused ? undefined : 'rgba(0,0,0,0)' : undefined;
    return (
      <ListItem
      arrow={false}
      align={otherProps.multiline ? 'top' : undefined}
      contentStyle={[styles.contentStyle, { width: 'auto' }]}
      contentViewStyle={{ paddingBottom: 8, paddingTop: 28}}
      extra={(<>
        <View style={styles.inputContentWrap}>
          <Animated.Text style={[styles.stackedLabelWrap, labelStyle]}>
            {labelText}
          </Animated.Text>
          <TextInput
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
  const [hasValue, setState] = useState(false);
  const labelText = <Text style={[styles.label, labelType !== 'inline' ? styles.labelInline : {}]}>{label}</Text>
  const helperText = <Text style={styles.helperText}>{helper}</Text>;
  let refInput = useRef<TextInput>();
  const onValueChange = (v: string) => {
    // setState(!!v);
  }
  const onClear = () => {
    setState(false);
    refInput?.current?.clear();
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
          <TextInput ref={refInput} style={styles.input} {...otherProps} onChangeText={onValueChange} />
          {helper ? (
            <View style={styles.helperWrap}>
              {helperText}
            </View>
          ) : null}
        </View>
        
        {clear && hasValue ?
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
    paddingBottom: 0,
  },
  label: {
    fontSize: 17,
  },
  labelInline: {
    fontSize: 12,
  },
  helperWrap: {
    marginTop: 8,
  },
  helperText: {
    fontSize: 12,
    color: 'rgb(142, 142, 147)'
  },
  inlineLabelWrap: {
    flex: 0.35
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
