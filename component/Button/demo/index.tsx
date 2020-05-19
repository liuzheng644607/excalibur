import React, {Component} from 'react';
import Button from '../index';

export class Default extends Component {
  static doc = '描述文档';

  render() {
    return (
      <>
       <Button onPress={() => {}}/>
       <Button fill onPress={() => {}}/>
       <Button outline onPress={() => {}}/>
       <Button round fill onPress={() => {}}/>
       <Button round raised onPress={() => {}}/>
      </>
    );
  }
}
