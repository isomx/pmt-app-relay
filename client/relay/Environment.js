/* eslint-disable */
import { Observable } from 'rxjs/Observable';

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require("relay-runtime");

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {

  /**
  const req$ = Observable.ajax({
    url: 'http://localhost:3002/graphql',
    method: 'POST',
    responseType: 'json',
    crossDomain: true,
    withCredentials: true,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }).map(resp => resp.json())
  });
   **/
  console.log('variables = ', variables);
  return fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
    }).then(response => {
      //console.log('response = ', response.json());
      return response.json()
    })
});

const environment = new Environment({
  network,
  store,
});

export default environment;
