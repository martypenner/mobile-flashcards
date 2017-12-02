import './src/side-effects';

import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AddCard from './src/components/AddCard';
import StartQuiz from './src/components/AddCard';
import AddDeck from './src/components/AddDeck';
import DeckDetail from './src/components/DeckDetail';
import DeckList from './src/components/DeckList';

const Decks = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      header: null
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: '+ Add Deck',
      headerTitle: 'Add Deck'
    }
  }
});

const RootNavigator = StackNavigator({
  Decks: {
    screen: Decks,
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
