const tape = require('tape');
const lodash = require('lodash');
import RemoveFeature from '../../src/features/removefeature.js';

/*
Sut has a command property valued as remove_feature.
*/
tape('RemoveFeature has a command property valued as "remove_feature".', function(assert) {
  const sut = new RemoveFeature;
  assert.ok(lodash.isEqual(sut.command, 'remove_feature'));
  assert.end();
});

/*
When there is no match sut raises an exception.
*/
tape('RemoveFeature does nothing when there is no matching element', (assert) => {
  const msg = getMessage('1234');
  const expected = {
    "document_map": {
      "features": [
        { "type": "Feature", "properties": { id: '1', data: 'hey' } },
        { "type": "Feature", "properties": { id: '2', something: 'foo' } }
      ]
    }
  };
  const sut = new RemoveFeature;
  const actual = sut.behave(msg, expected);
  assert.ok(lodash.isEqual(actual, expected));
  assert.end();
});

tape('sut removes matching feature when found', (assert) => {
  const msg = getMessage('1234');
  const state = {
    "document_map": {
      "features": [
        { "type": "Feature", "properties": { id: '12345', data: 'hey' } },
        { "type": "Feature", "properties": { id: '1234', something: 'foo' } }
      ]
    }
  };
  const expected = {
    "document_map": {
      "features": [
        { "type": "Feature", "properties": { id: '12345', data: 'hey' } }
      ]
    }
  };
  const sut = new RemoveFeature;
  const actual = sut.behave(msg, state);
  assert.ok(lodash.isEqual(actual, expected));
  assert.end();
});

function getMessage(idValue) {
  return {
    command: 'remove_feature',
    payload: { id: idValue }
  };
}

function getState() {
    return {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "id": "1235"
          }
        },
        {
          "type": "Polyline",
          "properties": {
            "id": "1234"
          },
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
