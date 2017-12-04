import React from 'react';
import { Text } from 'react-native';

const H1 = ({ children, ...rest }) => (
  <Text style={{ fontSize: 27, lineHeight: 32 }} {...rest}>
    {children}
  </Text>
);

export default H1;
