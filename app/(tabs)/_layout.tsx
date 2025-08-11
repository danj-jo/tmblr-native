import {Stack, Tabs } from 'expo-router';
import React, {useState} from 'react';
import {Platform, Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [activeTab, setActiveTab] = useState("home")
    return (
        <><Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        backgroundColor: "#36465D",
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                        zIndex: 1
                    },
                    android: {
                        backgroundColor: "#36465D",
                    },
                    default: {},
                }),
                headerStyle: {
                    backgroundColor: colorScheme === 'light' ? "#36465D" : "black",
                },
                tabBarIconStyle: {
                    marginTop: 10
                }
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: '',
                    tabBarIcon: ({color}) => <MaterialIcons name="home" size={28} color={color}/>,
                }}/>
            <Tabs.Screen
                name="search"
                options={{
                    title: '',
                    tabBarIcon: ({color}) => <MaterialIcons name="search" size={28} color={color}/>,
                }}/>
            <Tabs.Screen
                name="newpost"
                options={{
                    title: '',
                    tabBarIcon: ({color}) => <FontAwesome name="pencil" size={28} color={color}/>
                }}/>
            <Tabs.Screen
                name="activity"
                options={{
                    title: '',
                    tabBarIcon: ({color}) => <MaterialIcons name="mail" size={28} color={color}/>
                }}/>
            <Tabs.Screen
                name="profile"
                options={{
                    title: '',
                    tabBarIcon: ({color}) => <MaterialIcons name="person" size={28} color={color}/>
                }}/>
        </Tabs>
        </>
    );
}
const styles = StyleSheet.create({
    menuTab:{
        color: "white"
    }
})