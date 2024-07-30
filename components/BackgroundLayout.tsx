import { ImageBackground } from 'react-native';

const BackgroundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageBackground
      source={require('../assets/images/ff14BG.jpg')}
      style={{ flex: 1 }}
    >
      {children}
    </ImageBackground>
  );
};

export default BackgroundLayout;
