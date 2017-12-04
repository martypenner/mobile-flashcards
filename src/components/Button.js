import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style = {}, ...props }) => (
  <TouchableOpacity
    {...props}
    style={[
      {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5
      },
      style
    ]}
    onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default Button;
