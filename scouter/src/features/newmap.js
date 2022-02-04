import { v4 as uuidv4 } from 'uuid';
/*
Creates a new document_map object and replace the existing one in application state.
*/
class Newmap {

  constructor() {
    this.command = 'newmap';
  }

  behave(evt, state) {
    state.document_map = { uuid: uuidv4() };
    return state;
  }
}
export default Newmap;
