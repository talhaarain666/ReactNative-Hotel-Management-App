import React, { useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { Link } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from "@react-native-firebase/database";

function SignUpPage({ navigation }) {

    //  localStorage.setItem("signUpData", JSON.stringify({ userUid: res.uid }))

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const signUpUser = () => {
        const obj = {
            userName,
            email,
            password,
        }
        if (!email) {
            alert("Enter Email")
            return;
        }
        if (!password) {
            alert("Enter Password")
            return;
        }

        auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log('User account created & signed in!');
                // console.log(res.user.uid);

                var postListRef = firebase.database().ref(`users/${res.user.uid}`);
                obj.id = res.user.uid;
                postListRef.set(obj);

                AsyncStorage.setItem('signUpData', JSON.stringify({ userUid: res.user.uid }))
          
                navigation.navigate("Home")
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }

    return <>
        <View style={{ flex: 1, backgroundColor: "#d9ad7c", padding: 10, justifyContent: "center" }}>
            <View style={{ padding: 3 }}>
                <View style={{ paddingBottom: 10 }}>
                    <Pressable onPress={() => navigation.navigate("Home")}>
                        <Text style={{ textAlign: "center", padding: 10, backgroundColor: "black", width: 100 }}>Back</Text>
                    </Pressable>
                    {/* <Button fullWidth label="Back" onClick={() => navigate("/")} /> */}
                </View>
                <Text style={{ fontSize: 30, color: "black", margin: 10, fontWeight: "bold" }}>SIGNUP HERE</Text>

                <View>
                    <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} placeholder="Enter Name" onChangeText={(e) => setUserName(e)} />
                </View>
                <View>
                    <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} placeholder="Enter Email" onChangeText={(e) => setEmail(e)} />
                </View>
                <View>
                    <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} placeholder="Enter Password" onChangeText={(e) => setPassword(e)} />
                </View>
                <View style={{ margin: 5, flexDirection: "row" }}>
                    <Text style={{ color: "black" }}>already have an account?</Text>

                    <Link style={{ color: "black", fontSize: 16, textDecorationLine: "underline" }} to="/Login">Login</Link>

                </View>
                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={signUpUser}>
                        <Text style={{ textAlign: "center", padding: 10, backgroundColor: "black", width: 100 }}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


    </>


}

export default SignUpPage;