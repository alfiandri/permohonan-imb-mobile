import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function RadioButton({data, onSelect}) {
  const styles = StyleSheet.create({
    option: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
    unselected: {
      backgroundColor: 'red',
      margin: 5,
    },
    selected: {
      backgroundColor: 'blue',
      margin: 6,
      padding: 10,
      borderRadius: 10,
    },
  });
  const [userOption, setUserOption] = useState(null);

  return (
    <View>
      {data.map(item => {
        return (
          <Pressable
            style={
              //Line 5
              item.value === userOption ? styles.selected : styles.unselected
            } /*Add style here */ //Line 7
            onPress={() => setUserOption(item.value)}>
            {/* add style here */}
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
