import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { Formik } from 'formik';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Input from '#/Components/Input';
import Loader from '#/Components/Loader';
import userControler from '#/Controller/User/userController';
import * as userActions from '#/Store/Actions/userActions';


const userRegistration = (props) => {
  const usernameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const handeRegister = payload => {
    if(payload.usuario === '' || payload.password === '' || payload.email === ''){
      Alert.alert(
        'Usuário, Senha ou email vazio',
        'Você deve preecher todos os dados para se registrar!',
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
    props.userRegister()
    userControler.register(payload)
    .then(r => {
      console.log(r)
      props.userRegisterSuccess()
      Alert.alert(
        'Sucesso!',
        'Usuário cadastrado com sucesso! \nFavor realizar o login!',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
        {cancelable: true},
      );
    })
    .catch(error =>{
      props.userRegisterFailure()
      console.log(error)
      if (error.data.message[0].messages[0].id === 'Auth.form.error.email.taken'){
        Alert.alert(
          'Erro no registro',
          'O email informado já foi utilizado!',
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
      }
      else if(error.data.message[0].messages[0].id === 'Auth.form.error.username.taken'){
        Alert.alert(
          'Erro no registro',
          'O usuário informado já foi utilizado!',
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
      } 
      else {
        Alert.alert(
          'Campos Inválidos',
          'Favor preencher todos os campos!',
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
      }      
    })
  }


  const {isRegistering} = props.user;
  return (
    <>
      <Loader loading={isRegistering} />    
      <Formik 
        initialValues = {{username: '',email: '', password: ''}}
        onSubmit={values => handeRegister(values)}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => {
          return (
            <View style={{flex:1, justifyContent:"center", marginHorizontal: '20%', marginBottom:'30%'}}>
              <Text style={{alignSelf:'center', marginBottom:'30%', fontSize:20}}>Registro de Usuários</Text>
              <Input 
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                forwardRef={usernameRef}
                value={values.username}
                label='Username'
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              <Input 
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                forwardRef={emailRef}
                value={values.email}
                label='E-mail' 
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

export default connect(mapStateToProps,mapDispatchToProps)(userRegistration);