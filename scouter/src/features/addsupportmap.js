var lodash = require('lodash');
var geojv = require("geojson-validation");
/*
Allows user to indicate a document as support to drawing geometries in document map, a support map.
*/
class Addsupportmap {

  constructor() {
    this.command = 'addsupportmap';
  }

  behave(evt, state) {
    this._validatePayload(evt.payload);
    state.support_map = evt.payload;
    return state;
  }

  _validatePayload(payload) {
    if(payload == undefined || lodash.isEmpty(payload) || !geojv.valid(payload)) {
      throw new TypeError('undefined or empty or invalid payload provided.');
    }
  }
};
export default Addsupportmap;
