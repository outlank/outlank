"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _xlsx = require("xlsx");

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExcelReader = function () {
  function ExcelReader(source) {
    _classCallCheck(this, ExcelReader);

    this.source = source;
  }

  _createClass(ExcelReader, [{
    key: "read",
    value: function read() {
      var wb = _xlsx2.default.readFile("uploads/sn.xlsx");
      var ws = wb.SheetNames;
      console.log(ws);
    }
  }]);

  return ExcelReader;
}();

exports.default = ExcelReader;


var er = new ExcelReader();
er.read();

//# sourceMappingURL=single-file-debug.js.map