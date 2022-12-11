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
  //const navigation = useNavigation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name = "Home" component = {HomeScreen} />
        <Stack.Screen name = "Login" component = {LoginScreen} />
        <Stack.Screen name = "Register" component = {RegisterScreen}/>
        <Stack.Screen name = "Hub" component = {HubScreen}/>
        <Stack.Screen name = "NewList" component = {NewListScreen}/>
        <Stack.Screen name = "ListDetails" component = {ListDetailsScreen}/>
        <Stack.Screen name = "ListEditor" component = {ListEditorScreen}/* options ={{
          headerLeft: () => (
            <Button title = "Back" onPress = {()=> Stack.push('ListDetails')}/>
          )
        }}*//>
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
    Alert.alert("All Done!", "You have successfully registered!", [{text: "OK", onPress: () => {navigation.navigate('Home')}}])
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
          Alert.alert("All Done!", "You have successfully logged in " + username + ".", [{text: "OK", onPress: () => {navigation.push('Hub')}}])
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
  const list_container = current_user.lists.map(list => <Button title={String(list.list_name)} onPress={() => navigation.push('ListDetails', {
    the_list: list
  })}/>)
return(
  <View style={styles.container}>
    <Text>All Lists</Text>
    <View>
      <>{list_container}</>
    </View>
    <Button title="New List" onPress = {() => navigation.navigate('NewList')}/>
  </View>
  );
}

function ListDetailsScreen({route, navigation}){
  const {the_list} = route.params
  const strings = the_list.CheckedStrings()
  return(
    <View>
      <View><Text>List Name: {String(the_list.list_name)}</Text></View>
      <View><Text>Size: {String(the_list.size)}</Text></View>
      <View><Text>Checked: {String(strings[0])}</Text></View>
      <View><Text>Unchecked: {String(strings[1])}</Text></View>
      <Button title="Edit List" onPress = {() => navigation.navigate("ListEditor", {
        list: the_list
      })}/>
    </View>
  );
}

function ListEditorScreen({route, navigation}){
  const [checked_num, setCheckednum] = useState('');
  const {list} = route.params

  function EditList(checked_num){
    if (!list.checked.includes(checked_num)){
      list.checked.push(checked_num)
      Alert.alert("Number has been checked.")
    }else{
      Alert.alert("Number has already been checked.")
    }
  }

  return(
    <View style={styles.container}>
      <Text>Enter a number to be checked from the list.</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Number Completed"
        onChangeText={(text) => setCheckednum(text)}
      />
      <Button title="Check Number" onPress = {() => EditList(checked_num)}/>
      <Button title="Save Updates" onPress = {() => navigation.push("ListDetails", {
        the_list: list
      })}/>
    </View>
  );
}

function NewListScreen({navigation}){
  const [list_name, setListname] = useState('');
  const [size, setSize] = useState('');
  
  function New_List(list_name, size){
    current_user.makeList(list_name, size);
    Alert.alert("All Done!", "You have successfully created " + list_name + ".", [{text: "OK", onPress: () => {navigation.push('Hub')}}])
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







