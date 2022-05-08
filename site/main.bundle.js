/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/style.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/style.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../font/classic_console_neue.ttf */ \"./src/font/classic_console_neue.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../img/noise_screen.png */ \"./src/img/noise_screen.png\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"html {\\n  overflow: hidden;\\n  background-color: black;\\n  color: white;\\n  font-family: \\\"Classic Console Neue\\\";\\n}\\n\\n/* fonts */\\n@font-face {\\n  font-family: \\\"Classic Console Neue\\\";\\n  font-size: normal;\\n  font-weight: 400;\\n  src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \") format(\\\"truetype\\\");\\n}\\n.layer {\\n  position: fixed;\\n  height: 100vh;\\n  width: 100vw;\\n  top: 0;\\n  left: 0;\\n}\\n\\n#top-layer {\\n  z-index: 1000;\\n}\\n\\n#second-layer {\\n  z-index: 999;\\n}\\n\\n#third-layer {\\n  z-index: 998;\\n}\\n\\n.clickthrough {\\n  pointer-events: none;\\n}\\n\\n.noselect {\\n  -webkit-user-select: none;\\n  -khtml-user-select: none;\\n  -moz-user-select: none;\\n  -o-user-select: none;\\n  user-select: none;\\n}\\n\\n#terminal-container {\\n  position: fixed;\\n  top: 2.5vh;\\n  left: 5vw;\\n  width: 90vw;\\n  max-width: 500px;\\n  height: calc(100% - 24px - 48px - 10vh);\\n  overflow-x: hidden;\\n  overflow-y: scroll;\\n  -ms-overflow-style: none;\\n  scrollbar-width: none;\\n}\\n#terminal-container::-webkit-scrollbar {\\n  display: none;\\n}\\n\\n#virtual-keyboard {\\n  display: none;\\n  position: fixed;\\n  width: 90vw;\\n  max-width: 500px;\\n  left: 5vw;\\n  bottom: calc(24px + 48px + 7.5vh);\\n  height: 180px;\\n}\\n#virtual-keyboard.on {\\n  display: flex;\\n}\\n#virtual-keyboard.on ~ #terminal-container {\\n  height: calc(100% - 24px - 48px - 180px - 12.5vh);\\n}\\n\\n#function-key-container {\\n  position: fixed;\\n  bottom: calc(24px + 5vh);\\n  height: 48px;\\n  left: 5vw;\\n  width: 90vw;\\n  max-width: 500px;\\n}\\n\\n#footer {\\n  display: flex;\\n  justify-content: center;\\n  position: fixed;\\n  bottom: 2.5vh;\\n  left: 5vw;\\n  height: 24px;\\n  width: 90vw;\\n  max-width: 500px;\\n}\\n\\n#top-layer {\\n  opacity: 0.8;\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \");\\n}\\n\\n#terminal-container p {\\n  color: #78a88a;\\n  font-size: 20px;\\n  line-height: 24px;\\n  margin: 0;\\n}\\n#terminal-container p::-moz-selection {\\n  color: #000000;\\n  background: #78a88a;\\n}\\n#terminal-container .terminal-link {\\n  display: flex;\\n  gap: 10px;\\n  text-decoration: none;\\n  font-style: italic;\\n  width: fit-content;\\n}\\n#terminal-container .terminal-link .icon {\\n  height: 24px;\\n}\\n\\n#terminal-input {\\n  display: flex;\\n  flex-wrap: wrap;\\n}\\n#terminal-input .prompt,\\n#terminal-input .input,\\n#terminal-input .pointer {\\n  color: #984511;\\n  overflow-wrap: anywhere;\\n}\\n\\n#footer .text-container {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  height: 26px;\\n}\\n#footer .text-container #footer-date-str {\\n  font-size: 18px;\\n  font-family: \\\"Classic Console Neue\\\";\\n  color: #de9835;\\n  margin: auto;\\n}\\n\\n#function-key-container {\\n  display: flex;\\n  justify-content: space-between;\\n}\\n#function-key-container .container {\\n  display: flex;\\n  flex-direction: column;\\n}\\n#function-key-container .container .key {\\n  display: flex;\\n  gap: 5px;\\n  border: none;\\n  background: transparent;\\n  cursor: pointer;\\n}\\n#function-key-container .container .key .icon {\\n  height: 24px;\\n}\\n#function-key-container .container .key .text-container {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  height: 26px;\\n}\\n#function-key-container .container .key .text-container .text {\\n  font-size: 18px;\\n  font-family: \\\"Classic Console Neue\\\";\\n  color: #de9835;\\n}\\n\\n#virtual-keyboard {\\n  flex-direction: column;\\n  gap: 5%;\\n}\\n#virtual-keyboard .row {\\n  display: flex;\\n  flex-direction: row;\\n  gap: 1.5%;\\n  justify-content: center;\\n  height: 16%;\\n}\\n#virtual-keyboard .row .key {\\n  position: relative;\\n  height: 100%;\\n  min-width: fit-content;\\n  width: 8.65%;\\n  border: solid;\\n  border-radius: 6px;\\n  border-width: 2px;\\n  background: #000000;\\n  color: #de9835;\\n  cursor: pointer;\\n  font-size: 18px;\\n  box-shadow: 0px 2px 0px #984511;\\n  font-family: \\\"Classic Console Neue\\\";\\n}\\n#virtual-keyboard .row .key.hold {\\n  box-shadow: none;\\n  height: 175%;\\n  bottom: 75%;\\n}\\n#virtual-keyboard .row .key#virtual-key-Space {\\n  min-width: fit-content;\\n  width: 64.6666666667%;\\n  height: 120%;\\n}\\n#virtual-keyboard .row .key#virtual-key-Space.hold {\\n  height: 195%;\\n  bottom: 75%;\\n}\\n#virtual-keyboard .row .key#virtual-key-Enter {\\n  min-width: fit-content;\\n  width: 16.1666666667%;\\n  height: 120%;\\n}\\n#virtual-keyboard .row .key#virtual-key-Enter.hold {\\n  height: 195%;\\n  bottom: 75%;\\n}\\n#virtual-keyboard .row .key#virtual-key-Back {\\n  min-width: fit-content;\\n  width: 16.1666666667%;\\n  height: 120%;\\n}\\n#virtual-keyboard .row .key#virtual-key-Back.hold {\\n  height: 195%;\\n  bottom: 75%;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/style/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  }\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/style.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack:///./src/style/style.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/keyboardMonitor.js":
/*!********************************!*\
  !*** ./src/keyboardMonitor.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"KeyboardMonitor\": () => (/* binding */ KeyboardMonitor)\n/* harmony export */ });\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ \"./src/utilities.js\");\n\n\nclass KeyboardMonitor {\n    constructor() {\n        if (KeyboardMonitor._instance) {\n            throw \"singleton is already initialized\";\n        }\n\n        KeyboardMonitor._instance = this;\n\n        this.keyAllowedShowSet = new Set([\n            \"a\", \"b\", \"c\", \"d\", \"e\", \"f\", \"g\", \"h\", \"i\", \"j\", \n            \"k\", \"l\", \"m\", \"n\", \"o\", \"p\", \"q\", \"r\", \"s\", \"t\", \n            \"u\", \"v\", \"w\", \"x\", \"y\", \"z\", \n\n            \"A\", \"B\", \"C\", \"D\", \"E\", \"F\", \"G\", \"H\", \"I\", \"J\", \n            \"K\", \"L\", \"M\", \"N\", \"O\", \"P\", \"Q\", \"R\", \"S\", \"T\", \n            \"U\", \"V\", \"W\", \"X\", \"Y\", \"Z\", \n\n            \"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \n            \n            \"/\", ' ',\n        ]);\n\n        this.specialKeyHandlers = {};\n        this.updateFunc = () => {};\n        this.virtualKeyboard;\n\n        // init\n        this.#setupKeyListeners();\n    }\n\n    static getInstance() {\n        if (KeyboardMonitor._instance) {\n            return KeyboardMonitor._instance;\n        }\n\n        throw \"singletone was not initialized\"\n    }\n\n    #setupKeyListeners() {\n        document.addEventListener('keydown', (e) => {\n            const key = e.key;\n            this.pressKey(key, () => {e.preventDefault()});\n        });\n    }\n\n    keyIsAllowedShow(key) {\n        return this.keyAllowedShowSet.has(key);\n    }\n\n    keyIsSpecial(key) {\n        return this.specialKeyHandlers[key] !== undefined;\n    }\n\n    addSpecialKey(key, func) {\n        this.specialKeyHandlers[key] = func;\n    }\n\n    setUpdateFunc(func) {\n        this.updateFunc = func;\n    }\n\n    pressKey(key, callback=null) {\n        let isValid = false;\n        if (this.keyIsAllowedShow(key)) {\n            this.updateFunc(key);\n            isValid = true;\n        }\n\n        if (this.keyIsSpecial(key)) {\n            this.specialKeyHandlers[key]();\n            isValid = true;\n        }\n\n        if (isValid && callback !== null) {\n            callback();\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/keyboardMonitor.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ \"./src/utilities.js\");\n/* harmony import */ var _textList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./textList */ \"./src/textList.js\");\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/style.scss */ \"./src/style/style.scss\");\n\n\n\n\n\nfunction createHTMLStructure() {\n    const top_layer = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div','',{'id': 'top-layer', 'class':'layer clickthrough noselect'});\n    const second_layer = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div','',{'id': 'second-layer', 'class':'layer clickthrough noselect'});\n    const third_layer = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div','',{'id': 'third-layer', 'class':'layer'});\n\n    const third_layer_virtual_keyboard = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div','',{'id': 'virtual-keyboard'});\n    const third_layer_terminal_container = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div','',{'id': 'terminal-container'});\n    const third_layer_function_key_container = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div','',{'id': 'function-key-container', 'class': 'noselect'});\n    const third_layer_footer = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div','',{'id': 'footer'});\n    \n    const function_key_container_left = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div', '', {'class': 'container left'});\n    const function_key_container_middle = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div', '', {'class': 'container middle'});\n    const function_key_container_right = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)('div', '', {'class': 'container right'});\n\n    third_layer_function_key_container.appendChild(function_key_container_left);\n    third_layer_function_key_container.appendChild(function_key_container_middle);\n    third_layer_function_key_container.appendChild(function_key_container_right);\n\n    third_layer.appendChild(third_layer_virtual_keyboard);\n    third_layer.appendChild(third_layer_terminal_container);\n    third_layer.appendChild(third_layer_function_key_container);\n    third_layer.appendChild(third_layer_footer);\n\n\n    document.body.appendChild(top_layer);\n    document.body.appendChild(second_layer);\n    document.body.appendChild(third_layer);\n\n}   \n\nfunction main() {\n    // when dom css assets loaded\n    window.addEventListener('load', () => {\n        // setup html structure\n        createHTMLStructure();\n        \n        // init display singleton\n        const display = new _utilities__WEBPACK_IMPORTED_MODULE_0__.Display(document.querySelector(\"#terminal-container\"));\n\n        // welcome message\n        display.printList(_textList__WEBPACK_IMPORTED_MODULE_1__.welcomePrintingJobTextList, 600, 1800);\n    \n    });\n}\n\nmain();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/svgfactory.js":
/*!***************************!*\
  !*** ./src/svgfactory.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"icon\": () => (/* binding */ icon)\n/* harmony export */ });\nconst icon = {\n    'email': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><rect width=\"150\" height=\"150\" fill=\"none\"/><g transform=\"translate(210.644 15.566)\"><path d=\"M103.735,59.3H8.654A8.672,8.672,0,0,0,0,67.954v66.96a8.672,8.672,0,0,0,8.654,8.654h95.081a8.672,8.672,0,0,0,8.654-8.654V67.954A8.672,8.672,0,0,0,103.735,59.3ZM91.6,71.83l-34.81,28.195L21.978,71.83Zm8.262,56.955a2.267,2.267,0,0,1-2.253,2.253H14.783a2.267,2.267,0,0,1-2.253-2.253V80.993S53.157,115.209,54.7,116.169a3.316,3.316,0,0,0,4.126,0c1.6-.96,41.033-34.156,41.033-34.156Z\" transform=\"translate(-191.838 -42)\" fill=\"${fill}\"/></g></svg>`,\n    'link': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><rect width=\"150\" height=\"150\" fill=\"none\"/><g transform=\"translate(14.977 14.981)\"><path d=\"M187.388,9.634l-4.177-3.7a23.559,23.559,0,0,0-33.251,2L138.006,21.425a7.393,7.393,0,0,0,.625,10.42l1.122,1a7.379,7.379,0,0,0,10.424-.626l11.954-13.487a7.307,7.307,0,0,1,10.293-.62l4.172,3.7a7.3,7.3,0,0,1,.621,10.292L151.077,61.59a7.28,7.28,0,0,1-8.8,1.639,7.977,7.977,0,0,0-9.638,1.8l-.2.23a7.984,7.984,0,0,0,2.278,12.373,23.521,23.521,0,0,0,28.541-5.252L189.391,42.89A23.588,23.588,0,0,0,187.388,9.634Z\" transform=\"translate(-75.261 -0.011)\" fill=\"${fill}\"/><path d=\"M56.673,142.437l-1.125-1a7.392,7.392,0,0,0-10.421.63l-11.95,13.486a7.3,7.3,0,0,1-10.289.623l-4.178-3.707a7.289,7.289,0,0,1-.62-10.288L44.23,112.7a7.306,7.306,0,0,1,8.672-1.7,8.409,8.409,0,0,0,9.979-1.969l.094-.106A7.866,7.866,0,0,0,60.8,96.766a23.468,23.468,0,0,0-28.737,5.145L5.92,131.393h0a23.583,23.583,0,0,0,2,33.252l4.177,3.7a23.586,23.586,0,0,0,33.256-2L57.3,152.859A7.379,7.379,0,0,0,56.673,142.437Z\" transform=\"translate(-0.001 -54.226)\" fill=\"${fill}\"/></g></svg>`,\n\n    'about': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><rect width=\"150\" height=\"150\" fill=\"none\"/><g transform=\"translate(27.613 27.613)\"><path d=\"M47.387,0A47.387,47.387,0,1,0,94.773,47.387,47.441,47.441,0,0,0,47.387,0Zm0,86.158A38.771,38.771,0,1,1,86.158,47.387,38.815,38.815,0,0,1,47.387,86.158Z\" fill=\"${fill}\"/><path d=\"M150.745,70a5.744,5.744,0,1,0,5.743,5.746A5.751,5.751,0,0,0,150.745,70Z\" transform=\"translate(-103.359 -49.897)\" fill=\"${fill}\"/><path d=\"M154.308,140A4.308,4.308,0,0,0,150,144.308v25.847a4.308,4.308,0,1,0,8.616,0V144.308A4.308,4.308,0,0,0,154.308,140Z\" transform=\"translate(-106.921 -99.793)\" fill=\"${fill}\"/></g></svg>`,\n    'clean': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><rect width=\"150\" height=\"150\" fill=\"none\"/><g transform=\"translate(10 9.768)\"><rect width=\"25\" height=\"9\" transform=\"translate(105 81.232) rotate(180)\" fill=\"${fill}\"/><rect width=\"24\" height=\"9\" transform=\"translate(122 114.232) rotate(180)\" fill=\"${fill}\"/><rect width=\"25\" height=\"8\" transform=\"translate(114 97.232) rotate(180)\" fill=\"${fill}\"/><path d=\"M56.834,75.138a19.89,19.89,0,0,0-9.77-16.955L77.139,6.063,70.106,2,39.324,55.334a23.155,23.155,0,0,0-21.3,6.107C2.808,76.113,3.986,110.415,4.041,111.869a4.063,4.063,0,0,0,4.063,3.9H69.017a4.063,4.063,0,0,0,2.438-7.314C57.072,97.664,56.834,75.356,56.834,75.138Zm-20.612-12.2a12.637,12.637,0,0,1,12.491,12.2c0,.155.008.845.068,1.9L24.811,66.382a15.44,15.44,0,0,1,11.412-3.446Zm14.3,44.707a21.129,21.129,0,0,1-5.889-12.19H36.507a26.408,26.408,0,0,0,3.935,12.19H31.408A67.516,67.516,0,0,1,28.38,91.391H20.254a70.466,70.466,0,0,0,2.7,16.253H12.127c.126-7.462,1.178-23.941,7.325-34.751L50.06,86.5a52.925,52.925,0,0,0,9.187,21.14Z\" transform=\"translate(12.252 6.336)\" fill=\"${fill}\"/><rect width=\"130\" height=\"130\" transform=\"translate(0 0.232)\" fill=\"none\"/></g></svg>`,\n    'contact': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><rect width=\"150\" height=\"150\" fill=\"none\"/><g transform=\"translate(17.402 26.309)\"><g transform=\"translate(3 5)\"><path d=\"M93.451,4A17.744,17.744,0,0,1,111.2,21.744V73.637A17.744,17.744,0,0,1,93.451,91.382H19.744A17.744,17.744,0,0,1,2,73.637V21.744A17.745,17.745,0,0,1,18.737,4.028L19.744,4Zm0,8.19H19.744l-.784.032a9.555,9.555,0,0,0-8.771,9.523V73.637a9.555,9.555,0,0,0,9.555,9.555H93.451a9.555,9.555,0,0,0,9.555-9.555V21.744A9.555,9.555,0,0,0,93.451,12.19ZM41.6,50.408a4.1,4.1,0,0,1,4.1,4.095v3.179c0,6.945-5.288,10.471-13.657,10.471S18.379,64.623,18.379,57.675V54.5a4.1,4.1,0,0,1,4.095-4.095Zm8.632-.008,7.734.008A4.1,4.1,0,0,1,62.058,54.5v1.816c0,5.261-4.177,7.738-10.237,7.738-.634,0-1.248-.027-1.838-.082a15.561,15.561,0,0,0,1.121-4.91l.049-1.384V54.5A9.517,9.517,0,0,0,50.229,50.4Zm24.111.008H90.721a4.1,4.1,0,0,1,.556,8.153l-.556.037H74.34a4.1,4.1,0,0,1-.556-8.153l.556-.037h0ZM32.033,28.569a8.193,8.193,0,1,1-8.194,8.193A8.194,8.194,0,0,1,32.033,28.569Zm21.125,2.742a6.812,6.812,0,1,1-6.813,6.812A6.812,6.812,0,0,1,53.158,31.311ZM74.34,34.029H90.721a4.1,4.1,0,0,1,.556,8.153l-.556.037H74.34a4.1,4.1,0,0,1-.556-8.152l.556-.037h0Z\" transform=\"translate(-2 -4)\" fill=\"${fill}\"/></g></g></svg>`,\n    'github': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><rect width=\"150\" height=\"150\" fill=\"none\"/><path d=\"M47.388.4a47.4,47.4,0,0,0-15,92.356c2.378.447,3.237-1.019,3.237-2.286,0-1.125-.027-4.1-.044-8.053C22.4,85.27,19.619,76.044,19.619,76.044c-2.159-5.461-5.275-6.928-5.275-6.928-4.289-2.929.341-2.867.341-2.867,4.751.323,7.25,4.872,7.25,4.872,4.226,7.25,11.089,5.153,13.8,3.933a10.036,10.036,0,0,1,2.994-6.323c-10.52-1.188-21.582-5.26-21.582-23.419a18.3,18.3,0,0,1,4.872-12.727c-.524-1.188-2.129-6.015.418-12.543,0,0,3.966-1.265,13.032,4.86a44.6,44.6,0,0,1,23.694,0c9.013-6.125,12.975-4.86,12.975-4.86,2.544,6.528.939,11.352.477,12.543a18.423,18.423,0,0,1,4.842,12.727c0,18.2-11.077,22.213-21.609,23.371,1.647,1.419,3.19,4.336,3.19,8.764,0,6.338-.059,11.444-.059,12.987,0,1.232.829,2.713,3.27,2.236A47.327,47.327,0,0,0,47.382.395Z\" transform=\"translate(27.615 28.384)\" fill=\"${fill}\"/></svg>`,\n    'help': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><rect width=\"150\" height=\"150\" fill=\"none\"/><g transform=\"translate(120.641 211.504)\"><g transform=\"translate(4 2)\"><path d=\"M69.094,2A11.624,11.624,0,0,1,80.718,13.624V79.881a3.487,3.487,0,0,1-3.487,3.487H12.974a4.65,4.65,0,0,0,4.65,4.65H77.231a3.487,3.487,0,0,1,0,6.974H15.624A11.624,11.624,0,0,1,4,83.368V13.624A11.624,11.624,0,0,1,15.624,2Zm-2,8.974H17.624a4.65,4.65,0,0,0-4.65,4.65V74.393H71.744V15.624A4.65,4.65,0,0,0,67.094,10.974Zm-7.3,4.974a4.65,4.65,0,0,1,4.65,4.65V33.9a4.65,4.65,0,0,1-4.65,4.65H22.6a4.65,4.65,0,0,1-4.65-4.65V20.6a4.65,4.65,0,0,1,4.65-4.65ZM55.47,24.923H26.923v4.65H55.47Z\" transform=\"translate(-92 -187)\" fill=\"${fill}\"/></g></g></svg>`,\n    'keyboard': (fill,size) => `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" viewBox=\"0 0 150 150\"><path d=\"M0,0H150V150H0Z\" fill=\"none\"/><g transform=\"translate(8 -58.517)\"><path d=\"M123,168.631V98.4a6.3,6.3,0,0,0-6.469-6.1H17.469A6.3,6.3,0,0,0,11,98.4v70.229a6.3,6.3,0,0,0,6.469,6.1h99.063A6.29,6.29,0,0,0,123,168.631Zm-102.4-4V102.4c0-.206.343-.5.869-.5h91.063c.549,0,.869.32.869.5v62.229c0,.206-.343.5-.869.5H21.469C20.943,165.134,20.6,164.837,20.6,164.631Z\" transform=\"translate(0 0)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(27.942 109.606)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(45.6 109.606)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(63.286 109.606)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(80.972 109.606)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(96.538 109.606)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(36.771 127.829)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(54.457 127.829)\" fill=\"${fill}\"/><ellipse cx=\"4.76\" cy=\"4.76\" rx=\"4.76\" ry=\"4.76\" transform=\"translate(72.115 127.829)\" fill=\"${fill}\"/><path d=\"M370.76,240.7h0a4.76,4.76,0,1,0,0,9.52h0a4.76,4.76,0,1,0,0-9.52Z\" transform=\"translate(-276.199 -112.871)\" fill=\"${fill}\"/><path d=\"M188.5,308.7H137.282c-1.593,0-2.882,1.952-2.882,4.367s1.289,4.366,2.882,4.366H188.5c1.593,0,2.882-1.952,2.882-4.366S190.094,308.7,188.5,308.7Z\" transform=\"translate(-95.891 -161.105)\" fill=\"${fill}\"/></g></svg>`,\n}\n\n//# sourceURL=webpack:///./src/svgfactory.js?");

/***/ }),

/***/ "./src/textList.js":
/*!*************************!*\
  !*** ./src/textList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"welcomePrintingJobTextList\": () => (/* binding */ welcomePrintingJobTextList)\n/* harmony export */ });\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ \"./src/utilities.js\");\n\n\n// utility funcs\nfunction PJ(type, param={}) {\n    return new _utilities__WEBPACK_IMPORTED_MODULE_0__.PrintJob(type, param);\n}\n\n// text lists\nconst welcomePrintingJobTextList = [\n    PJ(\"text\", {text: \"Hello stranger!<br>Welcome... Welcome...\"}),\n    PJ(\"text\", {text: \"Name is Gengyuan Huang<br>A programmer...\"}),\n    PJ(\"line\", {height: 2}),\n\n    PJ(\"text\", {text: \"I have recently graduated from the University of Alberta with a CS degree...<br>I have rent to pay, and a mouth to feed (my mouth)...\"}),\n    PJ(\"line\", {height: 2}),\n\n    PJ(\"text\", {text: \"if you wish to know more about me, my life or my cat...<br>or my social insurance number<br>please type /help\"}),\n    PJ(\"line\", {height: 2}),\n\n    PJ(\"text\", {text: \"To contact me:\"}),\n    PJ(\"link\", {link: \"mailto:gengyuan@ualberta.ca\", text: \"gengyuan@ualberta.ca\", type: \"email\"}),\n    PJ(\"line\", {height: 1}),\n]\n\n\n\n//# sourceURL=webpack:///./src/textList.js?");

/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Display\": () => (/* binding */ Display),\n/* harmony export */   \"PrintJob\": () => (/* binding */ PrintJob),\n/* harmony export */   \"createHTMLElement\": () => (/* binding */ createHTMLElement),\n/* harmony export */   \"setRandInterval\": () => (/* binding */ setRandInterval)\n/* harmony export */ });\n/* harmony import */ var _keyboardMonitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboardMonitor */ \"./src/keyboardMonitor.js\");\n/* harmony import */ var _svgfactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svgfactory */ \"./src/svgfactory.js\");\n\n\n\nclass PrintJob {\n    constructor(type, parameters={}) {\n        this.type = type;\n        this.parameters = parameters;\n    }\n}\n\nclass Display {\n    #flashCursor;\n    #inputUpdateTaskList = [];\n    #inputUpdate;\n\n    constructor(container) {\n        if (Display._instance) {\n            throw \"singleton is already initialized\";\n        }\n\n        // public fields\n        Display._instance = this;\n        this.terminal_container = container;\n        this.inputTextArea = \"\";\n        this.displayHist = {};\n       \n        // init setup\n        new _keyboardMonitor__WEBPACK_IMPORTED_MODULE_0__.KeyboardMonitor();\n        this.#setupKeyListeners();\n        this.#createFlashCursor();\n        this.#createFooter();\n        this.#createFunctionKeys();\n        this.#createVirtualKeyboard();\n    }\n\n    static getInstance() {\n        if (Display._instance) {\n            return Display._instance;\n        }\n\n        throw \"singleton was not initialized\";;\n    }\n\n    #createVirtualKeyboard() {\n        const vKeyboard = _keyboardMonitor__WEBPACK_IMPORTED_MODULE_0__.KeyboardMonitor.getInstance();\n\n        const keyboardKeyMap = [\n            ['1','2','3','4','5','6','7','8','9','0',],\n            ['q','w','e','r','t','y','u','i','o','p'],\n            ['a','s','d','f','g','h','j','k','l',],\n            ['z','x','c','v','b','n','m','/'],\n            [' ', 'Enter','Backspace'],\n        ]\n\n        const keyboardTextMap = [\n            ['1','2','3','4','5','6','7','8','9','0',],\n            ['q','w','e','r','t','y','u','i','o','p'],\n            ['a','s','d','f','g','h','j','k','l',],\n            ['z','x','c','v','b','n','m','/'],\n            ['Space', 'Enter', 'Back'],\n        ]\n\n        const keyboard_container = document.querySelector('#virtual-keyboard');\n\n        for (let r = 0; r < keyboardTextMap.length; r++) {\n            const keyboard_key_row = createHTMLElement('div', '', {'class': 'row'});\n            for (let i = 0; i < keyboardTextMap[r].length; i++) {\n                const text = keyboardTextMap[r][i];\n                const key = keyboardKeyMap[r][i];\n\n                const keyboard_key = createHTMLElement('button', text, {'class': 'key noselect', 'id': \"virtual-key-\" + text});\n                \n                let keyPressed = false;\n                let continueTypingCheckingTimeout = null;\n                let continueTypingInterval = null;\n\n\n                const keyDownFunc = () => {\n                    if (continueTypingCheckingTimeout) {\n                        clearTimeout(continueTypingCheckingTimeout);\n                        continueTypingCheckingTimeout = null;\n                    }\n\n                    if (continueTypingInterval) {\n                        clearInterval(continueTypingInterval);\n                        continueTypingInterval = null;\n                    }\n                    \n\n                    keyboard_key.classList.add('hold');\n                    keyPressed = true;\n\n                    continueTypingCheckingTimeout = setTimeout(() => {\n                        if (keyPressed === true) {\n                            continueTypingInterval = setInterval(() => {\n                                vKeyboard.pressKey(key);\n                            }, 50);\n                        }\n                    }, 500);\n                }\n\n                const keyUpFunc = () => {  \n                    \n                    if (continueTypingCheckingTimeout) {\n                        clearTimeout(continueTypingCheckingTimeout);\n                        continueTypingCheckingTimeout = null;\n                    }\n\n                    if (continueTypingInterval) {\n                        clearInterval(continueTypingInterval);\n                        continueTypingInterval = null;\n                    } else {\n                        if (keyPressed) {\n                            vKeyboard.pressKey(key)\n                        }\n                    }\n    \n                    keyboard_key.classList.remove('hold');\n                    keyPressed = false;\n                    \n                }\n\n                // touch events\n                keyboard_key.addEventListener('touchstart', (e) => {\n                    e.preventDefault();\n                    keyDownFunc();\n                });\n\n                keyboard_key.addEventListener('touchend', (e) => {\n                    e.preventDefault();\n                    keyUpFunc();\n                });\n\n                keyboard_key.addEventListener('touchcancel', (e) => {\n                    e.preventDefault();\n                    keyUpFunc();\n                });\n\n                // click events\n                keyboard_key.addEventListener('mousedown', (e) => {\n                    e.preventDefault();\n                    keyDownFunc();\n                });\n\n                keyboard_key.addEventListener('mouseup', (e) => {\n                    e.preventDefault();\n                    keyUpFunc();\n                });\n\n                //global up\n                document.addEventListener('mouseup', (e) => {\n                    keyUpFunc();\n                });\n\n\n\n                keyboard_key_row.appendChild(keyboard_key);\n            }\n            keyboard_container.append(keyboard_key_row);\n        }      \n    }\n\n    #createFunctionKeys() {\n        const col_l = document.querySelector(\"#function-key-container .left\");\n        const col_m = document.querySelector(\"#function-key-container .middle\");\n        const col_r = document.querySelector(\"#function-key-container .right\");\n\n        const keys = [\n            {\n                'type': 'keyboard',\n                'text': 'keyboard',\n                'col': 'left',\n                'func': () => {\n                    const keyboard = document.querySelector('#virtual-keyboard');\n                    if (keyboard) {\n                        keyboard.classList.toggle('on');\n                        this.#flashCursor.scrollIntoView(true);\n                    }\n                },\n            },\n            {\n                'type': 'clean',\n                'text': 'clear',\n                'col': 'middle',\n                'func': () => {},\n            },\n            {\n                'type': 'help',\n                'text': 'help',\n                'col': 'right',\n                'func': () => {},\n            },\n            {\n                'type': 'contact',\n                'text': 'contact',\n                'col': 'left',\n                'func': () => {},\n            },\n            {\n                'type': 'about',\n                'text': 'about',\n                'col': 'middle',\n                'func': () => {},\n            },\n            {\n                'type': 'github',\n                'text': 'projects',\n                'col': 'right',\n                'func': () => {},\n            },\n        ];\n\n        keys.forEach((key) => {\n            const el = createHTMLElement('button', '', {'class': 'key'});\n            const elIcon = createHTMLElement('div', _svgfactory__WEBPACK_IMPORTED_MODULE_1__.icon[key.type]('#984511', '26px'), {'class': 'icon'});\n            const elText = createHTMLElement('text', key.text, {'class': 'text'});\n            const elTextContainer = createHTMLElement('div', '', {'class': 'text-container'});\n            \n            el.onclick = key.func;\n\n            elTextContainer.appendChild(elText);\n            el.appendChild(elIcon);\n            el.appendChild(elTextContainer);\n            \n            switch (key.col) {\n                case 'left':\n                    col_l.appendChild(el);\n                    break;\n                case 'middle':\n                    col_m.appendChild(el);\n                    break;\n                case 'right':\n                    col_r.appendChild(el);\n                    break;\n            }\n\n        });\n    }\n\n    #createFooter() {\n        const footer = document.querySelector('#footer');\n        const footerDateEl = createHTMLElement('p', '', {'id': 'footer-date-str'});\n        const footerTextContainer = createHTMLElement('div', '', {'class': 'text-container'});\n\n        const date = new Date();\n        footerDateEl.innerHTML = date.toLocaleDateString() + \"&nbsp\" + date.toLocaleTimeString();\n        setInterval(() => {\n            const date = new Date();\n            footerDateEl.innerHTML = date.toLocaleDateString() + \"&nbsp\" + date.toLocaleTimeString();\n        }, 1000);\n\n        footerTextContainer.appendChild(footerDateEl);\n        footer.appendChild(footerTextContainer);\n    }\n\n    #createFlashCursor() {\n        const prtStr = \"guest@aghnu.me:/$:&nbsp\";\n        const cursorStr = \"_\";\n        let fl = false;\n        \n        // setup cursor element and interval\n        this.#flashCursor = createHTMLElement('div', '', {'id': 'terminal-input'});\n        window.addEventListener('resize', () => {this.#flashCursor.scrollIntoView(true)});\n\n        const prompt = createHTMLElement('p', prtStr, {'class': 'prompt'});\n        const input = createHTMLElement('p', '', {'class': 'input', type: 'text', readonly: true});\n        const pointer = createHTMLElement('p', cursorStr, {'class': 'pointer'});\n\n        setInterval(() => {\n            pointer.innerHTML = (fl) ? '&nbsp' : cursorStr;\n            fl = !fl;\n        }, 500);\n\n        this.#flashCursor.appendChild(prompt);\n        this.#flashCursor.appendChild(input);\n        this.#flashCursor.appendChild(pointer);\n\n        this.#addFuncToTaskInput(() => {\n            input.innerHTML = this.inputTextArea.replaceAll(' ', '&nbsp');\n            this.#flashCursor.scrollIntoView(true);\n        });\n\n\n        // add cursor to display\n        this.terminal_container.appendChild(this.#flashCursor);\n    }\n\n    #addFuncToTaskInput(func) {\n        this.#inputUpdateTaskList.push(func);\n    }\n\n    #setupKeyListeners() {\n        const kmonitor = _keyboardMonitor__WEBPACK_IMPORTED_MODULE_0__.KeyboardMonitor.getInstance();\n\n        this.#inputUpdate = (char) => {\n            this.inputTextArea += char;\n\n            // call functions inside the update list\n            this.#inputUpdateTaskList.forEach((func) => func());\n        };\n\n        kmonitor.setUpdateFunc(this.#inputUpdate);\n\n        // set specials\n        kmonitor.addSpecialKey('Backspace', () => {\n            this.inputTextArea = this.inputTextArea.slice(0, -1);\n            this.#inputUpdateTaskList.forEach((func) => func());\n        });\n\n\n    }\n\n    printLink(param) {\n        const el = createHTMLElement('a', '', {'class': 'terminal-link', \"href\": param.link});\n        const link_icon = createHTMLElement('div', _svgfactory__WEBPACK_IMPORTED_MODULE_1__.icon[param.type]('#78a88a', '24px'), {'class': 'icon'});\n        const link_text = createHTMLElement('p', param.text, {'class': 'text'});\n\n        el.appendChild(link_icon);\n        el.appendChild(link_text);\n\n        this.terminal_container.insertBefore(el, this.#flashCursor);\n        this.#flashCursor.scrollIntoView(true);\n    }\n\n    printText(param) {\n        const el = createHTMLElement('p', param.text);\n        this.terminal_container.insertBefore(el, this.#flashCursor);\n        this.#flashCursor.scrollIntoView(true);\n    }\n\n    printLine(param) {\n        const el = createHTMLElement('p');\n\n        if (param.height) {\n            let innerHTML = \"\";\n            for (let i = 0; i < param.height; i++) {\n                innerHTML += \"<br>\";\n            }\n            el.innerHTML = innerHTML;\n        } else {\n            el.innerHTML = \"<br>\";\n        }\n\n        this.terminal_container.insertBefore(el, this.#flashCursor);\n        this.#flashCursor.scrollIntoView(true);\n    }\n\n    print(printJob) {\n        switch (printJob.type) {\n            case \"text\":\n                this.printText(printJob.parameters);\n                break;\n            case \"line\":\n                this.printLine(printJob.parameters);\n                break;\n            case \"link\":\n                this.printLink(printJob.parameters);\n                break;\n        }\n    }\n\n    printList(printJobList, min_interval=500, max_interval=null) {\n        let printingIndex = 0;\n\n        if (max_interval === null) {\n            max_interval = min_interval;\n        }\n        const printing = setRandInterval(() => {\n            if (printingIndex >= printJobList.length) {\n                printing.clear();\n            } else {\n                this.print(printJobList[printingIndex++]);\n            }\n        }, min_interval, max_interval);\n    }\n\n    clear() {\n        this.terminal_container.innerHTML = \"\";\n        this.terminal_container.appendChild(this.#flashCursor);\n        this.#flashCursor.scrollIntoView(true);\n    }\n}\n\n\nfunction createHTMLElement(tag, innerHTML=\"\", attributes={}) {\n    const el = document.createElement(tag);\n    el.innerHTML = innerHTML;\n    for (let att in attributes) {\n        el.setAttribute(att, attributes[att]);\n    }\n    return el;\n}\n\nfunction setRandInterval (func, min, max) {\n    let currentTimeout;\n\n    const runTimeout = () => {\n        currentTimeout = setTimeout(() => {\n            func();\n            runTimeout();\n        }, Math.floor(Math.random() * (max - min + 1)) + min);\n    }\n\n    runTimeout();\n\n    return {\n        clear: () => {\n            clearTimeout(currentTimeout);\n        }\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/utilities.js?");

/***/ }),

/***/ "./src/font/classic_console_neue.ttf":
/*!*******************************************!*\
  !*** ./src/font/classic_console_neue.ttf ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"5bf9de9284ff094e27c6.ttf\";\n\n//# sourceURL=webpack:///./src/font/classic_console_neue.ttf?");

/***/ }),

/***/ "./src/img/noise_screen.png":
/*!**********************************!*\
  !*** ./src/img/noise_screen.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"46854604e0614cb8b029.png\";\n\n//# sourceURL=webpack:///./src/img/noise_screen.png?");

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;