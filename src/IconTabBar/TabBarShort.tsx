import React from 'react';
import { View, Text, Image } from 'react-native';

const logoShort = require('../../assets/short-youtube-logo.png');

interface TabBarShortProps {
  color: string;
  size: number;
}

const TabBarShort = ({ color, size }: TabBarShortProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={logoShort}
        style={{
          position: 'absolute',
          bottom: 20,
          width: size - 5,
          height: size - 5,
        }}
      />
      <Text style={{ fontSize: 10, position: 'absolute', top: 28 }}>
        {' '}
        Shorts{' '}
      </Text>
    </View>
  );
};

export default TabBarShort;
