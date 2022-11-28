import React, {useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TextInput, Alert } from 'react-native';
//import Parse from "parse/react-native";

const Stack = createNativeStackNavigator();
const user_array = [];
let logged_in = new Boolean(false);
let current_user = User;

class User {
  username
  password
  lists = [];
  constructor(username, password) {
      this.username = username;
      this.password = password;
  }

  makeList(list_name, size){
    const list = new List(list_name, size);
    User.lists.push(list);
  }
}

class List {
  list_name
  size
  checked = [];
  constructor(list_name, size) {
      this.username = username;
      this.password = password;
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name = "Home" component = {HomeScreen} />
        <Stack.Screen name = "Login" component = {LoginScreen} />
        <Stack.Screen name = "Register" component = {RegisterScreen}/>
        <Stack.Screen name = "Hub" component = {HubScreen}/>
        <Stack.Screen name = "NewList" component = {NewListScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf:'stretch',
  },
  list_container: {

  }
});

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>You are not logged in.</Text>
      <Button 
        title = "Login"
        onPress = {() => navigation.navigate('Login')}
      />
      <Button 
        title = "Register"
        onPress = {() => navigation.navigate('Register')}
      />
    </View>
     
  );
}

function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registration</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Register"
        onPress = {() => Register(username, password)}
      />
    </View>
  )
}

function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login</Text> 
      <TextInput 
        style={styles.input} 
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Login"
        onPress = {() => Login(username, password)}
      />
    </View>
    
  )
}

function HubScreen({navigation}){
return(
  <View style={styles.container}>
    <View>
    //Existing Lists container, all lists go here
    </View>
    <Button title="New List" onPress = {() => navigation.navigate('NewList')}/>
  </View>
)
}
function NewListScreen({navigation}){
  const [list_name, setListname] = useState('');
  const [size, setSize] = useState('');
  return(
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="List Name"
        onChangeText={(text) => setListname(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Size"
        onChangeText={(text) => setSize(text)}
      />
      <Button title="Submit" onPress = {() => New_List(list_name, size)}/>
    </View>
  )
}

function New_List(list_name, size){
  current_user.makeList(list_name, size);
}


function Register(username, password){
  const user = new User(username, password);
  const navigation = useNavigation();
  console.log("registered")

  user_array.push(user)
  console.log(user_array[0].username)
  Alert.alert("All Done!", "You have successfully registered.", {text: "OK", onPress: () => {navigation.navigate('Home')}})
  //navigation.navigate('Home');
}

function Login({navigation}, username, password){
  //const navigation = useNavigation();
  for(let i = 0; i < user_array.length; i++){
    if (username == user_array[i].username){
      if (password == user_array[i].password){
        logged_in = true;
        current_user = user_array[i];
        Alert.alert("All Done!", "You have successfully logged in.", {text: "OK", onPress: () => {navigation.navigate('Home')}})
      } else{
        Alert.alert("Oh No!", "You have failed to log in, incorrect password.", {text: "OK", onPress: () => {navigation.navigate('Login')}})
      }
    } else {
        Alert.alert("Oh No!", "You have failed to log in, incorrect username.", {text: "OK", onPress: () => {navigation.navigate('Login')}})
    }
  }
}