import React, {useState} from 'react';
import {View, Text, Pressable, TextInput, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
const PostModal = () => {
    const [text, setText] = useState("")
    const id = AsyncStorage.getItem('userId')
    const navigation = useNavigation();
    return (
        <SafeAreaView>
        <View style={{backgroundColor: "white", height: "100%"}}>
            <View style={{marginHorizontal: 10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                        <TouchableOpacity onPress={async () => {
                            try{
                                const userId = await AsyncStorage.getItem('userId'); // get saved userId

                                if (!userId) {
                                    console.log('No user ID found, please login first.');
                                    return;
                                }
                                const response =  await fetch("http://localhost:3000/post", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        userId: userId,
                                        text: text ,
                                        images: []},
                                        )
                                })
                                const data = await response.json();
                               navigation.navigate('home', { screen: 'foryou' })
                                console.log("Response data:", data);

                            } catch(e){

                            }
                        }}>
                            <Text style={{marginTop: 10,backgroundColor: "#EEEEEE", borderRadius: 20, width: 70, padding: 5, height: 30, textAlign: "center"}}> Post </Text>
                        </TouchableOpacity>
                        <Pressable style={{marginTop: 5}}>
                            <MaterialIcons name="more-horiz" size={29}/>
                        </Pressable>
                    </View>
                </View>
                <Image
                    source={{uri: id?.toString()}}
                    style={{width: 50, height: 50, marginTop: 50}} />
                <TextInput
                    editable
                    multiline
                    value={text}
                    placeholder={"Add something, if you'd like"}
                    onChangeText={(text) => setText(text)}
                />
                <View style={{flexDirection: "row"}}>
                    <MaterialCommunityIcons name="format-letter-case" size={24} color="black" />
                </View>
            </View>
        </View>
        </SafeAreaView>
    );
};

export default PostModal;
