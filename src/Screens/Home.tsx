import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { format, formatDistance, subDays } from 'date-fns';

import Header from '../components/Header';

import { MaterialIcons as Explore } from '@expo/vector-icons';

import ColorsRoot from '../config/colors/colors.json';
import ApiRoot from '../config/keys/api_key.json';
import CardHome from '../components/CardHome';
import CardHomeAds from '../components/CardHomeAds';

let { width, height } = Dimensions.get('window');

interface DataProps {
  snippet: any;
  id: any;
  contentDetails: any;
  statistics: any;
}

interface DataChannelProps {}

export default function Home() {
  const [data, setData] = useState<DataProps[]>([]);
  const [dataChannel, setDataChannel] = useState<DataChannelProps[]>([]);

  useEffect(() => {
    async function loadingApiVideo() {
      await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=JDo93x54pTg&key=${ApiRoot.API_KEY_YOUTUBE}&part=snippet,contentDetails,statistics,status`
      ).then((res) =>
        res.json().then((json) => {
          setData(json.items);
          // let resposta = convert_time(json.items.contentDetails.duration);
          // console.log(resposta);
          data.map((j) => {
            let resposta = convert_time(j.contentDetails.duration);
            console.log(resposta);
          });
        })
      );
    }
    loadingApiVideo();
    async function loadingApiChannel() {
      await fetch(
        `https://www.googleapis.com/youtube/v3/channels?id=UCGSl2aUKj9dr2XGLd-PQ59A&key=${ApiRoot.API_KEY_YOUTUBE}&part=snippet,brandingSettings,contentDetails,statistics,topicDetails`
      ).then((res) => res.json().then((json) => setDataChannel(json.items)));
    }
    loadingApiChannel();
  }, []);

  function convert_time(duration: any) {
    let res = duration.replace('PT', '');
    res;
    let resM = res.replace('M', ':');
    let resS = resM.replace('S', '');
    return resS;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#eee',
      }}
    >
      <StatusBar style='dark' backgroundColor='transparent' translucent />
      <Header />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#eee',
        }}
      >
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingVertical: 10,
          }}
          horizontal
        >
          <View
            style={{ width: 120, borderRightWidth: 1, borderEndColor: '#eee' }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#f5f4f4',
                width: 100,
                height: 34,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginLeft: 10,
              }}
            >
              <Explore
                name='explore'
                size={28}
                color={ColorsRoot.ModeLight.Icons}
              />
              <Text> Explore </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'gray',
              width: 50,
              borderRadius: 18,
              justifyContent: 'center',
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: ColorsRoot.ModeLight.letter,
              }}
            >
              {' '}
              All{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#eeeeee',
              borderRadius: 18,
              justifyContent: 'center',
              marginLeft: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
            >
              {' '}
              Theatre{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#eeeeee',
              borderRadius: 18,
              justifyContent: 'center',
              marginLeft: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
            >
              {' '}
              Blessings{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#eeeeee',
              borderRadius: 18,
              justifyContent: 'center',
              marginLeft: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
            >
              {' '}
              Anderson Freire{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#eeeeee',
              borderRadius: 18,
              justifyContent: 'center',
              marginLeft: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
            >
              {' '}
              Brazilian Music{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#eeeeee',
              borderRadius: 18,
              justifyContent: 'center',
              marginLeft: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
            >
              {' '}
              Music{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: 'blue',
              }}
            >
              {' '}
              SEND FEEDBACK{' '}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <CardHomeAds />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <CardHome
              title={item.snippet.title}
              thumbnails={item.snippet.thumbnails.maxres.url}
              channelTitle={item.snippet.channelTitle}
              avatarChannel={
                'https://yt3.ggpht.com/TRzw5A3n4xfqeqRFXFHdyqIwiQCf1qvmt3P6ScIfAbW_6vFLk8ECU9usfasW8D-eSfKvv4SvFPY=s800-c-k-c0x00ffffff-no-rj'
              }
              duration={item.contentDetails.duration}
              publishedAt={item.snippet.publishedAt}
              viewCount={item.statistics.viewCount}
            />
            <CardHome
              title={item.snippet.title}
              thumbnails={item.snippet.thumbnails.maxres.url}
              channelTitle={item.snippet.channelTitle}
              avatarChannel={
                'https://yt3.ggpht.com/TRzw5A3n4xfqeqRFXFHdyqIwiQCf1qvmt3P6ScIfAbW_6vFLk8ECU9usfasW8D-eSfKvv4SvFPY=s800-c-k-c0x00ffffff-no-rj'
              }
              duration={item.contentDetails.duration}
              publishedAt={item.snippet.publishedAt}
              viewCount={item.statistics.viewCount}
            />
            <CardHome
              title={item.snippet.title}
              thumbnails={item.snippet.thumbnails.maxres.url}
              channelTitle={item.snippet.channelTitle}
              avatarChannel={
                'https://yt3.ggpht.com/TRzw5A3n4xfqeqRFXFHdyqIwiQCf1qvmt3P6ScIfAbW_6vFLk8ECU9usfasW8D-eSfKvv4SvFPY=s800-c-k-c0x00ffffff-no-rj'
              }
              duration={item.contentDetails.duration}
              publishedAt={item.snippet.publishedAt}
              viewCount={item.statistics.viewCount}
            />
            <CardHome
              title={item.snippet.title}
              thumbnails={item.snippet.thumbnails.maxres.url}
              channelTitle={item.snippet.channelTitle}
              avatarChannel={
                'https://yt3.ggpht.com/TRzw5A3n4xfqeqRFXFHdyqIwiQCf1qvmt3P6ScIfAbW_6vFLk8ECU9usfasW8D-eSfKvv4SvFPY=s800-c-k-c0x00ffffff-no-rj'
              }
              duration={item.contentDetails.duration}
              publishedAt={item.snippet.publishedAt}
              viewCount={item.statistics.viewCount}
            />
          </>
          // <View>
          //   <Text> {item.snippet.title} </Text>
          // </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}
