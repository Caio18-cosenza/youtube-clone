import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';

let { width, height } = Dimensions.get('window');

interface CardHomeProps {
  thumbnails: string;
  title: string;
  channelTitle: string;
  viewCount: number;
  publishedAt: string;
  avatarChannel: string;
  duration: string;
}

const CardHome = ({
  thumbnails,
  title,
  channelTitle,
  viewCount,
  publishedAt,
  avatarChannel,
  duration,
}: CardHomeProps) => {
  return (
    <View
      style={{
        flex: 1,
        width: width,
        backgroundColor: 'white',
        height: 320,
        marginTop: 8,
      }}
    >
      <Image
        source={{ uri: `${thumbnails}` }}
        style={{
          width: '100%',
          height: 250,
        }}
      />
      <View
        style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
      >
        <Image
          source={{
            uri: `${avatarChannel}`,
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginTop: 10,
            marginLeft: 12,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 55,
            backgroundColor: '#111',
            left: 360,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white' }}> {duration} </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
            top: 5,
            maxWidth: width - 100,
          }}
        >
          <Text style={{}}> {title} </Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>
            {' '}
            {`${channelTitle} • ${viewCount}M views • ${publishedAt} month ago`}{' '}
          </Text>
        </View>
        <Entypo
          name='dots-three-vertical'
          size={24}
          color='black'
          style={{ fontSize: 12, position: 'absolute', left: 390, top: 10 }}
        />
      </View>
    </View>
  );
};

export default CardHome;
