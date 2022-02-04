import Eventbus from '../src/eventbus.js';
import Ctrlz from '../src/ctrlz.js';

function EventsHandler(eventbus, ctrlz) {

  eventbus.handlers.set("ctrlz", {
    behave: function(evt, state) {
      removeLastHowmanyEvents(ctrlz.queue, evt.howmany || 1);
      var ctrlzState = JSON.parse(JSON.stringify(ctrlz.state));
      ctrlz.queue.forEach(event => {
        ctrlzState = eventbus.accept(event, ctrlzState);
      });
      return ctrlzState;
    }
  });

  function removeLastHowmanyEvents(queue, howmany) {
    queue.splice(queue.length - howmany, queue.length - 1);
  }

  var eventsHandler = {
    accept: function(evt, state) {
      var newstate = eventbus.accept(evt, state);
      ctrlz.accept(evt, state);
      return newstate;
    }
  };
  eventsHandler.eventbus = eventbus;
  eventsHandler.ctrlz = ctrlz;
  return eventsHandler;
}

export { EventsHandler, Eventbus, Ctrlz };
