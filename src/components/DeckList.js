import React from 'react';
import { SectionList, Text, View } from 'react-native';
import { componentFromStream } from 'recompose';

import { decks$ } from '../streams';

export default componentFromStream(props$ => {
  return props$.combineLatest(decks$.startWith(null), (_, decks) => (
    <View style={{ marginTop: 50 }}>
      <SectionList
        sections={decks}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
      />
    </View>
  ));
});
