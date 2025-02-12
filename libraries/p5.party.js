"use strict";
(() => {
    var Dc = Object.create;
    var Sr = Object.defineProperty;
    var wc = Object.getOwnPropertyDescriptor;
    var Pc = Object.getOwnPropertyNames,
        An = Object.getOwnPropertySymbols,
        Uc = Object.getPrototypeOf,
        wn = Object.prototype.hasOwnProperty,
        Lc = Object.prototype.propertyIsEnumerable;
    var w = Math.pow,
        Dn = (i, t, e) =>
            t in i ? Sr(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (i[t] = e),
        se = (i, t) => {
            for (var e in t || (t = {})) wn.call(t, e) && Dn(i, e, t[e]);
            if (An) for (var e of An(t)) Lc.call(t, e) && Dn(i, e, t[e]);
            return i;
        };
    var Mc = (i, t) => () => (i && (t = i((i = 0))), t);
    var R = (i, t) => () => (t || i((t = { exports: {} }).exports, t), t.exports);
    var Bc = (i, t, e, r) => {
        if ((t && typeof t == "object") || typeof t == "function")
            for (let n of Pc(t))
                !wn.call(i, n) && n !== e && Sr(i, n, { get: () => t[n], enumerable: !(r = wc(t, n)) || r.enumerable });
        return i;
    };
    var _r = (i, t, e) => (
        (e = i != null ? Dc(Uc(i)) : {}),
        Bc(t || !i || !i.__esModule ? Sr(e, "default", { value: i, enumerable: !0 }) : e, i)
    );
    var Or = (i, t, e) => {
        if (!t.has(i)) throw TypeError("Cannot " + e);
    };
    var p = (i, t, e) => (Or(i, t, "read from private field"), e ? e.call(i) : t.get(i)),
        A = (i, t, e) => {
            if (t.has(i)) throw TypeError("Cannot add the same private member more than once");
            t instanceof WeakSet ? t.add(i) : t.set(i, e);
        },
        P = (i, t, e, r) => (Or(i, t, "write to private field"), r ? r.call(i, e) : t.set(i, e), e);
    var vt = (i, t, e) => (Or(i, t, "access private method"), e);
    var z = (i, t, e) =>
        new Promise((r, n) => {
            var o = (a) => {
                    try {
                        c(e.next(a));
                    } catch (l) {
                        n(l);
                    }
                },
                s = (a) => {
                    try {
                        c(e.throw(a));
                    } catch (l) {
                        n(l);
                    }
                },
                c = (a) => (a.done ? r(a.value) : Promise.resolve(a.value).then(o, s));
            c((e = e.apply(i, t)).next());
        });
    var Ln = R((Ei) => {
        "use strict";
        u();
        Ei.byteLength = xc;
        Ei.toByteArray = Vc;
        Ei.fromByteArray = Gc;
        var bt = [],
            ut = [],
            kc = typeof Uint8Array != "undefined" ? Uint8Array : Array,
            Nr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (ce = 0, Pn = Nr.length; ce < Pn; ++ce) (bt[ce] = Nr[ce]), (ut[Nr.charCodeAt(ce)] = ce);
        var ce, Pn;
        ut["-".charCodeAt(0)] = 62;
        ut["_".charCodeAt(0)] = 63;
        function Un(i) {
            var t = i.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var e = i.indexOf("=");
            e === -1 && (e = t);
            var r = e === t ? 0 : 4 - (e % 4);
            return [e, r];
        }
        function xc(i) {
            var t = Un(i),
                e = t[0],
                r = t[1];
            return ((e + r) * 3) / 4 - r;
        }
        function jc(i, t, e) {
            return ((t + e) * 3) / 4 - e;
        }
        function Vc(i) {
            var t,
                e = Un(i),
                r = e[0],
                n = e[1],
                o = new kc(jc(i, r, n)),
                s = 0,
                c = n > 0 ? r - 4 : r,
                a;
            for (a = 0; a < c; a += 4)
                (t =
                    (ut[i.charCodeAt(a)] << 18) |
                    (ut[i.charCodeAt(a + 1)] << 12) |
                    (ut[i.charCodeAt(a + 2)] << 6) |
                    ut[i.charCodeAt(a + 3)]),
                    (o[s++] = (t >> 16) & 255),
                    (o[s++] = (t >> 8) & 255),
                    (o[s++] = t & 255);
            return (
                n === 2 && ((t = (ut[i.charCodeAt(a)] << 2) | (ut[i.charCodeAt(a + 1)] >> 4)), (o[s++] = t & 255)),
                n === 1 &&
                    ((t =
                        (ut[i.charCodeAt(a)] << 10) | (ut[i.charCodeAt(a + 1)] << 4) | (ut[i.charCodeAt(a + 2)] >> 2)),
                    (o[s++] = (t >> 8) & 255),
                    (o[s++] = t & 255)),
                o
            );
        }
        function Fc(i) {
            return bt[(i >> 18) & 63] + bt[(i >> 12) & 63] + bt[(i >> 6) & 63] + bt[i & 63];
        }
        function Hc(i, t, e) {
            for (var r, n = [], o = t; o < e; o += 3)
                (r = ((i[o] << 16) & 16711680) + ((i[o + 1] << 8) & 65280) + (i[o + 2] & 255)), n.push(Fc(r));
            return n.join("");
        }
        function Gc(i) {
            for (var t, e = i.length, r = e % 3, n = [], o = 16383, s = 0, c = e - r; s < c; s += o)
                n.push(Hc(i, s, s + o > c ? c : s + o));
            return (
                r === 1
                    ? ((t = i[e - 1]), n.push(bt[t >> 2] + bt[(t << 4) & 63] + "=="))
                    : r === 2 &&
                      ((t = (i[e - 2] << 8) + i[e - 1]),
                      n.push(bt[t >> 10] + bt[(t >> 4) & 63] + bt[(t << 2) & 63] + "=")),
                n.join("")
            );
        }
    });
    var Mn = R((Tr) => {
        u();
        Tr.read = function (i, t, e, r, n) {
            var o,
                s,
                c = n * 8 - r - 1,
                a = (1 << c) - 1,
                l = a >> 1,
                h = -7,
                E = e ? n - 1 : 0,
                N = e ? -1 : 1,
                O = i[t + E];
            for (E += N, o = O & ((1 << -h) - 1), O >>= -h, h += c; h > 0; o = o * 256 + i[t + E], E += N, h -= 8);
            for (s = o & ((1 << -h) - 1), o >>= -h, h += r; h > 0; s = s * 256 + i[t + E], E += N, h -= 8);
            if (o === 0) o = 1 - l;
            else {
                if (o === a) return s ? NaN : (O ? -1 : 1) * (1 / 0);
                (s = s + Math.pow(2, r)), (o = o - l);
            }
            return (O ? -1 : 1) * s * Math.pow(2, o - r);
        };
        Tr.write = function (i, t, e, r, n, o) {
            var s,
                c,
                a,
                l = o * 8 - n - 1,
                h = (1 << l) - 1,
                E = h >> 1,
                N = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                O = r ? 0 : o - 1,
                B = r ? 1 : -1,
                L = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0;
            for (
                t = Math.abs(t),
                    isNaN(t) || t === 1 / 0
                        ? ((c = isNaN(t) ? 1 : 0), (s = h))
                        : ((s = Math.floor(Math.log(t) / Math.LN2)),
                          t * (a = Math.pow(2, -s)) < 1 && (s--, (a *= 2)),
                          s + E >= 1 ? (t += N / a) : (t += N * Math.pow(2, 1 - E)),
                          t * a >= 2 && (s++, (a /= 2)),
                          s + E >= h
                              ? ((c = 0), (s = h))
                              : s + E >= 1
                              ? ((c = (t * a - 1) * Math.pow(2, n)), (s = s + E))
                              : ((c = t * Math.pow(2, E - 1) * Math.pow(2, n)), (s = 0)));
                n >= 8;
                i[e + O] = c & 255, O += B, c /= 256, n -= 8
            );
            for (s = (s << n) | c, l += n; l > 0; i[e + O] = s & 255, O += B, s /= 256, l -= 8);
            i[e + O - B] |= L * 128;
        };
    });
    var Xn = R((Oe) => {
        "use strict";
        u();
        var Ir = Ln(),
            Se = Mn(),
            Bn =
                typeof Symbol == "function" && typeof Symbol.for == "function"
                    ? Symbol.for("nodejs.util.inspect.custom")
                    : null;
        Oe.Buffer = f;
        Oe.SlowBuffer = $c;
        Oe.INSPECT_MAX_BYTES = 50;
        var yi = 2147483647;
        Oe.kMaxLength = yi;
        f.TYPED_ARRAY_SUPPORT = qc();
        !f.TYPED_ARRAY_SUPPORT &&
            typeof console != "undefined" &&
            typeof console.error == "function" &&
            console.error(
                "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
            );
        function qc() {
            try {
                let i = new Uint8Array(1),
                    t = {
                        foo: function () {
                            return 42;
                        },
                    };
                return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(i, t), i.foo() === 42;
            } catch (i) {
                return !1;
            }
        }
        Object.defineProperty(f.prototype, "parent", {
            enumerable: !0,
            get: function () {
                if (!!f.isBuffer(this)) return this.buffer;
            },
        });
        Object.defineProperty(f.prototype, "offset", {
            enumerable: !0,
            get: function () {
                if (!!f.isBuffer(this)) return this.byteOffset;
            },
        });
        function Mt(i) {
            if (i > yi) throw new RangeError('The value "' + i + '" is invalid for option "size"');
            let t = new Uint8Array(i);
            return Object.setPrototypeOf(t, f.prototype), t;
        }
        function f(i, t, e) {
            if (typeof i == "number") {
                if (typeof t == "string")
                    throw new TypeError('The "string" argument must be of type string. Received type number');
                return mr(i);
            }
            return Vn(i, t, e);
        }
        f.poolSize = 8192;
        function Vn(i, t, e) {
            if (typeof i == "string") return Yc(i, t);
            if (ArrayBuffer.isView(i)) return Jc(i);
            if (i == null)
                throw new TypeError(
                    "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                        typeof i
                );
            if (
                Ct(i, ArrayBuffer) ||
                (i && Ct(i.buffer, ArrayBuffer)) ||
                (typeof SharedArrayBuffer != "undefined" &&
                    (Ct(i, SharedArrayBuffer) || (i && Ct(i.buffer, SharedArrayBuffer))))
            )
                return br(i, t, e);
            if (typeof i == "number")
                throw new TypeError('The "value" argument must not be of type number. Received type number');
            let r = i.valueOf && i.valueOf();
            if (r != null && r !== i) return f.from(r, t, e);
            let n = Kc(i);
            if (n) return n;
            if (
                typeof Symbol != "undefined" &&
                Symbol.toPrimitive != null &&
                typeof i[Symbol.toPrimitive] == "function"
            )
                return f.from(i[Symbol.toPrimitive]("string"), t, e);
            throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof i
            );
        }
        f.from = function (i, t, e) {
            return Vn(i, t, e);
        };
        Object.setPrototypeOf(f.prototype, Uint8Array.prototype);
        Object.setPrototypeOf(f, Uint8Array);
        function Fn(i) {
            if (typeof i != "number") throw new TypeError('"size" argument must be of type number');
            if (i < 0) throw new RangeError('The value "' + i + '" is invalid for option "size"');
        }
        function Wc(i, t, e) {
            return (
                Fn(i), i <= 0 ? Mt(i) : t !== void 0 ? (typeof e == "string" ? Mt(i).fill(t, e) : Mt(i).fill(t)) : Mt(i)
            );
        }
        f.alloc = function (i, t, e) {
            return Wc(i, t, e);
        };
        function mr(i) {
            return Fn(i), Mt(i < 0 ? 0 : gr(i) | 0);
        }
        f.allocUnsafe = function (i) {
            return mr(i);
        };
        f.allocUnsafeSlow = function (i) {
            return mr(i);
        };
        function Yc(i, t) {
            if (((typeof t != "string" || t === "") && (t = "utf8"), !f.isEncoding(t)))
                throw new TypeError("Unknown encoding: " + t);
            let e = Hn(i, t) | 0,
                r = Mt(e),
                n = r.write(i, t);
            return n !== e && (r = r.slice(0, n)), r;
        }
        function vr(i) {
            let t = i.length < 0 ? 0 : gr(i.length) | 0,
                e = Mt(t);
            for (let r = 0; r < t; r += 1) e[r] = i[r] & 255;
            return e;
        }
        function Jc(i) {
            if (Ct(i, Uint8Array)) {
                let t = new Uint8Array(i);
                return br(t.buffer, t.byteOffset, t.byteLength);
            }
            return vr(i);
        }
        function br(i, t, e) {
            if (t < 0 || i.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
            if (i.byteLength < t + (e || 0)) throw new RangeError('"length" is outside of buffer bounds');
            let r;
            return (
                t === void 0 && e === void 0
                    ? (r = new Uint8Array(i))
                    : e === void 0
                    ? (r = new Uint8Array(i, t))
                    : (r = new Uint8Array(i, t, e)),
                Object.setPrototypeOf(r, f.prototype),
                r
            );
        }
        function Kc(i) {
            if (f.isBuffer(i)) {
                let t = gr(i.length) | 0,
                    e = Mt(t);
                return e.length === 0 || i.copy(e, 0, 0, t), e;
            }
            if (i.length !== void 0) return typeof i.length != "number" || Dr(i.length) ? Mt(0) : vr(i);
            if (i.type === "Buffer" && Array.isArray(i.data)) return vr(i.data);
        }
        function gr(i) {
            if (i >= yi)
                throw new RangeError(
                    "Attempt to allocate Buffer larger than maximum size: 0x" + yi.toString(16) + " bytes"
                );
            return i | 0;
        }
        function $c(i) {
            return +i != i && (i = 0), f.alloc(+i);
        }
        f.isBuffer = function (t) {
            return t != null && t._isBuffer === !0 && t !== f.prototype;
        };
        f.compare = function (t, e) {
            if (
                (Ct(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)),
                Ct(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)),
                !f.isBuffer(t) || !f.isBuffer(e))
            )
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === e) return 0;
            let r = t.length,
                n = e.length;
            for (let o = 0, s = Math.min(r, n); o < s; ++o)
                if (t[o] !== e[o]) {
                    (r = t[o]), (n = e[o]);
                    break;
                }
            return r < n ? -1 : n < r ? 1 : 0;
        };
        f.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1;
            }
        };
        f.concat = function (t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (t.length === 0) return f.alloc(0);
            let r;
            if (e === void 0) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            let n = f.allocUnsafe(e),
                o = 0;
            for (r = 0; r < t.length; ++r) {
                let s = t[r];
                if (Ct(s, Uint8Array))
                    o + s.length > n.length
                        ? (f.isBuffer(s) || (s = f.from(s)), s.copy(n, o))
                        : Uint8Array.prototype.set.call(n, s, o);
                else if (f.isBuffer(s)) s.copy(n, o);
                else throw new TypeError('"list" argument must be an Array of Buffers');
                o += s.length;
            }
            return n;
        };
        function Hn(i, t) {
            if (f.isBuffer(i)) return i.length;
            if (ArrayBuffer.isView(i) || Ct(i, ArrayBuffer)) return i.byteLength;
            if (typeof i != "string")
                throw new TypeError(
                    'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                        typeof i
                );
            let e = i.length,
                r = arguments.length > 2 && arguments[2] === !0;
            if (!r && e === 0) return 0;
            let n = !1;
            for (;;)
                switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return e;
                    case "utf8":
                    case "utf-8":
                        return Cr(i).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return e * 2;
                    case "hex":
                        return e >>> 1;
                    case "base64":
                        return zn(i).length;
                    default:
                        if (n) return r ? -1 : Cr(i).length;
                        (t = ("" + t).toLowerCase()), (n = !0);
                }
        }
        f.byteLength = Hn;
        function Qc(i, t, e) {
            let r = !1;
            if (
                ((t === void 0 || t < 0) && (t = 0),
                t > this.length ||
                    ((e === void 0 || e > this.length) && (e = this.length), e <= 0) ||
                    ((e >>>= 0), (t >>>= 0), e <= t))
            )
                return "";
            for (i || (i = "utf8"); ; )
                switch (i) {
                    case "hex":
                        return sa(this, t, e);
                    case "utf8":
                    case "utf-8":
                        return qn(this, t, e);
                    case "ascii":
                        return na(this, t, e);
                    case "latin1":
                    case "binary":
                        return oa(this, t, e);
                    case "base64":
                        return ia(this, t, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return ca(this, t, e);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + i);
                        (i = (i + "").toLowerCase()), (r = !0);
                }
        }
        f.prototype._isBuffer = !0;
        function ae(i, t, e) {
            let r = i[t];
            (i[t] = i[e]), (i[e] = r);
        }
        f.prototype.swap16 = function () {
            let t = this.length;
            if (t % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let e = 0; e < t; e += 2) ae(this, e, e + 1);
            return this;
        };
        f.prototype.swap32 = function () {
            let t = this.length;
            if (t % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let e = 0; e < t; e += 4) ae(this, e, e + 3), ae(this, e + 1, e + 2);
            return this;
        };
        f.prototype.swap64 = function () {
            let t = this.length;
            if (t % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let e = 0; e < t; e += 8)
                ae(this, e, e + 7), ae(this, e + 1, e + 6), ae(this, e + 2, e + 5), ae(this, e + 3, e + 4);
            return this;
        };
        f.prototype.toString = function () {
            let t = this.length;
            return t === 0 ? "" : arguments.length === 0 ? qn(this, 0, t) : Qc.apply(this, arguments);
        };
        f.prototype.toLocaleString = f.prototype.toString;
        f.prototype.equals = function (t) {
            if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t ? !0 : f.compare(this, t) === 0;
        };
        f.prototype.inspect = function () {
            let t = "",
                e = Oe.INSPECT_MAX_BYTES;
            return (
                (t = this.toString("hex", 0, e)
                    .replace(/(.{2})/g, "$1 ")
                    .trim()),
                this.length > e && (t += " ... "),
                "<Buffer " + t + ">"
            );
        };
        Bn && (f.prototype[Bn] = f.prototype.inspect);
        f.prototype.compare = function (t, e, r, n, o) {
            if ((Ct(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(t)))
                throw new TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
                );
            if (
                (e === void 0 && (e = 0),
                r === void 0 && (r = t ? t.length : 0),
                n === void 0 && (n = 0),
                o === void 0 && (o = this.length),
                e < 0 || r > t.length || n < 0 || o > this.length)
            )
                throw new RangeError("out of range index");
            if (n >= o && e >= r) return 0;
            if (n >= o) return -1;
            if (e >= r) return 1;
            if (((e >>>= 0), (r >>>= 0), (n >>>= 0), (o >>>= 0), this === t)) return 0;
            let s = o - n,
                c = r - e,
                a = Math.min(s, c),
                l = this.slice(n, o),
                h = t.slice(e, r);
            for (let E = 0; E < a; ++E)
                if (l[E] !== h[E]) {
                    (s = l[E]), (c = h[E]);
                    break;
                }
            return s < c ? -1 : c < s ? 1 : 0;
        };
        function Gn(i, t, e, r, n) {
            if (i.length === 0) return -1;
            if (
                (typeof e == "string"
                    ? ((r = e), (e = 0))
                    : e > 2147483647
                    ? (e = 2147483647)
                    : e < -2147483648 && (e = -2147483648),
                (e = +e),
                Dr(e) && (e = n ? 0 : i.length - 1),
                e < 0 && (e = i.length + e),
                e >= i.length)
            ) {
                if (n) return -1;
                e = i.length - 1;
            } else if (e < 0)
                if (n) e = 0;
                else return -1;
            if ((typeof t == "string" && (t = f.from(t, r)), f.isBuffer(t)))
                return t.length === 0 ? -1 : kn(i, t, e, r, n);
            if (typeof t == "number")
                return (
                    (t = t & 255),
                    typeof Uint8Array.prototype.indexOf == "function"
                        ? n
                            ? Uint8Array.prototype.indexOf.call(i, t, e)
                            : Uint8Array.prototype.lastIndexOf.call(i, t, e)
                        : kn(i, [t], e, r, n)
                );
            throw new TypeError("val must be string, number or Buffer");
        }
        function kn(i, t, e, r, n) {
            let o = 1,
                s = i.length,
                c = t.length;
            if (
                r !== void 0 &&
                ((r = String(r).toLowerCase()), r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le")
            ) {
                if (i.length < 2 || t.length < 2) return -1;
                (o = 2), (s /= 2), (c /= 2), (e /= 2);
            }
            function a(h, E) {
                return o === 1 ? h[E] : h.readUInt16BE(E * o);
            }
            let l;
            if (n) {
                let h = -1;
                for (l = e; l < s; l++)
                    if (a(i, l) === a(t, h === -1 ? 0 : l - h)) {
                        if ((h === -1 && (h = l), l - h + 1 === c)) return h * o;
                    } else h !== -1 && (l -= l - h), (h = -1);
            } else
                for (e + c > s && (e = s - c), l = e; l >= 0; l--) {
                    let h = !0;
                    for (let E = 0; E < c; E++)
                        if (a(i, l + E) !== a(t, E)) {
                            h = !1;
                            break;
                        }
                    if (h) return l;
                }
            return -1;
        }
        f.prototype.includes = function (t, e, r) {
            return this.indexOf(t, e, r) !== -1;
        };
        f.prototype.indexOf = function (t, e, r) {
            return Gn(this, t, e, r, !0);
        };
        f.prototype.lastIndexOf = function (t, e, r) {
            return Gn(this, t, e, r, !1);
        };
        function zc(i, t, e, r) {
            e = Number(e) || 0;
            let n = i.length - e;
            r ? ((r = Number(r)), r > n && (r = n)) : (r = n);
            let o = t.length;
            r > o / 2 && (r = o / 2);
            let s;
            for (s = 0; s < r; ++s) {
                let c = parseInt(t.substr(s * 2, 2), 16);
                if (Dr(c)) return s;
                i[e + s] = c;
            }
            return s;
        }
        function Xc(i, t, e, r) {
            return Ri(Cr(t, i.length - e), i, e, r);
        }
        function Zc(i, t, e, r) {
            return Ri(ha(t), i, e, r);
        }
        function ta(i, t, e, r) {
            return Ri(zn(t), i, e, r);
        }
        function ea(i, t, e, r) {
            return Ri(fa(t, i.length - e), i, e, r);
        }
        f.prototype.write = function (t, e, r, n) {
            if (e === void 0) (n = "utf8"), (r = this.length), (e = 0);
            else if (r === void 0 && typeof e == "string") (n = e), (r = this.length), (e = 0);
            else if (isFinite(e))
                (e = e >>> 0), isFinite(r) ? ((r = r >>> 0), n === void 0 && (n = "utf8")) : ((n = r), (r = void 0));
            else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            let o = this.length - e;
            if (((r === void 0 || r > o) && (r = o), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
                throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            let s = !1;
            for (;;)
                switch (n) {
                    case "hex":
                        return zc(this, t, e, r);
                    case "utf8":
                    case "utf-8":
                        return Xc(this, t, e, r);
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return Zc(this, t, e, r);
                    case "base64":
                        return ta(this, t, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return ea(this, t, e, r);
                    default:
                        if (s) throw new TypeError("Unknown encoding: " + n);
                        (n = ("" + n).toLowerCase()), (s = !0);
                }
        };
        f.prototype.toJSON = function () {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };
        function ia(i, t, e) {
            return t === 0 && e === i.length ? Ir.fromByteArray(i) : Ir.fromByteArray(i.slice(t, e));
        }
        function qn(i, t, e) {
            e = Math.min(i.length, e);
            let r = [],
                n = t;
            for (; n < e; ) {
                let o = i[n],
                    s = null,
                    c = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                if (n + c <= e) {
                    let a, l, h, E;
                    switch (c) {
                        case 1:
                            o < 128 && (s = o);
                            break;
                        case 2:
                            (a = i[n + 1]), (a & 192) === 128 && ((E = ((o & 31) << 6) | (a & 63)), E > 127 && (s = E));
                            break;
                        case 3:
                            (a = i[n + 1]),
                                (l = i[n + 2]),
                                (a & 192) === 128 &&
                                    (l & 192) === 128 &&
                                    ((E = ((o & 15) << 12) | ((a & 63) << 6) | (l & 63)),
                                    E > 2047 && (E < 55296 || E > 57343) && (s = E));
                            break;
                        case 4:
                            (a = i[n + 1]),
                                (l = i[n + 2]),
                                (h = i[n + 3]),
                                (a & 192) === 128 &&
                                    (l & 192) === 128 &&
                                    (h & 192) === 128 &&
                                    ((E = ((o & 15) << 18) | ((a & 63) << 12) | ((l & 63) << 6) | (h & 63)),
                                    E > 65535 && E < 1114112 && (s = E));
                    }
                }
                s === null
                    ? ((s = 65533), (c = 1))
                    : s > 65535 && ((s -= 65536), r.push(((s >>> 10) & 1023) | 55296), (s = 56320 | (s & 1023))),
                    r.push(s),
                    (n += c);
            }
            return ra(r);
        }
        var xn = 4096;
        function ra(i) {
            let t = i.length;
            if (t <= xn) return String.fromCharCode.apply(String, i);
            let e = "",
                r = 0;
            for (; r < t; ) e += String.fromCharCode.apply(String, i.slice(r, (r += xn)));
            return e;
        }
        function na(i, t, e) {
            let r = "";
            e = Math.min(i.length, e);
            for (let n = t; n < e; ++n) r += String.fromCharCode(i[n] & 127);
            return r;
        }
        function oa(i, t, e) {
            let r = "";
            e = Math.min(i.length, e);
            for (let n = t; n < e; ++n) r += String.fromCharCode(i[n]);
            return r;
        }
        function sa(i, t, e) {
            let r = i.length;
            (!t || t < 0) && (t = 0), (!e || e < 0 || e > r) && (e = r);
            let n = "";
            for (let o = t; o < e; ++o) n += da[i[o]];
            return n;
        }
        function ca(i, t, e) {
            let r = i.slice(t, e),
                n = "";
            for (let o = 0; o < r.length - 1; o += 2) n += String.fromCharCode(r[o] + r[o + 1] * 256);
            return n;
        }
        f.prototype.slice = function (t, e) {
            let r = this.length;
            (t = ~~t),
                (e = e === void 0 ? r : ~~e),
                t < 0 ? ((t += r), t < 0 && (t = 0)) : t > r && (t = r),
                e < 0 ? ((e += r), e < 0 && (e = 0)) : e > r && (e = r),
                e < t && (e = t);
            let n = this.subarray(t, e);
            return Object.setPrototypeOf(n, f.prototype), n;
        };
        function q(i, t, e) {
            if (i % 1 !== 0 || i < 0) throw new RangeError("offset is not uint");
            if (i + t > e) throw new RangeError("Trying to access beyond buffer length");
        }
        f.prototype.readUintLE = f.prototype.readUIntLE = function (t, e, r) {
            (t = t >>> 0), (e = e >>> 0), r || q(t, e, this.length);
            let n = this[t],
                o = 1,
                s = 0;
            for (; ++s < e && (o *= 256); ) n += this[t + s] * o;
            return n;
        };
        f.prototype.readUintBE = f.prototype.readUIntBE = function (t, e, r) {
            (t = t >>> 0), (e = e >>> 0), r || q(t, e, this.length);
            let n = this[t + --e],
                o = 1;
            for (; e > 0 && (o *= 256); ) n += this[t + --e] * o;
            return n;
        };
        f.prototype.readUint8 = f.prototype.readUInt8 = function (t, e) {
            return (t = t >>> 0), e || q(t, 1, this.length), this[t];
        };
        f.prototype.readUint16LE = f.prototype.readUInt16LE = function (t, e) {
            return (t = t >>> 0), e || q(t, 2, this.length), this[t] | (this[t + 1] << 8);
        };
        f.prototype.readUint16BE = f.prototype.readUInt16BE = function (t, e) {
            return (t = t >>> 0), e || q(t, 2, this.length), (this[t] << 8) | this[t + 1];
        };
        f.prototype.readUint32LE = f.prototype.readUInt32LE = function (t, e) {
            return (
                (t = t >>> 0),
                e || q(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + this[t + 3] * 16777216
            );
        };
        f.prototype.readUint32BE = f.prototype.readUInt32BE = function (t, e) {
            return (
                (t = t >>> 0),
                e || q(t, 4, this.length),
                this[t] * 16777216 + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
        };
        f.prototype.readBigUInt64LE = xt(function (t) {
            (t = t >>> 0), _e(t, "offset");
            let e = this[t],
                r = this[t + 7];
            (e === void 0 || r === void 0) && We(t, this.length - 8);
            let n = e + this[++t] * w(2, 8) + this[++t] * w(2, 16) + this[++t] * w(2, 24),
                o = this[++t] + this[++t] * w(2, 8) + this[++t] * w(2, 16) + r * w(2, 24);
            return BigInt(n) + (BigInt(o) << BigInt(32));
        });
        f.prototype.readBigUInt64BE = xt(function (t) {
            (t = t >>> 0), _e(t, "offset");
            let e = this[t],
                r = this[t + 7];
            (e === void 0 || r === void 0) && We(t, this.length - 8);
            let n = e * w(2, 24) + this[++t] * w(2, 16) + this[++t] * w(2, 8) + this[++t],
                o = this[++t] * w(2, 24) + this[++t] * w(2, 16) + this[++t] * w(2, 8) + r;
            return (BigInt(n) << BigInt(32)) + BigInt(o);
        });
        f.prototype.readIntLE = function (t, e, r) {
            (t = t >>> 0), (e = e >>> 0), r || q(t, e, this.length);
            let n = this[t],
                o = 1,
                s = 0;
            for (; ++s < e && (o *= 256); ) n += this[t + s] * o;
            return (o *= 128), n >= o && (n -= Math.pow(2, 8 * e)), n;
        };
        f.prototype.readIntBE = function (t, e, r) {
            (t = t >>> 0), (e = e >>> 0), r || q(t, e, this.length);
            let n = e,
                o = 1,
                s = this[t + --n];
            for (; n > 0 && (o *= 256); ) s += this[t + --n] * o;
            return (o *= 128), s >= o && (s -= Math.pow(2, 8 * e)), s;
        };
        f.prototype.readInt8 = function (t, e) {
            return (t = t >>> 0), e || q(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
        };
        f.prototype.readInt16LE = function (t, e) {
            (t = t >>> 0), e || q(t, 2, this.length);
            let r = this[t] | (this[t + 1] << 8);
            return r & 32768 ? r | 4294901760 : r;
        };
        f.prototype.readInt16BE = function (t, e) {
            (t = t >>> 0), e || q(t, 2, this.length);
            let r = this[t + 1] | (this[t] << 8);
            return r & 32768 ? r | 4294901760 : r;
        };
        f.prototype.readInt32LE = function (t, e) {
            return (
                (t = t >>> 0),
                e || q(t, 4, this.length),
                this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
            );
        };
        f.prototype.readInt32BE = function (t, e) {
            return (
                (t = t >>> 0),
                e || q(t, 4, this.length),
                (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
            );
        };
        f.prototype.readBigInt64LE = xt(function (t) {
            (t = t >>> 0), _e(t, "offset");
            let e = this[t],
                r = this[t + 7];
            (e === void 0 || r === void 0) && We(t, this.length - 8);
            let n = this[t + 4] + this[t + 5] * w(2, 8) + this[t + 6] * w(2, 16) + (r << 24);
            return (
                (BigInt(n) << BigInt(32)) +
                BigInt(e + this[++t] * w(2, 8) + this[++t] * w(2, 16) + this[++t] * w(2, 24))
            );
        });
        f.prototype.readBigInt64BE = xt(function (t) {
            (t = t >>> 0), _e(t, "offset");
            let e = this[t],
                r = this[t + 7];
            (e === void 0 || r === void 0) && We(t, this.length - 8);
            let n = (e << 24) + this[++t] * w(2, 16) + this[++t] * w(2, 8) + this[++t];
            return (
                (BigInt(n) << BigInt(32)) +
                BigInt(this[++t] * w(2, 24) + this[++t] * w(2, 16) + this[++t] * w(2, 8) + r)
            );
        });
        f.prototype.readFloatLE = function (t, e) {
            return (t = t >>> 0), e || q(t, 4, this.length), Se.read(this, t, !0, 23, 4);
        };
        f.prototype.readFloatBE = function (t, e) {
            return (t = t >>> 0), e || q(t, 4, this.length), Se.read(this, t, !1, 23, 4);
        };
        f.prototype.readDoubleLE = function (t, e) {
            return (t = t >>> 0), e || q(t, 8, this.length), Se.read(this, t, !0, 52, 8);
        };
        f.prototype.readDoubleBE = function (t, e) {
            return (t = t >>> 0), e || q(t, 8, this.length), Se.read(this, t, !1, 52, 8);
        };
        function nt(i, t, e, r, n, o) {
            if (!f.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > n || t < o) throw new RangeError('"value" argument is out of bounds');
            if (e + r > i.length) throw new RangeError("Index out of range");
        }
        f.prototype.writeUintLE = f.prototype.writeUIntLE = function (t, e, r, n) {
            if (((t = +t), (e = e >>> 0), (r = r >>> 0), !n)) {
                let c = Math.pow(2, 8 * r) - 1;
                nt(this, t, e, r, c, 0);
            }
            let o = 1,
                s = 0;
            for (this[e] = t & 255; ++s < r && (o *= 256); ) this[e + s] = (t / o) & 255;
            return e + r;
        };
        f.prototype.writeUintBE = f.prototype.writeUIntBE = function (t, e, r, n) {
            if (((t = +t), (e = e >>> 0), (r = r >>> 0), !n)) {
                let c = Math.pow(2, 8 * r) - 1;
                nt(this, t, e, r, c, 0);
            }
            let o = r - 1,
                s = 1;
            for (this[e + o] = t & 255; --o >= 0 && (s *= 256); ) this[e + o] = (t / s) & 255;
            return e + r;
        };
        f.prototype.writeUint8 = f.prototype.writeUInt8 = function (t, e, r) {
            return (t = +t), (e = e >>> 0), r || nt(this, t, e, 1, 255, 0), (this[e] = t & 255), e + 1;
        };
        f.prototype.writeUint16LE = f.prototype.writeUInt16LE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 2, 65535, 0),
                (this[e] = t & 255),
                (this[e + 1] = t >>> 8),
                e + 2
            );
        };
        f.prototype.writeUint16BE = f.prototype.writeUInt16BE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = t & 255),
                e + 2
            );
        };
        f.prototype.writeUint32LE = f.prototype.writeUInt32LE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = t & 255),
                e + 4
            );
        };
        f.prototype.writeUint32BE = f.prototype.writeUInt32BE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = t & 255),
                e + 4
            );
        };
        function Wn(i, t, e, r, n) {
            Qn(t, r, n, i, e, 7);
            let o = Number(t & BigInt(4294967295));
            (i[e++] = o), (o = o >> 8), (i[e++] = o), (o = o >> 8), (i[e++] = o), (o = o >> 8), (i[e++] = o);
            let s = Number((t >> BigInt(32)) & BigInt(4294967295));
            return (i[e++] = s), (s = s >> 8), (i[e++] = s), (s = s >> 8), (i[e++] = s), (s = s >> 8), (i[e++] = s), e;
        }
        function Yn(i, t, e, r, n) {
            Qn(t, r, n, i, e, 7);
            let o = Number(t & BigInt(4294967295));
            (i[e + 7] = o), (o = o >> 8), (i[e + 6] = o), (o = o >> 8), (i[e + 5] = o), (o = o >> 8), (i[e + 4] = o);
            let s = Number((t >> BigInt(32)) & BigInt(4294967295));
            return (
                (i[e + 3] = s),
                (s = s >> 8),
                (i[e + 2] = s),
                (s = s >> 8),
                (i[e + 1] = s),
                (s = s >> 8),
                (i[e] = s),
                e + 8
            );
        }
        f.prototype.writeBigUInt64LE = xt(function (t, e = 0) {
            return Wn(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        });
        f.prototype.writeBigUInt64BE = xt(function (t, e = 0) {
            return Yn(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        });
        f.prototype.writeIntLE = function (t, e, r, n) {
            if (((t = +t), (e = e >>> 0), !n)) {
                let a = Math.pow(2, 8 * r - 1);
                nt(this, t, e, r, a - 1, -a);
            }
            let o = 0,
                s = 1,
                c = 0;
            for (this[e] = t & 255; ++o < r && (s *= 256); )
                t < 0 && c === 0 && this[e + o - 1] !== 0 && (c = 1), (this[e + o] = (((t / s) >> 0) - c) & 255);
            return e + r;
        };
        f.prototype.writeIntBE = function (t, e, r, n) {
            if (((t = +t), (e = e >>> 0), !n)) {
                let a = Math.pow(2, 8 * r - 1);
                nt(this, t, e, r, a - 1, -a);
            }
            let o = r - 1,
                s = 1,
                c = 0;
            for (this[e + o] = t & 255; --o >= 0 && (s *= 256); )
                t < 0 && c === 0 && this[e + o + 1] !== 0 && (c = 1), (this[e + o] = (((t / s) >> 0) - c) & 255);
            return e + r;
        };
        f.prototype.writeInt8 = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 1, 127, -128),
                t < 0 && (t = 255 + t + 1),
                (this[e] = t & 255),
                e + 1
            );
        };
        f.prototype.writeInt16LE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 2, 32767, -32768),
                (this[e] = t & 255),
                (this[e + 1] = t >>> 8),
                e + 2
            );
        };
        f.prototype.writeInt16BE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 2, 32767, -32768),
                (this[e] = t >>> 8),
                (this[e + 1] = t & 255),
                e + 2
            );
        };
        f.prototype.writeInt32LE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 4, 2147483647, -2147483648),
                (this[e] = t & 255),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24),
                e + 4
            );
        };
        f.prototype.writeInt32BE = function (t, e, r) {
            return (
                (t = +t),
                (e = e >>> 0),
                r || nt(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = t & 255),
                e + 4
            );
        };
        f.prototype.writeBigInt64LE = xt(function (t, e = 0) {
            return Wn(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
        });
        f.prototype.writeBigInt64BE = xt(function (t, e = 0) {
            return Yn(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
        });
        function Jn(i, t, e, r, n, o) {
            if (e + r > i.length) throw new RangeError("Index out of range");
            if (e < 0) throw new RangeError("Index out of range");
        }
        function Kn(i, t, e, r, n) {
            return (
                (t = +t),
                (e = e >>> 0),
                n || Jn(i, t, e, 4, 34028234663852886e22, -34028234663852886e22),
                Se.write(i, t, e, r, 23, 4),
                e + 4
            );
        }
        f.prototype.writeFloatLE = function (t, e, r) {
            return Kn(this, t, e, !0, r);
        };
        f.prototype.writeFloatBE = function (t, e, r) {
            return Kn(this, t, e, !1, r);
        };
        function $n(i, t, e, r, n) {
            return (
                (t = +t),
                (e = e >>> 0),
                n || Jn(i, t, e, 8, 17976931348623157e292, -17976931348623157e292),
                Se.write(i, t, e, r, 52, 8),
                e + 8
            );
        }
        f.prototype.writeDoubleLE = function (t, e, r) {
            return $n(this, t, e, !0, r);
        };
        f.prototype.writeDoubleBE = function (t, e, r) {
            return $n(this, t, e, !1, r);
        };
        f.prototype.copy = function (t, e, r, n) {
            if (!f.isBuffer(t)) throw new TypeError("argument should be a Buffer");
            if (
                (r || (r = 0),
                !n && n !== 0 && (n = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                n > 0 && n < r && (n = r),
                n === r || t.length === 0 || this.length === 0)
            )
                return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            let o = n - r;
            return (
                this === t && typeof Uint8Array.prototype.copyWithin == "function"
                    ? this.copyWithin(e, r, n)
                    : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
                o
            );
        };
        f.prototype.fill = function (t, e, r, n) {
            if (typeof t == "string") {
                if (
                    (typeof e == "string"
                        ? ((n = e), (e = 0), (r = this.length))
                        : typeof r == "string" && ((n = r), (r = this.length)),
                    n !== void 0 && typeof n != "string")
                )
                    throw new TypeError("encoding must be a string");
                if (typeof n == "string" && !f.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                if (t.length === 1) {
                    let s = t.charCodeAt(0);
                    ((n === "utf8" && s < 128) || n === "latin1") && (t = s);
                }
            } else typeof t == "number" ? (t = t & 255) : typeof t == "boolean" && (t = Number(t));
            if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
            if (r <= e) return this;
            (e = e >>> 0), (r = r === void 0 ? this.length : r >>> 0), t || (t = 0);
            let o;
            if (typeof t == "number") for (o = e; o < r; ++o) this[o] = t;
            else {
                let s = f.isBuffer(t) ? t : f.from(t, n),
                    c = s.length;
                if (c === 0) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                for (o = 0; o < r - e; ++o) this[o + e] = s[o % c];
            }
            return this;
        };
        var Re = {};
        function Ar(i, t, e) {
            Re[i] = class extends e {
                constructor() {
                    super(),
                        Object.defineProperty(this, "message", {
                            value: t.apply(this, arguments),
                            writable: !0,
                            configurable: !0,
                        }),
                        (this.name = `${this.name} [${i}]`),
                        this.stack,
                        delete this.name;
                }
                get code() {
                    return i;
                }
                set code(n) {
                    Object.defineProperty(this, "code", { configurable: !0, enumerable: !0, value: n, writable: !0 });
                }
                toString() {
                    return `${this.name} [${i}]: ${this.message}`;
                }
            };
        }
        Ar(
            "ERR_BUFFER_OUT_OF_BOUNDS",
            function (i) {
                return i ? `${i} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
            },
            RangeError
        );
        Ar(
            "ERR_INVALID_ARG_TYPE",
            function (i, t) {
                return `The "${i}" argument must be of type number. Received type ${typeof t}`;
            },
            TypeError
        );
        Ar(
            "ERR_OUT_OF_RANGE",
            function (i, t, e) {
                let r = `The value of "${i}" is out of range.`,
                    n = e;
                return (
                    Number.isInteger(e) && Math.abs(e) > w(2, 32)
                        ? (n = jn(String(e)))
                        : typeof e == "bigint" &&
                          ((n = String(e)),
                          (e > w(BigInt(2), BigInt(32)) || e < -w(BigInt(2), BigInt(32))) && (n = jn(n)),
                          (n += "n")),
                    (r += ` It must be ${t}. Received ${n}`),
                    r
                );
            },
            RangeError
        );
        function jn(i) {
            let t = "",
                e = i.length,
                r = i[0] === "-" ? 1 : 0;
            for (; e >= r + 4; e -= 3) t = `_${i.slice(e - 3, e)}${t}`;
            return `${i.slice(0, e)}${t}`;
        }
        function aa(i, t, e) {
            _e(t, "offset"), (i[t] === void 0 || i[t + e] === void 0) && We(t, i.length - (e + 1));
        }
        function Qn(i, t, e, r, n, o) {
            if (i > e || i < t) {
                let s = typeof t == "bigint" ? "n" : "",
                    c;
                throw (
                    (o > 3
                        ? t === 0 || t === BigInt(0)
                            ? (c = `>= 0${s} and < 2${s} ** ${(o + 1) * 8}${s}`)
                            : (c = `>= -(2${s} ** ${(o + 1) * 8 - 1}${s}) and < 2 ** ${(o + 1) * 8 - 1}${s}`)
                        : (c = `>= ${t}${s} and <= ${e}${s}`),
                    new Re.ERR_OUT_OF_RANGE("value", c, i))
                );
            }
            aa(r, n, o);
        }
        function _e(i, t) {
            if (typeof i != "number") throw new Re.ERR_INVALID_ARG_TYPE(t, "number", i);
        }
        function We(i, t, e) {
            throw Math.floor(i) !== i
                ? (_e(i, e), new Re.ERR_OUT_OF_RANGE(e || "offset", "an integer", i))
                : t < 0
                ? new Re.ERR_BUFFER_OUT_OF_BOUNDS()
                : new Re.ERR_OUT_OF_RANGE(e || "offset", `>= ${e ? 1 : 0} and <= ${t}`, i);
        }
        var ua = /[^+/0-9A-Za-z-_]/g;
        function la(i) {
            if (((i = i.split("=")[0]), (i = i.trim().replace(ua, "")), i.length < 2)) return "";
            for (; i.length % 4 !== 0; ) i = i + "=";
            return i;
        }
        function Cr(i, t) {
            t = t || 1 / 0;
            let e,
                r = i.length,
                n = null,
                o = [];
            for (let s = 0; s < r; ++s) {
                if (((e = i.charCodeAt(s)), e > 55295 && e < 57344)) {
                    if (!n) {
                        if (e > 56319) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue;
                        } else if (s + 1 === r) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue;
                        }
                        n = e;
                        continue;
                    }
                    if (e < 56320) {
                        (t -= 3) > -1 && o.push(239, 191, 189), (n = e);
                        continue;
                    }
                    e = (((n - 55296) << 10) | (e - 56320)) + 65536;
                } else n && (t -= 3) > -1 && o.push(239, 191, 189);
                if (((n = null), e < 128)) {
                    if ((t -= 1) < 0) break;
                    o.push(e);
                } else if (e < 2048) {
                    if ((t -= 2) < 0) break;
                    o.push((e >> 6) | 192, (e & 63) | 128);
                } else if (e < 65536) {
                    if ((t -= 3) < 0) break;
                    o.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (e & 63) | 128);
                } else if (e < 1114112) {
                    if ((t -= 4) < 0) break;
                    o.push((e >> 18) | 240, ((e >> 12) & 63) | 128, ((e >> 6) & 63) | 128, (e & 63) | 128);
                } else throw new Error("Invalid code point");
            }
            return o;
        }
        function ha(i) {
            let t = [];
            for (let e = 0; e < i.length; ++e) t.push(i.charCodeAt(e) & 255);
            return t;
        }
        function fa(i, t) {
            let e,
                r,
                n,
                o = [];
            for (let s = 0; s < i.length && !((t -= 2) < 0); ++s)
                (e = i.charCodeAt(s)), (r = e >> 8), (n = e % 256), o.push(n), o.push(r);
            return o;
        }
        function zn(i) {
            return Ir.toByteArray(la(i));
        }
        function Ri(i, t, e, r) {
            let n;
            for (n = 0; n < r && !(n + e >= t.length || n >= i.length); ++n) t[n + e] = i[n];
            return n;
        }
        function Ct(i, t) {
            return (
                i instanceof t ||
                (i != null && i.constructor != null && i.constructor.name != null && i.constructor.name === t.name)
            );
        }
        function Dr(i) {
            return i !== i;
        }
        var da = (function () {
            let i = "0123456789abcdef",
                t = new Array(256);
            for (let e = 0; e < 16; ++e) {
                let r = e * 16;
                for (let n = 0; n < 16; ++n) t[r + n] = i[e] + i[n];
            }
            return t;
        })();
        function xt(i) {
            return typeof BigInt == "undefined" ? pa : i;
        }
        function pa() {
            throw new Error("BigInt not supported");
        }
    });
    var Buffer,
        u = Mc(() => {
            "use strict";
            Buffer = Xn().Buffer;
        });
    var eo = R((Te) => {
        "use strict";
        u();
        Object.defineProperty(Te, "__esModule", { value: !0 });
        Te.LOCAL_WINS = Te.REMOTE_WINS = void 0;
        var Ea = function (i, t, e, r, n) {
            n(null, e);
        };
        Te.REMOTE_WINS = Ea;
        var ya = function (i, t, e, r, n) {
            n(null, i);
        };
        Te.LOCAL_WINS = ya;
    });
    var io = R((Si) => {
        "use strict";
        u();
        Object.defineProperty(Si, "__esModule", { value: !0 });
        Si.DefaultOptions = void 0;
        var Ra = eo();
        Si.DefaultOptions = {
            nativeTimerRegistry: !0,
            intervalTimerResolution: 50,
            subscriptionInterval: 100,
            heartbeatInterval: 3e4,
            reconnectIntervalIncrement: 4e3,
            maxReconnectInterval: 18e4,
            maxReconnectAttempts: 5,
            subscriptionTimeout: 2e3,
            recordReadAckTimeout: 15e3,
            recordReadTimeout: 15e3,
            recordDeleteTimeout: 15e3,
            offlineBufferTimeout: 2e3,
            recordDiscardTimeout: 5e3,
            offlineEnabled: !1,
            saveUpdatesOffline: !1,
            recordReadOnlyMode: !1,
            recordPrefixWriteWhitelist: [],
            path: "/deepstream",
            mergeStrategy: Ra.REMOTE_WINS,
            recordDeepCopy: !0,
            dirtyStorageName: "__ds__dirty_records",
            nodeStoragePath: "./local-storage",
            indexdb: {
                autoVersion: !1,
                dbVersion: 1,
                primaryKey: "id",
                storageDatabaseName: "deepstream",
                defaultObjectStoreName: "records",
                objectStoreNames: [],
                ignorePrefixes: [],
                flushTimeout: 50,
            },
            nodeStorageSize: 5,
            lazyConnect: !1,
            debug: !1,
            initialRecordVersion: 1,
        };
    });
    var ro = R((_i) => {
        "use strict";
        u();
        Object.defineProperty(_i, "__esModule", { value: !0 });
        var Sa;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.PARSER = 1)] = "PARSER"),
                (i[(i.CONNECTION = 2)] = "CONNECTION"),
                (i[(i.AUTH = 3)] = "AUTH"),
                (i[(i.EVENT = 4)] = "EVENT"),
                (i[(i.RECORD = 5)] = "RECORD"),
                (i[(i.RPC = 6)] = "RPC"),
                (i[(i.PRESENCE = 7)] = "PRESENCE"),
                (i[(i.MONITORING = 8)] = "MONITORING"),
                (i[(i.CLUSTER = 9)] = "CLUSTER"),
                (i[(i.LOCK = 10)] = "LOCK"),
                (i[(i.STATE_REGISTRY = 11)] = "STATE_REGISTRY"),
                (i[(i.ERROR = 100)] = "ERROR");
        })((Sa = _i.TOPIC || (_i.TOPIC = {})));
    });
    var no = R((Oi) => {
        "use strict";
        u();
        Object.defineProperty(Oi, "__esModule", { value: !0 });
        var _a;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.NOTIFY = 2)] = "NOTIFY"),
                (i[(i.READ = 3)] = "READ"),
                (i[(i.READ_RESPONSE = 4)] = "READ_RESPONSE"),
                (i[(i.HEAD = 5)] = "HEAD"),
                (i[(i.HEAD_RESPONSE = 6)] = "HEAD_RESPONSE"),
                (i[(i.HEAD_BULK = 7)] = "HEAD_BULK"),
                (i[(i.HEAD_RESPONSE_BULK = 8)] = "HEAD_RESPONSE_BULK"),
                (i[(i.DELETE = 9)] = "DELETE"),
                (i[(i.DELETE_SUCCESS = 10)] = "DELETE_SUCCESS"),
                (i[(i.DELETE_BULK = 11)] = "DELETE_BULK"),
                (i[(i.DELETE_BULK_SUCCESS = 12)] = "DELETE_BULK_SUCCESS"),
                (i[(i.DELETED = 13)] = "DELETED"),
                (i[(i.WRITE_ACKNOWLEDGEMENT = 14)] = "WRITE_ACKNOWLEDGEMENT"),
                (i[(i.CREATE = 15)] = "CREATE"),
                (i[(i.CREATEANDUPDATE = 16)] = "CREATEANDUPDATE"),
                (i[(i.CREATEANDPATCH = 17)] = "CREATEANDPATCH"),
                (i[(i.UPDATE = 18)] = "UPDATE"),
                (i[(i.PATCH = 19)] = "PATCH"),
                (i[(i.ERASE = 20)] = "ERASE"),
                (i[(i.SUBSCRIBEANDHEAD = 21)] = "SUBSCRIBEANDHEAD"),
                (i[(i.SUBSCRIBEANDREAD = 22)] = "SUBSCRIBEANDREAD"),
                (i[(i.SUBSCRIBECREATEANDREAD = 23)] = "SUBSCRIBECREATEANDREAD"),
                (i[(i.SUBSCRIBECREATEANDUPDATE = 24)] = "SUBSCRIBECREATEANDUPDATE"),
                (i[(i.SUBSCRIBE = 25)] = "SUBSCRIBE"),
                (i[(i.UNSUBSCRIBE = 26)] = "UNSUBSCRIBE"),
                (i[(i.LISTEN = 27)] = "LISTEN"),
                (i[(i.UNLISTEN = 28)] = "UNLISTEN"),
                (i[(i.LISTEN_ACCEPT = 29)] = "LISTEN_ACCEPT"),
                (i[(i.LISTEN_REJECT = 30)] = "LISTEN_REJECT"),
                (i[(i.SUBSCRIPTION_HAS_PROVIDER = 31)] = "SUBSCRIPTION_HAS_PROVIDER"),
                (i[(i.SUBSCRIPTION_HAS_NO_PROVIDER = 32)] = "SUBSCRIPTION_HAS_NO_PROVIDER"),
                (i[(i.SUBSCRIPTION_FOR_PATTERN_FOUND = 33)] = "SUBSCRIPTION_FOR_PATTERN_FOUND"),
                (i[(i.SUBSCRIPTION_FOR_PATTERN_REMOVED = 34)] = "SUBSCRIPTION_FOR_PATTERN_REMOVED"),
                (i[(i.CACHE_RETRIEVAL_TIMEOUT = 100)] = "CACHE_RETRIEVAL_TIMEOUT"),
                (i[(i.STORAGE_RETRIEVAL_TIMEOUT = 101)] = "STORAGE_RETRIEVAL_TIMEOUT"),
                (i[(i.VERSION_EXISTS = 102)] = "VERSION_EXISTS"),
                (i[(i.RECORD_LOAD_ERROR = 103)] = "RECORD_LOAD_ERROR"),
                (i[(i.RECORD_CREATE_ERROR = 104)] = "RECORD_CREATE_ERROR"),
                (i[(i.RECORD_UPDATE_ERROR = 105)] = "RECORD_UPDATE_ERROR"),
                (i[(i.RECORD_DELETE_ERROR = 106)] = "RECORD_DELETE_ERROR"),
                (i[(i.RECORD_NOT_FOUND = 107)] = "RECORD_NOT_FOUND"),
                (i[(i.INVALID_VERSION = 108)] = "INVALID_VERSION"),
                (i[(i.INVALID_PATCH_ON_HOTPATH = 109)] = "INVALID_PATCH_ON_HOTPATH"),
                (i[(i.INVALID_LISTEN_REGEX = 110)] = "INVALID_LISTEN_REGEX"),
                (i[(i.LISTEN_RESPONSE_TIMEOUT = 111)] = "LISTEN_RESPONSE_TIMEOUT"),
                (i[(i.LISTEN_UNSUCCESSFUL = 112)] = "LISTEN_UNSUCCESSFUL"),
                (i[(i.RECORD_NOTIFY_ERROR = 113)] = "RECORD_NOTIFY_ERROR"),
                (i[(i.MESSAGE_PERMISSION_ERROR = 114)] = "MESSAGE_PERMISSION_ERROR"),
                (i[(i.MESSAGE_DENIED = 115)] = "MESSAGE_DENIED"),
                (i[(i.INVALID_MESSAGE_DATA = 116)] = "INVALID_MESSAGE_DATA"),
                (i[(i.MULTIPLE_SUBSCRIPTIONS = 117)] = "MULTIPLE_SUBSCRIPTIONS"),
                (i[(i.NOT_SUBSCRIBED = 118)] = "NOT_SUBSCRIBED");
        })((_a = Oi.RECORD_ACTION || (Oi.RECORD_ACTION = {})));
    });
    var oo = R((Ni) => {
        "use strict";
        u();
        Object.defineProperty(Ni, "__esModule", { value: !0 });
        var Oa;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.REQUEST = 2)] = "REQUEST"),
                (i[(i.AUTH_SUCCESSFUL = 3)] = "AUTH_SUCCESSFUL"),
                (i[(i.AUTH_UNSUCCESSFUL = 4)] = "AUTH_UNSUCCESSFUL"),
                (i[(i.TOO_MANY_AUTH_ATTEMPTS = 100)] = "TOO_MANY_AUTH_ATTEMPTS"),
                (i[(i.INVALID_MESSAGE = 101)] = "INVALID_MESSAGE"),
                (i[(i.INVALID_MESSAGE_DATA = 102)] = "INVALID_MESSAGE_DATA");
        })((Oa = Ni.AUTH_ACTION || (Ni.AUTH_ACTION = {})));
    });
    var so = R((Ti) => {
        "use strict";
        u();
        Object.defineProperty(Ti, "__esModule", { value: !0 });
        var Na;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.EMIT = 2)] = "EMIT"),
                (i[(i.SUBSCRIBE = 3)] = "SUBSCRIBE"),
                (i[(i.UNSUBSCRIBE = 4)] = "UNSUBSCRIBE"),
                (i[(i.LISTEN = 5)] = "LISTEN"),
                (i[(i.UNLISTEN = 6)] = "UNLISTEN"),
                (i[(i.LISTEN_ACCEPT = 7)] = "LISTEN_ACCEPT"),
                (i[(i.LISTEN_REJECT = 8)] = "LISTEN_REJECT"),
                (i[(i.SUBSCRIPTION_HAS_PROVIDER = 9)] = "SUBSCRIPTION_HAS_PROVIDER"),
                (i[(i.SUBSCRIPTION_HAS_NO_PROVIDER = 10)] = "SUBSCRIPTION_HAS_NO_PROVIDER"),
                (i[(i.SUBSCRIPTION_FOR_PATTERN_FOUND = 11)] = "SUBSCRIPTION_FOR_PATTERN_FOUND"),
                (i[(i.SUBSCRIPTION_FOR_PATTERN_REMOVED = 12)] = "SUBSCRIPTION_FOR_PATTERN_REMOVED"),
                (i[(i.INVALID_LISTEN_REGEX = 100)] = "INVALID_LISTEN_REGEX"),
                (i[(i.LISTEN_RESPONSE_TIMEOUT = 101)] = "LISTEN_RESPONSE_TIMEOUT"),
                (i[(i.LISTEN_UNSUCCESSFUL = 102)] = "LISTEN_UNSUCCESSFUL"),
                (i[(i.MESSAGE_PERMISSION_ERROR = 103)] = "MESSAGE_PERMISSION_ERROR"),
                (i[(i.MESSAGE_DENIED = 104)] = "MESSAGE_DENIED"),
                (i[(i.INVALID_MESSAGE_DATA = 105)] = "INVALID_MESSAGE_DATA"),
                (i[(i.MULTIPLE_SUBSCRIPTIONS = 106)] = "MULTIPLE_SUBSCRIPTIONS"),
                (i[(i.NOT_SUBSCRIBED = 107)] = "NOT_SUBSCRIBED");
        })((Na = Ti.EVENT_ACTION || (Ti.EVENT_ACTION = {})));
    });
    var co = R((Ii) => {
        "use strict";
        u();
        Object.defineProperty(Ii, "__esModule", { value: !0 });
        var Ta;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.REQUEST = 2)] = "REQUEST"),
                (i[(i.ACCEPT = 4)] = "ACCEPT"),
                (i[(i.RESPONSE = 5)] = "RESPONSE"),
                (i[(i.REJECT = 6)] = "REJECT"),
                (i[(i.REQUEST_ERROR = 7)] = "REQUEST_ERROR"),
                (i[(i.PROVIDE = 8)] = "PROVIDE"),
                (i[(i.UNPROVIDE = 9)] = "UNPROVIDE"),
                (i[(i.NO_RPC_PROVIDER = 100)] = "NO_RPC_PROVIDER"),
                (i[(i.ACCEPT_TIMEOUT = 101)] = "ACCEPT_TIMEOUT"),
                (i[(i.MULTIPLE_ACCEPT = 102)] = "MULTIPLE_ACCEPT"),
                (i[(i.INVALID_RPC_CORRELATION_ID = 103)] = "INVALID_RPC_CORRELATION_ID"),
                (i[(i.RESPONSE_TIMEOUT = 104)] = "RESPONSE_TIMEOUT"),
                (i[(i.MULTIPLE_RESPONSE = 105)] = "MULTIPLE_RESPONSE"),
                (i[(i.MESSAGE_PERMISSION_ERROR = 106)] = "MESSAGE_PERMISSION_ERROR"),
                (i[(i.MESSAGE_DENIED = 107)] = "MESSAGE_DENIED"),
                (i[(i.INVALID_MESSAGE_DATA = 108)] = "INVALID_MESSAGE_DATA"),
                (i[(i.MULTIPLE_PROVIDERS = 109)] = "MULTIPLE_PROVIDERS"),
                (i[(i.NOT_PROVIDED = 110)] = "NOT_PROVIDED");
        })((Ta = Ii.RPC_ACTION || (Ii.RPC_ACTION = {})));
    });
    var ao = R((vi) => {
        "use strict";
        u();
        Object.defineProperty(vi, "__esModule", { value: !0 });
        var Ia;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.QUERY_ALL = 2)] = "QUERY_ALL"),
                (i[(i.QUERY_ALL_RESPONSE = 3)] = "QUERY_ALL_RESPONSE"),
                (i[(i.QUERY = 4)] = "QUERY"),
                (i[(i.QUERY_RESPONSE = 5)] = "QUERY_RESPONSE"),
                (i[(i.PRESENCE_JOIN = 6)] = "PRESENCE_JOIN"),
                (i[(i.PRESENCE_JOIN_ALL = 7)] = "PRESENCE_JOIN_ALL"),
                (i[(i.PRESENCE_LEAVE = 8)] = "PRESENCE_LEAVE"),
                (i[(i.PRESENCE_LEAVE_ALL = 9)] = "PRESENCE_LEAVE_ALL"),
                (i[(i.SUBSCRIBE = 10)] = "SUBSCRIBE"),
                (i[(i.UNSUBSCRIBE = 11)] = "UNSUBSCRIBE"),
                (i[(i.SUBSCRIBE_ALL = 12)] = "SUBSCRIBE_ALL"),
                (i[(i.UNSUBSCRIBE_ALL = 13)] = "UNSUBSCRIBE_ALL"),
                (i[(i.INVALID_PRESENCE_USERS = 100)] = "INVALID_PRESENCE_USERS"),
                (i[(i.MESSAGE_PERMISSION_ERROR = 101)] = "MESSAGE_PERMISSION_ERROR"),
                (i[(i.MESSAGE_DENIED = 102)] = "MESSAGE_DENIED"),
                (i[(i.MULTIPLE_SUBSCRIPTIONS = 103)] = "MULTIPLE_SUBSCRIPTIONS"),
                (i[(i.NOT_SUBSCRIBED = 104)] = "NOT_SUBSCRIBED");
        })((Ia = vi.PRESENCE_ACTION || (vi.PRESENCE_ACTION = {})));
    });
    var uo = R((bi) => {
        "use strict";
        u();
        Object.defineProperty(bi, "__esModule", { value: !0 });
        var va;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.PING = 2)] = "PING"),
                (i[(i.PONG = 3)] = "PONG"),
                (i[(i.ACCEPT = 4)] = "ACCEPT"),
                (i[(i.CHALLENGE = 5)] = "CHALLENGE"),
                (i[(i.REJECT = 6)] = "REJECT"),
                (i[(i.REDIRECT = 7)] = "REDIRECT"),
                (i[(i.CLOSING = 8)] = "CLOSING"),
                (i[(i.CLOSED = 9)] = "CLOSED"),
                (i[(i.AUTHENTICATION_TIMEOUT = 100)] = "AUTHENTICATION_TIMEOUT"),
                (i[(i.INVALID_MESSAGE = 101)] = "INVALID_MESSAGE");
        })((va = bi.CONNECTION_ACTION || (bi.CONNECTION_ACTION = {})));
    });
    var lo = R((Ci) => {
        "use strict";
        u();
        Object.defineProperty(Ci, "__esModule", { value: !0 });
        var ba;
        (function (i) {
            (i[(i.REMOVE = 1)] = "REMOVE"), (i[(i.STATUS = 2)] = "STATUS");
        })((ba = Ci.CLUSTER_ACTION || (Ci.CLUSTER_ACTION = {})));
    });
    var ho = R((mi) => {
        "use strict";
        u();
        Object.defineProperty(mi, "__esModule", { value: !0 });
        var Ca;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.REQUEST = 2)] = "REQUEST"),
                (i[(i.RESPONSE = 3)] = "RESPONSE"),
                (i[(i.RELEASE = 4)] = "RELEASE");
        })((Ca = mi.LOCK_ACTION || (mi.LOCK_ACTION = {})));
    });
    var fo = R((gi) => {
        "use strict";
        u();
        Object.defineProperty(gi, "__esModule", { value: !0 });
        var ma;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.UNKNOWN_TOPIC = 1)] = "UNKNOWN_TOPIC"),
                (i[(i.UNKNOWN_ACTION = 2)] = "UNKNOWN_ACTION"),
                (i[(i.INVALID_MESSAGE = 3)] = "INVALID_MESSAGE"),
                (i[(i.MESSAGE_PARSE_ERROR = 4)] = "MESSAGE_PARSE_ERROR"),
                (i[(i.MAXIMUM_MESSAGE_SIZE_EXCEEDED = 5)] = "MAXIMUM_MESSAGE_SIZE_EXCEEDED"),
                (i[(i.ERROR = 6)] = "ERROR"),
                (i[(i.INVALID_META_PARAMS = 7)] = "INVALID_META_PARAMS");
        })((ma = gi.PARSER_ACTION || (gi.PARSER_ACTION = {})));
    });
    var po = R((Ai) => {
        "use strict";
        u();
        Object.defineProperty(Ai, "__esModule", { value: !0 });
        var ga;
        (function (i) {})((ga = Ai.MONITORING_ACTION || (Ai.MONITORING_ACTION = {})));
    });
    var Eo = R((Ie) => {
        "use strict";
        u();
        Object.defineProperty(Ie, "__esModule", { value: !0 });
        var Aa;
        (function (i) {
            (i[(i.EVENT_SUBSCRIPTIONS = 11)] = "EVENT_SUBSCRIPTIONS"),
                (i[(i.RECORD_SUBSCRIPTIONS = 12)] = "RECORD_SUBSCRIPTIONS"),
                (i[(i.SUBSCRIPTIONS = 9)] = "SUBSCRIPTIONS"),
                (i[(i.ONLINE_USERS = 10)] = "ONLINE_USERS"),
                (i[(i.MONITORING_SUBSCRIPTIONS = 24)] = "MONITORING_SUBSCRIPTIONS"),
                (i[(i.RPC_SUBSCRIPTIONS = 13)] = "RPC_SUBSCRIPTIONS"),
                (i[(i.PRESENCE_SUBSCRIPTIONS = 14)] = "PRESENCE_SUBSCRIPTIONS"),
                (i[(i.RECORD_LISTEN_PATTERNS = 15)] = "RECORD_LISTEN_PATTERNS"),
                (i[(i.EVENT_LISTEN_PATTERNS = 16)] = "EVENT_LISTEN_PATTERNS"),
                (i[(i.RECORD_PUBLISHED_SUBSCRIPTIONS = 17)] = "RECORD_PUBLISHED_SUBSCRIPTIONS"),
                (i[(i.EVENT_PUBLISHED_SUBSCRIPTIONS = 18)] = "EVENT_PUBLISHED_SUBSCRIPTIONS"),
                (i[(i.RECORD_LISTENING = 19)] = "RECORD_LISTENING"),
                (i[(i.EVENT_LISTENING = 20)] = "EVENT_LISTENING"),
                (i[(i.STATE_REGISTRY = 21)] = "STATE_REGISTRY");
        })((Aa = Ie.STATE_REGISTRY_TOPIC || (Ie.STATE_REGISTRY_TOPIC = {})));
        var Da;
        (function (i) {
            (i[(i.UNKNOWN = 0)] = "UNKNOWN"),
                (i[(i.ERROR = 1)] = "ERROR"),
                (i[(i.ADD = 2)] = "ADD"),
                (i[(i.REMOVE = 3)] = "REMOVE"),
                (i[(i.REQUEST_FULL_STATE = 4)] = "REQUEST_FULL_STATE"),
                (i[(i.FULL_STATE = 5)] = "FULL_STATE"),
                (i[(i.CHECKSUM = 6)] = "CHECKSUM");
        })((Da = Ie.STATE_ACTION || (Ie.STATE_ACTION = {})));
    });
    var ve = R((tt) => {
        "use strict";
        u();
        Object.defineProperty(tt, "__esModule", { value: !0 });
        var wa = ro();
        tt.TOPIC = wa.TOPIC;
        var Pa = no();
        tt.RECORD_ACTION = Pa.RECORD_ACTION;
        var Ua = oo();
        tt.AUTH_ACTION = Ua.AUTH_ACTION;
        var La = so();
        tt.EVENT_ACTION = La.EVENT_ACTION;
        var Ma = co();
        tt.RPC_ACTION = Ma.RPC_ACTION;
        var Ba = ao();
        tt.PRESENCE_ACTION = Ba.PRESENCE_ACTION;
        var ka = uo();
        tt.CONNECTION_ACTION = ka.CONNECTION_ACTION;
        var xa = lo();
        tt.CLUSTER_ACTION = xa.CLUSTER_ACTION;
        var ja = ho();
        tt.LOCK_ACTION = ja.LOCK_ACTION;
        var Va = fo();
        tt.PARSER_ACTION = Va.PARSER_ACTION;
        var Fa = po();
        tt.MONITORING_ACTION = Fa.MONITORING_ACTION;
        var yo = Eo();
        tt.STATE_ACTION = yo.STATE_ACTION;
        tt.STATE_REGISTRY_TOPIC = yo.STATE_REGISTRY_TOPIC;
    });
    var Ur = R((Pr) => {
        "use strict";
        u();
        Object.defineProperty(Pr, "__esModule", { value: !0 });
        var k = ve();
        Pr.ACTIONS = {
            [k.TOPIC.PARSER]: k.PARSER_ACTION,
            [k.TOPIC.CONNECTION]: k.CONNECTION_ACTION,
            [k.TOPIC.AUTH]: k.AUTH_ACTION,
            [k.TOPIC.EVENT]: k.EVENT_ACTION,
            [k.TOPIC.RECORD]: k.RECORD_ACTION,
            [k.TOPIC.RPC]: k.RPC_ACTION,
            [k.TOPIC.PRESENCE]: k.PRESENCE_ACTION,
            [k.TOPIC.LOCK]: k.LOCK_ACTION,
            [k.TOPIC.STATE_REGISTRY]: k.STATE_ACTION,
            [k.TOPIC.CLUSTER]: k.CLUSTER_ACTION,
            [k.TOPIC.MONITORING]: k.MONITORING_ACTION,
        };
    });
    var F = R((X) => {
        "use strict";
        u();
        var Ha =
                (X && X.__createBinding) ||
                (Object.create
                    ? function (i, t, e, r) {
                          r === void 0 && (r = e),
                              Object.defineProperty(i, r, {
                                  enumerable: !0,
                                  get: function () {
                                      return t[e];
                                  },
                              });
                      }
                    : function (i, t, e, r) {
                          r === void 0 && (r = e), (i[r] = t[e]);
                      }),
            Ro =
                (X && X.__exportStar) ||
                function (i, t) {
                    for (var e in i) e !== "default" && !Object.prototype.hasOwnProperty.call(t, e) && Ha(t, i, e);
                },
            be,
            Je,
            Di,
            wi;
        Object.defineProperty(X, "__esModule", { value: !0 });
        X.CONNECTION_STATE = X.EVENT = X.RESPONSE_TO_REQUEST = void 0;
        var W = ve();
        Ro(ve(), X);
        Ro(Ur(), X);
        X.RESPONSE_TO_REQUEST =
            ((be = {}),
            (be[W.TOPIC.RECORD] =
                ((Je = {}),
                (Je[W.RECORD_ACTION.HEAD_RESPONSE] = W.RECORD_ACTION.HEAD),
                (Je[W.RECORD_ACTION.READ_RESPONSE] = W.RECORD_ACTION.READ),
                (Je[W.RECORD_ACTION.DELETE_SUCCESS] = W.RECORD_ACTION.DELETE),
                Je)),
            (be[W.TOPIC.PRESENCE] =
                ((Di = {}),
                (Di[W.PRESENCE_ACTION.QUERY_RESPONSE] = W.PRESENCE_ACTION.QUERY),
                (Di[W.PRESENCE_ACTION.QUERY_ALL_RESPONSE] = W.PRESENCE_ACTION.QUERY_ALL),
                Di)),
            (be[W.TOPIC.RPC] =
                ((wi = {}),
                (wi[W.RPC_ACTION.ACCEPT] = W.RPC_ACTION.REQUEST),
                (wi[W.RPC_ACTION.ERROR] = W.RPC_ACTION.REQUEST),
                wi)),
            (be[W.TOPIC.EVENT] = {}),
            be);
        var Ga;
        (function (i) {
            (i.RECORD_READ_ONLY_MODE = "RECORD_READ_ONLY_MODE"),
                (i.UNSOLICITED_MESSAGE = "UNSOLICITED_MESSAGE"),
                (i.IS_CLOSED = "IS_CLOSED"),
                (i.MAX_RECONNECTION_ATTEMPTS_REACHED = "MAX_RECONNECTION_ATTEMPTS_REACHED"),
                (i.CONNECTION_ERROR = "CONNECTION_ERROR"),
                (i.ACK_TIMEOUT = "ACK_TIMEOUT"),
                (i.UNKNOWN_CORRELATION_ID = "UNKNOWN_CORRELATION_ID"),
                (i.HEARTBEAT_TIMEOUT = "HEARTBEAT_TIMEOUT"),
                (i.LISTENER_EXISTS = "LISTENER_EXISTS"),
                (i.NOT_LISTENING = "NOT_LISTENING"),
                (i.RECORD_ALREADY_DESTROYED = "RECORD_ALREADY_DESTROYED"),
                (i.RECORD_DELETE_TIMEOUT = "RECORD_DELETE_TIMEOUT"),
                (i.CLIENT_OFFLINE = "client offline"),
                (i.INVALID_AUTHENTICATION_DETAILS = "INVALID_AUTHENTICATION_DETAILS"),
                (i.CONNECTION_LOST = "connectionLost"),
                (i.CONNECTION_REESTABLISHED = "connectionReestablished"),
                (i.EXIT_LIMBO = "exitLimbo"),
                (i.CONNECTION_STATE_CHANGED = "connectionStateChanged"),
                (i.CLIENT_DATA_CHANGED = "clientDataChanged"),
                (i.REAUTHENTICATION_FAILURE = "reauthenticationFailure"),
                (i.AUTHENTICATION_TIMEOUT = "AUTHENTICATION_TIMEOUT"),
                (i.RECORD_ERROR = "error"),
                (i.RECORD_READY = "ready"),
                (i.RECORD_DELETED = "delete"),
                (i.RECORD_DISCARDED = "discard"),
                (i.RECORD_VERSION_EXISTS = "versionExists"),
                (i.RECORD_HAS_PROVIDER_CHANGED = "hasProviderChanged"),
                (i.RECORD_STATE_CHANGED = "onRecordStateChanged"),
                (i.ENTRY_ADDED_EVENT = "entry-added"),
                (i.ENTRY_REMOVED_EVENT = "entry-removed"),
                (i.ENTRY_MOVED_EVENT = "entry-moved");
        })((Ga = X.EVENT || (X.EVENT = {})));
        var qa;
        (function (i) {
            (i.CLOSING = "CLOSING"),
                (i.CLOSED = "CLOSED"),
                (i.INITIALISING = "INITIALISING"),
                (i.AWAITING_CONNECTION = "AWAITING_CONNECTION"),
                (i.CHALLENGING = "CHALLENGING"),
                (i.AWAITING_AUTHENTICATION = "AWAITING_AUTHENTICATION"),
                (i.AUTHENTICATING = "AUTHENTICATING"),
                (i.OPEN = "OPEN"),
                (i.ERROR = "ERROR"),
                (i.RECONNECTING = "RECONNECTING"),
                (i.REDIRECTING = "REDIRECTING"),
                (i.CHALLENGE_DENIED = "CHALLENGE_DENIED"),
                (i.TOO_MANY_AUTH_ATTEMPTS = "TOO_MANY_AUTH_ATTEMPTS"),
                (i.AUTHENTICATION_TIMEOUT = "AUTHENTICATION_TIMEOUT"),
                (i.PAUSING = "PAUSING"),
                (i.OFFLINE = "OFFLINE");
        })((qa = X.CONNECTION_STATE || (X.CONNECTION_STATE = {})));
    });
    var _o = R((Ui) => {
        "use strict";
        u();
        Object.defineProperty(Ui, "__esModule", { value: !0 });
        Ui.Logger = void 0;
        var Ke = F(),
            So = Ur(),
            Pi = ve();
        function Wa(i) {
            return Ke.EVENT[i] !== void 0;
        }
        var Ya = (function () {
            function i(t) {
                this.emitter = t;
            }
            return (
                (i.prototype.warn = function (t, e, r) {
                    var n = "Warning: " + Pi.TOPIC[t.topic],
                        o = t.action;
                    o && (n += " (" + So.ACTIONS[t.topic][o] + ")"),
                        e && (n += ": " + Ke.EVENT[e]),
                        r && (n += " \u2013 " + (typeof r == "string" ? r : JSON.stringify(r))),
                        console.warn(n);
                }),
                (i.prototype.error = function (t, e, r) {
                    if (Wa(e))
                        (e === Ke.EVENT.IS_CLOSED || e === Ke.EVENT.CONNECTION_ERROR) &&
                            this.emitter.emit("error", r, Ke.EVENT[e], Pi.TOPIC[Pi.TOPIC.CONNECTION]);
                    else {
                        var n = e || t.action;
                        this.emitter.emit("error", r || t, So.ACTIONS[t.topic][n], Pi.TOPIC[t.topic]);
                    }
                }),
                i
            );
        })();
        Ui.Logger = Ya;
    });
    var gt = R((mt) => {
        "use strict";
        u();
        var Ja =
                (mt && mt.__values) ||
                function (i) {
                    var t = typeof Symbol == "function" && Symbol.iterator,
                        e = t && i[t],
                        r = 0;
                    if (e) return e.call(i);
                    if (i && typeof i.length == "number")
                        return {
                            next: function () {
                                return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
                            },
                        };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
                },
            Oo =
                (mt && mt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                },
            Ka =
                (mt && mt.__spread) ||
                function () {
                    for (var i = [], t = 0; t < arguments.length; t++) i = i.concat(Oo(arguments[t]));
                    return i;
                };
        Object.defineProperty(mt, "__esModule", { value: !0 });
        mt.Emitter = void 0;
        var $a = (function () {
            function i() {
                this.callbacks = null;
            }
            return (
                (i.prototype.on = function (t, e, r) {
                    r === void 0 && (r = this), (this.callbacks = this.callbacks || new Map());
                    var n = this.callbacks.get(t);
                    return (
                        n ? n.push({ fn: e, scope: r }) : ((n = [{ fn: e, scope: r }]), this.callbacks.set(t, n)), this
                    );
                }),
                (i.prototype.once = function (t, e, r) {
                    var n = this;
                    r === void 0 && (r = this);
                    var o = function () {
                        for (var s = [], c = 0; c < arguments.length; c++) s[c] = arguments[c];
                        n.off(t, o, n), e.apply(n, s);
                    };
                    return (o.fn = e), this.on(t, o, r), this;
                }),
                (i.prototype.off = function (t, e, r) {
                    if (
                        (t === void 0 && e === void 0 && r === void 0 && (this.callbacks = null),
                        this.callbacks === null)
                    )
                        return this;
                    var n = this.callbacks.get(t);
                    return n
                        ? e === void 0 && r === void 0
                            ? (this.callbacks.delete(t), this)
                            : ((n = n.filter(function (o) {
                                  var s = o.fn,
                                      c = o.scope;
                                  return !(
                                      (t !== "" && e === void 0 && r === c) ||
                                      ((s === e || s.fn === e) && (r === void 0 || r === c))
                                  );
                              })),
                              n.length === 0 ? this.callbacks.delete(t) : this.callbacks.set(t, n),
                              this)
                        : this;
                }),
                (i.prototype.removeContext = function (t) {
                    var e, r;
                    if (this.callbacks !== null)
                        try {
                            for (var n = Ja(this.callbacks), o = n.next(); !o.done; o = n.next()) {
                                var s = Oo(o.value, 2),
                                    c = s[0],
                                    a = s[1];
                                this.callbacks.set(
                                    c,
                                    a.filter(function (l) {
                                        var h = l.scope;
                                        return h === t;
                                    })
                                );
                            }
                        } catch (l) {
                            e = { error: l };
                        } finally {
                            try {
                                o && !o.done && (r = n.return) && r.call(n);
                            } finally {
                                if (e) throw e.error;
                            }
                        }
                }),
                (i.prototype.emit = function (t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                    if (this.callbacks === null) return this;
                    var n = this.callbacks.get(t);
                    return !n || n.length === 0
                        ? this
                        : ((n = n.slice(0)),
                          n.forEach(function (o) {
                              var s = o.fn,
                                  c = o.scope;
                              return s.apply(c, e);
                          }),
                          this);
                }),
                (i.prototype.hasListeners = function (t) {
                    return this.callbacks === null ? !1 : this.callbacks.has(t);
                }),
                (i.prototype.eventNames = function () {
                    return this.callbacks === null ? [] : Ka(this.callbacks.keys());
                }),
                i
            );
        })();
        mt.Emitter = $a;
    });
    var To = R((lt) => {
        "use strict";
        u();
        var Qa =
                (lt && lt.__extends) ||
                (function () {
                    var i = function (t, e) {
                        return (
                            (i =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (r, n) {
                                        r.__proto__ = n;
                                    }) ||
                                function (r, n) {
                                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
                                }),
                            i(t, e)
                        );
                    };
                    return function (t, e) {
                        i(t, e);
                        function r() {
                            this.constructor = t;
                        }
                        t.prototype = e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    };
                })(),
            Li =
                (lt && lt.__assign) ||
                function () {
                    return (
                        (Li =
                            Object.assign ||
                            function (i) {
                                for (var t, e = 1, r = arguments.length; e < r; e++) {
                                    t = arguments[e];
                                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
                                }
                                return i;
                            }),
                        Li.apply(this, arguments)
                    );
                },
            za =
                (lt && lt.__values) ||
                function (i) {
                    var t = typeof Symbol == "function" && Symbol.iterator,
                        e = t && i[t],
                        r = 0;
                    if (e) return e.call(i);
                    if (i && typeof i.length == "number")
                        return {
                            next: function () {
                                return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
                            },
                        };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
                },
            Xa =
                (lt && lt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                };
        Object.defineProperty(lt, "__esModule", { value: !0 });
        lt.TimeoutRegistry = void 0;
        var No = F(),
            Za = gt(),
            tu = (function (i) {
                Qa(t, i);
                function t(e, r) {
                    var n = i.call(this) || this;
                    return (n.services = e), (n.options = r), (n.register = new Map()), n;
                }
                return (
                    (t.prototype.add = function (e) {
                        if (
                            (e.duration === void 0 && (e.duration = this.options.subscriptionTimeout),
                            e.event === void 0 && (e.event = No.EVENT.ACK_TIMEOUT),
                            !this.services.connection.isConnected)
                        )
                            return null;
                        this.remove(e.message);
                        var r = { timerId: -1, uniqueName: this.getUniqueName(e.message), timeout: e };
                        return (
                            (r.timerId = this.services.timerRegistry.add({
                                context: this,
                                callback: this.onTimeout,
                                duration: e.duration,
                                data: r,
                            })),
                            this.register.set(r.uniqueName, r),
                            r.uniqueName
                        );
                    }),
                    (t.prototype.remove = function (e) {
                        var r,
                            n = No.RESPONSE_TO_REQUEST[e.topic][e.action];
                        n ? (r = Li(Li({}, e), { action: n })) : (r = e);
                        var o = this.getUniqueName(r);
                        this.clear(o);
                    }),
                    (t.prototype.clear = function (e) {
                        var r = this.register.get(e);
                        r && (this.register.delete(e), this.services.timerRegistry.remove(r.timerId));
                    }),
                    (t.prototype.onTimeout = function (e) {
                        this.register.delete(e.uniqueName);
                        var r = e.timeout;
                        r.callback ? r.callback(r.event, r.message) : this.services.logger.warn(r.message, r.event);
                    }),
                    (t.prototype.getUniqueName = function (e) {
                        var r = e.originalAction || e.action,
                            n = "" + e.topic + r + "_";
                        return e.correlationId ? (n += e.correlationId) : e.name && (n += e.name), n;
                    }),
                    (t.prototype.onConnectionLost = function () {
                        var e, r;
                        try {
                            for (var n = za(this.register), o = n.next(); !o.done; o = n.next()) {
                                var s = Xa(o.value, 2),
                                    c = s[0],
                                    a = s[1];
                                this.services.timerRegistry.remove(a.timerId), this.register.delete(c);
                            }
                        } catch (l) {
                            e = { error: l };
                        } finally {
                            try {
                                o && !o.done && (r = n.return) && r.call(n);
                            } finally {
                                if (e) throw e.error;
                            }
                        }
                    }),
                    t
                );
            })(Za.Emitter);
        lt.TimeoutRegistry = tu;
    });
    var Io = R((jt) => {
        "use strict";
        u();
        var eu =
                (jt && jt.__values) ||
                function (i) {
                    var t = typeof Symbol == "function" && Symbol.iterator,
                        e = t && i[t],
                        r = 0;
                    if (e) return e.call(i);
                    if (i && typeof i.length == "number")
                        return {
                            next: function () {
                                return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
                            },
                        };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
                },
            iu =
                (jt && jt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                };
        Object.defineProperty(jt, "__esModule", { value: !0 });
        jt.IntervalTimerRegistry = void 0;
        var ru = (function () {
            function i(t) {
                (this.timerResolution = t),
                    (this.registry = new Map()),
                    (this.timerIdCounter = 0),
                    (this.timerId = setTimeout(this.triggerTimeouts.bind(this), this.timerResolution));
            }
            return (
                (i.prototype.close = function () {
                    clearInterval(this.timerId);
                }),
                (i.prototype.triggerTimeouts = function () {
                    var t,
                        e,
                        r = Date.now();
                    try {
                        for (var n = eu(this.registry), o = n.next(); !o.done; o = n.next()) {
                            var s = iu(o.value, 2),
                                c = s[0],
                                a = s[1];
                            r - a.created > a.duration && (a.callback.call(a.context, a.data), this.registry.delete(c));
                        }
                    } catch (l) {
                        t = { error: l };
                    } finally {
                        try {
                            o && !o.done && (e = n.return) && e.call(n);
                        } finally {
                            if (t) throw t.error;
                        }
                    }
                    this.timerId = setTimeout(this.triggerTimeouts.bind(this), this.timerResolution);
                }),
                (i.prototype.has = function (t) {
                    return this.registry.has(t);
                }),
                (i.prototype.add = function (t) {
                    return (
                        this.timerIdCounter++,
                        (t.created = Date.now()),
                        this.registry.set(this.timerIdCounter, t),
                        this.timerIdCounter
                    );
                }),
                (i.prototype.remove = function (t) {
                    return this.registry.delete(t);
                }),
                (i.prototype.requestIdleCallback = function (t) {
                    setTimeout(t, 0);
                }),
                i
            );
        })();
        jt.IntervalTimerRegistry = ru;
    });
    var vo = R((Mi) => {
        "use strict";
        u();
        Object.defineProperty(Mi, "__esModule", { value: !0 });
        Mi.NativeTimerRegistry = void 0;
        var nu = (function () {
            function i() {
                this.registry = new Set();
            }
            return (
                (i.prototype.close = function () {
                    this.registry.forEach(clearTimeout), this.registry.clear();
                }),
                (i.prototype.has = function (t) {
                    return this.registry.has(t);
                }),
                (i.prototype.add = function (t) {
                    var e = this,
                        r = setTimeout(function () {
                            e.remove(r), t.callback.call(t.context, t.data);
                        }, t.duration);
                    return this.registry.add(r), r;
                }),
                (i.prototype.remove = function (t) {
                    return clearTimeout(t), this.registry.delete(t);
                }),
                (i.prototype.requestIdleCallback = function (t) {
                    setTimeout(t, 0);
                }),
                i
            );
        })();
        Mi.NativeTimerRegistry = nu;
    });
    var Co = R((Wh, bo) => {
        "use strict";
        u();
        bo.exports = ou;
        function ou(i, t) {
            for (var e = new Array(arguments.length - 1), r = 0, n = 2, o = !0; n < arguments.length; )
                e[r++] = arguments[n++];
            return new Promise(function (c, a) {
                e[r] = function (h) {
                    if (o)
                        if (((o = !1), h)) a(h);
                        else {
                            for (var E = new Array(arguments.length - 1), N = 0; N < E.length; ) E[N++] = arguments[N];
                            c.apply(null, E);
                        }
                };
                try {
                    i.apply(t || null, e);
                } catch (l) {
                    o && ((o = !1), a(l));
                }
            });
        }
    });
    var Do = R((Ao) => {
        "use strict";
        u();
        var Bi = Ao;
        Bi.length = function (t) {
            var e = t.length;
            if (!e) return 0;
            for (var r = 0; --e % 4 > 1 && t.charAt(e) === "="; ) ++r;
            return Math.ceil(t.length * 3) / 4 - r;
        };
        var Ce = new Array(64),
            go = new Array(123);
        for (Et = 0; Et < 64; )
            go[(Ce[Et] = Et < 26 ? Et + 65 : Et < 52 ? Et + 71 : Et < 62 ? Et - 4 : (Et - 59) | 43)] = Et++;
        var Et;
        Bi.encode = function (t, e, r) {
            for (var n = null, o = [], s = 0, c = 0, a; e < r; ) {
                var l = t[e++];
                switch (c) {
                    case 0:
                        (o[s++] = Ce[l >> 2]), (a = (l & 3) << 4), (c = 1);
                        break;
                    case 1:
                        (o[s++] = Ce[a | (l >> 4)]), (a = (l & 15) << 2), (c = 2);
                        break;
                    case 2:
                        (o[s++] = Ce[a | (l >> 6)]), (o[s++] = Ce[l & 63]), (c = 0);
                        break;
                }
                s > 8191 && ((n || (n = [])).push(String.fromCharCode.apply(String, o)), (s = 0));
            }
            return (
                c && ((o[s++] = Ce[a]), (o[s++] = 61), c === 1 && (o[s++] = 61)),
                n
                    ? (s && n.push(String.fromCharCode.apply(String, o.slice(0, s))), n.join(""))
                    : String.fromCharCode.apply(String, o.slice(0, s))
            );
        };
        var mo = "invalid encoding";
        Bi.decode = function (t, e, r) {
            for (var n = r, o = 0, s, c = 0; c < t.length; ) {
                var a = t.charCodeAt(c++);
                if (a === 61 && o > 1) break;
                if ((a = go[a]) === void 0) throw Error(mo);
                switch (o) {
                    case 0:
                        (s = a), (o = 1);
                        break;
                    case 1:
                        (e[r++] = (s << 2) | ((a & 48) >> 4)), (s = a), (o = 2);
                        break;
                    case 2:
                        (e[r++] = ((s & 15) << 4) | ((a & 60) >> 2)), (s = a), (o = 3);
                        break;
                    case 3:
                        (e[r++] = ((s & 3) << 6) | a), (o = 0);
                        break;
                }
            }
            if (o === 1) throw Error(mo);
            return r - n;
        };
        Bi.test = function (t) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t);
        };
    });
    var Po = R((Jh, wo) => {
        "use strict";
        u();
        wo.exports = ki;
        function ki() {
            this._listeners = {};
        }
        ki.prototype.on = function (t, e, r) {
            return (this._listeners[t] || (this._listeners[t] = [])).push({ fn: e, ctx: r || this }), this;
        };
        ki.prototype.off = function (t, e) {
            if (t === void 0) this._listeners = {};
            else if (e === void 0) this._listeners[t] = [];
            else for (var r = this._listeners[t], n = 0; n < r.length; ) r[n].fn === e ? r.splice(n, 1) : ++n;
            return this;
        };
        ki.prototype.emit = function (t) {
            var e = this._listeners[t];
            if (e) {
                for (var r = [], n = 1; n < arguments.length; ) r.push(arguments[n++]);
                for (n = 0; n < e.length; ) e[n].fn.apply(e[n++].ctx, r);
            }
            return this;
        };
    });
    var jo = R((Kh, xo) => {
        "use strict";
        u();
        xo.exports = Uo(Uo);
        function Uo(i) {
            return (
                typeof Float32Array != "undefined"
                    ? (function () {
                          var t = new Float32Array([-0]),
                              e = new Uint8Array(t.buffer),
                              r = e[3] === 128;
                          function n(a, l, h) {
                              (t[0] = a), (l[h] = e[0]), (l[h + 1] = e[1]), (l[h + 2] = e[2]), (l[h + 3] = e[3]);
                          }
                          function o(a, l, h) {
                              (t[0] = a), (l[h] = e[3]), (l[h + 1] = e[2]), (l[h + 2] = e[1]), (l[h + 3] = e[0]);
                          }
                          (i.writeFloatLE = r ? n : o), (i.writeFloatBE = r ? o : n);
                          function s(a, l) {
                              return (e[0] = a[l]), (e[1] = a[l + 1]), (e[2] = a[l + 2]), (e[3] = a[l + 3]), t[0];
                          }
                          function c(a, l) {
                              return (e[3] = a[l]), (e[2] = a[l + 1]), (e[1] = a[l + 2]), (e[0] = a[l + 3]), t[0];
                          }
                          (i.readFloatLE = r ? s : c), (i.readFloatBE = r ? c : s);
                      })()
                    : (function () {
                          function t(r, n, o, s) {
                              var c = n < 0 ? 1 : 0;
                              if ((c && (n = -n), n === 0)) r(1 / n > 0 ? 0 : 2147483648, o, s);
                              else if (isNaN(n)) r(2143289344, o, s);
                              else if (n > 34028234663852886e22) r(((c << 31) | 2139095040) >>> 0, o, s);
                              else if (n < 11754943508222875e-54)
                                  r(((c << 31) | Math.round(n / 1401298464324817e-60)) >>> 0, o, s);
                              else {
                                  var a = Math.floor(Math.log(n) / Math.LN2),
                                      l = Math.round(n * Math.pow(2, -a) * 8388608) & 8388607;
                                  r(((c << 31) | ((a + 127) << 23) | l) >>> 0, o, s);
                              }
                          }
                          (i.writeFloatLE = t.bind(null, Lo)), (i.writeFloatBE = t.bind(null, Mo));
                          function e(r, n, o) {
                              var s = r(n, o),
                                  c = (s >> 31) * 2 + 1,
                                  a = (s >>> 23) & 255,
                                  l = s & 8388607;
                              return a === 255
                                  ? l
                                      ? NaN
                                      : c * (1 / 0)
                                  : a === 0
                                  ? c * 1401298464324817e-60 * l
                                  : c * Math.pow(2, a - 150) * (l + 8388608);
                          }
                          (i.readFloatLE = e.bind(null, Bo)), (i.readFloatBE = e.bind(null, ko));
                      })(),
                typeof Float64Array != "undefined"
                    ? (function () {
                          var t = new Float64Array([-0]),
                              e = new Uint8Array(t.buffer),
                              r = e[7] === 128;
                          function n(a, l, h) {
                              (t[0] = a),
                                  (l[h] = e[0]),
                                  (l[h + 1] = e[1]),
                                  (l[h + 2] = e[2]),
                                  (l[h + 3] = e[3]),
                                  (l[h + 4] = e[4]),
                                  (l[h + 5] = e[5]),
                                  (l[h + 6] = e[6]),
                                  (l[h + 7] = e[7]);
                          }
                          function o(a, l, h) {
                              (t[0] = a),
                                  (l[h] = e[7]),
                                  (l[h + 1] = e[6]),
                                  (l[h + 2] = e[5]),
                                  (l[h + 3] = e[4]),
                                  (l[h + 4] = e[3]),
                                  (l[h + 5] = e[2]),
                                  (l[h + 6] = e[1]),
                                  (l[h + 7] = e[0]);
                          }
                          (i.writeDoubleLE = r ? n : o), (i.writeDoubleBE = r ? o : n);
                          function s(a, l) {
                              return (
                                  (e[0] = a[l]),
                                  (e[1] = a[l + 1]),
                                  (e[2] = a[l + 2]),
                                  (e[3] = a[l + 3]),
                                  (e[4] = a[l + 4]),
                                  (e[5] = a[l + 5]),
                                  (e[6] = a[l + 6]),
                                  (e[7] = a[l + 7]),
                                  t[0]
                              );
                          }
                          function c(a, l) {
                              return (
                                  (e[7] = a[l]),
                                  (e[6] = a[l + 1]),
                                  (e[5] = a[l + 2]),
                                  (e[4] = a[l + 3]),
                                  (e[3] = a[l + 4]),
                                  (e[2] = a[l + 5]),
                                  (e[1] = a[l + 6]),
                                  (e[0] = a[l + 7]),
                                  t[0]
                              );
                          }
                          (i.readDoubleLE = r ? s : c), (i.readDoubleBE = r ? c : s);
                      })()
                    : (function () {
                          function t(r, n, o, s, c, a) {
                              var l = s < 0 ? 1 : 0;
                              if ((l && (s = -s), s === 0)) r(0, c, a + n), r(1 / s > 0 ? 0 : 2147483648, c, a + o);
                              else if (isNaN(s)) r(0, c, a + n), r(2146959360, c, a + o);
                              else if (s > 17976931348623157e292)
                                  r(0, c, a + n), r(((l << 31) | 2146435072) >>> 0, c, a + o);
                              else {
                                  var h;
                                  if (s < 22250738585072014e-324)
                                      (h = s / 5e-324),
                                          r(h >>> 0, c, a + n),
                                          r(((l << 31) | (h / 4294967296)) >>> 0, c, a + o);
                                  else {
                                      var E = Math.floor(Math.log(s) / Math.LN2);
                                      E === 1024 && (E = 1023),
                                          (h = s * Math.pow(2, -E)),
                                          r((h * 4503599627370496) >>> 0, c, a + n),
                                          r(
                                              ((l << 31) | ((E + 1023) << 20) | ((h * 1048576) & 1048575)) >>> 0,
                                              c,
                                              a + o
                                          );
                                  }
                              }
                          }
                          (i.writeDoubleLE = t.bind(null, Lo, 0, 4)), (i.writeDoubleBE = t.bind(null, Mo, 4, 0));
                          function e(r, n, o, s, c) {
                              var a = r(s, c + n),
                                  l = r(s, c + o),
                                  h = (l >> 31) * 2 + 1,
                                  E = (l >>> 20) & 2047,
                                  N = 4294967296 * (l & 1048575) + a;
                              return E === 2047
                                  ? N
                                      ? NaN
                                      : h * (1 / 0)
                                  : E === 0
                                  ? h * 5e-324 * N
                                  : h * Math.pow(2, E - 1075) * (N + 4503599627370496);
                          }
                          (i.readDoubleLE = e.bind(null, Bo, 0, 4)), (i.readDoubleBE = e.bind(null, ko, 4, 0));
                      })(),
                i
            );
        }
        function Lo(i, t, e) {
            (t[e] = i & 255), (t[e + 1] = (i >>> 8) & 255), (t[e + 2] = (i >>> 16) & 255), (t[e + 3] = i >>> 24);
        }
        function Mo(i, t, e) {
            (t[e] = i >>> 24), (t[e + 1] = (i >>> 16) & 255), (t[e + 2] = (i >>> 8) & 255), (t[e + 3] = i & 255);
        }
        function Bo(i, t) {
            return (i[t] | (i[t + 1] << 8) | (i[t + 2] << 16) | (i[t + 3] << 24)) >>> 0;
        }
        function ko(i, t) {
            return ((i[t] << 24) | (i[t + 1] << 16) | (i[t + 2] << 8) | i[t + 3]) >>> 0;
        }
    });
    var Vo = R((exports, module) => {
        "use strict";
        u();
        module.exports = inquire;
        function inquire(moduleName) {
            try {
                var mod = eval("quire".replace(/^/, "re"))(moduleName);
                if (mod && (mod.length || Object.keys(mod).length)) return mod;
            } catch (i) {}
            return null;
        }
    });
    var Ho = R((Fo) => {
        "use strict";
        u();
        var Lr = Fo;
        Lr.length = function (t) {
            for (var e = 0, r = 0, n = 0; n < t.length; ++n)
                (r = t.charCodeAt(n)),
                    r < 128
                        ? (e += 1)
                        : r < 2048
                        ? (e += 2)
                        : (r & 64512) === 55296 && (t.charCodeAt(n + 1) & 64512) === 56320
                        ? (++n, (e += 4))
                        : (e += 3);
            return e;
        };
        Lr.read = function (t, e, r) {
            var n = r - e;
            if (n < 1) return "";
            for (var o = null, s = [], c = 0, a; e < r; )
                (a = t[e++]),
                    a < 128
                        ? (s[c++] = a)
                        : a > 191 && a < 224
                        ? (s[c++] = ((a & 31) << 6) | (t[e++] & 63))
                        : a > 239 && a < 365
                        ? ((a =
                              (((a & 7) << 18) | ((t[e++] & 63) << 12) | ((t[e++] & 63) << 6) | (t[e++] & 63)) - 65536),
                          (s[c++] = 55296 + (a >> 10)),
                          (s[c++] = 56320 + (a & 1023)))
                        : (s[c++] = ((a & 15) << 12) | ((t[e++] & 63) << 6) | (t[e++] & 63)),
                    c > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, s)), (c = 0));
            return o
                ? (c && o.push(String.fromCharCode.apply(String, s.slice(0, c))), o.join(""))
                : String.fromCharCode.apply(String, s.slice(0, c));
        };
        Lr.write = function (t, e, r) {
            for (var n = r, o, s, c = 0; c < t.length; ++c)
                (o = t.charCodeAt(c)),
                    o < 128
                        ? (e[r++] = o)
                        : o < 2048
                        ? ((e[r++] = (o >> 6) | 192), (e[r++] = (o & 63) | 128))
                        : (o & 64512) === 55296 && ((s = t.charCodeAt(c + 1)) & 64512) === 56320
                        ? ((o = 65536 + ((o & 1023) << 10) + (s & 1023)),
                          ++c,
                          (e[r++] = (o >> 18) | 240),
                          (e[r++] = ((o >> 12) & 63) | 128),
                          (e[r++] = ((o >> 6) & 63) | 128),
                          (e[r++] = (o & 63) | 128))
                        : ((e[r++] = (o >> 12) | 224), (e[r++] = ((o >> 6) & 63) | 128), (e[r++] = (o & 63) | 128));
            return r - n;
        };
    });
    var qo = R((Qh, Go) => {
        "use strict";
        u();
        Go.exports = su;
        function su(i, t, e) {
            var r = e || 8192,
                n = r >>> 1,
                o = null,
                s = r;
            return function (a) {
                if (a < 1 || a > n) return i(a);
                s + a > r && ((o = i(r)), (s = 0));
                var l = t.call(o, s, (s += a));
                return s & 7 && (s = (s | 7) + 1), l;
            };
        }
    });
    var Yo = R((zh, Wo) => {
        "use strict";
        u();
        Wo.exports = Y;
        var $e = Ft();
        function Y(i, t) {
            (this.lo = i >>> 0), (this.hi = t >>> 0);
        }
        var ue = (Y.zero = new Y(0, 0));
        ue.toNumber = function () {
            return 0;
        };
        ue.zzEncode = ue.zzDecode = function () {
            return this;
        };
        ue.length = function () {
            return 1;
        };
        var cu = (Y.zeroHash = "\0\0\0\0\0\0\0\0");
        Y.fromNumber = function (t) {
            if (t === 0) return ue;
            var e = t < 0;
            e && (t = -t);
            var r = t >>> 0,
                n = ((t - r) / 4294967296) >>> 0;
            return (
                e && ((n = ~n >>> 0), (r = ~r >>> 0), ++r > 4294967295 && ((r = 0), ++n > 4294967295 && (n = 0))),
                new Y(r, n)
            );
        };
        Y.from = function (t) {
            if (typeof t == "number") return Y.fromNumber(t);
            if ($e.isString(t))
                if ($e.Long) t = $e.Long.fromString(t);
                else return Y.fromNumber(parseInt(t, 10));
            return t.low || t.high ? new Y(t.low >>> 0, t.high >>> 0) : ue;
        };
        Y.prototype.toNumber = function (t) {
            if (!t && this.hi >>> 31) {
                var e = (~this.lo + 1) >>> 0,
                    r = ~this.hi >>> 0;
                return e || (r = (r + 1) >>> 0), -(e + r * 4294967296);
            }
            return this.lo + this.hi * 4294967296;
        };
        Y.prototype.toLong = function (t) {
            return $e.Long
                ? new $e.Long(this.lo | 0, this.hi | 0, Boolean(t))
                : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(t) };
        };
        var Vt = String.prototype.charCodeAt;
        Y.fromHash = function (t) {
            return t === cu
                ? ue
                : new Y(
                      (Vt.call(t, 0) | (Vt.call(t, 1) << 8) | (Vt.call(t, 2) << 16) | (Vt.call(t, 3) << 24)) >>> 0,
                      (Vt.call(t, 4) | (Vt.call(t, 5) << 8) | (Vt.call(t, 6) << 16) | (Vt.call(t, 7) << 24)) >>> 0
                  );
        };
        Y.prototype.toHash = function () {
            return String.fromCharCode(
                this.lo & 255,
                (this.lo >>> 8) & 255,
                (this.lo >>> 16) & 255,
                this.lo >>> 24,
                this.hi & 255,
                (this.hi >>> 8) & 255,
                (this.hi >>> 16) & 255,
                this.hi >>> 24
            );
        };
        Y.prototype.zzEncode = function () {
            var t = this.hi >> 31;
            return (
                (this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ t) >>> 0),
                (this.lo = ((this.lo << 1) ^ t) >>> 0),
                this
            );
        };
        Y.prototype.zzDecode = function () {
            var t = -(this.lo & 1);
            return (
                (this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ t) >>> 0),
                (this.hi = ((this.hi >>> 1) ^ t) >>> 0),
                this
            );
        };
        Y.prototype.length = function () {
            var t = this.lo,
                e = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
                r = this.hi >>> 24;
            return r === 0
                ? e === 0
                    ? t < 16384
                        ? t < 128
                            ? 1
                            : 2
                        : t < 2097152
                        ? 3
                        : 4
                    : e < 16384
                    ? e < 128
                        ? 5
                        : 6
                    : e < 2097152
                    ? 7
                    : 8
                : r < 128
                ? 9
                : 10;
        };
    });
    var Ft = R((Mr) => {
        "use strict";
        u();
        var S = Mr;
        S.asPromise = Co();
        S.base64 = Do();
        S.EventEmitter = Po();
        S.float = jo();
        S.inquire = Vo();
        S.utf8 = Ho();
        S.pool = qo();
        S.LongBits = Yo();
        S.isNode = Boolean(
            typeof window != "undefined" &&
                window &&
                window.process &&
                window.process.versions &&
                window.process.versions.node
        );
        S.global =
            (S.isNode && window) ||
            (typeof window != "undefined" && window) ||
            (typeof self != "undefined" && self) ||
            Mr;
        S.emptyArray = Object.freeze ? Object.freeze([]) : [];
        S.emptyObject = Object.freeze ? Object.freeze({}) : {};
        S.isInteger =
            Number.isInteger ||
            function (t) {
                return typeof t == "number" && isFinite(t) && Math.floor(t) === t;
            };
        S.isString = function (t) {
            return typeof t == "string" || t instanceof String;
        };
        S.isObject = function (t) {
            return t && typeof t == "object";
        };
        S.isset = S.isSet = function (t, e) {
            var r = t[e];
            return r != null && t.hasOwnProperty(e)
                ? typeof r != "object" || (Array.isArray(r) ? r.length : Object.keys(r).length) > 0
                : !1;
        };
        S.Buffer = (function () {
            try {
                var i = S.inquire("buffer").Buffer;
                return i.prototype.utf8Write ? i : null;
            } catch (t) {
                return null;
            }
        })();
        S._Buffer_from = null;
        S._Buffer_allocUnsafe = null;
        S.newBuffer = function (t) {
            return typeof t == "number"
                ? S.Buffer
                    ? S._Buffer_allocUnsafe(t)
                    : new S.Array(t)
                : S.Buffer
                ? S._Buffer_from(t)
                : typeof Uint8Array == "undefined"
                ? t
                : new Uint8Array(t);
        };
        S.Array = typeof Uint8Array != "undefined" ? Uint8Array : Array;
        S.Long = (S.global.dcodeIO && S.global.dcodeIO.Long) || S.global.Long || S.inquire("long");
        S.key2Re = /^true|false|0|1$/;
        S.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
        S.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
        S.longToHash = function (t) {
            return t ? S.LongBits.from(t).toHash() : S.LongBits.zeroHash;
        };
        S.longFromHash = function (t, e) {
            var r = S.LongBits.fromHash(t);
            return S.Long ? S.Long.fromBits(r.lo, r.hi, e) : r.toNumber(Boolean(e));
        };
        function Jo(i, t, e) {
            for (var r = Object.keys(t), n = 0; n < r.length; ++n) (i[r[n]] === void 0 || !e) && (i[r[n]] = t[r[n]]);
            return i;
        }
        S.merge = Jo;
        S.lcFirst = function (t) {
            return t.charAt(0).toLowerCase() + t.substring(1);
        };
        function Ko(i) {
            function t(e, r) {
                if (!(this instanceof t)) return new t(e, r);
                Object.defineProperty(this, "message", {
                    get: function () {
                        return e;
                    },
                }),
                    Error.captureStackTrace
                        ? Error.captureStackTrace(this, t)
                        : Object.defineProperty(this, "stack", { value: new Error().stack || "" }),
                    r && Jo(this, r);
            }
            return (
                ((t.prototype = Object.create(Error.prototype)).constructor = t),
                Object.defineProperty(t.prototype, "name", {
                    get: function () {
                        return i;
                    },
                }),
                (t.prototype.toString = function () {
                    return this.name + ": " + this.message;
                }),
                t
            );
        }
        S.newError = Ko;
        S.ProtocolError = Ko("ProtocolError");
        S.oneOfGetter = function (t) {
            for (var e = {}, r = 0; r < t.length; ++r) e[t[r]] = 1;
            return function () {
                for (var n = Object.keys(this), o = n.length - 1; o > -1; --o)
                    if (e[n[o]] === 1 && this[n[o]] !== void 0 && this[n[o]] !== null) return n[o];
            };
        };
        S.oneOfSetter = function (t) {
            return function (e) {
                for (var r = 0; r < t.length; ++r) t[r] !== e && delete this[t[r]];
            };
        };
        S.toJSONOptions = { longs: String, enums: String, bytes: String, json: !0 };
        S._configure = function () {
            var i = S.Buffer;
            if (!i) {
                S._Buffer_from = S._Buffer_allocUnsafe = null;
                return;
            }
            (S._Buffer_from =
                (i.from !== Uint8Array.from && i.from) ||
                function (e, r) {
                    return new i(e, r);
                }),
                (S._Buffer_allocUnsafe =
                    i.allocUnsafe ||
                    function (e) {
                        return new i(e);
                    });
        };
    });
    var Hr = R((Zh, Xo) => {
        "use strict";
        u();
        Xo.exports = g;
        var ht = Ft(),
            Br,
            xi = ht.LongBits,
            $o = ht.base64,
            Qo = ht.utf8;
        function Qe(i, t, e) {
            (this.fn = i), (this.len = t), (this.next = void 0), (this.val = e);
        }
        function xr() {}
        function au(i) {
            (this.head = i.head), (this.tail = i.tail), (this.len = i.len), (this.next = i.states);
        }
        function g() {
            (this.len = 0), (this.head = new Qe(xr, 0, 0)), (this.tail = this.head), (this.states = null);
        }
        var zo = function () {
            return ht.Buffer
                ? function () {
                      return (g.create = function () {
                          return new Br();
                      })();
                  }
                : function () {
                      return new g();
                  };
        };
        g.create = zo();
        g.alloc = function (t) {
            return new ht.Array(t);
        };
        ht.Array !== Array && (g.alloc = ht.pool(g.alloc, ht.Array.prototype.subarray));
        g.prototype._push = function (t, e, r) {
            return (this.tail = this.tail.next = new Qe(t, e, r)), (this.len += e), this;
        };
        function jr(i, t, e) {
            t[e] = i & 255;
        }
        function uu(i, t, e) {
            for (; i > 127; ) (t[e++] = (i & 127) | 128), (i >>>= 7);
            t[e] = i;
        }
        function Vr(i, t) {
            (this.len = i), (this.next = void 0), (this.val = t);
        }
        Vr.prototype = Object.create(Qe.prototype);
        Vr.prototype.fn = uu;
        g.prototype.uint32 = function (t) {
            return (
                (this.len += (this.tail = this.tail.next =
                    new Vr((t = t >>> 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len),
                this
            );
        };
        g.prototype.int32 = function (t) {
            return t < 0 ? this._push(Fr, 10, xi.fromNumber(t)) : this.uint32(t);
        };
        g.prototype.sint32 = function (t) {
            return this.uint32(((t << 1) ^ (t >> 31)) >>> 0);
        };
        function Fr(i, t, e) {
            for (; i.hi; ) (t[e++] = (i.lo & 127) | 128), (i.lo = ((i.lo >>> 7) | (i.hi << 25)) >>> 0), (i.hi >>>= 7);
            for (; i.lo > 127; ) (t[e++] = (i.lo & 127) | 128), (i.lo = i.lo >>> 7);
            t[e++] = i.lo;
        }
        g.prototype.uint64 = function (t) {
            var e = xi.from(t);
            return this._push(Fr, e.length(), e);
        };
        g.prototype.int64 = g.prototype.uint64;
        g.prototype.sint64 = function (t) {
            var e = xi.from(t).zzEncode();
            return this._push(Fr, e.length(), e);
        };
        g.prototype.bool = function (t) {
            return this._push(jr, 1, t ? 1 : 0);
        };
        function kr(i, t, e) {
            (t[e] = i & 255), (t[e + 1] = (i >>> 8) & 255), (t[e + 2] = (i >>> 16) & 255), (t[e + 3] = i >>> 24);
        }
        g.prototype.fixed32 = function (t) {
            return this._push(kr, 4, t >>> 0);
        };
        g.prototype.sfixed32 = g.prototype.fixed32;
        g.prototype.fixed64 = function (t) {
            var e = xi.from(t);
            return this._push(kr, 4, e.lo)._push(kr, 4, e.hi);
        };
        g.prototype.sfixed64 = g.prototype.fixed64;
        g.prototype.float = function (t) {
            return this._push(ht.float.writeFloatLE, 4, t);
        };
        g.prototype.double = function (t) {
            return this._push(ht.float.writeDoubleLE, 8, t);
        };
        var lu = ht.Array.prototype.set
            ? function (t, e, r) {
                  e.set(t, r);
              }
            : function (t, e, r) {
                  for (var n = 0; n < t.length; ++n) e[r + n] = t[n];
              };
        g.prototype.bytes = function (t) {
            var e = t.length >>> 0;
            if (!e) return this._push(jr, 1, 0);
            if (ht.isString(t)) {
                var r = g.alloc((e = $o.length(t)));
                $o.decode(t, r, 0), (t = r);
            }
            return this.uint32(e)._push(lu, e, t);
        };
        g.prototype.string = function (t) {
            var e = Qo.length(t);
            return e ? this.uint32(e)._push(Qo.write, e, t) : this._push(jr, 1, 0);
        };
        g.prototype.fork = function () {
            return (this.states = new au(this)), (this.head = this.tail = new Qe(xr, 0, 0)), (this.len = 0), this;
        };
        g.prototype.reset = function () {
            return (
                this.states
                    ? ((this.head = this.states.head),
                      (this.tail = this.states.tail),
                      (this.len = this.states.len),
                      (this.states = this.states.next))
                    : ((this.head = this.tail = new Qe(xr, 0, 0)), (this.len = 0)),
                this
            );
        };
        g.prototype.ldelim = function () {
            var t = this.head,
                e = this.tail,
                r = this.len;
            return this.reset().uint32(r), r && ((this.tail.next = t.next), (this.tail = e), (this.len += r)), this;
        };
        g.prototype.finish = function () {
            for (var t = this.head.next, e = this.constructor.alloc(this.len), r = 0; t; )
                t.fn(t.val, e, r), (r += t.len), (t = t.next);
            return e;
        };
        g._configure = function (i) {
            (Br = i), (g.create = zo()), Br._configure();
        };
    });
    var es = R((tf, ts) => {
        "use strict";
        u();
        ts.exports = At;
        var Zo = Hr();
        (At.prototype = Object.create(Zo.prototype)).constructor = At;
        var Ht = Ft();
        function At() {
            Zo.call(this);
        }
        At._configure = function () {
            (At.alloc = Ht._Buffer_allocUnsafe),
                (At.writeBytesBuffer =
                    Ht.Buffer && Ht.Buffer.prototype instanceof Uint8Array && Ht.Buffer.prototype.set.name === "set"
                        ? function (t, e, r) {
                              e.set(t, r);
                          }
                        : function (t, e, r) {
                              if (t.copy) t.copy(e, r, 0, t.length);
                              else for (var n = 0; n < t.length; ) e[r++] = t[n++];
                          });
        };
        At.prototype.bytes = function (t) {
            Ht.isString(t) && (t = Ht._Buffer_from(t, "base64"));
            var e = t.length >>> 0;
            return this.uint32(e), e && this._push(At.writeBytesBuffer, e, t), this;
        };
        function hu(i, t, e) {
            i.length < 40 ? Ht.utf8.write(i, t, e) : t.utf8Write ? t.utf8Write(i, e) : t.write(i, e);
        }
        At.prototype.string = function (t) {
            var e = Ht.Buffer.byteLength(t);
            return this.uint32(e), e && this._push(hu, e, t), this;
        };
        At._configure();
    });
    var Wr = R((ef, ss) => {
        "use strict";
        u();
        ss.exports = j;
        var Dt = Ft(),
            qr,
            ns = Dt.LongBits,
            fu = Dt.utf8;
        function yt(i, t) {
            return RangeError("index out of range: " + i.pos + " + " + (t || 1) + " > " + i.len);
        }
        function j(i) {
            (this.buf = i), (this.pos = 0), (this.len = i.length);
        }
        var is =
                typeof Uint8Array != "undefined"
                    ? function (t) {
                          if (t instanceof Uint8Array || Array.isArray(t)) return new j(t);
                          throw Error("illegal buffer");
                      }
                    : function (t) {
                          if (Array.isArray(t)) return new j(t);
                          throw Error("illegal buffer");
                      },
            os = function () {
                return Dt.Buffer
                    ? function (e) {
                          return (j.create = function (n) {
                              return Dt.Buffer.isBuffer(n) ? new qr(n) : is(n);
                          })(e);
                      }
                    : is;
            };
        j.create = os();
        j.prototype._slice = Dt.Array.prototype.subarray || Dt.Array.prototype.slice;
        j.prototype.uint32 = (function () {
            var t = 4294967295;
            return function () {
                if (
                    ((t = (this.buf[this.pos] & 127) >>> 0),
                    this.buf[this.pos++] < 128 ||
                        ((t = (t | ((this.buf[this.pos] & 127) << 7)) >>> 0), this.buf[this.pos++] < 128) ||
                        ((t = (t | ((this.buf[this.pos] & 127) << 14)) >>> 0), this.buf[this.pos++] < 128) ||
                        ((t = (t | ((this.buf[this.pos] & 127) << 21)) >>> 0), this.buf[this.pos++] < 128) ||
                        ((t = (t | ((this.buf[this.pos] & 15) << 28)) >>> 0), this.buf[this.pos++] < 128))
                )
                    return t;
                if ((this.pos += 5) > this.len) throw ((this.pos = this.len), yt(this, 10));
                return t;
            };
        })();
        j.prototype.int32 = function () {
            return this.uint32() | 0;
        };
        j.prototype.sint32 = function () {
            var t = this.uint32();
            return ((t >>> 1) ^ -(t & 1)) | 0;
        };
        function Gr() {
            var i = new ns(0, 0),
                t = 0;
            if (this.len - this.pos > 4) {
                for (; t < 4; ++t)
                    if (((i.lo = (i.lo | ((this.buf[this.pos] & 127) << (t * 7))) >>> 0), this.buf[this.pos++] < 128))
                        return i;
                if (
                    ((i.lo = (i.lo | ((this.buf[this.pos] & 127) << 28)) >>> 0),
                    (i.hi = (i.hi | ((this.buf[this.pos] & 127) >> 4)) >>> 0),
                    this.buf[this.pos++] < 128)
                )
                    return i;
                t = 0;
            } else {
                for (; t < 3; ++t) {
                    if (this.pos >= this.len) throw yt(this);
                    if (((i.lo = (i.lo | ((this.buf[this.pos] & 127) << (t * 7))) >>> 0), this.buf[this.pos++] < 128))
                        return i;
                }
                return (i.lo = (i.lo | ((this.buf[this.pos++] & 127) << (t * 7))) >>> 0), i;
            }
            if (this.len - this.pos > 4) {
                for (; t < 5; ++t)
                    if (
                        ((i.hi = (i.hi | ((this.buf[this.pos] & 127) << (t * 7 + 3))) >>> 0),
                        this.buf[this.pos++] < 128)
                    )
                        return i;
            } else
                for (; t < 5; ++t) {
                    if (this.pos >= this.len) throw yt(this);
                    if (
                        ((i.hi = (i.hi | ((this.buf[this.pos] & 127) << (t * 7 + 3))) >>> 0),
                        this.buf[this.pos++] < 128)
                    )
                        return i;
                }
            throw Error("invalid varint encoding");
        }
        j.prototype.bool = function () {
            return this.uint32() !== 0;
        };
        function ji(i, t) {
            return (i[t - 4] | (i[t - 3] << 8) | (i[t - 2] << 16) | (i[t - 1] << 24)) >>> 0;
        }
        j.prototype.fixed32 = function () {
            if (this.pos + 4 > this.len) throw yt(this, 4);
            return ji(this.buf, (this.pos += 4));
        };
        j.prototype.sfixed32 = function () {
            if (this.pos + 4 > this.len) throw yt(this, 4);
            return ji(this.buf, (this.pos += 4)) | 0;
        };
        function rs() {
            if (this.pos + 8 > this.len) throw yt(this, 8);
            return new ns(ji(this.buf, (this.pos += 4)), ji(this.buf, (this.pos += 4)));
        }
        j.prototype.float = function () {
            if (this.pos + 4 > this.len) throw yt(this, 4);
            var t = Dt.float.readFloatLE(this.buf, this.pos);
            return (this.pos += 4), t;
        };
        j.prototype.double = function () {
            if (this.pos + 8 > this.len) throw yt(this, 4);
            var t = Dt.float.readDoubleLE(this.buf, this.pos);
            return (this.pos += 8), t;
        };
        j.prototype.bytes = function () {
            var t = this.uint32(),
                e = this.pos,
                r = this.pos + t;
            if (r > this.len) throw yt(this, t);
            return (
                (this.pos += t),
                Array.isArray(this.buf)
                    ? this.buf.slice(e, r)
                    : e === r
                    ? new this.buf.constructor(0)
                    : this._slice.call(this.buf, e, r)
            );
        };
        j.prototype.string = function () {
            var t = this.bytes();
            return fu.read(t, 0, t.length);
        };
        j.prototype.skip = function (t) {
            if (typeof t == "number") {
                if (this.pos + t > this.len) throw yt(this, t);
                this.pos += t;
            } else
                do if (this.pos >= this.len) throw yt(this);
                while (this.buf[this.pos++] & 128);
            return this;
        };
        j.prototype.skipType = function (i) {
            switch (i) {
                case 0:
                    this.skip();
                    break;
                case 1:
                    this.skip(8);
                    break;
                case 2:
                    this.skip(this.uint32());
                    break;
                case 3:
                    for (; (i = this.uint32() & 7) !== 4; ) this.skipType(i);
                    break;
                case 5:
                    this.skip(4);
                    break;
                default:
                    throw Error("invalid wire type " + i + " at offset " + this.pos);
            }
            return this;
        };
        j._configure = function (i) {
            (qr = i), (j.create = os()), qr._configure();
            var t = Dt.Long ? "toLong" : "toNumber";
            Dt.merge(j.prototype, {
                int64: function () {
                    return Gr.call(this)[t](!1);
                },
                uint64: function () {
                    return Gr.call(this)[t](!0);
                },
                sint64: function () {
                    return Gr.call(this).zzDecode()[t](!1);
                },
                fixed64: function () {
                    return rs.call(this)[t](!0);
                },
                sfixed64: function () {
                    return rs.call(this)[t](!1);
                },
            });
        };
    });
    var ls = R((rf, us) => {
        "use strict";
        u();
        us.exports = le;
        var as = Wr();
        (le.prototype = Object.create(as.prototype)).constructor = le;
        var cs = Ft();
        function le(i) {
            as.call(this, i);
        }
        le._configure = function () {
            cs.Buffer && (le.prototype._slice = cs.Buffer.prototype.slice);
        };
        le.prototype.string = function () {
            var t = this.uint32();
            return this.buf.utf8Slice
                ? this.buf.utf8Slice(this.pos, (this.pos = Math.min(this.pos + t, this.len)))
                : this.buf.toString("utf-8", this.pos, (this.pos = Math.min(this.pos + t, this.len)));
        };
        le._configure();
    });
    var fs = R((nf, hs) => {
        "use strict";
        u();
        hs.exports = ze;
        var Yr = Ft();
        (ze.prototype = Object.create(Yr.EventEmitter.prototype)).constructor = ze;
        function ze(i, t, e) {
            if (typeof i != "function") throw TypeError("rpcImpl must be a function");
            Yr.EventEmitter.call(this),
                (this.rpcImpl = i),
                (this.requestDelimited = Boolean(t)),
                (this.responseDelimited = Boolean(e));
        }
        ze.prototype.rpcCall = function i(t, e, r, n, o) {
            if (!n) throw TypeError("request must be specified");
            var s = this;
            if (!o) return Yr.asPromise(i, s, t, e, r, n);
            if (!s.rpcImpl) {
                setTimeout(function () {
                    o(Error("already ended"));
                }, 0);
                return;
            }
            try {
                return s.rpcImpl(t, e[s.requestDelimited ? "encodeDelimited" : "encode"](n).finish(), function (a, l) {
                    if (a) return s.emit("error", a, t), o(a);
                    if (l === null) {
                        s.end(!0);
                        return;
                    }
                    if (!(l instanceof r))
                        try {
                            l = r[s.responseDelimited ? "decodeDelimited" : "decode"](l);
                        } catch (h) {
                            return s.emit("error", h, t), o(h);
                        }
                    return s.emit("data", l, t), o(null, l);
                });
            } catch (c) {
                s.emit("error", c, t),
                    setTimeout(function () {
                        o(c);
                    }, 0);
                return;
            }
        };
        ze.prototype.end = function (t) {
            return (
                this.rpcImpl && (t || this.rpcImpl(null, null, null), (this.rpcImpl = null), this.emit("end").off()),
                this
            );
        };
    });
    var ps = R((ds) => {
        "use strict";
        u();
        var du = ds;
        du.Service = fs();
    });
    var ys = R((sf, Es) => {
        "use strict";
        u();
        Es.exports = {};
    });
    var _s = R((Ss) => {
        "use strict";
        u();
        var ot = Ss;
        ot.build = "minimal";
        ot.Writer = Hr();
        ot.BufferWriter = es();
        ot.Reader = Wr();
        ot.BufferReader = ls();
        ot.util = Ft();
        ot.rpc = ps();
        ot.roots = ys();
        ot.configure = Rs;
        function Rs() {
            ot.util._configure(), ot.Writer._configure(ot.BufferWriter), ot.Reader._configure(ot.BufferReader);
        }
        Rs();
    });
    var Ns = R((af, Os) => {
        "use strict";
        u();
        Os.exports = _s();
    });
    var Vi = R((uf, Ts) => {
        "use strict";
        u();
        var Xe = Ns(),
            I = Xe.Reader,
            ft = Xe.Writer,
            Gt = Xe.util,
            C = Xe.roots.default || (Xe.roots.default = {});
        C.AUTH_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "AUTH_UNKNOWN")] = 0),
                (t[(i[1] = "AUTH_ERROR")] = 1),
                (t[(i[2] = "AUTH_REQUEST")] = 2),
                (t[(i[3] = "AUTH_AUTH_SUCCESSFUL")] = 3),
                (t[(i[4] = "AUTH_AUTH_UNSUCCESSFUL")] = 4),
                (t[(i[100] = "AUTH_TOO_MANY_AUTH_ATTEMPTS")] = 100),
                (t[(i[101] = "AUTH_INVALID_MESSAGE")] = 101),
                (t[(i[102] = "AUTH_INVALID_MESSAGE_DATA")] = 102),
                t
            );
        })();
        C.AuthMessage = (function () {
            function i(t) {
                if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.encode = function (e, r) {
                    return (
                        r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(24).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(32).bool(e.isAck),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.AuthMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.isError = e.bool();
                                break;
                            case 4:
                                o.isAck = e.bool();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.CLUSTER_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "CLUSTER_UNKNOWN")] = 0),
                (t[(i[1] = "CLUSTER_REMOVE")] = 1),
                (t[(i[2] = "CLUSTER_STATUS")] = 2),
                t
            );
        })();
        C.ClusterMessage = (function () {
            function i(t) {
                if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.prototype.leaderScore = 0),
                (i.prototype.role = ""),
                (i.encode = function (e, r) {
                    return (
                        r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(24).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(32).bool(e.isAck),
                        e.leaderScore != null &&
                            Object.hasOwnProperty.call(e, "leaderScore") &&
                            r.uint32(40).int32(e.leaderScore),
                        e.role != null && Object.hasOwnProperty.call(e, "role") && r.uint32(58).string(e.role),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.ClusterMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.isError = e.bool();
                                break;
                            case 4:
                                o.isAck = e.bool();
                                break;
                            case 5:
                                o.leaderScore = e.int32();
                                break;
                            case 7:
                                o.role = e.string();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.CONNECTION_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "CONNECTION_UNKNOWN")] = 0),
                (t[(i[1] = "CONNECTION_ERROR")] = 1),
                (t[(i[2] = "CONNECTION_PING")] = 2),
                (t[(i[3] = "CONNECTION_PONG")] = 3),
                (t[(i[4] = "CONNECTION_ACCEPT")] = 4),
                (t[(i[5] = "CONNECTION_CHALLENGE")] = 5),
                (t[(i[6] = "CONNECTION_REJECT")] = 6),
                (t[(i[7] = "CONNECTION_REDIRECT")] = 7),
                (t[(i[8] = "CONNECTION_CLOSING")] = 8),
                (t[(i[9] = "CONNECTION_CLOSED")] = 9),
                (t[(i[100] = "CONNECTION_AUTHENTICATION_TIMEOUT")] = 100),
                (t[(i[101] = "CONNECTION_INVALID_MESSAGE")] = 101),
                t
            );
        })();
        C.ConnectionMessage = (function () {
            function i(t) {
                if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.prototype.url = ""),
                (i.prototype.protocolVersion = ""),
                (i.prototype.sdkType = ""),
                (i.prototype.sdkVersion = ""),
                (i.encode = function (e, r) {
                    return (
                        r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(24).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(32).bool(e.isAck),
                        e.url != null && Object.hasOwnProperty.call(e, "url") && r.uint32(42).string(e.url),
                        e.protocolVersion != null &&
                            Object.hasOwnProperty.call(e, "protocolVersion") &&
                            r.uint32(50).string(e.protocolVersion),
                        e.sdkVersion != null &&
                            Object.hasOwnProperty.call(e, "sdkVersion") &&
                            r.uint32(58).string(e.sdkVersion),
                        e.sdkType != null && Object.hasOwnProperty.call(e, "sdkType") && r.uint32(66).string(e.sdkType),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.ConnectionMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.isError = e.bool();
                                break;
                            case 4:
                                o.isAck = e.bool();
                                break;
                            case 5:
                                o.url = e.string();
                                break;
                            case 6:
                                o.protocolVersion = e.string();
                                break;
                            case 8:
                                o.sdkType = e.string();
                                break;
                            case 7:
                                o.sdkVersion = e.string();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.EVENT_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "EVENT_UNKNOWN")] = 0),
                (t[(i[1] = "EVENT_ERROR")] = 1),
                (t[(i[2] = "EVENT_EMIT")] = 2),
                (t[(i[3] = "EVENT_SUBSCRIBE")] = 3),
                (t[(i[4] = "EVENT_UNSUBSCRIBE")] = 4),
                (t[(i[5] = "EVENT_LISTEN")] = 5),
                (t[(i[6] = "EVENT_UNLISTEN")] = 6),
                (t[(i[7] = "EVENT_LISTEN_ACCEPT")] = 7),
                (t[(i[8] = "EVENT_LISTEN_REJECT")] = 8),
                (t[(i[9] = "EVENT_SUBSCRIPTION_HAS_PROVIDER")] = 9),
                (t[(i[10] = "EVENT_SUBSCRIPTION_HAS_NO_PROVIDER")] = 10),
                (t[(i[11] = "EVENT_SUBSCRIPTION_FOR_PATTERN_FOUND")] = 11),
                (t[(i[12] = "EVENT_SUBSCRIPTION_FOR_PATTERN_REMOVED")] = 12),
                (t[(i[100] = "EVENT_INVALID_LISTEN_REGEX")] = 100),
                (t[(i[101] = "EVENT_LISTEN_RESPONSE_TIMEOUT")] = 101),
                (t[(i[102] = "EVENT_LISTEN_UNSUCCESSFUL")] = 102),
                (t[(i[103] = "EVENT_MESSAGE_PERMISSION_ERROR")] = 103),
                (t[(i[104] = "EVENT_MESSAGE_DENIED")] = 104),
                (t[(i[105] = "EVENT_INVALID_MESSAGE_DATA")] = 105),
                (t[(i[106] = "EVENT_MULTIPLE_SUBSCRIPTIONS")] = 106),
                (t[(i[107] = "EVENT_NOT_SUBSCRIBED")] = 107),
                t
            );
        })();
        C.EventMessage = (function () {
            function i(t) {
                if (((this.names = []), t))
                    for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.correlationId = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.prototype.name = ""),
                (i.prototype.names = Gt.emptyArray),
                (i.prototype.subscription = ""),
                (i.prototype.originalTOPIC = 0),
                (i.prototype.originalAction = 0),
                (i.encode = function (e, r) {
                    if (
                        (r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.correlationId != null &&
                            Object.hasOwnProperty.call(e, "correlationId") &&
                            r.uint32(26).string(e.correlationId),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(32).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(40).bool(e.isAck),
                        e.name != null && Object.hasOwnProperty.call(e, "name") && r.uint32(50).string(e.name),
                        e.names != null && e.names.length)
                    )
                        for (var n = 0; n < e.names.length; ++n) r.uint32(58).string(e.names[n]);
                    return (
                        e.subscription != null &&
                            Object.hasOwnProperty.call(e, "subscription") &&
                            r.uint32(66).string(e.subscription),
                        e.originalTOPIC != null &&
                            Object.hasOwnProperty.call(e, "originalTOPIC") &&
                            r.uint32(80).int32(e.originalTOPIC),
                        e.originalAction != null &&
                            Object.hasOwnProperty.call(e, "originalAction") &&
                            r.uint32(88).int32(e.originalAction),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.EventMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.correlationId = e.string();
                                break;
                            case 4:
                                o.isError = e.bool();
                                break;
                            case 5:
                                o.isAck = e.bool();
                                break;
                            case 6:
                                o.name = e.string();
                                break;
                            case 7:
                                (o.names && o.names.length) || (o.names = []), o.names.push(e.string());
                                break;
                            case 8:
                                o.subscription = e.string();
                                break;
                            case 10:
                                o.originalTOPIC = e.int32();
                                break;
                            case 11:
                                o.originalAction = e.int32();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.TOPIC = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "UNKNOWN")] = 0),
                (t[(i[1] = "PARSER")] = 1),
                (t[(i[2] = "CONNECTION")] = 2),
                (t[(i[3] = "AUTH")] = 3),
                (t[(i[4] = "EVENT")] = 4),
                (t[(i[5] = "RECORD")] = 5),
                (t[(i[6] = "RPC")] = 6),
                (t[(i[7] = "PRESENCE")] = 7),
                (t[(i[8] = "MONITORING")] = 8),
                (t[(i[9] = "CLUSTER")] = 9),
                (t[(i[10] = "LOCK")] = 10),
                (t[(i[11] = "STATE_REGISTRY")] = 11),
                (t[(i[100] = "ERROR")] = 100),
                t
            );
        })();
        C.Message = (function () {
            function i(t) {
                if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.topic = 0),
                (i.prototype.message = Gt.newBuffer([])),
                (i.encode = function (e, r) {
                    return (
                        r || (r = ft.create()),
                        e.topic != null && Object.hasOwnProperty.call(e, "topic") && r.uint32(16).int32(e.topic),
                        e.message != null && Object.hasOwnProperty.call(e, "message") && r.uint32(26).bytes(e.message),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.Message(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 2:
                                o.topic = e.int32();
                                break;
                            case 3:
                                o.message = e.bytes();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.LOCK_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "LOCK_UNKNOWN")] = 0),
                (t[(i[1] = "LOCK_ERROR")] = 1),
                (t[(i[2] = "LOCK_REQUEST")] = 2),
                (t[(i[3] = "LOCK_RESPONSE")] = 3),
                (t[(i[4] = "LOCK_RELEASE")] = 4),
                t
            );
        })();
        C.LockMessage = (function () {
            function i(t) {
                if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.locked = !1),
                (i.encode = function (e, r) {
                    return (
                        r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.locked != null && Object.hasOwnProperty.call(e, "locked") && r.uint32(24).bool(e.locked),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.LockMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 3:
                                o.locked = e.bool();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.MONITORING_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (t[(i[0] = "MONITORING_UNKNOWN")] = 0), t;
        })();
        C.MonitoringMessage = (function () {
            function i(t) {
                if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.correlationId = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.encode = function (e, r) {
                    return (
                        r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.correlationId != null &&
                            Object.hasOwnProperty.call(e, "correlationId") &&
                            r.uint32(26).string(e.correlationId),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(32).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(40).bool(e.isAck),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.MonitoringMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.correlationId = e.string();
                                break;
                            case 4:
                                o.isError = e.bool();
                                break;
                            case 5:
                                o.isAck = e.bool();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.PARSER_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "PARSER_UNKNOWN")] = 0),
                (t[(i[1] = "PARSER_UNKNOWN_TOPIC")] = 1),
                (t[(i[2] = "PARSER_UNKNOWN_ACTION")] = 2),
                (t[(i[3] = "PARSER_INVALID_MESSAGE")] = 3),
                (t[(i[4] = "PARSER_MESSAGE_PARSE_ERROR")] = 4),
                (t[(i[5] = "PARSER_MAXIMUM_MESSAGE_SIZE_EXCEEDED")] = 5),
                (t[(i[6] = "PARSER_ERROR")] = 6),
                (t[(i[7] = "PARSER_INVALID_META_PARAMS")] = 7),
                t
            );
        })();
        C.ParserMessage = (function () {
            function i(t) {
                if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.originalTOPIC = 0),
                (i.prototype.originalAction = 0),
                (i.encode = function (e, r) {
                    return (
                        r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.originalTOPIC != null &&
                            Object.hasOwnProperty.call(e, "originalTOPIC") &&
                            r.uint32(64).int32(e.originalTOPIC),
                        e.originalAction != null &&
                            Object.hasOwnProperty.call(e, "originalAction") &&
                            r.uint32(72).int32(e.originalAction),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.ParserMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 8:
                                o.originalTOPIC = e.int32();
                                break;
                            case 9:
                                o.originalAction = e.int32();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.PRESENCE_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "PRESENCE_UNKNOWN")] = 0),
                (t[(i[1] = "PRESENCE_ERROR")] = 1),
                (t[(i[2] = "PRESENCE_QUERY_ALL")] = 2),
                (t[(i[3] = "PRESENCE_QUERY_ALL_RESPONSE")] = 3),
                (t[(i[4] = "PRESENCE_QUERY")] = 4),
                (t[(i[5] = "PRESENCE_QUERY_RESPONSE")] = 5),
                (t[(i[6] = "PRESENCE_PRESENCE_JOIN")] = 6),
                (t[(i[7] = "PRESENCE_PRESENCE_JOIN_ALL")] = 7),
                (t[(i[8] = "PRESENCE_PRESENCE_LEAVE")] = 8),
                (t[(i[9] = "PRESENCE_PRESENCE_LEAVE_ALL")] = 9),
                (t[(i[10] = "PRESENCE_SUBSCRIBE")] = 10),
                (t[(i[11] = "PRESENCE_UNSUBSCRIBE")] = 11),
                (t[(i[12] = "PRESENCE_SUBSCRIBE_ALL")] = 12),
                (t[(i[13] = "PRESENCE_UNSUBSCRIBE_ALL")] = 13),
                (t[(i[100] = "PRESENCE_INVALID_PRESENCE_USERS")] = 100),
                (t[(i[101] = "PRESENCE_MESSAGE_PERMISSION_ERROR")] = 101),
                (t[(i[102] = "PRESENCE_MESSAGE_DENIED")] = 102),
                (t[(i[103] = "PRESENCE_MULTIPLE_SUBSCRIPTIONS")] = 103),
                (t[(i[104] = "PRESENCE_NOT_SUBSCRIBED")] = 104),
                t
            );
        })();
        C.PresenceMessage = (function () {
            function i(t) {
                if (((this.names = []), t))
                    for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.originalTOPIC = 0),
                (i.prototype.originalAction = 0),
                (i.prototype.data = ""),
                (i.prototype.correlationId = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.prototype.name = ""),
                (i.prototype.names = Gt.emptyArray),
                (i.encode = function (e, r) {
                    if (
                        (r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.originalTOPIC != null &&
                            Object.hasOwnProperty.call(e, "originalTOPIC") &&
                            r.uint32(16).int32(e.originalTOPIC),
                        e.originalAction != null &&
                            Object.hasOwnProperty.call(e, "originalAction") &&
                            r.uint32(24).int32(e.originalAction),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(34).string(e.data),
                        e.correlationId != null &&
                            Object.hasOwnProperty.call(e, "correlationId") &&
                            r.uint32(42).string(e.correlationId),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(48).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(56).bool(e.isAck),
                        e.name != null && Object.hasOwnProperty.call(e, "name") && r.uint32(66).string(e.name),
                        e.names != null && e.names.length)
                    )
                        for (var n = 0; n < e.names.length; ++n) r.uint32(74).string(e.names[n]);
                    return r;
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.PresenceMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.originalTOPIC = e.int32();
                                break;
                            case 3:
                                o.originalAction = e.int32();
                                break;
                            case 4:
                                o.data = e.string();
                                break;
                            case 5:
                                o.correlationId = e.string();
                                break;
                            case 6:
                                o.isError = e.bool();
                                break;
                            case 7:
                                o.isAck = e.bool();
                                break;
                            case 8:
                                o.name = e.string();
                                break;
                            case 9:
                                (o.names && o.names.length) || (o.names = []), o.names.push(e.string());
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.RECORD_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "RECORD_UNKNOWN")] = 0),
                (t[(i[1] = "RECORD_ERROR")] = 1),
                (t[(i[2] = "RECORD_NOTIFY")] = 2),
                (t[(i[3] = "RECORD_READ")] = 3),
                (t[(i[4] = "RECORD_READ_RESPONSE")] = 4),
                (t[(i[5] = "RECORD_HEAD")] = 5),
                (t[(i[6] = "RECORD_HEAD_RESPONSE")] = 6),
                (t[(i[7] = "RECORD_HEAD_BULK")] = 7),
                (t[(i[8] = "RECORD_HEAD_RESPONSE_BULK")] = 8),
                (t[(i[9] = "RECORD_DELETE")] = 9),
                (t[(i[10] = "RECORD_DELETE_SUCCESS")] = 10),
                (t[(i[11] = "RECORD_DELETE_BULK")] = 11),
                (t[(i[12] = "RECORD_DELETE_BULK_SUCCESS")] = 12),
                (t[(i[13] = "RECORD_DELETED")] = 13),
                (t[(i[14] = "RECORD_WRITE_ACKNOWLEDGEMENT")] = 14),
                (t[(i[15] = "RECORD_CREATE")] = 15),
                (t[(i[16] = "RECORD_CREATEANDUPDATE")] = 16),
                (t[(i[17] = "RECORD_CREATEANDPATCH")] = 17),
                (t[(i[18] = "RECORD_UPDATE")] = 18),
                (t[(i[19] = "RECORD_PATCH")] = 19),
                (t[(i[20] = "RECORD_ERASE")] = 20),
                (t[(i[21] = "RECORD_SUBSCRIBEANDHEAD")] = 21),
                (t[(i[22] = "RECORD_SUBSCRIBEANDREAD")] = 22),
                (t[(i[23] = "RECORD_SUBSCRIBECREATEANDREAD")] = 23),
                (t[(i[24] = "RECORD_SUBSCRIBECREATEANDUPDATE")] = 24),
                (t[(i[25] = "RECORD_SUBSCRIBE")] = 25),
                (t[(i[26] = "RECORD_UNSUBSCRIBE")] = 26),
                (t[(i[27] = "RECORD_LISTEN")] = 27),
                (t[(i[28] = "RECORD_UNLISTEN")] = 28),
                (t[(i[29] = "RECORD_LISTEN_ACCEPT")] = 29),
                (t[(i[30] = "RECORD_LISTEN_REJECT")] = 30),
                (t[(i[31] = "RECORD_SUBSCRIPTION_HAS_PROVIDER")] = 31),
                (t[(i[32] = "RECORD_SUBSCRIPTION_HAS_NO_PROVIDER")] = 32),
                (t[(i[33] = "RECORD_SUBSCRIPTION_FOR_PATTERN_FOUND")] = 33),
                (t[(i[34] = "RECORD_SUBSCRIPTION_FOR_PATTERN_REMOVED")] = 34),
                (t[(i[100] = "RECORD_CACHE_RETRIEVAL_TIMEOUT")] = 100),
                (t[(i[101] = "RECORD_STORAGE_RETRIEVAL_TIMEOUT")] = 101),
                (t[(i[102] = "RECORD_VERSION_EXISTS")] = 102),
                (t[(i[103] = "RECORD_RECORD_LOAD_ERROR")] = 103),
                (t[(i[104] = "RECORD_RECORD_CREATE_ERROR")] = 104),
                (t[(i[105] = "RECORD_RECORD_UPDATE_ERROR")] = 105),
                (t[(i[106] = "RECORD_RECORD_DELETE_ERROR")] = 106),
                (t[(i[107] = "RECORD_RECORD_NOT_FOUND")] = 107),
                (t[(i[108] = "RECORD_INVALID_VERSION")] = 108),
                (t[(i[109] = "RECORD_INVALID_PATCH_ON_HOTPATH")] = 109),
                (t[(i[110] = "RECORD_INVALID_LISTEN_REGEX")] = 110),
                (t[(i[111] = "RECORD_LISTEN_RESPONSE_TIMEOUT")] = 111),
                (t[(i[112] = "RECORD_LISTEN_UNSUCCESSFUL")] = 112),
                (t[(i[113] = "RECORD_RECORD_NOTIFY_ERROR")] = 113),
                (t[(i[114] = "RECORD_MESSAGE_PERMISSION_ERROR")] = 114),
                (t[(i[115] = "RECORD_MESSAGE_DENIED")] = 115),
                (t[(i[116] = "RECORD_INVALID_MESSAGE_DATA")] = 116),
                (t[(i[117] = "RECORD_MULTIPLE_SUBSCRIPTIONS")] = 117),
                (t[(i[118] = "RECORD_NOT_SUBSCRIBED")] = 118),
                t
            );
        })();
        C.RecordMessage = (function () {
            function i(t) {
                if (((this.names = []), (this.versions = {}), t))
                    for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.correlationId = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.prototype.name = ""),
                (i.prototype.names = Gt.emptyArray),
                (i.prototype.pattern = ""),
                (i.prototype.subscription = ""),
                (i.prototype.originalAction = 0),
                (i.prototype.isWriteAck = !1),
                (i.prototype.path = ""),
                (i.prototype.version = 0),
                (i.prototype.versions = Gt.emptyObject),
                (i.encode = function (e, r) {
                    if (
                        (r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.correlationId != null &&
                            Object.hasOwnProperty.call(e, "correlationId") &&
                            r.uint32(26).string(e.correlationId),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(32).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(40).bool(e.isAck),
                        e.name != null && Object.hasOwnProperty.call(e, "name") && r.uint32(50).string(e.name),
                        e.names != null && e.names.length)
                    )
                        for (var n = 0; n < e.names.length; ++n) r.uint32(58).string(e.names[n]);
                    if (
                        (e.pattern != null &&
                            Object.hasOwnProperty.call(e, "pattern") &&
                            r.uint32(66).string(e.pattern),
                        e.subscription != null &&
                            Object.hasOwnProperty.call(e, "subscription") &&
                            r.uint32(74).string(e.subscription),
                        e.originalAction != null &&
                            Object.hasOwnProperty.call(e, "originalAction") &&
                            r.uint32(80).int32(e.originalAction),
                        e.isWriteAck != null &&
                            Object.hasOwnProperty.call(e, "isWriteAck") &&
                            r.uint32(88).bool(e.isWriteAck),
                        e.path != null && Object.hasOwnProperty.call(e, "path") && r.uint32(98).string(e.path),
                        e.version != null && Object.hasOwnProperty.call(e, "version") && r.uint32(104).int32(e.version),
                        e.versions != null && Object.hasOwnProperty.call(e, "versions"))
                    )
                        for (var o = Object.keys(e.versions), n = 0; n < o.length; ++n)
                            r.uint32(114).fork().uint32(10).string(o[n]).uint32(16).int32(e.versions[o[n]]).ldelim();
                    return r;
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.RecordMessage(), s, c; e.pos < n; ) {
                        var a = e.uint32();
                        switch (a >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.correlationId = e.string();
                                break;
                            case 4:
                                o.isError = e.bool();
                                break;
                            case 5:
                                o.isAck = e.bool();
                                break;
                            case 6:
                                o.name = e.string();
                                break;
                            case 7:
                                (o.names && o.names.length) || (o.names = []), o.names.push(e.string());
                                break;
                            case 8:
                                o.pattern = e.string();
                                break;
                            case 9:
                                o.subscription = e.string();
                                break;
                            case 10:
                                o.originalAction = e.int32();
                                break;
                            case 11:
                                o.isWriteAck = e.bool();
                                break;
                            case 12:
                                o.path = e.string();
                                break;
                            case 13:
                                o.version = e.int32();
                                break;
                            case 14:
                                o.versions === Gt.emptyObject && (o.versions = {});
                                var l = e.uint32() + e.pos;
                                for (s = "", c = 0; e.pos < l; ) {
                                    var h = e.uint32();
                                    switch (h >>> 3) {
                                        case 1:
                                            s = e.string();
                                            break;
                                        case 2:
                                            c = e.int32();
                                            break;
                                        default:
                                            e.skipType(h & 7);
                                            break;
                                    }
                                }
                                o.versions[s] = c;
                                break;
                            default:
                                e.skipType(a & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.RPC_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "RPC_UNKNOWN")] = 0),
                (t[(i[1] = "RPC_ERROR")] = 1),
                (t[(i[2] = "RPC_REQUEST")] = 2),
                (t[(i[4] = "RPC_ACCEPT")] = 4),
                (t[(i[5] = "RPC_RESPONSE")] = 5),
                (t[(i[6] = "RPC_REJECT")] = 6),
                (t[(i[7] = "RPC_REQUEST_ERROR")] = 7),
                (t[(i[8] = "RPC_PROVIDE")] = 8),
                (t[(i[9] = "RPC_UNPROVIDE")] = 9),
                (t[(i[100] = "RPC_NO_RPC_PROVIDER")] = 100),
                (t[(i[101] = "RPC_ACCEPT_TIMEOUT")] = 101),
                (t[(i[102] = "RPC_MULTIPLE_ACCEPT")] = 102),
                (t[(i[103] = "RPC_INVALID_RPC_CORRELATION_ID")] = 103),
                (t[(i[104] = "RPC_RESPONSE_TIMEOUT")] = 104),
                (t[(i[105] = "RPC_MULTIPLE_RESPONSE")] = 105),
                (t[(i[106] = "RPC_MESSAGE_PERMISSION_ERROR")] = 106),
                (t[(i[107] = "RPC_MESSAGE_DENIED")] = 107),
                (t[(i[108] = "RPC_INVALID_MESSAGE_DATA")] = 108),
                (t[(i[109] = "RPC_MULTIPLE_PROVIDERS")] = 109),
                (t[(i[110] = "RPC_NOT_PROVIDED")] = 110),
                t
            );
        })();
        C.RpcMessage = (function () {
            function i(t) {
                if (((this.names = []), t))
                    for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.correlationId = ""),
                (i.prototype.isError = !1),
                (i.prototype.isAck = !1),
                (i.prototype.names = Gt.emptyArray),
                (i.prototype.name = ""),
                (i.prototype.originalAction = 0),
                (i.prototype.requestorName = ""),
                (i.prototype.requestorData = ""),
                (i.encode = function (e, r) {
                    if (
                        (r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.correlationId != null &&
                            Object.hasOwnProperty.call(e, "correlationId") &&
                            r.uint32(26).string(e.correlationId),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(32).bool(e.isError),
                        e.isAck != null && Object.hasOwnProperty.call(e, "isAck") && r.uint32(40).bool(e.isAck),
                        e.names != null && e.names.length)
                    )
                        for (var n = 0; n < e.names.length; ++n) r.uint32(50).string(e.names[n]);
                    return (
                        e.name != null && Object.hasOwnProperty.call(e, "name") && r.uint32(58).string(e.name),
                        e.originalAction != null &&
                            Object.hasOwnProperty.call(e, "originalAction") &&
                            r.uint32(72).int32(e.originalAction),
                        e.requestorName != null &&
                            Object.hasOwnProperty.call(e, "requestorName") &&
                            r.uint32(82).string(e.requestorName),
                        e.requestorData != null &&
                            Object.hasOwnProperty.call(e, "requestorData") &&
                            r.uint32(90).string(e.requestorData),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.RpcMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.correlationId = e.string();
                                break;
                            case 4:
                                o.isError = e.bool();
                                break;
                            case 5:
                                o.isAck = e.bool();
                                break;
                            case 6:
                                (o.names && o.names.length) || (o.names = []), o.names.push(e.string());
                                break;
                            case 7:
                                o.name = e.string();
                                break;
                            case 9:
                                o.originalAction = e.int32();
                                break;
                            case 10:
                                o.requestorName = e.string();
                                break;
                            case 11:
                                o.requestorData = e.string();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        C.STATE_REGISTRY_TOPIC = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "STATE_REGISTRY_UNKNOWN")] = 0),
                (t[(i[11] = "STATE_REGISTRY_EVENT_SUBSCRIPTIONS")] = 11),
                (t[(i[12] = "STATE_REGISTRY_RECORD_SUBSCRIPTIONS")] = 12),
                (t[(i[9] = "STATE_REGISTRY_SUBSCRIPTIONS")] = 9),
                (t[(i[10] = "STATE_REGISTRY_ONLINE_USERS")] = 10),
                (t[(i[24] = "STATE_REGISTRY_MONITORING_SUBSCRIPTIONS")] = 24),
                (t[(i[13] = "STATE_REGISTRY_RPC_SUBSCRIPTIONS")] = 13),
                (t[(i[14] = "STATE_REGISTRY_PRESENCE_SUBSCRIPTIONS")] = 14),
                (t[(i[15] = "STATE_REGISTRY_RECORD_LISTEN_PATTERNS")] = 15),
                (t[(i[16] = "STATE_REGISTRY_EVENT_LISTEN_PATTERNS")] = 16),
                (t[(i[17] = "STATE_REGISTRY_RECORD_PUBLISHED_SUBSCRIPTIONS")] = 17),
                (t[(i[18] = "STATE_REGISTRY_EVENT_PUBLISHED_SUBSCRIPTIONS")] = 18),
                (t[(i[19] = "STATE_REGISTRY_RECORD_LISTENING")] = 19),
                (t[(i[20] = "STATE_REGISTRY_EVENT_LISTENING")] = 20),
                (t[(i[21] = "STATE_REGISTRY_STATE_REGISTRY")] = 21),
                t
            );
        })();
        C.STATE_ACTION = (function () {
            var i = {},
                t = Object.create(i);
            return (
                (t[(i[0] = "STATE_UNKNOWN")] = 0),
                (t[(i[1] = "STATE_ERROR")] = 1),
                (t[(i[2] = "STATE_ADD")] = 2),
                (t[(i[3] = "STATE_REMOVE")] = 3),
                (t[(i[4] = "STATE_REQUEST_FULL_STATE")] = 4),
                (t[(i[5] = "STATE_FULL_STATE")] = 5),
                (t[(i[6] = "STATE_CHECKSUM")] = 6),
                t
            );
        })();
        C.StateMessage = (function () {
            function i(t) {
                if (((this.fullState = []), t))
                    for (var e = Object.keys(t), r = 0; r < e.length; ++r) t[e[r]] != null && (this[e[r]] = t[e[r]]);
            }
            return (
                (i.prototype.action = 0),
                (i.prototype.data = ""),
                (i.prototype.isError = !1),
                (i.prototype.checksum = 0),
                (i.prototype.fullState = Gt.emptyArray),
                (i.prototype.serverName = ""),
                (i.prototype.registryTOPIC = 0),
                (i.encode = function (e, r) {
                    if (
                        (r || (r = ft.create()),
                        e.action != null && Object.hasOwnProperty.call(e, "action") && r.uint32(8).int32(e.action),
                        e.data != null && Object.hasOwnProperty.call(e, "data") && r.uint32(18).string(e.data),
                        e.isError != null && Object.hasOwnProperty.call(e, "isError") && r.uint32(24).bool(e.isError),
                        e.checksum != null &&
                            Object.hasOwnProperty.call(e, "checksum") &&
                            r.uint32(152).int32(e.checksum),
                        e.fullState != null && e.fullState.length)
                    )
                        for (var n = 0; n < e.fullState.length; ++n) r.uint32(162).string(e.fullState[n]);
                    return (
                        e.serverName != null &&
                            Object.hasOwnProperty.call(e, "serverName") &&
                            r.uint32(170).string(e.serverName),
                        e.registryTOPIC != null &&
                            Object.hasOwnProperty.call(e, "registryTOPIC") &&
                            r.uint32(176).int32(e.registryTOPIC),
                        r
                    );
                }),
                (i.encodeDelimited = function (e, r) {
                    return this.encode(e, r).ldelim();
                }),
                (i.decode = function (e, r) {
                    e instanceof I || (e = I.create(e));
                    for (var n = r === void 0 ? e.len : e.pos + r, o = new C.StateMessage(); e.pos < n; ) {
                        var s = e.uint32();
                        switch (s >>> 3) {
                            case 1:
                                o.action = e.int32();
                                break;
                            case 2:
                                o.data = e.string();
                                break;
                            case 3:
                                o.isError = e.bool();
                                break;
                            case 19:
                                o.checksum = e.int32();
                                break;
                            case 20:
                                (o.fullState && o.fullState.length) || (o.fullState = []), o.fullState.push(e.string());
                                break;
                            case 21:
                                o.serverName = e.string();
                                break;
                            case 22:
                                o.registryTOPIC = e.int32();
                                break;
                            default:
                                e.skipType(s & 7);
                                break;
                        }
                    }
                    return o;
                }),
                (i.decodeDelimited = function (e) {
                    return e instanceof I || (e = new I(e)), this.decode(e, e.uint32());
                }),
                i
            );
        })();
        Ts.exports = C;
    });
    var Kr = R((Jr) => {
        "use strict";
        u();
        Object.defineProperty(Jr, "__esModule", { value: !0 });
        var H = Vi();
        Jr.TopicMessage = {
            [H.TOPIC.RECORD]: H.RecordMessage,
            [H.TOPIC.CLUSTER]: H.ClusterMessage,
            [H.TOPIC.CONNECTION]: H.ConnectionMessage,
            [H.TOPIC.AUTH]: H.AuthMessage,
            [H.TOPIC.EVENT]: H.EventMessage,
            [H.TOPIC.LOCK]: H.LockMessage,
            [H.TOPIC.MONITORING]: H.MonitoringMessage,
            [H.TOPIC.PARSER]: H.ParserMessage,
            [H.TOPIC.PRESENCE]: H.PresenceMessage,
            [H.TOPIC.RPC]: H.RpcMessage,
        };
    });
    var $r = R((Fi) => {
        "use strict";
        u();
        Object.defineProperty(Fi, "__esModule", { value: !0 });
        var pu = Kr(),
            Eu = Vi(),
            Is = ve();
        function yu(i) {
            try {
                let t = Eu.Message.decodeDelimited(i),
                    e = pu.TopicMessage[t.topic].decode(t.message, t.message.length);
                return [Object.assign({ topic: t.topic }, e)];
            } catch (t) {
                return [{ topic: Is.TOPIC.PARSER, action: Is.PARSER_ACTION.ERROR }];
            }
        }
        Fi.parse = yu;
        function Ru(i) {
            return (
                i.requestorData && (i.requestorData = JSON.parse(i.requestorData)),
                i.parsedData !== void 0 || i.data === void 0
                    ? !0
                    : ((i.parsedData = JSON.parse(i.data)),
                      i.parsedData === void 0 ? new Error(`unable to parse data ${i.data}`) : !0)
            );
        }
        Fi.parseData = Ru;
    });
    var Qr = R((Hi) => {
        "use strict";
        u();
        Object.defineProperty(Hi, "__esModule", { value: !0 });
        Hi.StateMachine = void 0;
        var Su = (function () {
            function i(t, e) {
                (this.stateMachine = e),
                    (this.inEndState = !1),
                    (this.transitions = e.transitions),
                    (this.state = e.init),
                    (this.context = e.context),
                    (this.history = [{ oldState: "-", newState: this.state, transitionName: "-" }]);
            }
            return (
                (i.prototype.transition = function (t) {
                    for (var e, r = 0; r < this.transitions.length; r++)
                        if (((e = this.transitions[r]), t === e.name && (this.state === e.from || e.from === void 0))) {
                            this.history.push({ oldState: this.state, transitionName: t, newState: e.to });
                            var n = this.state;
                            (this.state = e.to),
                                this.stateMachine.onStateChanged &&
                                    this.stateMachine.onStateChanged.call(this.context, this.state, n),
                                e.handler && e.handler.call(this.context);
                            return;
                        }
                    var o = JSON.stringify({ transition: t, fromState: this.state }),
                        s = this.history.reverse().reduce(function (c, a) {
                            return (c +=
                                `
	From ` +
                                a.oldState +
                                " to " +
                                a.newState +
                                " via " +
                                a.transitionName);
                        }, "");
                    console.trace(
                        `Invalid state transition.
Details: ` +
                            o +
                            ` 
History: ` +
                            s
                    );
                }),
                i
            );
        })();
        Hi.StateMachine = Su;
    });
    var Bt = R((J) => {
        "use strict";
        u();
        Object.defineProperty(J, "__esModule", { value: !0 });
        J.PromiseDelay =
            J.normalizeArguments =
            J.normalizeSetArguments =
            J.getUid =
            J.parseUrl =
            J.shallowCopy =
            J.deepCopy =
            J.deepEquals =
                void 0;
        var _u = function (i, t) {
            return i === t
                ? !0
                : typeof i != "object" || typeof t != "object"
                ? !1
                : JSON.stringify(i) === JSON.stringify(t);
        };
        J.deepEquals = _u;
        var Ou = function (i) {
            return typeof i == "object" ? JSON.parse(JSON.stringify(i)) : i;
        };
        J.deepCopy = Ou;
        var Nu = function (i) {
            if (Array.isArray(i)) return i.slice(0);
            if (typeof i == "object") {
                for (var t = Object.create(null), e = Object.keys(i), r = 0; r < e.length; r++) t[e[r]] = i[e[r]];
                return t;
            }
            return i;
        };
        J.shallowCopy = Nu;
        var Tu = /^wss:|^ws:|^\/\//,
            Iu = /^http:|^https:/,
            vu = function (i, t) {
                var e = i;
                if (Iu.test(e)) throw new Error("Only ws and wss are supported");
                Tu.test(e) ? e.indexOf("//") === 0 && (e = "ws:" + e) : (e = "ws://" + e);
                var r = e.split("//")[0],
                    n = e.split("//")[1];
                if (!n) throw new Error("Invalid URL: ws://");
                var o = null;
                return (
                    n.indexOf("/") > -1
                        ? ((o = n.split("/")), (n = o.shift() || ""), (o = "/" + o.join("")))
                        : n.indexOf("?") > -1 &&
                          ((o = n.split("?")), (n = o.shift() || ""), (o = t + "?" + o.join(""))),
                    (!o || o === "/") && (o = t),
                    r + "//" + n + o
                );
            };
        J.parseUrl = vu;
        var bu = function () {
            var i = new Date().getTime().toString(36),
                t = (Math.random() * 1e16).toString(36).replace(".", "");
            return i + "-" + t;
        };
        J.getUid = bu;
        var Cu = function (i, t) {
            t === void 0 && (t = 0);
            var e,
                r = function (c) {
                    return c !== void 0 && typeof c == "object";
                },
                n = function (c) {
                    return typeof c != "function";
                },
                o = function (c) {
                    return c !== void 0 && typeof c == "string";
                },
                s = function (c) {
                    return typeof c == "function";
                };
            if (
                (i.length === t + 1 && (e = { path: void 0, data: r(i[t]) ? i[t] : void 0, callback: void 0 }),
                i.length === t + 2 &&
                    ((e = { path: void 0, data: void 0, callback: void 0 }),
                    !s(i[t]) && n(i[t]) && (e.path = o(i[t]) ? i[t] : void 0),
                    o(i[t]) ? (e.data = n(i[t + 1]) ? i[t + 1] : void 0) : (e.data = r(i[t]) ? i[t] : void 0),
                    o(i[t]) || (e.callback = s(i[t + 1]) ? i[t + 1] : !1)),
                i.length === t + 3 &&
                    (e = {
                        path: o(i[t]) ? i[t] : void 0,
                        data: n(i[t + 1]) ? i[t + 1] : void 0,
                        callback: s(i[t + 2]) ? i[t + 2] : void 0,
                    }),
                e)
            ) {
                if ((e.path !== void 0 && e.path.length === 0) || (e.path === void 0 && !e.data))
                    throw Error("Invalid set path argument");
                if (e.data === void 0 && e.path === void 0) throw Error("Invalid set data argument");
                if ((e.callback !== void 0 && e.callback === !1) || (e.callback === void 0 && i.length === t + 3))
                    throw Error("Invalid set callback argument");
                return e;
            }
            throw Error("Invalid set arguments");
        };
        J.normalizeSetArguments = Cu;
        var mu = function (i) {
            if (i.length === 1 && typeof i[0] == "object") return i[0];
            for (var t = Object.create(null), e = 0; e < i.length; e++)
                typeof i[e] == "string"
                    ? (t.path = i[e])
                    : typeof i[e] == "function"
                    ? (t.callback = i[e])
                    : typeof i[e] == "boolean" && (t.triggerNow = i[e]);
            return t;
        };
        J.normalizeArguments = mu;
        var gu = function (i) {
            return new Promise(function (t) {
                return setTimeout(t, i);
            });
        };
        J.PromiseDelay = gu;
    });
    var vs = R((pf, Au) => {
        Au.exports = {
            name: "@deepstream/client",
            version: "5.2.7",
            description: "the javascript client for deepstream.io",
            keywords: ["deepstream", "javascript", "realtime", "client"],
            mocha: { recursive: !0, reporter: "dot", require: "ts-node/register/transpile-only", exit: !0 },
            main: "dist/src/deepstream.js",
            types: "dist/src/deepstream-client.d.ts",
            directories: { test: "src/test" },
            scripts: {
                tsc: "rm -rf dist && tsc",
                build: "npm run tsc && npm run build:dev && npm run build:prod",
                "build:dev": "webpack --config webpack.dev.js",
                "build:prod": "webpack --config webpack.prod.js",
                rebuild: "rimraf dist && webpack",
                clean: "rimraf dist",
                lint: "tslint src/*.ts src/**/*.ts -t verbose",
                "lint:fix": "npm run lint -- --fix",
                test: "mocha src/**/*.spec.ts",
                "test:coverage": "nyc npm test",
                "bundle:analyse":
                    "webpack --config webpack.prod.js --profile --json > ./dist/stats.json && webpack-bundle-analyzer ./dist/stats.json",
                postinstall: "node scripts/postinstall.js",
            },
            repository: { type: "git", url: "https://github.com/deepstreamIO/deepstream.io-client-js.git" },
            dependencies: { "@deepstream/protobuf": "^1.0.4", protobufjs: "^6.10.2", ws: "^7.4.0" },
            browser: { net: !1, ws: !1 },
            devDependencies: {
                "@istanbuljs/nyc-config-typescript": "^1.0.1",
                "@types/chai": "^4.2.14",
                "@types/mocha": "^8.0.4",
                "@types/node": "^14.14.9",
                "@types/sinon": "^9.0.9",
                "@types/ws": "^7.4.0",
                chai: "^4.2.0",
                coveralls: "^3.1.0",
                husky: "^4.3.0",
                mocha: "^8.2.1",
                "mocha-lcov-reporter": "^1.3.0",
                nyc: "^15.1.0",
                rimraf: "^3.0.2",
                sinon: "^9.2.1",
                "terser-webpack-plugin": "^4.2.3",
                "ts-essentials": "^7.0.1",
                "ts-loader": "^8.0.11",
                "ts-node": "^9.1.1",
                tslint: "^6.1.3",
                typescript: "^4.1.2",
                "uglifyjs-webpack-plugin": "^2.2.0",
                webpack: "^4.44.2",
                "webpack-bundle-analyzer": "^3.9.0",
                "webpack-cli": "^3.3.12",
            },
            author: "deepstreamHub GmbH",
            license: "MIT",
            bugs: { url: "https://github.com/deepstreamIO/deepstream.io-client-js/issues" },
            homepage: "http://deepstream.io",
            eslintConfig: { extends: "deepstream" },
            husky: {
                hooks: {
                    "pre-commit": "npm t && npm run lint && npm run build",
                    "pre-publish": "npm t && npm run build",
                },
            },
            nyc: {
                extends: "@istanbuljs/nyc-config-typescript",
                include: ["src/**/*.ts"],
                exclude: ["src/**/*.spec.ts"],
                extension: [".ts"],
                require: ["ts-node/register"],
                reporter: ["lcov"],
            },
        };
    });
    var Cs = R((Gi) => {
        "use strict";
        u();
        Object.defineProperty(Gi, "__esModule", { value: !0 });
        Gi.Connection = void 0;
        var d = F(),
            Du = $r(),
            wu = Qr(),
            bs = Bt(),
            Pu = gt(),
            Uu = vs(),
            Lu = (function () {
                function i(t, e, r, n) {
                    var o = this;
                    (this.services = t),
                        (this.options = e),
                        (this.reconnectTimeout = null),
                        (this.authParams = null),
                        (this.handlers = new Map()),
                        (this.authCallback = null),
                        (this.resumeCallback = null),
                        (this.emitter = n),
                        (this.internalEmitter = new Pu.Emitter()),
                        (this.isInLimbo = !0),
                        (this.clientData = null),
                        (this.heartbeatIntervalTimeout = null),
                        (this.endpoint = null),
                        (this.reconnectionAttempt = 0),
                        (this.limboTimeout = null);
                    var s = !1,
                        c = !0;
                    (this.stateMachine = new wu.StateMachine(this.services.logger, {
                        init: d.CONNECTION_STATE.CLOSED,
                        onStateChanged: function (a, l) {
                            a !== l &&
                                (n.emit(d.EVENT.CONNECTION_STATE_CHANGED, a),
                                a === d.CONNECTION_STATE.RECONNECTING
                                    ? ((o.isInLimbo = !0),
                                      (s = !0),
                                      l !== d.CONNECTION_STATE.CLOSED &&
                                          (o.internalEmitter.emit(d.EVENT.CONNECTION_LOST),
                                          (o.limboTimeout = o.services.timerRegistry.add({
                                              duration: o.options.offlineBufferTimeout,
                                              context: o,
                                              callback: function () {
                                                  (o.isInLimbo = !1), o.internalEmitter.emit(d.EVENT.EXIT_LIMBO);
                                              },
                                          }))))
                                    : a === d.CONNECTION_STATE.OPEN &&
                                      (s || c) &&
                                      ((c = !1),
                                      (o.isInLimbo = !1),
                                      o.internalEmitter.emit(d.EVENT.CONNECTION_REESTABLISHED),
                                      o.services.timerRegistry.remove(o.limboTimeout)));
                        },
                        transitions: [
                            {
                                name: "initialised",
                                from: d.CONNECTION_STATE.CLOSED,
                                to: d.CONNECTION_STATE.INITIALISING,
                            },
                            {
                                name: "connected",
                                from: d.CONNECTION_STATE.INITIALISING,
                                to: d.CONNECTION_STATE.AWAITING_CONNECTION,
                            },
                            {
                                name: "connected",
                                from: d.CONNECTION_STATE.REDIRECTING,
                                to: d.CONNECTION_STATE.AWAITING_CONNECTION,
                            },
                            {
                                name: "connected",
                                from: d.CONNECTION_STATE.RECONNECTING,
                                to: d.CONNECTION_STATE.AWAITING_CONNECTION,
                            },
                            {
                                name: "challenge",
                                from: d.CONNECTION_STATE.AWAITING_CONNECTION,
                                to: d.CONNECTION_STATE.CHALLENGING,
                            },
                            {
                                name: "redirected",
                                from: d.CONNECTION_STATE.CHALLENGING,
                                to: d.CONNECTION_STATE.REDIRECTING,
                            },
                            {
                                name: "challenge-denied",
                                from: d.CONNECTION_STATE.CHALLENGING,
                                to: d.CONNECTION_STATE.CHALLENGE_DENIED,
                            },
                            {
                                name: "accepted",
                                from: d.CONNECTION_STATE.CHALLENGING,
                                to: d.CONNECTION_STATE.AWAITING_AUTHENTICATION,
                                handler: this.onAwaitingAuthentication.bind(this),
                            },
                            {
                                name: "authentication-timeout",
                                from: d.CONNECTION_STATE.AWAITING_CONNECTION,
                                to: d.CONNECTION_STATE.AUTHENTICATION_TIMEOUT,
                            },
                            {
                                name: "authentication-timeout",
                                from: d.CONNECTION_STATE.AWAITING_AUTHENTICATION,
                                to: d.CONNECTION_STATE.AUTHENTICATION_TIMEOUT,
                            },
                            {
                                name: "authenticate",
                                from: d.CONNECTION_STATE.AWAITING_AUTHENTICATION,
                                to: d.CONNECTION_STATE.AUTHENTICATING,
                            },
                            {
                                name: "unsuccesful-login",
                                from: d.CONNECTION_STATE.AUTHENTICATING,
                                to: d.CONNECTION_STATE.AWAITING_AUTHENTICATION,
                            },
                            {
                                name: "succesful-login",
                                from: d.CONNECTION_STATE.AUTHENTICATING,
                                to: d.CONNECTION_STATE.OPEN,
                            },
                            {
                                name: "too-many-auth-attempts",
                                from: d.CONNECTION_STATE.AUTHENTICATING,
                                to: d.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS,
                            },
                            {
                                name: "too-many-auth-attempts",
                                from: d.CONNECTION_STATE.AWAITING_AUTHENTICATION,
                                to: d.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS,
                            },
                            {
                                name: "authentication-timeout",
                                from: d.CONNECTION_STATE.AWAITING_AUTHENTICATION,
                                to: d.CONNECTION_STATE.AUTHENTICATION_TIMEOUT,
                            },
                            {
                                name: "reconnect",
                                from: d.CONNECTION_STATE.RECONNECTING,
                                to: d.CONNECTION_STATE.RECONNECTING,
                            },
                            { name: "closed", from: d.CONNECTION_STATE.CLOSING, to: d.CONNECTION_STATE.CLOSED },
                            { name: "offline", from: d.CONNECTION_STATE.PAUSING, to: d.CONNECTION_STATE.OFFLINE },
                            { name: "error", to: d.CONNECTION_STATE.RECONNECTING },
                            { name: "connection-lost", to: d.CONNECTION_STATE.RECONNECTING },
                            { name: "resume", to: d.CONNECTION_STATE.RECONNECTING },
                            { name: "pause", to: d.CONNECTION_STATE.PAUSING },
                            { name: "close", to: d.CONNECTION_STATE.CLOSING },
                        ],
                    })),
                        this.stateMachine.transition("initialised"),
                        (this.originalUrl = bs.parseUrl(r, this.options.path)),
                        (this.url = this.originalUrl),
                        e.lazyConnect || this.createEndpoint();
                }
                return (
                    Object.defineProperty(i.prototype, "isConnected", {
                        get: function () {
                            return this.stateMachine.state === d.CONNECTION_STATE.OPEN;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (i.prototype.onLost = function (t) {
                        this.internalEmitter.on(d.EVENT.CONNECTION_LOST, t);
                    }),
                    (i.prototype.removeOnLost = function (t) {
                        this.internalEmitter.off(d.EVENT.CONNECTION_LOST, t);
                    }),
                    (i.prototype.onReestablished = function (t) {
                        this.internalEmitter.on(d.EVENT.CONNECTION_REESTABLISHED, t);
                    }),
                    (i.prototype.removeOnReestablished = function (t) {
                        this.internalEmitter.off(d.EVENT.CONNECTION_REESTABLISHED, t);
                    }),
                    (i.prototype.onExitLimbo = function (t) {
                        this.internalEmitter.on(d.EVENT.EXIT_LIMBO, t);
                    }),
                    (i.prototype.registerHandler = function (t, e) {
                        this.handlers.set(t, e);
                    }),
                    (i.prototype.sendMessage = function (t) {
                        if (!this.isOpen()) {
                            this.services.logger.error(t, d.EVENT.IS_CLOSED);
                            return;
                        }
                        this.endpoint && this.endpoint.sendParsedMessage(t);
                    }),
                    (i.prototype.authenticate = function (t, e) {
                        if (t && typeof t != "object" && typeof t != "function")
                            throw new Error("invalid argument authParamsOrCallback");
                        if (e && typeof e != "function") throw new Error("invalid argument callback");
                        if (
                            this.stateMachine.state === d.CONNECTION_STATE.CHALLENGE_DENIED ||
                            this.stateMachine.state === d.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS ||
                            this.stateMachine.state === d.CONNECTION_STATE.AUTHENTICATION_TIMEOUT
                        ) {
                            this.services.logger.error({ topic: d.TOPIC.CONNECTION }, d.EVENT.IS_CLOSED);
                            return;
                        }
                        t && (this.authParams = typeof t == "object" ? t : {}),
                            t && typeof t == "function"
                                ? (this.authCallback = t)
                                : e
                                ? (this.authCallback = e)
                                : (this.authCallback = function () {}),
                            this.stateMachine.state === d.CONNECTION_STATE.AWAITING_AUTHENTICATION &&
                                this.authParams &&
                                this.sendAuthParams(),
                            this.endpoint || this.createEndpoint();
                    }),
                    (i.prototype.getConnectionState = function () {
                        return this.stateMachine.state;
                    }),
                    (i.prototype.isOpen = function () {
                        var t = this.getConnectionState();
                        return (
                            t !== d.CONNECTION_STATE.CLOSED &&
                            t !== d.CONNECTION_STATE.ERROR &&
                            t !== d.CONNECTION_STATE.CLOSING
                        );
                    }),
                    (i.prototype.close = function () {
                        this.services.timerRegistry.remove(this.heartbeatIntervalTimeout),
                            this.sendMessage({ topic: d.TOPIC.CONNECTION, action: d.CONNECTION_ACTION.CLOSING }),
                            this.stateMachine.transition("close");
                    }),
                    (i.prototype.pause = function () {
                        this.stateMachine.transition("pause"),
                            this.services.timerRegistry.remove(this.heartbeatIntervalTimeout),
                            this.endpoint && this.endpoint.close();
                    }),
                    (i.prototype.resume = function (t) {
                        this.stateMachine.transition("resume"), (this.resumeCallback = t), this.tryReconnect();
                    }),
                    (i.prototype.createEndpoint = function () {
                        (this.endpoint = this.services.socketFactory(
                            this.url,
                            this.options.socketOptions,
                            this.options.heartbeatInterval
                        )),
                            (this.endpoint.onopened = this.onOpen.bind(this)),
                            (this.endpoint.onerror = this.onError.bind(this)),
                            (this.endpoint.onclosed = this.onClose.bind(this)),
                            (this.endpoint.onparsedmessages = this.onMessages.bind(this));
                    }),
                    (i.prototype.onOpen = function () {
                        this.clearReconnect(),
                            this.checkHeartBeat(),
                            this.stateMachine.transition("connected"),
                            this.sendMessage({
                                topic: d.TOPIC.CONNECTION,
                                action: d.CONNECTION_ACTION.CHALLENGE,
                                url: this.originalUrl,
                                protocolVersion: "0.1a",
                                sdkVersion: Uu.version,
                                sdkType: "javascript",
                            }),
                            this.stateMachine.transition("challenge");
                    }),
                    (i.prototype.onError = function (t) {
                        var e = this;
                        setTimeout(function () {
                            var r;
                            t.code === "ECONNRESET" || t.code === "ECONNREFUSED"
                                ? (r = "Can't connect! Deepstream server unreachable on " + e.originalUrl)
                                : (r = t),
                                e.services.logger.error({ topic: d.TOPIC.CONNECTION }, d.EVENT.CONNECTION_ERROR, r);
                        }, 1),
                            this.services.timerRegistry.remove(this.heartbeatIntervalTimeout),
                            this.stateMachine.transition("error"),
                            this.tryReconnect();
                    }),
                    (i.prototype.onClose = function () {
                        if (
                            (this.services.timerRegistry.remove(this.heartbeatIntervalTimeout),
                            this.stateMachine.state === d.CONNECTION_STATE.REDIRECTING)
                        ) {
                            this.createEndpoint();
                            return;
                        }
                        if (
                            !(
                                this.stateMachine.state === d.CONNECTION_STATE.CHALLENGE_DENIED ||
                                this.stateMachine.state === d.CONNECTION_STATE.TOO_MANY_AUTH_ATTEMPTS ||
                                this.stateMachine.state === d.CONNECTION_STATE.AUTHENTICATION_TIMEOUT
                            )
                        ) {
                            if (this.stateMachine.state === d.CONNECTION_STATE.CLOSING) {
                                this.stateMachine.transition("closed");
                                return;
                            }
                            if (this.stateMachine.state === d.CONNECTION_STATE.PAUSING) {
                                this.stateMachine.transition("offline");
                                return;
                            }
                            this.stateMachine.transition("connection-lost"), this.tryReconnect();
                        }
                    }),
                    (i.prototype.onMessages = function (t) {
                        var e = this;
                        t.forEach(function (r) {
                            if (r.parseError) {
                                e.services.logger.error({ topic: d.TOPIC.PARSER }, r.action, r.raw && r.raw.toString());
                                return;
                            }
                            var n = r,
                                o = Du.parseData(n);
                            if (
                                (o !== !0 &&
                                    e.services.logger.error(
                                        { topic: d.TOPIC.PARSER },
                                        d.PARSER_ACTION.INVALID_MESSAGE,
                                        o
                                    ),
                                n !== null)
                            ) {
                                if (n.topic === d.TOPIC.CONNECTION) {
                                    e.handleConnectionResponse(n);
                                    return;
                                }
                                if (n.topic === d.TOPIC.AUTH) {
                                    e.handleAuthResponse(n);
                                    return;
                                }
                                var s = e.handlers.get(n.topic);
                                !s || s(n);
                            }
                        });
                    }),
                    (i.prototype.sendAuthParams = function () {
                        this.stateMachine.transition("authenticate"),
                            this.sendMessage({
                                topic: d.TOPIC.AUTH,
                                action: d.AUTH_ACTION.REQUEST,
                                parsedData: this.authParams,
                            });
                    }),
                    (i.prototype.checkHeartBeat = function () {
                        var t = this.options.heartbeatInterval * 2;
                        if (!!this.endpoint) {
                            if (this.endpoint.getTimeSinceLastMessage() > t) {
                                this.services.timerRegistry.remove(this.heartbeatIntervalTimeout),
                                    this.services.logger.error(
                                        { topic: d.TOPIC.CONNECTION },
                                        d.EVENT.HEARTBEAT_TIMEOUT
                                    ),
                                    this.endpoint.close();
                                return;
                            }
                            this.heartbeatIntervalTimeout = this.services.timerRegistry.add({
                                duration: this.options.heartbeatInterval,
                                callback: this.checkHeartBeat,
                                context: this,
                            });
                        }
                    }),
                    (i.prototype.tryReconnect = function () {
                        if (this.reconnectTimeout === null) {
                            if (this.reconnectionAttempt < this.options.maxReconnectAttempts) {
                                this.stateMachine.transition("reconnect"),
                                    (this.reconnectTimeout = this.services.timerRegistry.add({
                                        callback: this.tryOpen,
                                        context: this,
                                        duration: Math.min(
                                            this.options.maxReconnectInterval,
                                            this.options.reconnectIntervalIncrement * this.reconnectionAttempt
                                        ),
                                    })),
                                    this.reconnectionAttempt++;
                                return;
                            }
                            this.emitter.emit(
                                d.EVENT[d.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED],
                                this.reconnectionAttempt
                            ),
                                this.clearReconnect(),
                                this.close();
                        }
                    }),
                    (i.prototype.tryOpen = function () {
                        this.stateMachine.state !== d.CONNECTION_STATE.REDIRECTING && (this.url = this.originalUrl),
                            this.createEndpoint(),
                            (this.reconnectTimeout = null);
                    }),
                    (i.prototype.clearReconnect = function () {
                        this.services.timerRegistry.remove(this.reconnectTimeout),
                            (this.reconnectTimeout = null),
                            (this.reconnectionAttempt = 0);
                    }),
                    (i.prototype.handleConnectionResponse = function (t) {
                        if (t.action === d.CONNECTION_ACTION.ACCEPT) {
                            this.stateMachine.transition("accepted");
                            return;
                        }
                        if (t.action === d.CONNECTION_ACTION.REJECT) {
                            this.stateMachine.transition("challenge-denied"), this.endpoint && this.endpoint.close();
                            return;
                        }
                        if (t.action === d.CONNECTION_ACTION.REDIRECT) {
                            (this.url = t.url),
                                this.stateMachine.transition("redirected"),
                                this.endpoint && this.endpoint.close();
                            return;
                        }
                        t.action === d.CONNECTION_ACTION.AUTHENTICATION_TIMEOUT &&
                            (this.stateMachine.transition("authentication-timeout"), this.services.logger.error(t));
                    }),
                    (i.prototype.handleAuthResponse = function (t) {
                        if (t.action === d.AUTH_ACTION.TOO_MANY_AUTH_ATTEMPTS) {
                            this.stateMachine.transition("too-many-auth-attempts"), this.services.logger.error(t);
                            return;
                        }
                        if (t.action === d.AUTH_ACTION.AUTH_UNSUCCESSFUL) {
                            this.stateMachine.transition("unsuccesful-login"), this.onAuthUnSuccessful();
                            return;
                        }
                        if (t.action === d.AUTH_ACTION.AUTH_SUCCESSFUL) {
                            this.stateMachine.transition("succesful-login"), this.onAuthSuccessful(t.parsedData);
                            return;
                        }
                    }),
                    (i.prototype.onAwaitingAuthentication = function () {
                        this.authParams && this.sendAuthParams();
                    }),
                    (i.prototype.onAuthSuccessful = function (t) {
                        this.updateClientData(t),
                            this.resumeCallback && (this.resumeCallback(), (this.resumeCallback = null)),
                            this.authCallback !== null &&
                                (this.authCallback(!0, this.clientData), (this.authCallback = null));
                    }),
                    (i.prototype.onAuthUnSuccessful = function () {
                        var t = { reason: d.EVENT[d.EVENT.INVALID_AUTHENTICATION_DETAILS] };
                        if (
                            (this.resumeCallback && (this.resumeCallback(t), (this.resumeCallback = null)),
                            this.authCallback === null)
                        ) {
                            this.emitter.emit(d.EVENT.REAUTHENTICATION_FAILURE, t);
                            return;
                        }
                        this.authCallback(!1, t), (this.authCallback = null);
                    }),
                    (i.prototype.updateClientData = function (t) {
                        var e = t || null;
                        (this.clientData === null && (e === null || Object.keys(e).length === 0)) ||
                            bs.deepEquals(this.clientData, t) ||
                            (this.emitter.emit(d.EVENT.CLIENT_DATA_CHANGED, Object.assign({}, e)),
                            (this.clientData = e));
                    }),
                    i
                );
            })();
        Gi.Connection = Lu;
    });
    var ms = R((zr) => {
        "use strict";
        u();
        Object.defineProperty(zr, "__esModule", { value: !0 });
        var Mu = Kr(),
            Bu = Vi();
        function ku(i, t) {
            t && !i.isAck && (i = Object.assign(Object.assign({}, i), { isAck: !0 })),
                i.data === void 0 && i.parsedData !== void 0 && (i.data = JSON.stringify(i.parsedData)),
                i.requestorData && (i.requestorData = JSON.stringify(i.requestorData));
            let e = Mu.TopicMessage[i.topic].encode(i).finish();
            return Bu.Message.encodeDelimited({ topic: i.topic, message: e }).finish();
        }
        zr.getMessage = ku;
    });
    var gs = R(() => {
        u();
    });
    var As = R((ge) => {
        "use strict";
        u();
        var Wi =
            (ge && ge.__assign) ||
            function () {
                return (
                    (Wi =
                        Object.assign ||
                        function (i) {
                            for (var t, e = 1, r = arguments.length; e < r; e++) {
                                t = arguments[e];
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
                            }
                            return i;
                        }),
                    Wi.apply(this, arguments)
                );
            };
        Object.defineProperty(ge, "__esModule", { value: !0 });
        ge.socketFactory = void 0;
        var xu = $r(),
            ju = ms(),
            me = F(),
            qi = window.WebSocket || window.MozWebSocket,
            Vu = function (i, t, e) {
                t === void 0 && (t = { jsonTransportMode: !1 });
                var r = qi ? new qi(i, [], t) : new (gs())(i, t);
                qi && t.jsonTransportMode !== !0 && (r.binaryType = "arraybuffer");
                var n =
                        t.jsonTransportMode !== !0
                            ? ju.getMessage
                            : function (a, l) {
                                  return JSON.stringify(Wi(Wi({}, a), { isAck: l }));
                              },
                    o = n({ topic: me.TOPIC.CONNECTION, action: me.CONNECTION_ACTION.PING }, !1),
                    s = null,
                    c = -1;
                return (
                    (r.onparsedmessage = function () {}),
                    (r.onmessage = function (a) {
                        c = Date.now();
                        var l;
                        t.jsonTransportMode !== !0
                            ? (l = xu.parse(qi ? new Buffer(new Uint8Array(a.data)) : a.data))
                            : (l = [JSON.parse(a.data)]),
                            r.onparsedmessages(l);
                    }),
                    (r.getTimeSinceLastMessage = function () {
                        return c < 0 ? 0 : Date.now() - c;
                    }),
                    (r.sendParsedMessage = function (a) {
                        if (a.topic === me.TOPIC.CONNECTION && a.action === me.CONNECTION_ACTION.CLOSING) {
                            r.onparsedmessages([{ topic: me.TOPIC.CONNECTION, action: me.CONNECTION_ACTION.CLOSED }]),
                                r.close();
                            return;
                        }
                        a.parsedData && (a.data = JSON.stringify(a.parsedData)),
                            a.data === void 0 && delete a.data,
                            r.send(n(a, !1));
                    }),
                    (r.onclosed = null),
                    (r.onclose = function () {
                        clearInterval(s), r.onclosed();
                    }),
                    (r.onopened = null),
                    (r.onopen = function () {
                        (s = setInterval(function () {
                            try {
                                r.send(o);
                            } catch (a) {
                                clearTimeout(s);
                            }
                        }, e)),
                            r.onopened();
                    }),
                    r
                );
            };
        ge.socketFactory = Vu;
    });
    var Xr = R((Yi) => {
        "use strict";
        u();
        Object.defineProperty(Yi, "__esModule", { value: !0 });
        Yi.Listener = void 0;
        var he = F(),
            Fu = (function () {
                function i(t, e) {
                    (this.topic = t),
                        (this.services = e),
                        (this.listeners = new Map()),
                        (this.stopCallbacks = new Map()),
                        t === he.TOPIC.RECORD
                            ? (this.actions = he.RECORD_ACTION)
                            : t === he.TOPIC.EVENT && (this.actions = he.EVENT_ACTION),
                        this.services.connection.onLost(this.onConnectionLost.bind(this)),
                        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
                }
                return (
                    (i.prototype.listen = function (t, e) {
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument pattern");
                        if (typeof e != "function") throw new Error("invalid argument callback");
                        if (this.listeners.has(t)) {
                            this.services.logger.warn(
                                { topic: this.topic, action: this.actions.LISTEN, name: t },
                                he.EVENT.LISTENER_EXISTS
                            );
                            return;
                        }
                        this.listeners.set(t, e), this.sendListen(t);
                    }),
                    (i.prototype.unlisten = function (t) {
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument pattern");
                        if (!this.listeners.has(t)) {
                            this.services.logger.warn(
                                { topic: this.topic, action: this.actions.UNLISTEN, name: t },
                                he.EVENT.NOT_LISTENING
                            );
                            return;
                        }
                        this.listeners.delete(t), this.sendUnlisten(t);
                    }),
                    (i.prototype.accept = function (t, e) {
                        this.services.connection.sendMessage({
                            topic: this.topic,
                            action: this.actions.LISTEN_ACCEPT,
                            name: t,
                            subscription: e,
                        });
                    }),
                    (i.prototype.reject = function (t, e) {
                        this.services.connection.sendMessage({
                            topic: this.topic,
                            action: this.actions.LISTEN_REJECT,
                            name: t,
                            subscription: e,
                        });
                    }),
                    (i.prototype.stop = function (t, e) {
                        this.stopCallbacks.set(t, e);
                    }),
                    (i.prototype.handle = function (t) {
                        if (t.isAck) {
                            this.services.timeoutRegistry.remove(t);
                            return;
                        }
                        if (t.action === this.actions.SUBSCRIPTION_FOR_PATTERN_FOUND) {
                            var e = this.listeners.get(t.name);
                            e &&
                                e(t.subscription, {
                                    accept: this.accept.bind(this, t.name, t.subscription),
                                    reject: this.reject.bind(this, t.name, t.subscription),
                                    onStop: this.stop.bind(this, t.subscription),
                                });
                            return;
                        }
                        if (t.action === this.actions.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
                            var r = this.stopCallbacks.get(t.subscription);
                            r && (r(t.subscription), this.stopCallbacks.delete(t.subscription));
                            return;
                        }
                        this.services.logger.error(t, he.EVENT.UNSOLICITED_MESSAGE);
                    }),
                    (i.prototype.onConnectionLost = function () {
                        this.stopCallbacks.forEach(function (t, e) {
                            t(e);
                        }),
                            this.stopCallbacks.clear();
                    }),
                    (i.prototype.onConnectionReestablished = function () {
                        var t = this;
                        this.listeners.forEach(function (e, r) {
                            t.sendListen(r);
                        });
                    }),
                    (i.prototype.sendListen = function (t) {
                        var e = { topic: this.topic, action: this.actions.LISTEN, name: t };
                        this.services.timeoutRegistry.add({ message: e }), this.services.connection.sendMessage(e);
                    }),
                    (i.prototype.sendUnlisten = function (t) {
                        var e = { topic: this.topic, action: this.actions.UNLISTEN, name: t };
                        this.services.timeoutRegistry.add({ message: e }), this.services.connection.sendMessage(e);
                    }),
                    i
                );
            })();
        Yi.Listener = Fu;
    });
    var Ze = R((qt) => {
        "use strict";
        u();
        var Hu =
                (qt && qt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                },
            Ds =
                (qt && qt.__spread) ||
                function () {
                    for (var i = [], t = 0; t < arguments.length; t++) i = i.concat(Hu(arguments[t]));
                    return i;
                };
        Object.defineProperty(qt, "__esModule", { value: !0 });
        qt.BulkSubscriptionService = void 0;
        var Gu = (function () {
            function i(t, e, r, n, o, s) {
                s === void 0 && (s = function () {}),
                    (this.services = t),
                    (this.subscriptionInterval = e),
                    (this.topic = r),
                    (this.subscribeBulkAction = n),
                    (this.unsubscribeBulkAction = o),
                    (this.onSubscriptionSent = s),
                    (this.subscribeNames = new Set()),
                    (this.unsubscribeNames = new Set()),
                    (this.timerRef = -1),
                    (this.correlationId = 0),
                    this.services.connection.onLost(this.onLost.bind(this));
            }
            return (
                (i.prototype.subscribe = function (t) {
                    if (this.subscriptionInterval > 0) {
                        this.unsubscribeNames.has(t)
                            ? this.unsubscribeNames.delete(t)
                            : (this.subscribeNames.add(t), this.registerFlush());
                        return;
                    }
                    var e = {
                        topic: this.topic,
                        action: this.subscribeBulkAction,
                        names: [t],
                        correlationId: (this.correlationId++).toString(),
                    };
                    this.services.connection.sendMessage(e), this.onSubscriptionSent(e);
                }),
                (i.prototype.subscribeList = function (t) {
                    t.forEach(this.subscribe.bind(this));
                }),
                (i.prototype.unsubscribe = function (t) {
                    if (this.subscriptionInterval > 0) {
                        this.subscribeNames.has(t)
                            ? this.subscribeNames.delete(t)
                            : (this.unsubscribeNames.add(t), this.registerFlush());
                        return;
                    }
                    var e = {
                        topic: this.topic,
                        action: this.unsubscribeBulkAction,
                        names: [t],
                        correlationId: (this.correlationId++).toString(),
                    };
                    this.services.connection.sendMessage(e), this.onSubscriptionSent(e);
                }),
                (i.prototype.unsubscribeList = function (t) {
                    t.forEach(this.unsubscribe.bind(this));
                }),
                (i.prototype.registerFlush = function () {
                    this.services.timerRegistry.has(this.timerRef) ||
                        (this.timerRef = this.services.timerRegistry.add({
                            callback: this.sendMessages,
                            context: this,
                            duration: this.subscriptionInterval,
                        }));
                }),
                (i.prototype.sendMessages = function () {
                    if (!this.services.connection.isConnected) {
                        this.onLost();
                        return;
                    }
                    if (this.subscribeNames.size > 0) {
                        var t = {
                            topic: this.topic,
                            action: this.subscribeBulkAction,
                            names: Ds(this.subscribeNames),
                            correlationId: (this.correlationId++).toString(),
                        };
                        this.services.connection.sendMessage(t),
                            this.onSubscriptionSent(t),
                            this.subscribeNames.clear();
                    }
                    if (this.unsubscribeNames.size > 0) {
                        var t = {
                            topic: this.topic,
                            action: this.unsubscribeBulkAction,
                            names: Ds(this.unsubscribeNames),
                            correlationId: (this.correlationId++).toString(),
                        };
                        this.services.connection.sendMessage(t),
                            this.onSubscriptionSent(t),
                            this.unsubscribeNames.clear();
                    }
                }),
                (i.prototype.onLost = function () {
                    (this.correlationId = 0),
                        this.services.timerRegistry.remove(this.timerRef),
                        this.subscribeNames.clear(),
                        this.unsubscribeNames.clear();
                }),
                i
            );
        })();
        qt.BulkSubscriptionService = Gu;
    });
    var ws = R((Ae) => {
        "use strict";
        u();
        var Ji =
            (Ae && Ae.__assign) ||
            function () {
                return (
                    (Ji =
                        Object.assign ||
                        function (i) {
                            for (var t, e = 1, r = arguments.length; e < r; e++) {
                                t = arguments[e];
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
                            }
                            return i;
                        }),
                    Ji.apply(this, arguments)
                );
            };
        Object.defineProperty(Ae, "__esModule", { value: !0 });
        Ae.EventHandler = void 0;
        var V = F(),
            qu = Xr(),
            Wu = gt(),
            Yu = Ze(),
            Ju = (function () {
                function i(t, e, r) {
                    (this.services = t),
                        (this.emitter = new Wu.Emitter()),
                        (this.limboQueue = []),
                        (this.bulkSubscription = new Yu.BulkSubscriptionService(
                            this.services,
                            e.subscriptionInterval,
                            V.TOPIC.EVENT,
                            V.EVENT_ACTION.SUBSCRIBE,
                            V.EVENT_ACTION.UNSUBSCRIBE,
                            this.onBulkSubscriptionSent.bind(this)
                        )),
                        (this.listeners = r || new qu.Listener(V.TOPIC.EVENT, t)),
                        this.services.connection.registerHandler(V.TOPIC.EVENT, this.handle.bind(this)),
                        this.services.connection.onExitLimbo(this.onExitLimbo.bind(this)),
                        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
                }
                return (
                    (i.prototype.eventNames = function () {
                        return this.emitter.eventNames();
                    }),
                    (i.prototype.subscribe = function (t, e) {
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument name");
                        if (typeof e != "function") throw new Error("invalid argument callback");
                        this.emitter.hasListeners(t) ||
                            (this.services.connection.isConnected && this.bulkSubscription.subscribe(t)),
                            this.emitter.on(t, e);
                    }),
                    (i.prototype.unsubscribe = function (t, e) {
                        if (!t || typeof t != "string" || t.length === 0) throw new Error("invalid argument name");
                        if (e !== void 0 && typeof e != "function") throw new Error("invalid argument callback");
                        if (!this.emitter.hasListeners(t)) {
                            this.services.logger.warn({
                                topic: V.TOPIC.EVENT,
                                action: V.EVENT_ACTION.NOT_SUBSCRIBED,
                                name: t,
                            });
                            return;
                        }
                        this.emitter.off(t, e), this.emitter.hasListeners(t) || this.bulkSubscription.unsubscribe(t);
                    }),
                    (i.prototype.emit = function (t, e) {
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument name");
                        var r = { topic: V.TOPIC.EVENT, action: V.EVENT_ACTION.EMIT, name: t, parsedData: e };
                        this.services.connection.isConnected
                            ? this.services.connection.sendMessage(r)
                            : this.services.connection.isInLimbo && this.limboQueue.push(r),
                            this.emitter.emit(t, e);
                    }),
                    (i.prototype.listen = function (t, e) {
                        this.listeners.listen(t, e);
                    }),
                    (i.prototype.unlisten = function (t) {
                        this.listeners.unlisten(t);
                    }),
                    (i.prototype.handle = function (t) {
                        if (t.isAck) {
                            this.services.timeoutRegistry.remove(t);
                            return;
                        }
                        if (t.action === V.EVENT_ACTION.EMIT) {
                            t.parsedData !== void 0
                                ? this.emitter.emit(t.name, t.parsedData)
                                : this.emitter.emit(t.name, void 0);
                            return;
                        }
                        if (t.action === V.EVENT_ACTION.MESSAGE_DENIED) {
                            this.services.logger.error({ topic: V.TOPIC.EVENT }, V.EVENT_ACTION.MESSAGE_DENIED),
                                this.services.timeoutRegistry.remove(t),
                                t.originalAction === V.EVENT_ACTION.SUBSCRIBE && this.emitter.off(t.name);
                            return;
                        }
                        if (
                            t.action === V.EVENT_ACTION.MULTIPLE_SUBSCRIPTIONS ||
                            t.action === V.EVENT_ACTION.NOT_SUBSCRIBED
                        ) {
                            this.services.timeoutRegistry.remove(Ji(Ji({}, t), { action: V.EVENT_ACTION.SUBSCRIBE })),
                                this.services.logger.warn(t);
                            return;
                        }
                        if (
                            t.action === V.EVENT_ACTION.SUBSCRIPTION_FOR_PATTERN_FOUND ||
                            t.action === V.EVENT_ACTION.SUBSCRIPTION_FOR_PATTERN_REMOVED
                        ) {
                            this.listeners.handle(t);
                            return;
                        }
                        if (t.action === V.EVENT_ACTION.INVALID_LISTEN_REGEX) {
                            this.services.logger.error(t);
                            return;
                        }
                        this.services.logger.error(t, V.EVENT.UNSOLICITED_MESSAGE);
                    }),
                    (i.prototype.onConnectionReestablished = function () {
                        this.bulkSubscription.subscribeList(this.emitter.eventNames());
                        for (var t = 0; t < this.limboQueue.length; t++)
                            this.services.connection.sendMessage(this.limboQueue[t]);
                        this.limboQueue = [];
                    }),
                    (i.prototype.onExitLimbo = function () {
                        this.limboQueue = [];
                    }),
                    (i.prototype.onBulkSubscriptionSent = function (t) {
                        this.services.timeoutRegistry.add({ message: t });
                    }),
                    i
                );
            })();
        Ae.EventHandler = Ju;
    });
    var Us = R((Ki) => {
        "use strict";
        u();
        Object.defineProperty(Ki, "__esModule", { value: !0 });
        Ki.RPC = void 0;
        var Ps = F(),
            Ku = (function () {
                function i(t, e, r, n, o, s) {
                    (this.response = n), (this.services = s);
                    var c = {
                        topic: Ps.TOPIC.RPC,
                        action: Ps.RPC_ACTION.REQUEST,
                        correlationId: e,
                        name: t,
                        parsedData: r,
                    };
                    this.services.connection.sendMessage(c);
                }
                return (
                    (i.prototype.accept = function () {}),
                    (i.prototype.respond = function (t) {
                        this.response(null, t);
                    }),
                    (i.prototype.error = function (t) {
                        this.response(t);
                    }),
                    i
                );
            })();
        Ki.RPC = Ku;
    });
    var Ls = R(($i) => {
        "use strict";
        u();
        Object.defineProperty($i, "__esModule", { value: !0 });
        $i.RPCResponse = void 0;
        var Wt = F(),
            $u = (function () {
                function i(t, e, r) {
                    (this.name = t.name),
                        (this.correlationId = t.correlationId),
                        (this.services = r),
                        (this.isAccepted = !1),
                        (this.isComplete = !1),
                        (this.autoAccept = !0),
                        this.services.timerRegistry.requestIdleCallback(this.performAutoAck.bind(this));
                }
                return (
                    (i.prototype.accept = function () {
                        this.isAccepted === !1 &&
                            (this.services.connection.sendMessage({
                                topic: Wt.TOPIC.RPC,
                                action: Wt.RPC_ACTION.ACCEPT,
                                name: this.name,
                                correlationId: this.correlationId,
                            }),
                            (this.isAccepted = !0));
                    }),
                    (i.prototype.reject = function () {
                        if (this.isComplete === !0) throw new Error("Rpc " + this.name + " already completed");
                        (this.autoAccept = !1),
                            (this.isComplete = !0),
                            (this.isAccepted = !0),
                            this.services.connection.sendMessage({
                                topic: Wt.TOPIC.RPC,
                                action: Wt.RPC_ACTION.REJECT,
                                name: this.name,
                                correlationId: this.correlationId,
                            });
                    }),
                    (i.prototype.error = function (t) {
                        if (this.isComplete === !0) throw new Error("Rpc " + this.name + " already completed");
                        (this.autoAccept = !1),
                            (this.isComplete = !0),
                            (this.isAccepted = !0),
                            this.services.connection.sendMessage({
                                topic: Wt.TOPIC.RPC,
                                action: Wt.RPC_ACTION.REQUEST_ERROR,
                                name: this.name,
                                correlationId: this.correlationId,
                                parsedData: t,
                            });
                    }),
                    (i.prototype.send = function (t) {
                        if (this.isComplete === !0) throw new Error("Rpc " + this.name + " already completed");
                        this.accept(),
                            this.services.connection.sendMessage({
                                topic: Wt.TOPIC.RPC,
                                action: Wt.RPC_ACTION.RESPONSE,
                                name: this.name,
                                correlationId: this.correlationId,
                                parsedData: t,
                            }),
                            (this.isComplete = !0);
                    }),
                    (i.prototype.performAutoAck = function () {
                        this.autoAccept === !0 && this.accept();
                    }),
                    i
                );
            })();
        $i.RPCResponse = $u;
    });
    var Bs = R((Yt) => {
        "use strict";
        u();
        var Qu =
                (Yt && Yt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                },
            Ms =
                (Yt && Yt.__spread) ||
                function () {
                    for (var i = [], t = 0; t < arguments.length; t++) i = i.concat(Qu(arguments[t]));
                    return i;
                };
        Object.defineProperty(Yt, "__esModule", { value: !0 });
        Yt.RPCHandler = void 0;
        var D = F(),
            Zr = Us(),
            zu = Ls(),
            Xu = Bt(),
            Zu = Ze(),
            tl = (function () {
                function i(t, e) {
                    (this.services = t),
                        (this.options = e),
                        (this.rpcs = new Map()),
                        (this.providers = new Map()),
                        (this.limboQueue = []),
                        (this.bulkSubscription = new Zu.BulkSubscriptionService(
                            this.services,
                            e.subscriptionInterval,
                            D.TOPIC.RPC,
                            D.RPC_ACTION.PROVIDE,
                            D.RPC_ACTION.UNPROVIDE,
                            this.onBulkSubscriptionSent.bind(this)
                        )),
                        this.services.connection.registerHandler(D.TOPIC.RPC, this.handle.bind(this)),
                        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this)),
                        this.services.connection.onExitLimbo(this.onExitLimbo.bind(this)),
                        this.services.connection.onLost(this.onConnectionLost.bind(this));
                }
                return (
                    (i.prototype.providerNames = function () {
                        return Ms(this.providers.keys());
                    }),
                    (i.prototype.provide = function (t, e) {
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument name");
                        if (this.providers.has(t)) throw new Error("RPC " + t + " already registered");
                        if (typeof e != "function") throw new Error("invalid argument callback");
                        this.providers.set(t, e),
                            this.services.connection.isConnected && this.bulkSubscription.subscribe(t);
                    }),
                    (i.prototype.unprovide = function (t) {
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument name");
                        if (!this.providers.has(t)) {
                            this.services.logger.warn({
                                topic: D.TOPIC.RPC,
                                action: D.RPC_ACTION.NOT_PROVIDED,
                                name: t,
                            });
                            return;
                        }
                        this.providers.delete(t),
                            this.services.connection.isConnected && this.bulkSubscription.unsubscribe(t);
                    }),
                    (i.prototype.make = function (t, e, r) {
                        var n = this;
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument name");
                        if (r && typeof r != "function") throw new Error("invalid argument callback");
                        var o = Xu.getUid();
                        if (this.services.connection.isConnected) {
                            if (r) {
                                this.rpcs.set(o, new Zr.RPC(t, o, e, r, this.options, this.services));
                                return;
                            }
                            return new Promise(function (s, c) {
                                n.rpcs.set(
                                    o,
                                    new Zr.RPC(
                                        t,
                                        o,
                                        e,
                                        function (a, l) {
                                            return a ? c(a) : s(l);
                                        },
                                        n.options,
                                        n.services
                                    )
                                );
                            });
                        } else if (this.services.connection.isInLimbo)
                            if (r) this.limboQueue.push({ correlationId: o, name: t, data: e, callback: r });
                            else
                                return new Promise(function (s, c) {
                                    n.limboQueue.push({
                                        correlationId: o,
                                        name: t,
                                        data: e,
                                        callback: function (a, l) {
                                            return a ? c(a) : s(l);
                                        },
                                    });
                                });
                        else if (r) r(D.EVENT.CLIENT_OFFLINE);
                        else return Promise.reject(D.EVENT.CLIENT_OFFLINE);
                    }),
                    (i.prototype.respondToRpc = function (t) {
                        var e = this.providers.get(t.name);
                        e
                            ? e(t.parsedData, new zu.RPCResponse(t, this.options, this.services))
                            : this.services.connection.sendMessage({
                                  topic: D.TOPIC.RPC,
                                  action: D.RPC_ACTION.REJECT,
                                  name: t.name,
                                  correlationId: t.correlationId,
                              });
                    }),
                    (i.prototype.handle = function (t) {
                        if (t.action === D.RPC_ACTION.REQUEST) {
                            this.respondToRpc(t);
                            return;
                        }
                        if (t.isAck) {
                            this.services.timeoutRegistry.remove(t);
                            return;
                        }
                        if (
                            t.action === D.RPC_ACTION.MESSAGE_PERMISSION_ERROR ||
                            t.action === D.RPC_ACTION.MESSAGE_DENIED
                        ) {
                            if (
                                t.originalAction === D.RPC_ACTION.PROVIDE ||
                                t.originalAction === D.RPC_ACTION.UNPROVIDE
                            ) {
                                this.services.timeoutRegistry.remove(t),
                                    this.providers.delete(t.name),
                                    this.services.logger.error(t);
                                return;
                            }
                            if (t.originalAction === D.RPC_ACTION.REQUEST) {
                                var e = this.getRPC(t);
                                if (e) {
                                    e.error(D.RPC_ACTION[t.action]), this.rpcs.delete(t.correlationId);
                                    return;
                                }
                            }
                        }
                        var r = this.getRPC(t);
                        if (r) {
                            if (t.action === D.RPC_ACTION.ACCEPT) {
                                r.accept();
                                return;
                            }
                            t.action === D.RPC_ACTION.RESPONSE
                                ? r.respond(t.parsedData)
                                : t.action === D.RPC_ACTION.REQUEST_ERROR
                                ? r.error(t.parsedData)
                                : (t.action === D.RPC_ACTION.RESPONSE_TIMEOUT ||
                                      t.action === D.RPC_ACTION.ACCEPT_TIMEOUT ||
                                      t.action === D.RPC_ACTION.NO_RPC_PROVIDER) &&
                                  r.error(D.RPC_ACTION[t.action]),
                                this.rpcs.delete(t.correlationId);
                        }
                    }),
                    (i.prototype.getRPC = function (t) {
                        var e = this.rpcs.get(t.correlationId);
                        return e === void 0 && this.services.logger.error(t, D.EVENT.UNKNOWN_CORRELATION_ID), e;
                    }),
                    (i.prototype.onConnectionReestablished = function () {
                        this.bulkSubscription.subscribeList(Ms(this.providers.keys()));
                        for (var t = 0; t < this.limboQueue.length; t++) {
                            var e = this.limboQueue[t],
                                r = e.correlationId,
                                n = e.name,
                                o = e.data,
                                s = e.callback;
                            this.rpcs.set(r, new Zr.RPC(n, r, o, s, this.options, this.services));
                        }
                        this.limboQueue = [];
                    }),
                    (i.prototype.onExitLimbo = function () {
                        for (var t = 0; t < this.limboQueue.length; t++)
                            this.limboQueue[t].callback(D.EVENT.CLIENT_OFFLINE);
                        this.limboQueue = [];
                    }),
                    (i.prototype.onConnectionLost = function () {
                        this.rpcs.forEach(function (t) {
                            t.error(D.EVENT.CLIENT_OFFLINE);
                        }),
                            this.rpcs.clear();
                    }),
                    (i.prototype.onBulkSubscriptionSent = function (t) {
                        this.services.timeoutRegistry.add({ message: t });
                    }),
                    i
                );
            })();
        Yt.RPCHandler = tl;
    });
    var xs = R((De) => {
        "use strict";
        u();
        Object.defineProperty(De, "__esModule", { value: !0 });
        De.setValue = De.get = void 0;
        var tn = Bt(),
            el = /[[\]]/g;
        function il(i, t, e) {
            e === void 0 && (e = !1);
            for (var r = ks(t), n = i, o = 0; o < r.length; o++) {
                if (n === void 0) return;
                if (typeof n != "object") throw new Error("invalid data or path");
                n = n[r[o]];
            }
            return e !== !1 ? tn.deepCopy(n) : n;
        }
        De.get = il;
        function rl(i, t, e) {
            if (t === null) return e;
            var r = ks(t),
                n = tn.deepCopy(i),
                o = tn.deepCopy(e),
                s = n,
                c;
            for (c = 0; c < r.length - 1; c++) {
                var a = r[c];
                if (s[a] !== void 0 && s[a] !== null && typeof s[a] == "object") s = s[a];
                else if (typeof r[c + 1] == "number") {
                    var l = new Array(r[c + 1]);
                    l.fill(null), (s = s[a] = l);
                } else s = s[a] = {};
            }
            return e === void 0 ? delete s[r[c]] : (s[r[c]] = o), n;
        }
        De.setValue = rl;
        function ks(i) {
            if (i === null) return [];
            for (var t = [], e = i.split("."), r = 0; r < e.length; r++) {
                var n = e[r].trim();
                if (n.length !== 0) {
                    var o = n.split(el);
                    if (o.length !== 0) {
                        t.push(o[0]);
                        for (var s = 1; s < o.length; s++) o[s].length !== 0 && t.push(Number(o[s]));
                    }
                }
            }
            return t;
        }
    });
    var Vs = R((Kt) => {
        "use strict";
        u();
        var nl =
                (Kt && Kt.__extends) ||
                (function () {
                    var i = function (t, e) {
                        return (
                            (i =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (r, n) {
                                        r.__proto__ = n;
                                    }) ||
                                function (r, n) {
                                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
                                }),
                            i(t, e)
                        );
                    };
                    return function (t, e) {
                        i(t, e);
                        function r() {
                            this.constructor = t;
                        }
                        t.prototype = e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    };
                })(),
            Jt =
                (Kt && Kt.__assign) ||
                function () {
                    return (
                        (Jt =
                            Object.assign ||
                            function (i) {
                                for (var t, e = 1, r = arguments.length; e < r; e++) {
                                    t = arguments[e];
                                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
                                }
                                return i;
                            }),
                        Jt.apply(this, arguments)
                    );
                };
        Object.defineProperty(Kt, "__esModule", { value: !0 });
        Kt.RecordCore = void 0;
        var y = F(),
            fe = xs(),
            js = gt(),
            we = Bt(),
            ol = Qr(),
            $ = (function (i) {
                nl(t, i);
                function t(e, r, n, o, s) {
                    var c = i.call(this) || this;
                    if (
                        ((c.name = e),
                        (c.services = r),
                        (c.options = n),
                        (c.recordServices = o),
                        (c.whenComplete = s),
                        (c.isReady = !1),
                        (c.hasProvider = !1),
                        (c.version = null),
                        (c.references = new Set()),
                        (c.emitter = new js.Emitter()),
                        (c.data = Object.create(null)),
                        (c.responseTimeout = null),
                        (c.discardTimeout = null),
                        (c.deletedTimeout = null),
                        (c.deleteResponse = null),
                        (c.pendingWrites = []),
                        (c.readyTimer = -1),
                        (c.recordReadOnlyMode =
                            c.options.recordReadOnlyMode &&
                            c.options.recordPrefixWriteWhitelist.every(function (a) {
                                return !c.name.startsWith(a);
                            })),
                        (c.readyCallbacks = []),
                        typeof e != "string" || e.length === 0)
                    )
                        throw new Error("invalid argument name");
                    return (
                        (c.onConnectionLost = c.onConnectionLost.bind(c)),
                        (c.onConnectionReestablished = c.onConnectionReestablished.bind(c)),
                        (c.stateMachine = new ol.StateMachine(c.services.logger, {
                            init: "LOADING_OFFLINE",
                            context: c,
                            onStateChanged: c.onStateChanged,
                            transitions: sl,
                        })),
                        c.recordServices.dirtyService.whenLoaded(c, c.onDirtyServiceLoaded),
                        c
                    );
                }
                return (
                    Object.defineProperty(t.prototype, "recordState", {
                        get: function () {
                            return this.stateMachine.state;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (t.prototype.addReference = function (e) {
                        this.references.size === 0 &&
                            this.isReady &&
                            (this.services.timeoutRegistry.clear(this.discardTimeout),
                            this.services.timerRegistry.remove(this.readyTimer),
                            (this.readyTimer = -1),
                            this.stateMachine.transition(y.RECORD_ACTION.SUBSCRIBE)),
                            this.references.add(e);
                    }),
                    (t.prototype.removeReference = function (e) {
                        var r = this;
                        this.checkDestroyed("discard") ||
                            this.whenReadyInternal(e, function () {
                                r.references.delete(e),
                                    r.references.size === 0 &&
                                        r.readyTimer === -1 &&
                                        ((r.readyTimer = r.services.timerRegistry.add({
                                            duration: r.options.recordDiscardTimeout,
                                            callback: r.stateMachine.transition,
                                            context: r.stateMachine,
                                            data: "UNSUBSCRIBE_FOR_REAL",
                                        })),
                                        r.stateMachine.transition(y.RECORD_ACTION.UNSUBSCRIBE));
                            });
                    }),
                    (t.prototype.onDirtyServiceLoaded = function () {
                        var e = this;
                        this.services.storage.get(this.name, function (r, n, o) {
                            if (
                                (e.services.connection.onReestablished(e.onConnectionReestablished),
                                e.services.connection.onLost(e.onConnectionLost),
                                !e.services.connection.isConnected)
                            ) {
                                if (n === -1) {
                                    if (e.recordReadOnlyMode) return;
                                    (e.version = e.options.initialRecordVersion),
                                        (e.data = Object.create(null)),
                                        e.recordServices.dirtyService.setDirty(e.name, !0),
                                        e.services.storage.set(e.name, e.version, e.data, function (s) {});
                                } else (e.version = n), (e.data = o);
                                e.stateMachine.transition("LOADED");
                                return;
                            }
                            n === -1 && !e.recordServices.dirtyService.isDirty(e.name)
                                ? e.stateMachine.transition(y.RECORD_ACTION.SUBSCRIBECREATEANDREAD)
                                : ((e.version = n), (e.data = o), e.stateMachine.transition("RESUBSCRIBE"));
                        });
                    }),
                    (t.prototype.onStateChanged = function (e, r) {
                        this.emitter.emit(y.EVENT.RECORD_STATE_CHANGED, e);
                    }),
                    (t.prototype.whenReady = function (e, r) {
                        var n = this;
                        if (r) {
                            this.whenReadyInternal(e, function (o) {
                                r(o);
                            });
                            return;
                        }
                        return new Promise(function (o) {
                            return n.whenReadyInternal(e, function () {
                                return o(e);
                            });
                        });
                    }),
                    (t.prototype.whenReadyInternal = function (e, r) {
                        if (this.isReady === !0) {
                            r(e);
                            return;
                        }
                        this.readyCallbacks.push({ callback: r, context: e });
                    }),
                    (t.prototype.set = function (e) {
                        var r = this,
                            n = e.path,
                            o = e.data,
                            s = e.callback;
                        if (!n && (o === null || typeof o != "object"))
                            throw new Error("invalid arguments, scalar values cannot be set without path");
                        if (!this.checkDestroyed("set")) {
                            if (this.recordReadOnlyMode) {
                                this.services.logger.error(
                                    { topic: y.TOPIC.RECORD },
                                    y.EVENT.RECORD_READ_ONLY_MODE,
                                    "Attempting to set data when in readonly mode, ignoring"
                                );
                                return;
                            }
                            if (this.isReady === !1) {
                                this.pendingWrites.push({ path: n, data: o, callback: s });
                                return;
                            }
                            var c = this.data,
                                a = fe.setValue(c, n || null, o);
                            if (we.deepEquals(c, a)) {
                                s &&
                                    this.services.timerRegistry.requestIdleCallback(function () {
                                        return s(null, r.name);
                                    });
                                return;
                            }
                            this.applyChange(a),
                                this.services.connection.isConnected
                                    ? this.sendUpdate(n, o, s)
                                    : (s && s(y.EVENT.CLIENT_OFFLINE, this.name), this.saveUpdate());
                        }
                    }),
                    (t.prototype.setWithAck = function (e) {
                        var r = this;
                        if (e.callback) {
                            this.set(e);
                            return;
                        }
                        return new Promise(function (n, o) {
                            (e.callback = function (s) {
                                return s === null ? n() : o(s);
                            }),
                                r.set(e);
                        });
                    }),
                    (t.prototype.get = function (e) {
                        return fe.get(this.data, e || null, this.options.recordDeepCopy);
                    }),
                    (t.prototype.subscribe = function (e, r) {
                        var n = this;
                        if (e.path !== void 0 && (typeof e.path != "string" || e.path.length === 0))
                            throw new Error("invalid argument path");
                        if (typeof e.callback != "function") throw new Error("invalid argument callback");
                        this.checkDestroyed("subscribe") ||
                            (e.triggerNow
                                ? this.whenReadyInternal(null, function () {
                                      n.emitter.on(e.path || "", e.callback, r), e.callback(n.get(e.path));
                                  })
                                : this.emitter.on(e.path || "", e.callback, r));
                    }),
                    (t.prototype.unsubscribe = function (e, r) {
                        if (e.path !== void 0 && (typeof e.path != "string" || e.path.length === 0))
                            throw new Error("invalid argument path");
                        if (e.callback !== void 0 && typeof e.callback != "function")
                            throw new Error("invalid argument callback");
                        this.checkDestroyed("unsubscribe") || this.emitter.off(e.path || "", e.callback, r);
                    }),
                    (t.prototype.delete = function (e) {
                        var r = this;
                        if (!this.services.connection.isConnected) {
                            if (e) {
                                this.services.timerRegistry.requestIdleCallback(function () {
                                    e("Deleting while offline is not supported");
                                });
                                return;
                            }
                            return Promise.reject("Deleting while offline is not supported");
                        }
                        if (!this.checkDestroyed("delete"))
                            if ((this.stateMachine.transition(y.RECORD_ACTION.DELETE), e && typeof e == "function"))
                                (this.deleteResponse = { callback: e }), this.sendDelete();
                            else
                                return new Promise(function (n, o) {
                                    (r.deleteResponse = { resolve: n, reject: o }), r.sendDelete();
                                });
                    }),
                    (t.prototype.setMergeStrategy = function (e) {
                        this.recordServices.mergeStrategy.setMergeStrategyByName(this.name, e);
                    }),
                    (t.prototype.saveRecordToOffline = function (e) {
                        e === void 0 && (e = function () {}),
                            this.services.storage.set(this.name, this.version, this.data, e);
                    }),
                    (t.prototype.onSubscribing = function () {
                        this.recordServices.readRegistry.register(this.name, this, this.handleReadResponse),
                            (this.responseTimeout = this.services.timeoutRegistry.add({
                                message: {
                                    topic: y.TOPIC.RECORD,
                                    action: y.RECORD_ACTION.READ_RESPONSE,
                                    name: this.name,
                                },
                            })),
                            this.recordReadOnlyMode
                                ? this.recordServices.bulkSubscriptionService[
                                      y.RECORD_ACTION.SUBSCRIBEANDREAD
                                  ].subscribe(this.name)
                                : this.recordServices.bulkSubscriptionService[
                                      y.RECORD_ACTION.SUBSCRIBECREATEANDREAD
                                  ].subscribe(this.name);
                    }),
                    (t.prototype.onResubscribing = function () {
                        this.services.timerRegistry.remove(this.readyTimer),
                            this.recordServices.headRegistry.register(this.name, this, this.handleHeadResponse),
                            (this.responseTimeout = this.services.timeoutRegistry.add({
                                message: { topic: y.TOPIC.RECORD, action: y.RECORD_ACTION.HEAD, name: this.name },
                            })),
                            this.recordServices.bulkSubscriptionService[y.RECORD_ACTION.SUBSCRIBEANDHEAD].subscribe(
                                this.name
                            );
                    }),
                    (t.prototype.onReady = function () {
                        this.services.timeoutRegistry.clear(this.responseTimeout),
                            this.applyPendingWrites(),
                            (this.isReady = !0),
                            this.applyChange(this.data, !0, !1),
                            this.readyCallbacks.forEach(function (e) {
                                var r = e.context,
                                    n = e.callback;
                                n.call(r, r);
                            }),
                            (this.readyCallbacks = []);
                    }),
                    (t.prototype.applyPendingWrites = function () {
                        for (var e = this, r = [], n = this.data, o = n, s = 0; s < this.pendingWrites.length; s++) {
                            var c = this.pendingWrites[s],
                                a = c.callback,
                                l = c.path,
                                h = c.data;
                            a && r.push(a), (o = fe.setValue(o, l || null, h));
                        }
                        (this.pendingWrites = []), this.applyChange(o);
                        var E;
                        if (
                            (r.length !== 0 &&
                                (E = function (N) {
                                    for (var O = 0; O < r.length; O++) r[O](N, e.name);
                                }),
                            we.deepEquals(n, o))
                        ) {
                            E && E(null);
                            return;
                        }
                        this.services.connection.isConnected
                            ? this.sendUpdate(null, o, E)
                            : (E && E(y.EVENT.CLIENT_OFFLINE), this.saveUpdate());
                    }),
                    (t.prototype.onUnsubscribed = function () {
                        var e = this;
                        if (this.services.connection.isConnected) {
                            var r = {
                                topic: y.TOPIC.RECORD,
                                action: y.RECORD_ACTION.UNSUBSCRIBE,
                                names: [this.name],
                                correlationId: this.name,
                            };
                            (this.discardTimeout = this.services.timeoutRegistry.add({ message: r })),
                                this.services.connection.sendMessage(r);
                        }
                        this.emit(y.EVENT.RECORD_DISCARDED),
                            this.saveRecordToOffline(function () {
                                return e.destroy();
                            });
                    }),
                    (t.prototype.onDeleted = function () {
                        this.services.storage.delete(this.name, function () {}),
                            this.emit(y.EVENT.RECORD_DELETED),
                            this.destroy();
                    }),
                    (t.prototype.handle = function (e) {
                        if (
                            e.action === y.RECORD_ACTION.PATCH ||
                            e.action === y.RECORD_ACTION.UPDATE ||
                            e.action === y.RECORD_ACTION.ERASE
                        ) {
                            if (this.stateMachine.state === "MERGING") return;
                            this.applyUpdate(e);
                            return;
                        }
                        if (e.action === y.RECORD_ACTION.DELETE_SUCCESS) {
                            this.services.timeoutRegistry.clear(this.deletedTimeout),
                                this.stateMachine.transition(y.RECORD_ACTION.DELETE_SUCCESS),
                                this.deleteResponse.callback
                                    ? this.deleteResponse.callback(null)
                                    : this.deleteResponse.resolve && this.deleteResponse.resolve();
                            return;
                        }
                        if (e.action === y.RECORD_ACTION.DELETED) {
                            this.stateMachine.transition(y.RECORD_ACTION.DELETED);
                            return;
                        }
                        if (e.action === y.RECORD_ACTION.VERSION_EXISTS) {
                            this.recoverRecordFromMessage(e);
                            return;
                        }
                        if (
                            e.action === y.RECORD_ACTION.MESSAGE_DENIED ||
                            e.action === y.RECORD_ACTION.MESSAGE_PERMISSION_ERROR
                        ) {
                            if (
                                e.originalAction === y.RECORD_ACTION.SUBSCRIBECREATEANDREAD ||
                                e.originalAction === y.RECORD_ACTION.SUBSCRIBEANDHEAD ||
                                e.originalAction === y.RECORD_ACTION.SUBSCRIBEANDREAD
                            ) {
                                var r = Jt(Jt({}, e), { originalAction: y.RECORD_ACTION.SUBSCRIBE }),
                                    n = Jt(Jt({}, e), {
                                        originalAction:
                                            e.originalAction === y.RECORD_ACTION.SUBSCRIBECREATEANDREAD
                                                ? y.RECORD_ACTION.READ_RESPONSE
                                                : y.RECORD_ACTION.HEAD_RESPONSE,
                                    });
                                this.services.timeoutRegistry.remove(r), this.services.timeoutRegistry.remove(n);
                            }
                            if (e.originalAction === y.RECORD_ACTION.PATCH && e.correlationId) {
                                this.recordServices.writeAckService.recieve(e);
                                return;
                            }
                            this.emit(
                                y.EVENT.RECORD_ERROR,
                                y.RECORD_ACTION[y.RECORD_ACTION.MESSAGE_DENIED],
                                y.RECORD_ACTION[e.originalAction]
                            ),
                                e.originalAction === y.RECORD_ACTION.DELETE &&
                                    (this.deleteResponse.callback
                                        ? this.deleteResponse.callback(y.RECORD_ACTION[y.RECORD_ACTION.MESSAGE_DENIED])
                                        : this.deleteResponse.reject &&
                                          this.deleteResponse.reject(y.RECORD_ACTION[y.RECORD_ACTION.MESSAGE_DENIED]));
                            return;
                        }
                        if (
                            e.action === y.RECORD_ACTION.SUBSCRIPTION_HAS_PROVIDER ||
                            e.action === y.RECORD_ACTION.SUBSCRIPTION_HAS_NO_PROVIDER
                        ) {
                            (this.hasProvider = e.action === y.RECORD_ACTION.SUBSCRIPTION_HAS_PROVIDER),
                                this.emit(y.EVENT.RECORD_HAS_PROVIDER_CHANGED, this.hasProvider);
                            return;
                        }
                    }),
                    (t.prototype.handleReadResponse = function (e) {
                        if (this.stateMachine.state === "MERGING") {
                            this.recoverRecordFromMessage(e), this.recordServices.dirtyService.setDirty(this.name, !1);
                            return;
                        }
                        (this.version = e.version),
                            (this.data = e.parsedData),
                            this.stateMachine.transition(y.RECORD_ACTION.READ_RESPONSE);
                    }),
                    (t.prototype.handleHeadResponse = function (e) {
                        var r = e.version;
                        this.recordServices.dirtyService.isDirty(this.name)
                            ? r === -1 && this.version === this.options.initialRecordVersion
                                ? (this.stateMachine.transition("SUBSCRIBED"), this.sendCreateUpdate(this.data))
                                : this.version === r + 1
                                ? (this.stateMachine.transition("RESUBSCRIBED"), this.sendUpdate(null, this.data))
                                : (this.stateMachine.transition("INVALID_VERSION"),
                                  r !== -1
                                      ? (this.sendRead(),
                                        this.recordServices.readRegistry.register(
                                            this.name,
                                            this,
                                            this.handleReadResponse
                                        ))
                                      : this.recoverRecordDeletedRemotely())
                            : this.version === r
                            ? this.stateMachine.transition("RESUBSCRIBED")
                            : (this.stateMachine.transition("INVALID_VERSION"),
                              r < this.version
                                  ? this.recoverRecordDeletedRemotely()
                                  : (this.sendRead(),
                                    this.recordServices.readRegistry.register(
                                        this.name,
                                        this,
                                        this.handleReadResponse
                                    )));
                    }),
                    (t.prototype.sendRead = function () {
                        this.services.connection.sendMessage({
                            topic: y.TOPIC.RECORD,
                            action: y.RECORD_ACTION.READ,
                            name: this.name,
                        });
                    }),
                    (t.prototype.saveUpdate = function () {
                        this.recordServices.dirtyService.isDirty(this.name) ||
                            (this.version++, this.recordServices.dirtyService.setDirty(this.name, !0)),
                            this.saveRecordToOffline();
                    }),
                    (t.prototype.sendUpdate = function (e, r, n) {
                        if ((e === void 0 && (e = null), this.recordReadOnlyMode)) {
                            this.services.logger.error(
                                { topic: y.TOPIC.RECORD },
                                y.EVENT.RECORD_READ_ONLY_MODE,
                                "Attempting to send updated data, ignoring"
                            );
                            return;
                        }
                        this.recordServices.dirtyService.isDirty(this.name)
                            ? this.recordServices.dirtyService.setDirty(this.name, !1)
                            : this.version++;
                        var o = { topic: y.TOPIC.RECORD, version: this.version, name: this.name };
                        e
                            ? r === void 0
                                ? Object.assign(o, { action: y.RECORD_ACTION.ERASE, path: e })
                                : Object.assign(o, { action: y.RECORD_ACTION.PATCH, path: e, parsedData: r })
                            : Object.assign(o, { action: y.RECORD_ACTION.UPDATE, parsedData: r }),
                            n
                                ? this.recordServices.writeAckService.send(o, n)
                                : this.services.connection.sendMessage(o);
                    }),
                    (t.prototype.sendCreateUpdate = function (e) {
                        this.services.connection.sendMessage({
                            name: this.name,
                            topic: y.TOPIC.RECORD,
                            action: y.RECORD_ACTION.CREATEANDUPDATE,
                            version: this.options.initialRecordVersion,
                            parsedData: e,
                        }),
                            this.recordServices.dirtyService.setDirty(this.name, !1);
                    }),
                    (t.prototype.applyUpdate = function (e) {
                        var r = e.version,
                            n = e.parsedData;
                        if (this.version === null) this.version = r;
                        else if (this.version + 1 !== r) {
                            this.stateMachine.transition("INVALID_VERSION"),
                                e.action === y.RECORD_ACTION.PATCH
                                    ? (this.sendRead(),
                                      this.recordServices.readRegistry.register(
                                          this.name,
                                          this,
                                          this.handleReadResponse
                                      ))
                                    : this.recoverRecordFromMessage(e);
                            return;
                        }
                        this.version = r;
                        var o;
                        e.action === y.RECORD_ACTION.PATCH
                            ? (o = fe.setValue(this.data, e.path, n))
                            : e.action === y.RECORD_ACTION.ERASE
                            ? (o = fe.setValue(this.data, e.path, void 0))
                            : (o = n),
                            this.applyChange(o);
                    }),
                    (t.prototype.applyChange = function (e, r, n) {
                        if ((r === void 0 && (r = !1), n === void 0 && (n = !0), !this.stateMachine.inEndState)) {
                            var o = this.data;
                            (this.data = e), this.options.saveUpdatesOffline && n && this.saveRecordToOffline();
                            for (var s = this.emitter.eventNames(), c = 0; c < s.length; c++) {
                                var a = fe.get(e, s[c], !1),
                                    l = fe.get(o, s[c], !1);
                                (!we.deepEquals(a, l) || (r && a)) && this.emitter.emit(s[c], this.get(s[c]));
                            }
                        }
                    }),
                    (t.prototype.sendDelete = function () {
                        var e = this;
                        this.whenReadyInternal(null, function () {
                            e.services.storage.delete(e.name, function () {
                                if (e.services.connection.isConnected) {
                                    var r = { topic: y.TOPIC.RECORD, action: y.RECORD_ACTION.DELETE, name: e.name };
                                    (e.deletedTimeout = e.services.timeoutRegistry.add({
                                        message: r,
                                        event: y.EVENT.RECORD_DELETE_TIMEOUT,
                                        duration: e.options.recordDeleteTimeout,
                                    })),
                                        e.services.connection.sendMessage(r);
                                } else e.stateMachine.transition(y.RECORD_ACTION.DELETE_SUCCESS);
                            });
                        });
                    }),
                    (t.prototype.recoverRecordFromMessage = function (e) {
                        this.recordServices.mergeStrategy.merge(
                            e,
                            this.version,
                            this.get(),
                            this.onRecordRecovered,
                            this
                        );
                    }),
                    (t.prototype.recoverRecordDeletedRemotely = function () {
                        this.recordServices.mergeStrategy.merge(
                            { name: this.name, version: -1, parsedData: null },
                            this.version,
                            this.get(),
                            this.onRecordRecovered,
                            this
                        );
                    }),
                    (t.prototype.onRecordRecovered = function (e, r, n) {
                        var o = this,
                            s = r.version,
                            c = r.parsedData;
                        if (e) {
                            this.services.logger.error({ topic: y.TOPIC.RECORD }, y.EVENT.RECORD_VERSION_EXISTS),
                                r.correlationId &&
                                    this.recordServices.writeAckService.recieve(Jt(Jt({}, r), { reason: e }));
                            return;
                        }
                        if (n === null) {
                            s === -1
                                ? (this.services.storage.delete(this.name, function () {}),
                                  this.stateMachine.transition(y.RECORD_ACTION.DELETED))
                                : this.stateMachine.transition(y.RECORD_ACTION.DELETE);
                            return;
                        }
                        this.version = s;
                        var a = this.data;
                        if (we.deepEquals(a, c)) {
                            this.stateMachine.state === "MERGING" && this.stateMachine.transition("MERGED");
                            return;
                        }
                        if (this.stateMachine.state !== "MERGING") {
                            this.services.logger.warn({
                                topic: y.TOPIC.RECORD,
                                action: y.RECORD_ACTION.VERSION_EXISTS,
                            });
                            return;
                        }
                        var l = n;
                        this.stateMachine.transition("MERGED");
                        var h,
                            E = this.pendingWrites
                                .map(function (N) {
                                    var O = N.callback;
                                    return O;
                                })
                                .filter(function (N) {
                                    return N !== void 0;
                                });
                        if (
                            (E.length !== 0 &&
                                (h = function (N) {
                                    E.forEach(function (O) {
                                        return O(N, o.name);
                                    });
                                }),
                            (this.pendingWrites = []),
                            we.deepEquals(n, c))
                        ) {
                            this.applyChange(n), h && h(null);
                            return;
                        }
                        if (this.recordReadOnlyMode) {
                            this.services.logger.error(
                                { topic: y.TOPIC.RECORD },
                                y.EVENT.RECORD_READ_ONLY_MODE,
                                "Attempting to set data after merge when in readonly mode, ignoring"
                            );
                            return;
                        }
                        this.applyChange(l), this.sendUpdate(null, this.data, h);
                    }),
                    (t.prototype.checkDestroyed = function (e) {
                        return this.stateMachine.inEndState
                            ? (this.services.logger.error({ topic: y.TOPIC.RECORD }, y.EVENT.RECORD_ALREADY_DESTROYED, {
                                  methodName: e,
                              }),
                              !0)
                            : !1;
                    }),
                    (t.prototype.destroy = function () {
                        this.services.timerRegistry.remove(this.readyTimer),
                            this.services.timeoutRegistry.clear(this.responseTimeout),
                            this.services.timeoutRegistry.clear(this.deletedTimeout),
                            this.services.timeoutRegistry.clear(this.discardTimeout),
                            this.services.connection.removeOnReestablished(this.onConnectionReestablished),
                            this.services.connection.removeOnLost(this.onConnectionLost),
                            this.emitter.off(),
                            (this.isReady = !1),
                            this.whenComplete(this.name);
                    }),
                    (t.prototype.onConnectionReestablished = function () {
                        this.stateMachine.transition("RESUBSCRIBE");
                    }),
                    (t.prototype.onConnectionLost = function () {
                        this.saveRecordToOffline();
                    }),
                    (t.prototype.getDebugId = function () {
                        return this.options.debug ? we.getUid() : null;
                    }),
                    t
                );
            })(js.Emitter);
        Kt.RecordCore = $;
        var sl = [
            {
                name: y.RECORD_ACTION.SUBSCRIBECREATEANDREAD,
                from: "LOADING_OFFLINE",
                to: "SUBSCRIBING",
                handler: $.prototype.onSubscribing,
            },
            { name: "LOADED", from: "LOADING_OFFLINE", to: "READY", handler: $.prototype.onReady },
            { name: y.RECORD_ACTION.READ_RESPONSE, from: "SUBSCRIBING", to: "READY", handler: $.prototype.onReady },
            { name: "SUBSCRIBED", from: "RESUBSCRIBING", to: "READY", handler: $.prototype.onReady },
            { name: "RESUBSCRIBE", from: "LOADING_OFFLINE", to: "RESUBSCRIBING", handler: $.prototype.onResubscribing },
            { name: "RESUBSCRIBE", from: "READY", to: "RESUBSCRIBING", handler: $.prototype.onResubscribing },
            { name: "RESUBSCRIBE", from: "RESUBSCRIBING", to: "RESUBSCRIBING", handler: $.prototype.onResubscribing },
            { name: "RESUBSCRIBE", from: "SUBSCRIBING", to: "SUBSCRIBING", handler: $.prototype.onSubscribing },
            { name: "RESUBSCRIBE", from: "UNSUBSCRIBING", to: "UNSUBSCRIBING" },
            { name: "RESUBSCRIBED", from: "RESUBSCRIBING", to: "READY", handler: $.prototype.onReady },
            { name: "INVALID_VERSION", from: "RESUBSCRIBING", to: "MERGING" },
            { name: "MERGED", from: "MERGING", to: "READY", handler: $.prototype.onReady },
            { name: y.RECORD_ACTION.DELETED, from: "MERGING", to: "DELETED", handler: $.prototype.onDeleted },
            { name: y.RECORD_ACTION.DELETE, from: "MERGING", to: "DELETING" },
            { name: y.RECORD_ACTION.DELETE, from: "READY", to: "DELETING" },
            { name: y.RECORD_ACTION.DELETED, from: "READY", to: "DELETED", handler: $.prototype.onDeleted },
            {
                name: y.RECORD_ACTION.DELETED,
                from: "UNSUBSCRIBE_FOR_REAL",
                to: "DELETED",
                handler: $.prototype.onDeleted,
            },
            { name: y.RECORD_ACTION.DELETED, from: "UNSUBSCRIBING", to: "DELETED", handler: $.prototype.onDeleted },
            { name: y.RECORD_ACTION.DELETE_SUCCESS, from: "DELETING", to: "DELETED", handler: $.prototype.onDeleted },
            { name: y.RECORD_ACTION.UNSUBSCRIBE, from: "READY", to: "UNSUBSCRIBING" },
            { name: y.RECORD_ACTION.SUBSCRIBE, from: "UNSUBSCRIBING", to: "READY" },
            {
                name: "UNSUBSCRIBE_FOR_REAL",
                from: "UNSUBSCRIBING",
                to: "UNSUBSCRIBED",
                handler: $.prototype.onUnsubscribed,
            },
            { name: "INVALID_VERSION", from: "READY", to: "MERGING" },
        ];
    });
    var en = R((Pe) => {
        "use strict";
        u();
        var cl =
            (Pe && Pe.__extends) ||
            (function () {
                var i = function (t, e) {
                    return (
                        (i =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (r, n) {
                                    r.__proto__ = n;
                                }) ||
                            function (r, n) {
                                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
                            }),
                        i(t, e)
                    );
                };
                return function (t, e) {
                    i(t, e);
                    function r() {
                        this.constructor = t;
                    }
                    t.prototype = e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
                };
            })();
        Object.defineProperty(Pe, "__esModule", { value: !0 });
        Pe.Record = void 0;
        var Qi = Bt(),
            $t = F(),
            al = gt(),
            ul = (function (i) {
                cl(t, i);
                function t(e) {
                    var r = i.call(this) || this;
                    return (
                        (r.record = e),
                        (r.debugId = r.record.getDebugId()),
                        (r.subscriptions = []),
                        r.record.on($t.EVENT.RECORD_READY, r.emit.bind(r, $t.EVENT.RECORD_READY, r), r),
                        r.record.on($t.EVENT.RECORD_DISCARDED, r.emit.bind(r, $t.EVENT.RECORD_DISCARDED), r),
                        r.record.on($t.EVENT.RECORD_DELETED, r.emit.bind(r, $t.EVENT.RECORD_DELETED), r),
                        r.record.on($t.EVENT.RECORD_ERROR, r.emit.bind(r, $t.EVENT.RECORD_ERROR), r),
                        r.record.addReference(r),
                        r
                    );
                }
                return (
                    Object.defineProperty(t.prototype, "name", {
                        get: function () {
                            return this.record.name;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(t.prototype, "isReady", {
                        get: function () {
                            return this.record.isReady;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(t.prototype, "version", {
                        get: function () {
                            return this.record.version;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(t.prototype, "hasProvider", {
                        get: function () {
                            return this.record.hasProvider;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (t.prototype.whenReady = function (e) {
                        if (e) this.record.whenReady(this, e);
                        else return this.record.whenReady(this);
                    }),
                    (t.prototype.get = function (e) {
                        return this.record.get(e);
                    }),
                    (t.prototype.set = function (e, r, n) {
                        return this.record.set(Qi.normalizeSetArguments(arguments));
                    }),
                    (t.prototype.setWithAck = function (e, r, n) {
                        return this.record.setWithAck(Qi.normalizeSetArguments(arguments));
                    }),
                    (t.prototype.erase = function (e) {
                        if (!e) throw new Error("unable to erase record data without path, consider using `delete`");
                        this.set(e, void 0);
                    }),
                    (t.prototype.eraseWithAck = function (e, r) {
                        if (!e) throw new Error("unable to erase record data without path, consider using `delete`");
                        if (r) this.setWithAck(e, void 0, r);
                        else return this.setWithAck(e, void 0);
                    }),
                    (t.prototype.subscribe = function (e, r, n) {
                        var o = Qi.normalizeArguments(arguments);
                        this.subscriptions.push(o), this.record.subscribe(o, this);
                    }),
                    (t.prototype.unsubscribe = function (e, r) {
                        var n = Qi.normalizeArguments(arguments);
                        (this.subscriptions = this.subscriptions.filter(function (o) {
                            return !(
                                (!n.callback && o.path === n.path) ||
                                (n.callback && o.path === n.path && o.callback === n.callback)
                            );
                        })),
                            this.record.unsubscribe(n, this);
                    }),
                    (t.prototype.discard = function () {
                        for (var e = 0; e < this.subscriptions.length; e++)
                            this.record.unsubscribe(this.subscriptions[e], this);
                        this.record.removeReference(this), this.record.removeContext(this);
                    }),
                    (t.prototype.delete = function (e) {
                        return this.record.delete(e);
                    }),
                    (t.prototype.setMergeStrategy = function (e) {
                        this.record.setMergeStrategy(e);
                    }),
                    t
                );
            })(al.Emitter);
        Pe.Record = ul;
    });
    var Fs = R((Le) => {
        "use strict";
        u();
        var ll =
            (Le && Le.__extends) ||
            (function () {
                var i = function (t, e) {
                    return (
                        (i =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (r, n) {
                                    r.__proto__ = n;
                                }) ||
                            function (r, n) {
                                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
                            }),
                        i(t, e)
                    );
                };
                return function (t, e) {
                    i(t, e);
                    function r() {
                        this.constructor = t;
                    }
                    t.prototype = e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
                };
            })();
        Object.defineProperty(Le, "__esModule", { value: !0 });
        Le.AnonymousRecord = void 0;
        var Ue = Bt(),
            hl = gt(),
            fl = (function (i) {
                ll(t, i);
                function t(e) {
                    var r = i.call(this) || this;
                    return (r.record = null), (r.subscriptions = []), (r.getRecordCore = e), r;
                }
                return (
                    Object.defineProperty(t.prototype, "name", {
                        get: function () {
                            return this.record ? this.record.name : "";
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(t.prototype, "isReady", {
                        get: function () {
                            return this.record ? this.record.isReady : !1;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(t.prototype, "version", {
                        get: function () {
                            return this.record ? this.record.version : -1;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (t.prototype.whenReady = function (e) {
                        if (this.record)
                            if (e) this.record.whenReady(this, e);
                            else return this.record.whenReady(this);
                    }),
                    (t.prototype.setName = function (e, r) {
                        if (this.name !== e) {
                            this.discard(), (this.record = this.getRecordCore(e)), this.record.addReference(this);
                            for (var n = 0; n < this.subscriptions.length; n++)
                                this.record.subscribe(this.subscriptions[n], this);
                            if ((this.emit("nameChanged", e), r)) this.record.whenReady(this, r);
                            else return this.record.whenReady(this);
                        }
                    }),
                    (t.prototype.get = function (e) {
                        if (this.record) return this.record.get(e);
                    }),
                    (t.prototype.set = function (e, r, n) {
                        if (this.record) return this.record.set(Ue.normalizeSetArguments(arguments));
                    }),
                    (t.prototype.setWithAck = function (e, r, n) {
                        if (this.record) return this.record.setWithAck(Ue.normalizeSetArguments(arguments));
                    }),
                    (t.prototype.erase = function (e) {
                        if (this.record) return this.record.set(Ue.normalizeSetArguments(arguments));
                    }),
                    (t.prototype.eraseWithAck = function (e, r) {
                        if (this.record) return this.record.setWithAck(Ue.normalizeSetArguments(arguments));
                    }),
                    (t.prototype.subscribe = function (e, r, n) {
                        var o = Ue.normalizeArguments(arguments);
                        this.subscriptions.push(o), this.record && this.record.subscribe(o, this);
                    }),
                    (t.prototype.unsubscribe = function (e, r) {
                        var n = Ue.normalizeArguments(arguments);
                        (this.subscriptions = this.subscriptions.filter(function (o) {
                            return !(
                                (!n.callback && o.path === n.path) ||
                                (n.callback && o.path === n.path && o.callback === n.callback)
                            );
                        })),
                            this.record && this.record.unsubscribe(n, this);
                    }),
                    (t.prototype.discard = function () {
                        if (this.record) {
                            for (var e = 0; e < this.subscriptions.length; e++)
                                this.record.unsubscribe(this.subscriptions[e], this);
                            return this.record.removeReference(this);
                        }
                    }),
                    (t.prototype.delete = function (e) {
                        if (this.record) return this.record.delete(e);
                    }),
                    (t.prototype.setMergeStrategy = function (e) {
                        this.record && this.record.setMergeStrategy(e);
                    }),
                    t
                );
            })(hl.Emitter);
        Le.AnonymousRecord = fl;
    });
    var Gs = R((wt) => {
        "use strict";
        u();
        var dl =
                (wt && wt.__extends) ||
                (function () {
                    var i = function (t, e) {
                        return (
                            (i =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (r, n) {
                                        r.__proto__ = n;
                                    }) ||
                                function (r, n) {
                                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
                                }),
                            i(t, e)
                        );
                    };
                    return function (t, e) {
                        i(t, e);
                        function r() {
                            this.constructor = t;
                        }
                        t.prototype = e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    };
                })(),
            pl =
                (wt && wt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                },
            El =
                (wt && wt.__spread) ||
                function () {
                    for (var i = [], t = 0; t < arguments.length; t++) i = i.concat(pl(arguments[t]));
                    return i;
                };
        Object.defineProperty(wt, "__esModule", { value: !0 });
        wt.List = void 0;
        var Hs = Bt(),
            de = F(),
            yl = gt(),
            Rl = (function (i) {
                dl(t, i);
                function t(e) {
                    var r = i.call(this) || this;
                    return (
                        (r.record = e),
                        (r.debugId = r.record.getDebugId()),
                        (r.wrappedFunctions = new Map()),
                        (r.hasAddListener = !1),
                        (r.hasRemoveListener = !1),
                        (r.hasMoveListener = !1),
                        (r.subscriptions = []),
                        (r.originalApplyUpdate = r.record.applyUpdate.bind(r.record)),
                        (r.record.applyUpdate = r.applyUpdate.bind(r)),
                        r.record.addReference(r),
                        r.record.on(
                            "discard",
                            function () {
                                return r.emit("discard", r);
                            },
                            r
                        ),
                        r.record.on(
                            "delete",
                            function () {
                                return r.emit("delete", r);
                            },
                            r
                        ),
                        r.record.on(
                            "error",
                            function () {
                                for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                                return r.emit.apply(r, El(["error"], n));
                            },
                            r
                        ),
                        r
                    );
                }
                return (
                    Object.defineProperty(t.prototype, "name", {
                        get: function () {
                            return this.record.name;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(t.prototype, "isReady", {
                        get: function () {
                            return this.record.isReady;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(t.prototype, "version", {
                        get: function () {
                            return this.record.version;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (t.prototype.whenReady = function (e) {
                        if (e) this.record.whenReady(this, e);
                        else return this.record.whenReady(this);
                    }),
                    (t.prototype.discard = function () {
                        this.destroy(), this.record.removeReference(this);
                    }),
                    (t.prototype.delete = function (e) {
                        return this.destroy(), this.record.delete(e);
                    }),
                    (t.prototype.getEntries = function () {
                        var e = this.record.get();
                        return e instanceof Array ? e : [];
                    }),
                    (t.prototype.isEmpty = function () {
                        return this.getEntries().length === 0;
                    }),
                    (t.prototype.setEntriesWithAck = function (e, r) {
                        var n = this;
                        if (!r)
                            return new Promise(function (o, s) {
                                n.setEntries(e, function (c) {
                                    c ? s(c) : o();
                                });
                            });
                        this.setEntries(e, r);
                    }),
                    (t.prototype.setEntries = function (e, r) {
                        var n = "entries must be an array of record names",
                            o;
                        if (!(e instanceof Array)) throw new Error(n);
                        for (o = 0; o < e.length; o++) if (typeof e[o] != "string") throw new Error(n);
                        this.beforeChange(), this.record.set({ data: e, callback: r }), this.afterChange();
                    }),
                    (t.prototype.removeEntry = function (e, r, n) {
                        var o = this.record.get(),
                            s = this.hasIndex(r),
                            c = [],
                            a;
                        for (a = 0; a < o.length; a++) (o[a] !== e || (s && r !== a)) && c.push(o[a]);
                        this.beforeChange(), this.record.set({ data: c, callback: n }), this.afterChange();
                    }),
                    (t.prototype.addEntry = function (e, r, n) {
                        if (typeof e != "string") throw new Error("Entry must be a recordName");
                        var o = this.hasIndex(r),
                            s = this.getEntries();
                        o ? s.splice(r, 0, e) : s.push(e),
                            this.beforeChange(),
                            this.record.set({ data: s, callback: n }),
                            this.afterChange();
                    }),
                    (t.prototype.subscribe = function (e) {
                        var r = Hs.normalizeArguments(arguments);
                        if (r.path) throw new Error("path is not supported for List.subscribe");
                        var n = function (o, s) {
                            s(o.getEntries());
                        }.bind(this, this, r.callback);
                        this.wrappedFunctions.set(r.callback, n),
                            (r.callback = n),
                            this.subscriptions.push(r),
                            this.record.subscribe(r, this);
                    }),
                    (t.prototype.unsubscribe = function (e) {
                        var r = Hs.normalizeArguments(arguments);
                        if (r.path) throw new Error("path is not supported for List.unsubscribe");
                        var n = this.wrappedFunctions.get(r.callback);
                        (r.callback = n),
                            this.wrappedFunctions.delete(r.callback),
                            (this.subscriptions = this.subscriptions.filter(function (o) {
                                return !!(r.callback && r.callback !== o.callback);
                            })),
                            this.record.unsubscribe(r, this);
                    }),
                    (t.prototype.applyUpdate = function (e) {
                        e.parsedData instanceof Array || (e.parsedData = []),
                            this.beforeChange(),
                            this.originalApplyUpdate(e),
                            this.afterChange();
                    }),
                    (t.prototype.hasIndex = function (e) {
                        var r = !1,
                            n = this.getEntries();
                        if (e !== void 0) {
                            if (isNaN(e)) throw new Error("Index must be a number");
                            if (e !== n.length && (e >= n.length || e < 0))
                                throw new Error("Index must be within current entries");
                            r = !0;
                        }
                        return r;
                    }),
                    (t.prototype.beforeChange = function () {
                        (this.hasAddListener = this.hasListeners(de.EVENT.ENTRY_ADDED_EVENT)),
                            (this.hasRemoveListener = this.hasListeners(de.EVENT.ENTRY_REMOVED_EVENT)),
                            (this.hasMoveListener = this.hasListeners(de.EVENT.ENTRY_MOVED_EVENT)),
                            this.hasAddListener || this.hasRemoveListener || this.hasMoveListener
                                ? (this.beforeStructure = this.getStructure())
                                : (this.beforeStructure = null);
                    }),
                    (t.prototype.afterChange = function () {
                        if (this.beforeStructure !== null) {
                            var e = this.getStructure(),
                                r = this.beforeStructure,
                                n,
                                o;
                            if (this.hasRemoveListener)
                                for (n in r)
                                    for (o = 0; o < r[n].length; o++)
                                        (e[n] === void 0 || e[n][o] === void 0) &&
                                            this.emit(de.EVENT.ENTRY_REMOVED_EVENT, n, r[n][o]);
                            if (this.hasAddListener || this.hasMoveListener)
                                for (n in e)
                                    if (r[n] === void 0)
                                        for (o = 0; o < e[n].length; o++)
                                            this.emit(de.EVENT.ENTRY_ADDED_EVENT, n, e[n][o]);
                                    else
                                        for (o = 0; o < e[n].length; o++)
                                            r[n][o] !== e[n][o] &&
                                                (r[n][o] === void 0
                                                    ? this.emit(de.EVENT.ENTRY_ADDED_EVENT, n, e[n][o])
                                                    : this.emit(de.EVENT.ENTRY_MOVED_EVENT, n, e[n][o]));
                        }
                    }),
                    (t.prototype.getStructure = function () {
                        var e = {},
                            r,
                            n = this.getEntries();
                        for (r = 0; r < n.length; r++) e[n[r]] === void 0 ? (e[n[r]] = [r]) : e[n[r]].push(r);
                        return e;
                    }),
                    (t.prototype.destroy = function () {
                        for (var e = 0; e < this.subscriptions.length; e++)
                            this.record.unsubscribe(this.subscriptions[e], this);
                        this.wrappedFunctions.clear(), this.record.removeContext(this);
                    }),
                    t
                );
            })(yl.Emitter);
        wt.List = Rl;
    });
    var qs = R((Xi) => {
        "use strict";
        u();
        Object.defineProperty(Xi, "__esModule", { value: !0 });
        Xi.SingleNotifier = void 0;
        var zi = F(),
            Sl = (function () {
                function i(t, e, r) {
                    (this.services = t),
                        (this.action = e),
                        (this.requests = new Map()),
                        (this.internalRequests = new Map()),
                        (this.limboQueue = []),
                        this.services.connection.onLost(this.onConnectionLost.bind(this)),
                        this.services.connection.onExitLimbo(this.onExitLimbo.bind(this)),
                        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
                }
                return (
                    (i.prototype.request = function (t, e) {
                        var r = this.requests.get(t);
                        if (r) {
                            r.push(e);
                            return;
                        }
                        this.requests.set(t, [e]);
                        var n = { topic: zi.TOPIC.RECORD, action: this.action, name: t };
                        this.services.connection.isConnected
                            ? (this.services.connection.sendMessage(n),
                              this.services.timeoutRegistry.add({ message: n }))
                            : this.services.connection.isInLimbo
                            ? this.limboQueue.push(n)
                            : (this.requests.delete(t), e(zi.EVENT.CLIENT_OFFLINE));
                    }),
                    (i.prototype.register = function (t, e, r) {
                        var n = this.internalRequests.get(t);
                        n
                            ? n.push({ callback: r, context: e })
                            : this.internalRequests.set(t, [{ callback: r, context: e }]);
                    }),
                    (i.prototype.recieve = function (t, e, r) {
                        this.services.timeoutRegistry.remove(t);
                        var n = t.name,
                            o = this.requests.get(n) || [],
                            s = this.internalRequests.get(n) || [];
                        if (!(!o && !s)) {
                            for (var c = 0; c < s.length; c++) s[c].callback.call(s[c].context, t);
                            this.internalRequests.delete(n);
                            for (var c = 0; c < o.length; c++) o[c](e, r);
                            this.requests.delete(n);
                        }
                    }),
                    (i.prototype.onConnectionLost = function () {
                        this.requests.forEach(function (t) {
                            t.forEach(function (e) {
                                return e(zi.EVENT.CLIENT_OFFLINE);
                            });
                        }),
                            this.requests.clear();
                    }),
                    (i.prototype.onExitLimbo = function () {
                        for (var t = 0; t < this.limboQueue.length; t++) {
                            var e = this.limboQueue[t],
                                r = this.requests.get(e.name);
                            r &&
                                r.forEach(function (n) {
                                    return n(zi.EVENT.CLIENT_OFFLINE);
                                });
                        }
                        this.requests.clear(), (this.limboQueue = []);
                    }),
                    (i.prototype.onConnectionReestablished = function () {
                        for (var t = 0; t < this.limboQueue.length; t++) {
                            var e = this.limboQueue[t];
                            this.services.connection.sendMessage(e), this.services.timeoutRegistry.add({ message: e });
                        }
                    }),
                    i
                );
            })();
        Xi.SingleNotifier = Sl;
    });
    var Ws = R((Me) => {
        "use strict";
        u();
        var Zi =
            (Me && Me.__assign) ||
            function () {
                return (
                    (Zi =
                        Object.assign ||
                        function (i) {
                            for (var t, e = 1, r = arguments.length; e < r; e++) {
                                t = arguments[e];
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
                            }
                            return i;
                        }),
                    Zi.apply(this, arguments)
                );
            };
        Object.defineProperty(Me, "__esModule", { value: !0 });
        Me.WriteAcknowledgementService = void 0;
        var ti = F(),
            _l = (function () {
                function i(t) {
                    (this.services = t),
                        (this.responses = new Map()),
                        (this.count = 1),
                        this.services.connection.onLost(this.onConnectionLost.bind(this));
                }
                return (
                    (i.prototype.send = function (t, e) {
                        if (this.services.connection.isConnected === !1) {
                            this.services.timerRegistry.requestIdleCallback(
                                e.bind(this, ti.EVENT.CLIENT_OFFLINE, t.name)
                            );
                            return;
                        }
                        var r = this.count.toString();
                        this.responses.set(r, e),
                            this.services.connection.sendMessage(Zi(Zi({}, t), { correlationId: r, isWriteAck: !0 })),
                            this.count++;
                    }),
                    (i.prototype.recieve = function (t) {
                        var e = t.correlationId,
                            r = this.responses.get(e);
                        !r ||
                            (t.action !== ti.RECORD_ACTION.WRITE_ACKNOWLEDGEMENT && !t.isError && !t.isWriteAck) ||
                            (t.action === ti.RECORD_ACTION.VERSION_EXISTS
                                ? r(t.reason || "Write failed due to conflict", t.name)
                                : t.isError
                                ? r(ti.RECORD_ACTION[t.action], t.name)
                                : r(null, t.name),
                            this.responses.delete(e));
                    }),
                    (i.prototype.onConnectionLost = function () {
                        this.responses.forEach(function (t) {
                            return t(ti.EVENT.CLIENT_OFFLINE);
                        }),
                            this.responses.clear();
                    }),
                    i
                );
            })();
        Me.WriteAcknowledgementService = _l;
    });
    var Ys = R((Qt) => {
        "use strict";
        u();
        var Ol =
                (Qt && Qt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                },
            Nl =
                (Qt && Qt.__spread) ||
                function () {
                    for (var i = [], t = 0; t < arguments.length; t++) i = i.concat(Ol(arguments[t]));
                    return i;
                };
        Object.defineProperty(Qt, "__esModule", { value: !0 });
        Qt.DirtyService = void 0;
        var Tl = (function () {
            function i(t, e) {
                (this.storage = t),
                    (this.dirtyStorageName = e),
                    (this.dirtyRecords = new Map()),
                    (this.loadedCallback = []),
                    (this.flushTimeout = null),
                    (this.loaded = !1),
                    (this.save = this.save.bind(this)),
                    this.load();
            }
            return (
                (i.prototype.isDirty = function (t) {
                    return this.dirtyRecords.has(t);
                }),
                (i.prototype.setDirty = function (t, e) {
                    var r = !0;
                    e ? this.dirtyRecords.set(t, !0) : (r = this.dirtyRecords.delete(t)),
                        !this.flushTimeout && r && (this.flushTimeout = setTimeout(this.save, 1e3));
                }),
                (i.prototype.save = function () {
                    this.storage.set(this.dirtyStorageName, 1, Nl(this.dirtyRecords), function () {}),
                        this.flushTimeout && clearTimeout(this.flushTimeout),
                        (this.flushTimeout = null);
                }),
                (i.prototype.whenLoaded = function (t, e) {
                    if (this.loaded) {
                        e.call(t);
                        return;
                    }
                    this.loadedCallback.push({ callback: e, context: t });
                }),
                (i.prototype.getAll = function () {
                    return this.dirtyRecords;
                }),
                (i.prototype.load = function () {
                    var t = this;
                    this.loaded ||
                        this.storage.get(this.dirtyStorageName, function (e, r, n) {
                            (t.dirtyRecords = n ? new Map(n) : new Map()),
                                (t.loaded = !0),
                                t.loadedCallback.forEach(function (o) {
                                    var s = o.callback,
                                        c = o.context;
                                    return s.call(c);
                                });
                        });
                }),
                i
            );
        })();
        Qt.DirtyService = Tl;
    });
    var Ks = R((zt) => {
        "use strict";
        u();
        var Il =
                (zt && zt.__values) ||
                function (i) {
                    var t = typeof Symbol == "function" && Symbol.iterator,
                        e = t && i[t],
                        r = 0;
                    if (e) return e.call(i);
                    if (i && typeof i.length == "number")
                        return {
                            next: function () {
                                return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
                            },
                        };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
                },
            vl =
                (zt && zt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                };
        Object.defineProperty(zt, "__esModule", { value: !0 });
        zt.MergeStrategyService = void 0;
        var Js = F(),
            bl = (function () {
                function i(t, e) {
                    (this.services = t),
                        (this.defaultStrategy = e),
                        (this.strategiesByRecord = new Map()),
                        (this.strategiesByPattern = new Map());
                }
                return (
                    (i.prototype.setMergeStrategyByName = function (t, e) {
                        this.strategiesByRecord.set(t, e);
                    }),
                    (i.prototype.setMergeStrategyByPattern = function (t, e) {
                        this.strategiesByPattern.set(t, e);
                    }),
                    (i.prototype.merge = function (t, e, r, n, o) {
                        var s,
                            c,
                            a = t.name,
                            l = this.strategiesByRecord.get(a);
                        if (l) {
                            l(r, e, t.parsedData, t.version, function (L, pt) {
                                n.call(o, L, t, pt, e, r);
                            });
                            return;
                        }
                        try {
                            for (var h = Il(this.strategiesByPattern), E = h.next(); !E.done; E = h.next()) {
                                var N = vl(E.value, 2),
                                    O = N[0],
                                    B = N[1];
                                if (O.test(a)) {
                                    B(r, e, t.parsedData, t.version, function (L, pt) {
                                        n.call(o, L, t, pt, e, r);
                                    });
                                    return;
                                }
                            }
                        } catch (L) {
                            s = { error: L };
                        } finally {
                            try {
                                E && !E.done && (c = h.return) && c.call(h);
                            } finally {
                                if (s) throw s.error;
                            }
                        }
                        if (this.defaultStrategy) {
                            this.defaultStrategy(r, e, t.parsedData, t.version, function (L, pt) {
                                n.call(o, L, t, pt, e, r);
                            });
                            return;
                        }
                        this.services.logger.error({ topic: Js.TOPIC.RECORD }, Js.EVENT.RECORD_VERSION_EXISTS, {
                            remoteVersion: t.version,
                            recordName: a,
                        });
                    }),
                    i
                );
            })();
        zt.MergeStrategyService = bl;
    });
    var zs = R((Pt) => {
        "use strict";
        u();
        var Qs =
                (Pt && Pt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                },
            Cl =
                (Pt && Pt.__spread) ||
                function () {
                    for (var i = [], t = 0; t < arguments.length; t++) i = i.concat(Qs(arguments[t]));
                    return i;
                },
            ml =
                (Pt && Pt.__values) ||
                function (i) {
                    var t = typeof Symbol == "function" && Symbol.iterator,
                        e = t && i[t],
                        r = 0;
                    if (e) return e.call(i);
                    if (i && typeof i.length == "number")
                        return {
                            next: function () {
                                return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
                            },
                        };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
                };
        Object.defineProperty(Pt, "__esModule", { value: !0 });
        Pt.RecordHandler = void 0;
        var rn = Bt(),
            v = F(),
            gl = Vs(),
            Al = en(),
            Dl = Fs(),
            wl = Gs(),
            Pl = Xr(),
            $s = qs(),
            Ul = Ws(),
            Ll = Ys(),
            Ml = Ks(),
            Bl = Ze(),
            kl = (function () {
                function i(t, e, r, n) {
                    var o;
                    n === void 0 && (n = new Pl.Listener(v.TOPIC.RECORD, t)),
                        (this.services = t),
                        (this.options = e),
                        (this.listener = n),
                        (this.recordCores = new Map()),
                        (this.notifyCallbacks = new Map()),
                        (this.recordServices = r || {
                            bulkSubscriptionService:
                                ((o = {}),
                                (o[v.RECORD_ACTION.SUBSCRIBECREATEANDREAD] = this.getBulkSubscriptionService(
                                    v.RECORD_ACTION.SUBSCRIBECREATEANDREAD
                                )),
                                (o[v.RECORD_ACTION.SUBSCRIBEANDREAD] = this.getBulkSubscriptionService(
                                    v.RECORD_ACTION.SUBSCRIBEANDREAD
                                )),
                                (o[v.RECORD_ACTION.SUBSCRIBEANDHEAD] = this.getBulkSubscriptionService(
                                    v.RECORD_ACTION.SUBSCRIBEANDHEAD
                                )),
                                o),
                            writeAckService: new Ul.WriteAcknowledgementService(t),
                            readRegistry: new $s.SingleNotifier(t, v.RECORD_ACTION.READ, e.recordReadTimeout),
                            headRegistry: new $s.SingleNotifier(t, v.RECORD_ACTION.HEAD, e.recordReadTimeout),
                            dirtyService: new Ll.DirtyService(t.storage, e.dirtyStorageName),
                            mergeStrategy: new Ml.MergeStrategyService(t, e.mergeStrategy),
                        }),
                        (this.dirtyService = this.recordServices.dirtyService),
                        (this.sendUpdatedData = this.sendUpdatedData.bind(this)),
                        (this.onMergeCompleted = this.onMergeCompleted.bind(this)),
                        (this.getRecordCore = this.getRecordCore.bind(this)),
                        (this.removeRecord = this.removeRecord.bind(this)),
                        (this.onBulkSubscriptionSent = this.onBulkSubscriptionSent.bind(this)),
                        this.services.connection.registerHandler(v.TOPIC.RECORD, this.handle.bind(this)),
                        this.services.connection.onReestablished(this.syncDirtyRecords.bind(this)),
                        this.services.connection.isConnected && this.syncDirtyRecords();
                }
                return (
                    (i.prototype.names = function () {
                        return Cl(this.recordCores.keys());
                    }),
                    (i.prototype.setMergeStrategy = function (t, e) {
                        if (typeof e == "function") this.recordServices.mergeStrategy.setMergeStrategyByName(t, e);
                        else throw new Error("Invalid merge strategy: Must be a Function");
                    }),
                    (i.prototype.setMergeStrategyRegExp = function (t, e) {
                        if (typeof e == "function") this.recordServices.mergeStrategy.setMergeStrategyByPattern(t, e);
                        else throw new Error("Invalid merge strategy: Must be a Function");
                    }),
                    (i.prototype.getRecord = function (t) {
                        return new Al.Record(this.getRecordCore(t));
                    }),
                    (i.prototype.getList = function (t) {
                        return new wl.List(this.getRecordCore(t));
                    }),
                    (i.prototype.getAnonymousRecord = function () {
                        return new Dl.AnonymousRecord(this.getRecordCore);
                    }),
                    (i.prototype.listen = function (t, e) {
                        this.listener.listen(t, e);
                    }),
                    (i.prototype.unlisten = function (t) {
                        this.listener.unlisten(t);
                    }),
                    (i.prototype.snapshot = function (t, e) {
                        var r = this;
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument: name");
                        if (e !== void 0 && typeof e != "function") throw new Error("invalid argument: callback");
                        var n = this.recordCores.get(t);
                        if (n) {
                            if (e)
                                n.whenReady(null, function () {
                                    e(null, n.get());
                                });
                            else
                                return new Promise(function (o, s) {
                                    n.whenReady(null, function () {
                                        o(n.get());
                                    });
                                });
                            return;
                        }
                        if (e) this.recordServices.readRegistry.request(t, e);
                        else
                            return new Promise(function (o, s) {
                                r.recordServices.readRegistry.request(t, function (c, a) {
                                    return c ? s(c) : o(a);
                                });
                            });
                    }),
                    (i.prototype.has = function (t, e) {
                        var r = this;
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument: name");
                        if (e !== void 0 && typeof e != "function") throw new Error("invalid argument: callback");
                        var n;
                        if (!e)
                            return new Promise(function (o, s) {
                                (n = function (c, a) {
                                    return c ? s(c) : o(a !== -1);
                                }),
                                    r.head(t, n);
                            });
                        (n = function (o, s) {
                            return o ? e(o, null) : e(null, s !== -1);
                        }),
                            this.head(t, n);
                    }),
                    (i.prototype.head = function (t, e) {
                        var r = this;
                        if (typeof t != "string" || t.length === 0) throw new Error("invalid argument: name");
                        if (e !== void 0 && typeof e != "function") throw new Error("invalid argument: callback");
                        var n = this.recordCores.get(t);
                        if (n) {
                            if (e)
                                n.whenReady(null, function () {
                                    e(null, n.version);
                                });
                            else
                                return new Promise(function (o, s) {
                                    n.whenReady(null, function () {
                                        o(n.version);
                                    });
                                });
                            return;
                        }
                        if (e) this.recordServices.headRegistry.request(t, e);
                        else
                            return new Promise(function (o, s) {
                                r.recordServices.headRegistry.request(t, function (c, a) {
                                    return c ? s(c) : o(a);
                                });
                            });
                    }),
                    (i.prototype.setDataWithAck = function (t) {
                        for (var e = this, r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
                        var o = rn.normalizeSetArguments(arguments, 1);
                        if (!o.callback)
                            return new Promise(function (s, c) {
                                (o.callback = function (a) {
                                    return a === null ? s() : c(a);
                                }),
                                    e.sendSetData(t, -1, o);
                            });
                        this.sendSetData(t, -1, o);
                    }),
                    (i.prototype.setData = function (t) {
                        var e = rn.normalizeSetArguments(arguments, 1);
                        this.sendSetData(t, -1, e);
                    }),
                    (i.prototype.delete = function (t, e) {
                        throw Error("Delete is not yet supported without use of a Record");
                    }),
                    (i.prototype.notify = function (t, e) {
                        var r = this;
                        if (!this.services.connection.isConnected) {
                            if (e) {
                                e(v.EVENT.CLIENT_OFFLINE);
                                return;
                            }
                            return new Promise(function (o, s) {
                                return s(v.EVENT.CLIENT_OFFLINE);
                            });
                        }
                        var n = rn.getUid();
                        if (
                            (this.services.connection.sendMessage({
                                topic: v.TOPIC.RECORD,
                                action: v.RECORD_ACTION.NOTIFY,
                                names: t,
                                correlationId: n,
                            }),
                            e)
                        )
                            this.notifyCallbacks.set(n, e);
                        else
                            return new Promise(function (o, s) {
                                r.notifyCallbacks.set(n, function (c) {
                                    return c ? s(c) : o();
                                });
                            });
                    }),
                    (i.prototype.sendSetData = function (t, e, r) {
                        var n = r.path,
                            o = r.data,
                            s = r.callback;
                        if (!t || typeof t != "string" || t.length === 0)
                            throw new Error("invalid argument: recordName must be an non empty string");
                        if (!n && (o === null || typeof o != "object"))
                            throw new Error("invalid argument: data must be an object when no path is provided");
                        var c = this.recordCores.get(t);
                        if (c) {
                            c.set({ path: n, data: o, callback: s });
                            return;
                        }
                        var a;
                        n
                            ? o === void 0
                                ? (a = v.RECORD_ACTION.ERASE)
                                : (a = v.RECORD_ACTION.CREATEANDPATCH)
                            : (a = v.RECORD_ACTION.CREATEANDUPDATE);
                        var l = { topic: v.TOPIC.RECORD, action: a, name: t, path: n, version: e, parsedData: o };
                        s ? this.recordServices.writeAckService.send(l, s) : this.services.connection.sendMessage(l);
                    }),
                    (i.prototype.saveToOfflineStorage = function () {
                        this.recordCores.forEach(function (t) {
                            return t.saveRecordToOffline();
                        });
                    }),
                    (i.prototype.clearOfflineStorage = function (t) {
                        var e = this;
                        if (t) this.services.storage.reset(t);
                        else
                            return new Promise(function (r, n) {
                                e.services.storage.reset(function (o) {
                                    return o ? n(o) : r();
                                });
                            });
                    }),
                    (i.prototype.handle = function (t) {
                        var e = this;
                        if (
                            (t.action === v.RECORD_ACTION.NOTIFY && t.isAck) ||
                            (t.isError && t.action === v.RECORD_ACTION.RECORD_NOTIFY_ERROR)
                        ) {
                            var r = this.notifyCallbacks.get(t.correlationId);
                            r
                                ? (r(t.data || null), this.notifyCallbacks.delete(t.correlationId))
                                : this.services.logger.error(t, v.RECORD_ACTION.NOTIFY);
                            return;
                        }
                        if (t.isAck) {
                            this.services.timeoutRegistry.remove(t);
                            return;
                        }
                        if (
                            t.action === v.RECORD_ACTION.SUBSCRIPTION_FOR_PATTERN_FOUND ||
                            t.action === v.RECORD_ACTION.SUBSCRIPTION_FOR_PATTERN_REMOVED ||
                            t.action === v.RECORD_ACTION.LISTEN ||
                            t.action === v.RECORD_ACTION.UNLISTEN
                        ) {
                            this.listener.handle(t);
                            return;
                        }
                        if (t.isWriteAck && t.action !== v.RECORD_ACTION.VERSION_EXISTS) {
                            this.recordServices.writeAckService.recieve(t);
                            return;
                        }
                        if (t.action === v.RECORD_ACTION.READ_RESPONSE || t.originalAction === v.RECORD_ACTION.READ) {
                            t.isError
                                ? this.recordServices.readRegistry.recieve(t, v.RECORD_ACTION[t.action])
                                : this.recordServices.readRegistry.recieve(t, null, t.parsedData);
                            return;
                        }
                        t.action === v.RECORD_ACTION.HEAD_RESPONSE_BULK &&
                            Object.keys(t.versions).forEach(function (o) {
                                e.recordServices.headRegistry.recieve(
                                    {
                                        topic: v.TOPIC.RECORD,
                                        action: v.RECORD_ACTION.HEAD_RESPONSE,
                                        originalAction: v.RECORD_ACTION.HEAD,
                                        name: o,
                                        version: t.versions[o],
                                    },
                                    null,
                                    t.versions[o]
                                );
                            }),
                            (t.action === v.RECORD_ACTION.HEAD_RESPONSE || t.originalAction === v.RECORD_ACTION.HEAD) &&
                                (t.isError
                                    ? this.recordServices.headRegistry.recieve(t, v.RECORD_ACTION[t.action])
                                    : this.recordServices.headRegistry.recieve(t, null, t.version));
                        var n = this.recordCores.get(t.name);
                        if (n) {
                            n.handle(t);
                            return;
                        }
                        if (
                            t.action !== v.RECORD_ACTION.VERSION_EXISTS &&
                            !(
                                t.action === v.RECORD_ACTION.SUBSCRIPTION_HAS_PROVIDER ||
                                t.action === v.RECORD_ACTION.SUBSCRIPTION_HAS_NO_PROVIDER
                            )
                        ) {
                            if (t.isError) {
                                this.services.logger.error(t);
                                return;
                            }
                            this.services.logger.error(t, v.EVENT.UNSOLICITED_MESSAGE);
                        }
                    }),
                    (i.prototype.removeRecord = function (t) {
                        this.recordCores.delete(t);
                    }),
                    (i.prototype.getRecordCore = function (t) {
                        var e = this.recordCores.get(t);
                        return (
                            e ||
                                ((e = new gl.RecordCore(
                                    t,
                                    this.services,
                                    this.options,
                                    this.recordServices,
                                    this.removeRecord
                                )),
                                this.recordCores.set(t, e)),
                            e
                        );
                    }),
                    (i.prototype.syncDirtyRecords = function () {
                        this.dirtyService.whenLoaded(this, this._syncDirtyRecords);
                    }),
                    (i.prototype._syncDirtyRecords = function () {
                        var t,
                            e,
                            r = this.dirtyService.getAll();
                        try {
                            for (var n = ml(r), o = n.next(); !o.done; o = n.next()) {
                                var s = Qs(o.value, 1),
                                    c = s[0],
                                    a = this.recordCores.get(c);
                                (a && a.references.size > 0) || this.services.storage.get(c, this.sendUpdatedData);
                            }
                        } catch (l) {
                            t = { error: l };
                        } finally {
                            try {
                                o && !o.done && (e = n.return) && e.call(n);
                            } finally {
                                if (t) throw t.error;
                            }
                        }
                    }),
                    (i.prototype.sendUpdatedData = function (t, e, r) {
                        var n = this;
                        if (e === -1) {
                            this.services.logger.warn(
                                { topic: v.TOPIC.RECORD },
                                v.RECORD_ACTION.DELETE,
                                "Deleted record while offline, can't resolve"
                            );
                            return;
                        }
                        var o = function (s, c) {
                            s
                                ? n.recordServices.readRegistry.register(c, n, function (a) {
                                      n.recordServices.mergeStrategy.merge(a, e, r, n.onMergeCompleted, n);
                                  })
                                : n.dirtyService.setDirty(c, !1);
                        };
                        this.sendSetData(t, e, { data: r, callback: o });
                    }),
                    (i.prototype.onMergeCompleted = function (t, e, r) {
                        var n = e.name,
                            o = e.version;
                        this.sendSetData(n, o + 1, { data: r });
                    }),
                    (i.prototype.getBulkSubscriptionService = function (t) {
                        return new Bl.BulkSubscriptionService(
                            this.services,
                            this.options.subscriptionInterval,
                            v.TOPIC.RECORD,
                            t,
                            v.RECORD_ACTION.UNSUBSCRIBE,
                            this.onBulkSubscriptionSent
                        );
                    }),
                    (i.prototype.onBulkSubscriptionSent = function (t) {
                        t.names || this.services.timeoutRegistry.add({ message: t });
                    }),
                    i
                );
            })();
        Pt.RecordHandler = kl;
    });
    var Xs = R((er) => {
        "use strict";
        u();
        Object.defineProperty(er, "__esModule", { value: !0 });
        er.PresenceHandler = void 0;
        var U = F(),
            tr = gt(),
            xl = Ze(),
            Rt = "OE";
        function jl(i) {
            var t = null,
                e = null;
            if (i.length === 1)
                if (Array.isArray(i[0])) t = i[0];
                else {
                    if (typeof i[0] != "function") throw new Error('invalid argument: "callback"');
                    e = i[0];
                }
            else if (i.length === 2 && ((t = i[0]), (e = i[1]), !Array.isArray(t) || typeof e != "function"))
                throw new Error('invalid argument: "users" or "callback"');
            return { users: t, callback: e };
        }
        var Vl = (function () {
            function i(t, e) {
                (this.services = t),
                    (this.globalSubscriptionEmitter = new tr.Emitter()),
                    (this.subscriptionEmitter = new tr.Emitter()),
                    (this.queryEmitter = new tr.Emitter()),
                    (this.queryAllEmitter = new tr.Emitter()),
                    (this.counter = 0),
                    (this.limboQueue = []),
                    (this.bulkSubscription = new xl.BulkSubscriptionService(
                        this.services,
                        e.subscriptionInterval,
                        U.TOPIC.PRESENCE,
                        U.PRESENCE_ACTION.SUBSCRIBE,
                        U.PRESENCE_ACTION.UNSUBSCRIBE,
                        this.onBulkSubscriptionSent.bind(this)
                    )),
                    this.services.connection.registerHandler(U.TOPIC.PRESENCE, this.handle.bind(this)),
                    this.services.connection.onExitLimbo(this.onExitLimbo.bind(this)),
                    this.services.connection.onLost(this.onExitLimbo.bind(this)),
                    this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
            }
            return (
                (i.prototype.subscribe = function (t, e) {
                    if (typeof t == "string" && t.length > 0 && typeof e == "function") {
                        var r = t;
                        this.subscriptionEmitter.hasListeners(r) || this.bulkSubscription.subscribe(r),
                            this.subscriptionEmitter.on(r, e);
                        return;
                    }
                    if (typeof t == "function" && typeof e == "undefined") {
                        this.globalSubscriptionEmitter.hasListeners(Rt) || this.subscribeToAllChanges(),
                            this.globalSubscriptionEmitter.on(Rt, t);
                        return;
                    }
                    throw new Error('invalid arguments: "user" or "callback"');
                }),
                (i.prototype.unsubscribe = function (t, e) {
                    if (t && typeof t == "string" && t.length > 0) {
                        var r = t;
                        if (e) {
                            if (typeof e != "function") throw new Error('invalid argument: "callback"');
                            this.subscriptionEmitter.off(r, e);
                        } else this.subscriptionEmitter.off(r);
                        if (!this.subscriptionEmitter.hasListeners(r)) {
                            this.bulkSubscription.unsubscribe(r);
                            return;
                        }
                    }
                    if (t && typeof t == "function") {
                        (e = t),
                            this.globalSubscriptionEmitter.off(Rt, e),
                            this.globalSubscriptionEmitter.hasListeners(Rt) || this.unsubscribeToAllChanges();
                        return;
                    }
                    if (typeof t == "undefined" && typeof e == "undefined") {
                        this.subscriptionEmitter.off(),
                            this.globalSubscriptionEmitter.off(),
                            this.bulkSubscription.unsubscribeList(this.subscriptionEmitter.eventNames()),
                            this.unsubscribeToAllChanges();
                        return;
                    }
                    throw new Error('invalid argument: "user" or "callback"');
                }),
                (i.prototype.getAll = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    var r = jl(t),
                        n = r.callback,
                        o = r.users,
                        s,
                        c,
                        a;
                    if (o) {
                        var l = (this.counter++).toString();
                        (s = { topic: U.TOPIC.PRESENCE, action: U.PRESENCE_ACTION.QUERY, correlationId: l, names: o }),
                            (c = this.queryEmitter),
                            (a = l);
                    } else
                        (s = { topic: U.TOPIC.PRESENCE, action: U.PRESENCE_ACTION.QUERY_ALL }),
                            (c = this.queryAllEmitter),
                            (a = Rt);
                    if (
                        (this.services.connection.isConnected
                            ? this.sendQuery(s)
                            : this.services.connection.isInLimbo
                            ? this.limboQueue.push(s)
                            : this.services.timerRegistry.requestIdleCallback(function () {
                                  c.emit(a, U.EVENT.CLIENT_OFFLINE);
                              }),
                        n)
                    ) {
                        c.once(a, n);
                        return;
                    }
                    return new Promise(function (h, E) {
                        c.once(a, function (N, O) {
                            return N ? E(N) : h(O);
                        });
                    });
                }),
                (i.prototype.handle = function (t) {
                    if (t.isAck) {
                        this.services.timeoutRegistry.remove(t);
                        return;
                    }
                    if (t.action === U.PRESENCE_ACTION.QUERY_ALL_RESPONSE) {
                        this.queryAllEmitter.emit(Rt, null, t.names), this.services.timeoutRegistry.remove(t);
                        return;
                    }
                    if (t.action === U.PRESENCE_ACTION.QUERY_RESPONSE) {
                        this.queryEmitter.emit(t.correlationId, null, t.parsedData),
                            this.services.timeoutRegistry.remove(t);
                        return;
                    }
                    if (t.action === U.PRESENCE_ACTION.PRESENCE_JOIN) {
                        this.subscriptionEmitter.emit(t.name, t.name, !0);
                        return;
                    }
                    if (t.action === U.PRESENCE_ACTION.PRESENCE_JOIN_ALL) {
                        this.globalSubscriptionEmitter.emit(Rt, t.name, !0);
                        return;
                    }
                    if (t.action === U.PRESENCE_ACTION.PRESENCE_LEAVE) {
                        this.subscriptionEmitter.emit(t.name, t.name, !1);
                        return;
                    }
                    if (t.action === U.PRESENCE_ACTION.PRESENCE_LEAVE_ALL) {
                        this.globalSubscriptionEmitter.emit(Rt, t.name, !1);
                        return;
                    }
                    if (t.isError) {
                        this.services.timeoutRegistry.remove(t),
                            t.originalAction === U.PRESENCE_ACTION.QUERY
                                ? this.queryEmitter.emit(t.correlationId, U.PRESENCE_ACTION[t.action])
                                : t.originalAction === U.PRESENCE_ACTION.QUERY_ALL
                                ? this.queryAllEmitter.emit(Rt, U.PRESENCE_ACTION[t.action])
                                : this.services.logger.error(t);
                        return;
                    }
                    this.services.logger.error(t, U.EVENT.UNSOLICITED_MESSAGE);
                }),
                (i.prototype.sendQuery = function (t) {
                    this.services.connection.sendMessage(t), this.services.timeoutRegistry.add({ message: t });
                }),
                (i.prototype.subscribeToAllChanges = function () {
                    if (!!this.services.connection.isConnected) {
                        var t = { topic: U.TOPIC.PRESENCE, action: U.PRESENCE_ACTION.SUBSCRIBE_ALL };
                        this.services.timeoutRegistry.add({ message: t }), this.services.connection.sendMessage(t);
                    }
                }),
                (i.prototype.unsubscribeToAllChanges = function () {
                    if (!!this.services.connection.isConnected) {
                        var t = { topic: U.TOPIC.PRESENCE, action: U.PRESENCE_ACTION.UNSUBSCRIBE_ALL };
                        this.services.timeoutRegistry.add({ message: t }), this.services.connection.sendMessage(t);
                    }
                }),
                (i.prototype.onConnectionReestablished = function () {
                    var t = this.subscriptionEmitter.eventNames();
                    t.length > 0 && this.bulkSubscription.subscribeList(t);
                    var e = this.globalSubscriptionEmitter.hasListeners(Rt);
                    e && this.subscribeToAllChanges();
                    for (var r = 0; r < this.limboQueue.length; r++) this.sendQuery(this.limboQueue[r]);
                    this.limboQueue = [];
                }),
                (i.prototype.onExitLimbo = function () {
                    var t = this;
                    this.queryEmitter.eventNames().forEach(function (e) {
                        t.queryEmitter.emit(e, U.EVENT.CLIENT_OFFLINE);
                    }),
                        this.queryAllEmitter.emit(Rt, U.EVENT.CLIENT_OFFLINE),
                        (this.limboQueue = []),
                        this.queryAllEmitter.off(),
                        this.queryEmitter.off();
                }),
                (i.prototype.onBulkSubscriptionSent = function (t) {
                    this.services.timeoutRegistry.add({ message: t });
                }),
                i
            );
        })();
        er.PresenceHandler = Vl;
    });
    var Zs = R((Zt) => {
        "use strict";
        u();
        var Fl =
                (Zt && Zt.__values) ||
                function (i) {
                    var t = typeof Symbol == "function" && Symbol.iterator,
                        e = t && i[t],
                        r = 0;
                    if (e) return e.call(i);
                    if (i && typeof i.length == "number")
                        return {
                            next: function () {
                                return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
                            },
                        };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
                },
            Hl =
                (Zt && Zt.__read) ||
                function (i, t) {
                    var e = typeof Symbol == "function" && i[Symbol.iterator];
                    if (!e) return i;
                    var r = e.call(i),
                        n,
                        o = [],
                        s;
                    try {
                        for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) o.push(n.value);
                    } catch (c) {
                        s = { error: c };
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    return o;
                };
        Object.defineProperty(Zt, "__esModule", { value: !0 });
        Zt.Storage = void 0;
        var Xt;
        (function (i) {
            (i[(i.GET = 0)] = "GET"), (i[(i.SET = 1)] = "SET"), (i[(i.DELETE = 2)] = "DELETE");
        })(Xt || (Xt = {}));
        var Gl = (function () {
            function i(t) {
                var e = this;
                if (
                    ((this.options = t),
                    (this.isReady = !1),
                    (this.queuedRequests = new Map()),
                    (this.flushTimeout = null),
                    typeof indexedDB == "undefined" || indexedDB === null)
                )
                    throw new Error("IndexDB currently not supported when deepstream in node");
                this.flush = this.flush.bind(this);
                var r = t.indexdb,
                    n = r.objectStoreNames,
                    o = r.storageDatabaseName,
                    s = r.defaultObjectStoreName,
                    c = r.primaryKey;
                n.includes(s) || n.push(s);
                var a = t.indexdb.dbVersion;
                if (t.indexdb.autoVersion) {
                    var l = localStorage.getItem("deepstream-db/" + o);
                    if (l) {
                        var h = JSON.parse(l),
                            E =
                                h.objectStoreNames.length !== n.length ||
                                h.objectStoreNames.some(function (O) {
                                    return !n.includes(O);
                                });
                        E ? (a = h.dbVersion + 1) : (a = h.dbVersion);
                    } else a = 1;
                }
                var N = indexedDB.open(o, a);
                (N.onerror = function (O) {
                    console.error("Error opening index " + o, O);
                }),
                    (N.onsuccess = function (O) {
                        (e.db = O.target.result), e.onReady();
                    }),
                    (N.onupgradeneeded = function () {
                        var O = N.result;
                        n.forEach(function (L) {
                            O.objectStoreNames.contains(L) || O.createObjectStore(L, { keyPath: c });
                        });
                        for (var B = 0; B < O.objectStoreNames.length; B++)
                            n.includes(O.objectStoreNames[B]) === !1 && O.deleteObjectStore(O.objectStoreNames[B]);
                        t.indexdb.autoVersion &&
                            localStorage.setItem(
                                "deepstream-db/" + o,
                                JSON.stringify({ dbVersion: a, objectStoreNames: n })
                            );
                    });
            }
            return (
                (i.prototype.get = function (t, e) {
                    var r = this.options.indexdb.ignorePrefixes.some(function (n) {
                        return t.startsWith(n);
                    });
                    if (r) {
                        e(t, -1, null);
                        return;
                    }
                    this.insertRequest({ recordName: t, callback: e, operation: Xt.GET });
                }),
                (i.prototype.set = function (t, e, r, n) {
                    var o = this.options.indexdb.ignorePrefixes.some(function (s) {
                        return t.startsWith(s);
                    });
                    if (o) {
                        n(null, t);
                        return;
                    }
                    this.insertRequest({ recordName: t, version: e, callback: n, data: r, operation: Xt.SET });
                }),
                (i.prototype.delete = function (t, e) {
                    var r = this.options.indexdb.ignorePrefixes.some(function (n) {
                        return t.startsWith(n);
                    });
                    if (r) {
                        e(null, t);
                        return;
                    }
                    this.insertRequest({ recordName: t, callback: e, operation: Xt.DELETE });
                }),
                (i.prototype.reset = function (t) {
                    var e = this;
                    this.db && (this.db.close(), (this.db = null));
                    var r = indexedDB.deleteDatabase(this.options.indexdb.storageDatabaseName);
                    (r.onblocked = function () {
                        return setTimeout(function () {
                            return e.reset(t);
                        }, 1e3);
                    }),
                        (r.onsuccess = function () {
                            return t(null);
                        }),
                        (r.onerror = function (n) {
                            var o = "Error deleting database " + e.options.indexdb.storageDatabaseName;
                            console.error(o, n), t(o);
                        });
                }),
                (i.prototype.registerFlush = function () {
                    this.isReady &&
                        !this.flushTimeout &&
                        (this.flushTimeout = setTimeout(this.flush, this.options.indexdb.flushTimeout));
                }),
                (i.prototype.flush = function () {
                    var t,
                        e,
                        r = this,
                        n = this.db.transaction(this.queuedRequests.keys(), "readwrite"),
                        o = function (E, N) {
                            var O = n.objectStore(E);
                            N.forEach(function (B) {
                                var L,
                                    pt = B.operation,
                                    Tt = B.recordName,
                                    _ = B.version,
                                    T = B.data,
                                    b = B.callback;
                                switch (pt) {
                                    case Xt.GET: {
                                        var m = O.get(Tt);
                                        (m.onerror = function (It) {
                                            throw new Error("Requesting record " + Tt + " failed");
                                        }),
                                            (m.onsuccess = function () {
                                                m.result ? b(Tt, m.result.version, m.result.data) : b(Tt, -1, null);
                                            });
                                        break;
                                    }
                                    case Xt.DELETE: {
                                        var x = O.delete(Tt);
                                        (x.onsuccess = function () {
                                            return b(null);
                                        }),
                                            (x.onerror = function (It) {
                                                return b(It.errorCode);
                                            });
                                        break;
                                    }
                                    case Xt.SET: {
                                        var x = O.put(
                                            ((L = {}),
                                            (L[r.options.indexdb.primaryKey] = Tt),
                                            (L.version = _),
                                            (L.data = T),
                                            L)
                                        );
                                        (x.onsuccess = function () {
                                            return b(null);
                                        }),
                                            (x.onerror = function (at) {
                                                return b(at.errorCode);
                                            });
                                        break;
                                    }
                                }
                            });
                        };
                    try {
                        for (var s = Fl(this.queuedRequests), c = s.next(); !c.done; c = s.next()) {
                            var a = Hl(c.value, 2),
                                l = a[0],
                                h = a[1];
                            o(l, h);
                        }
                    } catch (E) {
                        t = { error: E };
                    } finally {
                        try {
                            c && !c.done && (e = s.return) && e.call(s);
                        } finally {
                            if (t) throw t.error;
                        }
                    }
                    this.queuedRequests.clear(), (this.flushTimeout = null);
                }),
                (i.prototype.onReady = function () {
                    (this.isReady = !0), this.flush();
                }),
                (i.prototype.insertRequest = function (t) {
                    var e = t.recordName.indexOf("/"),
                        r;
                    e > -1
                        ? ((r = t.recordName.substring(0, e)),
                          this.options.indexdb.objectStoreNames.indexOf(r) === -1
                              ? (console.error(
                                    "Object store names need to be predefined, missing " +
                                        r +
                                        ". Using default objectStore instead."
                                ),
                                (r = this.options.indexdb.defaultObjectStoreName))
                              : (t.recordName = t.recordName.substring(e + 1, t.recordName.length)))
                        : (r = this.options.indexdb.defaultObjectStoreName);
                    var n = this.queuedRequests.get(r);
                    n === void 0 ? this.queuedRequests.set(r, [t]) : n.push(t), this.registerFlush();
                }),
                i
            );
        })();
        Zt.Storage = Gl;
    });
    var tc = R((ir) => {
        "use strict";
        u();
        Object.defineProperty(ir, "__esModule", { value: !0 });
        ir.NoopStorage = void 0;
        var ql = (function () {
            function i() {
                this.isReady = !0;
            }
            return (
                (i.prototype.get = function (t, e) {
                    setTimeout(e.bind(this, t, -1, null), 0);
                }),
                (i.prototype.set = function (t, e, r, n) {
                    setTimeout(n, 0);
                }),
                (i.prototype.delete = function (t, e) {
                    setTimeout(e, 0);
                }),
                (i.prototype.reset = function (t) {
                    t(null);
                }),
                i
            );
        })();
        ir.NoopStorage = ql;
    });
    var ic = R((dt) => {
        "use strict";
        u();
        var Wl =
                (dt && dt.__extends) ||
                (function () {
                    var i = function (t, e) {
                        return (
                            (i =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (r, n) {
                                        r.__proto__ = n;
                                    }) ||
                                function (r, n) {
                                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
                                }),
                            i(t, e)
                        );
                    };
                    return function (t, e) {
                        i(t, e);
                        function r() {
                            this.constructor = t;
                        }
                        t.prototype = e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
                    };
                })(),
            rr =
                (dt && dt.__assign) ||
                function () {
                    return (
                        (rr =
                            Object.assign ||
                            function (i) {
                                for (var t, e = 1, r = arguments.length; e < r; e++) {
                                    t = arguments[e];
                                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
                                }
                                return i;
                            }),
                        rr.apply(this, arguments)
                    );
                };
        Object.defineProperty(dt, "__esModule", { value: !0 });
        dt.DefaultOptions = dt.C = dt.DeepstreamClient = void 0;
        var ec = io();
        Object.defineProperty(dt, "DefaultOptions", {
            enumerable: !0,
            get: function () {
                return ec.DefaultOptions;
            },
        });
        var Yl = F();
        dt.C = Yl;
        var Jl = _o(),
            Kl = To(),
            $l = Io(),
            Ql = vo(),
            zl = Cs(),
            Xl = As(),
            Zl = ws(),
            th = Bs(),
            eh = zs(),
            ih = Xs(),
            rh = gt(),
            nh = Zs(),
            oh = tc(),
            sh = (function (i) {
                Wl(t, i);
                function t(e, r) {
                    r === void 0 && (r = {});
                    var n = i.call(this) || this;
                    n.options = rr(rr({}, ec.DefaultOptions), r);
                    var o = {};
                    return (
                        (o.logger = new Jl.Logger(n)),
                        r.nativeTimerRegistry
                            ? (o.timerRegistry = new Ql.NativeTimerRegistry())
                            : (o.timerRegistry = new $l.IntervalTimerRegistry(n.options.intervalTimerResolution)),
                        (o.timeoutRegistry = new Kl.TimeoutRegistry(o, n.options)),
                        (o.socketFactory = n.options.socketFactory || Xl.socketFactory),
                        (o.connection = new zl.Connection(o, n.options, e, n)),
                        n.options.offlineEnabled
                            ? (o.storage = n.options.storage || new nh.Storage(n.options))
                            : (o.storage = new oh.NoopStorage()),
                        (n.services = o),
                        n.services.connection.onLost(o.timeoutRegistry.onConnectionLost.bind(o.timeoutRegistry)),
                        (n.event = new Zl.EventHandler(n.services, n.options)),
                        (n.rpc = new th.RPCHandler(n.services, n.options)),
                        (n.record = new eh.RecordHandler(n.services, n.options)),
                        (n.presence = new ih.PresenceHandler(n.services, n.options)),
                        n
                    );
                }
                return (
                    (t.prototype.login = function (e, r) {
                        var n = this;
                        if (e && typeof e == "object")
                            if (r) this.services.connection.authenticate(e, r);
                            else
                                return new Promise(function (o, s) {
                                    n.services.connection.authenticate(e, function (c, a) {
                                        c ? o(a) : s(a);
                                    });
                                });
                        else if (typeof e == "function") this.services.connection.authenticate({}, e);
                        else
                            return new Promise(function (o, s) {
                                n.services.connection.authenticate({}, function (c, a) {
                                    c ? o(a) : s(a);
                                });
                            });
                    }),
                    (t.prototype.getConnectionState = function () {
                        return this.services.connection.getConnectionState();
                    }),
                    (t.prototype.close = function () {
                        var e = this;
                        Object.keys(this.services).forEach(function (r) {
                            e.services[r].close && e.services[r].close();
                        });
                    }),
                    (t.prototype.pause = function () {
                        this.services.connection.pause();
                    }),
                    (t.prototype.resume = function (e) {
                        var r = this;
                        if (e) {
                            this.services.connection.resume(e);
                            return;
                        }
                        return new Promise(function (n, o) {
                            r.services.connection.resume(function (s) {
                                s ? o(s) : n();
                            });
                        });
                    }),
                    (t.prototype.getUid = function () {
                        var e = new Date().getTime().toString(36),
                            r = (Math.random() * 1e16).toString(36).replace(".", "");
                        return e + "-" + r;
                    }),
                    t
                );
            })(rh.Emitter);
        dt.DeepstreamClient = sh;
    });
    var rc = R((te) => {
        "use strict";
        u();
        Object.defineProperty(te, "__esModule", { value: !0 });
        te.Options = te.C = te.DeepstreamClient = void 0;
        var nn = ic();
        Object.defineProperty(te, "DeepstreamClient", {
            enumerable: !0,
            get: function () {
                return nn.DeepstreamClient;
            },
        });
        Object.defineProperty(te, "C", {
            enumerable: !0,
            get: function () {
                return nn.C;
            },
        });
        Object.defineProperty(te, "Options", {
            enumerable: !0,
            get: function () {
                return nn.DefaultOptions;
            },
        });
    });
    u();
    u();
    var Zn = "0.13.3";
    u();
    var Th = Ye("log", "party-debug", "background-color: #888; color: #fff; padding: 2px 5px; border-radius: 2px"),
        Z = Ye("log", "party-log", "background-color: #88F; color: #00ffff; padding: 2px 5px; border-radius: 2px"),
        to = Ye("log", "party-alert", "background-color: #FF0; color: #000; padding: 2px 5px; border-radius: 2px"),
        st = Ye("warn", "party-warn", "background-color: #FF0; color: #000; padding: 2px 5px; border-radius: 2px"),
        M = Ye(
            "error",
            "party-error",
            "background-color: #ff0000; color: #ffffff; padding: 2px 5px; border-radius: 2px"
        );
    function Ye(i, t, e) {
        return console[i].bind(window.console, `%c${t}`, e);
    }
    var wr = console.log.bind(
        window.console,
        "%cparty-log%c %c%s",
        "background-color: #88F; color: #00ffff; padding: 2px 5px; border-radius: 2px",
        "background: none;"
    );
    u();
    var dc = _r(rc());
    u();
    u();
    function ch(i) {
        for (var t = [], e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
        var r = Array.from(typeof i == "string" ? [i] : i);
        r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, "");
        var n = r.reduce(function (c, a) {
            var l = a.match(/\n([\t ]+|(?!\s).)/g);
            return l
                ? c.concat(
                      l.map(function (h) {
                          var E, N;
                          return (N = (E = h.match(/[\t ]/g)) === null || E === void 0 ? void 0 : E.length) !== null &&
                              N !== void 0
                              ? N
                              : 0;
                      })
                  )
                : c;
        }, []);
        if (n.length) {
            var o = new RegExp(
                `
[	 ]{` +
                    Math.min.apply(Math, n) +
                    "}",
                "g"
            );
            r = r.map(function (c) {
                return c.replace(
                    o,
                    `
`
                );
            });
        }
        r[0] = r[0].replace(/^\r?\n/, "");
        var s = r[0];
        return (
            t.forEach(function (c, a) {
                var l = s.match(/(?:^|\n)( *)$/),
                    h = l ? l[1] : "",
                    E = c;
                typeof c == "string" &&
                    c.includes(`
`) &&
                    (E = String(c)
                        .split(
                            `
`
                        )
                        .map(function (N, O) {
                            return O === 0 ? N : "" + h + N;
                        }).join(`
`)),
                    (s += E + r[a + 1]);
            }),
            s
        );
    }
    var on = ch;
    var cn = _r(F()),
        ah = _r(en());
    function ei(i, t = "unknown") {
        let e = sn(i, "");
        if (!e) {
            let r = "";
            kt &&
                (r = `
"${t}${kt.path}" ${kt.message}`),
                st(`User provided data is not JSON serializable.${r}`);
        }
        return e;
    }
    function nr(i, t) {
        return typeof i != "object" ? (st("User provided data is not an object."), !1) : ei(i, t);
    }
    function or(i) {
        return typeof i != "object" ? !1 : Object.keys(i).length === 0;
    }
    function nc(i) {
        return typeof i != "undefined";
    }
    var kt;
    function sn(i, t = "") {
        if (((kt = null), ["string", "number", "boolean"].includes(typeof i) || i === null)) return !0;
        if (Array.isArray(i)) {
            for (let [e, r] of Object.entries(i)) if (!sn(r, `${t}[${e}]`)) return !1;
            return !0;
        }
        if (typeof i == "object" && i.constructor === Object) {
            for (let [e, r] of Object.entries(i)) if (!sn(r, `${t}.${e}`)) return !1;
            return !0;
        }
        return typeof i == "function"
            ? ((kt = { path: t, message: "is a function. Functions are not allowed." }), !1)
            : typeof i == "symbol"
            ? ((kt = { path: t, message: "is a symbol. Symbols are not allowed." }), !1)
            : typeof i == "object" && nc(window.p5) && i.constructor === window.p5.Color
            ? ((kt = {
                  path: t,
                  message: on`is a p5.Color. p5.Colors are not allowed.

        You can't share p5.Colors with p5.party.

        In many cases you can convert a p5.Color to a string and share that.
        const c = color(255, 0, 0);
        shared.color = c.toString();
    `,
              }),
              !1)
            : typeof i == "object" && nc(window.p5) && i.constructor === window.p5.Vector
            ? ((kt = {
                  path: t,
                  message: on`is a p5.Vector. p5.Vector are not allowed.

        You can't share p5.Vector with p5.party.

        In some cases you can unpack just the x, y, and z values and share those.
        const v = createVector(1, 2);
        shared.pos = {x: v.x, y: v.y};
    `,
              }),
              !1)
            : typeof i == "object" || typeof i == "undefined"
            ? !0
            : ((kt = { path: t, message: "is an unknown type. p5.party doesn't know what to do with it." }), !1);
    }
    u();
    u();
    u();
    var Be = ".",
        ii = Symbol("target"),
        an = Symbol("unsubscribe");
    u();
    function ri(i) {
        return (
            i instanceof Date ||
            i instanceof Set ||
            i instanceof Map ||
            i instanceof WeakSet ||
            i instanceof WeakMap ||
            ArrayBuffer.isView(i)
        );
    }
    function oc(i) {
        return (typeof i == "object" ? i === null : typeof i != "function") || i instanceof RegExp;
    }
    u();
    u();
    var ct = Array.isArray;
    u();
    function pe(i) {
        return typeof i == "symbol";
    }
    var uh = {
            after: (i, t) => (ct(i) ? i.slice(t.length) : t === "" ? i : i.slice(t.length + 1)),
            concat: (i, t) =>
                ct(i)
                    ? ((i = [...i]), t && i.push(t), i)
                    : t && t.toString !== void 0
                    ? (i !== "" && (i += Be), pe(t) ? i + t.toString() : i + t)
                    : i,
            initial: (i) => {
                if (ct(i)) return i.slice(0, -1);
                if (i === "") return i;
                let t = i.lastIndexOf(Be);
                return t === -1 ? "" : i.slice(0, t);
            },
            last: (i) => {
                if (ct(i)) return i[i.length - 1] || "";
                if (i === "") return i;
                let t = i.lastIndexOf(Be);
                return t === -1 ? i : i.slice(t + 1);
            },
            walk: (i, t) => {
                if (ct(i)) for (let e of i) t(e);
                else if (i !== "") {
                    let e = 0,
                        r = i.indexOf(Be);
                    if (r === -1) t(i);
                    else
                        for (; e < i.length; )
                            r === -1 && (r = i.length), t(i.slice(e, r)), (e = r + 1), (r = i.indexOf(Be, e));
                }
            },
            get(i, t) {
                return (
                    this.walk(t, (e) => {
                        i && (i = i[e]);
                    }),
                    i
                );
            },
        },
        et = uh;
    u();
    function un(i) {
        return typeof i == "object" && typeof i.next == "function";
    }
    u();
    function ln(i, t, e, r, n) {
        let o = i.next;
        if (t.name === "entries")
            i.next = function () {
                let s = o.call(this);
                return (
                    s.done === !1 &&
                        ((s.value[0] = n(s.value[0], t, s.value[0], r)),
                        (s.value[1] = n(s.value[1], t, s.value[0], r))),
                    s
                );
            };
        else if (t.name === "values") {
            let s = e[ii].keys();
            i.next = function () {
                let c = o.call(this);
                return c.done === !1 && (c.value = n(c.value, t, s.next().value, r)), c;
            };
        } else
            i.next = function () {
                let s = o.call(this);
                return s.done === !1 && (s.value = n(s.value, t, s.value, r)), s;
            };
        return i;
    }
    u();
    function sr(i, t, e) {
        return (
            i.isUnsubscribed ||
            (t.ignoreSymbols && pe(e)) ||
            (t.ignoreUnderscores && e.charAt(0) === "_") ||
            ("ignoreKeys" in t && t.ignoreKeys.includes(e))
        );
    }
    u();
    var ni = class {
        constructor(t) {
            (this._equals = t),
                (this._proxyCache = new WeakMap()),
                (this._pathCache = new WeakMap()),
                (this.isUnsubscribed = !1);
        }
        _getDescriptorCache() {
            return this._descriptorCache === void 0 && (this._descriptorCache = new WeakMap()), this._descriptorCache;
        }
        _getProperties(t) {
            let e = this._getDescriptorCache(),
                r = e.get(t);
            return r === void 0 && ((r = {}), e.set(t, r)), r;
        }
        _getOwnPropertyDescriptor(t, e) {
            if (this.isUnsubscribed) return Reflect.getOwnPropertyDescriptor(t, e);
            let r = this._getProperties(t),
                n = r[e];
            return n === void 0 && ((n = Reflect.getOwnPropertyDescriptor(t, e)), (r[e] = n)), n;
        }
        getProxy(t, e, r, n) {
            if (this.isUnsubscribed) return t;
            let o = t[n],
                s = o || t;
            this._pathCache.set(s, e);
            let c = this._proxyCache.get(s);
            return c === void 0 && ((c = o === void 0 ? new Proxy(t, r) : t), this._proxyCache.set(s, c)), c;
        }
        getPath(t) {
            return this.isUnsubscribed ? void 0 : this._pathCache.get(t);
        }
        isDetached(t, e) {
            return !Object.is(t, et.get(e, this.getPath(t)));
        }
        defineProperty(t, e, r) {
            return Reflect.defineProperty(t, e, r) ? (this.isUnsubscribed || (this._getProperties(t)[e] = r), !0) : !1;
        }
        setProperty(t, e, r, n, o) {
            if (!this._equals(o, r) || !(e in t)) {
                let s = this._getOwnPropertyDescriptor(t, e);
                return s !== void 0 && "set" in s ? Reflect.set(t, e, r, n) : Reflect.set(t, e, r);
            }
            return !0;
        }
        deleteProperty(t, e, r) {
            if (Reflect.deleteProperty(t, e)) {
                if (!this.isUnsubscribed) {
                    let n = this._getDescriptorCache().get(t);
                    n && (delete n[e], this._pathCache.delete(r));
                }
                return !0;
            }
            return !1;
        }
        isSameDescriptor(t, e, r) {
            let n = this._getOwnPropertyDescriptor(e, r);
            return (
                t !== void 0 &&
                n !== void 0 &&
                Object.is(t.value, n.value) &&
                (t.writable || !1) === (n.writable || !1) &&
                (t.enumerable || !1) === (n.enumerable || !1) &&
                (t.configurable || !1) === (n.configurable || !1) &&
                t.get === n.get &&
                t.set === n.set
            );
        }
        isGetInvariant(t, e) {
            let r = this._getOwnPropertyDescriptor(t, e);
            return r !== void 0 && r.configurable !== !0 && r.writable !== !0;
        }
        unsubscribe() {
            (this._descriptorCache = null),
                (this._pathCache = null),
                (this._proxyCache = null),
                (this.isUnsubscribed = !0);
        }
    };
    u();
    u();
    function ke(i) {
        return toString.call(i) === "[object Object]";
    }
    u();
    u();
    u();
    function xe() {
        return !0;
    }
    u();
    function ee(i, t) {
        return i.length !== t.length || i.some((e, r) => t[r] !== e);
    }
    u();
    var cr = new Set([
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
    ]);
    var lh = new Set(["concat", "includes", "indexOf", "join", "keys", "lastIndexOf"]),
        hn = {
            push: xe,
            pop: xe,
            shift: xe,
            unshift: xe,
            copyWithin: ee,
            reverse: ee,
            sort: ee,
            splice: ee,
            flat: ee,
            fill: ee,
        },
        sc = new Set([...cr, ...lh, ...Object.keys(hn)]);
    u();
    u();
    function je(i, t) {
        if (i.size !== t.size) return !0;
        for (let e of i) if (!t.has(e)) return !0;
        return !1;
    }
    var fn = ["keys", "values", "entries"],
        dn = new Set(["has", "toString"]),
        pn = { add: je, clear: je, delete: je, forEach: je },
        cc = new Set([...dn, ...Object.keys(pn), ...fn]);
    u();
    u();
    function Ve(i, t) {
        if (i.size !== t.size) return !0;
        let e;
        for (let [r, n] of i) if (((e = t.get(r)), e !== n || (e === void 0 && !t.has(r)))) return !0;
        return !1;
    }
    var hh = new Set([...dn, "get"]),
        En = { set: Ve, clear: Ve, delete: Ve, forEach: Ve },
        ac = new Set([...hh, ...Object.keys(En), ...fn]);
    var K = class {
        constructor(t, e, r, n) {
            (this._path = e),
                (this._isChanged = !1),
                (this._clonedCache = new Set()),
                (this._hasOnValidate = n),
                (this._changes = n ? [] : null),
                (this.clone = e === void 0 ? t : this._shallowClone(t));
        }
        static isHandledMethod(t) {
            return cr.has(t);
        }
        _shallowClone(t) {
            let e = t;
            if (ke(t)) e = se({}, t);
            else if (ct(t) || ArrayBuffer.isView(t)) e = [...t];
            else if (t instanceof Date) e = new Date(t);
            else if (t instanceof Set) e = new Set([...t].map((r) => this._shallowClone(r)));
            else if (t instanceof Map) {
                e = new Map();
                for (let [r, n] of t.entries()) e.set(r, this._shallowClone(n));
            }
            return this._clonedCache.add(e), e;
        }
        preferredThisArg(t, e, r, n) {
            return t
                ? (ct(n)
                      ? (this._onIsChanged = hn[e])
                      : n instanceof Set
                      ? (this._onIsChanged = pn[e])
                      : n instanceof Map && (this._onIsChanged = En[e]),
                  n)
                : r;
        }
        update(t, e, r) {
            let n = et.after(t, this._path);
            if (e !== "length") {
                let o = this.clone;
                et.walk(n, (s) => {
                    o && o[s] && (this._clonedCache.has(o[s]) || (o[s] = this._shallowClone(o[s])), (o = o[s]));
                }),
                    this._hasOnValidate && this._changes.push({ path: n, property: e, previous: r }),
                    o && o[e] && (o[e] = r);
            }
            this._isChanged = !0;
        }
        undo(t) {
            let e;
            for (let r = this._changes.length - 1; r !== -1; r--)
                (e = this._changes[r]), (et.get(t, e.path)[e.property] = e.previous);
        }
        isChanged(t) {
            return this._onIsChanged === void 0 ? this._isChanged : this._onIsChanged(this.clone, t);
        }
    };
    u();
    var Fe = class extends K {
        static isHandledMethod(t) {
            return sc.has(t);
        }
    };
    u();
    var oi = class extends K {
        undo(t) {
            t.setTime(this.clone.getTime());
        }
        isChanged(t, e) {
            return !e(this.clone.valueOf(), t.valueOf());
        }
    };
    u();
    var He = class extends K {
        static isHandledMethod(t) {
            return cc.has(t);
        }
        undo(t) {
            for (let e of this.clone) t.add(e);
            for (let e of t) this.clone.has(e) || t.delete(e);
        }
    };
    u();
    var Ge = class extends K {
        static isHandledMethod(t) {
            return ac.has(t);
        }
        undo(t) {
            for (let [e, r] of this.clone.entries()) t.set(e, r);
            for (let e of t.keys()) this.clone.has(e) || t.delete(e);
        }
    };
    u();
    var si = class extends K {
        constructor(t, e, r, n) {
            super(void 0, e, r, n), (this._arg1 = r[0]), (this._weakValue = t.has(this._arg1));
        }
        isChanged(t) {
            return this._weakValue !== t.has(this._arg1);
        }
        undo(t) {
            this._weakValue && !t.has(this._arg1) ? t.add(this._arg1) : t.delete(this._arg1);
        }
    };
    u();
    var ci = class extends K {
        constructor(t, e, r, n) {
            super(void 0, e, r, n),
                (this._weakKey = r[0]),
                (this._weakHas = t.has(this._weakKey)),
                (this._weakValue = t.get(this._weakKey));
        }
        isChanged(t) {
            return this._weakValue !== t.get(this._weakKey);
        }
        undo(t) {
            let e = t.has(this._weakKey);
            this._weakHas && !e
                ? t.set(this._weakKey, this._weakValue)
                : !this._weakHas && e
                ? t.delete(this._weakKey)
                : this._weakValue !== t.get(this._weakKey) && t.set(this._weakKey, this._weakValue);
        }
    };
    var St = class {
        constructor(t) {
            (this._stack = []), (this._hasOnValidate = t);
        }
        static isHandledType(t) {
            return ke(t) || ct(t) || ri(t);
        }
        static isHandledMethod(t, e) {
            return ke(t)
                ? K.isHandledMethod(e)
                : ct(t)
                ? Fe.isHandledMethod(e)
                : t instanceof Set
                ? He.isHandledMethod(e)
                : t instanceof Map
                ? Ge.isHandledMethod(e)
                : ri(t);
        }
        get isCloning() {
            return this._stack.length > 0;
        }
        start(t, e, r) {
            let n = K;
            ct(t)
                ? (n = Fe)
                : t instanceof Date
                ? (n = oi)
                : t instanceof Set
                ? (n = He)
                : t instanceof Map
                ? (n = Ge)
                : t instanceof WeakSet
                ? (n = si)
                : t instanceof WeakMap && (n = ci),
                this._stack.push(new n(t, e, r, this._hasOnValidate));
        }
        update(t, e, r) {
            this._stack[this._stack.length - 1].update(t, e, r);
        }
        preferredThisArg(t, e, r) {
            let { name: n } = t,
                o = St.isHandledMethod(r, n);
            return this._stack[this._stack.length - 1].preferredThisArg(o, n, e, r);
        }
        isChanged(t, e, r) {
            return this._stack[this._stack.length - 1].isChanged(t, e, r);
        }
        undo(t) {
            this._previousClone !== void 0 && this._previousClone.undo(t);
        }
        stop() {
            return (this._previousClone = this._stack.pop()), this._previousClone.clone;
        }
    };
    var fh = {
            equals: Object.is,
            isShallow: !1,
            pathAsArray: !1,
            ignoreSymbols: !1,
            ignoreUnderscores: !1,
            ignoreDetached: !1,
            details: !1,
        },
        yn = (i, t, e = {}) => {
            e = se(se({}, fh), e);
            let r = Symbol("ProxyTarget"),
                { equals: n, isShallow: o, ignoreDetached: s, details: c } = e,
                a = new ni(n),
                l = typeof e.onValidate == "function",
                h = new St(l),
                E = (_, T, b, m, x) => !l || h.isCloning || e.onValidate(et.concat(a.getPath(_), T), b, m, x) === !0,
                N = (_, T, b, m) => {
                    !sr(a, e, T) && !(s && a.isDetached(_, i)) && O(a.getPath(_), T, b, m);
                },
                O = (_, T, b, m, x) => {
                    h.isCloning ? h.update(_, T, m) : t(et.concat(_, T), b, m, x);
                },
                B = (_) => _ && (_[r] || _),
                L = (_, T, b, m) =>
                    oc(_) ||
                    b === "constructor" ||
                    (o && !St.isHandledMethod(T, b)) ||
                    sr(a, e, b) ||
                    a.isGetInvariant(T, b) ||
                    (s && a.isDetached(T, i))
                        ? _
                        : (m === void 0 && (m = a.getPath(T)), a.getProxy(_, et.concat(m, b), pt, r)),
                pt = {
                    get(_, T, b) {
                        if (pe(T)) {
                            if (T === r || T === ii) return _;
                            if (T === an && !a.isUnsubscribed && a.getPath(_).length === 0) return a.unsubscribe(), _;
                        }
                        let m = ri(_) ? Reflect.get(_, T) : Reflect.get(_, T, b);
                        return L(m, _, T);
                    },
                    set(_, T, b, m) {
                        b = B(b);
                        let x = _[r] || _,
                            It = x[T];
                        if (n(It, b) && T in _) return !0;
                        let at = E(_, T, b, It);
                        return at && a.setProperty(x, T, b, m, It) ? (N(_, T, _[T], It), !0) : !at;
                    },
                    defineProperty(_, T, b) {
                        if (!a.isSameDescriptor(b, _, T)) {
                            let m = _[T];
                            E(_, T, b.value, m) && a.defineProperty(_, T, b, m) && N(_, T, b.value, m);
                        }
                        return !0;
                    },
                    deleteProperty(_, T) {
                        if (!Reflect.has(_, T)) return !0;
                        let b = Reflect.get(_, T),
                            m = E(_, T, void 0, b);
                        return m && a.deleteProperty(_, T, b) ? (N(_, T, void 0, b), !0) : !m;
                    },
                    apply(_, T, b) {
                        let m = T[r] || T;
                        if (a.isUnsubscribed) return Reflect.apply(_, m, b);
                        if ((c === !1 || (c !== !0 && !c.includes(_.name))) && St.isHandledType(m)) {
                            let x = et.initial(a.getPath(_)),
                                It = St.isHandledMethod(m, _.name);
                            h.start(m, x, b);
                            let at = Reflect.apply(_, h.preferredThisArg(_, T, m), It ? b.map((pi) => B(pi)) : b),
                                Ac = h.isChanged(m, n),
                                Cn = h.stop();
                            if (
                                (St.isHandledType(at) &&
                                    It &&
                                    (T instanceof Map && _.name === "get" && (x = et.concat(x, b[0])),
                                    (at = a.getProxy(at, x, pt))),
                                Ac)
                            ) {
                                let pi = { name: _.name, args: b, result: at },
                                    mn = h.isCloning ? et.initial(x) : x,
                                    gn = h.isCloning ? et.last(x) : "";
                                E(et.get(i, mn), gn, m, Cn, pi) ? O(mn, gn, m, Cn, pi) : h.undo(m);
                            }
                            return (T instanceof Map || T instanceof Set) && un(at) ? ln(at, _, T, x, L) : at;
                        }
                        return Reflect.apply(_, T, b);
                    },
                },
                Tt = a.getProxy(i, e.pathAsArray ? [] : "", pt);
            return (t = t.bind(Tt)), l && (e.onValidate = e.onValidate.bind(Tt)), Tt;
        };
    yn.target = (i) => (i && i[ii]) || i;
    yn.unsubscribe = (i) => i[an] || i;
    var Rn = yn;
    u();
    function ar(i, t, e = "") {
        if (typeof i != "object") {
            M("_old is not an object");
            return;
        }
        if (typeof t != "object") {
            M("_new is not an object");
            return;
        }
        let r = Object.keys(i).reverse(),
            n = Object.keys(t);
        for (let o of r)
            Object.prototype.hasOwnProperty.call(t, o) || (Array.isArray(i) ? i.splice(parseInt(o), 1) : delete i[o]);
        for (let o of n) Object.prototype.hasOwnProperty.call(i, o) || (i[o] = t[o]);
        for (let o of n)
            if (Object.prototype.hasOwnProperty.call(i, o)) {
                let s = uc(i[o]),
                    c = uc(t[o]);
                if (c === "unsupported") {
                    M(`${e}.${o} is unsupported type: ${typeof t[o]}`);
                    continue;
                }
                if (s === "object" && c === "object") {
                    ar(i[o], t[o], `${e}.${o}`);
                    continue;
                }
                if (s === "array" && c === "array") {
                    ar(i[o], t[o], `${e}.${o}`);
                    continue;
                }
                i[o] !== t[o] && (i[o] = t[o]);
            }
    }
    function uc(i) {
        return i === null
            ? "null"
            : Array.isArray(i)
            ? "array"
            : typeof i == "object"
            ? "object"
            : typeof i == "boolean" || (typeof i == "number" && Number.isFinite(i)) || typeof i == "string"
            ? "primitive"
            : "unsupported";
    }
    var Sn = new WeakMap(),
        qe,
        it,
        G,
        Ee,
        ai,
        Ut,
        ur,
        lc,
        lr,
        hc,
        hr,
        fc,
        _t = class {
            constructor(t, e) {
                A(this, ur);
                A(this, lr);
                A(this, hr);
                A(this, qe, void 0);
                A(this, it, void 0);
                A(this, G, void 0);
                A(this, Ee, void 0);
                A(this, ai, void 0);
                A(this, Ut, void 0);
                P(this, qe, t),
                    P(this, it, e),
                    P(this, G, null),
                    P(this, Ee, {}),
                    P(
                        this,
                        ai,
                        Rn(p(this, Ee), vt(this, lr, hc).bind(this), { onValidate: vt(this, ur, lc).bind(this) })
                    ),
                    P(this, Ut, null),
                    Sn.set(p(this, Ee), this);
            }
            load(t, e = !1) {
                return z(this, null, function* () {
                    if (p(this, Ut)) return st("Record.load() called twice!", p(this, it)), p(this, Ut);
                    if (p(this, qe).getConnectionState() !== "OPEN") {
                        M("Record.load() called before room is connected.", p(this, it));
                        return;
                    }
                    return (
                        P(
                            this,
                            Ut,
                            (() =>
                                z(this, null, function* () {
                                    P(this, G, p(this, qe).record.getRecord(p(this, it))),
                                        p(this, G).subscribe(vt(this, hr, fc).bind(this), !0),
                                        yield p(this, G).whenReady(),
                                        t && (yield this.initData(t, e));
                                }))()
                        ),
                        p(this, Ut)
                    );
                });
            }
            get whenLoaded() {
                return p(this, Ut) === null
                    ? (M("Record.whenLoaded called before load().", p(this, it)),
                      Promise.reject(new Error("Record.whenLoaded called before load().")))
                    : p(this, Ut);
            }
            initData(t, e = !1) {
                return z(this, null, function* () {
                    var r;
                    if (!((r = p(this, G)) != null && r.isReady)) {
                        M("Record.initData() called before record ready.", p(this, it));
                        return;
                    }
                    (!e && !or(p(this, G).get())) || !nr(t, "init-data") || (yield p(this, G).setWithAck(t));
                });
            }
            setData(t) {
                var e;
                if (!((e = p(this, G)) != null && e.isReady)) {
                    M(`Record.setData() called before record ready. ${p(this, it)}
 Ignored: ${JSON.stringify(t)}`);
                    return;
                }
                !nr(t, "set-data") || p(this, G).set(t);
            }
            watchShared(t, e, r) {
                var n;
                if (!((n = p(this, G)) != null && n.isReady)) {
                    st(`watchShared() called on '${p(this, it)}' before ready.`);
                    return;
                }
                p(this, G).subscribe(t, e, r);
            }
            get shared() {
                return p(this, ai);
            }
            get name() {
                return p(this, it);
            }
            delete() {
                return z(this, null, function* () {
                    var t;
                    if (!((t = p(this, G)) != null && t.isReady)) {
                        M(`delete() called on ${p(this, it)} before ready.`);
                        return;
                    }
                    return new Promise((e) => {
                        var r, n;
                        (r = p(this, G)) == null || r.once("delete", e), (n = p(this, G)) == null || n.delete();
                    });
                });
            }
            _set(t, e) {
                return z(this, null, function* () {
                    var r;
                    yield (r = p(this, G)) == null ? void 0 : r.setWithAck(t, e);
                });
            }
            _get(t) {
                var e;
                return (e = p(this, G)) == null ? void 0 : e.get(t);
            }
            static recordForShared(t) {
                let e = Rn.target(t);
                if (!Sn.has(e)) {
                    M("No record found for shared object.");
                    return;
                }
                return Sn.get(e);
            }
        };
    (qe = new WeakMap()),
        (it = new WeakMap()),
        (G = new WeakMap()),
        (Ee = new WeakMap()),
        (ai = new WeakMap()),
        (Ut = new WeakMap()),
        (ur = new WeakSet()),
        (lc = function (t, e, r) {
            return ei(e, `${p(this, it)}/${t}`);
        }),
        (lr = new WeakSet()),
        (hc = function (t, e, r) {
            var n;
            if (!((n = p(this, G)) != null && n.isReady)) {
                st(`Shared object written to before ready. ${p(this, it)}
 Ignored: ${t} = ${JSON.stringify(e)}`);
                return;
            }
            this._set(t, e);
        }),
        (hr = new WeakSet()),
        (fc = function (t) {
            nr(t, "server-data") || M("Incoming server data not valid."), ar(p(this, Ee), t, "shared");
        });
    var Q,
        ui,
        li,
        Ot,
        Nt,
        ie,
        re,
        ye,
        Lt,
        hi,
        rt,
        ne,
        dr,
        pc,
        pr,
        Ec,
        Er,
        yc,
        fi,
        _n,
        fr = class {
            constructor(t, e, r) {
                A(this, dr);
                A(this, pr);
                A(this, Er);
                A(this, fi);
                A(this, Q, void 0);
                A(this, ui, void 0);
                A(this, li, void 0);
                A(this, Ot, void 0);
                A(this, Nt, void 0);
                A(this, ie, void 0);
                A(this, re, void 0);
                A(this, ye, void 0);
                A(this, Lt, void 0);
                A(this, hi, void 0);
                A(this, rt, void 0);
                A(this, ne, void 0);
                P(this, Q, new dc.DeepstreamClient(t)),
                    P(this, ui, e),
                    P(this, li, r),
                    P(this, Ot, `${e}-${r}`),
                    P(this, Nt, `${p(this, Ot)}/${p(this, Q).getUid()}`),
                    P(this, ie, new Map()),
                    P(this, re, []),
                    P(this, ye, []),
                    P(this, Lt, new _t(p(this, Q), p(this, Nt))),
                    P(this, rt, []),
                    P(this, ne, void 0),
                    P(this, hi, vt(this, dr, pc).call(this));
            }
            _isConnected() {
                return p(this, Q).getConnectionState() === "OPEN";
            }
            get whenConnected() {
                return p(this, hi);
            }
            disconnect() {
                !this._isConnected() || p(this, Q).close();
            }
            info() {
                return {
                    appName: p(this, ui),
                    roomName: p(this, li),
                    guestNames: p(this, rt),
                    guestName: p(this, Nt),
                    isConnected: this._isConnected(),
                    isHost: this.isHost(),
                };
            }
            getRecord(t) {
                return new _t(p(this, Q), `${p(this, Ot)}/${t}`);
            }
            subscribe(t, e) {
                p(this, Q).event.subscribe(`${p(this, Ot)}/${t}`, e);
            }
            unsubscribe(t, e) {
                p(this, Q).event.unsubscribe(`${p(this, Ot)}/${t}`, e);
            }
            emit(t, e) {
                (e === void 0 || ei(e, "emit-data")) && p(this, Q).event.emit(`${p(this, Ot)}/${t}`, e);
            }
            get hostName() {
                return p(this, ne);
            }
            get _guestNames() {
                return [...p(this, rt)];
            }
            get myGuestRecord() {
                return p(this, Lt);
            }
            get guestShareds() {
                return new Proxy(p(this, ye), {
                    set() {
                        return M("The guestShared array is read-only."), !0;
                    },
                });
            }
            isHost() {
                return p(this, ne) === p(this, Nt);
            }
        };
    (Q = new WeakMap()),
        (ui = new WeakMap()),
        (li = new WeakMap()),
        (Ot = new WeakMap()),
        (Nt = new WeakMap()),
        (ie = new WeakMap()),
        (re = new WeakMap()),
        (ye = new WeakMap()),
        (Lt = new WeakMap()),
        (hi = new WeakMap()),
        (rt = new WeakMap()),
        (ne = new WeakMap()),
        (dr = new WeakSet()),
        (pc = function () {
            return (() =>
                z(this, null, function* () {
                    p(this, Q).on("error", (e, r, n) => M("ds error", e, r, n)),
                        p(this, Q).presence.subscribe(vt(this, Er, yc).bind(this)),
                        yield p(this, Q).login({ username: p(this, Nt) }),
                        p(this, Lt).load(),
                        yield vt(this, pr, Ec).call(this),
                        vt(this, fi, _n).call(this);
                }))();
        }),
        (pr = new WeakSet()),
        (Ec = function () {
            return z(this, null, function* () {
                let t = yield p(this, Q).presence.getAll();
                P(
                    this,
                    rt,
                    t
                        .filter((e) => e.startsWith(`${p(this, Ot)}/`))
                        .concat(p(this, Nt))
                        .sort()
                ),
                    P(this, ne, p(this, rt)[0]);
            });
        }),
        (Er = new WeakSet()),
        (yc = function (t, e) {
            !t.startsWith(`${p(this, Ot)}/`) ||
                (e
                    ? (p(this, rt).push(t), p(this, rt).sort())
                    : P(
                          this,
                          rt,
                          p(this, rt).filter((r) => r !== t)
                      ),
                P(this, ne, p(this, rt)[0]),
                vt(this, fi, _n).call(this));
        }),
        (fi = new WeakSet()),
        (_n = function () {
            let t = () => {
                p(this, ye).length = 0;
                let e = p(this, re).filter((r) => !or(r));
                p(this, ye).push(...e);
            };
            for (let e of p(this, rt))
                if (!p(this, ie).has(e))
                    if (e === p(this, Nt))
                        p(this, ie).set(e, p(this, Lt)),
                            p(this, Lt).whenLoaded.then(() => {
                                p(this, Lt).watchShared(t.bind(this), !0);
                            });
                    else {
                        let r = new _t(p(this, Q), e);
                        p(this, ie).set(e, r),
                            r.load().then(() => {
                                r.watchShared(t.bind(this), !0);
                            });
                    }
            p(this, re).length = 0;
            for (let e of p(this, rt))
                if (e === p(this, Nt)) p(this, re).push(p(this, Lt).shared);
                else {
                    let r = p(this, ie).get(e);
                    r && p(this, re).push(r.shared);
                }
            t();
        });
    u();
    u();
    function di(i, t, e = document) {
        let r = new CustomEvent("reef:" + i, { bubbles: !0, cancelable: !0, detail: t });
        return e.dispatchEvent(r);
    }
    function On(i) {
        return typeof i == "string" ? document.querySelector(i) : i;
    }
    function Rc(i) {
        return Object.prototype.toString.call(i).slice(8, -1).toLowerCase();
    }
    function Nc(i = {}, t = "") {
        return (
            (i = ["array", "object"].includes(Rc(i)) ? i : { value: i }),
            new Proxy(
                i,
                (function e(r, n) {
                    let o = "store" + (r ? "-" + r : "");
                    return {
                        get: (s, c) =>
                            c === "_isProxy" ||
                            (["object", "array"].includes(Rc(s[c])) &&
                                !s[c]._isProxy &&
                                (s[c] = new Proxy(s[c], e(r, n))),
                            s[c]),
                        set: (s, c, a) => (s[c] === a || ((s[c] = a), di(o, n)), !0),
                        deleteProperty: (s, c) => (delete s[c], di(o, n), !0),
                    };
                })(t, i)
            )
        );
    }
    var Sc = ["input", "option", "textarea"],
        yr = ["value", "checked", "selected"],
        Tc = ["checked", "selected"];
    function Ic(i) {
        return ["false", "null", "undefined", "0", "-0", "NaN", "0n", "-0n"].includes(i);
    }
    function vc(i, t, e) {
        let r = t.replace(/\s+/g, "").toLowerCase();
        return (
            !(
                !["src", "href", "xlink:href"].includes(i) ||
                (!r.includes("javascript:") && !r.includes("data:text/html"))
            ) ||
            !(e || !i.startsWith("on")) ||
            void 0
        );
    }
    function bc(i, t, e, r) {
        vc(t, e, r) || (yr.includes(t) && (i[t] = t === "value" ? e : " "), i.setAttribute(t, e));
    }
    function Rr(i, t) {
        yr.includes(t) && (i[t] = ""), i.removeAttribute(t);
    }
    function Nn(i, t) {
        if (i.nodeType === 1) {
            for (let { name: e, value: r } of i.attributes) {
                if (vc(e, r, t)) {
                    Rr(i, e);
                    continue;
                }
                if (!e.startsWith("@") && !e.startsWith("#")) continue;
                let n = e.slice(1);
                Rr(i, e), (Tc.includes(n) && Ic(r)) || bc(i, n, r, t);
            }
            if (i.childNodes) for (let e of i.childNodes) Nn(e, t);
        }
    }
    function _c(i) {
        return i.childNodes && i.childNodes.length ? null : i.textContent;
    }
    function Oc(i, t) {
        return i.nodeType !== t.nodeType || i.tagName !== t.tagName || i.id !== t.id || i.src !== t.src;
    }
    function Tn(i, t, e) {
        let r = i.childNodes,
            n = t.childNodes;
        (function (o) {
            let s = o.querySelectorAll("script");
            for (let c of s) c.remove();
        })(i) ||
            (r.forEach(function (o, s) {
                if (!n[s]) {
                    let a = o.cloneNode(!0);
                    return Nn(a, e), void t.append(a);
                }
                if (Oc(o, n[s])) {
                    let a = (function (l, h, E) {
                        return Array.from(h)
                            .slice(E + 1)
                            .find(function (N) {
                                return !Oc(l, N);
                            });
                    })(o, n, s);
                    if (!a) {
                        let l = o.cloneNode(!0);
                        return Nn(l, e), void n[s].before(l);
                    }
                    n[s].before(a);
                }
                if (
                    ((function (a, l, h) {
                        if (a.nodeType !== 1) return;
                        let E = a.attributes,
                            N = l.attributes;
                        for (let { name: O, value: B } of E) {
                            if (O.startsWith("#") || (yr.includes(O) && Sc.includes(a.tagName.toLowerCase()))) continue;
                            let L = O.startsWith("@") ? O.slice(1) : O;
                            Tc.includes(L) && Ic(B) ? Rr(l, L) : bc(l, L, B, h);
                        }
                        for (let { name: O, value: B } of N)
                            E[O] || (yr.includes(O) && Sc.includes(l.tagName.toLowerCase())) || Rr(l, O);
                    })(o, n[s], e),
                    o.nodeName.includes("-"))
                )
                    return;
                let c = _c(o);
                if ((c && c !== _c(n[s]) && (n[s].textContent = c), o.childNodes.length || !n[s].childNodes.length)) {
                    if (!n[s].childNodes.length && o.childNodes.length) {
                        let a = document.createDocumentFragment();
                        return Tn(o, a, e), void n[s].appendChild(a);
                    }
                    o.childNodes.length && Tn(o, n[s], e);
                } else n[s].innerHTML = "";
            }),
            (function (o, s) {
                let c = o.length - s.length;
                if (!(c < 1)) for (; c > 0; c--) o[o.length - 1].remove();
            })(n, r));
    }
    function dh(i, t, e) {
        let r = On(i);
        Tn(
            (function (n) {
                let o = new DOMParser().parseFromString(n, "text/html");
                return (
                    o.head &&
                        o.head.childNodes.length &&
                        Array.from(o.head.childNodes)
                            .reverse()
                            .forEach(function (s) {
                                o.body.insertBefore(s, o.body.firstChild);
                            }),
                    o.body || document.createElement("body")
                );
            })(t),
            r,
            e
        ),
            di("render", null, r);
    }
    var In = class {
        constructor(t, e, r) {
            var n;
            (this.elem = t),
                (this.template = e),
                (this.stores = r.stores ? r.stores.map((o) => "reef:store-" + o) : ["reef:store"]),
                (this.events = r.events),
                (this.handler =
                    ((n = this),
                    function (o) {
                        n.render();
                    })),
                (this.debounce = null),
                this.start();
        }
        start() {
            for (let t of this.stores) document.addEventListener(t, this.handler);
            this.render(), di("start", null, On(this.elem));
        }
        stop() {
            for (let t of this.stores) document.removeEventListener(t, this.handler);
            di("stop", null, On(this.elem));
        }
        render() {
            let t = this;
            t.debounce && window.cancelAnimationFrame(t.debounce),
                (t.debounce = window.requestAnimationFrame(function () {
                    dh(t.elem, t.template(), t.events);
                }));
        }
    };
    function Cc(i, t, e = {}) {
        return new In(i, t, e);
    }
    var oe, mc, vn;
    function bn(i) {
        return z(this, null, function* () {
            if ((yield i.whenConnected, oe)) return;
            (oe = document.createElement("div")), (oe.className = "p5party_info"), document.body.append(oe);
            let t = Nc(se({ auto: sessionStorage.getItem("auto") === "true" }, i.info()));
            function e() {
                let { appName: r, roomName: n, guestNames: o, isHost: s, isConnected: c } = t,
                    a = `
      <style>
        .p5party_info {
          position: fixed;
          right: 0;
          top: 0;
          padding: 10px;

          background: rgba(255,255,0,.1);
          
          font-family: 'Courier New', Courier, monospace;
          font-size: 18px;
        }

        .p5party_info .error {
          padding: 3px 6px;
          
          background: red;
          color: white;
        }

        .p5party_info button {
          display: block;
          margin-top: 6px;
          padding: 3px 6px;
          
          background: white;
          color: black;
          border: 1px solid black;
          border-radius: 3px;
          
          cursor: pointer;

          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
        }
        .p5party_info button:hover {
          background: #eee;
        }
        .p5party_info button:active {
          background: #ddd;
        }

        .p5party_info .checkbox {
          appearance: none;
          margin: 0;
          
          width: 1em;
          height: 1em;
          
          border: 1px solid black;
          border-radius: 3px;
          background: white;
          
          display: inline-grid;
          place-content: center;
        } 
        .p5party_info .checkbox::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          
          background: black;
          border-radius: 2px;
          
          transform: scale(0);
          transition: 120ms transform ease-in-out;
        }
        .p5party_info .checkbox:checked::before {
          transform: scale(1);
        }
        
        .p5party_info label {
          margin: 0;
          font-size: 14px;
        }
      </style>
    `;
                return c
                    ? a +
                          ` <div>${r}</div>
          <div>${n}</div>
          <div>guests: ${o.length}</div>
          <div>${s ? "hosting" : ""}</div>
          <button data-p5party="reload-others">reload others</button>
          <button data-p5party="disconnect-others">disconnect others</button>
          
          `
                    : a +
                          ` <div class="error">disconnected</div>
        `;
            }
            (vn = Cc(oe, e)),
                document.addEventListener("click", (r) => {
                    let n = r.target.getAttribute("data-p5party");
                    !n ||
                        (n === "reload-others" &&
                            (Z("reload-others"),
                            i.emit("p5PartyEvent", { action: "reload-others", sender: i.info().guestName })),
                        n === "disconnect-others" &&
                            (Z("disconnect-others"),
                            i.emit("p5PartyEvent", { action: "disconnect-others", sender: i.info().guestName })),
                        n === "auto" &&
                            (Z("auto", r.target.checked), sessionStorage.setItem("auto", String(r.target.checked))));
                }),
                (mc = setInterval(() => {
                    Object.assign(t, i.info());
                }, 100));
        });
    }
    function gc() {
        oe && (oe.remove(), (oe = null)), vn && vn.stop(), clearInterval(mc);
    }
    typeof window != "undefined" && (window.p5 ? ph() : st("p5.js not found."));
    function ph() {
        let i = p5.prototype.VERSION ? `p5.js v${p5.prototype.VERSION}` : "p5.js is older than 1.3.1";
        wr("font-weight: bold", i), wr("font-weight: bold", `p5.party v${Zn}`);
        let t = null;
        (p5.prototype.partyConnect = function (r, n, o = "_main", s) {
            if (t !== null) {
                st("You should call partyConnect() only one time");
                return;
            }
            (() =>
                z(this, null, function* () {
                    (t = new fr(r, n, o)),
                        yield t.whenConnected,
                        window.addEventListener("beforeunload", () => {
                            t == null || t.disconnect();
                        }),
                        document.addEventListener(
                            "keyup",
                            (l) => {
                                l.ctrlKey && l.key === "i" && p5.prototype.partyToggleInfo();
                            },
                            !1
                        );
                    let a = sessionStorage.getItem("auto") === "true";
                    if ((Z("Auto:", a), a))
                        for (
                            Z("Auto enabled. Reloading others..."),
                                t.emit("p5PartyEvent", { action: "disconnect-reload", sender: t.info().guestName });
                            !t.isHost();

                        )
                            Z("Waiting..."), yield new Promise((l) => setTimeout(l, 100));
                    t.subscribe("p5PartyEvent", (l) => {
                        function h() {
                            return z(this, null, function* () {
                                !t ||
                                    (l.action === "reload-others" &&
                                        l.sender != t.info().guestName &&
                                        (Z("Recieved reload-others p5PartyEvent. Reloading..."),
                                        window.location.reload()),
                                    l.action === "disconnect-others" &&
                                        l.sender != t.info().guestName &&
                                        (Z("Recieved disconnect-others p5PartyEvent. Disconnecting..."),
                                        t.disconnect(),
                                        bn(t)),
                                    l.action === "disconnect-reload" &&
                                        l.sender != t.info().guestName &&
                                        (sessionStorage.getItem("auto") === "true" &&
                                            (to(
                                                "Recieved disconnect-reload p5PartyEvent, but auto is set. Disabling auto..."
                                            ),
                                            sessionStorage.setItem("auto", "false")),
                                        Z("Recieved disconnect-reload p5PartyEvent. Disconnecting..."),
                                        t.disconnect(),
                                        yield new Promise((N) => setTimeout(N, 500)),
                                        Z("Reloading..."),
                                        window.location.reload()));
                            });
                        }
                        h();
                    }),
                        Z("partyConnect done!"),
                        this._decrementPreload(),
                        s == null || s();
                }))();
        }),
            p5.prototype.registerPreloadMethod("partyConnect", p5.prototype),
            p5.prototype.registerPreloadMethod("partyLoadShared", p5.prototype),
            (p5.prototype.partyLoadShared = function (r, n, o) {
                if (t === null) {
                    M("partyLoadShared() called before partyConnect()");
                    return;
                }
                let s = t.getRecord(r);
                return (
                    (() =>
                        z(this, null, function* () {
                            yield t == null ? void 0 : t.whenConnected;
                            let a = (t == null ? void 0 : t.isHost()) === !0;
                            yield s.load(n, a),
                                Z(`partyLoadShared "${r}" done!`),
                                o == null || o(s.shared),
                                this._decrementPreload();
                        }))(),
                    s.shared
                );
            }),
            p5.prototype.registerPreloadMethod("partyLoadMyShared", p5.prototype),
            (p5.prototype.partyLoadMyShared = function (r = {}, n) {
                if (t === null) {
                    M("partyLoadMyShared() called before partyConnect()");
                    return;
                }
                let o = t.myGuestRecord;
                return (
                    (() =>
                        z(this, null, function* () {
                            yield t == null ? void 0 : t.whenConnected,
                                yield o.whenLoaded,
                                yield o.initData(r),
                                Z("partyLoadMyShared done!"),
                                n == null || n(o.shared),
                                this._decrementPreload();
                        }))(),
                    o.shared
                );
            }),
            (p5.prototype.partyLoadGuestShareds = function () {
                if (t === null) {
                    M("partyLoadGuestShareds() called before partyConnect()");
                    return;
                }
                return t.guestShareds;
            }),
            (p5.prototype.partyLoadParticipantShareds = function () {
                if ((st("partyLoadParticipantShareds is deprecated. Use partyLoadGuestShareds instead."), t === null)) {
                    M("partyLoadParticipantShareds() called before partyConnect()");
                    return;
                }
                return t.guestShareds;
            }),
            (p5.prototype.partyIsHost = function () {
                return t === null ? (M("partyIsHost() called before partyConnect()"), !1) : t.isHost();
            }),
            (p5.prototype.partySetShared = function (r, n) {
                var o;
                if (!_t.recordForShared(r)) {
                    st("partySetShared() doesn't recognize the provided shared object.", r);
                    return;
                }
                (o = _t.recordForShared(r)) == null || o.setData(n);
            }),
            (p5.prototype.partyWatchShared = function (r, n, o, s) {
                var c;
                if (!_t.recordForShared(r)) {
                    st("partyWatchShared() doesn't recognize the provided shared object.", r);
                    return;
                }
                (c = _t.recordForShared(r)) == null || c.watchShared(n, o, s);
            }),
            (p5.prototype.partySubscribe = function (r, n) {
                if (t === null) {
                    M("partySubscribe() called before partyConnect()");
                    return;
                }
                t.subscribe(r, n);
            }),
            (p5.prototype.partyUnsubscribe = function (r, n) {
                if (t === null) {
                    M("partyUnsubscribe() called before partyConnect()");
                    return;
                }
                t.unsubscribe(r, n);
            }),
            (p5.prototype.partyEmit = function (r, n) {
                if (t === null) {
                    M("partyEmit() called before partyConnect()");
                    return;
                }
                t.emit(r, n);
            });
        let e = !1;
        p5.prototype.partyToggleInfo = function (r) {
            if (t === null) {
                M("partyToggleInfo() called before partyConnect()");
                return;
            }
            r === void 0 ? (e = !e) : (e = r), e ? bn(t) : gc();
        };
    }
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! reef v12.1.0 | (c) 2022 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
//# sourceMappingURL=p5.party.js.map
