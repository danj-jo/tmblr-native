import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Pressable, ScrollView, FlatList} from 'react-native';
import Post from "@/components/ui/post";
import {Stack, useRouter} from "expo-router";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";

const Foryou = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
    }, []);
    const router = useRouter()

    // @ts-ignore
    // @ts-ignore
    return (

        <View style={{ backgroundColor: "#36465D", height: "100%"}}>

            <FlatList
                keyExtractor={post => post.id}
                data={posts}
                renderItem={({ item }) => (
                    <Post
                        profilePicture={item.profilePicture}
                        createdAt={item.createdAt}
                        notes={item.notes}
                        content={item.content}
                        id={item.id}
                        userId={item.userId}
                    />
                )}
            />


        </View>
    );
};

export default Foryou;
