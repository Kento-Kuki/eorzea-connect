import { Post } from '@/types/Post';
import { IUserForm, User } from '@/types/User';
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.kento.eorzeaconnect',
  projectId: '66a91139003b3dd3bcee',
  databaseId: '66a91312000bb4d4ce75',
  userCollectionId: '66a9133f003ac403877a',
  postsCollectionId: '66a9137d0029c55d307a',
  storageId: '66a914bd00338fb24fe6',
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
    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      userData
    );
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.postsCollectionId
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
