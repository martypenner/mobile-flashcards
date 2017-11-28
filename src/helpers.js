const getDecks = () => AsyncStorage.getItem('decks');

const getDeck = deckId => getDecks().then(decks => decks[deckId]);

const addDeck = title =>
  getDecks().then(decks => ({ ...decks, [title]: { title, questions: [] } }));

const addCardToDeck = (title, question) =>
  getDecks().then(decks => ({
    ...decks,
    [title]: {
      ...decks[title],
      questions: [...decks[title]['questions'], question]
    }
  }));
