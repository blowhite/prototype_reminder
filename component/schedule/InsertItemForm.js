import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddSchduleItem } from '../../reducers/global';
import { customStyles } from '../../style/baseStyles';

const InsertItemForm = ({ itemProps, setItemProps }) => {
  const dispatch = useDispatch();
  const editRef = useRef();
  const { scheduleItem } = useSelector((state) => state.global);
  const filteredList = useMemo(() => (
    scheduleItem.filter((v) => v.schd_from_time === itemProps.focusDate)
  ), [scheduleItem, itemProps]);
  console.log(filteredList);
  const [inputValue, setInputValue] = useState('');
  const inputTitle = useCallback((e) => {
    setInputValue(e);
  }, []);
  const sendDataBase = useCallback(() => {
    console.log('button Click');
    if (inputValue) {
      dispatch(setAddSchduleItem({
        schd_title: inputValue,
        schd_from_time: itemProps.focusDate,
      }));
      setInputValue('');
      editRef.current.blur();
    }
  }, [inputValue, itemProps]);
  const goBrowse = useCallback(() => {
    setItemProps({
      focusDate: itemProps.focusDate,
      state: 'browse',
    })
  }, [itemProps]);
  const flatListRender = useCallback((e) => (
    <View>
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
          {filteredList[e.index].schd_title}
        </Text>
      </TouchableOpacity>
    </View>
  ), [filteredList]);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
        <TextInput
          ref={editRef}
          style={customStyles.textInput.defaultEdit}
          value={inputValue}
          onChangeText={inputTitle}
        />
        <TouchableOpacity onPress={sendDataBase}>
          <Ionicons name="add-circle-outline" size={40}></Ionicons>
        </TouchableOpacity>
      </View>
      <Button
        title='일자선택으로 돌아가기'
        onPress={goBrowse}
      />
      <FlatList
        data={filteredList}
        renderItem={flatListRender}
      />
    </View>
  );
};
export default InsertItemForm;