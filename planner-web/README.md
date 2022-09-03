# PlannerWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

To use with k8s I had to build my own docker image, see `./docker/Dockerfile.node14.angularcli12.dev`. Once built that image I can run planner-web by typing
```
docker run -it --rm -v ${PWD}:/movona -p 8800:4200 planner-web-n14a12 ng serve --host 0.0.0.0
```
I should be able to use this in planner-web's deployment too.. I have to find a way to build that image when needed with Helm, to get everything in place in a single shot. I don't know if there is such possibility...

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
