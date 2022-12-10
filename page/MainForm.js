import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Menu1 from './menus/Menu1';
import Menu2 from './menus/Menu2';
import Menu3 from './menus/Menu3';

const MainForm = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{
      width: '100%',
      height: '100%',
    }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='page1'>
          <Tab.Screen
            name="page1"
            component={Menu1} 
            options={{
              tabBarActiveTintColor: '#ff9900',
              title: '페이지1',
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={30} color={color}/>
              )
            }}
          /> 
          <Tab.Screen
            name="page2"
            component={Menu2} 
            options={{
              tabBarActiveTintColor: '#ff9900',
              title: '페이지2',
              tabBarIcon: ({ color }) => (
                <Ionicons name="school" size={30} color={color}/>
              )
            }}
          /> 
          <Tab.Screen
            name="page3"
            component={Menu3} 
            options={{
              tabBarActiveTintColor: '#ff9900',
              title: '페이지3',
              tabBarIcon: ({ color }) => (
                <Ionicons name="settings" size={30} color={color}/>
              )
            }}
          /> 
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainForm;
