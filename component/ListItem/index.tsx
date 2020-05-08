import React from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight, TouchableHighlightProps} from 'react-native';

type Props = {
  arrow?: boolean,
  extra?: React.ReactNode,
  thumb?: React.ReactNode,
  align?: 'top' | 'center',
}

export const ListItem: React.SFC<Props & TouchableHighlightProps> = ({
  extra,
  arrow = true,
  thumb,
  children,
  align = 'center',
  ...other
}) => {
  return (
    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" {...other}>
      <View style={styles.viewWrap}>
        <View style={styles.itemView}>
          {thumb}
          <View style={[styles.contentList, { alignItems: align === 'center' ? 'center' : 'flex-start'}]}>
            <View style={styles.content}>{typeof children === 'string' ? <Text>{children}</Text> : children}</View>
            { extra ? <View style={styles.extra}>{typeof extra === 'string' ? <Text style={styles.extraText}>{extra}</Text> : extra}</View> : null }
            { arrow ? <Image source={require('../assets/arrow-right.png')} style={styles.arrow} /> : null }
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  itemView: {
    borderBottomColor: '#e7e7e7',
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
  extra: {},
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
