const lodash = require('lodash');
/*
Removes feature matching by id from the document. If no feature matches the given id, nothing happens.

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
    state.document_map.features = this.filterMatchingFeature(state.document_map.features, evt.payload.id);
    return state;
  }

  filterMatchingFeature(features, id) {
    return features.filter( (feature) => {
      if(feature.properties && feature.properties.id === id) {
        return false;
      }
      if(feature.features) {
        feature.features = this.filterMatchingFeature(feature.features, id);
      }
      return true;
    });
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
