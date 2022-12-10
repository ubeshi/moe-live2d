"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Live2DCubismFramework = exports.ExpressionParameter = exports.ExpressionBlendType = exports.CubismExpressionMotion = void 0;
var live2dcubismframework_1 = require("../live2dcubismframework");
var csmvector_1 = require("../type/csmvector");
var cubismjson_1 = require("../utils/cubismjson");
var acubismmotion_1 = require("./acubismmotion");
var ExpressionKeyFadeIn = 'FadeInTime';
var ExpressionKeyFadeOut = 'FadeOutTime';
var ExpressionKeyParameters = 'Parameters';
var ExpressionKeyId = 'Id';
var ExpressionKeyValue = 'Value';
var ExpressionKeyBlend = 'Blend';
var BlendValueAdd = 'Add';
var BlendValueMultiply = 'Multiply';
var BlendValueOverwrite = 'Overwrite';
var DefaultFadeTime = 1.0;
var CubismExpressionMotion = (function (_super) {
    __extends(CubismExpressionMotion, _super);
    function CubismExpressionMotion() {
        var _this = _super.call(this) || this;
        _this._parameters = new csmvector_1.csmVector();
        return _this;
    }
    CubismExpressionMotion.create = function (buffer, size) {
        var expression = new CubismExpressionMotion();
        var json = cubismjson_1.CubismJson.create(buffer, size);
        var root = json.getRoot();
        expression.setFadeInTime(root.getValueByString(ExpressionKeyFadeIn).toFloat(DefaultFadeTime));
        expression.setFadeOutTime(root.getValueByString(ExpressionKeyFadeOut).toFloat(DefaultFadeTime));
        var parameterCount = root
            .getValueByString(ExpressionKeyParameters)
            .getSize();
        expression._parameters.prepareCapacity(parameterCount);
        for (var i = 0; i < parameterCount; ++i) {
            var param = root
                .getValueByString(ExpressionKeyParameters)
                .getValueByIndex(i);
            var parameterId = live2dcubismframework_1.CubismFramework.getIdManager().getId(param.getValueByString(ExpressionKeyId).getRawString());
            var value = param
                .getValueByString(ExpressionKeyValue)
                .toFloat();
            var blendType = void 0;
            if (param.getValueByString(ExpressionKeyBlend).isNull() ||
                param.getValueByString(ExpressionKeyBlend).getString() == BlendValueAdd) {
                blendType = ExpressionBlendType.ExpressionBlendType_Add;
            }
            else if (param.getValueByString(ExpressionKeyBlend).getString() ==
                BlendValueMultiply) {
                blendType = ExpressionBlendType.ExpressionBlendType_Multiply;
            }
            else if (param.getValueByString(ExpressionKeyBlend).getString() ==
                BlendValueOverwrite) {
                blendType = ExpressionBlendType.ExpressionBlendType_Overwrite;
            }
            else {
                blendType = ExpressionBlendType.ExpressionBlendType_Add;
            }
            var item = new ExpressionParameter();
            item.parameterId = parameterId;
            item.blendType = blendType;
            item.value = value;
            expression._parameters.pushBack(item);
        }
        cubismjson_1.CubismJson.delete(json);
        return expression;
    };
    CubismExpressionMotion.prototype.doUpdateParameters = function (model, userTimeSeconds, weight, motionQueueEntry) {
        for (var i = 0; i < this._parameters.getSize(); ++i) {
            var parameter = this._parameters.at(i);
            switch (parameter.blendType) {
                case ExpressionBlendType.ExpressionBlendType_Add: {
                    model.addParameterValueById(parameter.parameterId, parameter.value, weight);
                    break;
                }
                case ExpressionBlendType.ExpressionBlendType_Multiply: {
                    model.multiplyParameterValueById(parameter.parameterId, parameter.value, weight);
                    break;
                }
                case ExpressionBlendType.ExpressionBlendType_Overwrite: {
                    model.setParameterValueById(parameter.parameterId, parameter.value, weight);
                    break;
                }
                default:
                    break;
            }
        }
    };
    return CubismExpressionMotion;
}(acubismmotion_1.ACubismMotion));
exports.CubismExpressionMotion = CubismExpressionMotion;
var ExpressionBlendType;
(function (ExpressionBlendType) {
    ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Add"] = 0] = "ExpressionBlendType_Add";
    ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Multiply"] = 1] = "ExpressionBlendType_Multiply";
    ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Overwrite"] = 2] = "ExpressionBlendType_Overwrite";
})(ExpressionBlendType = exports.ExpressionBlendType || (exports.ExpressionBlendType = {}));
var ExpressionParameter = (function () {
    function ExpressionParameter() {
    }
    return ExpressionParameter;
}());
exports.ExpressionParameter = ExpressionParameter;
var $ = __importStar(require("./cubismexpressionmotion"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismExpressionMotion = $.CubismExpressionMotion;
    Live2DCubismFramework.ExpressionBlendType = $.ExpressionBlendType;
    Live2DCubismFramework.ExpressionParameter = $.ExpressionParameter;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismexpressionmotion.js.map