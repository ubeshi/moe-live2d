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
exports.Live2DCubismFramework = exports.CubismMotionQueueEntry = void 0;
var acubismmotion_1 = require("./acubismmotion");
var CubismMotionQueueEntry = (function () {
    function CubismMotionQueueEntry() {
        this._autoDelete = false;
        this._motion = null;
        this._available = true;
        this._finished = false;
        this._started = false;
        this._startTimeSeconds = -1.0;
        this._fadeInStartTimeSeconds = 0.0;
        this._endTimeSeconds = -1.0;
        this._stateTimeSeconds = 0.0;
        this._stateWeight = 0.0;
        this._lastEventCheckSeconds = 0.0;
        this._motionQueueEntryHandle = this;
        this._fadeOutSeconds = 0.0;
        this._isTriggeredFadeOut = false;
    }
    CubismMotionQueueEntry.prototype.release = function () {
        if (this._autoDelete && this._motion) {
            acubismmotion_1.ACubismMotion.delete(this._motion);
        }
    };
    CubismMotionQueueEntry.prototype.setFadeOut = function (fadeOutSeconds) {
        this._fadeOutSeconds = fadeOutSeconds;
        this._isTriggeredFadeOut = true;
    };
    CubismMotionQueueEntry.prototype.startFadeOut = function (fadeOutSeconds, userTimeSeconds) {
        var newEndTimeSeconds = userTimeSeconds + fadeOutSeconds;
        this._isTriggeredFadeOut = true;
        if (this._endTimeSeconds < 0.0 ||
            newEndTimeSeconds < this._endTimeSeconds) {
            this._endTimeSeconds = newEndTimeSeconds;
        }
    };
    CubismMotionQueueEntry.prototype.isFinished = function () {
        return this._finished;
    };
    CubismMotionQueueEntry.prototype.isStarted = function () {
        return this._started;
    };
    CubismMotionQueueEntry.prototype.getStartTime = function () {
        return this._startTimeSeconds;
    };
    CubismMotionQueueEntry.prototype.getFadeInStartTime = function () {
        return this._fadeInStartTimeSeconds;
    };
    CubismMotionQueueEntry.prototype.getEndTime = function () {
        return this._endTimeSeconds;
    };
    CubismMotionQueueEntry.prototype.setStartTime = function (startTime) {
        this._startTimeSeconds = startTime;
    };
    CubismMotionQueueEntry.prototype.setFadeInStartTime = function (startTime) {
        this._fadeInStartTimeSeconds = startTime;
    };
    CubismMotionQueueEntry.prototype.setEndTime = function (endTime) {
        this._endTimeSeconds = endTime;
    };
    CubismMotionQueueEntry.prototype.setIsFinished = function (f) {
        this._finished = f;
    };
    CubismMotionQueueEntry.prototype.setIsStarted = function (f) {
        this._started = f;
    };
    CubismMotionQueueEntry.prototype.isAvailable = function () {
        return this._available;
    };
    CubismMotionQueueEntry.prototype.setIsAvailable = function (v) {
        this._available = v;
    };
    CubismMotionQueueEntry.prototype.setState = function (timeSeconds, weight) {
        this._stateTimeSeconds = timeSeconds;
        this._stateWeight = weight;
    };
    CubismMotionQueueEntry.prototype.getStateTime = function () {
        return this._stateTimeSeconds;
    };
    CubismMotionQueueEntry.prototype.getStateWeight = function () {
        return this._stateWeight;
    };
    CubismMotionQueueEntry.prototype.getLastCheckEventSeconds = function () {
        return this._lastEventCheckSeconds;
    };
    CubismMotionQueueEntry.prototype.setLastCheckEventSeconds = function (checkSeconds) {
        this._lastEventCheckSeconds = checkSeconds;
    };
    CubismMotionQueueEntry.prototype.isTriggeredFadeOut = function () {
        return this._isTriggeredFadeOut;
    };
    CubismMotionQueueEntry.prototype.getFadeOutSeconds = function () {
        return this._fadeOutSeconds;
    };
    return CubismMotionQueueEntry;
}());
exports.CubismMotionQueueEntry = CubismMotionQueueEntry;
var $ = __importStar(require("./cubismmotionqueueentry"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionQueueEntry = $.CubismMotionQueueEntry;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmotionqueueentry.js.map