var tape = require('tape');
var lodash = require('lodash');
import Newmap from '../../src/features/newmap.js';

/*
Sut has a command property valued as newmap.
*/
tape('sut has a command property valued as "newmap".', function(assert) {
  var sut = new Newmap;
  assert.ok(lodash.isEqual(sut.command, 'newmap'));
  assert.end();
});

/*
Sut creates a new map object replacing any existing one in application status.
*/
tape('sut substitutes the "document_map" object in application state with an empty object.', function(assert) {
  var sut = new Newmap;
  var actual = sut.behave({}, { document_map: getMap });
  assert.ok(lodash.isEqual(lodash.omit(actual, 'document_map.uuid'), { document_map: {} }));
  assert.end();
});

function getMap() {
    return {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              12.63427734375,
              43.54854811091286
            ]
          }
        }
      ]
    };
}
