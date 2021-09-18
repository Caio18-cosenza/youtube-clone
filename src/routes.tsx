import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ColorsRoot from './config/colors/colors.json';

import Home from './Screens/Home';
import Shorts from './Screens/Shorts';
import CreateContent from './Screens/CreateContent';
import Subscriptions from './Screens/Subscriptions';
import Library from './Screens/Library';
import TabBarHome from './IconTabBar/TabBarHome';
import TabBarShort from './IconTabBar/TabBarShort';
import TabBarCreateContent from './IconTabBar/TabBarCreateContent';
import TabBarSubscriptions from './IconTabBar/TabBarSubscription';
import TabBarLibrary from './IconTabBar/TabBarLibrary';

declare global {
  type bottomTabParams = {
    Home: String;
    Short: String;
    Subscriptions: String;
    Library: String;
    CreateContent: String;
  };
}

const Tab = createBottomTabNavigator<bottomTabParams>();

const Routes = () => {
  return (
    <Tab.Navigator>
      <Tab.Group screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabBarHome color={ColorsRoot.ModeLight.Icons} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name='Short'
          component={Shorts}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabBarShort color={'#000'} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name='CreateContent'
          component={CreateContent}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabBarCreateContent
                color={ColorsRoot.ModeLight.Icons}
                size={50}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Subscriptions'
          component={Subscriptions}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabBarSubscriptions
                color={ColorsRoot.ModeLight.Icons}
                size={50}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Library'
          component={Library}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabBarLibrary color={ColorsRoot.ModeLight.Icons} size={50} />
            ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default Routes;
