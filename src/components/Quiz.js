import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { componentFromStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs/Rx';

import { decks$ } from '../streams';
import Button from './Button';

const Quiz = componentFromStream(props$ => {
  const { handler: chooseCorrect, stream: correct$ } = createEventHandler();
  const { handler: chooseIncorrect, stream: incorrect$ } = createEventHandler();
  const { handler: showQuestion, stream: showQuestion$ } = createEventHandler();
  const {
    handler: updateQuestionNumber,
    stream: questionNumber$
  } = createEventHandler();

  const answerQuestion$ = Observable.merge(correct$, incorrect$)
    .withLatestFrom(questionNumber$.startWith(0), (_, number) => number)
    .do(number => updateQuestionNumber(number + 1));

  const answers$ = Observable.merge(
    correct$.mapTo(true),
    incorrect$.mapTo(false)
  ).withLatestFrom(questionNumber$, (isCorrect, questionNumber) => ({
    [questionNumber]: isCorrect
  }));

  return Observable.combineLatest(
    props$.mergeMap(props =>
      decks$.map(decks => decks[props.navigation.state.params.deckId])
    ),
    showQuestion$.startWith(true),
    questionNumber$.startWith(0),
    answerQuestion$.startWith(null),

    (deck, shouldShowQuestion, questionNumber) => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 20
        }}>
        <Text style={{ position: 'absolute', left: 10, fontSize: 13 }}>
          {questionNumber + 1} / {deck.data.length}
        </Text>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>
            {shouldShowQuestion
              ? deck.data[questionNumber].question
              : deck.data[questionNumber].answer}
          </Text>
          <View style={{ marginTop: 10 }}>
            {shouldShowQuestion ? (
              <TouchableOpacity onPress={() => showQuestion(false)}>
                <Text style={{ fontSize: 13, color: '#bb0000' }}>
                  Show Answer
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => showQuestion(true)}>
                <Text style={{ fontSize: 13, color: '#bb0000' }}>
                  Show Question
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <Button
            style={{
              backgroundColor: 'green',
              borderColor: 'green',
              marginBottom: 10
            }}
            onPress={chooseCorrect}>
            <Text style={{ fontSize: 20, color: 'white' }}>Correct</Text>
          </Button>
          <Button
            style={{ backgroundColor: '#bb0000', borderColor: 'red' }}
            onPress={chooseIncorrect}>
            <Text style={{ fontSize: 20, color: 'white' }}>Incorrect</Text>
          </Button>
        </View>
      </View>
    )
  );
});

export default Quiz;
