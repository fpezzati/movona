var tape = require('tape');
var lodash = require('lodash');
import Scouter from '../src/scouter.js';
/*
Scouter is the main component that glues together all the features. To achieve this, scouter relies on
'eventshandler'.
*/

/*
scouter comes with an already initialized eventshandler attribute.
*/
tape('Scouter ships a ready-to-go "eventshandler" attribute.', function(assert){
  var sut = new Scouter;
  assert.ok((sut.eventshandler != undefined && !lodash.isEmpty(sut.eventshandler)));
  assert.end();
});

/*
scouter cover three features, a ctrlz handler and a default handler for a total of 6.
*/
tape('Scouter has 7 handlers.', function(assert) {
  var sut = new Scouter;
  assert.equal(sut.eventshandler.eventbus.handlers.size, 7);
  assert.end();
});

/*
scouter has a default handler to manage events he is not aware of. In this case, scouter's state is left
unmodified.
*/
tape('Scouter provides a default handler to manage events he is unaware of', function(assert){
  var sut = new Scouter;
  var actual = sut.accept({ command: "unknown", payload: "none" }, { map: {}, msg: "hello" });
  assert.ok(lodash.isEqual(actual, { map: {}, msg: "hello" }));
  assert.end();
});
