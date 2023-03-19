import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';

export function SignUp({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setverifyPassword] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [ProfileImage, setProfileImage] = useState([]);

  const ui = (
    <SafeAreaView style={styles2.signUpMain}>
      <View style={styles2.view1}>
        <Text style={styles2.text1}>Mobile</Text>
        <TextInput
          style={styles2.input1}
          autoCorrect={false}
          maxLength={10}
          keyboardType={'number-pad'}
          onChangeText={setMobileNumber}
        />
      </View>

      <View style={styles2.view1}>
        <Text style={styles2.text1}>Name</Text>
        <TextInput
          style={styles2.input1}
          autoCorrect={false}
          onChangeText={setName}
        />
      </View>

      <View style={styles2.view1}>
        <Text style={styles2.text1}>Password</Text>
        <TextInput
          style={styles2.input1}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles2.view1}>
        <Text style={styles2.text1}>Verify Password</Text>
        <TextInput
          style={styles2.input1}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={setverifyPassword}
        />
      </View>

      <View style={styles2.view1}>
        <Text style={styles2.text1}>Country</Text>
        <SelectDropdown data={countries} onSelect={setCountry} />
      </View>

      <Button title={'Select Profile Picture'} onPress={selectProfilePic} />
      <Button title={'SignUp'} onPress={signupRequest} />
    </SafeAreaView>
  );

  function loadCountries() {
    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
      if (r.readyState == 4 && r.status == 200) {
        var countryArray = JSON.parse(r.responseText);
        setCountries(countryArray);
      }
    };

    r.open('GET', 'http://10.0.2.2/react_chat/load_countries.php', true);
    r.send();
  }

  loadCountries();

  async function selectProfilePic() {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      Alert.alert('Message', 'No Image');
    } else {
      const imageObject = {
        uri: result.assets[0].uri,
        name: 'profile.png',
        type: 'image/png',
      };

      setProfileImage(imageObject);
    }
  }

  function signupRequest() {
    var f = new FormData();
    f.append('mobile', mobileNumber);
    f.append('name', name);
    f.append('password', password);
    f.append('verifyPassword', verifyPassword);
    f.append('country', country);
    f.append('ProfileImage', ProfileImage);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
      if (r.readyState == 4 && r.status == 200) {
        var t = r.responseText;
        Alert.alert('Response', t);
      }
    };

    r.open('POST', 'http://10.0.2.2/react_chat/signUp.php', true);
    r.send(f);
  }

  return ui;
}

const styles2 = StyleSheet.create({
  view1: {
    flexDirection: 'row',
  },
  text1: {
    fontSize: 20,
    paddingEnd: 10,
    color: 'black',
  },
  input1: {
    height: 35,
    width: '60%',
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingStart: 10,
    color: 'black',
  },
  signUpMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});

// export default signUp;