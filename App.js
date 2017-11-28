import './src/side-effects';

import { Container, Content } from 'native-base';
import React from 'react';

import DeckList from './src/components/DeckList';

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <DeckList />
        </Content>
      </Container>
    );
  }
}
