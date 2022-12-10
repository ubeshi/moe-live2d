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
exports.Live2DCubismFramework = exports.CubismModelUserDataJson = void 0;
var live2dcubismframework_1 = require("../live2dcubismframework");
var cubismjson_1 = require("../utils/cubismjson");
var Meta = 'Meta';
var UserDataCount = 'UserDataCount';
var TotalUserDataSize = 'TotalUserDataSize';
var UserData = 'UserData';
var Target = 'Target';
var Id = 'Id';
var Value = 'Value';
var CubismModelUserDataJson = (function () {
    function CubismModelUserDataJson(buffer, size) {
        this._json = cubismjson_1.CubismJson.create(buffer, size);
    }
    CubismModelUserDataJson.prototype.release = function () {
        cubismjson_1.CubismJson.delete(this._json);
    };
    CubismModelUserDataJson.prototype.getUserDataCount = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(UserDataCount)
            .toInt();
    };
    CubismModelUserDataJson.prototype.getTotalUserDataSize = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalUserDataSize)
            .toInt();
    };
    CubismModelUserDataJson.prototype.getUserDataTargetType = function (i) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Target)
            .getRawString();
    };
    CubismModelUserDataJson.prototype.getUserDataId = function (i) {
        return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Id)
            .getRawString());
    };
    CubismModelUserDataJson.prototype.getUserDataValue = function (i) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Value)
            .getRawString();
    };
    return CubismModelUserDataJson;
}());
exports.CubismModelUserDataJson = CubismModelUserDataJson;
var $ = __importStar(require("./cubismmodeluserdatajson"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelUserDataJson = $.CubismModelUserDataJson;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmodeluserdatajson.js.map