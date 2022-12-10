import React, { useCallback, useMemo } from 'react';
import { Button, Text, View } from 'react-native';

import { checkTableList } from '../../function/database/tableList/checkTableList';
import initDatabaseConfig from '../../function/database/InitDataBase';

const Menu1 = () => {
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
      <Text>메인페이지1, Menu1</Text>
      <Button
        title='체크초기화'
        onPress={dropExecute}
      />
    </View>
  );
};
export default Menu1;