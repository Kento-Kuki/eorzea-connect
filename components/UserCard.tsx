import { View, Text, Image } from 'react-native';
import React from 'react';
import { User } from '@/types/User';
import { useGlobalContext } from '@/context/GlobalProvider';
import CustomButton from './CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import { Divider, Menu } from 'react-native-paper';
import { router } from 'expo-router';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const { user: currentUser } = useGlobalContext();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View className='flex space-y-4 justify-between items-center py-8 px-10 bg-secondary rounded-xl relative'>
      {currentUser?.id === user.id && (
        <View className='absolute top-3 right-3'>
          <Menu
            anchorPosition='bottom'
            contentStyle={{ backgroundColor: 'white' }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <CustomButton
                containerStyles='h-10 w-10 rounded-full bg-transparent'
                onPress={openMenu}
              >
                <FontAwesome name='gear' size={22} color='white' />
              </CustomButton>
            }
          >
            <Menu.Item
              onPress={() => {
                router.push('profile/edit');
                closeMenu();
              }}
              title='Edit Profile'
              titleStyle={{ color: 'black' }}
            />
            <Menu.Item
              onPress={() => {
                // router.push('change-password');
                closeMenu();
              }}
              title='Change Password'
              titleStyle={{ color: 'black' }}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                //TODO: delete account
                closeMenu();
              }}
              title='Delete Account'
              titleStyle={{ color: 'red', fontWeight: 'bold' }}
            />
          </Menu>
        </View>
      )}
      <View className='flex justify-center items-center space-y-2 w-full'>
        <Image
          source={{ uri: user.avatar }}
          className='w-28 h-28 rounded-full'
          resizeMode='cover'
        />
        <Text className='font-psemibold text-2xl'>{user.username}</Text>
      </View>
      <View className='flex w-full'>
        <Text className='font-pmedium text-base'>Age:{user.age}</Text>
        <Text className='font-pmedium text-base'>
          Gender:
          {user.gender === 'Prefer not to say' ? '?' : user.gender}
        </Text>
        <Text className='font-pmedium text-base'>Server:{user.server}</Text>
        <Text className='font-pmedium text-base'>
          Active Time:{user.activeTime?.join(', ')}
        </Text>
        <Text className='font-pmedium text-base'>Race:{user.race}</Text>
        <Text className='font-pmedium text-base'>Job:{user.job}</Text>
        <View>
          <Text className='font-pmedium text-base'>Play Style:</Text>
          <View className='flex flex-row flex-wrap'>
            {user.playStyle?.map((item, index) => (
              <View
                key={index}
                className='bg-primary py-0.5 px-1.5 m-1 rounded-lg '
              >
                <Text className='text-white font-pmedium'>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserCard;
