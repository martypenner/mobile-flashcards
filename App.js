import './src/side-effects';

import React from 'react';
import { StackNavigator } from 'react-navigation';

import AddCard from './src/components/AddCard';
import StartQuiz from './src/components/AddCard';
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
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTitle: 'Add Card'
    }
  },
  StartQuiz: {
    screen: StartQuiz,
    navigationOptions: {
      headerTitle: 'Add Card'
    }
  }
});

export default RootNavigator;
