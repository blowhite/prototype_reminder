import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import MainForm from './page/MainForm';
import store from './store/configureStore';
import { customStyles } from './style/baseStyles';
import LoadSettingForm from './function/LoadSettingForm';
import { useState } from 'react';

export default function App() {
  const [loadSetting, setLoadSetting] = useState(false);
  return (
    <Provider store={store}>
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