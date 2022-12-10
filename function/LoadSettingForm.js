import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';
import initDatabaseConfig from './database/InitDataBase';
import { checkTableList } from './database/tableList/checkTableList';

const LoadSettingForm = ({ setLoadSetting }) => {
  const localDB = useMemo(() => (initDatabaseConfig()), []);
  const [forceRender, setForceRender] = useState(false);
  const [loadContent, setLoadContent] = useState('');
  const createTable = useCallback((v) => {
    localDB.transaction(tx => {
      tx.executeSql(v.cQuery, 
      [], (_, { rows }) => {
        v.done = true;
        setForceRender((b) => !b);
      });
    }, (err) => {
      console.log('create Error: ', err);
    });
  }, []);
  useEffect(() => {
    // 1. sqlite 내 테이블 체크
    setLoadContent('데이터베이스 체크중입니다.....');
    checkTableList.map((v) => {
      localDB.transaction(tx => {
        tx.executeSql(
          `select count(*) as 'cnt' from sqlite_master where name = '${v.tbName}'`,
          [], (_, { rows }) => {
            const existCnt = rows._array[0].cnt;
            if (existCnt === 0) {
              createTable(v);
            } else {
              v.done = true;
              setForceRender((b) => !b);
            }
          }
        );
      }, (err) => {
        console.log('check Error: ', err);
      });      
    });
  }, []);
  useEffect(() => {
    const checkDBCount = checkTableList.length;
    const checkedDBCount = checkTableList.filter((v) => v.done).length;
    if (checkDBCount === checkedDBCount) {
      setLoadContent('DB체크 완료'); 
    }
  }, [checkTableList, forceRender]);
  return (
    <View>
      <Button
        title='시작'
        onPress={() => setLoadSetting(true)}
      />
      <Text>
        {loadContent}
      </Text>
    </View>
  );
};

export default LoadSettingForm;