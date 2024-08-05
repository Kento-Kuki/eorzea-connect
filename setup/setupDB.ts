import { Client, Databases } from 'node-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '66a91139003b3dd3bcee',
  databaseId: '66a91312000bb4d4ce75',
  userCollectionId: '66a9133f003ac403877a',
  postsCollectionId: '66a9137d0029c55d307a',
  storageId: '66a914bd00338fb24fe6',
};

// Init your React Native SDK
const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId);

const databases = new Databases(client);

const createAttributes = async () => {
  try {
    await databases.createStringAttribute(
      config.databaseId,
      config.userCollectionId,
      'username',
      256,
      true
    );

    await databases.createEmailAttribute(
      config.databaseId,
      config.userCollectionId,
      'email',
      true
    );

    await databases.createUrlAttribute(
      config.databaseId,
      config.userCollectionId,
      'avatar',
      false
    );

    await databases.createStringAttribute(
      config.databaseId,
      config.userCollectionId,
      'accountId',
      256,
      true
    );

    await databases.createBooleanAttribute(
      config.databaseId,
      config.userCollectionId,
      'isSetupComplete',
      true
    );
  } catch (error) {
    console.log(error);
  }
};
