import 'dotenv/config';

export default {
  expo: {
    extra: {
      endpoint: process.env.APPWRITE_ENDPOINT,
      projectId: process.env.APPWRITE_PROJECT_ID,
      databaseId: process.env.APPWRITE_DATABASE_ID,
      userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID,
      postsCollectionId: process.env.APPWRITE_POSTS_COLLECTION_ID,
      bookmarksCollectionId: process.env.APPWRITE_BOOKMARKS_COLLECTION_ID,
      chatRoomsCollectionId: process.env.APPWRITE_CHAT_ROOMS_COLLECTION_ID,
      messagesCollectionId: process.env.APPWRITE_MESSAGES_COLLECTION_ID,
      storageId: process.env.APPWRITE_STORAGE_ID,
    },
  },
};
