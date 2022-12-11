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
Cargo watch rust image tooks 1GB, unexpected too much.. Alternatives: use a simple rust image and destroy the pod on every save (looks like restarting the old application server), develop with rust in an old fashioned way and use something to make services into minikube reach the rust IdP (very trivial) I am developing. Can I map a k8s `Service` to keymaster on localhost?

## 20221129
Looks like connecting stuff (localhost) to cluster is not that easy with minikube... Maybe I'll switch on k3s one day..

## 20221201
Let's try things as they are.. How do I upgrade my cluster with helm? Can't remember! Maybe `helm upgrade movona.helm ./`?

Ok, a quick recapt:
```
$ helm list
NAME            NAMESPACE       REVISION        UPDATED                                         STATUS          CHART                   APP VERSION
movona.helm     default         13              2022-09-05 23:22:47.677232152 +0200 CEST        deployed        movona_helm_dev-0.1.1   0.1.1
```
you get managed charts.

```
$ helm status movona.helm
NAME: movona.helm
LAST DEPLOYED: Mon Sep  5 23:22:47 2022
NAMESPACE: default
STATUS: deployed
REVISION: 13
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=movona_helm_dev,app.kubernetes.io/instance=movona.helm" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
```
you get chart status.

```
helm upgrade movona.helm ./
```
And you upgrade your chart by using the helm stuff in local directory while `helm rollback yourchart` should bring back cluster to a previous deploy.

Ok upgraded, something will broke for sure :P And, yes, gatekeeper and keymaster are crashing while plannerweb misses his image, I propbably have to share that again with minikube.

## 20221203
Did some progresses here. By running
```
docker run --rm -v $PWD/conf/default.conf:/etc/nginx/conf.d/default.conf -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf -v $PWD/conf/jwt_auth.js:/etc/nginx/jwt_auth.js movona/gatekeeper:1.0.0.20221203
```
I was able to run nginx with njs module loaded. There is an issue in my .js file. I also need a custom image to get containerized nginx with njs running.

## 20221204
Ready to try the new gatekeeper custom image on movona. Let's see if it works.

## 20221206
Minikube certs expired...

I had to delete and start minikube cluster again, then deploy with helm:
```
minikube delete && minikube start
...<doing eval and rebuilding images to share>...
helm install movona.helm ./
```
Minikube takes soo long to deploy pods..

## 20221208
Minikube takes a lot because she can't mount volumes. Messing with helm configuration, but it is useless, not an Helm problem. I have to share some fs with minikube's vm. I am more thinking k3s is better.

Yesterday minikube's certs expired and I had to reset it and, doing that I drop volume mount between minikube's vm and localhost.

## 20221211
A lot goes here. I fix a bunch of issues about gatekeeper and keymaster deployments, now they both run. I just have to check they run the way I want.. So much `helm install`, `helm uninstall` and `helm upgrade`.
