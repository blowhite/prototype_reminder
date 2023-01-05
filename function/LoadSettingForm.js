import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { setAddSchduleItem } from '../reducers/global';
import initDatabaseConfig from './database/InitDataBase';
import { checkTableList } from './database/tableList/checkTableList';
import { useDispatch } from 'react-redux';

const LoadSettingForm = ({ setLoadSetting }) => {
  const dispatch = useDispatch();
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
    setLoadContent('데이터내용 체크중입니다.....');
    localDB.transaction(tx => {
      tx.executeSql(
        `select * from tb_schdule`,
        [], (_, { rows }) => {
          if (rows.length !== 0) {
            rows._array.map((x) => {
              dispatch(setAddSchduleItem({
                schd_title: x.schd_title,
                schd_from_time: x.schd_from_time,
                id: schd_id,
              }));
            })
          }
        }
      );
    }, (err) => {
      console.log('check Error: ', err);
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