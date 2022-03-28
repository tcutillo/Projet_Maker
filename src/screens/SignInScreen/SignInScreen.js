import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import SignUpScreen from '../SignUpScreen/SignUpScreen';

const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [db, setDb] = useState([]);

    const signIn = () => {
      db.map(item => {
        if (email === item.emails && password === item.passwords) {
          alertssIn()
          setSign("connected");
          axios.get("http://192.168.1.25:8080/Email/" + email)
          .catch(err =>	{
            console.log(err);
          });
        } else {
          alertsfIn()
          setEmail("");
          setPassword("")
        }
        return ""
      });
    }

    const signUp = () => {
      setDb([...db, {emails: email, passwords: password}]);
      alertssUp()
      setSign("connected");
      axios.get("http://192.168.1.25:8080/Email/" + email)
      .catch(err =>	{
        console.log(err);
      });
    }

    // const SignUpScreen = () => {
    //   console.warn('Sign up !')
      // return (
      //   <View style={styles.logs}>
      //   <Text style={styles.text1}>Sign Up</Text>
      //   <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail}/>
      //   <TextInput style={styles.input2} secureTextEntry={true} placeholder="Password *" value={password} onChangeText={setPassword}/>
      //   <TouchableOpacity onPress={signUp} style={styles.button}>
      //   <Text style={{color: "#fff"}}>SIGN UP</Text>
      //   </TouchableOpacity>
      //   <View style={styles.info}>
      //   <Text>Vous avez un compte ? </Text>
      //   <TouchableOpacity onPress={() => {setSign("in")}}><Text style={styles.signC}>Connectez-vous</Text></TouchableOpacity>
      //   </View>
      //   </View>
      // );
    // }

  return (
    <ScrollView>
    <View style={styles.logs}>
      <Text style={styles.text1}>Let's Sign you in</Text>
      <Text style={styles.text2}>Welcome Back ,</Text>
      <Text style={styles.text3}>You have been missed</Text>
      <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail}/>
      <TextInput style={styles.input2} secureTextEntry={true} placeholder="Password *" value={password} onChangeText={setPassword}/>
      <TouchableOpacity onPress={signIn} style={styles.button}>
      <Text style={{color: "#fff"}}>SIGN IN</Text>
      </TouchableOpacity>
      <View style={styles.info}>
      <Text>Don't have an account ? </Text>
      <TouchableOpacity onPress={SignUpScreen}><Text style={styles.signC}>Register Now</Text></TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

// const signUp = () => {
//   setDb([...db, {emails: email, passwords: password}]);
//   alertssUp()
//   setSign("connected");
//   axios.get("http://192.168.1.25:8080/Email/" + email)
//   .catch(err =>	{
//     console.log(err);
//   });
// }


const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    header: {
      alignItems: 'center',
      backgroundColor: '#fff',
      height: 75,
      flex: 0.10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#bbb',
    },
    body: {
      flex: 0.90,
    },
    li: {
      width: 330,
      backgroundColor: "#fcfcfc",
    },
    text: {
      marginTop: 37,
      fontSize: 22,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: '#252527',
    },
    text1: {
      fontSize: 40,
      marginTop: 80,
      left: -35,
      fontWeight: 'bold',
      color: '#00ff00',
    },
    text2: {
        fontSize: 30,
        marginTop: 30,
        left: -75,
        color: '#000000',
      },
    text3: {
        fontSize: 30,
        marginTop: 0,
        left: -30,
        color: '#000000',
    },
    yM: {
      alignItems: "flex-start",
      flex: 1,
      marginTop: 30,
      marginLeft: 40
    },
    yProfile: {
      fontSize: 20,
      color: '#1D2D51',
      fontWeight: 'bold',
    },
    mDetail: {
      fontSize: 17,
      color: '#9ba9cc',
    },
    input: {
      height: 45,
      width: 360,
      marginTop: 80,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: '#918c8c',
    },
    input2: {
      height: 45,
      width: 360,
      marginTop: 15,
      marginBottom: 30,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: '#918c8c',
    },
    logs: {
      flex: 1,
      alignItems: "center"
    },
    info: {
      flex: 1,
      flexDirection: "row",
      color: "#3287b8",
      marginBottom: 15,
    },
    topA: {
      alignItems: 'center',
      marginTop: 15,
    },
    top: {
      width: "90%",
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 15,
      borderWidth: 1,
      marginBottom: 10,
      borderColor: "#f8f8f8",
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    logo: {
      width: 200,
      marginTop: 25,
      height: 200,
      borderRadius: 150,
      borderWidth: 1,
      borderColor: "#555"
    },
    signC: {
      color: "#00ff00",
    },
    textT: {
      marginTop: 30,
      fontSize: 22,
      fontWeight: 'bold',
      color: '#252527',
    },
    textI: {
      fontSize: 18,
      marginTop: 15,
      color: '#252527',
      marginBottom: 15
    },
    button: {
      width: 150,
      height: 30,
      backgroundColor: '#00ff00',
      borderRadius: 5,
      borderWidth: 1,
      marginBottom: 25,
      borderColor: "#00ff00",
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    buttons: {
      width: 100,
      height: 30,
      backgroundColor: '#326ed5',
      borderRadius: 5,
      borderWidth: 1,
      marginTop: 10,
      borderColor: "#777",
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
  })

export default SignInScreen