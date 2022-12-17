import React, { useCallback, useMemo } from 'react';
import { Button, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';

const CalendarForm = ({ itemProps, setItemProps }) => {
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
  const selectDate = useCallback((d) => {
    setItemProps({
      focusDate: d.dateString,
      state: 'browse',
    });
  }, []);
  const goInsert = useCallback(() => {
    setItemProps({
      focusDate: itemProps.focusDate,
      state: 'insert',
    })
  }, [itemProps]);
  return (
    <View>
      <Button
        title='선택한 일자로 추가하기'
        onPress={goInsert}
      />
      <Calendar
        initialDate={itemProps.focusDate}
        onDayPress={selectDate}
        enableSwipeMonths={true}
        markedDates={displayDateList}
      />
    </View>
  );
};

export default CalendarForm;