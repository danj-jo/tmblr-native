import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Input} from "postcss";
import {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// Save userId after login


// Read userId when posting


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const handleLogin = async () => {
        console.log("handleLogin called");

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Backend error:', text);
                return;
            }

            const data = await response.json();
            console.log("Response data:", data);

            if (data.success) {
                await AsyncStorage.setItem('userId', data.userId);
                console.log('Login successful! User ID:', data.userId);
                console.log(AsyncStorage.getItem('userId'))

            } else {
                console.log('Login failed:', data.message);
            }
            if(!response){
                console.log("blank")
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <View>
            <TextInput id={"username"}
                       style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                       placeholder="username"
                       onChangeText={text => setUsername(text)}
                       value={username}
            autoCapitalize={"none"}/>
            <TextInput id={"password"}
                       style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                       placeholder="password"
                       onChangeText={text => setPassword(text)}
                       value={password}
                       autoCapitalize={"none"}/>
<TouchableOpacity style={{
    backgroundColor: "blue",
    width: 100,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20

}} onPress={async () => {
    await handleLogin()
}}>
    <Text style={{alignSelf: "center", color: "white", top: 15}}> Login  </Text>
</TouchableOpacity>
    </View>
);
};

export default Login;
