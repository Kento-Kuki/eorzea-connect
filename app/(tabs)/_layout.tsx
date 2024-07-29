import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface TabIconProps {
  icon: JSX.Element;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className='flex items-center justify-center gap-1'>
      {icon}
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<FontAwesome name='home' size={22} color={color} />}
              color={color}
              name='Home'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<FontAwesome name='search' size={22} color={color} />}
              color={color}
              name='Search'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<FontAwesome name='wechat' size={22} color={color} />}
              color={color}
              name='Chat'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='bookmark'
        options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<FontAwesome name='bookmark-o' size={22} color={color} />}
              color={color}
              name='Bookmark'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<FontAwesome name='user' size={22} color={color} />}
              color={color}
              name='Profile'
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
