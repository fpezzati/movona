# Movona
Movona is still a prototype, for now it aims to provide some tools about defining paths and routes.

Movona is composed by the following modules:
- EventsHandler,
- Scouter,
- ScouterWeb.

### TODO:
- not really happy about YARN, I guess I configure it wrong. What I want is: a tool to share libs (mine too) among modules, a tool that is capable of test and build everything at once. Instead I had to reinstall after modify and rebuild a dependency source code,
- Scouter needs to provide an UUID for each geographic element is created. This must affect CRUD operations on document's map,
- have a login system.

### DONE:
- put some main page on that call webcomponents,
- ScouterWeb needs a function to apply changes to application's state and re-render,
- have an helm chart or something equivalent to deploy everything at once on cluster,
- ...

## Main
The main app, she is in charge to bring events across apps whenever will be a need. She of course imports the apps.

## EventsHandler
It's a library, she provides a pluggable eventbus and a plug implementing 'ctrl-z' feature.

## Scouter
Aggregates a set of features that allow user to draw and define specific geospatial objects.

## ScouterWeb
This is Scoute's web interface: a web component that is in charge to render what user figured out using Scouter. ScouterWeb encapsulates Scouter and feeds him with all the events that occurs (user interaction).

One of the key components in ScouterWeb is the function that allows gui components to send an event that will update application's state and refresh gui itself.

ScouterWeb draw-route should become a toggle button and have a keyboard shortcut (Ctrl-D?).

### TODO:
- refactor code! The way components are arranged is bad, tools are suppose to created where needed but they need map that is created in the index.js. That mess because I did not implement any dependency injection in my fe components.
- move complexity from Tools component,
- ...
