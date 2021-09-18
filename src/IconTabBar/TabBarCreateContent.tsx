import React from 'react';
import { View, Text, TouchableOpacityProps } from 'react-native';
import { EvilIcons as CreateIconNoFocus } from '@expo/vector-icons';

interface TabBarCreateProps extends TouchableOpacityProps {
  color: string;
  size: number;
}

const TabBarCreateContent = ({ color, size }: TabBarCreateProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CreateIconNoFocus
        name='plus'
        color={color}
        size={size}
        style={{ position: 'absolute' }}
      />
    </View>
  );
};

export default TabBarCreateContent;
