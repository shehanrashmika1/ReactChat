import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Chats } from './Chats';

const FirstRoute = () => (
  // <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  <Chats/>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });


const renderScene = ({ route }) => {
  switch (route.key) {
    case 'first':
      return <Chats/>
    case 'second':
      return <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
  }
};


export function Home({navigation}) {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Chats' },
    { key: 'second', title: 'Status' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}