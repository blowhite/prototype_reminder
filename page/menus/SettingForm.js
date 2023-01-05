import React, { useCallback, useMemo, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

import { checkTableList } from '../../function/database/tableList/checkTableList';
import initDatabaseConfig from '../../function/database/InitDataBase';
import { useDispatch, useSelector } from 'react-redux';
import { setClearSchduleItem } from '../../reducers/global';
// import DatePicker from 'react-native-date-picker';

const apiEncodingKey = 'KMUsa5RPjZG60qR8pjh992NI7jjqpnqSjLNrXTD9E7ZVxd5AQuGRaEJULb5WglgX8WdPoK8lFrJQzDyw0g5rkg%3D%3D';
// const apiDecodingKey = 'KMUsa5RPjZG60qR8pjh992NI7jjqpnqSjLNrXTD9E7ZVxd5AQuGRaEJULb5WglgX8WdPoK8lFrJQzDyw0g5rkg==';
var parseString = require('react-native-xml2js').parseString;

const SettingForm = () => {
  const dispatch = useDispatch();
  const { scheduleItem } = useSelector((state) => state.global);
  const localDB = useMemo(() => (initDatabaseConfig()), []);
  const executeTable = useCallback((v) => {
    localDB.transaction(tx => {
      tx.executeSql(`drop table ${v.tbName}`,
        [], () => {
          console.log('drop table ', v.tbName);
        });
    }, (err) => {
      console.log('create Error: ', err);
    });
  }, []);
  const dropExecute = useCallback(() => {
    checkTableList.map((v) => {
      executeTable(v);
    });
  }, []);
  const clearItems = useCallback(() => {
    dispatch(setClearSchduleItem());
  }, []);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('01');
  const [dateSelectorVisible, setDateSelectorVisible] = useState(false);
  const [receivedData, setReceivedData] = useState([]);
  const onPressRequestAPI = useCallback(() => {
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + apiEncodingKey; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent('2023'); /**/
    queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent(selectedDate); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        alert('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
        // setReceivedData(this.responseText);
        parseString(this.responseText, function (err, result) {
          // console.dir(result);
          setReceivedData(result.response.body[0].items[0].item);
        });
      }
    };

    xhr.send('');
  }, [selectedDate]);
  const onLogButtonClick = useCallback(() => {
    console.log('body: ', receivedData);
  }, [receivedData]);
  const flatListRender = useCallback((e) => {
    // const dateKind = e.item?.dateKind[0];
    const dateName = e.item?.dateName[0];
    // const isHoliday = e.item?.isHoliday[0];
    const locdate = e.item?.locdate[0];
    return (
      <View
        style={{
          backgroundColor: '#FFC19E',
          padding: 2,
          fontSize: 20,
          marginVertical: 4,
          marginHorizontal: 16,
          borderRadius: 10
        }}>
        {/* <Text>{dateKind}</Text> */}
        <Text style={{
          fontSize: 20,
          marginHorizontal: 16,
          color: 'black',
        }}>{dateName}</Text>
        {/* <Text>{isHoliday}</Text> */}
        <Text style={{
          fontSize: 20,
          marginHorizontal: 16,
          color: 'black',
        }}>{locdate}</Text>
      </View>
    );
  }, []);

  return (
    <View>
      <Button
        title='DB초기화'
        onPress={dropExecute}
      />
      <Button
        title='아이템초기화'
        onPress={clearItems}
      />
      <Text>
        등록된 레코드: {scheduleItem.length}
      </Text>
      <Text>월 입력 01</Text>
      <TextInput
        style={{
          fontSize: 20,
          marginHorizontal: 16,
          backgroundColor: '#B2CCFF',
        }}
        onChangeText={(e) => {
          setSelectedDate(e)
        }}
      />
      {/* <Button title="날짜지정" onPress={() => setDateSelectorVisible(true)} /> */}
      {/* <Button title="날짜로그" onPress={() => console.log(selectedDate)} /> */}
      {/* <DatePicker
        modal
        open={dateSelectorVisible}
        date={selectedDate}
        onConfirm={(d) => {
          setDateSelectorVisible(false);
          setSelectedDate(d);
        }}
        onCancel={() => {
          setDateSelectorVisible(false);
        }}
        onDateChange={setSelectedDate}
      /> */}
      <Button
        title="공휴일 호출"
        onPress={onPressRequestAPI}
      />
      <Button
        title="로그버튼"
        onPress={onLogButtonClick}
      />
      <FlatList
        data={receivedData}
        renderItem={flatListRender}
        bounces={false}
      />
    </View>
  );
};
export default SettingForm;