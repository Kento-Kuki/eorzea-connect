import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { IPostForm, Post } from '@/types/Post';
import AuthorInfo from './AuthorInfo';
import { format } from 'date-fns';
import Separator from './Separator';
import CustomButton from './CustomButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dialog, Menu, Portal } from 'react-native-paper';
import {
  addBookmark,
  createChatRoom,
  deletePost,
  removeBookmark,
} from '@/lib/appwrite';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { usePostStore } from '@/store/usePostState';
import { useMessageStore } from '@/store/useMessageStore';

interface PostProps {
  post: Post;
  userId: string;
  refetch: () => Promise<void>;
  isBookmarked?: boolean;
}

const PostCard = ({ post, userId, refetch, isBookmarked }: PostProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(isBookmarked);
  const isOwnPost = post.author.id === userId;
  const setPostData = usePostStore((state) => state.setPostData);
  const setBookmarks = usePostStore((state) => state.setBookmarks);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const onDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      await deletePost(id);
      Alert.alert('Success', 'Post deleted successfully');
      await refetch();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post');
    } finally {
      hideDialog();
      setIsDeleting(false);
    }
  };

  const toggleBookmark = async () => {
    setIsToggling(true);
    try {
      if (bookmarkStatus) {
        await removeBookmark(post.id, userId);
        Toast.show({
          type: 'success',
          text1: 'Bookmark removed',
          position: 'top',
        });
      } else {
        await addBookmark(post.id, userId);
        Toast.show({
          type: 'success',
          text1: 'Bookmark added',
          position: 'top',
        });
      }
      setBookmarkStatus(!bookmarkStatus);
      setBookmarks((prevBookmarks) => {
        if (prevBookmarks?.includes(post.id)) {
          return prevBookmarks?.filter((id) => id !== post.id);
        } else {
          return [...(prevBookmarks || []), post.id];
        }
      });
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to toggle bookmark',
        position: 'top',
      });
    } finally {
      setIsToggling(false);
    }
  };

  const onSendMessage = async () => {
    try {
      setIsSending(true);
      const chatRoomId = await createChatRoom([userId, post.author.id]);
      router.push(`/chat/${chatRoomId}`);
    } catch (error) {
      console.error('Failed to create chat room:', error);
      Toast.show({
        type: 'error',
        text1: 'Please try again',
        position: 'top',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View className='bg-secondary rounded-2xl my-4 pl-4 pr-2'>
      {/* Title */}
      <View className='pt-2 flex-row justify-between'>
        <Text className='font-pbold text-xl flex-1'>{post.title}</Text>
        {isOwnPost && (
          <View>
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
                  <FontAwesome name='ellipsis-v' size={22} color='black' />
                </CustomButton>
              }
            >
              <Menu.Item
                onPress={() => {
                  if (setPostData) {
                    setPostData(post);
                  }
                  router.push('/create');
                  closeMenu();
                }}
                title='Edit'
                titleStyle={{ color: 'black' }}
              />
              <Menu.Item
                onPress={() => {
                  showDialog();
                  closeMenu();
                }}
                title='Delete'
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
                  Delete Post
                </Dialog.Title>
                <Dialog.Content>
                  <Text className='font-pmedium text-md'>
                    Are you sure you want to delete this post?
                  </Text>
                  <Text className='font-pmedium text-md'>
                    This action cannot be undone and all your data will be
                    permanently lost.
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <CustomButton
                    onPress={() => onDelete(post.id)}
                    containerStyles='bg-red-500 px-5 h-12'
                    isLoading={isDeleting}
                  >
                    Delete
                  </CustomButton>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        )}
      </View>
      {/* Author */}
      <AuthorInfo author={post.author} />
      {/* Content */}
      <View className='min-h-[200px]'>
        <Text className='font-pbold text-2xl text-center'>Comment</Text>
        <Separator />
        <View className='my-2'>
          <Text className='font-pmedium' selectable={true}>
            {post.content}
          </Text>
        </View>
      </View>
      {/* Button */}
      {!isOwnPost && (
        <View className='flex flex-row justify-between items-center mx-7 my-2'>
          <CustomButton
            containerStyles='px-4'
            onPress={onSendMessage}
            isLoading={isSending}
          >
            Send message
          </CustomButton>
          <CustomButton
            containerStyles='w-16'
            onPress={toggleBookmark}
            isLoading={isToggling}
          >
            {bookmarkStatus ? (
              <FontAwesome name='bookmark' size={22} color='white' />
            ) : (
              <FontAwesome name='bookmark-o' size={22} color='white' />
            )}
          </CustomButton>
        </View>
      )}
      {/* Footer */}
      <View className='flex items-end p-2'>
        <Text className='text-xs text-gray-600 text-left'>
          Posted On:{format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default PostCard;
