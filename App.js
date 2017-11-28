import './src/side-effects';

import React from 'react';
import { View } from 'react-native';

import DeckList from './src/components/DeckList';

export default class App extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <DeckList />
      </View>
    );
  }
}
