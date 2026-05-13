import React from 'react';
import { View } from 'react-native';

export default function LinearGradient({ colors, style, children, ...props }) {
  const bg = Array.isArray(colors) && colors.length > 0
    ? colors[0].replace(/ 0%| 100%| 0\.33%| 99\.75%/g, '')
    : '#4C1D80';
  return (
    <View style={[style, { backgroundColor: bg }]} {...props}>
      {children}
    </View>
  );
}
