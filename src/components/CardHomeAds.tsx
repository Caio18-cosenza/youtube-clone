import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';

let { width, height } = Dimensions.get('window');

interface CardHomeAdsProps {}

const CardHomeAds = ({}: CardHomeAdsProps) => {
  return (
    <View
      style={{
        flex: 1,
        width: width,
        backgroundColor: 'white',
        height: height - 340,
      }}
    >
      <Image
        source={{ uri: 'https://i.ytimg.com/vi/VKAGjc07kV8/hqdefault.jpg' }}
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
            uri: 'https://yt3.ggpht.com/ytc/AKedOLRa07Nt12PomAUNTnG1GCXemFvqYSq6Hk3cofXVcg=s800-c-k-c0x00ffffff-no-rj',
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
            bottom: 110,
            backgroundColor: '#111',
            left: 360,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white' }}> 46:01 </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
            top: 5,
            maxWidth: width - 100,
          }}
        >
          <Text style={{ fontSize: 13 }}>
            {' '}
            UPLOAD DE IMAGENS MULTER + AWS S3 + NEXT.JS [PARTE #08] |
            RECRIANDO...{' '}
          </Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>
            {' '}
            Vamos clonar a tela inicial do YouTube utilizando o Framework
            Next.js + Material-UI...{' '}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                backgroundColor: '#fcbc34',
                borderRadius: 3,
              }}
            >
              {' '}
              Ad{' '}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',
              }}
            >
              {' '}
              Lucas Nhimi{' '}
            </Text>
          </View>
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

export default CardHomeAds;
