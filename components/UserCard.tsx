import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { User } from '@/types/User';

import CustomButton from './CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import { Dialog, Divider, Menu, Portal } from 'react-native-paper';
import { Href, router } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);

  const hideDialog = () => setDialogVisible(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);
  return (
    <View className='flex space-y-4 justify-between items-center py-8 px-10 bg-secondary rounded-xl relative'>
      {currentUser?.id === user.id && (
        <View className='absolute top-3 right-3'>
          <Menu
            anchorPosition='bottom'
            contentStyle={{ backgroundColor: 'white' }}
            visible={menuVisible}
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
                router.push('/profile/edit' as Href<'/profile/edit'>);
                closeMenu();
              }}
              title='Edit Profile'
              titleStyle={{ color: 'black' }}
            />
            <Menu.Item
              onPress={() => {
                router.push('/profile/password' as Href<'/profile/password'>);
                closeMenu();
              }}
              title='Change Password'
              titleStyle={{ color: 'black' }}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                showDialog();
                closeMenu();
              }}
              title='Delete Account'
              titleStyle={{ color: 'red', fontWeight: 'bold' }}
            />
          </Menu>
          <Portal>
            <Dialog
              visible={dialogVisible}
              onDismiss={hideDialog}
              style={{ backgroundColor: 'white' }}
            >
              <Dialog.Title className='font-pmedium text-black'>
                Delete Account
              </Dialog.Title>
              <Dialog.Content>
                <Text className='font-pmedium text-md'>
                  Are you sure you want to delete your account?
                </Text>
                <Text className='font-pmedium text-md'>
                  This action cannot be undone and all your data will be
                  permanently lost.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <CustomButton
                  onPress={() => {
                    hideDialog();
                    //TODO: delete account
                    router.replace('/');
                  }}
                  containerStyles='bg-red-500 px-5 h-12'
                >
                  Delete
                </CustomButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
        <View className='flex flex-row justify-between'>
          <Text className='flex-1 font-pmedium text-lg text-center'>Age:</Text>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            {user.age}
          </Text>
        </View>
        <View className='flex flex-row justify-between'>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            Gender:
          </Text>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            {user.gender === 'Prefer not to say' ? '?' : user.gender}
          </Text>
        </View>
        <View className='flex flex-row justify-between'>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            Server:
          </Text>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            {user.server}
          </Text>
        </View>
        <View className='flex flex-row justify-between items-center'>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            Active Time:
          </Text>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            {user.activeTime?.join(', ')}
          </Text>
        </View>
        <View className='flex flex-row justify-between'>
          <Text className='flex-1 font-pmedium text-lg text-center'>Race:</Text>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            {user.race}
          </Text>
        </View>
        <View className='flex flex-row justify-between'>
          <Text className='flex-1 font-pmedium text-lg text-center'>Job:</Text>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            {user.job}
          </Text>
        </View>
        <View className='flex flex-row items-center justify-between'>
          <Text className='flex-1 font-pmedium text-lg text-center'>
            Play Style:
          </Text>
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
