import React from 'react';
import { Text, View } from 'react-native';
import { componentFromStream } from 'recompose';

import { decks$ } from '../streams';
import Button from './Button';
import H1 from './H1';
import NumCards from './NumCards';

const DeckDetail = componentFromStream(props$ =>
  props$.switchMap(({ navigation, ...props }) =>
    decks$
      .map(decks => decks[navigation.state.params.deckId])
      .tag('deck detail')
      .map(deck => (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20
          }}>
          <View style={{ alignItems: 'center' }}>
            <H1>{deck.title}</H1>

            <NumCards cards={deck.data} />
          </View>

          <View style={{ marginVertical: 20 }}>
            <Button
              style={{ marginBottom: 10 }}
              onPress={() =>
                navigation.navigate('AddCard', { deckId: deck.key })
              }>
              <Text style={{ fontSize: 20 }}>Add Card</Text>
            </Button>

            <Button
              style={{ backgroundColor: 'black' }}
              onPress={() => navigation.navigate('Quiz', { deckId: deck.key })}>
              <Text style={{ fontSize: 20, color: 'white' }}>Start Quiz</Text>
            </Button>
          </View>
        </View>
      ))
  )
);

DeckDetail.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.state.params.title
});

export default DeckDetail;
