var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

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

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Base element class
 *
 * @export
 * @class BaseElement
 */
var BaseElement = function () {
  function BaseElement() {
    classCallCheck(this, BaseElement);

    this.element = null;
    this.container = document.body;
  }

  /**
   * Create element interface
   *
   * @memberof BaseElement
   */


  createClass(BaseElement, [{
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
    get: function get$$1() {
      return this.element.style;
    }
  }, {
    key: 'isShow',
    get: function get$$1() {
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
  HIGHLIGHT: 'highlight'
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
              rects.push(Object.assign({}, textRect, {
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
      var words = [].concat(toConsumableArray(node.textContent));
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
function rectToPointArray_fix(rect, offset, margin) {
  var points = [];
  if (rect.width === 0) return points;

  points.push([rect.left, rect.top]);
  points.push([rect.right, rect.top]);
  points.push([rect.right, rect.bottom]);
  points.push([rect.left, rect.bottom]);
  // user letter space make + to -.
  //points.push([rect.left - margin, rect.top])
  //points.push([rect.right - margin, rect.top])
  //points.push([rect.right - margin, rect.bottom])
  //points.push([rect.left - margin, rect.bottom])

  points.forEach(function (point) {
    point[0] -= offset.x;
    point[1] -= offset.y;
  });
  return points;
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
  inherits(Cursor, _BaseElement);

  /**
   * Creates an instance of Cursor.
   * @param {any} container
   * @param {any} type
   * @param {any} options
   * @memberof Cursor
   */
  function Cursor(container, type, options) {
    classCallCheck(this, Cursor);

    var _this = possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this));

    _this.container = container;
    _this.type = type;
    _this.options = Object.assign({}, defaultOptions, options);
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

  createClass(Cursor, [{
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
      var distance = Number.MAX_SAFE_INTEGER;
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
    set: function set$$1(val) {
      var x = val.x,
          y = val.y;

      this.$position = { x: x, y: y };

      this.moveTo(x, y);
    },
    get: function get$$1() {
      return this.$position;
    }
  }, {
    key: 'height',
    get: function get$$1() {
      return this.$height;
    },
    set: function set$$1(val) {
      if (val !== this.$height) {
        this.$height = val;
        this.setCursorSize(val);
      }
    }
  }, {
    key: 'width',
    get: function get$$1() {
      return this.height / 4;
    }
  }]);
  return Cursor;
}(BaseElement);

/**
 * Position class
 *
 * @export
 * @class Position
 */
var Position = function () {
  function Position() {
    classCallCheck(this, Position);

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


  createClass(Position, [{
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
    get: function get$$1() {
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
    classCallCheck(this, TextNode);

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


  createClass(TextNode, null, [{
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
            lastLineMergedRect.right = lastLineMergedRect.right - rect.right > 0 ? lastLineMergedRect.right : rect.right;
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

        (_result$rects = result.rects).push.apply(_result$rects, toConsumableArray(rects));
        result.text += text;
        return result;
      }

      if (startNode.nodeName === '#text') {
        var _result$rects2;

        var textEndIndex = startNode === endNode ? endIndex : startNode.textContent.length;
        (_result$rects2 = result.rects).push.apply(_result$rects2, toConsumableArray(getNodeRects(startNode, startIndex, textEndIndex)));
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

        (_result$rects3 = result.rects).push.apply(_result$rects3, toConsumableArray(_rects));
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

          (_result$rects4 = result.rects).push.apply(_result$rects4, toConsumableArray(_rects2));
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
  inherits(Menu, _BaseElement);

  function Menu(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Menu);

    var _this = possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

    _this.container = container;
    _this.handler = null;
    _this.mode = options.mode;
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
        }
      }
    };

    if (options.style) {
      Object.assign(_this.option.style.menu, options.style.menu);
      Object.assign(_this.option.style.triangle, options.style.triangle);
      Object.assign(_this.option.style.item, options.style.item);
      Object.assign(_this.option.style.icon, options.style.icon);
    }

    _this.easyMarker = null;
    _this.menuElement = null;
    _this.itemMap = new Map();
    _this.positionRange = {
      top: 0,
      bottom: 0,
      left: 0
    };
    _this.windowWidth = document.documentElement.clientWidth;
    //this.windowWidth = this.container.getBoundingClientRect().width / 2
    _this.ticking = false;
    _this.height = 0;
    _this.width = 0;
    _this.type = MenuType.SELECT;
    _this.options = {};
    _this.createElement();
    _this.mount();
    _this.hide();
    return _this;
  }

  createClass(Menu, [{
    key: 'test',
    value: function test() {
      this.menuElement.children().forEach(function (child) {
        child.style.background = '#333333';
      });
    }
  }, {
    key: 'createElement',
    value: function createElement() {
      var _this2 = this;

      var wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.width = 'max-content';
      wrapper.style.textAlign = 'center';
      wrapper.style.lineHeight = '0';
      wrapper.style.zIndex = '50';
      wrapper.style.transform = 'translate3d(-50%, -100%, 0)';
      wrapper.style.webkitTransform = 'translate3d(-50%, -100%, 0)';
      wrapper.style.transition = 'transform 0.2s ease, opacity 0.2s ease';

      var menu = document.createElement('div');
      menu.classList.add('em-menu');
      Object.assign(menu.style, this.option.style.menu);

      var bottomTriangle = document.createElement('div');
      bottomTriangle.classList.add('em-menu-triangle');
      Object.assign(bottomTriangle.style, this.option.style.triangle);

      wrapper.appendChild(menu);
      wrapper.appendChild(bottomTriangle);
      this.option.items.forEach(function (item) {
        var menuItem = _this2.createMenuItemElement(item);
        _this2.itemMap.set(menuItem, item);
        menu.appendChild(menuItem);
      });
      this.menuElement = menu;
      this.element = wrapper;
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
          type = _ref.type;

      // eslint-disable-line class-methods-use-this
      var menuItem = document.createElement('span');
      menuItem.classList.add('em-menu-item');
      if (type !== undefined) {
        menuItem.classList.add('em-menu-item-' + type);
      }
      Object.assign(menuItem.style, this.option.style.item, itemStyle);
      if (iconName) {
        var iconItem = document.createElement('span');
        Object.assign(iconItem.style, this.option.style.icon, iconStyle);
        iconItem.className = 'em-menu-item-icon '.concat(iconName);
        var textNode = document.createTextNode(text);
        menuItem.appendChild(iconItem);
        menuItem.appendChild(textNode);
      } else {
        var _textNode = document.createTextNode(text);
        menuItem.appendChild(_textNode);
      }

      return menuItem;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(start, end) {
      var _this3 = this;

      var mergeRects = {};
      //console.log(this.mode)//node
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
          return item.left <= _this3.windowWidth && item.left >= 0;
        }).forEach(function (rect, index) {
          if (index === 0) {
            mergeRects.left = rect.left - _this3.screenRelativeOffset.x;
            mergeRects.top = rect.top - _this3.screenRelativeOffset.y;
            mergeRects.right = rect.right - _this3.screenRelativeOffset.x;
            mergeRects.bottom = rect.bottom - _this3.screenRelativeOffset.y;
          } else if (index === _rects.length - 1) {
            mergeRects.bottom = rect.bottom - _this3.screenRelativeOffset.y;
          } else {
            mergeRects.left = Math.min(rect.left - _this3.screenRelativeOffset.x, mergeRects.left);
            // mergeRects.top = Math.min(rect.top - this.screenRelativeOffset.y, mergeRects.top)
            mergeRects.right = Math.max(rect.right - _this3.screenRelativeOffset.x, mergeRects.right);
            // mergeRects.bottom = Math.max(rect.bottom - this.screenRelativeOffset.y, mergeRects.bottom)
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
    value: function show() {
      if (this.type === MenuType.HIGHLIGHT) {
        this.element.classList.remove('em-menu-wrapper-select');
        this.element.classList.add('em-menu-wrapper-highlight');
      } else if (this.type === MenuType.SELECT) {
        this.element.classList.remove('em-menu-wrapper-highlight');
        this.element.classList.add('em-menu-wrapper-select');
      }
      var relativeTop = 0;
      if (!this.height || !this.width) {
        this.height = Number((window.getComputedStyle(this.menuElement).height || '').replace('px', ''));
        this.width = Number((window.getComputedStyle(this.menuElement).width || '').replace('px', ''));
        //this.width = this.container.getBoundingClientRect().width / 2
      }

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
      if (this.positionRange.left + containerLeft + this.width / 2 > this.windowWidth) {
        var right = void 0;
        if (this.style.position === 'fixed' && !this.option.isMultiColumnLayout) {
          right = containerRight - this.positionRange.left - this.width / 2;
          right = containerLeft < 0 ? -this.width / 2 : right;
        } else {
          right = containerRight - this.positionRange.left - containerLeft - this.width / 2;
        }
        this.style.right = right + 'px';
        this.style.left = '';
      } else if (this.positionRange.left + containerLeft - this.width / 2 < 0) {
        var left = void 0;
        if (this.style.position === 'fixed' && !this.option.isMultiColumnLayout) {
          left = this.width / 2 + this.positionRange.left + containerLeft;
          left = left < 0 ? this.width / 2 : left;
        } else {
          left = this.width / 2 + this.positionRange.left;
        }
        this.style.left = left + 'px';
        this.style.right = '';
      } else {
        var _left = void 0;
        if (this.style.position === 'fixed' && !this.option.isMultiColumnLayout) {
          _left = this.positionRange.left + containerLeft;
          _left = _left < 0 ? this.width / 2 : _left;
        } else {
          // eslint-disable-next-line prefer-destructuring
          _left = this.positionRange.left;
        }
        this.style.left = _left + 'px';
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
        this.easyMarker.menuOnClick(copyItem.id, selection, Object.assign({}, this.options, { e: e }));
      } else {
        copyItem.handler.call(this.easyMarker, selection, Object.assign({}, this.options, { e: e }));
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
      var _this4 = this;

      if (!this.ticking) {
        window.requestAnimationFrame(function () {
          _this4.show();
          _this4.ticking = false;
        });
        this.ticking = true;
      }
    }
  }, {
    key: 'screenRelativeOffset',
    get: function get$$1() {
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
    get: function get$$1() {
      return this.style.visibility === 'visible';
    }
  }]);
  return Menu;
}(BaseElement);

var MaskType = {
  BLOCK: 'block',
  LINE: 'line'
};

var Mask = function (_BaseElement) {
  inherits(Mask, _BaseElement);

  function Mask(container, option) {
    classCallCheck(this, Mask);

    var _this = possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).call(this));

    var defaultOptions = {
      color: '#FEFFCA',
      opacity: 0.5,
      animateDuration: 100
    };
    _this.mode = option.mode || EasyMarkerMode.NODE;
    _this.maskType = option.maskType || (_this.mode === EasyMarkerMode.NODE ? MaskType.BLOCK : MaskType.LINE);
    _this.container = container;
    _this.option = Object.assign(defaultOptions, option);
    _this.option.margin = anyToPx(_this.option.margin);

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

  createClass(Mask, [{
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
      // fix letter space
      headerPosition.x -= this.option.margin;
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
        var _ref2 = slicedToArray(_ref, 2),
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
        var _ref4 = slicedToArray(_ref3, 2),
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
    get: function get$$1() {
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
    get: function get$$1() {
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
    get: function get$$1() {
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
    get: function get$$1() {
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
  inherits(Highlight, _BaseElement);

  function Highlight(container, option) {
    classCallCheck(this, Highlight);

    var _this = possibleConstructorReturn(this, (Highlight.__proto__ || Object.getPrototypeOf(Highlight)).call(this));

    var defaultOptions = {
      highlightColor: '#FEFFCA',
      underlineColor: '#CCCCCC',
      underlineWidth: 3,
      tagBackground: '#af8978',
      tagColor: '#fff',
      opacity: 1,
      type: 'highlight'
      // margin: '0.1rem',
    };
    _this.container = container;
    _this.mode = option.mode || EasyMarkerMode.NODE;
    _this.option = Object.assign(defaultOptions, option);
    if (option.color) {
      _this.option.highlightColor = option.color;
    }
    _this.type = _this.option.type || NoteType.Highlight;
    _this.option.margin = anyToPx(_this.option.margin);
    _this.lineMap = new Map();
    // this.onClick = () => { }
    _this.createElement();
    _this.mount();
    _this.id = 0;
    _this.easyMarker = null;
    return _this;
  }

  createClass(Highlight, [{
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
          return rectToPointArray_fix(rect, offset, margin);
        });
        var markdown = void 0;
        if (this.easyMarker && this.easyMarker.markdown) {
          var _easyMarker$markdown$ = this.easyMarker.markdown.getSelectMarkdown(startTextNode.node, endTextNode.node, startTextNode.offset, endTextNode.offset);

          markdown = _easyMarker$markdown$.markdown;
        } else {
          markdown = '';
        }

        selectionContent = Object.assign({
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
        selectionContent = Object.assign({
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
        _this3.option.highlightColor = line.meta.fillColor || _this3.option.highlightColor;
        _this3.option.underlineColor = line.meta.underlineColor || _this3.option.underlineColor;
        _this3.option.tagColor = line.meta.fillColor || _this3.option.tagColor;
        line.points.forEach(function (points, index) {
          if (type === NoteType.UNDERLINE) {
            _this3.element.appendChild(_this3.createLine(points));
          } else {
            _this3.element.appendChild(_this3.createRectangle(points));
          }
          // 如果设置了tag,就渲染tag
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
        });
      });
    }

    /**
     *
     *
     * @param {Object[]} lines
     * @param {Selection} lines[].selection
     * @param {any} [lines[].id]
     * @param {any} [lines[].meta]
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
    key: 'createRectangle',
    value: function createRectangle(pointList) {
      var points = pointList.reduce(function (acc, _ref2) {
        var _ref3 = slicedToArray(_ref2, 2),
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
        if (this.easyMarker.highlightLineClick) {
          this.easyMarker.highlightLineClick(clickLine.id, clickLine.line.meta, clickLine.line.selection, e);
        } else {
          this.easyMarker.showHighlightMenu(clickLine.line.selection, { id: clickLine.id, meta: clickLine.line.meta });
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
    get: function get$$1() {
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

var defaultOptions$1 = Object.freeze({
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
    classCallCheck(this, Markdown);

    this.container = container;
    this.wrapMarkdown = Markdown.wrapMarkdown;
    this.options = Object.assign({}, defaultOptions$1, options);
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


  createClass(Markdown, [{
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
    classCallCheck(this, TouchEvent);

    this.disabled = false;
    this.options = {
      longTapTime: 600,
      tapTime: 500,
      slideDistance: 20,
      throttleTime: 50
      // this.element = getDeviceType() === DeviceType.MOBILE ? element : window
    };this.element = element || window;
    this.options = Object.assign(this.options, options);
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

  createClass(TouchEvent, [{
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
      if (!this.hook('touchend', e)) return;

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
    classCallCheck(this, EasyMarker);

    this.options = Object.assign({}, defaultOptions$2, options);
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

  createClass(EasyMarker, [{
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
        this.excludeElements = options.excludeElements ? [].concat(toConsumableArray(options.excludeElements)) : [];
        this.includeElements = options.includeElements ? [].concat(toConsumableArray(options.includeElements)) : [containerElement];
      } else {
        // deprecated
        // Compatible with older versions,options equivalent to excludeElements
        this.excludeElements = [].concat(toConsumableArray(options));
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
        this.cursor.start = new CursorElement(this.container, CursorType.END, Object.assign({ mode: this.mode }, this.options.cursor || {}));
      } else {
        this.cursor.start = new CursorElement(this.container, CursorType.START, Object.assign({ mode: this.mode }, this.options.cursor || {}));
      }
      this.cursor.end = new CursorElement(this.container, CursorType.END, this.options.cursor || {});
      this.movingCursor = this.cursor.end;

      this.mask = new Mask(this.container, Object.assign({ mode: this.mode }, this.options.mask || {}));
      this.highlight = new Highlight(this.container, Object.assign({ mode: this.mode }, this.options.highlight || {}));
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
     * @param {Object[]} lines
     * @param {*} [lines[].id]
     * @param {*} [lines[].meta]
     * @param {Object} lines[].selection
     * @param {Node} lines[].selection.anchorNode
     * @param {number} lines[].selection.anchorOffset
     * @param {Node} lines[].selection.focusNode
     * @param {number} lines[].selection.focusOffset
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
        } else {
          // 开始和结束都不在范围内,可能点击了滚动条
          e.preventDefault();
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
      this.menu.type = MenuType.SELECT;
      //this.menu.type = MenuType.HIGHLIGHT
      this.menu.options = options;
      this.menu.show();
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'setSelection',
    value: function setSelection() {}
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
    get: function get$$1() {
      return this.$selectStatus;
    },
    set: function set$$1(val) {
      if (val !== this.$selectStatus) {
        this.selectStatusChangeHandler(val);
      }
      this.$selectStatus = val;
      if (val === SelectStatus.FINISH) {
        this.menu.setPosition(this.start, this.end);
        this.menu.type = MenuType.SELECT;
        this.menu.show();
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
    get: function get$$1() {
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

var NodeEasyMarker = function (_BaseEasyMarker) {
  inherits(NodeEasyMarker, _BaseEasyMarker);

  function NodeEasyMarker(options) {
    classCallCheck(this, NodeEasyMarker);

    var _this = possibleConstructorReturn(this, (NodeEasyMarker.__proto__ || Object.getPrototypeOf(NodeEasyMarker)).call(this, options));

    _this.textNode = {
      start: null,
      end: null
    };
    _this.markdown = null;
    _this.mode = EasyMarkerMode.NODE;
    _this.touchStartTime = 0;
    return _this;
  }

  createClass(NodeEasyMarker, [{
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
      get(NodeEasyMarker.prototype.__proto__ || Object.getPrototypeOf(NodeEasyMarker.prototype), 'handleTouchStart', this).call(this, e);
      if (this.deviceType === DeviceType.PC) {
        if (this.selectStatus === SelectStatus.FINISH) {
          var isMenuClick = this.menu.inRegion(e);
          var position = this.getTouchRelativePosition(e);
          var startCursorRegion = this.cursor.start.inRegion(position);
          var endCursorRegion = this.cursor.end.inRegion(position);
          if (!isMenuClick && !startCursorRegion.inRegion && !endCursorRegion.inRegion) ;
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
      get(NodeEasyMarker.prototype.__proto__ || Object.getPrototypeOf(NodeEasyMarker.prototype), 'handleTouchMoveThrottle', this).call(this, e);
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
      get(NodeEasyMarker.prototype.__proto__ || Object.getPrototypeOf(NodeEasyMarker.prototype), 'handleTouchEnd', this).call(this, e);
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
      get(NodeEasyMarker.prototype.__proto__ || Object.getPrototypeOf(NodeEasyMarker.prototype), 'destroy', this).call(this);
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
      get(NodeEasyMarker.prototype.__proto__ || Object.getPrototypeOf(NodeEasyMarker.prototype), 'reset', this).call(this);
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
    classCallCheck(this, Region);

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

  createClass(Region, [{
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
        rects.push.apply(rects, toConsumableArray(Region.getRectsByRegions(regions, startColumnIndex, endColumnIndex)));
      } else {
        for (var i = startPageIndex; i <= endPageIndex; i++) {
          if (i === startPageIndex) {
            var _regions = this.regions[i].regions.slice(startLineIndex);
            rects.push.apply(rects, toConsumableArray(Region.getRectsByRegions(_regions, startColumnIndex, null)));
          } else if (i === endPageIndex) {
            var _regions2 = this.regions[i].regions.slice(0, endLineIndex + 1);
            rects.push.apply(rects, toConsumableArray(Region.getRectsByRegions(_regions2, null, endColumnIndex)));
          } else {
            var _regions3 = this.regions[i].regions;

            rects.push.apply(rects, toConsumableArray(Region.getRectsByRegions(_regions3, null, null)));
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
            var _nextLineRectRegion$r = slicedToArray(nextLineRectRegion.regions, 1);

            nextRegion = _nextLineRectRegion$r[0];
          } else if (this.regions[pageIndex + 1]) {
            var _regions$regions$0$re = slicedToArray(this.regions[pageIndex + 1].regions[0].regions, 1);

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

          lineRectRegion.regions.push(Object.assign({
            originalIndex: index, lineIndex: lineIndex, columnIndex: columnIndex, pageIndex: pageIndex
          }, region));
        } else if (pageRegion.page === region.page && Region.isSameLine({ top: lineRectRegion.top, height: lineRectRegion.bottom - lineRectRegion.top }, region)) {
          // 同页 且 同行
          columnIndex++;
          lineRectRegion.regions.push(Object.assign({
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

          pageRegion.regions.push(Object.assign({}, lineRectRegion));
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
          lineRectRegion.regions.push(Object.assign({
            originalIndex: index, lineIndex: lineIndex, columnIndex: columnIndex, pageIndex: pageIndex
          }, region));
        } else {
          // 不同页
          var _lastItem = lineRectRegion.regions[lineRectRegion.regions.length - 1];
          var _lastWidth = _lastItem.width;
          var _lastLeft = _lastItem.left;
          lineRectRegion.width = _lastLeft + _lastWidth - lineRectRegion.left;
          pageRegion.regions.push(Object.assign({}, lineRectRegion));

          var lastLineItem = pageRegion.regions[pageRegion.regions.length - 1];
          var lastLineTop = lastLineItem.top;
          var lastLineHeight = lastLineItem.height;
          pageRegion.height = lastLineTop + lastLineHeight - pageRegion.top;
          pageRegionList.push(Object.assign({}, pageRegion));

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

          lineRectRegion.regions.push(Object.assign({
            originalIndex: index, lineIndex: lineIndex, columnIndex: columnIndex, pageIndex: pageIndex
          }, region));
        }
        if (index === originalRegionList.length - 1) {
          var _lastItem2 = lineRectRegion.regions[lineRectRegion.regions.length - 1];
          var _lastWidth2 = _lastItem2.width;
          var _lastLeft2 = _lastItem2.left;
          lineRectRegion.width = _lastLeft2 + _lastWidth2 - lineRectRegion.left;
          pageRegion.regions.push(Object.assign({}, lineRectRegion));

          var _lastLineItem = pageRegion.regions[pageRegion.regions.length - 1];
          var _lastLineTop = _lastLineItem.top;
          var _lastLineHeight = _lastLineItem.height;
          pageRegion.height = _lastLineTop + _lastLineHeight - pageRegion.top;
          pageRegionList.push(Object.assign({}, pageRegion));
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
  inherits(RegionEasyMarker, _BaseEasyMarker);

  function RegionEasyMarker(options) {
    classCallCheck(this, RegionEasyMarker);

    var _this = possibleConstructorReturn(this, (RegionEasyMarker.__proto__ || Object.getPrototypeOf(RegionEasyMarker)).call(this, options));

    _this.selectRegion = {
      start: null,
      end: null
    };
    _this.region = new Region(options.regions || []);
    _this.mode = EasyMarkerMode.REGION;
    _this.touchStartTime = 0;
    return _this;
  }

  createClass(RegionEasyMarker, [{
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
      get(RegionEasyMarker.prototype.__proto__ || Object.getPrototypeOf(RegionEasyMarker.prototype), 'handleTouchStart', this).call(this, e);
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
      get(RegionEasyMarker.prototype.__proto__ || Object.getPrototypeOf(RegionEasyMarker.prototype), 'handleTouchMoveThrottle', this).call(this, e);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      get(RegionEasyMarker.prototype.__proto__ || Object.getPrototypeOf(RegionEasyMarker.prototype), 'handleTouchEnd', this).call(this, e);
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
          markdown: RegionEasyMarker.getSelectMarkdown()
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
          markdown: RegionEasyMarker.getSelectMarkdown()
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
      get(RegionEasyMarker.prototype.__proto__ || Object.getPrototypeOf(RegionEasyMarker.prototype), 'reset', this).call(this);
      this.selectRegion = {
        start: null,
        end: null
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      get(RegionEasyMarker.prototype.__proto__ || Object.getPrototypeOf(RegionEasyMarker.prototype), 'destroy', this).call(this);
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
export { NodeEasyMarker, RegionEasyMarker };
