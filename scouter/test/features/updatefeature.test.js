const tape = require('tape');
const lodash = require('lodash');
import UpdateFeature from '../../src/features/updatefeature.js';

tape('UpdateFeature has a command property valued as "update_feature".', function(assert) {
  const sut = new UpdateFeature;
  assert.ok(lodash.isEqual(sut.command, 'update_feature'));
  assert.end();
});

tape('UpdateFeature left state untouched if there is no match with given id.', (assert) => {
  const sut = new UpdateFeature;
  const msg = {
    command: "update_feature",
    payload: {
      type: "Feature",
      properties: {
        id: '5',
        data: "updated"
      }
    }
  }
  const expected = {
    "document_map": {
      "features": [
        { "type": "Feature", "properties": { id: '1', data: 'hey' } },
        { "type": "Feature", "properties": { id: '2', something: 'foo' } }
      ]
    }
  };
  const actual = sut.behave(msg, expected);
  assert.ok(lodash.isEqual(actual, expected));
  assert.end();
});

tape('UpdateFeature substitutes feature that matches with the given id.', (assert) => {
  const sut = new UpdateFeature;
  const msg = {
    command: "update_feature",
    payload: {
      type: "Feature",
      properties: {
        id: '2',
        data: "updated"
      }
    }
  }
  const state = {
    "document_map": {
      "features": [
        { "type": "Feature", "properties": { id: '1', data: 'hey' } },
        { "type": "Feature", "properties": { id: '2', data: 'old' } }
      ]
    }
  };
  const expected = {
    "document_map": {
      "features": [
        { "type": "Feature", "properties": { id: '1', data: 'hey' } },
        { "type": "Feature", "properties": { id: '2', data: 'updated' } }
      ]
    }
  };
  const actual = sut.behave(msg, state);
  assert.ok(lodash.isEqual(actual, expected));
  assert.end();
})
