import React, { useCallback, useMemo } from 'react';
import { Button, Text, View } from 'react-native';

import { checkTableList } from '../../function/database/tableList/checkTableList';
import initDatabaseConfig from '../../function/database/InitDataBase';
import { useSelector } from 'react-redux';

const SettingForm = () => {
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
  return (
    <View>
      <Button
        title='체크초기화'
        onPress={dropExecute}
      />
      <Text>
        등록된 레코드: {scheduleItem.length}
      </Text>
    </View>
  );
};
export default SettingForm;