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
exports.Live2DCubismFramework = exports.CubismIdManager = void 0;
var csmvector_1 = require("../type/csmvector");
var cubismid_1 = require("./cubismid");
var CubismIdManager = (function () {
    function CubismIdManager() {
        this._ids = new csmvector_1.csmVector();
    }
    CubismIdManager.prototype.release = function () {
        for (var i = 0; i < this._ids.getSize(); ++i) {
            this._ids.set(i, void 0);
        }
        this._ids = null;
    };
    CubismIdManager.prototype.registerIds = function (ids) {
        for (var i = 0; i < ids.length; i++) {
            this.registerId(ids[i]);
        }
    };
    CubismIdManager.prototype.registerId = function (id) {
        var result = null;
        if ('string' == typeof id) {
            if ((result = this.findId(id)) != null) {
                return result;
            }
            result = new cubismid_1.CubismId(id);
            this._ids.pushBack(result);
        }
        else {
            return this.registerId(id.s);
        }
        return result;
    };
    CubismIdManager.prototype.getId = function (id) {
        return this.registerId(id);
    };
    CubismIdManager.prototype.isExist = function (id) {
        if ('string' == typeof id) {
            return this.findId(id) != null;
        }
        return this.isExist(id.s);
    };
    CubismIdManager.prototype.findId = function (id) {
        for (var i = 0; i < this._ids.getSize(); ++i) {
            if (this._ids.at(i).getString().isEqual(id)) {
                return this._ids.at(i);
            }
        }
        return null;
    };
    return CubismIdManager;
}());
exports.CubismIdManager = CubismIdManager;
var $ = __importStar(require("./cubismidmanager"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismIdManager = $.CubismIdManager;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismidmanager.js.map