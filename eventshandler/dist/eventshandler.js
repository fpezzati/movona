/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["eventshandler"] = factory();
	else
		root["eventshandler"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ctrlz.js":
/*!**********************!*\
  !*** ./src/ctrlz.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Ctrlz = /*#__PURE__*/function () {\n  function Ctrlz() {\n    var queuesize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;\n    var statusHandler = arguments.length > 1 ? arguments[1] : undefined;\n\n    _classCallCheck(this, Ctrlz);\n\n    this.queueMaxSize = queuesize;\n    this.queue = [];\n    this.state = {};\n    this.stateHandler = statusHandler;\n  }\n\n  _createClass(Ctrlz, [{\n    key: \"accept\",\n    value: function accept(command, state) {\n      if (this.queue.length < 1) {\n        this.state = state;\n      } else if (this.queue.length >= this.queueMaxSize) {\n        this.state = this.updateStateAndQueue(this.queue, this.state, this.stateHandler);\n      }\n\n      this.queue.push(command);\n    }\n  }, {\n    key: \"updateStateAndQueue\",\n    value: function updateStateAndQueue(queue, state, handler) {\n      var command = queue[0];\n      queue.shift();\n\n      if (handler == undefined) {\n        return state;\n      } else {\n        return handler.accept(command, state);\n      }\n    }\n  }]);\n\n  return Ctrlz;\n}();\n\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ctrlz);\n\n//# sourceURL=webpack://eventshandler/./src/ctrlz.js?");

/***/ }),

/***/ "./src/eventbus.js":
/*!*************************!*\
  !*** ./src/eventbus.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Eventbus = /*#__PURE__*/function () {\n  function Eventbus() {\n    var defaultHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n      command: \"default\",\n      behave: function behave(msg, state) {\n        console.log(\"Not aware of: \" + JSON.stringify(msg));\n        return state;\n      }\n    };\n\n    _classCallCheck(this, Eventbus);\n\n    this.handlers = new Map();\n    this.handlers.set(defaultHandler.command, defaultHandler.behave);\n  }\n\n  _createClass(Eventbus, [{\n    key: \"accept\",\n    value: function accept(message, state) {\n      try {\n        var copyedState = JSON.parse(JSON.stringify(state));\n        var copyedMessage = JSON.parse(JSON.stringify(message));\n\n        if (typeof this.handlers.get(message.command) === 'undefined') {\n          return this.handlers.get('default').call(this, copyedMessage, copyedState);\n        }\n\n        return this.handlers.get(message.command)['behave'](copyedMessage, copyedState);\n      } catch (error) {\n        console.log(\"Error: \" + JSON.stringify(error));\n        return state;\n      }\n    }\n  }]);\n\n  return Eventbus;\n}();\n\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Eventbus);\n\n//# sourceURL=webpack://eventshandler/./src/eventbus.js?");

/***/ }),

/***/ "./src/eventshandler.js":
/*!******************************!*\
  !*** ./src/eventshandler.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventsHandler\": () => (/* binding */ EventsHandler),\n/* harmony export */   \"Eventbus\": () => (/* reexport safe */ _src_eventbus_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"Ctrlz\": () => (/* reexport safe */ _src_ctrlz_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _src_eventbus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/eventbus.js */ \"./src/eventbus.js\");\n/* harmony import */ var _src_ctrlz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/ctrlz.js */ \"./src/ctrlz.js\");\n\n\n\nfunction EventsHandler(eventbus, ctrlz) {\n  eventbus.handlers.set(\"ctrlz\", {\n    behave: function behave(evt, state) {\n      removeLastHowmanyEvents(ctrlz.queue, evt.howmany || 1);\n      var ctrlzState = JSON.parse(JSON.stringify(ctrlz.state));\n      ctrlz.queue.forEach(function (event) {\n        ctrlzState = eventbus.accept(event, ctrlzState);\n      });\n      return ctrlzState;\n    }\n  });\n\n  function removeLastHowmanyEvents(queue, howmany) {\n    queue.splice(queue.length - howmany, queue.length - 1);\n  }\n\n  var eventsHandler = {\n    accept: function accept(evt, state) {\n      var newstate = eventbus.accept(evt, state);\n      ctrlz.accept(evt, state);\n      return newstate;\n    }\n  };\n  eventsHandler.eventbus = eventbus;\n  eventsHandler.ctrlz = ctrlz;\n  return eventsHandler;\n}\n\n\n\n//# sourceURL=webpack://eventshandler/./src/eventshandler.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/eventshandler.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});