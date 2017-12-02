import { AsyncStorage } from 'react-native';
import { createEventHandler } from 'recompose';
import { Observable } from 'rxjs';
import uuid from 'uuid/v4';

const ROOT_STORAGE_KEY = 'decks';

const { handler: updateDecks, stream: _decks$ } = createEventHandler();

const getDecks = () =>
  Observable.defer(() => AsyncStorage.getItem(ROOT_STORAGE_KEY))
    .map(decks => JSON.parse(decks) || {})
    .tag('storage/decks');

export const decks$ = getDecks()
  .mergeMap(decks => _decks$.startWith(decks))
  .tag('decks');

export const saveDeck = ({ id, title }) =>
  decks$
    .map(decks => ({
      ...decks,
      [id]: {
        key: id,
        title,
        data: []
      }
    }))
    .take(1)
    .do(decks => updateDecks(decks))
    .tag('save deck');

export const saveCard = ({ deckId, question, answer }) =>
  decks$
    .map(decks => ({
      ...decks,
      [deckId]: {
        ...decks[deckId],
        data: [...decks[deckId].data, { key: uuid(), question, answer }]
      }
    }))
    .take(1)
    .do(decks => updateDecks(decks))
    .tag('save card');

// Write to disk whenever decks are updated
_decks$
  .mergeMap(decks =>
    AsyncStorage.setItem(ROOT_STORAGE_KEY, JSON.stringify(decks))
  )
  .subscribe();
