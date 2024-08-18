import { View, Text } from 'react-native';
import React from 'react';

export default function Profile({username}) {
  return (
    <View>
      <Text>Helo {username}</Text>
    </View>
  )
}