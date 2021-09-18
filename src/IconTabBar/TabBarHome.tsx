import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons as HomeFocus } from '@expo/vector-icons';

interface TabBarHomeProps {
  color: string;
  size: number;
}

const TabBarHome = ({ color, size }: TabBarHomeProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <HomeFocus
        name='home'
        color={color}
        size={size}
        style={{ position: 'absolute', bottom: 20 }}
      />
      <Text style={{ fontSize: 10, position: 'absolute', top: 28 }}>
        {' '}
        Home{' '}
      </Text>
    </View>
  );
};

export default TabBarHome;
