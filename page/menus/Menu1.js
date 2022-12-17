import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Menu1 = () => {
  const [btnPushed, setBtnPushed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const selectDate = useCallback((d) => {
    setSelectedDate(d.dateString);
  }, []);
  return (
    <View>
      <Button
        title={(btnPushed) ? '눌렀소' : '안눌렀소'}
        onPress={() => setBtnPushed((v) => !v)}
      />
      <Calendar 
        initialDate={selectedDate}
        onDayPress={selectDate}
        enableSwipeMonths={true}
        // markedDates={{
        //   '2022-12-16': {selected: true, marked: true, selectedColor: 'blue'},
        //   '2022-12-17': {marked: true},
        //   '2022-12-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        //   '2022-12-19': {disabled: true, disableTouchEvent: true}
        // }}
      />
    </View>
  );
};

export default Menu1;