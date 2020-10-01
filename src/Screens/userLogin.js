import React, {useEffect,useState} from 'react';
import { View, Button, Alert, TouchableOpacity, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import TouchID from 'react-native-touch-id'
import {http} from '#/Config/api';

import Input from '#/Components/Input';
import Loader from '#/Components/Loader';
import userControler from '#/Controller/User/userController';
import * as userActions from '#/Store/Actions/userActions';


const userLogin = (props) => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();
  console.log('Loading: ' + props.user.isLoading)
  console.log('Registering: ' + props.user.isRegistering)

  useEffect(() =>{
    if(props.user.userToken !== undefined){
      pressHandler()
    }    
  },[])

  const optionalConfigObject = {
    title: "Authentication",
    color: "#e00606",
    fallbackLabel: "Show Passcode"
  }

 const pressHandler = () => {
  TouchID.isSupported()
    .then((biometryType) => {
      TouchID.authenticate('Use biometry authentication to login ', optionalConfigObject)
      .then(success => {
        Object.assign(http.defaults, {
          headers: {Authorization: 'Bearer '.concat(props.user.userToken)},
        });
        props.navigation.push('Home') 
      })
      .catch(error => {
        console.log(error)
      });
    })    
  }

  const handleLogin = (user) => {
    if(user.identifier === '' || user.password === ''){
      Alert.alert(
        'Usuário ou Senha vazio',
        'Você deve preecher todos os dados para logar!',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
          },
        ],
        {cancelable: true},
      );
      return
    }
    props.loginUser();
    userControler.login(user).then(r => {      
      props.userLoadedSuccess(r)
      props.navigation.push('Home')            
    }).catch((error) => {
      console.log(error)
      props.userLoadedFailure()
      Alert.alert(
        'Usuário ou Senha incorretos',
        'Você deve preecher os dados de usuário para logar!',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
          },
        ],
        {cancelable: true},
      );
    })
  }

  const { isLoading} = props.user
  return (    
    <>
    <Loader loading={isLoading} />
      <Formik 
        initialValues = {{identifier: '', password: ''}}
        onSubmit={values => handleLogin(values)}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => {
          return (
            <View style={{flex:1, justifyContent:"center", marginHorizontal: '20%'}}>
              <Input 
                onChangeText={handleChange('identifier')}
                onBlur={handleBlur('identifier')}
                forwardRef={usernameRef}
                value={values.identifier}
                label='Username'
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <Input 
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                forwardRef={passwordRef}
                value={values.password}
                label='Password' 
                onSubmitEditing={handleSubmit}
              />
              <Button onPress={handleSubmit} title="Submit"/>
              <View style={{marginTop: 30, alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => {props.navigation.push('userRegistration')}} >
                  <Text style={{color:'#0362fc'}}>Sign Up</Text>
                </TouchableOpacity>
             </View>
            </View>
          )
        }
        }
      </Formik>      
    </>
  );
}

const mapStateToProps = state => ({user: state.user})
 
const mapDispatchToProps = dispatch => 
  bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(userLogin);