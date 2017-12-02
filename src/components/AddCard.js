import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { componentFromStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs/Rx';

import { decks$ } from '../streams';
import Button from './Button';

const AddCard = componentFromStream(props$ => {
  const { handler: changeQuestion, stream: question$ } = createEventHandler();
  const { handler: changeAnswer, stream: answer$ } = createEventHandler();

  return Observable.combineLatest(
    question$.startWith(''),
    answer$.startWith(''),
    props$.switchMap(props =>
      decks$
        .map(decks =>
          decks.find(deck => props.navigation.state.params.deckId === deck.key)
        )
        .tag('add card')
    ),
    (question, answer, props) => {
      const canSubmit = question.length && answer.length;

      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 20
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
              placeholder="Question"
              onChangeText={text => changeQuestion(text)}
              value={question}
            />
          </View>
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
              placeholder="Answer"
              onChangeText={text => changeAnswer(text)}
              value={answer}
            />
          </View>

          <Button onPress={() => {}} disabled={!canSubmit}>
            <Text
              style={[
                { fontSize: 20 },
                canSubmit
                  ? {}
                  : { backgroundColor: 'light-gray', color: 'gray' }
              ]}>
              Submit
            </Text>
          </Button>
        </View>
      );
    }
  );
});

export default AddCard;
