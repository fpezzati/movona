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
This is Scouter's web interface: a web component that is in charge to render what user figured out using Scouter. ScouterWeb encapsulates Scouter and feeds him with all the events that occurs (user interaction).

One of the key components in ScouterWeb is the function that allows gui components to send an event that will update application's state and refresh gui itself.

Right now ScouterWeb provides CRUD functionalities about creating and editing paths.

### Random ideas:
- SW integrates with PlannerWeb by sharing events. Some event should be passed to planner as html custom event,
- SW should provide an advanced editing experience (add attributes with no schema, set taints or allow tokens, so on..),
- SW must provide some key combination to switch from draw to edit mode.

### TODO:
- refactor code! index.js is a mess, but it should not that hard to clean it up.
- to use a toggle draw button (current implementation) or force user to hit button or Ctrl-D every time he wants to draw?
- provide keyboard shortcut to toggle draw feature,
- think about CI/CD.

### DONE:
- move complexity from Tools component.

## 20220918
I'll try to use this as a log.

I should convert my eventshandler into a monad. It should be easy and fulfilling.

Let's concentrate about authentication.

## 20220924
Let's use a dummy .js script to authenticate users for now. [Here](https://www.nginx.com/blog/validating-oauth-2-0-access-tokens-nginx/) is the article from which I am fetching 'inspiration' :) Finding a good identity provider and get how it works is a real work, not doing that right now. Which one should I take by the way? Keycloack, Gluu, OpenIAM...

## 20221115
I did some experiments with Rust, which I use to implement Keymaster. Quite happy about him, even if he takes a month to get minimal grip on Rust..

Now I have to link Keymaster with Gatekeeper, the reverse proxy with auth-request module.

## 20221126
Back here since a lot. Putting keymaster on the run in a dev way, I stumbled on cargo-watch. Cargo-watch has no official docker image. I have to built an image and pass it to minikube. How do I put minikube aware about a new docker image? Can't remember anymore..

Now I got that back to mind! I simply have to run this:
```
eval $(minikube -p minikube docker-env)
```
and build the image again, now minikube should be aware of the image.

## 20221128
Cargo watch rust image tooks 1GB, unexpected too much.. Alternatives: use a simple rust image and destroy the pod on every save (looks like restarting the old application server), develop with rust in an old fashioned way and use something to make services into minikube reach the rust IdP (very trivial) I am developing.
