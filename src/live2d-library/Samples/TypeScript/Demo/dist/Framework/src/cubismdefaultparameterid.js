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
exports.Live2DCubismFramework = exports.CubismDefaultParameterId = void 0;
exports.CubismDefaultParameterId = Object.freeze({
    HitAreaPrefix: 'HitArea',
    HitAreaHead: 'Head',
    HitAreaBody: 'Body',
    PartsIdCore: 'Parts01Core',
    PartsArmPrefix: 'Parts01Arm_',
    PartsArmLPrefix: 'Parts01ArmL_',
    PartsArmRPrefix: 'Parts01ArmR_',
    ParamAngleX: 'ParamAngleX',
    ParamAngleY: 'ParamAngleY',
    ParamAngleZ: 'ParamAngleZ',
    ParamEyeLOpen: 'ParamEyeLOpen',
    ParamEyeLSmile: 'ParamEyeLSmile',
    ParamEyeROpen: 'ParamEyeROpen',
    ParamEyeRSmile: 'ParamEyeRSmile',
    ParamEyeBallX: 'ParamEyeBallX',
    ParamEyeBallY: 'ParamEyeBallY',
    ParamEyeBallForm: 'ParamEyeBallForm',
    ParamBrowLY: 'ParamBrowLY',
    ParamBrowRY: 'ParamBrowRY',
    ParamBrowLX: 'ParamBrowLX',
    ParamBrowRX: 'ParamBrowRX',
    ParamBrowLAngle: 'ParamBrowLAngle',
    ParamBrowRAngle: 'ParamBrowRAngle',
    ParamBrowLForm: 'ParamBrowLForm',
    ParamBrowRForm: 'ParamBrowRForm',
    ParamMouthForm: 'ParamMouthForm',
    ParamMouthOpenY: 'ParamMouthOpenY',
    ParamCheek: 'ParamCheek',
    ParamBodyAngleX: 'ParamBodyAngleX',
    ParamBodyAngleY: 'ParamBodyAngleY',
    ParamBodyAngleZ: 'ParamBodyAngleZ',
    ParamBreath: 'ParamBreath',
    ParamArmLA: 'ParamArmLA',
    ParamArmRA: 'ParamArmRA',
    ParamArmLB: 'ParamArmLB',
    ParamArmRB: 'ParamArmRB',
    ParamHandL: 'ParamHandL',
    ParamHandR: 'ParamHandR',
    ParamHairFront: 'ParamHairFront',
    ParamHairSide: 'ParamHairSide',
    ParamHairBack: 'ParamHairBack',
    ParamHairFluffy: 'ParamHairFluffy',
    ParamShoulderY: 'ParamShoulderY',
    ParamBustX: 'ParamBustX',
    ParamBustY: 'ParamBustY',
    ParamBaseX: 'ParamBaseX',
    ParamBaseY: 'ParamBaseY',
    ParamNONE: 'NONE:',
});
var $ = __importStar(require("./cubismdefaultparameterid"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.HitAreaBody = $.CubismDefaultParameterId.HitAreaBody;
    Live2DCubismFramework.HitAreaHead = $.CubismDefaultParameterId.HitAreaHead;
    Live2DCubismFramework.HitAreaPrefix = $.CubismDefaultParameterId.HitAreaPrefix;
    Live2DCubismFramework.ParamAngleX = $.CubismDefaultParameterId.ParamAngleX;
    Live2DCubismFramework.ParamAngleY = $.CubismDefaultParameterId.ParamAngleY;
    Live2DCubismFramework.ParamAngleZ = $.CubismDefaultParameterId.ParamAngleZ;
    Live2DCubismFramework.ParamArmLA = $.CubismDefaultParameterId.ParamArmLA;
    Live2DCubismFramework.ParamArmLB = $.CubismDefaultParameterId.ParamArmLB;
    Live2DCubismFramework.ParamArmRA = $.CubismDefaultParameterId.ParamArmRA;
    Live2DCubismFramework.ParamArmRB = $.CubismDefaultParameterId.ParamArmRB;
    Live2DCubismFramework.ParamBaseX = $.CubismDefaultParameterId.ParamBaseX;
    Live2DCubismFramework.ParamBaseY = $.CubismDefaultParameterId.ParamBaseY;
    Live2DCubismFramework.ParamBodyAngleX = $.CubismDefaultParameterId.ParamBodyAngleX;
    Live2DCubismFramework.ParamBodyAngleY = $.CubismDefaultParameterId.ParamBodyAngleY;
    Live2DCubismFramework.ParamBodyAngleZ = $.CubismDefaultParameterId.ParamBodyAngleZ;
    Live2DCubismFramework.ParamBreath = $.CubismDefaultParameterId.ParamBreath;
    Live2DCubismFramework.ParamBrowLAngle = $.CubismDefaultParameterId.ParamBrowLAngle;
    Live2DCubismFramework.ParamBrowLForm = $.CubismDefaultParameterId.ParamBrowLForm;
    Live2DCubismFramework.ParamBrowLX = $.CubismDefaultParameterId.ParamBrowLX;
    Live2DCubismFramework.ParamBrowLY = $.CubismDefaultParameterId.ParamBrowLY;
    Live2DCubismFramework.ParamBrowRAngle = $.CubismDefaultParameterId.ParamBrowRAngle;
    Live2DCubismFramework.ParamBrowRForm = $.CubismDefaultParameterId.ParamBrowRForm;
    Live2DCubismFramework.ParamBrowRX = $.CubismDefaultParameterId.ParamBrowRX;
    Live2DCubismFramework.ParamBrowRY = $.CubismDefaultParameterId.ParamBrowRY;
    Live2DCubismFramework.ParamBustX = $.CubismDefaultParameterId.ParamBustX;
    Live2DCubismFramework.ParamBustY = $.CubismDefaultParameterId.ParamBustY;
    Live2DCubismFramework.ParamCheek = $.CubismDefaultParameterId.ParamCheek;
    Live2DCubismFramework.ParamEyeBallForm = $.CubismDefaultParameterId.ParamEyeBallForm;
    Live2DCubismFramework.ParamEyeBallX = $.CubismDefaultParameterId.ParamEyeBallX;
    Live2DCubismFramework.ParamEyeBallY = $.CubismDefaultParameterId.ParamEyeBallY;
    Live2DCubismFramework.ParamEyeLOpen = $.CubismDefaultParameterId.ParamEyeLOpen;
    Live2DCubismFramework.ParamEyeLSmile = $.CubismDefaultParameterId.ParamEyeLSmile;
    Live2DCubismFramework.ParamEyeROpen = $.CubismDefaultParameterId.ParamEyeROpen;
    Live2DCubismFramework.ParamEyeRSmile = $.CubismDefaultParameterId.ParamEyeRSmile;
    Live2DCubismFramework.ParamHairBack = $.CubismDefaultParameterId.ParamHairBack;
    Live2DCubismFramework.ParamHairFluffy = $.CubismDefaultParameterId.ParamHairFluffy;
    Live2DCubismFramework.ParamHairFront = $.CubismDefaultParameterId.ParamHairFront;
    Live2DCubismFramework.ParamHairSide = $.CubismDefaultParameterId.ParamHairSide;
    Live2DCubismFramework.ParamHandL = $.CubismDefaultParameterId.ParamHandL;
    Live2DCubismFramework.ParamHandR = $.CubismDefaultParameterId.ParamHandR;
    Live2DCubismFramework.ParamMouthForm = $.CubismDefaultParameterId.ParamMouthForm;
    Live2DCubismFramework.ParamMouthOpenY = $.CubismDefaultParameterId.ParamMouthOpenY;
    Live2DCubismFramework.ParamNONE = $.CubismDefaultParameterId.ParamNONE;
    Live2DCubismFramework.ParamShoulderY = $.CubismDefaultParameterId.ParamShoulderY;
    Live2DCubismFramework.PartsArmLPrefix = $.CubismDefaultParameterId.PartsArmLPrefix;
    Live2DCubismFramework.PartsArmPrefix = $.CubismDefaultParameterId.PartsArmPrefix;
    Live2DCubismFramework.PartsArmRPrefix = $.CubismDefaultParameterId.PartsArmRPrefix;
    Live2DCubismFramework.PartsIdCore = $.CubismDefaultParameterId.PartsIdCore;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismdefaultparameterid.js.map