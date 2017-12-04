import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { componentFromStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs/Rx';

import { clearLocalNotification, setLocalNotification } from '../helpers';
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
  const { handler: restartQuiz, stream: restartQuiz$ } = createEventHandler();

  const answerQuestion$ = Observable.merge(correct$, incorrect$)
    .withLatestFrom(
      questionNumber$.startWith(0),
      (answer, questionNumber) => questionNumber
    )
    .do(questionNumber => updateQuestionNumber(questionNumber + 1))
    .do(() => showQuestion(true));

  const answers$ = Observable.merge(
    correct$.mapTo(true),
    incorrect$.mapTo(false)
  )
    .withLatestFrom(questionNumber$.startWith(0), (answer, questionNumber) => ({
      questionNumber,
      answer
    }))
    .mergeScan(
      (answers, { questionNumber, answer }) =>
        Observable.merge(
          restartQuiz$.mapTo({}),
          Observable.of({
            ...answers,
            [questionNumber]: answer
          })
        ),
      {}
    )
    .startWith({});

  const quizCompleted$ = answers$
    .withLatestFrom(
      props$,
      decks$,
      (answers, props, decks) =>
        Object.values(answers).length ===
        decks[props.navigation.state.params.deckId].data.length
    )
    .startWith(false);

  const updateLocalNotification$ = quizCompleted$
    .filter(completed => completed)
    .mergeMap(() => clearLocalNotification().then(setLocalNotification))
    .startWith(null);

  const correctAnswers$ = answers$.map(
    answers => Object.values(answers).filter(answer => answer).length
  );

  return Observable.combineLatest(
    props$,
    props$.mergeMap(props =>
      decks$.map(decks => decks[props.navigation.state.params.deckId])
    ),
    showQuestion$.startWith(true),
    questionNumber$.startWith(0),
    quizCompleted$.startWith(false),
    correctAnswers$,
    answerQuestion$.startWith(null),
    restartQuiz$
      .do(() => updateQuestionNumber(0))
      .do(() => showQuestion(true))
      .startWith(null),
    updateLocalNotification$,

    (
      props,
      deck,
      shouldShowQuestion,
      questionNumber,
      quizCompleted,
      correctAnswers
    ) => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 20
        }}>
        {quizCompleted ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
              You got {correctAnswers} correct answer{correctAnswers === 0 ||
              correctAnswers > 1
                ? 's'
                : ''}{' '}
              out of a possible {deck.data.length}!
            </Text>

            <Button
              style={{ width: 200, marginBottom: 5 }}
              onPress={restartQuiz}>
              <Text style={{ fontSize: 15 }}>Restart Quiz</Text>
            </Button>

            <Text style={{ marginBottom: 5 }}>Or</Text>

            <Button
              style={{ width: 200 }}
              onPress={() => props.navigation.goBack()}>
              <Text style={{ fontSize: 15 }}>Go Back to {deck.title}</Text>
            </Button>
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View>
              <Text style={{ position: 'absolute', left: 10, fontSize: 13 }}>
                {questionNumber + 1} / {deck.data.length}
              </Text>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
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

              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Button
                  style={{
                    width: 200,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    marginBottom: 10
                  }}
                  onPress={chooseCorrect}>
                  <Text style={{ fontSize: 20, color: 'white' }}>Correct</Text>
                </Button>
                <Button
                  style={{
                    width: 200,
                    backgroundColor: '#bb0000',
                    borderColor: 'red'
                  }}
                  onPress={chooseIncorrect}>
                  <Text style={{ fontSize: 20, color: 'white' }}>
                    Incorrect
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  );
});

export default Quiz;
