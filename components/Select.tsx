import { View, Text } from 'react-native';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';

interface SelectProps {
  title: string;
  value: string | null;
  data: { label: string; value: string }[];
  placeholder?: string;
  position?: 'top' | 'bottom';
  containerStyle?: string;
  titleStyle?: string;
  onChange: (value: string) => void;
}

const Select = ({
  title,
  value,
  data,
  placeholder,
  position = 'bottom',
  containerStyle,
  titleStyle,
  onChange,
}: SelectProps) => {
  return (
    <View className={`space-y-1 ${containerStyle}`}>
      <Text className={`text-black font-pmedium ${titleStyle}`}>{title}</Text>
      <Dropdown
        style={{
          height: 40,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 4,
          paddingHorizontal: 8,
          backgroundColor: 'white',
        }}
        data={data}
        placeholder={placeholder}
        placeholderStyle={{
          color: '#9E9E9E',
        }}
        labelField='label'
        valueField='value'
        value={value}
        onChange={(item) => onChange(item.value)}
        backgroundColor='rgba(0, 0, 0, 0.5)'
        containerStyle={{ borderRadius: 8, overflow: 'hidden' }}
        dropdownPosition={position}
      />
    </View>
  );
};

export default Select;
