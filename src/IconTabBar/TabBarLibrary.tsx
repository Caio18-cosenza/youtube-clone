import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons as LibraryIconFocus } from '@expo/vector-icons';

interface TabBarLibraryProps {
  color: string;
  size: number;
}

const TabBarLibrary = ({ color, size }: TabBarLibraryProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LibraryIconFocus
        name='play-box-multiple'
        color={color}
        size={size - 25}
        style={{ position: 'absolute', bottom: 20 }}
      />
      <Text style={{ fontSize: 10, position: 'absolute', top: 28 }}>
        {' '}
        Library{' '}
      </Text>
    </View>
  );
};

export default TabBarLibrary;
