import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddSchduleItem } from '../../reducers/global';
import { customStyles } from '../../style/baseStyles';

const ScheduleForm = () => {
  const dispatch = useDispatch();
  const { scheduleItem } = useSelector((state) => state.global);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const inputData = useMemo(() => ({
    schd_title: '',
  }), []);
  const inputTitle = useCallback((e) => {
    inputData.schd_title = e;
  }, [inputData]);
  const sendDataBase = useCallback((e) => {
    dispatch(setAddSchduleItem(inputData));
  }, [inputData]);
  useEffect(() => {
    if (loadingVisible) {
      setLoadingVisible(false);
    }
  }, [loadingVisible])
  const flatListRender = useCallback((e) => {
    console.log('render: ', e)
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#FF123456',
          padding: 5,
          fontSize: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 10
        }}
      >
        <Text
          style={{
            padding: 5,
            fontSize: 20,
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 10
          }}
        >
          {e.index}
        </Text>
      </TouchableOpacity>
    )
  }, []);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
        <TextInput
          style={customStyles.textInput.defaultEdit}
          onChangeText={inputTitle}
        />
        <TouchableOpacity onPress={sendDataBase}>
          <Ionicons name="add-circle-outline" size={40}></Ionicons>
        </TouchableOpacity>
      </View>
      <FlatList
        data={scheduleItem}
        renderItem={flatListRender}
      />
    </View>
  );
};
export default ScheduleForm;