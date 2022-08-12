import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';


function HomePage({ navigation }) {

    const [renderDetails, setRenderDetails] = useState([])
    const [array, setarray] = useState([])
    const [chkyr, setchkyr] = useState({})
    const [renderHotelName, setRenderHotelName] = useState()


    const getDataFromLocalStorage = async () => {
        // get Data from Storage
        try {
            const signupData = await AsyncStorage.getItem("signUpData");
            const loginData = await AsyncStorage.getItem("logInData");
           setchkyr(signupData)
            if (signupData || loginData !== null) {
                // console.log(signupData);
                // console.log(loginData);
                // return signupData;
            }
            //  if (loginData !== null) {
            //     console.log(loginData);
            //     return loginData;
            // }
            else {
                navigation.navigate("Signup")
            }
        } catch (error) {
            console.log(error);
        }
    };


    let getAllData = async (uid) => {


        database()
            .ref('hotelDetails').once("value").then((snapshot) => {

                let arr;
                if (uid) {
                    arr = snapshot.val();
                } else {
                    arr = Object.values(snapshot.val())
                    setarray(arr)
                }
            }).catch((err) => {
                console.log(err)

            })

    }


    useEffect(() => {

        getDataFromLocalStorage()

       
        getAllData()
    }, [])

    let logoutUser = () => {
        auth()
            .signOut()
            .then(() => {
                AsyncStorage.clear()
                console.log('User signed out!')
                navigation.navigate("Signup")
            });
    }

    let getUserName = () => {
       
    }

let bookNowFunc =(details)=>{
    // navigation.navigate("BookingForm")
    navigation.navigate('BookingForm', {
        // itemId: 86,
        otherParam: details,
      });
}

    // console.log(renderDetails)

    return <>
        <Pressable >
            <Text style={{ backgroundColor: "black", fontSize: 25 }} onPress={logoutUser}>Logout</Text>
        </Pressable>
        <Text style={{ backgroundColor: "darkblue", padding: 10, fontSize: 30 }}>Welcome {getUserName()}</Text>
        <ScrollView >
            {array ? array.map((e, i) => {
                return <>
                    <View style={{ backgroundColor: "#ffffe0", padding: 20 }}>
                        <View key={i} style={{
                            width: "100%", backgroundColor: "white", shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3, },
                            shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6,
                        }} >
                            <Image style={{ width: "100%", minHeight: 150 }} source={{ uri: e.imageLink }} />
                            <View style={{ padding: 10 }}>
                                <Text style={{ color: "black", fontSize: 30, fontWeight: "bold", fontFamily: "cursive", borderBottomColor: 'black', borderBottomWidth: 3 }}>{e.hotelName}</Text>
                                <Text style={{ fontFamily: "cursive", color: "black", fontWeight: "bold", fontSize: 24, backgroundColor: "#ffffe0" }}>Our Services</Text>
                                <Text style={{ fontFamily: "cursive", fontSize: 18, color: "black" }}>{'\u2B24'}{e.service1}</Text>
                                <Text style={{ fontFamily: "cursive", fontSize: 18, color: "black" }}>{'\u2B24'}{e.service2}</Text>
                                <Text style={{ fontFamily: "cursive", fontSize: 18, color: "black" }}>{'\u2B24'}{e.service3}</Text>
                                <Text style={{ color: "black", fontFamily: "cursive", fontWeight: "bold", fontSize: 22 }}>Rooms: {e.rooms}</Text>
                                <Text style={{ fontFamily: "cursive", color: "black", fontWeight: "bold", fontSize: 22 }}>Per Day Price: {e.perDayPrice}</Text>
                                <TouchableOpacity>
                                    <Text onPress={() => bookNowFunc(e)} style={{ fontFamily: "normal", backgroundColor: "#0288d1", marginTop: 10, padding: 5, textAlign: "center", fontWeight: "bold", fontSize: 25 }}>Book Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </>
            })
                : ""}
        </ScrollView>



    </>

}

export default HomePage;