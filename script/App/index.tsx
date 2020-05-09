/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ListItem from '../../component/ListItem';
import {demos} from './demos';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
}

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = {
  route: HomeScreenRouteProp,
  navigation: HomeScreenNavigationProp,
}
const Stack = createStackNavigator<RootStackParamList>();

const DetailScreen: React.SFC<{}> = () => {
  return (
    <Text>123213</Text>
  );
}

const DemoPage: React.SFC<{
  exportsFn: any,

}> = ({ exportsFn }) => {
  const demoObject = exportsFn();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        {Object.keys(demoObject).map((a: string, i) => {
          const Klass = demoObject[a];
          const { doc } = Klass;
          return (
            <View key={i} style={styles.demoSection}>
              <View style={styles.demoTitle}><Text style={styles.demoText}>{doc}</Text></View>
              <View><Klass /></View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const HomeScreen: React.SFC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
          {
            Object.keys(demos).map((name) => {
            return (
              <ListItem key={name} onPress={() => navigation.navigate(name)}>{name}</ListItem>)
            })
          }
      </ScrollView>
    </SafeAreaView>
  )
};

const App: React.SFC<{}> = () => {
  const s = Object.keys(demos).map((name) => {
    return (
      <Stack.Screen
        key={name}
        name={name}
        children={() => <DemoPage exportsFn={demos[name as keyof typeof demos]} />}
      />
    )
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        {s}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    // flex: 1,
  },
  demoSection: {
    // marginBottom: 15,
  },
  demoTitle: {
    backgroundColor: '#f5f5f9',
    padding: 15,
  },
  demoText: {
    color: '#888'
  },
});

export default App;
