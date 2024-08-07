import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  labelStyles?: string;
  inputStyles?: string;
  inputTextStyles?: string;
  keyboardType?: string;
  placeholder?: string;
  error?: string | undefined;
}

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  labelStyles,
  inputTextStyles,
  inputStyles,
  keyboardType,
  placeholder,
  error,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base text-gray-100 font-pmedium ${labelStyles}`}>
        {title}
      </Text>
      <View
        className={`w-full h-16 px-4 rounded-2xl bg-gray-800 border-2 border-gray-800 focus:border-primary flex-row items-center ${inputStyles}`}
      >
        <TextInput
          className={`flex-1 text-white font-psemibold text-base ${inputTextStyles}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#9E9E9E'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                !showPassword
                  ? require('../assets/icons/eye.png')
                  : require('../assets/icons/eye-hide.png')
              }
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className='text-red-500 font-pmedium'>{error}</Text>}
    </View>
  );
};

export default FormField;
