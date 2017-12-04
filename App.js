import './src/side-effects';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AddCard from './src/components/AddCard';
import AddDeck from './src/components/AddDeck';
import DeckDetail from './src/components/DeckDetail';
import DeckList from './src/components/DeckList';
import Quiz from './src/components/Quiz';
import { setLocalNotification } from './src/helpers';

const Decks = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialCommunityIcons
          name={focused ? 'cards' : 'cards-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTitle: 'Add Deck',
      tabBarLabel: '+ Add Deck',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo
          name={focused ? 'add-to-list' : 'add-to-list'}
          size={26}
          style={{ color: tintColor }}
        />
      )
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
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTitle: 'Quiz'
    }
  }
});

class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return <RootNavigator />;
  }
}

export default App;
