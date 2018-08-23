(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "3252":
/*!********************************!*\
  !*** ./src/images/bgindex.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/ac27482d975571c04200.jpg\";\n\n//# sourceURL=webpack:///./src/images/bgindex.jpg?");

/***/ }),

/***/ "Lgzw":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2!./src/components/Index/index.scss ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"I1BE\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".index__container__3Ev6r2gs1z img{width:100%}\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"container\": \"index__container__3Ev6r2gs1z\"\n};\n\n//# sourceURL=webpack:///./src/components/Index/index.scss?./node_modules/css-loader??ref--7-1!./node_modules/sass-loader/lib/loader.js??ref--7-2");

/***/ }),

/***/ "Wn7M":
/*!****************************************!*\
  !*** ./src/components/Index/index.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"q1tI\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd_lib_date_picker_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/date-picker/style/css */ \"oGn0\");\n/* harmony import */ var antd_lib_date_picker_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_date_picker_style_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss */ \"l1bT\");\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _images_bgindex_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/bgindex.jpg */ \"3252\");\n/* harmony import */ var _images_bgindex_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_bgindex_jpg__WEBPACK_IMPORTED_MODULE_3__);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n\n\n\n\n\nvar Index = function (_React$Component) {\n  _inherits(Index, _React$Component);\n\n  function Index(props) {\n    _classCallCheck(this, Index);\n\n    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));\n\n    _this.state = {\n      date: ''\n    };\n    return _this;\n  }\n\n  _createClass(Index, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var _props = this.props,\n          setBreadCrumb = _props.setBreadCrumb,\n          getLoginUserInfo = _props.getLoginUserInfo;\n\n      getLoginUserInfo();\n      setBreadCrumb('首页', '');\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n        'div',\n        { className: _index_scss__WEBPACK_IMPORTED_MODULE_2__[\"container\"] },\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('img', { src: _images_bgindex_jpg__WEBPACK_IMPORTED_MODULE_3___default.a, alt: '\\u80CC\\u666F\\u56FE\\u7247' })\n      );\n    }\n  }]);\n\n  return Index;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nvar _default = Index;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(Index, 'Index', '/Users/liuxiaodong/myfiles/reduxStart/src/components/Index/index.jsx');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/liuxiaodong/myfiles/reduxStart/src/components/Index/index.jsx');\n}();\n\n;\n\n//# sourceURL=webpack:///./src/components/Index/index.jsx?");

/***/ }),

/***/ "kEfb":
/*!*********************************!*\
  !*** ./src/containers/Index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ \"/MKj\");\n/* harmony import */ var components_Index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Index */ \"Wn7M\");\n/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! actions */ \"9At1\");\n\n\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {};\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    setBreadCrumb: function setBreadCrumb(firstNav, secondNav) {\n      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_2__[\"setBreadCrumb\"])(firstNav, secondNav));\n    },\n    getLoginUserInfo: function getLoginUserInfo() {\n      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_2__[\"getLoginUserInfo\"])());\n    }\n  };\n};\n\nvar _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__[\"connect\"])(mapStateToProps, mapDispatchToProps)(components_Index__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/liuxiaodong/myfiles/reduxStart/src/containers/Index.js');\n\n  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/liuxiaodong/myfiles/reduxStart/src/containers/Index.js');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/liuxiaodong/myfiles/reduxStart/src/containers/Index.js');\n}();\n\n;\n\n//# sourceURL=webpack:///./src/containers/Index.js?");

/***/ }),

/***/ "l1bT":
/*!*****************************************!*\
  !*** ./src/components/Index/index.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/sass-loader/lib/loader.js??ref--7-2!./index.scss */ \"Lgzw\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"aET+\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/Index/index.scss?");

/***/ })

}]);