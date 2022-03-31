import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';



export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let messagesValidation = [];
    const [messages, setMessages] = useState([]);

    function validateEmail (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    function navigationToDetail(country) {
        navigation.navigate('Holiday', country);
    }

    function validateFields()
    {
        messagesValidation = [];
        setMessages([]);
        setError(false);
        if(email == null || email == "")
        {
            messagesValidation.push({ field: 'E-mail', message: 'E-mail is required!' });
        } 

        if(email && email.length > 0)
        {
            if(!validateEmail(email))
            {
                messagesValidation.push({ field: 'E-mail', message: 'E-mail is invalid!' });
            }
        }

        if(password == null || password == "")
        {
            messagesValidation.push({ field: 'Password', message: 'Password is required!' });
        }

        setMessages(messagesValidation);
        if(messagesValidation.length > 0) {
            setError(true);
        } else {
            setError(false);
        }
    }

    function login()
    {
        if(email == "test@test.com" && password == "123456")
        {
            navigation.navigate('Home', {});
        } else {
            messagesValidation = [];
            setMessages([]);
            setError(false);
            messagesValidation.push({ field: 'EmailPassword', message: 'User or Password Invalids!' });
            setMessages(messagesValidation);
            setError(true);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.image}>
            <Text style={styles.title}>Login</Text>
      
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email address"
          placeholderTextColor="#003f5c"
          onBlur={()=> validateFields()}
          onChangeText={(email) =>  setEmail(email)  }
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onBlur={()=> validateFields()}
          onChangeText={(password) => setPassword(password)  }
        />
      </View> 
     { messages.length > 0 && messages.map((x, i) => {
        return (<span key={i} style={{color: 'red'}}>{x.message}</span>)
    })}
    
        <TouchableOpacity style={ !error ? styles.loginBtn : styles.loginBtnDisabled} onPress={() => login() }  disabled={error}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    
      
    </View>
    );
}