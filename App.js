import React, {useState} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Text, Button, View, TextInput, Alert } from 'react-native';
import {User} from './user.js';
import {List} from './list.js';
import {styles} from './stylesheet.js';

const Stack = createNativeStackNavigator();
const user_array = [];
let logged_in = new Boolean(false);
let current_user = User;

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



function HomeScreen({navigation}) {
  if (logged_in == false){
    console.log("not logged in");
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
  }else{
    console.log("logged in");
    return(
      <View style={styles.container}>
        <View>
        </View>
        <Button title="New List" onPress = {() => navigation.navigate('NewList')}/>
      </View>
    );
  }
}

function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  function Register(navigation, username, password){
    const user = new User(username, password);
    //const navigation = useNavigation();
    console.log("registered")
    user_array.push(user)
    console.log(user_array[0].username)
    Alert.alert("All Done!", "You have successfully registered.", [{text: "OK", onPress: () => {navigation.navigate('Home')}}])
    //navigation.navigate('Home');
  }

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
        onPress = {() => Register(navigation, username, password)}
      />
    </View>
  )
}

function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function Login(username, password){
    //const navigation = useNavigation();
    for(let i = 0; i < user_array.length; i++){
      if (username == user_array[i].username){
        if (password == user_array[i].password){
          logged_in = true;
          current_user = user_array[i];
          Alert.alert("All Done!", "You have successfully logged in.", [{text: "OK", onPress: () => {navigation.navigate('Hub')}}])
        } 
      } 
    }
    if (logged_in == false){
      Alert.alert("Oh No!", "You have failed to log in, incorrect username or password.", [{text: "OK", onPress: () => {navigation.navigate('Login')}}])
    }
  }

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
    </View>
    <Button title="New List" onPress = {() => navigation.navigate('NewList')}/>
  </View>
  )
}

function NewListScreen({navigation}){
  const [list_name, setListname] = useState('');
  const [size, setSize] = useState('');
  
  function New_List(list_name, size){
    current_user.makeList(list_name, size);
    //then navigate to the homescreen
  }
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







