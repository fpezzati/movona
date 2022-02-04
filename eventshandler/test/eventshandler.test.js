var tape = require('tape');
var lodash = require('lodash');
import { EventsHandler, Eventbus, Ctrlz } from '../src/eventshandler.js';

/*
Combining Eventbus and Ctrlz allows to manage events and back-in-time effect.
*/
tape('Eventbus and Ctrlz manage a back-in-time event', function(assert) {
  var eventshandler = new EventsHandler(new Eventbus, new Ctrlz);
  var state = { count: 0 };
  eventshandler.eventbus.handlers.set("add", getAddHandler());
  getTenEvents().forEach(evt => {
    state = eventshandler.accept(evt, state);
  });
  assert.ok(lodash.isEqual({ count: 45 }, state));
  state = eventshandler.accept({ command: "ctrlz", howmany: 2}, state);
  assert.ok(lodash.isEqual({ count: 28 }, state));
  assert.end();
});

function getAddHandler() {
  return { behave: function(msg, state) {
    state.count = state.count + msg.payload;
    return state;
  }};
}

function getTenEvents() {
  return [
    { command: 'add', payload: 0 }, { command: 'add', payload: 1 }, { command: 'add', payload: 2 },
    { command: 'add', payload: 3 }, { command: 'add', payload: 4 }, { command: 'add', payload: 5 },
    { command: 'add', payload: 6 }, { command: 'add', payload: 7 }, { command: 'add', payload: 8 },
    { command: 'add', payload: 9 }
  ];
}
