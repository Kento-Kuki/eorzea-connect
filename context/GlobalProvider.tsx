import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCurrentUser } from '../lib/appwrite';
import { User } from '@/types/User';
import { IPostForm, Post } from '@/types/Post';

// Context の型を定義
interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  postData: IPostForm | Post | null;
  setPostData: React.Dispatch<React.SetStateAction<IPostForm | Post | null>>;
}

// デフォルト値には undefined を設定
const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  postData: null,
  setPostData: () => {},
});

// useGlobalContext フック
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider コンポーネント
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<IPostForm | Post | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        postData,
        setPostData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
