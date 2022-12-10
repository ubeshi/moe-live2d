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
exports.Live2DCubismFramework = exports.JsonMap = exports.JsonArray = exports.JsonNullvalue = exports.JsonError = exports.JsonString = exports.JsonBoolean = exports.JsonFloat = exports.CubismJson = exports.Value = void 0;
var live2dcubismframework_1 = require("../live2dcubismframework");
var csmmap_1 = require("../type/csmmap");
var csmstring_1 = require("../type/csmstring");
var csmvector_1 = require("../type/csmvector");
var cubismdebug_1 = require("./cubismdebug");
var CSM_JSON_ERROR_TYPE_MISMATCH = 'Error: type mismatch';
var CSM_JSON_ERROR_INDEX_OF_BOUNDS = 'Error: index out of bounds';
var Value = (function () {
    function Value() {
    }
    Value.prototype.getRawString = function (defaultValue, indent) {
        return this.getString(defaultValue, indent);
    };
    Value.prototype.toInt = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return defaultValue;
    };
    Value.prototype.toFloat = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return defaultValue;
    };
    Value.prototype.toBoolean = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        return defaultValue;
    };
    Value.prototype.getSize = function () {
        return 0;
    };
    Value.prototype.getArray = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return defaultValue;
    };
    Value.prototype.getVector = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = new csmvector_1.csmVector(); }
        return defaultValue;
    };
    Value.prototype.getMap = function (defaultValue) {
        return defaultValue;
    };
    Value.prototype.getValueByIndex = function (index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    Value.prototype.getValueByString = function (s) {
        return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    Value.prototype.getKeys = function () {
        return Value.s_dummyKeys;
    };
    Value.prototype.isError = function () {
        return false;
    };
    Value.prototype.isNull = function () {
        return false;
    };
    Value.prototype.isBool = function () {
        return false;
    };
    Value.prototype.isFloat = function () {
        return false;
    };
    Value.prototype.isString = function () {
        return false;
    };
    Value.prototype.isArray = function () {
        return false;
    };
    Value.prototype.isMap = function () {
        return false;
    };
    Value.prototype.equals = function (value) {
        return false;
    };
    Value.prototype.isStatic = function () {
        return false;
    };
    Value.prototype.setErrorNotForClientCall = function (errorStr) {
        return JsonError.errorValue;
    };
    Value.staticInitializeNotForClientCall = function () {
        JsonBoolean.trueValue = new JsonBoolean(true);
        JsonBoolean.falseValue = new JsonBoolean(false);
        Value.errorValue = new JsonError('ERROR', true);
        Value.nullValue = new JsonNullvalue();
        Value.s_dummyKeys = new csmvector_1.csmVector();
    };
    Value.staticReleaseNotForClientCall = function () {
        JsonBoolean.trueValue = null;
        JsonBoolean.falseValue = null;
        Value.errorValue = null;
        Value.nullValue = null;
        Value.s_dummyKeys = null;
    };
    return Value;
}());
exports.Value = Value;
var CubismJson = (function () {
    function CubismJson(buffer, length) {
        this._parseCallback = cubismjsonextension_1.CubismJsonExtension.parseJsonObject;
        this._error = null;
        this._lineCount = 0;
        this._root = null;
        if (buffer != undefined) {
            this.parseBytes(buffer, length, this._parseCallback);
        }
    }
    CubismJson.create = function (buffer, size) {
        var json = new CubismJson();
        var succeeded = json.parseBytes(buffer, size, json._parseCallback);
        if (!succeeded) {
            CubismJson.delete(json);
            return null;
        }
        else {
            return json;
        }
    };
    CubismJson.delete = function (instance) {
        instance = null;
    };
    CubismJson.prototype.getRoot = function () {
        return this._root;
    };
    CubismJson.arrayBufferToString = function (buffer) {
        var uint8Array = new Uint8Array(buffer);
        var str = '';
        for (var i = 0, len = uint8Array.length; i < len; ++i) {
            str += '%' + this.pad(uint8Array[i].toString(16));
        }
        str = decodeURIComponent(str);
        return str;
    };
    CubismJson.pad = function (n) {
        return n.length < 2 ? '0' + n : n;
    };
    CubismJson.prototype.parseBytes = function (buffer, size, parseCallback) {
        var endPos = new Array(1);
        var decodeBuffer = CubismJson.arrayBufferToString(buffer);
        if (parseCallback == undefined) {
            this._root = this.parseValue(decodeBuffer, size, 0, endPos);
        }
        else {
            this._root = parseCallback(JSON.parse(decodeBuffer), new JsonMap());
        }
        if (this._error) {
            var strbuf = '\0';
            strbuf = 'Json parse error : @line ' + (this._lineCount + 1) + '\n';
            this._root = new JsonString(strbuf);
            (0, cubismdebug_1.CubismLogInfo)('{0}', this._root.getRawString());
            return false;
        }
        else if (this._root == null) {
            this._root = new JsonError(new csmstring_1.csmString(this._error), false);
            return false;
        }
        return true;
    };
    CubismJson.prototype.getParseError = function () {
        return this._error;
    };
    CubismJson.prototype.checkEndOfFile = function () {
        return this._root.getArray()[1].equals('EOF');
    };
    CubismJson.prototype.parseValue = function (buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        var o = null;
        var i = begin;
        var f;
        for (; i < length; i++) {
            var c = buffer[i];
            switch (c) {
                case '-':
                case '.':
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': {
                    var afterString = new Array(1);
                    f = (0, live2dcubismframework_1.strtod)(buffer.slice(i), afterString);
                    outEndPos[0] = buffer.indexOf(afterString[0]);
                    return new JsonFloat(f);
                }
                case '"':
                    return new JsonString(this.parseString(buffer, length, i + 1, outEndPos));
                case '[':
                    o = this.parseArray(buffer, length, i + 1, outEndPos);
                    return o;
                case '{':
                    o = this.parseObject(buffer, length, i + 1, outEndPos);
                    return o;
                case 'n':
                    if (i + 3 < length) {
                        o = new JsonNullvalue();
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse null';
                    }
                    return o;
                case 't':
                    if (i + 3 < length) {
                        o = JsonBoolean.trueValue;
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse true';
                    }
                    return o;
                case 'f':
                    if (i + 4 < length) {
                        o = JsonBoolean.falseValue;
                        outEndPos[0] = i + 5;
                    }
                    else {
                        this._error = "illegal ',' position";
                    }
                    return o;
                case ',':
                    this._error = "illegal ',' position";
                    return null;
                case ']':
                    outEndPos[0] = i;
                    return null;
                case '\n':
                    this._lineCount++;
                case ' ':
                case '\t':
                case '\r':
                default:
                    break;
            }
        }
        this._error = 'illegal end of value';
        return null;
    };
    CubismJson.prototype.parseString = function (string, length, begin, outEndPos) {
        if (this._error)
            return null;
        var i = begin;
        var c, c2;
        var ret = new csmstring_1.csmString('');
        var bufStart = begin;
        for (; i < length; i++) {
            c = string[i];
            switch (c) {
                case '"': {
                    outEndPos[0] = i + 1;
                    ret.append(string.slice(bufStart), i - bufStart);
                    return ret.s;
                }
                case '//': {
                    i++;
                    if (i - 1 > bufStart) {
                        ret.append(string.slice(bufStart), i - bufStart);
                    }
                    bufStart = i + 1;
                    if (i < length) {
                        c2 = string[i];
                        switch (c2) {
                            case '\\':
                                ret.expansion(1, '\\');
                                break;
                            case '"':
                                ret.expansion(1, '"');
                                break;
                            case '/':
                                ret.expansion(1, '/');
                                break;
                            case 'b':
                                ret.expansion(1, '\b');
                                break;
                            case 'f':
                                ret.expansion(1, '\f');
                                break;
                            case 'n':
                                ret.expansion(1, '\n');
                                break;
                            case 'r':
                                ret.expansion(1, '\r');
                                break;
                            case 't':
                                ret.expansion(1, '\t');
                                break;
                            case 'u':
                                this._error = 'parse string/unicord escape not supported';
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        this._error = 'parse string/escape error';
                    }
                }
                default: {
                    break;
                }
            }
        }
        this._error = 'parse string/illegal end';
        return null;
    };
    CubismJson.prototype.parseObject = function (buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        var ret = new JsonMap();
        var key = '';
        var i = begin;
        var c = '';
        var localRetEndPos2 = Array(1);
        var ok = false;
        for (; i < length; i++) {
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case '"':
                        key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                        if (this._error) {
                            return null;
                        }
                        i = localRetEndPos2[0];
                        ok = true;
                        break FOR_LOOP;
                    case '}':
                        outEndPos[0] = i + 1;
                        return ret;
                    case ':':
                        this._error = "illegal ':' position";
                        break;
                    case '\n':
                        this._lineCount++;
                    default:
                        break;
                }
            }
            if (!ok) {
                this._error = 'key not found';
                return null;
            }
            ok = false;
            FOR_LOOP2: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ':':
                        ok = true;
                        i++;
                        break FOR_LOOP2;
                    case '}':
                        this._error = "illegal '}' position";
                        break;
                    case '\n':
                        this._lineCount++;
                    default:
                        break;
                }
            }
            if (!ok) {
                this._error = "':' not found";
                return null;
            }
            var value = this.parseValue(buffer, length, i, localRetEndPos2);
            if (this._error) {
                return null;
            }
            i = localRetEndPos2[0];
            ret.put(key, value);
            FOR_LOOP3: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        break FOR_LOOP3;
                    case '}':
                        outEndPos[0] = i + 1;
                        return ret;
                    case '\n':
                        this._lineCount++;
                    default:
                        break;
                }
            }
        }
        this._error = 'illegal end of perseObject';
        return null;
    };
    CubismJson.prototype.parseArray = function (buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        var ret = new JsonArray();
        var i = begin;
        var c;
        var localRetEndpos2 = new Array(1);
        for (; i < length; i++) {
            var value = this.parseValue(buffer, length, i, localRetEndpos2);
            if (this._error) {
                return null;
            }
            i = localRetEndpos2[0];
            if (value) {
                ret.add(value);
            }
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        break FOR_LOOP;
                    case ']':
                        outEndPos[0] = i + 1;
                        return ret;
                    case '\n':
                        ++this._lineCount;
                    default:
                        break;
                }
            }
        }
        ret = void 0;
        this._error = 'illegal end of parseObject';
        return null;
    };
    return CubismJson;
}());
exports.CubismJson = CubismJson;
var JsonFloat = (function (_super) {
    __extends(JsonFloat, _super);
    function JsonFloat(v) {
        var _this = _super.call(this) || this;
        _this._value = v;
        return _this;
    }
    JsonFloat.prototype.isFloat = function () {
        return true;
    };
    JsonFloat.prototype.getString = function (defaultValue, indent) {
        var strbuf = '\0';
        this._value = parseFloat(strbuf);
        this._stringBuffer = strbuf;
        return this._stringBuffer;
    };
    JsonFloat.prototype.toInt = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return parseInt(this._value.toString());
    };
    JsonFloat.prototype.toFloat = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0.0; }
        return this._value;
    };
    JsonFloat.prototype.equals = function (value) {
        if ('number' === typeof value) {
            if (Math.round(value)) {
                return false;
            }
            else {
                return value == this._value;
            }
        }
        return false;
    };
    return JsonFloat;
}(Value));
exports.JsonFloat = JsonFloat;
var JsonBoolean = (function (_super) {
    __extends(JsonBoolean, _super);
    function JsonBoolean(v) {
        var _this = _super.call(this) || this;
        _this._boolValue = v;
        return _this;
    }
    JsonBoolean.prototype.isBool = function () {
        return true;
    };
    JsonBoolean.prototype.toBoolean = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        return this._boolValue;
    };
    JsonBoolean.prototype.getString = function (defaultValue, indent) {
        this._stringBuffer = this._boolValue ? 'true' : 'false';
        return this._stringBuffer;
    };
    JsonBoolean.prototype.equals = function (value) {
        if ('boolean' === typeof value) {
            return value == this._boolValue;
        }
        return false;
    };
    JsonBoolean.prototype.isStatic = function () {
        return true;
    };
    return JsonBoolean;
}(Value));
exports.JsonBoolean = JsonBoolean;
var JsonString = (function (_super) {
    __extends(JsonString, _super);
    function JsonString(s) {
        var _this = _super.call(this) || this;
        if ('string' === typeof s) {
            _this._stringBuffer = s;
        }
        if (s instanceof csmstring_1.csmString) {
            _this._stringBuffer = s.s;
        }
        return _this;
    }
    JsonString.prototype.isString = function () {
        return true;
    };
    JsonString.prototype.getString = function (defaultValue, indent) {
        return this._stringBuffer;
    };
    JsonString.prototype.equals = function (value) {
        if ('string' === typeof value) {
            return this._stringBuffer == value;
        }
        if (value instanceof csmstring_1.csmString) {
            return this._stringBuffer == value.s;
        }
        return false;
    };
    return JsonString;
}(Value));
exports.JsonString = JsonString;
var JsonError = (function (_super) {
    __extends(JsonError, _super);
    function JsonError(s, isStatic) {
        var _this = this;
        if ('string' === typeof s) {
            _this = _super.call(this, s) || this;
        }
        else {
            _this = _super.call(this, s) || this;
        }
        _this._isStatic = isStatic;
        return _this;
    }
    JsonError.prototype.isStatic = function () {
        return this._isStatic;
    };
    JsonError.prototype.setErrorNotForClientCall = function (s) {
        this._stringBuffer = s;
        return this;
    };
    JsonError.prototype.isError = function () {
        return true;
    };
    return JsonError;
}(JsonString));
exports.JsonError = JsonError;
var JsonNullvalue = (function (_super) {
    __extends(JsonNullvalue, _super);
    function JsonNullvalue() {
        var _this = _super.call(this) || this;
        _this._stringBuffer = 'NullValue';
        return _this;
    }
    JsonNullvalue.prototype.isNull = function () {
        return true;
    };
    JsonNullvalue.prototype.getString = function (defaultValue, indent) {
        return this._stringBuffer;
    };
    JsonNullvalue.prototype.isStatic = function () {
        return true;
    };
    JsonNullvalue.prototype.setErrorNotForClientCall = function (s) {
        this._stringBuffer = s;
        return JsonError.nullValue;
    };
    return JsonNullvalue;
}(Value));
exports.JsonNullvalue = JsonNullvalue;
var JsonArray = (function (_super) {
    __extends(JsonArray, _super);
    function JsonArray() {
        var _this = _super.call(this) || this;
        _this._array = new csmvector_1.csmVector();
        return _this;
    }
    JsonArray.prototype.release = function () {
        for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
            var v = ite.ptr();
            if (v && !v.isStatic()) {
                v = void 0;
                v = null;
            }
        }
    };
    JsonArray.prototype.isArray = function () {
        return true;
    };
    JsonArray.prototype.getValueByIndex = function (index) {
        if (index < 0 || this._array.getSize() <= index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
        }
        var v = this._array.at(index);
        if (v == null) {
            return Value.nullValue;
        }
        return v;
    };
    JsonArray.prototype.getValueByString = function (s) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    JsonArray.prototype.getString = function (defaultValue, indent) {
        var stringBuffer = indent + '[\n';
        for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
            var v = ite.ptr();
            this._stringBuffer += indent + '' + v.getString(indent + ' ') + '\n';
        }
        this._stringBuffer = stringBuffer + indent + ']\n';
        return this._stringBuffer;
    };
    JsonArray.prototype.add = function (v) {
        this._array.pushBack(v);
    };
    JsonArray.prototype.getVector = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return this._array;
    };
    JsonArray.prototype.getSize = function () {
        return this._array.getSize();
    };
    return JsonArray;
}(Value));
exports.JsonArray = JsonArray;
var JsonMap = (function (_super) {
    __extends(JsonMap, _super);
    function JsonMap() {
        var _this = _super.call(this) || this;
        _this._map = new csmmap_1.csmMap();
        return _this;
    }
    JsonMap.prototype.release = function () {
        var ite = this._map.begin();
        while (ite.notEqual(this._map.end())) {
            var v = ite.ptr().second;
            if (v && !v.isStatic()) {
                v = void 0;
                v = null;
            }
            ite.preIncrement();
        }
    };
    JsonMap.prototype.isMap = function () {
        return true;
    };
    JsonMap.prototype.getValueByString = function (s) {
        if (s instanceof csmstring_1.csmString) {
            var ret = this._map.getValue(s.s);
            if (ret == null) {
                return Value.nullValue;
            }
            return ret;
        }
        for (var iter = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
            if (iter.ptr().first == s) {
                if (iter.ptr().second == null) {
                    return Value.nullValue;
                }
                return iter.ptr().second;
            }
        }
        return Value.nullValue;
    };
    JsonMap.prototype.getValueByIndex = function (index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    JsonMap.prototype.getString = function (defaultValue, indent) {
        this._stringBuffer = indent + '{\n';
        var ite = this._map.begin();
        while (ite.notEqual(this._map.end())) {
            var key = ite.ptr().first;
            var v = ite.ptr().second;
            this._stringBuffer +=
                indent + ' ' + key + ' : ' + v.getString(indent + '   ') + ' \n';
            ite.preIncrement();
        }
        this._stringBuffer += indent + '}\n';
        return this._stringBuffer;
    };
    JsonMap.prototype.getMap = function (defaultValue) {
        return this._map;
    };
    JsonMap.prototype.put = function (key, v) {
        this._map.setValue(key, v);
    };
    JsonMap.prototype.getKeys = function () {
        if (!this._keys) {
            this._keys = new csmvector_1.csmVector();
            var ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                var key = ite.ptr().first;
                this._keys.pushBack(key);
                ite.preIncrement();
            }
        }
        return this._keys;
    };
    JsonMap.prototype.getSize = function () {
        return this._keys.getSize();
    };
    return JsonMap;
}(Value));
exports.JsonMap = JsonMap;
var $ = __importStar(require("./cubismjson"));
var cubismjsonextension_1 = require("./cubismjsonextension");
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismJson = $.CubismJson;
    Live2DCubismFramework.JsonArray = $.JsonArray;
    Live2DCubismFramework.JsonBoolean = $.JsonBoolean;
    Live2DCubismFramework.JsonError = $.JsonError;
    Live2DCubismFramework.JsonFloat = $.JsonFloat;
    Live2DCubismFramework.JsonMap = $.JsonMap;
    Live2DCubismFramework.JsonNullvalue = $.JsonNullvalue;
    Live2DCubismFramework.JsonString = $.JsonString;
    Live2DCubismFramework.Value = $.Value;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismjson.js.map