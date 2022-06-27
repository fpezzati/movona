const lodash = require('lodash');
/*
Removes feature matching by id from the document. Relies on object-scan.
https://www.npmjs.com/package/object-scan

Expected message:
{
  command: 'remove_feature',
  payload: {
    id: id-to-be-removed
  }
}
*/
class RemoveFeature {

  constructor() {
    this.command = 'remove_feature';
  }

  behave(evt, state) {
    this.validatePayload(evt.payload);
    let found = false;
    state.document_map.features = state.document_map.features.filter( (feature) => {
      if(feature.properties.id === evt.payload.id) found = true;
      return feature.properties.id !== evt.payload.id;
    });
    if(!found) {
      throw new Error('given id has no match.');
    }
    return state;
  }

  validatePayload(payload) {
    if(!payload.id) {
      let e = new TypeError('no id specified on removing feature.');
      e.id = payload.id;
      throw e;
    }
  }
}
export default RemoveFeature;
