import { H1, Text } from 'native-base';
import React from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
import { componentFromStream } from 'recompose';

import { decks$ } from '../streams';
import NumCards from './NumCards';

export default componentFromStream(props$ =>
  props$.combineLatest(decks$, ({ navigation }, decks) => (
    <View style={{ marginTop: 50 }}>
      <SectionList
        sections={Object.values(decks)}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: 'black',
              padding: 20
            }}
            onPress={() =>
              navigation.navigate('DeckDetail', {
                deckId: section.key,
                title: section.title
              })
            }>
            <H1>{section.title}</H1>

            <NumCards cards={section.data} />
          </TouchableOpacity>
        )}
      />
    </View>
  ))
);
