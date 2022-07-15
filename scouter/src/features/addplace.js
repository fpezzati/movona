const lodash = require('lodash');
const geojv = require("geojson-validation");
/*
Allows user to add a geographical place (a point) to the document map.

- document map is in state, it cannot be null.
- what if place is null?
- handler must have specific command label.
- does addplacetomap handles geojson?
- does addplacetomap bother about epsg?
- what if place occurs on a existing track?
- what if place occurs into something else?
*/
class Addplace {

  constructor() {
    this.command = 'addplace';
  }

  behave(evt, state) {
    this.validateState(state);
    this.validatePayload(evt.payload);
    state.document_map.features.push(evt.payload);
    return state;
  }

  /*
  if state is:
  - undefined,
  - empty object
  an error is thrown.
  */
  validateState(state) {
    if(state == undefined || lodash.isEmpty(state) || state.document_map == undefined) {
      console.log('undefined or empty state!');
      throw new TypeError('undefined or empty state or no document_map provided');
    }
  }

  validatePayload(payload) {
    if(!geojv.valid(payload)) {
      var e = new TypeError('invalid geojson element');
      e.geometry = payload;
      throw e;
    }
  }
}
export default Addplace;
