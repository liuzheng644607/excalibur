
import * as React from 'react';
import {Component} from 'react';
import { Text } from 'react-native';
import InputItem from '../index';
import Input from '../Input';

export class Default extends Component {
  static doc = `基本`;

  render() {
    return (
      <>
        <InputItem defaultValue="12" label="Name" clear placeholder="Your Name" />
        <InputItem label="Password" secureTextEntry placeholder="Your Password" />
        <InputItem label="E-mail" placeholder="Your e-mail" />
        <InputItem label="URL" placeholder="URL" />
        <InputItem label="Textarea" placeholder="喵喵喵～" multiline />
      </>
    );
  }
}

export class Default2 extends Component {
  static doc = `堆叠label,提示信息`;

  render() {
    return (
      <>
        <InputItem label="Password" labelType="stacked" placeholder="Your Password" clear />
        <InputItem label="Name" clearButtonMode="always" helper={<Text style={{color: 'red'}}>Full name please</Text>} labelType="stacked" placeholder="Your Name" clear />
        <InputItem label="Password" helper="8 characters minimum，8 characters minimum， 8 hhhe" labelType="stacked" placeholder="Your Password" clear />
        <InputItem label="e-mail" helper="Your work e-mail address" labelType="stacked" placeholder="e-mail" clear />
      </>
    );
  }
}

export class Default1 extends Component {
  static doc = `浮动 label`;

  render() {
    return (
      <>
        <InputItem label="Password，Please type Password" labelType="float" clear />
        <InputItem labelType="float" placeholder="Your Name" clear />
        <InputItem label="Textarea" multiline labelType="float" placeholder="Your Password" clear />
        <InputItem label="e-mail" labelType="float" placeholder="e-mail" clear />
      </>
    );
  }
}

export class Default3 extends Component {
  static doc = `浮动 label`;

  render() {
    return (
      <>
        <InputItem label="Password，Please type Password" labelType="float" clear />
        <InputItem label="Name" clearButtonMode="always" helper="Full name please" labelType="float" placeholder="Your Name" clear />
        <InputItem label="Textarea" multiline labelType="float" placeholder="Your Password" clear />
        <InputItem label="e-mail" helper="Your work e-mail address" labelType="float" placeholder="e-mail" clear />
      </>
    );
  }
}

export class Default4 extends Component {
  static doc = `Input`;

  render() {
    return (
      <>
        <Input />
        <Input bordered clearButtonMode="always" />
        <Input bordered multiline />
      </>
    );
  }
}
