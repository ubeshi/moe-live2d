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
exports.Live2DCubismFramework = exports.CubismMath = void 0;
var cubismvector2_1 = require("./cubismvector2");
var CubismMath = (function () {
    function CubismMath() {
    }
    CubismMath.range = function (value, min, max) {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    };
    CubismMath.sin = function (x) {
        return Math.sin(x);
    };
    CubismMath.cos = function (x) {
        return Math.cos(x);
    };
    CubismMath.abs = function (x) {
        return Math.abs(x);
    };
    CubismMath.sqrt = function (x) {
        return Math.sqrt(x);
    };
    CubismMath.cbrt = function (x) {
        if (x === 0) {
            return x;
        }
        var cx = x;
        var isNegativeNumber = cx < 0;
        if (isNegativeNumber) {
            cx = -cx;
        }
        var ret;
        if (cx === Infinity) {
            ret = Infinity;
        }
        else {
            ret = Math.exp(Math.log(cx) / 3);
            ret = (cx / (ret * ret) + 2 * ret) / 3;
        }
        return isNegativeNumber ? -ret : ret;
    };
    CubismMath.getEasingSine = function (value) {
        if (value < 0.0) {
            return 0.0;
        }
        else if (value > 1.0) {
            return 1.0;
        }
        return 0.5 - 0.5 * this.cos(value * Math.PI);
    };
    CubismMath.max = function (left, right) {
        return left > right ? left : right;
    };
    CubismMath.min = function (left, right) {
        return left > right ? right : left;
    };
    CubismMath.degreesToRadian = function (degrees) {
        return (degrees / 180.0) * Math.PI;
    };
    CubismMath.radianToDegrees = function (radian) {
        return (radian * 180.0) / Math.PI;
    };
    CubismMath.directionToRadian = function (from, to) {
        var q1 = Math.atan2(to.y, to.x);
        var q2 = Math.atan2(from.y, from.x);
        var ret = q1 - q2;
        while (ret < -Math.PI) {
            ret += Math.PI * 2.0;
        }
        while (ret > Math.PI) {
            ret -= Math.PI * 2.0;
        }
        return ret;
    };
    CubismMath.directionToDegrees = function (from, to) {
        var radian = this.directionToRadian(from, to);
        var degree = this.radianToDegrees(radian);
        if (to.x - from.x > 0.0) {
            degree = -degree;
        }
        return degree;
    };
    CubismMath.radianToDirection = function (totalAngle) {
        var ret = new cubismvector2_1.CubismVector2();
        ret.x = this.sin(totalAngle);
        ret.y = this.cos(totalAngle);
        return ret;
    };
    CubismMath.quadraticEquation = function (a, b, c) {
        if (this.abs(a) < CubismMath.Epsilon) {
            if (this.abs(b) < CubismMath.Epsilon) {
                return -c;
            }
            return -c / b;
        }
        return -(b + this.sqrt(b * b - 4.0 * a * c)) / (2.0 * a);
    };
    CubismMath.cardanoAlgorithmForBezier = function (a, b, c, d) {
        if (this.sqrt(a) < CubismMath.Epsilon) {
            return this.range(this.quadraticEquation(b, c, d), 0.0, 1.0);
        }
        var ba = b / a;
        var ca = c / a;
        var da = d / a;
        var p = (3.0 * ca - ba * ba) / 3.0;
        var p3 = p / 3.0;
        var q = (2.0 * ba * ba * ba - 9.0 * ba * ca + 27.0 * da) / 27.0;
        var q2 = q / 2.0;
        var discriminant = q2 * q2 + p3 * p3 * p3;
        var center = 0.5;
        var threshold = center + 0.01;
        if (discriminant < 0.0) {
            var mp3 = -p / 3.0;
            var mp33 = mp3 * mp3 * mp3;
            var r = this.sqrt(mp33);
            var t = -q / (2.0 * r);
            var cosphi = this.range(t, -1.0, 1.0);
            var phi = Math.acos(cosphi);
            var crtr = this.cbrt(r);
            var t1 = 2.0 * crtr;
            var root1_1 = t1 * this.cos(phi / 3.0) - ba / 3.0;
            if (this.abs(root1_1 - center) < threshold) {
                return this.range(root1_1, 0.0, 1.0);
            }
            var root2 = t1 * this.cos((phi + 2.0 * Math.PI) / 3.0) - ba / 3.0;
            if (this.abs(root2 - center) < threshold) {
                return this.range(root2, 0.0, 1.0);
            }
            var root3 = t1 * this.cos((phi + 4.0 * Math.PI) / 3.0) - ba / 3.0;
            return this.range(root3, 0.0, 1.0);
        }
        if (discriminant == 0.0) {
            var u1_1;
            if (q2 < 0.0) {
                u1_1 = this.cbrt(-q2);
            }
            else {
                u1_1 = -this.cbrt(q2);
            }
            var root1_2 = 2.0 * u1_1 - ba / 3.0;
            if (this.abs(root1_2 - center) < threshold) {
                return this.range(root1_2, 0.0, 1.0);
            }
            var root2 = -u1_1 - ba / 3.0;
            return this.range(root2, 0.0, 1.0);
        }
        var sd = this.sqrt(discriminant);
        var u1 = this.cbrt(sd - q2);
        var v1 = this.cbrt(sd + q2);
        var root1 = u1 - v1 - ba / 3.0;
        return this.range(root1, 0.0, 1.0);
    };
    CubismMath.Epsilon = 0.00001;
    return CubismMath;
}());
exports.CubismMath = CubismMath;
var $ = __importStar(require("./cubismmath"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMath = $.CubismMath;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmath.js.map