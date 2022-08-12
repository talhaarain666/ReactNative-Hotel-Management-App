import { Link } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth, { firebase } from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

function LogInPage({navigation}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [loader, setLoader] = useState(false)

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const loginUser = () => {

        const obj = {
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
        console.log(obj)

        // auth().signInAnonymously()
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log('User signed in anonymously');
                console.log(res.user.uid);
                AsyncStorage.setItem('logInData', JSON.stringify({ userUid: res.user.uid }))
                navigation.navigate("Home")
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }

                console.error(error);
            });

        // setLoader(true)
        // logIn(obj).then((res) => {
        //     alert("Login Successfully")
        //     console.log(res.uid)
        //     dispatch({
        //         type: "DATAFROMLOGIN",
        //         payload: res.uid,
        //     })
        //     localStorage.setItem("logInData", JSON.stringify({ userUid: res.uid }))
        //     setLoader(false)
        //     navigate("/")
        // }).catch((err) => {
        //     setLoader(false)
        //     alert(err)
        // })

    }
    return <>
        <View style={{ flex: 1, backgroundColor: "#d9ad7c", padding: 10, justifyContent: "center" }}>
            <View style={{ padding: 3 }}>
                <View style={{ paddingBottom: 3 }}>
                    <Pressable onPress={() => navigation.navigate("Home")}>
                        <Text style={{textAlign: "center", padding: 10, backgroundColor: "black", width: 100}}>Back</Text>
                    </Pressable>
                    {/* <Button fullWidth label="Back" onClick={() => navigate("/")} /> */}
                </View>
                <Text style={{ fontSize: 30,color:"black",margin:10,fontWeight:"bold" }}>LOGIN HERE</Text>


                <View>
                    <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} placeholder="Enter Email" onChangeText={(e) => setEmail(e)} />
                </View>
                <View>
                    <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} placeholder="Enter Password" onChangeText={(e) => setPassword(e)} />
                </View>
                <View style={{ margin: 5 }}>
                    <Text style={{color:"black"}}>New Here? <Link to="/Signup">Create Account</Link></Text>
                </View>



                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={loginUser}>
                        <Text style={{ textAlign: "center", padding: 10, backgroundColor: "black", width: 100}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


    </>
}

export default LogInPage;