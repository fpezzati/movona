var tape = require('tape');
var lodash = require('lodash');
import Addplace from '../../src/features/addplace.js';

/*
Addplace is an handler, it allows user to add a geographical place (a point) to the document map.

- document map is in state, it cannot be null.
- what if place is null?
- does addplacetomap handles geojson?
- does addplacetomap bother about epsg?
- what if place occurs on a existing track?
- what if place occurs into something else?
*/

/*
sut has a command property valued as 'addplace'.
*/
tape('sut has a command property valued "addplace".', function(assert){
  var sut = new Addplace;
  assert.ok(lodash.isEqual(sut.command, 'addplace'));
  assert.end();
});

/*
if sut handles a null state or a state without a document map, he simply bubbles up the error.
*/
tape('if state is null, undefined or has no document_map, sut bubbles up the error.', function(assert){
  var sut = new Addplace;
  var point = { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [4.921875, 49.15296965617042] } };
  assert.throws(() => {
    sut.behave({ payload: point }, {});
  }, { message: 'undefined or empty state or no document_map provided' }, 'Undefined or null document_map is bubbled to caller.');
  assert.end();
});

/*
if given geojson is invalid, sut throws an error.
*/
tape('if geojson in payload is not valid, sut raises an exception.', function(assert){
  var sut = new Addplace;
  var point = { "type": "Feature", "properties": {}, "geometry": { "type": "poinz", "coordinates": [5.5, 5.44] } };
  assert.throws(() => {
    sut.behave( { payload: point }, { document_map: {} });
  }, { message: 'invalid geojson element', geometry: point }, 'Invalid geojson element passed.');
  assert.end();
});

/*
if given geojson is valid, sut merges geometry in document_map
*/
tape('if geojson in payload is valid, sut merges that geometry in state document_map', function(assert){
  var sut = new Addplace;
  var point = { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [5.5, 5.44] } };
  var expected = { document_map: pushFeatureIntoGeoJsonDoc(getABrokenLine(), point) };
  var actual = sut.behave({ payload: point }, { document_map: getABrokenLine() });
  assert.ok(lodash.isEqual(actual, expected));
  assert.end();
});

function getABrokenLine() {
  return {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            10.01953125,
            44.902577996288876
          ],
          [
            14.501953124999998,
            41.343824581185686
          ],
          [
            16.2158203125,
            39.87601941962116
          ],
          [
            16.3916015625,
            38.788345355085625
          ],
          [
            16.1279296875,
            38.272688535980976
          ]
        ]
      }
    }
  ]
}
};

function pushFeatureIntoGeoJsonDoc(geojsonDoc, featureToPush) {
  geojsonDoc.features.push(featureToPush);
  return geojsonDoc;
};
