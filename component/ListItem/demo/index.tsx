
import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { ListItem } from '../index';

export class Default extends Component {
  static doc = `基本用法`;

  render() {
    return (
      <ListItem onPress={() => console.log('1')}>呵呵呵</ListItem>
    );
  }
}

export class Default1 extends Component {
  static doc = `Demo描述文档`;

  render() {
    return (
      <>
        <ListItem onPress={() => console.log('1')}>一般</ListItem>
        <ListItem onPress={() => console.log('1')} arrow={false}>没有箭头</ListItem>
        <ListItem onPress={() => console.log('1')} extra="男" >性别</ListItem>
        <ListItem
          onPress={() => console.log('1')}
          extra="余额：¥23.00"
          thumb={(
            <Image
              source={{
                uri: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                width: 22,
                height: 22,
              }}
              style={{ marginRight: 15 }}
            />
          )}>
            我的钱包
        </ListItem>
      </>
    );
  }
}

export class Default2 extends Component {
  static doc = `多行`;

  render() {
    return (
      <ListItem onPress={() => console.log('1')}>
        <View>
          <Text>Title, 门前大桥下，有过一群鸭</Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={{color: '#888', fontSize: 12}}>subtitle,subtitlesubtitlesubtitlesubtitlesubtitlesubtitle， 门前大桥下，有过一群鸭</Text>
        </View>
      </ListItem>
    );
  }
}


export class Default4 extends Component {
  static doc = `顶部对齐`;

  render() {
    return (
      <ListItem
        onPress={() => console.log('1')}
        align="top"
        extra="下午5:50"
        thumb={(
          <Image
            source={{
              uri: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
              width: 22,
              height: 22,
            }}
            style={{ marginRight: 15 }}
          />
        )}>
        <View>
          <Text>Title</Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={{color: '#888', fontSize: 12}}>门前大桥下，有过一群鸭</Text>
        </View>
      </ListItem>
    );
  }
}

