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

class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
  }

  render() {
    return <RootNavigator />;
  }
}

export default App;
