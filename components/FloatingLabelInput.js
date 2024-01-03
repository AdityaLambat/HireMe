import React, { useState, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

const FloatingLabelInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(props.value ? 1 : 0);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || props.value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, props.value]);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        {...props}
        style={styles.textInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    fontSize: 24,
    color: '#000',
  },
});

export default FloatingLabelInput;
