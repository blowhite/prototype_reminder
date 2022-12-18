import { format } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';

const Menu1 = () => {
  const { scheduleItem } = useSelector((state) => state.global);
  const displayDateList = useMemo(() => {
    if (scheduleItem?.length === 0) {
      return null;
    }
    const lists = {};
    scheduleItem.map((v) => {
      if (!lists[v.schd_from_time]) {
        lists[v.schd_from_time] = { marked: true, dotColor: 'red', activeOpacity: 0 }
        //   '2022-12-16': {selected: true, marked: true, selectedColor: 'blue'},
        //   '2022-12-11': { marked: true },
        //   '2022-12-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        //   '2022-12-19': {disabled: true, disableTouchEvent: true}
      }
    });
    return lists;
  }, [scheduleItem]);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [btnPushed, setBtnPushed] = useState(false);
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
          {scheduleItem[e.index].schd_title}
        </Text>
      </TouchableOpacity>
    </View>
  ), [scheduleItem]);
  return (
    <View>
      <Button
        title={(btnPushed) ? '눌렀소' : '안눌렀소'}
        onPress={() => setBtnPushed((v) => !v)}
      />
      <FlatList
        data={scheduleItem}
        renderItem={flatListRender}
      />
    </View>
  );
};

export default Menu1;