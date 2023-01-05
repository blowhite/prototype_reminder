import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import initDatabaseConfig from '../../function/database/InitDataBase';
import { setAddSchduleItem } from '../../reducers/global';
import { customStyles } from '../../style/baseStyles';

const InsertItemForm = ({ itemProps, setItemProps }) => {
  const dispatch = useDispatch();
  const localDB = useMemo(() => (initDatabaseConfig()), []);
  const editRef = useRef();
  const { scheduleItem } = useSelector((state) => state.global);
  const filteredList = useMemo(() => (
    scheduleItem.filter((v) => v.schd_from_time === itemProps.focusDate)
  ), [scheduleItem, itemProps]);
  const [inputValue, setInputValue] = useState('');
  const inputTitle = useCallback((e) => {
    setInputValue(e);
  }, []);
  const sendDataBase = useCallback(() => {
    if (inputValue) {
      localDB.transaction(tx => {
        tx.executeSql(
          `insert into tb_schdule (
            schd_id,
            schd_kind,
            schd_title,
            schd_content,
            schd_from_time,
            schd_to_time,
            write_time,
            update_time)
           select 'WM' || 
           substr('0000' ||  
            cast(cast(ifnull(substr(max(schd_id), 3, 4), '0') as integer) + 1 as text)
           , -4, 4) 
                , 'unknown'
                , '${inputValue}'
                , NULL
                , '${itemProps.focusDate}'
                , NULL
                , datetime('now','localtime')
                , datetime('now','localtime')
             from tb_schdule
           `,
          [], (tx, resultSet) => {
            dispatch(setAddSchduleItem({
              schd_title: inputValue,
              schd_from_time: itemProps.focusDate,
              rowid: resultSet.insertId,
              checked: false,
            }));
            setInputValue('');
            editRef.current.blur();
          }
          );
        }, (err) => {
          console.log('check Error: ', err);
        });
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