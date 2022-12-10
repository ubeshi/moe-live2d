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
exports.Live2DCubismFramework = exports.CubismTextureColor = exports.CubismBlendMode = exports.CubismRenderer = void 0;
var cubismmatrix44_1 = require("../math/cubismmatrix44");
var CubismRenderer = (function () {
    function CubismRenderer() {
        this._isCulling = false;
        this._isPremultipliedAlpha = false;
        this._anisotropy = 0.0;
        this._model = null;
        this._modelColor = new CubismTextureColor();
        this._mvpMatrix4x4 = new cubismmatrix44_1.CubismMatrix44();
        this._mvpMatrix4x4.loadIdentity();
    }
    CubismRenderer.create = function () {
        return null;
    };
    CubismRenderer.delete = function (renderer) {
        renderer = null;
    };
    CubismRenderer.prototype.initialize = function (model) {
        this._model = model;
    };
    CubismRenderer.prototype.drawModel = function () {
        if (this.getModel() == null)
            return;
        this.doDrawModel();
    };
    CubismRenderer.prototype.setMvpMatrix = function (matrix44) {
        this._mvpMatrix4x4.setMatrix(matrix44.getArray());
    };
    CubismRenderer.prototype.getMvpMatrix = function () {
        return this._mvpMatrix4x4;
    };
    CubismRenderer.prototype.setModelColor = function (red, green, blue, alpha) {
        if (red < 0.0) {
            red = 0.0;
        }
        else if (red > 1.0) {
            red = 1.0;
        }
        if (green < 0.0) {
            green = 0.0;
        }
        else if (green > 1.0) {
            green = 1.0;
        }
        if (blue < 0.0) {
            blue = 0.0;
        }
        else if (blue > 1.0) {
            blue = 1.0;
        }
        if (alpha < 0.0) {
            alpha = 0.0;
        }
        else if (alpha > 1.0) {
            alpha = 1.0;
        }
        this._modelColor.R = red;
        this._modelColor.G = green;
        this._modelColor.B = blue;
        this._modelColor.A = alpha;
    };
    CubismRenderer.prototype.getModelColor = function () {
        return JSON.parse(JSON.stringify(this._modelColor));
    };
    CubismRenderer.prototype.setIsPremultipliedAlpha = function (enable) {
        this._isPremultipliedAlpha = enable;
    };
    CubismRenderer.prototype.isPremultipliedAlpha = function () {
        return this._isPremultipliedAlpha;
    };
    CubismRenderer.prototype.setIsCulling = function (culling) {
        this._isCulling = culling;
    };
    CubismRenderer.prototype.isCulling = function () {
        return this._isCulling;
    };
    CubismRenderer.prototype.setAnisotropy = function (n) {
        this._anisotropy = n;
    };
    CubismRenderer.prototype.getAnisotropy = function () {
        return this._anisotropy;
    };
    CubismRenderer.prototype.getModel = function () {
        return this._model;
    };
    return CubismRenderer;
}());
exports.CubismRenderer = CubismRenderer;
var CubismBlendMode;
(function (CubismBlendMode) {
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative";
})(CubismBlendMode = exports.CubismBlendMode || (exports.CubismBlendMode = {}));
var CubismTextureColor = (function () {
    function CubismTextureColor() {
        this.R = 1.0;
        this.G = 1.0;
        this.B = 1.0;
        this.A = 1.0;
    }
    return CubismTextureColor;
}());
exports.CubismTextureColor = CubismTextureColor;
var $ = __importStar(require("./cubismrenderer"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismBlendMode = $.CubismBlendMode;
    Live2DCubismFramework.CubismRenderer = $.CubismRenderer;
    Live2DCubismFramework.CubismTextureColor = $.CubismTextureColor;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismrenderer.js.map