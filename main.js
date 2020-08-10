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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_manifest_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/manifest.scss */ "./src/scss/manifest.scss");
/* harmony import */ var _scss_manifest_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_manifest_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_slider_control_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider_control.js */ "./src/js/slider_control.js");




/***/ }),

/***/ "./src/js/slider_control.js":
/*!**********************************!*\
  !*** ./src/js/slider_control.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const sliderControl = (() => {
  const slides = document.querySelectorAll('.slide-wrap');
  const sliderButtons = document.querySelectorAll('button.slider-btn');
  let autoScroll = true;
  let activeIndex = 0;
  let previousIndex = getPreviousIndex();
  let nextIndex = getNextIndex();

  function moveToRight() {
    slides[activeIndex].classList.add('remove-to-right');
  }

  function moveToLeft() {
    slides[activeIndex].classList.add('remove-to-left');
  }

  function getPreviousIndex() {
    const prevValue = activeIndex - 1;
    const slidesLimit = slides.length - 1;

    return prevValue >= 0 ? prevValue : slidesLimit;
  }

  function getNextIndex() {
    const nextValue = activeIndex + 1;
    const slidesLimit = slides.length - 1;
    const firstSlide = 0;

    return nextValue <= slidesLimit ? nextValue : firstSlide;
  }

  function updateIndices(direction) {
    activeIndex = direction === 'right' ? nextIndex : previousIndex;
    previousIndex = getPreviousIndex();
    nextIndex = getNextIndex();
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') moveToRight();
    if (e.code === 'ArrowLeft') moveToLeft();
    autoScroll = false;
  });

  window.setInterval(() => {
    if (autoScroll) moveToRight();
  }, 5000);

  sliderButtons.forEach(button => {
    button.addEventListener('click', e => {
      if (button.classList.contains("next")) moveToRight();
      if (button.classList.contains("prev")) moveToLeft();
      autoScroll = false;
    });
  });

  slides.forEach((slide) => {
    slide.addEventListener('animationend', (e) => {
      // slide removal
      if (e.animationName === 'remove-to-right') {
        slide.classList.remove('active', 'remove-to-right');
        slides[nextIndex].classList.add('appear-from-left', 'active');
        updateIndices('right');
      } else if (e.animationName === 'remove-to-left') {
        slide.classList.remove('active', 'remove-to-left');
        slides[previousIndex].classList.add('appear-from-right', 'active');
        updateIndices('left');
      }

      // slide appearing
      if (e.animationName.includes('appear')) {
        slide.classList.remove('appear-from-left', 'appear-from-right');
      }
    });
  });
})();

/* harmony default export */ __webpack_exports__["default"] = (sliderControl);


/***/ }),

/***/ "./src/scss/manifest.scss":
/*!********************************!*\
  !*** ./src/scss/manifest.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXJfY29udHJvbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9tYW5pZmVzdC5zY3NzPzIxMzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUE4QjtBQUNxQjs7Ozs7Ozs7Ozs7OztBQ0RuRDtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRWMsNEVBQWEsRUFBQzs7Ozs7Ozs7Ozs7O0FDNUU3Qix1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc2Nzcy9tYW5pZmVzdC5zY3NzJztcbmltcG9ydCBzbGlkZXJDb250cm9sIGZyb20gJy4vanMvc2xpZGVyX2NvbnRyb2wuanMnO1xuIiwiY29uc3Qgc2xpZGVyQ29udHJvbCA9ICgoKSA9PiB7XG4gIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZS13cmFwJyk7XG4gIGNvbnN0IHNsaWRlckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24uc2xpZGVyLWJ0bicpO1xuICBsZXQgYXV0b1Njcm9sbCA9IHRydWU7XG4gIGxldCBhY3RpdmVJbmRleCA9IDA7XG4gIGxldCBwcmV2aW91c0luZGV4ID0gZ2V0UHJldmlvdXNJbmRleCgpO1xuICBsZXQgbmV4dEluZGV4ID0gZ2V0TmV4dEluZGV4KCk7XG5cbiAgZnVuY3Rpb24gbW92ZVRvUmlnaHQoKSB7XG4gICAgc2xpZGVzW2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdG8tcmlnaHQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmVUb0xlZnQoKSB7XG4gICAgc2xpZGVzW2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdG8tbGVmdCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJldmlvdXNJbmRleCgpIHtcbiAgICBjb25zdCBwcmV2VmFsdWUgPSBhY3RpdmVJbmRleCAtIDE7XG4gICAgY29uc3Qgc2xpZGVzTGltaXQgPSBzbGlkZXMubGVuZ3RoIC0gMTtcblxuICAgIHJldHVybiBwcmV2VmFsdWUgPj0gMCA/IHByZXZWYWx1ZSA6IHNsaWRlc0xpbWl0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmV4dEluZGV4KCkge1xuICAgIGNvbnN0IG5leHRWYWx1ZSA9IGFjdGl2ZUluZGV4ICsgMTtcbiAgICBjb25zdCBzbGlkZXNMaW1pdCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGZpcnN0U2xpZGUgPSAwO1xuXG4gICAgcmV0dXJuIG5leHRWYWx1ZSA8PSBzbGlkZXNMaW1pdCA/IG5leHRWYWx1ZSA6IGZpcnN0U2xpZGU7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVJbmRpY2VzKGRpcmVjdGlvbikge1xuICAgIGFjdGl2ZUluZGV4ID0gZGlyZWN0aW9uID09PSAncmlnaHQnID8gbmV4dEluZGV4IDogcHJldmlvdXNJbmRleDtcbiAgICBwcmV2aW91c0luZGV4ID0gZ2V0UHJldmlvdXNJbmRleCgpO1xuICAgIG5leHRJbmRleCA9IGdldE5leHRJbmRleCgpO1xuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgIGlmIChlLmNvZGUgPT09ICdBcnJvd1JpZ2h0JykgbW92ZVRvUmlnaHQoKTtcbiAgICBpZiAoZS5jb2RlID09PSAnQXJyb3dMZWZ0JykgbW92ZVRvTGVmdCgpO1xuICAgIGF1dG9TY3JvbGwgPSBmYWxzZTtcbiAgfSk7XG5cbiAgd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoYXV0b1Njcm9sbCkgbW92ZVRvUmlnaHQoKTtcbiAgfSwgNTAwMCk7XG5cbiAgc2xpZGVyQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcIm5leHRcIikpIG1vdmVUb1JpZ2h0KCk7XG4gICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcInByZXZcIikpIG1vdmVUb0xlZnQoKTtcbiAgICAgIGF1dG9TY3JvbGwgPSBmYWxzZTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XG4gICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKGUpID0+IHtcbiAgICAgIC8vIHNsaWRlIHJlbW92YWxcbiAgICAgIGlmIChlLmFuaW1hdGlvbk5hbWUgPT09ICdyZW1vdmUtdG8tcmlnaHQnKSB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsICdyZW1vdmUtdG8tcmlnaHQnKTtcbiAgICAgICAgc2xpZGVzW25leHRJbmRleF0uY2xhc3NMaXN0LmFkZCgnYXBwZWFyLWZyb20tbGVmdCcsICdhY3RpdmUnKTtcbiAgICAgICAgdXBkYXRlSW5kaWNlcygncmlnaHQnKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5hbmltYXRpb25OYW1lID09PSAncmVtb3ZlLXRvLWxlZnQnKSB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsICdyZW1vdmUtdG8tbGVmdCcpO1xuICAgICAgICBzbGlkZXNbcHJldmlvdXNJbmRleF0uY2xhc3NMaXN0LmFkZCgnYXBwZWFyLWZyb20tcmlnaHQnLCAnYWN0aXZlJyk7XG4gICAgICAgIHVwZGF0ZUluZGljZXMoJ2xlZnQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2xpZGUgYXBwZWFyaW5nXG4gICAgICBpZiAoZS5hbmltYXRpb25OYW1lLmluY2x1ZGVzKCdhcHBlYXInKSkge1xuICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdhcHBlYXItZnJvbS1sZWZ0JywgJ2FwcGVhci1mcm9tLXJpZ2h0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVyQ29udHJvbDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=