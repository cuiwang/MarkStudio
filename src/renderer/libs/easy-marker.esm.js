function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _library = true;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.9 Object.getPrototypeOf(O)



_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf = _core.Object.getPrototypeOf;

var getPrototypeOf$1 = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf, __esModule: true };
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

var classCallCheck = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

unwrapExports(defineProperty$1);

var createClass = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _redefine = _hide;

var _iterators = {};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$1 = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO$1) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$2 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$2] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var f$1 = _wks;

var _wksExt = {
	f: f$1
};

var iterator = _wksExt.f('iterator');

var iterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": iterator, __esModule: true };
});

unwrapExports(iterator$1);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$3 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$3($Symbol, name, { value: _wksExt.f(name) });
};

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$4
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$5
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;





















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return _objectGops.f(_toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);



var es6_object_toString = /*#__PURE__*/Object.freeze({

});

_wksDefine('asyncIterator');

_wksDefine('observable');

getCjsExportFromNamespace(es6_object_toString);

var symbol = _core.Symbol;

var symbol$1 = createCommonjsModule(function (module) {
module.exports = { "default": symbol, __esModule: true };
});

unwrapExports(symbol$1);

var _typeof_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator$1);



var _symbol2 = _interopRequireDefault(symbol$1);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

var $getOwnPropertyDescriptor$1 = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  };
});

var $Object$1 = _core.Object;
var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  return $Object$1.getOwnPropertyDescriptor(it, key);
};

var getOwnPropertyDescriptor$1 = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertyDescriptor, __esModule: true };
});

unwrapExports(getOwnPropertyDescriptor$1);

var get = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf$1);



var _getOwnPropertyDescriptor2 = _interopRequireDefault(getOwnPropertyDescriptor$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
});

var _get = unwrapExports(get);

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf = _core.Object.setPrototypeOf;

var setPrototypeOf$1 = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf, __esModule: true };
});

unwrapExports(setPrototypeOf$1);

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });

var $Object$2 = _core.Object;
var create = function create(P, D) {
  return $Object$2.create(P, D);
};

var create$1 = createCommonjsModule(function (module) {
module.exports = { "default": create, __esModule: true };
});

unwrapExports(create$1);

var inherits = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



var _create2 = _interopRequireDefault(create$1);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

var _inherits = unwrapExports(inherits);

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from_1 = _core.Array.from;

var from_1$1 = createCommonjsModule(function (module) {
module.exports = { "default": from_1, __esModule: true };
});

unwrapExports(from_1$1);

var toConsumableArray = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _from2 = _interopRequireDefault(from_1$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
});

var _toConsumableArray = unwrapExports(toConsumableArray);

// 19.1.2.1 Object.assign(target, source, ...)






var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$1);

// 20.1.2.6 Number.MAX_SAFE_INTEGER


_export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

var maxSafeInteger = 0x1fffffffffffff;

var maxSafeInteger$1 = createCommonjsModule(function (module) {
module.exports = { "default": maxSafeInteger, __esModule: true };
});

var _Number$MAX_SAFE_INTEGER = unwrapExports(maxSafeInteger$1);

/**
 * Base element class
 *
 * @export
 * @class BaseElement
 */
var BaseElement = function () {
  function BaseElement() {
    _classCallCheck(this, BaseElement);

    this.element = null;
    this.container = document.body;
  }

  /**
   * Create element interface
   *
   * @memberof BaseElement
   */


  _createClass(BaseElement, [{
    key: 'createElement',
    value: function createElement() {} // eslint-disable-line class-methods-use-this


    /**
     * Mount the element under the container
     *
     * @memberof BaseElement
     */

  }, {
    key: 'mount',
    value: function mount() {
      this.container.appendChild(this.element);
    }

    /**
     * get Element Style
     *
     * @memberof BaseElement
     */

  }, {
    key: 'show',
    value: function show() {
      this.style.display = 'block';
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.style.display = 'none';
    }
  }, {
    key: 'destroy',


    /**
     * Remove Element
     *
     * @memberof BaseElement
     */
    value: function destroy() {
      if (this.element) {
        this.element.parentElement.removeChild(this.element);
      }
    }
  }, {
    key: 'style',
    get: function get() {
      return this.element.style;
    }
  }, {
    key: 'isShow',
    get: function get() {
      return this.style.display !== 'none' && this.style.display !== '';
    }
  }]);

  return BaseElement;
}();

var SelectStatus = {
  NONE: 'none',
  SELECTING: 'selecting',
  FINISH: 'finish'
};

var EasyMarkerMode = {
  NODE: 'node',
  REGION: 'region'
};

var NoteType = {
  UNDERLINE: 'underline',
  HIGHLIGHT: 'highlight',
  DASH: 'dash'
};

var DeviceType = {
  PC: 'pc',
  MOBILE: 'MOBILE'
};

var MenuType = {
  SELECT: 'select',
  HIGHLIGHT: 'highlight'
};

/**
 * Get the location of the clicked word
 *
 * @export
 * @param {HTMLElement} pElement
 * @param {number} x
 * @param {number}  y
 * @param {Array<string>} separators
 * @returns
 */
function getClickWordsPosition(pElement, x, y) {
  var separators = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [''];

  if (!pElement || pElement && !pElement.childNodes) return null;
  var lineHeight = Number(window.getComputedStyle(pElement).lineHeight.replace('px', ''));
  for (var i = 0; i < pElement.childNodes.length; i++) {
    var node = pElement.childNodes[i];

    if (node.nodeName === '#text') {
      var words = split(node.textContent, separators);
      var currentTextIndex = 0;
      var range = document.createRange();

      for (var index = 0; index < words.length; index++) {
        var wordsLength = words[index].length;
        range.setStart(node, currentTextIndex);
        range.setEnd(node, currentTextIndex + wordsLength);
        var textRects = range.getClientRects();

        for (var j = 0; j < textRects.length; j++) {
          var rect = textRects[j];
          lineHeight = lineHeight || rect.height;
          var margin = (lineHeight - rect.height) / 2;
          if (rect.left < x && rect.right > x && rect.top - margin < y && rect.bottom + margin > y) {
            var rects = [];

            for (var k = 0; k < textRects.length; k++) {
              var textRect = textRects[k];
              rects.push(_Object$assign({}, textRect, {
                top: textRect.top - margin,
                height: lineHeight,
                bottom: textRect.bottom + margin,
                left: textRect.left,
                right: textRect.right,
                width: textRect.width
              }));
            }
            return {
              node: node,
              rects: rects,
              textRects: textRects,
              index: currentTextIndex,
              wordsLength: wordsLength
            };
          }
        }
        currentTextIndex += wordsLength;
      }
    } else if (node.nodeName === '#comment') {
      continue; // eslint-disable-line no-continue
    } else {
      var result = getClickWordsPosition(node, x, y, separators);
      if (result) return result;
    }
  }
  return null;
}

/**
 * Get the location of the click
 *
 * @export
 * @param {HTMLElement| Node} pElement
 * @param {number} x
 * @param {number} y
 * @param {boolean} isStart
 */
function getClickPosition(pElement, x, y, isStart) {
  if (!pElement || !pElement && pElement.childNodes) return null;
  var lineHeight = Number(window.getComputedStyle(pElement).lineHeight.replace('px', ''));
  var tempResult = void 0;
  for (var i = 0; i < pElement.childNodes.length; i++) {
    var node = pElement.childNodes[i];
    var position = null;

    if (node.nodeName === '#text') {
      var words = [].concat(_toConsumableArray(node.textContent));
      var range = document.createRange();
      var preRect = void 0;
      for (var index = 0; index < words.length; index++) {
        range.setStart(node, index);
        range.setEnd(node, index + 1);
        var nextRect = void 0;
        var rects = range.getClientRects();
        var rect = void 0;
        if (rects.length > 1) {
          rect = rects[1]; // eslint-disable-line prefer-destructuring
        } else if (rects.length === 1) {
          rect = rects[0]; // eslint-disable-line prefer-destructuring
        } else {
            continue; // eslint-disable-line no-continue
          }
        lineHeight = lineHeight || rect.height;
        var margin = (lineHeight - rect.height) / 2;
        if (rect.top - margin <= y && rect.bottom + margin >= y) {
          position = {
            x: rect.left,
            y: rect.top - margin,
            height: lineHeight,
            index: index,
            node: node
          };

          try {
            range.setStart(node, index + 1);
            range.setEnd(node, index + 2);
            var nextRects = range.getClientRects();

            if (nextRects.length > 1) {
              nextRect = nextRects[1]; // eslint-disable-line prefer-destructuring
            } else if (nextRects.length === 1) {
              nextRect = nextRects[0]; // eslint-disable-line prefer-destructuring
            } else {
              nextRect = null;
            }
          } catch (error) {
            nextRect = null;
          }

          var isLineStart = preRect === undefined || preRect && preRect.bottom <= rect.top;
          var isLineEnd = nextRect === null || nextRect && nextRect.top >= rect.bottom;

          if (x < rect.right) {
            var isLeft = x < (rect.left + rect.right) / 2;
            if (isLineStart && !isStart || !isLeft && !(isLineEnd && isStart)) {
              position.x += rect.width;
              position.index += 1;
            }
            return position;
          }

          if (isLineEnd) {
            if (!isStart) {
              position.x += rect.width;
              position.index += 1;
            }
            tempResult = position;
          }
        }
        preRect = rect;
      }
    } else if (node.nodeName === '#comment') {
      continue; // eslint-disable-line no-continue
    } else {
      var result = getClickPosition(node, x, y, isStart);
      if (result) {
        tempResult = result;
      }
    }
    if (i === pElement.childNodes.length - 1 && tempResult) {
      return tempResult;
    }
  }
  return null;
}

/**
 * Get the relative position of the touch
 *
 * @export
 * @param {TouchEvent} e
 * @param {Object} offset Offset of the clicked location
 * @returns
 */
function getTouchPosition(e) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };

  var touch = getTouch(e);
  return {
    x: touch.clientX + offset.x,
    y: touch.clientY + offset.y
  };
}

/**
 * Returns the distance between two points
 *
 * @export
 * @param {any} start
 * @param {any} end
 * @returns
 */
function getDistance(start, end) {
  return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
}

/**
 *
 *
 * @export
 * @param {any} pixelUnit
 * @returns
 */
function anyToPx(pixelUnit) {
  if (typeof pixelUnit === 'number') return pixelUnit;
  if (typeof pixelUnit === 'string') {
    if (pixelUnit.indexOf('px') > -1) return Number(pixelUnit.replace('px', ''));
    if (pixelUnit.indexOf('rem') > -1) {
      var baseFontSize = Number((document.documentElement.style.fontSize || '24px').replace('px', ''));
      return Number(pixelUnit.replace('rem', '')) * baseFontSize;
    }
    return Number(pixelUnit);
  }
  return 0;
}

/**
 * Get the text node areas
 *
 * @export
 * @param {any} node
 * @param {any} start
 * @param {any} end
 * @returns
 */
function getNodeRects(node, start, end) {
  var range = document.createRange();
  var startIndex = start === undefined ? 0 : start;
  var endIndex = end === undefined ? node.textContent.length : end;
  try {
    range.setStart(node, startIndex);
    range.setEnd(node, endIndex);
    return domCollectionToArray(range.getClientRects());
  } catch (error) {
    console.error('EasyMarkerError:', error); // eslint-disable-line no-console
    return [];
  }
}

/**
 * Converts the location relative to the screen to the location relative to the parent container
 *
 * @export
 * @param {Object} position
 * @param {any} containerPosition
 * @param {any} scrollTop
 */
function screenRelativeToContainerRelative(position, offset) {
  if (!position.isSet) return position;

  position.y -= offset.y;
  position.x -= offset.x;

  return position;
}

/**
 * Split the string, the result contains the separator
 * E.g:
 *    separators:[',','!']
 *    'hello, world! => ['hello,', ' world!']
 * @export
 * @param {string} string
 * @param {Array<string>} [separators=['']]
 */
function split(string) {
  var separators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [''];

  var separatorRegStr = separators.reduce(function (acc, separator) {
    if (separator === '') return acc;
    if (acc === '') return '\\' + separator;
    return acc + '|\\' + separator;
  }, '');
  var separator = new RegExp('(' + separatorRegStr + ')');
  var splitStrings = string.split(separator);
  var resultStrings = [];
  for (var i = 0; i < splitStrings.length; i += 2) {
    var mergedStr = splitStrings[i] + (splitStrings[i + 1] || '');
    if (mergedStr.length > 0) {
      resultStrings.push(mergedStr);
    }
  }
  return resultStrings;
}

/**
 * Check whether in the rectangle
 *
 * @export
 * @param {number} x
 * @param {number} y
 * @param {ClientRect} rect
 * @returns {boolean}
 */
function inRectangle(x, y, rect, margin) {
  return rect.top - margin <= y && rect.bottom + margin >= y && rect.left <= x && rect.right >= x;
}

function copyRect(rect) {
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}
function domCollectionToArray(collection) {
  var array = [];
  for (var i = 0; i < collection.length; i++) {
    array.push(collection[i]);
  }
  return array;
}

function matchSubString() {
  var originStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var subStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var matchSubstr = '';
  var formatSubStr = subStr.replace(/\s+/g, '');
  for (var i = 0, j = 0; i < originStr.length; i++) {
    if (j >= formatSubStr.length) {
      return matchSubstr;
    }
    if (originStr[i] === formatSubStr[j]) {
      matchSubstr += originStr[i];
      j++;
    } else if (originStr[i].match(/\n|\r|\s/)) {
      if (matchSubstr !== '') {
        matchSubstr += originStr[i];
      }
    } else {
      i -= matchSubstr.length;
      j = 0;
      matchSubstr = '';
    }
  }
  return matchSubstr;
}

/**
 * get Device Type (mobile || PC)
 *
 * @param {Event} Event
 * @returns {object} { x, y }
 */
function getDeviceType() {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    var ua = navigator.userAgent;
    if (ua.indexOf('Tablet') > -1 || ua.indexOf('Pad') > -1 || ua.indexOf('Nexus 7') > -1) return DeviceType.MOBILE;
    if (ua.indexOf('Mobi') > -1 || ua.indexOf('Android') > -1 || ua.indexOf('iPh') > -1 || ua.indexOf('FLOW') > -1) {
      return DeviceType.MOBILE;
    }
    return DeviceType.PC;
  }
  return DeviceType.MOBILE;
}

/**
 * get eventTouch Support mobile and PC
 *
 * @param {Event} Event
 * @returns {object} { x, y }
 */
function getTouch(e) {
  if (getDeviceType() === DeviceType.MOBILE) {
    return e.changedTouches[0];
  }
  return {
    clientX: e.clientX,
    clientY: e.clientY
  };
}

/**
 * Binary search
 *
 * @param {array} array
 * @param {object | string} target
 * @param {string} target key
 * @param {boolean} is the boundary strict
 * @returns {number} index
 */
function BSearchUpperBound(arr, target, key) {
  var isLoose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var start = 0;
  var end = arr.length - 1;
  var mid = Math.floor((start + end) / 2);
  var targetValue = key ? target[key] : target;
  if (targetValue >= (key ? arr[end][key] : arr[end])) {
    return end;
  } else if (targetValue < (key ? arr[start][key] : arr[start])) {
    return isLoose ? start : -1;
  }
  while (start <= end) {
    if (start === mid || end === mid) {
      return mid;
    }
    if ((key ? arr[mid][key] : arr[mid]) > targetValue) {
      end = mid;
    } else {
      start = mid;
    }
    mid = Math.floor((start + end) / 2);
  }
  return mid;
}

/**
 * rect => Point[]
 *
 * @static
 * @param {ClientRect} rect
 * @param {Object} offset
 * @param {number} offset.x
 * @param {number} offset.y
 * @memberof Highlight
 */
function rectToPointArray(rect, offset, margin) {
  var points = [];
  if (rect.width === 0) return points;

  points.push([rect.left - margin, rect.top - margin]);
  points.push([rect.right + margin, rect.top - margin]);
  points.push([rect.right + margin, rect.bottom + margin]);
  points.push([rect.left - margin, rect.bottom + margin]);

  points.forEach(function (point) {
    point[0] -= offset.x;
    point[1] -= offset.y;
  });
  return points;
}

function getHighClickPriorityLine(lines) {
  var clickPriority = -1;
  var clickLine = void 0;
  lines.forEach(function (line) {
    if (line.line.meta.clickPriority > clickPriority) {
      clickLine = line;
      clickPriority = line.line.meta.clickPriority;
    }
  });
  if (clickPriority === -1) {
    return null;
  }
  return clickLine;
}

var CursorType = {
  START: 'start',
  END: 'end'
};

var defaultOptions = {
  color: '#ff6b00'

  /**
   * Cursor class
   *
   * @export
   * @class Cursor
   * @extends {BaseElement}
   */
};
var Cursor = function (_BaseElement) {
  _inherits(Cursor, _BaseElement);

  /**
   * Creates an instance of Cursor.
   * @param {any} container
   * @param {any} type
   * @param {any} options
   * @memberof Cursor
   */
  function Cursor(container, type, options) {
    _classCallCheck(this, Cursor);

    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || _Object$getPrototypeOf(Cursor)).call(this));

    _this.container = container;
    _this.type = type;
    _this.options = _Object$assign({}, defaultOptions, options);
    _this.$position = { x: 0, y: 0 };
    _this.$height = 0;
    _this.touchCallbackStack = [];
    _this.topPoint = null;
    _this.lineElement = null;
    _this.bottomPoint = null;
    _this.deviceType = getDeviceType();
    _this.createElement();
    _this.mount();
    return _this;
  }

  _createClass(Cursor, [{
    key: 'show',
    value: function show() {
      if (this.deviceType === DeviceType.PC) {
        return;
      }

      this.style.display = 'block';
    }

    /**
     * Move to the specified location
     *
     * @param {number} x px
     * @param {number} y px
     * @memberof Cursor
     */

  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this.style.top = y - this.width + 'px';
      this.style.left = x - this.width / 2 + 'px';
    }

    /**
     * Create the element
     *
     * @override
     * @memberof Cursor
     */

  }, {
    key: 'createElement',
    value: function createElement() {
      this.element = document.createElement('div');
      this.style.userSelect = 'none';
      this.style.webkitUserSelect = 'none';
      this.style.zIndex = '30';
      this.style.transition = 'top 0.1s, left 0.1s';
      this.style.display = 'none';
      this.style.position = 'absolute';

      this.topPoint = document.createElement('div');
      this.topPoint.style.borderRadius = '50%';
      this.topPoint.style.margin = 'auto';

      this.lineElement = document.createElement('div');
      this.lineElement.style.margin = 'auto';
      this.lineElement.style.backgroundColor = this.options.color;

      this.bottomPoint = document.createElement('div');
      this.bottomPoint.style.borderRadius = '50%';
      this.bottomPoint.style.margin = 'auto';

      if (this.type === CursorType.START) {
        this.topPoint.style.backgroundColor = this.options.color;
      } else {
        this.bottomPoint.style.backgroundColor = this.options.color;
      }

      this.element.appendChild(this.topPoint);
      this.element.appendChild(this.lineElement);
      this.element.appendChild(this.bottomPoint);
    }

    /**
     * Set the size of the cursor
     *
     * @param {number} size
     * @memberof Cursor
     */

  }, {
    key: 'setCursorSize',
    value: function setCursorSize(size) {
      var pointDiameter = this.width + 'px';

      this.style.width = pointDiameter;

      this.topPoint.style.height = pointDiameter;
      this.topPoint.style.width = pointDiameter;
      this.bottomPoint.style.height = pointDiameter;
      this.bottomPoint.style.width = pointDiameter;

      this.lineElement.style.height = size + 'px';
      this.lineElement.style.width = size / 15 + 'px';
    }

    /**
     * Check if it is in the region of the cursor
     *
     * @param {Object} position
     * @param {number} position.x
     * @param {number} position.y
     * @memberof Cursor
     */

  }, {
    key: 'inRegion',
    value: function inRegion() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.deviceType === DeviceType.PC) {
        return { inRegion: false };
      }
      var maxDistance = this.height;
      var distance = _Number$MAX_SAFE_INTEGER;
      if (position.y > this.position.y && position.y < this.position.y + this.height) {
        distance = Math.abs(position.x - this.position.x);
      }
      if (position.y >= this.position.y + this.with) {
        distance = getDistance(position, { x: this.position.x, y: this.position.y + this.height });
      }
      if (position.y <= this.position.y) {
        distance = getDistance(position, this.position);
      }
      return { inRegion: distance <= maxDistance, distance: distance };
    }
  }, {
    key: 'position',
    set: function set(val) {
      var x = val.x,
          y = val.y;

      this.$position = { x: x, y: y };

      this.moveTo(x, y);
    },
    get: function get() {
      return this.$position;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.$height;
    },
    set: function set(val) {
      if (val !== this.$height) {
        this.$height = val;
        this.setCursorSize(val);
      }
    }
  }, {
    key: 'width',
    get: function get() {
      return this.height / 4;
    }
  }]);

  return Cursor;
}(BaseElement);

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var SPECIES = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

var _validateCollection = function (it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$2 = _objectDp.f;









var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$2(C.prototype, 'size', {
      get: function () {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var SPECIES$1 = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var dP$3 = _objectDp.f;
var each = _arrayMethods(0);


var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      _anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
        _anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP$3(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var _arrayFromIterable = function (iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


var _collectionToJson = function (NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionOf = function (COLLECTION) {
  _export(_export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf('Map');

// https://tc39.github.io/proposal-setmap-offrom/





var _setCollectionFrom = function (COLLECTION) {
  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    _aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) _aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = _ctx(mapFn, arguments[2], 2);
      _forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      _forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom('Map');

var map = _core.Map;

var map$1 = createCommonjsModule(function (module) {
module.exports = { "default": map, __esModule: true };
});

var _Map = unwrapExports(map$1);

/**
 * Position class
 *
 * @export
 * @class Position
 */
var Position = function () {
  function Position() {
    _classCallCheck(this, Position);

    this.y = 0;
    this.x = 0;
    this.width = 0;
    this.height = 0;
  }

  /**
   * Return position set whether or not
   *
   * @readonly
   * @memberof Position
   */


  _createClass(Position, [{
    key: "setAll",


    /**
     * Set the position
     *
     * @param {any} position
     * @memberof Position
     */
    value: function setAll(position) {
      this.x = position.x;
      this.y = position.y;
      this.width = position.width;
      this.height = position.height;
    }

    /**
     * Check if the current position is equal to the specified position
     *
     * @param {any} position
     * @returns {bool}
     * @memberof Position
     */

  }, {
    key: "equal",
    value: function equal(position) {
      return this.x === position.x && this.y === position.y && this.width === position.width && this.height === position.height;
    }
  }, {
    key: "isSet",
    get: function get() {
      return this.y !== 0 || this.x !== 0 || this.width !== 0 || this.height !== 0;
    }
  }]);

  return Position;
}();

/**
 * Text node
 *
 * @export
 * @class TextNode
 */

var TextNode = function () {
  function TextNode(node, offset) {
    _classCallCheck(this, TextNode);

    this.node = node;
    this.offset = offset;
  }

  /**
   * Get the selected text
   *
   * @static
   * @param {any} startTextNode
   * @param {any} endTextNode
   * @memberof TextNode
   */


  _createClass(TextNode, null, [{
    key: 'getSelectText',
    value: function getSelectText(startTextNode, endTextNode) {
      try {
        var _getSelectNodeRectAnd = this.getSelectNodeRectAndText(startTextNode.node, endTextNode.node, startTextNode.offset, endTextNode.offset),
            text = _getSelectNodeRectAnd.text;

        return text;
      } catch (error) {
        console.error('EasyMarkerError:', error); // eslint-disable-line no-console
        return '';
      }
    }

    /**
     * Get the selected area
     *
     * @static
     * @param {any} startTextNode
     * @param {any} endTextNode
     * @returns
     * @memberof TextNode
     */

  }, {
    key: 'getSelectRects',
    value: function getSelectRects(startTextNode, endTextNode) {
      var headerLine = new Position();
      var bodyLine = new Position();
      var footerLine = new Position();

      if (!startTextNode || !endTextNode) {
        return {
          header: headerLine,
          body: bodyLine,
          footer: footerLine
        };
      }

      if (startTextNode.node.nodeName !== '#text' || endTextNode.node.nodeName !== '#text') {
        // eslint-disable-next-line no-console
        console.error('The parameters for getting the selection rect should be a TextNode', {
          startTextNode: startTextNode,
          endTextNode: endTextNode
        });
        return {
          header: headerLine,
          body: bodyLine,
          footer: footerLine
        };
      }
      var rects = void 0;
      try {
        var _getSelectNodeRectAnd2 = this.getSelectNodeRectAndText(startTextNode.node, endTextNode.node, startTextNode.offset, endTextNode.offset);

        rects = _getSelectNodeRectAnd2.rects;
      } catch (error) {
        console.error('EasyMarkerError:', error); // eslint-disable-line no-console
        rects = [];
      }

      var lineMergedRects = [];
      rects.forEach(function (rect) {
        if (lineMergedRects.length > 0) {
          var lastLineMergedRect = lineMergedRects[lineMergedRects.length - 1];
          var safetyBoundary = lastLineMergedRect.height / 2;
          if (Math.abs(lastLineMergedRect.top - rect.top) < safetyBoundary && Math.abs(lastLineMergedRect.bottom - rect.bottom) < safetyBoundary) {
            lastLineMergedRect.width += rect.width;
            lastLineMergedRect.height = lastLineMergedRect.height - rect.height > 0 ? lastLineMergedRect.height : rect.height;
            lastLineMergedRect.top = lastLineMergedRect.top - rect.top < 0 ? lastLineMergedRect.top : rect.top;
            lastLineMergedRect.bottom = lastLineMergedRect.bottom - rect.bottom > 0 ? lastLineMergedRect.bottom : rect.bottom;
          } else {
            lineMergedRects.push(copyRect(rect));
          }
        } else {
          lineMergedRects.push(copyRect(rect));
        }
      });

      var startLineHeight = 0;
      var leftArr = [];
      var rightArr = [];
      if (lineMergedRects.length > 0) {
        var headRect = lineMergedRects.shift();
        startLineHeight = Number(window.getComputedStyle(startTextNode.node.parentElement).lineHeight.replace('px', '')) || headRect.height;
        headerLine.x = headRect.left;
        headerLine.width = headRect.width;
        headerLine.y = headRect.top - (startLineHeight - headRect.height) / 2;
        headerLine.height = startLineHeight;
        leftArr.push(headerLine.x);
        rightArr.push(headRect.right);
      }

      var endLineHight = 0;
      if (lineMergedRects.length > 0) {
        var footRect = lineMergedRects.pop();
        endLineHight = Number(window.getComputedStyle(endTextNode.node.parentElement).lineHeight.replace('px', '')) || footRect.height;
        footerLine.x = footRect.left;
        footerLine.width = footRect.width;
        footerLine.y = footRect.top - (endLineHight - footRect.height) / 2;
        footerLine.height = endLineHight;

        leftArr.push(footerLine.x);
        rightArr.push(footRect.right);
      }

      if (lineMergedRects.length > 0) {
        var _maxRight = 0;
        lineMergedRects.forEach(function (lineRect) {
          if (bodyLine.x && bodyLine.width) {
            if (lineRect.left < bodyLine.x) {
              bodyLine.x = lineRect.left;
            }

            if (lineRect.width > bodyLine.width) {
              bodyLine.width = lineRect.width;
            }
            if (_maxRight < lineRect.right) {
              _maxRight = lineRect.right;
            }
          } else {
            bodyLine.x = lineRect.left;
            bodyLine.width = lineRect.width;
            _maxRight = lineRect.right;
          }
        });
        leftArr.push(bodyLine.x);
        rightArr.push(_maxRight);
      }
      var minLeft = Math.min.apply(Math, leftArr);
      if (minLeft !== Infinity) {
        bodyLine.x = minLeft;
      }
      var maxRight = Math.max.apply(Math, rightArr);
      if (maxRight !== -Infinity) {
        bodyLine.width = maxRight - bodyLine.x;
      }

      bodyLine.y = headerLine.y + startLineHeight;
      if (footerLine.isSet) {
        bodyLine.height = footerLine.y - bodyLine.y;
      } else {
        footerLine.x = headerLine.x;
        footerLine.y = headerLine.y + startLineHeight;
      }

      return {
        header: headerLine,
        body: bodyLine,
        footer: footerLine
      };
    }
  }, {
    key: 'getSelectNodeRectAndText',
    value: function getSelectNodeRectAndText(startNode, endNode, startIndex, endIndex) {
      var result = {
        rects: [],
        text: ''
      };
      if (startNode.childNodes.length > 0 && startNode.nodeName !== 'SCRIPT' && startNode.nodeName !== 'STYLE') {
        var _result$rects;

        var childNode = startNode.childNodes[0];

        var _getSelectNodeRectAnd3 = this.getSelectNodeRectAndText(childNode, endNode, 0, endIndex),
            text = _getSelectNodeRectAnd3.text,
            rects = _getSelectNodeRectAnd3.rects;

        (_result$rects = result.rects).push.apply(_result$rects, _toConsumableArray(rects));
        result.text += text;
        return result;
      }

      if (startNode.nodeName === '#text') {
        var _result$rects2;

        var textEndIndex = startNode === endNode ? endIndex : startNode.textContent.length;
        (_result$rects2 = result.rects).push.apply(_result$rects2, _toConsumableArray(getNodeRects(startNode, startIndex, textEndIndex)));
        result.text += startNode.textContent.substring(startIndex, textEndIndex);
      }

      if (startNode.nodeName === 'IMG') {
        result.rects.push(startNode.getBoundingClientRect());
      }

      if (startNode === endNode) {
        return result;
      }

      var nextNode = startNode.nextSibling;
      if (nextNode) {
        var _result$rects3;

        var _getSelectNodeRectAnd4 = this.getSelectNodeRectAndText(nextNode, endNode, 0, endIndex),
            _text = _getSelectNodeRectAnd4.text,
            _rects = _getSelectNodeRectAnd4.rects;

        (_result$rects3 = result.rects).push.apply(_result$rects3, _toConsumableArray(_rects));
        result.text += _text;
      } else {
        var currentNode = startNode.parentNode;
        while (currentNode && currentNode.nextSibling === null) {
          currentNode = currentNode.parentNode;
        }
        if (currentNode) {
          var _result$rects4;

          var _getSelectNodeRectAnd5 = this.getSelectNodeRectAndText(currentNode.nextSibling, endNode, 0, endIndex),
              _text2 = _getSelectNodeRectAnd5.text,
              _rects2 = _getSelectNodeRectAnd5.rects;

          (_result$rects4 = result.rects).push.apply(_result$rects4, _toConsumableArray(_rects2));
          result.text += _text2;
        } else {
          throw new Error('Invalid end node');
        }
      }
      return result;
    }
  }]);

  return TextNode;
}();

/**
 *
 *
 * @export
 * @extends {BaseElement}
 */

var Menu = function (_BaseElement) {
  _inherits(Menu, _BaseElement);

  function Menu(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || _Object$getPrototypeOf(Menu)).call(this));

    _this.container = container;
    _this.handler = null;
    _this.mode = options.mode;
    _this.selectionOptions = null;
    _this.option = {
      items: options.menuItems,
      isMultiColumnLayout: options.isMultiColumnLayout,
      topOffset: anyToPx(options.topOffset),
      style: {
        menu: {
          fontSize: '0.4rem',
          backgroundColor: '#262626',
          fontColor: '#fff',
          borderRadius: '0.1rem',
          color: '#fff',
          border: '0px',
          display: 'inline-block',
          padding: '0 0.2rem',
          margin: 'auto'
        },
        triangle: {
          marginLeft: 'auto',
          marginRight: 'auto',
          borderTop: '0.2rem solid #262626',
          borderRight: '0.2rem solid transparent',
          borderLeft: '0.2rem solid transparent',
          width: '0',
          height: '0',
          marginTop: '-1px'
        },
        item: {
          lineHeight: '1.24rem',
          padding: '0 0.3rem',
          color: '#fff',
          display: 'inline-block'
        },
        icon: {
          display: 'block'
        },
        title: {
          display: 'block'
        }
      }
    };

    if (options.style) {
      _Object$assign(_this.option.style.menu, options.style.menu);
      _Object$assign(_this.option.style.triangle, options.style.triangle);
      _Object$assign(_this.option.style.item, options.style.item);
      _Object$assign(_this.option.style.icon, options.style.icon);
    }

    _this.easyMarker = null;
    _this.menuElement = null;
    _this.itemMap = new _Map();
    _this.positionRange = {
      top: 0,
      bottom: 0,
      left: 0
    };
    _this.windowWidth = document.documentElement.clientWidth;
    _this.ticking = false;
    _this.height = 0;
    _this.width = 0;
    _this.type = MenuType.SELECT;
    _this.options = null; // 缓存selection携带的一些数据信息
    _this.createElement();
    _this.mount();
    _this.hide();
    return _this;
  }

  _createClass(Menu, [{
    key: 'createElement',
    value: function createElement() {
      var wrapper = document.createElement('div');
      this.element = wrapper;
      wrapper.style.position = 'absolute';
      wrapper.style.width = 'max-content';
      wrapper.style.textAlign = 'center';
      wrapper.style.lineHeight = '0';
      wrapper.style.zIndex = '50';
      wrapper.style.transform = 'translate3d(-50%, -100%, 0)';
      wrapper.style.webkitTransform = 'translate3d(-50%, -100%, 0)';
      wrapper.style.transition = 'transform 0.2s ease, opacity 0.2s ease';

      var menu = document.createElement('div');
      this.menuElement = menu;
      menu.classList.add('em-menu');
      _Object$assign(menu.style, this.option.style.menu);

      var bottomTriangle = document.createElement('div');
      bottomTriangle.classList.add('em-menu-triangle');
      _Object$assign(bottomTriangle.style, this.option.style.triangle);

      wrapper.appendChild(menu);
      wrapper.appendChild(bottomTriangle);
      this.renderMenuItems();

      var style = document.createElement('style');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      // eslint-disable-next-line max-len
      var styleText = '.em-menu-wrapper-select .em-menu-item-highlight{display: none !important} .em-menu-wrapper-highlight .em-menu-item-select{display: none !important}';
      style.appendChild(document.createTextNode(styleText));
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(style);
    }
  }, {
    key: 'createMenuItemElement',
    value: function createMenuItemElement(_ref) {
      var text = _ref.text,
          iconName = _ref.iconName,
          itemStyle = _ref.style,
          iconStyle = _ref.iconStyle,
          type = _ref.type,
          title = _ref.title,
          titleStyle = _ref.titleStyle;

      // eslint-disable-line class-methods-use-this
      var menuItem = document.createElement('span');
      menuItem.classList.add('em-menu-item');
      if (type !== undefined) {
        menuItem.classList.add('em-menu-item-' + type);
      }
      _Object$assign(menuItem.style, this.option.style.item, itemStyle);
      if (iconName) {
        var iconItem = document.createElement('span');
        _Object$assign(iconItem.style, this.option.style.icon, iconStyle);
        iconItem.className = 'em-menu-item-icon '.concat(iconName);
        var textNode = document.createTextNode(text);
        menuItem.appendChild(iconItem);
        menuItem.appendChild(textNode);
      } else if (title) {
        var titleItem = document.createElement('span');
        _Object$assign(titleItem.style, this.option.style.title, titleStyle);
        titleItem.className = 'em-menu-item-title';
        var titleNode = document.createTextNode(title);
        titleItem.appendChild(titleNode);
        var _textNode = document.createTextNode(text);
        menuItem.appendChild(titleItem);
        menuItem.appendChild(_textNode);
      } else {
        var _textNode2 = document.createTextNode(text);
        menuItem.appendChild(_textNode2);
      }

      return menuItem;
    }
  }, {
    key: 'renderMenuItems',
    value: function renderMenuItems(options) {
      var _this2 = this;

      this.selectionOptions = options;
      this.removeMenuItems();
      var selection = options && this.getSelection(options);
      var menuItems = typeof this.option.items === 'function' ? this.option.items(selection, this.type) : this.option.items;
      menuItems.forEach(function (item) {
        var menuItem = _this2.createMenuItemElement(item);
        _this2.itemMap.set(menuItem, item);
        _this2.menuElement.appendChild(menuItem);
      });
    }
  }, {
    key: 'removeMenuItems',
    value: function removeMenuItems() {
      var _this3 = this;

      this.itemMap.forEach(function (item, el) {
        _this3.menuElement.removeChild(el);
      });
      this.itemMap.clear();
    }
  }, {
    key: 'setPosition',
    value: function setPosition(start, end) {
      var _this4 = this;

      var mergeRects = {};
      if (this.mode === EasyMarkerMode.REGION) {
        var rects = void 0;
        if (start.pageIndex !== end.pageIndex) {
          // menu 跟随最后一页走
          var startRegion = this.easyMarker.region.regions[end.pageIndex].regions[0].regions[0];
          rects = this.easyMarker.region.getRects(startRegion, end);
        } else {
          rects = this.easyMarker.region.getRects(start, end);
        }
        // const rects = this.easyMarker.region.getRects(start, end)
        rects.forEach(function (rect, index) {
          if (index === 0) {
            mergeRects.left = rect.left;
            mergeRects.top = rect.top;
            mergeRects.right = rect.right;
            mergeRects.bottom = rect.bottom;
          } else {
            mergeRects.left = Math.min(rect.left, mergeRects.left);
            mergeRects.top = Math.min(rect.top, mergeRects.top);
            mergeRects.right = Math.max(rect.right, mergeRects.right);
            mergeRects.bottom = Math.max(rect.bottom, mergeRects.bottom);
          }
        });
      } else {
        var _TextNode$getSelectNo = TextNode.getSelectNodeRectAndText(start.node, end.node, start.offset, end.offset),
            _rects = _TextNode$getSelectNo.rects;

        _rects.filter(function (item) {
          return item.left <= _this4.windowWidth && item.left >= 0;
        }).forEach(function (rect, index) {
          if (index === 0) {
            mergeRects.left = rect.left - _this4.screenRelativeOffset.x;
            mergeRects.top = rect.top - _this4.screenRelativeOffset.y;
            mergeRects.right = rect.right - _this4.screenRelativeOffset.x;
            mergeRects.bottom = rect.bottom - _this4.screenRelativeOffset.y;
          } else if (index === _rects.length - 1) {
            mergeRects.bottom = rect.bottom - _this4.screenRelativeOffset.y;
          }
        });
      }

      this.positionRange.top = mergeRects.top;
      this.positionRange.bottom = mergeRects.bottom;
      this.positionRange.left = (mergeRects.left + mergeRects.right) / 2;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.style.visibility = 'hidden';
      this.style.opacity = '0';
      this.reset();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.options = {};
    }
  }, {
    key: 'show',
    value: function show(options) {
      this.renderMenuItems(options);
      if (this.type === MenuType.HIGHLIGHT) {
        this.element.classList.remove('em-menu-wrapper-select');
        this.element.classList.add('em-menu-wrapper-highlight');
      } else if (this.type === MenuType.SELECT) {
        this.element.classList.remove('em-menu-wrapper-highlight');
        this.element.classList.add('em-menu-wrapper-select');
      }
      var relativeTop = 0;
      // if (!this.height || !this.width) {
      this.height = Number((window.getComputedStyle(this.menuElement).height || '').replace('px', ''));
      this.width = Number((window.getComputedStyle(this.menuElement).width || '').replace('px', ''));
      // }

      var _container$getBoundin = this.container.getBoundingClientRect(),
          containerTop = _container$getBoundin.top,
          containerRight = _container$getBoundin.right,
          containerLeft = _container$getBoundin.left;

      if (containerTop < 0 && this.positionRange.bottom < -containerTop) {
        relativeTop = this.positionRange.bottom;
        this.style.position = 'absolute';
      } else if (this.positionRange.top - this.height - this.option.topOffset > -containerTop) {
        relativeTop = this.positionRange.top;
        this.style.position = 'absolute';
      } else {
        // relativeTop = this.option.topOffset + menuHeight - containerTop
        this.style.position = 'fixed';
        relativeTop = this.option.topOffset + this.height;
      }

      // this.style.display = 'block'
      this.style.visibility = 'visible';
      this.style.top = relativeTop + 'px';
      // console.log(this.width) // 967
      // console.log(this.windowWidth) // 1440
      // console.log(this.positionRange.left) // 237
      // console.log(containerRight)// 1049
      // console.log(containerLeft)// 31
      if (this.width >= containerRight - containerLeft) {
        // const left = (containerRight - containerLeft) / 2
        var left = this.width / 2;
        this.style.left = left + 'px';
        this.style.right = '';
      } else if (this.positionRange.left + containerLeft + this.width / 2 > this.windowWidth) {
        var right = void 0;
        if (this.style.position === 'fixed' && !this.option.isMultiColumnLayout) {
          right = containerRight - this.positionRange.left - this.width / 2;
          right = containerLeft < 0 ? -this.width / 2 : right;
        } else {
          right = containerRight - this.positionRange.left - containerLeft - this.width / 2;
        }
        if (right < -this.width / 2) {
          right = -this.width / 2;
        } else if (right > -this.width / 2 + containerRight - containerLeft - this.width) {
          right = -this.width / 2 + containerRight - containerLeft - this.width;
        }
        this.style.right = right + 'px';
        this.style.left = '';
      } else if (this.positionRange.left + containerLeft - this.width / 2 < 0) {
        var _left = void 0;
        if (this.style.position === 'fixed' && !this.option.isMultiColumnLayout) {
          _left = this.width / 2 + this.positionRange.left + containerLeft;
          _left = _left < 0 ? this.width / 2 : _left;
        } else {
          _left = this.width / 2 + this.positionRange.left;
        }
        if (_left + this.width / 2 > containerRight - containerLeft) {
          _left -= _left + this.width / 2 - containerRight + containerLeft;
        }
        this.style.left = _left + 'px';
        this.style.right = '';
      } else {
        var _left2 = void 0;
        if (this.style.position === 'fixed' && !this.option.isMultiColumnLayout) {
          _left2 = this.positionRange.left + containerLeft;
          _left2 = _left2 < 0 ? this.width / 2 : _left2;
        } else {
          // eslint-disable-next-line prefer-destructuring
          _left2 = this.positionRange.left;
        }
        this.style.left = _left2 + 'px';
        this.style.right = '';
      }
      this.style.opacity = '1';
    }
  }, {
    key: 'copyListener',
    value: function copyListener(options, e) {
      var copyItem = void 0;
      this.itemMap.forEach(function (item) {
        if (item.id === 'copy' || item.text === '复制') {
          copyItem = item;
        }
      });
      if (!copyItem) return;
      var selection = this.getSelection(options);
      if (copyItem.id && this.easyMarker.menuOnClick) {
        this.easyMarker.menuOnClick(copyItem.id, selection, _Object$assign({}, this.options, { e: e }));
      } else {
        copyItem.handler.call(this.easyMarker, selection, _Object$assign({}, this.options, { e: e }));
      }
    }
  }, {
    key: 'inRegion',
    value: function inRegion(e) {
      var tapTarget = this.getTapTarget(e.target);
      if (!this.itemMap.has(tapTarget)) return false;
      return true;
    }
  }, {
    key: 'handleTap',
    value: function handleTap(e, options) {
      var tapTarget = this.getTapTarget(e.target);
      if (!this.itemMap.has(tapTarget)) return false;

      var selection = this.getSelection(options);

      var item = this.itemMap.get(tapTarget);
      if (item.id && this.easyMarker.menuOnClick) {
        this.easyMarker.menuOnClick(item.id, selection, this.options);
      } else {
        item.handler.call(this.easyMarker, selection, this.options);
      }
      return true;
    }
  }, {
    key: 'getSelection',
    value: function getSelection(options) {
      var selection = void 0;
      if (this.mode === EasyMarkerMode.NODE) {
        var start = options.start,
            end = options.end,
            content = options.content,
            markdown = options.markdown;

        selection = {
          anchorNode: start.node,
          anchorOffset: start.offset,
          focusNode: end.node,
          focusOffset: end.offset,
          toString: function toString() {
            return content;
          },
          toMarkdown: function toMarkdown() {
            return markdown;
          }
        };
      } else {
        var _start = options.start,
            _end = options.end,
            _content = options.content,
            _markdown = options.markdown;

        selection = {
          start: _start,
          end: _end,
          toString: function toString() {
            return _content;
          },
          toMarkdown: function toMarkdown() {
            return _markdown;
          }
        };
      }
      return selection;
    }
  }, {
    key: 'getTapTarget',
    value: function getTapTarget(target) {
      if (this.itemMap.has(target)
      // || (target.classList && target.classList.contains('em-menu'))
      ) {
          return target;
        }
      if (target.parentNode) {
        return this.getTapTarget(target.parentNode);
      }
      return null;
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var _this5 = this;

      if (!this.ticking) {
        window.requestAnimationFrame(function () {
          _this5.show(_this5.selectionOptions);
          _this5.ticking = false;
        });
        this.ticking = true;
      }
    }
  }, {
    key: 'screenRelativeOffset',
    get: function get() {
      // const { top, left } = this.container.getBoundingClientRect()
      // return {
      //   x: left,
      //   y: top,
      // }
      if (!this.easyMarker) {
        return {
          x: 0,
          y: 0
        };
      }
      return this.easyMarker.screenRelativeOffset;
    }
  }, {
    key: 'isShow',
    get: function get() {
      return this.style.visibility === 'visible';
    }
  }]);

  return Menu;
}(BaseElement);

var ITERATOR$4 = _wks('iterator');

var core_isIterable = _core.isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$4] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || _iterators.hasOwnProperty(_classof(O));
};

var isIterable = core_isIterable;

var isIterable$1 = createCommonjsModule(function (module) {
module.exports = { "default": isIterable, __esModule: true };
});

unwrapExports(isIterable$1);

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator = core_getIterator;

var getIterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": getIterator, __esModule: true };
});

unwrapExports(getIterator$1);

var slicedToArray = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _isIterable3 = _interopRequireDefault(isIterable$1);



var _getIterator3 = _interopRequireDefault(getIterator$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
});

var _slicedToArray = unwrapExports(slicedToArray);

var MaskType = {
  BLOCK: 'block',
  LINE: 'line'
};

var Mask = function (_BaseElement) {
  _inherits(Mask, _BaseElement);

  function Mask(container, option) {
    _classCallCheck(this, Mask);

    var _this = _possibleConstructorReturn(this, (Mask.__proto__ || _Object$getPrototypeOf(Mask)).call(this));

    var defaultOptions = {
      color: '#FEFFCA',
      opacity: 0.5,
      animateDuration: 100
    };
    _this.mode = option.mode || EasyMarkerMode.NODE;
    _this.maskType = option.maskType || (_this.mode === EasyMarkerMode.NODE ? MaskType.BLOCK : MaskType.LINE);
    _this.container = container;
    _this.option = _Object$assign(defaultOptions, option);

    if (_this.maskType === MaskType.BLOCK) {
      _this.paths = [];
      _this.position = {
        header: new Position(),
        body: new Position(),
        footer: new Position()
      };
      _this.animateStartTime = 0;
      _this.animateEndTime = 0;
      _this.animatePercent = 0;
      _this.polygonElement = null;
    } else {
      _this.rects = [];
    }
    _this.animating = false;
    _this.easyMarker = null;
    _this.createElement();
    _this.mount();
    return _this;
  }

  // get screenRelativeOffset() {
  //   const { top, left } = this.container.getBoundingClientRect()
  //   return {
  //     x: left,
  //     y: top,
  //   }
  // }

  _createClass(Mask, [{
    key: 'createElement',
    value: function createElement() {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.zIndex = '20';
      svg.style.pointerEvents = 'none';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.overflow = 'visible';

      if (this.maskType === MaskType.BLOCK) {
        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.style.fill = this.option.color;
        polygon.style.strokeWidth = 0;
        polygon.style.strokeOpacity = this.option.opacity;
        polygon.style.opacity = this.option.opacity;
        polygon.style.transition = 'opacity 0.2s ease';
        svg.appendChild(polygon);
        this.polygonElement = polygon;
      }
      this.element = svg;
    }
  }, {
    key: 'render',
    value: function render(start, end) {
      if (this.mode === EasyMarkerMode.NODE) {
        if (this.maskType === 'line') {
          var rects = void 0;
          try {
            var _TextNode$getSelectNo = TextNode.getSelectNodeRectAndText(start.node, end.node, start.offset, end.offset);

            rects = _TextNode$getSelectNo.rects;
          } catch (error) {
            console.error('EasyMarkerError:', error); // eslint-disable-line no-console
            rects = [];
          }
          var lineHeight = Number(window.getComputedStyle(start.node.parentElement).lineHeight.replace('px', ''));
          this.renderRectsLine(rects, lineHeight);
        } else {
          var _TextNode$getSelectRe = TextNode.getSelectRects(start, end),
              header = _TextNode$getSelectRe.header,
              body = _TextNode$getSelectRe.body,
              footer = _TextNode$getSelectRe.footer;

          var relativeHeader = screenRelativeToContainerRelative(header, this.screenRelativeOffset);
          var relativeBody = screenRelativeToContainerRelative(body, this.screenRelativeOffset);
          var relativeFooter = screenRelativeToContainerRelative(footer, this.screenRelativeOffset);
          this.renderBlock(relativeHeader, relativeBody, relativeFooter);
        }
      }

      if (this.mode === EasyMarkerMode.REGION) {
        var _rects = this.easyMarker.region.getRects(start, end);
        if (this.maskType === 'line') {
          this.renderRectsLine(_rects);
        } else {
          var _header = void 0;
          var _footer = void 0;
          var _body = void 0;
          _rects.forEach(function (rect, index) {
            if (index === 0) {
              _header = new Position();
              _body = new Position();
              _footer = new Position();
              _header.setAll(rect);
              _body.setAll(rect);
              _footer.setAll(rect);
              _body.y = rect.y + rect.height;
              _body.height = 0;
              _footer.height = 0;
              _footer.y = rect.y + rect.height;
            } else if (index === _rects.length - 1) {
              _footer.setAll(rect);
              _body.height = rect.y - (_header.y + _header.height);
            } else {
              var right = _body.x + _body.width;
              var left = _body.x;
              if (rect.x < left) {
                _body.x = rect.x;
              }
              if (rect.x + rect.width >= right) {
                _body.width = rect.x + rect.width - _body.x;
              }
            }
          });
          this.renderBlock(_header, _body, _footer);
        }
      }
    }
  }, {
    key: 'renderBlock',
    value: function renderBlock(headerPosition, bodyPosition, footerPosition) {
      var _position = this.position,
          header = _position.header,
          body = _position.body,
          footer = _position.footer;

      if (this.paths.length !== 0 && header.equal(headerPosition) && body.equal(bodyPosition) && footer.equal(footerPosition)) {
        return;
      }
      this.polygonElement.style.opacity = this.option.opacity;
      var fromPosition = this.position;
      this.position.header.setAll(headerPosition);
      this.position.body.setAll(bodyPosition);
      this.position.footer.setAll(footerPosition);

      this.animateStartTime = Date.now();
      this.animateEndTime = this.animateStartTime + this.option.animateDuration;
      this.animatePercent = 0;
      if (!this.animating) {
        this.animating = true;
        this.animated(fromPosition);
      }
    }
  }, {
    key: 'animated',
    value: function animated(from) {
      var _this2 = this;

      var realPercent = (Date.now() - this.animateStartTime) / (this.animateEndTime - this.animateStartTime);
      var nextPercent = 0;

      if (realPercent >= 1) {
        nextPercent = 1;
        this.animatePercent = 1;
      } else {
        var nextAnimationPercent = 1000 / 60 / this.option.animateDuration + (realPercent - this.animatePercent) * 1.3;
        this.animatePercent += nextAnimationPercent;
        nextPercent = nextAnimationPercent > 1 ? 1 : nextAnimationPercent / (1 - realPercent);
      }

      var nextHeaderPosition = this.constructor.getAnimateFrame(from.header, this.position.header, nextPercent);
      var nextBodyPosition = this.constructor.getAnimateFrame(from.body, this.position.body, nextPercent);
      var nextFooterPosition = this.constructor.getAnimateFrame(from.footer, this.position.footer, nextPercent);
      var nextPosition = {
        header: nextHeaderPosition,
        body: nextBodyPosition,
        footer: nextFooterPosition
      };
      this.paths = this.constructor.getPaths(nextPosition);
      var points = this.paths.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        return x + ',' + y;
      }).join(' ');
      this.polygonElement.setAttribute('points', points);
      if (realPercent >= 1) {
        this.animating = false;
        return;
      }
      window.requestAnimationFrame(function () {
        return _this2.animated(nextPosition);
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      if (this.maskType === MaskType.BLOCK) {
        this.paths = [];
        this.polygonElement.style.opacity = '0';
        this.polygonElement.setAttribute('points', '');
      }
      if (this.maskType === MaskType.LINE) {
        this.removeAllRectangle();
      }
    }
  }, {
    key: 'renderRectsLine',
    value: function renderRectsLine(rects, lineHeight) {
      var _this3 = this;

      this.rects = rects;
      var points = rects.map(function (rect) {
        var margin = 0;
        var offset = { x: 0, y: 0 };
        if (_this3.mode === EasyMarkerMode.NODE) {
          lineHeight = lineHeight || rect.height;
          margin = _this3.option.margin || (lineHeight - rect.height) / 4;
          offset = _this3.screenRelativeOffset;
        }
        return rectToPointArray(rect, offset, margin);
      });
      if (!this.animating) {
        this.animating = true;
        window.requestAnimationFrame(function () {
          return _this3.renderRectsLineAnimated(points);
        });
      }
    }
  }, {
    key: 'renderRectsLineAnimated',
    value: function renderRectsLineAnimated(points) {
      var _this4 = this;

      this.removeAllRectangle();
      points.forEach(function (linePoints) {
        _this4.element.appendChild(_this4.createRectangle(linePoints));
      });
      this.animating = false;
    }
  }, {
    key: 'createRectangle',
    value: function createRectangle(pointList) {
      var points = pointList.reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        return acc === '' ? x + ',' + y : acc + ' ' + x + ',' + y;
      }, '');
      var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.style.fill = this.option.color;
      polygon.style.strokeWidth = 0;
      polygon.style.strokeOpacity = this.option.opacity;
      polygon.style.opacity = this.option.opacity;
      polygon.setAttribute('points', points);
      return polygon;
    }
  }, {
    key: 'removeAllRectangle',
    value: function removeAllRectangle() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  }, {
    key: 'screenRelativeOffset',
    get: function get() {
      if (!this.easyMarker) {
        return {
          x: 0,
          y: 0
        };
      }
      return this.easyMarker.screenRelativeOffset;
    }
  }, {
    key: 'top',
    get: function get() {
      if (this.maskType === MaskType.BLOCK) {
        return this.position.header.y;
      }
      if (this.rects[0]) {
        return this.mode === EasyMarkerMode.NODE ? this.rects[0].top - this.screenRelativeOffset.y : this.rects[0].top;
      }
      return 0;
    }
  }, {
    key: 'left',
    get: function get() {
      if (this.maskType === MaskType.BLOCK) {
        return this.position.header.x;
      }
      if (this.rects[0]) {
        return this.mode === EasyMarkerMode.NODE ? this.rects[0].left - this.screenRelativeOffset.x : this.rects[0].left;
      }
      return 0;
    }
  }, {
    key: 'height',
    get: function get() {
      if (this.maskType === MaskType.BLOCK) {
        return this.position.header.height + this.position.body.height + this.position.footer.height;
      }
      var lastRect = this.rects[this.rects.length - 1];
      if (lastRect) {
        return lastRect.top + lastRect.height;
      }
      return 0;
    }
  }], [{
    key: 'getAnimateFrame',
    value: function getAnimateFrame(from, to, percent) {
      var framePosition = new Position();
      framePosition.x = from.x + (to.x - from.x) * percent;
      framePosition.y = from.y + (to.y - from.y) * percent;
      framePosition.height = from.height + (to.height - from.height) * percent;
      framePosition.width = from.width + (to.width - from.width) * percent;
      return framePosition;
    }
  }, {
    key: 'getPaths',
    value: function getPaths(position) {
      var header = position.header,
          body = position.body,
          footer = position.footer;

      var paths = [];
      if (header.isSet) {
        paths.push([header.x, header.y]);
        paths.push([header.x + header.width, header.y]);
        paths.push([header.x + header.width, header.y + header.height]);
      }
      if (body.isSet) {
        paths.push([body.x + body.width, body.y]);
        paths.push([body.x + body.width, body.y + body.height]);
      }
      if (footer.isSet) {
        paths.push([footer.x + footer.width, footer.y]);
        paths.push([footer.x + footer.width, footer.y + footer.height]);
        paths.push([footer.x, footer.y + footer.height]);
        paths.push([footer.x, footer.y]);
      }
      if (body.isSet) {
        paths.push([body.x, body.y + body.height]);
        paths.push([body.x, body.y]);
      }
      if (header.isSet) {
        paths.push([header.x, header.y + header.height]);
      }

      return paths;
    }
  }]);

  return Mask;
}(BaseElement);

/**
 * Highlight
 *
 * @export
 * @class Highlight
 * @extends {BaseElement}
 */

var Highlight = function (_BaseElement) {
  _inherits(Highlight, _BaseElement);

  function Highlight(container, option) {
    _classCallCheck(this, Highlight);

    var _this = _possibleConstructorReturn(this, (Highlight.__proto__ || _Object$getPrototypeOf(Highlight)).call(this));

    var defaultOptions = {
      highlightColor: '#FEFFCA',
      underlineColor: '#af8978',
      underlineWidth: 1,
      tagBackground: '#af8978',
      tagColor: '#fff',
      opacity: 1,
      type: 'highlight',
      strokeDasharray: '2, 2'
      // margin: '0.1rem',
    };
    _this.container = container;
    _this.mode = option.mode || EasyMarkerMode.NODE;
    _this.option = _Object$assign(defaultOptions, option);
    if (option.color) {
      _this.option.highlightColor = option.color;
    }
    _this.type = _this.option.type || NoteType.Highlight;
    _this.option.margin = anyToPx(_this.option.margin);
    _this.lineMap = new _Map();
    // this.onClick = () => { }
    _this.createElement();
    _this.mount();
    _this.id = 0;
    _this.easyMarker = null;
    return _this;
  }

  _createClass(Highlight, [{
    key: 'getID',
    value: function getID() {
      return this.id++;
    }

    /**
     *
     *
     * @param {Selection} selection
     * @param {any} id
     * @param {any} meta
     * @memberof Highlight
     */

  }, {
    key: 'highlight',
    value: function highlight(selection, id) {
      var _this2 = this;

      var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var lineID = id === undefined || id === null ? this.getID() : id;
      var points = void 0;
      var selectionContent = void 0;
      var relativeRects = [];
      var lineHeight = void 0;
      if (this.mode === EasyMarkerMode.NODE) {
        var startTextNode = new TextNode(selection.anchorNode, selection.anchorOffset);
        var endTextNode = new TextNode(selection.focusNode, selection.focusOffset);
        lineHeight = Number(window.getComputedStyle(selection.anchorNode.parentElement).lineHeight.replace('px', ''));
        var rects = void 0;
        var text = void 0;
        try {
          var _TextNode$getSelectNo = TextNode.getSelectNodeRectAndText(startTextNode.node, endTextNode.node, startTextNode.offset, endTextNode.offset);

          rects = _TextNode$getSelectNo.rects;
          text = _TextNode$getSelectNo.text;
        } catch (error) {
          console.error('EasyMarkerError:', error); // eslint-disable-line no-console
          rects = [];
          text = '';
        }

        var offset = this.screenRelativeOffset;

        points = rects.map(function (rect) {
          var relativeRect = {
            top: rect.top - offset.y,
            bottom: rect.bottom - offset.y,
            height: rect.height,
            width: rect.width,
            left: rect.left - offset.x,
            right: rect.right - offset.x
          };
          relativeRects.push(relativeRect);
          lineHeight = lineHeight || rect.height;
          var margin = _this2.option.margin || (lineHeight - rect.height) / 4;
          return rectToPointArray(rect, offset, margin);
        });
        var markdown = void 0;
        if (this.easyMarker && this.easyMarker.markdown) {
          var _easyMarker$markdown$ = this.easyMarker.markdown.getSelectMarkdown(startTextNode.node, endTextNode.node, startTextNode.offset, endTextNode.offset);

          markdown = _easyMarker$markdown$.markdown;
        } else {
          markdown = '';
        }

        selectionContent = _Object$assign({
          toString: function toString() {
            return text;
          },
          toMarkdown: function toMarkdown() {
            return markdown;
          }
        }, selection);
      } else {
        var start = selection.start,
            end = selection.end;

        relativeRects = this.easyMarker && this.easyMarker.region.getRects(start, end);
        var _text = this.easyMarker && this.easyMarker.region.getText(start, end);
        var _markdown = this.easyMarker && this.easyMarker.constructor.getSelectMarkdown();
        points = relativeRects.map(function (rect) {
          var margin = 0;
          return rectToPointArray(rect, { x: 0, y: 0 }, margin);
        });
        selectionContent = _Object$assign({
          toString: function toString() {
            return _text;
          },
          toMarkdown: function toMarkdown() {
            return _markdown;
          }
        }, selection);
      }

      this.lineMap.set(lineID, {
        selection: selectionContent, points: points, relativeRects: relativeRects, meta: meta, lineHeight: lineHeight
      });
      return lineID;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      this.removeAllRectangle();
      this.lineMap.forEach(function (line) {
        var type = line.meta.type || _this3.type;
        line.points.forEach(function (points, index) {
          try {
            if (type === NoteType.UNDERLINE) {
              _this3.element.appendChild(_this3.createLine(points));
            } else if (type === NoteType.DASH) {
              _this3.element.appendChild(_this3.createDash(points));
            } else {
              _this3.element.appendChild(_this3.createRectangle(points));
            }
            if (line.points.length - 1 === index && line.meta && line.meta.tag) {
              var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              text.setAttribute('x', points[2][0] - 5);
              text.setAttribute('y', points[2][1] + 4);
              text.setAttribute('dominant-baseline', 'hanging');
              text.setAttribute('text-anchor', 'end');
              text.setAttribute('font-size', '10');
              text.setAttribute('fill', _this3.option.tagColor);
              text.textContent = line.meta.tag;
              text.classList.add('em-highlight-tag-text');
              _this3.element.appendChild(text);
              // setTimeout(() => {
              // 异步获取位置在某些情况无法正常渲染
              // 同步执行在某些时候无法取到getBox
              // const textRect = text.getBBox()
              var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              // rect.setAttribute('x', textRect.x - 5)
              // rect.setAttribute('y', textRect.y - 1)
              rect.setAttribute('x', points[2][0] - 25 - 5);
              rect.setAttribute('y', points[2][1] - 0);
              rect.setAttribute('rx', 2);
              rect.setAttribute('ry', 2);
              rect.setAttribute('width', 20 + 10);
              rect.setAttribute('height', 14 + 2);
              rect.setAttribute('fill', _this3.option.tagBackground);
              _this3.element.insertBefore(rect, text);
              // }, 10)
            }
          } catch (error) {
            console.error('easyMarker.render', error);
          }
        });
      });
    }

    /**
     *
     *
     * @param {import('../..').HighlightLine[]} lines
     * @memberof Highlight
     */

  }, {
    key: 'highlightLines',
    value: function highlightLines(lines) {
      var _this4 = this;

      this.lineMap.clear();
      var ids = lines.map(function (_ref) {
        var selection = _ref.selection,
            id = _ref.id,
            meta = _ref.meta;
        return _this4.highlight(selection, id, meta);
      });
      this.render();
      return ids;
    }

    /**
     *
     *
     * @param {Selection} selection
     * @param {*} id
     * @param {*} meta
     * @memberof Highlight
     */

  }, {
    key: 'highlightLine',
    value: function highlightLine(selection, id, meta) {
      var lineID = this.highlight(selection, id, meta);
      this.render();
      return lineID;
    }

    /**
     *
     *
     * @param {any} id
     * @returns {boolean}
     * @memberof Highlight
     */

  }, {
    key: 'cancelHighlightLine',
    value: function cancelHighlightLine(id) {
      this.lineMap.delete(id);
      this.render();
    }
  }, {
    key: 'createElement',
    value: function createElement() {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.zIndex = '10';
      svg.style.pointerEvents = 'none';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.overflow = 'visible';
      this.element = svg;
    }
  }, {
    key: 'createLine',
    value: function createLine(pointList) {
      var x1 = pointList[2][0];
      var y1 = pointList[2][1] + 1;
      var x2 = pointList[3][0];
      var y2 = pointList[3][1] + 1;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.style.stroke = this.option.underlineColor;
      line.style.strokeWidth = this.option.underlineWidth;
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      return line;
    }
  }, {
    key: 'createDash',
    value: function createDash(pointList) {
      var x1 = pointList[2][0];
      var y1 = pointList[2][1] + 1;
      var x2 = pointList[3][0];
      var y2 = pointList[3][1] + 1;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.style.stroke = this.option.underlineColor;
      line.style.strokeWidth = this.option.underlineWidth;
      line.style.strokeDasharray = this.option.strokeDasharray;
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      return line;
    }
  }, {
    key: 'createRectangle',
    value: function createRectangle(pointList) {
      var points = pointList.reduce(function (acc, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            x = _ref3[0],
            y = _ref3[1];

        return acc === '' ? x + ',' + y : acc + ' ' + x + ',' + y;
      }, '');
      var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.style.fill = this.option.highlightColor;
      polygon.style.strokeWidth = 0;
      polygon.style.strokeOpacity = this.option.opacity;
      polygon.style.opacity = this.option.opacity;
      polygon.setAttribute('points', points);
      return polygon;
    }
  }, {
    key: 'handleTap',
    value: function handleTap(e) {
      var _getTouchPosition = getTouchPosition(e),
          x = _getTouchPosition.x,
          y = _getTouchPosition.y;

      var _container$getBoundin = this.container.getBoundingClientRect(),
          top = _container$getBoundin.top,
          left = _container$getBoundin.left;

      var clickLines = [];
      this.lineMap.forEach(function (line, id) {
        for (var i = 0; i < line.relativeRects.length; i++) {
          var rect = line.relativeRects[i];
          var margin = line.lineHeight ? (line.lineHeight - rect.height) / 2 : 0;
          if (inRectangle(x - left, y - top, rect, margin)) {
            clickLines.push({ id: id, line: line });
          }
        }
      });

      if (clickLines.length > 0 && this.easyMarker) {
        var highClickPriorityLine = getHighClickPriorityLine(clickLines);

        if (highClickPriorityLine && highClickPriorityLine.line.meta.clickAction) {
          // !REMEMBER: clickAction 与 clickPriority 必须成对使用
          if (highClickPriorityLine.line.meta.clickAction === 'custom') {
            this.easyMarker.highlightLineClick(highClickPriorityLine, clickLines, e);
          } else if (highClickPriorityLine.line.meta.clickAction === 'menuPop') {
            this.easyMarker.showHighlightMenu(highClickPriorityLine.line.selection, { highClickPriorityLine: highClickPriorityLine, clickLines: clickLines });
          }
        } else if (this.easyMarker.highlightLineClick) {
          var clickLine = clickLines[0]; // TODO: 兼容老逻辑，确保没影响可以删除

          this.easyMarker.highlightLineClick(clickLine.id, clickLine.line.meta, clickLine.line.selection, e);
        } else {
          var _clickLine = clickLines[0]; // TODO: 兼容老逻辑，确保没影响可以删除

          this.easyMarker.showHighlightMenu(_clickLine.line.selection, { id: _clickLine.id, meta: _clickLine.line.meta });
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'inRegion',
    value: function inRegion(e) {
      var _getTouchPosition2 = getTouchPosition(e),
          x = _getTouchPosition2.x,
          y = _getTouchPosition2.y;

      var _container$getBoundin2 = this.container.getBoundingClientRect(),
          top = _container$getBoundin2.top,
          left = _container$getBoundin2.left;

      var clickLine = void 0;
      this.lineMap.forEach(function (line, id) {
        for (var i = 0; i < line.relativeRects.length; i++) {
          var rect = line.relativeRects[i];
          var margin = line.lineHeight ? (line.lineHeight - rect.height) / 2 : 0;
          if (inRectangle(x - left, y - top, rect, margin)) {
            clickLine = { id: id, line: line };
            break;
          }
        }
      });
      if (clickLine && this.easyMarker) {
        return true;
      }
      return false;
    }
  }, {
    key: 'removeAllRectangle',
    value: function removeAllRectangle() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  }, {
    key: 'screenRelativeOffset',
    get: function get() {
      if (!this.easyMarker) {
        return {
          x: 0,
          y: 0
        };
      }
      return this.easyMarker.screenRelativeOffset;
    }
  }]);

  return Highlight;
}(BaseElement);

// 19.1.2.5 Object.freeze(O)

var meta = _meta.onFreeze;

_objectSap('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
  };
});

var freeze = _core.Object.freeze;

var freeze$1 = createCommonjsModule(function (module) {
module.exports = { "default": freeze, __esModule: true };
});

var _Object$freeze = unwrapExports(freeze$1);

var defaultOptions$1 = _Object$freeze({
  H1: function H1(text) {
    return '\n# ' + text + '\n\n';
  },
  H2: function H2(text) {
    return '\n## ' + text + '\n\n';
  },
  H3: function H3(text) {
    return '\n### ' + text + '\n\n';
  },
  H4: function H4(text) {
    return '\n#### ' + text + '\n\n';
  },
  H5: function H5(text) {
    return '\n##### ' + text + '\n\n';
  },
  H6: function H6(text) {
    return '\n###### ' + text + '\n\n';
  },
  P: function P(text) {
    return text + '\n\n';
  },
  FIGCAPTION: function FIGCAPTION(text) {
    return text + '\n\n';
  },
  STRONG: function STRONG(text) {
    return '**' + text + '**';
  },
  B: function B(text) {
    return '**' + text + '**';
  },
  EM: function EM(text) {
    return '*' + text + '*';
  },
  I: function I(text) {
    return '*' + text + '*';
  },
  S: function S(text) {
    return '~~' + text + '~~';
  },
  INS: function INS(text) {
    return '++' + text + '++';
  },
  IMG: function IMG(option) {
    return '![' + option.alt + '](' + option.src + '?size=' + option.width + 'x' + option.height + ')\n';
  },
  UL: function UL(text, option) {
    if (option.listLevel > 1) {
      return '\n' + text;
    }
    return '\n' + text + '\n\n';
  },
  OL: function OL(text, option) {
    if (option.listLevel > 1) {
      return '\n' + text;
    }
    return '\n' + text + '\n\n';
  },
  LI: function LI(text, option) {
    var spaceString = '';
    for (var i = 1; i < option.itemLevel; i++) {
      spaceString += '    ';
    }
    var endString = '\n';
    if (option.hasChild || option.isLastOne) {
      endString = '';
    }
    if (option.type === 'UL') {
      return spaceString + '- ' + text + endString;
    }
    return '' + spaceString + option.index + '. ' + text + endString;
  }
});

/**
 * Markdown
 *
 * @export
 * @class Markdown
 */

var Markdown = function () {
  function Markdown(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Markdown);

    this.container = container;
    this.wrapMarkdown = Markdown.wrapMarkdown;
    this.options = _Object$assign({}, defaultOptions$1, options);
  }

  /**
   * Get the selected markdown
   *
   * @param {Node} startNode
   * @param {Node} endNode
   * @param {Number} startIndex
   * @param {number} endIndex
   * @param {Stack} markdownStack
   */


  _createClass(Markdown, [{
    key: 'getSelectMarkdown',
    value: function getSelectMarkdown(startNode, endNode, startIndex, endIndex, markdownStack) {
      var result = {
        markdown: ''
      };
      var popText = '';
      if (markdownStack === undefined) markdownStack = [];
      if (startNode.childNodes.length > 0 && startNode.nodeName !== 'SCRIPT' && startNode.nodeName !== 'STYLE') {
        var childNode = startNode.childNodes[0];

        var _getSelectMarkdown = this.getSelectMarkdown(childNode, endNode, 0, endIndex, markdownStack),
            markdown = _getSelectMarkdown.markdown;

        result.markdown = markdown;
        return result;
      }

      if (startNode.nodeName === '#text') {
        var node = startNode;
        var tempMarkdownStack = [];
        var textEndIndex = startNode === endNode ? endIndex : startNode.textContent.length;
        var currentText = startNode.textContent.substring(startIndex, textEndIndex).replace(/(^\s*)|(\s*$)/g, '');
        if (markdownStack.length !== 0 && node.parentNode === markdownStack[markdownStack.length - 1].node) {
          popText = currentText;
        }
        var isContainer = false;
        while (!isContainer && (markdownStack.length === 0 || node.parentNode !== markdownStack[markdownStack.length - 1].node)) {
          if (node === this.container) isContainer = true;
          var text = '';
          if (node.nodeName === '#text') {
            text = currentText;
          }
          node = node.parentNode;
          tempMarkdownStack.push({
            node: node,
            text: text
          });
        }
        while (tempMarkdownStack.length !== 0) {
          markdownStack.push(tempMarkdownStack.pop());
        }
      }

      if (startNode.nodeName === 'IMG') {
        if (markdownStack.length > 0) {
          markdownStack[markdownStack.length - 1].text += this.wrapMarkdown(startNode, this.options);
        } else {
          result.markdown += this.wrapMarkdown(startNode, this.options);
        }
      }

      if (startNode === endNode) {
        if (markdownStack.length !== 0) {
          var popMarkdown = markdownStack.pop();
          popMarkdown.text += popText;
          result.markdown = this.wrapMarkdown(popMarkdown.node, this.options, popMarkdown.text);
          if (markdownStack.length !== 0) {
            markdownStack[markdownStack.length - 1].text += result.markdown;
          }
        }
        while (markdownStack.length !== 0) {
          var _popMarkdown = markdownStack.pop();
          result.markdown = this.wrapMarkdown(_popMarkdown.node, this.options, _popMarkdown.text);
          if (markdownStack.length !== 0) {
            markdownStack[markdownStack.length - 1].text += result.markdown;
          }
        }
        return result;
      }
      var nextNode = startNode.nextSibling;
      if (nextNode) {
        var _getSelectMarkdown2 = this.getSelectMarkdown(nextNode, endNode, 0, endIndex, markdownStack),
            _markdown = _getSelectMarkdown2.markdown;

        if (markdownStack.length > 0) {
          markdownStack[markdownStack.length - 1].text += _markdown;
        } else {
          result.markdown += _markdown;
        }
      } else {
        var currentNode = startNode.parentNode;
        var _popMarkdown2 = markdownStack.pop();
        _popMarkdown2.text += popText;
        result.markdown += this.wrapMarkdown(_popMarkdown2.node, this.options, _popMarkdown2.text);
        if (markdownStack.length !== 0) {
          markdownStack[markdownStack.length - 1].text += result.markdown;
        }
        while (currentNode && currentNode.nextSibling === null) {
          currentNode = currentNode.parentNode;
          _popMarkdown2 = markdownStack.pop();
          _popMarkdown2.text += popText;
          result.markdown = this.wrapMarkdown(_popMarkdown2.node, this.options, _popMarkdown2.text);
          if (markdownStack.length !== 0) {
            markdownStack[markdownStack.length - 1].text += result.markdown;
          }
        }
        if (currentNode) {
          var _getSelectMarkdown3 = this.getSelectMarkdown(currentNode.nextSibling, endNode, 0, endIndex, markdownStack),
              _markdown2 = _getSelectMarkdown3.markdown;

          if (markdownStack.length !== 0) {
            markdownStack[markdownStack.length - 1].text += _markdown2;
          } else {
            result.markdown = _markdown2;
          }
        } else {
          throw new Error('Invalid end node');
        }
      }
      return result;
    }
  }], [{
    key: 'wrapMarkdown',
    value: function wrapMarkdown(node, options, text) {
      if (node.nodeName === 'IMG') {
        var imgOption = {
          alt: node.alt,
          src: node.src,
          width: node.width,
          height: node.height
        };
        return options[node.nodeName] ? options[node.nodeName](imgOption) : '';
      } else if (node.nodeName === 'LI') {
        var itemLevel = 1;
        var tempNode = node.parentNode;
        while (tempNode.parentNode) {
          tempNode = tempNode.parentNode;
          if (tempNode.nodeName === node.parentNode.nodeName) itemLevel++;
        }
        var hasChild = false;
        if (domCollectionToArray(node.childNodes).some(function (childNode) {
          return childNode.nodeName === 'UL' || childNode.nodeName === 'OL';
        })) {
          hasChild = true;
        }
        var isLastOne = false;
        if (!node.nextElementSibling) {
          isLastOne = true;
        }
        var option = {
          type: node.parentNode.nodeName,
          isLastOne: isLastOne,
          itemLevel: itemLevel,
          hasChild: hasChild,
          index: [].indexOf.call(node.parentNode.children, node) + 1
        };
        return options[node.nodeName] ? options[node.nodeName](text, option) : text;
      } else if (node.nodeName === 'UL' || node.nodeName === 'OL') {
        var listLevel = 1;
        var _tempNode = node.parentNode;
        while (_tempNode.parentNode) {
          _tempNode = _tempNode.parentNode;
          if (_tempNode.nodeName === node.nodeName) listLevel++;
        }
        return options[node.nodeName] ? options[node.nodeName](text, { listLevel: listLevel }) : text;
      }
      return options[node.nodeName] ? options[node.nodeName](text) : text;
    }
  }]);

  return Markdown;
}();

var EventType = {
  TOUCH_START: 'touchstart',
  TOUCH_MOVE: 'touchmove',
  TOUCH_MOVE_THROTTLE: 'touchmovethrottle',
  TOUCH_END: 'touchend',
  TAP: 'tap',
  LONG_TAP: 'longtap'

  /**
   * Touch Event class
   *
   * @export
   * @class TouchEvent
   */
};
var TouchEvent = function () {
  function TouchEvent(element, options) {
    _classCallCheck(this, TouchEvent);

    this.disabled = false;
    this.options = {
      longTapTime: 600,
      tapTime: 500,
      slideDistance: 20,
      throttleTime: 50
      // this.element = getDeviceType() === DeviceType.MOBILE ? element : window
    };this.element = element || window;
    this.options = _Object$assign(this.options, options);
    this.touchStartCallbacks = [];
    this.touchMoveCallbacks = [];
    this.touchMoveThrottleCallbacks = [];
    this.touchEndCallbacks = [];
    this.tapCallbacks = [];
    this.longTapCallbacks = [];
    this.hook = function () {
      return true;
    };

    this.touchStartPosition = { x: 0, y: 0 };
    this.longTapTimerHandler = null;
    this.touchMoveTimerHandler = null;
    this.touchStartTime = Date.now();
    this.lastMoveTime = Date.now();
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.startEventName = getDeviceType() === DeviceType.MOBILE ? 'touchstart' : 'mousedown';
    this.moveEventName = getDeviceType() === DeviceType.MOBILE ? 'touchmove' : 'mousemove';
    this.endEventName = getDeviceType() === DeviceType.MOBILE ? 'touchend' : 'mouseup';
    this.cancelEventName = getDeviceType() === DeviceType.MOBILE ? 'touchcancel' : 'mouseleave';
    this.element.addEventListener(this.startEventName, this.onTouchStart);
    this.element.addEventListener(this.moveEventName, this.onTouchMove, {
      passive: false
    });
    this.element.addEventListener(this.endEventName, this.onTouchEnd);
    this.element.addEventListener(this.cancelEventName, this.onTouchEnd);
  }

  _createClass(TouchEvent, [{
    key: 'disable',
    value: function disable() {
      this.disabled = true;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.disabled = false;
    }
    /**
     * Register event
     *
     * @param {string} eventType
     * @param {Function} callback
     * @memberof TouchEvent
     */

  }, {
    key: 'registerEvent',
    value: function registerEvent(eventType, callback) {
      if (typeof callback !== 'function') return;

      switch (eventType) {
        case EventType.TOUCH_START:
          this.touchStartCallbacks.push(callback);
          break;
        case EventType.TOUCH_MOVE:
          this.touchMoveCallbacks.push(callback);
          break;
        case EventType.TOUCH_MOVE_THROTTLE:
          this.touchMoveThrottleCallbacks.push(callback);
          break;
        case EventType.TOUCH_END:
          this.touchEndCallbacks.push(callback);
          break;
        case EventType.TAP:
          this.tapCallbacks.push(callback);
          break;
        case EventType.LONG_TAP:
          this.longTapCallbacks.push(callback);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'registerHook',
    value: function registerHook(callback) {
      this.hook = callback;
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      var _this = this;

      if (this.disabled) return;
      if (e.touches && e.touches.length > 1) return;
      if (!this.hook('touchstart', e)) return;
      this.touchStartCallbacks.forEach(function (callback) {
        return callback(e);
      });

      this.longTapTimerHandler = setTimeout(function () {
        _this.onLongTap(e);
      }, this.options.longTapTime);

      this.touchStartPosition = getTouchPosition(e);
      this.touchStartTime = Date.now();
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      var _this2 = this;

      if (this.disabled) return;
      if (e.touches && e.touches.length > 1) return;
      if (!this.hook('touchmove', e)) return;

      this.touchMoveCallbacks.forEach(function (callback) {
        return callback(e);
      });

      clearTimeout(this.touchMoveTimerHandler);
      this.touchMoveTimerHandler = setTimeout(function () {
        _this2.onTouchMoveThrottle(e);
      }, this.options.throttleTime);
      if (Date.now() - this.lastMoveTime > this.options.throttleTime) {
        this.lastMoveTime = Date.now();
        this.onTouchMoveThrottle(e);
      }

      var currentPosition = getTouchPosition(e);
      var moveDistance = getDistance(currentPosition, this.touchStartPosition);
      if (moveDistance > this.options.slideDistance) {
        clearTimeout(this.longTapTimerHandler);
        this.longTapTimerHandler = null;
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      if (this.disabled) return;
      if (e.touches && e.touches.length > 1) return;
      if (!this.hook('touchmove', e)) return;

      this.touchEndCallbacks.forEach(function (callback) {
        return callback(e);
      });

      clearTimeout(this.longTapTimerHandler);
      this.longTapTimerHandler = null;
      if (Date.now() - this.touchStartTime < this.options.tapTime) {
        var currentPosition = getTouchPosition(e);
        var moveDistance = getDistance(currentPosition, this.touchStartPosition);
        if (moveDistance < this.options.slideDistance) {
          e.preventDefault();
          var clickEvent = this.constructor.createMouseEvent('click', e);
          this.onTap(e);
          e.target.dispatchEvent(clickEvent);
        }
      }
    }
  }, {
    key: 'onTouchMoveThrottle',
    value: function onTouchMoveThrottle(e) {
      this.touchMoveThrottleCallbacks.forEach(function (callback) {
        return callback(e);
      });
    }
  }, {
    key: 'onTap',
    value: function onTap(e) {
      if (this.disabled) return;
      if (!this.hook('tap', e)) return;

      this.tapCallbacks.forEach(function (callback) {
        return callback(e);
      });
    }
  }, {
    key: 'onLongTap',
    value: function onLongTap(e) {
      if (this.disabled) return;
      this.longTapCallbacks.forEach(function (callback) {
        return callback(e);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.element.removeEventListener(this.startEventName, this.onTouchStart);
      this.element.removeEventListener(this.moveEventName, this.onTouchMove);
      this.element.removeEventListener(this.endEventName, this.onTouchEnd);
      this.element.removeEventListener(this.cancelEventName, this.onTouchEnd);
    }
  }], [{
    key: 'createMouseEvent',
    value: function createMouseEvent(type, e) {
      var touch = getTouch(e);
      var event = new MouseEvent(type);
      event.initMouseEvent(type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
      event.forwardedTouchEvent = true;
      return event;
    }
  }]);

  return TouchEvent;
}();

var defaultOptions$2 = {
  disableSelect: false,
  menuItems: [],
  menuTopOffset: 0,
  isMultiColumnLayout: false,
  cursor: {
    same: false
  },
  scrollOffsetBottom: 100,
  scrollSpeedLevel: 4,
  adjustTextStyleDisabled: false
};

var preventDefaultCb = function preventDefaultCb(e) {
  return e.preventDefault();
};
var copyListener = function copyListener() {};
/**
 * A simple article  marker library
 * @example
 * // A simple example
 * const em = new EasyMarker({
 *   menuTopOffset: '2rem',
 *   menuItems: [
 *     {
 *       text: '划线笔记',
 *       id: 1
 *     },
 *     {
 *       text: '分享',
 *       style: {
 *         backgroundColor: '#407ff2',
 *         paddingLeft: '0.5rem'
 *       },
 *       id: 2
 *     },
 *     {
 *       text: '复制',
 *       id: 3
 *     }
 *   ],
 *  )
 *
 *  em.create(document.querySelector('.article-body'),
 *    document.body,
 *    document.querySelectorAll('.article-body>:not(.text)')
 *
 * // a markdown example
 * const em = new EasyMarker({
 * menuTopOffset:'2rem',
 * scrollSpeedLevel: 6,
 * scrollOffsetBottom: '1.5rem',
 *   menuItems: [
 *     {
 *       text: '划线笔记',
 *       id: 1,
 *       iconName:'iconfont icon-mark'
 *     },
 *     {
 *       text: '分享',
 *       style: {
 *         backgroundColor: '#407ff2',
 *         paddingLeft: '0.5rem'
 *       },
 *       id: 2,
 *       iconName:'iconfont icon-share'
 *     },
 *     {
 *       text: '复制',
 *       id: 3,
 *       iconName:'iconfont icon-copy'
 *     }
 *   ],
 * // Not required
 *  markdownOptions: {
 *   H1: text => `\n# ${text}\n\n`,
 *   H2: text => `\n## ${text}\n\n`,
 *   H3: text => `\n### ${text}\n\n`,
 *   H4: text => `\n#### ${text}\n\n`,
 *   H5: text => `\n##### ${text}\n\n`,
 *   H6: text => `\n###### ${text}\n\n`,
 *   P: text => `${text}\n\n`,
 *   FIGCAPTION: text => `${text}\n\n`,
 *   STRONG: text => `**${text}**`,
 *   B: text => `**${text}**`,
 *   EM: text => `*${text}*`,
 *   I: text => `*${text}*`,
 *   S: text => `~~${text}~~`,
 *   INS: text => `++${text}++`,
 *   // IMG
 *   // option.alt: IMG alt
 *   // option.src: IMG src
 *   // option.width: IMG width
 *   // option.height: IMG height
 *   IMG: option => `![${option.alt}](${option.src}?size=${option.width}x${option.height})\n`,
 *   // UL
 *   // option.listLevel: List nesting level
 *   UL: (text, option) => {
 *     if (option.listLevel > 1) {
 *       return `\n${text}`
 *     }
 *     return `\n${text}\n`
 *   },
 *   // OL
 *   // option.listLevel: List nesting level
 *   OL: (text, option) => {
 *     if (option.listLevel > 1) {
 *       return `\n${text}`
 *     }
 *     return `\n${text}\n`
 *   },
 *   // LI
 *   // option.type: parentNode nodeName,
 *   // option.isLastOne: Whether the last item in the list
 *   // option.itemLevel: List nesting level
 *   // option.hasChild: Is the node has child node
 *   // option.index: The index in the list
 *   LI: (text, option) => {
 *     let spaceString = ''
 *     for (let i = 1; i < option.itemLevel; i++) { spaceString += '    ' }
 *     let endString = '\n'
 *     if (option.hasChild || option.isLastOne) {
 *       endString = ''
 *     }
 *     if (option.type === 'UL') { return `${spaceString}- ${text}${endString}` }
 *     return `${spaceString}${option.index}. ${text}${endString}`
 *   },
 *  }
 * })
 *
 * em.create(document.querySelector('.article-body'), document.body)
 * em.onMenuClick((id, data) => {
 *   console.log('You click the menu!');
 *   console.log(id, data);
 * });
 *
 * // A Region example
 *
 * const em = new EasyMarker({
 *  regions: texts,
 *  menuTopOffset: '120px',
 *  scrollSpeedLevel: 6,
 *  scrollOffsetBottom: '1.5rem',
 *  mask: {
 *    color: '#407ff2',
 *  },
 *  menuStyle: {
 *    menu: {},
 *    item: {
 *      fontSize: '15px',
 *      padding: '0px 10px',
 *      lineHeight: '30px',
 *    },
 *    triangle: {},
 *  },
 *  menuItems: [
 *    {
 *      text: '划线',
 *      type: 'select',
 *      iconName: 'iconfont mark',
 *      id: '302',
 *      style: {
 *        backgroundColor: 'yellow',
 *        paddingLeft: '1rem',
 *      },
 *      iconStyle: {
 *        background: 'green',
 *      },
 *    },
 *    {
 *      text: '删除划线',
 *      type: 'highlight',
 *      iconName: 'iconfont icon-delete',
 *      id: '302',
 *    },
 *    {
 *      id: 222,
 *      text: '复制',
 *      iconName: 'iconfont icon-copy',
 *    },
 *   ],
 * });
 *
 * em.onMenuClick(function (id, data) {
 *   console.log('You click the menu!', id, data);
 * });
 *
 * em.onSelectStatusChange((val) => {
 *   console.log('onSelectStatusChange', val);
 * });
 *
 * em.create(document.body);
 *
 * @export
 */

var EasyMarker = function () {
  /**
   * Creates an instance of EasyMarker.
   * @param {Object} options options
   * @param {Object[]} options.menuItems menu item option
   * @param {string} options.menuItems[].text menu text
   * @param {string} options.menuItems[].type menu type 'select'(Show menu only when selected) 'highlight' (Show menu only when click highlight)
   * @param {string[]} options.menuItems[].iconName menu icon class
   * @param {Object} options.menuItems[].style menu item style
   * @param {Object} options.menuItems[].iconStyle menu item icon style
   * @param {number|string} options.menuTopOffset the offset from the top of the menu relative screen, default 0.
   * @param {Object} options.menuStyle the menu style
   * @param {Object} options.menuStyle.menu the menu style
   * @param {Object} options.menuStyle.triangle the triangle style
   * @param {Object} options.menuStyle.item the sub menu style
   * @param {Object} options.menuStyle.icon the sub menu icon style
   * @param {boolean} options.disableTapHighlight disable highlight when tap
   * @param {Object} options.cursor cursor config
   * @param {string} options.cursor.color cursor color
   * @param {boolean} options.cursor.same whether the cursor is in the same direction
   * @param {Object} options.mask mask config
   * @param {string} options.mask.color mask color
   * @param {Object} options.highlight highlight config
   * @param {string} options.highlight.color highlight color
   * @param {number} options.scrollSpeedLevel The speed of scrolling when touching bottom, default 4
   * @param {number|string} options.scrollOffsetBottom triggering scrolling, distance from the bottom, default 100
   * @param {Object} options.markdownOptions Customize options about the mapping relations between HTML and Markdown
   * @param {Object[]} options.regions In region mode, all region info
   * @param {string} options.regions[].text region text
   * @param {number} options.regions[].top region top
   * @param {number} options.regions[].left region left
   * @param {number} options.regions[].width region width
   * @param {number} options.regions[].height region height
   * @param {boolean} options.disableSelect disabled select
   */
  function EasyMarker(options) {
    _classCallCheck(this, EasyMarker);

    this.options = _Object$assign({}, defaultOptions$2, options);
    this.$selectStatus = SelectStatus.NONE;
    this.windowHeight = null;
    this.container = null;
    this.scrollContainer = null;
    this.excludeElements = [];
    this.includeElements = [];
    this.highlight = null;
    this.movingCursor = null;
    this.touchEvent = null;
    this.scrollInterval = null;
    this.cursor = {
      start: null,
      end: null
    };

    this.mask = null;
    this.menu = null;
    this.scrollOffsetBottom = null;
    this.scrollSpeedLevel = null;
    this.containerScroll = null;
    this.deviceType = getDeviceType();
    this.selectStatusChangeHandler = function () {};
    this.menuOnClick = function () {};
    this.highlightLineClick = null;
  }

  _createClass(EasyMarker, [{
    key: 'create',


    /**
     * Initialization
     *
     * @param {HTMLElement} containerElement container element
     * @param {HTMLElement} [scrollContainerElement] scroll container element
     * @param {Object} options options
     * @param {Object} options.includeElements included elements
     * @param {Object} options.excludeElements not included elements, Higher priority
     * @memberof EasyMarker
     */
    value: function create(containerElement, scrollContainerElement) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      this.container = containerElement;
      this.adjustTextStyle();
      // eslint-disable-next-line arrow-parens
      this.container.oncontextmenu = function (event) {
        event.returnValue = false;
      };

      this.windowHeight = document.documentElement.clientHeight;
      if (options.constructor === Object) {
        this.excludeElements = options.excludeElements ? [].concat(_toConsumableArray(options.excludeElements)) : [];
        this.includeElements = options.includeElements ? [].concat(_toConsumableArray(options.includeElements)) : [containerElement];
      } else {
        // deprecated
        // Compatible with older versions,options equivalent to excludeElements
        this.excludeElements = [].concat(_toConsumableArray(options));
        this.includeElements = [containerElement];
      }
      this.scrollContainer = scrollContainerElement || document.body;
      this.container.addEventListener('contextmenu', preventDefaultCb);
      copyListener = function copyListener(e) {
        return _this.copyListener(e);
      };
      document.addEventListener('copy', copyListener);
      if (this.scrollContainer === document.body) {
        this.scrollContainer.onscroll = this.handleScroll.bind(this);
      } else {
        this.containerScroll = function () {
          _this.handleScroll();
        };
        this.scrollContainer.addEventListener('scroll', this.containerScroll);
      }
      // this.position.setAll(getElementAbsolutePosition(this.container))

      this.container.style.userSelect = 'none';
      this.container.style.webkitUserSelect = 'none';
      this.container.style.position = 'relative';

      this.touchEvent = new TouchEvent(this.container);
      if (!this.options.disableSelect) {
        this.touchEvent.registerEvent(EventType.TOUCH_START, this.handleTouchStart.bind(this));
        this.touchEvent.registerEvent(EventType.TOUCH_MOVE, this.handleTouchMove.bind(this));
        this.touchEvent.registerEvent(EventType.TOUCH_MOVE_THROTTLE, this.handleTouchMoveThrottle.bind(this));
        this.touchEvent.registerEvent(EventType.TOUCH_END, this.handleTouchEnd.bind(this));
        this.touchEvent.registerEvent(EventType.LONG_TAP, this.handleLongTap.bind(this));
      }

      this.touchEvent.registerEvent(EventType.TAP, this.handleTap.bind(this));

      var CursorElement = this.options.cursor && this.options.cursor.Cursor ? this.options.cursor.Cursor : Cursor;

      if (this.options.cursor.same) {
        this.cursor.start = new CursorElement(this.container, CursorType.END, _Object$assign({ mode: this.mode }, this.options.cursor || {}));
      } else {
        this.cursor.start = new CursorElement(this.container, CursorType.START, _Object$assign({ mode: this.mode }, this.options.cursor || {}));
      }
      this.cursor.end = new CursorElement(this.container, CursorType.END, this.options.cursor || {});
      this.movingCursor = this.cursor.end;

      this.mask = new Mask(this.container, _Object$assign({ mode: this.mode }, this.options.mask || {}));
      this.highlight = new Highlight(this.container, _Object$assign({ mode: this.mode }, this.options.highlight || {}));
      this.menu = new Menu(this.container, {
        menuItems: this.options.menuItems,
        topOffset: this.options.menuTopOffset,
        style: this.options.menuStyle,
        isMultiColumnLayout: this.options.isMultiColumnLayout,
        mode: this.mode
      });
      this.menu.easyMarker = this;
      this.highlight.easyMarker = this;
      this.mask.easyMarker = this;
      this.markdown = new Markdown(this.container, this.options.markdownOptions);
      this.scrollOffsetBottom = anyToPx(this.options.scrollOffsetBottom);
      this.scrollSpeedLevel = this.options.scrollSpeedLevel;
    }

    /**
     * Disable touch event
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.touchEvent.disable();
    }

    /**
     * Enable touch event
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.touchEvent.enable();
    }
    /**
     * Highlight the lines between the specified nodes
     * @example
     * const id = 2;
     * const selection = {
     *   anchorNode: textNodeA,
     *   anchorOffset: 1,
     *   focusNode: textNodeB,
     *   focusOffset: 2
     * };
     * const meta = { someKey: 'someValue' };
     * em.highlightLine(selection, id, meta);
     * @param {Object} selection selection
     * @param {Node} selection.anchorNode start node
     * @param {number} selection.anchorOffset start node's text offset
     * @param {Node} selection.focusNode end node
     * @param {number} selection.focusOffset start node's text offset
     * @param {*} [id] line id
     * @param {*} [meta] meta information
     * @memberof EasyMarker
     */

  }, {
    key: 'highlightLine',
    value: function highlightLine(selection, id, meta) {
      this.highlight.highlightLine(selection, id, meta);
    }

    /**
     * Highlight multiple lines
     * @example
     * const id = 2;
     * const selection = {
     *   anchorNode: textNodeA,
     *   anchorOffset: 1,
     *   focusNode: textNodeB,
     *   focusOffset: 2
     * };
     * const meta = { someKey: 'someValue' };
     * em.highlightLines([{selection, id, meta}]);
     * @param {import('../').HighlightLine[]} lines
     * @memberof EasyMarker
     */

  }, {
    key: 'highlightLines',
    value: function highlightLines(lines) {
      this.highlight.highlightLines(lines);
    }

    /**
     * Cancel highlight
     *
     * @param {*} id line ID
     * @returns {boolean}
     * @memberof EasyMarker
     */

  }, {
    key: 'cancelHighlightLine',
    value: function cancelHighlightLine(id) {
      this.highlight.cancelHighlightLine(id);
    }

    /**
     * Highlight line click handler
     *
     * @param {EasyMarker~highlightLineClickHandler} cb
     * @memberof EasyMarker
     */

  }, {
    key: 'onHighlightLineClick',
    value: function onHighlightLineClick(cb) {
      this.highlightLineClick = cb;
    }

    /**
     * Select status changing callback
     *
     * @param {Function} cb
     * @memberof EasyMarker
     */

  }, {
    key: 'onSelectStatusChange',
    value: function onSelectStatusChange(cb) {
      this.selectStatusChangeHandler = cb;
    }

    /**
     * menu item click handler
     *
     * @param {EasyMarker~menuClickHandler} cb
     * @memberof EasyMarker
     */

  }, {
    key: 'onMenuClick',
    value: function onMenuClick(cb) {
      // this.menu.handler = cb
      this.menuOnClick = cb;
    }

    /**
     * Register event hook
     *
     * @param {*} cb
     * @memberof EasyMarker
     */

  }, {
    key: 'registerEventHook',
    value: function registerEventHook(cb) {
      this.touchEvent.registerHook(cb);
    }
    /**
     * Destroy instance
     *
     * @memberof EasyMarker
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.container.oncontextmenu = null;
      this.container.removeEventListener('contextmenu', preventDefaultCb);
      document.removeEventListener('copy', copyListener);
      if (this.containerScroll !== null) {
        this.scrollContainer.removeEventListener('scroll', this.containerScroll);
        this.containerScroll = null;
      }
      this.scrollContainer.onscroll = null;

      this.touchEvent.destroy();
      this.cursor.start.destroy();
      this.cursor.end.destroy();
      this.mask.destroy();
      this.highlight.destroy();
      this.menu.destroy();

      this.$selectStatus = SelectStatus.NONE;
      this.container = null;
      this.scrollContainer = null;
      this.excludeElements = [];
      this.highlight = null;
      this.movingCursor = null;
      this.touchEvent = null;
      this.cursor = {
        start: null,
        end: null
      };
      this.mask = null;
      this.menu = null;

      this.windowHeight = null;
      this.includeElements = [];
      this.scrollInterval = null;
      this.scrollOffsetBottom = null;
      this.scrollSpeedLevel = null;
      this.selectStatusChangeHandler = function () {};
      this.menuOnClick = function () {};
      this.highlightLineClick = null;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.selectStatus = SelectStatus.NONE;
      this.cursor.start.hide();
      this.cursor.end.hide();
      this.mask.reset();
      this.menu.hide();
    }

    // endregion

    // region private fields

    /**
     * Screen relative offset
     *
     * @readonly
     * @private
     * @memberof EasyMarker
     */

  }, {
    key: 'adjustTextStyle',

    /**
     *
     * @private
     * @memberof EasyMarker
     */
    value: function adjustTextStyle() {
      if (this.options.adjustTextStyleDisabled) return;
      var children = this.container.children;

      for (var i = 0; i < children.length; i++) {
        children[i].style.zIndex = '40';
        children[i].style.position = 'relative';
      }
    }

    /**
     *
     * @private
     * @param {HTMLElement} element
     * @memberof EasyMarker
     */

  }, {
    key: 'isContains',
    value: function isContains(element) {
      // exclude > include
      return this.includeElements.findIndex(function (el) {
        return el.contains(element);
      }) !== -1 && this.excludeElements.findIndex(function (el) {
        return el.contains(element);
      }) === -1;
    }

    /**
     * Long press event
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'handleLongTap',
    value: function handleLongTap() {}

    /**
     * Tap event
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'handleTap',
    value: function handleTap() {}

    /**
     * copy listener
     *
     * @private
     * @memberof EasyMarker
     */
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'copyListener',
    value: function copyListener() {}

    /**
     * touchstart event handler
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      if (this.selectStatus === SelectStatus.FINISH && this.menu.isShow && this.menu.type !== MenuType.HIGHLIGHT) {
        var position = this.getTouchRelativePosition(e);
        var startCursorRegion = this.cursor.start.inRegion(position);
        var endCursorRegion = this.cursor.end.inRegion(position);
        if (startCursorRegion.inRegion && endCursorRegion.inRegion) {
          this.selectStatus = SelectStatus.SELECTING;
          this.movingCursor = startCursorRegion.distance < endCursorRegion.distance ? this.cursor.start : this.cursor.end;
        } else if (endCursorRegion.inRegion) {
          this.selectStatus = SelectStatus.SELECTING;
          this.movingCursor = this.cursor.end;
        } else if (startCursorRegion.inRegion) {
          this.selectStatus = SelectStatus.SELECTING;
          this.movingCursor = this.cursor.start;
        }
      }
      // if (!this.highlight.inRegion(e)) {
      //   e.preventDefault()
      // }
    }

    /**
     * touchmove event handler
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      if (this.selectStatus === SelectStatus.SELECTING) {
        e.preventDefault();
      }
    }

    /**
     * Throttle event of touchmove
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTouchMoveThrottle',
    value: function handleTouchMoveThrottle(e) {
      var _this2 = this;

      // 拖着cursor走的逻辑
      if (this.selectStatus === SelectStatus.SELECTING) {
        var cursorOffset = this.deviceType === DeviceType.MOBILE ? this.movingCursor.height / 2 : 0;
        var offset = this.movingCursor.offset || {
          x: 0,
          y: -cursorOffset
        };
        var touch = getTouch(e);
        var targetY = e.clientY || touch.clientY;
        if (targetY >= this.windowHeight - this.scrollOffsetBottom) {
          if (this.scrollInterval !== null) clearInterval(this.scrollInterval);
          var rate = (targetY - this.windowHeight + this.scrollOffsetBottom) * this.scrollSpeedLevel / this.scrollOffsetBottom;
          this.scrollInterval = setInterval(function () {
            _this2.scrollContainer.scrollTop += rate;
            document.documentElement.scrollTop += rate;
          }, 1);
        } else {
          clearInterval(this.scrollInterval);
        }

        var _getTouchPosition = getTouchPosition(e, offset),
            x = _getTouchPosition.x,
            y = _getTouchPosition.y;

        var target = document.elementFromPoint(x, y);
        if (this.isContains(target)) {
          this.moveCursor(target, x, y);
        }
      }
    }

    /**
     * touchmove event handler
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      if (this.selectStatus === SelectStatus.SELECTING) {
        if (this.scrollInterval) {
          clearInterval(this.scrollInterval);
          this.scrollInterval = null;
        }
      }
    }

    /**
     * handleScroll
     *
     * @private
     * @memberof EasyMarker
     */

  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (this.selectStatus === SelectStatus.FINISH) {
        this.menu.handleScroll();
      }
    }
  }, {
    key: 'showHighlightMenu',
    value: function showHighlightMenu(selection, options) {
      this.setSelection(selection);
      this.selectStatus = SelectStatus.FINISH;
      this.menu.setPosition(this.start, this.end);
      this.menu.type = MenuType.HIGHLIGHT;
      this.menu.options = options;
      this.menu.show({
        start: this.start,
        end: this.end,
        content: this.getSelectText(),
        markdown: this.getSelectMarkdown()
      });
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'setSelection',
    value: function setSelection() {}
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'getSelectText',
    value: function getSelectText() {}
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'getSelectMarkdown',
    value: function getSelectMarkdown() {}
  }, {
    key: 'getTouchRelativePosition',
    value: function getTouchRelativePosition(e) {
      var cursorOffset = this.deviceType === DeviceType.MOBILE ? this.movingCursor.height / 2 : 0;
      var offset = {
        x: 0,
        y: -cursorOffset
      };
      var position = getTouchPosition(e, offset);
      position.x -= this.screenRelativeOffset.x;
      position.y -= this.screenRelativeOffset.y;
      return position;
    }

    // copy(e) {
    //   if (this.selectStatus === SelectStatus.FINISH) {
    //     const text = this.getSelectText() || ''
    //     e.clipboardData.setData('text/plain', text)
    //     this.reset()
    //     e.preventDefault()
    //   }
    // }

    // endregion

  }, {
    key: 'selectStatus',
    get: function get() {
      return this.$selectStatus;
    },
    set: function set(val) {
      if (val !== this.$selectStatus) {
        this.selectStatusChangeHandler(val);
      }
      this.$selectStatus = val;
      if (val === SelectStatus.FINISH) {
        this.menu.setPosition(this.start, this.end);
        this.menu.type = MenuType.SELECT;
        this.menu.show({
          start: this.start,
          end: this.end,
          content: this.getSelectText(),
          markdown: this.getSelectMarkdown()
        });
      } else {
        this.menu.hide();
      }
    }

    /**
     * Initialization factory
     *
     * @static
     * @param {HTMLElement} containerElement container element
     * @param {HTMLElement} [scrollContainerElement] scroll container element
     * @param {Object} options options
     * @param {Object} options.includeElements included elements
     * @param {Object} options.excludeElements not included elements, Higher priority
     * @returns {EasyMarker}
     * @memberof EasyMarker
     */

  }, {
    key: 'screenRelativeOffset',
    get: function get() {
      var _container$getBoundin = this.container.getBoundingClientRect(),
          top = _container$getBoundin.top,
          left = _container$getBoundin.left;

      return {
        x: left,
        y: top
      };
    }
  }], [{
    key: 'create',
    value: function create(containerElement, scrollContainerElement) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var easyMarker = new this();
      easyMarker.create(containerElement, scrollContainerElement, options);
      return easyMarker;
    }
  }]);

  return EasyMarker;
}();

/**
 * Menu item click handler
 * @callback EasyMarker~menuClickHandler
 * @param {*} id menu ID
 * @param {Object} selection selection
 * @param {Node} selection.anchorNode start node
 * @param {number} selection.anchorOffset start node's text offset
 * @param {Node} selection.focusNode end node
 * @param {number} selection.focusOffset start node's text offset
 */

/**
 * Menu item click handler
 * @callback EasyMarker~highlightLineClickHandler
 * @param {*} id line ID
 * @param {*} meta meta information
 * @param {Object} selection selection
 * @param {Node} selection.anchorNode start node
 * @param {number} selection.anchorOffset start node's text offset
 * @param {Node} selection.focusNode end node
 * @param {number} selection.focusOffset start node's text offset
 */

var NodeEasyMarker = function (_BaseEasyMarker) {
  _inherits(NodeEasyMarker, _BaseEasyMarker);

  function NodeEasyMarker(options) {
    _classCallCheck(this, NodeEasyMarker);

    var _this = _possibleConstructorReturn(this, (NodeEasyMarker.__proto__ || _Object$getPrototypeOf(NodeEasyMarker)).call(this, options));

    _this.textNode = {
      start: null,
      end: null
    };
    _this.markdown = null;
    _this.mode = EasyMarkerMode.NODE;
    _this.touchStartTime = 0;
    return _this;
  }

  _createClass(NodeEasyMarker, [{
    key: 'getSelectText',


    /**
     * Get the selected text
     *
     * @memberof EasyMarker
     * @returns {string}
     */
    value: function getSelectText() {
      var text = TextNode.getSelectText(this.textNode.start, this.textNode.end) || '';
      return matchSubString(this.container.innerText, text) || text;
    }
  }, {
    key: 'getSelectMarkdown',
    value: function getSelectMarkdown() {
      return this.markdown.getSelectMarkdown(this.textNode.start.node, this.textNode.end.node, this.textNode.start.offset, this.textNode.end.offset).markdown || '';
    }

    /**
     * Swap the start and end cursors
     *
     * @private
     * @param {any} clickPosition
     * @param {any} currentPosition
     * @memberof EasyMarker
     */

  }, {
    key: 'swapCursor',
    value: function swapCursor(clickPosition, currentPosition) {
      var x = currentPosition.x,
          y = currentPosition.y;

      if (this.movingCursor === this.cursor.start) {
        var endPosition = this.cursor.end.position;
        if (y > endPosition.y || y === endPosition.y && x >= endPosition.x) {
          this.cursor.start.position = this.cursor.end.position;
          this.movingCursor = this.cursor.end;
          this.textNode.start = new TextNode(this.textNode.end.node, this.textNode.end.offset);
          this.textNode.end = new TextNode(clickPosition.node, clickPosition.index);
        } else {
          this.textNode.start = new TextNode(clickPosition.node, clickPosition.index);
        }
      } else {
        var startPosition = this.cursor.start.position;
        if (y < startPosition.y || y === startPosition.y && x <= startPosition.x) {
          this.cursor.end.position = this.cursor.start.position;
          this.movingCursor = this.cursor.start;
          this.textNode.end = new TextNode(this.textNode.start.node, this.textNode.start.offset);
          this.textNode.start = new TextNode(clickPosition.node, clickPosition.index);
        } else {
          this.textNode.end = new TextNode(clickPosition.node, clickPosition.index);
        }
      }
    }

    /**
     * Start text selection
     *
     * @private
     * @param {any} element
     * @param {any} x
     * @param {any} y
     * @memberof EasyMarker
     */

  }, {
    key: 'selectWords',
    value: function selectWords(element, x, y) {
      var separators = ['\u3002\u201D', '\uFF1F\u201D', '\uFF01\u201D', '\u3002', '\uFF1F', '\uFF01'];

      var _ref = getClickWordsPosition(element, x, y, separators) || {},
          rects = _ref.rects,
          node = _ref.node,
          index = _ref.index,
          wordsLength = _ref.wordsLength;

      if (!rects || rects && rects.length === 0) return;
      var startRect = rects[0];
      var endRect = rects[rects.length - 1];
      // start
      var startLeft = startRect.left - this.screenRelativeOffset.x;
      var startTop = startRect.top - this.screenRelativeOffset.y;
      this.textNode.start = new TextNode(node, index);
      this.cursor.start.height = startRect.height;
      this.cursor.start.position = { x: startLeft, y: startTop

        // end
      };var endLeft = endRect.left - this.screenRelativeOffset.x;
      var endTop = endRect.top - this.screenRelativeOffset.y;
      this.textNode.end = new TextNode(node, index + wordsLength);
      this.cursor.end.height = endRect.height;
      this.cursor.end.position = { x: endLeft + endRect.width, y: endTop };

      this.cursor.start.show();
      this.cursor.end.show();

      this.renderMask();
      this.selectStatus = SelectStatus.FINISH;
    }

    /**
     * Renders the selected mask layer
     * @private
     * @memberof EasyMarker
     */

  }, {
    key: 'renderMask',
    value: function renderMask() {
      this.mask.render(this.textNode.start, this.textNode.end);
    }

    /**
     * Move the cursor to the specified location
     *
     * @private
     * @param {HTMLElement} element
     * @param {number} x Relative to the screen positioning x
     * @param {number} y Relative to the screen positioning Y
     * @memberof EasyMarker
     */

  }, {
    key: 'moveCursor',
    value: function moveCursor(element, x, y) {
      var clickPosition = getClickPosition(element, x, y, this.movingCursor === this.cursor.start);
      if (clickPosition === null) return;
      var relativeX = clickPosition.x - this.screenRelativeOffset.x;
      var relativeY = clickPosition.y - this.screenRelativeOffset.y;
      var unmovingCursor = this.movingCursor === this.cursor.start ? this.cursor.end : this.cursor.start;
      if (unmovingCursor.position.x === relativeX && unmovingCursor.position.y === relativeY) {
        return;
      }
      this.swapCursor(clickPosition, { x: relativeX, y: relativeY });

      this.movingCursor.height = clickPosition.height;
      this.movingCursor.position = { x: relativeX, y: relativeY };

      this.cursor.start.show();
      this.cursor.end.show();
      this.renderMask();
    }

    /**
     * touchstart event handler
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      _get(NodeEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(NodeEasyMarker.prototype), 'handleTouchStart', this).call(this, e);
      if (this.deviceType === DeviceType.PC) {
        if (this.selectStatus === SelectStatus.FINISH) {
          var isMenuClick = this.menu.inRegion(e);
          var position = this.getTouchRelativePosition(e);
          var startCursorRegion = this.cursor.start.inRegion(position);
          var endCursorRegion = this.cursor.end.inRegion(position);
          if (!isMenuClick && !startCursorRegion.inRegion && !endCursorRegion.inRegion) {
            this.reset();
          }
        }
        if (this.selectStatus === SelectStatus.NONE && this.isContains(e.target)) {
          this.touchStartTime = Date.now();

          var _getTouchPosition = getTouchPosition(e),
              x = _getTouchPosition.x,
              y = _getTouchPosition.y;

          var element = document.elementFromPoint(x, y);
          var clickPosition = getClickPosition(element, x, y, this.movingCursor !== this.cursor.start);
          if (clickPosition) {
            this.textNode.start = new TextNode(clickPosition.node, clickPosition.index);
            if (this.textNode.start) {
              var startLeft = clickPosition.x - this.screenRelativeOffset.x;
              var startTop = clickPosition.y - this.screenRelativeOffset.y;

              this.cursor.start.height = clickPosition.height;
              this.cursor.start.position = { x: startLeft, y: startTop };
            }
          }
        }
      }
    }
  }, {
    key: 'handleTouchMoveThrottle',
    value: function handleTouchMoveThrottle(e) {
      if (this.deviceType === DeviceType.PC) {
        if (this.selectStatus === SelectStatus.NONE && this.textNode.start && !this.textNode.end) {
          if (Date.now() - this.touchStartTime < 100) return;

          var _getTouchPosition2 = getTouchPosition(e),
              x = _getTouchPosition2.x,
              y = _getTouchPosition2.y;

          var element = document.elementFromPoint(x, y);
          var clickPosition = getClickPosition(element, x, y, this.movingCursor === this.cursor.start);
          if (clickPosition) {
            this.textNode.end = new TextNode(clickPosition.node, clickPosition.index);

            if (this.textNode.end) {
              var endLeft = clickPosition.x - this.screenRelativeOffset.x;
              var endTop = clickPosition.y - this.screenRelativeOffset.y;

              this.cursor.end.height = clickPosition.height;
              this.cursor.end.position = { x: endLeft, y: endTop };
              this.selectStatus = SelectStatus.SELECTING;
            }
          }
        }
      }
      _get(NodeEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(NodeEasyMarker.prototype), 'handleTouchMoveThrottle', this).call(this, e);
    }

    /**
     * copy listener
     *
     * @private
     * @memberof EasyMarker
     */

  }, {
    key: 'copyListener',
    value: function copyListener(e) {
      if (this.selectStatus === SelectStatus.FINISH) {
        this.menu.copyListener({
          start: this.textNode.start,
          end: this.textNode.end,
          content: this.getSelectText(),
          markdown: this.getSelectMarkdown()
        }, e);
        this.reset();
      }
    }

    /**
     * Tap event
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTap',
    value: function handleTap(e) {
      if (this.selectStatus === SelectStatus.FINISH) {
        this.menu.handleTap(e, {
          start: this.textNode.start,
          end: this.textNode.end,
          content: this.getSelectText(),
          markdown: this.getSelectMarkdown()
        });
        var position = this.getTouchRelativePosition(e);
        var startCursorRegion = this.cursor.start.inRegion(position);
        var endCursorRegion = this.cursor.end.inRegion(position);
        if (startCursorRegion.inRegion || endCursorRegion.inRegion) return;
        this.reset();
      } else if (this.selectStatus === SelectStatus.NONE) {
        var inHighlightLine = this.highlight.handleTap(e);
        if (!inHighlightLine && !this.options.disableTapHighlight && !this.options.disableSelect && this.isContains(e.target) && this.deviceType === DeviceType.MOBILE) {
          var _getTouchPosition3 = getTouchPosition(e),
              x = _getTouchPosition3.x,
              y = _getTouchPosition3.y;

          this.selectWords(e.target, x, y);
        }
      }
    }

    /**
     * Long press event
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleLongTap',
    value: function handleLongTap(e) {
      if (this.deviceType === DeviceType.MOBILE) {
        if (this.isContains(e.target)) {
          var _getTouchPosition4 = getTouchPosition(e),
              x = _getTouchPosition4.x,
              y = _getTouchPosition4.y;

          this.selectWords(e.target, x, y);
        }
      }
    }

    /**
     * touchmove event handler
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      _get(NodeEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(NodeEasyMarker.prototype), 'handleTouchEnd', this).call(this, e);
      if (this.selectStatus === SelectStatus.SELECTING) {
        this.selectStatus = SelectStatus.FINISH;
      }
      if (this.deviceType === DeviceType.PC) {
        if (this.selectStatus === SelectStatus.NONE) {
          this.reset();
        }
      }
    }
  }, {
    key: 'setSelection',
    value: function setSelection(selection) {
      this.textNode.start = new TextNode(selection.anchorNode, selection.anchorOffset);
      this.textNode.end = new TextNode(selection.focusNode, selection.focusOffset);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(NodeEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(NodeEasyMarker.prototype), 'destroy', this).call(this);
      this.textNode = {
        start: null,
        end: null
      };
      this.markdown = null;
      this.mode = EasyMarkerMode.NODE;
    }
  }, {
    key: 'reset',
    value: function reset() {
      _get(NodeEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(NodeEasyMarker.prototype), 'reset', this).call(this);
      this.textNode = {
        start: null,
        end: null
      };
    }
  }, {
    key: 'start',
    get: function get$$1() {
      return this.textNode.start;
    }
  }, {
    key: 'end',
    get: function get$$1() {
      return this.textNode.end;
    }
  }]);

  return NodeEasyMarker;
}(EasyMarker);

var Region = function () {
  function Region(list) {
    _classCallCheck(this, Region);

    this.originalRegionList = list;
    this.regions = [];
    // {
    //   text: '', required
    //   width: '', required
    //   height: '', required
    //   left: '', required
    //   top: '', required
    //   page: '', required
    // }

    this.initRectRegion();
  }

  _createClass(Region, [{
    key: 'initRectRegion',
    value: function initRectRegion() {
      this.regions = Region.getLineRectRegionList(this.originalRegionList);
    }
  }, {
    key: 'setRegions',
    value: function setRegions(list) {
      var regions = Region.getLineRectRegionList(list);
      this.originalRegionList = list;
      this.regions = regions;
    }
  }, {
    key: 'getSentenceByPosition',
    value: function getSentenceByPosition(point) {
      var startRegion = void 0;
      var endRegion = void 0;
      var currentRegion = this.getRegionByPoint(point);
      var separators = ['\u3002\u201D', '\uFF1F\u201D', '\uFF01\u201D', '\u3002', '\uFF1F', '\uFF01'];
      var separatorRegStr = separators.reduce(function (acc, separator) {
        if (separator === '') return acc;
        if (acc === '') return '\\' + separator;
        return acc + '|\\' + separator;
      }, '');
      var separator = new RegExp('(' + separatorRegStr + ')');
      var tempEndRegion = currentRegion;
      while (!endRegion) {
        var nextRegion = this.getNextRegion(tempEndRegion);
        if (nextRegion === null) {
          endRegion = tempEndRegion;
        } else if (separator.test(nextRegion.text)) {
          endRegion = nextRegion;
        } else {
          tempEndRegion = nextRegion;
        }
      }
      var tempStartRegion = currentRegion;
      while (!startRegion) {
        var _nextRegion = this.getPreviousRegion(tempStartRegion);
        if (_nextRegion === null) {
          startRegion = tempStartRegion;
        } else if (separator.test(_nextRegion.text)) {
          startRegion = tempStartRegion;
        } else {
          tempStartRegion = _nextRegion;
        }
      }
      return { start: startRegion, end: endRegion };
    }
  }, {
    key: 'getText',
    value: function getText(startRegion, endRegion) {
      var startIndex = startRegion.originalIndex;
      var endIndex = endRegion.originalIndex;
      var resultRegions = this.originalRegionList.slice(startIndex, endIndex + 1);
      var text = '';
      resultRegions.forEach(function (item) {
        text += item.text;
      });
      return text;
    }
  }, {
    key: 'getRects',
    value: function getRects(startRegion, endRegion) {
      var startPageIndex = startRegion.pageIndex;
      var endPageIndex = endRegion.pageIndex;
      var startLineIndex = startRegion.lineIndex;
      var endLineIndex = endRegion.lineIndex;
      var startColumnIndex = startRegion.columnIndex;
      var endColumnIndex = endRegion.columnIndex;
      var rects = [];
      if (startLineIndex === endLineIndex && startPageIndex === endPageIndex) {
        var lineRectRegion = this.regions[startPageIndex].regions[startLineIndex];
        rects.push(new DOMRect(startRegion.left, lineRectRegion.top, endRegion.left + endRegion.width - startRegion.left, lineRectRegion.height));
        return rects;
      }

      if (startPageIndex === endPageIndex) {
        var regions = this.regions[startPageIndex].regions.slice(startLineIndex, endLineIndex + 1);
        rects.push.apply(rects, _toConsumableArray(Region.getRectsByRegions(regions, startColumnIndex, endColumnIndex)));
      } else {
        for (var i = startPageIndex; i <= endPageIndex; i++) {
          if (i === startPageIndex) {
            var _regions = this.regions[i].regions.slice(startLineIndex);
            rects.push.apply(rects, _toConsumableArray(Region.getRectsByRegions(_regions, startColumnIndex, null)));
          } else if (i === endPageIndex) {
            var _regions2 = this.regions[i].regions.slice(0, endLineIndex + 1);
            rects.push.apply(rects, _toConsumableArray(Region.getRectsByRegions(_regions2, null, endColumnIndex)));
          } else {
            var _regions3 = this.regions[i].regions;

            rects.push.apply(rects, _toConsumableArray(Region.getRectsByRegions(_regions3, null, null)));
          }
        }
      }
      return rects;
    }
  }, {
    key: 'getRegionByPoint',

    /**
     * get Region By Point
     *
     * @public
     * @param {object} point
     * @param {number} point.x
     * @param {number} point.y
     * @param {boolean} is the boundary strict
     * @returns {(Region | null)}
     */
    value: function getRegionByPoint(point) {
      var isLoose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var pointPosition = {
        top: point.y,
        left: point.x
      };
      if (this.regions.length <= 0) return null;
      var pageRegions = BSearchUpperBound(this.regions, pointPosition, 'left', isLoose);
      if (pageRegions === -1) return null;
      var lineRectRegionList = this.regions[pageRegions].regions;
      var lineRegions = BSearchUpperBound(lineRectRegionList, pointPosition, 'top', isLoose);
      if (lineRegions === -1) return null;

      var touchLine = lineRectRegionList[lineRegions];
      var regionIndex = BSearchUpperBound(touchLine.regions, pointPosition, 'left', isLoose);
      if (regionIndex === -1) return null;
      return touchLine.regions[regionIndex];
    }
  }, {
    key: 'getLineInfoByRegion',
    value: function getLineInfoByRegion(region) {
      var pageIndex = region.pageIndex,
          lineIndex = region.lineIndex;
      var _regions$pageIndex$re = this.regions[pageIndex].regions[lineIndex],
          top = _regions$pageIndex$re.top,
          left = _regions$pageIndex$re.left,
          height = _regions$pageIndex$re.height,
          width = _regions$pageIndex$re.width;


      return {
        top: top,
        left: left,
        height: height,
        width: width
      };
    }
  }, {
    key: 'getPreviousRegion',
    value: function getPreviousRegion(region) {
      var lineIndex = region.lineIndex,
          columnIndex = region.columnIndex,
          pageIndex = region.pageIndex;

      var previousRegion = void 0;
      if (columnIndex === 0) {
        if (lineIndex !== 0) {
          var lineRectRegion = this.regions[pageIndex].regions[lineIndex - 1];
          if (lineRectRegion) {
            previousRegion = lineRectRegion.regions[lineRectRegion.regions.length - 1];
          }
        } else if (pageIndex !== 0) {
          var _lineRectRegion = this.regions[pageIndex - 1].regions[this.regions[pageIndex - 1].region.length - 1];
          if (_lineRectRegion) {
            previousRegion = _lineRectRegion.regions[_lineRectRegion.regions.length - 1];
          }
        }
      } else {
        previousRegion = this.regions[pageIndex].regions[lineIndex].regions[columnIndex - 1];
      }
      return previousRegion || null;
    }
  }, {
    key: 'getNextRegion',
    value: function getNextRegion(region) {
      var lineIndex = region.lineIndex,
          columnIndex = region.columnIndex,
          pageIndex = region.pageIndex;

      var nextRegion = void 0;
      var lineRectRegion = this.regions[pageIndex].regions[lineIndex];
      if (lineRectRegion) {
        if (columnIndex === lineRectRegion.regions.length - 1) {
          var nextLineRectRegion = this.regions[pageIndex].regions[lineIndex + 1];
          if (nextLineRectRegion) {
            var _nextLineRectRegion$r = _slicedToArray(nextLineRectRegion.regions, 1);

            nextRegion = _nextLineRectRegion$r[0];
          } else if (this.regions[pageIndex + 1]) {
            var _regions$regions$0$re = _slicedToArray(this.regions[pageIndex + 1].regions[0].regions, 1);

            nextRegion = _regions$regions$0$re[0];
          }
        } else {
          nextRegion = lineRectRegion.regions[columnIndex + 1];
        }
      }
      return nextRegion || null;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.originalRegionList = [];
      this.regions = [];
    }
  }], [{
    key: 'getLineRectRegionList',
    value: function getLineRectRegionList(originalRegionList) {
      var pageRegionList = [];
      var pageRegion = {
        page: 0,
        top: 0,
        right: 0,
        left: 0,
        width: 0,
        height: 0,
        regions: []
      };
      var lineRectRegion = {
        top: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        regions: []
      };
      var lineIndex = 0;
      var columnIndex = 0;
      var pageIndex = 0;
      originalRegionList.forEach(function (region, index) {
        var top = region.top,
            height = region.height,
            left = region.left,
            page = region.page,
            width = region.width;


        if (lineRectRegion.regions.length === 0) {
          // 第一个字
          pageRegion.page = region.page;
          pageRegion.top = top;
          pageRegion.right = left + width;
          pageRegion.left = left;
          pageRegion.width = width;

          lineRectRegion.top = top;
          lineRectRegion.bottom = top + height;
          lineRectRegion.left = left;
          lineRectRegion.height = height;
          lineRectRegion.page = page;

          lineRectRegion.regions.push(_Object$assign({
            originalIndex: index, lineIndex: lineIndex, columnIndex: columnIndex, pageIndex: pageIndex
          }, region));
        } else if (pageRegion.page === region.page && Region.isSameLine({ top: lineRectRegion.top, height: lineRectRegion.bottom - lineRectRegion.top }, region)) {
          // 同页 且 同行
          columnIndex++;
          lineRectRegion.regions.push(_Object$assign({
            originalIndex: index, lineIndex: lineIndex, columnIndex: columnIndex, pageIndex: pageIndex
          }, region));
          lineRectRegion.top = Math.min(lineRectRegion.top, top);
          lineRectRegion.bottom = Math.max(lineRectRegion.bottom, top + height);
          lineRectRegion.height = Math.max(lineRectRegion.height, lineRectRegion.bottom - lineRectRegion.top);
        } else if (pageRegion.page === region.page) {
          // 同页不同行
          lineIndex++;
          columnIndex = 0;
          var lastItem = lineRectRegion.regions[lineRectRegion.regions.length - 1];
          var lastWidth = lastItem.width;
          var lastLeft = lastItem.left;
          lineRectRegion.width = lastLeft + lastWidth - lineRectRegion.left;

          pageRegion.regions.push(_Object$assign({}, lineRectRegion));
          pageRegion.top = Math.min(pageRegion.top, lineRectRegion.top);
          pageRegion.left = Math.min(pageRegion.left, lineRectRegion.left);
          pageRegion.right = Math.max(pageRegion.right, lineRectRegion.left + lineRectRegion.width);
          pageRegion.width = Math.max(pageRegion.width, pageRegion.right - lineRectRegion.left);

          lineRectRegion.top = top;
          lineRectRegion.bottom = top + height;
          lineRectRegion.left = left;
          lineRectRegion.height = height;
          lineRectRegion.page = page;
          lineRectRegion.regions = [];
          lineRectRegion.regions.push(_Object$assign({
            originalIndex: index, lineIndex: lineIndex, columnIndex: columnIndex, pageIndex: pageIndex
          }, region));
        } else {
          // 不同页
          var _lastItem = lineRectRegion.regions[lineRectRegion.regions.length - 1];
          var _lastWidth = _lastItem.width;
          var _lastLeft = _lastItem.left;
          lineRectRegion.width = _lastLeft + _lastWidth - lineRectRegion.left;
          pageRegion.regions.push(_Object$assign({}, lineRectRegion));

          var lastLineItem = pageRegion.regions[pageRegion.regions.length - 1];
          var lastLineTop = lastLineItem.top;
          var lastLineHeight = lastLineItem.height;
          pageRegion.height = lastLineTop + lastLineHeight - pageRegion.top;
          pageRegionList.push(_Object$assign({}, pageRegion));

          pageIndex++;
          lineIndex = 0;
          columnIndex = 0;

          pageRegion.page = region.page;
          pageRegion.top = top;
          pageRegion.right = left + width;
          pageRegion.left = left;
          pageRegion.width = width;
          pageRegion.regions = [];

          lineRectRegion.top = top;
          lineRectRegion.bottom = top + height;
          lineRectRegion.left = left;
          lineRectRegion.height = height;
          lineRectRegion.page = page;
          lineRectRegion.regions = [];

          lineRectRegion.regions.push(_Object$assign({
            originalIndex: index, lineIndex: lineIndex, columnIndex: columnIndex, pageIndex: pageIndex
          }, region));
        }
        if (index === originalRegionList.length - 1) {
          var _lastItem2 = lineRectRegion.regions[lineRectRegion.regions.length - 1];
          var _lastWidth2 = _lastItem2.width;
          var _lastLeft2 = _lastItem2.left;
          lineRectRegion.width = _lastLeft2 + _lastWidth2 - lineRectRegion.left;
          pageRegion.regions.push(_Object$assign({}, lineRectRegion));

          var _lastLineItem = pageRegion.regions[pageRegion.regions.length - 1];
          var _lastLineTop = _lastLineItem.top;
          var _lastLineHeight = _lastLineItem.height;
          pageRegion.height = _lastLineTop + _lastLineHeight - pageRegion.top;
          pageRegionList.push(_Object$assign({}, pageRegion));
        }
      });
      return pageRegionList;
    }
  }, {
    key: 'getRectsByRegions',
    value: function getRectsByRegions(LineRegions, startColumnIndex, endColumnIndex) {
      var rects = [];
      LineRegions.forEach(function (lineRectRegion, index) {
        if (index === 0 && startColumnIndex !== null) {
          var region = lineRectRegion.regions[startColumnIndex];
          rects.push(new DOMRect(region.left, lineRectRegion.top, lineRectRegion.width - region.left + lineRectRegion.left, lineRectRegion.height));
        } else if (index === LineRegions.length - 1 && endColumnIndex !== null) {
          var _region = lineRectRegion.regions[endColumnIndex];
          rects.push(new DOMRect(lineRectRegion.left, lineRectRegion.top, _region.left + _region.width - lineRectRegion.left, lineRectRegion.height));
        } else {
          rects.push(new DOMRect(lineRectRegion.left, lineRectRegion.top, lineRectRegion.width, lineRectRegion.height));
        }
      });
      return rects;
    }
  }, {
    key: 'pointInRect',
    value: function pointInRect(targetPoint, leftTopPoint, rightBottomPoint) {
      if (targetPoint.x > leftTopPoint.x && targetPoint.x <= rightBottomPoint.x && targetPoint.y > leftTopPoint.y && targetPoint.y <= rightBottomPoint.y) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isSameLine',
    value: function isSameLine(region1, region2) {
      return (region1.top - (region2.top + region2.height)) * (region2.top - (region1.top + region1.height)) > 0;
    }
  }]);

  return Region;
}();

var RegionEasyMarker = function (_BaseEasyMarker) {
  _inherits(RegionEasyMarker, _BaseEasyMarker);

  function RegionEasyMarker(options) {
    _classCallCheck(this, RegionEasyMarker);

    var _this = _possibleConstructorReturn(this, (RegionEasyMarker.__proto__ || _Object$getPrototypeOf(RegionEasyMarker)).call(this, options));

    _this.selectRegion = {
      start: null,
      end: null
    };
    _this.region = new Region(options.regions || []);
    _this.mode = EasyMarkerMode.REGION;
    _this.touchStartTime = 0;
    return _this;
  }

  _createClass(RegionEasyMarker, [{
    key: 'setRegions',

    /**
     * Update Regions
     *
     * @memberof EasyMarker
     * @returns {string}
     */
    value: function setRegions(regions) {
      this.region.setRegions(regions);
    }

    /**
     * Get the selected text
     *
     * @memberof EasyMarker
     * @returns {string}
     */

  }, {
    key: 'getSelectText',
    value: function getSelectText() {
      var text = this.region.getText(this.selectRegion.start, this.selectRegion.end) || '';
      return text;
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'getSelectMarkdown',
    value: function getSelectMarkdown() {
      return RegionEasyMarker.getSelectMarkdown();
    }

    /**
     * touchstart event handler
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      _get(RegionEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(RegionEasyMarker.prototype), 'handleTouchStart', this).call(this, e);
      if (this.deviceType === DeviceType.PC) {
        if (this.selectStatus === SelectStatus.FINISH) {
          var isMenuClick = this.menu.inRegion(e);
          var position = this.getTouchRelativePosition(e);
          var startCursorRegion = this.cursor.start.inRegion(position);
          var endCursorRegion = this.cursor.end.inRegion(position);
          if (!isMenuClick && !startCursorRegion.inRegion && !endCursorRegion.inRegion) {
            this.reset();
          }
        }

        if (this.selectStatus === SelectStatus.NONE && this.isContains(e.target)) {
          this.touchStartTime = Date.now();
          var _position = this.getTouchRelativePosition(e);
          this.selectRegion.start = this.region.getRegionByPoint(_position, true);
          if (this.selectRegion.start) {
            var _region$getLineInfoBy = this.region.getLineInfoByRegion(this.selectRegion.start),
                lineHeight = _region$getLineInfoBy.height;

            this.cursor.start.height = lineHeight;
            this.cursor.start.position = { x: this.selectRegion.start.left, y: this.selectRegion.start.top };
          }
        }
      }
    }
  }, {
    key: 'handleTouchMoveThrottle',
    value: function handleTouchMoveThrottle(e) {
      if (this.deviceType === DeviceType.PC) {
        if (this.selectStatus === SelectStatus.NONE && this.selectRegion.start && !this.selectRegion.end) {
          if (Date.now() - this.touchStartTime < 100) return;
          var position = this.getTouchRelativePosition(e);
          this.selectRegion.end = this.region.getRegionByPoint(position);
          if (this.selectRegion.end) {
            var _region$getLineInfoBy2 = this.region.getLineInfoByRegion(this.selectRegion.end),
                lineHeight = _region$getLineInfoBy2.height;

            this.cursor.end.height = lineHeight;
            this.cursor.end.position = {
              x: this.selectRegion.end.left + this.selectRegion.end.width,
              y: this.selectRegion.end.top
            };
            this.selectStatus = SelectStatus.SELECTING;
          }
        }
      }
      _get(RegionEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(RegionEasyMarker.prototype), 'handleTouchMoveThrottle', this).call(this, e);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      _get(RegionEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(RegionEasyMarker.prototype), 'handleTouchEnd', this).call(this, e);
      if (this.selectStatus === SelectStatus.SELECTING) {
        this.selectStatus = SelectStatus.FINISH;
      }
      if (this.deviceType === DeviceType.PC) {
        if (this.selectStatus === SelectStatus.NONE) {
          this.reset();
        }
      }
    }

    /**
     * copy listener
     *
     * @private
     * @memberof EasyMarker
     */

  }, {
    key: 'copyListener',
    value: function copyListener(e) {
      if (this.selectStatus === SelectStatus.FINISH) {
        this.menu.copyListener({
          start: this.selectRegion.start,
          end: this.selectRegion.end,
          content: this.getSelectText(),
          markdown: this.getSelectMarkdown()
        }, e);
        this.reset();
      }
    }

    /**
     * Tap event
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleTap',
    value: function handleTap(e) {
      if (this.selectStatus === SelectStatus.FINISH) {
        this.menu.handleTap(e, {
          start: this.selectRegion.start,
          end: this.selectRegion.end,
          content: this.getSelectText(),
          markdown: this.getSelectMarkdown()
        });
        var position = this.getTouchRelativePosition(e);
        var startCursorRegion = this.cursor.start.inRegion(position);
        var endCursorRegion = this.cursor.end.inRegion(position);
        if (startCursorRegion.inRegion || endCursorRegion.inRegion) return;
        this.reset();
      } else if (this.selectStatus === SelectStatus.NONE) {
        var inHighlightLine = this.highlight.handleTap(e);
        if (!inHighlightLine && !this.options.disableTapHighlight && !this.options.disableSelect && this.isContains(e.target) && this.deviceType === DeviceType.MOBILE) {
          var _position2 = this.getTouchRelativePosition(e);
          this.selectThisSentence(_position2);
        }
      }
    }

    /**
     * Long press event
     *
     * @private
     * @param {TouchEvent} e
     * @memberof EasyMarker
     */

  }, {
    key: 'handleLongTap',
    value: function handleLongTap(e) {
      if (this.deviceType === DeviceType.MOBILE) {
        if (this.isContains(e.target)) {
          var position = this.getTouchRelativePosition(e);
          this.selectThisSentence(position);
        }
      }
    }
  }, {
    key: 'selectThisSentence',
    value: function selectThisSentence(position) {
      var _region$getSentenceBy = this.region.getSentenceByPosition(position),
          start = _region$getSentenceBy.start,
          end = _region$getSentenceBy.end;

      this.selectRegion = {
        start: start,
        end: end
      };
      this.cursor.start.height = this.region.getLineInfoByRegion(this.selectRegion.start).height;
      this.cursor.start.position = { x: this.selectRegion.start.left, y: this.selectRegion.start.top
        // { height: lineHeight } = this.region.getLineInfoByRegion(this.selectRegion.end)
      };this.cursor.end.height = this.region.getLineInfoByRegion(this.selectRegion.end).height;
      this.cursor.end.position = {
        x: this.selectRegion.end.left + this.selectRegion.end.width,
        y: this.selectRegion.end.top
      };
      this.cursor.start.show();
      this.cursor.end.show();

      this.renderMask();
      this.selectStatus = SelectStatus.FINISH;
    }
    /**
     * Move the cursor to the specified location
     *
     * @private
     * @param {HTMLElement} element
     * @param {number} x Relative to the screen positioning x
     * @param {number} y Relative to the screen positioning Y
     * @memberof EasyMarker
     */

  }, {
    key: 'moveCursor',
    value: function moveCursor(element, x, y) {
      var relativeX = x - this.screenRelativeOffset.x;
      var relativeY = y - this.screenRelativeOffset.y;
      // const relativePosition = this.getTouchRelativePosition({ x, y })
      var clickRegion = this.region.getRegionByPoint({ x: relativeX, y: relativeY });
      if (!clickRegion) return;
      var unmovingCursor = this.movingCursor === this.cursor.start ? this.cursor.end : this.cursor.start;
      if (unmovingCursor.position.x === relativeX && unmovingCursor.position.y === relativeY) {
        return;
      }

      this.swapCursor(clickRegion, { x: relativeX, y: relativeY });

      var _region$getLineInfoBy3 = this.region.getLineInfoByRegion(clickRegion),
          lineHeight = _region$getLineInfoBy3.height;

      if (this.movingCursor === this.cursor.start) {
        this.movingCursor.height = lineHeight;
        this.movingCursor.position = {
          x: clickRegion.left,
          y: clickRegion.top
        };
      } else {
        this.movingCursor.height = lineHeight;
        this.movingCursor.position = {
          x: clickRegion.left + clickRegion.width,
          y: clickRegion.top
        };
      }

      this.cursor.start.show();
      this.cursor.end.show();
      this.renderMask();
    }

    /**
     * Swap the start and end cursors
     *
     * @private
     * @param {any} clickRegion
     * @param {any} currentPosition
     * @memberof EasyMarker
     */

  }, {
    key: 'swapCursor',
    value: function swapCursor(clickRegion) {
      if (this.movingCursor === this.cursor.start) {
        if (clickRegion.originalIndex > this.selectRegion.end.originalIndex) {
          this.cursor.start.position = this.cursor.end.position;
          this.movingCursor = this.cursor.end;
          this.selectRegion.start = this.region.getNextRegion(this.selectRegion.end);
          this.selectRegion.end = clickRegion;
        } else {
          this.selectRegion.start = clickRegion;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (clickRegion.originalIndex < this.selectRegion.start.originalIndex) {
          this.cursor.end.position = this.cursor.start.position;
          this.movingCursor = this.cursor.start;
          this.selectRegion.end = this.region.getPreviousRegion(this.selectRegion.start);
          this.selectRegion.start = clickRegion;
        } else {
          this.selectRegion.end = clickRegion;
        }
      }
    }
  }, {
    key: 'renderMask',
    value: function renderMask() {
      this.mask.render(this.selectRegion.start, this.selectRegion.end);
    }
  }, {
    key: 'setSelection',
    value: function setSelection(selection) {
      this.selectRegion.start = selection.start;
      this.selectRegion.end = selection.end;
    }
  }, {
    key: 'reset',
    value: function reset() {
      _get(RegionEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(RegionEasyMarker.prototype), 'reset', this).call(this);
      this.selectRegion = {
        start: null,
        end: null
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(RegionEasyMarker.prototype.__proto__ || _Object$getPrototypeOf(RegionEasyMarker.prototype), 'destroy', this).call(this);
      this.selectRegion = {
        start: null,
        end: null
      };
      this.region.destroy();
      this.region = null;
      this.mode = EasyMarkerMode.REGION;
      this.touchStartTime = 0;
    }
  }, {
    key: 'start',
    get: function get$$1() {
      return this.selectRegion.start;
    }
  }, {
    key: 'end',
    get: function get$$1() {
      return this.selectRegion.end;
    }
  }], [{
    key: 'getSelectMarkdown',
    value: function getSelectMarkdown() {
      return 'Markdown is not supported in current mode.';
    }
  }]);

  return RegionEasyMarker;
}(EasyMarker);

export default NodeEasyMarker;
export { NodeEasyMarker, RegionEasyMarker, NoteType };
