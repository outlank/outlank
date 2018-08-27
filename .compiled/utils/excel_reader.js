"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require("fs");

var ExcelReader = function () {
  function ExcelReader(source) {
    _classCallCheck(this, ExcelReader);

    this.source = source;
  }

  _createClass(ExcelReader, [{
    key: "read",
    value: function read() {
      fs.readFile("../uploads/sn.xlsx", function (err, data) {
        if (err) throw err;
        console.log(data);
      });
    }
  }]);

  return ExcelReader;
}();

exports.default = ExcelReader;
//# sourceMappingURL=excel_reader.js.map