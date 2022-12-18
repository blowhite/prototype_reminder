import React, { useCallback, useMemo } from 'react';
import { Button, Text, View } from 'react-native';

import { checkTableList } from '../../function/database/tableList/checkTableList';
import initDatabaseConfig from '../../function/database/InitDataBase';
import { useDispatch, useSelector } from 'react-redux';
import { setClearSchduleItem } from '../../reducers/global';

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
    </View>
  );
};
export default SettingForm;