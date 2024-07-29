import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  children,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      <Text className={`text-white font-pbold text-lg ${textStyles}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
