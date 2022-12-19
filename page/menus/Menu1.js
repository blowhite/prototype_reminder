import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const one_day = 1000 * 60 * 60 * 24;
const Menu1 = () => {
  const today = new Date();
  const { scheduleItem } = useSelector((state) => state.global);
  const copyedItems = useMemo(() => {
    const arr = scheduleItem.slice();
    return arr.sort((a, b) => {
      const dateA = new Date(a.schd_from_time);
      const dateB = new Date(b.schd_from_time);
      return dateA - dateB;
    });
  }, [scheduleItem]);
  const flatListRender = useCallback((e) => {
    const diffDayCnt = Math.trunc((today.getTime() - (new Date(copyedItems[e.index].schd_from_time)).getTime()) / one_day);
    return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: (diffDayCnt === 0) ? '#FFC19E' : (diffDayCnt > 0) ? '#B2CCFF' : '#FFB2D9',
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
          {copyedItems[e.index].schd_title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 16,
            color: 'white',
          }}
        >
          {copyedItems[e.index].schd_from_time} / 
          {` ${(diffDayCnt === 0) ? 'D-DAY' : `D${(diffDayCnt > 0) ? `+` : ``}${diffDayCnt}`}`}
        </Text>
      </TouchableOpacity>
    </View>
  )}, [copyedItems, today]);
  return (
    <View>
      <FlatList
        data={copyedItems}
        renderItem={flatListRender}
        bounces={false}
      />
    </View>
  );
};

export default Menu1;