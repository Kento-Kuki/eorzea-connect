import { ChatRoomType, IMessage, Message } from '@/types/Chat';
import { IPostForm, Post } from '@/types/Post';
import { ISearch, IUserForm, User } from '@/types/User';
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'react-native-appwrite';

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  postsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
  bookmarksCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_BOOKMARKS_COLLECTION_ID!,
  chatRoomsCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_CHAT_ROOMS_COLLECTION_ID!,
  messagesCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID!,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
        isSetupComplete: false,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUserDoc = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (currentUserDoc.documents.length === 0)
      throw new Error('No user document found');

    const userDoc = currentUserDoc.documents[0];
    const user: User = {
      id: userDoc.$id,
      accountId: userDoc.accountId,
      username: userDoc.username,
      email: userDoc.email,
      avatar: userDoc.avatar,
      isSetupComplete: userDoc.isSetupComplete,
      age: userDoc.age,
      gender: userDoc.gender,
      race: userDoc.race,
      job: userDoc.job,
      activeTime: userDoc.activeTime,
      playStyle: userDoc.playStyle,
      server: userDoc.server,
      dataCenter: userDoc.dataCenter,
    };

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('$id', userId)]
    );
    const userDoc = response.documents[0];
    const user = {
      id: userDoc.$id,
      accountId: userDoc.accountId,
      username: userDoc.username,
      email: userDoc.email,
      avatar: userDoc.avatar,
      isSetupComplete: userDoc.isSetupComplete,
      age: userDoc.age,
      gender: userDoc.gender,
      race: userDoc.race,
      job: userDoc.job,
      activeTime: userDoc.activeTime,
      playStyle: userDoc.playStyle,
      server: userDoc.server,
      dataCenter: userDoc.dataCenter,
    };

    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const updateUser = async (
  userId: string,
  userData: Partial<IUserForm>
) => {
  try {
    const avatarUrl = userData.avatar?.startsWith('file://')
      ? await uploadFile(userData.avatar)
      : userData.avatar;

    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      { ...userData, avatar: avatarUrl }
    );
    return {
      id: updatedUser.$id,
      accountId: updatedUser.accountId,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      isSetupComplete: updatedUser.isSetupComplete,
      age: updatedUser.age,
      gender: updatedUser.gender,
      race: updatedUser.race,
      job: updatedUser.job,
      activeTime: updatedUser.activeTime,
      playStyle: updatedUser.playStyle,
      server: updatedUser.server,
      dataCenter: updatedUser.dataCenter,
    } as User;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const uploadFile = async (uri: string) => {
  if (!uri) return;
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log(blob);
    const file = {
      name: uri.substring(uri.lastIndexOf('/') + 1),
      type: blob.type,
      size: blob.size,
      uri,
    };

    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      file
    );

    const fileUrl = storage.getFileView(config.storageId, uploadedFile.$id);

    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const updatePassword = async (
  newPassword: string,
  currentPassword: string
) => {
  try {
    await account.updatePassword(newPassword, currentPassword);
    return;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.postsCollectionId,
      [Query.orderDesc('$createdAt')]
    );
    const posts: Post[] = response.documents.map((post) => ({
      id: post.$id,
      title: post.title,
      content: post.content,
      author: {
        id: post.users.$id,
        username: post.users.username,
        avatar: post.users.avatar,
        accountId: post.users.accountId,
        isSetupComplete: post.users.isSetupComplete,
        age: post.users.age,
        gender: post.users.gender,
        race: post.users.race,
        job: post.users.job,
        activeTime: post.users.activeTime,
        playStyle: post.users.playStyle,
        server: post.users.server,
        dataCenter: post.users.dataCenter,
      } as User,
      createdAt: post.$createdAt,
      updatedAt: post.$updatedAt,
    }));

    return posts;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const searchParams: ISearch = JSON.parse(decodeURIComponent(query));

    const filters: string[] = [];
    if (searchParams.age) {
      filters.push(Query.equal('age', searchParams.age));
    }
    if (searchParams.gender) {
      filters.push(Query.equal('gender', searchParams.gender));
    }
    if (searchParams.race) {
      filters.push(Query.equal('race', searchParams.race));
    }
    if (searchParams.job) {
      filters.push(Query.equal('job', searchParams.job));
    }
    if (searchParams.server) {
      filters.push(Query.equal('server', searchParams.server));
    }
    if (searchParams.dataCenter) {
      filters.push(Query.equal('dataCenter', searchParams.dataCenter));
    }
    if (searchParams.playStyle && searchParams.playStyle.length > 0) {
      filters.push(Query.contains('playStyle', searchParams.playStyle));
    }
    if (searchParams.activeTime && searchParams.activeTime.length > 0) {
      filters.push(Query.contains('activeTime', searchParams.activeTime));
    }

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      filters
    );

    const userIds = users.documents.map((user) => user.$id);

    const postsPromises = userIds.map((id) =>
      databases.listDocuments(config.databaseId, config.postsCollectionId, [
        Query.equal('users', id),
        Query.orderDesc('$createdAt'),
      ])
    );

    const postsResults = await Promise.all(postsPromises);

    const allPosts = postsResults.flatMap((result) => result.documents);

    const formattedPosts = allPosts.map((post) => ({
      id: post.$id,
      title: post.title,
      content: post.content,
      author: {
        id: post.users.$id,
        username: post.users.username,
        avatar: post.users.avatar,
        accountId: post.users.accountId,
        isSetupComplete: post.users.isSetupComplete,
        age: post.users.age,
        gender: post.users.gender,
        race: post.users.race,
        job: post.users.job,
        activeTime: post.users.activeTime,
        playStyle: post.users.playStyle,
        server: post.users.server,
        dataCenter: post.users.dataCenter,
      } as User,
      createdAt: post.$createdAt,
      updatedAt: post.$updatedAt,
    }));

    return formattedPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const getMyPosts = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.postsCollectionId,
      [Query.equal('users', userId), Query.orderDesc('$createdAt')]
    );

    const posts: Post[] = response.documents.map((post) => ({
      id: post.$id,
      title: post.title,
      content: post.content,
      author: {
        id: post.users.$id,
        username: post.users.username,
        avatar: post.users.avatar,
        accountId: post.users.accountId,
        isSetupComplete: post.users.isSetupComplete,
        age: post.users.age,
        gender: post.users.gender,
        race: post.users.race,
        job: post.users.job,
        activeTime: post.users.activeTime,
        playStyle: post.users.playStyle,
        server: post.users.server,
        dataCenter: post.users.dataCenter,
      } as User,
      createdAt: post.$createdAt,
      updatedAt: post.$updatedAt,
    }));

    return posts;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const getPostById = async (postIds: string[]) => {
  try {
    const promises = postIds.map((id) =>
      databases.getDocument(config.databaseId, config.postsCollectionId, id)
    );
    const posts = await Promise.all(promises);
    const formattedPosts = posts.map((post) => ({
      id: post.$id,
      title: post.title,
      content: post.content,
      author: {
        id: post.users.$id,
        username: post.users.username,
        avatar: post.users.avatar,
        accountId: post.users.accountId,
        isSetupComplete: post.users.isSetupComplete,
        age: post.users.age,
        gender: post.users.gender,
        race: post.users.race,
        job: post.users.job,
        activeTime: post.users.activeTime,
        playStyle: post.users.playStyle,
        server: post.users.server,
        dataCenter: post.users.dataCenter,
      } as User,
      createdAt: post.$createdAt,
      updatedAt: post.$updatedAt,
    }));

    return formattedPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const getBookmarkedPosts = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.bookmarksCollectionId,
      [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
    );

    const postIds: string[] = response.documents.map((post) => post.postId);

    const posts = await getPostById(postIds);

    return posts;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const createPost = async (data: IPostForm) => {
  try {
    const newPost = await databases.createDocument(
      config.databaseId,
      config.postsCollectionId,
      ID.unique(),
      {
        title: data.title,
        content: data.content,
        users: data.author.id,
      }
    );

    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const updatePost = async (data: Post) => {
  try {
    const updatedPost = await databases.updateDocument(
      config.databaseId,
      config.postsCollectionId,
      data.id,
      {
        title: data.title,
        content: data.content,
      }
    );
    return updatedPost;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const deletePost = async (id: string) => {
  try {
    await databases.deleteDocument(
      config.databaseId,
      config.postsCollectionId,
      id
    );

    return;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const addBookmark = async (postId: string, userId: string) => {
  try {
    const newBookmark = await databases.createDocument(
      config.databaseId,
      config.bookmarksCollectionId,
      ID.unique(),
      {
        postId,
        userId,
      }
    );
    return newBookmark;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const removeBookmark = async (postId: string, userId: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.bookmarksCollectionId,
      [Query.equal('userId', userId), Query.equal('postId', postId)]
    );

    const bookmark = response.documents[0];
    if (!bookmark) {
      throw new Error('Bookmark not found');
    }

    const deletedBookmark = await databases.deleteDocument(
      config.databaseId,
      config.bookmarksCollectionId,
      bookmark.$id
    );

    return deletedBookmark;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const getUserBookmarks = async (userId: string): Promise<string[]> => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.bookmarksCollectionId,
      [Query.equal('userId', userId)]
    );

    return response.documents.map((bookmark) => bookmark.postId);
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const getChatRooms = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.chatRoomsCollectionId,
      [Query.equal('participants', userId)]
    );

    const chatRoomsWithOpponents: ChatRoomType[] = await Promise.all(
      response.documents.map(async (chatRoom) => {
        const opponentId = chatRoom.participants.filter(
          (participantId: string) => participantId !== userId
        )[0];

        let opponent: User | null = null;
        if (opponentId) {
          opponent = await getUser(opponentId);
        }

        const lastMessage = chatRoom.messages
          ? {
              id: chatRoom.messages.$id,
              chatRoomId: chatRoom.$id,
              user: {
                id: chatRoom.messages.users.$id,
                accountId: chatRoom.messages.users.accountId,
                username: chatRoom.messages.users.username,
                email: chatRoom.messages.users.email,
                avatar: chatRoom.messages.users.avatar,
                isSetupComplete: chatRoom.messages.users.isSetupComplete,
                age: chatRoom.messages.users.age,
                gender: chatRoom.messages.users.gender,
                race: chatRoom.messages.users.race,
                job: chatRoom.messages.users.job,
                activeTime: chatRoom.messages.users.activeTime,
                playStyle: chatRoom.messages.users.playStyle,
                server: chatRoom.messages.users.server,
                dataCenter: chatRoom.messages.users.dataCenter,
              } as User,
              content: chatRoom.messages.content,
              createdAt: chatRoom.messages.$createdAt,
              isRead: chatRoom.messages.isRead,
            }
          : null;

        return {
          id: chatRoom.$id,
          lastMessage,
          opponent,
          updatedAt: chatRoom.$updatedAt,
        };
      })
    );
    const sortedChatRooms = chatRoomsWithOpponents.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return sortedChatRooms;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const getMessages = async (chatRoomId: string) => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.messagesCollectionId,
      [Query.equal('chatRoomId', chatRoomId)]
    );
    const formattedMessages: Message[] = response.documents.map((message) => ({
      id: message.$id,
      chatRoomId: message.chatRoomId,
      user: {
        id: message.users.$id,
        accountId: message.users.accountId,
        username: message.users.username,
        email: message.users.email,
        avatar: message.users.avatar,
        isSetupComplete: message.users.isSetupComplete,
        age: message.users.age,
        gender: message.users.gender,
        race: message.users.race,
        job: message.users.job,
        activeTime: message.users.activeTime,
        playStyle: message.users.playStyle,
        server: message.users.server,
        dataCenter: message.users.dataCenter,
      } as User,
      content: message.content,
      createdAt: message.$createdAt,
      isRead: message.isRead,
    }));

    return formattedMessages;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const createMessage = async (data: IMessage) => {
  try {
    const newMessage = await databases.createDocument(
      config.databaseId,
      config.messagesCollectionId,
      ID.unique(),
      {
        chatRoomId: data.chatRoomId,
        users: data.userId,
        content: data.content,
        isRead: false,
      }
    );
    const formattedMessage: Message = {
      id: newMessage.$id,
      chatRoomId: newMessage.chatRoomId,
      user: {
        id: newMessage.users.$id,
        accountId: newMessage.users.accountId,
        username: newMessage.users.username,
        email: newMessage.users.email,
        avatar: newMessage.users.avatar,
        isSetupComplete: newMessage.users.isSetupComplete,
        age: newMessage.users.age,
        gender: newMessage.users.gender,
        race: newMessage.users.race,
        job: newMessage.users.job,
        activeTime: newMessage.users.activeTime,
        playStyle: newMessage.users.playStyle,
        server: newMessage.users.server,
        dataCenter: newMessage.users.dataCenter,
      },
      content: newMessage.content,
      createdAt: newMessage.$createdAt,
      isRead: newMessage.isRead,
    };

    await databases.updateDocument(
      config.databaseId,
      config.chatRoomsCollectionId,
      data.chatRoomId,
      {
        messages: formattedMessage.id,
      }
    );
    return formattedMessage;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const markMessageAsRead = async (messageId: string) => {
  try {
    const updatedMessage = await databases.updateDocument(
      config.databaseId,
      config.messagesCollectionId,
      messageId,
      {
        isRead: true,
      }
    );
    const formattedMessage: Message = {
      id: updatedMessage.$id,
      chatRoomId: updatedMessage.chatRoomId,
      user: {
        id: updatedMessage.users.$id,
        accountId: updatedMessage.users.accountId,
        username: updatedMessage.users.username,
        email: updatedMessage.users.email,
        avatar: updatedMessage.users.avatar,
        isSetupComplete: updatedMessage.users.isSetupComplete,
        age: updatedMessage.users.age,
        gender: updatedMessage.users.gender,
        race: updatedMessage.users.race,
        job: updatedMessage.users.job,
        activeTime: updatedMessage.users.activeTime,
        playStyle: updatedMessage.users.playStyle,
        server: updatedMessage.users.server,
        dataCenter: updatedMessage.users.dataCenter,
      },
      content: updatedMessage.content,
      createdAt: updatedMessage.$createdAt,
      isRead: updatedMessage.isRead,
    };

    return formattedMessage;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const createChatRoom = async (participants: string[]) => {
  try {
    // check if chat room already exists
    const existingChatRooms = await databases.listDocuments(
      config.databaseId,
      config.chatRoomsCollectionId,
      [
        Query.equal('participants', participants[0]),
        Query.equal('participants', participants[1]),
      ]
    );

    // if chat room exists, return its id
    const chatRoomExists = existingChatRooms.documents.find((chatRoom) => {
      const roomParticipants = chatRoom.participants;
      return (
        roomParticipants.includes(participants[0]) &&
        roomParticipants.includes(participants[1])
      );
    });
    if (chatRoomExists) return chatRoomExists.$id;

    // create new chat room
    const newChatRoom = await databases.createDocument(
      config.databaseId,
      config.chatRoomsCollectionId,
      ID.unique(),
      { participants, messages: null }
    );
    return newChatRoom.$id;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const getChatRoomById = async (
  chatRoomId: string,
  userId: string
): Promise<ChatRoomType> => {
  try {
    const chatRoom = await databases.getDocument(
      config.databaseId,
      config.chatRoomsCollectionId,
      chatRoomId
    );
    const opponentId = chatRoom.participants.filter(
      (participantId: string) => participantId !== userId
    )[0];

    let opponent: User | null = null;
    if (opponentId) {
      opponent = await getUser(opponentId);
    }

    const lastMessage = chatRoom.messages
      ? {
          id: chatRoom.messages.$id,
          chatRoomId: chatRoom.$id,
          user: {
            id: chatRoom.messages.users.$id,
            accountId: chatRoom.messages.users.accountId,
            username: chatRoom.messages.users.username,
            email: chatRoom.messages.users.email,
            avatar: chatRoom.messages.users.avatar,
            isSetupComplete: chatRoom.messages.users.isSetupComplete,
            age: chatRoom.messages.users.age,
            gender: chatRoom.messages.users.gender,
            race: chatRoom.messages.users.race,
            job: chatRoom.messages.users.job,
            activeTime: chatRoom.messages.users.activeTime,
            playStyle: chatRoom.messages.users.playStyle,
            server: chatRoom.messages.users.server,
            dataCenter: chatRoom.messages.users.dataCenter,
          } as User,
          content: chatRoom.messages.content,
          createdAt: chatRoom.messages.$createdAt,
          isRead: chatRoom.messages.isRead,
        }
      : null;

    const formattedChatRoom: ChatRoomType = {
      id: chatRoom.$id,
      lastMessage,
      opponent,
      updatedAt: chatRoom.$updatedAt,
    };

    return formattedChatRoom;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const subscribeToMessages = (
  chatRoomId: string,
  setMessages: (updateFn: (messages: Message[]) => Message[]) => void
) => {
  const unsubscribe = client.subscribe(
    `databases.${config.databaseId}.collections.${config.messagesCollectionId}.documents`,
    async (response) => {
      const payload = response.payload as {
        $id: string;
        chatRoomId: string;
      };
      const message = await databases.getDocument(
        config.databaseId,
        config.messagesCollectionId,
        payload.$id
      );
      const formattedMessage = {
        id: message.$id,
        chatRoomId: message.chatRoomId,
        user: {
          id: message.users.$id,
          accountId: message.users.accountId,
          username: message.users.username,
          email: message.users.email,
          avatar: message.users.avatar,
          isSetupComplete: message.users.isSetupComplete,
          age: message.users.age,
          gender: message.users.gender,
          race: message.users.race,
          job: message.users.job,
          activeTime: message.users.activeTime,
          playStyle: message.users.playStyle,
          server: message.users.server,
          dataCenter: message.users.dataCenter,
        } as User,
        content: message.content,
        createdAt: message.$createdAt,
        isRead: message.isRead,
      };

      if (payload.chatRoomId === chatRoomId) {
        setMessages((messages) => {
          const exists = messages.some((msg) => msg.id === formattedMessage.id);
          if (!exists) {
            return [...messages, formattedMessage];
          }
          return messages;
        });
      }
    }
  );
  return unsubscribe;
};
