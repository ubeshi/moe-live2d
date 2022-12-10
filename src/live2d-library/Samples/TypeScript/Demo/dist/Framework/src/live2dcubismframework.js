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
exports.Live2DCubismFramework = exports.LogLevel = exports.Option = exports.CubismFramework = exports.csmDelete = exports.Constant = exports.strtod = void 0;
var cubismidmanager_1 = require("./id/cubismidmanager");
var cubismrenderer_1 = require("./rendering/cubismrenderer");
var cubismdebug_1 = require("./utils/cubismdebug");
var cubismjson_1 = require("./utils/cubismjson");
function strtod(s, endPtr) {
    var index = 0;
    for (var i = 1;; i++) {
        var testC = s.slice(i - 1, i);
        if (testC == 'e' || testC == '-' || testC == 'E') {
            continue;
        }
        var test = s.substring(0, i);
        var number = Number(test);
        if (isNaN(number)) {
            break;
        }
        index = i;
    }
    var d = parseFloat(s);
    if (isNaN(d)) {
        d = NaN;
    }
    endPtr[0] = s.slice(index);
    return d;
}
exports.strtod = strtod;
var s_isStarted = false;
var s_isInitialized = false;
var s_option = null;
var s_cubismIdManager = null;
exports.Constant = Object.freeze({
    vertexOffset: 0,
    vertexStep: 2,
});
function csmDelete(address) {
    if (!address) {
        return;
    }
    address = void 0;
}
exports.csmDelete = csmDelete;
var CubismFramework = (function () {
    function CubismFramework() {
    }
    CubismFramework.startUp = function (option) {
        if (option === void 0) { option = null; }
        if (s_isStarted) {
            (0, cubismdebug_1.CubismLogInfo)('CubismFramework.startUp() is already done.');
            return s_isStarted;
        }
        s_option = option;
        if (s_option != null) {
            Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
        }
        s_isStarted = true;
        if (s_isStarted) {
            var version = Live2DCubismCore.Version.csmGetVersion();
            var major = (version & 0xff000000) >> 24;
            var minor = (version & 0x00ff0000) >> 16;
            var patch = version & 0x0000ffff;
            var versionNumber = version;
            (0, cubismdebug_1.CubismLogInfo)("Live2D Cubism Core version: {0}.{1}.{2} ({3})", ('00' + major).slice(-2), ('00' + minor).slice(-2), ('0000' + patch).slice(-4), versionNumber);
        }
        (0, cubismdebug_1.CubismLogInfo)('CubismFramework.startUp() is complete.');
        return s_isStarted;
    };
    CubismFramework.cleanUp = function () {
        s_isStarted = false;
        s_isInitialized = false;
        s_option = null;
        s_cubismIdManager = null;
    };
    CubismFramework.initialize = function () {
        (0, cubismdebug_1.CSM_ASSERT)(s_isStarted);
        if (!s_isStarted) {
            (0, cubismdebug_1.CubismLogWarning)('CubismFramework is not started.');
            return;
        }
        if (s_isInitialized) {
            (0, cubismdebug_1.CubismLogWarning)('CubismFramework.initialize() skipped, already initialized.');
            return;
        }
        cubismjson_1.Value.staticInitializeNotForClientCall();
        s_cubismIdManager = new cubismidmanager_1.CubismIdManager();
        s_isInitialized = true;
        (0, cubismdebug_1.CubismLogInfo)('CubismFramework.initialize() is complete.');
    };
    CubismFramework.dispose = function () {
        (0, cubismdebug_1.CSM_ASSERT)(s_isStarted);
        if (!s_isStarted) {
            (0, cubismdebug_1.CubismLogWarning)('CubismFramework is not started.');
            return;
        }
        if (!s_isInitialized) {
            (0, cubismdebug_1.CubismLogWarning)('CubismFramework.dispose() skipped, not initialized.');
            return;
        }
        cubismjson_1.Value.staticReleaseNotForClientCall();
        s_cubismIdManager.release();
        s_cubismIdManager = null;
        cubismrenderer_1.CubismRenderer.staticRelease();
        s_isInitialized = false;
        (0, cubismdebug_1.CubismLogInfo)('CubismFramework.dispose() is complete.');
    };
    CubismFramework.isStarted = function () {
        return s_isStarted;
    };
    CubismFramework.isInitialized = function () {
        return s_isInitialized;
    };
    CubismFramework.coreLogFunction = function (message) {
        if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
            return;
        }
        Live2DCubismCore.Logging.csmGetLogFunction()(message);
    };
    CubismFramework.getLoggingLevel = function () {
        if (s_option != null) {
            return s_option.loggingLevel;
        }
        return LogLevel.LogLevel_Off;
    };
    CubismFramework.getIdManager = function () {
        return s_cubismIdManager;
    };
    return CubismFramework;
}());
exports.CubismFramework = CubismFramework;
var Option = (function () {
    function Option() {
    }
    return Option;
}());
exports.Option = Option;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
    LogLevel[LogLevel["LogLevel_Debug"] = 1] = "LogLevel_Debug";
    LogLevel[LogLevel["LogLevel_Info"] = 2] = "LogLevel_Info";
    LogLevel[LogLevel["LogLevel_Warning"] = 3] = "LogLevel_Warning";
    LogLevel[LogLevel["LogLevel_Error"] = 4] = "LogLevel_Error";
    LogLevel[LogLevel["LogLevel_Off"] = 5] = "LogLevel_Off";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var $ = __importStar(require("./live2dcubismframework"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.Constant = $.Constant;
    Live2DCubismFramework.csmDelete = $.csmDelete;
    Live2DCubismFramework.CubismFramework = $.CubismFramework;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=live2dcubismframework.js.map