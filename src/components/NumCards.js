import React from 'react';
import { Text } from 'react-native';

const NumCards = ({ cards }) => (
  <Text style={{ fontSize: 15, color: 'gray' }}>
    {cards.length} card{cards.length === 0 || cards.length > 1 ? 's' : ''}
  </Text>
);

export default NumCards;
