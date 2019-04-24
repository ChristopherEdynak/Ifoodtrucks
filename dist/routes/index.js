'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _ = require('..middleware');

var _2 = _interopRequireDefault(_);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _3 = require('..');

var _4 = _interopRequireDefault(_3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// connect to db
initializeDb(function (db) {

    // internal middleware
    router.use((0, _2.default)({ config: _config2.default, db: db }));

    // api routes v1 (/v1)
});

exports.default = router;
//# sourceMappingURL=index.js.map