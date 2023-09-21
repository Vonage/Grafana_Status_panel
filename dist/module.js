define(["@grafana/data","@grafana/ui","emotion","lodash","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_emotion__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/react-card-flip/lib/ReactCardFlip.js":
/*!************************************************************!*\
  !*** ../node_modules/react-card-flip/lib/ReactCardFlip.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(__webpack_require__(/*! react */ "react"));
var react_1 = __webpack_require__(/*! react */ "react");
var ReactCardFlip = function (props) {
    var _a = props.cardStyles, back = _a.back, front = _a.front, cardZIndex = props.cardZIndex, containerStyle = props.containerStyle, containerClassName = props.containerClassName, flipDirection = props.flipDirection, flipSpeedFrontToBack = props.flipSpeedFrontToBack, flipSpeedBackToFront = props.flipSpeedBackToFront, infinite = props.infinite;
    var _b = (0, react_1.useState)(props.isFlipped), isFlipped = _b[0], setFlipped = _b[1];
    var _c = (0, react_1.useState)(0), rotation = _c[0], setRotation = _c[1];
    (0, react_1.useEffect)(function () {
        if (props.isFlipped !== isFlipped) {
            setFlipped(props.isFlipped);
            setRotation(function (c) { return c + 180; });
        }
    }, [props.isFlipped]);
    var getContainerClassName = (0, react_1.useMemo)(function () {
        var className = 'react-card-flip';
        if (containerClassName) {
            className += " ".concat(containerClassName);
        }
        return className;
    }, [containerClassName]);
    var getComponent = function (key) {
        if (props.children.length !== 2) {
            throw new Error('Component ReactCardFlip requires 2 children to function');
        }
        return props.children[key];
    };
    var frontRotateY = "rotateY(".concat(infinite ? rotation : isFlipped ? 180 : 0, "deg)");
    var backRotateY = "rotateY(".concat(infinite ? rotation + 180 : isFlipped ? 0 : -180, "deg)");
    var frontRotateX = "rotateX(".concat(infinite ? rotation : isFlipped ? 180 : 0, "deg)");
    var backRotateX = "rotateX(".concat(infinite ? rotation + 180 : isFlipped ? 0 : -180, "deg)");
    var styles = {
        back: __assign({ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', height: '100%', left: '0', position: isFlipped ? 'relative' : 'absolute', top: '0', transform: flipDirection === 'horizontal' ? backRotateY : backRotateX, transformStyle: 'preserve-3d', transition: "".concat(flipSpeedFrontToBack, "s"), width: '100%' }, back),
        container: {
            perspective: '1000px',
            zIndex: "".concat(cardZIndex),
        },
        flipper: {
            height: '100%',
            position: 'relative',
            width: '100%',
        },
        front: __assign({ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', height: '100%', left: '0', position: isFlipped ? 'absolute' : 'relative', top: '0', transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX, transformStyle: 'preserve-3d', transition: "".concat(flipSpeedBackToFront, "s"), width: '100%', zIndex: '2' }, front),
    };
    return (React.createElement("div", { className: getContainerClassName, style: __assign(__assign({}, styles.container), containerStyle) },
        React.createElement("div", { className: "react-card-flipper", style: styles.flipper },
            React.createElement("div", { className: "react-card-front", style: styles.front }, getComponent(0)),
            React.createElement("div", { className: "react-card-back", style: styles.back }, getComponent(1)))));
};
ReactCardFlip.defaultProps = {
    cardStyles: {
        back: {},
        front: {},
    },
    cardZIndex: 'auto',
    containerStyle: {},
    flipDirection: 'horizontal',
    flipSpeedBackToFront: 0.6,
    flipSpeedFrontToBack: 0.6,
    infinite: false,
    isFlipped: false,
};
exports.default = ReactCardFlip;


/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./components/Marquee.tsx":
/*!********************************!*\
  !*** ./components/Marquee.tsx ***!
  \********************************/
/*! exports provided: ReactMarquee */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactMarquee", function() { return ReactMarquee; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hooks */ "./hooks/index.ts");



var ReactMarquee = function ReactMarquee(_a) {
  var autoScroll = _a.autoScroll,
    hover = _a.hover,
    props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["autoScroll", "hover"]);
  var div = react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef(null);
  var fps = 30;
  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(0), 2),
    y = _b[0],
    setY = _b[1];
  var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(1), 2),
    dy = _c[0],
    setDy = _c[1];
  Object(hooks__WEBPACK_IMPORTED_MODULE_2__["useInterval"])(function () {
    if (div.current) {
      if (hover) {
        setY(div.current.parentElement.scrollTop | 0);
      } else if (autoScroll) {
        if (0 <= y && y <= div.current.parentElement.scrollHeight - div.current.parentElement.offsetHeight + 1) {
          div.current.parentElement.scrollTo(0, y);
          setY(y + dy);
        } else {
          setY(y - dy);
          setDy(-dy);
        }
      }
    }
  }, 1000 / fps);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
    ref: div
  }, props));
};

/***/ }),

/***/ "./components/MaybeAnchor.tsx":
/*!************************************!*\
  !*** ./components/MaybeAnchor.tsx ***!
  \************************************/
/*! exports provided: MaybeAnchor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaybeAnchor", function() { return MaybeAnchor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var MaybeAnchor = function MaybeAnchor(props) {
  return props.href ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props)) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, props.children);
};

/***/ }),

/***/ "./components/StatusColorOptionsEditor.tsx":
/*!*************************************************!*\
  !*** ./components/StatusColorOptionsEditor.tsx ***!
  \*************************************************/
/*! exports provided: StatusColorOptionsEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusColorOptionsEditor", function() { return StatusColorOptionsEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);



var defaultColors = {
  crit: "defaultCriticalColor",
  warn: "defaultWarningColor",
  ok: "defaultOkColor",
  disable: "defaultDisableColor"
};
var StatusColorOptionsEditor = function StatusColorOptionsEditor(_a) {
  var _b = _a.value,
    value = _b === void 0 ? defaultColors : _b,
    onChange = _a.onChange;
  var colorPicker = function colorPicker(colorProps) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "gf-form"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ColorPicker"], {
      color: colorProps.value,
      onChange: colorProps.onChange
    }));
  };
  var buildHandler = function buildHandler(prop) {
    return function (color) {
      var _a;
      onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), (_a = {}, _a[prop] = color, _a)));
    };
  };
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "gf-form-inline"
  }, colorPicker({
    value: value.crit || defaultColors.crit,
    onChange: buildHandler('crit')
  }), colorPicker({
    value: value.warn || defaultColors.warn,
    onChange: buildHandler('warn')
  }), colorPicker({
    value: value.ok || defaultColors.ok,
    onChange: buildHandler('ok')
  }), colorPicker({
    value: value.disable || defaultColors.disable,
    onChange: buildHandler('disable')
  }));
};

/***/ }),

/***/ "./components/StatusPanel.tsx":
/*!************************************!*\
  !*** ./components/StatusPanel.tsx ***!
  \************************************/
/*! exports provided: StatusPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusPanel", function() { return StatusPanel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "emotion");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(emotion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_card_flip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-card-flip */ "../node_modules/react-card-flip/lib/ReactCardFlip.js");
/* harmony import */ var react_card_flip__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_card_flip__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var components_Marquee__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Marquee */ "./components/Marquee.tsx");
/* harmony import */ var hooks_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! hooks/index */ "./hooks/index.ts");
/* harmony import */ var lib_buildStatusMetricProps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lib/buildStatusMetricProps */ "./lib/buildStatusMetricProps.ts");
/* harmony import */ var _MaybeAnchor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MaybeAnchor */ "./components/MaybeAnchor.tsx");









var defaultColors = {
  crit: "defaultCriticalColor",
  warn: "defaultWarningColor",
  ok: "defaultOkColor",
  disable: "defaultDisableColor"
};
var StatusPanel = function StatusPanel(_a) {
  var data = _a.data,
    options = _a.options,
    fieldConfig = _a.fieldConfig,
    width = _a.width,
    height = _a.height,
    replaceVariables = _a.replaceVariables,
    timeZone = _a.timeZone;
  var _b;
  var colors = ((_b = options) === null || _b === void 0 ? void 0 : _b.colors) || defaultColors;
  var okColor = colors.ok;
  var warnColor = colors.warn;
  var critColor = colors.crit;
  var disableColor = colors.disable;
  // build styles
  var statusColorClasses = {
    ok: options.isIgnoreOKColors ? '' : Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      color: okColor
    }),
    warn: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      color: warnColor
    }),
    crit: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      color: critColor
    }),
    disable: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      color: disableColor
    }),
    noData: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      color: disableColor
    }),
    hide: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      display: 'none'
    })
  };
  // build props
  var _c = Object(lib_buildStatusMetricProps__WEBPACK_IMPORTED_MODULE_7__["buildStatusMetricProps"])(data, fieldConfig, options, statusColorClasses, replaceVariables, timeZone),
    annotations = _c.annotations,
    disables = _c.disables,
    crits = _c.crits,
    warns = _c.warns,
    displays = _c.displays;
  // clear other metrics when disabled and hide on disable
  if (options.isHideAlertsOnDisable && disables.length > 0) {
    crits = warns = displays = [];
  }
  // flatten and slice sections as needed
  var alerts = [disables, crits, warns, displays].flat(1);
  var extraMoreAlerts = null;
  if (0 <= options.maxAlertNumber && options.maxAlertNumber < alerts.length) {
    extraMoreAlerts = alerts.length - options.maxAlertNumber;
    alerts = alerts.slice(0, options.maxAlertNumber);
  }
  // setup flipper
  var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(true), 2),
    flipped = _d[0],
    setFlipped = _d[1];
  var wrapper = react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef(null);
  var isHover = Object(hooks_index__WEBPACK_IMPORTED_MODULE_6__["useHover"])(wrapper);
  Object(hooks_index__WEBPACK_IMPORTED_MODULE_6__["useInterval"])(function () {
    return options.flipCard && !isHover && setFlipped(!flipped);
  }, 1000 * options.flipTime);
  // set panel status and render
  var panelStatus = disables.length ? 'disable' : crits.length ? 'crit' : warns.length ? 'warn' : !data.series.length && options.isGrayOnNoData ? 'noData' : 'ok';
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    ref: wrapper,
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      width: width,
      height: height,
      boxSizing: 'border-box',
      borderRadius: options.cornerRadius,
      overflow: 'hidden',
      zIndex: 10
    }, !(panelStatus === 'ok' && options.isIgnoreOKColors) && options.colorMode === 'Panel' && {
      backgroundColor: options.colors[panelStatus]
    })
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_card_flip__WEBPACK_IMPORTED_MODULE_4___default.a, {
    isFlipped: flipped
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      width: width,
      height: height,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem'
    }, options.colorMode === 'Metric' && statusColorClasses[panelStatus])
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_MaybeAnchor__WEBPACK_IMPORTED_MODULE_8__["MaybeAnchor"], {
    href: options.clusterUrl,
    target: options.clusterTargetBlank ? '_blank' : '_self',
    title: options.clusterName
  }, panelStatus === 'crit' ? 'Critical' : panelStatus === 'disable' ? 'Disabled' : panelStatus === 'noData' ? 'No Data' : panelStatus === 'ok' ? 'OK' : 'Warn')), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      height: height,
      display: 'flex',
      flexDirection: 'column'
    })
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      flex: '1 0 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    })
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      minHeight: '1px',
      display: 'flex',
      justifyContent: 'center',
      fontSize: '1.5rem'
    })
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_MaybeAnchor__WEBPACK_IMPORTED_MODULE_8__["MaybeAnchor"], {
    href: options.clusterUrl,
    target: options.clusterTargetBlank ? '_blank' : '_self',
    title: options.clusterName
  }, replaceVariables(options.clusterName)))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'scroll',
      flex: '0 1 auto',
      '::-webkit-scrollbar': {
        background: 'transparent',
        width: '0px',
        display: 'none'
      }
    })
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Marquee__WEBPACK_IMPORTED_MODULE_5__["ReactMarquee"], {
    hover: isHover,
    autoScroll: options.isAutoScrollOnOverflow
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, alerts.map(function (_a) {
    var alias = _a.alias,
      link = _a.link,
      className = _a.className,
      displayValue = _a.displayValue;
    var _b, _c;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: className,
      style: {
        color: 'inherit'
      }
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_MaybeAnchor__WEBPACK_IMPORTED_MODULE_8__["MaybeAnchor"], {
      href: (_b = link) === null || _b === void 0 ? void 0 : _b.href,
      target: (_c = link) === null || _c === void 0 ? void 0 : _c.target,
      title: alias,
      style: {
        color: 'inherit'
      }
    }, displayValue ? alias + ' - ' + displayValue : alias));
  }), extraMoreAlerts && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      paddingTop: '2px',
      fontSize: '0.85rem'
    })
  }, "+ ", extraMoreAlerts, " more")))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      fontSize: '1.5rem',
      minHeight: '1px',
      flex: '1 1 0'
    })
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      position: 'absolute',
      height: height,
      overflow: 'scroll',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      '::-webkit-scrollbar': {
        background: 'transparent',
        width: '0px',
        display: 'none'
      }
    })
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Marquee__WEBPACK_IMPORTED_MODULE_5__["ReactMarquee"], {
    hover: isHover,
    autoScroll: options.isAutoScrollOnOverflow
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      fontSize: '0.85rem'
    })
  }, annotations.map(function (_a) {
    var alias = _a.alias,
      link = _a.link,
      className = _a.className,
      displayValue = _a.displayValue;
    var _b, _c;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: className,
      style: {
        color: 'inherit'
      }
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_MaybeAnchor__WEBPACK_IMPORTED_MODULE_8__["MaybeAnchor"], {
      href: (_b = link) === null || _b === void 0 ? void 0 : _b.href,
      target: (_c = link) === null || _c === void 0 ? void 0 : _c.target,
      title: alias,
      style: {
        color: 'inherit'
      }
    }, displayValue ? alias + ' - ' + displayValue : alias));
  })))))), isHover && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["IconButton"], {
    name: 'exchange-alt',
    onClick: function onClick() {
      return setFlipped(!flipped);
    },
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
      position: 'absolute',
      bottom: '2rem',
      right: '2rem'
    })
  }));
};

/***/ }),

/***/ "./components/StatusThresholdOptionsEditor.tsx":
/*!*****************************************************!*\
  !*** ./components/StatusThresholdOptionsEditor.tsx ***!
  \*****************************************************/
/*! exports provided: StatusThresholdOptionsEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusThresholdOptionsEditor", function() { return StatusThresholdOptionsEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var valueHandlerOptions = [{
  label: 'Number Threshold',
  value: 'Number Threshold',
  description: 'Change background color of the panel if got warning / error + show the alias of the problematic metrics.'
}, {
  label: 'String Threshold',
  value: 'String Threshold',
  description: 'Change background color of the panel if got warning / error + show the alias of the problematic metrics.'
}, {
  label: 'Date Threshold',
  value: 'Date Threshold',
  description: 'Change background color of the panel if got warning / error + show the alias of the problematic metrics.'
}, {
  label: 'Disable Criteria',
  value: 'Disable Criteria',
  description: 'Change background color of the panel to grey if disabled.'
}, {
  label: 'Text Only',
  value: 'Text Only',
  description: 'Show the alias + the value on the panel without any condition.'
}];
var StatusThresholdOptionsEditor = function StatusThresholdOptionsEditor(_a) {
  var value = _a.value,
    _onChange = _a.onChange;
  if (!value) {
    value = {
      valueHandler: 'Number Threshold',
      crit: '90',
      warn: '70'
    };
  }
  var inputType;
  if (value.valueHandler === 'Number Threshold') {
    inputType = 'number';
  } else if (value.valueHandler === 'String Threshold') {
    inputType = 'text';
  } else if (value.valueHandler === 'Date Threshold') {
    inputType = 'datetime-local';
  }
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    value: value.valueHandler,
    options: valueHandlerOptions,
    onChange: function onChange(_a) {
      var valueHandler = _a.value;
      return valueHandler && _onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), {
        valueHandler: valueHandler
      }));
    }
  }), inputType && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Label"], null, "Critical Value"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    value: value.crit,
    type: inputType,
    onChange: function onChange(_a) {
      var crit = _a.currentTarget.value;
      return _onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), {
        crit: crit
      }));
    }
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Label"], null, "Warning Value"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    value: value.warn,
    type: inputType,
    onChange: function onChange(_a) {
      var warn = _a.currentTarget.value;
      return _onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), {
        warn: warn
      }));
    }
  })));
};

/***/ }),

/***/ "./hooks/index.ts":
/*!************************!*\
  !*** ./hooks/index.ts ***!
  \************************/
/*! exports provided: useEventListener, useHover, useInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useHover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useHover */ "./hooks/useHover.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useHover", function() { return _useHover__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _useEventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useEventListener */ "./hooks/useEventListener.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventListener", function() { return _useEventListener__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _useInterval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useInterval */ "./hooks/useInterval.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useInterval", function() { return _useInterval__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./hooks/useEventListener.ts":
/*!***********************************!*\
  !*** ./hooks/useEventListener.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useEventListener(eventName, handler, element, options) {
  // Create a ref that stores handler
  var savedHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(handler);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"])(function () {
    savedHandler.current = handler;
  }, [handler]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var _a;
    // Define the listening target
    var targetElement = ((_a = element) === null || _a === void 0 ? void 0 : _a.current) || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }
    // Create event listener that calls handler function stored in ref
    var eventListener = function eventListener(event) {
      return savedHandler.current(event);
    };
    targetElement.addEventListener(eventName, eventListener, options);
    // Remove event listener on cleanup
    return function () {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, options]);
}
/* harmony default export */ __webpack_exports__["default"] = (useEventListener);

/***/ }),

/***/ "./hooks/useHover.ts":
/*!***************************!*\
  !*** ./hooks/useHover.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hooks_useEventListener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hooks/useEventListener */ "./hooks/useEventListener.ts");


// See: https://usehooks-ts.com/react-hook/use-event-listener

function useHover(elementRef) {
  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false), 2),
    value = _a[0],
    setValue = _a[1];
  var handleMouseEnter = function handleMouseEnter() {
    return setValue(true);
  };
  var handleMouseLeave = function handleMouseLeave() {
    return setValue(false);
  };
  Object(hooks_useEventListener__WEBPACK_IMPORTED_MODULE_2__["default"])('mouseenter', handleMouseEnter, elementRef);
  Object(hooks_useEventListener__WEBPACK_IMPORTED_MODULE_2__["default"])('mouseleave', handleMouseLeave, elementRef);
  return value;
}
/* harmony default export */ __webpack_exports__["default"] = (useHover);

/***/ }),

/***/ "./hooks/useInterval.ts":
/*!******************************!*\
  !*** ./hooks/useInterval.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useInterval(callback, delay) {
  var savedCallback = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(callback);
  // Remember the latest callback if it changes.
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"])(function () {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }
    var id = setInterval(function () {
      return savedCallback.current();
    }, delay);
    return function () {
      return clearInterval(id);
    };
  }, [delay]);
}
/* harmony default export */ __webpack_exports__["default"] = (useInterval);

/***/ }),

/***/ "./lib/buildStatusMetricProps.ts":
/*!***************************************!*\
  !*** ./lib/buildStatusMetricProps.ts ***!
  \***************************************/
/*! exports provided: buildStatusMetricProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildStatusMetricProps", function() { return buildStatusMetricProps; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "emotion");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(emotion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);




function buildStatusMetricProps(data, fieldConfig, options, colorClasses, replaceVariables, timeZone) {
  var annotations = [];
  var displays = [];
  var crits = [];
  var warns = [];
  var disables = [];
  data.series.forEach(function (df) {
    var _a, _b;
    // find first non-time column
    var field = df.fields.find(function (field) {
      return field.name !== 'Time';
    });
    if (!((_a = field) === null || _a === void 0 ? void 0 : _a.state)) {
      return;
    }
    var config = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.defaultsDeep(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, field.config), fieldConfig.defaults);
    if (!config.custom) {
      return;
    }
    // determine field status & handle formatting based on value handler
    var fieldStatus = config.custom.displayAliasType === 'Always' ? 'ok' : 'hide';
    var displayValue = '';
    switch (config.custom.thresholds.valueHandler) {
      case 'Number Threshold':
        console.log('Field:', field);
        console.log('Config:', config);
        var value = void 0;
        if (field.state && field.state.calcs && typeof field.state.calcs[config.custom.aggregation] === 'number') {
          value = field.state.calcs[config.custom.aggregation];
        } else {
          // Handle the scenario where the value is not available.
          // For example, set a default value or log an error.
          value = 0; // Or any other default value
          console.error("Unexpected data structure: field.state.calcs is not defined.");
        }
        // let value: number = field.state.calcs![config.custom.aggregation];
        var crit = +config.custom.thresholds.crit;
        var warn = +config.custom.thresholds.warn;
        if (warn <= crit && crit <= value || warn >= crit && crit >= value) {
          fieldStatus = 'crit';
        } else if (warn <= value && value <= crit || warn >= value && value >= crit) {
          fieldStatus = 'warn';
        }
        if (!lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isFinite(value)) {
          displayValue = 'Invalid Number';
        } else if (config.unit) {
          displayValue = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["formattedValueToString"])(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toFixedUnit"])(config.unit)(value, config.decimals));
        } else {
          displayValue = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toFixed"])(value, config.decimals);
        }
        break;
      case 'String Threshold':
        displayValue = field.state.calcs[config.custom.aggregation];
        if (displayValue === undefined || displayValue === null || displayValue !== displayValue) {
          displayValue = 'Invalid String';
        }
        if (displayValue === config.custom.thresholds.crit) {
          fieldStatus = 'crit';
        } else if (displayValue === config.custom.thresholds.warn) {
          fieldStatus = 'warn';
        }
        break;
      case 'Date Threshold':
        var val = field.state.calcs[config.custom.aggregation];
        var date = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateTimeAsMoment"])(val);
        if (timeZone === 'utc') {
          date = date.utc();
        }
        displayValue = date.format(config.custom.dateFormat);
        if (val === config.custom.thresholds.crit) {
          fieldStatus = 'crit';
        } else if (val === config.custom.thresholds.warn) {
          fieldStatus = 'warn';
        }
        break;
      case 'Disable Criteria':
        if (field.state.calcs[config.custom.aggregation] === config.custom.disabledValue) {
          fieldStatus = 'disable';
        }
        break;
    }
    // only display value when appropriate
    var withAlias = config.custom.displayValueWithAlias;
    var isDisplayValue = withAlias === 'When Alias Displayed' || fieldStatus === 'warn' && withAlias === 'Warning / Critical' || fieldStatus === 'crit' && (withAlias === 'Warning / Critical' || withAlias === 'Critical Only');
    // apply RegEx if value will be displayed
    if (isDisplayValue && config.custom.valueDisplayRegex) {
      try {
        displayValue = displayValue.replace(new RegExp(config.custom.valueDisplayRegex), '');
      } catch (_c) {}
    }
    // get first link and interpolate variables
    var link = (_b = field.getLinks && field.getLinks({}), _b !== null && _b !== void 0 ? _b : [])[0];
    if (link) {
      link.href = replaceVariables(link.href);
    }
    // build props and place in correct bucket
    var props = {
      alias: config.displayName || df.name || df.refId || '',
      displayValue: isDisplayValue ? displayValue : undefined,
      link: link
    };
    // set font format for field
    if (fieldStatus !== 'ok') {
      if (config.custom.fontFormat === 'Bold') {
        props.className = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
          fontWeight: 'bold'
        });
      } else if (config.custom.fontFormat === 'Italic') {
        props.className = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])({
          fontStyle: 'italic'
        });
      }
    }
    // set color for field when colormode is Metric
    if (options.colorMode === 'Metric') {
      props.className = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(props.className, colorClasses[fieldStatus]);
    }
    // add to appropriate section
    if (fieldStatus === 'ok') {
      if (config.custom.displayType === 'Regular') {
        displays.push(props);
      } else {
        annotations.push(props);
      }
    } else if (fieldStatus === 'warn') {
      warns.push(props);
    } else if (fieldStatus === 'crit') {
      crits.push(props);
    } else if (fieldStatus === 'disable') {
      disables.push(props);
    }
  });
  return {
    annotations: annotations,
    disables: disables,
    crits: crits,
    warns: warns,
    displays: displays
  };
}

/***/ }),

/***/ "./lib/statusFieldOptionsBuilder.ts":
/*!******************************************!*\
  !*** ./lib/statusFieldOptionsBuilder.ts ***!
  \******************************************/
/*! exports provided: statusFieldOptionsBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusFieldOptionsBuilder", function() { return statusFieldOptionsBuilder; });
/* harmony import */ var components_StatusThresholdOptionsEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/StatusThresholdOptionsEditor */ "./components/StatusThresholdOptionsEditor.tsx");

var statusFieldOptionsBuilder = function statusFieldOptionsBuilder(builder) {
  return builder.addSelect({
    path: 'aggregation',
    name: 'Aggregation',
    description: 'What to do if the query returns multiple data points.',
    defaultValue: 'last',
    settings: {
      options: [{
        label: 'Last',
        value: 'last'
      }, {
        label: 'First',
        value: 'first'
      }, {
        label: 'Max',
        value: 'max'
      }, {
        label: 'Min',
        value: 'min'
      }, {
        label: 'Sum',
        value: 'sum'
      }, {
        label: 'Avg',
        value: 'mean'
      }, {
        label: 'Delta',
        value: 'delta'
      }]
    },
    category: ['Display Options']
  }).addTextInput({
    path: 'valueDisplayRegex',
    name: 'Value Regex',
    description: "A regex which will decide the part of the value to be displayed. In case the regex is empty or it doesn't match any part of the metrics value, all the metric value will be displayed.",
    defaultValue: '',
    settings: {},
    category: ['Display Options']
  }).addSelect({
    path: 'fontFormat',
    name: 'Font Format',
    description: 'The metric text font format in disable, warning or critical state',
    defaultValue: 'Regular',
    settings: {
      options: [{
        label: 'Regular',
        value: 'Regular'
      }, {
        label: 'Bold',
        value: 'Bold'
      }, {
        label: 'Italic',
        value: 'Italic'
      }]
    },
    category: ['Display Options']
  }).addCustomEditor({
    path: 'thresholds',
    id: 'thresholds',
    name: 'Threshold Type',
    defaultValue: {
      valueHandler: 'Number Threshold',
      warn: 70,
      crit: 90
    },
    description: 'The type of data to show to the panel.',
    editor: components_StatusThresholdOptionsEditor__WEBPACK_IMPORTED_MODULE_0__["StatusThresholdOptionsEditor"],
    override: components_StatusThresholdOptionsEditor__WEBPACK_IMPORTED_MODULE_0__["StatusThresholdOptionsEditor"],
    category: ['Threshold Options'],
    process: function process(x) {
      return x;
    },
    shouldApply: function shouldApply() {
      return true;
    }
  }).addSelect({
    path: 'displayType',
    name: 'Display Position',
    description: 'The location the value will be displayed',
    defaultValue: 'Regular',
    settings: {
      options: [{
        label: 'Regular',
        value: 'Regular',
        description: 'The alias + the value will be display in the center, under the panel title'
      }, {
        label: 'Annotation',
        value: 'Annotation',
        description: 'The alias + the value will be displayed on top left. If the value answers a threshold condition, it will displayed as regular state'
      }]
    },
    category: ['Display Options'],
    showIf: function showIf(_a) {
      var thresholds = _a.thresholds;
      return thresholds.valueHandler !== 'Disable Criteria';
    }
  }).addTextInput({
    path: 'dateFormat',
    name: 'Date Format',
    defaultValue: 'YYYY-MM-DD HH:mm:ss',
    description: 'Specify the Date/Time format (Use "lll" for local date/time format)',
    category: ['Display Options'],
    showIf: function showIf(_a) {
      var thresholds = _a.thresholds;
      return thresholds.valueHandler === 'Date Threshold';
    }
  }).addSelect({
    path: 'displayAliasType',
    name: 'Display Alias',
    description: 'When to display the alias',
    defaultValue: 'Warning / Critical',
    settings: {
      options: [{
        label: 'Warning / Critical',
        value: 'Warning / Critical',
        description: 'The alias will be displayed in warning or critical state'
      }, {
        label: 'Always',
        value: 'Always',
        description: 'The alias will always be displayed, regardless critical and warning state'
      }]
    },
    category: ['Display Options'],
    showIf: function showIf(_a) {
      var thresholds = _a.thresholds;
      return thresholds.valueHandler.slice(-9) === 'Threshold';
    }
  }).addSelect({
    path: 'displayValueWithAlias',
    name: 'Display Value',
    description: 'When to display the value along with the alias',
    defaultValue: 'When Alias Displayed',
    settings: {
      options: [{
        label: 'Never',
        value: 'Never',
        description: 'The value will never be displayed'
      }, {
        label: 'When Alias Displayed',
        value: 'When Alias Displayed',
        description: 'The value will be displayed always when alias is displayed'
      }, {
        label: 'Warning / Critical',
        value: 'Warning / Critical',
        description: 'The value will be displayed in warning or critical state'
      }, {
        label: 'Critical Only',
        value: 'Critical Only',
        description: 'The value will be displayed in critical only'
      }]
    },
    category: ['Display Options'],
    showIf: function showIf(_a) {
      var thresholds = _a.thresholds;
      return thresholds.valueHandler.slice(-9) === 'Threshold';
    }
  }).addTextInput({
    path: 'disabledValue',
    name: 'Disable Criteria',
    description: 'The exact value which will make this panel to be displayed as disabled',
    category: ['Threshold Options'],
    showIf: function showIf(_a) {
      var thresholds = _a.thresholds;
      return thresholds.valueHandler === 'Disable Criteria';
    }
  });
};

/***/ }),

/***/ "./lib/statusMigrationHandler.ts":
/*!***************************************!*\
  !*** ./lib/statusMigrationHandler.ts ***!
  \***************************************/
/*! exports provided: statusMigrationHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusMigrationHandler", function() { return statusMigrationHandler; });
var isAngularModel = function isAngularModel(panel) {
  return !!panel.options && 'clusterName' in panel;
};
var statusMigrationHandler = function statusMigrationHandler(panel) {
  var _a, _b;
  if (isAngularModel(panel)) {
    var clusterLink = panel.links[0];
    var options = {
      clusterName: panel.clusterName,
      clusterUrl: (_a = clusterLink) === null || _a === void 0 ? void 0 : _a.url,
      clusterTargetBlank: !!((_b = clusterLink) === null || _b === void 0 ? void 0 : _b.targetBlank),
      namePrefix: panel.namePrefix,
      maxAlertNumber: panel.maxAlertNumber,
      cornerRadius: panel.cornerRadius + "%",
      flipCard: panel.flipCard,
      flipTime: panel.flipTime,
      colorMode: panel.colorMode,
      colors: panel.colors,
      isAutoScrollOnOverflow: panel.isAutoScrollOnOverflow,
      isGrayOnNoData: panel.isGrayOnNoData,
      isIgnoreOKColors: panel.isIgnoreOKColors,
      isHideAlertsOnDisable: panel.isHideAlertsOnDisable
    };
    return options;
  } else {
    return {};
  }
};

/***/ }),

/***/ "./lib/statusPanelOptionsBuilder.ts":
/*!******************************************!*\
  !*** ./lib/statusPanelOptionsBuilder.ts ***!
  \******************************************/
/*! exports provided: statusPanelOptionsBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusPanelOptionsBuilder", function() { return statusPanelOptionsBuilder; });
/* harmony import */ var components_StatusColorOptionsEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/StatusColorOptionsEditor */ "./components/StatusColorOptionsEditor.tsx");

var statusPanelOptionsBuilder = function statusPanelOptionsBuilder(builder) {
  return builder.addTextInput({
    path: 'clusterName',
    name: 'Cluster Name',
    description: '',
    defaultValue: '',
    category: ['Panel Options'],
    settings: {
      expandTemplateVars: true
    }
  }).addTextInput({
    path: 'clusterUrl',
    name: 'Cluster URL',
    description: '',
    defaultValue: '',
    category: ['Panel Options'],
    settings: {
      expandTemplateVars: true
    }
  }).addBooleanSwitch({
    path: 'clusterTargetBlank',
    name: 'Open Cluster URL in new tab',
    defaultValue: false,
    category: ['Panel Options'],
    showIf: function showIf(_a) {
      var clusterUrl = _a.clusterUrl;
      return !!clusterUrl;
    }
  }).addTextInput({
    path: 'namePrefix',
    name: 'Remove Prefix',
    defaultValue: '',
    description: 'A prefix to remove from the name (helpful when repeating panel over a template)',
    category: ['Panel Options']
  }).addNumberInput({
    path: 'maxAlertNumber',
    name: 'Max Alerts',
    defaultValue: -1,
    description: 'Max alerts number to show in the panel. In case value is less than zero, show all alerts',
    category: ['Panel Options']
  }).addTextInput({
    path: 'cornerRadius',
    name: 'Corner Radius',
    defaultValue: '0rem',
    description: 'The corner radius to apply the panel. Values are used for the border-radius CSS attribute.',
    category: ['Panel Options']
  }).addBooleanSwitch({
    path: 'flipCard',
    name: 'Flip Panel',
    defaultValue: false,
    category: ['Panel Options']
  }).addNumberInput({
    path: 'flipTime',
    name: 'Flip interval',
    defaultValue: 5,
    category: ['Panel Options'],
    showIf: function showIf(_a) {
      var flipCard = _a.flipCard;
      return flipCard;
    }
  }).addSelect({
    path: 'colorMode',
    name: 'Coloring Mode',
    description: '',
    defaultValue: 'Panel',
    settings: {
      options: [{
        label: 'Panel',
        value: 'Panel',
        description: 'Apply color to the panel background'
      }, {
        label: 'Metric',
        value: 'Metric',
        description: 'Apply color to the metric text'
      }, {
        label: 'Disabled',
        value: 'Disabled',
        description: 'Do not apply any coloring'
      }]
    },
    category: ['Threshold Options']
  })
  // Default colors match Table Panel so colorised text is easier to read
  .addCustomEditor({
    id: 'colors',
    path: 'colors',
    name: 'Colors',
    editor: components_StatusColorOptionsEditor__WEBPACK_IMPORTED_MODULE_0__["StatusColorOptionsEditor"],
    category: ['Threshold Options']
  }).addBooleanSwitch({
    path: 'isAutoScrollOnOverflow',
    name: 'Auto scroll alerts on overflow',
    defaultValue: false,
    category: ['Other Options']
  }).addBooleanSwitch({
    path: 'isGrayOnNoData',
    name: "Use 'Disable' color if no data",
    defaultValue: false,
    category: ['Other Options']
  }).addBooleanSwitch({
    path: 'isIgnoreOKColors',
    name: 'Ignore color in OK state',
    defaultValue: false,
    category: ['Other Options']
  }).addBooleanSwitch({
    path: 'isHideAlertsOnDisable',
    name: 'Hide alerts in Disabled state',
    defaultValue: false,
    category: ['Other Options']
  });
};

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_StatusPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/StatusPanel */ "./components/StatusPanel.tsx");
/* harmony import */ var lib_statusMigrationHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib/statusMigrationHandler */ "./lib/statusMigrationHandler.ts");
/* harmony import */ var lib_statusPanelOptionsBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib/statusPanelOptionsBuilder */ "./lib/statusPanelOptionsBuilder.ts");
/* harmony import */ var lib_statusFieldOptionsBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib/statusFieldOptionsBuilder */ "./lib/statusFieldOptionsBuilder.ts");





var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["PanelPlugin"](_components_StatusPanel__WEBPACK_IMPORTED_MODULE_1__["StatusPanel"]).setMigrationHandler(lib_statusMigrationHandler__WEBPACK_IMPORTED_MODULE_2__["statusMigrationHandler"]).setPanelOptions(lib_statusPanelOptionsBuilder__WEBPACK_IMPORTED_MODULE_3__["statusPanelOptionsBuilder"]).useFieldConfig({
  useCustomConfig: lib_statusFieldOptionsBuilder__WEBPACK_IMPORTED_MODULE_4__["statusFieldOptionsBuilder"]
});

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "emotion":
/*!**************************!*\
  !*** external "emotion" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_emotion__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map