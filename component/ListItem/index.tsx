import React from 'react';
import {View, StyleSheet, StyleProp, Text, Image, TouchableHighlight, TouchableHighlightProps, StyleSheetProperties, ViewStyle} from 'react-native';

export type Props = {
  arrow?: boolean,
  extra?: React.ReactNode,
  thumb?: React.ReactNode,
  align?: 'top' | 'center',
  contentStyle?: StyleProp<ViewStyle>,
  contentViewStyle?: StyleProp<ViewStyle>,
}

export const ListItem: React.SFC<Props & TouchableHighlightProps> = ({
  extra,
  arrow = true,
  thumb,
  children,
  contentStyle,
  contentViewStyle,
  align = 'center',
  ...other
}) => {
  return (
    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" {...other}>
      <View style={styles.viewWrap}>
        <View style={[styles.itemView, contentViewStyle]}>
          {thumb}
          <View style={[styles.contentList, { alignItems: align === 'center' ? 'center' : 'flex-start'}]}>
            <View style={[styles.content, contentStyle]}>{typeof children === 'string' ? <Text style={styles.label}>{children}</Text> : children}</View>
            { extra ? typeof extra === 'string' ? <Text style={styles.extraText}>{extra}</Text> : extra : null }
            { arrow ? <Image source={require('../assets/arrow-right.png')} style={styles.arrow} /> : null }
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  itemView: {
    borderBottomColor: 'rgb(200, 199, 204)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  viewWrap: {
    paddingLeft: 15,
  },
  contentList: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  title: {},
  label: {
    fontSize: 17,
  },
  extra: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  extraText: {
    color: '#888',
  },
  arrow: {
    width: 15,
    height: 15,
  },
});

export default ListItem;
