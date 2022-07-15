const lodash = require('lodash');
/*
Updates the feature matching by substitution. The feature in payload substitutes the one matching in document_map if id matches.
If no feature matches, nothing happens.

Expected message:
{
  command: 'update_feature',
  payload: {
    type: 'Feature',
    properties: {
      id: id-to-match,
      ...
    }
  }
}
*/
class UpdateFeature {

  constructor() {
    this.command = 'update_feature';
  }

  behave(evt, state) {
    this.validatePayload(evt.payload);
    state.document_map = this.findAndUpdateFeature(state.document_map, evt.payload);
    return state;
  }

  findAndUpdateFeature(feature, freshFeature) {
    if(feature && feature.properties && feature.properties.id === freshFeature.properties.id) {
      return freshFeature;
    }
    if (Array.isArray(feature)) {
      let arr = [];
      for(let attribute in feature) {
        arr[attribute] = this.findAndUpdateFeature(feature[attribute], freshFeature);
      }
      return arr;
    } else if (feature instanceof Object) {
      let obj = {};
      for(let attribute in feature) {
        obj[attribute] = this.findAndUpdateFeature(feature[attribute], freshFeature);
      }
      return obj;
    } else {
      return feature;
    }
  }

  validatePayload(payload) {
    if(!payload || !payload.properties || !payload.properties.id) {
      let e = new TypeError('no id specified into feature.');
      throw e;
    }
  }
}
export default UpdateFeature;
