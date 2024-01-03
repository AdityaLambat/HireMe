import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, fontSize:20, fontWeight: '700'}}
          secureTextEntry={true}
    
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, fontSize:20, fontWeight: '700'}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '900'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
