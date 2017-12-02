import { H1 } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { componentFromStream } from 'recompose';

import { decks$ } from '../streams';

const DeckDetail = componentFromStream(props$ =>
  props$.switchMap(props =>
    decks$
      .map(decks =>
        decks.find(deck => props.navigation.state.params.id === deck.key)
      )
      .tag('deck detail')
      .map(deck => (
        <View>
          <H1>{deck.title}</H1>
        </View>
      ))
  )
);

DeckDetail.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.state.params.title
});

export default DeckDetail;
