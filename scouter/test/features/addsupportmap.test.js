var tape = require('tape');
var lodash = require('lodash');
import Addsupportmap from '../../src/features/addsupportmap.js';

/*
Addsupportmap allows user to add a document map to use as support while drawing.

- support map is in state, state cannot be null.
- what if support map is null?
- what if support map is not geojson?
- addsupportmap does not handle epsg
- addsupportmap replaces any existing support map
*/

/*
sut has a command property valued as 'addsupportmap'.
*/
tape('sut has a command property valued "addsupportmap".', function(assert) {
  var sut = new Addsupportmap;
  assert.ok(lodash.isEqual(sut.command, 'addsupportmap'));
  assert.end();
});

/*
if message's payload is null, sut raises an error.
*/
tape('if payload is null, sut raises an error', function(assert) {
  var sut = new Addsupportmap;
  var message = {
    command: 'addsupportmap'
  };
  var state = bareAndBoneState();
  assert.throws(() => {
    sut.behave(message, state);
  }, {
    message: 'undefined or empty or invalid payload provided.'
  });
  assert.end();
});

/*
if message's payload is not a valid geojson, sut bubbles the error up.
*/
tape('if payload is not a valid geojson document, sut raises an error', function(assert) {
  var sut = new Addsupportmap;
  var message = {
    command: 'addsupportmap',
    payload: {
      msg: 'hello'
    }
  };
  var state = bareAndBoneState();
  assert.throws(() => {
    sut.behave(message, state);
  }, {
    message: 'undefined or empty or invalid payload provided.'
  });
  assert.end();
});

/*
given a valid geojson document, sut sets that into state no matter if state is already shipping a support map.
*/
tape('given a valid geojson document as payload is not a valid geojson document, sut raises an error', function(assert) {
  var sut = new Addsupportmap;
  var message = {
    command: 'addsupportmap',
    payload: getASupportMap()
  };
  var state = bareAndBoneState();
  assert.ok(lodash.isEqual(sut.behave(message, state), bareAndBoneStateWithSupportMap()));
  assert.end();
});

function bareAndBoneState() {
  return {
    document_map: {
      "type": "FeatureCollection",
      "features": []
    }
  };
}

function getASupportMap() {
  return {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [ 11.214895248413086, 43.78045193576537 ],
            [ 11.210088729858398, 43.77543220024913 ],
            [ 11.212921142578125, 43.77388281405941 ],
            [ 11.213264465332031, 43.77313909442939 ],
            [ 11.220130920410156, 43.773820837776846 ],
            [ 11.221504211425781, 43.774192694508834 ],
            [ 11.222963333129883, 43.777415355994506 ],
            [ 11.214895248413086, 43.78045193576537 ]
          ]
        ]
      }
    }]
  };
}

function bareAndBoneStateWithSupportMap() {
  var document = bareAndBoneState();
  document.support_map = getASupportMap();
  return document;
}
