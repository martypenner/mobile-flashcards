import './src/side-effects';

import React from 'react';
import { StackNavigator } from 'react-navigation';

import DeckDetail from './src/components/DeckDetail';
import DeckList from './src/components/DeckList';

const RootNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail
  }
});

export default RootNavigator;
