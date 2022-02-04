# Eventbus
- Command: user's will. Produced by GUI.
- State: application state, not necessarly a full view. GUI represent it.
- Eventbus: Is in charge to receive commands and route them to proper handler.
- Handler: each handler is capable to update state by a given correct command.

Ok, enought mixing and matching.. I have to separate view from controller. I also have to add feature to eventbus: eventubs must provide a set of handlers that will be always executed in order.

Define boundaries is not that easy..

Boundaries are solid. More or less...

Main toolbar button in top right corner should open a div with all buttons...

eventbus needs a feature that can handle cluster messages: a message containing a lot of messages.

eventbus must be able to encapsulate features that are executed before and after every message is handled.


### milkroute: debug a test
`node --inspect-brk --require @babel/register ./test/eventbus.test.js`
