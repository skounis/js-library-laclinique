!function(){"use strict";function _defineProperties(e,o){for(var r=0;r<o.length;r++){var t=o[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,o,r){return o&&_defineProperties(e.prototype,o),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var lib=function(){this.myVar=!0,this.myArrowMethod=function(){console.log("Arrow method fired")};var e=this.myArrowMethod,o=this.myVar;console.log("Lib constructor called",o),e()},e=_createClass((function App(){!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,App),this.demoArrowMethod=function(){console.log("Arrow methods will work")};var e=new lib;console.log("Demo loaded!",e),this.demoArrowMethod()}));new e}();
//# sourceMappingURL=index.js.map