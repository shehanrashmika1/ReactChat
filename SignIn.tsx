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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignIn({navigation}) {
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);

  const ui = (
    <SafeAreaView style={styles.signInMain}>
      <View style={styles.signInImageView}>
        <Image
          style={styles.signInImage}
          source={{
            uri: 'https://th.bing.com/th/id/R.f88172a8e885c57e5c4968f5191a76ff?rik=rKQ1%2fhGnz4kAIw&pid=ImgRaw&r=0',
          }}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="mobile" />
        <TextInput
          style={styles.signInInput1}
          placeholder={'Enter Your Name...'}
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="lock" />
        <TextInput
          style={styles.signInInput1}
          secureTextEntry={true}
          autoCorrect={false}
          maxLength={15}
          placeholder={'Enter Your Password...'}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.signInBtnView1}>
        <Pressable style={styles.signInButton1} onPress={signInProcess}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </Pressable>
        <Pressable style={styles.signInButton2} onPress={SignUp}>
          <Text style={styles.signInBtnText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  function SignUp(){
    navigation.navigate('Sign Up');
  }

  async function signInProcess() {
    var JSRequestObject = {mobile: mobile, password: password};
    var JSONRequestText = JSON.stringify(JSRequestObject);

    var f = new FormData();
    f.append('JSONRequestText', JSONRequestText);

    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
      if (r.readyState == 4 && r.status == 200) {
        var t = r.responseText;
        var JSResponseObj = JSON.parse(t);

        if (JSResponseObj.msg == 'Error') {
          // Alert.alert("Messsage","Invalid");
        } else if (JSResponseObj.msg == 'Success') {
          var userObj = JSResponseObj.user;
          AsyncStorage.setItem('user', JSON.stringify(userObj));
          Alert.alert('Messsage', 'Welcome' + ' ' + userObj.name);

          navigation.navigate('Home');
        }
      }
    };
    r.open('POST', 'http://10.0.2.2/react_chat/signIn.php', true);
    r.send(f);
  }

  return ui;
}

const styles = StyleSheet.create({
  signUpSelect: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  signUpImageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpImage: {
    position: 'absolute',
    fontSize: 25,
    color: 'black',
  },
  signInBtnView1: {
    alignItems: 'center',
    width: '100%',
    gap: 10,
    paddingTop: 10,
  },
  signInImageView: {
    paddingBottom: 25,
  },
  signInBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  signInButton2: {
    width: '80%',
    height: 40,
    borderRadius: 18,
    backgroundColor: '#36C462',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton1: {
    width: '80%',
    height: 40,
    borderRadius: 15,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInIcon1: {
    fontSize: 28,
    position: 'absolute',
    start: 15,
    color: 'black',
  },
  signInInput1: {
    width: '80%',
    height: 45,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    paddingStart: 45,
    fontSize: 18,
  },
  signInView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  signInMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});

// export default signIn;
