// @flow

import {DataStore, HttpStore} from 'noms';
import queryString from 'query-string';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import Root from './root.js';

window.onload = window.onhashchange = render;

const nomsServer: ?string = process.env.NOMS_SERVER;
if (!nomsServer) {
  throw new Error('NOMS_SERVER not set');
}

function updateQuery(qs: {[key: string]: string}) {
  location.hash = queryString.stringify(qs);
}

function render() {
  const qs = Object.freeze(queryString.parse(location.hash));
  const target = document.getElementById('root');
  const store = new DataStore(new HttpStore(nomsServer));

  ReactDOM.render(
      <Root qs={qs} store={store} updateQuery={updateQuery}/>,
      target);
}
