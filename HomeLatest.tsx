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
  Touchable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageView from "react-native-image-viewing";

export function Home({navigation}) {
  const [items, setItems] = useState([]);

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

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Chat' },
    { key: 'second', title: 'Status' },
  ]);

  const mainui =(
    <SafeAreaView style={styles.home}>

      <View style={styles.homeView1}>
        <TextInput style={styles.homeInput1} autoCorrect={false} />
        <Icon
          style={styles.homeInput1Image}
          name="search"
          size={30}
          color={'#000000'}
        />
      </View>

        <TabView
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderScene={SceneMap({
            first: chatScreen,
            second: statusScreen,
          })}
        />

    </SafeAreaView>
  );
  return mainui;

  function chatScreen() {
    const ui = (
      <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor: 'white'}}>
        <FlatList data={items} renderItem={itemUi} />
      </View>
    );
    return ui;
  }

  function statusScreen() {
    const ui1 = (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <FlatList data={items} renderItem={itemUi1}/> 
      </View>
    );
    return ui1; 
  }

  function itemUi({item}) {
    const ui2 = (
      <Pressable  onPress={lc}>
        <View style={styles.item}>
          <Image style={styles.itemImage} source={{uri: "http://10.0.2.2/react_chat/uploads/" + item.pic}} />
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

  function itemUi1() {
    const ui3 = (
      <Pressable>
        <View style={styles.item}>
          <Image style={styles.itemImage}  source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}} />
          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>Shehan</Text>
            <Text style={styles.itemText3}>01.17</Text>
          </View>
        </View>
      </Pressable>
    );
    return ui3;
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
    marginBottom: 5,
    marginTop: 5,
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
  statusText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  signInButton1: {
    width: '100%',
    height: 40,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

 
 
 
 