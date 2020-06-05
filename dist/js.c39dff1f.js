// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"kO4A":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = exports.lerp = exports.map = void 0;

// Map number x from range [a, b] to [c, d]
var map = function map(x, a, b, c, d) {
  return (x - a) * (d - c) / (b - a) + c;
}; // Linear interpolation


exports.map = map;

var lerp = function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}; // Clamp val within min and max


exports.lerp = lerp;

var clamp = function clamp(val, min, max) {
  return Math.max(Math.min(val, max), min);
};

exports.clamp = clamp;
},{}],"IZBA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Viewport size
var getWinSize = function getWinSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

var winsize = getWinSize();
window.addEventListener('resize', function () {
  return winsize = getWinSize();
});
var _default = winsize;
exports.default = _default;
},{}],"D3xV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mathUtils = require("./mathUtils");

var _winsize = _interopRequireDefault(require("./winsize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Check if firefox
var firefoxAgent = navigator.userAgent.indexOf('Firefox') > -1;

var TextOnPath = /*#__PURE__*/function () {
  function TextOnPath(svgEl) {
    var _this = this;

    _classCallCheck(this, TextOnPath);

    // The SVG element
    this.DOM = {
      svg: svgEl
    }; // The text element

    this.DOM.text = this.DOM.svg.querySelector('text'); // Sadly firefox does not yet play nicely with SVG filters, so take them out if any applied to the text element..

    if (firefoxAgent) {
      this.DOM.text.removeAttribute('filter');
    } // Get the filter to know which one to get the primitive from
    // The textPath element


    this.DOM.textPath = this.DOM.text.querySelector('textPath'); // The filter type (defined in the svg element as data-filter-type)

    var filterType = this.DOM.svg.dataset.filterType; // The filter element id

    var filterId = this.DOM.text.getAttribute('filter') && this.DOM.text.getAttribute('filter').match(/url\(["']?([^"']*)["']?\)/)[1]; // The SVG filter primitive object
    // This is where the logic of the svg filter is done for the update on scroll
    // Depending on what filter type we set up in the data-filter-type, a specific filter primitive attribute will get updated depending on the scroll speed

    this.filterPrimitive = filterType && filterId && new FilterPrimitive(filterType, filterId); // The path total length

    this.pathLength = this.DOM.svg.querySelector('path').getTotalLength(); // SVG element's size/position 

    this.svgRect = this.DOM.svg.getBoundingClientRect(); // this is the svg element top value relative to the document
    // To calculate this, we need to get the top value relative to the viewport and sum the current page scroll

    this.positionY = this.svgRect.top + window.pageYOffset; // Recalculate on window resize

    window.addEventListener('resize', function () {
      _this.svgRect = _this.DOM.svg.getBoundingClientRect();
      _this.positionY = _this.svgRect.top + window.pageYOffset;
    }); // In order to smooth the text animation, we will use linear interpolation to calculate the value of the startOffset
    // "value" is the current interpolated value and "amt" the amount to interpolate

    this.startOffset = {
      value: this.computeOffset(),
      amt: 0.22
    }; // Calculate and set initial startOffset value

    this.startOffset.value = this.computeOffset();
    this.updateTextPathOffset(); // Interpolated scroll value. 
    // This will be used to calculate the text blur value which will change proportionally to the scrolling speed
    // To calculate the speed, we use the distance from the current scroll value to the previous scroll value (or interpolated one)

    this.scroll = {
      value: window.pageYOffset,
      amt: 0.17
    }; // By using the IntersectionObserverAPI to check when the SVG element in inside the viewport, we can avoid calculating and updating the values for the elements outside the viewport

    this.observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        _this.isVisible = entry.intersectionRatio > 0;

        if (!_this.isVisible) {
          _this.entered = false; // reset

          _this.update();
        }
      });
    });
    this.observer.observe(this.DOM.svg); // rAF/loop

    requestAnimationFrame(function () {
      return _this.render();
    });
  } // Calculate the textPath element startOffset value
  // This will allow us to position the text, depending on the current scroll position


  _createClass(TextOnPath, [{
    key: "computeOffset",
    value: function computeOffset() {
      // We want the text to start appearing from the right side of the screen when it comes into the viewport. 
      // This translates into saying that the text startOffset should have it's highest value (total path length) when the svg top value minus the page scroll equals the viewport height and it's lowest value (this case -this.pathLength/2) when it equals 0 (element is on the top part of the viewport)
      return (0, _mathUtils.map)(this.positionY - window.pageYOffset, _winsize.default.height, 0, this.pathLength, -this.pathLength / 2);
    } // Updates the text startOffset value

  }, {
    key: "updateTextPathOffset",
    value: function updateTextPathOffset() {
      this.DOM.textPath.setAttribute('startOffset', this.startOffset.value);
    }
  }, {
    key: "update",
    value: function update() {
      // Calculate and set the interpolated startOffset value
      var currentOffset = this.computeOffset();
      this.startOffset.value = !this.entered ? currentOffset : (0, _mathUtils.lerp)(this.startOffset.value, currentOffset, this.startOffset.amt);
      this.updateTextPathOffset(); // SVG Filter related:
      // The current scroll value

      var currentScroll = window.pageYOffset; // Interpolated scroll value

      this.scroll.value = !this.entered ? currentScroll : (0, _mathUtils.lerp)(this.scroll.value, currentScroll, this.scroll.amt); // Distance between the current and interpolated scroll value

      var distance = Math.abs(this.scroll.value - currentScroll); // Update the filter primitive attribute that changes as the scroll speed increases

      this.filterPrimitive && this.filterPrimitive.update(distance);

      if (!this.entered) {
        this.entered = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.isVisible) {
        this.update();
      } // ...


      requestAnimationFrame(function () {
        return _this2.render();
      });
    }
  }]);

  return TextOnPath;
}();

exports.default = TextOnPath;

var FilterPrimitive = /*#__PURE__*/function () {
  function FilterPrimitive(type, id) {
    _classCallCheck(this, FilterPrimitive);

    this.type = type;
    this.DOM = {
      el: document.querySelector("".concat(id, " > ").concat(this.getPrimitiveType(this.type)))
    };
  }

  _createClass(FilterPrimitive, [{
    key: "getPrimitiveType",
    value: function getPrimitiveType(type) {
      var types = {
        'blur': 'feGaussianBlur',
        'distortion': 'feDisplacementMap'
      };
      return types[type];
    }
  }, {
    key: "update",
    value: function update(distance) {
      var _this3 = this;

      var types = {
        // The blur stdDeviation will be 0 when the distance equals 0 and 10 when the distance equals 400
        'blur': function blur() {
          return _this3.DOM.el.setAttribute('stdDeviation', (0, _mathUtils.clamp)((0, _mathUtils.map)(distance, 0, 400, _this3.DOM.el.dataset.minDeviation || 0, _this3.DOM.el.dataset.maxDeviation || 10), _this3.DOM.el.dataset.minDeviation || 0, _this3.DOM.el.dataset.maxDeviation || 10));
        },
        // The displacementMap scale will be 0 when the distance equals 0 and 100 when the distance equals 200
        'distortion': function distortion() {
          return _this3.DOM.el.scale.baseVal = (0, _mathUtils.clamp)((0, _mathUtils.map)(distance, 0, 200, _this3.DOM.el.dataset.minScale || 0, _this3.DOM.el.dataset.maxScale || 100), _this3.DOM.el.dataset.minScale || 0, _this3.DOM.el.dataset.maxScale || 100);
        }
      };
      return types[this.type]();
    }
  }]);

  return FilterPrimitive;
}();
},{"./mathUtils":"kO4A","./winsize":"IZBA"}],"qLK9":[function(require,module,exports) {
var define;
var global = arguments[3];
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

},{}],"ffUI":[function(require,module,exports) {
var define;
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

},{"ev-emitter":"qLK9"}],"QvaY":[function(require,module,exports) {
"use strict";

var _textOnPath = _interopRequireDefault(require("./textOnPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var imagesLoaded = require('imagesloaded'); // Preload images


var preloadImages = function preloadImages() {
  return new Promise(function (resolve, reject) {
    imagesLoaded(document.querySelectorAll('.grid__item-img, .bigimg'), resolve);
  });
}; // Preload fonts


var preloadFonts = function preloadFonts() {
  return new Promise(function (resolve, reject) {
    WebFont.load({
      typekit: {
        id: 'rhw1vur'
      },
      active: resolve
    });
  });
}; // Preload fonts and images


Promise.all([preloadImages(), preloadFonts()]).then(function () {
  // And then initialize the TextOnScroll instances
  _toConsumableArray(document.querySelectorAll('svg.svgtext')).forEach(function (el) {
    return new _textOnPath.default(el);
  }); // Remove loader (loading class)


  document.body.classList.remove('loading');
});
},{"./textOnPath":"D3xV","imagesloaded":"ffUI"}]},{},["QvaY"], null)