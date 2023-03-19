import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Chats } from './Chats';

const FirstRoute = ({navigation}) => (
  <Chats navigation={navigation}/>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);


const renderScene = ({ route, navigation }) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute navigation={navigation} />;
    case 'second':
      return <SecondRoute />;
    default:
      return null;
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
      renderScene={(props) => renderScene({ ...props, navigation })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}