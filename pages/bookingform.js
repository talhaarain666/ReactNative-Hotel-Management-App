import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/database";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";



function BookingForm({ route, navigation }) {


    // const location = useLocation();
    // const navigate = useNavigate();

    // const dataFromRedux = useSelector((a) => a.user)
    // const localStorageDataSignUp = JSON.parse(localStorage.getItem("signUpData"))
    // const localStorageDataLogIn = JSON.parse(localStorage.getItem("logInData"))

    const [userBookingDetails, setUserBookingDetails] = useState(
        // {
        //     userData: localStorageDataLogIn ? localStorageDataLogIn : localStorageDataSignUp,

        //     userHotel: location.state.hotelName,
        //     hotelImage: location.state.imageLink,
        //     hotelPerDayPrice: location.state.perDayPrice,

        // }

    );


    const navigateIfnotUser = async (key) => {
        try {
            const signupData = await AsyncStorage.getItem("signUpData");
            const loginData = await AsyncStorage.getItem("logInData");
            if (signupData || loginData !== null) {
            }
            else {
                navigation.navigate("Signup")
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        navigateIfnotUser();
        // console.log(dataFromRedux)
        // console.log(location)
        // if (dataFromRedux || localStorageDataSignUp || localStorageDataLogIn) {

        // } else {
        //     navigate("/login")
        // }
        console.log(route)
        console.log(route.params.otherParam.hotelName)
    }, [])

    // console.log(localStorageDataLogIn)
    let bookingFormSubmit = () => {

        var postListRef = firebase.database().ref('bookingForm');
        var newPostRef = postListRef.push();
        userBookingDetails.id = newPostRef.key
        newPostRef.set(userBookingDetails);


        alert("Form Submitted Successfully");
        // saveDetails("bookingForm", userBookingDetails).then(() => {
        //     alert("Form Submitted Successfully")
        // }).catch((err) => {
        //     console.log(err)
        // })
        // navigate("/paymentform")
    }



    return <>


        <View style={{ backgroundColor: "#d9ad7c", flex: 1, padding: 10, justifyContent: "center" }}>

            <Image style={{ width: 100, height: 50 }} source={route.params.otherParam.imageLink} />

            <Text style={{ fontSize: 22, color: "black", marginVertical: 15, marginLeft: 10, fontWeight: "bold" }}>Book Your Favourite Hotel Here</Text>
            <View>
                <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} required placeholder="Enter Name" onChangeText={(e) => setUserBookingDetails({ ...userBookingDetails, name: e })} />
            </View>
            <View>
                <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} required placeholder="CNIC No." onChangeText={(e) => setUserBookingDetails({ ...userBookingDetails, cnic: e })} />
            </View>
            <View>
                <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} required placeholder="Address" onChangeText={(e) => setUserBookingDetails({ ...userBookingDetails, address: e })} />
            </View>
            <View>
                <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} required placeholder="Contact Number" onChangeText={(e) => setUserBookingDetails({ ...userBookingDetails, contact: e })} />
            </View>
            <View>
                <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} required placeholder="No of persons" onChangeText={(e) => setUserBookingDetails({ ...userBookingDetails, noOfPersons: e })} />
            </View>
            <View>
                <TextInput style={{ backgroundColor: "#674d3c", margin: 5, paddingLeft: 10 }} required placeholder="No of days to stay" onChangeText={(e) => setUserBookingDetails({ ...userBookingDetails, noOfDays: e })} />
            </View>
            <TouchableOpacity>
                <Text style={{ textAlign: "center", padding: 5, backgroundColor: "black", width: 100, alignSelf: "center", margin: 5 }} onPress={bookingFormSubmit}>Continue to Payment</Text>
            </TouchableOpacity>
        </View>

        {/* <Image style={{width:"100%",height:"80%"}}   source={location.state.imageLink} />
                <Text >Hotel Name: {location.state.hotelName}</Text>
                <Text >Rooms: {location.state.rooms}</Text>
                <Text >Services</Text>
                <Text >{location.state.service1}</Text>
                <Text >{location.state.service2}</Text>
                <Text >{location.state.service3}</Text>
                <Text style={{ display: "flex", justifyContent: "space-between" }} >Per Day Price:{location.state.perDayPrice}</Text>
                
                <Text style={{ display: "flex", justifyContent: "space-between" }} >Total:{userBookingDetails ? userBookingDetails.noOfDays * location.state.perDayPrice : location.state.perDayPrice}</Text> */}







    </>

}

export default BookingForm;


// Hotel Name: Hotel
// Rooms: 100
// Services
// Breakfast
// Free Wifi
// Parking
// Per Day Price:
// 13000
// Total:
// NaN