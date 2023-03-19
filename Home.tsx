import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Pressable,
  Alert,
  Keyboard,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});


export function Home({navigation}) {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [items, setItems] = useState([]);

  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);


  async function loadFriendList() {
    const userJSONtext = await AsyncStorage.getItem('user');
    const f = new FormData();
    f.append('userJSONtext', userJSONtext);

    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
      if (r.readyState == 4 && r.status == 200) {
        setItems(JSON.parse(r.responseText));
      }
    };
    r.open('POST', 'http://10.0.2.2/react_chat/load_users.php', true);
    r.send(f);
  }

  loadFriendList();

  const ui = (
    <SafeAreaView style={styles.home}>
      <Text style={styles.homeText1}>Message</Text>

      <View style={styles.homeView1}>
        <TextInput style={styles.homeInput1} autoCorrect={false} />
        <Icon
          style={styles.homeInput1Image}
          name="search"
          size={30}
          color={'#000000'}
        />
      </View>

      <FlatList data={items} renderItem={itemUi} />
    </SafeAreaView>


  );

  // return (
  //   <TabView
  //     navigationState={{ index, routes }}
  //     renderScene={renderScene}
  //     onIndexChange={setIndex}
  //     initialLayout={{ width: layout.width }}
  //   />
  // );
  
  return ui;

  function itemUi({item}) {
    const ui2 = (
      <Pressable  onPress={lc}>
        <View style={styles.item}>
          <Image style={styles.itemImage} source={{uri: "http://10.0.2.2/react_chat/" + item.pic}} />
          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>{item.name}</Text>
            <Text style={styles.itemText2}>{item.message}</Text>
          </View>
          <View style={styles.itemView2}>
            <Text style={styles.itemText3}>{item.time}</Text>
            <View style={styles.itemShape1}>
              <Text style={styles.itemText4}>{item.count}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );

    function lc(){
      const obj = {
        "name":item.name,
        "id":item.id,
        "img":item.pic,
      };
  
      navigation.navigate('Chat',obj);
      // Alert.alert("Message","hi");
    }

    return ui2;
  
  }

}



const styles = StyleSheet.create({
  itemView2: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 7,
    paddingHorizontal: -60,
    width: '20%',
  },
  itemView1: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 3,
    width: '55%',
  },
  itemShape1: {
    height: 26,
    width: 26,
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText3: {
    fontSize: 14,
    color: '#9E9F9F',
  },
  itemText4: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  itemText2: {
    fontSize: 16,
    color: '#9E9F9F',
  },
  itemText1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  home: {
    flex: 1,
  },
  homeText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#000000',
    fontFamily: 'RalewayThin',
    fontWeight: 'bold',
  },
  homeInput1: {
    height: 45,
    borderStyle: 'solid',
    borderWidth: 1,
    width: '90%',
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingEnd: 34,
    borderColor: '#000000',
  },
  homeInput1Image: {
    position: 'absolute',
    right: 10,
  },
  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 15,
    marginBottom: 20,
  },
  itemImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
