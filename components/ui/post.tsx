import {View, Text, Image, Button, Pressable, Touchable, TouchableOpacity, ScrollView} from 'react-native';
import {post} from "@/interfaces/interfaces";
import {EvilIcons, Feather, MaterialIcons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Post  = (post:  post) => {
    const profilePicture = post.profilePicture && post.profilePicture.trim() !== ""
        ? post.profilePicture
        : "https://plus.unsplash.com/premium_photo-1707353402057-c95bdddb5b39?auto=format&fit=crop&w=800&q=80";
    return (
        <>
            <View style={{backgroundColor: "white", minHeight: 300, marginVertical: 5}}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 5, margin: 3}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={{uri:profilePicture}}
                            resizeMethod={"auto"}
                            style={{width: 60, height: 60, borderRadius: 80, paddingTop: 5}} />
                        <View style={{margin: 10}}>
                    <Text style={{fontSize: 15, fontWeight: "semibold"}}> {post.username}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    const myId =  await AsyncStorage.getItem('userId');
                                    const response = await fetch("http://localhost:3000/follow", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ myId: myId, userId: post.id }),
                                    });

                                    if (!response.ok) {
                                        throw new Error(`Request failed: ${response.status}`);
                                    }

                                    const data = await response.json();
                                    console.log("Follow success:", data);
                                } catch (error) {
                                    console.error("Error following user:", error);
                                    console.log(post.userId)
                                }
                            }}
                        >
                            <Text style={{backgroundColor: "#EEEEEE", borderRadius: 15, width: 70, padding: 5,height: 30, textAlign: "center"}}> Follow </Text>
                        </TouchableOpacity>
                        <Pressable>
                            <MaterialIcons name="more-horiz" size={29}/>
                        </Pressable>

                    </View>

                </View>
                <View style={{backgroundColor: "gray", height: 130, paddingTop: 20, marginTop: 30}}>
                     {post.content.images ?? <Image source={{uri: post.content.images}}/>}
                    <Text style={{fontSize: 20}}> {post.content.text} </Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", position: 'absolute', bottom: 5, left: 0, right: 0, paddingHorizontal: 5}}>

                        <View
                        style={{backgroundColor: "#EEEEEE", width: 70, borderRadius: 50, flexDirection: "row", padding: 5}}>
                        <Text style={{color: Colors.light.icon}}> {post.notes} Notes  </Text>
                    </View>

                    <View style={{flexDirection: "row", gap: 10, paddingRight: 10}}>
                        <TouchableOpacity>
                            <Feather name={"share"} color={Colors.light.icon} size={25} />
                        </TouchableOpacity>
                       <TouchableOpacity>
                           <EvilIcons name={"comment"} color={Colors.light.icon} size={25} />
                       </TouchableOpacity>
                       <TouchableOpacity>
                           <Feather name={"repeat"} color={Colors.light.icon} size={25} />
                       </TouchableOpacity>
                        <TouchableOpacity  onPress={async() => {
                            await fetch('http://localhost:3000/like', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    postId: post.id,
                                }),
                            });

                        }}>
                            <Feather name={"heart"} color={Colors.light.icon} size={25}/>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </>
    );
};

export default Post ;
