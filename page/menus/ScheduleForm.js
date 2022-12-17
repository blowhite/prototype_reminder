import { format } from 'date-fns';
import React, { useState } from 'react';
import { View } from 'react-native';
import CalendarForm from '../../component/CalendarForm';
import InsertItemForm from '../../component/schedule/InsertItemForm';

const ScheduleForm = () => {
  const [itemProps, setItemProps] = useState({
    focusDate: format(new Date(), 'yyyy-MM-dd'),
    state: 'browse'
  });
  return (
    <View>
      {
        (itemProps.state === 'browse')
          ? (
            <CalendarForm
              itemProps={itemProps}
              setItemProps={setItemProps}
            />
          )
          : (
            <InsertItemForm
              itemProps={itemProps}
              setItemProps={setItemProps}
            />
          )
      }
    </View>
  );
};

export default ScheduleForm;