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
exports.Live2DCubismFramework = exports.CubismMoc = void 0;
var cubismdebug_1 = require("../utils/cubismdebug");
var cubismmodel_1 = require("./cubismmodel");
var CubismMoc = (function () {
    function CubismMoc(moc) {
        this._moc = moc;
        this._modelCount = 0;
        this._mocVersion = 0;
    }
    CubismMoc.create = function (mocBytes) {
        var cubismMoc = null;
        var moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
        if (moc) {
            cubismMoc = new CubismMoc(moc);
            cubismMoc._mocVersion = Live2DCubismCore.Version.csmGetMocVersion(moc, mocBytes);
        }
        return cubismMoc;
    };
    CubismMoc.delete = function (moc) {
        moc._moc._release();
        moc._moc = null;
        moc = null;
    };
    CubismMoc.prototype.createModel = function () {
        var cubismModel = null;
        var model = Live2DCubismCore.Model.fromMoc(this._moc);
        if (model) {
            cubismModel = new cubismmodel_1.CubismModel(model);
            cubismModel.initialize();
            ++this._modelCount;
        }
        return cubismModel;
    };
    CubismMoc.prototype.deleteModel = function (model) {
        if (model != null) {
            model.release();
            model = null;
            --this._modelCount;
        }
    };
    CubismMoc.prototype.release = function () {
        (0, cubismdebug_1.CSM_ASSERT)(this._modelCount == 0);
        this._moc._release();
        this._moc = null;
    };
    CubismMoc.prototype.getLatestMocVersion = function () {
        return Live2DCubismCore.Version.csmGetLatestMocVersion();
    };
    CubismMoc.prototype.getMocVersion = function () {
        return this._mocVersion;
    };
    return CubismMoc;
}());
exports.CubismMoc = CubismMoc;
var $ = __importStar(require("./cubismmoc"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMoc = $.CubismMoc;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmoc.js.map