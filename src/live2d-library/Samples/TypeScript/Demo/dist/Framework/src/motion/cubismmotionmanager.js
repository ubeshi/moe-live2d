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
exports.Live2DCubismFramework = exports.CubismMotionManager = void 0;
var cubismmotionqueuemanager_1 = require("./cubismmotionqueuemanager");
var CubismMotionManager = (function (_super) {
    __extends(CubismMotionManager, _super);
    function CubismMotionManager() {
        var _this = _super.call(this) || this;
        _this._currentPriority = 0;
        _this._reservePriority = 0;
        return _this;
    }
    CubismMotionManager.prototype.getCurrentPriority = function () {
        return this._currentPriority;
    };
    CubismMotionManager.prototype.getReservePriority = function () {
        return this._reservePriority;
    };
    CubismMotionManager.prototype.setReservePriority = function (val) {
        this._reservePriority = val;
    };
    CubismMotionManager.prototype.startMotionPriority = function (motion, autoDelete, priority) {
        if (priority == this._reservePriority) {
            this._reservePriority = 0;
        }
        this._currentPriority = priority;
        return _super.prototype.startMotion.call(this, motion, autoDelete, this._userTimeSeconds);
    };
    CubismMotionManager.prototype.updateMotion = function (model, deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        var updated = _super.prototype.doUpdateMotion.call(this, model, this._userTimeSeconds);
        if (this.isFinished()) {
            this._currentPriority = 0;
        }
        return updated;
    };
    CubismMotionManager.prototype.reserveMotion = function (priority) {
        if (priority <= this._reservePriority ||
            priority <= this._currentPriority) {
            return false;
        }
        this._reservePriority = priority;
        return true;
    };
    return CubismMotionManager;
}(cubismmotionqueuemanager_1.CubismMotionQueueManager));
exports.CubismMotionManager = CubismMotionManager;
var $ = __importStar(require("./cubismmotionmanager"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionManager = $.CubismMotionManager;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmotionmanager.js.map