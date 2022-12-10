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
exports.Live2DCubismFramework = exports.CubismModel = exports.DrawableColorData = void 0;
var live2dcubismframework_1 = require("../live2dcubismframework");
var cubismrenderer_1 = require("../rendering/cubismrenderer");
var csmmap_1 = require("../type/csmmap");
var csmvector_1 = require("../type/csmvector");
var cubismdebug_1 = require("../utils/cubismdebug");
var DrawableColorData = (function () {
    function DrawableColorData() {
        this.isOverwritten = false;
        this.Color = new cubismrenderer_1.CubismTextureColor();
    }
    return DrawableColorData;
}());
exports.DrawableColorData = DrawableColorData;
var CubismModel = (function () {
    function CubismModel(model) {
        this._model = model;
        this._parameterValues = null;
        this._parameterMaximumValues = null;
        this._parameterMinimumValues = null;
        this._partOpacities = null;
        this._savedParameters = new csmvector_1.csmVector();
        this._parameterIds = new csmvector_1.csmVector();
        this._drawableIds = new csmvector_1.csmVector();
        this._partIds = new csmvector_1.csmVector();
        this._isOverwrittenModelMultiplyColors = false;
        this._isOverwrittenModelScreenColors = false;
        this._userMultiplyColors = null;
        this._userScreenColors = null;
        this._notExistPartId = new csmmap_1.csmMap();
        this._notExistParameterId = new csmmap_1.csmMap();
        this._notExistParameterValues = new csmmap_1.csmMap();
        this._notExistPartOpacities = new csmmap_1.csmMap();
    }
    CubismModel.prototype.update = function () {
        this._model.update();
        this._model.drawables.resetDynamicFlags();
    };
    CubismModel.prototype.getCanvasWidth = function () {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit);
    };
    CubismModel.prototype.getCanvasHeight = function () {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit);
    };
    CubismModel.prototype.saveParameters = function () {
        var parameterCount = this._model.parameters.count;
        var savedParameterCount = this._savedParameters.getSize();
        for (var i = 0; i < parameterCount; ++i) {
            if (i < savedParameterCount) {
                this._savedParameters.set(i, this._parameterValues[i]);
            }
            else {
                this._savedParameters.pushBack(this._parameterValues[i]);
            }
        }
    };
    CubismModel.prototype.getMultiplyColor = function (index) {
        if (this.getOverwriteFlagForModelMultiplyColors() ||
            this.getOverwriteFlagForDrawableMultiplyColors(index)) {
            return this._userMultiplyColors.at(index).Color;
        }
        var color = this.getDrawableMultiplyColor(index);
        return color;
    };
    CubismModel.prototype.getScreenColor = function (index) {
        if (this.getOverwriteFlagForModelScreenColors() ||
            this.getOverwriteFlagForDrawableScreenColors(index)) {
            return this._userScreenColors.at(index).Color;
        }
        var color = this.getDrawableScreenColor(index);
        return color;
    };
    CubismModel.prototype.setMultiplyColorByTextureColor = function (index, color) {
        this.setMultiplyColorByRGBA(index, color.R, color.G, color.B, color.A);
    };
    CubismModel.prototype.setMultiplyColorByRGBA = function (index, r, g, b, a) {
        if (a === void 0) { a = 1.0; }
        this._userMultiplyColors.at(index).Color.R = r;
        this._userMultiplyColors.at(index).Color.G = g;
        this._userMultiplyColors.at(index).Color.B = b;
        this._userMultiplyColors.at(index).Color.A = a;
    };
    CubismModel.prototype.setScreenColorByTextureColor = function (index, color) {
        this.setScreenColorByRGBA(index, color.R, color.G, color.B, color.A);
    };
    CubismModel.prototype.setScreenColorByRGBA = function (index, r, g, b, a) {
        if (a === void 0) { a = 1.0; }
        this._userScreenColors.at(index).Color.R = r;
        this._userScreenColors.at(index).Color.G = g;
        this._userScreenColors.at(index).Color.B = b;
        this._userScreenColors.at(index).Color.A = a;
    };
    CubismModel.prototype.getOverwriteFlagForModelMultiplyColors = function () {
        return this._isOverwrittenModelMultiplyColors;
    };
    CubismModel.prototype.getOverwriteFlagForModelScreenColors = function () {
        return this._isOverwrittenModelScreenColors;
    };
    CubismModel.prototype.setOverwriteFlagForModelMultiplyColors = function (value) {
        this._isOverwrittenModelMultiplyColors = value;
    };
    CubismModel.prototype.setOverwriteFlagForModelScreenColors = function (value) {
        this._isOverwrittenModelScreenColors = value;
    };
    CubismModel.prototype.getOverwriteFlagForDrawableMultiplyColors = function (drawableindex) {
        return this._userMultiplyColors.at(drawableindex).isOverwritten;
    };
    CubismModel.prototype.getOverwriteFlagForDrawableScreenColors = function (drawableindex) {
        return this._userMultiplyColors.at(drawableindex).isOverwritten;
    };
    CubismModel.prototype.setOverwriteFlagForDrawableMultiplyColors = function (drawableindex, value) {
        this._userMultiplyColors.at(drawableindex).isOverwritten = value;
    };
    CubismModel.prototype.setOverwriteFlagForDrawableScreenColors = function (drawableindex, value) {
        this._userScreenColors.at(drawableindex).isOverwritten = value;
    };
    CubismModel.prototype.getModel = function () {
        return this._model;
    };
    CubismModel.prototype.getPartIndex = function (partId) {
        var partIndex;
        var partCount = this._model.parts.count;
        for (partIndex = 0; partIndex < partCount; ++partIndex) {
            if (partId == this._partIds.at(partIndex)) {
                return partIndex;
            }
        }
        if (this._notExistPartId.isExist(partId)) {
            return this._notExistPartId.getValue(partId);
        }
        partIndex = partCount + this._notExistPartId.getSize();
        this._notExistPartId.setValue(partId, partIndex);
        this._notExistPartOpacities.appendKey(partIndex);
        return partIndex;
    };
    CubismModel.prototype.getPartCount = function () {
        var partCount = this._model.parts.count;
        return partCount;
    };
    CubismModel.prototype.setPartOpacityByIndex = function (partIndex, opacity) {
        if (this._notExistPartOpacities.isExist(partIndex)) {
            this._notExistPartOpacities.setValue(partIndex, opacity);
            return;
        }
        (0, cubismdebug_1.CSM_ASSERT)(0 <= partIndex && partIndex < this.getPartCount());
        this._partOpacities[partIndex] = opacity;
    };
    CubismModel.prototype.setPartOpacityById = function (partId, opacity) {
        var index = this.getPartIndex(partId);
        if (index < 0) {
            return;
        }
        this.setPartOpacityByIndex(index, opacity);
    };
    CubismModel.prototype.getPartOpacityByIndex = function (partIndex) {
        if (this._notExistPartOpacities.isExist(partIndex)) {
            return this._notExistPartOpacities.getValue(partIndex);
        }
        (0, cubismdebug_1.CSM_ASSERT)(0 <= partIndex && partIndex < this.getPartCount());
        return this._partOpacities[partIndex];
    };
    CubismModel.prototype.getPartOpacityById = function (partId) {
        var index = this.getPartIndex(partId);
        if (index < 0) {
            return 0;
        }
        return this.getPartOpacityByIndex(index);
    };
    CubismModel.prototype.getParameterIndex = function (parameterId) {
        var parameterIndex;
        var idCount = this._model.parameters.count;
        for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
            if (parameterId != this._parameterIds.at(parameterIndex)) {
                continue;
            }
            return parameterIndex;
        }
        if (this._notExistParameterId.isExist(parameterId)) {
            return this._notExistParameterId.getValue(parameterId);
        }
        parameterIndex =
            this._model.parameters.count + this._notExistParameterId.getSize();
        this._notExistParameterId.setValue(parameterId, parameterIndex);
        this._notExistParameterValues.appendKey(parameterIndex);
        return parameterIndex;
    };
    CubismModel.prototype.getParameterCount = function () {
        return this._model.parameters.count;
    };
    CubismModel.prototype.getParameterType = function (parameterIndex) {
        return this._model.parameters.types[parameterIndex];
    };
    CubismModel.prototype.getParameterMaximumValue = function (parameterIndex) {
        return this._model.parameters.maximumValues[parameterIndex];
    };
    CubismModel.prototype.getParameterMinimumValue = function (parameterIndex) {
        return this._model.parameters.minimumValues[parameterIndex];
    };
    CubismModel.prototype.getParameterDefaultValue = function (parameterIndex) {
        return this._model.parameters.defaultValues[parameterIndex];
    };
    CubismModel.prototype.getParameterValueByIndex = function (parameterIndex) {
        if (this._notExistParameterValues.isExist(parameterIndex)) {
            return this._notExistParameterValues.getValue(parameterIndex);
        }
        (0, cubismdebug_1.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        return this._parameterValues[parameterIndex];
    };
    CubismModel.prototype.getParameterValueById = function (parameterId) {
        var parameterIndex = this.getParameterIndex(parameterId);
        return this.getParameterValueByIndex(parameterIndex);
    };
    CubismModel.prototype.setParameterValueByIndex = function (parameterIndex, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        if (this._notExistParameterValues.isExist(parameterIndex)) {
            this._notExistParameterValues.setValue(parameterIndex, weight == 1
                ? value
                : this._notExistParameterValues.getValue(parameterIndex) *
                    (1 - weight) +
                    value * weight);
            return;
        }
        (0, cubismdebug_1.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        if (this._model.parameters.maximumValues[parameterIndex] < value) {
            value = this._model.parameters.maximumValues[parameterIndex];
        }
        if (this._model.parameters.minimumValues[parameterIndex] > value) {
            value = this._model.parameters.minimumValues[parameterIndex];
        }
        this._parameterValues[parameterIndex] =
            weight == 1
                ? value
                : (this._parameterValues[parameterIndex] =
                    this._parameterValues[parameterIndex] * (1 - weight) +
                        value * weight);
    };
    CubismModel.prototype.setParameterValueById = function (parameterId, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        var index = this.getParameterIndex(parameterId);
        this.setParameterValueByIndex(index, value, weight);
    };
    CubismModel.prototype.addParameterValueByIndex = function (parameterIndex, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) + value * weight);
    };
    CubismModel.prototype.addParameterValueById = function (parameterId, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        var index = this.getParameterIndex(parameterId);
        this.addParameterValueByIndex(index, value, weight);
    };
    CubismModel.prototype.multiplyParameterValueById = function (parameterId, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        var index = this.getParameterIndex(parameterId);
        this.multiplyParameterValueByIndex(index, value, weight);
    };
    CubismModel.prototype.multiplyParameterValueByIndex = function (parameterIndex, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) *
            (1.0 + (value - 1.0) * weight));
    };
    CubismModel.prototype.getDrawableIndex = function (drawableId) {
        var drawableCount = this._model.drawables.count;
        for (var drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
            if (this._drawableIds.at(drawableIndex) == drawableId) {
                return drawableIndex;
            }
        }
        return -1;
    };
    CubismModel.prototype.getDrawableCount = function () {
        var drawableCount = this._model.drawables.count;
        return drawableCount;
    };
    CubismModel.prototype.getDrawableId = function (drawableIndex) {
        var parameterIds = this._model.drawables.ids;
        return live2dcubismframework_1.CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
    };
    CubismModel.prototype.getDrawableRenderOrders = function () {
        var renderOrders = this._model.drawables.renderOrders;
        return renderOrders;
    };
    CubismModel.prototype.getDrawableTextureIndices = function (drawableIndex) {
        return this.getDrawableTextureIndex(drawableIndex);
    };
    CubismModel.prototype.getDrawableTextureIndex = function (drawableIndex) {
        var textureIndices = this._model.drawables.textureIndices;
        return textureIndices[drawableIndex];
    };
    CubismModel.prototype.getDrawableDynamicFlagVertexPositionsDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
    };
    CubismModel.prototype.getDrawableVertexIndexCount = function (drawableIndex) {
        var indexCounts = this._model.drawables.indexCounts;
        return indexCounts[drawableIndex];
    };
    CubismModel.prototype.getDrawableVertexCount = function (drawableIndex) {
        var vertexCounts = this._model.drawables.vertexCounts;
        return vertexCounts[drawableIndex];
    };
    CubismModel.prototype.getDrawableVertices = function (drawableIndex) {
        return this.getDrawableVertexPositions(drawableIndex);
    };
    CubismModel.prototype.getDrawableVertexIndices = function (drawableIndex) {
        var indicesArray = this._model.drawables.indices;
        return indicesArray[drawableIndex];
    };
    CubismModel.prototype.getDrawableVertexPositions = function (drawableIndex) {
        var verticesArray = this._model.drawables.vertexPositions;
        return verticesArray[drawableIndex];
    };
    CubismModel.prototype.getDrawableVertexUvs = function (drawableIndex) {
        var uvsArray = this._model.drawables.vertexUvs;
        return uvsArray[drawableIndex];
    };
    CubismModel.prototype.getDrawableOpacity = function (drawableIndex) {
        var opacities = this._model.drawables.opacities;
        return opacities[drawableIndex];
    };
    CubismModel.prototype.getDrawableMultiplyColor = function (drawableIndex) {
        var multiplyColors = this._model.drawables.multiplyColors;
        var index = drawableIndex * 4;
        var multiplyColor = new cubismrenderer_1.CubismTextureColor();
        multiplyColor.R = multiplyColors[index];
        multiplyColor.G = multiplyColors[index + 1];
        multiplyColor.B = multiplyColors[index + 2];
        multiplyColor.A = multiplyColors[index + 3];
        return multiplyColor;
    };
    CubismModel.prototype.getDrawableScreenColor = function (drawableIndex) {
        var screenColors = this._model.drawables.screenColors;
        var index = drawableIndex * 4;
        var screenColor = new cubismrenderer_1.CubismTextureColor();
        screenColor.R = screenColors[index];
        screenColor.G = screenColors[index + 1];
        screenColor.B = screenColors[index + 2];
        screenColor.A = screenColors[index + 3];
        return screenColor;
    };
    CubismModel.prototype.getDrawableParentPartIndex = function (drawableIndex) {
        return this._model.drawables.parentPartIndices[drawableIndex];
    };
    CubismModel.prototype.getDrawableCulling = function (drawableIndex) {
        var constantFlags = this._model.drawables.constantFlags;
        return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
    };
    CubismModel.prototype.getDrawableBlendMode = function (drawableIndex) {
        var constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex])
            ? cubismrenderer_1.CubismBlendMode.CubismBlendMode_Additive
            : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex])
                ? cubismrenderer_1.CubismBlendMode.CubismBlendMode_Multiplicative
                : cubismrenderer_1.CubismBlendMode.CubismBlendMode_Normal;
    };
    CubismModel.prototype.getDrawableInvertedMaskBit = function (drawableIndex) {
        var constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[drawableIndex]);
    };
    CubismModel.prototype.getDrawableMasks = function () {
        var masks = this._model.drawables.masks;
        return masks;
    };
    CubismModel.prototype.getDrawableMaskCounts = function () {
        var maskCounts = this._model.drawables.maskCounts;
        return maskCounts;
    };
    CubismModel.prototype.isUsingMasking = function () {
        for (var d = 0; d < this._model.drawables.count; ++d) {
            if (this._model.drawables.maskCounts[d] <= 0) {
                continue;
            }
            return true;
        }
        return false;
    };
    CubismModel.prototype.getDrawableDynamicFlagIsVisible = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
    };
    CubismModel.prototype.getDrawableDynamicFlagVisibilityDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
    };
    CubismModel.prototype.getDrawableDynamicFlagOpacityDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
    };
    CubismModel.prototype.getDrawableDynamicFlagRenderOrderDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
    };
    CubismModel.prototype.getDrawableDynamicFlagBlendColorDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(dynamicFlags[drawableIndex]);
    };
    CubismModel.prototype.loadParameters = function () {
        var parameterCount = this._model.parameters.count;
        var savedParameterCount = this._savedParameters.getSize();
        if (parameterCount > savedParameterCount) {
            parameterCount = savedParameterCount;
        }
        for (var i = 0; i < parameterCount; ++i) {
            this._parameterValues[i] = this._savedParameters.at(i);
        }
    };
    CubismModel.prototype.initialize = function () {
        (0, cubismdebug_1.CSM_ASSERT)(this._model);
        this._parameterValues = this._model.parameters.values;
        this._partOpacities = this._model.parts.opacities;
        this._parameterMaximumValues = this._model.parameters.maximumValues;
        this._parameterMinimumValues = this._model.parameters.minimumValues;
        {
            var parameterIds = this._model.parameters.ids;
            var parameterCount = this._model.parameters.count;
            this._parameterIds.prepareCapacity(parameterCount);
            for (var i = 0; i < parameterCount; ++i) {
                this._parameterIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(parameterIds[i]));
            }
        }
        {
            var partIds = this._model.parts.ids;
            var partCount = this._model.parts.count;
            this._partIds.prepareCapacity(partCount);
            for (var i = 0; i < partCount; ++i) {
                this._partIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(partIds[i]));
            }
        }
        {
            var drawableIds = this._model.drawables.ids;
            var drawableCount = this._model.drawables.count;
            this._userMultiplyColors = new csmvector_1.csmVector();
            this._userMultiplyColors.updateSize(drawableCount, DrawableColorData, true);
            this._userScreenColors = new csmvector_1.csmVector();
            this._userScreenColors.updateSize(drawableCount, DrawableColorData, true);
            this._drawableIds.prepareCapacity(drawableCount);
            for (var i = 0; i < drawableCount; ++i) {
                this._drawableIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(drawableIds[i]));
                this.setMultiplyColorByRGBA(i, 1.0, 1.0, 1.0, 1.0);
                this.setScreenColorByRGBA(i, 0.0, 0.0, 0.0, 1.0);
            }
        }
    };
    CubismModel.prototype.release = function () {
        this._model.release();
        this._model = null;
    };
    return CubismModel;
}());
exports.CubismModel = CubismModel;
var $ = __importStar(require("./cubismmodel"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModel = $.CubismModel;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmodel.js.map