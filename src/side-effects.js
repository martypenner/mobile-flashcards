import 'es6-symbol/implement';
import 'rxjs-spy/add/operator/tag';

import { setObservableConfig } from 'recompose';
import rxjsconfig from 'recompose/rxjsObservableConfig';

setObservableConfig(rxjsconfig);

if (__DEV__) {
  const { log, spy } = require('rxjs-spy');

  spy();
  log();
}
