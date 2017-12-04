import React from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { componentFromStream } from 'recompose';

import { decks$ } from '../streams';
import H1 from './H1';
import NumCards from './NumCards';

export default componentFromStream(props$ =>
  props$.combineLatest(decks$, ({ navigation }, decks) => (
    <View style={{ marginTop: 50 }}>
      {Object.values(decks).length > 0 ? (
        <SectionList
          sections={Object.values(decks)}
          renderItem={() => null}
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
      ) : (
        <Text style={{ marginHorizontal: 10, textAlign: 'center' }}>
          It looks like you don't have any decks! Add some now so you can start
          quizzing yourself!
        </Text>
      )}
    </View>
  ))
);
