import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export function Chat({navigation,route}) {
  const [chatText, setChatText] = useState(null);
  const [chatHistory, setchatHistory] = useState([]);

  async function sendRequest(){
    var f = new FormData();
    const userJSONText = await AsyncStorage.getItem('user');
    const userJSONObj = JSON.parse(userJSONText);
    f.append("id1",userJSONObj.id);
    f.append("id2",route.params.id)

    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
      if (r.readyState == 4 && r.status == 200) {
        var t = r.responseText;
        var responseArray = JSON.parse(t);
        setchatHistory(responseArray);
      }
    };

    r.open('POST', 'http://10.0.2.2/react_chat/loadChat.php', true);
    r.send(f);
  } 

  function start(){
    setInterval(sendRequest,5000);
  }
  useEffect(start,[]);

  const ui = (
    <SafeAreaView style={styles.chat}>
      <Text style={styles.chatText1}>Chat</Text>
      <Image
        style={styles.itemImage}
        source={{uri: "http://10.0.2.2/react_chat/" + route.params.img}}
      />
      <Text style={styles.chatText2}>{route.params.name}</Text>

      <FlatList
        data={chatHistory}
        renderItem={chatItem}
        style={styles.chatList}
      />

      <View style={styles.chatSendView}>
        <TextInput
          style={styles.chatInput1}
          placeholder="Enter Your Message"
          onChangeText={setChatText}
        />
        <TouchableOpacity onPress={saveChat}>
          <Icon name="send" style={styles.chatIcon1} size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  async function saveChat() {
    var userJSONText = await AsyncStorage.getItem('user');
    var fromUserObject = JSON.parse(userJSONText);

    var requestObject = {
      from_user_id: fromUserObject.id,
      to_user_id: route.params.id,
      message: chatText,
    };

    const formData = new FormData();
    formData.append('requestJSON', JSON.stringify(requestObject));

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
      }
    };
    request.open('POST', 'http://10.0.2.2/react_chat/save_chat.php', true);
    request.send(formData);
  }

  return ui;
}

function chatItem({item}) {
  const itemUi = (
    <View
      style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
      <Text style={styles.chatText3}>{item.msg}</Text>
      <View style={styles.chatView1}>
        <Text>{item.time}</Text>
        {item.side == 'right' ? (
          item.status == 'seen' ? (
            <Icon name="check" size={16} style={styles.chatIconSeen} />
          ) : (
            <Icon name="check" size={16} style={styles.chatIconSent} />
          )
        ) : null}
      </View>
    </View>
  );

  return itemUi;
}

const styles = StyleSheet.create({
  chatIcon1: {
    color: '#0662f9',
    paddingHorizontal: 10,
  },
  chatInput1: {
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    width: '75%',
    borderColor: '#6F6F6F',
  },
  chatSendView: {
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIconSeen: {
    color: 'green',
    paddingLeft: 10,
  },
  chatIconSent: {
    color: 'red',
    paddingLeft: 10,
  },
  chatList: {
    width: '95%',
    paddingVertical: 15,
  },
  chatViewLeft: {
    backgroundColor: '#C1E8FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  chatViewRight: {
    backgroundColor: '#C1E8FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  chatView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatText3: {
    color: '#000000',
    fontSize: 16,
  },
  chatText2: {
    fontSize: 22,
    paddingVertical: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  chatText1: {
    fontSize: 28,
    paddingVertical: 10,
    color: '#000000',
    fontFamily: 'RalewayThin',
    fontWeight: 'bold',
  },
  chat: {
    flex: 1,
    alignItems: 'center',
  },
  itemView2: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 7,
    paddingHorizontal: -60,
  },
  itemView1: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 3,
    width: '60%',
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
    alignItems: 'center',
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
