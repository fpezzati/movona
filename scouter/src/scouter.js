import { EventsHandler, Eventbus, Ctrlz } from 'eventshandler/dist/eventshandler';
import Addplace from './features/addplace';
import Addsupportmap from './features/addsupportmap';
import Newmap from './features/newmap';
import RemoveFeature from './features/removefeature';
/*
Glues together all the features that compose 'scouter'.
It relies on 'eventshandler' to manage events and ensure they will be managed by the right handler.
*/
class Scouter {

  constructor() {
    let eventbus = new Eventbus;
    let addplace = new Addplace;
    let addsupportmap = new Addsupportmap;
    let newmap = new Newmap;
    const removefeature = new RemoveFeature;
    eventbus.handlers.set(addplace.command, addplace);
    eventbus.handlers.set(addsupportmap.command, addsupportmap);
    eventbus.handlers.set(newmap.command, newmap);
    eventbus.handlers.set(removefeature.command, removefeature);
    this.eventshandler = new EventsHandler(eventbus, new Ctrlz);
  }

  accept(evt, state) {
    return this.eventshandler.accept(evt, state);
  }
}
export default Scouter;
