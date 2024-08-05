import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Separator = () => {
  return (
    <LinearGradient
      colors={[
        'rgba(23, 243, 245, 0) 0%',
        'rgba(23, 243, 245, 0.3) 25%',
        'rgba(23, 243, 245, 1) 50%',
        'rgba(23, 243, 245, 0.3) 75%',
        'rgba(23, 243, 245, 0) 100%',
      ]}
      style={{
        height: 5,
        width: '100%',
        borderRadius: 10,
        marginVertical: 5,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  );
};

export default Separator;
