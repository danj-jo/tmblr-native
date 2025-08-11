import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '@/components/ui/post';

const Following = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowingPosts = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    setPosts([]);
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:3000/following', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch following posts');
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching following posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowingPosts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <View style={{ backgroundColor: '#36465D', flex: 1 }}>
            <FlatList
                data={posts}
                keyExtractor={(post) => post.id}
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

export default Following;
