import { Observable } from 'rxjs';

export const decks$ = Observable.of([
  {
    key: 'hi',
    title: 'hi',
    data: [{ key: 'hi', question: 'abc', answer: 'def' }]
  }
]);
