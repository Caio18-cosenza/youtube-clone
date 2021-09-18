import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons as SubscriptionsIconFocus } from '@expo/vector-icons';

interface TabBarSubscriptionsProps {
  color: string;
  size: number;
}

const TabBarSubscriptions = ({ color, size }: TabBarSubscriptionsProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SubscriptionsIconFocus
        name='youtube-subscription'
        color={color}
        size={size - 25}
        style={{ position: 'absolute', bottom: 20 }}
      />
      <Text style={{ fontSize: 10, position: 'absolute', top: 28 }}>
        {' '}
        Subscriptions{' '}
      </Text>
    </View>
  );
};

export default TabBarSubscriptions;
