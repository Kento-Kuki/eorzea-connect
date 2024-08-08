import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { IPostForm, Post } from '@/types/Post';
import AuthorInfo from './AuthorInfo';
import { format } from 'date-fns';
import Separator from './Separator';
import CustomButton from './CustomButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dialog, Menu, Portal } from 'react-native-paper';
import { deletePost } from '@/lib/appwrite';
import { router } from 'expo-router';

interface PostProps {
  post: Post;
  userId: string;
  refetch: () => Promise<void>;
  setPostData: React.Dispatch<React.SetStateAction<Post | IPostForm | null>>;
}

const PostCard = ({ post, userId, refetch, setPostData }: PostProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isOwnPost = post.author.id === userId;

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
                  setPostData(post);
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
          <CustomButton containerStyles='px-4'>Send message</CustomButton>
          <CustomButton containerStyles='w-16'>
            <FontAwesome name='bookmark-o' size={22} color='white' />
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
