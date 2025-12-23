"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDV4 = exports.criptography = void 0;
var crypto = require("crypto");
exports.criptography = {
    crip: function (h) {
        var hashCode = crypto.createHash('sha256').update(h);
        return hashCode.digest('hex');
    }
};
var UUIDV4 = function () { return crypto.randomUUID(); };
exports.UUIDV4 = UUIDV4;
