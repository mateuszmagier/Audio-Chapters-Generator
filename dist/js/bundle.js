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
    }, {
        key: "setTimestamp",
        value: function setTimestamp(timestamp) {
            this.timestamp = timestamp;
        }
    }, {
        key: "getDuration",
        value: function getDuration() {
            return this.duration;
        }
    }, {
        key: "printDuration",
        value: function printDuration() {
            console.log(this.timestamp + " " + this.filename);
        }
    }, {
        key: "calculateTimestamp",
        value: function calculateTimestamp(prevTimestamp) {}
    }]);

    return AudioFileModel;
}();

/***/ }),

/***/ "./src/js/AudioTimestampsGenerator.js":
/*!********************************************!*\
  !*** ./src/js/AudioTimestampsGenerator.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AudioTimestampsGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AudioFileModel = __webpack_require__(/*! ./AudioFileModel */ "./src/js/AudioFileModel.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    filesInputSelector: iCSS selector of audio files input
*/
var AudioTimestampsGenerator = exports.AudioTimestampsGenerator = function () {
    function AudioTimestampsGenerator(filesInputSelector) {
        _classCallCheck(this, AudioTimestampsGenerator);

        this.input = document.querySelector(filesInputSelector); // input element used to attach audio files
        this.obtainedDurations = 0; // number of known durations of audio files
        this.attachedFilesNumber = 0; // number of files attached by user
        this.models = []; // array of AudioFileModel objects
        this.views = []; // array of AudioFileView objects

        if (this.input === null) {
            console.log("Nieprawidłowy selektor");
        }

        this.handleFilesUpload(); // register change event for files input
    }

    // read files attached by user and create AudioFileModel objects for each of them


    _createClass(AudioTimestampsGenerator, [{
        key: "handleFilesUpload",
        value: function handleFilesUpload() {
            var _this = this;

            this.input.addEventListener("change", function (e) {
                var files = e.target.files; // File objects collection (files attached by user)
                var model; // AudioFileModel object
                _this.attachedFilesNumber = files.length;

                [].forEach.call(files, function (file) {
                    // create model object for each attached file
                    model = new _AudioFileModel.AudioFileModel(file, _this);
                    _this.models.push(model); // add model object to collection
                });
            });
        }

        // calculate timestamps for each audio file

    }, {
        key: "calculateTimestamps",
        value: function calculateTimestamps() {
            console.log("Obliczam timestamps.");
            var timestamp = 0;
            [].forEach.call(this.models, function (model) {
                model.setTimestamp(timestamp);
                timestamp += model.getDuration();
                model.printDuration();
            });

            console.log("Czas ca\u0142kowity: " + timestamp);
        }

        // method called by AudioFileModel objects when audio's duration is obtained

    }, {
        key: "incrementObtainedDurations",
        value: function incrementObtainedDurations() {
            this.obtainedDurations++;
            console.log(this.obtainedDurations);
            if (this.obtainedDurations === this.attachedFilesNumber) {
                // check if model objects are ready to generate timestamps
                console.log("Załadowano wszystkie.");
                this.calculateTimestamps();
            }
        }
    }]);

    return AudioTimestampsGenerator;
}();

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AudioTimestampsGenerator = __webpack_require__(/*! ./AudioTimestampsGenerator */ "./src/js/AudioTimestampsGenerator.js");

document.addEventListener("DOMContentLoaded", function () {

    var atg = new _AudioTimestampsGenerator.AudioTimestampsGenerator("#files-input");
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map