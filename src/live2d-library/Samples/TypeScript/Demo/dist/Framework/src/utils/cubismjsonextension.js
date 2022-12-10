"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubismJsonExtension = void 0;
var cubismjson_1 = require("./cubismjson");
var CubismJsonExtension = (function () {
    function CubismJsonExtension() {
    }
    CubismJsonExtension.parseJsonObject = function (obj, map) {
        Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] == 'boolean') {
                map.put(key, new cubismjson_1.JsonBoolean(obj[key]));
            }
            else if (typeof obj[key] == 'string') {
                map.put(key, new cubismjson_1.JsonString(obj[key]));
            }
            else if (typeof obj[key] == 'number') {
                map.put(key, new cubismjson_1.JsonFloat(obj[key]));
            }
            else if (obj[key] instanceof Array) {
                map.put(key, CubismJsonExtension.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                map.put(key, CubismJsonExtension.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
            }
            else if (obj[key] == null) {
                map.put(key, new cubismjson_1.JsonNullvalue());
            }
            else {
                map.put(key, obj[key]);
            }
        });
        return map;
    };
    CubismJsonExtension.parseJsonArray = function (obj) {
        var _this = this;
        var arr = new cubismjson_1.JsonArray();
        Object.keys(obj).forEach(function (key) {
            var convKey = Number(key);
            if (typeof convKey == 'number') {
                if (typeof obj[convKey] == 'boolean') {
                    arr.add(new cubismjson_1.JsonBoolean(obj[convKey]));
                }
                else if (typeof obj[convKey] == 'string') {
                    arr.add(new cubismjson_1.JsonString(obj[convKey]));
                }
                else if (typeof obj[convKey] == 'number') {
                    arr.add(new cubismjson_1.JsonFloat(obj[convKey]));
                }
                else if (obj[key] instanceof Array) {
                    arr.add(_this.parseJsonArray(obj[key]));
                }
                else if (obj[key] instanceof Object) {
                    arr.add(_this.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
                }
                else if (obj[key] == null) {
                    arr.add(new cubismjson_1.JsonNullvalue());
                }
                else {
                    arr.add(obj[key]);
                }
            }
            else if (obj[key] instanceof Array) {
                arr.add(_this.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                arr.add(_this.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
            }
            else if (obj[key] == null) {
                arr.add(new cubismjson_1.JsonNullvalue());
            }
            else {
                for (var i = 0; i < obj[key].length; i++) {
                    arr.add(obj[key][i]);
                }
            }
        });
        return arr;
    };
    return CubismJsonExtension;
}());
exports.CubismJsonExtension = CubismJsonExtension;
//# sourceMappingURL=cubismjsonextension.js.map