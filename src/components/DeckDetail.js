import { H1, Text } from 'native-base';
import React from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
import {
  componentFromStream,
  compose,
  setStatic,
  hoistStatics
} from 'recompose';

import { decks$ } from '../streams';

const DeckDetail = componentFromStream(props$ => {
  return props$.combineLatest(decks$.startWith(null), (_, decks) => (
    <View style={{ marginTop: 50 }}>
      <SectionList
        sections={decks}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: 'black',
              padding: 20
            }}>
            <H1>{section.title}</H1>

            <Text style={{ fontSize: 15, color: 'gray' }}>
              {section.data.length} card{section.data.length === 0 ||
              section.data.length > 1
                ? 's'
                : ''}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  ));
});

DeckDetail.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.state.params.title
});

// export default compose(
//   setStatic('navigationOptions', (props) => console.info(props) || { headerTitle: 'alskdfjsdlkfj' })
// )(DeckDetail);

export default DeckDetail;
