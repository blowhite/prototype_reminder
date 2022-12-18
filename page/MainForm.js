import React from 'react';
import { Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Menu1 from './menus/Menu1';
import SettingForm from './menus/SettingForm';
import ScheduleForm from './menus/ScheduleForm';

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
              title: '메인화면',
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={30} color={color}/>
              )
            }}
          /> 
          <Tab.Screen
            name="schedule"
            component={ScheduleForm} 
            options={{
              tabBarActiveTintColor: '#ff9900',
              title: '일정',
              tabBarIcon: ({ color }) => (
                <Ionicons name="calendar" size={30} color={color}/>
              ),
              headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  // color="#fff"
                />
              ),
            }}
          /> 
          <Tab.Screen
            name="setting"
            component={SettingForm} 
            options={{
              tabBarActiveTintColor: '#ff9900',
              title: '설정',
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
