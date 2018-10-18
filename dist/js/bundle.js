/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/AudioFileModel.js":
/*!**********************************!*\
  !*** ./src/js/AudioFileModel.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    audioFile: File object,
    audioController: AudioFilesController object
*/
var AudioFileModel = exports.AudioFileModel = function () {
    function AudioFileModel(audioFile, audioController) {
        _classCallCheck(this, AudioFileModel);

        this.file = audioFile;
        this.filename = this.file.name;
        this.duration = 0;
        this.timestamp = 0;
        this.controller = audioController;

        this.waitForDuration(); // register event for audio element
    }

    _createClass(AudioFileModel, [{
        key: "waitForDuration",
        value: function waitForDuration() {
            var _this = this;

            var audio, objectURL;

            objectURL = URL.createObjectURL(this.file);
            audio = new Audio(); // create new audio element
            audio.setAttribute("src", objectURL);

            // set audio file's duration and notify controller
            audio.addEventListener("durationchange", function (e) {
                console.log(_this.filename + ": " + e.target.duration);
                _this.duration = e.target.duration;
                _this.controller.incrementObtainedDurations();
            });
        }
    }]);

    return AudioFileModel;
}();

/***/ }),

/***/ "./src/js/AudioFilesController.js":
/*!****************************************!*\
  !*** ./src/js/AudioFilesController.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    files: File objects collection
*/
var AudioFilesController = exports.AudioFilesController = function () {
    function AudioFilesController(files) {
        _classCallCheck(this, AudioFilesController);

        this.obtainedDurations = 0;
        this.attachedFilesNumber = files.length;
    }

    // method called by AudioFileModel objects when audio's duration is obtained


    _createClass(AudioFilesController, [{
        key: "incrementObtainedDurations",
        value: function incrementObtainedDurations() {
            this.obtainedDurations++;
            console.log(this.obtainedDurations);
            if (this.obtainedDurations === this.attachedFilesNumber) // check if model objects are ready to generate timestamps
                console.log("Załadowano wszystkie.");
        }
    }]);

    return AudioFilesController;
}();

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AudioFilesController = __webpack_require__(/*! ./AudioFilesController */ "./src/js/AudioFilesController.js");

var _AudioFileModel = __webpack_require__(/*! ./AudioFileModel */ "./src/js/AudioFileModel.js");

document.addEventListener("DOMContentLoaded", function () {

    var input = document.querySelector("#files-input"); // files input used to load audio files
    var model = null,
        // AudioFileModel object
    models = [],
        // array of AudioFileModel objects
    controller = null; // AudioFilesController object

    // user attached audio files
    input.addEventListener("change", function (e) {
        var files = e.target.files; // File objects collection (files attached by user)

        controller = new _AudioFilesController.AudioFilesController(files);

        [].forEach.call(files, function (file) {
            // create model object for each attached file
            model = new _AudioFileModel.AudioFileModel(file, controller);
            models.push(model); // add model object to collection
        });
    });
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map