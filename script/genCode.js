const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../component');

const genComponentDir = (componentName) => {
  const cpath = path.join(componentsDir, componentName);
  if (fs.existsSync(cpath)) {
    throw new Error(`Component "${componentName}" already exists`);
  }
  fs.mkdirSync(cpath);
  genCode(componentName, cpath);
}

const genCode = (componentName, p) => {
  const cp = path.join(p, 'index.tsx');
  const tmp = genTsx(componentName);
  const demoStr = genDemo(componentName);
  fs.writeFileSync(cp, tmp);
  const demoDir = path.join(p, 'demo');
  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir);
  }
  fs.writeFileSync(path.join(demoDir, 'index.tsx'), demoStr);
  genComponentsJS();
}

// 找出 componentDir 目录中所有首字母大写的文件夹
function getComponents() {
  return fs
    .readdirSync(componentsDir)
    .filter(
      (dir) =>
        /[A-Z].+/.test(dir) &&
        fs.statSync(path.resolve(componentsDir, dir)).isDirectory()
    );
}

function genComponentsJS() {
  let str = 'export const demos = {';
  getComponents().forEach((component) => {
    if (fs.existsSync(path.resolve(componentsDir, component, 'demo'))) {
      str += `\n\t${component}: () => require('../../component/${component}/demo'),`;
    }
  });
  str += '\n};\n';
  fs.writeFileSync(path.resolve(__dirname, './App/demos.ts'), str);
}

const genDemo = (componentName) => {
  return `import React, {Component} from 'react';
import ${componentName} from '../index';

export class Default extends Component {
  static doc = '描述文档';

  render() {
    return (
      <>
       <${componentName} />
      </>
    );
  }
}
`;
}

const genTsx = (componentName) => {
  return `import React, {Component} from 'react';
import {View, StyleSheet, StyleProp, Text, ViewStyle} from 'react-native';

type State = {}

export type ${componentName}Props = {
  style?: StyleProp<ViewStyle>,
}

export default class ${componentName} extends Component<${componentName}Props, State> {
  componentDidMount() {}

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.wrapperStyle, style]}>
        <Text>${componentName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {

  },
});
`;
}

genComponentDir(process.argv[2]);