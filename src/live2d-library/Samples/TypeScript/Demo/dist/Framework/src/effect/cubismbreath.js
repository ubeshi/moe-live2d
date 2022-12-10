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
exports.Live2DCubismFramework = exports.BreathParameterData = exports.CubismBreath = void 0;
var CubismBreath = (function () {
    function CubismBreath() {
        this._currentTime = 0.0;
    }
    CubismBreath.create = function () {
        return new CubismBreath();
    };
    CubismBreath.delete = function (instance) {
        if (instance != null) {
            instance = null;
        }
    };
    CubismBreath.prototype.setParameters = function (breathParameters) {
        this._breathParameters = breathParameters;
    };
    CubismBreath.prototype.getParameters = function () {
        return this._breathParameters;
    };
    CubismBreath.prototype.updateParameters = function (model, deltaTimeSeconds) {
        this._currentTime += deltaTimeSeconds;
        var t = this._currentTime * 2.0 * 3.14159;
        for (var i = 0; i < this._breathParameters.getSize(); ++i) {
            var data = this._breathParameters.at(i);
            model.addParameterValueById(data.parameterId, data.offset + data.peak * Math.sin(t / data.cycle), data.weight);
        }
    };
    return CubismBreath;
}());
exports.CubismBreath = CubismBreath;
var BreathParameterData = (function () {
    function BreathParameterData(parameterId, offset, peak, cycle, weight) {
        this.parameterId = parameterId == undefined ? null : parameterId;
        this.offset = offset == undefined ? 0.0 : offset;
        this.peak = peak == undefined ? 0.0 : peak;
        this.cycle = cycle == undefined ? 0.0 : cycle;
        this.weight = weight == undefined ? 0.0 : weight;
    }
    return BreathParameterData;
}());
exports.BreathParameterData = BreathParameterData;
var $ = __importStar(require("./cubismbreath"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.BreathParameterData = $.BreathParameterData;
    Live2DCubismFramework.CubismBreath = $.CubismBreath;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismbreath.js.map