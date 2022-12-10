"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Live2DCubismFramework = exports.csmString = void 0;
var csmString = (function () {
    function csmString(s) {
        this.s = s;
    }
    csmString.prototype.append = function (c, length) {
        this.s += length !== undefined ? c.substr(0, length) : c;
        return this;
    };
    csmString.prototype.expansion = function (length, v) {
        for (var i = 0; i < length; i++) {
            this.append(v);
        }
        return this;
    };
    csmString.prototype.getBytes = function () {
        return encodeURIComponent(this.s).replace(/%../g, 'x').length;
    };
    csmString.prototype.getLength = function () {
        return this.s.length;
    };
    csmString.prototype.isLess = function (s) {
        return this.s < s.s;
    };
    csmString.prototype.isGreat = function (s) {
        return this.s > s.s;
    };
    csmString.prototype.isEqual = function (s) {
        return this.s == s;
    };
    csmString.prototype.isEmpty = function () {
        return this.s.length == 0;
    };
    return csmString;
}());
exports.csmString = csmString;
var $ = __importStar(require("./csmstring"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.csmString = $.csmString;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=csmstring.js.map