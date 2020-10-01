import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Main from '#/Screens/Main';
import bankAccounts from '#/Screens/bankAccounts';
import Operations from '#/Screens/Operations';
import Transfers from '#/Screens/Transfers';
import userLogin from '#/Screens/userLogin';
import userRegistration from '#/Screens/userRegistration';

const Routes = () => {
  const { Navigator, Screen } = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  Tabs =  () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Main' component={Main} />
        <Tab.Screen name="Operations" component={Operations} />
        <Tab.Screen name='Transfers' component={Transfers} />        
      </Tab.Navigator>
    );
  }

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='userLogin' headerMode='screen'>
      <Screen name='Home' component={Tabs} /> 
      <Screen name="Banks" component={bankAccounts} />     
      <Screen name='userLogin' component={userLogin} />
      <Screen name='userRegistration' component={userRegistration} />
    </Navigator>
  );
};

export default Routes;