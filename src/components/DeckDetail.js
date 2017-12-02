import { H1 } from 'native-base';
import { Text } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { componentFromStream } from 'recompose';

import { decks$ } from '../streams';
import NumCards from './NumCards';

const DeckDetail = componentFromStream(props$ =>
  props$.switchMap(props =>
    decks$
      .map(decks =>
        decks.find(deck => props.navigation.state.params.id === deck.key)
      )
      .tag('deck detail')
      .map(deck => (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20
          }}>
          <View>
            <H1>{deck.title}</H1>

            <NumCards cards={deck.data} />
          </View>

          <View style={{ marginVertical: 20 }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 3,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 10
              }}
              onPress={() => {}}>
              <Text style={{ fontSize: 20 }}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: 'black',
                borderWidth: 1,
                borderRadius: 3,
                paddingHorizontal: 10,
                paddingVertical: 5
              }}
              onPress={() => {}}>
              <Text style={{ fontSize: 20, color: 'white' }}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
  )
);

DeckDetail.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.state.params.title
});

export default DeckDetail;
