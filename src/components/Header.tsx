import React from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FontAwesome5 as IconDesconected } from '@expo/vector-icons';
import { MaterialIcons as IconConnected } from '@expo/vector-icons';
import { Ionicons as Notification } from '@expo/vector-icons';
import { Ionicons as Search } from '@expo/vector-icons';

import ColorsRoot from '../config/colors/colors.json';

const logoYouTube = require('../../assets/logo-youtube.png');

let { width, height } = Dimensions.get('window');

const Header = () => {
  return (
    <View
      style={{
        width: width,
        marginTop: getStatusBarHeight() || 30,
        backgroundColor: ColorsRoot.ModeLight.Header,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        source={logoYouTube}
        style={{ width: 120, height: 60, marginRight: 118 }}
      />
      <IconDesconected
        name='chromecast'
        size={24}
        color='black'
        onPress={() => alert('Connectar')}
        style={{ marginRight: 20 }}
      />
      <Notification
        name='notifications-outline'
        size={24}
        color='black'
        onPress={() => alert('Notificar')}
        style={{ marginRight: 20 }}
      />
      <Search
        name='search'
        size={24}
        color='black'
        onPress={() => alert('Procurar')}
        style={{ marginRight: 20 }}
      />
      <TouchableOpacity
        onPress={() => alert('ola')}
        style={{ width: 24, height: 24, borderRadius: 12 }}
      >
        <Image
          source={{ uri: 'http://github.com/Caio18-cosenza.png' }}
          style={{ width: 24, height: 24, borderRadius: 12 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
