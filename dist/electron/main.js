module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_debug@4.3.4@debug/src/browser.js":
/*!********************************************************!*\
  !*** ./node_modules/_debug@4.3.4@debug/src/browser.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-env browser */\n\n/**\n * This is the web browser implementation of `debug()`.\n */\n\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = localstorage();\nexports.destroy = (() => {\n\tlet warned = false;\n\n\treturn () => {\n\t\tif (!warned) {\n\t\t\twarned = true;\n\t\t\tconsole.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');\n\t\t}\n\t};\n})();\n\n/**\n * Colors.\n */\n\nexports.colors = [\n\t'#0000CC',\n\t'#0000FF',\n\t'#0033CC',\n\t'#0033FF',\n\t'#0066CC',\n\t'#0066FF',\n\t'#0099CC',\n\t'#0099FF',\n\t'#00CC00',\n\t'#00CC33',\n\t'#00CC66',\n\t'#00CC99',\n\t'#00CCCC',\n\t'#00CCFF',\n\t'#3300CC',\n\t'#3300FF',\n\t'#3333CC',\n\t'#3333FF',\n\t'#3366CC',\n\t'#3366FF',\n\t'#3399CC',\n\t'#3399FF',\n\t'#33CC00',\n\t'#33CC33',\n\t'#33CC66',\n\t'#33CC99',\n\t'#33CCCC',\n\t'#33CCFF',\n\t'#6600CC',\n\t'#6600FF',\n\t'#6633CC',\n\t'#6633FF',\n\t'#66CC00',\n\t'#66CC33',\n\t'#9900CC',\n\t'#9900FF',\n\t'#9933CC',\n\t'#9933FF',\n\t'#99CC00',\n\t'#99CC33',\n\t'#CC0000',\n\t'#CC0033',\n\t'#CC0066',\n\t'#CC0099',\n\t'#CC00CC',\n\t'#CC00FF',\n\t'#CC3300',\n\t'#CC3333',\n\t'#CC3366',\n\t'#CC3399',\n\t'#CC33CC',\n\t'#CC33FF',\n\t'#CC6600',\n\t'#CC6633',\n\t'#CC9900',\n\t'#CC9933',\n\t'#CCCC00',\n\t'#CCCC33',\n\t'#FF0000',\n\t'#FF0033',\n\t'#FF0066',\n\t'#FF0099',\n\t'#FF00CC',\n\t'#FF00FF',\n\t'#FF3300',\n\t'#FF3333',\n\t'#FF3366',\n\t'#FF3399',\n\t'#FF33CC',\n\t'#FF33FF',\n\t'#FF6600',\n\t'#FF6633',\n\t'#FF9900',\n\t'#FF9933',\n\t'#FFCC00',\n\t'#FFCC33'\n];\n\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support \"%c\" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n\n// eslint-disable-next-line complexity\nfunction useColors() {\n\t// NB: In an Electron preload script, document will be defined but not fully\n\t// initialized. Since we know we're in Chrome, we'll just detect this case\n\t// explicitly\n\tif (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {\n\t\treturn true;\n\t}\n\n\t// Internet Explorer and Edge do not support colors.\n\tif (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\\/(\\d+)/)) {\n\t\treturn false;\n\t}\n\n\t// Is webkit? http://stackoverflow.com/a/16459606/376773\n\t// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632\n\treturn (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||\n\t\t// Is firebug? http://stackoverflow.com/a/398120/376773\n\t\t(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||\n\t\t// Is firefox >= v31?\n\t\t// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||\n\t\t// Double check webkit in userAgent just in case we are in a worker\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/));\n}\n\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\nfunction formatArgs(args) {\n\targs[0] = (this.useColors ? '%c' : '') +\n\t\tthis.namespace +\n\t\t(this.useColors ? ' %c' : ' ') +\n\t\targs[0] +\n\t\t(this.useColors ? '%c ' : ' ') +\n\t\t'+' + module.exports.humanize(this.diff);\n\n\tif (!this.useColors) {\n\t\treturn;\n\t}\n\n\tconst c = 'color: ' + this.color;\n\targs.splice(1, 0, c, 'color: inherit');\n\n\t// The final \"%c\" is somewhat tricky, because there could be other\n\t// arguments passed either before or after the %c, so we need to\n\t// figure out the correct index to insert the CSS into\n\tlet index = 0;\n\tlet lastC = 0;\n\targs[0].replace(/%[a-zA-Z%]/g, match => {\n\t\tif (match === '%%') {\n\t\t\treturn;\n\t\t}\n\t\tindex++;\n\t\tif (match === '%c') {\n\t\t\t// We only are interested in the *last* %c\n\t\t\t// (the user may have provided their own)\n\t\t\tlastC = index;\n\t\t}\n\t});\n\n\targs.splice(lastC, 0, c);\n}\n\n/**\n * Invokes `console.debug()` when available.\n * No-op when `console.debug` is not a \"function\".\n * If `console.debug` is not available, falls back\n * to `console.log`.\n *\n * @api public\n */\nexports.log = console.debug || console.log || (() => {});\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\nfunction save(namespaces) {\n\ttry {\n\t\tif (namespaces) {\n\t\t\texports.storage.setItem('debug', namespaces);\n\t\t} else {\n\t\t\texports.storage.removeItem('debug');\n\t\t}\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\nfunction load() {\n\tlet r;\n\ttry {\n\t\tr = exports.storage.getItem('debug');\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n\n\t// If debug isn't set in LS, and we're in Electron, try to load $DEBUG\n\tif (!r && typeof process !== 'undefined' && 'env' in process) {\n\t\tr = process.env.DEBUG;\n\t}\n\n\treturn r;\n}\n\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\nfunction localstorage() {\n\ttry {\n\t\t// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context\n\t\t// The Browser also has localStorage in the global context.\n\t\treturn localStorage;\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\nmodule.exports = __webpack_require__(/*! ./common */ \"./node_modules/_debug@4.3.4@debug/src/common.js\")(exports);\n\nconst {formatters} = module.exports;\n\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nformatters.j = function (v) {\n\ttry {\n\t\treturn JSON.stringify(v);\n\t} catch (error) {\n\t\treturn '[UnexpectedJSONParseError]: ' + error.message;\n\t}\n};\n\n\n//# sourceURL=webpack:///./node_modules/_debug@4.3.4@debug/src/browser.js?");

/***/ }),

/***/ "./node_modules/_debug@4.3.4@debug/src/common.js":
/*!*******************************************************!*\
  !*** ./node_modules/_debug@4.3.4@debug/src/common.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n */\n\nfunction setup(env) {\n\tcreateDebug.debug = createDebug;\n\tcreateDebug.default = createDebug;\n\tcreateDebug.coerce = coerce;\n\tcreateDebug.disable = disable;\n\tcreateDebug.enable = enable;\n\tcreateDebug.enabled = enabled;\n\tcreateDebug.humanize = __webpack_require__(/*! ms */ \"./node_modules/_ms@2.1.2@ms/index.js\");\n\tcreateDebug.destroy = destroy;\n\n\tObject.keys(env).forEach(key => {\n\t\tcreateDebug[key] = env[key];\n\t});\n\n\t/**\n\t* The currently active debug mode names, and names to skip.\n\t*/\n\n\tcreateDebug.names = [];\n\tcreateDebug.skips = [];\n\n\t/**\n\t* Map of special \"%n\" handling functions, for the debug \"format\" argument.\n\t*\n\t* Valid key names are a single, lower or upper-case letter, i.e. \"n\" and \"N\".\n\t*/\n\tcreateDebug.formatters = {};\n\n\t/**\n\t* Selects a color for a debug namespace\n\t* @param {String} namespace The namespace string for the debug instance to be colored\n\t* @return {Number|String} An ANSI color code for the given namespace\n\t* @api private\n\t*/\n\tfunction selectColor(namespace) {\n\t\tlet hash = 0;\n\n\t\tfor (let i = 0; i < namespace.length; i++) {\n\t\t\thash = ((hash << 5) - hash) + namespace.charCodeAt(i);\n\t\t\thash |= 0; // Convert to 32bit integer\n\t\t}\n\n\t\treturn createDebug.colors[Math.abs(hash) % createDebug.colors.length];\n\t}\n\tcreateDebug.selectColor = selectColor;\n\n\t/**\n\t* Create a debugger with the given `namespace`.\n\t*\n\t* @param {String} namespace\n\t* @return {Function}\n\t* @api public\n\t*/\n\tfunction createDebug(namespace) {\n\t\tlet prevTime;\n\t\tlet enableOverride = null;\n\t\tlet namespacesCache;\n\t\tlet enabledCache;\n\n\t\tfunction debug(...args) {\n\t\t\t// Disabled?\n\t\t\tif (!debug.enabled) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tconst self = debug;\n\n\t\t\t// Set `diff` timestamp\n\t\t\tconst curr = Number(new Date());\n\t\t\tconst ms = curr - (prevTime || curr);\n\t\t\tself.diff = ms;\n\t\t\tself.prev = prevTime;\n\t\t\tself.curr = curr;\n\t\t\tprevTime = curr;\n\n\t\t\targs[0] = createDebug.coerce(args[0]);\n\n\t\t\tif (typeof args[0] !== 'string') {\n\t\t\t\t// Anything else let's inspect with %O\n\t\t\t\targs.unshift('%O');\n\t\t\t}\n\n\t\t\t// Apply any `formatters` transformations\n\t\t\tlet index = 0;\n\t\t\targs[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {\n\t\t\t\t// If we encounter an escaped % then don't increase the array index\n\t\t\t\tif (match === '%%') {\n\t\t\t\t\treturn '%';\n\t\t\t\t}\n\t\t\t\tindex++;\n\t\t\t\tconst formatter = createDebug.formatters[format];\n\t\t\t\tif (typeof formatter === 'function') {\n\t\t\t\t\tconst val = args[index];\n\t\t\t\t\tmatch = formatter.call(self, val);\n\n\t\t\t\t\t// Now we need to remove `args[index]` since it's inlined in the `format`\n\t\t\t\t\targs.splice(index, 1);\n\t\t\t\t\tindex--;\n\t\t\t\t}\n\t\t\t\treturn match;\n\t\t\t});\n\n\t\t\t// Apply env-specific formatting (colors, etc.)\n\t\t\tcreateDebug.formatArgs.call(self, args);\n\n\t\t\tconst logFn = self.log || createDebug.log;\n\t\t\tlogFn.apply(self, args);\n\t\t}\n\n\t\tdebug.namespace = namespace;\n\t\tdebug.useColors = createDebug.useColors();\n\t\tdebug.color = createDebug.selectColor(namespace);\n\t\tdebug.extend = extend;\n\t\tdebug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.\n\n\t\tObject.defineProperty(debug, 'enabled', {\n\t\t\tenumerable: true,\n\t\t\tconfigurable: false,\n\t\t\tget: () => {\n\t\t\t\tif (enableOverride !== null) {\n\t\t\t\t\treturn enableOverride;\n\t\t\t\t}\n\t\t\t\tif (namespacesCache !== createDebug.namespaces) {\n\t\t\t\t\tnamespacesCache = createDebug.namespaces;\n\t\t\t\t\tenabledCache = createDebug.enabled(namespace);\n\t\t\t\t}\n\n\t\t\t\treturn enabledCache;\n\t\t\t},\n\t\t\tset: v => {\n\t\t\t\tenableOverride = v;\n\t\t\t}\n\t\t});\n\n\t\t// Env-specific initialization logic for debug instances\n\t\tif (typeof createDebug.init === 'function') {\n\t\t\tcreateDebug.init(debug);\n\t\t}\n\n\t\treturn debug;\n\t}\n\n\tfunction extend(namespace, delimiter) {\n\t\tconst newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);\n\t\tnewDebug.log = this.log;\n\t\treturn newDebug;\n\t}\n\n\t/**\n\t* Enables a debug mode by namespaces. This can include modes\n\t* separated by a colon and wildcards.\n\t*\n\t* @param {String} namespaces\n\t* @api public\n\t*/\n\tfunction enable(namespaces) {\n\t\tcreateDebug.save(namespaces);\n\t\tcreateDebug.namespaces = namespaces;\n\n\t\tcreateDebug.names = [];\n\t\tcreateDebug.skips = [];\n\n\t\tlet i;\n\t\tconst split = (typeof namespaces === 'string' ? namespaces : '').split(/[\\s,]+/);\n\t\tconst len = split.length;\n\n\t\tfor (i = 0; i < len; i++) {\n\t\t\tif (!split[i]) {\n\t\t\t\t// ignore empty strings\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tnamespaces = split[i].replace(/\\*/g, '.*?');\n\n\t\t\tif (namespaces[0] === '-') {\n\t\t\t\tcreateDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));\n\t\t\t} else {\n\t\t\t\tcreateDebug.names.push(new RegExp('^' + namespaces + '$'));\n\t\t\t}\n\t\t}\n\t}\n\n\t/**\n\t* Disable debug output.\n\t*\n\t* @return {String} namespaces\n\t* @api public\n\t*/\n\tfunction disable() {\n\t\tconst namespaces = [\n\t\t\t...createDebug.names.map(toNamespace),\n\t\t\t...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)\n\t\t].join(',');\n\t\tcreateDebug.enable('');\n\t\treturn namespaces;\n\t}\n\n\t/**\n\t* Returns true if the given mode name is enabled, false otherwise.\n\t*\n\t* @param {String} name\n\t* @return {Boolean}\n\t* @api public\n\t*/\n\tfunction enabled(name) {\n\t\tif (name[name.length - 1] === '*') {\n\t\t\treturn true;\n\t\t}\n\n\t\tlet i;\n\t\tlet len;\n\n\t\tfor (i = 0, len = createDebug.skips.length; i < len; i++) {\n\t\t\tif (createDebug.skips[i].test(name)) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0, len = createDebug.names.length; i < len; i++) {\n\t\t\tif (createDebug.names[i].test(name)) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n\n\t/**\n\t* Convert regexp to namespace\n\t*\n\t* @param {RegExp} regxep\n\t* @return {String} namespace\n\t* @api private\n\t*/\n\tfunction toNamespace(regexp) {\n\t\treturn regexp.toString()\n\t\t\t.substring(2, regexp.toString().length - 2)\n\t\t\t.replace(/\\.\\*\\?$/, '*');\n\t}\n\n\t/**\n\t* Coerce `val`.\n\t*\n\t* @param {Mixed} val\n\t* @return {Mixed}\n\t* @api private\n\t*/\n\tfunction coerce(val) {\n\t\tif (val instanceof Error) {\n\t\t\treturn val.stack || val.message;\n\t\t}\n\t\treturn val;\n\t}\n\n\t/**\n\t* XXX DO NOT USE. This is a temporary stub function.\n\t* XXX It WILL be removed in the next major release.\n\t*/\n\tfunction destroy() {\n\t\tconsole.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');\n\t}\n\n\tcreateDebug.enable(createDebug.load());\n\n\treturn createDebug;\n}\n\nmodule.exports = setup;\n\n\n//# sourceURL=webpack:///./node_modules/_debug@4.3.4@debug/src/common.js?");

/***/ }),

/***/ "./node_modules/_debug@4.3.4@debug/src/index.js":
/*!******************************************************!*\
  !*** ./node_modules/_debug@4.3.4@debug/src/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Detect Electron renderer / nwjs process, which is node, but we should\n * treat as a browser.\n */\n\nif (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {\n\tmodule.exports = __webpack_require__(/*! ./browser.js */ \"./node_modules/_debug@4.3.4@debug/src/browser.js\");\n} else {\n\tmodule.exports = __webpack_require__(/*! ./node.js */ \"./node_modules/_debug@4.3.4@debug/src/node.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/_debug@4.3.4@debug/src/index.js?");

/***/ }),

/***/ "./node_modules/_debug@4.3.4@debug/src/node.js":
/*!*****************************************************!*\
  !*** ./node_modules/_debug@4.3.4@debug/src/node.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Module dependencies.\n */\n\nconst tty = __webpack_require__(/*! tty */ \"tty\");\nconst util = __webpack_require__(/*! util */ \"util\");\n\n/**\n * This is the Node.js implementation of `debug()`.\n */\n\nexports.init = init;\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.destroy = util.deprecate(\n\t() => {},\n\t'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'\n);\n\n/**\n * Colors.\n */\n\nexports.colors = [6, 2, 3, 4, 5, 1];\n\ntry {\n\t// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)\n\t// eslint-disable-next-line import/no-extraneous-dependencies\n\tconst supportsColor = __webpack_require__(/*! supports-color */ \"./node_modules/_supports-color@7.2.0@supports-color/index.js\");\n\n\tif (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {\n\t\texports.colors = [\n\t\t\t20,\n\t\t\t21,\n\t\t\t26,\n\t\t\t27,\n\t\t\t32,\n\t\t\t33,\n\t\t\t38,\n\t\t\t39,\n\t\t\t40,\n\t\t\t41,\n\t\t\t42,\n\t\t\t43,\n\t\t\t44,\n\t\t\t45,\n\t\t\t56,\n\t\t\t57,\n\t\t\t62,\n\t\t\t63,\n\t\t\t68,\n\t\t\t69,\n\t\t\t74,\n\t\t\t75,\n\t\t\t76,\n\t\t\t77,\n\t\t\t78,\n\t\t\t79,\n\t\t\t80,\n\t\t\t81,\n\t\t\t92,\n\t\t\t93,\n\t\t\t98,\n\t\t\t99,\n\t\t\t112,\n\t\t\t113,\n\t\t\t128,\n\t\t\t129,\n\t\t\t134,\n\t\t\t135,\n\t\t\t148,\n\t\t\t149,\n\t\t\t160,\n\t\t\t161,\n\t\t\t162,\n\t\t\t163,\n\t\t\t164,\n\t\t\t165,\n\t\t\t166,\n\t\t\t167,\n\t\t\t168,\n\t\t\t169,\n\t\t\t170,\n\t\t\t171,\n\t\t\t172,\n\t\t\t173,\n\t\t\t178,\n\t\t\t179,\n\t\t\t184,\n\t\t\t185,\n\t\t\t196,\n\t\t\t197,\n\t\t\t198,\n\t\t\t199,\n\t\t\t200,\n\t\t\t201,\n\t\t\t202,\n\t\t\t203,\n\t\t\t204,\n\t\t\t205,\n\t\t\t206,\n\t\t\t207,\n\t\t\t208,\n\t\t\t209,\n\t\t\t214,\n\t\t\t215,\n\t\t\t220,\n\t\t\t221\n\t\t];\n\t}\n} catch (error) {\n\t// Swallow - we only care if `supports-color` is available; it doesn't have to be.\n}\n\n/**\n * Build up the default `inspectOpts` object from the environment variables.\n *\n *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js\n */\n\nexports.inspectOpts = Object.keys(process.env).filter(key => {\n\treturn /^debug_/i.test(key);\n}).reduce((obj, key) => {\n\t// Camel-case\n\tconst prop = key\n\t\t.substring(6)\n\t\t.toLowerCase()\n\t\t.replace(/_([a-z])/g, (_, k) => {\n\t\t\treturn k.toUpperCase();\n\t\t});\n\n\t// Coerce string value into JS value\n\tlet val = process.env[key];\n\tif (/^(yes|on|true|enabled)$/i.test(val)) {\n\t\tval = true;\n\t} else if (/^(no|off|false|disabled)$/i.test(val)) {\n\t\tval = false;\n\t} else if (val === 'null') {\n\t\tval = null;\n\t} else {\n\t\tval = Number(val);\n\t}\n\n\tobj[prop] = val;\n\treturn obj;\n}, {});\n\n/**\n * Is stdout a TTY? Colored output is enabled when `true`.\n */\n\nfunction useColors() {\n\treturn 'colors' in exports.inspectOpts ?\n\t\tBoolean(exports.inspectOpts.colors) :\n\t\ttty.isatty(process.stderr.fd);\n}\n\n/**\n * Adds ANSI color escape codes if enabled.\n *\n * @api public\n */\n\nfunction formatArgs(args) {\n\tconst {namespace: name, useColors} = this;\n\n\tif (useColors) {\n\t\tconst c = this.color;\n\t\tconst colorCode = '\\u001B[3' + (c < 8 ? c : '8;5;' + c);\n\t\tconst prefix = `  ${colorCode};1m${name} \\u001B[0m`;\n\n\t\targs[0] = prefix + args[0].split('\\n').join('\\n' + prefix);\n\t\targs.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\\u001B[0m');\n\t} else {\n\t\targs[0] = getDate() + name + ' ' + args[0];\n\t}\n}\n\nfunction getDate() {\n\tif (exports.inspectOpts.hideDate) {\n\t\treturn '';\n\t}\n\treturn new Date().toISOString() + ' ';\n}\n\n/**\n * Invokes `util.format()` with the specified arguments and writes to stderr.\n */\n\nfunction log(...args) {\n\treturn process.stderr.write(util.format(...args) + '\\n');\n}\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\nfunction save(namespaces) {\n\tif (namespaces) {\n\t\tprocess.env.DEBUG = namespaces;\n\t} else {\n\t\t// If you set a process.env field to null or undefined, it gets cast to the\n\t\t// string 'null' or 'undefined'. Just delete instead.\n\t\tdelete process.env.DEBUG;\n\t}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\n\nfunction load() {\n\treturn process.env.DEBUG;\n}\n\n/**\n * Init logic for `debug` instances.\n *\n * Create a new `inspectOpts` object in case `useColors` is set\n * differently for a particular `debug` instance.\n */\n\nfunction init(debug) {\n\tdebug.inspectOpts = {};\n\n\tconst keys = Object.keys(exports.inspectOpts);\n\tfor (let i = 0; i < keys.length; i++) {\n\t\tdebug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];\n\t}\n}\n\nmodule.exports = __webpack_require__(/*! ./common */ \"./node_modules/_debug@4.3.4@debug/src/common.js\")(exports);\n\nconst {formatters} = module.exports;\n\n/**\n * Map %o to `util.inspect()`, all on a single line.\n */\n\nformatters.o = function (v) {\n\tthis.inspectOpts.colors = this.useColors;\n\treturn util.inspect(v, this.inspectOpts)\n\t\t.split('\\n')\n\t\t.map(str => str.trim())\n\t\t.join(' ');\n};\n\n/**\n * Map %O to `util.inspect()`, allowing multiple lines if needed.\n */\n\nformatters.O = function (v) {\n\tthis.inspectOpts.colors = this.useColors;\n\treturn util.inspect(v, this.inspectOpts);\n};\n\n\n//# sourceURL=webpack:///./node_modules/_debug@4.3.4@debug/src/node.js?");

/***/ }),

/***/ "./node_modules/_electron-debug@1.5.0@electron-debug sync recursive":
/*!****************************************************************!*\
  !*** ./node_modules/_electron-debug@1.5.0@electron-debug sync ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/_electron-debug@1.5.0@electron-debug sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/_electron-debug@1.5.0@electron-debug_sync?");

/***/ }),

/***/ "./node_modules/_electron-debug@1.5.0@electron-debug/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/_electron-debug@1.5.0@electron-debug/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst electron = __webpack_require__(/*! electron */ \"electron\");\nconst localShortcut = __webpack_require__(/*! electron-localshortcut */ \"./node_modules/_electron-localshortcut@3.2.1@electron-localshortcut/index.js\");\nconst isDev = __webpack_require__(/*! electron-is-dev */ \"./node_modules/_electron-is-dev@0.3.0@electron-is-dev/index.js\");\n\nconst app = electron.app;\nconst BrowserWindow = electron.BrowserWindow;\nconst isMacOS = process.platform === 'darwin';\n\nfunction devTools(win) {\n\twin = win || BrowserWindow.getFocusedWindow();\n\n\tif (win) {\n\t\twin.toggleDevTools();\n\t}\n}\n\nfunction openDevTools(win, showDevTools) {\n\twin = win || BrowserWindow.getFocusedWindow();\n\n\tif (win) {\n\t\tconst mode = showDevTools === true ? undefined : showDevTools;\n\t\twin.webContents.openDevTools({mode});\n\t}\n}\n\nfunction refresh(win) {\n\twin = win || BrowserWindow.getFocusedWindow();\n\n\tif (win) {\n\t\twin.webContents.reloadIgnoringCache();\n\t}\n}\n\nfunction inspectElements() {\n\tconst win = BrowserWindow.getFocusedWindow();\n\tconst inspect = () => {\n\t\twin.devToolsWebContents.executeJavaScript('DevToolsAPI.enterInspectElementMode()');\n\t};\n\n\tif (win) {\n\t\tif (win.webContents.isDevToolsOpened()) {\n\t\t\tinspect();\n\t\t} else {\n\t\t\twin.webContents.on('devtools-opened', inspect);\n\t\t\twin.openDevTools();\n\t\t}\n\t}\n}\n\nconst addExtensionIfInstalled = (name, getPath) => {\n\tconst isExtensionInstalled = name => {\n\t\treturn BrowserWindow.getDevToolsExtensions &&\n\t\t\t{}.hasOwnProperty.call(BrowserWindow.getDevToolsExtensions(), name);\n\t};\n\n\ttry {\n\t\tif (!isExtensionInstalled(name)) {\n\t\t\tBrowserWindow.addDevToolsExtension(getPath(name));\n\t\t}\n\t} catch (err) {}\n};\n\nmodule.exports = opts => {\n\topts = Object.assign({\n\t\tenabled: null,\n\t\tshowDevTools: false\n\t}, opts);\n\n\tif (opts.enabled === false || (opts.enabled === null && !isDev)) {\n\t\treturn;\n\t}\n\n\tapp.on('browser-window-created', (e, win) => {\n\t\tif (opts.showDevTools) {\n\t\t\topenDevTools(win, opts.showDevTools);\n\t\t}\n\t});\n\n\tapp.on('ready', () => {\n\t\taddExtensionIfInstalled('devtron', name => __webpack_require__(\"./node_modules/_electron-debug@1.5.0@electron-debug sync recursive\")(name).path);\n\t\t// TODO: Use this when https://github.com/firejune/electron-react-devtools/pull/6 is out\n\t\t// addExtensionIfInstalled('electron-react-devtools', name => require(name).path);\n\t\taddExtensionIfInstalled('electron-react-devtools', name => __webpack_require__(/*! path */ \"path\").dirname(/*require.resolve*/(__webpack_require__(\"./node_modules/_electron-debug@1.5.0@electron-debug sync recursive\").resolve(name))));\n\n\t\tlocalShortcut.register('CmdOrCtrl+Shift+C', inspectElements);\n\t\tlocalShortcut.register(isMacOS ? 'Cmd+Alt+I' : 'Ctrl+Shift+I', devTools);\n\t\tlocalShortcut.register('F12', devTools);\n\n\t\tlocalShortcut.register('CmdOrCtrl+R', refresh);\n\t\tlocalShortcut.register('F5', refresh);\n\t});\n};\n\nmodule.exports.refresh = refresh;\nmodule.exports.devTools = devTools;\nmodule.exports.openDevTools = openDevTools;\n\n\n//# sourceURL=webpack:///./node_modules/_electron-debug@1.5.0@electron-debug/index.js?");

/***/ }),

/***/ "./node_modules/_electron-is-accelerator@0.1.2@electron-is-accelerator/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/_electron-is-accelerator@0.1.2@electron-is-accelerator/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst modifiers = /^(Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super)$/;\nconst keyCodes = /^([0-9A-Z)!@#$%^&*(:+<_>?~{|}\";=,\\-./`[\\\\\\]']|F1*[1-9]|F10|F2[0-4]|Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen)$/;\n\nmodule.exports = function (str) {\n\tlet parts = str.split(\"+\");\n\tlet keyFound = false;\n    return parts.every((val, index) => {\n\t\tconst isKey = keyCodes.test(val);\n\t\tconst isModifier = modifiers.test(val);\n\t\tif (isKey) {\n\t\t\t// Key must be unique\n\t\t\tif (keyFound) return false;\n\t\t\tkeyFound = true;\n\t\t}\n\t\t// Key is required\n\t\tif (index === parts.length - 1 && !keyFound) return false;\n        return isKey || isModifier;\n    });\n};\n\n\n//# sourceURL=webpack:///./node_modules/_electron-is-accelerator@0.1.2@electron-is-accelerator/index.js?");

/***/ }),

/***/ "./node_modules/_electron-is-dev@0.3.0@electron-is-dev/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/_electron-is-dev@0.3.0@electron-is-dev/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;\nconst isEnvSet = 'ELECTRON_IS_DEV' in process.env;\n\nmodule.exports = isEnvSet ? getFromEnv : (process.defaultApp || /node_modules[\\\\/]electron[\\\\/]/.test(process.execPath));\n\n\n//# sourceURL=webpack:///./node_modules/_electron-is-dev@0.3.0@electron-is-dev/index.js?");

/***/ }),

/***/ "./node_modules/_electron-localshortcut@3.2.1@electron-localshortcut/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/_electron-localshortcut@3.2.1@electron-localshortcut/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst {app, BrowserWindow} = __webpack_require__(/*! electron */ \"electron\");\nconst isAccelerator = __webpack_require__(/*! electron-is-accelerator */ \"./node_modules/_electron-is-accelerator@0.1.2@electron-is-accelerator/index.js\");\nconst equals = __webpack_require__(/*! keyboardevents-areequal */ \"./node_modules/_keyboardevents-areequal@0.2.2@keyboardevents-areequal/index.js\");\nconst {toKeyEvent} = __webpack_require__(/*! keyboardevent-from-electron-accelerator */ \"./node_modules/_keyboardevent-from-electron-accelerator@2.0.0@keyboardevent-from-electron-accelerator/index.js\");\nconst _debug = __webpack_require__(/*! debug */ \"./node_modules/_debug@4.3.4@debug/src/index.js\");\n\nconst debug = _debug('electron-localshortcut');\n\n// A placeholder to register shortcuts\n// on any window of the app.\nconst ANY_WINDOW = {};\n\nconst windowsWithShortcuts = new WeakMap();\n\nconst title = win => {\n\tif (win) {\n\t\ttry {\n\t\t\treturn win.getTitle();\n\t\t// eslint-disable-next-line no-unused-vars\n\t\t} catch (error) {\n\t\t\treturn 'A destroyed window';\n\t\t}\n\t}\n\n\treturn 'An falsy value';\n};\n\nfunction _checkAccelerator(accelerator) {\n\tif (!isAccelerator(accelerator)) {\n\t\tconst w = {};\n\t\tError.captureStackTrace(w);\n\t\tconst stack = w.stack ? w.stack.split('\\n').slice(4).join('\\n') : w.message;\n\t\tconst msg = `\nWARNING: ${accelerator} is not a valid accelerator.\n\n${stack}\n`;\n\t\tconsole.error(msg);\n\t}\n}\n\n/**\n * Disable all of the shortcuts registered on the BrowserWindow instance.\n * Registered shortcuts no more works on the `window` instance, but the module\n * keep a reference on them. You can reactivate them later by calling `enableAll`\n * method on the same window instance.\n * @param  {BrowserWindow} win BrowserWindow instance\n */\nfunction disableAll(win) {\n\tdebug(`Disabling all shortcuts on window ${title(win)}`);\n\tconst wc = win.webContents;\n\tconst shortcutsOfWindow = windowsWithShortcuts.get(wc);\n\n\tfor (const shortcut of shortcutsOfWindow) {\n\t\tshortcut.enabled = false;\n\t}\n}\n\n/**\n * Enable all of the shortcuts registered on the BrowserWindow instance that\n * you had previously disabled calling `disableAll` method.\n * @param  {BrowserWindow} win BrowserWindow instance\n */\nfunction enableAll(win) {\n\tdebug(`Enabling all shortcuts on window ${title(win)}`);\n\tconst wc = win.webContents;\n\tconst shortcutsOfWindow = windowsWithShortcuts.get(wc);\n\n\tfor (const shortcut of shortcutsOfWindow) {\n\t\tshortcut.enabled = true;\n\t}\n}\n\n/**\n * Unregisters all of the shortcuts registered on any focused BrowserWindow\n * instance. This method does not unregister any shortcut you registered on\n * a particular window instance.\n * @param  {BrowserWindow} win BrowserWindow instance\n */\nfunction unregisterAll(win) {\n\tdebug(`Unregistering all shortcuts on window ${title(win)}`);\n\tconst wc = win.webContents;\n\tconst shortcutsOfWindow = windowsWithShortcuts.get(wc);\n\tif (shortcutsOfWindow && shortcutsOfWindow.removeListener) {\n\t\t// Remove listener from window\n\t\tshortcutsOfWindow.removeListener();\n\t\twindowsWithShortcuts.delete(wc);\n\t}\n}\n\nfunction _normalizeEvent(input) {\n\tconst normalizedEvent = {\n\t\tcode: input.code,\n\t\tkey: input.key\n\t};\n\n\t['alt', 'shift', 'meta'].forEach(prop => {\n\t\tif (typeof input[prop] !== 'undefined') {\n\t\t\tnormalizedEvent[`${prop}Key`] = input[prop];\n\t\t}\n\t});\n\n\tif (typeof input.control !== 'undefined') {\n\t\tnormalizedEvent.ctrlKey = input.control;\n\t}\n\n\treturn normalizedEvent;\n}\n\nfunction _findShortcut(event, shortcutsOfWindow) {\n\tlet i = 0;\n\tfor (const shortcut of shortcutsOfWindow) {\n\t\tif (equals(shortcut.eventStamp, event)) {\n\t\t\treturn i;\n\t\t}\n\n\t\ti++;\n\t}\n\n\treturn -1;\n}\n\nconst _onBeforeInput = shortcutsOfWindow => (e, input) => {\n\tif (input.type === 'keyUp') {\n\t\treturn;\n\t}\n\n\tconst event = _normalizeEvent(input);\n\n\tdebug(`before-input-event: ${input} is translated to: ${event}`);\n\tfor (const {eventStamp, callback} of shortcutsOfWindow) {\n\t\tif (equals(eventStamp, event)) {\n\t\t\tdebug(`eventStamp: ${eventStamp} match`);\n\t\t\tcallback();\n\n\t\t\treturn;\n\t\t}\n\n\t\tdebug(`eventStamp: ${eventStamp} no match`);\n\t}\n};\n\n/**\n * Registers the shortcut `accelerator`on the BrowserWindow instance.\n * @param  {BrowserWindow} win - BrowserWindow instance to register.\n * This argument could be omitted, in this case the function register\n * the shortcut on all app windows.\n * @param  {String|Array<String>} accelerator - the shortcut to register\n * @param  {Function} callback    This function is called when the shortcut is pressed\n * and the window is focused and not minimized.\n */\nfunction register(win, accelerator, callback) {\n\tlet wc;\n\tif (typeof callback === 'undefined') {\n\t\twc = ANY_WINDOW;\n\t\tcallback = accelerator;\n\t\taccelerator = win;\n\t} else {\n\t\twc = win.webContents;\n\t}\n\n\tif (Array.isArray(accelerator) === true) {\n\t\taccelerator.forEach(accelerator => {\n\t\t\tif (typeof accelerator === 'string') {\n\t\t\t\tregister(win, accelerator, callback);\n\t\t\t}\n\t\t});\n\t\treturn;\n\t}\n\n\tdebug(`Registering callback for ${accelerator} on window ${title(win)}`);\n\t_checkAccelerator(accelerator);\n\n\tdebug(`${accelerator} seems a valid shortcut sequence.`);\n\n\tlet shortcutsOfWindow;\n\tif (windowsWithShortcuts.has(wc)) {\n\t\tdebug('Window has others shortcuts registered.');\n\t\tshortcutsOfWindow = windowsWithShortcuts.get(wc);\n\t} else {\n\t\tdebug('This is the first shortcut of the window.');\n\t\tshortcutsOfWindow = [];\n\t\twindowsWithShortcuts.set(wc, shortcutsOfWindow);\n\n\t\tif (wc === ANY_WINDOW) {\n\t\t\tconst keyHandler = _onBeforeInput(shortcutsOfWindow);\n\t\t\tconst enableAppShortcuts = (e, win) => {\n\t\t\t\tconst wc = win.webContents;\n\t\t\t\twc.on('before-input-event', keyHandler);\n\t\t\t\twc.once('closed', () =>\n\t\t\t\t\twc.removeListener('before-input-event', keyHandler)\n\t\t\t\t);\n\t\t\t};\n\n\t\t\t// Enable shortcut on current windows\n\t\t\tconst windows = BrowserWindow.getAllWindows();\n\n\t\t\twindows.forEach(win => enableAppShortcuts(null, win));\n\n\t\t\t// Enable shortcut on future windows\n\t\t\tapp.on('browser-window-created', enableAppShortcuts);\n\n\t\t\tshortcutsOfWindow.removeListener = () => {\n\t\t\t\tconst windows = BrowserWindow.getAllWindows();\n\t\t\t\twindows.forEach(win =>\n\t\t\t\t\twin.webContents.removeListener('before-input-event', keyHandler)\n\t\t\t\t);\n\t\t\t\tapp.removeListener('browser-window-created', enableAppShortcuts);\n\t\t\t};\n\t\t} else {\n\t\t\tconst keyHandler = _onBeforeInput(shortcutsOfWindow);\n\t\t\twc.on('before-input-event', keyHandler);\n\n\t\t\t// Save a reference to allow remove of listener from elsewhere\n\t\t\tshortcutsOfWindow.removeListener = () =>\n\t\t\t\twc.removeListener('before-input-event', keyHandler);\n\t\t\twc.once('closed', shortcutsOfWindow.removeListener);\n\t\t}\n\t}\n\n\tdebug('Adding shortcut to window set.');\n\n\tconst eventStamp = toKeyEvent(accelerator);\n\n\tshortcutsOfWindow.push({\n\t\teventStamp,\n\t\tcallback,\n\t\tenabled: true\n\t});\n\n\tdebug('Shortcut registered.');\n}\n\n/**\n * Unregisters the shortcut of `accelerator` registered on the BrowserWindow instance.\n * @param  {BrowserWindow} win - BrowserWindow instance to unregister.\n * This argument could be omitted, in this case the function unregister the shortcut\n * on all app windows. If you registered the shortcut on a particular window instance, it will do nothing.\n * @param  {String|Array<String>} accelerator - the shortcut to unregister\n */\nfunction unregister(win, accelerator) {\n\tlet wc;\n\tif (typeof accelerator === 'undefined') {\n\t\twc = ANY_WINDOW;\n\t\taccelerator = win;\n\t} else {\n\t\tif (win.isDestroyed()) {\n\t\t\tdebug('Early return because window is destroyed.');\n\t\t\treturn;\n\t\t}\n\n\t\twc = win.webContents;\n\t}\n\n\tif (Array.isArray(accelerator) === true) {\n\t\taccelerator.forEach(accelerator => {\n\t\t\tif (typeof accelerator === 'string') {\n\t\t\t\tunregister(win, accelerator);\n\t\t\t}\n\t\t});\n\t\treturn;\n\t}\n\n\tdebug(`Unregistering callback for ${accelerator} on window ${title(win)}`);\n\n\t_checkAccelerator(accelerator);\n\n\tdebug(`${accelerator} seems a valid shortcut sequence.`);\n\n\tif (!windowsWithShortcuts.has(wc)) {\n\t\tdebug('Early return because window has never had shortcuts registered.');\n\t\treturn;\n\t}\n\n\tconst shortcutsOfWindow = windowsWithShortcuts.get(wc);\n\n\tconst eventStamp = toKeyEvent(accelerator);\n\tconst shortcutIdx = _findShortcut(eventStamp, shortcutsOfWindow);\n\tif (shortcutIdx === -1) {\n\t\treturn;\n\t}\n\n\tshortcutsOfWindow.splice(shortcutIdx, 1);\n\n\t// If the window has no more shortcuts,\n\t// we remove it early from the WeakMap\n\t// and unregistering the event listener\n\tif (shortcutsOfWindow.length === 0) {\n\t\t// Remove listener from window\n\t\tshortcutsOfWindow.removeListener();\n\n\t\t// Remove window from shortcuts catalog\n\t\twindowsWithShortcuts.delete(wc);\n\t}\n}\n\n/**\n * Returns `true` or `false` depending on whether the shortcut `accelerator`\n * is registered on `window`.\n * @param  {BrowserWindow} win - BrowserWindow instance to check. This argument\n * could be omitted, in this case the function returns whether the shortcut\n * `accelerator` is registered on all app windows. If you registered the\n * shortcut on a particular window instance, it return false.\n * @param  {String} accelerator - the shortcut to check\n * @return {Boolean} - if the shortcut `accelerator` is registered on `window`.\n */\nfunction isRegistered(win, accelerator) {\n\t_checkAccelerator(accelerator);\n\tconst wc = win.webContents;\n\tconst shortcutsOfWindow = windowsWithShortcuts.get(wc);\n\tconst eventStamp = toKeyEvent(accelerator);\n\n\treturn _findShortcut(eventStamp, shortcutsOfWindow) !== -1;\n}\n\nmodule.exports = {\n\tregister,\n\tunregister,\n\tisRegistered,\n\tunregisterAll,\n\tenableAll,\n\tdisableAll\n};\n\n\n//# sourceURL=webpack:///./node_modules/_electron-localshortcut@3.2.1@electron-localshortcut/index.js?");

/***/ }),

/***/ "./node_modules/_has-flag@4.0.0@has-flag/index.js":
/*!********************************************************!*\
  !*** ./node_modules/_has-flag@4.0.0@has-flag/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = (flag, argv = process.argv) => {\n\tconst prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');\n\tconst position = argv.indexOf(prefix + flag);\n\tconst terminatorPosition = argv.indexOf('--');\n\treturn position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);\n};\n\n\n//# sourceURL=webpack:///./node_modules/_has-flag@4.0.0@has-flag/index.js?");

/***/ }),

/***/ "./node_modules/_keyboardevent-from-electron-accelerator@2.0.0@keyboardevent-from-electron-accelerator/index.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/_keyboardevent-from-electron-accelerator@2.0.0@keyboardevent-from-electron-accelerator/index.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const modifiers = /^(CommandOrControl|CmdOrCtrl|Command|Cmd|Control|Ctrl|AltGr|Option|Alt|Shift|Super)/i;\nconst keyCodes = /^(Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen|F24|F23|F22|F21|F20|F19|F18|F17|F16|F15|F14|F13|F12|F11|F10|F9|F8|F7|F6|F5|F4|F3|F2|F1|[0-9A-Z)!@#$%^&*(:+<_>?~{|}\";=,\\-./`[\\\\\\]'])/i;\nconst UNSUPPORTED = {};\n\nfunction _command(accelerator, event, modifier) {\n\tif (process.platform !== 'darwin') {\n\t\treturn UNSUPPORTED;\n\t}\n\n\tif (event.metaKey) {\n\t\tthrow new Error('Double `Command` modifier specified.');\n\t}\n\n\treturn {\n\t\tevent: Object.assign({}, event, {metaKey: true}),\n\t\taccelerator: accelerator.slice(modifier.length)\n\t};\n}\n\nfunction _super(accelerator, event, modifier) {\n\tif (event.metaKey) {\n\t\tthrow new Error('Double `Super` modifier specified.');\n\t}\n\n\treturn {\n\t\tevent: Object.assign({}, event, {metaKey: true}),\n\t\taccelerator: accelerator.slice(modifier.length)\n\t};\n}\n\nfunction _commandorcontrol(accelerator, event, modifier) {\n\tif (process.platform === 'darwin') {\n\t\tif (event.metaKey) {\n\t\t\tthrow new Error('Double `Command` modifier specified.');\n\t\t}\n\n\t\treturn {\n\t\t\tevent: Object.assign({}, event, {metaKey: true}),\n\t\t\taccelerator: accelerator.slice(modifier.length)\n\t\t};\n\t}\n\n\tif (event.ctrlKey) {\n\t\tthrow new Error('Double `Control` modifier specified.');\n\t}\n\n\treturn {\n\t\tevent: Object.assign({}, event, {ctrlKey: true}),\n\t\taccelerator: accelerator.slice(modifier.length)\n\t};\n}\n\nfunction _alt(accelerator, event, modifier) {\n\tif (modifier === 'option' && process.platform !== 'darwin') {\n\t\treturn UNSUPPORTED;\n\t}\n\n\tif (event.altKey) {\n\t\tthrow new Error('Double `Alt` modifier specified.');\n\t}\n\n\treturn {\n\t\tevent: Object.assign({}, event, {altKey: true}),\n\t\taccelerator: accelerator.slice(modifier.length)\n\t};\n}\n\nfunction _shift(accelerator, event, modifier) {\n\tif (event.shiftKey) {\n\t\tthrow new Error('Double `Shift` modifier specified.');\n\t}\n\n\treturn {\n\t\tevent: Object.assign({}, event, {shiftKey: true}),\n\t\taccelerator: accelerator.slice(modifier.length)\n\t};\n}\n\nfunction _control(accelerator, event, modifier) {\n\tif (event.ctrlKey) {\n\t\tthrow new Error('Double `Control` modifier specified.');\n\t}\n\n\treturn {\n\t\tevent: Object.assign({}, event, {ctrlKey: true}),\n\t\taccelerator: accelerator.slice(modifier.length)\n\t};\n}\n\nfunction reduceModifier({accelerator, event}, modifier) {\n\tswitch (modifier) {\n\t\tcase 'command':\n\t\tcase 'cmd': {\n\t\t\treturn _command(accelerator, event, modifier);\n\t\t}\n\n\t\tcase 'super': {\n\t\t\treturn _super(accelerator, event, modifier);\n\t\t}\n\n\t\tcase 'control':\n\t\tcase 'ctrl': {\n\t\t\treturn _control(accelerator, event, modifier);\n\t\t}\n\n\t\tcase 'commandorcontrol':\n\t\tcase 'cmdorctrl': {\n\t\t\treturn _commandorcontrol(accelerator, event, modifier);\n\t\t}\n\n\t\tcase 'option':\n\t\tcase 'altgr':\n\t\tcase 'alt': {\n\t\t\treturn _alt(accelerator, event, modifier);\n\t\t}\n\n\t\tcase 'shift': {\n\t\t\treturn _shift(accelerator, event, modifier);\n\t\t}\n\n\t\tdefault:\n\t\t\tconsole.error(modifier);\n\t}\n}\n\nfunction reducePlus({accelerator, event}) {\n\treturn {\n\t\tevent,\n\t\taccelerator: accelerator.trim().slice(1)\n\t};\n}\n\nconst virtualKeyCodes = {\n\t0: 'Digit0',\n\t1: 'Digit1',\n\t2: 'Digit2',\n\t3: 'Digit3',\n\t4: 'Digit4',\n\t5: 'Digit5',\n\t6: 'Digit6',\n\t7: 'Digit7',\n\t8: 'Digit8',\n\t9: 'Digit9',\n\t'-': 'Minus',\n\t'=': 'Equal',\n\tQ: 'KeyQ',\n\tW: 'KeyW',\n\tE: 'KeyE',\n\tR: 'KeyR',\n\tT: 'KeyT',\n\tY: 'KeyY',\n\tU: 'KeyU',\n\tI: 'KeyI',\n\tO: 'KeyO',\n\tP: 'KeyP',\n\t'[': 'BracketLeft',\n\t']': 'BracketRight',\n\tA: 'KeyA',\n\tS: 'KeyS',\n\tD: 'KeyD',\n\tF: 'KeyF',\n\tG: 'KeyG',\n\tH: 'KeyH',\n\tJ: 'KeyJ',\n\tK: 'KeyK',\n\tL: 'KeyL',\n\t';': 'Semicolon',\n\t'\\'': 'Quote',\n\t'`': 'Backquote',\n\t'/': 'Backslash',\n\tZ: 'KeyZ',\n\tX: 'KeyX',\n\tC: 'KeyC',\n\tV: 'KeyV',\n\tB: 'KeyB',\n\tN: 'KeyN',\n\tM: 'KeyM',\n\t',': 'Comma',\n\t'.': 'Period',\n\t'\\\\': 'Slash',\n\t' ': 'Space'\n};\n\nfunction reduceKey({accelerator, event}, key) {\n\tif (key.length > 1 || event.key) {\n\t\tthrow new Error(`Unvalid keycode \\`${key}\\`.`);\n\t}\n\n\tconst code =\n\t\tkey.toUpperCase() in virtualKeyCodes ?\n\t\t\tvirtualKeyCodes[key.toUpperCase()] :\n\t\t\tnull;\n\n\treturn {\n\t\tevent: Object.assign({}, event, {key}, code ? {code} : null),\n\t\taccelerator: accelerator.trim().slice(key.length)\n\t};\n}\n\nconst domKeys = Object.assign(Object.create(null), {\n\tplus: 'Add',\n\tspace: 'Space',\n\ttab: 'Tab',\n\tbackspace: 'Backspace',\n\tdelete: 'Delete',\n\tinsert: 'Insert',\n\treturn: 'Return',\n\tenter: 'Return',\n\tup: 'ArrowUp',\n\tdown: 'ArrowDown',\n\tleft: 'ArrowLeft',\n\tright: 'ArrowRight',\n\thome: 'Home',\n\tend: 'End',\n\tpageup: 'PageUp',\n\tpagedown: 'PageDown',\n\tescape: 'Escape',\n\tesc: 'Escape',\n\tvolumeup: 'AudioVolumeUp',\n\tvolumedown: 'AudioVolumeDown',\n\tvolumemute: 'AudioVolumeMute',\n\tmedianexttrack: 'MediaTrackNext',\n\tmediaprevioustrack: 'MediaTrackPrevious',\n\tmediastop: 'MediaStop',\n\tmediaplaypause: 'MediaPlayPause',\n\tprintscreen: 'PrintScreen'\n});\n\n// Add function keys\nfor (let i = 1; i <= 24; i++) {\n\tdomKeys[`f${i}`] = `F${i}`;\n}\n\nfunction reduceCode({accelerator, event}, {code, key}) {\n\tif (event.code) {\n\t\tthrow new Error(`Duplicated keycode \\`${key}\\`.`);\n\t}\n\n\treturn {\n\t\tevent: Object.assign({}, event, {key}, code ? {code} : null),\n\t\taccelerator: accelerator.trim().slice((key && key.length) || 0)\n\t};\n}\n\n/**\n * This function transform an Electron Accelerator string into\n * a DOM KeyboardEvent object.\n *\n * @param  {string} accelerator an Electron Accelerator string, e.g. `Ctrl+C` or `Shift+Space`.\n * @return {object} a DOM KeyboardEvent object derivate from the `accelerator` argument.\n */\nfunction toKeyEvent(accelerator) {\n\tlet state = {accelerator, event: {}};\n\twhile (state.accelerator !== '') {\n\t\tconst modifierMatch = state.accelerator.match(modifiers);\n\t\tif (modifierMatch) {\n\t\t\tconst modifier = modifierMatch[0].toLowerCase();\n\t\t\tstate = reduceModifier(state, modifier);\n\t\t\tif (state === UNSUPPORTED) {\n\t\t\t\treturn {unsupportedKeyForPlatform: true};\n\t\t\t}\n\t\t} else if (state.accelerator.trim()[0] === '+') {\n\t\t\tstate = reducePlus(state);\n\t\t} else {\n\t\t\tconst codeMatch = state.accelerator.match(keyCodes);\n\t\t\tif (codeMatch) {\n\t\t\t\tconst code = codeMatch[0].toLowerCase();\n\t\t\t\tif (code in domKeys) {\n\t\t\t\t\tstate = reduceCode(state, {\n\t\t\t\t\t\tcode: domKeys[code],\n\t\t\t\t\t\tkey: code\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\tstate = reduceKey(state, code);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tthrow new Error(`Unvalid accelerator: \"${state.accelerator}\"`);\n\t\t\t}\n\t\t}\n\t}\n\n\treturn state.event;\n}\n\nmodule.exports = {\n\tUNSUPPORTED,\n\treduceModifier,\n\treducePlus,\n\treduceKey,\n\treduceCode,\n\ttoKeyEvent\n};\n\n\n//# sourceURL=webpack:///./node_modules/_keyboardevent-from-electron-accelerator@2.0.0@keyboardevent-from-electron-accelerator/index.js?");

/***/ }),

/***/ "./node_modules/_keyboardevents-areequal@0.2.2@keyboardevents-areequal/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/_keyboardevents-areequal@0.2.2@keyboardevents-areequal/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _lower(key) {\n\tif (typeof key !== 'string') {\n\t\treturn key;\n\t}\n\treturn key.toLowerCase();\n}\n\nfunction areEqual(ev1, ev2) {\n\tif (ev1 === ev2) {\n\t\t// Same object\n\t\t// console.log(`Events are same.`)\n\t\treturn true;\n\t}\n\n\tfor (const prop of ['altKey', 'ctrlKey', 'shiftKey', 'metaKey']) {\n\t\tconst [value1, value2] = [ev1[prop], ev2[prop]];\n\n\t\tif (Boolean(value1) !== Boolean(value2)) {\n\t\t\t// One of the prop is different\n\t\t\t// console.log(`Comparing prop ${prop}: ${value1} ${value2}`);\n\t\t\treturn false;\n\t\t}\n\t}\n\n\tif ((_lower(ev1.key) === _lower(ev2.key) && ev1.key !== undefined) ||\n\t\t(ev1.code === ev2.code && ev1.code !== undefined)) {\n\t\t// Events are equals\n\t\treturn true;\n\t}\n\n\t// Key or code are differents\n\t// console.log(`key or code are differents. ${ev1.key} !== ${ev2.key} ${ev1.code} !== ${ev2.code}`);\n\n\treturn false;\n}\n\nmodule.exports = areEqual;\n\n\n//# sourceURL=webpack:///./node_modules/_keyboardevents-areequal@0.2.2@keyboardevents-areequal/index.js?");

/***/ }),

/***/ "./node_modules/_ms@2.1.2@ms/index.js":
/*!********************************************!*\
  !*** ./node_modules/_ms@2.1.2@ms/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options) {\n  options = options || {};\n  var type = typeof val;\n  if (type === 'string' && val.length > 0) {\n    return parse(val);\n  } else if (type === 'number' && isFinite(val)) {\n    return options.long ? fmtLong(val) : fmtShort(val);\n  }\n  throw new Error(\n    'val is not a non-empty string or a valid number. val=' +\n      JSON.stringify(val)\n  );\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = String(str);\n  if (str.length > 100) {\n    return;\n  }\n  var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'yrs':\n    case 'yr':\n    case 'y':\n      return n * y;\n    case 'weeks':\n    case 'week':\n    case 'w':\n      return n * w;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'hrs':\n    case 'hr':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'mins':\n    case 'min':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 'secs':\n    case 'sec':\n    case 's':\n      return n * s;\n    case 'milliseconds':\n    case 'millisecond':\n    case 'msecs':\n    case 'msec':\n    case 'ms':\n      return n;\n    default:\n      return undefined;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtShort(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (msAbs >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (msAbs >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (msAbs >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtLong(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return plural(ms, msAbs, d, 'day');\n  }\n  if (msAbs >= h) {\n    return plural(ms, msAbs, h, 'hour');\n  }\n  if (msAbs >= m) {\n    return plural(ms, msAbs, m, 'minute');\n  }\n  if (msAbs >= s) {\n    return plural(ms, msAbs, s, 'second');\n  }\n  return ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, msAbs, n, name) {\n  var isPlural = msAbs >= n * 1.5;\n  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');\n}\n\n\n//# sourceURL=webpack:///./node_modules/_ms@2.1.2@ms/index.js?");

/***/ }),

/***/ "./node_modules/_supports-color@7.2.0@supports-color/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/_supports-color@7.2.0@supports-color/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst os = __webpack_require__(/*! os */ \"os\");\nconst tty = __webpack_require__(/*! tty */ \"tty\");\nconst hasFlag = __webpack_require__(/*! has-flag */ \"./node_modules/_has-flag@4.0.0@has-flag/index.js\");\n\nconst {env} = process;\n\nlet forceColor;\nif (hasFlag('no-color') ||\n\thasFlag('no-colors') ||\n\thasFlag('color=false') ||\n\thasFlag('color=never')) {\n\tforceColor = 0;\n} else if (hasFlag('color') ||\n\thasFlag('colors') ||\n\thasFlag('color=true') ||\n\thasFlag('color=always')) {\n\tforceColor = 1;\n}\n\nif ('FORCE_COLOR' in env) {\n\tif (env.FORCE_COLOR === 'true') {\n\t\tforceColor = 1;\n\t} else if (env.FORCE_COLOR === 'false') {\n\t\tforceColor = 0;\n\t} else {\n\t\tforceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);\n\t}\n}\n\nfunction translateLevel(level) {\n\tif (level === 0) {\n\t\treturn false;\n\t}\n\n\treturn {\n\t\tlevel,\n\t\thasBasic: true,\n\t\thas256: level >= 2,\n\t\thas16m: level >= 3\n\t};\n}\n\nfunction supportsColor(haveStream, streamIsTTY) {\n\tif (forceColor === 0) {\n\t\treturn 0;\n\t}\n\n\tif (hasFlag('color=16m') ||\n\t\thasFlag('color=full') ||\n\t\thasFlag('color=truecolor')) {\n\t\treturn 3;\n\t}\n\n\tif (hasFlag('color=256')) {\n\t\treturn 2;\n\t}\n\n\tif (haveStream && !streamIsTTY && forceColor === undefined) {\n\t\treturn 0;\n\t}\n\n\tconst min = forceColor || 0;\n\n\tif (env.TERM === 'dumb') {\n\t\treturn min;\n\t}\n\n\tif (process.platform === 'win32') {\n\t\t// Windows 10 build 10586 is the first Windows release that supports 256 colors.\n\t\t// Windows 10 build 14931 is the first release that supports 16m/TrueColor.\n\t\tconst osRelease = os.release().split('.');\n\t\tif (\n\t\t\tNumber(osRelease[0]) >= 10 &&\n\t\t\tNumber(osRelease[2]) >= 10586\n\t\t) {\n\t\t\treturn Number(osRelease[2]) >= 14931 ? 3 : 2;\n\t\t}\n\n\t\treturn 1;\n\t}\n\n\tif ('CI' in env) {\n\t\tif (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {\n\t\t\treturn 1;\n\t\t}\n\n\t\treturn min;\n\t}\n\n\tif ('TEAMCITY_VERSION' in env) {\n\t\treturn /^(9\\.(0*[1-9]\\d*)\\.|\\d{2,}\\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;\n\t}\n\n\tif (env.COLORTERM === 'truecolor') {\n\t\treturn 3;\n\t}\n\n\tif ('TERM_PROGRAM' in env) {\n\t\tconst version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);\n\n\t\tswitch (env.TERM_PROGRAM) {\n\t\t\tcase 'iTerm.app':\n\t\t\t\treturn version >= 3 ? 3 : 2;\n\t\t\tcase 'Apple_Terminal':\n\t\t\t\treturn 2;\n\t\t\t// No default\n\t\t}\n\t}\n\n\tif (/-256(color)?$/i.test(env.TERM)) {\n\t\treturn 2;\n\t}\n\n\tif (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {\n\t\treturn 1;\n\t}\n\n\tif ('COLORTERM' in env) {\n\t\treturn 1;\n\t}\n\n\treturn min;\n}\n\nfunction getSupportLevel(stream) {\n\tconst level = supportsColor(stream, stream && stream.isTTY);\n\treturn translateLevel(level);\n}\n\nmodule.exports = {\n\tsupportsColor: getSupportLevel,\n\tstdout: translateLevel(supportsColor(true, tty.isatty(1))),\n\tstderr: translateLevel(supportsColor(true, tty.isatty(2)))\n};\n\n\n//# sourceURL=webpack:///./node_modules/_supports-color@7.2.0@supports-color/index.js?");

/***/ }),

/***/ "./src/main/index.dev.js":
/*!*******************************!*\
  !*** ./src/main/index.dev.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * This file is used specifically and only for development. It installs\n * `electron-debug` & `vue-devtools`. There shouldn't be any need to\n *  modify this file, but it can be used to extend your development\n *  environment.\n */\n\n/* eslint-disable */\n\n// Install `electron-debug` with `devtron`\n//require('electron-debug')({ showDevTools: true });\n// NB: Don't open dev tools with this, it is causing the error\n__webpack_require__(/*! electron-debug */ \"./node_modules/_electron-debug@1.5.0@electron-debug/index.js\")();\n\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n    BrowserWindow = _require.BrowserWindow;\n\nvar _require2 = __webpack_require__(/*! electron */ \"electron\"),\n    session = _require2.session;\n// Install `vue-devtools`\n\n\n__webpack_require__(/*! electron */ \"electron\").app.on('ready', function () {\n  /*let installExtension = require('electron-devtools-installer');\n  installExtension\n    .default(installExtension.VUEJS_DEVTOOLS)\n    .then(() => {})\n    .catch((err) => {\n      console.log('Unable to install `vue-devtools`: \\n', err);\n    });\n  BrowserWindow.addDevToolsExtension('/Users/cuiwang/Workspace/vue-devtools-5.1.1/shells/chrome');*/\n  session.defaultSession.loadExtension('/Users/cuiwang/Workspace/vue-devtools-5.1.1/shells/chrome');\n  //BrowserWindow.addDevToolsExtension('/Users/cuiwang/Workspace/vue-devtools-5.1.1/shells/chrome');\n});\n// Require `main` process to boot app\n__webpack_require__(/*! ./index */ \"./src/main/index.js\");\n\n//# sourceURL=webpack:///./src/main/index.dev.js?");

/***/ }),

/***/ "./src/main/index.js":
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../update */ \"./src/update.js\");\n\n// 去掉安全警告\nprocess.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';\n//引入update.js\n\n/**\n * Set `__static` path to static files in production\n * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html\n */\nif (false) {}\n\nvar mainWindow = void 0;\n\nvar winURL =  true ? 'http://localhost:9080' : undefined;\n\nfunction createWindow() {\n  /**\n   * Initial window options\n   */\n  /*mainWindow = new BrowserWindow({\n    fullscreen: true\n  })*/\n  electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].setApplicationMenu(null);\n\n  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n    show: false,\n    minWidth: 1024,\n    minHeight: 768,\n    //frame: false,//取消window自带的关闭最小化等\n    //resizable: false, //禁止改变主窗口尺寸\n    title: 'Mark Studio',\n    useContentSize: true,\n    enableRemoteModule: true,\n    titleBarStyle: 'hidden',\n    webPreferences: {\n      plugins: true,\n      nativeWindowOpen: true, // ADD THIS\n      webSecurity: false,\n      nodeIntegration: true\n    }\n  });\n  mainWindow.maximize();\n  //mainWindow.show();\n  mainWindow.loadURL(winURL);\n\n  mainWindow.on('ready-to-show', function () {\n    mainWindow.show();\n  });\n\n  mainWindow.on('closed', function () {\n    mainWindow = null;\n  });\n}\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', async function () {\n  createWindow();\n  // 这里只在生产环境才执行版本检测。\n  if (false) {}\n});\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('window-all-closed', function () {\n  if (process.platform !== 'darwin') {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit();\n  }\n});\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('activate', function () {\n  if (mainWindow === null) {\n    createWindow();\n  }\n});\n\n/**\n * Auto Updater\n *\n * Uncomment the following code below and install `electron-updater` to\n * support auto updating. Code Signing with a valid certificate is required.\n * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating\n */\n\n/*\nimport { autoUpdater } from 'electron-updater'\n\nautoUpdater.on('update-downloaded', () => {\n  autoUpdater.quitAndInstall()\n})\n\napp.on('ready', () => {\n  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()\n})\n */\n\n//# sourceURL=webpack:///./src/main/index.js?");

/***/ }),

/***/ "./src/update.js":
/*!***********************!*\
  !*** ./src/update.js ***!
  \***********************/
/*! exports provided: updateHandle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateHandle\", function() { return updateHandle; });\n/* harmony import */ var electron_updater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron-updater */ \"electron-updater\");\n/* harmony import */ var electron_updater__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron_updater__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-log */ \"electron-log\");\n/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron_log__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar mainWindow = null;\nfunction updateHandle(window) {\n  mainWindow = window;\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].logger = electron_log__WEBPACK_IMPORTED_MODULE_1___default.a;\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].logger.transports.file.level = 'info';\n  electron_log__WEBPACK_IMPORTED_MODULE_1___default.a.info('App update starting...');\n  //设置更新包的地址\n  //监听升级失败事件\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].on('error', function (error) {\n    sendUpdateMessage({\n      cmd: 'error',\n      message: error\n    });\n  });\n  //监听开始检测更新事件\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].on('checking-for-update', function (message) {\n    sendUpdateMessage({\n      cmd: 'checking-for-update',\n      message: message\n    });\n  });\n  //监听发现可用更新事件\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].on('update-available', function (message) {\n    sendUpdateMessage({\n      cmd: 'update-available',\n      message: message\n    });\n  });\n  //监听没有可用更新事件\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].on('update-not-available', function (message) {\n    sendUpdateMessage({\n      cmd: 'update-not-available',\n      message: message\n    });\n  });\n\n  // 更新下载进度事件\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].on('download-progress', function (progressObj) {\n    sendUpdateMessage({\n      cmd: 'download-progress',\n      message: progressObj\n    });\n  });\n  //监听下载完成事件\n  electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl) {\n    sendUpdateMessage({\n      cmd: 'update-downloaded',\n      message: {\n        releaseNotes: releaseNotes,\n        releaseName: releaseName,\n        releaseDate: releaseDate,\n        updateUrl: updateUrl\n      }\n    });\n    //退出并安装更新包\n    electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].quitAndInstall();\n  });\n\n  //接收渲染进程消息，开始检查更新\n  electron__WEBPACK_IMPORTED_MODULE_2__[\"ipcMain\"].on('checkForUpdate', function (e, arg) {\n    //执行自动更新检查\n    // sendUpdateMessage({cmd:'checkForUpdate',message:arg})\n    electron_updater__WEBPACK_IMPORTED_MODULE_0__[\"autoUpdater\"].checkForUpdatesAndNotify();\n  });\n}\n//给渲染进程发送消息\nfunction sendUpdateMessage(text) {\n  mainWindow.webContents.send('message', text);\n}\n\n//# sourceURL=webpack:///./src/update.js?");

/***/ }),

/***/ 0:
/*!*********************************************************!*\
  !*** multi ./src/main/index.dev.js ./src/main/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/cuiwang/Workspace/GitHub/MarkStudio/src/main/index.dev.js */\"./src/main/index.dev.js\");\nmodule.exports = __webpack_require__(/*! /Users/cuiwang/Workspace/GitHub/MarkStudio/src/main/index.js */\"./src/main/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main/index.dev.js_./src/main/index.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "electron-log":
/*!*******************************!*\
  !*** external "electron-log" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron-log\");\n\n//# sourceURL=webpack:///external_%22electron-log%22?");

/***/ }),

/***/ "electron-updater":
/*!***********************************!*\
  !*** external "electron-updater" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron-updater\");\n\n//# sourceURL=webpack:///external_%22electron-updater%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"tty\");\n\n//# sourceURL=webpack:///external_%22tty%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });