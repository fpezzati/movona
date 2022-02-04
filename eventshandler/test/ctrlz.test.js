/*
# Ctrlz
Ctrlz keeps an application's state copy and a collection of already occurred events.

User wants to return back to, let's say three events earlier in time. Ctrlz pick state copy and applies all the events he stored
minus three.

Ctrlz does not need Eventbus, but Eventbus is Ctrlz's natural symbiont.

## How do Ctrlz interact with Eventbus? Or is Eventbus interacting with Ctrlz?
Eventbus handle events. Events arrive always with status. While finished handling the event, Eventbus pass it and status to Ctrlz.
Ctrlz stores status if none and store event if there are free slots. Ctrlz does not care if event is good or wrong.

So Eventbus and Ctrlz are completely separated tools developer can use as components.

## What happen when a new event arrives and Ctrlz's queue is full?
Ctrlz pick the oldest event in queue and pass it along with state to component that is able to handle it. Ctrlz expect component returns
an updated state. Ctrlz does not care who component really is, if no component is provided he simply uses the latest reliable state he
stores.
Oldest event is removed from queue, even if no component is provided.

-TESTS

As event arrives, if status is not 'undefined', Ctrl puts event in queue only.

As event arrives, if status is not 'undefined' and queue is full, a special event is dispatched with a copy of status and the first
event in queue. Say 'n' is the size of the queue, that event will trigger update of the 'n' old status by something(?) who knows how
to manage that 'n' event to obtain an 'n-1' in time status. Event sent is removed from the queue.

Ctrlz provides an handler to manage 'return at status x in time': handler manage an event shipping status and all the events in queue that
occurr after x. Handler dispatch all the events in the message one by one in the given order and collect returned status. Event sent are
not consumed and won't be removed from queue.
*/
var tape = require('tape');
var lodash = require('lodash');
import Ctrlz from '../src/ctrlz.js';

/*
Ctrlz is created with an 'undefined' as status to keep and an empty events queue.
*/
tape('Ctrlz is created with undefined as status and an empty events queue.', function(assert){
  var sut = new Ctrlz;
  assert.ok(brandNewCtrlzHasUndefinedStatusAndEmptyEventQueue(sut));
  assert.end();
});

function brandNewCtrlzHasUndefinedStatusAndEmptyEventQueue(ctrlz) {
  return lodash.isUndefined(ctrlz.status) && lodash.isEmpty(ctrlz.eventqueue);
};

/*
If no queue size is specified, default max size is 10.
*/
tape('Ctrlz set a default value of 10 as queue max size if no value is provided.', function(assert){
  var sut = new Ctrlz;
  assert.equals(sut.queueMaxSize, 10, '10 is the default Ctrlz\'s queue max size');
  assert.end();
});

/*
Ctrlz's queue is empty and an event arrives. Because queue is empty, state is updated too.
*/
tape('Ctrlz stores in the queue the first event that comes and updates its state.', function(assert){
  var sut = new Ctrlz;
  var command = { say: "hello" };
  var state = { hello_count: 0 };
  sut.accept(command, state);
  assert.ok(ctrlzStoresStateAndEvents(sut, [ command ], state));
  assert.end();
});

/*
Ctrlz's queue already stores 3 events and an event arrives. Ctrlz's state is left unchanged.
*/
tape('Ctrlz stores the third incoming event in queue\'s third position.', function(assert){
  var sut = new Ctrlz;
  sut.accept({ add: 1 }, { count: 0 });
  sut.accept({ add: 2 }, { count: 1 });
  sut.accept({ add: 3 }, { count: 3 });
  assert.ok(ctrlzStoresStateAndEvents(sut, [{ add: 1 }, { add: 2 }, { add: 3 }], { count: 0 }));
  assert.end();
});

function ctrlzStoresStateAndEvents(ctrlz, commands, state) {
  return lodash.isEqual(ctrlz.queue, commands) && lodash.isEqual(ctrlz.state, state);
};

/*
## What happen when a new event arrives and Ctrlz's queue is full?
Ctrlz pick the oldest event in queue and pass it along with state to component that is able to handle it. Ctrlz expect component returns
an updated state. Ctrlz does not care who component really is, if no component is provided he simply uses the latest reliable state he
stores.
Oldest event is removed from queue, even if no component is provided.


Ctrlz's queue is full and an event arrives.
*/

tape('Ctrlz has a default handler that listen for events to store them.', function(assert) {
  var sut = new Ctrlz;
  fillCtrlzQueue(sut, getTenCommands());
  sut.accept({ add: 10 }, { count: 45 });
  assert.ok(ctrlzStoresStateAndEvents(sut, getExpectedTenCommands(), { count: 0 }));
  assert.end();
});

function getTenCommands() {
  return [
    { add: 0 }, { add: 1 }, { add: 2 }, { add: 3 }, { add: 4 },
    { add: 5 }, { add: 6 }, { add: 7 }, { add: 8 }, { add: 9 }
  ];
}

function getExpectedTenCommands() {
  var expected = getTenCommands();
  expected = expected.slice(1);
  expected.push({ add: 10 });
  return expected;
}

function fillCtrlzQueue(sut, commands) {
  commands.forEach(command => { sut.accept(command, { count: 0 }); });
}
