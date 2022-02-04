/*
Tests about the eventbus.
*/
var tape = require('tape');
var lodash = require('lodash');
import Eventbus from '../src/eventbus.js';

/*
sut came with a default handler.
*/
tape('Eventbus provides a default handler', function(assert) {
  var defaultHandler = { command: "default", behave: function(msg) { console.log("Not aware of: " + JSON.stringify(msg))} };
  var sut = new Eventbus;
  assert.ok(newSutCameWithASingleDefaultHandler(sut), 'Eventbus: should have a single default handler.');
  assert.end();
});

function newSutCameWithASingleDefaultHandler(sut) {
  return sut.handlers.size == 1 && typeof sut.handlers.get('default') === 'function';
};

/*
when eventbus receives a message with no 'command', he discard it and returns a copy of state immutated.
*/
tape('Eventbus receives a message with no "command", he dumps it.', function(assert) {
  var message = {};
  var state = { say: "hello" };
  var sut = new Eventbus;
  assert.ok(lodash.isEqual({ say: "hello" }, sut.accept(message, state)), 'Eventbus: state should be kept intact when message has no "command".');
  assert.end();
});

/*
when eventbus receives a message with a 'command' he is not aware of, he discard it and returns a copy of state immutated.
*/
tape('Eventbus receives a message with a "command" he is not aware of, he discard it and returns a copy of state immutated.', function(assert) {
  var message = { command: "dosomething" };
  var state = { say: "hello" };
  var sut = new Eventbus;
  assert.ok(lodash.isEqual({ say: "hello" }, sut.accept(message, state)), 'Eventbus: state should be kept intact when message has unmanageable "command".');
  assert.end();
});

/*
eventbus always returns a copy of the managed state, even if managed state was left unchanged while handling.
*/
tape('Eventbus always returns a copy of the managed state.', function(assert) {
  var message = {};
  var state = { say: "hello" };
  var sut = new Eventbus;
  assert.ok(statesAreEqualButNotTheSameObject(state, sut.accept(message, state)), 'Eventbus: state should a copy not the same object.');
  assert.end();
});

function statesAreEqualButNotTheSameObject(originalState, copyState) {
  return lodash.isEqual(originalState, copyState) && originalState !== copyState;
};

/*
when a wrong handler is setted, eventbus manage the error and returns an immutated copy of state.
*/
tape('Eventbus handles a message with an invalid handler, he manage the error and returns an immutated copy of state.', function(assert) {
  var message = { command: "dosomething" };
  var state = { say: "hello" };
  var sut = new Eventbus;

  var badHandler = {
    command: "dosomething",
    behave: function(msg, state) {
      throw 'Unexpected error!';
    }
  }

  sut.handlers.set("dosomething", badHandler);
  assert.ok(lodash.isEqual({ say: "hello" }, sut.accept(message, state)), 'Eventbus: state should be kept intact when message is managed by wrong or invalid handler.');
  assert.end();
});

/*
when eventbus receives a message with a 'command' he is aware of, he passes the message to the handler and returns an updated copy of state.
*/
tape('Eventbus receives a message he can handle, he passes a copy of message and a copy of the state to the proper handler.', function(assert) {
  var message = { command: "dosomething" };
  var state = { say: "hello" };
  var sut = new Eventbus;

  var someHandler = {
    command: "dosomething",
    behave: function(msg, state) {
      state.name = "Joe";
      return state;
    }
  }

  sut.handlers.set("dosomething", someHandler);
  assert.ok(statesAreEqualButNotTheSameObject({ say: "hello", name: "Joe" }, sut.accept(message, state)), 'Eventbus: state should be updated accordingly by adding a "name" valued "Joe" property.');
  assert.end();
});
