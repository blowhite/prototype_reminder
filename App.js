import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import MainForm from './page/MainForm';
import store from './store/configureStore';
import { customStyles } from './style/baseStyles';
import LoadSettingForm from './function/LoadSettingForm';
import { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function App() {
  const [loadSetting, setLoadSetting] = useState(false);
  const statusBarHeight = getStatusBarHeight();
  return (
    <Provider store={store}>
      <View style={{
        height: statusBarHeight,
        backgroundColor: '#506bbb'
      }} />
      <View style={customStyles.mainScreen.container}>
        {
          (!loadSetting)
            ? (
              <LoadSettingForm
                setLoadSetting={setLoadSetting}
              />
            )
            : (
              <MainForm />
            )
        }
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}