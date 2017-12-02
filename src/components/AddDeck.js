import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { componentFromStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs/Rx';
import uuid from 'uuid/v4';
import { NavigationActions } from 'react-navigation';

import { saveDeck } from '../streams';
import Button from './Button';

const AddDeck = componentFromStream(props$ => {
  const { handler: updateTitle, stream: title$ } = createEventHandler();
  const { handler: submit, stream: submit$ } = createEventHandler();

  return Observable.combineLatest(
    title$.startWith(''),
    props$
      .mergeMap(props =>
        submit$
          .withLatestFrom(title$, (_, title) => ({
            id: uuid(),
            title
          }))
          .mergeMap(deck =>
            saveDeck(deck).do(() =>
              props.navigation.dispatch(
                NavigationActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Decks' }),
                    NavigationActions.navigate({
                      routeName: 'DeckDetail',
                      params: { id: deck.id }
                    })
                  ]
                })
              )
            )
          )
      )
      .startWith(null),
    title => {
      const canSubmit = title.length;

      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 50
          }}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <TextInput
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderRadius: 3,
                marginHorizontal: 20,
                padding: 10
              }}
              placeholder="Deck Title"
              onChangeText={text => updateTitle(text)}
              value={title}
            />
          </View>

          <Button onPress={submit} disabled={!canSubmit}>
            <Text
              style={[{ fontSize: 20 }, canSubmit ? {} : { color: 'gray' }]}>
              Submit
            </Text>
          </Button>
        </View>
      );
    }
  );
});

export default AddDeck;
