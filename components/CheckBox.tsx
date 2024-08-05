import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface CheckBoxProps {
  title: string;
  titleStyle?: string;
  options: string[];
  value: string[];
  onChange: (selectedOptions: string[]) => void;
}

const CheckBox = ({
  title,
  titleStyle,
  options,
  value,
  onChange,
}: CheckBoxProps) => {
  const [selected, setSelected] = useState<string[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handlePress = (option: string) => {
    const updatedSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    setSelected(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <View className='w-full my-4 space-y-2'>
      <Text className={`font-pbold text-xl ${titleStyle}`}>{title}</Text>
      <View className='flex flex-row flex-wrap gap-y-2'>
        {options.map((option) => (
          <View key={option} className='flex-row items-center'>
            <BouncyCheckbox
              size={25}
              fillColor='#358BBC'
              unFillColor='#FFFFFF'
              text={option}
              textStyle={{
                fontFamily: 'Poppins-semibold',
                color: '#000',
                textDecorationLine: 'none',
              }}
              iconStyle={{ borderRadius: 5 }}
              innerIconStyle={{ borderColor: 'transparent' }}
              onPress={() => handlePress(option)}
              isChecked={selected.includes(option)}
              style={{ marginVertical: 5 }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CheckBox;
