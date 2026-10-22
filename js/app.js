//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var S = x.prototype = new b();
	S.constructor = x, _(S, y.prototype), S.isPureReactComponent = !0;
	var C = Array.isArray;
	function w() {}
	var T = {
		H: null,
		A: null,
		T: null,
		S: null
	}, E = Object.prototype.hasOwnProperty;
	function D(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function O(e, t) {
		return D(e.type, t, e.props);
	}
	function k(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function A(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var j = /\/+/g;
	function M(e, t) {
		return typeof e == "object" && e && e.key != null ? A("" + e.key) : t.toString(36);
	}
	function N(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(w, w) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function P(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, P(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + M(e, 0) : a, C(o) ? (i = "", c != null && (i = c.replace(j, "$&/") + "/"), P(o, r, i, "", function(e) {
			return e;
		})) : o != null && (k(o) && (o = O(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(j, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (C(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + M(a, u), c += P(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + M(a, u++), c += P(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return P(N(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function F(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return P(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function I(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var ee = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function L(e) {
		var t = T.T, n = {};
		n.types = t === null ? null : t.types, T.T = n;
		try {
			var r = e(), i = T.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(w, ee);
		} catch (e) {
			ee(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), T.T = t;
		}
	}
	function R(e) {
		var t = T.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else L(R.bind(null, e));
	}
	var z = {
		map: F,
		forEach: function(e, t, n) {
			F(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return F(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return F(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!k(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = z, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return T.H.useMemoCache(e);
		}
	}, e.addTransitionType = R, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !E.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return D(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) E.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return D(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = k, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: I
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = L, e.unstable_useCacheRefresh = function() {
		return T.H.useCacheRefresh();
	}, e.use = function(e) {
		return T.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return T.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return T.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return T.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return T.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return T.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return T.H.useEffectEvent(e);
	}, e.useId = function() {
		return T.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return T.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return T.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return T.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return T.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return T.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return T.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return T.H.useRef(e);
	}, e.useState = function(e) {
		return T.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return T.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return T.H.useTransition();
	}, e.version = "19.3.1";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, O());
			else {
				var t = n(l);
				t !== null && j(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function d(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = d(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = d(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = d(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = d(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function h(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && h(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function g(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function _(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = g(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var x = null, S = null;
	function C(e, t, n) {
		return e === n || e === t && (x = e, !0);
	}
	function w(e, t, n) {
		return e === n ? (S = e, !1) : e === t && (S !== null && (x = e), !0);
	}
	function T(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function E(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var D = Object.assign, O = Symbol.for("react.element"), k = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), F = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), te = Symbol.for("react.activity"), ne = Symbol.for("react.legacy_hidden"), B = Symbol.for("react.memo_cache_sentinel"), re = Symbol.for("react.view_transition"), ie = Symbol.for("react.recoverable"), ae = Symbol.iterator;
	function V(e) {
		return typeof e != "object" || !e ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var oe = Symbol.for("react.client.reference");
	function se(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === oe ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case j: return "Fragment";
			case N: return "Profiler";
			case M: return "StrictMode";
			case ee: return "Suspense";
			case L: return "SuspenseList";
			case te: return "Activity";
			case re: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case A: return "Portal";
			case F: return e.displayName || "Context";
			case P: return (e._context.displayName || "Context") + ".Consumer";
			case I:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case R: return t = e.displayName || null, t === null ? se(e.type) || "Memo" : t;
			case z:
				t = e._payload, e = e._init;
				try {
					return se(e(t));
				} catch {}
		}
		return null;
	}
	var H = Array.isArray, U = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ce = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, le = [], ue = -1;
	function de(e) {
		return { current: e };
	}
	function G(e) {
		0 > ue || (e.current = le[ue], le[ue] = null, ue--);
	}
	function K(e, t) {
		ue++, le[ue] = e.current, e.current = t;
	}
	var fe = de(null), q = de(null), pe = de(null), me = de(null);
	function he(e, t) {
		switch (K(pe, t), K(q, e), K(fe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		G(fe), K(fe, e);
	}
	function ge() {
		G(fe), G(q), G(pe);
	}
	function _e(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, K(me, e)), t = fe.current;
		var n = dp(t, e.type);
		t !== n && (K(q, e), K(fe, n));
	}
	function ve(e) {
		q.current === e && (G(fe), G(q)), me.current === e && (G(me), sh._currentValue = ce);
	}
	var ye, be;
	function xe(e) {
		if (ye === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ye = t && t[1] || "", be = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ye + e + be;
	}
	var Se = !1;
	function Ce(e, t) {
		if (!e || Se) return "";
		Se = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Se = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? xe(n) : "";
	}
	function we(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return xe(e.type);
			case 16: return xe("Lazy");
			case 13: return e.child !== t && t !== null ? xe("Suspense Fallback") : xe("Suspense");
			case 19: return xe("SuspenseList");
			case 0:
			case 15: return Ce(e.type, !1);
			case 11: return Ce(e.type.render, !1);
			case 1: return Ce(e.type, !0);
			case 31: return xe("Activity");
			case 30: return xe("ViewTransition");
			default: return "";
		}
	}
	function Te(e) {
		try {
			var t = "", n = null;
			do
				t += we(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ee = Object.prototype.hasOwnProperty, De = t.unstable_scheduleCallback, Oe = t.unstable_cancelCallback, ke = t.unstable_shouldYield, Ae = t.unstable_requestPaint, je = t.unstable_now, Me = t.unstable_getCurrentPriorityLevel, Ne = t.unstable_ImmediatePriority, Pe = t.unstable_UserBlockingPriority, Fe = t.unstable_NormalPriority, Ie = t.unstable_LowPriority, Le = t.unstable_IdlePriority, Re = t.log, ze = t.unstable_setDisableYieldValue, Be = null, Ve = null;
	function He(e) {
		if (typeof Re == "function" && ze(e), Ve && typeof Ve.setStrictMode == "function") try {
			Ve.setStrictMode(Be, e);
		} catch {}
	}
	var Ue = Math.clz32 ? Math.clz32 : Ke, We = Math.log, Ge = Math.LN2;
	function Ke(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (We(e) / Ge | 0) | 0;
	}
	var qe = 256, Je = 262144, Ye = 4194304;
	function Xe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ze(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Xe(n))) : i = Xe(o) : i = Xe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Xe(n))) : i = Xe(o)) : i = Xe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Qe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function $e(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - Ue(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function et(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function tt() {
		var e = Ye;
		return Ye <<= 1, !(Ye & 62914560) && (Ye = 4194304), e;
	}
	function nt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function rt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function it(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ue(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && at(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function at(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ue(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ot(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ue(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function st(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ct(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ct(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function lt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ut() {
		var e = W.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function dt(e, t) {
		var n = W.p;
		try {
			return W.p = e, t();
		} finally {
			W.p = n;
		}
	}
	var ft = Math.random().toString(36).slice(2), pt = "__reactFiber$" + ft, mt = "__reactProps$" + ft, ht = "__reactContainer$" + ft, gt = "__reactEvents$" + ft, _t = "__reactListeners$" + ft, vt = "__reactHandles$" + ft, yt = "__reactResources$" + ft, bt = "__reactMarker$" + ft, xt = "__reactLoad$" + ft;
	function St(e) {
		delete e[pt], delete e[mt], delete e[_t], delete e[vt];
	}
	function Ct(e) {
		var t;
		if (t = e[pt]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ht] || n[pt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[pt]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function wt(e) {
		if (e = e[pt] || e[ht]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Tt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Et(e) {
		var t = e[yt];
		return t ||= e[yt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Dt(e) {
		e[bt] = !0;
	}
	function Ot(e) {
		e[xt] = void 0;
	}
	var kt = /* @__PURE__ */ new Set(), At = {};
	function jt(e, t) {
		Mt(e, t), Mt(e + "Capture", t);
	}
	function Mt(e, t) {
		for (At[e] = t, e = 0; e < t.length; e++) kt.add(t[e]);
	}
	var Nt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Pt = {}, Ft = {};
	function It(e) {
		return Ee.call(Ft, e) ? !0 : Ee.call(Pt, e) ? !1 : Nt.test(e) ? Ft[e] = !0 : (Pt[e] = !0, !1);
	}
	var Lt = !1;
	function Rt() {
		var e = Lt;
		return Lt = !1, e;
	}
	function zt(e, t, n) {
		if (It(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function Bt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function Vt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function Ht(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ut(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Wt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Gt(e) {
		if (!e._valueTracker) {
			var t = Ut(e) ? "checked" : "value";
			e._valueTracker = Wt(e, t, "" + e[t]);
		}
	}
	function Kt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ut(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var qt = /[\n"\\]/g;
	function Jt(e) {
		return e.replace(qt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Yt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ht(t)) : e.value !== "" + Ht(t) && (e.value = "" + Ht(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Zt(e, Ht(n)) : o === "number" && e.value == t ? Zt(e, Ht(e.value)) : Zt(e, Ht(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ht(s) : e.removeAttribute("name");
	}
	function Xt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Gt(e);
				return;
			}
			n = n == null ? "" : "" + Ht(n), t = t == null ? n : "" + Ht(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Gt(e);
	}
	function Zt(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function Qt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ht(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function $t(e, t, n) {
		t != null && (t = "" + Ht(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Ht(n);
	}
	function en(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (H(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ht(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Gt(e);
	}
	function tn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var nn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function rn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || nn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function an(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", Lt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (rn(e, a, r), Lt = !0);
		} else for (var o in t) t.hasOwnProperty(o) && rn(e, o, t[o]);
	}
	function on(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var sn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), cn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function ln(e) {
		return cn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function un() {}
	var dn = null;
	function fn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var pn = null, mn = null;
	function hn(e) {
		var t = wt(e);
		if (t && (e = t.stateNode)) {
			var n = e[mt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Yt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Jt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[mt] || null;
								if (!a) throw Error(i(90));
								Yt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Kt(r);
					}
					break a;
				case "textarea":
					$t(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Qt(e, !!n.multiple, t, !1);
			}
		}
	}
	var gn = !1;
	function _n(e, t, n) {
		if (gn) return e(t, n);
		gn = !0;
		try {
			return e(t);
		} finally {
			if (gn = !1, (pn !== null || mn !== null) && (Id(), pn && (t = pn, e = mn, mn = pn = null, hn(t), e))) for (t = 0; t < e.length; t++) hn(e[t]);
		}
	}
	function vn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[mt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var yn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, bn = !1;
	if (yn) try {
		var xn = {};
		Object.defineProperty(xn, "passive", { get: function() {
			bn = !0;
		} }), window.addEventListener("test", xn, xn), window.removeEventListener("test", xn, xn);
	} catch {
		bn = !1;
	}
	var Sn = null, Cn = null, wn = null;
	function Tn() {
		if (wn) return wn;
		var e, t = Cn, n = t.length, r, i = "value" in Sn ? Sn.value : Sn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return wn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function En(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Dn() {
		return !0;
	}
	function On() {
		return !1;
	}
	function kn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Dn : On, this.isPropagationStopped = On, this;
		}
		return D(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Dn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Dn);
			},
			persist: function() {},
			isPersistent: Dn
		}), t;
	}
	var An = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, jn = kn(An), Mn = D({}, An, {
		view: 0,
		detail: 0
	}), Nn = kn(Mn), Pn, Fn, In, Ln = D({}, Mn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Jn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== In && (In && e.type === "mousemove" ? (Pn = e.screenX - In.screenX, Fn = e.screenY - In.screenY) : Fn = Pn = 0, In = e), Pn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Fn;
		}
	}), Rn = kn(Ln), zn = kn(D({}, Ln, { dataTransfer: 0 })), Bn = kn(D({}, Mn, { relatedTarget: 0 })), Vn = kn(D({}, An, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Hn = kn(D({}, An, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Un = kn(D({}, An, { data: 0 })), Wn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Gn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Kn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function qn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Kn[e]) ? !!t[e] : !1;
	}
	function Jn() {
		return qn;
	}
	var Yn = kn(D({}, Mn, {
		key: function(e) {
			if (e.key) {
				var t = Wn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = En(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Gn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Jn,
		charCode: function(e) {
			return e.type === "keypress" ? En(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? En(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Xn = kn(D({}, Ln, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Zn = kn(D({}, An, { submitter: 0 })), Qn = kn(D({}, Mn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Jn
	})), $n = kn(D({}, An, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), er = kn(D({}, Ln, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), tr = kn(D({}, An, {
		newState: 0,
		oldState: 0,
		source: 0
	})), nr = [
		9,
		13,
		27,
		32
	], rr = yn && "CompositionEvent" in window, ir = null;
	yn && "documentMode" in document && (ir = document.documentMode);
	var ar = yn && "TextEvent" in window && !ir, or = yn && (!rr || ir && 8 < ir && 11 >= ir), sr = " ", cr = !1;
	function lr(e, t) {
		switch (e) {
			case "keyup": return nr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ur(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var dr = !1;
	function fr(e, t) {
		switch (e) {
			case "compositionend": return ur(t);
			case "keypress": return t.which === 32 ? (cr = !0, sr) : null;
			case "textInput": return e = t.data, e === sr && cr ? null : e;
			default: return null;
		}
	}
	function pr(e, t) {
		if (dr) return e === "compositionend" || !rr && lr(e, t) ? (e = Tn(), wn = Cn = Sn = null, dr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return or && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var mr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!mr[e.type] : t === "textarea";
	}
	function gr(e, t, n, r) {
		pn ? mn ? mn.push(r) : mn = [r] : pn = r, t = qf(t, "onChange"), 0 < t.length && (n = new jn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var _r = null, vr = null;
	function yr(e) {
		zf(e, 0);
	}
	function br(e) {
		if (Kt(Tt(e))) return e;
	}
	function xr(e, t) {
		if (e === "change") return t;
	}
	var Sr = !1;
	if (yn) {
		var Cr;
		if (yn) {
			var wr = "oninput" in document;
			if (!wr) {
				var Tr = document.createElement("div");
				Tr.setAttribute("oninput", "return;"), wr = typeof Tr.oninput == "function";
			}
			Cr = wr;
		} else Cr = !1;
		Sr = Cr && (!document.documentMode || 9 < document.documentMode);
	}
	function Er() {
		_r && (_r.detachEvent("onpropertychange", Dr), vr = _r = null);
	}
	function Dr(e) {
		if (e.propertyName === "value" && br(vr)) {
			var t = [];
			gr(t, vr, e, fn(e)), _n(yr, t);
		}
	}
	function Or(e, t, n) {
		e === "focusin" ? (Er(), _r = t, vr = n, _r.attachEvent("onpropertychange", Dr)) : e === "focusout" && Er();
	}
	function kr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return br(vr);
	}
	function Ar(e, t) {
		if (e === "click") return br(t);
	}
	function jr(e, t) {
		if (e === "input" || e === "change") return br(t);
	}
	function Mr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Nr = typeof Object.is == "function" ? Object.is : Mr;
	function Pr(e, t) {
		if (Nr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ee.call(t, i) || !Nr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Fr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Ir(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Lr(e, t) {
		var n = Ir(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Ir(n);
		}
	}
	function Rr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Rr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function zr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Fr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Fr(e.document);
		}
		return t;
	}
	function Br(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Vr = yn && "documentMode" in document && 11 >= document.documentMode, Hr = null, Ur = null, Wr = null, Gr = !1;
	function Kr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Gr || Hr == null || Hr !== Fr(r) || (r = Hr, "selectionStart" in r && Br(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Wr && Pr(Wr, r) || (Wr = r, r = qf(Ur, "onSelect"), 0 < r.length && (t = new jn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Hr)));
	}
	function qr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Jr = {
		animationend: qr("Animation", "AnimationEnd"),
		animationiteration: qr("Animation", "AnimationIteration"),
		animationstart: qr("Animation", "AnimationStart"),
		transitionrun: qr("Transition", "TransitionRun"),
		transitionstart: qr("Transition", "TransitionStart"),
		transitioncancel: qr("Transition", "TransitionCancel"),
		transitionend: qr("Transition", "TransitionEnd")
	}, Yr = {}, Xr = {};
	yn && (Xr = document.createElement("div").style, "AnimationEvent" in window || (delete Jr.animationend.animation, delete Jr.animationiteration.animation, delete Jr.animationstart.animation), "TransitionEvent" in window || delete Jr.transitionend.transition);
	function Zr(e) {
		if (Yr[e]) return Yr[e];
		if (!Jr[e]) return e;
		var t = Jr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Xr) return Yr[e] = t[n];
		return e;
	}
	var Qr = Zr("animationend"), $r = Zr("animationiteration"), ei = Zr("animationstart"), ti = Zr("transitionrun"), ni = Zr("transitionstart"), ri = Zr("transitioncancel"), ii = Zr("transitionend"), ai = /* @__PURE__ */ new Map(), oi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	oi.push("scrollEnd");
	function si(e, t) {
		ai.set(e, t), jt(t, [e]);
	}
	var ci = 0;
	function li(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = _d.identifierPrefix;
		var n = ci++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function ui(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Td;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function di(e, t) {
		return e = ui(e), t = ui(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var fi = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, pi = [], mi = 0, hi = 0;
	function gi() {
		for (var e = mi, t = hi = mi = 0; t < e;) {
			var n = pi[t];
			pi[t++] = null;
			var r = pi[t];
			pi[t++] = null;
			var i = pi[t];
			pi[t++] = null;
			var a = pi[t];
			if (pi[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && bi(n, i, a);
		}
	}
	function _i(e, t, n, r) {
		pi[mi++] = e, pi[mi++] = t, pi[mi++] = n, pi[mi++] = r, hi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function vi(e, t, n, r) {
		return _i(e, t, n, r), xi(e);
	}
	function yi(e, t) {
		return _i(e, null, null, t), xi(e);
	}
	function bi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ue(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function xi(e) {
		if (50 < Ed) throw Ed = 0, Dd = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Si = {};
	function Ci(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function wi(e, t, n, r) {
		return new Ci(e, t, n, r);
	}
	function Ti(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ei(e, t) {
		var n = e.alternate;
		return n === null ? (n = wi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Di(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Oi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Ti(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, fe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case te: return e = wi(31, n, t, a), e.elementType = te, e.lanes = o, e;
			case j: return ki(n.children, a, o, t);
			case M:
				s = 8, a |= 24;
				break;
			case N: return e = wi(12, n, t, a | 2), e.elementType = N, e.lanes = o, e;
			case ee: return e = wi(13, n, t, a), e.elementType = ee, e.lanes = o, e;
			case L: return e = wi(19, n, t, a), e.elementType = L, e.lanes = o, e;
			case ne:
			case re: return e = a | 32, e = wi(30, n, t, e), e.elementType = re, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case F:
						s = 10;
						break a;
					case P:
						s = 9;
						break a;
					case I:
						s = 11;
						break a;
					case R:
						s = 14;
						break a;
					case z:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = wi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ki(e, t, n, r) {
		return e = wi(7, e, r, t), e.lanes = n, e;
	}
	function Ai(e, t, n) {
		return e = wi(6, e, null, t), e.lanes = n, e;
	}
	function ji(e) {
		var t = wi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Mi(e, t, n) {
		return t = wi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ni = /* @__PURE__ */ new WeakMap();
	function Pi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ni.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Te(t)
			}, Ni.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Te(t)
		};
	}
	var Fi = [], Ii = 0, Li = null, Ri = 0, zi = [], Bi = 0, Vi = null, Hi = 1, Ui = "";
	function Wi(e, t) {
		Fi[Ii++] = Ri, Fi[Ii++] = Li, Li = e, Ri = t;
	}
	function Gi(e, t, n) {
		zi[Bi++] = Hi, zi[Bi++] = Ui, zi[Bi++] = Vi, Vi = e;
		var r = Hi;
		e = Ui;
		var i = 32 - Ue(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ue(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Hi = 1 << 32 - Ue(t) + i | n << i | r, Ui = a + e;
		} else Hi = 1 << a | n << i | r, Ui = e;
	}
	function Ki(e) {
		e.return !== null && (Wi(e, 1), Gi(e, 1, 0));
	}
	function qi(e) {
		for (; e === Li;) Li = Fi[--Ii], Fi[Ii] = null, Ri = Fi[--Ii], Fi[Ii] = null;
		for (; e === Vi;) Vi = zi[--Bi], zi[Bi] = null, Ui = zi[--Bi], zi[Bi] = null, Hi = zi[--Bi], zi[Bi] = null;
	}
	function Ji(e, t) {
		zi[Bi++] = Hi, zi[Bi++] = Ui, zi[Bi++] = Vi, Hi = t.id, Ui = t.overflow, Vi = e;
	}
	var Yi = null, Xi = null, J = !1, Zi = null, Qi = !1, $i = Error(i(519));
	function ea(e) {
		throw oa(Pi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), $i;
	}
	function ta(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[pt] = e, t[mt] = r, n) {
			case "dialog":
				Bf("cancel", t), Bf("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Bf("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Lf.length; n++) Bf(Lf[n], t);
				break;
			case "source":
				Bf("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Bf("error", t), Bf("load", t);
				break;
			case "details":
				Bf("toggle", t);
				break;
			case "input":
				Bf("invalid", t), Xt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Bf("invalid", t);
				break;
			case "textarea": Bf("invalid", t), en(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || $f(t.textContent, n) ? (r.popover != null && (Bf("beforetoggle", t), Bf("toggle", t)), r.onScroll != null && Bf("scroll", t), r.onScrollEnd != null && Bf("scrollend", t), r.onClick != null && (t.onclick = un), t = !0) : t = !1, t || ea(e, !0);
	}
	function na(e) {
		for (Yi = e.return; Yi;) switch (Yi.tag) {
			case 5:
			case 31:
			case 13:
				Qi = !1;
				return;
			case 27:
			case 3:
				Qi = !0;
				return;
			default: Yi = Yi.return;
		}
	}
	function ra(e) {
		if (e !== Yi) return !1;
		if (!J) return na(e), J = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && Xi && ea(e), na(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Xi = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Xi = dm(e);
		} else t === 27 ? (t = Xi, Sp(e.type) ? (e = um, um = null, Xi = e) : Xi = t) : Xi = Yi ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ia() {
		Xi = Yi = null, J = !1;
	}
	function aa() {
		var e = Zi;
		return e !== null && (ld === null ? ld = e : ld.push.apply(ld, e), Zi = null), e;
	}
	function oa(e) {
		Zi === null ? Zi = [e] : Zi.push(e);
	}
	var sa = de(null), ca = null, la = null;
	function ua(e, t, n) {
		K(sa, t._currentValue), t._currentValue = n;
	}
	function da(e) {
		e._currentValue = sa.current, G(sa);
	}
	function fa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function pa(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), fa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), fa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), fa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ma(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Nr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === me.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && pa(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function ha(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Nr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ga(e) {
		ca = e, la = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function _a(e) {
		return ya(ca, e);
	}
	function va(e, t) {
		return ca === null && ga(e), ya(e, t);
	}
	function ya(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, la === null) {
			if (e === null) throw Error(i(308));
			la = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else la = la.next = t;
		return n;
	}
	var ba = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, xa = t.unstable_scheduleCallback, Sa = t.unstable_NormalPriority, Ca = {
		$$typeof: F,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function wa() {
		return {
			controller: new ba(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Y(e) {
		e.refCount--, e.refCount === 0 && xa(Sa, function() {
			e.controller.abort();
		});
	}
	function Ta(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Ea = null;
	function Da(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Oa = null, ka = 0, Aa = 0, ja = null;
	function Ma(e, t) {
		if (Oa === null) {
			var n = Oa = [];
			ka = 0, Aa = Mf(), ja = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ka++, t.then(Na, Na), t;
	}
	function Na() {
		if (--ka === 0 && (Ea = null, Oa !== null)) {
			ja !== null && (ja.status = "fulfilled");
			var e = Oa;
			Oa = null, Aa = 0, ja = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Pa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Fa = U.S;
	U.S = function(e, t) {
		if (fd = je(), typeof t == "object" && t && typeof t.then == "function" && Ma(e, t), Ea !== null) for (var n = vf; n !== null;) Ta(n, Ea), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = vf; r !== null;) Ta(r, n), r = r.next;
			if (Aa !== 0) {
				r = Ea, r === null && (r = Ea = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Fa !== null && Fa(e, t);
	};
	var Ia = de(null);
	function La() {
		var e = Ia.current;
		return e === null ? qu.pooledCache : e;
	}
	function Ra(e, t) {
		t === null ? K(Ia, Ia.current) : K(Ia, t.pool);
	}
	function za() {
		var e = La();
		return e === null ? null : {
			parent: Ca._currentValue,
			pool: e
		};
	}
	var Ba = Error(i(460)), Va = Error(i(474)), Ha = Error(i(542)), Ua = { then: function() {} };
	function Wa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ga(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(un, un), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ya(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(un, un);
				else {
					if (e = qu, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ya(e), e;
				}
				throw qa = t, Ba;
		}
	}
	function Ka(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (qa = e, Ba) : e;
		}
	}
	var qa = null;
	function Ja() {
		if (qa === null) throw Error(i(459));
		var e = qa;
		return qa = null, e;
	}
	function Ya(e) {
		if (e === Ba || e === Ha) throw Error(i(483));
	}
	var Xa = null, Za = 0;
	function Qa(e) {
		var t = Za;
		return Za += 1, Xa === null && (Xa = []), Ga(Xa, e, t);
	}
	function $a(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function eo(e, t) {
		throw t.$$typeof === O ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function to(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ei(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ai(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === j ? (e = d(e, t, n.props.children, r, n.key), $a(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === z && Ka(i) === t.type) ? (t = a(t, n.props), $a(t, n), t.return = e, t) : (t = Oi(n.type, n.key, n.props, null, e.mode, r), $a(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Mi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ki(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ai("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case k: return n = Oi(t.type, t.key, t.props, null, e.mode, n), $a(n, t), n.return = e, n;
					case A: return t = Mi(t, e.mode, n), t.return = e, t;
					case z: return t = Ka(t), f(e, t, n);
				}
				if (H(t) || V(t)) return t = ki(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Qa(t), n);
				if (t.$$typeof === F) return f(e, va(e, t), n);
				eo(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case k: return n.key === i ? l(e, t, n, r) : null;
					case A: return n.key === i ? u(e, t, n, r) : null;
					case z: return n = Ka(n), p(e, t, n, r);
				}
				if (H(n) || V(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Qa(n), r);
				if (n.$$typeof === F) return p(e, t, va(e, n), r);
				eo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case k: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case A: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case z: return r = Ka(r), m(e, t, n, r, i);
				}
				if (H(r) || V(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Qa(r), i);
				if (r.$$typeof === F) return m(e, t, n, va(t, r), i);
				eo(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), J && Wi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return J && Wi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), J && Wi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), J && Wi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return J && Wi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), J && Wi(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === j && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case k:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === j) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), $a(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === z && Ka(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), $a(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === j ? (c = ki(o.props.children, e.mode, c, o.key), $a(c, o), c.return = e, e = c) : (c = Oi(o.type, o.key, o.props, null, e.mode, c), $a(c, o), c.return = e, e = c);
						}
						return s(e);
					case A:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Mi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case z: return o = Ka(o), _(e, r, o, c);
				}
				if (H(o)) return h(e, r, o, c);
				if (V(o)) {
					if (l = V(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, Qa(o), c);
				if (o.$$typeof === F) return _(e, r, va(e, o), c);
				eo(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Ai(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Za = 0;
				var i = _(e, t, n, r);
				return Xa = null, i;
			} catch (t) {
				if (t === Ba || t === Ha) throw t;
				var a = wi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var no = to(!0), ro = to(!1), io = !1;
	function ao(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function oo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function so(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function co(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Ku & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = xi(e), bi(e, null, n), t;
		}
		return _i(e, r, t, n), xi(e);
	}
	function lo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	function uo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var fo = !1;
	function po() {
		if (fo) {
			var e = ja;
			if (e !== null) throw e;
		}
	}
	function mo(e, t, n, r) {
		fo = !1;
		var i = e.updateQueue;
		io = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Yu & f) === f : (r & f) === f) {
					f !== 0 && f === Aa && (fo = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = D({}, d, f);
								break a;
							case 2: io = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), rd |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function ho(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function go(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ho(n[e], t);
	}
	var _o = de(null), vo = de(0);
	function yo(e, t) {
		e = td, K(vo, e), K(_o, t), td = e | t.baseLanes;
	}
	function bo() {
		K(vo, td), K(_o, _o.current);
	}
	function xo() {
		td = vo.current, G(_o), G(vo);
	}
	var So = de(null), Co = null;
	function wo(e) {
		var t = e.alternate;
		K(ko, ko.current & 1), K(So, e), Co === null && (t === null || _o.current !== null || t.memoizedState !== null) && (Co = e);
	}
	function To(e) {
		K(ko, ko.current), K(So, e), Co === null && (Co = e);
	}
	function Eo(e) {
		e.tag === 22 ? (K(ko, ko.current), K(So, e), Co === null && (Co = e)) : Do();
	}
	function Do() {
		K(ko, ko.current), K(So, So.current);
	}
	function Oo(e) {
		G(So), Co === e && (Co = null), G(ko);
	}
	var ko = de(0);
	function Ao(e, t) {
		K(So, So.current), K(ko, t);
	}
	function jo(e) {
		G(ko), G(So), Co === e && (Co = null);
	}
	function Mo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var No = 0, Po = null, Fo = null, Io = null, Lo = !1, Ro = !1, zo = !1, Bo = 0, Vo = 0, Ho = null, Uo = 0;
	function Wo() {
		throw Error(i(321));
	}
	function Go(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Nr(e[n], t[n])) return !1;
		return !0;
	}
	function Ko(e, t, n, r, i, a) {
		return No = a, Po = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? cc : lc, zo = !1, a = n(r, i), zo = !1, Ro && (a = Jo(t, n, r, i)), qo(e), a;
	}
	function qo(e) {
		U.H = sc;
		var t = Fo !== null && Fo.next !== null;
		if (No = 0, Io = Fo = Po = null, Lo = !1, Vo = 0, Ho = null, t) throw Error(i(300));
		e === null || Tc || (e = e.dependencies, e !== null && ha(e) && (Tc = !0));
	}
	function Jo(e, t, n, r) {
		Po = e;
		var a = 0;
		do {
			if (Ro && (Ho = null), Vo = 0, Ro = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Io = Fo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			U.H = uc, o = t(n, r);
		} while (Ro);
		return o;
	}
	function Yo() {
		var e = U.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ns(t) : t, e = e.useState()[0], (Fo === null ? null : Fo.memoizedState) !== e && (Po.flags |= 1024), t;
	}
	function Xo() {
		var e = Bo !== 0;
		return Bo = 0, e;
	}
	function Zo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Qo(e) {
		if (Lo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Lo = !1;
		}
		No = 0, Io = Fo = Po = null, Ro = !1, Vo = Bo = 0, Ho = null;
	}
	function $o() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Io === null ? Po.memoizedState = Io = e : Io = Io.next = e, Io;
	}
	function es() {
		if (Fo === null) {
			var e = Po.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Fo.next;
		var t = Io === null ? Po.memoizedState : Io.next;
		if (t !== null) Io = t, Fo = e;
		else {
			if (e === null) throw Po.alternate === null ? Error(i(467)) : Error(i(310));
			Fo = e, e = {
				memoizedState: Fo.memoizedState,
				baseState: Fo.baseState,
				baseQueue: Fo.baseQueue,
				queue: Fo.queue,
				next: null
			}, Io === null ? Po.memoizedState = Io = e : Io = Io.next = e;
		}
		return Io;
	}
	function ts() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ns(e) {
		var t = Vo;
		return Vo += 1, Ho === null && (Ho = []), e = Ga(Ho, e, t), t = Po, (Io === null ? t.memoizedState : Io.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? cc : lc), e;
	}
	function rs(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ns(e);
			if (e.$$typeof === ie) return;
			if (e.$$typeof === F) return _a(e);
		}
		throw Error(i(438, String(e)));
	}
	function is(e) {
		var t = null, n = Po.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Po.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = ts(), Po.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = B;
		return t.index++, n;
	}
	function as(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function os(e) {
		return ss(es(), Fo, e);
	}
	function ss(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (No & f) === f : (Yu & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Aa && (d = !0);
					else if ((No & p) === p) {
						u = u.next, p === Aa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Po.lanes |= p, rd |= p;
					f = u.action, zo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Po.lanes |= f, rd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Nr(o, e.memoizedState) && (Tc = !0, d && (n = ja, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function cs(e) {
		var t = es(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Nr(o, t.memoizedState) || (Tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ls(e, t, n) {
		var r = Po, a = es(), o = J;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Nr((Fo || a).memoizedState, n);
		if (s && (a.memoizedState = n, Tc = !0), a = a.queue, Ps(fs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Io !== null && !!(Io.memoizedState.tag & 1), ks(e ? 9 : 8, { destroy: void 0 }, ds.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, qu === null) throw Error(i(349));
			o || No & 127 || us(r, t, n);
		}
		return n;
	}
	function us(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Po.updateQueue, t === null ? (t = ts(), Po.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ds(e, t, n, r) {
		t.value = n, t.getSnapshot = r, ps(t) && ms(e);
	}
	function fs(e, t, n) {
		return n(function() {
			ps(t) && ms(e);
		});
	}
	function ps(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Nr(e, n);
		} catch {
			return !0;
		}
	}
	function ms(e) {
		var t = yi(e, 2);
		t !== null && jd(t, e, 2);
	}
	function hs(e) {
		var t = $o();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), zo) {
				He(!0);
				try {
					n();
				} finally {
					He(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: as,
			lastRenderedState: e
		}, t;
	}
	function gs(e, t, n, r) {
		return e.baseState = n, ss(e, Fo, typeof r == "function" ? r : as);
	}
	function _s(e, t, n, r, a) {
		if (ic(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			U.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, vs(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function vs(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = U.T, o = {};
			o.types = a === null ? null : a.types, U.T = o;
			try {
				var s = n(i, r), c = U.S;
				c !== null && c(o, s), ys(e, t, s);
			} catch (n) {
				xs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), U.T = a;
			}
		} else try {
			a = n(i, r), ys(e, t, a);
		} catch (n) {
			xs(e, t, n);
		}
	}
	function ys(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			bs(e, t, n);
		}, function(n) {
			return xs(e, t, n);
		}) : bs(e, t, n);
	}
	function bs(e, t, n) {
		t.status = "fulfilled", t.value = n, Ss(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, vs(e, n)));
	}
	function xs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ss(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ss(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Cs(e, t) {
		return t;
	}
	function ws(e, t) {
		if (J) {
			var n = qu.formState;
			if (n !== null) {
				a: {
					var r = Po;
					if (J) {
						if (Xi) {
							b: {
								for (var i = Xi, a = Qi; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Xi = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ea(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = $o(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Cs,
			lastRenderedState: t
		}, n.queue = r, n = tc.bind(null, Po, r), r.dispatch = n, r = hs(!1), a = rc.bind(null, Po, !1, r.queue), r = $o(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = _s.bind(null, Po, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ts(e) {
		return Es(es(), Fo, e);
	}
	function Es(e, t, n) {
		if (t = ss(e, t, Cs)[0], e = os(as)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ns(t);
		} catch (e) {
			throw e === Ba ? Ha : e;
		}
		else r = t;
		t = es();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Po.flags |= 2048, ks(9, { destroy: void 0 }, Ds.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ds(e, t) {
		e.action = t;
	}
	function Os(e) {
		var t = es(), n = Fo;
		if (n !== null) return Es(t, n, e);
		es(), t = t.memoizedState, n = es();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ks(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Po.updateQueue, t === null && (t = ts(), Po.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function As() {
		return es().memoizedState;
	}
	function js(e, t, n, r) {
		var i = $o();
		Po.flags |= e, i.memoizedState = ks(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Ms(e, t, n, r) {
		var i = es();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Fo !== null && r !== null && Go(r, Fo.memoizedState.deps) ? i.memoizedState = ks(t, a, n, r) : (Po.flags |= e, i.memoizedState = ks(1 | t, a, n, r));
	}
	function Ns(e, t) {
		js(8390656, 8, e, t);
	}
	function Ps(e, t) {
		Ms(2048, 8, e, t);
	}
	function Fs(e) {
		Po.flags |= 4;
		var t = Po.updateQueue;
		if (t === null) t = ts(), Po.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Is(e) {
		var t = es().memoizedState;
		return Fs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Ku & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Ls(e, t) {
		return Ms(4, 2, e, t);
	}
	function Rs(e, t) {
		return Ms(4, 4, e, t);
	}
	function zs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Bs(e, t, n) {
		n = n == null ? null : n.concat([e]), Ms(4, 4, zs.bind(null, t, e), n);
	}
	function Vs() {}
	function Hs(e, t) {
		var n = es();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Go(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Us(e, t) {
		var n = es();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Go(t, r[1])) return r[0];
		if (r = e(), zo) {
			He(!0);
			try {
				e();
			} finally {
				He(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ws(e, t, n) {
		return n === void 0 || No & 1073741824 && !(Yu & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = kd(), Po.lanes |= e, rd |= e, n);
	}
	function Gs(e, t, n, r) {
		return Nr(n, t) ? n : _o.current === null ? !(No & 106) || No & 1073741824 && !(Yu & 261930) ? (Tc = !0, e.memoizedState = n) : (e = kd(), Po.lanes |= e, rd |= e, t) : (e = Ws(e, n, r), Nr(e, t) || (Tc = !0), e);
	}
	function Ks(e, t, n, r, i) {
		var a = W.p;
		W.p = a !== 0 && 8 > a ? a : 8;
		var o = U.T, s = {};
		s.types = o === null ? null : o.types, U.T = s, rc(e, !1, t, n);
		try {
			var c = i(), l = U.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? nc(e, t, Pa(c, r), Od(e)) : nc(e, t, r, Od(e));
		} catch (n) {
			nc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Od());
		} finally {
			W.p = a, o !== null && s.types !== null && (o.types = s.types), U.T = o;
		}
	}
	function qs() {}
	function Js(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ys(e).queue;
		Ks(e, a, t, ce, n === null ? qs : function() {
			return Xs(e), n(r);
		});
	}
	function Ys(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ce,
			baseState: ce,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: as,
				lastRenderedState: ce
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: as,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Xs(e) {
		var t = Ys(e);
		t.next === null && (t = e.alternate.memoizedState), nc(e, t.next.queue, {}, Od());
	}
	function Zs() {
		return _a(sh);
	}
	function Qs() {
		return es().memoizedState;
	}
	function $s() {
		return es().memoizedState;
	}
	function ec(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Od();
					e = so(n);
					var r = co(t, e, n);
					r !== null && (jd(r, t, n), lo(r, t, n)), t = { cache: wa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function X(e, t, n) {
		var r = Od();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ic(e) ? ac(t, n) : (n = vi(e, t, n, r), n !== null && (jd(n, e, r), oc(n, t, r)));
	}
	function tc(e, t, n) {
		nc(e, t, n, Od());
	}
	function nc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ic(e)) ac(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Nr(s, o)) return _i(e, t, i, 0), qu === null && gi(), !1;
			} catch {}
			if (n = vi(e, t, i, r), n !== null) return jd(n, e, r), oc(n, t, r), !0;
		}
		return !1;
	}
	function rc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Mf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ic(e)) {
			if (t) throw Error(i(479));
		} else t = vi(e, n, r, 2), t !== null && jd(t, e, 2);
	}
	function ic(e) {
		var t = e.alternate;
		return e === Po || t !== null && t === Po;
	}
	function ac(e, t) {
		Ro = Lo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function oc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	var sc = {
		readContext: _a,
		use: rs,
		useCallback: Wo,
		useContext: Wo,
		useEffect: Wo,
		useImperativeHandle: Wo,
		useLayoutEffect: Wo,
		useInsertionEffect: Wo,
		useMemo: Wo,
		useReducer: Wo,
		useRef: Wo,
		useState: Wo,
		useDebugValue: Wo,
		useDeferredValue: Wo,
		useTransition: Wo,
		useSyncExternalStore: Wo,
		useId: Wo,
		useHostTransitionStatus: Wo,
		useFormState: Wo,
		useActionState: Wo,
		useOptimistic: Wo,
		useMemoCache: Wo,
		useCacheRefresh: Wo,
		useEffectEvent: Wo
	}, cc = {
		readContext: _a,
		use: rs,
		useCallback: function(e, t) {
			return $o().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: _a,
		useEffect: Ns,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), js(4194308, 4, zs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return js(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			js(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = $o();
			t = t === void 0 ? null : t;
			var r = e();
			if (zo) {
				He(!0);
				try {
					e();
				} finally {
					He(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = $o();
			if (n !== void 0) {
				var i = n(t);
				if (zo) {
					He(!0);
					try {
						n(t);
					} finally {
						He(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = X.bind(null, Po, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = $o();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = hs(e);
			var t = e.queue, n = tc.bind(null, Po, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			return Ws($o(), e, t);
		},
		useTransition: function() {
			var e = hs(!1);
			return e = Ks.bind(null, Po, e.queue, !0, !1), $o().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Po, a = $o();
			if (J) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), qu === null) throw Error(i(349));
				Yu & 127 || us(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Ns(fs.bind(null, r, o, e), [e]), r.flags |= 2048, ks(9, { destroy: void 0 }, ds.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = $o(), t = qu.identifierPrefix;
			if (J) {
				var n = Ui, r = Hi;
				n = (r & ~(1 << 32 - Ue(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Bo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Uo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Zs,
		useFormState: ws,
		useActionState: ws,
		useOptimistic: function(e) {
			var t = $o();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = rc.bind(null, Po, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: is,
		useCacheRefresh: function() {
			return $o().memoizedState = ec.bind(null, Po);
		},
		useEffectEvent: function(e) {
			var t = $o(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Ku & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, lc = {
		readContext: _a,
		use: rs,
		useCallback: Hs,
		useContext: _a,
		useEffect: Ps,
		useImperativeHandle: Bs,
		useInsertionEffect: Ls,
		useLayoutEffect: Rs,
		useMemo: Us,
		useReducer: os,
		useRef: As,
		useState: function() {
			return os(as);
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			return Gs(es(), Fo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = os(as)[0], t = es().memoizedState;
			return [typeof e == "boolean" ? e : ns(e), t];
		},
		useSyncExternalStore: ls,
		useId: Qs,
		useHostTransitionStatus: Zs,
		useFormState: Ts,
		useActionState: Ts,
		useOptimistic: function(e, t) {
			return gs(es(), Fo, e, t);
		},
		useMemoCache: is,
		useCacheRefresh: $s,
		useEffectEvent: Is
	}, uc = {
		readContext: _a,
		use: rs,
		useCallback: Hs,
		useContext: _a,
		useEffect: Ps,
		useImperativeHandle: Bs,
		useInsertionEffect: Ls,
		useLayoutEffect: Rs,
		useMemo: Us,
		useReducer: cs,
		useRef: As,
		useState: function() {
			return cs(as);
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			var n = es();
			return Fo === null ? Ws(n, e, t) : Gs(n, Fo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = cs(as)[0], t = es().memoizedState;
			return [typeof e == "boolean" ? e : ns(e), t];
		},
		useSyncExternalStore: ls,
		useId: Qs,
		useHostTransitionStatus: Zs,
		useFormState: Os,
		useActionState: Os,
		useOptimistic: function(e, t) {
			var n = es();
			return Fo === null ? (n.baseState = e, [e, n.queue.dispatch]) : gs(n, Fo, e, t);
		},
		useMemoCache: is,
		useCacheRefresh: $s,
		useEffectEvent: Is
	};
	function Z(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : D({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var dc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Od(), i = so(r);
			i.payload = t, n != null && (i.callback = n), t = co(e, i, r), t !== null && (jd(t, e, r), lo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Od(), i = so(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = co(e, i, r), t !== null && (jd(t, e, r), lo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Od(), r = so(n);
			r.tag = 2, t != null && (r.callback = t), t = co(e, r, n), t !== null && (jd(t, e, n), lo(t, e, n));
		}
	};
	function fc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Pr(n, r) || !Pr(i, a) : !0;
	}
	function pc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && dc.enqueueReplaceState(t, t.state, null);
	}
	function mc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = D({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function hc(e) {
		fi(e);
	}
	function gc(e) {
		console.error(e);
	}
	function _c(e) {
		fi(e);
	}
	function vc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function yc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function bc(e, t, n) {
		return n = so(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			vc(e, t);
		}, n;
	}
	function xc(e) {
		return e = so(e), e.tag = 3, e;
	}
	function Sc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				yc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			yc(t, n, r), typeof i != "function" && (hd === null ? hd = /* @__PURE__ */ new Set([this]) : hd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Cc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ma(t, n, a, !0), n = So.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Co === null ? Ud() : n.alternate === null && nd === 0 && (nd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ua ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), ff(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ua ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), ff(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return ff(e, r, a), Ud(), !1;
		}
		if (J) return t = So.current, t === null ? (r !== $i && (t = Error(i(423), { cause: r }), oa(Pi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Pi(r, n), a = bc(e.stateNode, r, a), uo(e, a), nd !== 4 && (nd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== $i && (e = Error(i(422), { cause: r }), oa(Pi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Pi(o, n), cd === null ? cd = [o] : cd.push(o), nd !== 4 && (nd = 2), t === null) return !0;
		r = Pi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = bc(n.stateNode, r, e), uo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (hd === null || !hd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = xc(a), Sc(a, e, n, r), uo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var wc = Error(i(461)), Tc = !1;
	function Ec(e, t, n, r) {
		t.child = e === null ? ro(t, null, n, r) : no(t, e.child, n, r);
	}
	function Dc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ga(t), r = Ko(e, t, n, o, a, i), s = Xo(), e !== null && !Tc ? (Zo(e, t, i), tl(e, t, i)) : (J && s && Ki(t), t.flags |= 1, Ec(e, t, r, i), t.child);
	}
	function Oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Ti(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, kc(e, t, a, r, i)) : (e = Oi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !nl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Pr : n, n(o, r) && e.ref === t.ref) return tl(e, t, i);
		}
		return t.flags |= 1, e = Ei(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function kc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Pr(a, r) && e.ref === t.ref) {
				if (Tc = !1, t.pendingProps = r = a, nl(e, i)) e.flags & 131072 && (Tc = !0);
				else return t.lanes = e.lanes, tl(e, t, i);
			}
		}
		return Lc(e, t, n, r, i);
	}
	function Ac(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Mc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ra(t, a === null ? null : a.cachePool), a === null ? bo() : yo(t, a), Eo(t);
			else return r = t.lanes = 536870912, Mc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ra(t, null), bo(), Do()) : (Ra(t, a.cachePool), yo(t, a), Do(), t.memoizedState = null);
		return Ec(e, t, i, n), t.child;
	}
	function jc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Mc(e, t, n, r, i) {
		var a = La();
		return a = a === null ? null : {
			parent: Ca._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ra(t, null), bo(), Eo(t), e !== null && ma(e, t, r, !0), t.childLanes = i, null;
	}
	function Nc(e, t) {
		return t = Kc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Pc(e, t, n) {
		return no(t, e.child, null, n), e = Nc(t, t.pendingProps), e.flags |= 2, Oo(t), t.memoizedState = null, e;
	}
	function Fc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (J) {
				if (r.mode === "hidden") return e = Nc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, jc(null, e);
				if (To(t), (e = Xi) ? (e = am(e, Qi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Yi = t, Xi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = 536870912, null;
			}
			return Nc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (To(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Pc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Tc || ma(e, t, n, !1), a = (n & e.childLanes) !== 0, Tc || a) {
				if (_o.current === null) {
					if (r = qu, r !== null && (s = st(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, yi(e, s), jd(r, e, s), wc;
					Ud();
				}
				t = Pc(e, t, n);
			} else e = o.treeContext, Xi = lm(s.nextSibling), Yi = t, J = !0, Zi = null, Qi = !1, e !== null && Ji(t, e), t = Nc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ei(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Ic(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Lc(e, t, n, r, i) {
		return ga(t), n = Ko(e, t, n, r, void 0, i), r = Xo(), e !== null && !Tc ? (Zo(e, t, i), tl(e, t, i)) : (J && r && Ki(t), t.flags |= 1, Ec(e, t, n, i), t.child);
	}
	function Rc(e, t, n, r, i, a) {
		return ga(t), t.updateQueue = null, n = Jo(t, r, n, i), qo(e), r = Xo(), e !== null && !Tc ? (Zo(e, t, a), tl(e, t, a)) : (J && r && Ki(t), t.flags |= 1, Ec(e, t, n, a), t.child);
	}
	function zc(e, t, n, r, i) {
		if (ga(t), t.stateNode === null) {
			var a = Si, o = n.contextType;
			typeof o == "object" && o && (a = _a(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = dc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ao(t), o = n.contextType, a.context = typeof o == "object" && o ? _a(o) : Si, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Z(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && dc.enqueueReplaceState(a, a.state, null), mo(t, r, a, i), po(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = mc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Si, typeof u == "object" && u && (o = _a(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && pc(t, a, r, o), io = !1;
			var f = t.memoizedState;
			a.state = f, mo(t, r, a, i), po(), l = t.memoizedState, s || f !== l || io ? (typeof d == "function" && (Z(t, n, d, r), l = t.memoizedState), (c = io || fc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, oo(e, t), o = t.memoizedProps, u = mc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Si, typeof l == "object" && l && (c = _a(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && pc(t, a, r, c), io = !1, f = t.memoizedState, a.state = f, mo(t, r, a, i), po();
			var p = t.memoizedState;
			o !== d || f !== p || io || e !== null && e.dependencies !== null && ha(e.dependencies) ? (typeof s == "function" && (Z(t, n, s, r), p = t.memoizedState), (u = io || fc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ha(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Ic(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = no(t, e.child, null, i), t.child = no(t, null, n, i)) : Ec(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = tl(e, t, i), e;
	}
	function Bc(e, t, n, r) {
		return ia(), t.flags |= 256, Ec(e, t, n, r), t.child;
	}
	var Vc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Hc(e) {
		return {
			baseLanes: e,
			cachePool: za()
		};
	}
	function Uc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= od), e;
	}
	function Wc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(ko.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (J) {
				if (i ? wo(t) : Do(), (e = Xi) ? (e = am(e, Qi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Yi = t, Xi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Do(), i = t.mode, a = Kc({
				mode: "hidden",
				children: a
			}, i), r = ki(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Hc(n), r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(null, r)) : (wo(t), Gc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Jc(e, t, a, o, r, c, s, n);
		}
		return i ? (Do(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ei(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = ki(i, a, n, null), i.flags |= 2) : i = Ei(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, jc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Hc(n) : (a = i.cachePool, a === null ? a = za() : (s = Ca._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Uc(e, o, n), t.memoizedState = Vc, jc(e.child, r)) : (wo(t), n = e.child, e = n.sibling, n = Ei(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Gc(e, t) {
		return t = Kc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Kc(e, t) {
		return e = wi(22, e, null, t), e.lanes = 0, e;
	}
	function qc(e, t, n) {
		return no(t, e.child, null, n), e = Gc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Jc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (wo(t), t.flags &= -257, qc(e, t, c)) : t.memoizedState === null ? (Do(), o = a.fallback, s = t.mode, a = Kc({
			mode: "visible",
			children: a.children
		}, s), o = ki(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, no(t, e.child, null, c), a = t.child, a.memoizedState = Hc(c), a.childLanes = Uc(e, r, c), t.memoizedState = Vc, jc(null, a)) : (Do(), t.child = e.child, t.flags |= 128, null);
		if (wo(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, oa({
				value: a,
				source: null,
				stack: null
			})), qc(e, t, c);
		}
		if (Tc || ma(e, t, c, !1), r = (c & e.childLanes) !== 0, Tc || r) {
			if (_o.current !== null) return qc(e, t, c);
			if (r = qu, r !== null && (a = st(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, yi(e, a), jd(r, e, a), wc;
			return om(o) || Ud(), qc(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Xi = lm(o.nextSibling), Yi = t, J = !0, Zi = null, Qi = !1, e !== null && Ji(t, e), t = Gc(t, a.children), t.flags |= 134221824, t);
	}
	function Yc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), fa(e.return, t, n);
	}
	function Xc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Mo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function Zc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Qc(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function $c(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ko.current;
		if (t.flags & 128) return Ao(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Ao(t, o), i === "backwards" && e !== null ? (Qc(e), Ec(e, t, r, n), Qc(e)) : Ec(e, t, r, n), r = J ? Ri : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Yc(e, n, t);
			else if (e.tag === 19) Yc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = Xc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, Qc(t)), Zc(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Mo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Zc(t, !0, n, null, a, r);
				break;
			case "together":
				Zc(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = Xc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Zc(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function el(e, t, n) {
		var r = t.pendingProps;
		return ua(t, t.type, r.value), Ec(e, t, r.children, n), t.child;
	}
	function tl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), rd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ma(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ei(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ei(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function nl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ha(e)));
	}
	function rl(e, t, n) {
		switch (t.tag) {
			case 3:
				he(t, t.stateNode.containerInfo), ua(t, Ca, e.memoizedState.cache), ia();
				break;
			case 27:
			case 5:
				_e(t);
				break;
			case 4:
				he(t, t.stateNode.containerInfo);
				break;
			case 10:
				ua(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, To(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return wo(t), t.flags |= 128, null;
					r = ma(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Wc(e, t, n) : (wo(t), e = tl(e, t, n), e === null ? null : e.sibling);
				}
				wo(t);
				break;
			case 19:
				if (t.flags & 128) return $c(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (ma(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return $c(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ao(t, ko.current), r) break;
				return null;
			case 22: return t.lanes = 0, Ac(e, t, n, t.pendingProps);
			case 24: ua(t, Ca, e.memoizedState.cache);
		}
		return tl(e, t, n);
	}
	function il(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Tc = !0;
			else {
				if (!nl(e, n) && !(t.flags & 128)) return Tc = !1, rl(e, t, n);
				Tc = !!(e.flags & 131072);
			}
		} else Tc = !1, J && t.flags & 1048576 && Gi(t, Ri, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ka(t.elementType), t.type = e, typeof e == "function") Ti(e) ? (r = mc(e, r), t.tag = 1, t = zc(null, t, e, r, n)) : (t.tag = 0, t = Lc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === I) {
								t.tag = 11, t = Dc(null, t, e, r, n);
								break a;
							}
							if (a === R) {
								t.tag = 14, t = Oc(null, t, e, r, n);
								break a;
							}
							if (a === F) {
								t.tag = 10, t.type = e, t = el(null, t, n);
								break a;
							}
						}
						throw t = se(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Lc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = mc(r, t.pendingProps), zc(e, t, r, a, n);
			case 3:
				a: {
					if (he(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, oo(e, t), mo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ua(t, Ca, r), r !== o.cache && pa(t, [Ca], n, !0), po(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Bc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Pi(Error(i(424)), t), oa(a), t = Bc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Xi = lm(e.firstChild), Yi = t, J = !0, Zi = null, Qi = !0, n = ro(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ia(), r === a) {
							t = tl(e, t, n);
							break a;
						}
						Ec(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Ic(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : J || (t.stateNode = fp(t.type, t.pendingProps, pe.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return _e(t), e === null && J && (r = t.stateNode = hm(t.type, t.pendingProps, pe.current), Yi = t, Qi = !0, a = Xi, Sp(t.type) ? (um = a, Xi = lm(r.firstChild)) : Xi = a), Ec(e, t, t.pendingProps.children, n), Ic(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && J && ((a = r = Xi) && (r = rm(r, t.type, t.pendingProps, Qi), r === null ? a = !1 : (t.stateNode = r, Yi = t, Xi = lm(r.firstChild), Qi = !1, a = !0)), a || ea(t)), _e(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Ko(e, t, Yo, null, null, n), sh._currentValue = a), Ic(e, t), Ec(e, t, r, n), t.child;
			case 6: return e === null && J && ((e = n = Xi) && (n = im(n, t.pendingProps, Qi), n === null ? e = !1 : (t.stateNode = n, Yi = t, Xi = null, e = !0)), e || ea(t)), null;
			case 13: return Wc(e, t, n);
			case 4: return he(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = no(t, null, r, n) : Ec(e, t, r, n), t.child;
			case 11: return Dc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Ic(e, t), Ec(e, t, r, n), t.child;
			case 8: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ec(e, t, t.pendingProps.children, n), t.child;
			case 10: return el(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, ga(t), a = _a(a), r = r(a), t.flags |= 1, Ec(e, t, r, n), t.child;
			case 14: return Oc(e, t, t.type, t.pendingProps, n);
			case 15: return kc(e, t, t.type, t.pendingProps, n);
			case 19: return $c(e, t, n);
			case 31: return Fc(e, t, n);
			case 22: return Ac(e, t, n, t.pendingProps);
			case 24: return ga(t), r = _a(Ca), e === null ? (a = La(), a === null && (a = qu, o = wa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ao(t), ua(t, Ca, a)) : ((e.lanes & n) !== 0 && (oo(e, t), mo(t, null, null, n), po()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ua(t, Ca, r), r !== a.cache && pa(t, [Ca], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ua(t, Ca, r))), Ec(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : J && Ki(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Ic(e, t), Ec(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function al(e) {
		e.flags |= 4;
	}
	function ol(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Bd()) e.flags |= 8192;
				else throw qa = Ua, Va;
			}
		} else e.flags &= -16777217;
	}
	function sl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Bd()) e.flags |= 8192;
			else throw qa = Ua, Va;
		}
	}
	function cl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : tt(), e.lanes |= t, sd |= t);
	}
	function ll(e, t) {
		if (!J) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function ul(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function dl(e, t, n) {
		var r = t.pendingProps;
		switch (qi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return ul(t), null;
			case 1: return ul(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), da(Ca), ge(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ra(t) ? al(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, aa())), ul(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (al(t), o === null ? (ul(t), ol(t, a, null, r, n)) : (ul(t), sl(t, o))) : o ? o === e.memoizedState ? (ul(t), t.flags &= -16777217) : (al(t), ul(t), sl(t, o)) : (e = e.memoizedProps, e !== r && al(t), ul(t), ol(t, a, e, r, n)), null;
			case 27:
				if (ve(t), n = pe.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ul(t), t.subtreeFlags &= -33554433, null;
					}
					e = fe.current, ra(t) ? ta(t, e) : (e = hm(a, r, n), t.stateNode = e, al(t));
				}
				return ul(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (ve(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ul(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = fe.current, ra(t)) ta(t, o);
					else {
						var s = lp(pe.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[pt] = t, o[mt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && al(t);
					}
				}
				return ul(t), t.subtreeFlags &= -33554433, ol(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && al(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = pe.current, ra(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Yi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[pt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || $f(e.nodeValue, n)), e || ea(t, !0);
					} else e = lp(e).createTextNode(r), e[pt] = t, t.stateNode = e;
				}
				return ul(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ra(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[pt] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ul(t), e = !1;
					} else n = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Oo(t), t) : (Oo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return ul(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ra(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[pt] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ul(t), a = !1;
					} else a = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Oo(t), t) : (Oo(t), null);
				}
				return Oo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), cl(t, t.updateQueue), ul(t), null);
			case 4: return ge(), e === null && Uf(t.stateNode.containerInfo), t.flags |= 67108864, ul(t), null;
			case 10: return da(t.type), ul(t), null;
			case 19:
				if (jo(t), r = t.memoizedState, r === null) return ul(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) ll(r, !1);
					else {
						if (nd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Mo(e), o !== null) {
								for (t.flags |= 128, ll(r, !1), e = o.updateQueue, t.updateQueue = e, cl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Di(n, e), n = n.sibling;
								return Ao(t, ko.current & 1 | 2), J && Wi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && je() > pd && (t.flags |= 128, a = !0, ll(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Mo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, cl(t, e), ll(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !J) return ul(t), null;
						} else 2 * je() - r.renderingStartTime > pd && n !== 536870912 && (t.flags |= 128, a = !0, ll(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = je(), e.sibling = null, o = ko.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || J ? Ao(t, o) : (n = o, K(So, t), K(ko, n), Co === null && (Co = t)), J && Wi(t, r.treeForkCount), e;
				}
				return ul(t), null;
			case 22:
			case 23: return Oo(t), xo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (ul(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ul(t), n = t.updateQueue, n !== null && cl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && G(Ia), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), da(Ca), ul(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, ul(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function fl(e, t) {
		switch (qi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return da(Ca), ge(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ve(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Oo(t), t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Oo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return jo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return ge(), null;
			case 10: return da(t.type), null;
			case 22:
			case 23: return Oo(t), xo(), e !== null && G(Ia), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return da(Ca), null;
			case 25: return null;
			default: return null;
		}
	}
	function pl(e, t) {
		switch (qi(t), t.tag) {
			case 3:
				da(Ca), ge();
				break;
			case 26:
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				ge();
				break;
			case 31:
				t.memoizedState !== null && Oo(t);
				break;
			case 13:
				Oo(t);
				break;
			case 19:
				jo(t);
				break;
			case 10:
				da(t.type);
				break;
			case 22:
			case 23:
				Oo(t), xo(), e !== null && G(Ia);
				break;
			case 24: da(Ca);
		}
	}
	function ml(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			df(t, t.return, e);
		}
	}
	function hl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								df(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			df(t, t.return, e);
		}
	}
	function gl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				go(t, n);
			} catch (t) {
				df(e, e.return, t);
			}
		}
	}
	function _l(e, t, n) {
		n.props = mc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			df(e, t, n);
		}
	}
	function vl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = li(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							h(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			df(e, t, n);
		}
	}
	function yl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				df(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				df(e, t, n);
			}
			else n.current = null;
		}
	}
	function bl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function xl(e) {
		for (var t = e.return; t !== null && (wl(t) && em(e.stateNode, t.stateNode), !Cl(t));) t = t.return;
	}
	function Sl(e) {
		for (var t = e.return; t !== null && (wl(t) && tm(e.stateNode, t.stateNode), !Cl(t));) t = t.return;
	}
	function Cl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function wl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Tl(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			df(e, e.return, t);
		}
	}
	function El(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[mt] = t;
		} catch (t) {
			df(e, e.return, t);
		}
	}
	function Q(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function Dl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Q(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Ol(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = un)), bl(e, r), Lt = !0;
		else if (i !== 4 && (i === 27 && (bl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Ol(e, t, n, r), e = e.sibling; e !== null;) Ol(e, t, n, r), e = e.sibling;
	}
	function kl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), bl(e, r), Lt = !0;
		else if (i !== 4 && (i === 27 && (bl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (kl(e, t, n, r), e = e.sibling; e !== null;) kl(e, t, n, r), e = e.sibling;
	}
	function Al(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[pt] = e, t[mt] = n;
		} catch (t) {
			df(e, e.return, t);
		}
	}
	var jl = !1, Ml = null;
	function Nl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (jl = !0);
	}
	var Pl = null;
	function Fl() {
		var e = Pl;
		return Pl = null, e;
	}
	var Il = 0;
	function Ll(e, t, n, r, i) {
		return Il = 0, Rl(e.child, t, n, r, i);
	}
	function Rl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				jl = !0, Tp(o, Il === 0 ? t : t + "_" + Il, n), Il++;
			} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Rl(e.child, t, n, r, i) && (a = !0));
			e = e.sibling;
		}
		return a;
	}
	function zl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || zl(e.child, t)), e = e.sibling;
	}
	function Bl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Bl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = di(t.default, t.share), t !== "none" && (Ll(e, n, t, null, !1) || zl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Vl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = li(r, n), a = di(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Bl(e) : Ll(e, i, a, null, !1) ? (Bl(e), n.paired || t || Ad(e, r.onEnter)) : zl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Vl(e, t), e = e.sibling;
		else Bl(e);
	}
	function Hl(e) {
		if (Ml !== null && Ml.size !== 0) {
			var t = Ml;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = di(n.default, n.share);
								if (a !== "none" && (Ll(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Ad(e, n.onShare)) : zl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Hl(e);
				}
				e = e.sibling;
			}
		}
	}
	function Ul(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = li(t, e.stateNode), r = Ml === null ? void 0 : Ml.get(n), i = di(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Ll(e, n, i, null, !1) ? r === void 0 ? Ad(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Ml.delete(n), Ad(e, t.onShare)) : zl(e.child, !1)), Ml !== null && Hl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Ul(e), e = e.sibling;
		else Ml !== null && Hl(e);
	}
	function Wl(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = li(t, e.stateNode);
				t = di(t.default, t.update), e.flags &= -5, t !== "none" && Ll(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && Wl(e);
			e = e.sibling;
		}
	}
	function Gl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, zl(e.child, !1));
				}
				Gl(e);
			}
			e = e.sibling;
		}
	}
	function Kl(e) {
		if (e.tag === 30) e.stateNode.paired = null, zl(e.child, !1), Gl(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Kl(e), e = e.sibling;
		else Gl(e);
	}
	function ql(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? zl(e.child, !1) : e.subtreeFlags & 33554432 && ql(e), e = e.sibling;
	}
	function Jl(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Il < a.length) {
					var l = a[Il], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, Il === 0 ? n : n + "_" + Il, i), s && e.flags & 4 || (Pl === null && (Pl = []), Pl.push(c, Il === 0 ? r : r + "_" + Il, t.memoizedProps)), Il++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : Jl(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Yl(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = li(n, r), a = di(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Il = 0, i = Jl(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Ad(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Yl(e, t);
			e = e.sibling;
		}
	}
	var Xl = !1, Zl = !1, Ql = !1, $l = !1, eu = typeof WeakSet == "function" ? WeakSet : Set, tu = null, nu = !1, ru = !1, iu = !1, au = !1;
	function ou(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = zr(e), Br(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, tu = t, t = n ? 9270 : 1024; tu !== null;) {
			if (e = tu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Ul(r[a]);
			if (e.alternate === null && e.flags & 2) n && Nl(e), su(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Ul(r), su(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Nl(e), su(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, tu = r) : (n && Wl(e), su(n));
			}
		}
		Ml = null;
	}
	function su(e) {
		for (; tu !== null;) {
			var t = tu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = mc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							df(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = li(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = di(a.default, a.update), a !== "none" && Ll(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, tu = r;
				break;
			}
			tu = t.return;
		}
	}
	function cu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Du(e, n), r & 4 && ml(5, n);
				break;
			case 1:
				if (Du(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						df(n, n.return, e);
					}
					else {
						var i = mc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							df(n, n.return, e);
						}
					}
				}
				r & 64 && gl(n), r & 512 && vl(n, n.return);
				break;
			case 3:
				if (Du(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						go(e, t);
					} catch (e) {
						df(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Al(n);
			case 26:
			case 5:
				Du(e, n), t === null && r & 4 && Tl(n), r & 512 && vl(n, n.return);
				break;
			case 12:
				Du(e, n);
				break;
			case 31:
				Du(e, n), r & 4 && _u(e, n);
				break;
			case 13:
				Du(e, n), r & 4 && vu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = hf.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Xl, !r) {
					var a = t !== null && t.memoizedState !== null || Zl;
					t = Xl, i = Zl, Xl = r, (Zl = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), ku(e, n, r)) : Du(e, n), Xl = t, Zl = i;
				}
				break;
			case 30:
				Du(e, n), r & 512 && vl(n, n.return);
				break;
			case 7: r & 512 && vl(n, n.return);
			default: Du(e, n);
		}
	}
	function lu(e, t) {
		for (e = e.child; e !== null;) uu(e, t), e = e.sibling;
	}
	function uu(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					df(e, e.return, t);
				}
				du(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, Lt = !0;
				} catch (t) {
					df(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					df(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && lu(e, t);
				break;
			default: lu(e, t);
		}
	}
	function du(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						uu(n, r);
						break a;
					case 22:
						n.memoizedState === null && du(n, r);
						break a;
					default: du(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function fu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, fu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && St(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var pu = null, mu = !1;
	function hu(e, t, n) {
		for (n = n.child; n !== null;) gu(e, t, n), n = n.sibling;
	}
	function gu(e, t, n) {
		if (Ve && typeof Ve.onCommitFiberUnmount == "function") try {
			Ve.onCommitFiberUnmount(Be, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Zl || yl(n, t), hu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Zl && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Zl || yl(n, t), Sl(n);
				var r = pu, i = mu;
				Sp(n.type) && (pu = n.stateNode, mu = !1), hu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), pu = r, mu = i;
				break;
			case 5: Zl || yl(n, t), Sl(n);
			case 6:
				if (n.tag === 6 && Sl(n), r = pu, i = mu, pu = null, hu(e, t, n), pu = r, mu = i, pu !== null) {
					if (mu) try {
						(pu.nodeType === 9 ? pu.body : pu.nodeName === "HTML" ? pu.ownerDocument.body : pu).removeChild(n.stateNode), Lt = !0;
					} catch (e) {
						df(n, t, e);
					}
					else try {
						pu.removeChild(n.stateNode), Lt = !0;
					} catch (e) {
						df(n, t, e);
					}
				}
				break;
			case 18:
				pu !== null && (mu ? (e = pu, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(pu, n.stateNode));
				break;
			case 4:
				r = pu, i = mu, pu = n.stateNode.containerInfo, mu = !0, hu(e, t, n), pu = r, mu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				hl(2, n, t), Zl || hl(4, n, t), hu(e, t, n);
				break;
			case 1:
				Zl || (yl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && _l(n, t, r)), hu(e, t, n);
				break;
			case 21:
				hu(e, t, n);
				break;
			case 22:
				Zl = (r = Zl) || n.memoizedState !== null, hu(e, t, n), Zl = r;
				break;
			case 30:
				yl(n, t), hu(e, t, n);
				break;
			case 7:
				Zl || yl(n, t), hu(e, t, n);
				break;
			default: hu(e, t, n);
		}
	}
	function _u(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				df(t, t.return, e);
			}
		}
	}
	function vu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			df(t, t.return, e);
		}
	}
	function yu(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new eu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new eu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function bu(e, t) {
		var n = yu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = gf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function $(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							pu = l.stateNode, mu = !1;
							break a;
						}
						break;
					case 5:
						pu = l.stateNode, mu = !1;
						break a;
					case 3:
					case 4:
						pu = l.stateNode.containerInfo, mu = !0;
						break a;
				}
				l = l.return;
			}
			if (pu === null) throw Error(i(160));
			gu(s, c, o), pu = null, mu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Su(t, e, n), t = t.sibling;
	}
	var xu = null;
	function Su(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				$(t, e, n), Cu(e), a & 4 && (hl(3, e, e.return), ml(3, e), hl(5, e, e.return));
				break;
			case 1:
				$(t, e, n), Cu(e), a & 512 && (Zl || r === null || yl(r, r.return)), a & 64 && Xl && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = xu, $(t, e, n), Cu(e), a & 512 && (Zl || r === null || yl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (Xl) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[bt] || r[pt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[pt] = e, Dt(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[pt] = e, Dt(r), t = r;
									}
									e.stateNode = t;
								}
							} else Xl || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && El(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || Zl || t.parentNode.removeChild(t)) : a.count--, n === null ? Xl || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				$(t, e, n), Cu(e), a & 512 && (Zl || r === null || yl(r, r.return)), r !== null && a & 4 && El(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = Ql, Ql = !1, $(t, e, n), Ql = o, Cu(e), a & 512 && (Zl || r === null || yl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						tn(t, ""), Lt = !0;
					} catch (t) {
						df(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, El(e, t, r === null ? t : r.memoizedProps)), a & 1024 && ($l = !0);
				break;
			case 6:
				if ($(t, e, n), Cu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, Lt = !0;
					} catch (t) {
						df(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Lt = !1, Wm = null, o = xu, xu = bm(t.containerInfo), $(t, e, n), xu = o, Cu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					df(e, e.return, t);
				}
				$l && ($l = !1, wu(e)), Lt = !1;
				break;
			case 4:
				a = Ql, Ql = Xl, r = Rt(), o = xu, xu = bm(e.stateNode.containerInfo), $(t, e, n), Cu(e), xu = o, Lt && ru && (iu = !0), Lt = r, Ql = a;
				break;
			case 12:
				$(t, e, n), Cu(e);
				break;
			case 31:
				$(t, e, n), Cu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, bu(e, t)));
				break;
			case 13:
				$(t, e, n), Cu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (dd = je()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, bu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = Xl, l = Zl, u = Ql;
				Xl = c || o, Ql = u || o, Zl = l || s, $(t, e, n), Zl = l, Ql = u, Xl = c, Cu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || Xl || Zl || (t = s || Zl, n = Xl, r = Zl, Xl = o || Xl, Zl = t, Ou(e, 2), Xl = n, Zl = r), !o && Ql || lu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, bu(e, n))));
				break;
			case 19:
				$(t, e, n), Cu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, bu(e, t)));
				break;
			case 30:
				a & 512 && (Zl || r === null || yl(r, r.return)), a = Rt(), o = ru, s = (n & 335544064) === n, c = e.memoizedProps, ru = s && di(c.default, c.update) !== "none", $(t, e, n), Cu(e), s && r !== null && Lt && (e.flags |= 4), ru = o, Lt = a;
				break;
			case 21: break;
			case 7: a & 512 && (Zl || r === null || yl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: $(t, e, n), Cu(e);
		}
	}
	function Cu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Q(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (wl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Cl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						kl(e, Dl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (tn(l, ""), n.flags &= -33), kl(e, Dl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Ol(e, Dl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				df(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function wu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			wu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function Tu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Eu(t, e), t = t.sibling;
		else Yl(t, !1);
	}
	function Eu(e, t) {
		var n = e.alternate;
		if (n === null) Vl(e, !1);
		else switch (e.tag) {
			case 3:
				if (au = nu = !1, Fl(), Tu(t, e), !nu && !iu) {
					if (e = Pl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), au = !0;
				}
				Pl = null;
				break;
			case 5:
				Tu(t, e);
				break;
			case 4:
				r = nu, nu = !1, Tu(t, e), nu && (iu = !0), nu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Tu(t, e) : Vl(e, !1));
				break;
			case 30:
				r = nu, i = Fl(), nu = !1, Tu(t, e), nu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = li(a, o), o = li(n.memoizedProps, o);
				var s = di(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Il = 0, t = Jl(e, n, t, o, s, a, !0), Il !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Ad(e, e.memoizedProps.onUpdate), Pl = i) : i !== null && (i.push.apply(i, Pl), Pl = i), nu = e.flags & 32 ? !0 : r;
				break;
			default: Tu(t, e);
		}
	}
	function Du(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) cu(e, t.alternate, t), t = t.sibling;
	}
	function Ou(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					hl(4, n, n.return), Ou(n, r);
					break;
				case 1:
					yl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && _l(n, n.return, i), Ou(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					yl(n, n.return), n.tag !== 5 && n.tag !== 27 || Sl(n), Ou(n, r);
					break;
				case 6:
					Sl(n);
					break;
				case 26:
					yl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Zl || i.parentNode.removeChild(i), Ou(n, r);
					break;
				case 22:
					n.memoizedState === null && Ou(n, r);
					break;
				case 30:
					yl(n, n.return), Ou(n, r);
					break;
				case 7: yl(n, n.return);
				default: Ou(n, r);
			}
			e = e.sibling;
		}
	}
	function ku(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					ku(i, a, n), ml(4, a);
					break;
				case 1:
					if (ku(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						df(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) ho(l[i], c);
						} catch (e) {
							df(r, r.return, e);
						}
					}
					s && o & 64 && gl(a), vl(a, a.return);
					break;
				case 27: n & 2 && Al(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || xl(a), ku(i, a, n), s && r === null && o & 4 && Tl(a), vl(a, a.return);
					break;
				case 6:
					xl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || Xl || Km(bm(c.ownerDocument), a.type, c), ku(i, a, n), s && r === null && o & 4 && Tl(a), vl(a, a.return);
					break;
				case 12:
					ku(i, a, n);
					break;
				case 31:
					ku(i, a, n), s && o & 4 && _u(i, a);
					break;
				case 13:
					ku(i, a, n), s && o & 4 && vu(i, a);
					break;
				case 22:
					a.memoizedState === null && ku(i, a, n), vl(a, a.return);
					break;
				case 30:
					ku(i, a, n), vl(a, a.return);
					break;
				case 7: vl(a, a.return);
				default: ku(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Au(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Y(n));
	}
	function ju(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Y(e));
	}
	function Mu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Nu(e, t, n, r), t = t.sibling;
		else i && ql(t);
	}
	function Nu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && Kl(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Mu(e, t, n, r), a & 2048 && ml(9, t);
				break;
			case 1:
				Mu(e, t, n, r);
				break;
			case 3:
				Mu(e, t, n, r), i && au && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Y(a)));
				break;
			case 12:
				if (a & 2048) {
					Mu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						df(t, t.return, e);
					}
				} else Mu(e, t, n, r);
				break;
			case 31:
				Mu(e, t, n, r);
				break;
			case 13:
				Mu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && Kl(t), o._visibility & 2 ? Mu(e, t, n, r) : (o._visibility |= 2, Pu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && Kl(s), o._visibility & 2 ? Mu(e, t, n, r) : Fu(e, t)), a & 2048 && Au(s, t);
				break;
			case 24:
				Mu(e, t, n, r), a & 2048 && ju(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (zl(a.child, !0), zl(t.child, !0))), Mu(e, t, n, r);
				break;
			default: Mu(e, t, n, r);
		}
	}
	function Pu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Pu(a, o, s, c, i), ml(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Pu(a, o, s, c, i)) : u._visibility & 2 ? Pu(a, o, s, c, i) : Fu(a, o), i && l & 2048 && Au(o.alternate, o);
					break;
				case 24:
					Pu(a, o, s, c, i), i && l & 2048 && ju(o.alternate, o);
					break;
				default: Pu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Fu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Fu(n, r), i & 2048 && Au(r.alternate, r);
					break;
				case 24:
					Fu(n, r), i & 2048 && ju(r.alternate, r);
					break;
				default: Fu(n, r);
			}
			t = t.sibling;
		}
	}
	var Iu = 8192;
	function Lu(e, t, n) {
		if (e.subtreeFlags & Iu) for (e = e.child; e !== null;) Ru(e, t, n), e = e.sibling;
	}
	function Ru(e, t, n) {
		switch (e.tag) {
			case 26:
				Lu(e, t, n), e.flags & Iu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, xu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Lu(e, t, n), e.flags & Iu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = xu;
				xu = bm(e.stateNode.containerInfo), Lu(e, t, n), xu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Iu, Iu = 16777216, Lu(e, t, n), Iu = r) : Lu(e, t, n));
				break;
			case 30:
				if ((e.flags & Iu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Ml === null && (Ml = /* @__PURE__ */ new Map()), Ml.set(r, i);
				}
				Lu(e, t, n);
				break;
			default: Lu(e, t, n);
		}
	}
	function zu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Bu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				tu = r, Uu(r, e);
			}
			zu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Vu(e), e = e.sibling;
	}
	function Vu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Bu(e), e.flags & 2048 && hl(9, e, e.return);
				break;
			case 3:
				Bu(e);
				break;
			case 12:
				Bu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Hu(e)) : Bu(e);
				break;
			default: Bu(e);
		}
	}
	function Hu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				tu = r, Uu(r, e);
			}
			zu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					hl(8, t, t.return), Hu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Hu(t));
					break;
				default: Hu(t);
			}
			e = e.sibling;
		}
	}
	function Uu(e, t) {
		for (; tu !== null;) {
			var n = tu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					hl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Y(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, tu = r;
			else a: for (n = e; tu !== null;) {
				r = tu;
				var i = r.sibling, a = r.return;
				if (fu(r), r === n) {
					tu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, tu = i;
					break a;
				}
				tu = a;
			}
		}
	}
	var Wu = {
		getCacheForType: function(e) {
			var t = _a(Ca), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return _a(Ca).controller.signal;
		}
	}, Gu = typeof WeakMap == "function" ? WeakMap : Map, Ku = 0, qu = null, Ju = null, Yu = 0, Xu = 0, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0, nd = 0, rd = 0, id = 0, ad = 0, od = 0, sd = 0, cd = null, ld = null, ud = !1, dd = 0, fd = 0, pd = Infinity, md = null, hd = null, gd = 0, _d = null, vd = null, yd = 0, bd = 0, xd = null, Sd = null, Cd = null, wd = null, Td = null, Ed = 0, Dd = null;
	function Od() {
		return Ku & 2 && Yu !== 0 ? Yu & -Yu : U.T === null ? ut() : Mf();
	}
	function kd() {
		if (od === 0) {
			if (!(Yu & 536870912) || J) {
				var e = Je;
				Je <<= 1, !(Je & 3932160) && (Je = 262144), od = e;
			} else od = 536870912;
		}
		return e = So.current, e !== null && (e.flags |= 32), od;
	}
	function Ad(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(li(e.memoizedProps, n))), wd === null && (wd = []), wd.push(t.bind(null, r));
		}
	}
	function jd(e, t, n) {
		(e === qu && (Xu === 2 || Xu === 9) || e.cancelPendingCommit !== null) && (Rd(e, 0), Fd(e, Yu, od, !1)), rt(e, n), (!(Ku & 2) || e !== qu) && (e === qu && (!(Ku & 2) && (id |= n), nd === 4 && Fd(e, Yu, od, !1)), wf(e));
	}
	function Md(e, t, n) {
		if (Ku & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Qe(e, t), a = r ? Kd(e, t) : Wd(e, t, !0), o = r;
		do {
			if (a === 0) {
				$u && !r && Fd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Pd(n)) a = Wd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = cd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Rd(c, s).flags |= 256), s = Wd(c, s, !1), s !== 2 && s !== 6) {
								if (ed && !l) {
									c.errorRecoveryDisabledLanes |= o, id |= o, a = 4;
									break a;
								}
								o = ld, ld = a, o !== null && (ld === null ? ld = o : ld.push.apply(ld, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Rd(e, 0), Fd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Fd(r, t, od, !Qu);
							break a;
						case 2:
							ld = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = dd + 300 - je(), 10 < a)) {
						if (Fd(r, t, od, !Qu), Ze(r, 0, !0) !== 0) break a;
						yd = t, r.timeoutHandle = gp(Nd.bind(null, r, n, ld, md, ud, t, od, id, sd, Qu, o, "Throttled", -0, 0), a);
						break a;
					}
					Nd(r, n, ld, md, ud, t, od, id, sd, Qu, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		wf(e);
	}
	function Nd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: un
		}, Ml = null, Ru(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? dd - je() : (a & 4194048) === a ? fd - je() : 0, m = eh(d, m), m !== null) ? (yd = a, e.cancelPendingCommit = m($d.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Fd(e, a, o, !l)) : $d(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Pd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Nr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Fd(e, t, n, r) {
		t = $e(e, t), t &= ~ad, t &= ~id, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ue(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && at(e, n, t);
	}
	function Id() {
		return Ku & 6 ? !0 : (Tf(0, !1), !1);
	}
	function Ld() {
		if (Ju !== null) {
			if (Xu === 0) var e = Ju.return;
			else e = Ju, la = ca = null, Qo(e), Xa = null, Za = 0, e = Ju;
			for (; e !== null;) pl(e.alternate, e), e = e.return;
			Ju = null;
		}
	}
	function Rd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), yd = 0, Ld(), qu = e, Ju = n = Ei(e.current, null), Yu = t, Xu = 0, Zu = null, Qu = !1, $u = Qe(e, t), ed = !1, sd = od = ad = id = rd = nd = 0, ld = cd = null, ud = !1, td = $e(e, t), gi(), n;
	}
	function zd(e, t) {
		Po = null, U.H = sc, t === Ba || t === Ha ? (t = Ja(), Xu = 3) : t === Va ? (t = Ja(), Xu = 4) : Xu = t === wc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Zu = t, Ju === null && (nd = 1, vc(e, Pi(t, e.current)));
	}
	function Bd() {
		var e = So.current;
		return e === null ? !0 : (Yu & 4194048) === Yu ? Co === null : (Yu & 62914560) === Yu || Yu & 536870912 ? e === Co : !1;
	}
	function Vd() {
		var e = U.H;
		return U.H = sc, e === null ? sc : e;
	}
	function Hd() {
		var e = U.A;
		return U.A = Wu, e;
	}
	function Ud() {
		nd = 4, Qu || (Yu & 4194048) !== Yu && So.current !== null || ($u = !0), !(rd & 134217727) && !(id & 134217727) || qu === null || Fd(qu, Yu, od, !1);
	}
	function Wd(e, t, n) {
		var r = Ku;
		Ku |= 2;
		var i = Vd(), a = Hd();
		(qu !== e || Yu !== t) && (md = null, Rd(e, t)), t = !1;
		var o = nd;
		a: do
			try {
				if (Xu !== 0 && Ju !== null) {
					var s = Ju, c = Zu;
					switch (Xu) {
						case 8:
							Ld(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							So.current === null && (t = !0);
							var l = Xu;
							if (Xu = 0, Zu = null, Xd(e, s, c, l), n && $u) {
								o = 0;
								break a;
							}
							break;
						default: l = Xu, Xu = 0, Zu = null, Xd(e, s, c, l);
					}
				}
				Gd(), o = nd;
				break;
			} catch (t) {
				zd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, la = ca = null, Ku = r, U.H = i, U.A = a, Ju === null && (qu = null, Yu = 0, gi()), o;
	}
	function Gd() {
		for (; Ju !== null;) Jd(Ju);
	}
	function Kd(e, t) {
		var n = Ku;
		Ku |= 2;
		var r = Vd(), a = Hd();
		qu !== e || Yu !== t ? (md = null, pd = je() + 500, Rd(e, t)) : $u = Qe(e, t);
		a: do
			try {
				if (Xu !== 0 && Ju !== null) {
					t = Ju;
					var o = Zu;
					b: switch (Xu) {
						case 1:
							Xu = 0, Zu = null, Xd(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Wa(o)) {
								Xu = 0, Zu = null, Yd(t);
								break;
							}
							t = function() {
								Xu !== 2 && Xu !== 9 || qu !== e || (Xu = 7), wf(e);
							}, o.then(t, t);
							break a;
						case 3:
							Xu = 7;
							break a;
						case 4:
							Xu = 5;
							break a;
						case 7:
							Wa(o) ? (Xu = 0, Zu = null, Yd(t)) : (Xu = 0, Zu = null, Xd(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Ju.tag) {
								case 26: s = Ju.memoizedState;
								case 5:
								case 27:
									var c = Ju;
									if (s ? Ym(s) : c.stateNode.complete) {
										Xu = 0, Zu = null;
										var l = c.sibling;
										if (l !== null) Ju = l;
										else {
											var u = c.return;
											u === null ? Ju = null : (Ju = u, Zd(u));
										}
										break b;
									}
							}
							Xu = 0, Zu = null, Xd(e, t, o, 5);
							break;
						case 6:
							Xu = 0, Zu = null, Xd(e, t, o, 6);
							break;
						case 8:
							Ld(), nd = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				qd();
				break;
			} catch (t) {
				zd(e, t);
			}
		while (1);
		return la = ca = null, U.H = r, U.A = a, Ku = n, Ju === null ? (qu = null, Yu = 0, gi(), nd) : 0;
	}
	function qd() {
		for (; Ju !== null && !ke();) Jd(Ju);
	}
	function Jd(e) {
		var t = il(e.alternate, e, td);
		e.memoizedProps = e.pendingProps, t === null ? Zd(e) : Ju = t;
	}
	function Yd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Rc(n, t, t.pendingProps, t.type, void 0, Yu);
				break;
			case 11:
				t = Rc(n, t, t.pendingProps, t.type.render, t.ref, Yu);
				break;
			case 5:
				Qo(t);
				var r = t;
				r === Yi && (J ? (na(r), r.tag === 5 && r.stateNode != null && (Xi = r.stateNode)) : (na(r), J = !0));
			default: pl(n, t), t = Ju = Di(t, td), t = il(n, t, td);
		}
		e.memoizedProps = e.pendingProps, t === null ? Zd(e) : Ju = t;
	}
	function Xd(e, t, n, r) {
		la = ca = null, Qo(t), Xa = null, Za = 0;
		var i = t.return;
		try {
			if (Cc(e, i, t, n, Yu)) {
				nd = 1, vc(e, Pi(n, e.current)), Ju = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Ju = i, t;
			nd = 1, vc(e, Pi(n, e.current)), Ju = null;
			return;
		}
		t.flags & 32768 ? (J || r === 1 ? e = !0 : $u || Yu & 536870912 ? e = !1 : (Qu = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = So.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Qd(t, e)) : Zd(t);
	}
	function Zd(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Qd(t, Qu);
				return;
			}
			e = t.return;
			var n = dl(t.alternate, t, td);
			if (n !== null) {
				Ju = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Ju = t;
				return;
			}
			Ju = t = e;
		} while (t !== null);
		nd === 0 && (nd = 5);
	}
	function Qd(e, t) {
		do {
			var n = fl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Ju = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Ju = e;
				return;
			}
			Ju = e = n;
		} while (e !== null);
		nd = 6, Ju = null;
	}
	function $d(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			cf();
		while (gd !== 0);
		if (Ku & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === qu && (Ju = qu = null, Yu = 0), vd = t, _d = e, yd = n, xd = a, Sd = r, ef(e, t, n, s, c, l, f);
		}
	}
	function ef(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (bd = s, s |= hi, it(e, n, s, r, i, a), wd = null, (n & 335544064) === n ? (Td = Da(e), r = 10262) : (Td = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, _f(Fe, function() {
			return lf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), jl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = U.T, U.T = null, i = W.p, W.p = 2, a = Ku, Ku |= 4;
			try {
				ou(e, t, n);
			} finally {
				Ku = a, W.p = i, U.T = r;
			}
		}
		gd = 1, jl ? Cd = Mp(o, e.containerInfo, Td, rf, af, nf, of, lf, tf, null, null) : (rf(), af(), of());
	}
	function tf(e) {
		if (gd !== 0) {
			var t = _d.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function nf() {
		gd === 3 && (gd = 0, Eu(vd, _d), gd = 4);
	}
	function rf() {
		if (gd === 1) {
			gd = 0;
			var e = _d, t = vd, n = yd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = U.T, U.T = null;
				var i = W.p;
				W.p = 2;
				var a = Ku;
				Ku |= 4;
				try {
					ru = iu = !1, Su(t, e, n), n = cp;
					var o = zr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Rr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Br(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Lr(s, h), v = Lr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					Ku = a, W.p = i, U.T = r;
				}
			}
			e.current = t, gd = 2;
		}
	}
	function af() {
		if (gd === 2) {
			gd = 0;
			var e = _d, t = vd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = U.T, U.T = null;
				var r = W.p;
				W.p = 2;
				var i = Ku;
				Ku |= 4;
				try {
					cu(e, t.alternate, t);
				} finally {
					Ku = i, W.p = r, U.T = n;
				}
			}
			gd = 3;
		}
	}
	function of() {
		if (gd === 4 || gd === 3) {
			gd = 0;
			var e = Cd;
			Cd = null, Ae();
			var t = _d, n = vd, r = yd, i = Sd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? gd = 5 : (gd = 0, vd = _d = null, sf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (hd = null), lt(r), n = n.stateNode, Ve && typeof Ve.onCommitFiberRoot == "function") try {
				Ve.onCommitFiberRoot(Be, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = U.T, a = W.p, W.p = 2, U.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					U.T = n, W.p = a;
				}
			}
			if (i = wd, o = Td, Td = null, i !== null && (wd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			yd & 3 && cf(), wf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Dd ? Ed++ : (Ed = 0, Dd = t) : (Ed = 0, Dd = null), Tf(0, !1);
		}
	}
	function sf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Y(t)));
	}
	function cf() {
		return Cd !== null && (Cd.skipTransition(), Cd = null), rf(), af(), of(), lf();
	}
	function lf() {
		if (gd !== 5) return !1;
		var e = _d, t = bd;
		bd = 0;
		var n = lt(yd), r = U.T, a = W.p;
		try {
			W.p = 32 > n ? 32 : n, U.T = null, n = xd, xd = null;
			var o = _d, s = yd;
			if (gd = 0, vd = _d = null, yd = 0, Ku & 6) throw Error(i(331));
			var c = Ku;
			if (Ku |= 4, Vu(o.current), Nu(o, o.current, s, n), Ku = c, Tf(0, !1), Ve && typeof Ve.onPostCommitFiberRoot == "function") try {
				Ve.onPostCommitFiberRoot(Be, o);
			} catch {}
			return !0;
		} finally {
			W.p = a, U.T = r, sf(e, t);
		}
	}
	function uf(e, t, n) {
		t = Pi(n, t), t = bc(e.stateNode, t, 2), e = co(e, t, 2), e !== null && (rt(e, 2), wf(e));
	}
	function df(e, t, n) {
		if (e.tag === 3) uf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				uf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (hd === null || !hd.has(r))) {
					e = Pi(n, e), n = xc(2), r = co(t, n, 2), r !== null && (Sc(n, r, t, e), rt(r, 2), wf(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function ff(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Gu();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (ed = !0, i.add(n), e = pf.bind(null, e, t, n), t.then(e, e));
	}
	function pf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, qu === e && (Yu & n) === n && (nd === 4 || nd === 3 && (Yu & 62914560) === Yu && 300 > je() - dd ? Ku & 2 ? ad |= n : Rd(e, 0) : ad |= n, sd === Yu && (sd = 0)), wf(e);
	}
	function mf(e, t) {
		t === 0 && (t = tt()), e = yi(e, t), e !== null && (rt(e, t), wf(e));
	}
	function hf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), mf(e, n);
	}
	function gf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), mf(e, n);
	}
	function _f(e, t) {
		return De(e, t);
	}
	var vf = null, yf = null, bf = !1, xf = !1, Sf = !1, Cf = 0;
	function wf(e) {
		e !== yf && e.next === null && (yf === null ? vf = yf = e : yf = yf.next = e), xf = !0, bf || (bf = !0, jf());
	}
	function Tf(e, t) {
		if (!Sf && xf) {
			Sf = !0;
			do
				for (var n = !1, r = vf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Ue(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Af(r, a));
						} else a = Yu, a = Ze(r, r === qu ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Qe(r, a) || (n = !0, Af(r, a));
					}
					r = r.next;
				}
			while (n);
			Sf = !1;
		}
	}
	function Ef() {
		Df();
	}
	function Df() {
		xf = bf = !1;
		var e = 0;
		Cf !== 0 && hp() && (e = Cf);
		for (var t = je(), n = null, r = vf; r !== null;) {
			var i = r.next, a = Of(r, t);
			a === 0 ? (r.next = null, n === null ? vf = i : n.next = i, i === null && (yf = n)) : (n = r, (e !== 0 || a & 3) && (xf = !0)), r = i;
		}
		gd !== 0 && gd !== 5 || Tf(e, !1), Cf !== 0 && (Cf = 0);
	}
	function Of(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ue(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = et(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = qu, n = Yu, n = Ze(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Xu === 2 || Xu === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Oe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Qe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Oe(r), lt(n)) {
				case 2:
				case 8:
					n = Pe;
					break;
				case 32:
					n = Fe;
					break;
				case 268435456:
					n = Le;
					break;
				default: n = Fe;
			}
			return r = kf.bind(null, e), n = De(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Oe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function kf(e, t) {
		if (gd !== 0 && gd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (cf() && e.callbackNode !== n) return null;
		var r = Yu;
		return r = Ze(e, e === qu ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Md(e, r, t), Of(e, je()), e.callbackNode != null && e.callbackNode === n ? kf.bind(null, e) : null);
	}
	function Af(e, t) {
		if (cf()) return null;
		Md(e, t, !0);
	}
	function jf() {
		bp(function() {
			Ku & 6 ? De(Ne, Ef) : Df();
		});
	}
	function Mf() {
		if (Cf === 0) {
			var e = Aa;
			e === 0 && (e = qe, qe <<= 1, !(qe & 261888) && (qe = 256)), Cf = e;
		}
		return Cf;
	}
	function Nf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ln(e);
	}
	function Pf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Nf((i[mt] || null).action), o = r.submitter;
			o && (t = (t = o[mt] || null) ? Nf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new jn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Cf !== 0) {
								var e = new FormData(i, o);
								Js(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), Js(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Ff = 0; Ff < oi.length; Ff++) {
		var If = oi[Ff];
		si(If.toLowerCase(), "on" + (If[0].toUpperCase() + If.slice(1)));
	}
	si(Qr, "onAnimationEnd"), si($r, "onAnimationIteration"), si(ei, "onAnimationStart"), si("dblclick", "onDoubleClick"), si("focusin", "onFocus"), si("focusout", "onBlur"), si(ti, "onTransitionRun"), si(ni, "onTransitionStart"), si(ri, "onTransitionCancel"), si(ii, "onTransitionEnd"), Mt("onMouseEnter", ["mouseout", "mouseover"]), Mt("onMouseLeave", ["mouseout", "mouseover"]), Mt("onPointerEnter", ["pointerout", "pointerover"]), Mt("onPointerLeave", ["pointerout", "pointerover"]), jt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), jt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), jt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), jt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), jt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), jt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Rf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Lf));
	function zf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						fi(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						fi(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Bf(e, t) {
		var n = t[gt];
		n === void 0 && (n = t[gt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Wf(t, e, 2, !1), n.add(r));
	}
	function Vf(e, t, n) {
		var r = 0;
		t && (r |= 4), Wf(n, e, r, t);
	}
	var Hf = "_reactListening" + Math.random().toString(36).slice(2);
	function Uf(e) {
		if (!e[Hf]) {
			e[Hf] = !0, kt.forEach(function(t) {
				t !== "selectionchange" && (Rf.has(t) || Vf(t, !1, e), Vf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Hf] || (t[Hf] = !0, Vf("selectionchange", !1, t));
		}
	}
	function Wf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !bn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Gf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Ct(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		_n(function() {
			var r = a, i = fn(n), s = [];
			a: {
				var c = ai.get(e);
				if (c !== void 0) {
					var l = jn, u = e;
					switch (e) {
						case "keypress": if (En(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Yn;
							break;
						case "focusin":
							u = "focus", l = Bn;
							break;
						case "focusout":
							u = "blur", l = Bn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Bn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Rn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = zn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Qn;
							break;
						case Qr:
						case $r:
						case ei:
							l = Vn;
							break;
						case ii:
							l = $n;
							break;
						case "scroll":
						case "scrollend":
							l = Nn;
							break;
						case "wheel":
							l = er;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Hn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Xn;
							break;
						case "submit":
							l = Zn;
							break;
						case "toggle":
						case "beforetoggle": l = tr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = vn(m, p), g != null && d.push(Kf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== dn && (u = n.relatedTarget || n.fromElement) && (Ct(u) || u[ht])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Ct(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Rn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Xn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Tt(c), h = l == null ? u : Tt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Ct(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? E(c, l, Jf) : null, c !== null && Yf(s, u, c, d, !1), l !== null && f !== null && Yf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Tt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = xr;
					else if (hr(c)) {
						if (Sr) _ = jr;
						else {
							_ = kr;
							var v = Or;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && on(r.elementType) && (_ = xr) : _ = Ar;
					if (_ &&= _(e, r)) {
						gr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Tt(r) : window, e) {
					case "focusin":
						(hr(v) || v.contentEditable === "true") && (Hr = v, Ur = r, Wr = null);
						break;
					case "focusout":
						Wr = Ur = Hr = null;
						break;
					case "mousedown":
						Gr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Gr = !1, Kr(s, n, i);
						break;
					case "selectionchange": if (Vr) break;
					case "keydown":
					case "keyup": Kr(s, n, i);
				}
				var y;
				if (rr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else dr ? lr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (or && n.locale !== "ko" && (dr || b !== "onCompositionStart" ? b === "onCompositionEnd" && dr && (y = Tn()) : (Sn = i, Cn = "value" in Sn ? Sn.value : Sn.textContent, dr = !0)), v = qf(r, b), 0 < v.length && (b = new Un(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = ur(n), y !== null && (b.data = y)))), (y = ar ? fr(e, n) : pr(e, n)) && (b = qf(r, "onBeforeInput"), 0 < b.length && (v = new Un("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Pf(s, e, r, n, i);
			}
			zf(s, t);
		});
	}
	function Kf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function qf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = vn(e, n), i != null && r.unshift(Kf(e, i, a)), i = vn(e, t), i != null && r.push(Kf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Jf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Yf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = vn(n, a), l != null && o.unshift(Kf(n, l, c))) : i || (l = vn(n, a), l != null && o.push(Kf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Xf = /\r\n?/g, Zf = /\u0000|\uFFFD/g;
	function Qf(e) {
		return (typeof e == "string" ? e : "" + e).replace(Xf, "\n").replace(Zf, "");
	}
	function $f(e, t) {
		return t = Qf(t), Qf(e) === t;
	}
	function ep(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || tn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && tn(e, "" + r);
				else return;
				break;
			case "className":
				Bt(e, "class", r);
				break;
			case "tabIndex":
				Bt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Bt(e, n, r);
				break;
			case "style":
				an(e, r, o);
				return;
			case "data": if (t !== "object") {
				Bt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = ln(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && ep(e, t, "name", a.name, a, null), ep(e, t, "formEncType", a.formEncType, a, null), ep(e, t, "formMethod", a.formMethod, a, null), ep(e, t, "formTarget", a.formTarget, a, null)) : (ep(e, t, "encType", a.encType, a, null), ep(e, t, "method", a.method, a, null), ep(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = ln(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = un);
				return;
			case "onScroll":
				r != null && Bf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Bf("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = ln(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Bf("beforetoggle", e), Bf("toggle", e), zt(e, "popover", r);
				break;
			case "xlinkActuate":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				zt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = sn.get(n) || n, zt(e, n, r);
			else return;
		}
		Lt = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				an(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") tn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") tn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Bf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Bf("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = un);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!At.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[mt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					Lt = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : zt(e, n, r);
				}
				return;
		}
		Lt = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Bf("error", e), Bf("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: ep(e, t, o, s, n, null);
					}
				}
				a && ep(e, t, "srcSet", n.srcSet, n, null), r && ep(e, t, "src", n.src, n, null);
				return;
			case "input":
				Bf("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: ep(e, t, r, d, n, null);
					}
				}
				Xt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Bf("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: ep(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Qt(e, !!r, n, !0) : Qt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Bf("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: ep(e, t, s, c, n, null);
				}
				en(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: ep(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Bf("beforetoggle", e), Bf("toggle", e), Bf("cancel", e), Bf("close", e);
				break;
			case "iframe":
			case "object":
				Bf("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Lf.length; r++) Bf(Lf[r], e);
				break;
			case "image":
				Bf("error", e), Bf("load", e);
				break;
			case "details":
				Bf("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Bf("error", e), Bf("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: ep(e, t, u, r, n, null);
				}
				return;
			default: if (on(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && ep(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || ep(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (Lt = !0), o = m;
							break;
						case "name":
							m !== f && (Lt = !0), a = m;
							break;
						case "checked":
							m !== f && (Lt = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (Lt = !0), d = m;
							break;
						case "value":
							m !== f && (Lt = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (Lt = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && ep(e, t, p, m, r, f);
					}
				}
				Yt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || ep(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (Lt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (Lt = !0), c = o;
						break;
					case "multiple": o !== l && (Lt = !0), s = o;
					default: o !== l && ep(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Qt(e, !!n, n ? [] : "", !1) : Qt(e, !!n, t, !0)) : Qt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: ep(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (Lt = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (Lt = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && ep(e, t, s, a, r, o);
				}
				$t(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: ep(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (Lt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: ep(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && ep(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: ep(e, t, u, p, r, m);
				}
				return;
			default: if (on(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && ep(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || ep(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[pt] = r, n[mt] = t, np(n, e, t), Dt(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[bt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : D({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), h(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), h(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		h(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = b(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		h(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = g(this._fragmentFiber);
		e !== null && (e = b(e), e = lp(e).activeElement, e !== null && h(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), h(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), h(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return h(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = g(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		h(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, _(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = _(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = Ct(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = g(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = E(n, a, T), t === null ? t = !1 : (h(t, !0, C, a, n), a = x, x = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = E(r, a, T), t === null ? t = !1 : (h(t, !0, w, a, r), a = x, S = x = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		h(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || g(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), Zp(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), Zp(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = b(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), St(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[bt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && ep(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === un && (e.onclick = null), St(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		St(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = W.d;
	W.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = Id();
		return e || t;
	}
	function Cm(e) {
		var t = wt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Xs(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = Jt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), Dt(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Jt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Jt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Jt(n.imageSizes) + "\"]")) : i += "[href=\"" + Jt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = D({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[xt] = !0, o.onload = o.onerror = function() {
					Ot(o);
				}), Dt(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Jt(r) + "\"][href=\"" + Jt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = D({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), Dt(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Et(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = D({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					Dt(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = Et(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Dt(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = Et(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Dt(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = pe.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Et(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = Et(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Et(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + Jt(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return D({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[xt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[xt] = !0, t.onload = t.onerror = Ot.bind(null, t), np(t, "link", n), Dt(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + Jt(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Jt(n.href) + "\"]");
				if (r) return t.instance = r, Dt(r), r;
				var a = D({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Dt(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Dt(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), Dt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, Dt(a), a) : (r = n, (a = vm.get(o)) && (r = D({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Dt(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[bt] || a[pt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Dt(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), Dt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: F,
		Provider: null,
		Consumer: null,
		_currentValue: ce,
		_currentValue2: ce,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nt(0), this.hiddenUpdates = nt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = wi(3, null, null, t), e.current = a, a.stateNode = e, t = wa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ao(a), e;
	}
	function uh(e) {
		return e ? (e = Si, e) : Si;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = so(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = co(e, r, t), n !== null && (jd(n, e, t), lo(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = yi(e, 67108864);
			t !== null && jd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Od();
			t = ct(t);
			var n = yi(e, t);
			n !== null && jd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = U.T;
		U.T = null;
		var a = W.p;
		try {
			W.p = 2, yh(e, t, n, r);
		} finally {
			W.p = a, U.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = U.T;
		U.T = null;
		var a = W.p;
		try {
			W.p = 8, yh(e, t, n, r);
		} finally {
			W.p = a, U.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Gf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = wt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Xe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ue(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									wf(a), !(Ku & 6) && (pd = je() + 500, Tf(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = yi(a, 2), s !== null && jd(s, a, 2), Id(), ph(a, 2);
					}
					if (a = bh(r), a === null && Gf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Gf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = fn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = Ct(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Me()) {
				case Ne: return 2;
				case Pe: return 8;
				case Fe:
				case Ie: return 32;
				case Le: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = wt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = Ct(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				dn = r, n.target.dispatchEvent(r), dn = null;
			} else return t = wt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = wt(n);
				a !== null && (e.splice(t, 3), t -= 3, Js(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[mt] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[mt] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, Od(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), Id(), t[ht] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ut();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	W.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: U,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			Be = Jh.inject(qh), Ve = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = hc, s = gc, c = _c;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[ht] = t.current, Uf(e), new Wh(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ c(u(), 1), v = g();
function y(e, t = document) {
	return t.querySelector(e);
}
function b(e, t = document) {
	return Array.from(t.querySelectorAll(e));
}
function x(e, t, n, r) {
	let i = n;
	return e.addEventListener(t, i, r), () => e.removeEventListener(t, i, r);
}
function S(e, t) {
	let n = window.matchMedia(e), r = () => t(n.matches);
	return r(), x(n, "change", r);
}
//#endregion
//#region node_modules/gsap/gsap-core.js
function C(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function w(e, t) {
	e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
var T = {
	autoSleep: 120,
	force3D: "auto",
	nullTargetWarn: 1,
	units: { lineHeight: "" }
}, E = {
	duration: .5,
	overwrite: !1,
	delay: 0
}, D, O, k, A = 1e8, j = 1 / A, M = Math.PI * 2, N = M / 4, P = 0, F = Math.sqrt, I = Math.cos, ee = Math.sin, L = function(e) {
	return typeof e == "string";
}, R = function(e) {
	return typeof e == "function";
}, z = function(e) {
	return typeof e == "number";
}, te = function(e) {
	return e === void 0;
}, ne = function(e) {
	return typeof e == "object";
}, B = function(e) {
	return e !== !1;
}, re = function() {
	return typeof window < "u";
}, ie = function(e) {
	return R(e) || L(e);
}, ae = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {}, V = Array.isArray, oe = /random\([^)]+\)/g, se = /,\s*/g, H = /(?:-?\.?\d|\.)+/gi, U = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, W = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, ce = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, le = /[+-]=-?[.\d]+/, ue = /[^,'"\[\]\s]+/gi, de = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, G, K, fe, q, pe = {}, me = {}, he, ge = function(e) {
	return (me = Je(e, pe)) && mr;
}, _e = function(e, t) {
	return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, ve = function(e, t) {
	return !t && console.warn(e);
}, ye = function(e, t) {
	return e && (pe[e] = t) && me && (me[e] = t) || pe;
}, be = function() {
	return 0;
}, xe = {
	suppressEvents: !0,
	isStart: !0,
	kill: !1
}, Se = {
	suppressEvents: !0,
	kill: !1
}, Ce = { suppressEvents: !0 }, we = {}, Te = [], Ee = {}, De, Oe = {}, ke = {}, Ae = 30, je = [], Me = "", Ne = function(e) {
	var t = e[0], n, r;
	if (ne(t) || R(t) || (e = [e]), !(n = (t._gsap || {}).harness)) {
		for (r = je.length; r-- && !je[r].targetTest(t););
		n = je[r];
	}
	for (r = e.length; r--;) e[r] && (e[r]._gsap || (e[r]._gsap = new wn(e[r], n))) || e.splice(r, 1);
	return e;
}, Pe = function(e) {
	return e._gsap || Ne(jt(e))[0]._gsap;
}, Fe = function(e, t, n) {
	return (n = e[t]) && R(n) ? e[t]() : te(n) && e.getAttribute && e.getAttribute(t) || n;
}, Ie = function(e, t) {
	return (e = e.split(",")).forEach(t) || e;
}, Le = function(e) {
	return Math.round(e * 1e5) / 1e5 || 0;
}, Re = function(e) {
	return Math.round(e * 1e7) / 1e7 || 0;
}, ze = function(e, t) {
	var n = t.charAt(0), r = parseFloat(t.substr(2));
	return e = parseFloat(e), n === "+" ? e + r : n === "-" ? e - r : n === "*" ? e * r : e / r;
}, Be = function(e, t) {
	for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n;);
	return r < n;
}, Ve = function() {
	var e = Te.length, t = Te.slice(0), n, r;
	for (Ee = {}, Te.length = 0, n = 0; n < e; n++) r = t[n], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, He = function(e) {
	return !!(e._initted || e._startAt || e.add);
}, Ue = function(e, t, n, r) {
	Te.length && !O && Ve(), e.render(t, n, r || !!(O && t < 0 && He(e))), Te.length && !O && Ve();
}, We = function(e) {
	var t = parseFloat(e);
	return (t || t === 0) && (e + "").match(ue).length < 2 ? t : L(e) ? e.trim() : e;
}, Ge = function(e) {
	return e;
}, Ke = function(e, t) {
	for (var n in t) n in e || (e[n] = t[n]);
	return e;
}, qe = function(e) {
	return function(t, n) {
		for (var r in n) r in t || r === "duration" && e || r === "ease" || (t[r] = n[r]);
	};
}, Je = function(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}, Ye = function e(t, n) {
	for (var r in n) r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = ne(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]);
	return t;
}, Xe = function(e, t) {
	var n = {}, r;
	for (r in e) r in t || (n[r] = e[r]);
	return n;
}, Ze = function(e) {
	var t = e.parent || G, n = e.keyframes ? qe(V(e.keyframes)) : Ke;
	if (B(e.inherit)) for (; t;) n(e, t.vars.defaults), t = t.parent || t._dp;
	return e;
}, Qe = function(e, t) {
	for (var n = e.length, r = n === t.length; r && n-- && e[n] === t[n];);
	return n < 0;
}, $e = function(e, t, n, r, i) {
	n === void 0 && (n = "_first"), r === void 0 && (r = "_last");
	var a = e[r], o;
	if (i) for (o = t[i]; a && a[i] > o;) a = a._prev;
	return a ? (t._next = a._next, a._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[r] = t, t._prev = a, t.parent = t._dp = e, t;
}, et = function(e, t, n, r) {
	n === void 0 && (n = "_first"), r === void 0 && (r = "_last");
	var i = t._prev, a = t._next;
	i ? i._next = a : e[n] === t && (e[n] = a), a ? a._prev = i : e[r] === t && (e[r] = i), t._next = t._prev = t.parent = null;
}, tt = function(e, t) {
	e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, nt = function(e, t) {
	if (e && (!t || t._end > e._dur || t._start < 0)) for (var n = e; n;) n._dirty = 1, n = n.parent;
	return e;
}, rt = function(e) {
	for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
	return e;
}, it = function(e, t, n, r) {
	return e._startAt && (O ? e._startAt.revert(Se) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r));
}, at = function e(t) {
	return !t || t._ts && e(t.parent);
}, ot = function(e) {
	return e._repeat ? st(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, st = function(e, t) {
	var n = Math.floor(e = Re(e / t));
	return e && n === e ? n - 1 : n;
}, ct = function(e, t) {
	return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, lt = function(e) {
	return e._end = Re(e._start + (e._tDur / Math.abs(e._ts || e._rts || j) || 0));
}, ut = function(e, t) {
	var n = e._dp;
	return n && n.smoothChildTiming && e._ts && (e._start = Re(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), lt(e), n._dirty || nt(n, e)), e;
}, dt = function(e, t) {
	var n;
	if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = ct(e.rawTime(), t), (!t._dur || Tt(0, t.totalDuration(), n) - t._tTime > j) && t.render(n, !0)), nt(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
		if (e._dur < e.duration()) for (n = e; n._dp;) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
		e._zTime = -j;
	}
}, ft = function(e, t, n, r) {
	return t.parent && tt(t), t._start = Re((z(n) ? n : n || e !== G ? St(e, n, t) : e._time) + t._delay), t._end = Re(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), $e(e, t, "_first", "_last", e._sort ? "_start" : 0), gt(t) || (e._recent = t), r || dt(e, t), e._ts < 0 && ut(e, e._tTime), e;
}, pt = function(e, t) {
	return (pe.ScrollTrigger || _e("scrollTrigger", t)) && pe.ScrollTrigger.create(t, e);
}, mt = function(e, t, n, r, i) {
	if (Nn(e, t, i), !e._initted) return 1;
	if (!n && e._pt && !O && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && De !== un.frame) return Te.push(e), e._lazy = [i, r], 1;
}, ht = function e(t) {
	var n = t.parent;
	return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n));
}, gt = function(e) {
	var t = e.data;
	return t === "isFromStart" || t === "isStart";
}, _t = function(e, t, n, r) {
	var i = e.ratio, a = t < 0 || !t && (!e._start && ht(e) && (e._initted || !gt(e)) || (e._ts < 0 || e._dp._ts < 0) && !gt(e)) ? 0 : 1, o = e._rDelay, s = 0, c, l, u;
	if (o && e._repeat && (s = Tt(0, e._tDur, t), l = st(s, o), e._yoyo && l & 1 && (a = 1 - a), l !== st(e._tTime, o) && (i = 1 - a, e.vars.repeatRefresh && e._initted && e.invalidate())), a !== i || O || r || e._zTime === j || !t && e._zTime) {
		if (!e._initted && mt(e, t, r, n, s)) return;
		for (u = e._zTime, e._zTime = t || (n ? j : 0), n ||= t && !u, e.ratio = a, e._from && (a = 1 - a), e._time = 0, e._tTime = s, c = e._pt; c;) c.r(a, c.d), c = c._next;
		t < 0 && it(e, t, n, !0), e._onUpdate && !n && Jt(e, "onUpdate"), s && e._repeat && !n && e.parent && Jt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === a && (a && tt(e, 1), !n && !O && (Jt(e, a ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
	} else e._zTime ||= t;
}, vt = function(e, t, n) {
	var r;
	if (n > t) for (r = e._first; r && r._start <= n;) {
		if (r.data === "isPause" && r._start > t) return r;
		r = r._next;
	}
	else for (r = e._last; r && r._start >= n;) {
		if (r.data === "isPause" && r._start < t) return r;
		r = r._prev;
	}
}, yt = function(e, t, n, r) {
	var i = e._repeat, a = Re(t) || 0, o = e._tTime / e._tDur;
	return o && !r && (e._time *= a / e._dur), e._dur = a, e._tDur = i ? i < 0 ? 1e10 : Re(a * (i + 1) + e._rDelay * i) : a, o > 0 && !r && ut(e, e._tTime = e._tDur * o), e.parent && lt(e), n || nt(e.parent, e), e;
}, bt = function(e) {
	return e instanceof En ? nt(e) : yt(e, e._dur);
}, xt = {
	_start: 0,
	endTime: be,
	totalDuration: be
}, St = function e(t, n, r) {
	var i = t.labels, a = t._recent || xt, o = t.duration() >= A ? a.endTime(!1) : t._dur, s, c, l;
	return L(n) && (isNaN(n) || n in i) ? (c = n.charAt(0), l = n.substr(-1) === "%", s = n.indexOf("="), c === "<" || c === ">" ? (s >= 0 && (n = n.replace(/=/, "")), (c === "<" ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (l ? (s < 0 ? a : r).totalDuration() / 100 : 1)) : s < 0 ? (n in i || (i[n] = o), i[n]) : (c = parseFloat(n.charAt(s - 1) + n.substr(s + 1)), l && r && (c = c / 100 * (V(r) ? r[0] : r).totalDuration()), s > 1 ? e(t, n.substr(0, s - 1), r) + c : o + c)) : n == null ? o : +n;
}, Ct = function(e, t, n) {
	var r = z(t[1]), i = (r ? 2 : 1) + (e < 2 ? 0 : 1), a = t[i], o, s;
	if (r && (a.duration = t[1]), a.parent = n, e) {
		for (o = a, s = n; s && !("immediateRender" in o);) o = s.vars.defaults || {}, s = B(s.vars.inherit) && s.parent;
		a.immediateRender = B(o.immediateRender), e < 2 ? a.runBackwards = 1 : a.startAt = t[i - 1];
	}
	return new Bn(t[0], a, t[i + 1]);
}, wt = function(e, t) {
	return e || e === 0 ? t(e) : t;
}, Tt = function(e, t, n) {
	return n < e ? e : n > t ? t : n;
}, Et = function(e, t) {
	return !L(e) || !(t = de.exec(e)) ? "" : t[1];
}, Dt = function(e, t, n) {
	return wt(n, function(n) {
		return Tt(e, t, n);
	});
}, Ot = [].slice, kt = function(e, t) {
	return e && ne(e) && "length" in e && (!t && !e.length || e.length - 1 in e && ne(e[0])) && !e.nodeType && e !== K;
}, At = function(e, t, n) {
	return n === void 0 && (n = []), e.forEach(function(e) {
		var r;
		return L(e) && !t || kt(e, 1) ? (r = n).push.apply(r, jt(e)) : n.push(e);
	}) || n;
}, jt = function(e, t, n) {
	return k && !t && k.selector ? k.selector(e) : L(e) && !n && (fe || !dn()) ? Ot.call((t || q).querySelectorAll(e), 0) : V(e) ? At(e, n) : kt(e) ? Ot.call(e, 0) : e ? [e] : [];
}, Mt = function(e) {
	return e = jt(e)[0] || ve("Invalid scope") || {}, function(t) {
		var n = e.current || e.nativeElement || e;
		return jt(t, n.querySelectorAll ? n : n === e ? ve("Invalid scope") || q.createElement("div") : e);
	};
}, Nt = function(e) {
	return e.sort(function() {
		return .5 - Math.random();
	});
}, Pt = function(e) {
	if (R(e)) return e;
	var t = ne(e) ? e : { each: e }, n = yn(t.ease), r = t.from || 0, i = parseFloat(t.base) || 0, a = {}, o = r > 0 && r < 1, s = isNaN(r) || o, c = t.axis, l = r, u = r;
	return L(r) ? l = u = {
		center: .5,
		edges: .5,
		end: 1
	}[r] || 0 : !o && s && (l = r[0], u = r[1]), function(e, o, d) {
		var f = (d || t).length, p = a[f], m, h, g, _, v, y, b, x, S;
		if (!p) {
			if (S = t.grid === "auto" ? 0 : (t.grid || [1, A])[1], !S) {
				for (b = -A; b < (b = d[S++].getBoundingClientRect().left) && S < f;);
				S < f && S--;
			}
			for (p = a[f] = [], m = s ? Math.min(S, f) * l - .5 : r % S, h = S === A ? 0 : s ? f * u / S - .5 : r / S | 0, b = 0, x = A, y = 0; y < f; y++) g = y % S - m, _ = h - (y / S | 0), p[y] = v = c ? Math.abs(c === "y" ? _ : g) : F(g * g + _ * _), v > b && (b = v), v < x && (x = v);
			r === "random" && Nt(p), p.max = b - x, p.min = x, p.v = f = (parseFloat(t.amount) || parseFloat(t.each) * (S > f ? f - 1 : c ? c === "y" ? f / S : S : Math.max(S, f / S)) || 0) * (r === "edges" ? -1 : 1), p.b = f < 0 ? i - f : i, p.u = Et(t.amount || t.each) || 0, n = n && f < 0 ? vn(n) : n;
		}
		return f = (p[e] - p.min) / p.max || 0, Re(p.b + (n ? n(f) : f) * p.v) + p.u;
	};
}, Ft = function(e) {
	var t = 10 ** ((e + "").split(".")[1] || "").length;
	return function(n) {
		var r = Re(Math.round(parseFloat(n) / e) * e * t);
		return (r - r % 1) / t + (z(n) ? 0 : Et(n));
	};
}, It = function(e, t) {
	var n = V(e), r, i;
	return !n && ne(e) && (r = n = e.radius || A, e.values ? (e = jt(e.values), (i = !z(e[0])) && (r *= r)) : e = Ft(e.increment)), wt(t, n ? R(e) ? function(t) {
		return i = e(t), Math.abs(i - t) <= r ? i : t;
	} : function(t) {
		for (var n = parseFloat(i ? t.x : t), a = parseFloat(i ? t.y : 0), o = A, s = 0, c = e.length, l, u; c--;) i ? (l = e[c].x - n, u = e[c].y - a, l = l * l + u * u) : l = Math.abs(e[c] - n), l < o && (o = l, s = c);
		return s = !r || o <= r ? e[s] : t, i || s === t || z(t) ? s : s + Et(t);
	} : Ft(e));
}, Lt = function(e, t, n, r) {
	return wt(V(e) ? !t : n === !0 ? !!(n = 0) : !r, function() {
		return V(e) ? e[~~(Math.random() * e.length)] : (n ||= 1e-5) && (r = n < 1 ? 10 ** ((n + "").length - 2) : 1) && Math.floor(Math.round((e - n / 2 + Math.random() * (t - e + n * .99)) / n) * n * r) / r;
	});
}, Rt = function() {
	var e = [...arguments];
	return function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}, zt = function(e, t) {
	return function(n) {
		return e(parseFloat(n)) + (t || Et(n));
	};
}, Bt = function(e, t, n) {
	return Gt(e, t, 0, 1, n);
}, Vt = function(e, t, n) {
	return wt(n, function(n) {
		return e[~~t(n)];
	});
}, Ht = function e(t, n, r) {
	var i = n - t;
	return V(t) ? Vt(t, e(0, t.length), n) : wt(r, function(e) {
		return (i + (e - t) % i) % i + t;
	});
}, Ut = function e(t, n, r) {
	var i = n - t, a = i * 2;
	return V(t) ? Vt(t, e(0, t.length - 1), n) : wt(r, function(e) {
		return e = (a + (e - t) % a) % a || 0, t + (e > i ? a - e : e);
	});
}, Wt = function(e) {
	return e.replace(oe, function(e) {
		var t = e.indexOf("[") + 1, n = e.substring(t || 7, t ? e.indexOf("]") : e.length - 1).split(se);
		return Lt(t ? n : +n[0], t ? 0 : +n[1], +n[2] || 1e-5);
	});
}, Gt = function(e, t, n, r, i) {
	var a = t - e, o = r - n;
	return wt(i, function(t) {
		return n + ((t - e) / a * o || 0);
	});
}, Kt = function e(t, n, r, i) {
	var a = isNaN(t + n) ? 0 : function(e) {
		return (1 - e) * t + e * n;
	};
	if (!a) {
		var o = L(t), s = {}, c, l, u, d, f;
		if (r === !0 && (i = 1) && (r = null), o) t = { p: t }, n = { p: n };
		else if (V(t) && !V(n)) {
			for (u = [], d = t.length, f = d - 2, l = 1; l < d; l++) u.push(e(t[l - 1], t[l]));
			d--, a = function(e) {
				e *= d;
				var t = Math.min(f, ~~e);
				return u[t](e - t);
			}, r = n;
		} else i || (t = Je(V(t) ? [] : {}, t));
		if (!u) {
			for (c in n) On.call(s, t, c, "get", n[c]);
			a = function(e) {
				return Yn(e, s) || (o ? t.p : t);
			};
		}
	}
	return wt(r, a);
}, qt = function(e, t, n) {
	var r = e.labels, i = A, a, o, s;
	for (a in r) o = r[a] - t, o < 0 == !!n && o && i > (o = Math.abs(o)) && (s = a, i = o);
	return s;
}, Jt = function(e, t, n) {
	var r = e.vars, i = r[t], a = k, o = e._ctx, s, c, l;
	if (i) return s = r[t + "Params"], c = r.callbackScope || e, n && Te.length && Ve(), o && (k = o), l = s ? i.apply(c, s) : i.call(c), k = a, l;
}, Yt = function(e) {
	return tt(e), e.scrollTrigger && e.scrollTrigger.kill(!!O), e.progress() < 1 && Jt(e, "onInterrupt"), e;
}, Xt, Zt = [], Qt = function(e) {
	if (e) {
		if (e = !e.name && e.default || e, re() || e.headless) {
			var t = e.name, n = R(e), r = t && !n && e.init ? function() {
				this._props = [];
			} : e, i = {
				init: be,
				render: Yn,
				add: On,
				kill: Zn,
				modifier: Xn,
				rawVars: 0
			}, a = {
				targetTest: 0,
				get: 0,
				getSetter: Gn,
				aliases: {},
				register: 0
			};
			if (dn(), e !== r) {
				if (Oe[t]) return;
				Ke(r, Ke(Xe(e, i), a)), Je(r.prototype, Je(i, Xe(e, a))), Oe[r.prop = t] = r, e.targetTest && (je.push(r), we[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
			}
			ye(t, r), e.register && e.register(mr, r, er);
		} else Zt.push(e);
	}
}, $t = 255, en = {
	aqua: [
		0,
		$t,
		$t
	],
	lime: [
		0,
		$t,
		0
	],
	silver: [
		192,
		192,
		192
	],
	black: [
		0,
		0,
		0
	],
	maroon: [
		128,
		0,
		0
	],
	teal: [
		0,
		128,
		128
	],
	blue: [
		0,
		0,
		$t
	],
	navy: [
		0,
		0,
		128
	],
	white: [
		$t,
		$t,
		$t
	],
	olive: [
		128,
		128,
		0
	],
	yellow: [
		$t,
		$t,
		0
	],
	orange: [
		$t,
		165,
		0
	],
	gray: [
		128,
		128,
		128
	],
	purple: [
		128,
		0,
		128
	],
	green: [
		0,
		128,
		0
	],
	red: [
		$t,
		0,
		0
	],
	pink: [
		$t,
		192,
		203
	],
	cyan: [
		0,
		$t,
		$t
	],
	transparent: [
		$t,
		$t,
		$t,
		0
	]
}, tn = function(e, t, n) {
	return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * $t + .5 | 0;
}, nn = function(e, t, n) {
	var r = e ? z(e) ? [
		e >> 16,
		e >> 8 & $t,
		e & $t
	] : 0 : en.black, i, a, o, s, c, l, u, d, f, p;
	if (!r) {
		if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), en[e]) r = en[e];
		else if (e.charAt(0) === "#") {
			if (e.length < 6 && (i = e.charAt(1), a = e.charAt(2), o = e.charAt(3), e = "#" + i + i + a + a + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9) return r = parseInt(e.substr(1, 6), 16), [
				r >> 16,
				r >> 8 & $t,
				r & $t,
				parseInt(e.substr(7), 16) / 255
			];
			e = parseInt(e.substr(1), 16), r = [
				e >> 16,
				e >> 8 & $t,
				e & $t
			];
		} else if (e.substr(0, 3) === "hsl") {
			if (r = p = e.match(H), !t) s = r[0] % 360 / 360, c = r[1] / 100, l = r[2] / 100, a = l <= .5 ? l * (c + 1) : l + c - l * c, i = l * 2 - a, r.length > 3 && (r[3] *= 1), r[0] = tn(s + 1 / 3, i, a), r[1] = tn(s, i, a), r[2] = tn(s - 1 / 3, i, a);
			else if (~e.indexOf("=")) return r = e.match(U), n && r.length < 4 && (r[3] = 1), r;
		} else r = e.match(H) || en.transparent;
		r = r.map(Number);
	}
	return t && !p && (i = r[0] / $t, a = r[1] / $t, o = r[2] / $t, u = Math.max(i, a, o), d = Math.min(i, a, o), l = (u + d) / 2, u === d ? s = c = 0 : (f = u - d, c = l > .5 ? f / (2 - u - d) : f / (u + d), s = u === i ? (a - o) / f + (a < o ? 6 : 0) : u === a ? (o - i) / f + 2 : (i - a) / f + 4, s *= 60), r[0] = ~~(s + .5), r[1] = ~~(c * 100 + .5), r[2] = ~~(l * 100 + .5)), n && r.length < 4 && (r[3] = 1), r;
}, rn = function(e) {
	var t = [], n = [], r = -1;
	return e.split(on).forEach(function(e) {
		var i = e.match(W) || [];
		t.push.apply(t, i), n.push(r += i.length + 1);
	}), t.c = n, t;
}, an = function(e, t, n) {
	var r = "", i = (e + r).match(on), a = t ? "hsla(" : "rgba(", o = 0, s, c, l, u;
	if (!i) return e;
	if (i = i.map(function(e) {
		return (e = nn(e, t, 1)) && a + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")";
	}), n && (l = rn(e), s = n.c, s.join(r) !== l.c.join(r))) for (c = e.replace(on, "1").split(W), u = c.length - 1; o < u; o++) r += c[o] + (~s.indexOf(o) ? i.shift() || a + "0,0,0,0)" : (l.length ? l : i.length ? i : n).shift());
	if (!c) for (c = e.split(on), u = c.length - 1; o < u; o++) r += c[o] + i[o];
	return r + c[u];
}, on = function() {
	var e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
	for (t in en) e += "|" + t + "\\b";
	return RegExp(e + ")", "gi");
}(), sn = /hsl[a]?\(/, cn = function(e) {
	var t = e.join(" "), n;
	if (on.lastIndex = 0, on.test(t)) return n = sn.test(t), e[1] = an(e[1], n), e[0] = an(e[0], n, rn(e[1])), !0;
}, ln, un = function() {
	var e = Date.now, t = 500, n = 33, r = e(), i = r, a = 1e3 / 240, o = a, s = [], c, l, u, d, f, p, m = function u(m) {
		var h = e() - i, g = m === !0, _, v, y, b;
		if ((h > t || h < 0) && (r += h - n), i += h, y = i - r, _ = y - o, (_ > 0 || g) && (b = ++d.frame, f = y - d.time * 1e3, d.time = y /= 1e3, o += _ + (_ >= a ? 4 : a - _), v = 1), g || (c = l(u)), v) for (p = 0; p < s.length; p++) s[p](y, f, b, m);
	};
	return d = {
		time: 0,
		frame: 0,
		tick: function() {
			m(!0);
		},
		deltaRatio: function(e) {
			return f / (1e3 / (e || 60));
		},
		wake: function() {
			he && (!fe && re() && (K = fe = window, q = K.document || {}, pe.gsap = mr, (K.gsapVersions || (K.gsapVersions = [])).push(mr.version), ge(me || K.GreenSockGlobals || !K.gsap && K || {}), Zt.forEach(Qt)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && d.sleep(), l = u || function(e) {
				return setTimeout(e, o - d.time * 1e3 + 1 | 0);
			}, ln = 1, m(2));
		},
		sleep: function() {
			(u ? cancelAnimationFrame : clearTimeout)(c), ln = 0, l = be;
		},
		lagSmoothing: function(e, r) {
			t = e || Infinity, n = Math.min(r || 33, t);
		},
		fps: function(e) {
			a = 1e3 / (e || 240), o = d.time * 1e3 + a;
		},
		add: function(e, t, n) {
			var r = t ? function(t, n, i, a) {
				e(t, n, i, a), d.remove(r);
			} : e;
			return d.remove(e), s[n ? "unshift" : "push"](r), dn(), r;
		},
		remove: function(e, t) {
			~(t = s.indexOf(e)) && s.splice(t, 1) && p >= t && p--;
		},
		_listeners: s
	}, d;
}(), dn = function() {
	return !ln && un.wake();
}, fn = {}, pn = /^[\d.\-M][\d.\-,\s]/, mn = /["']/g, hn = function(e) {
	for (var t = {}, n = e.substr(1, e.length - 3).split(":"), r = n[0], i = 1, a = n.length, o, s, c; i < a; i++) s = n[i], o = i === a - 1 ? s.length : s.lastIndexOf(","), c = s.substr(0, o), t[r] = isNaN(c) ? c.replace(mn, "").trim() : +c, r = s.substr(o + 1).trim();
	return t;
}, gn = function(e) {
	var t = e.indexOf("(") + 1, n = e.indexOf(")"), r = e.indexOf("(", t);
	return e.substring(t, ~r && r < n ? e.indexOf(")", n + 1) : n);
}, _n = function(e) {
	var t = (e + "").split("("), n = fn[t[0]];
	return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf("{") ? [hn(t[1])] : gn(e).split(",").map(We)) : fn._CE && pn.test(e) ? fn._CE("", e) : n;
}, vn = function(e) {
	return function(t) {
		return 1 - e(1 - t);
	};
}, yn = function(e, t) {
	return e && (R(e) ? e : fn[e] || _n(e)) || t;
}, bn = function(e, t, n, r) {
	n === void 0 && (n = function(e) {
		return 1 - t(1 - e);
	}), r === void 0 && (r = function(e) {
		return e < .5 ? t(e * 2) / 2 : 1 - t((1 - e) * 2) / 2;
	});
	var i = {
		easeIn: t,
		easeOut: n,
		easeInOut: r
	}, a;
	return Ie(e, function(e) {
		for (var t in fn[e] = pe[e] = i, fn[a = e.toLowerCase()] = n, i) fn[a + (t === "easeIn" ? ".in" : t === "easeOut" ? ".out" : ".inOut")] = fn[e + "." + t] = i[t];
	}), i;
}, xn = function(e) {
	return function(t) {
		return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2;
	};
}, Sn = function e(t, n, r) {
	var i = n >= 1 ? n : 1, a = (r || (t ? .3 : .45)) / (n < 1 ? n : 1), o = a / M * (Math.asin(1 / i) || 0), s = function(e) {
		return e === 1 ? 1 : i * 2 ** (-10 * e) * ee((e - o) * a) + 1;
	}, c = t === "out" ? s : t === "in" ? function(e) {
		return 1 - s(1 - e);
	} : xn(s);
	return a = M / a, c.config = function(n, r) {
		return e(t, n, r);
	}, c;
}, Cn = function e(t, n) {
	n === void 0 && (n = 1.70158);
	var r = function(e) {
		return e ? --e * e * ((n + 1) * e + n) + 1 : 0;
	}, i = t === "out" ? r : t === "in" ? function(e) {
		return 1 - r(1 - e);
	} : xn(r);
	return i.config = function(n) {
		return e(t, n);
	}, i;
};
Ie("Linear,Quad,Cubic,Quart,Quint,Strong", function(e, t) {
	var n = t < 5 ? t + 1 : t;
	bn(e + ",Power" + (n - 1), t ? function(e) {
		return e ** +n;
	} : function(e) {
		return e;
	}, function(e) {
		return 1 - (1 - e) ** n;
	}, function(e) {
		return e < .5 ? (e * 2) ** n / 2 : 1 - ((1 - e) * 2) ** n / 2;
	});
}), fn.Linear.easeNone = fn.none = fn.Linear.easeIn, bn("Elastic", Sn("in"), Sn("out"), Sn()), (function(e, t) {
	var n = 1 / t, r = 2 * n, i = 2.5 * n, a = function(a) {
		return a < n ? e * a * a : a < r ? e * (a - 1.5 / t) ** 2 + .75 : a < i ? e * (a -= 2.25 / t) * a + .9375 : e * (a - 2.625 / t) ** 2 + .984375;
	};
	bn("Bounce", function(e) {
		return 1 - a(1 - e);
	}, a);
})(7.5625, 2.75), bn("Expo", function(e) {
	return 2 ** (10 * (e - 1)) * e + e * e * e * e * e * e * (1 - e);
}), bn("Circ", function(e) {
	return -(F(1 - e * e) - 1);
}), bn("Sine", function(e) {
	return e === 1 ? 1 : -I(e * N) + 1;
}), bn("Back", Cn("in"), Cn("out"), Cn()), fn.SteppedEase = fn.steps = pe.SteppedEase = { config: function(e, t) {
	e === void 0 && (e = 1);
	var n = 1 / e, r = e + +!t, i = +!!t, a = 1 - j;
	return function(e) {
		return ((r * Tt(0, a, e) | 0) + i) * n;
	};
} }, E.ease = fn["quad.out"], Ie("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(e) {
	return Me += e + "," + e + "Params,";
});
var wn = function(e, t) {
	this.id = P++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : Fe, this.set = t ? t.getSetter : Gn;
}, Tn = /*#__PURE__*/ function() {
	function e(e) {
		this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === Infinity ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, yt(this, +e.duration, 1, 1), this.data = e.data, k && (this._ctx = k, k.data.push(this)), ln || un.wake();
	}
	var t = e.prototype;
	return t.delay = function(e) {
		return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
	}, t.duration = function(e) {
		return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
	}, t.totalDuration = function(e) {
		return arguments.length ? (this._dirty = 0, yt(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
	}, t.totalTime = function(e, t) {
		if (dn(), !arguments.length) return this._tTime;
		var n = this._dp;
		if (n && n.smoothChildTiming && this._ts) {
			for (ut(this, e), !n._dp || n.parent || dt(n, this); n && n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
			!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && ft(this._dp, this, this._start - this._delay);
		}
		return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === j || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), Ue(this, e, t)), this;
	}, t.time = function(e, t) {
		return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + ot(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time;
	}, t.totalProgress = function(e, t) {
		return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
	}, t.progress = function(e, t) {
		return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + ot(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : +(this.rawTime() > 0);
	}, t.iteration = function(e, t) {
		var n = this.duration() + this._rDelay;
		return arguments.length ? this.totalTime(this._time + (e - 1) * n, t) : this._repeat ? st(this._tTime, n) + 1 : 1;
	}, t.timeScale = function(e, t) {
		if (!arguments.length) return this._rts === -j ? 0 : this._rts;
		if (this._rts === e) return this;
		var n = this.parent && this._ts ? ct(this.parent._time, this) : this._tTime;
		return this._rts = +e || 0, this._ts = this._ps || e === -j ? 0 : this._rts, this.totalTime(Tt(-Math.abs(this._delay), this.totalDuration(), n), t !== !1), lt(this), rt(this);
	}, t.paused = function(e) {
		return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (dn(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== j && (this._tTime -= j)))), this) : this._ps;
	}, t.startTime = function(e) {
		if (arguments.length) {
			this._start = Re(e);
			var t = this.parent || this._dp;
			return t && (t._sort || !this.parent) && ft(t, this, this._start - this._delay), this;
		}
		return this._start;
	}, t.endTime = function(e) {
		return this._start + (B(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
	}, t.rawTime = function(e) {
		var t = this.parent || this._dp;
		return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ct(t.rawTime(e), this) : this._tTime : this._tTime;
	}, t.revert = function(e) {
		e === void 0 && (e = Ce);
		var t = O;
		return O = e, He(this) && (this.timeline && this.timeline.revert(e), this.totalTime(-.01, e.suppressEvents)), this.data !== "nested" && e.kill !== !1 && this.kill(), O = t, this;
	}, t.globalTime = function(e) {
		for (var t = this, n = arguments.length ? e : t.rawTime(); t;) n = t._start + n / (Math.abs(t._ts) || 1), t = t._dp;
		return !this.parent && this._sat ? this._sat.globalTime(e) : n;
	}, t.repeat = function(e) {
		return arguments.length ? (this._repeat = e === Infinity ? -2 : e, bt(this)) : this._repeat === -2 ? Infinity : this._repeat;
	}, t.repeatDelay = function(e) {
		if (arguments.length) {
			var t = this._time;
			return this._rDelay = e, bt(this), t ? this.time(t) : this;
		}
		return this._rDelay;
	}, t.yoyo = function(e) {
		return arguments.length ? (this._yoyo = e, this) : this._yoyo;
	}, t.seek = function(e, t) {
		return this.totalTime(St(this, e), B(t));
	}, t.restart = function(e, t) {
		return this.play().totalTime(e ? -this._delay : 0, B(t)), this._dur || (this._zTime = -j), this;
	}, t.play = function(e, t) {
		return e != null && this.seek(e, t), this.reversed(!1).paused(!1);
	}, t.reverse = function(e, t) {
		return e != null && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1);
	}, t.pause = function(e, t) {
		return e != null && this.seek(e, t), this.paused(!0);
	}, t.resume = function() {
		return this.paused(!1);
	}, t.reversed = function(e) {
		return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -j : 0)), this) : this._rts < 0;
	}, t.invalidate = function() {
		return this._initted = this._act = 0, this._zTime = -j, this;
	}, t.isActive = function() {
		var e = this.parent || this._dp, t = this._start, n;
		return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= t && n < this.endTime(!0) - j);
	}, t.eventCallback = function(e, t, n) {
		var r = this.vars;
		return arguments.length > 1 ? (t ? (r[e] = t, n && (r[e + "Params"] = n), e === "onUpdate" && (this._onUpdate = t)) : delete r[e], this) : r[e];
	}, t.then = function(e) {
		var t = this, n = t._prom;
		return new Promise(function(r) {
			var i = R(e) ? e : Ge, a = function() {
				var e = t.then;
				t.then = null, n && n(), R(i) && (i = i(t)) && (i.then || i === t) && (t.then = e), r(i), t.then = e;
			};
			t._initted && t.totalProgress() === 1 && t._ts >= 0 || !t._tTime && t._ts < 0 ? a() : t._prom = a;
		});
	}, t.kill = function() {
		Yt(this);
	}, e;
}();
Ke(Tn.prototype, {
	_time: 0,
	_start: 0,
	_end: 0,
	_tTime: 0,
	_tDur: 0,
	_dirty: 0,
	_repeat: 0,
	_yoyo: !1,
	parent: null,
	_initted: !1,
	_rDelay: 0,
	_ts: 1,
	_dp: 0,
	ratio: 0,
	_zTime: -j,
	_prom: 0,
	_ps: !1,
	_rts: 1
});
var En = /*#__PURE__*/ function(e) {
	w(t, e);
	function t(t, n) {
		var r;
		return t === void 0 && (t = {}), r = e.call(this, t) || this, r.labels = {}, r.smoothChildTiming = !!t.smoothChildTiming, r.autoRemoveChildren = !!t.autoRemoveChildren, r._sort = B(t.sortChildren), G && ft(t.parent || G, C(r), n), t.reversed && r.reverse(), t.paused && r.paused(!0), t.scrollTrigger && pt(C(r), t.scrollTrigger), r;
	}
	var n = t.prototype;
	return n.to = function(e, t, n) {
		return Ct(0, arguments, this), this;
	}, n.from = function(e, t, n) {
		return Ct(1, arguments, this), this;
	}, n.fromTo = function(e, t, n, r) {
		return Ct(2, arguments, this), this;
	}, n.set = function(e, t, n) {
		return t.duration = 0, t.parent = this, Ze(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new Bn(e, t, St(this, n), 1), this;
	}, n.call = function(e, t, n) {
		return ft(this, Bn.delayedCall(0, e, t), n);
	}, n.staggerTo = function(e, t, n, r, i, a, o) {
		return n.duration = t, n.stagger = n.stagger || r, n.onComplete = a, n.onCompleteParams = o, n.parent = this, new Bn(e, n, St(this, i)), this;
	}, n.staggerFrom = function(e, t, n, r, i, a, o) {
		return n.runBackwards = 1, Ze(n).immediateRender = B(n.immediateRender), this.staggerTo(e, t, n, r, i, a, o);
	}, n.staggerFromTo = function(e, t, n, r, i, a, o, s) {
		return r.startAt = n, Ze(r).immediateRender = B(r.immediateRender), this.staggerTo(e, t, r, i, a, o, s);
	}, n.render = function(e, t, n) {
		var r = this._time, i = this._dirty ? this.totalDuration() : this._tDur, a = this._dur, o = e <= 0 ? 0 : Re(e), s = this._zTime < 0 != e < 0 && (this._initted || !a), c, l, u, d, f, p, m, h, g, _, v, y;
		if (this !== G && o > i && e >= 0 && (o = i), o !== this._tTime || n || s) {
			if (r !== this._time && a && (o += this._time - r, e += this._time - r), c = o, g = this._start, h = this._ts, p = !h, s && (a || (r = this._zTime), (e || !t) && (this._zTime = e)), this._repeat) {
				if (v = this._yoyo, f = a + this._rDelay, this._repeat < -1 && e < 0) return this.totalTime(f * 100 + e, t, n);
				if (c = Re(o % f), o === i ? (d = this._repeat, c = a) : (_ = Re(o / f), d = ~~_, d && d === _ && (c = a, d--), c > a && (c = a)), _ = st(this._tTime, f), !r && this._tTime && _ !== d && this._tTime - _ * f - this._dur <= 0 && (_ = d), v && d & 1 && (c = a - c, y = 1), d !== _ && !this._lock) {
					var b = v && _ & 1, x = b === (v && d & 1);
					if (d < _ && (b = !b), r = b ? 0 : o % a ? a : o, this._lock = 1, this.render(r || (y ? 0 : Re(d * f)), t, !a)._lock = 0, this._tTime = o, !t && this.parent && Jt(this, "onRepeat"), this.vars.repeatRefresh && !y && (this.invalidate()._lock = 1, _ = d), r && r !== this._time || p !== !this._ts || this.vars.onRepeat && !this.parent && !this._act || (a = this._dur, i = this._tDur, x && (this._lock = 2, r = b ? a : -1e-4, this.render(r, !0), this.vars.repeatRefresh && !y && this.invalidate()), this._lock = 0, !this._ts && !p)) return this;
				}
			}
			if (this._hasPause && !this._forcing && this._lock < 2 && (m = vt(this, Re(r), Re(c)), m && (o -= c - (c = m._start))), this._tTime = o, this._time = c, this._act = !!h, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e, r = 0), !r && o && a && !t && !_ && (Jt(this, "onStart"), this._tTime !== o)) return this;
			if (c >= r && e >= 0) for (l = this._first; l;) {
				if (u = l._next, (l._act || c >= l._start) && l._ts && m !== l) {
					if (l.parent !== this) return this.render(e, t, n);
					if (l.render(l._ts > 0 ? (c - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (c - l._start) * l._ts, t, n), c !== this._time || !this._ts && !p) {
						m = 0, u && (o += this._zTime = -j);
						break;
					}
				}
				l = u;
			}
			else {
				l = this._last;
				for (var S = e < 0 ? e : c; l;) {
					if (u = l._prev, (l._act || S <= l._end) && l._ts && m !== l) {
						if (l.parent !== this) return this.render(e, t, n);
						if (l.render(l._ts > 0 ? (S - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (S - l._start) * l._ts, t, n || O && He(l)), c !== this._time || !this._ts && !p) {
							m = 0, u && (o += this._zTime = S ? -j : j);
							break;
						}
					}
					l = u;
				}
			}
			if (m && !t && (this.pause(), m.render(c >= r ? 0 : -j)._zTime = c >= r ? 1 : -1, this._ts)) return this._start = g, lt(this), this.render(e, t, n);
			this._onUpdate && !t && Jt(this, "onUpdate", !0), (o === i && this._tTime >= this.totalDuration() || !o && r) && (g === this._start || Math.abs(h) !== Math.abs(this._ts)) && (this._lock || ((e || !a) && (o === i && this._ts > 0 || !o && this._ts < 0) && tt(this, 1), !t && !(e < 0 && !r) && (o || r || !i) && (Jt(this, o === i && e >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(o < i && this.timeScale() > 0) && this._prom())));
		}
		return this;
	}, n.add = function(e, t) {
		var n = this;
		if (z(t) || (t = St(this, t, e)), !(e instanceof Tn)) {
			if (V(e)) return e.forEach(function(e) {
				return n.add(e, t);
			}), this;
			if (L(e)) return this.addLabel(e, t);
			if (R(e)) e = Bn.delayedCall(0, e);
			else return this;
		}
		return this === e ? this : ft(this, e, t);
	}, n.getChildren = function(e, t, n, r) {
		e === void 0 && (e = !0), t === void 0 && (t = !0), n === void 0 && (n = !0), r === void 0 && (r = -A);
		for (var i = [], a = this._first; a;) a._start >= r && (a instanceof Bn ? t && i.push(a) : (n && i.push(a), e && i.push.apply(i, a.getChildren(!0, t, n)))), a = a._next;
		return i;
	}, n.getById = function(e) {
		for (var t = this.getChildren(1, 1, 1), n = t.length; n--;) if (t[n].vars.id === e) return t[n];
	}, n.remove = function(e) {
		return L(e) ? this.removeLabel(e) : R(e) ? this.killTweensOf(e) : (e.parent === this && et(this, e), e === this._recent && (this._recent = this._last), nt(this));
	}, n.totalTime = function(t, n) {
		return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Re(un.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), e.prototype.totalTime.call(this, t, n), this._forcing = 0, this) : this._tTime;
	}, n.addLabel = function(e, t) {
		return this.labels[e] = St(this, t), this;
	}, n.removeLabel = function(e) {
		return delete this.labels[e], this;
	}, n.addPause = function(e, t, n) {
		var r = Bn.delayedCall(0, t || be, n);
		return r.data = "isPause", this._hasPause = 1, ft(this, r, St(this, e));
	}, n.removePause = function(e) {
		var t = this._first;
		for (e = St(this, e); t;) t._start === e && t.data === "isPause" && tt(t), t = t._next;
	}, n.killTweensOf = function(e, t, n) {
		for (var r = this.getTweensOf(e, n), i = r.length; i--;) jn !== r[i] && r[i].kill(e, t);
		return this;
	}, n.getTweensOf = function(e, t) {
		for (var n = [], r = jt(e), i = this._first, a = z(t), o; i;) i instanceof Bn ? Be(i._targets, r) && (a ? (!jn || i._initted && i._ts) && i.globalTime(0) <= t && i.globalTime(i.totalDuration()) > t : !t || i.isActive()) && n.push(i) : (o = i.getTweensOf(r, t)).length && n.push.apply(n, o), i = i._next;
		return n;
	}, n.tweenTo = function(e, t) {
		t ||= {};
		var n = this, r = St(n, e), i = t, a = i.startAt, o = i.onStart, s = i.onStartParams, c = i.immediateRender, l, u = Bn.to(n, Ke({
			ease: t.ease || "none",
			lazy: !1,
			immediateRender: !1,
			time: r,
			overwrite: "auto",
			duration: t.duration || Math.abs((r - (a && "time" in a ? a.time : n._time)) / n.timeScale()) || j,
			onStart: function() {
				if (n.pause(), !l) {
					var e = t.duration || Math.abs((r - (a && "time" in a ? a.time : n._time)) / n.timeScale());
					u._dur !== e && yt(u, e, 0, 1).render(u._time, !0, !0), l = 1;
				}
				o && o.apply(u, s || []);
			}
		}, t));
		return c ? u.render(0) : u;
	}, n.tweenFromTo = function(e, t, n) {
		return this.tweenTo(t, Ke({ startAt: { time: St(this, e) } }, n));
	}, n.recent = function() {
		return this._recent;
	}, n.nextLabel = function(e) {
		return e === void 0 && (e = this._time), qt(this, St(this, e));
	}, n.previousLabel = function(e) {
		return e === void 0 && (e = this._time), qt(this, St(this, e), 1);
	}, n.currentLabel = function(e) {
		return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + j);
	}, n.shiftChildren = function(e, t, n) {
		n === void 0 && (n = 0);
		var r = this._first, i = this.labels, a;
		for (e = Re(e); r;) r._start >= n && (r._start += e, r._end += e), r = r._next;
		if (t) for (a in i) i[a] >= n && (i[a] += e);
		return nt(this);
	}, n.invalidate = function(t) {
		var n = this._first;
		for (this._lock = 0; n;) n.invalidate(t), n = n._next;
		return e.prototype.invalidate.call(this, t);
	}, n.clear = function(e) {
		e === void 0 && (e = !0);
		for (var t = this._first, n; t;) n = t._next, this.remove(t), t = n;
		return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), nt(this);
	}, n.totalDuration = function(e) {
		var t = 0, n = this, r = n._last, i = A, a, o, s;
		if (arguments.length) return n.timeScale((n._repeat < 0 ? n.duration() : n.totalDuration()) / (n.reversed() ? -e : e));
		if (n._dirty) {
			for (s = n.parent; r;) a = r._prev, r._dirty && r.totalDuration(), o = r._start, o > i && n._sort && r._ts && !n._lock ? (n._lock = 1, ft(n, r, o - r._delay, 1)._lock = 0) : i = o, o < 0 && r._ts && (t -= o, (!s && !n._dp || s && s.smoothChildTiming) && (n._start += Re(o / n._ts), n._time -= o, n._tTime -= o), n.shiftChildren(-o, !1, -Infinity), i = 0), r._end > t && r._ts && (t = r._end), r = a;
			yt(n, n === G && n._time > t ? n._time : t, 1, 1), n._dirty = 0;
		}
		return n._tDur;
	}, t.updateRoot = function(e) {
		if (G._ts && (Ue(G, ct(e, G)), De = un.frame), un.frame >= Ae) {
			Ae += T.autoSleep || 120;
			var t = G._first;
			if ((!t || !t._ts) && T.autoSleep && un._listeners.length < 2) {
				for (; t && !t._ts;) t = t._next;
				t || un.sleep();
			}
		}
	}, t;
}(Tn);
Ke(En.prototype, {
	_lock: 0,
	_hasPause: 0,
	_forcing: 0
});
var Dn = function(e, t, n, r, i, a, o) {
	var s = new er(this._pt, e, t, 0, 1, Jn, null, i), c = 0, l = 0, u, d, f, p, m, h, g, _;
	for (s.b = n, s.e = r, n += "", r += "", (g = ~r.indexOf("random(")) && (r = Wt(r)), a && (_ = [n, r], a(_, e, t), n = _[0], r = _[1]), d = n.match(ce) || []; u = ce.exec(r);) p = u[0], m = r.substring(c, u.index), f ? f = (f + 1) % 5 : m.substr(-5) === "rgba(" && (f = 1), p !== d[l++] && (h = parseFloat(d[l - 1]) || 0, s._pt = {
		_next: s._pt,
		p: m || l === 1 ? m : ",",
		s: h,
		c: p.charAt(1) === "=" ? ze(h, p) - h : parseFloat(p) - h,
		m: f && f < 4 ? Math.round : 0
	}, c = ce.lastIndex);
	return s.c = c < r.length ? r.substring(c, r.length) : "", s.fp = o, (le.test(r) || g) && (s.e = 0), this._pt = s, s;
}, On = function(e, t, n, r, i, a, o, s, c, l) {
	R(r) && (r = r(i || 0, e, a));
	var u = e[t], d = n === "get" ? R(u) ? c ? e[t.indexOf("set") || !R(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : u : n, f = R(u) ? c ? Un : Hn : Vn, p;
	if (L(r) && (~r.indexOf("random(") && (r = Wt(r)), r.charAt(1) === "=" && (p = ze(d, r) + (Et(d) || 0), (p || p === 0) && (r = p))), !l || d !== r || Mn) return !isNaN(d * r) && r !== "" ? (p = new er(this._pt, e, t, +d || 0, r - (d || 0), typeof u == "boolean" ? qn : Kn, 0, f), c && (p.fp = c), o && p.modifier(o, this, e), this._pt = p) : (!u && !(t in e) && _e(t, r), Dn.call(this, e, t, d, r, f, s || T.stringFilter, c));
}, kn = function(e, t, n, r, i) {
	if (R(e) && (e = Ln(e, i, t, n, r)), !ne(e) || e.style && e.nodeType || V(e) || ae(e)) return L(e) ? Ln(e, i, t, n, r) : e;
	var a = {}, o;
	for (o in e) a[o] = Ln(e[o], i, t, n, r);
	return a;
}, An = function(e, t, n, r, i, a) {
	var o, s, c, l;
	if (Oe[e] && (o = new Oe[e]()).init(i, o.rawVars ? t[e] : kn(t[e], r, i, a, n), n, r, a) !== !1 && (n._pt = s = new er(n._pt, i, e, 0, 1, o.render, o, 0, o.priority), n !== Xt)) for (c = n._ptLookup[n._targets.indexOf(i)], l = o._props.length; l--;) c[o._props[l]] = s;
	return o;
}, jn, Mn, Nn = function e(t, n, r) {
	var i = t.vars, a = i.ease, o = i.startAt, s = i.immediateRender, c = i.lazy, l = i.onUpdate, u = i.runBackwards, d = i.yoyoEase, f = i.keyframes, p = i.autoRevert, m = t._dur, h = t._startAt, g = t._targets, _ = t.parent, v = _ && _.data === "nested" ? _.vars.targets : g, y = t._overwrite === "auto" && !D, b = t.timeline, x = i.easeReverse || d, S, C, w, T, k, M, N, P, F, I, ee, L, R;
	if (b && (!f || !a) && (a = "none"), t._ease = yn(a, E.ease), t._rEase = x && (yn(x) || t._ease), t._from = !b && !!i.runBackwards, t._from && (t.ratio = 1), !b || f && !i.stagger) {
		if (P = g[0] ? Pe(g[0]).harness : 0, L = P && i[P.prop], S = Xe(i, we), h && (h._zTime < 0 && h.progress(1), n < 0 && u && s && !p ? h.render(-1, !0) : h.revert(u && m ? Se : xe), h._lazy = 0), o) {
			if (tt(t._startAt = Bn.set(g, Ke({
				data: "isStart",
				overwrite: !1,
				parent: _,
				immediateRender: !0,
				lazy: !h && B(c),
				startAt: null,
				delay: 0,
				onUpdate: l && function() {
					return Jt(t, "onUpdate");
				},
				stagger: 0
			}, o))), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (O || !s && !p) && t._startAt.revert(Se), s && m && n <= 0 && r <= 0) {
				n && (t._zTime = n);
				return;
			}
		} else if (u && m && !h) {
			if (n && (s = !1), w = Ke({
				overwrite: !1,
				data: "isFromStart",
				lazy: s && !h && B(c),
				immediateRender: s,
				stagger: 0,
				parent: _
			}, S), L && (w[P.prop] = L), tt(t._startAt = Bn.set(g, w)), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (O ? t._startAt.revert(Se) : t._startAt.render(-1, !0)), t._zTime = n, !s) e(t._startAt, j, j);
			else if (!n) return;
		}
		for (t._pt = t._ptCache = 0, c = m && B(c) || c && !m, C = 0; C < g.length; C++) {
			if (k = g[C], N = k._gsap || Ne(g)[C]._gsap, t._ptLookup[C] = I = {}, Ee[N.id] && Te.length && Ve(), ee = v === g ? C : v.indexOf(k), P && (F = new P()).init(k, L || S, t, ee, v) !== !1 && (t._pt = T = new er(t._pt, k, F.name, 0, 1, F.render, F, 0, F.priority), F._props.forEach(function(e) {
				I[e] = T;
			}), F.priority && (M = 1)), !P || L) for (w in S) Oe[w] && (F = An(w, S, t, ee, k, v)) ? F.priority && (M = 1) : I[w] = T = On.call(t, k, w, "get", S[w], ee, v, 0, i.stringFilter);
			t._op && t._op[C] && t.kill(k, t._op[C]), y && t._pt && (jn = t, G.killTweensOf(k, I, t.globalTime(n)), R = !t.parent, jn = 0), t._pt && c && (Ee[N.id] = 1);
		}
		M && $n(t), t._onInit && t._onInit(t);
	}
	t._onUpdate = l, t._initted = (!t._op || t._pt) && !R, f && n <= 0 && b.render(A, !0, !0);
}, Pn = function(e, t, n, r, i, a, o, s) {
	var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], l, u, d, f;
	if (!c) for (c = e._ptCache[t] = [], d = e._ptLookup, f = e._targets.length; f--;) {
		if (l = d[f][t], l && l.d && l.d._pt) for (l = l.d._pt; l && l.p !== t && l.fp !== t;) l = l._next;
		if (!l) return Mn = 1, e.vars[t] = "+=0", Nn(e, o), Mn = 0, s ? ve(t + " not eligible for reset. Try splitting into individual properties") : 1;
		c.push(l);
	}
	for (f = c.length; f--;) u = c[f], l = u._pt || u, l.s = (r || r === 0) && !i ? r : l.s + (r || 0) + a * l.c, l.c = n - l.s, u.e && (u.e = Le(n) + Et(u.e)), u.b && (u.b = l.s + Et(u.b));
}, Fn = function(e, t) {
	var n = e[0] ? Pe(e[0]).harness : 0, r = n && n.aliases, i, a, o, s;
	if (!r) return t;
	for (a in i = Je({}, t), r) if (a in i) for (s = r[a].split(","), o = s.length; o--;) i[s[o]] = i[a];
	return i;
}, In = function(e, t, n, r) {
	var i = t.ease || r || "power1.inOut", a, o;
	if (V(t)) o = n[e] || (n[e] = []), t.forEach(function(e, n) {
		return o.push({
			t: n / (t.length - 1) * 100,
			v: e,
			e: i
		});
	});
	else for (a in t) o = n[a] || (n[a] = []), a === "ease" || o.push({
		t: parseFloat(e),
		v: t[a],
		e: i
	});
}, Ln = function(e, t, n, r, i) {
	return R(e) ? e.call(t, n, r, i) : L(e) && ~e.indexOf("random(") ? Wt(e) : e;
}, Rn = Me + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", zn = {};
Ie(Rn + ",id,stagger,delay,duration,paused,scrollTrigger", function(e) {
	return zn[e] = 1;
});
var Bn = /*#__PURE__*/ function(e) {
	w(t, e);
	function t(t, n, r, i) {
		var a;
		typeof n == "number" && (r.duration = n, n = r, r = null), a = e.call(this, i ? n : Ze(n)) || this;
		var o = a.vars, s = o.duration, c = o.delay, l = o.immediateRender, u = o.stagger, d = o.overwrite, f = o.keyframes, p = o.defaults, m = o.scrollTrigger, h = n.parent || G, g = (V(t) || ae(t) ? z(t[0]) : "length" in n) ? [t] : jt(t), _, v, y, b, x, S, w, E;
		if (a._targets = g.length ? Ne(g) : ve("GSAP target " + t + " not found. https://gsap.com", !T.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = d, f || u || ie(s) || ie(c)) {
			n = a.vars;
			var O = n.easeReverse || n.yoyoEase;
			if (_ = a.timeline = new En({
				data: "nested",
				defaults: p || {},
				targets: h && h.data === "nested" ? h.vars.targets : g
			}), _.kill(), _.parent = _._dp = C(a), _._start = 0, u || ie(s) || ie(c)) {
				if (b = g.length, w = u && Pt(u), ne(u)) for (x in u) ~Rn.indexOf(x) && (E ||= {}, E[x] = u[x]);
				for (v = 0; v < b; v++) y = Xe(n, zn), y.stagger = 0, O && (y.easeReverse = O), E && Je(y, E), S = g[v], y.duration = +Ln(s, C(a), v, S, g), y.delay = (+Ln(c, C(a), v, S, g) || 0) - a._delay, !u && b === 1 && y.delay && (a._delay = c = y.delay, a._start += c, y.delay = 0), _.to(S, y, w ? w(v, S, g) : 0), _._ease = fn.none;
				_.duration() ? s = c = 0 : a.timeline = 0;
			} else if (f) {
				Ze(Ke(_.vars.defaults, { ease: "none" })), _._ease = yn(f.ease || n.ease || "none");
				var k = 0, A, M, N;
				if (V(f)) f.forEach(function(e) {
					return _.to(g, e, ">");
				}), _.duration();
				else {
					for (x in y = {}, f) x === "ease" || x === "easeEach" || In(x, f[x], y, f.easeEach);
					for (x in y) for (A = y[x].sort(function(e, t) {
						return e.t - t.t;
					}), k = 0, v = 0; v < A.length; v++) M = A[v], N = {
						ease: M.e,
						duration: (M.t - (v ? A[v - 1].t : 0)) / 100 * s
					}, N[x] = M.v, _.to(g, N, k), k += N.duration;
					_.duration() < s && _.to({}, { duration: s - _.duration() });
				}
			}
			s || a.duration(s = _.duration());
		} else a.timeline = 0;
		return d === !0 && !D && (jn = C(a), G.killTweensOf(g), jn = 0), ft(h, C(a), r), n.reversed && a.reverse(), n.paused && a.paused(!0), (l || !s && !f && a._start === Re(h._time) && B(l) && at(C(a)) && h.data !== "nested") && (a._tTime = -j, a.render(Math.max(0, -c) || 0)), m && pt(C(a), m), a;
	}
	var n = t.prototype;
	return n.render = function(e, t, n) {
		var r = this._time, i = this._tDur, a = this._dur, o = e < 0, s = e > i - j && !o ? i : e < j ? 0 : e, c, l, u, d, f, p, m, h;
		if (!a) _t(this, e, t, n);
		else if (s !== this._tTime || !e || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== o || this._lazy) {
			if (c = s, h = this.timeline, this._repeat) {
				if (d = a + this._rDelay, this._repeat < -1 && o) return this.totalTime(d * 100 + e, t, n);
				if (c = Re(s % d), s === i ? (u = this._repeat, c = a) : (f = Re(s / d), u = ~~f, u && u === f ? (c = a, u--) : c > a && (c = a)), p = this._yoyo && u & 1, p && (c = a - c), f = st(this._tTime, d), c === r && !n && this._initted && u === f) return this._tTime = s, this;
				u !== f && this.vars.repeatRefresh && !p && !this._lock && c !== d && this._initted && (this._lock = n = 1, this.render(Re(d * u), !0).invalidate()._lock = 0);
			}
			if (!this._initted) {
				if (mt(this, o ? e : c, n, t, s)) return this._tTime = 0, this;
				if (r !== this._time && !(n && this.vars.repeatRefresh && u !== f)) return this;
				if (a !== this._dur) return this.render(e, t, n);
			}
			if (this._rEase) {
				var g = c < r;
				if (g !== this._inv) {
					var _ = g ? r : a - r;
					this._inv = g, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = r, this._invRecip = _ ? (g ? -1 : 1) / _ : 0, this._invScale = g ? -this.ratio : 1 - this.ratio, this._invEase = g ? this._rEase : this._ease;
				}
				this.ratio = m = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip);
			} else this.ratio = m = this._ease(c / a);
			if (this._from && (this.ratio = m = 1 - m), this._tTime = s, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), !r && s && !t && !f && (Jt(this, "onStart"), this._tTime !== s)) return this;
			for (l = this._pt; l;) l.r(m, l.d), l = l._next;
			h && h.render(e < 0 ? e : h._dur * h._ease(c / this._dur), t, n) || this._startAt && (this._zTime = e), this._onUpdate && !t && (o && it(this, e, t, n), Jt(this, "onUpdate")), this._repeat && u !== f && this.vars.onRepeat && !t && this.parent && Jt(this, "onRepeat"), (s === this._tDur || !s) && this._tTime === s && (o && !this._onUpdate && it(this, e, !0, !0), (e || !a) && (s === this._tDur && this._ts > 0 || !s && this._ts < 0) && tt(this, 1), !t && (!o || r) && (s || r || p) && (Jt(this, s === i ? "onComplete" : "onReverseComplete", !0), this._prom && !(s < i && this.timeScale() > 0) && this._prom()));
		}
		return this;
	}, n.targets = function() {
		return this._targets;
	}, n.invalidate = function(t) {
		return (!t || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(t), e.prototype.invalidate.call(this, t);
	}, n.resetTo = function(e, t, n, r, i) {
		ln || un.wake(), this._ts || this.play();
		var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts), o;
		return this._initted || Nn(this, a), o = this._ease(a / this._dur), Pn(this, e, t, n, r, o, a, i) ? this.resetTo(e, t, n, r, 1) : (ut(this, 0), this.parent || $e(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
	}, n.kill = function(e, t) {
		if (t === void 0 && (t = "all"), !e && (!t || t === "all")) return this._lazy = this._pt = 0, this.parent ? Yt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!O), this;
		if (this.timeline) {
			var n = this.timeline.totalDuration();
			return this.timeline.killTweensOf(e, t, jn && jn.vars.overwrite !== !0)._first || Yt(this), this.parent && n !== this.timeline.totalDuration() && yt(this, this._dur * this.timeline._tDur / n, 0, 1), this;
		}
		var r = this._targets, i = e ? jt(e) : r, a = this._ptLookup, o = this._pt, s, c, l, u, d, f, p;
		if ((!t || t === "all") && Qe(r, i)) return t === "all" && (this._pt = 0), Yt(this);
		for (s = this._op = this._op || [], t !== "all" && (L(t) && (d = {}, Ie(t, function(e) {
			return d[e] = 1;
		}), t = d), t = Fn(r, t)), p = r.length; p--;) if (~i.indexOf(r[p])) for (d in c = a[p], t === "all" ? (s[p] = t, u = c, l = {}) : (l = s[p] = s[p] || {}, u = t), u) f = c && c[d], f && ((!("kill" in f.d) || f.d.kill(d) === !0) && et(this, f, "_pt"), delete c[d]), l !== "all" && (l[d] = 1);
		return this._initted && !this._pt && o && Yt(this), this;
	}, t.to = function(e, n) {
		return new t(e, n, arguments[2]);
	}, t.from = function(e, t) {
		return Ct(1, arguments);
	}, t.delayedCall = function(e, n, r, i) {
		return new t(n, 0, {
			immediateRender: !1,
			lazy: !1,
			overwrite: !1,
			delay: e,
			onComplete: n,
			onReverseComplete: n,
			onCompleteParams: r,
			onReverseCompleteParams: r,
			callbackScope: i
		});
	}, t.fromTo = function(e, t, n) {
		return Ct(2, arguments);
	}, t.set = function(e, n) {
		return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(e, n);
	}, t.killTweensOf = function(e, t, n) {
		return G.killTweensOf(e, t, n);
	}, t;
}(Tn);
Ke(Bn.prototype, {
	_targets: [],
	_lazy: 0,
	_startAt: 0,
	_op: 0,
	_onInit: 0
}), Ie("staggerTo,staggerFrom,staggerFromTo", function(e) {
	Bn[e] = function() {
		var t = new En(), n = Ot.call(arguments, 0);
		return n.splice(e === "staggerFromTo" ? 5 : 4, 0, 0), t[e].apply(t, n);
	};
});
var Vn = function(e, t, n) {
	return e[t] = n;
}, Hn = function(e, t, n) {
	return e[t](n);
}, Un = function(e, t, n, r) {
	return e[t](r.fp, n);
}, Wn = function(e, t, n) {
	return e.setAttribute(t, n);
}, Gn = function(e, t) {
	return R(e[t]) ? Hn : te(e[t]) && e.setAttribute ? Wn : Vn;
}, Kn = function(e, t) {
	return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, qn = function(e, t) {
	return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Jn = function(e, t) {
	var n = t._pt, r = "";
	if (!e && t.b) r = t.b;
	else if (e === 1 && t.e) r = t.e;
	else {
		for (; n;) r = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) + r, n = n._next;
		r += t.c;
	}
	t.set(t.t, t.p, r, t);
}, Yn = function(e, t) {
	for (var n = t._pt; n;) n.r(e, n.d), n = n._next;
}, Xn = function(e, t, n, r) {
	for (var i = this._pt, a; i;) a = i._next, i.p === r && i.modifier(e, t, n), i = a;
}, Zn = function(e) {
	for (var t = this._pt, n, r; t;) r = t._next, t.p === e && !t.op || t.op === e ? et(this, t, "_pt") : t.dep || (n = 1), t = r;
	return !n;
}, Qn = function(e, t, n, r) {
	r.mSet(e, t, r.m.call(r.tween, n, r.mt), r);
}, $n = function(e) {
	for (var t = e._pt, n, r, i, a; t;) {
		for (n = t._next, r = i; r && r.pr > t.pr;) r = r._next;
		(t._prev = r ? r._prev : a) ? t._prev._next = t : i = t, (t._next = r) ? r._prev = t : a = t, t = n;
	}
	e._pt = i;
}, er = /*#__PURE__*/ function() {
	function e(e, t, n, r, i, a, o, s, c) {
		this.t = t, this.s = r, this.c = i, this.p = n, this.r = a || Kn, this.d = o || this, this.set = s || Vn, this.pr = c || 0, this._next = e, e && (e._prev = this);
	}
	var t = e.prototype;
	return t.modifier = function(e, t, n) {
		this.mSet = this.mSet || this.set, this.set = Qn, this.m = e, this.mt = n, this.tween = t;
	}, e;
}();
Ie(Me + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(e) {
	return we[e] = 1;
}), pe.TweenMax = pe.TweenLite = Bn, pe.TimelineLite = pe.TimelineMax = En, G = new En({
	sortChildren: !1,
	defaults: E,
	autoRemoveChildren: !0,
	id: "root",
	smoothChildTiming: !0
}), T.stringFilter = cn;
var tr = [], nr = {}, rr = [], ir = 0, ar = 0, or = function(e) {
	return (nr[e] || rr).map(function(e) {
		return e();
	});
}, sr = function() {
	var e = Date.now(), t = [];
	e - ir > 2 && (or("matchMediaInit"), tr.forEach(function(e) {
		var n = e.queries, r = e.conditions, i, a, o, s;
		for (a in n) i = K.matchMedia(n[a]).matches, i && (o = 1), i !== r[a] && (r[a] = i, s = 1);
		s && (e.revert(), o && t.push(e));
	}), or("matchMediaRevert"), t.forEach(function(e) {
		return e.onMatch(e, function(t) {
			return e.add(null, t);
		});
	}), ir = e, or("matchMedia"));
}, cr = /*#__PURE__*/ function() {
	function e(e, t) {
		this.selector = t && Mt(t), this.data = [], this._r = [], this.isReverted = !1, this.id = ar++, e && this.add(e);
	}
	var t = e.prototype;
	return t.add = function(e, t, n) {
		R(e) && (n = t, t = e, e = R);
		var r = this, i = function() {
			var e = k, i = r.selector, a;
			return e && e !== r && e.data.push(r), n && (r.selector = Mt(n)), k = r, a = t.apply(r, arguments), R(a) && r._r.push(a), k = e, r.selector = i, r.isReverted = !1, a;
		};
		return r.last = i, e === R ? i(r, function(e) {
			return r.add(null, e);
		}) : e ? r[e] = i : i;
	}, t.ignore = function(e) {
		var t = k;
		k = null, e(this), k = t;
	}, t.getTweens = function() {
		var t = [];
		return this.data.forEach(function(n) {
			return n instanceof e ? t.push.apply(t, n.getTweens()) : n instanceof Bn && !(n.parent && n.parent.data === "nested") && t.push(n);
		}), t;
	}, t.clear = function() {
		this._r.length = this.data.length = 0;
	}, t.kill = function(e, t) {
		var n = this;
		if (e ? (function() {
			for (var t = n.getTweens(), r = n.data.length, i; r--;) i = n.data[r], i.data === "isFlip" && (i.revert(), i.getChildren(!0, !0, !1).forEach(function(e) {
				return t.splice(t.indexOf(e), 1);
			}));
			for (t.map(function(e) {
				return {
					g: e._dur || e._delay || e._sat && !e._sat.vars.immediateRender ? e.globalTime(0) : -Infinity,
					t: e
				};
			}).sort(function(e, t) {
				return t.g - e.g || -Infinity;
			}).forEach(function(t) {
				return t.t.revert(e);
			}), r = n.data.length; r--;) i = n.data[r], i instanceof En ? i.data !== "nested" && (i.scrollTrigger && i.scrollTrigger.revert(), i.kill()) : !(i instanceof Bn) && i.revert && i.revert(e);
			n._r.forEach(function(t) {
				return t(e, n);
			}), n.isReverted = !0;
		})() : this.data.forEach(function(e) {
			return e.kill && e.kill();
		}), this.clear(), t) for (var r = tr.length; r--;) tr[r].id === this.id && tr.splice(r, 1);
	}, t.revert = function(e) {
		this.kill(e || {});
	}, e;
}(), lr = /*#__PURE__*/ function() {
	function e(e) {
		this.contexts = [], this.scope = e, k && k.data.push(this);
	}
	var t = e.prototype;
	return t.add = function(e, t, n) {
		ne(e) || (e = { matches: e });
		var r = new cr(0, n || this.scope), i = r.conditions = {}, a, o, s;
		for (o in k && !r.selector && (r.selector = k.selector), this.contexts.push(r), t = r.add("onMatch", t), r.queries = e, e) o === "all" ? s = 1 : (a = K.matchMedia(e[o]), a && (tr.indexOf(r) < 0 && tr.push(r), (i[o] = a.matches) && (s = 1), a.addListener ? a.addListener(sr) : a.addEventListener("change", sr)));
		return s && t(r, function(e) {
			return r.add(null, e);
		}), this;
	}, t.revert = function(e) {
		this.kill(e || {});
	}, t.kill = function(e) {
		this.contexts.forEach(function(t) {
			return t.kill(e, !0);
		});
	}, e;
}(), ur = {
	registerPlugin: function() {
		[...arguments].forEach(function(e) {
			return Qt(e);
		});
	},
	timeline: function(e) {
		return new En(e);
	},
	getTweensOf: function(e, t) {
		return G.getTweensOf(e, t);
	},
	getProperty: function(e, t, n, r) {
		L(e) && (e = jt(e)[0]);
		var i = Pe(e || {}).get, a = n ? Ge : We;
		return n === "native" && (n = ""), e && (t ? a((Oe[t] && Oe[t].get || i)(e, t, n, r)) : function(t, n, r) {
			return a((Oe[t] && Oe[t].get || i)(e, t, n, r));
		});
	},
	quickSetter: function(e, t, n) {
		if (e = jt(e), e.length > 1) {
			var r = e.map(function(e) {
				return mr.quickSetter(e, t, n);
			}), i = r.length;
			return function(e) {
				for (var t = i; t--;) r[t](e);
			};
		}
		e = e[0] || {};
		var a = Oe[t], o = Pe(e), s = o.harness && (o.harness.aliases || {})[t] || t, c = a ? function(t) {
			var r = new a();
			Xt._pt = 0, r.init(e, n ? t + n : t, Xt, 0, [e]), r.render(1, r), Xt._pt && Yn(1, Xt);
		} : o.set(e, s);
		return a ? c : function(t) {
			return c(e, s, n ? t + n : t, o, 1);
		};
	},
	quickTo: function(e, t, n) {
		var r, i = mr.to(e, Ke((r = {}, r[t] = "+=0.1", r.paused = !0, r.stagger = 0, r), n || {})), a = function(e, n, r) {
			return i.resetTo(t, e, n, r);
		};
		return a.tween = i, a;
	},
	isTweening: function(e) {
		return G.getTweensOf(e, !0).length > 0;
	},
	defaults: function(e) {
		return e && e.ease && (e.ease = yn(e.ease, E.ease)), Ye(E, e || {});
	},
	config: function(e) {
		return Ye(T, e || {});
	},
	registerEffect: function(e) {
		var t = e.name, n = e.effect, r = e.plugins, i = e.defaults, a = e.extendTimeline;
		(r || "").split(",").forEach(function(e) {
			return e && !Oe[e] && !pe[e] && ve(t + " effect requires " + e + " plugin.");
		}), ke[t] = function(e, t, r) {
			return n(jt(e), Ke(t || {}, i), r);
		}, a && (En.prototype[t] = function(e, n, r) {
			return this.add(ke[t](e, ne(n) ? n : (r = n) && {}, this), r);
		});
	},
	registerEase: function(e, t) {
		fn[e] = yn(t);
	},
	parseEase: function(e, t) {
		return arguments.length ? yn(e, t) : fn;
	},
	getById: function(e) {
		return G.getById(e);
	},
	exportRoot: function(e, t) {
		e === void 0 && (e = {});
		var n = new En(e), r, i;
		for (n.smoothChildTiming = B(e.smoothChildTiming), G.remove(n), n._dp = 0, n._time = n._tTime = G._time, r = G._first; r;) i = r._next, (t || !(!r._dur && r instanceof Bn && r.vars.onComplete === r._targets[0])) && ft(n, r, r._start - r._delay), r = i;
		return ft(G, n, 0), n;
	},
	context: function(e, t) {
		return e ? new cr(e, t) : k;
	},
	matchMedia: function(e) {
		return new lr(e);
	},
	matchMediaRefresh: function() {
		return tr.forEach(function(e) {
			var t = e.conditions, n, r;
			for (r in t) t[r] && (t[r] = !1, n = 1);
			n && e.revert();
		}) || sr();
	},
	addEventListener: function(e, t) {
		var n = nr[e] || (nr[e] = []);
		~n.indexOf(t) || n.push(t);
	},
	removeEventListener: function(e, t) {
		var n = nr[e], r = n && n.indexOf(t);
		r >= 0 && n.splice(r, 1);
	},
	utils: {
		wrap: Ht,
		wrapYoyo: Ut,
		distribute: Pt,
		random: Lt,
		snap: It,
		normalize: Bt,
		getUnit: Et,
		clamp: Dt,
		splitColor: nn,
		toArray: jt,
		selector: Mt,
		mapRange: Gt,
		pipe: Rt,
		unitize: zt,
		interpolate: Kt,
		shuffle: Nt
	},
	install: ge,
	effects: ke,
	ticker: un,
	updateRoot: En.updateRoot,
	plugins: Oe,
	globalTimeline: G,
	core: {
		PropTween: er,
		globals: ye,
		Tween: Bn,
		Timeline: En,
		Animation: Tn,
		getCache: Pe,
		_removeLinkedListItem: et,
		reverting: function() {
			return O;
		},
		context: function(e) {
			return e && k && (k.data.push(e), e._ctx = k), k;
		},
		suppressOverwrites: function(e) {
			return D = e;
		}
	}
};
Ie("to,from,fromTo,delayedCall,set,killTweensOf", function(e) {
	return ur[e] = Bn[e];
}), un.add(En.updateRoot), Xt = ur.to({}, { duration: 0 });
var dr = function(e, t) {
	for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t;) n = n._next;
	return n;
}, fr = function(e, t) {
	var n = e._targets, r, i, a;
	for (r in t) for (i = n.length; i--;) a = e._ptLookup[i][r], (a &&= a.d) && (a._pt && (a = dr(a, r)), a && a.modifier && a.modifier(t[r], e, n[i], r));
}, pr = function(e, t) {
	return {
		name: e,
		headless: 1,
		rawVars: 1,
		init: function(e, n, r) {
			r._onInit = function(e) {
				var r, i;
				if (L(n) && (r = {}, Ie(n, function(e) {
					return r[e] = 1;
				}), n = r), t) {
					for (i in r = {}, n) r[i] = t(n[i]);
					n = r;
				}
				fr(e, n);
			};
		}
	};
}, mr = ur.registerPlugin({
	name: "attr",
	init: function(e, t, n, r, i) {
		var a, o, s;
		for (a in this.tween = n, t) s = e.getAttribute(a) || "", o = this.add(e, "setAttribute", (s || 0) + "", t[a], r, i, 0, 0, a), o.op = a, o.b = s, this._props.push(a);
	},
	render: function(e, t) {
		for (var n = t._pt; n;) O ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), n = n._next;
	}
}, {
	name: "endArray",
	headless: 1,
	init: function(e, t) {
		for (var n = t.length; n--;) this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
	}
}, pr("roundProps", Ft), pr("modifiers"), pr("snap", It)) || ur;
Bn.version = En.version = mr.version = "3.15.0", he = 1, re() && dn(), fn.Power0, fn.Power1, fn.Power2, fn.Power3, fn.Power4, fn.Linear, fn.Quad, fn.Cubic, fn.Quart, fn.Quint, fn.Strong, fn.Elastic, fn.Back, fn.SteppedEase, fn.Bounce, fn.Sine, fn.Expo, fn.Circ;
//#endregion
//#region node_modules/gsap/CSSPlugin.js
var hr, gr, _r, vr, yr, br, xr, Sr = function() {
	return typeof window < "u";
}, Cr = {}, wr = 180 / Math.PI, Tr = Math.PI / 180, Er = Math.atan2, Dr = 1e8, Or = /([A-Z])/g, kr = /(left|right|width|margin|padding|x)/i, Ar = /[\s,\(]\S/, jr = {
	autoAlpha: "opacity,visibility",
	scale: "scaleX,scaleY",
	alpha: "opacity"
}, Mr = function(e, t) {
	return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Nr = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Pr = function(e, t) {
	return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, Fr = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, Ir = function(e, t) {
	var n = t.s + t.c * e;
	t.set(t.t, t.p, ~~(n + (n < 0 ? -.5 : .5)) + t.u, t);
}, Lr = function(e, t) {
	return t.set(t.t, t.p, e ? t.e : t.b, t);
}, Rr = function(e, t) {
	return t.set(t.t, t.p, e === 1 ? t.e : t.b, t);
}, zr = function(e, t, n) {
	return e.style[t] = n;
}, Br = function(e, t, n) {
	return e.style.setProperty(t, n);
}, Vr = function(e, t, n) {
	return e._gsap[t] = n;
}, Hr = function(e, t, n) {
	return e._gsap.scaleX = e._gsap.scaleY = n;
}, Ur = function(e, t, n, r, i) {
	var a = e._gsap;
	a.scaleX = a.scaleY = n, a.renderTransform(i, a);
}, Wr = function(e, t, n, r, i) {
	var a = e._gsap;
	a[t] = n, a.renderTransform(i, a);
}, Gr = "transform", Kr = Gr + "Origin", qr = function e(t, n) {
	var r = this, i = this.target, a = i.style, o = i._gsap;
	if (t in Cr && a) {
		if (this.tfm = this.tfm || {}, t !== "transform") t = jr[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(e) {
			return r.tfm[e] = fi(i, e);
		}) : this.tfm[t] = o.x ? o[t] : fi(i, t), t === Kr && (this.tfm.zOrigin = o.zOrigin);
		else return jr.transform.split(",").forEach(function(t) {
			return e.call(r, t, n);
		});
		if (this.props.indexOf(Gr) >= 0) return;
		o.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(Kr, n, "")), t = Gr;
	}
	(a || n) && this.props.push(t, n, a[t]);
}, Jr = function(e) {
	e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, Yr = function() {
	for (var e = this.props, t = this.target, n = t.style, r = t._gsap, i = 0, a; i < e.length; i += 3) e[i + 1] ? e[i + 1] === 2 ? t[e[i]](e[i + 2]) : t[e[i]] = e[i + 2] : e[i + 2] ? n[e[i]] = e[i + 2] : n.removeProperty(e[i].substr(0, 2) === "--" ? e[i] : e[i].replace(Or, "-$1").toLowerCase());
	if (this.tfm) {
		for (a in this.tfm) r[a] = this.tfm[a];
		r.svg && (r.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), i = xr(), (!i || !i.isStart) && !n[Gr] && (Jr(n), r.zOrigin && n[Kr] && (n[Kr] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
	}
}, Xr = function(e, t) {
	var n = {
		target: e,
		props: [],
		revert: Yr,
		save: qr
	};
	return e._gsap || mr.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(e) {
		return n.save(e);
	}), n;
}, Zr, Qr = function(e, t) {
	var n = gr.createElementNS ? gr.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : gr.createElement(e);
	return n && n.style ? n : gr.createElement(e);
}, $r = function e(t, n, r) {
	var i = getComputedStyle(t);
	return i[n] || i.getPropertyValue(n.replace(Or, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && e(t, ti(n) || n, 1) || "";
}, ei = "O,Moz,ms,Ms,Webkit".split(","), ti = function(e, t, n) {
	var r = (t || yr).style, i = 5;
	if (e in r && !n) return e;
	for (e = e.charAt(0).toUpperCase() + e.substr(1); i-- && !(ei[i] + e in r););
	return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? ei[i] : "") + e;
}, ni = function() {
	Sr() && window.document && (hr = window, gr = hr.document, _r = gr.documentElement, yr = Qr("div") || { style: {} }, Qr("div"), Gr = ti(Gr), Kr = Gr + "Origin", yr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Zr = !!ti("perspective"), xr = mr.core.reverting, vr = 1);
}, ri = function(e) {
	var t = e.ownerSVGElement, n = Qr("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = e.cloneNode(!0), i;
	r.style.display = "block", n.appendChild(r), _r.appendChild(n);
	try {
		i = r.getBBox();
	} catch {}
	return n.removeChild(r), _r.removeChild(n), i;
}, ii = function(e, t) {
	for (var n = t.length; n--;) if (e.hasAttribute(t[n])) return e.getAttribute(t[n]);
}, ai = function(e) {
	var t, n;
	try {
		t = e.getBBox();
	} catch {
		t = ri(e), n = 1;
	}
	return t && (t.width || t.height) || n || (t = ri(e)), t && !t.width && !t.x && !t.y ? {
		x: +ii(e, [
			"x",
			"cx",
			"x1"
		]) || 0,
		y: +ii(e, [
			"y",
			"cy",
			"y1"
		]) || 0,
		width: 0,
		height: 0
	} : t;
}, oi = function(e) {
	return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !ai(e));
}, si = function(e, t) {
	if (t) {
		var n = e.style, r;
		t in Cr && t !== Kr && (t = Gr), n.removeProperty ? (r = t.substr(0, 2), (r === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), n.removeProperty(r === "--" ? t : t.replace(Or, "-$1").toLowerCase())) : n.removeAttribute(t);
	}
}, ci = function(e, t, n, r, i, a) {
	var o = new er(e._pt, t, n, 0, 1, a ? Rr : Lr);
	return e._pt = o, o.b = r, o.e = i, e._props.push(n), o;
}, li = {
	deg: 1,
	rad: 1,
	turn: 1
}, ui = {
	grid: 1,
	flex: 1
}, di = function e(t, n, r, i) {
	var a = parseFloat(r) || 0, o = (r + "").trim().substr((a + "").length) || "px", s = yr.style, c = kr.test(n), l = t.tagName.toLowerCase() === "svg", u = (l ? "client" : "offset") + (c ? "Width" : "Height"), d = 100, f = i === "px", p = i === "%", m, h, g, _;
	if (i === o || !a || li[i] || li[o]) return a;
	if (o !== "px" && !f && (a = e(t, n, r, "px")), _ = t.getCTM && oi(t), (p || o === "%") && (Cr[n] || ~n.indexOf("adius"))) return m = _ ? t.getBBox()[c ? "width" : "height"] : t[u], Le(p ? a / m * d : a / 100 * m);
	if (s[c ? "width" : "height"] = d + (f ? o : i), h = i !== "rem" && ~n.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, _ && (h = (t.ownerSVGElement || {}).parentNode), (!h || h === gr || !h.appendChild) && (h = gr.body), g = h._gsap, g && p && g.width && c && g.time === un.time && !g.uncache) return Le(a / g.width * d);
	if (p && (n === "height" || n === "width")) {
		var v = t.style[n];
		t.style[n] = d + i, m = t[u], v ? t.style[n] = v : si(t, n);
	} else (p || o === "%") && !ui[$r(h, "display")] && (s.position = $r(t, "position")), h === t && (s.position = "static"), h.appendChild(yr), m = yr[u], h.removeChild(yr), s.position = "absolute";
	return c && p && (g = Pe(h), g.time = un.time, g.width = h[u]), Le(f ? m * a / d : m && a ? d / m * a : 0);
}, fi = function(e, t, n, r) {
	var i;
	return vr || ni(), t in jr && t !== "transform" && (t = jr[t], ~t.indexOf(",") && (t = t.split(",")[0])), Cr[t] && t !== "transform" ? (i = wi(e, r), i = t === "transformOrigin" ? i.svg ? i.origin : Ti($r(e, Kr)) + " " + i.zOrigin + "px" : i[t]) : (i = e.style[t], (!i || i === "auto" || r || ~(i + "").indexOf("calc(")) && (i = _i[t] && _i[t](e, t, n) || $r(e, t) || Fe(e, t) || +(t === "opacity"))), n && !~(i + "").trim().indexOf(" ") ? di(e, t, i, n) + n : i;
}, pi = function(e, t, n, r) {
	if (!n || n === "none") {
		var i = ti(t, e, 1), a = i && $r(e, i, 1);
		a && a !== n ? (t = i, n = a) : t === "borderColor" && (n = $r(e, "borderTopColor"));
	}
	var o = new er(this._pt, e.style, t, 0, 1, Jn), s = 0, c = 0, l, u, d, f, p, m, h, g, _, v, y, b;
	if (o.b = n, o.e = r, n += "", r += "", r.substring(0, 6) === "var(--" && (r = $r(e, r.substring(4, r.indexOf(")")))), r === "auto" && (m = e.style[t], e.style[t] = r, r = $r(e, t) || r, m ? e.style[t] = m : si(e, t)), l = [n, r], cn(l), n = l[0], r = l[1], d = n.match(W) || [], b = r.match(W) || [], b.length) {
		for (; u = W.exec(r);) h = u[0], _ = r.substring(s, u.index), p ? p = (p + 1) % 5 : (_.substr(-5) === "rgba(" || _.substr(-5) === "hsla(") && (p = 1), h !== (m = d[c++] || "") && (f = parseFloat(m) || 0, y = m.substr((f + "").length), h.charAt(1) === "=" && (h = ze(f, h) + y), g = parseFloat(h), v = h.substr((g + "").length), s = W.lastIndex - v.length, v || (v = v || T.units[t] || y, s === r.length && (r += v, o.e += v)), y !== v && (f = di(e, t, m, v) || 0), o._pt = {
			_next: o._pt,
			p: _ || c === 1 ? _ : ",",
			s: f,
			c: g - f,
			m: p && p < 4 || t === "zIndex" ? Math.round : 0
		});
		o.c = s < r.length ? r.substring(s, r.length) : "";
	} else o.r = t === "display" && r === "none" ? Rr : Lr;
	return le.test(r) && (o.e = 0), this._pt = o, o;
}, mi = {
	top: "0%",
	bottom: "100%",
	left: "0%",
	right: "100%",
	center: "50%"
}, hi = function(e) {
	var t = e.split(" "), n = t[0], r = t[1] || "50%";
	return (n === "top" || n === "bottom" || r === "left" || r === "right") && (e = n, n = r, r = e), t[0] = mi[n] || n, t[1] = mi[r] || r, t.join(" ");
}, gi = function(e, t) {
	if (t.tween && t.tween._time === t.tween._dur) {
		var n = t.t, r = n.style, i = t.u, a = n._gsap, o, s, c;
		if (i === "all" || i === !0) r.cssText = "", s = 1;
		else for (i = i.split(","), c = i.length; --c > -1;) o = i[c], Cr[o] && (s = 1, o = o === "transformOrigin" ? Kr : Gr), si(n, o);
		s && (si(n, Gr), a && (a.svg && n.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", wi(n, 1), a.uncache = 1, Jr(r)));
	}
}, _i = { clearProps: function(e, t, n, r, i) {
	if (i.data !== "isFromStart") {
		var a = e._pt = new er(e._pt, t, n, 0, 0, gi);
		return a.u = r, a.pr = -10, a.tween = i, e._props.push(n), 1;
	}
} }, vi = [
	1,
	0,
	0,
	1,
	0,
	0
], yi = {}, bi = function(e) {
	return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, xi = function(e) {
	var t = $r(e, Gr);
	return bi(t) ? vi : t.substr(7).match(U).map(Le);
}, Si = function(e, t) {
	var n = e._gsap || Pe(e), r = e.style, i = xi(e), a, o, s, c;
	return n.svg && e.getAttribute("transform") ? (s = e.transform.baseVal.consolidate().matrix, i = [
		s.a,
		s.b,
		s.c,
		s.d,
		s.e,
		s.f
	], i.join(",") === "1,0,0,1,0,0" ? vi : i) : (i === vi && !e.offsetParent && e !== _r && !n.svg && (s = r.display, r.display = "block", a = e.parentNode, (!a || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, o = e.nextElementSibling, _r.appendChild(e)), i = xi(e), s ? r.display = s : si(e, "display"), c && (o ? a.insertBefore(e, o) : a ? a.appendChild(e) : _r.removeChild(e))), t && i.length > 6 ? [
		i[0],
		i[1],
		i[4],
		i[5],
		i[12],
		i[13]
	] : i);
}, Ci = function(e, t, n, r, i, a) {
	var o = e._gsap, s = i || Si(e, !0), c = o.xOrigin || 0, l = o.yOrigin || 0, u = o.xOffset || 0, d = o.yOffset || 0, f = s[0], p = s[1], m = s[2], h = s[3], g = s[4], _ = s[5], v = t.split(" "), y = parseFloat(v[0]) || 0, b = parseFloat(v[1]) || 0, x, S, C, w;
	n ? s !== vi && (S = f * h - p * m) && (C = h / S * y + b * (-m / S) + (m * _ - h * g) / S, w = y * (-p / S) + f / S * b - (f * _ - p * g) / S, y = C, b = w) : (x = ai(e), y = x.x + (~v[0].indexOf("%") ? y / 100 * x.width : y), b = x.y + (~(v[1] || v[0]).indexOf("%") ? b / 100 * x.height : b)), r || r !== !1 && o.smooth ? (g = y - c, _ = b - l, o.xOffset = u + (g * f + _ * m) - g, o.yOffset = d + (g * p + _ * h) - _) : o.xOffset = o.yOffset = 0, o.xOrigin = y, o.yOrigin = b, o.smooth = !!r, o.origin = t, o.originIsAbsolute = !!n, e.style[Kr] = "0px 0px", a && (ci(a, o, "xOrigin", c, y), ci(a, o, "yOrigin", l, b), ci(a, o, "xOffset", u, o.xOffset), ci(a, o, "yOffset", d, o.yOffset)), e.setAttribute("data-svg-origin", y + " " + b);
}, wi = function(e, t) {
	var n = e._gsap || new wn(e);
	if ("x" in n && !t && !n.uncache) return n;
	var r = e.style, i = n.scaleX < 0, a = "px", o = "deg", s = getComputedStyle(e), c = $r(e, Kr) || "0", l = u = d = m = h = g = _ = v = y = 0, u, d, f = p = 1, p, m, h, g, _, v, y, b, x, S, C, w, E, D, O, k, A, j, M, N, P, F, I, ee, L, R, z, te;
	return n.svg = !!(e.getCTM && oi(e)), s.translate && ((s.translate !== "none" || s.scale !== "none" || s.rotate !== "none") && (r[Gr] = (s.translate === "none" ? "" : "translate3d(" + (s.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") ") + (s.rotate === "none" ? "" : "rotate(" + s.rotate + ") ") + (s.scale === "none" ? "" : "scale(" + s.scale.split(" ").join(",") + ") ") + (s[Gr] === "none" ? "" : s[Gr])), r.scale = r.rotate = r.translate = "none"), S = Si(e, n.svg), n.svg && (n.uncache ? (P = e.getBBox(), c = n.xOrigin - P.x + "px " + (n.yOrigin - P.y) + "px", N = "") : N = !t && e.getAttribute("data-svg-origin"), Ci(e, N || c, !!N || n.originIsAbsolute, n.smooth !== !1, S)), b = n.xOrigin || 0, x = n.yOrigin || 0, S !== vi && (D = S[0], O = S[1], k = S[2], A = S[3], l = j = S[4], u = M = S[5], S.length === 6 ? (f = Math.sqrt(D * D + O * O), p = Math.sqrt(A * A + k * k), m = D || O ? Er(O, D) * wr : 0, _ = k || A ? Er(k, A) * wr + m : 0, _ && (p *= Math.abs(Math.cos(_ * Tr))), n.svg && (l -= b - (b * D + x * k), u -= x - (b * O + x * A))) : (te = S[6], R = S[7], I = S[8], ee = S[9], L = S[10], z = S[11], l = S[12], u = S[13], d = S[14], C = Er(te, L), h = C * wr, C && (w = Math.cos(-C), E = Math.sin(-C), N = j * w + I * E, P = M * w + ee * E, F = te * w + L * E, I = j * -E + I * w, ee = M * -E + ee * w, L = te * -E + L * w, z = R * -E + z * w, j = N, M = P, te = F), C = Er(-k, L), g = C * wr, C && (w = Math.cos(-C), E = Math.sin(-C), N = D * w - I * E, P = O * w - ee * E, F = k * w - L * E, z = A * E + z * w, D = N, O = P, k = F), C = Er(O, D), m = C * wr, C && (w = Math.cos(C), E = Math.sin(C), N = D * w + O * E, P = j * w + M * E, O = O * w - D * E, M = M * w - j * E, D = N, j = P), h && Math.abs(h) + Math.abs(m) > 359.9 && (h = m = 0, g = 180 - g), f = Le(Math.sqrt(D * D + O * O + k * k)), p = Le(Math.sqrt(M * M + te * te)), C = Er(j, M), _ = Math.abs(C) > 2e-4 ? C * wr : 0, y = z ? 1 / (z < 0 ? -z : z) : 0), n.svg && (N = e.getAttribute("transform"), n.forceCSS = e.setAttribute("transform", "") || !bi($r(e, Gr)), N && e.setAttribute("transform", N))), Math.abs(_) > 90 && Math.abs(_) < 270 && (i ? (f *= -1, _ += m <= 0 ? 180 : -180, m += m <= 0 ? 180 : -180) : (p *= -1, _ += _ <= 0 ? 180 : -180)), t ||= n.uncache, n.x = l - ((n.xPercent = l && (!t && n.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-l) ? -50 : 0))) ? e.offsetWidth * n.xPercent / 100 : 0) + a, n.y = u - ((n.yPercent = u && (!t && n.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetHeight * n.yPercent / 100 : 0) + a, n.z = d + a, n.scaleX = Le(f), n.scaleY = Le(p), n.rotation = Le(m) + o, n.rotationX = Le(h) + o, n.rotationY = Le(g) + o, n.skewX = _ + o, n.skewY = v + o, n.transformPerspective = y + a, (n.zOrigin = parseFloat(c.split(" ")[2]) || !t && n.zOrigin || 0) && (r[Kr] = Ti(c)), n.xOffset = n.yOffset = 0, n.force3D = T.force3D, n.renderTransform = n.svg ? Mi : Zr ? ji : Di, n.uncache = 0, n;
}, Ti = function(e) {
	return (e = e.split(" "))[0] + " " + e[1];
}, Ei = function(e, t, n) {
	var r = Et(t);
	return Le(parseFloat(t) + parseFloat(di(e, "x", n + "px", r))) + r;
}, Di = function(e, t) {
	t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, ji(e, t);
}, Oi = "0deg", ki = "0px", Ai = ") ", ji = function(e, t) {
	var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.z, c = n.rotation, l = n.rotationY, u = n.rotationX, d = n.skewX, f = n.skewY, p = n.scaleX, m = n.scaleY, h = n.transformPerspective, g = n.force3D, _ = n.target, v = n.zOrigin, y = "", b = g === "auto" && e && e !== 1 || g === !0;
	if (v && (u !== Oi || l !== Oi)) {
		var x = parseFloat(l) * Tr, S = Math.sin(x), C = Math.cos(x), w;
		x = parseFloat(u) * Tr, w = Math.cos(x), a = Ei(_, a, S * w * -v), o = Ei(_, o, -Math.sin(x) * -v), s = Ei(_, s, C * w * -v + v);
	}
	h !== ki && (y += "perspective(" + h + Ai), (r || i) && (y += "translate(" + r + "%, " + i + "%) "), (b || a !== ki || o !== ki || s !== ki) && (y += s !== ki || b ? "translate3d(" + a + ", " + o + ", " + s + ") " : "translate(" + a + ", " + o + Ai), c !== Oi && (y += "rotate(" + c + Ai), l !== Oi && (y += "rotateY(" + l + Ai), u !== Oi && (y += "rotateX(" + u + Ai), (d !== Oi || f !== Oi) && (y += "skew(" + d + ", " + f + Ai), (p !== 1 || m !== 1) && (y += "scale(" + p + ", " + m + Ai), _.style[Gr] = y || "translate(0, 0)";
}, Mi = function(e, t) {
	var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.rotation, c = n.skewX, l = n.skewY, u = n.scaleX, d = n.scaleY, f = n.target, p = n.xOrigin, m = n.yOrigin, h = n.xOffset, g = n.yOffset, _ = n.forceCSS, v = parseFloat(a), y = parseFloat(o), b, x, S, C, w;
	s = parseFloat(s), c = parseFloat(c), l = parseFloat(l), l && (l = parseFloat(l), c += l, s += l), s || c ? (s *= Tr, c *= Tr, b = Math.cos(s) * u, x = Math.sin(s) * u, S = Math.sin(s - c) * -d, C = Math.cos(s - c) * d, c && (l *= Tr, w = Math.tan(c - l), w = Math.sqrt(1 + w * w), S *= w, C *= w, l && (w = Math.tan(l), w = Math.sqrt(1 + w * w), b *= w, x *= w)), b = Le(b), x = Le(x), S = Le(S), C = Le(C)) : (b = u, C = d, x = S = 0), (v && !~(a + "").indexOf("px") || y && !~(o + "").indexOf("px")) && (v = di(f, "x", a, "px"), y = di(f, "y", o, "px")), (p || m || h || g) && (v = Le(v + p - (p * b + m * S) + h), y = Le(y + m - (p * x + m * C) + g)), (r || i) && (w = f.getBBox(), v = Le(v + r / 100 * w.width), y = Le(y + i / 100 * w.height)), w = "matrix(" + b + "," + x + "," + S + "," + C + "," + v + "," + y + ")", f.setAttribute("transform", w), _ && (f.style[Gr] = w);
}, Ni = function(e, t, n, r, i) {
	var a = 360, o = L(i), s = parseFloat(i) * (o && ~i.indexOf("rad") ? wr : 1) - r, c = r + s + "deg", l, u;
	return o && (l = i.split("_")[1], l === "short" && (s %= a, s !== s % (a / 2) && (s += s < 0 ? a : -a)), l === "cw" && s < 0 ? s = (s + a * Dr) % a - ~~(s / a) * a : l === "ccw" && s > 0 && (s = (s - a * Dr) % a - ~~(s / a) * a)), e._pt = u = new er(e._pt, t, n, r, s, Nr), u.e = c, u.u = "deg", e._props.push(n), u;
}, Pi = function(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}, Fi = function(e, t, n) {
	var r = Pi({}, n._gsap), i = "perspective,force3D,transformOrigin,svgOrigin", a = n.style, o, s, c, l, u, d, f, p;
	for (s in r.svg ? (c = n.getAttribute("transform"), n.setAttribute("transform", ""), a[Gr] = t, o = wi(n, 1), si(n, Gr), n.setAttribute("transform", c)) : (c = getComputedStyle(n)[Gr], a[Gr] = t, o = wi(n, 1), a[Gr] = c), Cr) c = r[s], l = o[s], c !== l && i.indexOf(s) < 0 && (f = Et(c), p = Et(l), u = f === p ? parseFloat(c) : di(n, s, c, p), d = parseFloat(l), e._pt = new er(e._pt, o, s, u, d - u, Mr), e._pt.u = p || 0, e._props.push(s));
	Pi(o, r);
};
Ie("padding,margin,Width,Radius", function(e, t) {
	var n = "Top", r = "Right", i = "Bottom", a = "Left", o = (t < 3 ? [
		n,
		r,
		i,
		a
	] : [
		n + a,
		n + r,
		i + r,
		i + a
	]).map(function(n) {
		return t < 2 ? e + n : "border" + n + e;
	});
	_i[t > 1 ? "border" + e : e] = function(e, t, n, r, i) {
		var a, s;
		if (arguments.length < 4) return a = o.map(function(t) {
			return fi(e, t, n);
		}), s = a.join(" "), s.split(a[0]).length === 5 ? a[0] : s;
		a = (r + "").split(" "), s = {}, o.forEach(function(e, t) {
			return s[e] = a[t] = a[t] || a[(t - 1) / 2 | 0];
		}), e.init(t, s, i);
	};
});
var Ii = {
	name: "css",
	register: ni,
	targetTest: function(e) {
		return e.style && e.nodeType;
	},
	init: function(e, t, n, r, i) {
		var a = this._props, o = e.style, s = n.vars.startAt, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w;
		for (m in vr || ni(), this.styles = this.styles || Xr(e), C = this.styles.props, this.tween = n, t) if (m !== "autoRound" && (l = t[m], !(Oe[m] && An(m, t, n, r, e, i)))) {
			if (f = typeof l, p = _i[m], f === "function" && (l = l.call(n, r, e, i), f = typeof l), f === "string" && ~l.indexOf("random(") && (l = Wt(l)), p) p(this, e, m, l, n) && (S = 1);
			else if (m.substr(0, 2) === "--") c = (getComputedStyle(e).getPropertyValue(m) + "").trim(), l += "", on.lastIndex = 0, on.test(c) || (h = Et(c), g = Et(l), g ? h !== g && (c = di(e, m, c, g) + g) : h && (l += h)), this.add(o, "setProperty", c, l, r, i, 0, 0, m), a.push(m), C.push(m, 0, o[m]);
			else if (f !== "undefined") {
				if (s && m in s ? (c = typeof s[m] == "function" ? s[m].call(n, r, e, i) : s[m], L(c) && ~c.indexOf("random(") && (c = Wt(c)), Et(c + "") || c === "auto" || (c += T.units[m] || Et(fi(e, m)) || ""), (c + "").charAt(1) === "=" && (c = fi(e, m))) : c = fi(e, m), d = parseFloat(c), _ = f === "string" && l.charAt(1) === "=" && l.substr(0, 2), _ && (l = l.substr(2)), u = parseFloat(l), m in jr && (m === "autoAlpha" && (d === 1 && fi(e, "visibility") === "hidden" && u && (d = 0), C.push("visibility", 0, o.visibility), ci(this, o, "visibility", d ? "inherit" : "hidden", u ? "inherit" : "hidden", !u)), m !== "scale" && m !== "transform" && (m = jr[m], ~m.indexOf(",") && (m = m.split(",")[0]))), v = m in Cr, v) {
					if (this.styles.save(m), w = l, f === "string" && l.substring(0, 6) === "var(--") {
						if (l = $r(e, l.substring(4, l.indexOf(")"))), l.substring(0, 5) === "calc(") {
							var E = e.style.perspective;
							e.style.perspective = l, l = $r(e, "perspective"), E ? e.style.perspective = E : si(e, "perspective");
						}
						u = parseFloat(l);
					}
					if (y || (b = e._gsap, b.renderTransform && !t.parseTransform || wi(e, t.parseTransform), x = t.smoothOrigin !== !1 && b.smooth, y = this._pt = new er(this._pt, o, Gr, 0, 1, b.renderTransform, b, 0, -1), y.dep = 1), m === "scale") this._pt = new er(this._pt, b, "scaleY", b.scaleY, (_ ? ze(b.scaleY, _ + u) : u) - b.scaleY || 0, Mr), this._pt.u = 0, a.push("scaleY", m), m += "X";
					else if (m === "transformOrigin") {
						C.push(Kr, 0, o[Kr]), l = hi(l), b.svg ? Ci(e, l, 0, x, 0, this) : (g = parseFloat(l.split(" ")[2]) || 0, g !== b.zOrigin && ci(this, b, "zOrigin", b.zOrigin, g), ci(this, o, m, Ti(c), Ti(l)));
						continue;
					} else if (m === "svgOrigin") {
						Ci(e, l, 1, x, 0, this);
						continue;
					} else if (m in yi) {
						Ni(this, b, m, d, _ ? ze(d, _ + l) : l);
						continue;
					} else if (m === "smoothOrigin") {
						ci(this, b, "smooth", b.smooth, l);
						continue;
					} else if (m === "force3D") {
						b[m] = l;
						continue;
					} else if (m === "transform") {
						Fi(this, l, e);
						continue;
					}
				} else m in o || (m = ti(m) || m);
				if (v || (u || u === 0) && (d || d === 0) && !Ar.test(l) && m in o) h = (c + "").substr((d + "").length), u ||= 0, g = Et(l) || (m in T.units ? T.units[m] : h), h !== g && (d = di(e, m, c, g)), this._pt = new er(this._pt, v ? b : o, m, d, (_ ? ze(d, _ + u) : u) - d, !v && (g === "px" || m === "zIndex") && t.autoRound !== !1 ? Ir : Mr), this._pt.u = g || 0, v && w !== l ? (this._pt.b = c, this._pt.e = w, this._pt.r = Fr) : h !== g && g !== "%" && (this._pt.b = c, this._pt.r = Pr);
				else if (m in o) pi.call(this, e, m, c, _ ? _ + l : l);
				else if (m in e) this.add(e, m, c || e[m], _ ? _ + l : l, r, i);
				else if (m !== "parseTransform") {
					_e(m, l);
					continue;
				}
				v || (m in o ? C.push(m, 0, o[m]) : typeof e[m] == "function" ? C.push(m, 2, e[m]()) : C.push(m, 1, c || e[m])), a.push(m);
			}
		}
		S && $n(this);
	},
	render: function(e, t) {
		if (t.tween._time || !xr()) for (var n = t._pt; n;) n.r(e, n.d), n = n._next;
		else t.styles.revert();
	},
	get: fi,
	aliases: jr,
	getSetter: function(e, t, n) {
		var r = jr[t];
		return r && r.indexOf(",") < 0 && (t = r), t in Cr && t !== Kr && (e._gsap.x || fi(e, "x")) ? n && br === n ? t === "scale" ? Hr : Vr : (br = n || {}) && (t === "scale" ? Ur : Wr) : e.style && !te(e.style[t]) ? zr : ~t.indexOf("-") ? Br : Gn(e, t);
	},
	core: {
		_removeProperty: si,
		_getMatrix: Si
	}
};
mr.utils.checkPrefix = ti, mr.core.getStyleSaver = Xr, (function(e, t, n, r) {
	var i = Ie(e + "," + t + "," + n, function(e) {
		Cr[e] = 1;
	});
	Ie(t, function(e) {
		T.units[e] = "deg", yi[e] = 1;
	}), jr[i[13]] = e + "," + t, Ie(r, function(e) {
		var t = e.split(":");
		jr[t[1]] = i[t[0]];
	});
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"), Ie("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(e) {
	T.units[e] = "px";
}), mr.registerPlugin(Ii);
//#endregion
//#region node_modules/gsap/index.js
var Li = mr.registerPlugin(Ii) || mr;
Li.core.Tween;
//#endregion
//#region node_modules/gsap/Observer.js
function Ri(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	}
}
function zi(e, t, n) {
	return t && Ri(e.prototype, t), n && Ri(e, n), e;
}
var Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, J, Zi, Qi = function() {
	return Bi || typeof window < "u" && (Bi = window.gsap) && Bi.registerPlugin && Bi;
}, $i = 1, ea = [], ta = [], na = [], ra = Date.now, ia = function(e, t) {
	return t;
}, aa = function() {
	var e = Ji.core, t = e.bridge || {}, n = e._scrollers, r = e._proxies;
	n.push.apply(n, ta), r.push.apply(r, na), ta = n, na = r, ia = function(e, n) {
		return t[e](n);
	};
}, oa = function(e, t) {
	return ~na.indexOf(e) && na[na.indexOf(e) + 1][t];
}, sa = function(e) {
	return !!~Yi.indexOf(e);
}, ca = function(e, t, n, r, i) {
	return e.addEventListener(t, n, {
		passive: r !== !1,
		capture: !!i
	});
}, la = function(e, t, n, r) {
	return e.removeEventListener(t, n, !!r);
}, ua = "scrollLeft", da = "scrollTop", fa = function() {
	return Xi && Xi.isPressed || ta.cache++;
}, pa = function(e, t) {
	var n = function n(r) {
		if (r || r === 0) {
			$i && (Hi.history.scrollRestoration = "manual");
			var i = Xi && Xi.isPressed;
			r = n.v = Math.round(r) || (Xi && Xi.iOS ? 1 : 0), e(r), n.cacheID = ta.cache, i && ia("ss", r);
		} else (t || ta.cache !== n.cacheID || ia("ref")) && (n.cacheID = ta.cache, n.v = e());
		return n.v + n.offset;
	};
	return n.offset = 0, e && n;
}, ma = {
	s: ua,
	p: "left",
	p2: "Left",
	os: "right",
	os2: "Right",
	d: "width",
	d2: "Width",
	a: "x",
	sc: pa(function(e) {
		return arguments.length ? Hi.scrollTo(e, ha.sc()) : Hi.pageXOffset || Ui[ua] || Wi[ua] || Gi[ua] || 0;
	})
}, ha = {
	s: da,
	p: "top",
	p2: "Top",
	os: "bottom",
	os2: "Bottom",
	d: "height",
	d2: "Height",
	a: "y",
	op: ma,
	sc: pa(function(e) {
		return arguments.length ? Hi.scrollTo(ma.sc(), e) : Hi.pageYOffset || Ui[da] || Wi[da] || Gi[da] || 0;
	})
}, ga = function(e, t) {
	return (t && t._ctx && t._ctx.selector || Bi.utils.toArray)(e)[0] || (typeof e == "string" && Bi.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, _a = function(e, t) {
	for (var n = t.length; n--;) if (t[n] === e || t[n].contains(e)) return !0;
	return !1;
}, va = function(e, t) {
	var n = t.s, r = t.sc;
	sa(e) && (e = Ui.scrollingElement || Wi);
	var i = ta.indexOf(e), a = r === ha.sc ? 1 : 2;
	!~i && (i = ta.push(e) - 1), ta[i + a] || ca(e, "scroll", fa);
	var o = ta[i + a], s = o || (ta[i + a] = pa(oa(e, n), !0) || (sa(e) ? r : pa(function(t) {
		return arguments.length ? e[n] = t : e[n];
	})));
	return s.target = e, o || (s.smooth = Bi.getProperty(e, "scrollBehavior") === "smooth"), s;
}, ya = function(e, t, n) {
	var r = e, i = e, a = ra(), o = a, s = t || 50, c = Math.max(500, s * 3), l = function(e, t) {
		var c = ra();
		t || c - a > s ? (i = r, r = e, o = a, a = c) : n ? r += e : r = i + (e - i) / (c - o) * (a - o);
	};
	return {
		update: l,
		reset: function() {
			i = r = n ? 0 : r, o = a = 0;
		},
		getVelocity: function(e) {
			var t = o, s = i, u = ra();
			return (e || e === 0) && e !== r && l(e), a === o || u - o > c ? 0 : (r + (n ? s : -s)) / ((n ? u : a) - t) * 1e3;
		}
	};
}, ba = function(e, t) {
	return t && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, xa = function(e) {
	var t = Math.max.apply(Math, e), n = Math.min.apply(Math, e);
	return Math.abs(t) >= Math.abs(n) ? t : n;
}, Sa = function() {
	Ji = Bi.core.globals().ScrollTrigger, Ji && Ji.core && aa();
}, Ca = function(e) {
	return Bi = e || Qi(), !Vi && Bi && typeof document < "u" && document.body && (Hi = window, Ui = document, Wi = Ui.documentElement, Gi = Ui.body, Yi = [
		Hi,
		Ui,
		Wi,
		Gi
	], Bi.utils.clamp, Zi = Bi.core.context || function() {}, qi = "onpointerenter" in Gi ? "pointer" : "mouse", Ki = wa.isTouch = Hi.matchMedia && Hi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Hi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, J = wa.eventTypes = ("ontouchstart" in Wi ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Wi ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
		return $i = 0;
	}, 500), Vi = 1), Ji || Sa(), Vi;
};
ma.op = ha, ta.cache = 0;
var wa = /*#__PURE__*/ function() {
	function e(e) {
		this.init(e);
	}
	var t = e.prototype;
	return t.init = function(e) {
		Vi || Ca(Bi) || console.warn("Please gsap.registerPlugin(Observer)"), Ji || Sa();
		var t = e.tolerance, n = e.dragMinimum, r = e.type, i = e.target, a = e.lineHeight, o = e.debounce, s = e.preventDefault, c = e.onStop, l = e.onStopDelay, u = e.ignore, d = e.wheelSpeed, f = e.event, p = e.onDragStart, m = e.onDragEnd, h = e.onDrag, g = e.onPress, _ = e.onRelease, v = e.onRight, y = e.onLeft, b = e.onUp, x = e.onDown, S = e.onChangeX, C = e.onChangeY, w = e.onChange, T = e.onToggleX, E = e.onToggleY, D = e.onHover, O = e.onHoverEnd, k = e.onMove, A = e.ignoreCheck, j = e.isNormalizer, M = e.onGestureStart, N = e.onGestureEnd, P = e.onWheel, F = e.onEnable, I = e.onDisable, ee = e.onClick, L = e.scrollSpeed, R = e.capture, z = e.allowClicks, te = e.lockAxis, ne = e.onLockAxis;
		this.target = i = ga(i) || Wi, this.vars = e, u &&= Bi.utils.toArray(u), t ||= 1e-9, n ||= 0, d ||= 1, L ||= 1, r ||= "wheel,touch,pointer", o = o !== !1, a ||= parseFloat(Hi.getComputedStyle(Gi).lineHeight) || 22;
		var B, re, ie, ae, V, oe, se, H = this, U = 0, W = 0, ce = e.passive || !s && e.passive !== !1, le = va(i, ma), ue = va(i, ha), de = le(), G = ue(), K = ~r.indexOf("touch") && !~r.indexOf("pointer") && J[0] === "pointerdown", fe = sa(i), q = i.ownerDocument || Ui, pe = [
			0,
			0,
			0
		], me = [
			0,
			0,
			0
		], he = 0, ge = function() {
			return he = ra();
		}, _e = function(e, t) {
			return (H.event = e) && u && _a(e.target, u) || t && K && e.pointerType !== "touch" || A && A(e, t);
		}, ve = function() {
			H._vx.reset(), H._vy.reset(), re.pause(), c && c(H);
		}, ye = function() {
			var e = H.deltaX = xa(pe), n = H.deltaY = xa(me), r = Math.abs(e) >= t, i = Math.abs(n) >= t;
			w && (r || i) && w(H, e, n, pe, me), r && (v && H.deltaX > 0 && v(H), y && H.deltaX < 0 && y(H), S && S(H), T && H.deltaX < 0 != U < 0 && T(H), U = H.deltaX, pe[0] = pe[1] = pe[2] = 0), i && (x && H.deltaY > 0 && x(H), b && H.deltaY < 0 && b(H), C && C(H), E && H.deltaY < 0 != W < 0 && E(H), W = H.deltaY, me[0] = me[1] = me[2] = 0), (ae || ie) && (k && k(H), ie &&= (p && ie === 1 && p(H), h && h(H), 0), ae = !1), oe && !(oe = !1) && ne && ne(H), V &&= (P(H), !1), B = 0;
		}, be = function(e, t, n) {
			pe[n] += e, me[n] += t, H._vx.update(e), H._vy.update(t), o ? B ||= requestAnimationFrame(ye) : ye();
		}, xe = function(e, t) {
			te && !se && (H.axis = se = Math.abs(e) > Math.abs(t) ? "x" : "y", oe = !0), se !== "y" && (pe[2] += e, H._vx.update(e, !0)), se !== "x" && (me[2] += t, H._vy.update(t, !0)), o ? B ||= requestAnimationFrame(ye) : ye();
		}, Se = function(e) {
			if (!_e(e, 1)) {
				e = ba(e, s);
				var t = e.clientX, r = e.clientY, i = t - H.x, a = r - H.y, o = H.isDragging;
				H.x = t, H.y = r, (o || (i || a) && (Math.abs(H.startX - t) >= n || Math.abs(H.startY - r) >= n)) && (ie ||= o ? 2 : 1, o || (H.isDragging = !0), xe(i, a));
			}
		}, Ce = H.onPress = function(e) {
			_e(e, 1) || e && e.button || (H.axis = se = null, re.pause(), H.isPressed = !0, e = ba(e), U = W = 0, H.startX = H.x = e.clientX, H.startY = H.y = e.clientY, H._vx.reset(), H._vy.reset(), ca(j ? i : q, J[1], Se, ce, !0), H.deltaX = H.deltaY = 0, g && g(H));
		}, we = H.onRelease = function(e) {
			if (!_e(e, 1)) {
				la(j ? i : q, J[1], Se, !0);
				var t = !isNaN(H.y - H.startY), n = H.isDragging, r = n && (Math.abs(H.x - H.startX) > 3 || Math.abs(H.y - H.startY) > 3), a = ba(e);
				!r && t && (H._vx.reset(), H._vy.reset(), s && z && Bi.delayedCall(.08, function() {
					if (ra() - he > 300 && !e.defaultPrevented) {
						if (e.target.click) e.target.click();
						else if (q.createEvent) {
							var t = q.createEvent("MouseEvents");
							t.initMouseEvent("click", !0, !0, Hi, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(t);
						}
					}
				})), H.isDragging = H.isGesturing = H.isPressed = !1, c && n && !j && re.restart(!0), ie && ye(), m && n && m(H), _ && _(H, r);
			}
		}, Te = function(e) {
			return e.touches && e.touches.length > 1 && (H.isGesturing = !0) && M(e, H.isDragging);
		}, Ee = function() {
			return (H.isGesturing = !1) || N(H);
		}, De = function(e) {
			if (!_e(e)) {
				var t = le(), n = ue();
				be((t - de) * L, (n - G) * L, 1), de = t, G = n, c && re.restart(!0);
			}
		}, Oe = function(e) {
			if (!_e(e)) {
				e = ba(e, s), P && (V = !0);
				var t = (e.deltaMode === 1 ? a : e.deltaMode === 2 ? Hi.innerHeight : 1) * d;
				be(e.deltaX * t, e.deltaY * t, 0), c && !j && re.restart(!0);
			}
		}, ke = function(e) {
			if (!_e(e)) {
				var t = e.clientX, n = e.clientY, r = t - H.x, i = n - H.y;
				H.x = t, H.y = n, ae = !0, c && re.restart(!0), (r || i) && xe(r, i);
			}
		}, Ae = function(e) {
			H.event = e, D(H);
		}, je = function(e) {
			H.event = e, O(H);
		}, Me = function(e) {
			return _e(e) || ba(e, s) && ee(H);
		};
		re = H._dc = Bi.delayedCall(l || .25, ve).pause(), H.deltaX = H.deltaY = 0, H._vx = ya(0, 50, !0), H._vy = ya(0, 50, !0), H.scrollX = le, H.scrollY = ue, H.isDragging = H.isGesturing = H.isPressed = !1, Zi(this), H.enable = function(e) {
			return H.isEnabled || (ca(fe ? q : i, "scroll", fa), r.indexOf("scroll") >= 0 && ca(fe ? q : i, "scroll", De, ce, R), r.indexOf("wheel") >= 0 && ca(i, "wheel", Oe, ce, R), (r.indexOf("touch") >= 0 && Ki || r.indexOf("pointer") >= 0) && (ca(i, J[0], Ce, ce, R), ca(q, J[2], we), ca(q, J[3], we), z && ca(i, "click", ge, !0, !0), ee && ca(i, "click", Me), M && ca(q, "gesturestart", Te), N && ca(q, "gestureend", Ee), D && ca(i, qi + "enter", Ae), O && ca(i, qi + "leave", je), k && ca(i, qi + "move", ke)), H.isEnabled = !0, H.isDragging = H.isGesturing = H.isPressed = ae = ie = !1, H._vx.reset(), H._vy.reset(), de = le(), G = ue(), e && e.type && Ce(e), F && F(H)), H;
		}, H.disable = function() {
			H.isEnabled && (ea.filter(function(e) {
				return e !== H && sa(e.target);
			}).length || la(fe ? q : i, "scroll", fa), H.isPressed && (H._vx.reset(), H._vy.reset(), la(j ? i : q, J[1], Se, !0)), la(fe ? q : i, "scroll", De, R), la(i, "wheel", Oe, R), la(i, J[0], Ce, R), la(q, J[2], we), la(q, J[3], we), la(i, "click", ge, !0), la(i, "click", Me), la(q, "gesturestart", Te), la(q, "gestureend", Ee), la(i, qi + "enter", Ae), la(i, qi + "leave", je), la(i, qi + "move", ke), H.isEnabled = H.isPressed = H.isDragging = !1, I && I(H));
		}, H.kill = H.revert = function() {
			H.disable();
			var e = ea.indexOf(H);
			e >= 0 && ea.splice(e, 1), Xi === H && (Xi = 0);
		}, ea.push(H), j && sa(i) && (Xi = H), H.enable(f);
	}, zi(e, [{
		key: "velocityX",
		get: function() {
			return this._vx.getVelocity();
		}
	}, {
		key: "velocityY",
		get: function() {
			return this._vy.getVelocity();
		}
	}]), e;
}();
wa.version = "3.15.0", wa.create = function(e) {
	return new wa(e);
}, wa.register = Ca, wa.getAll = function() {
	return ea.slice();
}, wa.getById = function(e) {
	return ea.filter(function(t) {
		return t.vars.id === e;
	})[0];
}, Qi() && Bi.registerPlugin(wa);
//#endregion
//#region node_modules/gsap/ScrollTrigger.js
var Y, Ta, Ea, Da, Oa, ka, Aa, ja, Ma, Na, Pa, Fa, Ia, La, Ra, za, Ba, Va, Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io = 1, ao = Date.now, oo = ao(), so = 0, co = 0, lo = function(e, t, n) {
	var r = Eo(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
	return n["_" + t + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, uo = function(e, t) {
	return t && (!Eo(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, fo = function e() {
	return co && requestAnimationFrame(e);
}, po = function() {
	return La = 1;
}, mo = function() {
	return La = 0;
}, ho = function(e) {
	return e;
}, go = function(e) {
	return Math.round(e * 1e5) / 1e5 || 0;
}, _o = function() {
	return typeof window < "u";
}, vo = function() {
	return Y || _o() && (Y = window.gsap) && Y.registerPlugin && Y;
}, yo = function(e) {
	return !!~Aa.indexOf(e);
}, bo = function(e) {
	return (e === "Height" ? eo : Ea["inner" + e]) || Oa["client" + e] || ka["client" + e];
}, xo = function(e) {
	return oa(e, "getBoundingClientRect") || (yo(e) ? function() {
		return Js.width = Ea.innerWidth, Js.height = eo, Js;
	} : function() {
		return Zo(e);
	});
}, So = function(e, t, n) {
	var r = n.d, i = n.d2, a = n.a;
	return (a = oa(e, "getBoundingClientRect")) ? function() {
		return a()[r];
	} : function() {
		return (t ? bo(i) : e["client" + i]) || 0;
	};
}, Co = function(e, t) {
	return !t || ~na.indexOf(e) ? xo(e) : function() {
		return Js;
	};
}, wo = function(e, t) {
	var n = t.s, r = t.d2, i = t.d, a = t.a;
	return Math.max(0, (n = "scroll" + r) && (a = oa(e, n)) ? a() - xo(e)()[i] : yo(e) ? (Oa[n] || ka[n]) - bo(r) : e[n] - e["offset" + r]);
}, To = function(e, t) {
	for (var n = 0; n < Ha.length; n += 3) (!t || ~t.indexOf(Ha[n + 1])) && e(Ha[n], Ha[n + 1], Ha[n + 2]);
}, Eo = function(e) {
	return typeof e == "string";
}, Do = function(e) {
	return typeof e == "function";
}, Oo = function(e) {
	return typeof e == "number";
}, ko = function(e) {
	return typeof e == "object";
}, Ao = function(e, t, n) {
	return e && e.progress(+!t) && n && e.pause();
}, jo = function(e, t, n) {
	if (e.enabled) {
		var r = e._ctx ? e._ctx.add(function() {
			return t(e, n);
		}) : t(e, n);
		r && r.totalTime && (e.callbackAnimation = r);
	}
}, Mo = Math.abs, No = "left", Po = "top", Fo = "right", Io = "bottom", Lo = "width", Ro = "height", zo = "Right", Bo = "Left", Vo = "Top", Ho = "Bottom", Uo = "padding", Wo = "margin", Go = "Width", Ko = "Height", qo = "px", Jo = function(e) {
	return Ea.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
}, Yo = function(e) {
	var t = Jo(e).position;
	e.style.position = t === "absolute" || t === "fixed" ? t : "relative";
}, Xo = function(e, t) {
	for (var n in t) n in e || (e[n] = t[n]);
	return e;
}, Zo = function(e, t) {
	var n = t && Jo(e)[Ra] !== "matrix(1, 0, 0, 1, 0, 0)" && Y.to(e, {
		x: 0,
		y: 0,
		xPercent: 0,
		yPercent: 0,
		rotation: 0,
		rotationX: 0,
		rotationY: 0,
		scale: 1,
		skewX: 0,
		skewY: 0
	}).progress(1), r = e.getBoundingClientRect ? e.getBoundingClientRect() : e.scrollingElement.getBoundingClientRect();
	return n && n.progress(0).kill(), r;
}, Qo = function(e, t) {
	var n = t.d2;
	return e["offset" + n] || e["client" + n] || 0;
}, $o = function(e) {
	var t = [], n = e.labels, r = e.duration(), i;
	for (i in n) t.push(n[i] / r);
	return t;
}, es = function(e) {
	return function(t) {
		return Y.utils.snap($o(e), t);
	};
}, ts = function(e) {
	var t = Y.utils.snap(e), n = Array.isArray(e) && e.slice(0).sort(function(e, t) {
		return e - t;
	});
	return n ? function(e, r, i) {
		i === void 0 && (i = .001);
		var a;
		if (!r) return t(e);
		if (r > 0) {
			for (e -= i, a = 0; a < n.length; a++) if (n[a] >= e) return n[a];
			return n[a - 1];
		}
		for (a = n.length, e += i; a--;) if (n[a] <= e) return n[a];
		return n[0];
	} : function(n, r, i) {
		i === void 0 && (i = .001);
		var a = t(n);
		return !r || Math.abs(a - n) < i || a - n < 0 == r < 0 ? a : t(r < 0 ? n - e : n + e);
	};
}, ns = function(e) {
	return function(t, n) {
		return ts($o(e))(t, n.direction);
	};
}, rs = function(e, t, n, r) {
	return n.split(",").forEach(function(n) {
		return e(t, n, r);
	});
}, is = function(e, t, n, r, i) {
	return e.addEventListener(t, n, {
		passive: !r,
		capture: !!i
	});
}, as = function(e, t, n, r) {
	return e.removeEventListener(t, n, !!r);
}, os = function(e, t, n) {
	n &&= n.wheelHandler, n && (e(t, "wheel", n), e(t, "touchmove", n));
}, ss = {
	startColor: "green",
	endColor: "red",
	indent: 0,
	fontSize: "16px",
	fontWeight: "normal"
}, cs = {
	toggleActions: "play",
	anticipatePin: 0
}, ls = {
	top: 0,
	left: 0,
	center: .5,
	bottom: 1,
	right: 1
}, us = function(e, t) {
	if (Eo(e)) {
		var n = e.indexOf("="), r = ~n ? +(e.charAt(n - 1) + 1) * parseFloat(e.substr(n + 1)) : 0;
		~n && (e.indexOf("%") > n && (r *= t / 100), e = e.substr(0, n - 1)), e = r + (e in ls ? ls[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0);
	}
	return e;
}, ds = function(e, t, n, r, i, a, o, s) {
	var c = i.startColor, l = i.endColor, u = i.fontSize, d = i.indent, f = i.fontWeight, p = Da.createElement("div"), m = yo(n) || oa(n, "pinType") === "fixed", h = e.indexOf("scroller") !== -1, g = m ? ka : n.tagName === "IFRAME" ? n.contentDocument.body : n, _ = e.indexOf("start") !== -1, v = _ ? c : l, y = "border-color:" + v + ";font-size:" + u + ";color:" + v + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
	return y += "position:" + ((h || s) && m ? "fixed;" : "absolute;"), (h || s || !m) && (y += (r === ha ? Fo : Io) + ":" + (a + parseFloat(d)) + "px;"), o && (y += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), p._isStart = _, p.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), p.style.cssText = y, p.innerText = t || t === 0 ? e + "-" + t : e, g.children[0] ? g.insertBefore(p, g.children[0]) : g.appendChild(p), p._offset = p["offset" + r.op.d2], fs(p, 0, r, _), p;
}, fs = function(e, t, n, r) {
	var i = { display: "block" }, a = n[r ? "os2" : "p2"], o = n[r ? "p2" : "os2"];
	e._isFlipped = r, i[n.a + "Percent"] = r ? -100 : 0, i[n.a] = r ? "1px" : 0, i["border" + a + Go] = 1, i["border" + o + Go] = 0, i[n.p] = t + "px", Y.set(e, i);
}, ps = [], ms = {}, hs, gs = function() {
	return ao() - so > 34 && (hs ||= requestAnimationFrame(zs));
}, _s = function() {
	(!Ka || !Ka.isPressed || Ka.startX > ka.clientWidth) && (ta.cache++, Ka ? hs ||= requestAnimationFrame(zs) : zs(), so || Cs("scrollStart"), so = ao());
}, vs = function() {
	Ya = Ea.innerWidth, Ja = Ea.innerHeight;
}, ys = function(e) {
	ta.cache++, (e === !0 || !Ia && !Ga && !Da.fullscreenElement && !Da.webkitFullscreenElement && (!qa || Ya !== Ea.innerWidth || Math.abs(Ea.innerHeight - Ja) > Ea.innerHeight * .25)) && ja.restart(!0);
}, bs = {}, xs = [], Ss = function e() {
	return as(X, "scrollEnd", e) || Fs(!0);
}, Cs = function(e) {
	return bs[e] && bs[e].map(function(e) {
		return e();
	}) || xs;
}, ws = [], Ts = function(e) {
	for (var t = 0; t < ws.length; t += 5) (!e || ws[t + 4] && ws[t + 4].query === e) && (ws[t].style.cssText = ws[t + 1], ws[t].getBBox && ws[t].setAttribute("transform", ws[t + 2] || ""), ws[t + 3].uncache = 1);
}, Es = function() {
	return ta.forEach(function(e) {
		return Do(e) && ++e.cacheID && (e.rec = e());
	});
}, Ds = function(e, t) {
	var n;
	for (za = 0; za < ps.length; za++) n = ps[za], n && (!t || n._ctx === t) && (e ? n.kill(1) : n.revert(!0, !0));
	to = !0, t && Ts(t), t || Cs("revert");
}, Os = function(e, t) {
	ta.cache++, (t || !ks) && ta.forEach(function(e) {
		return Do(e) && e.cacheID++ && (e.rec = 0);
	}), Eo(e) && (Ea.history.scrollRestoration = Qa = e);
}, ks, As = 0, js, Ms = function() {
	if (js !== As) {
		var e = js = As;
		requestAnimationFrame(function() {
			return e === As && Fs(!0);
		});
	}
}, Ns = function() {
	ka.appendChild($a), eo = !Ka && $a.offsetHeight || Ea.innerHeight, ka.removeChild($a);
}, Ps = function(e) {
	return Ma(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t) {
		return t.style.display = e ? "none" : "block";
	});
}, Fs = function(e, t) {
	if (Oa = Da.documentElement, ka = Da.body, Aa = [
		Ea,
		Da,
		Oa,
		ka
	], so && !e && !to) is(X, "scrollEnd", Ss);
	else {
		Ns(), ks = X.isRefreshing = !0, to || Es();
		var n = Cs("refreshInit");
		Ua && X.sort(), t || Ds(), ta.forEach(function(e) {
			Do(e) && (e.smooth && (e.target.style.scrollBehavior = "auto"), e(0));
		}), ps.slice(0).forEach(function(e) {
			return e.refresh();
		}), to = !1, ps.forEach(function(e) {
			if (e._subPinOffset && e.pin) {
				var t = e.vars.horizontal ? "offsetWidth" : "offsetHeight", n = e.pin[t];
				e.revert(!0, 1), e.adjustPinSpacing(e.pin[t] - n), e.refresh();
			}
		}), no = 1, Ps(!0), ps.forEach(function(e) {
			var t = wo(e.scroller, e._dir), n = e.vars.end === "max" || e._endClamp && e.end > t, r = e._startClamp && e.start >= t;
			(n || r) && e.setPositions(r ? t - 1 : e.start, n ? Math.max(r ? t : e.start + 1, t) : e.end, !0);
		}), Ps(!1), no = 0, n.forEach(function(e) {
			return e && e.render && e.render(-1);
		}), ta.forEach(function(e) {
			Do(e) && (e.smooth && requestAnimationFrame(function() {
				return e.target.style.scrollBehavior = "smooth";
			}), e.rec && e(e.rec));
		}), Os(Qa, 1), ja.pause(), As++, ks = 2, zs(2), ps.forEach(function(e) {
			return Do(e.vars.onRefresh) && e.vars.onRefresh(e);
		}), ks = X.isRefreshing = !1, Cs("refresh");
	}
}, Is = 0, Ls = 1, Rs, zs = function(e) {
	if (e === 2 || !ks && !to) {
		X.isUpdating = !0, Rs && Rs.update(0);
		var t = ps.length, n = ao(), r = n - oo >= 50, i = t && ps[0].scroll();
		if (Ls = Is > i ? -1 : 1, ks || (Is = i), r && (so && !La && n - so > 200 && (so = 0, Cs("scrollEnd")), Pa = oo, oo = n), Ls < 0) {
			for (za = t; za-- > 0;) ps[za] && ps[za].update(0, r);
			Ls = 1;
		} else for (za = 0; za < t; za++) ps[za] && ps[za].update(0, r);
		X.isUpdating = !1;
	}
	hs = 0;
}, Bs = [
	No,
	Po,
	Io,
	Fo,
	Wo + Ho,
	Wo + zo,
	Wo + Vo,
	Wo + Bo,
	"display",
	"flexShrink",
	"float",
	"zIndex",
	"gridColumnStart",
	"gridColumnEnd",
	"gridRowStart",
	"gridRowEnd",
	"gridArea",
	"justifySelf",
	"alignSelf",
	"placeSelf",
	"order"
], Vs = Bs.concat([
	Lo,
	Ro,
	"boxSizing",
	"max" + Go,
	"max" + Ko,
	"position",
	Wo,
	Uo,
	Uo + Vo,
	Uo + zo,
	Uo + Ho,
	Uo + Bo
]), Hs = function(e, t, n) {
	Gs(n);
	var r = e._gsap;
	if (r.spacerIsNative) Gs(r.spacerState);
	else if (e._gsap.swappedIn) {
		var i = t.parentNode;
		i && (i.insertBefore(e, t), i.removeChild(t));
	}
	e._gsap.swappedIn = !1;
}, Us = function(e, t, n, r) {
	if (!e._gsap.swappedIn) {
		for (var i = Bs.length, a = t.style, o = e.style, s; i--;) s = Bs[i], a[s] = n[s];
		a.position = n.position === "absolute" ? "absolute" : "relative", n.display === "inline" && (a.display = "inline-block"), o[Io] = o[Fo] = "auto", a.flexBasis = n.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Lo] = Qo(e, ma) + qo, a[Ro] = Qo(e, ha) + qo, a[Uo] = o[Wo] = o[Po] = o[No] = "0", Gs(r), o[Lo] = o["max" + Go] = n[Lo], o[Ro] = o["max" + Ko] = n[Ro], o[Uo] = n[Uo], e.parentNode !== t && (e.parentNode.insertBefore(t, e), t.appendChild(e)), e._gsap.swappedIn = !0;
	}
}, Ws = /([A-Z])/g, Gs = function(e) {
	if (e) {
		var t = e.t.style, n = e.length, r = 0, i, a;
		for ((e.t._gsap || Y.core.getCache(e.t)).uncache = 1; r < n; r += 2) a = e[r + 1], i = e[r], a ? t[i] = a : t[i] && t.removeProperty(i.replace(Ws, "-$1").toLowerCase());
	}
}, Ks = function(e) {
	for (var t = Vs.length, n = e.style, r = [], i = 0; i < t; i++) r.push(Vs[i], n[Vs[i]]);
	return r.t = e, r;
}, qs = function(e, t, n) {
	for (var r = [], i = e.length, a = n ? 8 : 0, o; a < i; a += 2) o = e[a], r.push(o, o in t ? t[o] : e[a + 1]);
	return r.t = e.t, r;
}, Js = {
	left: 0,
	top: 0
}, Ys = function(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	Do(e) && (e = e(s)), Eo(e) && e.substr(0, 3) === "max" && (e = d + (e.charAt(4) === "=" ? us("0" + e.substr(3), n) : 0));
	var m = f ? f.time() : 0, h, g, _;
	if (f && f.seek(0), isNaN(e) || (e = +e), Oo(e)) f && (e = Y.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, d, e)), o && fs(o, n, r, !0);
	else {
		Do(t) && (t = t(s));
		var v = (e || "0").split(" "), y, b, x, S;
		_ = ga(t, s) || ka, y = Zo(_) || {}, (!y || !y.left && !y.top) && Jo(_).display === "none" && (S = _.style.display, _.style.display = "block", y = Zo(_), S ? _.style.display = S : _.style.removeProperty("display")), b = us(v[0], y[r.d]), x = us(v[1] || "0", n), e = y[r.p] - c[r.p] - l + b + i - x, o && fs(o, x, r, n - x < 20 || o._isStart && x > 20), n -= n - x;
	}
	if (p && (s[p] = e || -.001, e < 0 && (e = 0)), a) {
		var C = e + n, w = a._isStart;
		h = "scroll" + r.d2, fs(a, C, r, w && C > 20 || !w && (u ? Math.max(ka[h], Oa[h]) : a.parentNode[h]) <= C + 1), u && (c = Zo(o), u && (a.style[r.op.p] = c[r.op.p] - r.op.m - a._offset + qo));
	}
	return f && _ && (h = Zo(_), f.seek(d), g = Zo(_), f._caScrollDist = h[r.p] - g[r.p], e = e / f._caScrollDist * d), f && f.seek(m), f ? e : Math.round(e);
}, Xs = /(webkit|moz|length|cssText|inset)/i, Zs = function(e, t, n, r) {
	if (e.parentNode !== t) {
		var i = e.style, a, o;
		if (t === ka) {
			for (a in e._stOrig = i.cssText, o = Jo(e), o) !+a && !Xs.test(a) && o[a] && typeof i[a] == "string" && a !== "0" && (i[a] = o[a]);
			i.top = n, i.left = r;
		} else i.cssText = e._stOrig;
		Y.core.getCache(e).uncache = 1, t.appendChild(e);
	}
}, Qs = function(e, t, n) {
	var r = t, i = r;
	return function(t) {
		var a = Math.round(e());
		return a !== r && a !== i && Math.abs(a - r) > 3 && Math.abs(a - i) > 3 && (t = a, n && n()), i = r, r = Math.round(t), r;
	};
}, $s = function(e, t, n) {
	var r = {};
	r[t.p] = "+=" + n, Y.set(e, r);
}, ec = function(e, t) {
	var n = va(e, t), r = "_scroll" + t.p2, i = function t(i, a, o, s, c) {
		var l = t.tween, u = a.onComplete, d = {};
		o ||= n();
		var f = Qs(n, o, function() {
			l.kill(), t.tween = 0;
		});
		return c = s && c || 0, s ||= i - o, l && l.kill(), a[r] = i, a.inherit = !1, a.modifiers = d, d[r] = function() {
			return f(o + s * l.ratio + c * l.ratio * l.ratio);
		}, a.onUpdate = function() {
			ta.cache++, t.tween && zs();
		}, a.onComplete = function() {
			t.tween = 0, u && u.call(l);
		}, l = t.tween = Y.to(e, a), l;
	};
	return e[r] = n, n.wheelHandler = function() {
		return i.tween && i.tween.kill() && (i.tween = 0);
	}, is(e, "wheel", n.wheelHandler), X.isTouch && is(e, "touchmove", n.wheelHandler), i;
}, X = /*#__PURE__*/ function() {
	function e(t, n) {
		Ta || e.register(Y) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Za(this), this.init(t, n);
	}
	var t = e.prototype;
	return t.init = function(t, n) {
		if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !co) this.update = this.refresh = this.kill = ho;
		else {
			t = Xo(Eo(t) || Oo(t) || t.nodeType ? { trigger: t } : t, cs);
			var r = t, i = r.onUpdate, a = r.toggleClass, o = r.id, s = r.onToggle, c = r.onRefresh, l = r.scrub, u = r.trigger, d = r.pin, f = r.pinSpacing, p = r.invalidateOnRefresh, m = r.anticipatePin, h = r.onScrubComplete, g = r.onSnapComplete, _ = r.once, v = r.snap, y = r.pinReparent, b = r.pinSpacer, x = r.containerAnimation, S = r.fastScrollEnd, C = r.preventOverlaps, w = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? ma : ha, T = !l && l !== 0, E = ga(t.scroller || Ea), D = Y.core.getCache(E), O = yo(E), k = ("pinType" in t ? t.pinType : oa(E, "pinType") || O && "fixed") === "fixed", A = [
				t.onEnter,
				t.onLeave,
				t.onEnterBack,
				t.onLeaveBack
			], j = T && t.toggleActions.split(" "), M = "markers" in t ? t.markers : cs.markers, N = O ? 0 : parseFloat(Jo(E)["border" + w.p2 + Go]) || 0, P = this, F = t.onRefreshInit && function() {
				return t.onRefreshInit(P);
			}, I = So(E, O, w), ee = Co(E, O), L = 0, R = 0, z = 0, te = va(E, w), ne, B, re, ie, ae, V, oe, se, H, U, W, ce, le, ue, de, G, K, fe, q, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me;
			if (P._startClamp = P._endClamp = !1, P._dir = w, m *= 45, P.scroller = E, P.scroll = x ? x.time.bind(x) : te, ie = te(), P.vars = t, n ||= t.animation, "refreshPriority" in t && (Ua = 1, t.refreshPriority === -9999 && (Rs = P)), D.tweenScroll = D.tweenScroll || {
				top: ec(E, ha),
				left: ec(E, ma)
			}, P.tweenTo = ne = D.tweenScroll[w.p], P.scrubDuration = function(e) {
				Ee = Oo(e) && e, Ee ? Te ? Te.duration(e) : Te = Y.to(n, {
					ease: "expo",
					totalProgress: "+=0",
					inherit: !1,
					duration: Ee,
					paused: !0,
					onComplete: function() {
						return h && h(P);
					}
				}) : (Te && Te.progress(1).kill(), Te = 0);
			}, n && (n.vars.lazy = !1, n._initted && !P.isReverted || n.vars.immediateRender !== !1 && t.immediateRender !== !1 && n.duration() && n.render(0, !0, !0), P.animation = n.pause(), n.scrollTrigger = P, P.scrubDuration(l), Ce = 0, o ||= n.vars.id), v && ((!ko(v) || v.push) && (v = { snapTo: v }), "scrollBehavior" in ka.style && Y.set(O ? [ka, Oa] : E, { scrollBehavior: "auto" }), ta.forEach(function(e) {
				return Do(e) && e.target === (O ? Da.scrollingElement || Oa : E) && (e.smooth = !1);
			}), re = Do(v.snapTo) ? v.snapTo : v.snapTo === "labels" ? es(n) : v.snapTo === "labelsDirectional" ? ns(n) : v.directional === !1 ? Y.utils.snap(v.snapTo) : function(e, t) {
				return ts(v.snapTo)(e, ao() - R < 500 ? 0 : t.direction);
			}, De = v.duration || {
				min: .1,
				max: 2
			}, De = ko(De) ? Na(De.min, De.max) : Na(De, De), Oe = Y.delayedCall(v.delay || Ee / 2 || .1, function() {
				var e = te(), t = ao() - R < 500, r = ne.tween;
				if ((t || Math.abs(P.getVelocity()) < 10) && !r && !La && L !== e) {
					var i = (e - V) / ue, a = n && !T ? n.totalProgress() : i, o = t ? 0 : (a - we) / (ao() - Pa) * 1e3 || 0, s = Y.utils.clamp(-i, 1 - i, Mo(o / 2) * o / .185), c = i + (v.inertia === !1 ? 0 : s), l, u, d = v, f = d.onStart, p = d.onInterrupt, m = d.onComplete;
					if (l = re(c, P), Oo(l) || (l = c), u = Math.max(0, Math.round(V + l * ue)), e <= oe && e >= V && u !== e) {
						if (r && !r._initted && r.data <= Mo(u - e)) return;
						v.inertia === !1 && (s = l - i), ne(u, {
							duration: De(Mo(Math.max(Mo(c - a), Mo(l - a)) * .185 / o / .05 || 0)),
							ease: v.ease || "power3",
							data: Mo(u - e),
							onInterrupt: function() {
								return Oe.restart(!0) && p && jo(P, p);
							},
							onComplete: function() {
								P.update(), L = te(), n && !T && (Te ? Te.resetTo("totalProgress", l, n._tTime / n._tDur) : n.progress(l)), Ce = we = n && !T ? n.totalProgress() : P.progress, g && g(P), m && jo(P, m);
							}
						}, e, s * ue, u - e - s * ue), f && jo(P, f, ne.tween);
					}
				} else P.isActive && L !== e && Oe.restart(!0);
			}).pause()), o && (ms[o] = P), u = P.trigger = ga(u || d !== !0 && d), Me = u && u._gsap && u._gsap.stRevert, Me &&= Me(P), d = d === !0 ? u : ga(d), Eo(a) && (a = {
				targets: u,
				className: a
			}), d && (f === !1 || f === Wo || (f = !f && d.parentNode && d.parentNode.style && Jo(d.parentNode).display === "flex" ? !1 : Uo), P.pin = d, B = Y.core.getCache(d), B.spacer ? de = B.pinState : (b && (b = ga(b), b && !b.nodeType && (b = b.current || b.nativeElement), B.spacerIsNative = !!b, b && (B.spacerState = Ks(b))), B.spacer = fe = b || Da.createElement("div"), fe.classList.add("pin-spacer"), o && fe.classList.add("pin-spacer-" + o), B.pinState = de = Ks(d)), t.force3D !== !1 && Y.set(d, { force3D: !0 }), P.spacer = fe = B.spacer, Se = Jo(d), _e = Se[f + w.os2], pe = Y.getProperty(d), me = Y.quickSetter(d, w.a, qo), Us(d, fe, Se), K = Ks(d)), M) {
				ce = ko(M) ? Xo(M, ss) : ss, U = ds("scroller-start", o, E, w, ce, 0), W = ds("scroller-end", o, E, w, ce, 0, U), q = U["offset" + w.op.d2];
				var Ne = ga(oa(E, "content") || E);
				se = this.markerStart = ds("start", o, Ne, w, ce, q, 0, x), H = this.markerEnd = ds("end", o, Ne, w, ce, q, 0, x), x && (je = Y.quickSetter([se, H], w.a, qo)), !k && !(na.length && oa(E, "fixedMarkers") === !0) && (Yo(O ? ka : E), Y.set([U, W], { force3D: !0 }), ye = Y.quickSetter(U, w.a, qo), xe = Y.quickSetter(W, w.a, qo));
			}
			if (x) {
				var Pe = x.vars.onUpdate, Fe = x.vars.onUpdateParams;
				x.eventCallback("onUpdate", function() {
					P.update(0, 0, 1), Pe && Pe.apply(x, Fe || []);
				});
			}
			if (P.previous = function() {
				return ps[ps.indexOf(P) - 1];
			}, P.next = function() {
				return ps[ps.indexOf(P) + 1];
			}, P.revert = function(e, t) {
				if (!t) return P.kill(!0);
				var r = e !== !1 || !P.enabled, i = Ia;
				r !== P.isReverted && (r && (ke = Math.max(te(), P.scroll.rec || 0), z = P.progress, Ae = n && n.progress()), se && [
					se,
					H,
					U,
					W
				].forEach(function(e) {
					return e.style.display = r ? "none" : "block";
				}), r && (Ia = P, P.update(r)), d && (!y || !P.isActive) && (r ? Hs(d, fe, de) : Us(d, fe, Jo(d), ve)), r || P.update(r), Ia = i, P.isReverted = r);
			}, P.refresh = function(r, i, a, o) {
				if (!Ia && P.enabled || i) {
					if (d && r && so) is(e, "scrollEnd", Ss);
					else {
						!ks && F && F(P), Ia = P, ne.tween && !a && (ne.tween.kill(), ne.tween = 0), Te && Te.pause(), p && n && (n.revert({ kill: !1 }).invalidate(), n.getChildren ? n.getChildren(!0, !0, !1).forEach(function(e) {
							return e.vars.immediateRender && e.render(0, !0, !0);
						}) : n.vars.immediateRender && n.render(0, !0, !0)), P.isReverted || P.revert(!0, !0), P._subPinOffset = !1;
						var s = I(), l = ee(), m = x ? x.duration() : wo(E, w), h = ue <= .01 || !ue, g = 0, _ = o || 0, v = ko(a) ? a.end : t.end, b = t.endTrigger || u, S = ko(a) ? a.start : t.start || (t.start === 0 || !u ? 0 : d ? "0 0" : "0 100%"), C = P.pinnedContainer = t.pinnedContainer && ga(t.pinnedContainer, P), D = u && Math.max(0, ps.indexOf(P)) || 0, A = D, j, B, re, ce, q, me, _e, ye, xe, Se, Ce, we, Ee;
						for (M && ko(a) && (we = Y.getProperty(U, w.p), Ee = Y.getProperty(W, w.p)); A-- > 0;) me = ps[A], me.end || me.refresh(0, 1) || (Ia = P), _e = me.pin, _e && (_e === u || _e === d || _e === C) && !me.isReverted && (Se ||= [], Se.unshift(me), me.revert(!0, !0)), me !== ps[A] && (D--, A--);
						for (Do(S) && (S = S(P)), S = lo(S, "start", P), V = Ys(S, u, s, w, te(), se, U, P, l, N, k, m, x, P._startClamp && "_startClamp") || (d ? -.001 : 0), Do(v) && (v = v(P)), Eo(v) && !v.indexOf("+=") && (~v.indexOf(" ") ? v = (Eo(S) ? S.split(" ")[0] : "") + v : (g = us(v.substr(2), s), v = Eo(S) ? S : (x ? Y.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, V) : V) + g, b = u)), v = lo(v, "end", P), oe = Math.max(V, Ys(v || (b ? "100% 0" : m), b, s, w, te() + g, H, W, P, l, N, k, m, x, P._endClamp && "_endClamp")) || -.001, g = 0, A = D; A--;) me = ps[A] || {}, _e = me.pin, _e && me.start - me._pinPush <= V && !x && me.end > 0 && (j = me.end - (P._startClamp ? Math.max(0, me.start) : me.start), (_e === u && me.start - me._pinPush < V || _e === C) && isNaN(S) && (g += j * (1 - me.progress)), _e === d && (_ += j));
						if (V += g, oe += g, P._startClamp && (P._startClamp += g), P._endClamp && !ks && (P._endClamp = oe || -.001, oe = Math.min(oe, wo(E, w))), ue = oe - V || (V -= .01) && .001, h && (z = Y.utils.clamp(0, 1, Y.utils.normalize(V, oe, ke))), P._pinPush = _, se && g && (j = {}, j[w.a] = "+=" + g, C && (j[w.p] = "-=" + te()), Y.set([se, H], j)), d && !(no && P.end >= wo(E, w))) j = Jo(d), ce = w === ha, re = te(), he = parseFloat(pe(w.a)) + _, !m && oe > 1 && (Ce = (O ? Da.scrollingElement || Oa : E).style, Ce = {
							style: Ce,
							value: Ce["overflow" + w.a.toUpperCase()]
						}, O && Jo(ka)["overflow" + w.a.toUpperCase()] !== "scroll" && (Ce.style["overflow" + w.a.toUpperCase()] = "scroll")), Us(d, fe, j), K = Ks(d), B = Zo(d, !0), ye = k && va(E, ce ? ma : ha)(), f ? (ve = [f + w.os2, ue + _ + qo], ve.t = fe, A = f === Uo ? Qo(d, w) + ue + _ : 0, A && (ve.push(w.d, A + qo), fe.style.flexBasis !== "auto" && (fe.style.flexBasis = A + qo)), Gs(ve), C && ps.forEach(function(e) {
							e.pin === C && e.vars.pinSpacing !== !1 && (e._subPinOffset = !0);
						}), k && te(ke)) : (A = Qo(d, w), A && fe.style.flexBasis !== "auto" && (fe.style.flexBasis = A + qo)), k && (q = {
							top: B.top + (ce ? re - V : ye) + qo,
							left: B.left + (ce ? ye : re - V) + qo,
							boxSizing: "border-box",
							position: "fixed"
						}, q[Lo] = q["max" + Go] = Math.ceil(B.width) + qo, q[Ro] = q["max" + Ko] = Math.ceil(B.height) + qo, q[Wo] = q[Wo + Vo] = q[Wo + zo] = q[Wo + Ho] = q[Wo + Bo] = "0", q[Uo] = j[Uo], q[Uo + Vo] = j[Uo + Vo], q[Uo + zo] = j[Uo + zo], q[Uo + Ho] = j[Uo + Ho], q[Uo + Bo] = j[Uo + Bo], G = qs(de, q, y), ks && te(0)), n ? (xe = n._initted, Wa(1), n.render(n.duration(), !0, !0), ge = pe(w.a) - he + ue + _, be = Math.abs(ue - ge) > 1, k && be && G.splice(G.length - 2, 2), n.render(0, !0, !0), xe || n.invalidate(!0), n.parent || n.totalTime(n.totalTime()), Wa(0)) : ge = ue, Ce && (Ce.value ? Ce.style["overflow" + w.a.toUpperCase()] = Ce.value : Ce.style.removeProperty("overflow-" + w.a));
						else if (u && te() && !x) for (B = u.parentNode; B && B !== ka;) B._pinOffset && (V -= B._pinOffset, oe -= B._pinOffset), B = B.parentNode;
						Se && Se.forEach(function(e) {
							return e.revert(!1, !0);
						}), P.start = V, P.end = oe, ie = ae = ks ? ke : te(), !x && !ks && (ie < ke && te(ke), P.scroll.rec = 0), P.revert(!1, !0), R = ao(), Oe && (L = -1, Oe.restart(!0)), Ia = 0, n && T && (n._initted || Ae) && n.progress() !== Ae && n.progress(Ae || 0, !0).render(n.time(), !0, !0), (h || z !== P.progress || x || p || n && !n._initted) && (n && !T && (n._initted || z || n.vars.immediateRender !== !1) && n.totalProgress(x && V < -.001 && !z ? Y.utils.normalize(V, oe, 0) : z, !0), P.progress = h || (ie - V) / ue === z ? 0 : z), d && f && (fe._pinOffset = Math.round(P.progress * ge)), Te && Te.invalidate(), isNaN(we) || (we -= Y.getProperty(U, w.p), Ee -= Y.getProperty(W, w.p), $s(U, w, we), $s(se, w, we - (o || 0)), $s(W, w, Ee), $s(H, w, Ee - (o || 0))), h && !ks && P.update(), c && !ks && !le && (le = !0, c(P), le = !1);
					}
				}
			}, P.getVelocity = function() {
				return (te() - ae) / (ao() - Pa) * 1e3 || 0;
			}, P.endAnimation = function() {
				Ao(P.callbackAnimation), n && (Te ? Te.progress(1) : n.paused() ? T || Ao(n, P.direction < 0, 1) : Ao(n, n.reversed()));
			}, P.labelToScroll = function(e) {
				return n && n.labels && (V || P.refresh() || V) + n.labels[e] / n.duration() * ue || 0;
			}, P.getTrailing = function(e) {
				var t = ps.indexOf(P), n = P.direction > 0 ? ps.slice(0, t).reverse() : ps.slice(t + 1);
				return (Eo(e) ? n.filter(function(t) {
					return t.vars.preventOverlaps === e;
				}) : n).filter(function(e) {
					return P.direction > 0 ? e.end <= V : e.start >= oe;
				});
			}, P.update = function(e, t, r) {
				if (!x || r || e) {
					var o = ks === !0 ? ke : P.scroll(), c = e ? 0 : (o - V) / ue, u = c < 0 ? 0 : c > 1 ? 1 : c || 0, p = P.progress, h, g, b, D, O, M, N, F;
					if (t && (ae = ie, ie = x ? te() : o, v && (we = Ce, Ce = n && !T ? n.totalProgress() : u)), m && d && !Ia && !io && so && (!u && V < o + (o - ae) / (ao() - Pa) * m ? u = 1e-4 : u === 1 && oe > o + (o - ae) / (ao() - Pa) * m && (u = .9999)), u !== p && P.enabled) {
						if (h = P.isActive = !!u && u < 1, g = !!p && p < 1, M = h !== g, O = M || !!u != !!p, P.direction = u > p ? 1 : -1, P.progress = u, O && !Ia && (b = u && !p ? 0 : u === 1 ? 1 : p === 1 ? 2 : 3, T && (D = !M && j[b + 1] !== "none" && j[b + 1] || j[b], F = n && (D === "complete" || D === "reset" || D in n))), C && (M || F) && (F || l || !n) && (Do(C) ? C(P) : P.getTrailing(C).forEach(function(e) {
							return e.endAnimation();
						})), T || (Te && !Ia && !io ? (Te._dp._time - Te._start !== Te._time && Te.render(Te._dp._time - Te._start), Te.resetTo ? Te.resetTo("totalProgress", u, n._tTime / n._tDur) : (Te.vars.totalProgress = u, Te.invalidate().restart())) : n && n.totalProgress(u, !!(Ia && (R || e)))), d) {
							if (e && f && (fe.style[f + w.os2] = _e), !k) me(go(he + ge * u));
							else if (O) {
								if (N = !e && u > p && oe + 1 > o && o + 1 >= wo(E, w), y) {
									if (!e && (h || N)) {
										var I = Zo(d, !0), ee = o - V;
										Zs(d, ka, I.top + (w === ha ? ee : 0) + qo, I.left + (w === ha ? 0 : ee) + qo);
									} else Zs(d, fe);
								}
								Gs(h || N ? G : K), be && u < 1 && h || me(he + (u === 1 && !N ? ge : 0));
							}
						}
						v && !ne.tween && !Ia && !io && Oe.restart(!0), a && (M || _ && u && (u < 1 || !ro)) && Ma(a.targets).forEach(function(e) {
							return e.classList[h || _ ? "add" : "remove"](a.className);
						}), i && !T && !e && i(P), O && !Ia ? (T && (F && (D === "complete" ? n.pause().totalProgress(1) : D === "reset" ? n.restart(!0).pause() : D === "restart" ? n.restart(!0) : n[D]()), i && i(P)), (M || !ro) && (s && M && jo(P, s), A[b] && jo(P, A[b]), _ && (u === 1 ? P.kill(!1, 1) : A[b] = 0), M || (b = u === 1 ? 1 : 3, A[b] && jo(P, A[b]))), S && !h && Math.abs(P.getVelocity()) > (Oo(S) ? S : 2500) && (Ao(P.callbackAnimation), Te ? Te.progress(1) : Ao(n, D === "reverse" ? 1 : !u, 1))) : T && i && !Ia && i(P);
					}
					if (xe) {
						var L = x ? o / x.duration() * (x._caScrollDist || 0) : o;
						ye(L + +!!U._isFlipped), xe(L);
					}
					je && je(-o / x.duration() * (x._caScrollDist || 0));
				}
			}, P.enable = function(t, n) {
				P.enabled || (P.enabled = !0, is(E, "resize", ys), O || is(E, "scroll", _s), F && is(e, "refreshInit", F), t !== !1 && (P.progress = z = 0, ie = ae = L = te()), n !== !1 && P.refresh());
			}, P.getTween = function(e) {
				return e && ne ? ne.tween : Te;
			}, P.setPositions = function(e, t, n, r) {
				if (x) {
					var i = x.scrollTrigger, a = x.duration(), o = i.end - i.start;
					e = i.start + o * e / a, t = i.start + o * t / a;
				}
				P.refresh(!1, !1, {
					start: uo(e, n && !!P._startClamp),
					end: uo(t, n && !!P._endClamp)
				}, r), P.update();
			}, P.adjustPinSpacing = function(e) {
				if (ve && e) {
					var t = ve.indexOf(w.d) + 1;
					ve[t] = parseFloat(ve[t]) + e + qo, ve[1] = parseFloat(ve[1]) + e + qo, Gs(ve);
				}
			}, P.disable = function(t, n) {
				if (t !== !1 && P.revert(!0, !0), P.enabled && (P.enabled = P.isActive = !1, n || Te && Te.pause(), ke = 0, B && (B.uncache = 1), F && as(e, "refreshInit", F), Oe && (Oe.pause(), ne.tween && ne.tween.kill() && (ne.tween = 0)), !O)) {
					for (var r = ps.length; r--;) if (ps[r].scroller === E && ps[r] !== P) return;
					as(E, "resize", ys), O || as(E, "scroll", _s);
				}
			}, P.kill = function(e, r) {
				P.disable(e, r), Te && !r && Te.kill(), o && delete ms[o];
				var i = ps.indexOf(P);
				i >= 0 && ps.splice(i, 1), i === za && Ls > 0 && za--, i = 0, ps.forEach(function(e) {
					return e.scroller === P.scroller && (i = 1);
				}), i || ks || (P.scroll.rec = 0), n && (n.scrollTrigger = null, e && n.revert({ kill: !1 }), r || n.kill()), se && [
					se,
					H,
					U,
					W
				].forEach(function(e) {
					return e.parentNode && e.parentNode.removeChild(e);
				}), Rs === P && (Rs = 0), d && (B && (B.uncache = 1), i = 0, ps.forEach(function(e) {
					return e.pin === d && i++;
				}), i || (B.spacer = 0)), t.onKill && t.onKill(P);
			}, ps.push(P), P.enable(!1, !1), Me && Me(P), n && n.add && !ue) {
				var Ie = P.update;
				P.update = function() {
					P.update = Ie, ta.cache++, V || oe || P.refresh();
				}, Y.delayedCall(.01, P.update), ue = .01, V = oe = 0;
			} else P.refresh();
			d && Ms();
		}
	}, e.register = function(t) {
		return Ta ||= (Y = t || vo(), _o() && window.document && e.enable(), co), Ta;
	}, e.defaults = function(e) {
		if (e) for (var t in e) cs[t] = e[t];
		return cs;
	}, e.disable = function(e, t) {
		co = 0, ps.forEach(function(n) {
			return n[t ? "kill" : "disable"](e);
		}), as(Ea, "wheel", _s), as(Da, "scroll", _s), clearInterval(Fa), as(Da, "touchcancel", ho), as(ka, "touchstart", ho), rs(as, Da, "pointerdown,touchstart,mousedown", po), rs(as, Da, "pointerup,touchend,mouseup", mo), ja.kill(), To(as);
		for (var n = 0; n < ta.length; n += 3) os(as, ta[n], ta[n + 1]), os(as, ta[n], ta[n + 2]);
	}, e.enable = function() {
		if (Ea = window, Da = document, Oa = Da.documentElement, ka = Da.body, Y) {
			if (Ma = Y.utils.toArray, Na = Y.utils.clamp, Za = Y.core.context || ho, Wa = Y.core.suppressOverwrites || ho, Qa = Ea.history.scrollRestoration || "auto", Is = Ea.pageYOffset || 0, Y.core.globals("ScrollTrigger", e), ka) {
				co = 1, $a = document.createElement("div"), $a.style.height = "100vh", $a.style.position = "absolute", Ns(), fo(), wa.register(Y), e.isTouch = wa.isTouch, Xa = wa.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), qa = wa.isTouch === 1, is(Ea, "wheel", _s), Aa = [
					Ea,
					Da,
					Oa,
					ka
				], Y.matchMedia ? (e.matchMedia = function(e) {
					var t = Y.matchMedia(), n;
					for (n in e) t.add(n, e[n]);
					return t;
				}, Y.addEventListener("matchMediaInit", function() {
					Es(), Ds();
				}), Y.addEventListener("matchMediaRevert", function() {
					return Ts();
				}), Y.addEventListener("matchMedia", function() {
					Fs(0, 1), Cs("matchMedia");
				}), Y.matchMedia().add("(orientation: portrait)", function() {
					return vs(), vs;
				})) : console.warn("Requires GSAP 3.11.0 or later"), vs(), is(Da, "scroll", _s);
				var t = ka.hasAttribute("style"), n = ka.style, r = n.borderTopStyle, i = Y.core.Animation.prototype, a, o;
				for (i.revert || Object.defineProperty(i, "revert", { value: function() {
					return this.time(-.01, !0);
				} }), n.borderTopStyle = "solid", a = Zo(ka), ha.m = Math.round(a.top + ha.sc()) || 0, ma.m = Math.round(a.left + ma.sc()) || 0, r ? n.borderTopStyle = r : n.removeProperty("border-top-style"), t || (ka.setAttribute("style", ""), ka.removeAttribute("style")), Fa = setInterval(gs, 250), Y.delayedCall(.5, function() {
					return io = 0;
				}), is(Da, "touchcancel", ho), is(ka, "touchstart", ho), rs(is, Da, "pointerdown,touchstart,mousedown", po), rs(is, Da, "pointerup,touchend,mouseup", mo), Ra = Y.utils.checkPrefix("transform"), Vs.push(Ra), Ta = ao(), ja = Y.delayedCall(.2, Fs).pause(), Ha = [
					Da,
					"visibilitychange",
					function() {
						var e = Ea.innerWidth, t = Ea.innerHeight;
						Da.hidden ? (Ba = e, Va = t) : (Ba !== e || Va !== t) && ys();
					},
					Da,
					"DOMContentLoaded",
					Fs,
					Ea,
					"load",
					Fs,
					Ea,
					"resize",
					ys
				], To(is), ps.forEach(function(e) {
					return e.enable(0, 1);
				}), o = 0; o < ta.length; o += 3) os(as, ta[o], ta[o + 1]), os(as, ta[o], ta[o + 2]);
			} else Da && Da.addEventListener("DOMContentLoaded", function t() {
				e.enable(), Da.removeEventListener("DOMContentLoaded", t);
			});
		}
	}, e.config = function(t) {
		"limitCallbacks" in t && (ro = !!t.limitCallbacks);
		var n = t.syncInterval;
		n && clearInterval(Fa) || (Fa = n) && setInterval(gs, n), "ignoreMobileResize" in t && (qa = e.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (To(as) || To(is, t.autoRefreshEvents || "none"), Ga = (t.autoRefreshEvents + "").indexOf("resize") === -1);
	}, e.scrollerProxy = function(e, t) {
		var n = ga(e), r = ta.indexOf(n), i = yo(n);
		~r && ta.splice(r, i ? 6 : 2), t && (i ? na.unshift(Ea, t, ka, t, Oa, t) : na.unshift(n, t));
	}, e.clearMatchMedia = function(e) {
		ps.forEach(function(t) {
			return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0);
		});
	}, e.isInViewport = function(e, t, n) {
		var r = (Eo(e) ? ga(e) : e).getBoundingClientRect(), i = r[n ? Lo : Ro] * t || 0;
		return n ? r.right - i > 0 && r.left + i < Ea.innerWidth : r.bottom - i > 0 && r.top + i < Ea.innerHeight;
	}, e.positionInViewport = function(e, t, n) {
		Eo(e) && (e = ga(e));
		var r = e.getBoundingClientRect(), i = r[n ? Lo : Ro], a = t == null ? i / 2 : t in ls ? ls[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0;
		return n ? (r.left + a) / Ea.innerWidth : (r.top + a) / Ea.innerHeight;
	}, e.killAll = function(e) {
		if (ps.slice(0).forEach(function(e) {
			return e.vars.id !== "ScrollSmoother" && e.kill();
		}), e !== !0) {
			var t = bs.killAll || [];
			bs = {}, t.forEach(function(e) {
				return e();
			});
		}
	}, e;
}();
X.version = "3.15.0", X.saveStyles = function(e) {
	return e ? Ma(e).forEach(function(e) {
		if (e && e.style) {
			var t = ws.indexOf(e);
			t >= 0 && ws.splice(t, 5), ws.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), Y.core.getCache(e), Za());
		}
	}) : ws;
}, X.revert = function(e, t) {
	return Ds(!e, t);
}, X.create = function(e, t) {
	return new X(e, t);
}, X.refresh = function(e) {
	return e ? ys(!0) : (Ta || X.register()) && Fs(!0);
}, X.update = function(e) {
	return ++ta.cache && zs(e === !0 ? 2 : 0);
}, X.clearScrollMemory = Os, X.maxScroll = function(e, t) {
	return wo(e, t ? ma : ha);
}, X.getScrollFunc = function(e, t) {
	return va(ga(e), t ? ma : ha);
}, X.getById = function(e) {
	return ms[e];
}, X.getAll = function() {
	return ps.filter(function(e) {
		return e.vars.id !== "ScrollSmoother";
	});
}, X.isScrolling = function() {
	return !!so;
}, X.snapDirectional = ts, X.addEventListener = function(e, t) {
	var n = bs[e] || (bs[e] = []);
	~n.indexOf(t) || n.push(t);
}, X.removeEventListener = function(e, t) {
	var n = bs[e], r = n && n.indexOf(t);
	r >= 0 && n.splice(r, 1);
}, X.batch = function(e, t) {
	var n = [], r = {}, i = t.interval || .016, a = t.batchMax || 1e9, o = function(e, t) {
		var n = [], r = [], o = Y.delayedCall(i, function() {
			t(n, r), n = [], r = [];
		}).pause();
		return function(e) {
			n.length || o.restart(!0), n.push(e.trigger), r.push(e), a <= n.length && o.progress(1);
		};
	}, s;
	for (s in t) r[s] = s.substr(0, 2) === "on" && Do(t[s]) && s !== "onRefreshInit" ? o(s, t[s]) : t[s];
	return Do(a) && (a = a(), is(X, "refresh", function() {
		return a = t.batchMax();
	})), Ma(e).forEach(function(e) {
		var t = {};
		for (s in r) t[s] = r[s];
		t.trigger = e, n.push(X.create(t));
	}), n;
};
var tc = function(e, t, n, r) {
	return t > r ? e(r) : t < 0 && e(0), n > r ? (r - t) / (n - t) : n < 0 ? t / (t - n) : 1;
}, nc = function e(t, n) {
	n === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (wa.isTouch ? " pinch-zoom" : "") : "none", t === Oa && e(ka, n);
}, rc = {
	auto: 1,
	scroll: 1
}, ic = function(e) {
	var t = e.event, n = e.target, r = e.axis, i = (t.changedTouches ? t.changedTouches[0] : t).target, a = i._gsap || Y.core.getCache(i), o = ao(), s;
	if (!a._isScrollT || o - a._isScrollT > 2e3) {
		for (; i && i !== ka && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(rc[(s = Jo(i)).overflowY] || rc[s.overflowX]));) i = i.parentNode;
		a._isScroll = i && i !== n && !yo(i) && (rc[(s = Jo(i)).overflowY] || rc[s.overflowX]), a._isScrollT = o;
	}
	(a._isScroll || r === "x") && (t.stopPropagation(), t._gsapAllow = !0);
}, ac = function(e, t, n, r) {
	return wa.create({
		target: e,
		capture: !0,
		debounce: !1,
		lockAxis: !0,
		type: t,
		onWheel: r &&= ic,
		onPress: r,
		onDrag: r,
		onScroll: r,
		onEnable: function() {
			return n && is(Da, wa.eventTypes[0], cc, !1, !0);
		},
		onDisable: function() {
			return as(Da, wa.eventTypes[0], cc, !0);
		}
	});
}, oc = /(input|label|select|textarea)/i, sc, cc = function(e) {
	var t = oc.test(e.target.tagName);
	(t || sc) && (e._gsapAllow = !0, sc = t);
}, lc = function(e) {
	ko(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
	var t = e, n = t.normalizeScrollX, r = t.momentum, i = t.allowNestedScroll, a = t.onRelease, o, s, c = ga(e.target) || Oa, l = Y.core.globals().ScrollSmoother, u = l && l.get(), d = Xa && (e.content && ga(e.content) || u && e.content !== !1 && !u.smooth() && u.content()), f = va(c, ha), p = va(c, ma), m = 1, h = (wa.isTouch && Ea.visualViewport ? Ea.visualViewport.scale * Ea.visualViewport.width : Ea.outerWidth) / Ea.innerWidth, g = 0, _ = Do(r) ? function() {
		return r(o);
	} : function() {
		return r || 2.8;
	}, v, y, b = ac(c, e.type, !0, i), x = function() {
		return y = !1;
	}, S = ho, C = ho, w = function() {
		s = wo(c, ha), C = Na(+!!Xa, s), n && (S = Na(0, wo(c, ma))), v = As;
	}, T = function() {
		d._gsap.y = go(parseFloat(d._gsap.y) + f.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
	}, E = function() {
		if (y) {
			requestAnimationFrame(x);
			var e = go(o.deltaY / 2), t = C(f.v - e);
			if (d && t !== f.v + f.offset) {
				f.offset = t - f.v;
				var n = go((parseFloat(d && d._gsap.y) || 0) - f.offset);
				d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + n + ", 0, 1)", d._gsap.y = n + "px", f.cacheID = ta.cache, zs();
			}
			return !0;
		}
		f.offset && T(), y = !0;
	}, D, O, k, A, j = function() {
		w(), D.isActive() && D.vars.scrollY > s && (f() > s ? D.progress(1) && f(s) : D.resetTo("scrollY", s));
	};
	return d && Y.set(d, { y: "+=0" }), e.ignoreCheck = function(e) {
		return Xa && e.type === "touchmove" && E(e) || m > 1.05 && e.type !== "touchstart" || o.isGesturing || e.touches && e.touches.length > 1;
	}, e.onPress = function() {
		y = !1;
		var e = m;
		m = go((Ea.visualViewport && Ea.visualViewport.scale || 1) / h), D.pause(), e !== m && nc(c, m > 1.01 || !n && "x"), O = p(), k = f(), w(), v = As;
	}, e.onRelease = e.onGestureStart = function(e, t) {
		if (f.offset && T(), !t) A.restart(!0);
		else {
			ta.cache++;
			var r = _(), i, o;
			n && (i = p(), o = i + r * .05 * -e.velocityX / .227, r *= tc(p, i, o, wo(c, ma)), D.vars.scrollX = S(o)), i = f(), o = i + r * .05 * -e.velocityY / .227, r *= tc(f, i, o, wo(c, ha)), D.vars.scrollY = C(o), D.invalidate().duration(r).play(.01), (Xa && D.vars.scrollY >= s || i >= s - 1) && Y.to({}, {
				onUpdate: j,
				duration: r
			});
		}
		a && a(e);
	}, e.onWheel = function() {
		D._ts && D.pause(), ao() - g > 1e3 && (v = 0, g = ao());
	}, e.onChange = function(e, t, r, i, a) {
		if (As !== v && w(), t && n && p(S(i[2] === t ? O + (e.startX - e.x) : p() + t - i[1])), r) {
			f.offset && T();
			var o = a[2] === r, s = o ? k + e.startY - e.y : f() + r - a[1], c = C(s);
			o && s !== c && (k += c - s), f(c);
		}
		(r || t) && zs();
	}, e.onEnable = function() {
		nc(c, !n && "x"), X.addEventListener("refresh", j), is(Ea, "resize", j), f.smooth &&= (f.target.style.scrollBehavior = "auto", p.smooth = !1), b.enable();
	}, e.onDisable = function() {
		nc(c, !0), as(Ea, "resize", j), X.removeEventListener("refresh", j), b.kill();
	}, e.lockAxis = e.lockAxis !== !1, o = new wa(e), o.iOS = Xa, Xa && !f() && f(1), Xa && Y.ticker.add(ho), A = o._dc, D = Y.to(o, {
		ease: "power4",
		paused: !0,
		inherit: !1,
		scrollX: n ? "+=0.1" : "+=0",
		scrollY: "+=0.1",
		modifiers: { scrollY: Qs(f, f(), function() {
			return D.pause();
		}) },
		onUpdate: zs,
		onComplete: A.vars.onComplete
	}), o;
};
X.sort = function(e) {
	if (Do(e)) return ps.sort(e);
	var t = Ea.pageYOffset || 0;
	return X.getAll().forEach(function(e) {
		return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + Ea.innerHeight;
	}), ps.sort(e || function(e, t) {
		return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((t.vars.containerAnimation ? 1e6 : t._sortY) + (t.vars.refreshPriority || 0) * -1e6);
	});
}, X.observe = function(e) {
	return new wa(e);
}, X.normalizeScroll = function(e) {
	if (e === void 0) return Ka;
	if (e === !0 && Ka) return Ka.enable();
	if (e === !1) Ka && Ka.kill(), Ka = e;
	else {
		var t = e instanceof wa ? e : lc(e);
		return Ka && Ka.target === t.target && Ka.kill(), yo(t.target) && (Ka = t), t;
	}
}, X.core = {
	_getVelocityProp: ya,
	_inputObserver: ac,
	_scrollers: ta,
	_proxies: na,
	bridge: {
		ss: function() {
			so || Cs("scrollStart"), so = ao();
		},
		ref: function() {
			return Ia;
		}
	}
}, vo() && Y.registerPlugin(X);
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var uc = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), Z = (/* @__PURE__ */ o(((e, t) => {
	t.exports = uc();
})))();
Li.registerPlugin(X);
var dc = typeof window < "u" ? _.useLayoutEffect : _.useEffect, fc = {
	up: "linear-gradient(to top, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))",
	down: "linear-gradient(to bottom, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))",
	left: "linear-gradient(to left, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))",
	right: "linear-gradient(to right, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))",
	center: "radial-gradient(farthest-corner at 50% 50%, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))"
}, pc = ({ children: e, container: t, distance: n = 100, direction: r = "vertical", reverse: i = !1, duration: a = .8, ease: o = "power3.out", initialOpacity: s = 0, animateOpacity: c = !0, scale: l = 1, blur: u = 0, rotate: d = 0, tilt: f = 0, wipe: p = "none", threshold: m = .1, delay: h = 0, stagger: g = 0, staggerFrom: v = "start", trigger: y = "scroll", once: b = !0, scrub: x = !1, disappearAfter: S = 0, disappearDuration: C = .5, disappearEase: w = "power3.in", onStart: T, onComplete: E, onDisappearanceComplete: D, className: O = "", style: k, ...A }) => {
	let j = (0, _.useRef)(null), M = (0, _.useRef)({
		onStart: T,
		onComplete: E,
		onDisappearanceComplete: D
	});
	return M.current = {
		onStart: T,
		onComplete: E,
		onDisappearanceComplete: D
	}, dc(() => {
		let e = j.current;
		if (!e) return;
		let _ = t || document.getElementById("snap-main-container") || null;
		typeof _ == "string" && (_ = document.querySelector(_));
		let T = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, E = Li.context(() => {
			let t = g > 0 && e.children.length ? Array.from(e.children) : [e], E = r === "horizontal", D = E ? "x" : "y", O = i ? -1 : 1, k = fc[p];
			if (Li.set(e, { visibility: "visible" }), T) {
				M.current.onComplete?.();
				return;
			}
			let A = {
				[D]: n * O,
				scale: l,
				opacity: c ? s : 1
			}, j = {
				[D]: 0,
				scale: 1,
				opacity: 1,
				duration: a,
				ease: o
			};
			if (u > 0 && (A.filter = `blur(${u}px)`, j.filter = "blur(0px)"), d && (A.rotation = d * O, j.rotation = 0), f) {
				let e = E ? "rotationY" : "rotationX";
				A[e] = E ? -f * O : f * O, j[e] = 0, A.transformPerspective = 900, j.transformPerspective = 900;
			}
			k && (Li.set(t, {
				maskImage: k,
				webkitMaskImage: k
			}), A["--ac-wipe"] = 0, j["--ac-wipe"] = 1), g > 0 && (j.stagger = {
				each: g,
				from: v
			});
			let N = () => {
				x || Li.set(t, { clearProps: k ? "filter,transform,maskImage,webkitMaskImage" : "filter,transform" });
			}, P = () => {
				if (S <= 0) return;
				let e = {
					[D]: -n * O,
					scale: .8,
					opacity: c ? s : 0,
					delay: S,
					duration: C,
					ease: w,
					onComplete: () => M.current.onDisappearanceComplete?.()
				};
				u > 0 && (e.filter = `blur(${u}px)`), g > 0 && (e.stagger = {
					each: g,
					from: v
				}), Li.to(t, e);
			}, F = Li.timeline({
				paused: !0,
				onStart: () => M.current.onStart?.(),
				onComplete: () => {
					M.current.onComplete?.(), N(), b && !x && P();
				}
			});
			if (F.fromTo(t, A, j, x ? 0 : Math.max(h, 0)), y === "mount") {
				F.play();
				return;
			}
			let I = `top ${(1 - m) * 100}%`;
			x ? X.create({
				trigger: e,
				scroller: _,
				start: I,
				end: `top ${Math.max((1 - m) * 100 - 45, 5)}%`,
				scrub: x === !0 || Math.max(Number(x) || 0, .01),
				animation: F
			}) : X.create({
				trigger: e,
				scroller: _,
				start: I,
				once: b,
				onEnter: () => F.play(),
				onLeaveBack: b ? void 0 : () => {
					k && Li.set(t, {
						maskImage: k,
						webkitMaskImage: k
					}), F.reverse();
				}
			});
		}, e);
		return () => E.revert();
	}, [
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		c,
		l,
		u,
		d,
		f,
		p,
		m,
		h,
		g,
		v,
		y,
		b,
		x,
		S,
		C,
		w
	]), /* @__PURE__ */ (0, Z.jsx)("div", {
		ref: j,
		className: O,
		style: {
			visibility: "hidden",
			...k
		},
		...A,
		children: e
	});
}, mc = (0, _.createContext)({});
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-constant.mjs
function hc(e) {
	let t = (0, _.useRef)(null);
	return t.current === null && (t.current = e()), t.current;
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var gc = typeof window < "u" ? _.useLayoutEffect : _.useEffect, _c = /* @__PURE__ */ (0, _.createContext)(null);
//#endregion
//#region node_modules/motion-utils/dist/es/array.mjs
function vc(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function yc(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var bc = (e, t, n) => n > t ? t : n < e ? e : n, xc = {}, Sc = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), Cc = (e) => typeof e == "object" && !!e, wc = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function Tc(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var Ec = /* @__NO_SIDE_EFFECTS__ */ (e) => e, Dc = (...e) => e.reduce((e, t) => (n) => t(e(n))), Oc = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, kc = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return vc(this.subscriptions, e), () => this.remove(e);
	}
	remove(e) {
		yc(this.subscriptions, e);
	}
	notify(e, t, n) {
		let r = this.subscriptions.length;
		if (r) {
			if (r === 1) this.subscriptions[0](e, t, n);
			else for (let i = 0; i < r; i++) {
				let r = this.subscriptions[i];
				r && r(e, t, n);
			}
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, Ac = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, jc = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, Mc = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, Nc = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, Pc = (e, t, n) => e * (3 * (1 - e) * ((1 - e) * t + e * n) + e * e);
/*#__NO_SIDE_EFFECTS__*/
function Fc(e, t, n, r) {
	return e === t && n === r ? Ec : (i) => {
		let a = 0, o = 1, s = i;
		for (let t = 0;; t++) {
			s >= a && s <= o || (s = (a + o) / 2);
			let r = Pc(s, e, n) - i;
			if (r * r < 1e-28 || t === 40) break;
			r > 0 ? o = s : a = s, s -= r * 1e-7 / (Pc(s + 1e-7, e, n) - i - r);
		}
		return Pc(s, t, r);
	};
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var Ic = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Lc = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), Rc = /*@__PURE__*/ Fc(.33, 1.53, .69, .99), zc = /*@__PURE__*/ Lc(Rc), Bc = /*@__PURE__*/ Ic(zc), Vc = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * zc(e) : .5 * (2 - 2 ** (-10 * (e - 1))), Hc = (e) => 1 - Math.sin(Math.acos(e)), Uc = /* @__PURE__ */ Lc(Hc), Wc = /* @__PURE__ */ Ic(Hc), Gc = /*@__PURE__*/ Fc(.42, 0, 1, 1), Kc = /*@__PURE__*/ Fc(0, 0, .58, 1), qc = /*@__PURE__*/ Fc(.42, 0, .58, 1), Jc = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function Yc(e, t) {
	return /* @__PURE__ */ Jc(e) ? e[Nc(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var Xc = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", Zc = {
	linear: Ec,
	easeIn: Gc,
	easeInOut: qc,
	easeOut: Kc,
	circIn: Hc,
	circInOut: Wc,
	circOut: Uc,
	backIn: zc,
	backInOut: Bc,
	backOut: Rc,
	anticipate: Vc
}, Qc = (e) => typeof e == "string", $c = (e) => {
	if (/* @__PURE__ */ Xc(e)) {
		e.length;
		let [t, n, r, i] = e;
		return /* @__PURE__ */ Fc(t, n, r, i);
	}
	return Qc(e) ? (Zc[e], `${e}`, Zc[e]) : e;
}, el = {
	delta: 0,
	timestamp: 0,
	isProcessing: !1
}, tl;
function nl() {
	tl = void 0;
}
var rl = {
	now: () => (tl === void 0 && rl.set(el.isProcessing || xc.useManualTiming ? el.timestamp : performance.now()), tl),
	set: (e) => {
		tl = e, queueMicrotask(nl);
	}
}, il = (e) => Math.round(e * 1e5) / 1e5, al = (e) => (t) => typeof t == "string" && t.startsWith(e), ol = /*@__PURE__*/ al("--"), sl = /*@__PURE__*/ al("var(--"), cl = (e) => sl(e) ? ll.test(e.split("/*")[0].trim()) : !1, ll = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ul(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var dl = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, fl = {
	...dl,
	transform: (e) => bc(0, 1, e)
}, pl = {
	...dl,
	default: 1
}, ml = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function hl(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var gl = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, _l = (e, t) => (n) => !!(typeof n == "string" && gl.test(n) && n.startsWith(e) || t && !hl(n) && Object.prototype.hasOwnProperty.call(n, t)), vl = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(ml);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, yl = (e) => bc(0, 255, e), bl = {
	...dl,
	transform: (e) => Math.round(yl(e))
}, xl = {
	test: /*@__PURE__*/ _l("rgb", "red"),
	parse: /*@__PURE__*/ vl("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + bl.transform(e) + ", " + bl.transform(t) + ", " + bl.transform(n) + ", " + il(fl.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function Sl(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var Cl = {
	test: /*@__PURE__*/ _l("#"),
	parse: Sl,
	transform: xl.transform
}, wl = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), Tl = /*@__PURE__*/ wl("deg"), El = /*@__PURE__*/ wl("%"), Q = /*@__PURE__*/ wl("px"), Dl = /*@__PURE__*/ wl("vh"), Ol = /*@__PURE__*/ wl("vw"), kl = {
	...El,
	parse: (e) => El.parse(e) / 100,
	transform: (e) => El.transform(e * 100)
}, Al = {
	test: /*@__PURE__*/ _l("hsl", "hue"),
	parse: /*@__PURE__*/ vl("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + El.transform(il(t)) + ", " + El.transform(il(n)) + ", " + il(fl.transform(r)) + ")"
}, jl = {
	test: (e) => xl.test(e) || Cl.test(e) || Al.test(e),
	parse: (e) => xl.test(e) ? xl.parse(e) : Al.test(e) ? Al.parse(e) : Cl.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? xl.transform(e) : Al.transform(e),
	getAnimatableNone: (e) => {
		let t = jl.parse(e);
		return t.alpha = 0, jl.transform(t);
	}
}, Ml = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu, Nl = /*@__PURE__*/ new RegExp(ml.source), Pl = /*@__PURE__*/ new RegExp(Ml.source, "i");
function Fl(e) {
	return isNaN(e) && typeof e == "string" && (Nl.test(e) || Pl.test(e));
}
var Il = "number", Ll = "color", Rl = "var", zl = "var(", Bl = "${}", Vl = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)(?![a-z]*\()/giu;
function Hl(e) {
	let t = e.toString();
	return Nl.test(t) || Pl.test(t);
}
function Ul(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(Vl, (e) => (jl.test(e) ? (r.color.push(a), i.push(Ll), n.push(jl.parse(e))) : e.startsWith(zl) ? (r.var.push(a), i.push(Rl), n.push(e)) : (r.number.push(a), i.push(Il), n.push(parseFloat(e))), ++a, Bl)).split(Bl),
		indexes: r,
		types: i
	};
}
function Wl(e) {
	return Ul(e).values;
}
function Gl({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === Il ? il(r[a]) : e === Ll ? jl.transform(r[a]) : r[a];
		}
		return i;
	};
}
function Kl(e) {
	return Gl(Ul(e));
}
var ql = (e) => typeof e == "number" ? 0 : jl.test(e) ? jl.getAnimatableNone(e) : e, Jl = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : ql(e);
function Yl(e) {
	let t = Ul(e);
	return Gl(t)(t.values.map((e, n) => Jl(e, t.split[n])));
}
var Xl = {
	test: Fl,
	parse: Wl,
	createTransformer: Kl,
	getAnimatableNone: Yl
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function Zl(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Ql({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = Zl(s, r, e + 1 / 3), a = Zl(s, r, e), o = Zl(s, r, e - 1 / 3);
	}
	return {
		red: Math.round(i * 255),
		green: Math.round(a * 255),
		blue: Math.round(o * 255),
		alpha: r
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function $l(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var eu = (e, t, n) => e + (t - e) * n, tu = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, nu = [
	Cl,
	xl,
	Al
], ru = (e) => nu.find((t) => t.test(e));
function iu(e) {
	let t = ru(e);
	if (!t) return `${e}`, !1;
	let n = t.parse(e);
	return t === Al && (n = Ql(n)), n;
}
var au = (e, t) => {
	let n = iu(e), r = iu(t);
	if (!n || !r) return $l(e, t);
	let i = { ...n };
	return (e) => (i.red = tu(n.red, r.red, e), i.green = tu(n.green, r.green, e), i.blue = tu(n.blue, r.blue, e), i.alpha = eu(n.alpha, r.alpha, e), xl.transform(i));
}, ou = /* @__PURE__ */ new Set(["none", "hidden"]);
function su(e, t) {
	return ou.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function cu(e, t) {
	return (n) => eu(e, t, n);
}
function lu(e) {
	return typeof e == "number" ? cu : typeof e == "string" ? cl(e) ? $l : jl.test(e) ? au : pu : Array.isArray(e) ? uu : typeof e == "object" ? jl.test(e) ? au : du : $l;
}
function uu(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => lu(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function du(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = lu(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function fu(e, t) {
	let n = [], r = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < t.values.length; i++) {
		let a = t.types[i], o = e.indexes[a][r[a]], s = e.values[o] ?? 0;
		n[i] = s, r[a]++;
	}
	return n;
}
var pu = (e, t) => {
	let n = Xl.createTransformer(t), r = Ul(e), i = Ul(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? ou.has(e) && !i.values.length || ou.has(t) && !r.values.length ? su(e, t) : Dc(uu(fu(r, i), i.values), n) : (`${e}${t}`, $l(e, t));
}, mu = /^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;
function hu(e, t) {
	let n = mu.exec(e);
	if (!n) return;
	let r = mu.exec(t);
	if (!r || n[2] !== r[2]) return;
	let i = n[2], a = parseFloat(n[1]), o = parseFloat(r[1]);
	return (e) => il(eu(a, o, e)) + i;
}
function gu(e, t, n) {
	if (typeof e == "number" && typeof t == "number" && typeof n == "number") return eu(e, t, n);
	if (typeof e == "string" && typeof t == "string") {
		let n = hu(e, t);
		if (n) return n;
	}
	return lu(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/order.mjs
var _u = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function vu(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new Set(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (n.add(t), e()), t(o);
	}
	let c = {
		schedule: (e, i = !1, o = !1) => {
			let s = o && r ? t : n;
			return i && a.add(e), s.add(e), e;
		},
		cancel: (e) => {
			n.delete(e), a.delete(e);
		},
		process: (e) => {
			if (o = e, r) {
				i = !0;
				return;
			}
			r = !0;
			let a = t;
			t = n, n = a, t.forEach(s), t.clear(), r = !1, i && (i = !1, c.process(e));
		}
	};
	return c;
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var yu = 40;
function bu(e, t, n = {
	delta: 0,
	timestamp: 0,
	isProcessing: !1
}) {
	let r = !1, i = !0, a = () => r = !0, o = _u.reduce((e, t) => (e[t] = vu(a), e), {}), { setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: d, preRender: f, render: p, postRender: m } = o, h = () => {
		let a = xc.useManualTiming, o = a ? n.timestamp : performance.now();
		r = !1, a || (n.delta = i ? 1e3 / 60 : Math.max(Math.min(o - n.timestamp, yu), 1)), n.timestamp = o, n.isProcessing = !0, s.process(n), c.process(n), l.process(n), u.process(n), d.process(n), f.process(n), p.process(n), m.process(n), n.isProcessing = !1, r && t && (i = !1, e(h));
	}, g = () => {
		r = !0, i = !0, n.isProcessing || e(h);
	};
	return {
		schedule: _u.reduce((e, t) => {
			let n = o[t];
			return e[t] = (e, t = !1, i = !1) => (r || g(), n.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < _u.length; t++) o[_u[t]].cancel(e);
		},
		state: n,
		steps: o
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: $, cancel: xu, steps: Su } = /* @__PURE__ */ bu(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ec, !0, el), Cu = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => $.update(t, e),
		stop: () => xu(t),
		now: () => el.isProcessing ? el.timestamp : rl.now()
	};
}, wu = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, Tu = 2e4;
function Eu(e, t = 50, n = Tu, r) {
	let i = 0, a = e.next(i);
	for (r?.push(a.value); !a.done && i < n;) i += t, a = e.next(i), r?.push(a.value);
	return i >= n ? Infinity : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function Du(e, t = 100, n) {
	let { keyframes: r, velocity: i } = e, a = r && r[r.length - 1] - r[0], o = n({
		...e,
		velocity: i && a ? i * t / a : i,
		keyframes: [0, t]
	}), s = Math.min(Eu(o), Tu);
	return {
		type: "keyframes",
		ease: (e) => o.next(s * e).value / t,
		duration: /* @__PURE__ */ jc(s)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var Ou = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05
}, ku = (e) => e < 0 ? 1 / Math.max(1 + e, Ou.minDamping) : Math.max(1 - e, Ou.minDamping);
function Au(e, t) {
	if (!(e > 1)) return 1;
	let n = Math.sqrt(e * e - 1), r = e - n, i = e + n, a = 2 * n * Math.exp(-t) * (1 + t);
	return Nu((e) => i * Math.exp(-r * e) - r * Math.exp(-i * e) - a, (e) => Math.exp(-i * e) - Math.exp(-r * e), t) / t;
}
function ju(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var Mu = 12;
function Nu(e, t, n) {
	let r = n;
	for (let n = 1; n < Mu; n++) r -= e(r) / t(r);
	return r;
}
var Pu = .001;
function Fu({ duration: e = Ou.duration, bounce: t = Ou.bounce }) {
	let n, r;
	Ou.maxDuration;
	let i = ku(t);
	e = bc(Ou.minDuration, Ou.maxDuration, /* @__PURE__ */ jc(e)), i < 1 ? (n = (t) => {
		let n = t * i, r = n * e, a = ju(t, i), o = Math.exp(-r);
		return Pu - n / a * o;
	}, r = (t) => {
		let r = t * i * e, a = i * i * t * t * e, o = Math.exp(-r), s = ju(t * t, i);
		return (-n(t) + Pu > 0 ? -1 : 1) * -a * o / s;
	}) : (n = (t) => -.001 + Math.exp(-t * e) * (t * e + 1), r = (t) => Math.exp(-t * e) * (-t * (e * e)));
	let a = 5 / e, o = Nu(n, r, a), s = o * Au(i, o * e), c = s * s;
	return {
		stiffness: c,
		damping: i * 2 * Math.sqrt(c),
		duration: /* @__PURE__ */ Ac(e)
	};
}
var Iu = (e, t) => (t ? e >= 0 : e > 0) && e < Infinity;
function Lu(e, t) {
	if (Iu(e, t)) return e;
}
function Ru(e) {
	let t = Lu(e.stiffness), n = Lu(e.damping, !0), r = Lu(e.mass), i = {
		...e,
		stiffness: t ?? Ou.stiffness,
		damping: n ?? Ou.damping,
		mass: r ?? Ou.mass,
		isResolvedFromDuration: !1,
		isTimeDefined: (t ?? n ?? r) === void 0 && (e.duration !== void 0 || e.bounce !== void 0)
	};
	if (i.isTimeDefined) {
		if (e.visualDuration) {
			let t = ku(e.bounce || 0), n = 2 * Math.PI / (e.visualDuration * 1.2) * Au(t, 2 * Math.PI / 1.2);
			i.stiffness = n * n, i.damping = 2 * t * Math.sqrt(i.stiffness);
		} else Object.assign(i, Fu(i)), i.isResolvedFromDuration = !0;
		(!Iu(i.stiffness) || !Iu(i.damping, !0)) && (i.stiffness = Ou.stiffness, i.damping = Ou.damping);
	}
	return i;
}
function zu(e = Ou.visualDuration, t = Ou.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, r = n.keyframes[0], i = n.keyframes[n.keyframes.length - 1], a = {
		done: !1,
		value: r
	}, { stiffness: o, damping: s, mass: c, duration: l, isResolvedFromDuration: u, isTimeDefined: d } = Ru({ ...n }), f = (e) => d ? 0 : -/* @__PURE__ */ jc(e), p = s / (2 * Math.sqrt(o * c)), m = /* @__PURE__ */ jc(Math.sqrt(o / c)), h = p * m, g = {
		target: i,
		delta: i - r,
		velocity: f(n.velocity || 0) || 0,
		restSpeed: 0,
		restDelta: 0
	}, _ = () => {
		let e = Math.abs(g.delta) < 5;
		g.restSpeed = n.restSpeed || (e ? Ou.restSpeed.granular : Ou.restSpeed.default), g.restDelta = n.restDelta || (e ? Ou.restDelta.granular : Ou.restDelta.default);
	};
	_();
	let v, y, b;
	if (p < 1) {
		let e = ju(m, p), t = {
			A: 0,
			sinC: 0,
			cosC: 0,
			t: -1,
			env: 0,
			sin: 0,
			cos: 0
		};
		b = () => {
			t.A = (g.velocity + h * g.delta) / e, t.sinC = h * t.A + g.delta * e, t.cosC = h * g.delta - t.A * e;
		};
		let n = (n) => {
			n !== t.t && (t.t = n, t.env = Math.exp(-h * n), t.sin = Math.sin(e * n), t.cos = Math.cos(e * n));
		};
		v = (e) => (n(e), g.target - t.env * (t.A * t.sin + g.delta * t.cos)), y = (e) => (n(e), t.env * (t.sinC * t.sin + t.cosC * t.cos));
	} else if (p === 1) {
		v = (e) => g.target - Math.exp(-m * e) * (g.delta + (g.velocity + m * g.delta) * e);
		let e = { C: 0 };
		b = () => {
			e.C = g.velocity + m * g.delta;
		}, y = (t) => Math.exp(-m * t) * (m * e.C * t - g.velocity);
	} else {
		let e = m * Math.sqrt(p * p - 1), t = h - e, n = h + e, r = d ? Infinity : 300 / e, i = (e, t) => Math.exp(t > r ? -e * r - h * (t - r) : -e * t), a = {
			S: 0,
			F: 0
		};
		b = () => {
			let t = (g.velocity + h * g.delta) / e;
			a.S = (g.delta + t) / 2, a.F = (g.delta - t) / 2;
		}, v = (e) => g.target - a.S * i(t, e) - a.F * i(n, e), y = (e) => t * a.S * i(t, e) + n * a.F * i(n, e);
	}
	b();
	let x = u && l || null, S = {
		calculatedDuration: x,
		retarget: (e, t) => {
			g.target = e[e.length - 1], g.delta = g.target - e[0], g.velocity = f(t), n.restSpeed && n.restDelta || _(), S.calculatedDuration = x, a.done = !1, b();
		},
		velocity: (e) => /* @__PURE__ */ Ac(y(e)),
		next: (e) => {
			let t = v(e);
			if (u) a.done = e >= l;
			else {
				let n = /* @__PURE__ */ Ac(y(e));
				a.done = Math.abs(n) <= g.restSpeed && Math.abs(g.target - t) <= g.restDelta;
			}
			return a.value = a.done ? g.target : t, a;
		},
		toString: () => {
			let e = Math.min(Eu(S), Tu), t = wu((t) => S.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return S;
}
zu.applyToOptions = (e) => {
	let t = Du(e, 100, zu);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ Ac(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function Bu({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => e < s || e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => {
		let t = v(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : _ + t;
	}, b, x, S = (e) => {
		p(f.value) && (b = e, x = zu({
			keyframes: [f.value, m(f.value)],
			velocity: -v(e) / r * 1e3,
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return S(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !x && b === void 0 && (t = !0, y(e), S(e)), b !== void 0 && e >= b ? x.next(e - b) : (!t && y(e), f);
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function Vu(e, t, n) {
	let r = [], i = n || xc.mix || gu, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = Dc(Array.isArray(t) ? t[n] || Ec : t, a)), r.push(a);
	}
	return r;
}
function Hu(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (t.length, a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = Vu(t, r, i), c = s.length, l = (n) => {
		if (o && n < e[0]) return t[0];
		let r = 0;
		if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ Oc(e[r], e[r + 1], n);
		return s[r](i);
	};
	return n ? (t) => l(bc(e[0], e[a - 1], t)) : l;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function Uu(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ Oc(0, t, r);
		e.push(eu(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function Wu(e) {
	let t = [0];
	return Uu(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function Gu(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function Ku(e, t) {
	return e.map(() => t || qc).splice(0, e.length - 1);
}
function qu({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ Jc(r) ? r.map($c) : $c(r) || qc, a = {
		done: !1,
		value: t[0]
	};
	if (t.length === 2 && !Array.isArray(i) && (!n || n.length !== 2 || n[0] === 0 && n[1] === 1)) {
		let [n, r] = t, o = n === r ? void 0 : (xc.mix || gu)(n, r);
		return {
			calculatedDuration: e,
			next: (t) => (a.value = o ? o(i(e > 0 ? bc(0, 1, t / e) : 1)) : r, a.done = t >= e, a)
		};
	}
	let o = Hu(Gu(n && n.length === t.length ? n : Wu(t), e), t, { ease: Array.isArray(i) ? i : Ku(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var Ju = 5;
function Yu(e, t, n) {
	let r = Math.max(t - Ju, 0);
	return /* @__PURE__ */ Mc(n - e(r), t - r);
}
function Xu(e, t, n = 0) {
	return t <= 0 ? n : e.velocity ? e.velocity(t) : Yu((t) => e.next(t).value, t, e.next(t).value);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var Zu = (e) => e !== null;
function Qu(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(Zu), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var $u = {
	decay: Bu,
	inertia: Bu,
	tween: qu,
	keyframes: qu,
	spring: zu
};
function ed(e) {
	typeof e.type == "string" && (e.type = $u[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-start-time.mjs
var td = 40, nd = (e, t) => t - e > td && !xc.useManualTiming ? t : e;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/notify-inspector.mjs
function rd(e, t) {
	return {
		kind: e,
		animation: t,
		timestamp: rl.now(),
		frameTimestamp: el.timestamp,
		frameIsProcessing: el.isProcessing
	};
}
function id(e, t, n) {
	let r = globalThis.__MOTION_INSPECT__;
	if (r) try {
		r({
			...rd("animation-start", e),
			options: n ? {
				...t,
				...n
			} : t
		});
	} catch {}
}
function ad(e, t) {
	let n = globalThis.__MOTION_INSPECT__;
	if (n) try {
		n({
			...rd("layout-animation-start", e),
			node: t
		});
	} catch {}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var od = class {
	constructor() {
		this.isResolved = !1;
	}
	get finished() {
		return this._finished ||= this.isResolved ? Promise.resolve() : new Promise((e) => {
			this._resolve = e;
		}), this._finished;
	}
	updateFinished() {
		this._finished = this._resolve = void 0, this.isResolved = !1;
	}
	notifyFinished() {
		this.isResolved = !0, this._resolve?.();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, sd = (e) => e / 100, cd = (e) => Math.round(e * 1e4) / 1e4, ld = class extends od {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== rl.now() && this.tick(rl.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause(), id(this, this.options);
	}
	initAnimation() {
		let { options: e } = this;
		ed(e);
		let { type: t = qu, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || qu;
		s !== qu && typeof o[0] != "number" && (this.mixKeyframes = Dc(sd, gu(o[0], o[1])), o = [0, 100]);
		let c = s(o === e.keyframes ? e : {
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = Eu(c));
		let { calculatedDuration: l } = c;
		this.calculatedDuration = l, this.resolvedDuration = l + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = c;
	}
	updateTime(e) {
		let t = Math.round(e - this.startTime) * this.playbackSpeed;
		this.currentTime = this.holdTime === null ? t : this.holdTime;
	}
	tick(e, t = !1) {
		let { generator: n, totalDuration: r, calculatedDuration: i } = this;
		if (this.startTime === null) return n.next(0);
		let { delay: a = 0, keyframes: o, type: s, onUpdate: c, finalKeyframe: l } = this.options;
		this.startTime === this.pendingStartTime && (this.startTime = nd(this.startTime, e)), this.pendingStartTime = void 0, this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), t ? this.currentTime = e : this.updateTime(e);
		let u = this.currentTime - a * (this.playbackSpeed >= 0 ? 1 : -1), d = this.playbackSpeed >= 0 ? u < 0 : u > r;
		this.currentTime = Math.max(u, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
		let f = this.generate(this.currentTime, d), { done: p } = f;
		!d && i !== null && (p = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
		let m = this.holdTime === null && (this.state === "finished" || this.state === "running" && p);
		return m && s !== Bu && (f.value = Qu(o, this.options, l, this.speed)), c && c(f.value), m && this.finish(), f;
	}
	at(e) {
		return this.holdTime ?? cd((e - this.startTime) * this.playbackSpeed);
	}
	sampleAt(e, t) {
		let { options: n, totalDuration: r } = this, i = this.at(e) - (n.delay || 0);
		return i >= r && n.type !== Bu ? Qu(n.keyframes, n, t ? void 0 : n.finalKeyframe) : this.generate(Math.max(i, 0), i < 0).value;
	}
	generate(e, t) {
		let { generator: n, totalDuration: r, mixKeyframes: i, mirroredGenerator: a, resolvedDuration: o } = this, { keyframes: s, repeat: c, repeatType: l, repeatDelay: u } = this.options, d = e, f = n;
		if (c) {
			let t = Math.min(e, r) / o, n = Math.floor(t), i = t % 1;
			!i && t >= 1 && (i = 1), i === 1 && n--, n = Math.min(n, c + 1), n % 2 && (l === "reverse" ? (i = 1 - i, u && (i -= u / o)) : l === "mirror" && (f = a)), d = bc(0, 1, i) * o;
		}
		let p;
		return t ? (this.delayState.value = s[0], p = this.delayState) : p = f.next(d), i && !t && (p.value = i(p.value)), p;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ jc(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ jc(e);
	}
	get time() {
		return /* @__PURE__ */ jc(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ Ac(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		return Xu(this.generator, this.currentTime, this.options.velocity);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(rl.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ jc(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = Cu, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? (this.pendingStartTime = n) : this.startTime = n - this.holdTime / (this.playbackSpeed || 1), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(rl.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
	}
	stopDriver() {
		this.driver &&= (this.driver.stop(), void 0);
	}
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
}, ud = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function dd(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(ml) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!ud.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var fd = /\b([a-z-]*)\(.*?\)/gu, pd = {
	...Xl,
	getAnimatableNone: (e) => {
		let t = e.match(fd);
		return t ? t.map(dd).join(" ") : e;
	}
}, md = {
	...Xl,
	getAnimatableNone: (e) => {
		let t = Xl.parse(e);
		return Xl.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, hd = {
	...dl,
	transform: Math.round
}, gd = {
	rotate: Tl,
	pathRotation: Tl,
	rotateX: Tl,
	rotateY: Tl,
	rotateZ: Tl,
	scale: pl,
	scaleX: pl,
	scaleY: pl,
	scaleZ: pl,
	skew: Tl,
	skewX: Tl,
	skewY: Tl,
	distance: Q,
	translateX: Q,
	translateY: Q,
	translateZ: Q,
	x: Q,
	y: Q,
	z: Q,
	perspective: Q,
	transformPerspective: Q,
	opacity: fl,
	originX: kl,
	originY: kl,
	originZ: Q
}, _d = {
	borderWidth: Q,
	borderTopWidth: Q,
	borderRightWidth: Q,
	borderBottomWidth: Q,
	borderLeftWidth: Q,
	borderRadius: Q,
	borderTopLeftRadius: Q,
	borderTopRightRadius: Q,
	borderBottomRightRadius: Q,
	borderBottomLeftRadius: Q,
	width: Q,
	maxWidth: Q,
	height: Q,
	maxHeight: Q,
	top: Q,
	right: Q,
	bottom: Q,
	left: Q,
	inset: Q,
	insetBlock: Q,
	insetBlockStart: Q,
	insetBlockEnd: Q,
	insetInline: Q,
	insetInlineStart: Q,
	insetInlineEnd: Q,
	padding: Q,
	paddingTop: Q,
	paddingRight: Q,
	paddingBottom: Q,
	paddingLeft: Q,
	paddingBlock: Q,
	paddingBlockStart: Q,
	paddingBlockEnd: Q,
	paddingInline: Q,
	paddingInlineStart: Q,
	paddingInlineEnd: Q,
	margin: Q,
	marginTop: Q,
	marginRight: Q,
	marginBottom: Q,
	marginLeft: Q,
	marginBlock: Q,
	marginBlockStart: Q,
	marginBlockEnd: Q,
	marginInline: Q,
	marginInlineStart: Q,
	marginInlineEnd: Q,
	fontSize: Q,
	backgroundPositionX: Q,
	backgroundPositionY: Q,
	...gd,
	zIndex: hd,
	fillOpacity: fl,
	strokeOpacity: fl,
	numOctaves: hd
}, vd = {
	..._d,
	color: jl,
	backgroundColor: jl,
	outlineColor: jl,
	fill: jl,
	stroke: jl,
	borderColor: jl,
	borderTopColor: jl,
	borderRightColor: jl,
	borderBottomColor: jl,
	borderLeftColor: jl,
	filter: pd,
	WebkitFilter: pd,
	mask: md,
	WebkitMask: md
}, yd = (e) => vd[e], bd = /*@__PURE__*/ new Set([pd, md]);
function xd(e, t) {
	let n = yd(e);
	return bd.has(n) || (n = Xl), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function Sd(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var Cd = (e) => e * 180 / Math.PI, wd = (e) => Ed(Cd(Math.atan2(e[1], e[0]))), Td = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scaleZ: () => 1,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: wd,
	rotateZ: wd,
	skewX: (e) => Cd(Math.atan(e[1])),
	skewY: (e) => Cd(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Ed = (e) => (e %= 360, e < 0 && (e += 360), e), Dd = wd, Od = (e) => Math.hypot(e[0], e[1]), kd = (e) => Math.hypot(e[4], e[5]), Ad = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: Od,
	scaleY: kd,
	scaleZ: (e) => Math.hypot(e[8], e[9], e[10]),
	scale: (e) => (Od(e) + kd(e)) / 2,
	rotateX: (e) => Ed(Cd(Math.atan2(e[6], e[5]))),
	rotateY: (e) => Ed(Cd(Math.atan2(-e[2], e[0]))),
	rotateZ: Dd,
	rotate: Dd,
	skewX: (e) => Cd(Math.atan(e[4])),
	skewY: (e) => Cd(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function jd(e) {
	return +!!e.includes("scale");
}
function Md(e, t) {
	if (!e || e === "none") return jd(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = Ad, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = Td, i = t;
	}
	if (!i) return jd(t);
	let a = r[t], o = i[1].split(",").map(Pd);
	return typeof a == "function" ? a(o) : o[a];
}
var Nd = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return Md(n, t);
};
function Pd(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var Fd = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"scaleZ",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], Id = /* @__PURE__ */ new Set([...Fd, "pathRotation"]), Ld = (e) => e === dl || e === Q, Rd = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), zd = Fd.filter((e) => !Rd.has(e));
function Bd(e) {
	let t = [];
	return zd.forEach((n) => {
		let r = e.getValue(n);
		if (r !== void 0) {
			let e = r.get(), i = +!!n.startsWith("scale");
			if (e === i) return;
			t.push([n, e]), r.set(i);
		}
	}), t;
}
var Vd = /* @__PURE__ */ new Set(["bottom", "right"]);
function Hd(e, t, n, r, i, a) {
	let o = parseFloat(e);
	if (!isNaN(o)) return o;
	let { min: s, max: c } = t()[n], l = c - s;
	return a === "border-box" ? l : l - parseFloat(r) - parseFloat(i);
}
var Ud = {
	width: ({ width: e, paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }, i) => Hd(e, i, "x", t, n, r),
	height: ({ height: e, paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }, i) => Hd(e, i, "y", t, n, r),
	top: ({ top: e }) => parseFloat(e),
	left: ({ left: e }) => parseFloat(e),
	bottom: ({ top: e }, t) => {
		let { y: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	right: ({ left: e }, t) => {
		let { x: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	x: ({ transform: e }) => Md(e, "x"),
	y: ({ transform: e }) => Md(e, "y")
};
Ud.translateX = Ud.x, Ud.translateY = Ud.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var Wd = /* @__PURE__ */ new Set(), Gd = !1, Kd = !1, qd = !1;
function Jd() {
	if (Kd) {
		let e = [], t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		Wd.forEach((r) => {
			r.needsMeasurement && (e.push(r), t.add(r.element), Vd.has(r.name) && n.add(r.element));
		});
		let r = /* @__PURE__ */ new Map();
		n.forEach((e) => {
			let t = Bd(e);
			t.length && (r.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = r.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	Kd = !1, Gd = !1, Wd.forEach((e) => e.complete(qd)), Wd.clear();
}
function Yd() {
	Wd.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (Kd = !0);
	});
}
function Xd() {
	qd = !0, Yd(), Jd(), qd = !1;
}
function Zd(e, t, n) {
	if (typeof e == "string") {
		if (Sc(e) || wc(e)) return parseFloat(e);
		if (!Xl.test(e) && Xl.test(n)) return xd(t, n);
	}
	return e ?? void 0;
}
var Qd = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (Wd.add(this), Gd || (Gd = !0, $.read(Yd), $.resolveKeyframes(Jd))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = Zd(n.readValue(t, a), t, a);
				r !== void 0 && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		Sd(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Wd.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (Wd.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, $d = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function ef(e, t, n) {
	$d(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var tf = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function nf(e, t) {
	let n = /* @__PURE__ */ Tc(e);
	return () => tf[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var rf = /* @__PURE__ */ nf(() => window.ScrollTimeline !== void 0, "scrollTimeline"), af = /*@__PURE__*/ nf(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), of = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, sf = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ of([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ of([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ of([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ of([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function cf(e, t) {
	if (e) return typeof e == "function" ? af() ? wu(e, t) : "ease-out" : /* @__PURE__ */ Xc(e) ? of(e) : Array.isArray(e) ? e.map((e) => cf(e, t) || sf.easeOut) : sf[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function lf(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = cf(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function uf(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function df({ type: e, ...t }) {
	return uf(e) && af() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var ff = class extends od {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, e.type;
		let c = df(e);
		this.animation = lf(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = Qu(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), ef(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		}, id(this, e, c);
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e !== "idle" && e !== "finished" && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ jc(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ jc(e);
	}
	get time() {
		return /* @__PURE__ */ jc(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Ac(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, onAttach: t, observe: n }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && rf() ? (this.animation.timeline = e, t?.(this.animation), Ec) : n(this);
	}
}, pf = {
	anticipate: Vc,
	backInOut: Bc,
	circInOut: Wc
};
function mf(e) {
	return e in pf;
}
function hf(e) {
	typeof e.ease == "string" && mf(e.ease) && (e.ease = pf[e.ease]);
}
var gf = class extends ff {
	constructor(e) {
		hf(e), ed(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	elapsed() {
		return this.state === "running" ? (rl.now() - this.startTime) * this.speed : this.time * 1e3;
	}
	sample(e) {
		if (!this.sampler) {
			let { motionValue: e, onUpdate: t, onComplete: n, onPlay: r, onStop: i, element: a, ...o } = this.options;
			this.sampler = new ld({
				...o,
				autoplay: !1
			}), this.sampler.stop();
		}
		return this.sampler.sample(Math.max(0, e)).value;
	}
	liveValue() {
		let { state: e } = this;
		if (e === "running" || e === "paused") return this.sample(this.elapsed());
	}
	updateMotionValue(e) {
		let { motionValue: t, element: n, name: r } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let { speed: i } = this, a = this.elapsed(), o = this.state === "running" && i ? bc(0, 10, a) : 0, s = this.sample(a);
		n && r && ef(n, r, s), t.setWithVelocity(this.sample(a - o * Math.sign(i)), s, o / Math.abs(i || 1));
	}
}, _f = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (Xl.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function vf(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function yf(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = _f(i, t), s = _f(a, t);
	return !o || !s ? (o !== s && `${t}${i}${a}${o ? a : i}`, !1) : vf(e) || (n === "spring" || uf(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function bf(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var xf = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), Sf = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Cf(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && Sf.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var wf = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]), Tf = /*@__PURE__*/ Tc(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ef(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e;
	if (!n || !(xf.has(n) || wf.has(n))) return !1;
	let c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Tf() && (xf.has(n) || wf.has(n) && Cf(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var Df = (e, t) => t && typeof e == "number" ? t.transform(e) : e, Of = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, kf = Fd.length;
function Af(e, t, n) {
	let r = "", i = !0;
	for (let a = 0; a < kf; a++) {
		let o = Fd[a], s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == "number") c = s === +!!o.startsWith("scale");
		else {
			let e = parseFloat(s);
			c = o.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!c || n) {
			let e = Df(s, _d[o]);
			if (!c) {
				i = !1;
				let t = Of[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	let a = e.pathRotation;
	return a && (i = !1, r += `rotate(${Df(a, _d.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/transforms/groups.mjs
var jf = /* @__PURE__ */ new WeakMap(), Mf = 200, Nf = .001, Pf = .1, Ff = .001, If = 100, Lf = (e) => /^(linear|ease(In|Out|InOut))$/.test(e), Rf = (e, t) => e - t, zf = (e, t, n) => {
	let r = [];
	for (let i = 0; i <= n; i++) r.push(eu(e, t, i / n));
	return r;
}, Bf = (e) => e.motionValue.owner, Vf = (e) => jf.get(e), Hf = (e, t) => e.latestValues ? e.latestValues[t] : e.getValue(t)?.get(), Uf = ({ name: e, motionValue: t }) => e && Fd.includes(e) && t?.owner?.current instanceof HTMLElement && Tf() && af();
function Wf(e) {
	let t = Bf(e), { onUpdate: n, transformTemplate: r } = t.getProps();
	return !e.isHandoff && !n && !e.hasOnUpdate && !r && e.type !== "inertia" && (Hf(t, "transform") || "none") === "none" && !Hf(t, "pathRotation") && !t.projection?.isProjecting();
}
var Gf = class extends ld {
	constructor(e) {
		let t = Bf(e).current, { driver: n = Cu } = e, r = Wf(e);
		e.driver = (e) => {
			let r = n(e);
			return {
				js: r,
				now: r.now,
				start: (e = !0) => {
					let n = Vf(t);
					!n || n.isJS ? r.start(e) : n.schedule(!1, !e);
				},
				stop: () => {
					r.stop();
					let e = Vf(t);
					e?.schedule(!e.isFinishing);
				}
			};
		}, super(e), this.canAccelerate = r;
		let { stop: i } = this;
		this.stop = () => {
			this.isAccelerated() && this.sync(), i();
		};
	}
	get group() {
		return Vf(Bf(this.options).current);
	}
	get js() {
		return this.driver?.js;
	}
	get name() {
		return this.options.name;
	}
	timing() {
		let { startTime: e, speed: t, totalDuration: n } = this, { delay: r = 0, repeatType: i } = this.options;
		return this.holdTime === null ? n === Infinity ? [e + r / t, this.resolvedDuration * (i === "loop" ? 1 : 2) / t || 1] : [e + (r + n) / t, 0] : [Infinity, 0];
	}
	isAccelerated() {
		let { group: e, state: t } = this;
		return e?.tracks.has(this) && !e.isJS && this.canAccelerate && (t === "running" || t === "paused");
	}
	liveValue() {
		return this.isAccelerated() ? this.sampleAt(rl.now()) : void 0;
	}
	tween() {
		let { keyframes: e, type: t, ease: n, times: r, repeat: i, delay: a = 0 } = this.options, o = /* @__PURE__ */ Xc(n) ? of(n) : Lf(n) && sf[n];
		if (o && !i && !r && e.length === 2 && t === qu && this.holdTime === null) {
			let e = this.startTime + a / this.speed;
			return [
				e,
				e + this.resolvedDuration / this.speed,
				o
			];
		}
	}
	boundaries(e, t) {
		let { startTime: n, speed: r, resolvedDuration: i, options: a } = this, { delay: o = 0, repeat: s = 0, repeatDelay: c = 0, repeatType: l, times: u, keyframes: d, type: f } = a, p = (f || qu) === qu ? u || Wu(d) : [0, 1], m = n + o / r, h = [];
		if (this.holdTime !== null || !(i > 0)) return h;
		for (let n = Math.max(0, Math.floor((e - m) * r / i)); n <= s; n++) {
			let a = m + n * i / r;
			if (a > t) break;
			for (let o of p) {
				let s = a + (n % 2 && l && l !== "loop" ? 1 - o : o) * (i - c) / r;
				s > e && s < t && h.push(s);
			}
		}
		return h;
	}
	numberAt(e) {
		return parseFloat(this.sampleAt(e, !0));
	}
	sync() {
		let e = rl.now();
		this.options.motionValue.setWithVelocity(this.sampleAt(e - 10, !0), this.sampleAt(e, !0), 10);
	}
	play() {
		this.isStopped || ((this.group || Kf(Bf(this.options))).tracks.add(this), super.play());
	}
	pause() {
		super.pause(), this.isAccelerated() && (this.sync(), this.group.schedule(!1));
	}
	complete() {
		super.complete();
		let { group: e } = this;
		e && !e.isJS && this.canAccelerate && this.tick(rl.now());
	}
	get time() {
		return this.isAccelerated() ? /* @__PURE__ */ jc(bc(0, this.totalDuration, this.at(rl.now()) - (this.options.delay || 0))) : super.time;
	}
	set time(e) {
		super.time = e;
	}
	attachTimeline(e) {
		return this.canAccelerate = !1, this.group?.demote(!0), super.attachTimeline(e);
	}
};
function Kf(e) {
	let t = e.current, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = {}, a = [], o = /* @__PURE__ */ new Map(), s = [], c = !1, l = !1, u = !1, d = -Infinity, f = (e) => {
		for (let t of n) if (t.name === e) return !0;
	}, p = (t, n) => {
		let o = {};
		for (let s of t === void 0 ? Fd : a) {
			let a = r.get(s), c = t === void 0 ? Hf(e, s) : a ? a.sampleAt(n > t && !a.timing()[1] ? n : t) : i[s];
			c !== void 0 && (o[s] = c);
		}
		return o;
	}, m = (e, t) => {
		let n = "", r = p(e, t);
		for (let e in r) n += (Of[e] || e) + "(" + Df(r[e], _d[e]) + ") ";
		return n || "none";
	}, h = (e = p()) => {
		t.style.transform = Af(e, {});
	}, g = (e = !0) => {
		e && h(), s.forEach(({ animation: e }) => e.cancel()), s = [];
	}, _ = (e, t, n = Infinity) => {
		let r = {
			animation: e,
			offset: t,
			end: n
		};
		e.startTime = rl.now() + t, n < Infinity && (e.onfinish = () => {
			r.isDone = !0, s.some((e) => e.end === Infinity) && (e.cancel(), s = s.filter((e) => e !== r)), E.schedule(!1);
		}), e.oncancel = () => s.includes(r) && E.demote(), s.push(r);
	}, v = (e, t, n) => {
		let r = (t, n) => Math.abs(e(n) - e(t)), i = r(t, n);
		for (; n - t > .01;) {
			let e = (t + n) / 2;
			r(t, e) > r(e, n) ? n = e : t = e;
		}
		return r(t, n) > i / 2 ? [t, n] : [];
	}, y = (e, t, n, r) => {
		let i = Math.min(Mf, Math.max(2, Math.ceil((n - t) / 10)));
		if (r.length * 4 > i) return;
		let a = zf(t, n, i).concat(r).sort(Rf), o = (e) => /* @__PURE__ */ Oc(t, n, e), s, c;
		for (let t of e) {
			let e = a.map((e) => t.numberAt(e)), [n] = e, r = e[e.length - 1] - n, i = e.map((e) => r ? (e - n) / r : e - n);
			if (!r) {
				if (i.some((e) => !(Math.abs(e) <= Nf))) return;
			} else if (!s) s = i, c = (e) => (t.numberAt(e) - n) / r;
			else if (i.some((e, t) => !(Math.abs(e - s[t]) <= Nf))) return;
		}
		if (!s || s.every((e, t) => Math.abs(e - o(a[t])) <= Nf)) return "linear";
		let l = [], u = (e, t = c(e)) => l.push(cd(t) + " " + cd(o(e) * 100) + "%");
		return s.forEach((e, t) => {
			t && Math.abs(e - s[t - 1]) > .2 && v(c, a[t - 1], a[t]).forEach((e) => u(e)), u(a[t], e);
		}), "linear(" + l + ")";
	}, b = (e, t, n, r) => {
		let i = [t], a = (t, n) => e.every((e) => !(Math.abs(e.numberAt((t + n) / 2) - (e.numberAt(t) + e.numberAt(n)) / 2) > (e.name.startsWith("scale") ? Ff : Pf))), o = (t, n, r) => {
			if (n - t < 1 || a(t, n)) i.push(n);
			else if (r < 4) o(t, (t + n) / 2, r + 1), o((t + n) / 2, n, r + 1);
			else {
				for (let r of e) i.push(...v((e) => r.numberAt(e), t, n));
				i.push(n);
			}
		}, s = zf(t, n, Math.ceil((n - t) / 100));
		for (let e of r) s.push(e, Math.min(e + .01, n));
		let c = t;
		for (let e of s.sort(Rf)) e > c && o(c, e, 0), c = e;
		return i.sort(Rf);
	}, x = (e) => {
		let t;
		for (let n of e) {
			let e = n.tween();
			if (!e || t?.some((t, n) => n < 2 ? Math.abs(e[n] - t) > 1 : e[n] !== t)) return;
			t = e;
		}
		return t;
	}, S = (e, n, r, i = { fill: "both" }, a, o) => {
		let s = e.flatMap((e) => e.boundaries(n, r)), c = o || y(e, n, r, s), l = c ? [n, r] : b(e, n, r, s), u = l.map((e) => m(e, a)), d = { transform: u };
		return c || (d.offset = l.map((e) => /* @__PURE__ */ Oc(n, r, e))), u.every((e) => e === u[0]) && (h(p(n, a)), d = null), t.animate(d, {
			...i,
			duration: r - n,
			easing: c || "linear"
		});
	}, C = (c) => {
		let l = c, u = 0, d = 0, f = [], p = [], m = /* @__PURE__ */ new Set();
		r.clear(), o = /* @__PURE__ */ new Map();
		for (let e of n) {
			r.set(e.name, e);
			let [t, n] = e.timing(), i = t === Infinity;
			if (o.set(e, [
				e.at(c),
				e.speed,
				i
			]), i) e.sync();
			else {
				if (e.speed < 0) return;
				if (n) {
					if (u) {
						let e = (t - d) / n;
						if (Math.abs(n - u) > 1 || Math.abs(e - Math.round(e)) * u > 1) return;
					} else u = n, d = t;
					p.push(e);
				} else m.add(t);
				f.push(e), l = Math.max(l, t);
			}
		}
		i = {}, a = Fd.filter((t) => {
			if (r.has(t)) return !0;
			let n = i[t] = Hf(e, t);
			return n !== void 0 && parseFloat(n) !== +!!t.startsWith("scale");
		}), g(!1);
		let h = !u && x(f);
		try {
			if (h && h[1] > c) {
				let [e, t, n] = h;
				_(S(f, e, t, void 0, void 0, n), e - c, t - e);
			} else l > c && (_(S(f, c, l), 0, l - c), m.forEach((e) => e < l - 1 && _(t.animate(null, { duration: e - c }), 0, e - c)));
			if (u) {
				let e = d + Math.floor((l - d) / u) * u;
				_(S(p, e, e + u, {
					iterations: Infinity,
					iterationStart: (l - e) / u,
					fill: "forwards"
				}, l), l - c);
			}
		} catch {
			return;
		}
		return s.length || g(), !0;
	}, w = (e) => {
		let t, r = 0;
		for (let i of n) {
			let n = o.get(i);
			if (!n) return !1;
			let [a, s, c] = n, l = i.at(e), u = i.timing()[0] === Infinity;
			if (c) {
				if (u && l === a) continue;
				return !1;
			}
			let d = (l - a) / s, f = u ? 0 : i.speed / s;
			if (t === void 0) t = d, r = f;
			else if (Math.abs(d - t) > 1 || f !== r) return !1;
		}
		if (t === void 0) return !0;
		if (!s.length) return !1;
		for (let { offset: e, end: n, isDone: r } of s) {
			let i = t - e;
			if (n < Infinity && (r ? i < n - 1 : i < 0 || i >= n)) return !1;
		}
		for (let { animation: n, offset: i, isDone: a } of s) {
			if (a) continue;
			let o = t - i;
			r ? (n.playbackRate = r, n.startTime = e - o / r) : (n.pause(), n.currentTime = o);
		}
		return !0;
	}, T = () => {
		let r = rl.now();
		if (E.isJS || (E.isFinishing = !0, n.forEach((t) => {
			let [n, a] = t.timing();
			t.state === "running" && t.speed > 0 && !a && n <= r + 1 && (t.complete(), i[t.name] = Hf(e, t.name), o.has(t) || (c = !0));
		}), E.isFinishing = !1), l = !1, n.forEach(({ state: e }, t) => {
			(e === "idle" || e === "finished") && n.delete(t);
		}), !n.size) {
			jf.delete(t), E.isJS || g();
			return;
		}
		for (let e of n) if (!e.canAccelerate) return E.demote(!0);
		E.isJS && (E.isJS = !1, c = !0, n.forEach((e) => e.js?.stop()));
		let a = c, s = u;
		if (c = u = !1, a || !w(r)) {
			if (s) {
				if (r - d < If) return E.demote();
				d = r;
			}
			if (!C(r)) return E.demote();
		}
	}, E = {
		tracks: n,
		isJS: !1,
		isFinishing: !1,
		schedule(e, t) {
			c ||= e, u ||= !!t, l || (l = !0, el.isProcessing ? $.render(T, !1, !0) : queueMicrotask(T));
		},
		check() {
			if (!E.isJS) {
				for (let t in i) if (Hf(e, t) !== i[t] && !f(t)) return E.schedule(!0, !0);
			}
		},
		demote(e) {
			E.isJS || (n.forEach((t) => {
				t.isAccelerated() && t.sync(), e || (t.canAccelerate = !1);
			}), E.isJS = !0, o = /* @__PURE__ */ new Map(), g(), n.forEach((e) => e.state === "running" && e.js?.start()));
		}
	};
	return jf.set(t, E), E;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var qf = class extends od {
	constructor(e) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = rl.now();
		let { keyframes: t, name: n, motionValue: r, element: i } = e, a = e;
		a.autoplay ??= !0, a.delay ??= 0, a.type ??= "keyframes", a.repeat ??= 0, a.repeatDelay ??= 0, a.repeatType ??= "loop";
		let o = i?.KeyframeResolver || Qd;
		this.keyframeResolver = new o(t, (e, t, n) => this.onKeyframesResolved(e, t, a, !n), n, r, i), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = rl.now();
		let u = !0;
		yf(e, i, a, o) || (u = !1, (xc.instantAnimations || !s) && l?.(Qu(e, n, t)), e[0] = e[e.length - 1], bf(n), n.repeat = 0);
		let { onComplete: d } = n;
		n.finalKeyframe = t, n.keyframes = e, n.onComplete = () => {
			d?.(), this.notifyFinished();
		};
		let f = u && !c && Ef(n), p = !f && Uf(n);
		r && (f || p || this.resolvedAt !== this.createdAt) && (n.startTime ??= nd(this.createdAt, this.resolvedAt));
		let m;
		if (f) {
			n.element = n.motionValue?.owner?.current;
			try {
				m = new gf(n);
			} catch {
				m = new ld(n);
			}
		} else m = p ? new Gf(n) : new ld(n);
		this.pendingTimeline &&= (this.stopTimeline = m.attachTimeline(this.pendingTimeline), void 0), this._animation = m;
	}
	get finished() {
		return this._animation ? this._animation.finished : super.finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	liveValue() {
		return this._animation?.liveValue?.();
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), Xd()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}, Jf = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return Yf(this.animations, "duration");
	}
	get iterationDuration() {
		return Yf(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function Yf(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var Xf = class extends Jf {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/calc-child-stagger.mjs
function Zf(e, t, n, r = 0, i = 1) {
	let a = Array.from(e).sort((e, t) => e.sortNodePosition(t)).indexOf(t), o = e.size, s = (o - 1) * r;
	return typeof n == "function" ? n(a, o) : i === 1 ? a * r : s - a * r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/index.mjs
var Qf = 30, $f = (e) => !isNaN(parseFloat(e)), ep = { current: void 0 }, tp = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = rl.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.notifyChange(), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = rl.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = $f(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return this.on("change", e);
	}
	on(e, t) {
		var n;
		return e === "change" ? this.onChangeSubscribe(t) : ((n = this.events)[e] || (n[e] = new kc())).add(t);
	}
	onChangeSubscribe(e) {
		let { events: t } = this;
		return !t.change && !this.changeSubscriber ? this.changeSubscriber = e : (t.change || (t.change = new kc(), t.change.add(this.changeSubscriber), this.changeSubscriber = void 0), t.change.add(e)), () => {
			this.changeSubscriber === e ? this.changeSubscriber = void 0 : t.change?.remove(e), this.stopIfUnobserved();
		};
	}
	stopIfUnobserved() {
		$.read(() => {
			!this.changeSubscriber && !this.events.change?.getSize() && this.stop();
		});
	}
	clearListeners() {
		this.changeSubscriber = void 0;
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, t) {
		this.passiveEffect = e, this.stopPassiveEffect = t;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, t, n) {
		this.set(t), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - n;
	}
	jump(e, t = !0) {
		this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, t && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.notifyChange();
	}
	notifyChange() {
		let { current: e, changeSubscriber: t } = this;
		t ? t(e) : this.events.change?.notify(e);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		ep.current && ep.current.push(this);
		let e = this.animation?.liveValue?.();
		return e === void 0 ? this.current : e;
	}
	getCurrent() {
		return this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = rl.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Qf) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, Qf);
		return /* @__PURE__ */ Mc(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0;
			let n = !1, r;
			r = e(() => {
				n = !0, this.events.animationComplete?.notify(), this.animation === r && this.clearAnimation(), t();
			}), n || (this.animation = r), this.events.animationStart?.notify();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		this.animation = void 0;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function np(e, t) {
	return new tp(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function rp(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function ip(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : rp(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var ap = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, op = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), sp = {
	type: "keyframes",
	duration: .8
}, cp = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, lp = (e, { keyframes: t }) => t.length > 2 ? sp : Id.has(e) ? e.startsWith("scale") ? op(t[1]) : ap : cp, up = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed"
]);
function dp(e) {
	for (let t in e) if (!up.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var fp = (e, t, n, r = {}, i, a) => (o) => {
	let s = ip(r, e) || {}, c = s.delay || r.delay || 0, { elapsed: l = 0 } = r;
	l -= /* @__PURE__ */ Ac(c);
	let u = {
		keyframes: Array.isArray(n) ? n : [null, n],
		ease: "easeOut",
		velocity: t.getVelocity(),
		...s,
		delay: -l,
		onUpdate: (e) => {
			t.set(e), s.onUpdate && s.onUpdate(e);
		},
		onComplete: () => {
			o(), s.onComplete && s.onComplete();
		},
		name: e,
		motionValue: t,
		element: a ? void 0 : i,
		hasOnUpdate: !!s.onUpdate
	};
	dp(s) || Object.assign(u, lp(e, u)), u.duration &&= /* @__PURE__ */ Ac(u.duration), u.repeatDelay &&= /* @__PURE__ */ Ac(u.repeatDelay), u.from !== void 0 && (u.keyframes[0] = u.from);
	let d = !1;
	if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (bf(u), u.delay === 0 && (d = !0)), (xc.instantAnimations || xc.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) && (d = !0, bf(u), u.delay = 0), u.allowFlatten = !s.type && !s.ease, d && !a && t.get() !== void 0) {
		let e = Qu(u.keyframes, s);
		if (e !== void 0) {
			$.update(() => {
				u.onUpdate(e), u.onComplete();
			});
			return;
		}
	}
	return s.isSync ? new ld(u) : new qf(u);
}, pp = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function mp(e) {
	let t = pp.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
function hp(e, t, n = 1) {
	`${e}`;
	let [r, i] = mp(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return Sc(e) ? parseFloat(e) : e;
	}
	return cl(i) ? hp(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function gp(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function _p(e, t, n, r) {
	let i = (t) => typeof t == "function" ? t(n === void 0 ? e.custom : n, ...gp(r)) : t;
	return t = i(t), typeof t == "string" && (t = e.variants && e.variants[t]), i(t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function vp(e, t, n) {
	return _p(e.getProps(), t, n, e);
}
var yp = (e, t) => t === "exit" ? e.presenceContext?.custom : void 0, bp = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...Fd
]), xp = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function Sp(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, np(n));
}
function Cp(e) {
	return xp(e) ? e[e.length - 1] || 0 : e;
}
function wp(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = vp(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) Sp(e, t, Cp(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var Tp = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function Ep(e) {
	return !!(Tp(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function Dp(e, t) {
	let n = e.getValue("willChange");
	if (Ep(n)) return n.add(t);
	if (!n && xc.WillChange) {
		let n = new xc.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function Op(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var kp = "data-" + Op("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function Ap(e) {
	return e.props[kp];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
var jp = typeof window < "u";
function Mp({ protectedKeys: e, needsAnimating: t }, n) {
	let r = n in e && !t[n];
	return t[n] = !1, r;
}
function Np(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? rp(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState?.getState()[i], p = a?.path;
	p && p.animateVisualElement(e, s, a, n, d);
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && Mp(f, t)) continue;
		let o = {
			delay: n,
			...ip(a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			$.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (jp && window.MotionHandoffAnimation) {
			let n = Ap(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, $);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		Dp(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.start(fp(t, r, i, m && bp.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => $.update(() => {
			o && wp(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-variant.mjs
function Pp(e, t, n = {}) {
	let r = vp(e, t, yp(e, n.type)), i = n.transitionOverride || (r?.transition ?? (e.getDefaultTransition() || {})), a = () => Promise.all(r ? Np(e, r, n) : []), o = (r = 0) => {
		let { variantChildren: a } = e, { delayChildren: o = 0, staggerChildren: s, staggerDirection: c } = i, l = [];
		return a?.forEach((e) => {
			e.notify("AnimationStart", t), l.push(Pp(e, t, {
				...n,
				delay: r + (typeof o == "function" ? 0 : o) + Zf(a, e, o, s, c)
			}).then(() => e.notify("AnimationComplete", t)));
		}), Promise.all(l);
	}, { when: s } = i;
	return s ? s === "beforeChildren" ? a().then(() => o()) : o().then(a) : Promise.all([a(), o(n.delay)]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element.mjs
function Fp(e, t, n = {}) {
	return e.notify("AnimationStart", t), (Array.isArray(t) ? Promise.all(t.map((t) => Pp(e, t, n))) : typeof t == "string" ? Pp(e, t, n) : Promise.all(Np(e, vp(e, t, n.custom), n))).then(() => {
		e.notify("AnimationComplete", t);
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var Ip = {
	test: (e) => e === "auto",
	parse: (e) => e
}, Lp = (e) => (t) => t.test(e), Rp = [
	dl,
	Q,
	El,
	Tl,
	Ol,
	Dl,
	Ip
], zp = (e) => Rp.find(Lp(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function Bp(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || wc(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var Vp = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function Hp(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !Vp.has(t) && Hl(t) && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] !== i && (e[r] = xd(n, i));
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var Up = class extends Qd {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	scheduleResolve() {
		if (this.canReadNow() && (this.readKeyframes(), !this.needsMeasurement)) return this.complete();
		super.scheduleResolve();
	}
	canReadNow() {
		let { unresolvedKeyframes: e, element: t, motionValue: n } = this, r = e[0] ?? n?.get();
		if (!t?.current || r === void 0) return !1;
		for (let t = 0; t < e.length; t++) if (ul(t ? e[t] : r)) return !1;
		return !0;
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), cl(r))) {
				let i = hp(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !bp.has(n) || e.length !== 2) return;
		let [r, i] = e;
		if (typeof r == "number" && typeof i == "number") return;
		let a = zp(r), o = zp(i);
		if (ul(r) !== ul(i) && Ud[n]) this.needsMeasurement = !0;
		else if (a !== o) {
			if (Ld(a) && Ld(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else Ud[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || Bp(e[t])) && n.push(t);
		n.length && Hp(e, n, t);
	}
	measure() {
		let { element: e, name: t } = this;
		return Ud[t](window.getComputedStyle(e.current), () => e.measureViewportBox());
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = this.measure(), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && this.motionValue?.jump(r, !1);
	}
	measureEndState() {
		let { element: e, unresolvedKeyframes: t } = this;
		if (!e || !e.current) return;
		this.motionValue?.jump(this.measuredOrigin, !1);
		let n = t.length - 1, r = t[n];
		t[n] = this.measure(), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, Wp = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
], Gp = [];
function Kp(e) {
	typeof e.test == "function" && e.read, qp(e), Gp.unshift(e);
}
function qp(e) {
	yc(Gp, e);
}
function Jp(e) {
	return Gp.find((t) => t.test(e));
}
function Yp(e, t, n = {}, r) {
	let i = [], { velocity: a } = n, o = n.reduceMotion ?? r?.shouldReduceMotion;
	for (let s in t) {
		if (s === "transition" || s === "transitionEnd") continue;
		let c = t[s];
		if (c === void 0) continue;
		let l = e(s), u = l.get();
		u !== void 0 && !l.isAnimating() && !Array.isArray(c) && c === u && !a ? $.update(() => l.set(c)) : (l.start(fp(s, l, c, o && bp.has(s) ? { type: !1 } : n, r)), l.animation && i.push(l.animation));
	}
	let { transitionEnd: s } = t;
	if (s) {
		let t = () => $.update(() => {
			for (let t in s) e(t).set(s[t]);
		});
		i.length ? Promise.all(i).then(t) : t();
	}
	return i;
}
function Xp(e, t, n, r, i) {
	return Yp((r) => {
		let a = e.get(t, r);
		if (!a) {
			let o;
			if (!i) {
				let i = n[r];
				o = Zp(i) ?? e.read(t, r, i), `${r}`;
			}
			a = np(o, { owner: i }), e(t, { [r]: a });
		}
		return a;
	}, n, r, i);
}
function Zp(e) {
	let t = Array.isArray(e) ? e[0] : void 0;
	return t === null ? void 0 : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-html-element.mjs
function Qp(e) {
	return Cc(e) && "offsetHeight" in e && !("ownerSVGElement" in e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function $p(e) {
	return Cc(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function em(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/MotionValueState.mjs
var tm = class {
	constructor(e = $.render) {
		this.step = e, this.values = /* @__PURE__ */ new Map(), this.pending = [], this.numPending = 0, this.flush = () => {
			let { pending: e, numPending: t } = this;
			this.numPending = 0;
			for (let n = 0; n < t; n++) e[n]();
		};
	}
	set(e, t, n, r) {
		if (this.values.get(e)?.onRemove(), r) for (let e of this.values.values()) e.value === r && (n = e.render);
		let i = () => n && this.schedule(n);
		t.get() !== void 0 && i();
		let a = t.on("change", i), o = () => {
			a(), n && !r && this.cancel(n), this.values.get(e)?.onRemove === o && this.values.delete(e);
		};
		return this.values.set(e, {
			value: t,
			render: r ? void 0 : n,
			onRemove: o
		}), o;
	}
	get(e) {
		return this.values.get(e)?.value;
	}
	release() {
		let e = /* @__PURE__ */ new Map();
		return this.values.forEach((t, n) => {
			e.set(n, t.value), t.onRemove();
		}), this.transformKeys = this.transformValues = void 0, e;
	}
	schedule(e) {
		let { pending: t, numPending: n } = this;
		for (let r = 0; r < n; r++) if (t[r] === e) return;
		n || this.step(this.flush), t[this.numPending++] = e;
	}
	cancel(e) {
		let { pending: t } = this;
		for (let n = 0; n < this.numPending; n++) if (t[n] === e) {
			t[n] = t[--this.numPending];
			return;
		}
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/effects/utils/create-effect.mjs
function nm(e, { step: t, ...n } = {}) {
	let r = /* @__PURE__ */ new WeakMap();
	return Object.assign((n, i) => {
		let a = r.get(n) ?? new tm(t);
		r.set(n, a);
		let o = [];
		for (let t in i) {
			let r = i[t], s = e(n, a, t, r);
			o.push(s);
		}
		return () => {
			for (let e of o) e();
		};
	}, n, {
		get: (e, t) => r.get(e)?.get(t),
		flush: (e) => r.get(e)?.flush(),
		state: (e) => r.get(e)
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/style/transform.mjs
var rm = {};
function im(e) {
	let t = "", { transformKeys: n = [], transformValues: r = {} } = e;
	for (let e = 0; e < n.length; e++) {
		let i = n[e], a = r[i].getCurrent();
		a !== void 0 && (typeof a == "number" ? a : parseFloat(a)) !== +!!i.startsWith("scale") && (t += (t && " ") + (rm[i] || (rm[i] = (Of[i] || i) + "(")) + Df(a, gd[i]) + ")");
	}
	let i = e.get("pathRotation")?.get();
	return i && (t += (t && " ") + "rotate(" + Df(i, gd.pathRotation) + ")"), t || "none";
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/style/index.mjs
var am = /* @__PURE__ */ new Set([
	"originX",
	"originY",
	"originZ"
]), om = (e, t) => Df(e.get(t)?.get(), _d[t]), sm = (e, t, n, r) => {
	let i, a;
	if (Id.has(n)) {
		if (n !== "pathRotation") {
			let e = t.transformKeys ??= [];
			(t.transformValues ??= {})[n] = r, e.includes(n) || (e.push(n), e.sort((e, t) => Fd.indexOf(e) - Fd.indexOf(t)));
		}
		t.get("transform") || (!Qp(e) && !t.get("transformBox") && sm(e, t, "transformBox", new tp("fill-box")), t.set("transform", new tp("none"), () => {
			jf.get(e)?.check(), e.style.transform = im(t);
		})), a = t.get("transform");
	} else am.has(n) ? (t.get("transformOrigin") || t.set("transformOrigin", new tp(""), () => {
		let n = om(t, "originX") ?? "50%", r = om(t, "originY") ?? "50%", i = om(t, "originZ") ?? 0;
		e.style.transformOrigin = `${n} ${r} ${i}`;
	}), a = t.get("transformOrigin")) : i = $d(n) ? () => {
		e.style.setProperty(n, r.getCurrent());
	} : () => {
		e.style[n] = Df(r.getCurrent(), _d[n]);
	};
	return t.set(n, r, i, a);
}, cm = (e) => Qp(e) || $p(e), lm = (e, t) => {
	if (Id.has(t)) return Nd(e, t);
	let n = getComputedStyle(e), r = $d(t) ? n.getPropertyValue(t) : n[t];
	return typeof r == "string" && r.trim() || 0;
}, um = /*@__PURE__*/ nm(sm, {
	test: cm,
	read: lm
});
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function dm(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (Id.has(e)) o = !0;
		else if (ol(e)) i[e] = n;
		else {
			let t = Df(n, _d[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = Af(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/path.mjs
var fm = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, pm = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function mm(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? fm : pm;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var hm = [
	"transform",
	"opacity",
	"clipPath",
	"filter",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function gm(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (dm(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of hm) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && mm(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/attr/index.mjs
function _m(e, t) {
	if (!(t in e)) return !1;
	let n = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), t) || Object.getOwnPropertyDescriptor(e, t);
	return n && typeof n.set == "function";
}
var vm = (e, t, n, r, i = n) => {
	let a = _m(e, i);
	!a && (i.startsWith("data") || i.startsWith("aria")) && (i = Op(i));
	let o = _d[n] || _d[i], s = a ? () => {
		e[i] = Df(r.get(), _d[n]);
	} : () => {
		let t = Df(r.get(), o);
		t == null ? e.removeAttribute(i) : e.setAttribute(i, String(t));
	};
	return t.set(n, r, s);
};
//#endregion
//#region node_modules/motion-dom/dist/es/effects/svg/index.mjs
function ym(e, t, n, r) {
	return $.render(() => e.setAttribute("pathLength", "1")), n === "pathOffset" ? t.set(n, r, () => {
		let t = r.get();
		e.setAttribute("stroke-dashoffset", `${-t}`);
	}) : (t.get("stroke-dasharray") || t.set("stroke-dasharray", new tp("1 1"), () => {
		let n = t.get("pathLength")?.get() ?? 1, r = t.get("pathSpacing")?.get();
		e.setAttribute("stroke-dasharray", `${n} ${r ?? 1 - Number(n)}`);
	}), t.set(n, r, void 0, t.get("stroke-dasharray")));
}
var bm = /*@__PURE__*/ nm((e, t, n, r) => n.startsWith("path") ? ym(e, t, n, r) : n.startsWith("attr") ? vm(e, t, n, r, xm(n)) : (Id.has(n) || am.has(n) || $d(n) || n in e.style ? sm : vm)(e, t, n, r), {
	test: $p,
	read: (e, t) => Id.has(t) ? _d[t]?.default || 0 : $d(t) || hm.includes(t) ? lm(e, t) || e.getAttribute(Op(t)) || 0 : (t = xm(t), e.getAttribute(Op(t)) ?? e.getAttribute(t) ?? void 0)
});
function xm(e) {
	return e.replace(/^attr([A-Z])/, (e, t) => t.toLowerCase());
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function Sm({ top: e, left: t, right: n, bottom: r }) {
	return {
		x: {
			min: t,
			max: n
		},
		y: {
			min: e,
			max: r
		}
	};
}
function Cm({ x: e, y: t }) {
	return {
		top: t.min,
		right: e.max,
		bottom: t.max,
		left: e.min
	};
}
function wm(e, t) {
	if (!t) return e;
	let n = t({
		x: e.left,
		y: e.top
	}), r = t({
		x: e.right,
		y: e.bottom
	});
	return {
		top: n.y,
		left: n.x,
		bottom: r.y,
		right: r.x
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs
function Tm(e) {
	return e === void 0 || e === 1;
}
function Em({ scale: e, scaleX: t, scaleY: n }) {
	return !Tm(e) || !Tm(t) || !Tm(n);
}
function Dm(e) {
	return Em(e) || Om(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function Om(e) {
	return km(e.x) || km(e.y);
}
function km(e) {
	return e && e !== "0%";
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs
function Am(e, t, n) {
	return n + t * (e - n);
}
function jm(e, t, n, r, i) {
	return i !== void 0 && (e = Am(e, i, r)), Am(e, n, r) + t;
}
function Mm(e, t = 0, n = 1, r, i) {
	e.min = jm(e.min, t, n, r, i), e.max = jm(e.max, t, n, r, i);
}
function Nm(e, { x: t, y: n }) {
	Mm(e.x, t.translate, t.scale, t.originPoint), Mm(e.y, n.translate, n.scale, n.originPoint);
}
var Pm = .999999999999, Fm = 1.0000000000001;
function Im(e, t, n, r = !1) {
	let i = n.length;
	if (!i) return;
	t.x = t.y = 1;
	let a, o;
	for (let s = 0; s < i; s++) {
		a = n[s], o = a.projectionDelta;
		let { visualElement: i } = a.options;
		i && i.props.style && i.props.style.display === "contents" || (r && a.options.layoutScroll && a.scroll && a !== a.root && (Lm(e.x, -a.scroll.offset.x), Lm(e.y, -a.scroll.offset.y)), o && (t.x *= o.x.scale, t.y *= o.y.scale, Nm(e, o)), r && Dm(a.latestValues) && Bm(e, a.latestValues, a.layout?.layoutBox));
	}
	t.x < Fm && t.x > Pm && (t.x = 1), t.y < Fm && t.y > Pm && (t.y = 1);
}
function Lm(e, t) {
	e.min += t, e.max += t;
}
function Rm(e, t, n, r, i = .5) {
	Mm(e, t, n, eu(e.min, e.max, i), r);
}
function zm(e, t) {
	return typeof e == "string" ? parseFloat(e) / 100 * (t.max - t.min) : e;
}
function Bm(e, t, n) {
	let r = n ?? e;
	Rm(e.x, zm(t.x, r.x), t.scaleX, t.scale, t.originX), Rm(e.y, zm(t.y, r.y), t.scaleY, t.scale, t.originY);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function Vm(e, t) {
	return Sm(wm(e.getBoundingClientRect(), t));
}
function Hm(e, t, n) {
	let r = Vm(e, n), { scroll: i } = t;
	return i && (Lm(r.x, i.offset.x), Lm(r.y, i.offset.y)), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/element.mjs
var Um = {}, Wm = (e) => $p(e) ? bm : um, Gm = class {
	constructor(e, t) {
		this.effect = e, this.current = t, this.KeyframeResolver = Up;
	}
	getValue(e) {
		return this.effect.get(this.current, e);
	}
	readValue(e, t) {
		return this.effect.read(this.current, e, t);
	}
	render() {
		this.effect.flush(this.current);
	}
	measureViewportBox() {
		return Vm(this.current);
	}
	getProps() {
		return Um;
	}
};
function Km(e, t, n, r) {
	if (r) return Yp((e) => r.getValue(e, null), t, n, r);
	let i = Wm(e);
	return Xp(i, e, t, n, new Gm(i, e));
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/prop/index.mjs
var qm = /*@__PURE__*/ nm((e, t, n, r) => t.set(n, r, () => {
	e[n] = r.get();
}), {
	test: (e) => Cc(e),
	read: (e, t) => {
		let n = e[t];
		return typeof n == "string" || typeof n == "number" ? n : void 0;
	}
}), { schedule: Jm, cancel: Ym } = /* @__PURE__ */ bu(queueMicrotask, !1), Xm = {
	x: !1,
	y: !1
};
function Zm() {
	return Xm.x || Xm.y;
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function Qm(e) {
	return e === "x" || e === "y" ? Xm[e] ? null : (Xm[e] = !0, () => {
		Xm[e] = !1;
	}) : Xm.x || Xm.y ? null : (Xm.x = Xm.y = !0, () => {
		Xm.x = Xm.y = !1;
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function $m(e, t) {
	let n = em(e), r = new AbortController();
	return [
		n,
		{
			passive: !0,
			...t,
			signal: r.signal
		},
		() => r.abort()
	];
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/hover.mjs
function eh(e) {
	return !(e.pointerType === "touch" || Zm());
}
function th(e, t, n = {}) {
	let [r, i, a] = $m(e, n);
	return r.forEach((e) => {
		let n = !1, r = !1, a, o = () => {
			e.removeEventListener("pointerleave", u);
		}, s = (e) => {
			a &&= (a(e), void 0), o();
		}, c = (e) => {
			n = !1, window.removeEventListener("pointerup", c), window.removeEventListener("pointercancel", c), r && (r = !1, s(e));
		}, l = () => {
			n = !0, window.addEventListener("pointerup", c, i), window.addEventListener("pointercancel", c, i);
		}, u = (e) => {
			e.pointerType !== "touch" && (n ? r = !0 : s(e));
		};
		e.addEventListener("pointerenter", (n) => {
			if (!eh(n)) return;
			r = !1;
			let o = t(e, n);
			typeof o == "function" && (a = o, e.addEventListener("pointerleave", u, i));
		}, i), e.addEventListener("pointerdown", l, i);
	}), a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
var nh = (e, t) => t ? e === t || nh(e, t.parentElement) : !1, rh = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, ih = /* @__PURE__ */ new Set([
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"A"
]);
function ah(e) {
	return ih.has(e.tagName) || e.isContentEditable === !0;
}
var oh = /* @__PURE__ */ new Set([
	"INPUT",
	"SELECT",
	"TEXTAREA"
]);
function sh(e) {
	return oh.has(e.tagName) || e.isContentEditable === !0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs
var ch = /* @__PURE__ */ new WeakSet();
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
function lh(e) {
	return (t) => {
		t.key === "Enter" && e(t);
	};
}
function uh(e, t) {
	e.dispatchEvent(new PointerEvent("pointer" + t, {
		isPrimary: !0,
		bubbles: !0
	}));
}
var dh = (e, t) => {
	let n = e.currentTarget;
	if (!n) return;
	let r = lh(() => {
		if (ch.has(n)) return;
		uh(n, "down");
		let e = lh(() => {
			uh(n, "up");
		});
		n.addEventListener("keyup", e, t), n.addEventListener("blur", () => uh(n, "cancel"), t);
	});
	n.addEventListener("keydown", r, t), n.addEventListener("blur", () => n.removeEventListener("keydown", r), t);
};
//#endregion
//#region node_modules/motion-dom/dist/es/gestures/press/index.mjs
function fh(e) {
	return rh(e) && !Zm();
}
var ph = /* @__PURE__ */ new WeakSet();
function mh(e, t, n = {}) {
	let [r, i, a] = $m(e, n), o = (e) => {
		let r = e.currentTarget;
		if (!fh(e) || ph.has(e)) return;
		ch.add(r), n.stopPropagation && ph.add(e);
		let a = t(r, e), o = {
			...i,
			capture: !0
		}, s = (e, t) => {
			window.removeEventListener("pointerup", c, o), window.removeEventListener("pointercancel", l, o), ch.has(r) && ch.delete(r), fh(e) && typeof a == "function" && a(e, { success: t });
		}, c = (e) => {
			s(e, r === window || r === document || n.useGlobalTarget || nh(r, e.target));
		}, l = (e) => {
			s(e, !1);
		};
		window.addEventListener("pointerup", c, o), window.addEventListener("pointercancel", l, o);
	};
	return r.forEach((e) => {
		(n.useGlobalTarget ? window : e).addEventListener("pointerdown", o, i), Qp(e) && (e.addEventListener("focus", (e) => dh(e, i)), !ah(e) && !e.hasAttribute("tabindex") && (e.tabIndex = 0));
	}), a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/handle-element.mjs
var hh = /* @__PURE__ */ new WeakMap(), gh, _h = (e, t, n) => (r, i) => i && i[0] ? i[0][e + "Size"] : $p(r) && "getBBox" in r ? r.getBBox()[t] : r[n], vh = /*@__PURE__*/ _h("inline", "width", "offsetWidth"), yh = /*@__PURE__*/ _h("block", "height", "offsetHeight");
function bh({ target: e, borderBoxSize: t }) {
	hh.get(e)?.forEach((n) => {
		n(e, {
			get width() {
				return vh(e, t);
			},
			get height() {
				return yh(e, t);
			}
		});
	});
}
function xh(e) {
	e.forEach(bh);
}
function Sh() {
	typeof ResizeObserver < "u" && (gh = new ResizeObserver(xh));
}
function Ch(e, t) {
	gh || Sh();
	let n = em(e);
	return n.forEach((e) => {
		let n = hh.get(e);
		n || (n = /* @__PURE__ */ new Set(), hh.set(e, n)), n.add(t), gh?.observe(e);
	}), () => {
		n.forEach((e) => {
			let n = hh.get(e);
			n?.delete(t), n?.size || gh?.unobserve(e);
		});
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/handle-window.mjs
var wh = /* @__PURE__ */ new Set(), Th;
function Eh() {
	Th = () => {
		let e = {
			get width() {
				return window.innerWidth;
			},
			get height() {
				return window.innerHeight;
			}
		};
		wh.forEach((t) => t(e));
	}, window.addEventListener("resize", Th);
}
function Dh(e) {
	return wh.add(e), Th || Eh(), () => {
		wh.delete(e), !wh.size && typeof Th == "function" && (window.removeEventListener("resize", Th), Th = void 0);
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/index.mjs
function Oh(e, t) {
	return typeof e == "function" ? Dh(e) : Ch(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/stats/buffer.mjs
var kh = {
	value: null,
	addProjectionMetrics: null
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function Ah(e) {
	return $p(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/as-number.mjs
var jh = (e) => typeof e == "number" ? e : parseFloat(e), Mh = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
}), Nh = () => ({
	x: Mh(),
	y: Mh()
}), Ph = () => ({
	min: 0,
	max: 0
}), Fh = () => ({
	x: Ph(),
	y: Ph()
}), Ih = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function Lh(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function Rh(e) {
	return typeof e == "string" || Array.isArray(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/variant-props.mjs
var zh = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
], Bh = ["initial", ...zh];
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function Vh(e) {
	if (Lh(e.animate)) return !0;
	for (let t = 0; t < Bh.length; t++) if (Rh(e[Bh[t]])) return !0;
	return !1;
}
function Hh(e) {
	return !!(Vh(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function Uh(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if (Tp(i)) e.addValue(r, i);
		else if (Tp(a)) e.addValue(r, np(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, np(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var Wh = { current: null }, Gh = { current: !1 }, Kh = typeof window < "u";
function qh() {
	if (Gh.current = !0, Kh) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => Wh.current = e.matches;
			e.addEventListener("change", t), t();
		} else Wh.current = !1;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var Jh = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], Yh = {};
function Xh(e) {
	Yh = e;
}
function Zh() {
	return Yh;
}
var Qh = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Qd, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = rl.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, $.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = Vh(t), this.isVariantNode = Hh(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && Tp(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		if (this.current = e, Ih.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.isVariantNode && !this.isControllingVariants) {
			let e = this;
			do
				e = e.props.inherit !== !1 && e.parent;
			while (e && !e.isVariantNode);
			if (e) {
				let { variantChildren: t } = e;
				t.add(this), this.removeFromVariantTree = () => t.delete(this);
			}
		}
		this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Gh.current || qh(), this.shouldReduceMotion = Wh.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), xu(this.notifyUpdate), xu(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
		for (let e in this.events) this.events[e].clear();
		for (let e in this.features) {
			let t = this.features[e];
			t && (t.unmount(), t.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
	}
	bindToMotionValue(e, t) {
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && xf.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new ff({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ Ac(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = Id.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && $.preRender(this.notifyUpdate), n && (this.projection && (this.projection.isTransformDirty = !0), jf.get(this.current)?.check()), this.scheduleRender();
		}), i;
		typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)), this.valueSubscriptions.set(e, () => {
			r(), i && i();
		});
	}
	sortNodePosition(e) {
		return !this.current || !e.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in Yh) {
			let t = Yh[e];
			if (!t) continue;
			let { isEnabled: n, Feature: r } = t;
			if (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e]) {
				let t = this.features[e];
				t.isMounted ? t.update() : (t.mount(), t.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Fh();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		let { transformTemplate: n, onUpdate: r } = this.props;
		(e.transformTemplate || n) && this.scheduleRender(), (e.transformTemplate && !n || e.onUpdate && !r) && jf.get(this.current)?.demote(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < Jh.length; t++) {
			let n = Jh[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = Uh(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants ? this.props.variants[e] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	addValue(e, t) {
		let n = this.values.get(e);
		if (t !== n) {
			n && this.removeValue(e), this.bindToMotionValue(e, t), this.values.set(e, t);
			let r = t.get();
			r !== void 0 && (this.latestValues[e] = r);
		}
	}
	removeValue(e) {
		this.values.delete(e);
		let t = this.valueSubscriptions.get(e);
		t && (t(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, t) {
		if (this.props.values && this.props.values[e]) return this.props.values[e];
		let n = this.values.get(e);
		return n === void 0 && t !== void 0 && (n = np(t ?? this.getDefaultValue?.(e), { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (Sc(n) || wc(n)) ? n = parseFloat(n) : typeof n != "number" && !Xl.test(n) && Xl.test(t) && (n = xd(e, t)), this.setBaseTarget(e, Tp(n) ? n.get() : n)), Tp(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new kc()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		Jm.render(this.render);
	}
}, $h = class extends Qh {
	constructor() {
		super(...arguments), this.KeyframeResolver = Up;
	}
	sortInstanceNodePosition(e, t) {
		return e.compareDocumentPosition(t) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, t) {
		let n = e.style;
		return n ? n[t] : void 0;
	}
	removeValueFromRenderState(e, { vars: t, style: n }) {
		delete t[e], delete n[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		Tp(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
}, eg = class {
	constructor(e) {
		this.isMounted = !1, this.node = e;
	}
	update() {}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function tg(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs
var ng = {};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function rg(e, { layout: t, layoutId: n }) {
	return Id.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!ng[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function ig(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) (Tp(r[t]) || i && Tp(i[t]) || rg(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function ag(e) {
	return window.getComputedStyle(e);
}
var og = class extends $h {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = tg;
	}
	mount(e) {
		e.style, super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (Id.has(t)) return this.projection?.isProjecting ? jd(t) : Nd(e, t);
		{
			let n = ag(e), r = (ol(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return Vm(e, t);
	}
	build(e, t, n) {
		dm(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return ig(e, t, n);
	}
}, sg = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]), cg = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function lg(e, t, n, r) {
	tg(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(sg.has(n) ? n : Op(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function ug(e, t, n) {
	let r = ig(e, t, n);
	for (let n in e) if (n !== "children" && (Tp(e[n]) || Tp(t[n]))) {
		let t = Fd.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var dg = class extends $h {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Fh;
	}
	getBaseTargetFromProps(e, t) {
		return Id.has(t) ? super.getBaseTargetFromProps(e, t) ?? jd(t) : e[t];
	}
	getDefaultValue(e) {
		return Id.has(e) ? this.latestValues[e] ?? jd(e) : void 0;
	}
	readValueFromInstance(e, t) {
		if (Id.has(t)) {
			let e = yd(t);
			return e && e.default || 0;
		}
		if (hm.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = sg.has(t) ? t : Op(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return ug(e, t, n);
	}
	build(e, t, n) {
		gm(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		lg(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = cg(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/shallow-compare.mjs
function fg(e, t) {
	if (!Array.isArray(t)) return !1;
	let n = t.length;
	if (n !== e.length) return !1;
	for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
	return !0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/animation-state.mjs
var pg = [...zh].reverse();
function mg(e) {
	let t = (t) => Promise.all(t.map(({ animation: t, options: n }) => Fp(e, t, n))), n = gg(), r = !0, i = !1;
	function a(a) {
		let { props: o, parent: s, manuallyAnimateOnMount: c } = e, l = r || i, u = [], d = /* @__PURE__ */ new Set(), f = {}, p = Infinity, m = e;
		do
			m = m.props.inherit !== !1 && m.parent;
		while (m && !m.isControllingVariants);
		if (pg.forEach((t, r) => {
			let i = n[t], h = o[t], g = m && m.props[t], _ = h === void 0 ? Rh(g) || g === !1 ? g : void 0 : h, v = Rh(_), y = t === a ? i.isActive : null;
			y === !1 && (p = r);
			let b = v && h === void 0 && !(l && c);
			if (i.protectedKeys = { ...f }, !i.isActive && y === null || !_ && !i.prevProp || Lh(_) || typeof _ == "boolean") return;
			if (t === "exit" && i.isActive && y !== !0) {
				f = {
					...f,
					...i.prevResolvedValues
				};
				return;
			}
			let x = hg(i.prevProp, _), S = x || v && (y && !b || r > p), C = !1, w = Array.isArray(_) ? _ : [_], T = {};
			if (y !== !1) for (let n of w) {
				let { transition: r, transitionEnd: i, ...a } = vp(e, n, yp(e, t)) || {};
				T = {
					...T,
					...a,
					...i
				};
			}
			let { prevResolvedValues: E } = i;
			for (let t in {
				...E,
				...T
			}) {
				if (t in f) continue;
				let n = T[t], r = E[t], a = Array.isArray(n) && Array.isArray(r) ? !fg(n, r) || x : n !== r;
				if (a && n == null) d.add(t);
				else if (a || n !== void 0 && d.has(t)) {
					S = !0, d.delete(t) && (C = !0), i.needsAnimating[t] = !0;
					let n = e.getValue(t);
					n && (n.liveStyle = !1);
				} else i.protectedKeys[t] = !0;
			}
			if (i.prevProp = _, i.prevResolvedValues = T, i.isActive && (f = {
				...f,
				...T
			}), S && (!(b && x) || C)) for (let n of w) {
				let r = { type: t };
				if (typeof n == "string" && l && c && s?.enteringChildren) {
					let t = vp(s, n)?.transition?.delayChildren;
					r.delay = Zf(s.enteringChildren, e, t);
				}
				u.push({
					animation: n,
					options: r
				});
			}
		}), d.size) {
			let { initial: t } = o, n = {}, r = typeof t != "boolean" && vp(e, Array.isArray(t) ? t[0] : t, e.presenceContext?.custom);
			r && r.transition && (n.transition = r.transition), d.forEach((i) => {
				let a = e.getValue(i);
				a && (a.liveStyle = !0);
				let s = r && !Array.isArray(t) ? r[i] : void 0, c = e.getBaseTargetFromProps(o, i);
				n[i] = (s === void 0 ? c !== void 0 && !Tp(c) ? c : e.initialValues[i] === void 0 ? e.baseTarget[i] : void 0 : s) ?? null;
			}), u.push({ animation: n });
		}
		let h = l && e.blockInitialAnimation || r && !c && (o.initial === !1 || o.initial === o.animate);
		return r = i = !1, !h && u.length ? t(u) : Promise.resolve();
	}
	function o(t, r) {
		if (n[t].isActive === r) return Promise.resolve();
		e.variantChildren?.forEach((e) => e.animationState?.setActive(t, r)), n[t].isActive = r;
		let i = a(t);
		for (let e in n) n[e].protectedKeys = {};
		return i;
	}
	return {
		animateChanges: a,
		setActive: o,
		setAnimateFunction: (n) => {
			t = n(e);
		},
		getState: () => n,
		reset: () => {
			n = gg(), i = !0;
		}
	};
}
function hg(e, t) {
	return typeof t == "string" ? t !== e : Array.isArray(t) ? !fg(t, e) : !1;
}
function gg() {
	let e = {};
	for (let t of zh) e[t] = {
		isActive: t === "animate",
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {}
	};
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/copy.mjs
function _g(e, t) {
	e.min = t.min, e.max = t.max;
}
function vg(e, t) {
	_g(e.x, t.x), _g(e.y, t.y);
}
function yg(e, t) {
	e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/delta-calc.mjs
var bg = .9999, xg = 1.0001, Sg = -.01, Cg = .01;
function wg(e) {
	return e.max - e.min;
}
function Tg(e, t, n) {
	return Math.abs(e - t) <= n;
}
function Eg(e, t, n, r = .5) {
	e.origin = r, e.originPoint = eu(t.min, t.max, e.origin), e.scale = wg(n) / wg(t), e.translate = eu(n.min, n.max, e.origin) - e.originPoint, (e.scale >= bg && e.scale <= xg || isNaN(e.scale)) && (e.scale = 1), (e.translate >= Sg && e.translate <= Cg || isNaN(e.translate)) && (e.translate = 0);
}
function Dg(e, t, n, r) {
	Eg(e.x, t.x, n.x, r ? r.originX : void 0), Eg(e.y, t.y, n.y, r ? r.originY : void 0);
}
function Og(e, t, n, r = 0) {
	e.min = (r ? eu(n.min, n.max, r) : n.min) + t.min, e.max = e.min + wg(t);
}
function kg(e, t, n, r) {
	Og(e.x, t.x, n.x, r?.x), Og(e.y, t.y, n.y, r?.y);
}
function Ag(e, t, n, r = 0) {
	let i = r ? eu(n.min, n.max, r) : n.min;
	e.min = t.min - i, e.max = e.min + wg(t);
}
function jg(e, t, n, r) {
	Ag(e.x, t.x, n.x, r?.x), Ag(e.y, t.y, n.y, r?.y);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/delta-remove.mjs
function Mg(e, t, n, r, i) {
	return e -= t, e = Am(e, 1 / n, r), i !== void 0 && (e = Am(e, 1 / i, r)), e;
}
function Ng(e, t = 0, n = 1, r = .5, i, a = e, o = e) {
	if (El.test(t) && (t = parseFloat(t), t = eu(o.min, o.max, t / 100) - o.min), typeof t != "number") return;
	let s = eu(a.min, a.max, r);
	e === a && (s -= t), e.min = Mg(e.min, t, n, s, i), e.max = Mg(e.max, t, n, s, i);
}
function Pg(e, t, [n, r, i], a, o) {
	Ng(e, t[n], t[r], t[i], t.scale, a, o);
}
var Fg = [
	"x",
	"scaleX",
	"originX"
], Ig = [
	"y",
	"scaleY",
	"originY"
];
function Lg(e, t, n, r) {
	Pg(e.x, t, Fg, n ? n.x : void 0, r ? r.x : void 0), Pg(e.y, t, Ig, n ? n.y : void 0, r ? r.y : void 0);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/utils.mjs
function Rg(e) {
	return e.translate === 0 && e.scale === 1;
}
function zg(e) {
	return Rg(e.x) && Rg(e.y);
}
function Bg(e, t) {
	return e.min === t.min && e.max === t.max;
}
function Vg(e, t) {
	return Bg(e.x, t.x) && Bg(e.y, t.y);
}
function Hg(e, t) {
	return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function Ug(e, t) {
	return Hg(e.x, t.x) && Hg(e.y, t.y);
}
function Wg(e) {
	return wg(e.x) / wg(e.y);
}
function Gg(e, t) {
	return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/each-axis.mjs
function Kg(e) {
	return [e("x"), e("y")];
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function qg(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var Jg = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (Q.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${qg(e, t.target.x)}% ${qg(e, t.target.y)}%`;
} }, Yg = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = Xl.parse(e);
	if (i.length > 5) return r;
	let a = Xl.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = eu(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} };
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/transform.mjs
function Xg(e, t, n) {
	let r = "", i = e.x.translate / t.x, a = e.y.translate / t.y, o = n?.z || 0;
	if ((i || a || o) && (r = `translate3d(${i}px, ${a}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
		let { transformPerspective: e, rotate: t, pathRotation: i, rotateX: a, rotateY: o, skewX: s, skewY: c } = n;
		e && (r = `perspective(${e}px) ${r}`), t && (r += `rotate(${t}deg) `), i && (r += `rotate(${i}deg) `), a && (r += `rotateX(${a}deg) `), o && (r += `rotateY(${o}deg) `), s && (r += `skewX(${s}deg) `), c && (r += `skewY(${c}deg) `);
	}
	let s = e.x.scale * t.x, c = e.y.scale * t.y;
	return (s !== 1 || c !== 1) && (r += `scale(${s}, ${c})`), r || "none";
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/animation/mix-values.mjs
var Zg = Wp.length, Qg = (e) => typeof e == "number" || Q.test(e);
function $g(e, t, n, r, i, a) {
	i ? (e.opacity = eu(0, n.opacity ?? 1, t_(r)), e.opacityExit = eu(t.opacity ?? 1, 0, n_(r))) : a && (e.opacity = eu(t.opacity ?? 1, n.opacity ?? 1, r));
	for (let i = 0; i < Zg; i++) {
		let a = Wp[i], o = e_(t, a), s = e_(n, a);
		(o !== void 0 || s !== void 0) && (o ||= 0, s ||= 0, o === 0 || s === 0 || Qg(o) === Qg(s) ? (e[a] = Math.max(eu(jh(o), jh(s), r), 0), (El.test(s) || El.test(o)) && (e[a] += "%")) : e[a] = s);
	}
	(t.rotate || n.rotate) && (e.rotate = eu(t.rotate || 0, n.rotate || 0, r));
}
function e_(e, t) {
	return e[t] === void 0 ? e.borderRadius : e[t];
}
var t_ = /*@__PURE__*/ r_(0, .5, Uc), n_ = /*@__PURE__*/ r_(.5, .95, Ec);
function r_(e, t, n) {
	return (r) => r < e ? 0 : r > t ? 1 : n(/* @__PURE__ */ Oc(e, t, r));
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function i_(e, t, n) {
	let r = Tp(e) ? e : np(e);
	return r.start(fp("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/motion-dom/dist/es/events/add-dom-event.mjs
function a_(e, t, n, r = { passive: !0 }) {
	return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/compare-by-depth.mjs
var o_ = (e, t) => e.depth - t.depth, s_ = class {
	constructor() {
		this.children = [], this.isDirty = !1;
	}
	add(e) {
		vc(this.children, e), this.isDirty = !0;
	}
	remove(e) {
		yc(this.children, e), this.isDirty = !0;
	}
	forEach(e) {
		this.isDirty && this.children.sort(o_), this.isDirty = !1, this.children.forEach(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/delay.mjs
function c_(e, t) {
	let n = rl.now(), r = ({ timestamp: i }) => {
		let a = i - n;
		a >= t && (xu(r), e(a - t));
	};
	return $.setup(r, !0), () => xu(r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/resolve-motion-value.mjs
function l_(e) {
	return Tp(e) ? e.get() : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/shared/stack.mjs
var u_ = class {
	constructor() {
		this.members = [];
	}
	add(e) {
		vc(this.members, e);
		for (let t = this.members.length - 1; t >= 0; t--) {
			let n = this.members[t];
			if (n === e || n === this.lead || n === this.prevLead) continue;
			let r = n.instance;
			(!r || r.isConnected === !1) && !n.snapshot && (yc(this.members, n), n.unmount());
		}
		e.scheduleRender();
	}
	remove(e) {
		if (yc(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
			let e = this.members[this.members.length - 1];
			e && this.promote(e);
		}
	}
	relegate(e) {
		for (let t = this.members.indexOf(e) - 1; t >= 0; t--) {
			let e = this.members[t];
			if (e.isPresent !== !1 && e.instance?.isConnected !== !1) return this.promote(e), !0;
		}
		return !1;
	}
	promote(e, t) {
		let n = this.lead;
		if (e !== n && (this.prevLead = n, this.lead = e, e.show(), n)) {
			n.updateSnapshot(), e.scheduleRender();
			let { layoutDependency: r } = n.options, { layoutDependency: i } = e.options;
			(r === void 0 || r !== i) && (e.resumeFrom = n, t && (n.preserveOpacity = !0), n.snapshot && (e.snapshot = n.snapshot, e.snapshot.latestValues = n.animationValues || n.latestValues), e.root?.isUpdating && (e.isLayoutDirty = !0)), e.options.crossfade === !1 && n.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((e) => {
			e.options.onExitComplete?.(), e.resumingFrom?.options.onExitComplete?.();
		});
	}
	scheduleRender() {
		this.members.forEach((e) => e.instance && e.scheduleRender(!1));
	}
	removeLeadSnapshot() {
		this.lead?.snapshot && (this.lead.snapshot = void 0);
	}
}, d_ = {
	borderRadius: {
		...Jg,
		applyTo: [...Wp]
	},
	borderTopLeftRadius: Jg,
	borderTopRightRadius: Jg,
	borderBottomLeftRadius: Jg,
	borderBottomRightRadius: Jg,
	boxShadow: Yg
}, f_ = {
	hasAnimatedSinceResize: !0,
	hasEverUpdated: !1
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/node/create-projection-node.mjs
Object.assign(ng, {
	...d_,
	...ng
});
var p_ = {
	nodes: 0,
	calculatedTargetDeltas: 0,
	calculatedProjections: 0
}, m_ = [
	"",
	"X",
	"Y",
	"Z"
], h_ = 1e3, g_ = 0;
function __(e, t, n, r) {
	let { latestValues: i } = t;
	i[e] && (n[e] = i[e], t.setStaticValue(e, 0), r && (r[e] = 0));
}
var v_ = ({ instance: e }) => e && jf.get(e)?.demote();
function y_(e) {
	if (e.hasCheckedOptimisedAppear = !0, e.root === e) return;
	let { visualElement: t } = e.options;
	if (!t) return;
	let n = Ap(t);
	if (window.MotionHasOptimisedAnimation(n, "transform")) {
		let { layout: t, layoutId: r } = e.options;
		window.MotionCancelOptimisedAnimation(n, "transform", $, !(t || r));
	}
	let { parent: r } = e;
	r && !r.hasCheckedOptimisedAppear && y_(r);
}
function b_({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i }) {
	return class {
		constructor(e = {}, n = t?.()) {
			this.id = g_++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
				x: 1,
				y: 1
			}, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
				this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
			}, this.updateProjection = () => {
				this.projectionUpdateScheduled = !1, kh.value && (p_.nodes = p_.calculatedTargetDeltas = p_.calculatedProjections = 0), this.nodes.forEach(C_), this.nodes.forEach(P_), this.nodes.forEach(F_), this.nodes.forEach(w_), kh.addProjectionMetrics && kh.addProjectionMetrics(p_);
			}, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = e, this.root = n ? n.root || n : this, this.path = n ? [...n.path, n] : [], this.parent = n, this.depth = n ? n.depth + 1 : 0;
			for (let e = 0; e < this.path.length; e++) this.path[e].shouldResetTransform = !0;
			this.root === this && (this.nodes = new s_());
		}
		addEventListener(e, t) {
			return this.eventHandlers.has(e) || this.eventHandlers.set(e, new kc()), this.eventHandlers.get(e).add(t);
		}
		notifyListeners(e, ...t) {
			let n = this.eventHandlers.get(e);
			n && n.notify(...t);
		}
		hasListeners(e) {
			return this.eventHandlers.has(e);
		}
		mount(t) {
			if (this.instance) return;
			this.isSVG = $p(t) && !Ah(t), this.instance = t;
			let { layoutId: n, layout: r, visualElement: i } = this.options;
			if (i && !i.current && i.mount(t), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (r || n) && (this.isLayoutDirty = !0), e) {
				let n, r = 0, i = () => this.root.updateBlockedByResize = !1;
				$.read(() => {
					r = window.innerWidth;
				}), e(t, () => {
					let e = window.innerWidth;
					e !== r && (r = e, this.root.updateBlockedByResize = !0, n && n(), n = c_(i, 250), f_.hasAnimatedSinceResize && (f_.hasAnimatedSinceResize = !1, this.nodes.forEach(N_)));
				});
			}
			n && this.root.registerSharedNode(n, this), this.options.animate !== !1 && i && (n || r) && this.addEventListener("didUpdate", ({ delta: e, hasLayoutChanged: t, hasRelativeLayoutChanged: n, layout: r }) => {
				if (this.isAnimationBlocked) {
					this.target = void 0, this.relativeTarget = void 0;
					return;
				}
				let a = this.options.transition || i.getDefaultTransition() || H_, { onLayoutAnimationStart: o, onLayoutAnimationComplete: s } = i.getProps(), c = !this.targetLayout || !Ug(this.targetLayout, r), l = !t && n;
				if (this.options.layoutRoot || this.resumeFrom || l || t && (c || !this.currentAnimation)) {
					this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
					let t = {
						...ip(a, "layout"),
						onPlay: o,
						onComplete: s
					};
					(i.shouldReduceMotion || this.options.layoutRoot) && (t.delay = 0, t.type = !1), this.startAnimation(t), this.setAnimationOrigin(e, l, t.path);
				} else t || N_(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
				this.targetLayout = r;
			});
		}
		unmount() {
			this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
			let e = this.getStack();
			e && e.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), xu(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = !0;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = !1;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		startUpdate() {
			this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(I_), this.animationId++);
		}
		getTransformTemplate() {
			let { visualElement: e } = this.options;
			return e && e.getProps().transformTemplate;
		}
		willUpdate(e = !0) {
			if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && y_(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
			v_(this), this.isLayoutDirty = !0;
			for (let e = 0; e < this.path.length; e++) {
				let t = this.path[e];
				t.shouldResetTransform = !0, v_(t), (typeof t.latestValues.x == "string" || typeof t.latestValues.y == "string") && (t.isLayoutDirty = !0), t.updateScroll("snapshot"), t.options.layoutRoot && t.willUpdate(!1), t.isAnimationBlocked && (t.dragSnapshot ||= t.measure(), this.dragAncestor = t);
			}
			let { layoutId: t, layout: n } = this.options;
			if (t === void 0 && !n) return;
			let r = this.getTransformTemplate();
			this.prevTransformTemplateValue = r ? r(this.latestValues, "") : void 0, this.updateSnapshot(), e && this.notifyListeners("willUpdate");
		}
		update() {
			if (this.updateScheduled = !1, this.isUpdateBlocked()) {
				let e = this.updateBlockedByResize;
				this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), e && this.nodes.forEach(D_), this.nodes.forEach(E_);
				return;
			}
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(O_);
				return;
			}
			this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(A_), this.nodes.forEach(j_), this.nodes.forEach(M_), this.nodes.forEach(x_), this.nodes.forEach(S_)) : this.nodes.forEach(O_), this.clearAllSnapshots();
			let e = rl.now();
			el.delta = bc(0, 1e3 / 60, e - el.timestamp), el.timestamp = e, el.isProcessing = !0, Su.update.process(el), Su.preRender.process(el), Su.render.process(el), el.isProcessing = !1;
		}
		didUpdate() {
			this.updateScheduled || (this.updateScheduled = !0, Jm.read(this.scheduleUpdate));
		}
		clearAllSnapshots() {
			this.nodes.forEach(T_), this.sharedNodes.forEach(L_);
		}
		scheduleUpdateProjection() {
			this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, $.preRender(this.updateProjection, !1, !0));
		}
		scheduleCheckAfterUnmount() {
			$.postRender(() => {
				this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
			});
		}
		updateSnapshot() {
			!this.snapshot && this.instance && (this.snapshot = this.measure(), this.snapshot && !wg(this.snapshot.measuredBox.x) && !wg(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
		}
		updateLayout() {
			if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
			if (this.resumeFrom && !this.resumeFrom.instance) for (let e = 0; e < this.path.length; e++) this.path[e].updateScroll();
			let e = this.layout;
			this.layout = this.measure(!1), this.layoutCorrected ||= Fh(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
			let { visualElement: t } = this.options;
			t && t.notify("LayoutMeasure", this.layout.layoutBox, e ? e.layoutBox : void 0);
		}
		updateScroll(e = "measure") {
			let t = !!(this.options.layoutScroll && this.instance);
			if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === e && (t = !1), t && this.instance) {
				let t = r(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase: e,
					isRoot: t,
					offset: n(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : t
				};
			}
		}
		resetTransform() {
			if (!i) return;
			let e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
			e && v_(this);
			let t = this.projectionDelta && !zg(this.projectionDelta), n = this.getTransformTemplate(), r = n ? n(this.latestValues, "") : void 0, a = r !== this.prevTransformTemplateValue;
			e && this.instance && (t || Dm(this.latestValues) || a) && (i(this.instance, r), this.shouldResetTransform = !1, this.scheduleRender());
		}
		measure(e = !0) {
			let t = this.measurePageBox(), n = this.removeElementScroll(t);
			return e && (n = this.removeTransform(n)), K_(n), {
				animationId: this.root.animationId,
				measuredBox: t,
				layoutBox: n,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			let { visualElement: e } = this.options;
			if (!e) return Fh();
			let t = e.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(J_))) {
				let { scroll: e } = this.root;
				e && (Lm(t.x, e.offset.x), Lm(t.y, e.offset.y));
			}
			return t;
		}
		removeElementScroll(e) {
			let t = Fh();
			if (vg(t, e), this.scroll?.wasRoot) return t;
			for (let n = 0; n < this.path.length; n++) {
				let r = this.path[n], { scroll: i, options: a } = r;
				r !== this.root && i && a.layoutScroll && (i.wasRoot && vg(t, e), Lm(t.x, i.offset.x), Lm(t.y, i.offset.y));
			}
			return t;
		}
		applyTransform(e, t = !1, n) {
			let r = n || Fh();
			vg(r, e);
			for (let e = 0; e < this.path.length; e++) {
				let n = this.path[e];
				!t && n.options.layoutScroll && n.scroll && n !== n.root && (Lm(r.x, -n.scroll.offset.x), Lm(r.y, -n.scroll.offset.y)), Dm(n.latestValues) && Bm(r, n.latestValues, n.layout?.layoutBox);
			}
			return Dm(this.latestValues) && Bm(r, this.latestValues, this.layout?.layoutBox), r;
		}
		removeTransform(e) {
			let t = Fh();
			vg(t, e);
			for (let e = 0; e < this.path.length; e++) {
				let n = this.path[e];
				if (!Dm(n.latestValues)) continue;
				let r;
				n.instance && (Em(n.latestValues) && n.updateSnapshot(), r = Fh(), vg(r, n.measurePageBox())), Lg(t, n.latestValues, n.snapshot?.layoutBox, r);
			}
			return Dm(this.latestValues) && Lg(t, this.latestValues), t;
		}
		setTargetDelta(e) {
			this.targetDelta = e, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
		}
		setOptions(e) {
			this.options = {
				...this.options,
				...e,
				crossfade: e.crossfade === void 0 || e.crossfade
			};
		}
		clearMeasurements() {
			this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
		}
		forceRelativeParentToResolveTarget() {
			this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== el.timestamp && this.relativeParent.resolveTargetDelta(!0);
		}
		resolveTargetDelta(e = !1) {
			let t = this.getLead();
			this.isProjectionDirty ||= t.isProjectionDirty, this.isTransformDirty ||= t.isTransformDirty, this.isSharedProjectionDirty ||= t.isSharedProjectionDirty;
			let n = !!this.resumingFrom || this !== t;
			if (!(e || n && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
			let { layout: r, layoutId: i } = this.options;
			if (!this.layout || !(r || i)) return;
			this.resolvedRelativeTargetAt = el.timestamp;
			let a = this.getClosestProjectingParent();
			!this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && a && a.layout ? this.createRelativeTarget(a, this.layout.layoutBox, a.layout.layoutBox) : this.removeRelativeTarget()), (this.relativeTarget || this.targetDelta) && (this.target || (this.target = Fh(), this.targetWithTransforms = Fh()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), kg(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : vg(this.target, this.layout.layoutBox), Nm(this.target, this.targetDelta)) : vg(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && a && !!a.resumingFrom == !!this.resumingFrom && !a.options.layoutScroll && a.target && this.animationProgress !== 1 ? this.createRelativeTarget(a, this.target, a.target) : this.relativeParent = this.relativeTarget = void 0), kh.value && p_.calculatedTargetDeltas++);
		}
		getClosestProjectingParent() {
			if (!(!this.parent || Em(this.parent.latestValues) || Om(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		createRelativeTarget(e, t, n) {
			this.relativeParent = e, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Fh(), this.relativeTargetOrigin = Fh(), jg(this.relativeTargetOrigin, t, n, this.options.layoutAnchor || void 0), vg(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			let e = this.getLead(), t = !!this.resumingFrom || this !== e, n = !0;
			if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (n = !1), t && (this.isSharedProjectionDirty || this.isTransformDirty) && (n = !1), this.resolvedRelativeTargetAt === el.timestamp && (n = !1), n) return;
			let { layout: r, layoutId: i } = this.options;
			if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(r || i)) return;
			vg(this.layoutCorrected, this.layout.layoutBox);
			let a = this.treeScale.x, o = this.treeScale.y;
			Im(this.layoutCorrected, this.treeScale, this.path, t), e.layout && !e.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (e.target = e.layout.layoutBox, e.targetWithTransforms = Fh());
			let { target: s } = e;
			s ? (!this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (yg(this.prevProjectionDelta.x, this.projectionDelta.x), yg(this.prevProjectionDelta.y, this.projectionDelta.y)), Dg(this.projectionDelta, this.layoutCorrected, s, this.latestValues), (this.treeScale.x !== a || this.treeScale.y !== o || !Gg(this.projectionDelta.x, this.prevProjectionDelta.x) || !Gg(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", s)), kh.value && p_.calculatedProjections++) : this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
		}
		hide() {
			this.isVisible = !1;
		}
		show() {
			this.isVisible = !0;
		}
		scheduleRender(e = !0) {
			if (this.options.visualElement?.scheduleRender(), e) {
				let e = this.getStack();
				e && e.scheduleRender();
			}
			this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
		}
		createProjectionDeltas() {
			this.prevProjectionDelta = Nh(), this.projectionDelta = Nh(), this.projectionDeltaWithTransform = Nh();
		}
		setAnimationOrigin(e, t = !1, n) {
			let r = this.snapshot, i = r ? r.latestValues : {}, a = { ...this.latestValues }, o = Nh();
			(!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !t;
			let s = Fh(), c = (r ? r.source : void 0) !== (this.layout ? this.layout.source : void 0), l = this.getStack(), u = !l || l.members.length <= 1, d = !(!c || u || this.options.crossfade !== !0 || this.path.some(V_));
			this.animationProgress = 0;
			let f, p = n?.interpolateProjection(e);
			this.mixTargetDelta = (t) => {
				let n = t / 1e3, r = p?.(n);
				r ? (o.x.translate = r.x, o.x.scale = eu(e.x.scale, 1, n), o.x.origin = e.x.origin, o.x.originPoint = e.x.originPoint, o.y.translate = r.y, o.y.scale = eu(e.y.scale, 1, n), o.y.origin = e.y.origin, o.y.originPoint = e.y.originPoint) : (R_(o.x, e.x, n), R_(o.y, e.y, n)), this.setTargetDelta(o), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (jg(s, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), B_(this.relativeTarget, this.relativeTargetOrigin, s, n), f && Vg(this.relativeTarget, f) && (this.isProjectionDirty = !1), f ||= Fh(), vg(f, this.relativeTarget)), c && (this.animationValues = a, $g(a, i, this.latestValues, n, d, u)), r && r.rotate !== void 0 && (this.animationValues ||= a, this.animationValues.pathRotation = r.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = n;
			}, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(e) {
			this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation &&= (xu(this.pendingAnimation), void 0), this.pendingAnimation = $.update(() => {
				f_.hasAnimatedSinceResize = !0, this.motionValue ||= np(0), this.motionValue.jump(0, !1), this.currentAnimation = i_(this.motionValue, [0, 1e3], {
					...e,
					velocity: 0,
					isSync: !0,
					onUpdate: (t) => {
						this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
					},
					onComplete: () => {
						e.onComplete && e.onComplete(), this.completeAnimation();
					}
				}), ad(this.currentAnimation, this), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
			let e = this.getStack();
			e && e.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(h_), this.currentAnimation.stop()), this.completeAnimation();
		}
		applyTransformsToTarget() {
			let e = this.getLead(), { targetWithTransforms: t, layout: n, latestValues: r } = e, { target: i } = e;
			if (t && i && n) {
				if (this !== e && this.layout && n && q_(this.options.animationType, this.layout.layoutBox, n.layoutBox)) {
					i = this.target || Fh();
					let t = wg(this.layout.layoutBox.x);
					i.x.min = e.target.x.min, i.x.max = i.x.min + t;
					let n = wg(this.layout.layoutBox.y);
					i.y.min = e.target.y.min, i.y.max = i.y.min + n;
				}
				vg(t, i), Bm(t, r), Dg(this.projectionDeltaWithTransform, this.layoutCorrected, t, r);
			}
		}
		registerSharedNode(e, t) {
			this.sharedNodes.has(e) || this.sharedNodes.set(e, new u_()), this.sharedNodes.get(e).add(t);
			let n = t.options.initialPromotionConfig;
			t.promote({
				transition: n ? n.transition : void 0,
				preserveFollowOpacity: n && n.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(t) : void 0
			});
		}
		isLead() {
			let e = this.getStack();
			return !e || e.lead === this;
		}
		getLead() {
			let { layoutId: e } = this.options;
			return e && this.getStack()?.lead || this;
		}
		getPrevLead() {
			let { layoutId: e } = this.options;
			return e ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			let { layoutId: e } = this.options;
			if (e) return this.root.sharedNodes.get(e);
		}
		promote({ needsReset: e, transition: t, preserveFollowOpacity: n } = {}) {
			let r = this.getStack();
			r && r.promote(this, n), e && (this.projectionDelta = void 0, this.needsReset = !0), t && this.setOptions({ transition: t });
		}
		relegate() {
			let e = this.getStack();
			return e ? e.relegate(this) : !1;
		}
		resetSkewAndRotation() {
			let { visualElement: e } = this.options;
			if (!e) return;
			let t = !1, { latestValues: n } = e;
			if ((n.z || n.rotate || n.rotateX || n.rotateY || n.rotateZ || n.skewX || n.skewY) && (t = !0), !t) return;
			let r = {};
			n.z && __("z", e, r, this.animationValues);
			for (let t = 0; t < m_.length; t++) __(`rotate${m_[t]}`, e, r, this.animationValues), __(`skew${m_[t]}`, e, r, this.animationValues);
			e.render();
			for (let t in r) e.setStaticValue(t, r[t]), this.animationValues && (this.animationValues[t] = r[t]);
			e.scheduleRender();
		}
		applyProjectionStyles(e, t) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				e.visibility = "hidden";
				return;
			}
			let n = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = !1, e.visibility = "", e.opacity = "", e.pointerEvents = l_(t?.pointerEvents) || "", e.transform = n ? n(this.latestValues, "") : "none";
				return;
			}
			let r = this.getLead();
			if (!this.projectionDelta || !this.layout || !r.target) {
				this.options.layoutId && (e.opacity = this.latestValues.opacity === void 0 ? 1 : this.latestValues.opacity, e.pointerEvents = l_(t?.pointerEvents) || ""), this.hasProjected && !Dm(this.latestValues) && (e.transform = n ? n({}, "") : "none", this.hasProjected = !1);
				return;
			}
			e.visibility = "";
			let i = r.animationValues || r.latestValues;
			this.applyTransformsToTarget();
			let a = Xg(this.projectionDeltaWithTransform, this.treeScale, i);
			n && (a = n(i, a)), e.transform = a;
			let { x: o, y: s } = this.projectionDelta;
			e.transformOrigin = `${o.origin * 100}% ${s.origin * 100}% 0`, e.opacity = r.animationValues ? r === this ? i.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : i.opacityExit : r === this ? i.opacity === void 0 ? "" : i.opacity : i.opacityExit === void 0 ? 0 : i.opacityExit;
			for (let t in ng) {
				if (i[t] === void 0) continue;
				let { correct: n, applyTo: o, isCSSVariable: s } = ng[t], c = a === "none" ? i[t] : n(i[t], r);
				if (o) {
					let t = o.length;
					for (let n = 0; n < t; n++) e[o[n]] = c;
				} else s ? this.options.visualElement.renderState.vars[t] = c : e[t] = c;
			}
			this.options.layoutId && (e.pointerEvents = r === this ? l_(t?.pointerEvents) || "" : "none");
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = this.dragSnapshot = this.dragAncestor = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((e) => e.currentAnimation?.stop()), this.root.nodes.forEach(E_), this.root.sharedNodes.clear();
		}
	};
}
function x_(e) {
	e.updateLayout(), k_(e);
}
function S_(e) {
	let t = e.resumeFrom?.snapshot || e.snapshot;
	if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
		let { layoutBox: n, measuredBox: r } = e.layout, { animationType: i } = e.options, a = t.source !== e.layout.source;
		if (i === "size") Kg((e) => {
			let r = a ? t.measuredBox[e] : t.layoutBox[e], i = wg(r);
			r.min = n[e].min, r.max = r.min + i;
		});
		else if (i === "x" || i === "y") {
			let e = i === "x" ? "y" : "x";
			_g(a ? t.measuredBox[e] : t.layoutBox[e], n[e]);
		} else q_(i, t.layoutBox, n) && Kg((r) => {
			let i = a ? t.measuredBox[r] : t.layoutBox[r], o = wg(n[r]);
			i.max = i.min + o, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[r].max = e.relativeTarget[r].min + o);
		});
		let o = Nh();
		Dg(o, n, t.layoutBox);
		let s = Nh();
		a ? Dg(s, e.applyTransform(r, !0), t.measuredBox) : Dg(s, n, t.layoutBox);
		let c = !zg(o), l = !1;
		if (!e.resumeFrom) {
			let r = e.getClosestProjectingParent();
			if (r && !r.resumeFrom) {
				let { snapshot: i, layout: a } = r;
				if (i && a) {
					let o = e.options.layoutAnchor || void 0, s = Fh();
					jg(s, t.layoutBox, i.layoutBox, o);
					let c = Fh();
					jg(c, n, a.layoutBox, o), Ug(s, c) || (l = !0), r.options.layoutRoot && (e.relativeTarget = c, e.relativeTargetOrigin = s, e.relativeParent = r);
				}
			}
		}
		e.notifyListeners("didUpdate", {
			layout: n,
			snapshot: t,
			delta: s,
			layoutDelta: o,
			hasLayoutChanged: c,
			hasRelativeLayoutChanged: l
		});
	} else if (e.isLead()) {
		let { onExitComplete: t } = e.options;
		t && t();
	}
	e.options.transition = void 0;
}
function C_(e) {
	kh.value && p_.nodes++, e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty ||= !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty), e.isTransformDirty ||= e.parent.isTransformDirty);
}
function w_(e) {
	e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function T_(e) {
	e.clearSnapshot();
}
function E_(e) {
	e.clearMeasurements();
}
function D_(e) {
	e.isLayoutDirty = !0, e.updateLayout();
}
function O_(e) {
	e.isLayoutDirty = !1;
}
function k_(e) {
	let { snapshot: t, dragAncestor: n } = e, r = n?.layout;
	if (!t || !r || e.resumeFrom || e.isAnimationBlocked) return;
	let i = n.dragSnapshot;
	Kg((e) => Lm(t.layoutBox[e], r.layoutBox[e].min - i.layoutBox[e].min));
}
function A_(e) {
	e.isAnimationBlocked && e.layout && !e.isLayoutDirty && (e.snapshot = e.dragSnapshot || e.layout, e.isLayoutDirty = !0);
}
function j_(e) {
	e.relativeTarget && e.relativeParent?.isLayoutDirty && (e.currentAnimation ? e.isLayoutDirty = !0 : (e.targetDelta = void 0, e.removeRelativeTarget()));
}
function M_(e) {
	let { visualElement: t } = e.options;
	t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function N_(e) {
	e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function P_(e) {
	e.resolveTargetDelta();
}
function F_(e) {
	e.calcProjection();
}
function I_(e) {
	e.resetSkewAndRotation();
}
function L_(e) {
	e.removeLeadSnapshot();
}
function R_(e, t, n) {
	e.translate = eu(t.translate, 0, n), e.scale = eu(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function z_(e, t, n, r) {
	e.min = eu(t.min, n.min, r), e.max = eu(t.max, n.max, r);
}
function B_(e, t, n, r) {
	z_(e.x, t.x, n.x, r), z_(e.y, t.y, n.y, r);
}
function V_(e) {
	return e.animationValues && e.animationValues.opacityExit !== void 0;
}
var H_ = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
}, U_ = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), W_ = U_("applewebkit/") && !U_("chrome/") ? Math.round : Ec;
function G_(e) {
	e.min = W_(e.min), e.max = W_(e.max);
}
function K_(e) {
	G_(e.x), G_(e.y);
}
function q_(e, t, n) {
	return e === "position" || e === "preserve-aspect" && !Tg(Wg(t), Wg(n), .2);
}
function J_(e) {
	return e !== e.root && e.scroll?.wasRoot;
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/node/DocumentProjectionNode.mjs
var Y_ = b_({
	attachResizeListener: (e, t) => a_(e, "resize", t),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
		y: document.documentElement.scrollTop || document.body?.scrollTop || 0
	}),
	checkIsScrollRoot: () => !0
}), X_ = { current: void 0 }, Z_ = b_({
	measureScroll: (e) => ({
		x: e.scrollLeft,
		y: e.scrollTop
	}),
	defaultParent: () => {
		if (!X_.current) {
			let e = new Y_({});
			e.mount(window), e.setOptions({ layoutScroll: !0 }), X_.current = e;
		}
		return X_.current;
	},
	resetTransform: (e, t) => {
		e.style.transform = t === void 0 ? "none" : t;
	},
	checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), Q_ = (0, _.createContext)({
	transformPagePoint: (e) => e,
	isStatic: !1,
	reducedMotion: "never"
});
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs
function $_(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function ev(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = $_(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : $_(e[t], null);
			}
		};
	};
}
function tv(...e) {
	return _.useCallback(ev(...e), e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var nv = class extends _.Component {
	getSnapshotBeforeUpdate(e) {
		let t = this.props.childRef.current;
		if (Qp(t) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
			let e = t.offsetParent, n = Qp(e) && e.offsetWidth || 0, r = Qp(e) && e.offsetHeight || 0, i = getComputedStyle(t), a = this.props.sizeRef.current;
			a.height = parseFloat(i.height), a.width = parseFloat(i.width), a.top = t.offsetTop, a.left = t.offsetLeft, a.right = n - a.width - a.left, a.bottom = r - a.height - a.top, a.direction = i.direction;
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function rv({ children: e, isPresent: t, anchorX: n, anchorY: r, root: i, pop: a }) {
	let o = (0, _.useId)(), s = (0, _.useRef)(null), c = (0, _.useRef)({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		direction: "ltr"
	}), { nonce: l } = (0, _.useContext)(Q_), u = tv(s, a === !1 ? void 0 : e.props?.ref ?? e?.ref);
	return (0, _.useInsertionEffect)(() => {
		let { width: e, height: u, top: d, left: f, right: p, bottom: m, direction: h } = c.current;
		if (t || a === !1 || !s.current || !e || !u) return;
		let g = h === "rtl", _ = n === "left" ? g ? `right: ${p}` : `left: ${f}` : g ? `left: ${f}` : `right: ${p}`, v = r === "bottom" ? `bottom: ${m}` : `top: ${d}`, y = s.current;
		y.dataset.motionPopId = o;
		let b = y.ownerDocument, x = b.createElement("style");
		l && (x.nonce = l);
		let S = i ?? b.head;
		return S.appendChild(x), x.sheet && x.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${u}px !important;
            ${_}px !important;
            ${v}px !important;
          }
        `), () => {
			s.current?.removeAttribute("data-motion-pop-id"), S.contains(x) && S.removeChild(x);
		};
	}, [t]), (0, Z.jsx)(nv, {
		isPresent: t,
		childRef: s,
		sizeRef: c,
		pop: a,
		children: a === !1 ? e : _.cloneElement(e, { ref: u })
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var iv = ({ children: e, initial: t, isPresent: n, onExitComplete: r, custom: i, presenceAffectsLayout: a, mode: o, anchorX: s, anchorY: c, root: l }) => {
	let u = hc(av), d = (0, _.useId)(), f = (0, _.useRef)(n), p = (0, _.useRef)(r);
	gc(() => {
		f.current = n, p.current = r;
	});
	let m = !0, h = (0, _.useMemo)(() => (m = !1, {
		id: d,
		initial: t,
		isPresent: n,
		custom: i,
		onExitComplete: (e) => {
			u.set(e, !0);
			for (let e of u.values()) if (!e) return;
			r && r();
		},
		register: (e) => (u.set(e, !1), () => {
			u.delete(e), !f.current && !u.size && p.current?.();
		})
	}), [
		n,
		u,
		r
	]);
	return a && m && (h = { ...h }), (0, _.useMemo)(() => {
		u.forEach((e, t) => u.set(t, !1));
	}, [n]), _.useEffect(() => {
		!n && !u.size && r && r();
	}, [n]), e = (0, Z.jsx)(rv, {
		pop: o === "popLayout",
		isPresent: n,
		anchorX: s,
		anchorY: c,
		root: l,
		children: e
	}), (0, Z.jsx)(_c.Provider, {
		value: h,
		children: e
	});
};
function av() {
	return /* @__PURE__ */ new Map();
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
function ov(e = !0) {
	let t = (0, _.useContext)(_c);
	if (t === null) return [!0, null];
	let { isPresent: n, onExitComplete: r, register: i } = t, a = (0, _.useId)();
	(0, _.useEffect)(() => {
		if (e) return i(a);
	}, [e]);
	let o = (0, _.useCallback)(() => e && r && r(a), [
		a,
		r,
		e
	]);
	return !n && r ? [!1, o] : [!0];
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
var sv = (e) => e.key || "";
function cv(e) {
	let t = [];
	return _.Children.forEach(e, (e) => {
		(0, _.isValidElement)(e) && t.push(e);
	}), t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var lv = ({ children: e, custom: t, initial: n = !0, onExitComplete: r, presenceAffectsLayout: i = !0, mode: a = "sync", propagate: o = !1, anchorX: s = "left", anchorY: c = "top", root: l }) => {
	let [u, d] = ov(o), f = (0, _.useMemo)(() => cv(e), [e]), p = o && !u ? [] : f.map(sv), m = (0, _.useRef)(!0), h = hc(() => /* @__PURE__ */ new Map()), g = (0, _.useRef)(/* @__PURE__ */ new Set()), [v, y] = (0, _.useState)(f), [b, x] = (0, _.useState)(f);
	gc(() => {
		o && !u && !b.length && d?.();
	}, [
		u,
		o,
		b.length,
		d
	]), gc(() => {
		m.current = !1;
		for (let e = 0; e < b.length; e++) {
			let t = sv(b[e]);
			p.includes(t) ? (h.delete(t), g.current.delete(t)) : h.get(t) !== !0 && h.set(t, !1);
		}
	}, [
		b,
		p.length,
		p.join("-")
	]);
	let S = [];
	if (f !== v) {
		let e = [...f], t = 0;
		for (let n of b) {
			let r = p.indexOf(sv(n));
			r === -1 ? (e.splice(t++, 0, n), S.push(n)) : t = r + S.length + 1;
		}
		return S.every((e) => h.get(sv(e))) ? e = f : a === "wait" && (e = S), x(cv(e)), y(f), null;
	}
	let { forceRender: C } = (0, _.useContext)(mc);
	return (0, Z.jsx)(Z.Fragment, { children: b.map((e) => {
		let _ = sv(e), v = o && !u ? !1 : f === b || p.includes(_);
		return (0, Z.jsx)(iv, {
			isPresent: v,
			initial: !m.current || n ? void 0 : !1,
			custom: t,
			presenceAffectsLayout: i,
			mode: a,
			root: l,
			onExitComplete: v ? void 0 : () => {
				if (g.current.has(_)) return;
				if (h.has(_)) g.current.add(_), h.set(_, !0);
				else return;
				let e = !0;
				h.forEach((t) => {
					t || (e = !1);
				}), e && (C?.(), y([]), o && d?.(), r && r());
			},
			anchorX: s,
			anchorY: c,
			children: e
		}, _);
	}) });
}, uv = (0, _.createContext)({ strict: !1 }), dv = {
	animation: [
		"animate",
		"variants",
		"whileHover",
		"whileTap",
		"exit",
		"whileInView",
		"whileFocus",
		"whileDrag"
	],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
}, fv = !1;
function pv() {
	if (fv) return;
	let e = {};
	for (let t in dv) e[t] = { isEnabled: (e) => dv[t].some((t) => !!e[t]) };
	Xh(e), fv = !0;
}
function mv() {
	return pv(), Zh();
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function hv(e) {
	let t = mv();
	for (let n in e) t[n] = {
		...t[n],
		...e[n]
	};
	Xh(t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs
function gv({ children: e, ...t }) {
	let n = (0, _.useContext)(Q_);
	t = {
		...n,
		...t
	}, t.transition = rp(t.transition, n.transition), t.isStatic = hc(() => t.isStatic);
	let r = (0, _.useMemo)(() => t, [
		JSON.stringify(t.transition),
		t.transformPagePoint,
		t.reducedMotion,
		t.skipAnimations,
		t.isValidProp
	]);
	return (0, Z.jsx)(Q_.Provider, {
		value: r,
		children: e
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
var _v = /* @__PURE__ */ (0, _.createContext)({});
//#endregion
//#region node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function vv(e, t) {
	if (Vh(e)) {
		let { initial: t, animate: n } = e;
		return {
			initial: t === !1 || Rh(t) ? t : void 0,
			animate: Rh(n) ? n : void 0
		};
	}
	return e.inherit === !1 ? {} : t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function yv(e) {
	let { initial: t, animate: n } = vv(e, (0, _.useContext)(_v));
	return (0, _.useMemo)(() => ({
		initial: t,
		animate: n
	}), [bv(t), bv(n)]);
}
function bv(e) {
	return Array.isArray(e) ? e.join(" ") : e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var xv = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});
//#endregion
//#region node_modules/framer-motion/dist/es/render/html/use-props.mjs
function Sv(e, t, n) {
	for (let r in t) !Tp(t[r]) && !rg(r, n) && (e[r] = t[r]);
}
function Cv({ transformTemplate: e }, t) {
	return (0, _.useMemo)(() => {
		let n = xv();
		return dm(n, t, e), Object.assign({}, n.vars, n.style);
	}, [t]);
}
function wv(e, t) {
	let n = e.style || {}, r = {};
	return Sv(r, n, e), Object.assign(r, Cv(e, t)), r;
}
function Tv(e, t) {
	let n = {}, r = wv(e, t);
	return e.drag && e.dragListener !== !1 && (n.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = r, n;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var Ev = () => ({
	...xv(),
	attrs: {}
});
//#endregion
//#region node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function Dv(e, t, n, r) {
	let i = (0, _.useMemo)(() => {
		let n = Ev();
		return gm(n, t, cg(r), e.transformTemplate, e.style), {
			...n.attrs,
			style: { ...n.style }
		};
	}, [t]);
	if (e.style) {
		let t = {};
		Sv(t, e.style, e), i.style = {
			...t,
			...i.style
		};
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var Ov = /* @__PURE__ */ new Set(/* @__PURE__ */ "animate.exit.variants.initial.style.values.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.propagate.ignoreStrict.viewport".split("."));
function kv(e) {
	return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || Ov.has(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
function Av(e, t) {
	return e.startsWith("on") ? !kv(e) : t?.(e) ?? !kv(e);
}
function jv(e, t, n, r) {
	let i = {};
	for (let a in e) (a !== "values" || typeof e.values != "object") && (Tp(e[a]) || (Av(a, r) || n === !0 && kv(a) || !t && !kv(a) || e.draggable && a.startsWith("onDrag")) && (i[a] = e[a]));
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var Mv = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view"
];
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function Nv(e) {
	return typeof e != "string" || e.includes("-") ? !1 : !!(Mv.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function Pv(e, t, n, { latestValues: r }, i, a = !1, o, s) {
	let c = (o ?? Nv(e) ? Dv : Tv)(t, r, i, e), l = jv(t, typeof e == "string", a, s), u = e === _.Fragment ? {} : {
		...l,
		...c,
		ref: n
	}, { children: d } = t, f = (0, _.useMemo)(() => Tp(d) ? d.get() : d, [d]);
	return (0, _.createElement)(e, {
		...u,
		children: f
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function Fv({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, i) {
	return {
		latestValues: Iv(n, r, i, e),
		renderState: t()
	};
}
function Iv(e, t, n, r) {
	let i = {}, a = r(e, {});
	for (let e in a) i[e] = l_(a[e]);
	let { initial: o, animate: s } = e, c = Vh(e), l = Hh(e);
	t && l && !c && e.inherit !== !1 && (o === void 0 && (o = t.initial), s === void 0 && (s = t.animate));
	let u = n ? n.initial === !1 : !1;
	u ||= o === !1;
	let d = u ? s : o;
	if (d && typeof d != "boolean" && !Lh(d)) {
		let t = Array.isArray(d) ? d : [d];
		for (let n = 0; n < t.length; n++) {
			let r = _p(e, t[n]);
			if (r) {
				let { transitionEnd: e, transition: t, ...n } = r;
				for (let e in n) {
					let t = n[e];
					if (Array.isArray(t)) {
						let e = u ? t.length - 1 : 0;
						t = t[e];
					}
					t !== null && (i[e] = t);
				}
				for (let t in e) i[t] = e[t];
			}
		}
	}
	return i;
}
var Lv = (e) => (t, n) => {
	let r = (0, _.useContext)(_v), i = (0, _.useContext)(_c), a = () => Fv(e, t, r, i);
	return n ? a() : hc(a);
}, Rv = /*@__PURE__*/ Lv({
	scrapeMotionValuesFromProps: ig,
	createRenderState: xv
}), zv = /*@__PURE__*/ Lv({
	scrapeMotionValuesFromProps: ug,
	createRenderState: Ev
}), Bv = Symbol.for("motionComponentSymbol");
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function Vv(e, t, n) {
	let r = (0, _.useRef)(n);
	(0, _.useInsertionEffect)(() => {
		r.current = n;
	});
	let i = (0, _.useRef)(null);
	return (0, _.useCallback)((n) => {
		n && e.onMount?.(n), t && (n ? t.mount(n) : t.unmount());
		let a = r.current;
		if (typeof a == "function") {
			if (n) {
				let e = a(n);
				typeof e == "function" && (i.current = e);
			} else i.current ? (i.current(), i.current = null) : a(n);
		} else a && (a.current = n);
	}, [t]);
}
//#endregion
//#region node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var Hv = (0, _.createContext)({});
//#endregion
//#region node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function Uv(e) {
	return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function Wv(e, t, n, r, i, a) {
	let { visualElement: o } = (0, _.useContext)(_v), s = (0, _.useContext)(uv), c = (0, _.useContext)(_c), l = (0, _.useContext)(Q_), u = l.reducedMotion, d = l.skipAnimations, f = (0, _.useRef)(null), p = (0, _.useRef)(!1);
	r ||= s.renderer, !f.current && r && (f.current = r(e, {
		visualState: t,
		parent: o,
		props: n,
		presenceContext: c,
		blockInitialAnimation: c ? c.initial === !1 : !1,
		reducedMotionConfig: u,
		skipAnimations: d,
		isSVG: a
	}), p.current && f.current && (f.current.manuallyAnimateOnMount = !0));
	let m = f.current, h = (0, _.useContext)(Hv);
	m && !m.projection && i && (m.type === "html" || m.type === "svg") && Gv(f.current, n, i, h);
	let g = (0, _.useRef)(!1);
	(0, _.useInsertionEffect)(() => {
		m && g.current && m.update(n, c);
	});
	let v = n[kp], y = (0, _.useRef)(!!v && typeof window < "u" && !window.MotionHandoffIsComplete?.(v) && window.MotionHasOptimisedAnimation?.(v));
	return gc(() => {
		p.current && m && (m.animationState?.animateChanges(), m.enteringChildren = void 0);
	}, []), gc(() => {
		p.current = !0, m && (g.current = !0, window.MotionIsMounted = !0, m.updateFeatures(), m.scheduleRenderMicrotask(), y.current && m.animationState && m.animationState.animateChanges());
	}), (0, _.useEffect)(() => {
		m && (!y.current && m.animationState && m.animationState.animateChanges(), y.current &&= (queueMicrotask(() => {
			window.MotionHandoffMarkAsComplete?.(v);
		}), !1), m.enteringChildren = void 0);
	}), m;
}
function Gv(e, t, n, r) {
	let { layoutId: i, layout: a, drag: o, dragConstraints: s, layoutScroll: c, layoutRoot: l, layoutAnchor: u, layoutCrossfade: d } = t;
	e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : Kv(e.parent)), e.projection.setOptions({
		layoutId: i,
		layout: a,
		alwaysMeasureLayout: !!o || s && Uv(s),
		visualElement: e,
		animationType: typeof a == "string" ? a : "both",
		initialPromotionConfig: r,
		crossfade: d,
		layoutScroll: c,
		layoutRoot: l,
		layoutAnchor: u
	});
}
function Kv(e) {
	if (e) return e.options.allowProjection === !1 ? Kv(e.parent) : e.projection;
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/index.mjs
function qv(e, { forwardMotionProps: t = !1, type: n } = {}, r, i) {
	r && hv(r);
	let a = n ? n === "svg" : Nv(e), o = a ? zv : Rv;
	function s(n, s) {
		let c, l = {
			...(0, _.useContext)(Q_),
			...n,
			layoutId: Jv(n)
		}, { isStatic: u, isValidProp: d } = l, f = yv(n), p = o(n, u);
		if (!u && typeof window < "u") {
			Yv(l, r);
			let t = Xv(l);
			c = t.MeasureLayout, f.visualElement = Wv(e, p, l, i, t.ProjectionNode, a);
		}
		return (0, Z.jsxs)(_v.Provider, {
			value: f,
			children: [c && f.visualElement ? (0, Z.jsx)(c, {
				visualElement: f.visualElement,
				...l
			}) : null, Pv(e, n, Vv(p, f.visualElement, s), p, u, t, a, d)]
		});
	}
	s.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
	let c = (0, _.forwardRef)(s);
	return c[Bv] = e, c;
}
function Jv({ layoutId: e }) {
	let t = (0, _.useContext)(mc).id;
	return t && e !== void 0 ? t + "-" + e : e;
}
function Yv(e, t) {
	(0, _.useContext)(uv).strict;
}
function Xv(e) {
	let { drag: t, layout: n } = mv();
	if (!t && !n) return {};
	let r = {
		...t,
		...n
	};
	return {
		MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? r.MeasureLayout : void 0,
		ProjectionNode: r.ProjectionNode
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function Zv(e, t) {
	if (typeof Proxy > "u") return qv;
	let n = /* @__PURE__ */ new Map(), r = (n, r) => qv(n, r, e, t);
	return new Proxy((e, t) => r(e, t), { get: (i, a) => a === "create" ? r : (n.has(a) || n.set(a, qv(a, void 0, e, t)), n.get(a)) });
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var Qv = (e, t) => t.isSVG ?? Nv(e) ? new dg(t) : new og(t, { allowProjection: e !== _.Fragment }), $v = class extends eg {
	constructor(e) {
		super(e), e.animationState ||= mg(e);
	}
	updateAnimationControlsSubscription() {
		let { animate: e } = this.node.getProps();
		Lh(e) && (this.unmountControls = e.subscribe(this.node));
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		let { animate: e } = this.node.getProps(), { animate: t } = this.node.prevProps || {};
		e !== t && this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.node.animationState.reset(), this.unmountControls?.();
	}
}, ey = 0, ty = {
	animation: { Feature: $v },
	exit: { Feature: class extends eg {
		constructor() {
			super(...arguments), this.id = ey++;
		}
		update() {
			let { presenceContext: e, prevPresenceContext: t, animationState: n } = this.node;
			if (!e || !n) return;
			let { isPresent: r, onExitComplete: i } = e, a = t?.isPresent;
			if (r === a) return;
			if (r && a === !1) {
				if (this.exit === !0) {
					let { initial: e } = this.node.getProps();
					if (e && !Array.isArray(e)) {
						let { transition: t, transitionEnd: n, ...r } = vp(this.node, e) || {};
						for (let e in r) this.node.getValue(e)?.jump(r[e]);
					}
					this.node.blockInitialAnimation = !1, n.reset(), n.animateChanges();
				} else n.setActive("exit", !1);
				this.exit = void 0;
				return;
			}
			let o = this.exit = n.setActive("exit", !r);
			i && !r && o.then(() => {
				this.exit === o && (this.exit = !0, i(this.id));
			});
		}
		mount() {
			let { register: e, onExitComplete: t } = this.node.presenceContext || {};
			t && t(this.id), e && (this.unmount = e(this.id));
		}
		unmount() {}
	} }
};
//#endregion
//#region node_modules/framer-motion/dist/es/events/event-info.mjs
function ny(e) {
	return { point: {
		x: e.pageX,
		y: e.pageY
	} };
}
var ry = (e) => (t) => rh(t) && e(t, ny(t));
//#endregion
//#region node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function iy(e, t, n, r) {
	return a_(e, t, ry(n), r);
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/get-context-window.mjs
var ay = ({ current: e }) => e ? e.ownerDocument.defaultView : null, oy = (e, t) => Math.abs(e - t);
function sy(e, t) {
	let n = oy(e.x, t.x), r = oy(e.y, t.y);
	return Math.sqrt(n ** 2 + r ** 2);
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var cy = /*#__PURE__*/ new Set(["auto", "scroll"]), ly = class {
	constructor(e, t, { transformPagePoint: n, contextWindow: r = window, dragSnapToOrigin: i = !1, distanceThreshold: a = 3, element: o } = {}) {
		if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (e) => {
			this.handleScroll(e.target);
		}, this.onWindowScroll = () => {
			this.handleScroll(window);
		}, this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			this.hasPendingMove = !1, this.lastRawMoveEventInfo && (this.lastMoveEventInfo = uy(this.lastRawMoveEventInfo, this.transformPagePoint));
			let e = fy(this.lastMoveEventInfo, this.history), t = this.startEvent !== null, n = sy(e.offset, {
				x: 0,
				y: 0
			}) >= this.distanceThreshold;
			if (!t && !n) return;
			let { point: r } = e;
			this.history.push({
				...r,
				timestamp: rl.now()
			});
			let { onStart: i, onMove: a } = this.handlers;
			t || (i && i(this.lastMoveEvent, e), this.startEvent = this.lastMoveEvent), a && a(this.lastMoveEvent, e);
		}, this.handlePointerMove = (e, t) => {
			this.lastMoveEvent = e, this.lastRawMoveEventInfo = t, this.lastMoveEventInfo = uy(t, this.transformPagePoint), this.hasPendingMove = !0, $.update(this.updatePoint, !0);
		}, this.handlePointerUp = (e, t) => {
			this.hasPendingMove && this.updatePoint(), this.end();
			let { onEnd: n, onSessionEnd: r, resumeAnimation: i } = this.handlers;
			if ((this.dragSnapToOrigin || !this.startEvent) && i && i(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			let a = fy(e.type === "pointercancel" ? this.lastMoveEventInfo : uy(t, this.transformPagePoint), this.history);
			this.startEvent && n && n(e, a), r && r(e, a);
		}, !rh(e)) return;
		this.dragSnapToOrigin = i, this.handlers = t, this.transformPagePoint = n, this.distanceThreshold = a, this.contextWindow = r || window;
		let s = uy(ny(e), this.transformPagePoint), { point: c } = s, { timestamp: l } = el;
		this.history = [{
			...c,
			timestamp: l
		}];
		let { onSessionStart: u } = t;
		u && u(e, fy(s, this.history));
		let d = {
			passive: !0,
			capture: !0
		};
		this.removeListeners = Dc(iy(this.contextWindow, "pointermove", this.handlePointerMove, d), iy(this.contextWindow, "pointerup", this.handlePointerUp, d), iy(this.contextWindow, "pointercancel", this.handlePointerUp, d)), o && this.startScrollTracking(o);
	}
	startScrollTracking(e) {
		let t = e.parentElement;
		for (; t;) {
			let e = getComputedStyle(t);
			(cy.has(e.overflowX) || cy.has(e.overflowY)) && this.scrollPositions.set(t, {
				x: t.scrollLeft,
				y: t.scrollTop
			}), t = t.parentElement;
		}
		this.scrollPositions.set(window, {
			x: window.scrollX,
			y: window.scrollY
		}), window.addEventListener("scroll", this.onElementScroll, { capture: !0 }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
			window.removeEventListener("scroll", this.onElementScroll, { capture: !0 }), window.removeEventListener("scroll", this.onWindowScroll);
		};
	}
	handleScroll(e) {
		let t = this.scrollPositions.get(e);
		if (!t) return;
		let n = e === window, r = n ? {
			x: window.scrollX,
			y: window.scrollY
		} : {
			x: e.scrollLeft,
			y: e.scrollTop
		}, i = {
			x: r.x - t.x,
			y: r.y - t.y
		};
		(i.x !== 0 || i.y !== 0) && (n ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += i.x, this.lastMoveEventInfo.point.y += i.y) : this.history.length > 0 && (this.history[0].x -= i.x, this.history[0].y -= i.y), this.scrollPositions.set(e, r), $.update(this.updatePoint, !0));
	}
	updateHandlers(e) {
		this.handlers = e;
	}
	end() {
		this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), xu(this.updatePoint);
	}
};
function uy(e, t) {
	return t ? { point: t(e.point) } : e;
}
function dy(e, t) {
	return {
		x: e.x - t.x,
		y: e.y - t.y
	};
}
function fy({ point: e }, t) {
	return {
		point: e,
		delta: dy(e, my(t)),
		offset: dy(e, py(t)),
		velocity: hy(t, .1)
	};
}
function py(e) {
	return e[0];
}
function my(e) {
	return e[e.length - 1];
}
function hy(e, t) {
	if (e.length < 2) return {
		x: 0,
		y: 0
	};
	let n = e.length - 1, r = null, i = my(e);
	for (; n >= 0 && (r = e[n], !(i.timestamp - r.timestamp > /* @__PURE__ */ Ac(t)));) n--;
	if (!r) return {
		x: 0,
		y: 0
	};
	r === e[0] && e.length > 2 && i.timestamp - r.timestamp > /* @__PURE__ */ Ac(t) * 2 && (r = e[1]);
	let a = /* @__PURE__ */ jc(i.timestamp - r.timestamp);
	if (a === 0) return {
		x: 0,
		y: 0
	};
	let o = {
		x: (i.x - r.x) / a,
		y: (i.y - r.y) / a
	};
	return o.x === Infinity && (o.x = 0), o.y === Infinity && (o.y = 0), o;
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function gy(e, { min: t, max: n }, r) {
	return t !== void 0 && e < t ? e = r ? eu(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? eu(n, e, r.max) : Math.min(e, n)), e;
}
function _y(e, t, n) {
	return {
		min: t === void 0 ? void 0 : e.min + t,
		max: n === void 0 ? void 0 : e.max + n - (e.max - e.min)
	};
}
function vy(e, { top: t, left: n, bottom: r, right: i }) {
	return {
		x: _y(e.x, n, i),
		y: _y(e.y, t, r)
	};
}
function yy(e, t) {
	let n = t.min - e.min, r = t.max - e.max;
	return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), {
		min: n,
		max: r
	};
}
function by(e, t) {
	return {
		x: yy(e.x, t.x),
		y: yy(e.y, t.y)
	};
}
function xy(e, t) {
	let n = .5, r = wg(e), i = wg(t);
	return i > r ? n = /* @__PURE__ */ Oc(t.min, t.max - r, e.min) : r > i && (n = /* @__PURE__ */ Oc(e.min, e.max - i, t.min)), bc(0, 1, n);
}
function Sy(e, t) {
	let n = {};
	return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
var Cy = .35;
function wy(e = Cy) {
	return e === !1 ? e = 0 : e === !0 && (e = Cy), {
		x: Ty(e, "left", "right"),
		y: Ty(e, "top", "bottom")
	};
}
function Ty(e, t, n) {
	return {
		min: Ey(e, t),
		max: Ey(e, n)
	};
}
function Ey(e, t) {
	return typeof e == "number" ? e : e[t] || 0;
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var Dy = /* @__PURE__ */ new WeakMap(), Oy = class {
	constructor(e) {
		this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
			x: 0,
			y: 0
		}, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Fh(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
	}
	start(e, { snapToCursor: t = !1, distanceThreshold: n } = {}) {
		let { presenceContext: r } = this.visualElement;
		if (r && r.isPresent === !1) return;
		let i = (e) => {
			t && this.snapToCursor(e), this.stopAnimation();
		}, a = (e, t) => {
			let { drag: n, dragPropagation: r, onDragStart: i } = this.getProps();
			if (n && !r && (this.openDragLock && this.openDragLock(), this.openDragLock = Qm(n), !this.openDragLock)) return;
			this.latestPointerEvent = e, this.latestPanInfo = t, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Kg((e) => {
				let t = this.getAxisMotionValue(e).get() || 0;
				if (El.test(t)) {
					let { projection: n } = this.visualElement;
					if (n && n.layout) {
						let r = n.layout.layoutBox[e];
						r && (t = wg(r) * (parseFloat(t) / 100));
					}
				}
				this.originPoint[e] = t;
			}), i && $.update(() => i(e, t), !1, !0), Dp(this.visualElement, "transform");
			let { animationState: a } = this.visualElement;
			a && a.setActive("whileDrag", !0);
		}, o = (e, t) => {
			this.latestPointerEvent = e, this.latestPanInfo = t;
			let { dragPropagation: n, dragDirectionLock: r, onDirectionLock: i, onDrag: a } = this.getProps();
			if (!n && !this.openDragLock) return;
			let { offset: o } = t;
			r && this.currentDirection === null ? (this.currentDirection = My(o), this.currentDirection !== null && i && i(this.currentDirection)) : (this.updateAxis("x", t.point, o), this.updateAxis("y", t.point, o), this.visualElement.render(), a && $.update(() => a(e, t), !1, !0));
		}, s = (e, t) => {
			this.latestPointerEvent = e, this.latestPanInfo = t, this.stop(e, t), this.latestPointerEvent = null, this.latestPanInfo = null;
		}, c = () => {
			let { dragSnapToOrigin: e } = this.getProps();
			(e || this.constraints) && this.startAnimation({
				x: 0,
				y: 0
			});
		}, { dragSnapToOrigin: l } = this.getProps();
		this.panSession = new ly(e, {
			onSessionStart: i,
			onStart: a,
			onMove: o,
			onSessionEnd: s,
			resumeAnimation: c
		}, {
			transformPagePoint: this.visualElement.getTransformPagePoint(),
			dragSnapToOrigin: l,
			distanceThreshold: n,
			contextWindow: ay(this.visualElement),
			element: this.visualElement.current
		});
	}
	stop(e, t) {
		let n = e || this.latestPointerEvent, r = t || this.latestPanInfo, i = this.isDragging;
		if (this.cancel(), !i || !r || !n) return;
		let { velocity: a } = r;
		this.startAnimation(a);
		let { onDragEnd: o } = this.getProps();
		o && $.postRender(() => o(n, r));
	}
	cancel() {
		this.isDragging = !1;
		let { projection: e, animationState: t } = this.visualElement;
		e && (e.isAnimationBlocked = !1), this.endPanSession();
		let { dragPropagation: n } = this.getProps();
		!n && this.openDragLock && (this.openDragLock(), this.openDragLock = null), t && t.setActive("whileDrag", !1);
	}
	endPanSession() {
		this.panSession && this.panSession.end(), this.panSession = void 0;
	}
	updateAxis(e, t, n) {
		let { drag: r } = this.getProps();
		if (!n || !jy(e, r, this.currentDirection)) return;
		let i = this.getAxisMotionValue(e), a = this.originPoint[e] + n[e];
		this.constraints && this.constraints[e] && (a = gy(a, this.constraints[e], this.elastic[e])), i.set(a);
	}
	resolveConstraints() {
		let { dragConstraints: e, dragElastic: t } = this.getProps(), n = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
		e && Uv(e) ? this.constraints ||= this.resolveRefConstraints() : this.constraints = e && n ? vy(n.layoutBox, e) : !1, this.elastic = wy(t), r !== this.constraints && !Uv(e) && n && this.constraints && !this.hasMutatedConstraints && Kg((e) => {
			this.constraints !== !1 && this.getAxisMotionValue(e) && (this.constraints[e] = Sy(n.layoutBox[e], this.constraints[e]));
		});
	}
	resolveRefConstraints() {
		let { dragConstraints: e, onMeasureDragConstraints: t } = this.getProps();
		if (!e || !Uv(e)) return !1;
		let n = e.current, { projection: r } = this.visualElement;
		if (!r || !r.layout) return !1;
		r.root && (r.root.scroll = void 0, r.root.updateScroll());
		let i = Hm(n, r.root, this.visualElement.getTransformPagePoint()), a = by(r.layout.layoutBox, i);
		if (t) {
			let e = t(Cm(a));
			this.hasMutatedConstraints = !!e, e && (a = Sm(e));
		}
		return a;
	}
	startAnimation(e) {
		let { drag: t, dragMomentum: n, dragElastic: r, dragTransition: i, dragSnapToOrigin: a, onDragTransitionEnd: o } = this.getProps(), s = this.constraints || {}, c = Kg((o) => {
			if (!jy(o, t, this.currentDirection)) return;
			let c = s && s[o] || {};
			(a === !0 || a === o) && (c = {
				min: 0,
				max: 0
			});
			let l = r ? 200 : 1e6, u = r ? 40 : 1e7, d = {
				type: "inertia",
				velocity: n ? e[o] : 0,
				bounceStiffness: l,
				bounceDamping: u,
				timeConstant: 750,
				restDelta: 1,
				restSpeed: 10,
				...i,
				...c
			};
			return this.startAxisValueAnimation(o, d);
		});
		return Promise.all(c).then(o);
	}
	startAxisValueAnimation(e, t) {
		let n = this.getAxisMotionValue(e);
		return Dp(this.visualElement, e), n.start(fp(e, n, 0, t, this.visualElement, !1));
	}
	stopAnimation() {
		Kg((e) => this.getAxisMotionValue(e).stop());
	}
	getAxisMotionValue(e) {
		let t = `_drag${e.toUpperCase()}`;
		return this.visualElement.getProps()[t] || this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0);
	}
	snapToCursor({ clientX: e, clientY: t }) {
		let { drag: n } = this.getProps(), r = {
			x: e,
			y: t
		}, i = this.visualElement.getTransformPagePoint()?.(r) || r, a = this.visualElement.measureViewportBox();
		Kg((e) => {
			if (!jy(e, n, this.currentDirection)) return;
			let t = this.getAxisMotionValue(e), { min: r, max: o } = a[e];
			t.set((t.get() || 0) + i[e] - eu(r, o, .5));
		});
	}
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		let { drag: e, dragConstraints: t } = this.getProps(), { projection: n } = this.visualElement;
		if (!Uv(t) || !n || !this.constraints) return;
		this.stopAnimation();
		let r = this.constraints, i = {
			x: 0,
			y: 0
		};
		Kg((e) => {
			let t = this.getAxisMotionValue(e).get();
			i[e] = xy({
				min: t,
				max: t
			}, r[e]);
		});
		let { transformTemplate: a } = this.visualElement.getProps();
		this.visualElement.current.style.transform = a ? a({}, "") : "none", n.root && n.root.updateScroll(), n.updateLayout(), this.constraints = !1, this.resolveConstraints(), Kg((t) => {
			let n = this.getAxisMotionValue(t);
			if (!jy(t, e, null) || !n.get()) return;
			let { min: r, max: a } = this.constraints[t];
			n.set(eu(r, a, i[t]));
		}), this.visualElement.render();
	}
	addListeners() {
		if (!this.visualElement.current) return;
		Dy.set(this.visualElement, this);
		let e = this.visualElement.current, t = iy(e, "pointerdown", (t) => {
			let { drag: n, dragListener: r = !0 } = this.getProps(), i = t.target, a = i !== e && sh(i);
			n && r && !a && this.start(t);
		}), n, r = () => {
			let { dragConstraints: t } = this.getProps();
			Uv(t) && t.current && (this.constraints = this.resolveRefConstraints(), n ||= Ay(e, t.current, () => this.scalePositionWithinConstraints()));
		}, { projection: i } = this.visualElement, a = i.addEventListener("measure", r);
		i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), $.read(r);
		let o = a_(window, "resize", () => this.scalePositionWithinConstraints()), s = i.addEventListener("didUpdate", (({ delta: e, hasLayoutChanged: t }) => {
			this.isDragging && t && (Kg((t) => {
				let n = this.getAxisMotionValue(t);
				n && (this.originPoint[t] += e[t].translate, n.set(n.get() + e[t].translate));
			}), this.visualElement.render());
		}));
		return () => {
			o(), t(), a(), s && s(), n && n();
		};
	}
	getProps() {
		let e = this.visualElement.getProps(), { drag: t = !1, dragDirectionLock: n = !1, dragPropagation: r = !1, dragConstraints: i = !1, dragElastic: a = Cy, dragMomentum: o = !0 } = e;
		return {
			...e,
			drag: t,
			dragDirectionLock: n,
			dragPropagation: r,
			dragConstraints: i,
			dragElastic: a,
			dragMomentum: o
		};
	}
};
function ky(e) {
	let t = !0;
	return () => {
		t ? t = !1 : e();
	};
}
function Ay(e, t, n) {
	let r = Oh(e, ky(n)), i = Oh(t, ky(n));
	return () => {
		r(), i();
	};
}
function jy(e, t, n) {
	return (t === !0 || t === e) && (n === null || n === e);
}
function My(e, t = 10) {
	let n = null;
	return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var Ny = class extends eg {
	constructor(e) {
		super(e), this.removeGroupControls = Ec, this.removeListeners = Ec, this.controls = new Oy(e);
	}
	mount() {
		let { dragControls: e } = this.node.getProps();
		e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Ec;
	}
	update() {
		let { dragControls: e } = this.node.getProps(), { dragControls: t } = this.node.prevProps || {};
		e !== t && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
	}
	unmount() {
		this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
	}
}, Py = (e) => (t, n) => {
	e && $.update(() => e(t, n), !1, !0);
}, Fy = class extends eg {
	constructor() {
		super(...arguments), this.removePointerDownListener = Ec;
	}
	onPointerDown(e) {
		this.session = new ly(e, this.createPanHandlers(), {
			transformPagePoint: this.node.getTransformPagePoint(),
			contextWindow: ay(this.node)
		});
	}
	createPanHandlers() {
		let { onPanSessionStart: e, onPanStart: t, onPan: n, onPanEnd: r } = this.node.getProps();
		return {
			onSessionStart: Py(e),
			onStart: Py(t),
			onMove: Py(n),
			onEnd: (e, t) => {
				delete this.session, r && $.postRender(() => r(e, t));
			}
		};
	}
	mount() {
		this.removePointerDownListener = iy(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
	}
	update() {
		this.session && this.session.updateHandlers(this.createPanHandlers());
	}
	unmount() {
		this.removePointerDownListener(), this.session && this.session.end();
	}
}, Iy = !1, Ly = class extends _.Component {
	componentDidMount() {
		let { visualElement: e, layoutGroup: t, switchLayoutGroup: n, layoutId: r } = this.props, { projection: i } = e;
		i && (t.group && t.group.add(i), n && n.register && r && n.register(i), Iy && i.root.didUpdate(), i.addEventListener("animationComplete", () => {
			this.safeToRemove();
		}), i.setOptions({
			...i.options,
			layoutDependency: this.props.layoutDependency,
			onExitComplete: () => this.safeToRemove()
		})), f_.hasEverUpdated = !0;
	}
	getSnapshotBeforeUpdate(e) {
		let { layoutDependency: t, visualElement: n, drag: r, isPresent: i } = this.props, { projection: a } = n;
		return a && (a.isPresent = i, e.layoutDependency !== t && a.setOptions({
			...a.options,
			layoutDependency: t
		}), Iy = !0, r || e.layoutDependency !== t || t === void 0 || e.isPresent !== i ? a.willUpdate() : this.safeToRemove(), e.isPresent !== i && (i ? a.promote() : a.relegate() || $.postRender(() => {
			let e = a.getStack();
			(!e || !e.members.length) && this.safeToRemove();
		}))), null;
	}
	componentDidUpdate() {
		let { visualElement: e, layoutAnchor: t } = this.props, { projection: n } = e;
		n && (n.options.layoutAnchor = t, n.root.didUpdate(), Jm.postRender(() => {
			!n.currentAnimation && n.isLead() && this.safeToRemove();
		}));
	}
	componentWillUnmount() {
		let { visualElement: e, layoutGroup: t, switchLayoutGroup: n } = this.props, { projection: r } = e;
		Iy = !0, r && (r.scheduleCheckAfterUnmount(), t && t.group && t.group.remove(r), n && n.deregister && n.deregister(r));
	}
	safeToRemove() {
		let { safeToRemove: e } = this.props;
		e && e();
	}
	render() {
		return null;
	}
};
function Ry(e) {
	let [t, n] = ov(), r = (0, _.useContext)(mc);
	return (0, Z.jsx)(Ly, {
		...e,
		layoutGroup: r,
		switchLayoutGroup: (0, _.useContext)(Hv),
		isPresent: t,
		safeToRemove: n
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/drag.mjs
var zy = {
	pan: { Feature: Fy },
	drag: {
		Feature: Ny,
		ProjectionNode: Z_,
		MeasureLayout: Ry
	}
};
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/hover.mjs
function By(e, t, n) {
	let { props: r } = e;
	e.animationState && r.whileHover && e.animationState.setActive("whileHover", n === "Start");
	let i = r["onHover" + n];
	i && $.postRender(() => i(t, ny(t)));
}
var Vy = class extends eg {
	mount() {
		let { current: e } = this.node;
		e && (this.unmount = th(e, (e, t) => (By(this.node, t, "Start"), (e) => By(this.node, e, "End"))));
	}
	unmount() {}
}, Hy = class extends eg {
	constructor() {
		super(...arguments), this.isActive = !1;
	}
	onFocus() {
		let e = !1;
		try {
			e = this.node.current.matches(":focus-visible");
		} catch {
			e = !0;
		}
		e && this.node.animationState && (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
	}
	onBlur() {
		this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
	}
	mount() {
		this.unmount = Dc(a_(this.node.current, "focus", () => this.onFocus()), a_(this.node.current, "blur", () => this.onBlur()));
	}
	unmount() {}
};
//#endregion
//#region node_modules/framer-motion/dist/es/gestures/press.mjs
function Uy(e, t, n) {
	let { props: r } = e;
	if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
	e.animationState && r.whileTap && e.animationState.setActive("whileTap", n === "Start");
	let i = r["onTap" + (n === "End" ? "" : n)];
	i && $.postRender(() => i(t, ny(t)));
}
var Wy = class extends eg {
	mount() {
		let { current: e } = this.node;
		if (!e) return;
		let { globalTapTarget: t, propagate: n } = this.node.props;
		this.unmount = mh(e, (e, t) => (Uy(this.node, t, "Start"), (e, { success: t }) => Uy(this.node, e, t ? "End" : "Cancel")), {
			useGlobalTarget: t,
			stopPropagation: n?.tap === !1
		});
	}
	unmount() {}
}, Gy = /* @__PURE__ */ new WeakMap(), Ky = /* @__PURE__ */ new WeakMap(), qy = (e) => {
	let t = Gy.get(e.target);
	t && t(e);
}, Jy = (e) => {
	e.forEach(qy);
};
function Yy({ root: e, ...t }) {
	let n = e || document;
	Ky.has(n) || Ky.set(n, {});
	let r = Ky.get(n), i = JSON.stringify(t);
	return r[i] || (r[i] = new IntersectionObserver(Jy, {
		root: e,
		...t
	})), r[i];
}
function Xy(e, t, n) {
	let r = Yy(t);
	return Gy.set(e, n), r.observe(e), () => {
		Gy.delete(e), r.unobserve(e);
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var Zy = {
	some: 0,
	all: 1
}, Qy = class extends eg {
	constructor() {
		super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
	}
	startObserver() {
		this.stopObserver?.();
		let { viewport: e = {} } = this.node.getProps(), { root: t, margin: n, amount: r = "some", once: i } = e, a = {
			root: t ? t.current : void 0,
			rootMargin: n,
			threshold: typeof r == "number" ? r : Zy[r]
		}, o = (e) => {
			let { isIntersecting: t } = e;
			if (this.isInView === t || (this.isInView = t, i && !t && this.hasEnteredView)) return;
			t && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", t);
			let { onViewportEnter: n, onViewportLeave: r } = this.node.getProps(), a = t ? n : r;
			a && a(e);
		};
		this.stopObserver = Xy(this.node.current, a, o);
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver > "u") return;
		let { props: e, prevProps: t } = this.node;
		[
			"amount",
			"margin",
			"root"
		].some($y(e, t)) && this.startObserver();
	}
	unmount() {
		this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
	}
};
function $y({ viewport: e = {} }, { viewport: t = {} } = {}) {
	return (n) => e[n] !== t[n];
}
//#endregion
//#region node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var eb = {
	inView: { Feature: Qy },
	tap: { Feature: Wy },
	focus: { Feature: Hy },
	hover: { Feature: Vy }
}, tb = { layout: {
	ProjectionNode: Z_,
	MeasureLayout: Ry
} }, nb = /*@__PURE__*/ Zv({
	...ty,
	...eb,
	...zy,
	...tb
}, Qv);
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-motion-value.mjs
function rb(e) {
	let t = hc(() => np(e)), { isStatic: n } = (0, _.useContext)(Q_);
	if (n) {
		let [, n] = (0, _.useState)(e);
		(0, _.useEffect)(() => t.on("change", n), []);
	}
	return t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs
function ib() {
	!Gh.current && qh();
	let [e] = (0, _.useState)(Wh.current);
	return e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function ab(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function ob(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && ab(t) ? em(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function sb(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function cb(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function lb(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i.at > t && i.at < n && (yc(e, i), r--);
	}
}
function ub(e, t, n, r, i, a) {
	lb(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: eu(i, a, r[o]),
		easing: /* @__PURE__ */ Yc(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function db(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function fb(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var pb = "easeInOut", mb = 20;
function hb(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), u = 0, d = 0, f = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, d);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, cb(d, o.at, u, l));
			continue;
		}
		let [p, m, h = {}] = o;
		h.at !== void 0 && (d = cb(d, h.at, u, l));
		let g = 0, _ = (e, n, r, o = 0, s = 0) => {
			let c = vb(e), { delay: l = 0, times: u = Wu(c), type: p = t.type || "keyframes", repeat: m, repeatType: h, repeatDelay: _ = 0, ...v } = n, { ease: y = t.ease || "easeOut", duration: b } = n, x = typeof l == "function" ? l(o, s) : l, S = c.length, C = uf(p) ? p : i?.[p || "keyframes"];
			if (S <= 2 && C) {
				let e = 100;
				if (S === 2 && xb(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...v
				};
				b !== void 0 && (n.duration = /* @__PURE__ */ Ac(b));
				let r = Du(n, e, C);
				y = r.ease, b = r.duration;
			}
			b ??= a;
			let w = d + x;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let T = u.length - c.length;
			if (T > 0 && Uu(u, T), c.length === 1 && c.unshift(null), m && `${m}${mb}`, m && m < mb) {
				let e = b > 0 ? _ / b : 0;
				b = sb(b, m, _);
				let t = [...c], n = [...u];
				y = Array.isArray(y) ? [...y] : [y];
				let r = [...y], i = h === "reverse" || h === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), h === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ Lc(e) : e)));
				for (let s = 0; s < m; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), y.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), y.push(e === 0 ? "linear" : /* @__PURE__ */ Yc(f, e - 1));
				}
				db(u, m, e);
			}
			let E = w + b;
			ub(r, c, y, u, w, E), g = Math.max(x + b, g), f = Math.max(E, f);
		};
		if (Tp(p)) {
			let e = gb(p, s);
			_(m, h, _b("default", e));
		} else {
			let e = ob(p, m, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				m = m, h = h;
				let r = e[n], i = gb(r, s);
				for (let e in m) _(m[e], yb(h, e), _b(e, i), n, t);
			}
		}
		u = d, d += g;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(fb);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ Oc(0, f, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(pb)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
				keyframes: {},
				transition: {}
			});
			let u = o.get(r);
			u.keyframes[i] = s;
			let { type: d, ...p } = t;
			u.transition[i] = {
				...p,
				duration: f,
				ease: l,
				times: c,
				...n
			};
		}
	}), o;
}
function gb(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function _b(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function vb(e) {
	return Array.isArray(e) ? e : [e];
}
function yb(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var bb = (e) => typeof e == "number", xb = (e) => e.every(bb);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function Sb(e, t) {
	return Tp(e) || typeof e == "number" || typeof e == "string" && !ab(t);
}
function Cb(e, t, n, r) {
	let i = [];
	if (Sb(e, t)) i.push(i_(e, ab(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = ob(e, t, r), o = a.length;
		for (let e = 0; e < o; e++) {
			let r = a[e], s = { ...n };
			"delay" in s && typeof s.delay == "function" && (s.delay = s.delay(e, o)), r instanceof Element ? i.push(...Km(r, t, s, Ih.get(r))) : i.push(...Xp(Jp(r) ?? qm, r, t, s));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function wb(e, t, n) {
	let r = [];
	return hb(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = np(0);
			return n.on("change", t), e.length === 1 ? [n, [0, 1]] : e.length === 2 ? [
				n,
				[0, 1],
				e[1]
			] : [
				n,
				e[1],
				e[2]
			];
		}
		return e;
	}), t, n, { spring: zu }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...Cb(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function Tb(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function Eb(e = {}) {
	let { scope: t, reduceMotion: n, skipAnimations: r } = e;
	function i(e, i, a) {
		let o = [], s, c = {};
		if (n !== void 0 && (c.reduceMotion = n), r !== void 0 && (c.skipAnimations = r), Tb(e)) {
			let { onComplete: n, ...r } = i || {};
			typeof n == "function" && (s = n), o = wb(e, {
				...c,
				...r
			}, t);
		} else {
			let { onComplete: n, ...r } = a || {};
			typeof n == "function" && (s = n), o = Cb(e, i, {
				...c,
				...r
			}, t);
		}
		let l = new Xf(o);
		return s && l.finished.then(s), t && (t.animations.push(l), l.finished.then(() => {
			yc(t.animations, l);
		})), l;
	}
	return i;
}
var Db = Object.assign(Eb(), {
	addEffect: Kp,
	removeEffect: qp
}), Ob = {
	some: 0,
	all: 1
};
function kb(e, t, { root: n, margin: r, amount: i = "some" } = {}) {
	let a = em(e), o = /* @__PURE__ */ new WeakMap(), s = new IntersectionObserver((e) => {
		e.forEach((e) => {
			let n = o.get(e.target);
			if (e.isIntersecting !== !!n) {
				if (e.isIntersecting) {
					let n = t(e.target, e);
					typeof n == "function" ? o.set(e.target, n) : s.unobserve(e.target);
				} else typeof n == "function" && (n(e), o.delete(e.target));
			}
		});
	}, {
		root: n,
		rootMargin: r,
		threshold: typeof i == "number" ? i : Ob[i]
	});
	return a.forEach((e) => s.observe(e)), () => s.disconnect();
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-in-view.mjs
function Ab(e, { root: t, margin: n, amount: r, once: i = !1, initial: a = !1 } = {}) {
	let [o, s] = (0, _.useState)(a);
	return (0, _.useEffect)(() => {
		if (!e.current || i && o) return;
		let a = () => (s(!0), i ? void 0 : () => s(!1)), c = {
			root: t && t.current || void 0,
			margin: n,
			amount: r
		};
		return kb(e.current, a, c);
	}, [
		t,
		e,
		n,
		i,
		r
	]), o;
}
//#endregion
//#region node_modules/motion/dist/es/react.mjs
var jb = nb, Mb = 1.2, Nb = .07, Pb = [
	[0xe8d4a51000, "T"],
	[1e9, "B"],
	[1e6, "M"],
	[1e3, "K"]
], Fb = {
	display: "inline-block",
	height: `${Mb}em`,
	lineHeight: `${Mb}em`
}, Ib = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: 0
}, Lb = typeof window < "u" ? _.useLayoutEffect : _.useEffect, Rb = (e) => Math.min(1, Math.max(0, e)), zb = (e, t, n) => {
	let r = Rb((n - e) / (t - e));
	return r * r * (3 - 2 * r);
}, Bb = (e) => (e % 10 + 10) % 10, Vb = (e) => {
	let t = Math.log(Math.min(.5, Math.max(.001, e))), n = -t / Math.sqrt(Math.PI * Math.PI + t * t), r = Math.PI / .52, i = r / Math.sqrt(1 - n * n), a = (e) => 1 - Math.exp(-n * i * e) * (Math.cos(r * e) + n * i / r * Math.sin(r * e)), o = 1 - a(1);
	return (e) => e >= 1 ? 1 : a(e) + o * e * e * e;
}, Hb = {
	linear: (e) => e,
	easeOut: /* @__PURE__ */ Fc(.33, 1, .68, 1),
	expo: (e) => e >= 1 ? 1 : (1 - 2 ** (-10 * e)) / (1 - 2 ** -10),
	spring: Vb(.06)
}, Ub = (e) => {
	let t = e.toString();
	if (t.includes(".")) {
		let e = t.split(".")[1];
		if (parseInt(e) !== 0) return e.length;
	}
	return 0;
}, Wb = (e) => Pb.find(([t]) => Math.abs(e) >= t * .9995) || [1, ""], Gb = (e, t, n, r) => {
	if (!t) return {
		size: 1,
		label: "",
		digits: r
	};
	let [i, a] = Wb(e);
	return {
		size: i,
		label: a,
		digits: n ?? (a ? +(Math.abs(e) / i < 100) : r)
	};
}, Kb = (e, t, n) => {
	let r = (Math.abs(e) / n).toFixed(t), [i, a = ""] = r.split(".");
	return {
		negative: e < 0 && Number(r) !== 0,
		int: i,
		frac: a
	};
}, qb = (e, t) => t ? e.replace(/\B(?=(\d{3})+(?!\d))/g, t) : e, Jb = (e, t, n, { compact: r, decimals: i, places: a, separator: o }) => {
	let { size: s, label: c, digits: l } = Gb(t, r, i, a), u = Kb(e, l, s), d = Kb(t, l, s), f = Math.max(u.int.length, d.int.length), p = [], m = [];
	(u.negative || d.negative) && p.push({
		char: "-",
		enter: !u.negative,
		leave: !d.negative
	});
	let h = (e, t) => {
		if (t < 0) return Number(e.frac[-t - 1]);
		let n = e.int.length - 1 - t;
		return n >= 0 ? Number(e.int[n]) : null;
	};
	for (let e = f - 1; e >= -l; e--) {
		e === -1 && p.push({ char: "." });
		let t = h(u, e), n = h(d, e), r = {
			slot: p.length,
			index: m.length,
			place: e,
			from: t ?? 0,
			to: n ?? 0,
			enter: t === null,
			leave: n === null,
			delta: 0
		};
		p.push(r), m.push(r), o && e > 0 && e % 3 == 0 && p.push({
			char: o,
			follow: r.index
		});
	}
	let g = n || t >= e;
	return m.forEach((r, i) => {
		let a = m.length - 1 - i, o = g ? Bb(r.to - r.from) : -Bb(r.from - r.to), c = n ? Math.max(1, 3 - a) : Math.min(Math.floor(Math.abs(t - e) / (s * 10 ** (r.place + 1))), Math.max(0, 3 - a));
		r.delta = o + (g ? 10 : -10) * c;
	}), {
		slots: p,
		columns: m,
		label: c
	};
};
function Yb({ to: e, from: t = 0, direction: n = "up", delay: r = 0, duration: i = 2, className: a = "", style: o, startWhen: s = !0, separator: c = "", prefix: l = "", suffix: u = "", mode: d = "count", easing: f = "easeOut", decimals: p, format: m = "standard", trigger: h = "view", replayOnHover: g = !1, onStart: v, onEnd: y }) {
	let b = (0, _.useRef)(null), x = (0, _.useRef)(null), S = (0, _.useRef)([]), C = (0, _.useRef)([]), w = (0, _.useId)().replace(/[^\w-]/g, ""), T = n === "down" ? e : t, E = n === "down" ? t : e, D = (0, _.useRef)(T), O = (0, _.useRef)(!1), k = (0, _.useRef)(!1), [A, j] = (0, _.useState)(null), M = Ab(b, {
		once: !0,
		margin: "0px"
	}), N = h === "load" || M, P = m === "compact", F = p ?? Math.max(Ub(t), Ub(e)), I = (0, _.useCallback)((e) => {
		let { size: t, label: n, digits: r } = Gb(e, P, p, F), i = Kb(e, r, t);
		return `${l}${`${i.negative ? "-" : ""}${qb(i.int, c)}${i.frac ? `.${i.frac}` : ""}`}${n}${u}`;
	}, [
		P,
		p,
		F,
		c,
		l,
		u
	]), ee = (0, _.useMemo)(() => d === "roll" ? Jb(A ? A.from : T, A ? A.to : E, !!A?.spin, {
		compact: P,
		decimals: p,
		places: F,
		separator: c
	}) : null, [
		d,
		A,
		T,
		E,
		P,
		p,
		F,
		c
	]), [L] = (0, _.useState)(() => I(T)), R = (0, _.useRef)(null);
	Lb(() => {
		R.current = {
			formatValue: I,
			onStart: v,
			onEnd: y,
			model: ee,
			mode: d,
			easing: f,
			duration: Math.max(0, i),
			delay: r
		};
	}), Lb(() => {
		O.current || (D.current = T), d === "count" && !k.current && x.current && (x.current.textContent = I(D.current));
	}, [
		d,
		T,
		I
	]), (0, _.useEffect)(() => {
		N && s && (O.current = !0, j((e) => ({
			id: (e?.id || 0) + 1,
			from: D.current,
			to: E,
			spin: !1,
			wait: !0
		})));
	}, [
		N,
		s,
		E
	]), (0, _.useEffect)(() => {
		let e = R.current;
		if (!A || !e) return;
		let t = Hb[e.easing] || Hb.easeOut, n = e.duration, r = (e) => n > 0 ? Rb(e / n) : 1, i;
		if (e.mode === "roll" && e.model && b.current) {
			let { columns: a, slots: o } = e.model, s = Mb * (parseFloat(getComputedStyle(b.current).fontSize) || 16), c = a.length > 1 ? Math.min(Nb, n * .4 / (a.length - 1)) : 0, l = Math.max(.001, n - c * (a.length - 1)), u = a.map((n) => {
				let r = S.current[n.slot], i = r?.firstChild;
				return {
					...n,
					box: r,
					strip: i,
					blur: C.current[n.index],
					cells: i ? Array.from(i.childNodes, (e) => e.firstChild) : [],
					width: r ? r.scrollWidth : 0,
					ease: e.easing === "spring" ? Vb(Math.min(.12, Math.max(.01, .35 / Math.max(1, Math.abs(n.delta))))) : t,
					base: Math.floor(n.from),
					sigma: 0,
					presence: +!n.enter
				};
			}), d = o.map((e, t) => ({
				...e,
				node: S.current[t]
			})).filter((e) => "char" in e && !!e.node && (!!e.enter || !!e.leave || e.follow !== void 0)).map((e) => ({
				...e,
				width: e.node.scrollWidth
			})), f = (e, t, n, r) => {
				e && (e.style.width = r ? "" : `${(n * t).toFixed(2)}px`, e.style.opacity = r ? "" : n.toFixed(3));
			};
			i = (e) => {
				u.forEach((t, n) => {
					if (!t.strip) return;
					let r = Rb((e - n * c) / l), i = t.from + t.delta * t.ease(r), a = Math.floor(i);
					a !== t.base && (t.base = a, t.cells.forEach((e, t) => {
						e && (e.nodeValue = String(Bb(a + t - 1)));
					})), t.strip.style.transform = `translateY(${(-(1 + i - a) * Mb).toFixed(4)}em)`;
					let o = Math.max(0, r - .004), u = Math.min(1, r + .004), d = u > o ? Math.abs(t.delta) * Math.abs(t.ease(u) - t.ease(o)) / (u - o) / l : 0, p = r > 0 && r < 1 ? Math.min(s * .05, d * s / 600) : 0;
					(Math.abs(p - t.sigma) > .05 || p === 0 && t.sigma !== 0) && (t.sigma = p, p > .2 && t.blur ? (t.blur.setAttribute("stdDeviation", `0 ${p.toFixed(2)}`), t.strip.style.filter = `url(#${w}-${n})`) : t.strip.style.filter = ""), (t.enter || t.leave) && (t.presence = t.enter ? zb(0, .45, r) : 1 - zb(.55, 1, r), f(t.box, t.width, t.presence, t.enter && r >= 1));
				});
				let n = r(e);
				d.forEach((e) => {
					if (e.follow !== void 0) {
						let t = u[e.follow];
						t && (t.enter || t.leave) && f(e.node, e.width, t.presence, t.enter && t.presence >= 1);
					} else {
						let t = e.enter ? zb(0, .3, n) : 1 - zb(.7, 1, n);
						f(e.node, e.width, t, !!e.enter && n >= 1);
					}
				}), D.current = A.from + (A.to - A.from) * t(n);
			};
		} else i = (e) => {
			let n = A.from + (A.to - A.from) * t(r(e));
			D.current = n, x.current && (x.current.textContent = R.current?.formatValue(n) ?? "");
		};
		k.current = !0, typeof e.onStart == "function" && e.onStart();
		let a = () => {
			i(Infinity), D.current = A.to, k.current = !1, R.current?.onEnd?.();
		};
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			a();
			return;
		}
		let o = Db(0, n, {
			duration: n,
			delay: A.wait ? e.delay : 0,
			ease: "linear",
			onUpdate: i,
			onComplete: a
		});
		return () => {
			o.stop(), k.current = !1;
		};
	}, [A, w]);
	let z = () => {
		g && !k.current && O.current && j((e) => d === "roll" ? {
			id: (e?.id || 0) + 1,
			from: D.current,
			to: D.current,
			spin: !0
		} : {
			id: (e?.id || 0) + 1,
			from: T,
			to: E,
			spin: !1
		});
	}, te = I(A ? A.to : E);
	return /* @__PURE__ */ (0, Z.jsx)("span", {
		className: a,
		ref: b,
		style: {
			fontVariantNumeric: "tabular-nums",
			...o
		},
		onPointerEnter: g ? z : void 0,
		children: ee ? /* @__PURE__ */ (0, Z.jsxs)(Z.Fragment, { children: [
			/* @__PURE__ */ (0, Z.jsxs)("span", {
				"aria-hidden": "true",
				style: {
					display: "inline-flex",
					whiteSpace: "pre",
					userSelect: "none"
				},
				children: [
					l && /* @__PURE__ */ (0, Z.jsx)("span", {
						style: Fb,
						children: l
					}),
					ee.slots.map((e, t) => {
						let n = ("char" in e ? e.enter || e.follow !== void 0 && ee.columns[e.follow].enter : e.enter) ? {
							width: 0,
							opacity: 0
						} : null;
						return "char" in e ? /* @__PURE__ */ (0, Z.jsx)("span", {
							ref: (e) => {
								S.current[t] = e;
							},
							style: {
								...Fb,
								overflow: "hidden",
								...n
							},
							children: e.char
						}, t) : /* @__PURE__ */ (0, Z.jsx)("span", {
							ref: (e) => {
								S.current[t] = e;
							},
							style: {
								...Fb,
								position: "relative",
								overflow: "hidden",
								...n
							},
							children: /* @__PURE__ */ (0, Z.jsx)("span", {
								style: {
									display: "flex",
									flexDirection: "column",
									transform: "translateY(-1.2em)"
								},
								children: [
									-1,
									0,
									1,
									2
								].map((t) => /* @__PURE__ */ (0, Z.jsx)("span", {
									style: { height: `${Mb}em` },
									children: Bb(e.from + t)
								}, t))
							})
						}, t);
					}),
					ee.label && /* @__PURE__ */ (0, Z.jsx)("span", {
						style: Fb,
						children: ee.label
					}),
					u && /* @__PURE__ */ (0, Z.jsx)("span", {
						style: Fb,
						children: u
					})
				]
			}, `roll-${A?.id || 0}`),
			/* @__PURE__ */ (0, Z.jsx)("span", {
				style: Ib,
				children: te
			}),
			/* @__PURE__ */ (0, Z.jsx)("svg", {
				"aria-hidden": "true",
				width: "0",
				height: "0",
				style: { position: "absolute" },
				children: /* @__PURE__ */ (0, Z.jsx)("defs", { children: ee.columns.map((e) => /* @__PURE__ */ (0, Z.jsx)("filter", {
					id: `${w}-${e.index}`,
					x: "-20%",
					y: "-50%",
					width: "140%",
					height: "200%",
					colorInterpolationFilters: "sRGB",
					children: /* @__PURE__ */ (0, Z.jsx)("feGaussianBlur", {
						ref: (t) => {
							C.current[e.index] = t;
						},
						stdDeviation: "0 0"
					})
				}, e.index)) })
			})
		] }) : /* @__PURE__ */ (0, Z.jsx)("span", {
			ref: x,
			children: L
		}, "count")
	});
}
//#endregion
//#region src/components/react-bits/DotGrid.tsx
var Xb = "#version 300 es\nprecision highp float;\n\nlayout(location = 0) in vec2 aCorner;\nlayout(location = 1) in vec4 aMotion;\nlayout(location = 2) in vec2 aState;\n\nuniform vec2 uResolution;\nuniform float uSize;\nuniform float uSwell;\nuniform float uStretch;\nuniform float uGlow;\n\nout vec2 vLocal;\nout vec2 vPoint;\nout float vLength;\nout float vRadius;\nout float vEnergy;\n\nvoid main() {\n  float energy = aState.x;\n  float radius = 0.5 * uSize * aState.y * (1.0 + uSwell * energy);\n  float speed = length(aMotion.zw);\n  float angle = speed > 0.001 ? atan(aMotion.w, aMotion.z) : 0.0;\n  float axis = floor(angle / 1.5707963 + 0.5) * 1.5707963;\n  angle = axis + (angle - axis) * smoothstep(8.0, 70.0, speed);\n  vec2 dir = vec2(cos(angle), sin(angle));\n  float halfLength = min(uSize * 2.0, speed * uStretch * 0.02);\n  float pad = radius * (1.0 + uGlow * energy * 2.5) + 2.0;\n  vec2 local = aCorner * vec2(halfLength + pad, pad);\n  vec2 point = aMotion.xy + dir * local.x + vec2(-dir.y, dir.x) * local.y;\n  vLocal = local;\n  vPoint = point;\n  vLength = halfLength;\n  vRadius = radius;\n  vEnergy = energy;\n  vec2 clip = point / uResolution * 2.0 - 1.0;\n  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);\n}\n", Zb = "#version 300 es\nprecision highp float;\n\nin vec2 vLocal;\nin vec2 vPoint;\nin float vLength;\nin float vRadius;\nin float vEnergy;\n\nuniform vec2 uResolution;\nuniform vec3 uBase;\nuniform vec3 uActive;\nuniform float uGlow;\nuniform float uOpacity;\nuniform float uFade;\nuniform int uShape;\n\nout vec4 outColor;\n\nfloat smootherstep01(float t) {\n  t = clamp(t, 0.0, 1.0);\n  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n\nvoid main() {\n  float d;\n  if (uShape == 1) {\n    float corner = vRadius * 0.3;\n    vec2 q = abs(vLocal) - vec2(vLength + vRadius, vRadius) + corner;\n    d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - corner;\n  } else {\n    d = length(vec2(max(abs(vLocal.x) - vLength, 0.0), vLocal.y)) - vRadius;\n  }\n  float aa = max(fwidth(d), 0.0001);\n  float body = clamp(0.5 - d / aa, 0.0, 1.0);\n  float halo = uGlow * vEnergy * 0.5 * exp(-max(d, 0.0) / max(vRadius * 1.3, 0.6));\n  float alpha = body + (1.0 - body) * halo;\n  vec3 color = mix(uBase, uActive, clamp(vEnergy * 1.2, 0.0, 1.0));\n  float fade = 1.0;\n  if (uFade > 0.0) {\n    vec2 edge = min(vPoint, uResolution - vPoint) / (uFade * 0.4 * min(uResolution.x, uResolution.y));\n    fade = smootherstep01(edge.x) * smootherstep01(edge.y);\n  }\n  alpha *= uOpacity * fade;\n  outColor = vec4(color * alpha, alpha);\n}\n", Qb = (e) => {
	let t = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(e).trim());
	if (!t) return [
		1,
		1,
		1
	];
	let n = t[1].length === 3 ? t[1].replace(/./g, (e) => e + e) : t[1];
	return [
		0,
		2,
		4
	].map((e) => parseInt(n.slice(e, e + 2), 16) / 255);
}, $b = (e) => {
	let t = Math.min(1, Math.max(0, e));
	return t * t * t * (t * (t * 6 - 15) + 10);
}, ex = (e) => {
	let t = e - 1;
	return 1 + t * t * (2.9 * t + 1.9);
}, tx = (e, t, n) => {
	let r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}, nx = ({ dotSize: e = 5, gap: t = 18, baseColor: n = "#3a3446", activeColor: r = "#ffffff", proximity: i = 140, strength: a = 1, bounce: o = .6, tension: s = .4, returnDuration: c = .8, shockRadius: l = 320, shockStrength: u = 5, swell: d = .8, stretch: f = .5, glow: p = .5, shape: m = "circle", fade: h = 0, opacity: g = 1, intro: v = !0, mouseInteraction: y = !0, clickShock: b = !0, paused: x = !1, dpr: S, className: C = "", style: w }) => {
	let T = (0, _.useRef)(null), E = (0, _.useRef)(null), D = {
		dotSize: e,
		gap: t,
		baseColor: n,
		activeColor: r,
		proximity: i,
		strength: a,
		bounce: o,
		tension: s,
		returnDuration: c,
		shockRadius: l,
		shockStrength: u,
		swell: d,
		stretch: f,
		glow: p,
		shape: m,
		fade: h,
		opacity: g,
		intro: v,
		mouseInteraction: y,
		clickShock: b,
		paused: x,
		dpr: S
	}, O = (0, _.useRef)(D);
	return O.current = D, (0, _.useEffect)(() => {
		let e = T.current;
		if (!e) return;
		let t = e.getContext("webgl2", {
			alpha: !0,
			premultipliedAlpha: !0,
			antialias: !1
		});
		if (!t) return;
		let n = t.createProgram();
		if (t.attachShader(n, tx(t, t.VERTEX_SHADER, Xb)), t.attachShader(n, tx(t, t.FRAGMENT_SHADER, Zb)), t.linkProgram(n), !t.getProgramParameter(n, t.LINK_STATUS)) return;
		let r = {};
		for (let e of [
			"uResolution",
			"uSize",
			"uSwell",
			"uStretch",
			"uGlow",
			"uBase",
			"uActive",
			"uOpacity",
			"uFade",
			"uShape"
		]) r[e] = t.getUniformLocation(n, e);
		let i = t.createVertexArray();
		t.bindVertexArray(i);
		let a = t.createBuffer();
		t.bindBuffer(t.ARRAY_BUFFER, a), t.bufferData(t.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		]), t.STATIC_DRAW), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 2, t.FLOAT, !1, 0, 0);
		let o = t.createBuffer();
		t.bindBuffer(t.ARRAY_BUFFER, o), t.enableVertexAttribArray(1), t.vertexAttribPointer(1, 4, t.FLOAT, !1, 24, 0), t.vertexAttribDivisor(1, 1), t.enableVertexAttribArray(2), t.vertexAttribPointer(2, 2, t.FLOAT, !1, 24, 16), t.vertexAttribDivisor(2, 1), t.bindVertexArray(null);
		let s = window.matchMedia("(prefers-reduced-motion: reduce)").matches, c = {
			width: 0,
			height: 0,
			left: 0,
			top: 0,
			ratio: 1
		}, l = {
			count: 0,
			cols: 1,
			rows: 1,
			cell: 1,
			centerX: 0,
			centerY: 0,
			reach: 1
		}, u = /* @__PURE__ */ new Float32Array(), d = /* @__PURE__ */ new Float32Array(), f = /* @__PURE__ */ new Float32Array(), p = /* @__PURE__ */ new Float32Array(), m = /* @__PURE__ */ new Float32Array(), h = /* @__PURE__ */ new Float32Array(), g = /* @__PURE__ */ new Float32Array(), _ = /* @__PURE__ */ new Float32Array(), v = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			time: 0,
			inside: !1,
			presence: 0
		}, y = [], b = O.current.intro && !s ? -1 : null, x = !0, S = 0, C = 0, w = () => {
			let { dotSize: e, gap: n } = O.current, r = Math.max(2, e + n), i = Math.max(1, Math.floor((c.width + n) / r)), a = Math.max(1, Math.floor((c.height + n) / r)), s = (c.width - (i * r - n)) / 2 + e / 2, v = (c.height - (a * r - n)) / 2 + e / 2, y = i * a;
			u = new Float32Array(y * 2), d = new Float32Array(y * 2), f = new Float32Array(y * 2), p = new Float32Array(y * 2), m = new Float32Array(y * 2), h = new Float32Array(y * 4), g = new Float32Array(y), _ = new Float32Array(y * 6);
			for (let e = 0; e < a; e++) for (let t = 0; t < i; t++) {
				let n = (e * i + t) * 2;
				u[n] = s + t * r, u[n + 1] = v + e * r;
			}
			Object.assign(l, {
				count: y,
				cols: i,
				rows: a,
				cell: r,
				centerX: c.width / 2,
				centerY: c.height / 2,
				reach: Math.hypot(c.width, c.height) / 2
			}), t.bindBuffer(t.ARRAY_BUFFER, o), t.bufferData(t.ARRAY_BUFFER, _.byteLength, t.DYNAMIC_DRAW);
		}, D = () => {
			let t = e.getBoundingClientRect(), n = Math.min(O.current.dpr ?? window.devicePixelRatio ?? 1, 2), r = Math.max(1, Math.round(t.width)), i = Math.max(1, Math.round(t.height));
			Object.assign(c, {
				width: r,
				height: i,
				left: t.left,
				top: t.top,
				ratio: n
			}), e.width = Math.round(r * n), e.height = Math.round(i * n), w(), A(performance.now());
		}, k = (e, t) => {
			let n = O.current, r = +!s, i = 1 - .85 * Math.min(1, Math.max(0, n.bounce)), a = 4 / (i * Math.max(.2, n.returnDuration)), o = a * a, c = 2 * i * a, _ = Math.max(1, n.proximity), b = Math.hypot(v.vx, v.vy), x = n.mouseInteraction && v.inside ? 6500 * Math.tanh(b / 900) * n.strength * r : 0, S = b > .001 ? v.vx / b : 0, C = b > .001 ? v.vy / b : 0, w = l.cell * 1.4, T = y.map((e) => {
				let i = (t - e.start) / 1e3 * 650, a = $b(1 - i / Math.max(1, n.shockRadius));
				return {
					...e,
					front: i,
					amplitude: a * n.shockStrength * l.cell * .24 * r
				};
			}), E = (Math.max(0, n.tension) * 900) ** 2 / (l.cell * l.cell), D = Math.sqrt(E) * .06, k = Math.sqrt(o + 8 * E) + c + 8 * D, A = Math.min(24, Math.max(1, Math.ceil(e / Math.min(1 / 120, 1.2 / k)))), j = e / A;
			for (let e = 0; e < l.count; e++) {
				let t = e * 2, n = u[t], r = u[t + 1], i = 0, a = 0;
				if (x > 0) {
					let e = n + d[t] - v.x, o = r + d[t + 1] - v.y, s = Math.hypot(e, o);
					if (s < _) {
						let t = $b(1 - s / _) * x, n = s > .001 ? e / s : 0, r = s > .001 ? o / s : 0;
						i += t * (S + n * .6), a += t * (C + r * .6);
					}
				}
				let s = 0, c = 0, l = 0, f = 0;
				for (let e of T) {
					if (e.amplitude <= 0) continue;
					let t = n - e.x, u = r - e.y, d = Math.hypot(t, u), p = (d - e.front) / w;
					if (Math.abs(p) < 3 && d > .001) {
						let n = t / d, r = u / d, m = Math.exp(-p * p), h = e.amplitude * m, g = e.amplitude * 2 * p * m / w * 650;
						s += n * h, c += r * h, l += n * g, f += r * g, i += n * h * o * .35, a += r * h * o * .35;
					}
				}
				p[t] = i, p[t + 1] = a;
				let m = e * 4;
				h[m] = s, h[m + 1] = c, h[m + 2] = l, h[m + 3] = f;
			}
			let { cols: M, rows: N } = l, P = M * 2;
			for (let e = 0; e < A; e++) {
				for (let e = 0; e < N; e++) for (let t = 0; t < M; t++) {
					let n = (e * M + t) * 2, r = p[n] - o * d[n] - c * f[n], i = p[n + 1] - o * d[n + 1] - c * f[n + 1];
					if (E > 0) {
						let a = -4 * d[n], o = -4 * d[n + 1], s = -4 * f[n], c = -4 * f[n + 1];
						t > 0 && (a += d[n - 2], o += d[n - 1], s += f[n - 2], c += f[n - 1]), t < M - 1 && (a += d[n + 2], o += d[n + 3], s += f[n + 2], c += f[n + 3]), e > 0 && (a += d[n - P], o += d[n - P + 1], s += f[n - P], c += f[n - P + 1]), e < N - 1 && (a += d[n + P], o += d[n + P + 1], s += f[n + P], c += f[n + P + 1]), r += E * a + D * s, i += E * o + D * c;
					}
					m[n] = f[n] + r * j, m[n + 1] = f[n + 1] + i * j;
				}
				for (let e = 0; e < d.length; e++) f[e] = m[e], d[e] += f[e] * j;
			}
			for (let e = 0; e < l.count; e++) {
				let t = e * 2, n = e * 4;
				g[e] = Math.min(1, Math.hypot(f[t] + h[n + 2], f[t + 1] + h[n + 3]) / 380 * .85 + Math.hypot(d[t] + h[n], d[t + 1] + h[n + 1]) / (l.cell * 2.2) * .35);
			}
			for (let e = y.length - 1; e >= 0; e--) T[e].front > n.shockRadius + w * 3 && y.splice(e, 1);
			let F = 1 - Math.exp(-e / .08);
			v.vx -= v.vx * F, v.vy -= v.vy * F;
			let I = n.mouseInteraction && v.inside ? 1 : 0;
			v.presence += (I - v.presence) * (1 - Math.exp(-e / .2));
		}, A = (a) => {
			let p = O.current, m = Math.max(1, p.proximity), y = (b === null ? Infinity : b < 0 ? 0 : (a - b) / 1e3) * l.reach * 1.25, x = l.cell * 4;
			for (let e = 0; e < l.count; e++) {
				let t = e * 2, n = e * 4, r = u[t] + d[t] + h[n], i = u[t + 1] + d[t + 1] + h[n + 1], a = g[e];
				if (v.presence > .001) {
					let e = Math.hypot(r - v.x, i - v.y);
					e < m && (a = Math.max(a, $b(1 - e / m) * .4 * v.presence));
				}
				let o = 1;
				if (b !== null) {
					let e = Math.hypot(u[t] - l.centerX, u[t + 1] - l.centerY), n = Math.min(1, Math.max(0, (y - e) / x));
					o = n >= 1 ? 1 : Math.max(0, ex(n)), a = Math.max(a, Math.sin(n * Math.PI) * .6);
				}
				let s = e * 6;
				_[s] = r, _[s + 1] = i, _[s + 2] = f[t] + h[n + 2], _[s + 3] = f[t + 1] + h[n + 3], _[s + 4] = a, _[s + 5] = o;
			}
			let S = Qb(p.baseColor), C = Qb(p.activeColor);
			t.viewport(0, 0, e.width, e.height), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.useProgram(n), t.uniform2f(r.uResolution, c.width, c.height), t.uniform1f(r.uSize, Math.max(.5, p.dotSize)), t.uniform1f(r.uSwell, s ? 0 : Math.max(0, p.swell)), t.uniform1f(r.uStretch, s ? 0 : Math.max(0, p.stretch)), t.uniform1f(r.uGlow, Math.max(0, p.glow)), t.uniform3f(r.uBase, S[0], S[1], S[2]), t.uniform3f(r.uActive, C[0], C[1], C[2]), t.uniform1f(r.uOpacity, Math.min(1, Math.max(0, p.opacity))), t.uniform1f(r.uFade, Math.min(1, Math.max(0, p.fade))), t.uniform1i(r.uShape, +(p.shape === "square")), t.bindVertexArray(i), t.bindBuffer(t.ARRAY_BUFFER, o), t.bufferSubData(t.ARRAY_BUFFER, 0, _), t.drawArraysInstanced(t.TRIANGLE_STRIP, 0, 4, l.count), t.bindVertexArray(null);
		}, j = (e) => {
			if (y.length) return !1;
			if (b !== null) {
				if (b < 0 || (e - b) / 1e3 < 1.6) return !1;
				b = null;
			}
			if (Math.abs(v.vx) + Math.abs(v.vy) > 1) return !1;
			let t = O.current.mouseInteraction && v.inside ? 1 : 0;
			if (Math.abs(t - v.presence) > .002) return !1;
			for (let e = 0; e < d.length; e++) if (Math.abs(d[e]) > .02 || Math.abs(f[e]) > .5) return !1;
			return !0;
		}, M = (e) => {
			if (S = 0, O.current.paused || !x) return;
			b !== null && b < 0 && (b = e);
			let t = Math.min(.05, (e - C) / 1e3 || 0);
			C = e, k(t, e), A(e), j(e) || (S = requestAnimationFrame(M));
		}, N = () => {
			S || O.current.paused || !x || (C = performance.now(), S = requestAnimationFrame(M));
		}, P = (t) => {
			let n = e.getBoundingClientRect();
			return c.left = n.left, c.top = n.top, [t.clientX - n.left, t.clientY - n.top];
		}, F = (e) => {
			if (!O.current.mouseInteraction) return;
			let [t, n] = P(e), r = t >= 0 && n >= 0 && t <= c.width && n <= c.height, i = e.timeStamp || performance.now();
			if (r && v.inside && v.time) {
				let e = Math.max(4, i - v.time) / 1e3, r = (t - v.x) / e, a = (n - v.y) / e;
				v.vx += (r - v.vx) * .6, v.vy += (a - v.vy) * .6;
			} else v.vx = 0, v.vy = 0;
			v.x = t, v.y = n, v.time = i, (r !== v.inside || r) && (v.inside = r, N());
		}, I = () => {
			v.inside = !1, v.time = 0, N();
		}, ee = (e) => {
			e.relatedTarget || I();
		}, L = (e) => {
			if (!O.current.clickShock || s) return;
			let [t, n] = P(e);
			t < 0 || n < 0 || t > c.width || n > c.height || (y.push({
				x: t,
				y: n,
				start: performance.now()
			}), y.length > 6 && y.shift(), N());
		};
		window.addEventListener("pointermove", F, { passive: !0 }), window.addEventListener("pointerdown", L, { passive: !0 }), window.addEventListener("pointerout", ee), window.addEventListener("blur", I);
		let R = new ResizeObserver(() => {
			D(), N();
		});
		R.observe(e);
		let z = new IntersectionObserver(([e]) => {
			x = e.isIntersecting, x && N();
		});
		z.observe(e);
		let te = () => {
			document.hidden ? (cancelAnimationFrame(S), S = 0) : N();
		};
		return document.addEventListener("visibilitychange", te), D(), N(), E.current = {
			rebuild: () => {
				w(), A(performance.now()), N();
			},
			refresh: () => {
				A(performance.now()), N();
			}
		}, () => {
			cancelAnimationFrame(S), R.disconnect(), z.disconnect(), window.removeEventListener("pointermove", F), window.removeEventListener("pointerdown", L), window.removeEventListener("pointerout", ee), window.removeEventListener("blur", I), document.removeEventListener("visibilitychange", te), t.deleteBuffer(a), t.deleteBuffer(o), t.deleteVertexArray(i), t.deleteProgram(n), E.current = null;
		};
	}, []), (0, _.useEffect)(() => {
		E.current?.rebuild();
	}, [e, t]), (0, _.useEffect)(() => {
		E.current?.refresh();
	}, [
		n,
		r,
		d,
		f,
		p,
		m,
		h,
		g,
		x,
		i,
		y
	]), /* @__PURE__ */ (0, Z.jsx)("div", {
		className: `dot-grid ${C}`.trim(),
		style: w,
		children: /* @__PURE__ */ (0, Z.jsx)("canvas", {
			ref: T,
			className: "dot-grid__canvas"
		})
	});
}, rx = {
	stiffness: 170,
	damping: 16,
	mass: 1
}, ix = (e, t, n) => {
	let r = Math.min(1, Math.max(0, (n - e) / (t - e)));
	return r * r * (3 - 2 * r);
}, ax = /* @__PURE__ */ new Set(), ox = {
	pointer: null,
	owner: null
}, sx = null, cx = (e, t) => {
	let n = t.x - (e.left + e.width / 2), r = t.y - (e.top + e.height / 2);
	return {
		dx: n,
		dy: r,
		outside: Math.hypot(Math.max(0, Math.abs(n) - e.width / 2), Math.max(0, Math.abs(r) - e.height / 2))
	};
}, lx = () => {
	let e = null, t = Infinity, n = Infinity;
	for (let r of ax) {
		let i = r.settings.current, a = null;
		if (ox.pointer && !i.disabled && !r.reduce && (a = cx(r.wrapper.getBoundingClientRect(), ox.pointer), a.outside > i.padding && (a = null)), !i.exclusive) {
			(a || r.active) && r.wake();
			continue;
		}
		if (!a) continue;
		let o = Math.hypot(a.dx, a.dy);
		(a.outside < t || a.outside === t && o < n) && (e = r, t = a.outside, n = o);
	}
	let r = ox.owner;
	ox.owner = e, r && r !== e && r.wake(), e && e.wake();
}, ux = () => {
	let e = (e) => {
		e.pointerType !== "touch" && (ox.pointer = {
			x: e.clientX,
			y: e.clientY
		}, lx());
	}, t = () => {
		ox.pointer = null, lx();
	};
	return window.addEventListener("pointermove", e, { passive: !0 }), window.addEventListener("scroll", lx, {
		passive: !0,
		capture: !0
	}), document.documentElement.addEventListener("pointerleave", t), window.addEventListener("blur", t), () => {
		window.removeEventListener("pointermove", e), window.removeEventListener("scroll", lx, { capture: !0 }), document.documentElement.removeEventListener("pointerleave", t), window.removeEventListener("blur", t);
	};
}, dx = ({ children: e, padding: t = 100, disabled: n = !1, magnetStrength: r = 2, maxOffset: i, exclusive: a = !0, axis: o = "both", tilt: s = 0, scale: c = 1, spring: l, onActiveChange: u, wrapperClassName: d = "", innerClassName: f = "", style: p, ...m }) => {
	let h = (0, _.useRef)(null), g = (0, _.useRef)(null), v = (0, _.useRef)(null), y = {
		padding: Math.max(0, t),
		disabled: n,
		strength: Math.max(.1, r),
		maxOffset: i,
		exclusive: a,
		axis: o,
		tilt: s,
		scale: c,
		stiffness: Math.max(1, l?.stiffness ?? rx.stiffness),
		damping: Math.max(0, l?.damping ?? rx.damping),
		mass: Math.max(.01, l?.mass ?? rx.mass),
		onActiveChange: u
	}, b = (0, _.useRef)(y);
	return b.current = y, (0, _.useEffect)(() => {
		let e = h.current, t = g.current;
		if (!e || !t) return;
		let n = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, r = {
			x: 0,
			y: 0,
			tiltX: 0,
			tiltY: 0,
			scale: 1
		}, i = {
			x: 0,
			y: 0,
			tiltX: 0,
			tiltY: 0,
			scale: 0
		}, a = !1, o = 0, s = 0, c = (e, t) => {
			let n = b.current, a = !0;
			return Object.keys(r).forEach((o) => {
				let s = n.stiffness * (e[o] - r[o]) - n.damping * i[o];
				i[o] += s / n.mass * t, r[o] += i[o] * t;
				let c = o === "scale" ? .001 : .05;
				(Math.abs(e[o] - r[o]) > c || Math.abs(i[o]) > c) && (a = !1);
			}), a;
		}, l = () => {
			let t = b.current, r = {
				x: 0,
				y: 0,
				tiltX: 0,
				tiltY: 0,
				scale: 1
			};
			if (t.disabled || n || !ox.pointer || t.exclusive && ox.owner !== p) return {
				target: r,
				engaged: !1
			};
			let i = e.getBoundingClientRect(), { dx: a, dy: o, outside: s } = cx(i, ox.pointer);
			if (s > t.padding) return {
				target: r,
				engaged: !1
			};
			let c = t.padding > 0 ? 1 - ix(t.padding * .5, t.padding, s) : 1, l = t.axis === "y" ? 0 : a / t.strength * c, u = t.axis === "x" ? 0 : o / t.strength * c;
			if (t.maxOffset !== void 0 && t.maxOffset !== null) {
				let e = Math.hypot(l, u);
				e > t.maxOffset && (l *= t.maxOffset / e, u *= t.maxOffset / e);
			}
			let d = Math.max(-1, Math.min(1, a / Math.max(i.width / 2, 1))), f = Math.max(-1, Math.min(1, o / Math.max(i.height / 2, 1)));
			return r.x = l, r.y = u, r.tiltX = -f * t.tilt * c, r.tiltY = d * t.tilt * c, r.scale = 1 + (t.scale - 1) * c, {
				target: r,
				engaged: !0
			};
		}, u = () => {
			let { x: e, y: n, tiltX: i, tiltY: a, scale: o } = r, s = Math.abs(i) > .01 || Math.abs(a) > .01;
			t.style.transform = `translate3d(${e.toFixed(2)}px, ${n.toFixed(2)}px, 0)${s ? ` perspective(800px) rotateX(${i.toFixed(2)}deg) rotateY(${a.toFixed(2)}deg)` : ""}${Math.abs(o - 1) > 5e-4 ? ` scale(${o.toFixed(4)})` : ""}`;
		}, d = (t) => {
			o = 0;
			let n = s ? Math.min((t - s) / 1e3, 1 / 30) : 1 / 60;
			s = t;
			let { target: f, engaged: m } = l();
			m !== a && (a = m, p.active = m, m ? e.setAttribute("data-magnet-active", "") : e.removeAttribute("data-magnet-active"), b.current.onActiveChange?.(m));
			let h = Math.ceil(n / (1 / 120)), g = !0;
			for (let e = 0; e < h; e++) g = c(f, n / h);
			g && Object.keys(r).forEach((e) => {
				r[e] = f[e], i[e] = 0;
			}), u(), g ? s = 0 : o = requestAnimationFrame(d);
		};
		function f() {
			o ||= requestAnimationFrame(d);
		}
		let p = {
			wrapper: e,
			settings: b,
			reduce: n,
			wake: f,
			active: !1
		};
		return ax.add(p), sx ||= ux(), v.current = () => {
			lx(), f();
		}, () => {
			cancelAnimationFrame(o), v.current = null, ax.delete(p), ox.owner === p && (ox.owner = null), !ax.size && sx && (sx(), sx = null);
		};
	}, []), (0, _.useEffect)(() => {
		v.current?.();
	}), /* @__PURE__ */ (0, Z.jsx)("div", {
		ref: h,
		className: d,
		style: {
			position: "relative",
			display: "inline-block",
			...p
		},
		...m,
		children: /* @__PURE__ */ (0, Z.jsx)("div", {
			ref: g,
			className: f,
			style: { willChange: "transform" },
			children: e
		})
	});
};
//#endregion
//#region src/components/react-bits/RotatingText.tsx
function fx(...e) {
	return e.filter(Boolean).join(" ");
}
var px = typeof window < "u" ? _.useLayoutEffect : _.useEffect, mx = typeof Intl < "u" && Intl.Segmenter ? new Intl.Segmenter("en", { granularity: "grapheme" }) : null, hx = (e) => mx ? Array.from(mx.segment(e), (e) => e.segment) : Array.from(e), gx = (e, t) => e && typeof e == "object" && !Array.isArray(e) ? {
	...e,
	filter: t
} : e, _x = {
	type: "spring",
	damping: 25,
	stiffness: 300
}, vx = {
	type: "spring",
	damping: 34,
	stiffness: 320
}, yx = {
	transformOrigin: "50% 50% -0.45em",
	backfaceVisibility: "hidden"
}, bx = {
	slide: (e) => ({
		initial: {
			y: e ? "100%" : "-100%",
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: e ? "-120%" : "120%",
			opacity: 0
		},
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 300
		}
	}),
	flip: (e) => ({
		initial: {
			rotateX: e ? -90 : 90,
			opacity: 0,
			transformPerspective: 480
		},
		animate: {
			rotateX: 0,
			opacity: 1,
			transformPerspective: 480
		},
		exit: {
			rotateX: e ? 90 : -90,
			opacity: 0,
			transformPerspective: 480
		},
		transition: {
			type: "tween",
			duration: .6,
			ease: [
				.34,
				1.4,
				.64,
				1
			]
		},
		exitTransition: {
			type: "tween",
			duration: .32,
			ease: [
				.5,
				0,
				.75,
				0
			]
		}
	}),
	blur: (e) => ({
		initial: {
			y: e ? "45%" : "-45%",
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: e ? "-45%" : "45%",
			opacity: 0
		},
		transition: {
			type: "tween",
			duration: .55,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}),
	scale: (e) => ({
		initial: {
			scale: e ? .35 : 1.7,
			opacity: 0
		},
		animate: {
			scale: 1,
			opacity: 1
		},
		exit: {
			scale: e ? 1.7 : .35,
			opacity: 0
		},
		transition: {
			type: "spring",
			damping: 17,
			stiffness: 240
		}
	}),
	drop: () => ({
		initial: {
			y: "-110%",
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: "110%",
			opacity: 0
		},
		transition: {
			type: "spring",
			damping: 18,
			stiffness: 320,
			mass: .9
		},
		exitTransition: {
			type: "tween",
			duration: .3,
			ease: [
				.55,
				0,
				1,
				.45
			]
		}
	})
}, xx = (e) => {
	let t = String(e ?? "").trim(), n = null, r = t.match(/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
	if (r) {
		let e = r[1].length < 6 ? [...r[1].slice(0, 3)].map((e) => e + e).join("") : r[1].slice(0, 6);
		n = [
			0,
			2,
			4
		].map((t) => parseInt(e.slice(t, t + 2), 16));
	} else {
		let e = t.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
		e && (n = e.slice(1, 4).map(Number));
	}
	if (!n) return;
	let [i, a, o] = n.map((e) => {
		let t = Math.min(Math.max(e / 255, 0), 1);
		return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * i + .7152 * a + .0722 * o > .3 ? "#0b0b0c" : "#ffffff";
}, Sx = (0, _.forwardRef)((e, t) => {
	let { texts: n, transition: r, initial: i, animate: a, exit: o, effect: s = "slide", direction: c = "up", highlight: l = !1, highlightColor: u = "#a855f7", animatePresenceMode: d = "wait", animatePresenceInitial: f = !1, rotationInterval: p = 2e3, staggerDuration: m = 0, staggerFrom: h = "first", loop: g = !0, auto: v = !0, pauseOnHover: y = !1, blur: b = 0, splitBy: x = "characters", onNext: S, onMouseEnter: C, onMouseLeave: w, mainClassName: T, splitLevelClassName: E, elementLevelClassName: D, style: O, ...k } = e, [A, j] = (0, _.useState)(0), [M, N] = (0, _.useState)(!1), P = (0, _.useRef)(0), F = (0, _.useRef)(S);
	F.current = S;
	let I = (0, _.useRef)(null), ee = rb("auto"), L = ib(), R = Math.max(n.length - 1, 0), z = Math.min(A, R), te = (0, _.useMemo)(() => {
		let e = n[z] ?? "";
		if (x === "characters") {
			let t = e.split(" ");
			return t.map((e, n) => ({
				characters: hx(e),
				needsSpace: n !== t.length - 1
			}));
		}
		return x === "words" ? e.split(" ").map((e, t, n) => ({
			characters: [e],
			needsSpace: t !== n.length - 1
		})) : x === "lines" ? e.split("\n").map((e, t, n) => ({
			characters: [e],
			needsSpace: t !== n.length - 1
		})) : e.split(x).map((e, t, n) => ({
			characters: [e],
			needsSpace: t !== n.length - 1
		}));
	}, [
		n,
		z,
		x
	]), ne = (0, _.useMemo)(() => {
		let e = te.reduce((e, t) => e + t.characters.length, 0);
		return {
			total: e,
			shuffled: Array.from({ length: e }, (e, t) => t).sort(() => Math.random() - .5)
		};
	}, [te]), B = (e) => {
		let { total: t, shuffled: n } = ne;
		return h === "first" ? e * m : h === "last" ? (t - 1 - e) * m : h === "center" ? Math.abs(Math.floor(t / 2) - e) * m : h === "random" ? n[e] * m : Math.abs(h - e) * m;
	}, re = (0, _.useCallback)((e) => {
		e !== P.current && (P.current = e, j(e), F.current?.(e));
	}, []), ie = (0, _.useCallback)(() => {
		let e = Math.min(P.current, R);
		re(e < R ? e + 1 : g ? 0 : e);
	}, [
		R,
		g,
		re
	]), ae = (0, _.useCallback)(() => {
		let e = Math.min(P.current, R);
		re(e > 0 ? e - 1 : g ? R : e);
	}, [
		R,
		g,
		re
	]), V = (0, _.useCallback)((e) => re(Math.max(0, Math.min(e, R))), [R, re]), oe = (0, _.useCallback)(() => re(0), [re]);
	(0, _.useImperativeHandle)(t, () => ({
		next: ie,
		previous: ae,
		jumpTo: V,
		reset: oe
	}), [
		ie,
		ae,
		V,
		oe
	]);
	let se = y && M;
	(0, _.useEffect)(() => {
		if (!v || se) return;
		let e = setTimeout(ie, p);
		return () => clearTimeout(e);
	}, [
		ie,
		p,
		v,
		se,
		z
	]), px(() => {
		let e = I.current;
		if (!l || !e) {
			ee.set("auto");
			return;
		}
		let t = null, n = !1, r = () => {
			let r = e.offsetWidth + 1;
			t?.stop(), !n || L ? (n = !0, ee.set(r)) : t = Db(ee, r, vx);
		};
		r();
		let i = typeof ResizeObserver < "u" ? new ResizeObserver(r) : null;
		return i?.observe(e), () => {
			i?.disconnect(), t?.stop();
		};
	}, [
		l,
		L,
		ee
	]);
	let H = (e) => {
		y && N(!0), C?.(e);
	}, U = (e) => {
		N(!1), w?.(e);
	}, W = (bx[s] ?? bx.slide)(c !== "down"), ce = b > 0 ? b : s === "blur" ? 10 : 0, le = i ?? W.initial, ue = a ?? W.animate, de = o ?? W.exit, G = r ?? W.transition, K = r || o ? null : W.exitTransition, fe = ce > 0 ? gx(le, `blur(${ce}px)`) : le, q = ce > 0 ? gx(ue, "blur(0px)") : ue, pe = ce > 0 ? gx(de, `blur(${ce}px)`) : de, me = s === "flip" ? yx : void 0, he = l ? {
		...O,
		width: ee,
		backgroundColor: u,
		color: xx(u) ?? O?.color
	} : O, ge = /* @__PURE__ */ (0, Z.jsx)(lv, {
		mode: d,
		initial: f,
		children: /* @__PURE__ */ (0, Z.jsx)(jb.span, {
			className: fx(x === "lines" ? "text-rotate-lines" : "text-rotate"),
			layout: !l,
			"aria-hidden": "true",
			children: te.map((e, t, n) => {
				let r = n.slice(0, t).reduce((e, t) => e + t.characters.length, 0);
				return /* @__PURE__ */ (0, Z.jsxs)("span", {
					className: fx("text-rotate-word", E),
					children: [e.characters.map((e, t) => {
						let n = B(r + t);
						return /* @__PURE__ */ (0, Z.jsx)(jb.span, {
							initial: fe,
							animate: q,
							exit: K ? {
								...pe,
								transition: {
									...K,
									delay: n
								}
							} : pe,
							transition: {
								...G,
								delay: n
							},
							className: fx("text-rotate-element", D),
							style: me,
							children: e
						}, t);
					}), e.needsSpace && /* @__PURE__ */ (0, Z.jsx)("span", {
						className: "text-rotate-space",
						children: " "
					})]
				}, t);
			})
		}, z)
	});
	return /* @__PURE__ */ (0, Z.jsx)(gv, {
		reducedMotion: "user",
		children: /* @__PURE__ */ (0, Z.jsxs)(jb.span, {
			className: fx("text-rotate", l && "text-rotate-highlight", T),
			...k,
			style: he,
			onMouseEnter: H,
			onMouseLeave: U,
			layout: !l,
			transition: r ?? _x,
			children: [/* @__PURE__ */ (0, Z.jsx)("span", {
				className: "text-rotate-sr-only",
				children: n[z]
			}), l ? /* @__PURE__ */ (0, Z.jsx)("span", {
				ref: I,
				className: "text-rotate-highlight-content",
				children: ge
			}) : ge]
		})
	});
});
Sx.displayName = "RotatingText";
//#endregion
//#region node_modules/gsap/SplitText.js
var Cx, wx, Tx = typeof Symbol == "function" ? Symbol() : "_split", Ex, Dx = () => Ex || Kx.register(window.gsap), Ox = typeof Intl < "u" && "Segmenter" in Intl ? new Intl.Segmenter() : 0, kx = (e) => e ? typeof e == "string" ? kx(document.querySelectorAll(e)) : "length" in e ? Array.from(e).reduce((e, t) => (typeof t == "string" ? e.push(...kx(t)) : e.push(t), e), []) : [e] : [], Ax = (e) => kx(e).filter((e) => e && e.nodeType === 1), jx = [], Mx = function() {}, Nx = { add: (e) => e() }, Px = /\s+/g, Fx = /* @__PURE__ */ RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), Ix = {
	left: 0,
	top: 0,
	width: 0,
	height: 0
}, Lx = (e, t) => {
	for (; ++t < e.length && e[t] === Ix;);
	return e[t] || Ix;
}, Rx = ({ element: e, html: t, ariaL: n, ariaH: r }) => {
	e.innerHTML = t, n ? e.setAttribute("aria-label", n) : e.removeAttribute("aria-label"), r ? e.setAttribute("aria-hidden", r) : e.removeAttribute("aria-hidden");
}, zx = (e, t) => {
	if (t) {
		let n = new Set(e.join("").match(t) || jx), r = e.length, i, a, o, s;
		if (n.size) for (; --r > -1;) {
			a = e[r];
			for (o of n) if (o.startsWith(a) && o.length > a.length) {
				for (i = 0, s = a; o.startsWith(s += e[r + ++i]) && s.length < o.length;);
				if (i && s.length === o.length) {
					e[r] = o, e.splice(r + 1, i);
					break;
				}
			}
		}
	}
	return e;
}, Bx = (e) => window.getComputedStyle(e).display === "inline" && (e.style.display = "inline-block"), Vx = (e, t, n) => t.insertBefore(typeof e == "string" ? document.createTextNode(e) : e, n), Hx = (e, t, n) => {
	let r = t[e + "sClass"] || "", { tag: i = "div", aria: a = "auto", propIndex: o = !1 } = t, s = e === "line" ? "block" : "inline-block", c = r.indexOf("++") > -1, l = (t) => {
		let l = document.createElement(i), u = n.length + 1;
		return r && (l.className = r + (c ? " " + r + u : "")), o && l.style.setProperty("--" + e, u + ""), a !== "none" && l.setAttribute("aria-hidden", "true"), i !== "span" && (l.style.position = "relative", l.style.display = s), l.textContent = t, n.push(l), l;
	};
	return c && (r = r.replace("++", "")), l.collection = n, l;
}, Ux = (e, t, n, r) => {
	let i = Hx("line", n, r), a = window.getComputedStyle(e).textAlign || "left";
	return (n, r) => {
		let o = i("");
		for (o.style.textAlign = a, e.insertBefore(o, t[n]); n < r; n++) o.appendChild(t[n]);
		o.normalize();
	};
}, Wx = (e, t, n, r, i, a, o, s, c, l) => {
	var u;
	let d = Array.from(e.childNodes), f = 0, { wordDelimiter: p, reduceWhiteSpace: m = !0, prepareText: h } = t, g = e.getBoundingClientRect(), _ = g, v = !m && window.getComputedStyle(e).whiteSpace.substring(0, 3) === "pre", y = 0, b = n.collection, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, ee, L;
	for (typeof p == "object" ? (C = p.delimiter || p, S = p.replaceWith || "") : S = p === "" ? "" : p || " ", x = S !== " "; f < d.length; f++) if (w = d[f], w.nodeType === 3) {
		for (F = w.textContent || "", m ? F = F.replace(Px, " ") : v && (F = F.replace(/\n/g, S + "\n")), h && (F = h(F, e)), w.textContent = F, T = S || C ? F.split(C || S) : F.match(s) || jx, ee = T[T.length - 1], O = x ? ee.slice(-1) === " " : !ee, ee || T.pop(), _ = g, D = x ? T[0].charAt(0) === " " : !T[0], D && Vx(" ", e, w), T[0] || T.shift(), zx(T, c), a && l || (w.textContent = ""), k = 1; k <= T.length; k++) if (I = T[k - 1], !m && v && I.charAt(0) === "\n" && ((u = w.previousSibling) == null || u.remove(), Vx(document.createElement("br"), e, w), I = I.slice(1)), !m && I === "") Vx(S, e, w);
		else if (I === " ") e.insertBefore(document.createTextNode(" "), w);
		else {
			if (x && I.charAt(0) === " " && Vx(" ", e, w), y && k === 1 && !D && b.indexOf(y.parentNode) > -1 ? (E = b[b.length - 1], E.appendChild(document.createTextNode(r ? "" : I))) : (E = n(r ? "" : I), Vx(E, e, w), y && k === 1 && !D && E.insertBefore(y, E.firstChild)), r) for (j = Ox ? zx([...Ox.segment(I)].map((e) => e.segment), c) : I.match(s) || jx, L = 0; L < j.length; L++) E.appendChild(j[L] === " " ? document.createTextNode(" ") : r(j[L]));
			if (a && l) {
				if (F = w.textContent = F.substring(I.length + 1, F.length), A = E.getBoundingClientRect(), A.top > _.top && A.left <= _.left) {
					for (M = e.cloneNode(), N = e.childNodes[0]; N && N !== E;) P = N, N = N.nextSibling, M.appendChild(P);
					e.parentNode.insertBefore(M, e), i && Bx(M);
				}
				_ = A;
			}
			(k < T.length || O) && Vx(k >= T.length ? " " : x && I.slice(-1) === " " ? " " + S : S, e, w);
		}
		e.removeChild(w), y = 0;
	} else w.nodeType === 1 && (o && o.indexOf(w) > -1 ? (b.indexOf(w.previousSibling) > -1 && b[b.length - 1].appendChild(w), y = w) : (Wx(w, t, n, r, i, a, o, s, c, !0), y = 0), i && Bx(w));
}, Gx = class e {
	constructor(e, t) {
		this.isSplit = !1, Dx(), this.elements = Ax(e), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = t, this.elements.forEach((e) => {
			var n;
			t.overwrite !== !1 && ((n = e[Tx]) == null || n._data.orig.filter(({ element: t }) => t === e).forEach(Rx)), e[Tx] = this;
		}), this._split = () => this.isSplit && this.split(this.vars);
		let n = [], r, i = () => {
			let e = n.length, t;
			for (; e--;) {
				t = n[e];
				let r = t.element.offsetWidth;
				if (r !== t.width) {
					t.width = r, this._split();
					return;
				}
			}
		};
		this._data = {
			orig: n,
			obs: typeof ResizeObserver < "u" && new ResizeObserver(() => {
				clearTimeout(r), r = setTimeout(i, 200);
			})
		}, Mx(this), this.split(t);
	}
	split(e) {
		return (this._ctx || Nx).add(() => {
			this.isSplit && this.revert(), this.vars = e = e || this.vars || {};
			let { type: t = "chars,words,lines", aria: n = "auto", deepSlice: r = !0, smartWrap: i, onSplit: a, autoSplit: o = !1, specialChars: s, mask: c } = this.vars, l = t.indexOf("lines") > -1, u = t.indexOf("chars") > -1, d = t.indexOf("words") > -1, f = u && !d && !l, p = s && ("push" in s ? RegExp("(?:" + s.join("|") + ")", "gu") : s), m = p ? RegExp(p.source + "|" + Fx.source, "gu") : Fx, h = !!e.ignore && Ax(e.ignore), { orig: g, animTime: _, obs: v } = this._data, y;
			(u || d || l) && (this.elements.forEach((t, a) => {
				g[a] = {
					element: t,
					html: t.innerHTML,
					ariaL: t.getAttribute("aria-label"),
					ariaH: t.getAttribute("aria-hidden")
				}, n === "auto" ? t.setAttribute("aria-label", (t.textContent || "").trim()) : n === "hidden" && t.setAttribute("aria-hidden", "true");
				let o = [], s = [], c = [], _ = u ? Hx("char", e, o) : null, v = Hx("word", e, s), y, b, x, S;
				if (Wx(t, e, v, _, f, r && (l || f), h, m, p, !1), l) {
					let n = kx(t.childNodes), r = Ux(t, n, e, c), i, a = [], o = 0, s = n.map((e) => e.nodeType === 1 ? e.getBoundingClientRect() : Ix), l = Ix, u;
					for (y = 0; y < n.length; y++) i = n[y], i.nodeType === 1 && (i.nodeName === "BR" ? ((!y || n[y - 1].nodeName !== "BR") && (a.push(i), r(o, y + 1)), o = y + 1, l = Lx(s, y)) : (u = s[y], y && u.top > l.top && u.left < l.left + l.width - 1 && (r(o, y), o = y), l = u));
					o < y && r(o, y), a.forEach((e) => e.parentNode?.removeChild(e));
				}
				if (!d) {
					for (y = 0; y < s.length; y++) if (b = s[y], u || !b.nextSibling || b.nextSibling.nodeType !== 3) {
						if (i && !l) {
							for (x = document.createElement("span"), x.style.whiteSpace = "nowrap"; b.firstChild;) x.appendChild(b.firstChild);
							b.replaceWith(x);
						} else b.replaceWith(...b.childNodes);
					} else S = b.nextSibling, S && S.nodeType === 3 && (S.textContent = (b.textContent || "") + (S.textContent || ""), b.remove());
					s.length = 0, t.normalize();
				}
				this.lines.push(...c), this.words.push(...s), this.chars.push(...o);
			}), c && this[c] && this.masks.push(...this[c].map((e) => {
				let t = e.cloneNode();
				return e.replaceWith(t), t.appendChild(e), e.className && (t.className = e.className.trim().split(" ").map((e) => e + "-mask").join(" ")), t.style.overflow = "clip", t;
			}))), this.isSplit = !0, wx && l && o && wx.addEventListener("loadingdone", this._split), (y = a && a(this)) && y.totalTime && (this._data.anim = _ ? y.totalTime(_) : y), l && o && this.elements.forEach((e, t) => {
				g[t].width = e.offsetWidth, v && v.observe(e);
			});
		}), this;
	}
	kill() {
		let { obs: e } = this._data;
		e && e.disconnect(), wx?.removeEventListener("loadingdone", this._split);
	}
	revert() {
		var e, t;
		if (this.isSplit) {
			let { orig: n, anim: r } = this._data;
			this.kill(), n.forEach(Rx), this.chars.length = this.words.length = this.lines.length = n.length = this.masks.length = 0, this.isSplit = !1, r && (this._data.animTime = r.totalTime(), r.revert()), (t = (e = this.vars).onRevert) == null || t.call(e, this);
		}
		return this;
	}
	static create(t, n) {
		return new e(t, n);
	}
	static register(e) {
		Cx = Cx || e || window.gsap, Cx && (kx = Cx.utils.toArray, Mx = Cx.core.context || Mx), !Ex && window.innerWidth > 0 && (wx = document.fonts, Ex = !0);
	}
};
Gx.version = "3.15.0";
var Kx = Gx, qx = typeof document < "u" ? _.useLayoutEffect : _.useEffect, Jx = (e) => e && !Array.isArray(e) && typeof e == "object", Yx = [], Xx = {}, Zx = Li, Qx = (e, t = Yx) => {
	let n = Xx;
	Jx(e) ? (n = e, e = null, t = "dependencies" in n ? n.dependencies : Yx) : Jx(t) && (n = t, t = "dependencies" in n ? n.dependencies : Yx), e && typeof e != "function" && console.warn("First parameter must be a function or config object");
	let { scope: r, revertOnUpdate: i } = n, a = (0, _.useRef)(!1), o = (0, _.useRef)(Zx.context(() => {}, r)), s = (0, _.useRef)((e) => o.current.add(null, e)), c = t && t.length && !i;
	return c && qx(() => (a.current = !0, () => o.current.revert()), Yx), qx(() => {
		if (e && o.current.add(e, r), !c || !a.current) return () => o.current.revert();
	}, t), {
		context: o.current,
		contextSafe: s.current
	};
};
//#endregion
//#region src/components/react-bits/SplitText/SplitText.tsx
Qx.register = (e) => {
	Zx = e;
}, Qx.headless = !0, Li.registerPlugin(X, Kx, Qx);
var $x = {
	opacity: 0,
	y: 40
}, eS = {
	opacity: 1,
	y: 0
}, tS = 180, nS = 19, rS = .024, iS = typeof window < "u" ? _.useLayoutEffect : _.useEffect, aS = () => typeof document < "u" && (!document.fonts || document.fonts.status === "loaded"), oS = (e) => 1 - Math.cos(e * Math.PI * 1.5) * (1 - e) ** 1.2, sS = (e, t) => {
	switch (e) {
		case "fade": return {
			from: { opacity: 0 },
			to: { opacity: 1 },
			ease: "power2.inOut"
		};
		case "blur": return {
			from: {
				opacity: 0,
				filter: `blur(${Math.round(t * 1.4) / 10}px)`
			},
			to: {
				opacity: 1,
				filter: "blur(0px)"
			},
			ease: "power2.out"
		};
		case "flip": {
			let e = {
				transformPerspective: t * 6,
				transformOrigin: "50% 100%"
			};
			return {
				from: {
					...e,
					opacity: 0,
					rotationX: -90
				},
				to: {
					...e,
					opacity: 1,
					rotationX: 0
				},
				ease: "power3.out"
			};
		}
		case "pop": return {
			from: {
				opacity: 0,
				scale: 0
			},
			to: {
				opacity: 1,
				scale: 1
			},
			ease: "back.out(1.6)"
		};
		case "skew": return {
			from: {
				transformOrigin: "50% 100%",
				opacity: 0,
				x: -t * .4,
				skewX: -24
			},
			to: {
				transformOrigin: "50% 100%",
				opacity: 1,
				x: 0,
				skewX: 0
			},
			ease: "expo.out"
		};
		case "wave": return {
			from: {
				opacity: 0,
				y: t * .45
			},
			to: {
				opacity: 1,
				y: 0
			},
			ease: oS
		};
		default: return {
			from: { ...$x },
			to: { ...eS },
			ease: "power3.out"
		};
	}
}, cS = ({ text: e, className: t = "", delay: n = 50, duration: r = 1.25, ease: i, splitType: a = "chars", from: o, to: s, threshold: c = .1, rootMargin: l = "-100px", textAlign: u = "center", tag: d = "p", staggerFrom: f = "start", mask: p = !1, effect: m = "rise", trigger: h = "view", loop: g = !1, loopDelay: v = 1.5, hoverEffect: y = "none", color: b, accentColor: x, onLetterAnimationComplete: S }) => {
	let C = (0, _.useRef)(null), w = (0, _.useRef)(null), T = (0, _.useRef)(S), E = (0, _.useRef)({
		trigger: h,
		hoverEffect: y,
		accentColor: x
	}), [D, O] = (0, _.useState)(aS), [k, A] = (0, _.useState)(!1);
	iS(() => {
		T.current = S, E.current = {
			trigger: h,
			hoverEffect: y,
			accentColor: x
		};
	}), (0, _.useEffect)(() => {
		if (D) return;
		let e = !0;
		return document.fonts.ready.then(() => {
			e && O(!0);
		}), () => {
			e = !1;
		};
	}, [D]), Qx(() => {
		let t = C.current;
		if (!t || !e || !D) return;
		if (t.getBoundingClientRect(), !aS()) {
			O(!1);
			return;
		}
		let u = () => {
			w.current !== e && (w.current = e, T.current?.());
		};
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			A(!0), u();
			return;
		}
		let d = (1 - c) * 100, _ = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(l), y = _ ? parseFloat(_[1]) : 0, b = _ && _[2] || "px", x = `top ${d}%${y === 0 ? "" : y < 0 ? `-=${Math.abs(y)}${b}` : `+=${y}${b}`}`, S = a.includes("chars") ? "chars" : a.includes("words") ? "words" : "lines", k = parseFloat(getComputedStyle(t).fontSize) || 16, j = o !== void 0 || s !== void 0, M = sS(m, k), N = j ? { ...o || $x } : M.from, P = j ? { ...s || eS } : M.to, F = i || (j ? "power3.out" : M.ease), I = j ? "willChange" : "transform,filter,willChange", ee = Math.max(.35, r * .55), L = [], R = [], z = Li.utils.distribute({
			each: n / 1e3,
			from: f
		}), te = w.current === e, ne = null, B = null, re = null, ie = 0, ae = 0, V = null, oe = k * .2, se = [], H = [], U = {
			x: 0,
			y: 0,
			inside: !1
		}, W = (e, n) => {
			let i = E.current.accentColor, a = Li.timeline(n);
			return a.fromTo(L, {
				...N,
				willChange: "transform, opacity"
			}, {
				...P,
				duration: r,
				ease: F,
				stagger: z,
				immediateRender: e
			}, 0), i && a.fromTo(L, { color: i }, {
				color: getComputedStyle(t).color,
				duration: r * .7,
				ease: "power1.inOut",
				stagger: z,
				immediateRender: e
			}, r * .3), a.set(L, { clearProps: i ? `${I},color` : I }), a;
		}, ce = () => {
			let e = E.current.accentColor, t = Li.timeline();
			return t.fromTo(L, {
				...P,
				willChange: "transform, opacity"
			}, {
				...N,
				duration: ee,
				ease: "power2.in",
				stagger: z,
				immediateRender: !1
			}, 0), e && t.to(L, {
				color: e,
				duration: ee,
				ease: "power1.in",
				stagger: z
			}, 0), t;
		}, le = () => {
			!B && te && L.length && (re?.kill(), re = null, B = Li.timeline({ onComplete: () => {
				B = null, ue();
			} }).add(ce(), 0).add(W(!1), ee));
		}, ue = () => {
			re?.kill(), re = g ? Li.delayedCall(v, le) : null;
		}, de = () => {
			let e = t.getBoundingClientRect();
			V = R.map((t, n) => {
				let r = t.getBoundingClientRect();
				return {
					x: r.left + r.width / 2 - e.left,
					y: r.top + r.height / 2 - e.top - (se[n]?.y || 0)
				};
			});
		}, G = (e) => {
			ie = 0;
			let t = Math.min(.032, Math.max(.001, (e - ae) / 1e3));
			ae = e;
			let n = E.current.hoverEffect === "lift" && U.inside && te ? V : null, r = k * 1.15, i = !1;
			for (let t = H.length - 1; t >= 0; t--) {
				if (e < H[t].at) continue;
				let n = se[H[t].index];
				n && (n.v -= H[t].velocity), H.splice(t, 1);
			}
			R.forEach((e, a) => {
				let o = se[a] || (se[a] = {
					y: 0,
					v: 0
				}), s = n?.[a], c = 0;
				if (s) {
					let e = (s.x - U.x) / r, t = (s.y - U.y) / (r * 1.4);
					c = -oe * Math.exp(-(e * e + t * t) * .5);
				}
				o.v += (tS * (c - o.y) - nS * o.v) * t, o.y += o.v * t, Math.abs(c - o.y) < .02 && Math.abs(o.v) < .05 ? (o.y = c, o.v = 0) : i = !0, e.style.translate = Math.abs(o.y) > .01 ? `0 ${o.y.toFixed(2)}px` : "";
			}), (i || H.length) && (ie = requestAnimationFrame(G));
		}, K = () => {
			ie ||= (ae = performance.now(), requestAnimationFrame(G));
		}, fe = (e) => {
			let n = t.getBoundingClientRect();
			U.x = e.clientX - n.left, U.y = e.clientY - n.top;
		}, q = (e) => {
			if (fe(e), U.inside = !0, !te) return;
			let t = E.current;
			if (t.trigger === "hover" && le(), t.hoverEffect !== "none") {
				if (de(), t.hoverEffect === "wave") {
					let e = performance.now(), t = k * 9, n = k * .16 / rS;
					V?.forEach((r, i) => {
						H.push({
							index: i,
							velocity: n,
							at: e + Math.abs(r.x - U.x) / t * 1e3
						});
					});
				}
				K();
			}
		}, pe = (e) => {
			fe(e), U.inside = !0, te && E.current.hoverEffect === "lift" && (V || de(), K());
		}, me = () => {
			U.inside = !1, K();
		}, he = () => {
			E.current.trigger === "click" && le();
		}, ge = new Kx(t, {
			type: a,
			smartWrap: !0,
			autoSplit: a === "lines",
			mask: p ? S : void 0,
			linesClass: "split-line",
			wordsClass: "split-word",
			charsClass: "split-char",
			reduceWhiteSpace: !1,
			onSplit: (e) => {
				if (L = [
					e[S],
					e.chars,
					e.words,
					e.lines
				].find((e) => e.length) || [], R = p && e.masks?.length === L.length ? e.masks : L, z = Li.utils.distribute({
					each: n / 1e3,
					from: f
				}), V = null, se.length = 0, H.length = 0, B && B !== ne && (B.kill(), B = null), !te) return ne = W(!0, {
					scrollTrigger: h === "load" ? void 0 : {
						trigger: t,
						start: x,
						once: !0,
						fastScrollEnd: !0,
						anticipatePin: .4
					},
					onComplete: () => {
						te = !0, ne = null, B = null, u(), ue();
					}
				}), B = ne, ne;
			}
		});
		return A(!0), te && ue(), t.addEventListener("pointerenter", q), t.addEventListener("pointermove", pe), t.addEventListener("pointerleave", me), t.addEventListener("click", he), () => {
			cancelAnimationFrame(ie), re?.kill(), B?.kill(), t.removeEventListener("pointerenter", q), t.removeEventListener("pointermove", pe), t.removeEventListener("pointerleave", me), t.removeEventListener("click", he), R.forEach((e) => {
				e.style.translate = "";
			}), X.getAll().forEach((e) => {
				e.trigger === t && e.kill();
			}), ge.revert();
		};
	}, {
		dependencies: [
			e,
			n,
			r,
			i,
			a,
			JSON.stringify(o),
			JSON.stringify(s),
			c,
			l,
			f,
			p,
			m,
			h,
			g,
			v,
			D
		],
		scope: C,
		revertOnUpdate: !0
	});
	let j = d || "p", M = y === "none" && (o !== void 0 || s !== void 0 || m === "rise" || m === "fade");
	return /* @__PURE__ */ (0, Z.jsx)(j, {
		ref: C,
		className: `split-parent ${t}`,
		style: {
			textAlign: u,
			overflow: M ? "hidden" : "visible",
			display: "inline-block",
			whiteSpace: "normal",
			wordWrap: "break-word",
			color: b,
			cursor: h === "click" ? "pointer" : void 0,
			visibility: k ? void 0 : "hidden"
		},
		children: e
	}, e);
}, lS = {
	dark: {
		surface: "#111111",
		border: "rgba(255, 255, 255, 0.08)",
		shadow: "0 24px 48px -24px rgba(0, 0, 0, 0.6)",
		light: "#ffffff",
		fill: 1,
		edge: 1
	},
	light: {
		surface: "#ffffff",
		border: "rgba(24, 24, 27, 0.1)",
		shadow: "0 1px 2px rgba(24, 24, 27, 0.04), 0 18px 40px -20px rgba(24, 24, 27, 0.16)",
		light: "#18181b",
		fill: .28,
		edge: .7
	}
}, uS = ["circle", "beam"], dS = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", fS = (e, t, n) => Math.min(n, Math.max(t, e)), pS = (e, t) => {
	let n = fS(t, 0, 1), r = (1 - n) ** 1.5 * .85, i = (t, n) => `color-mix(in srgb, ${e} ${(t * 100).toFixed(2)}%, transparent) ${(n * 100).toFixed(2)}%`, a = [i(1, 0)];
	for (let e = 0; e <= 14; e++) {
		let t = r + (1 - r) * e / 14, o = (t - r) / (1 - r), s = 1 - o * o * (3 - 2 * o), c = Math.exp(-4.6 * o * o) * (1 - o ** 6);
		a.push(i(s + (c - s) * n, t));
	}
	return a.join(", ");
}, mS = ({ children: e, className: t = "", style: n, spotlightColor: r, intensity: i = .15, spotlightSize: a = 240, softness: o = .7, shape: s = "circle", borderGlow: c = .6, proximity: l = 80, smoothing: u = .3, ambient: d = !1, flare: f = !0, grain: p = 0, theme: m = "dark", ...h }) => {
	let g = (0, _.useRef)(null), v = (0, _.useRef)(null), y = (0, _.useRef)(null), b = (0, _.useRef)(null), x = (0, _.useRef)(null), S = lS[m] ?? lS.dark, C = r ?? S.light, w = {
		shape: uS.includes(s) ? s : "circle",
		fill: pS(C, o),
		edge: pS(C, 1),
		size: Math.max(20, a),
		intensity: fS(i, 0, 1) * S.fill,
		borderGlow: fS(c, 0, 1) * S.edge,
		proximity: Math.max(0, l),
		smoothing: fS(u, 0, 1),
		ambient: d,
		flare: f,
		grain: fS(p, 0, 1)
	}, T = (0, _.useRef)(w);
	return T.current = w, (0, _.useEffect)(() => {
		x.current?.();
	}), (0, _.useEffect)(() => {
		let e = g.current, t = v.current, n = y.current, r = b.current;
		if (!e || !t || !n || !r) return;
		let i = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, a = {
			x: 0,
			y: 0,
			presence: 0,
			flare: 0,
			time: Math.random() * 60,
			pressed: !1,
			visible: !0
		}, o = {
			x: 0,
			y: 0,
			active: !1
		}, s = {
			light: "",
			edge: "",
			noise: ""
		}, c = null, l = 0, u = 0, d = !0, f = (e, t, n, r, i) => {
			if (e.shape === "beam") {
				let e = Math.max(t * .6, r + t * .55);
				return `radial-gradient(${(t * .55).toFixed(1)}px ${e.toFixed(1)}px at ${n.toFixed(1)}px 0px, ${i})`;
			}
			return `radial-gradient(circle ${t.toFixed(1)}px at ${n.toFixed(1)}px ${r.toFixed(1)}px, ${i})`;
		}, p = (e) => {
			let i = e.size * (1 + .2 * a.flare), o = 1 + .7 * a.flare, c = f(e, i, a.x, a.y, e.fill), l = f(e, i * .6, a.x, e.shape === "beam" ? 0 : a.y, e.edge);
			c !== s.light && (s.light = c, t.style.background = c), l !== s.edge && (s.edge = l, r.style.background = l), t.style.opacity = String(Math.min(1, a.presence * e.intensity * o)), r.style.opacity = String(Math.min(1, a.presence * e.borderGlow * o));
			let u = e.grain > 0 ? f(e, i, a.x, a.y, "#000 0%, transparent 100%") : "none";
			u !== s.noise && (s.noise = u, n.style.webkitMaskImage = u, n.style.maskImage = u), n.style.opacity = String(a.presence * e.grain);
		}, m = (t) => {
			if (l = 0, !d) return;
			let n = T.current, r = Math.min(.05, Math.max(.001, (t - u) / 1e3));
			u = t;
			let s = e.getBoundingClientRect(), f = a.x, h = a.y, g = 0;
			if (c && e.contains(c)) {
				let e = c.getBoundingClientRect();
				f = e.left + e.width / 2 - s.left, h = e.top + e.height / 2 - s.top, g = 1;
			} else if (o.active) {
				f = o.x - s.left, h = o.y - s.top;
				let e = Math.hypot(Math.max(0, -f, f - s.width), Math.max(0, -h, h - s.height));
				e === 0 ? g = 1 : n.proximity > 0 && (g = Math.max(0, 1 - e / n.proximity) ** 2);
			}
			if (g < .6 && n.ambient && a.visible) {
				i || (a.time += r);
				let e = .6 - g;
				f += (s.width * (.5 + .34 * Math.sin(a.time * .43)) - f) * (e / .6), h += (s.height * (.5 + .3 * Math.sin(a.time * .61 + 1.3)) - h) * (e / .6), g = .6;
			}
			a.presence < .02 && g > 0 && !n.ambient && (a.x = f, a.y = h);
			let _ = i || n.smoothing === 0 ? 1 : 1 - Math.exp(-r / (.015 + n.smoothing * .22));
			a.x += (f - a.x) * _, a.y += (h - a.y) * _;
			let v = i ? 1 : 1 - Math.exp(-r / (g > a.presence ? .1 : .32));
			a.presence += (g - a.presence) * v, Math.abs(g - a.presence) < .002 && (a.presence = g);
			let y = a.pressed && n.flare && !i ? 1 : 0;
			a.flare += (y - a.flare) * (1 - Math.exp(-r / (y ? .05 : .28))), Math.abs(y - a.flare) < .002 && (a.flare = y), p(n), (Math.abs(f - a.x) > .1 || Math.abs(h - a.y) > .1 || a.presence !== g || a.flare !== y || n.ambient && a.visible && !i) && (l = requestAnimationFrame(m));
		}, h = () => {
			!l && d && (u = performance.now(), l = requestAnimationFrame(m));
		};
		x.current = h;
		let _ = (t) => {
			o.x = t.clientX, o.y = t.clientY, o.active = !0, (a.presence > 0 || T.current.proximity > 0 || e.contains(t.target)) && h();
		}, S = (e) => {
			e.relatedTarget || (o.active = !1, h());
		}, C = (e) => {
			o.x = e.clientX, o.y = e.clientY, o.active = !0, a.pressed = !0, h();
		}, w = (e) => {
			e.pointerType !== "mouse" && (o.active = !1), (a.pressed || e.pointerType !== "mouse") && (a.pressed = !1, h());
		}, E = (e) => {
			e.target instanceof Element && e.target.matches(":focus-visible") && (c = e.target, h());
		}, D = (t) => {
			e.contains(t.relatedTarget) || (c = null, h());
		}, O = () => {
			(o.active || a.presence > 0) && h();
		}, k = new IntersectionObserver((e) => {
			a.visible = e.some((e) => e.isIntersecting), a.visible && h();
		});
		return k.observe(e), window.addEventListener("pointermove", _), window.addEventListener("pointerup", w), window.addEventListener("pointercancel", w), window.addEventListener("scroll", O, {
			capture: !0,
			passive: !0
		}), document.addEventListener("pointerout", S), e.addEventListener("pointerdown", C), e.addEventListener("focusin", E), e.addEventListener("focusout", D), h(), () => {
			d = !1, cancelAnimationFrame(l), k.disconnect(), window.removeEventListener("pointermove", _), window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), window.removeEventListener("scroll", O, { capture: !0 }), document.removeEventListener("pointerout", S), e.removeEventListener("pointerdown", C), e.removeEventListener("focusin", E), e.removeEventListener("focusout", D), x.current = null;
		};
	}, []), /* @__PURE__ */ (0, Z.jsxs)("div", {
		ref: g,
		className: `spotlight-card${t ? ` ${t}` : ""}`,
		style: {
			"--spotlight-card-surface": S.surface,
			"--spotlight-card-border": S.border,
			"--spotlight-card-shadow": S.shadow,
			...n
		},
		...h,
		children: [
			/* @__PURE__ */ (0, Z.jsx)("span", {
				ref: v,
				className: "spotlight-card__light",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, Z.jsx)("span", {
				ref: y,
				className: "spotlight-card__grain",
				style: { backgroundImage: dS },
				"aria-hidden": "true"
			}),
			e,
			/* @__PURE__ */ (0, Z.jsx)("span", {
				className: "spotlight-card__border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, Z.jsx)("span", {
				ref: b,
				className: "spotlight-card__edge",
				"aria-hidden": "true"
			})
		]
	});
};
//#endregion
//#region src/components/islands.tsx
function hS() {
	return document.documentElement.lang === "it" ? "it" : "en";
}
function gS() {
	return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function _S() {
	let [e, t] = (0, _.useState)(hS);
	return (0, _.useEffect)(() => {
		let e = () => t(hS());
		return document.addEventListener("mn:languagechange", e), () => document.removeEventListener("mn:languagechange", e);
	}, []), e;
}
function vS() {
	let [e, t] = (0, _.useState)(gS);
	return (0, _.useEffect)(() => {
		let e = () => t(gS());
		return document.addEventListener("mn:themechange", e), () => document.removeEventListener("mn:themechange", e);
	}, []), e;
}
function yS() {
	let [e, t] = (0, _.useState)(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	return (0, _.useEffect)(() => S("(prefers-reduced-motion: reduce)", t), []), e;
}
function bS(e) {
	let t = () => getComputedStyle(document.documentElement).getPropertyValue(e).trim(), [n, r] = (0, _.useState)(t);
	return (0, _.useEffect)(() => {
		let e = () => r(t());
		return document.addEventListener("mn:themechange", e), () => document.removeEventListener("mn:themechange", e);
	}, [e]), n;
}
function xS(e, t, n) {
	return e.dataset[`${t}${n === "it" ? "It" : "En"}`] ?? "";
}
function SS(e) {
	return (0, _.useMemo)(() => /* @__PURE__ */ (0, Z.jsx)("div", { dangerouslySetInnerHTML: { __html: e } }), [e]);
}
function CS({ host: e }) {
	let t = _S(), n = yS(), r = xS(e, "text", t) || e.textContent?.trim() || "", i = e.className || "hero-name";
	return n ? /* @__PURE__ */ (0, Z.jsx)("h1", {
		className: i,
		children: r
	}) : /* @__PURE__ */ (0, Z.jsx)(cS, {
		className: i,
		text: r,
		tag: "h1",
		splitType: "chars",
		effect: "rise",
		mask: !0,
		trigger: "load",
		delay: .12,
		duration: 1.1,
		staggerFrom: "start",
		textAlign: "left"
	});
}
function wS({ host: e }) {
	let t = _S(), n = yS(), r = bS("--accent"), i = xS(e, "lead", t), a = xS(e, "words", t).split("|").map((e) => e.trim()).filter((e) => e.length > 0);
	return /* @__PURE__ */ (0, Z.jsxs)("p", {
		className: e.className || "hero-role",
		children: [
			i,
			" ",
			/* @__PURE__ */ (0, Z.jsx)(Sx, {
				texts: a,
				effect: "slide",
				direction: "up",
				auto: !n,
				rotationInterval: 2600,
				staggerDuration: .02,
				staggerFrom: "first",
				splitBy: "characters",
				highlight: !0,
				highlightColor: r,
				mainClassName: "role-rotate"
			})
		]
	});
}
function TS(e, t) {
	return b("[data-stat]", e).map((e) => ({
		value: Number(e.dataset.value ?? 0),
		suffix: e.dataset.suffix ?? "",
		label: e.dataset[t === "it" ? "labelIt" : "labelEn"] ?? ""
	}));
}
function ES({ host: e }) {
	let t = _S(), n = yS(), r = (0, _.useMemo)(() => TS(e, t), [e, t]);
	return /* @__PURE__ */ (0, Z.jsx)("ul", {
		className: e.className || "stats",
		children: r.map((e) => /* @__PURE__ */ (0, Z.jsxs)("li", {
			className: "stat",
			children: [/* @__PURE__ */ (0, Z.jsx)("span", {
				className: "stat-value",
				children: /* @__PURE__ */ (0, Z.jsx)(Yb, {
					to: e.value,
					suffix: e.suffix,
					duration: n ? 0 : 1.5,
					easing: "expo",
					trigger: "view"
				})
			}), /* @__PURE__ */ (0, Z.jsx)("span", {
				className: "label",
				children: e.label
			})]
		}, e.label))
	});
}
function DS({ host: e }) {
	let t = yS();
	return /* @__PURE__ */ (0, Z.jsx)(dx, {
		disabled: t,
		padding: 90,
		magnetStrength: 5,
		tilt: 0,
		scale: 1.06,
		wrapperClassName: "magnet",
		innerClassName: "magnet-inner",
		children: /* @__PURE__ */ (0, Z.jsx)("button", {
			type: "button",
			className: "icon-btn",
			"data-palette-open": !0,
			"aria-label": e.dataset.label ?? "Search",
			children: /* @__PURE__ */ (0, Z.jsx)("span", {
				"aria-hidden": "true",
				children: "⌘K"
			})
		})
	});
}
function OS({ html: e, className: t }) {
	let n = yS(), r = SS(e);
	return n ? /* @__PURE__ */ (0, Z.jsx)("div", {
		className: t,
		children: r
	}) : /* @__PURE__ */ (0, Z.jsx)(pc, {
		className: t,
		distance: 26,
		direction: "vertical",
		duration: .85,
		ease: "expo.out",
		threshold: .18,
		stagger: .1,
		staggerFrom: "start",
		children: r
	});
}
function kS({ html: e, className: t }) {
	let n = vS(), r = yS(), i = SS(e);
	return /* @__PURE__ */ (0, Z.jsx)(mS, {
		className: t,
		theme: n,
		shape: "beam",
		intensity: .45,
		spotlightSize: .6,
		softness: .5,
		proximity: 300,
		smoothing: .12,
		ambient: !r,
		flare: !r,
		grain: .06,
		children: i
	});
}
function AS({ paused: e }) {
	let t = bS("--text"), n = bS("--accent");
	return /* @__PURE__ */ (0, Z.jsx)(nx, {
		className: "contact-grid",
		dotSize: 3,
		gap: 24,
		baseColor: t,
		activeColor: n,
		proximity: 150,
		strength: 4,
		glow: .6,
		opacity: .6,
		fade: .35,
		intro: !e,
		paused: e
	});
}
function jS(e, t) {
	for (let n of b(e)) (0, v.createRoot)(n).render(t(n));
}
function MS() {
	jS("[data-island=\"hero-name\"]", (e) => /* @__PURE__ */ (0, Z.jsx)(CS, { host: e })), jS("[data-island=\"hero-role\"]", (e) => /* @__PURE__ */ (0, Z.jsx)(wS, { host: e })), jS("[data-island=\"stats\"]", (e) => /* @__PURE__ */ (0, Z.jsx)(ES, { host: e })), jS("[data-island=\"magnet\"]", (e) => /* @__PURE__ */ (0, Z.jsx)(DS, { host: e })), jS("[data-island=\"about\"]", (e) => /* @__PURE__ */ (0, Z.jsx)(OS, {
		html: e.innerHTML,
		className: e.className || "prose"
	})), jS("[data-island=\"contact-card\"]", (e) => /* @__PURE__ */ (0, Z.jsx)(kS, {
		html: e.innerHTML,
		className: e.className || "contact-card"
	})), jS("[data-island=\"contact-grid\"]", () => /* @__PURE__ */ (0, Z.jsx)(AS, { paused: window.matchMedia("(prefers-reduced-motion: reduce)").matches }));
}
//#endregion
//#region src/lib/contact.ts
var NS = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function PS(e, t) {
	return e.name.trim().length === 0 || e.message.trim().length === 0 ? "required" : NS.test(e.email.trim()) ? t ? null : "consent" : "email";
}
function FS() {
	let e = y("[data-contact]");
	if (!e) return;
	let t = y("[data-contact-status]", e), n = y("button[type=\"submit\"]", e), r = (t) => {
		let n = document.documentElement.lang === "it" ? "It" : "En", r = `msg${t.charAt(0).toUpperCase()}${t.slice(1)}${n}`;
		return e.dataset[r] ?? "";
	}, i = (e, n) => {
		t && (t.textContent = r(e), n ? t.dataset.state = n : delete t.dataset.state);
	};
	x(e, "submit", async (t) => {
		t.preventDefault();
		let r = new FormData(e);
		if (String(r.get("_gotcha") ?? "").length > 0) {
			e.reset(), i("success", "success");
			return;
		}
		let a = y("input[name=\"consent\"]", e)?.checked ?? !1, o = PS({
			name: String(r.get("name") ?? ""),
			email: String(r.get("email") ?? ""),
			message: String(r.get("message") ?? "")
		}, a);
		if (o) i(o, "error");
		else {
			n?.setAttribute("disabled", ""), i("sending", "");
			try {
				let t = await fetch(e.action, {
					method: "POST",
					headers: { Accept: "application/json" },
					body: r
				});
				if (!t.ok) throw Error(`Formspree responded with ${t.status}`);
				e.reset(), i("success", "success");
			} catch (e) {
				console.error("Contact form submission failed", e), i("error", "error");
			} finally {
				n?.removeAttribute("disabled");
			}
		}
	});
}
//#endregion
//#region src/lib/i18n.ts
var IS = "mn:lang";
function LS(e) {
	return e === "en" || e === "it";
}
function RS(e) {
	let t = e.getItem(IS);
	return LS(t) ? t : null;
}
function zS(e, t) {
	return e.getAttribute(`data-${t}`);
}
function BS(e, t) {
	return e.getAttribute(`data-ph-${t}`);
}
function VS(e, t) {
	let n = 0;
	for (let r of b("[data-en], [data-it]", e)) {
		let e = zS(r, t);
		e !== null && (r.innerHTML = e, n += 1);
	}
	for (let r of b("[data-ph-en], [data-ph-it]", e)) {
		let e = BS(r, t);
		e !== null && (r.placeholder = e, n += 1);
	}
	return n;
}
function HS() {
	let e = RS(localStorage) ?? (document.documentElement.lang.startsWith("it") ? "it" : "en");
	document.documentElement.lang = e, VS(document, e);
	let t = y("[data-lang-toggle]");
	if (t) {
		let e = () => {
			let e = document.documentElement.lang;
			t.textContent = e === "en" ? "IT" : "EN", t.setAttribute("aria-label", e === "en" ? "Passa all’italiano" : "Switch to English");
		};
		e(), x(t, "click", () => {
			let t = document.documentElement.lang === "en" ? "it" : "en";
			localStorage.setItem(IS, t), document.documentElement.lang = t, VS(document, t), e(), document.dispatchEvent(new CustomEvent("mn:languagechange", { detail: t }));
		});
	}
	return e;
}
//#endregion
//#region node_modules/lenis/dist/lenis.mjs
var US = "1.3.27";
function WS(e, t, n) {
	return Math.max(e, Math.min(t, n));
}
function GS(e, t, n) {
	return (1 - n) * e + n * t;
}
function KS(e, t, n, r) {
	return GS(e, t, 1 - Math.exp(-n * r));
}
function qS(e, t) {
	return (e % t + t) % t;
}
var JS = class {
	isRunning = !1;
	value = 0;
	from = 0;
	to = 0;
	currentTime = 0;
	lerp;
	duration;
	easing;
	onUpdate;
	advance(e) {
		if (!this.isRunning) return;
		let t = !1;
		if (this.duration && this.easing) {
			this.currentTime += e;
			let n = WS(0, this.currentTime / this.duration, 1);
			t = n >= 1;
			let r = t ? 1 : this.easing(n);
			this.value = this.from + (this.to - this.from) * r;
		} else this.lerp ? (this.value = KS(this.value, this.to, this.lerp * 60, e), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t = !0)) : (this.value = this.to, t = !0);
		t && this.stop(), this.onUpdate?.(this.value, t);
	}
	stop() {
		this.isRunning = !1;
	}
	fromTo(e, t, { lerp: n, duration: r, easing: i, onStart: a, onUpdate: o }) {
		this.from = this.value = e, this.to = t, this.lerp = n, this.duration = r, this.easing = i, this.currentTime = 0, this.isRunning = !0, a?.(), this.onUpdate = o;
	}
};
function YS(e, t) {
	let n;
	return function(...r) {
		clearTimeout(n), n = setTimeout(() => {
			n = void 0, e.apply(this, r);
		}, t);
	};
}
var XS = class {
	width = 0;
	height = 0;
	scrollHeight = 0;
	scrollWidth = 0;
	debouncedResize;
	wrapperResizeObserver;
	contentResizeObserver;
	constructor(e, t, { autoResize: n = !0, debounce: r = 250 } = {}) {
		this.wrapper = e, this.content = t, n && (this.debouncedResize = YS(this.resize, r), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
	}
	destroy() {
		this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
	}
	resize = () => {
		this.onWrapperResize(), this.onContentResize();
	};
	onWrapperResize = () => {
		this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
	};
	onContentResize = () => {
		this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
	};
	get limit() {
		return {
			x: this.scrollWidth - this.width,
			y: this.scrollHeight - this.height
		};
	}
}, ZS = class {
	events = {};
	emit(e, ...t) {
		let n = this.events[e] || [];
		for (let e = 0, r = n.length; e < r; e++) n[e]?.(...t);
	}
	on(e, t) {
		return this.events[e] ? this.events[e].push(t) : this.events[e] = [t], () => {
			this.events[e] = this.events[e]?.filter((e) => t !== e);
		};
	}
	off(e, t) {
		this.events[e] = this.events[e]?.filter((e) => t !== e);
	}
	destroy() {
		this.events = {};
	}
}, QS = 100 / 6, $S = { passive: !1 };
function eC(e, t) {
	return e === 1 ? QS : e === 2 ? t : 1;
}
var tC = class {
	touchStart = {
		x: 0,
		y: 0
	};
	lastDelta = {
		x: 0,
		y: 0
	};
	window = {
		width: 0,
		height: 0
	};
	emitter = new ZS();
	constructor(e, t = {
		wheelMultiplier: 1,
		touchMultiplier: 1
	}) {
		this.element = e, this.options = t, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, $S), this.element.addEventListener("touchstart", this.onTouchStart, $S), this.element.addEventListener("touchmove", this.onTouchMove, $S), this.element.addEventListener("touchend", this.onTouchEnd, $S);
	}
	on(e, t) {
		return this.emitter.on(e, t);
	}
	destroy() {
		this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, $S), this.element.removeEventListener("touchstart", this.onTouchStart, $S), this.element.removeEventListener("touchmove", this.onTouchMove, $S), this.element.removeEventListener("touchend", this.onTouchEnd, $S);
	}
	onTouchStart = (e) => {
		let { clientX: t, clientY: n } = e.targetTouches ? e.targetTouches[0] : e;
		this.touchStart.x = t, this.touchStart.y = n, this.lastDelta = {
			x: 0,
			y: 0
		}, this.emitter.emit("scroll", {
			deltaX: 0,
			deltaY: 0,
			event: e
		});
	};
	onTouchMove = (e) => {
		let { clientX: t, clientY: n } = e.targetTouches ? e.targetTouches[0] : e, r = -(t - this.touchStart.x) * this.options.touchMultiplier, i = -(n - this.touchStart.y) * this.options.touchMultiplier;
		this.touchStart.x = t, this.touchStart.y = n, this.lastDelta = {
			x: r,
			y: i
		}, this.emitter.emit("scroll", {
			deltaX: r,
			deltaY: i,
			event: e
		});
	};
	onTouchEnd = (e) => {
		this.emitter.emit("scroll", {
			deltaX: this.lastDelta.x,
			deltaY: this.lastDelta.y,
			event: e
		});
	};
	onWheel = (e) => {
		let { deltaX: t, deltaY: n, deltaMode: r } = e, i = eC(r, this.window.width), a = eC(r, this.window.height);
		t *= i, n *= a, t *= this.options.wheelMultiplier, n *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
			deltaX: t,
			deltaY: n,
			event: e
		});
	};
	onWindowResize = () => {
		this.window = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	};
}, nC = (e) => Math.min(1, 1.001 - 2 ** (-10 * e)), rC = class {
	_isScrolling = !1;
	_isStopped = !1;
	_isLocked = !1;
	_preventNextNativeScrollEvent = !1;
	_resetVelocityTimeout = null;
	_rafId = null;
	_isDraggingSelection = !1;
	reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	isTouching;
	isIos;
	time = 0;
	userData = {};
	lastVelocity = 0;
	velocity = 0;
	direction = 0;
	options;
	targetScroll;
	animatedScroll;
	animate = new JS();
	emitter = new ZS();
	dimensions;
	virtualScroll;
	constructor({ wrapper: e = window, content: t = document.documentElement, eventsTarget: n = e, smoothWheel: r = !0, syncTouch: i = !1, syncTouchLerp: a = .075, touchInertiaExponent: o = 1.7, duration: s, easing: c, lerp: l = .1, infinite: u = !1, orientation: d = "vertical", gestureOrientation: f = d === "horizontal" ? "both" : "vertical", touchMultiplier: p = 1, wheelMultiplier: m = 1, autoResize: h = !0, prevent: g, virtualScroll: _, overscroll: v = !0, autoRaf: y = !1, anchors: b = !1, autoToggle: x = !1, allowNestedScroll: S = !1, __experimental__naiveDimensions: C = !1, naiveDimensions: w = C, stopInertiaOnNavigate: T = !1, respectReducedMotion: E = !0 } = {}) {
		window.lenisVersion = US, window.lenis || (window.lenis = {}), window.lenis.version = US, d === "horizontal" && (window.lenis.horizontal = !0), i === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!e || e === document.documentElement) && (e = window), typeof s == "number" && typeof c != "function" ? c = nC : typeof c == "function" && typeof s != "number" && (s = 1), this.options = {
			wrapper: e,
			content: t,
			eventsTarget: n,
			smoothWheel: r,
			syncTouch: i,
			syncTouchLerp: a,
			touchInertiaExponent: o,
			duration: s,
			easing: c,
			lerp: l,
			infinite: u,
			gestureOrientation: f,
			orientation: d,
			touchMultiplier: p,
			wheelMultiplier: m,
			autoResize: h,
			prevent: g,
			virtualScroll: _,
			overscroll: v,
			autoRaf: y,
			anchors: b,
			autoToggle: x,
			allowNestedScroll: S,
			naiveDimensions: w,
			stopInertiaOnNavigate: T,
			respectReducedMotion: E
		}, this.dimensions = new XS(e, t, { autoResize: h }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new tC(n, {
			touchMultiplier: p,
			wheelMultiplier: m
		}), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
	}
	destroy() {
		this.emitter.destroy(), this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
	}
	on(e, t) {
		return this.emitter.on(e, t);
	}
	off(e, t) {
		return this.emitter.off(e, t);
	}
	onScrollEnd = (e) => {
		e instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && e.stopPropagation();
	};
	dispatchScrollendEvent = () => {
		this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
			bubbles: this.options.wrapper === window,
			detail: { lenisScrollEnd: !0 }
		}));
	};
	get overflow() {
		let e = this.isHorizontal ? "overflow-x" : "overflow-y";
		return getComputedStyle(this.rootElement)[e];
	}
	checkOverflow() {
		["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
	}
	onTransitionEnd = (e) => {
		e.propertyName?.includes("overflow") && e.target === this.rootElement && this.checkOverflow();
	};
	setScroll(e) {
		this.isHorizontal ? this.options.wrapper.scrollTo({
			left: e,
			behavior: "instant"
		}) : this.options.wrapper.scrollTo({
			top: e,
			behavior: "instant"
		});
	}
	onClick = (e) => {
		let t = e.composedPath().filter((e) => e instanceof HTMLAnchorElement && e.href).map((e) => new URL(e.href)), n = new URL(window.location.href);
		if (this.options.anchors) {
			let e = t.find((e) => n.host === e.host && n.pathname === e.pathname && e.hash);
			if (e) {
				let t = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, n = decodeURIComponent(e.hash);
				this.scrollTo(n, t);
				return;
			}
		}
		this.options.stopInertiaOnNavigate && t.some((e) => n.host === e.host && n.pathname !== e.pathname) && this.reset();
	};
	onPointerDown = (e) => {
		e.button === 1 && this.reset();
	};
	isTouchOnSelectionHandle(e) {
		let t = window.getSelection();
		if (!t || t.isCollapsed || t.rangeCount === 0) return !1;
		let n = e.targetTouches[0] ?? e.changedTouches[0];
		if (!n) return !1;
		let r = t.getRangeAt(0).getClientRects();
		if (r.length === 0) return !1;
		let i = r[0], a = r[r.length - 1], o = Math.hypot(n.clientX - i.left, n.clientY - i.top) <= 40, s = Math.hypot(n.clientX - a.right, n.clientY - a.bottom) <= 40;
		return o || s;
	}
	onVirtualScroll = (e) => {
		if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(e) === !1) return;
		let { deltaX: t, deltaY: n, event: r } = e;
		if (this.emitter.emit("virtual-scroll", {
			deltaX: t,
			deltaY: n,
			event: r
		}), r.ctrlKey || r.lenisStopPropagation) return;
		let i = r.type.includes("touch"), a = r.type.includes("wheel");
		if (i && this.isIos && (r.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(r)), this._isDraggingSelection)) {
			r.type === "touchend" && (this._isDraggingSelection = !1);
			return;
		}
		this.isTouching = r.type === "touchstart" || r.type === "touchmove";
		let o = t === 0 && n === 0;
		if (this.options.syncTouch && i && r.type === "touchstart" && o && !this.isStopped && !this.isLocked) {
			this.reset();
			return;
		}
		let s = this.options.gestureOrientation === "vertical" && n === 0 || this.options.gestureOrientation === "horizontal" && t === 0;
		if (o || s) return;
		let c = r.composedPath();
		c = c.slice(0, c.indexOf(this.rootElement));
		let l = this.options.prevent, u = Math.abs(t) >= Math.abs(n) ? "horizontal" : "vertical";
		if (c.find((e) => e instanceof HTMLElement && (typeof l == "function" && l?.(e) || e.hasAttribute?.("data-lenis-prevent") || u === "vertical" && e.hasAttribute?.("data-lenis-prevent-vertical") || u === "horizontal" && e.hasAttribute?.("data-lenis-prevent-horizontal") || i && e.hasAttribute?.("data-lenis-prevent-touch") || a && e.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(e, {
			deltaX: t,
			deltaY: n
		})))) return;
		if (this.isStopped || this.isLocked) {
			r.cancelable && r.preventDefault();
			return;
		}
		if (!(this.options.syncTouch && i || this.options.smoothWheel && a)) {
			this.isScrolling = "native", this.animate.stop(), r.lenisStopPropagation = !0;
			return;
		}
		let d = n;
		this.options.gestureOrientation === "both" ? d = Math.abs(n) > Math.abs(t) ? n : t : this.options.gestureOrientation === "horizontal" && (d = t), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && n > 0 || this.animatedScroll === this.limit && n < 0)) && (r.lenisStopPropagation = !0), r.cancelable && r.preventDefault();
		let f = i && this.options.syncTouch, p = i && r.type === "touchend";
		p && (d = Math.sign(d) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + d, {
			programmatic: !1,
			...f ? { lerp: p ? this.options.syncTouchLerp : 1 } : {
				lerp: this.options.lerp,
				duration: this.options.duration,
				easing: this.options.easing
			}
		});
	};
	resize() {
		this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
	}
	emit() {
		this.emitter.emit("scroll", this);
	}
	onNativeScroll = () => {
		if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) this._preventNextNativeScrollEvent = !1;
		else if (this.isScrolling === !1 || this.isScrolling === "native") {
			let e = this.animatedScroll;
			this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - e, this.direction = Math.sign(this.animatedScroll - e), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
				this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit();
			}, 400));
		}
	};
	reset() {
		this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
	}
	start() {
		this.isStopped && (this.options.autoToggle ? this.rootElement.style.removeProperty("overflow") : this.internalStart());
	}
	internalStart() {
		this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
	}
	stop() {
		this.isStopped || (this.options.autoToggle ? this.rootElement.style.setProperty("overflow", "clip") : this.internalStop());
	}
	internalStop() {
		this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
	}
	raf = (e) => {
		let t = e - (this.time || e);
		this.time = e, this.animate.advance(t * .001), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
	};
	scrollTo(e, { offset: t = 0, immediate: n = !1, lock: r = !1, programmatic: i = !0, lerp: a = i ? this.options.lerp : void 0, duration: o = i ? this.options.duration : void 0, easing: s = i ? this.options.easing : void 0, onStart: c, onComplete: l, force: u = !1, userData: d } = {}) {
		if (this.prefersReducedMotion && (i ? n = !0 : (a = 1, o = void 0, s = void 0)), (this.isStopped || this.isLocked) && !u) return;
		let f = e, p = t;
		if (typeof f == "string" && [
			"top",
			"left",
			"start",
			"#"
		].includes(f)) f = 0;
		else if (typeof f == "string" && [
			"bottom",
			"right",
			"end"
		].includes(f)) f = this.limit;
		else {
			let e = null;
			if (typeof f == "string" ? (e = f.startsWith("#") ? document.getElementById(f.slice(1)) : document.querySelector(f), e || (f === "#top" ? f = 0 : console.warn("Lenis: Target not found", f))) : f instanceof Element && (e = f), e) {
				if (this.options.wrapper !== window) {
					let e = this.rootElement.getBoundingClientRect();
					p -= this.isHorizontal ? e.left : e.top;
				}
				let t = e.getBoundingClientRect(), n = getComputedStyle(e), r = this.isHorizontal ? Number.parseFloat(n.scrollMarginLeft) : Number.parseFloat(n.scrollMarginTop), i = getComputedStyle(this.rootElement), a = this.isHorizontal ? Number.parseFloat(i.scrollPaddingLeft) : Number.parseFloat(i.scrollPaddingTop);
				f = (this.isHorizontal ? t.left : t.top) + this.animatedScroll - (Number.isNaN(r) ? 0 : r) - (Number.isNaN(a) ? 0 : a);
			}
		}
		if (typeof f == "number") {
			if (f += p, this.options.infinite) {
				if (i) {
					this.targetScroll = this.animatedScroll = this.scroll;
					let e = f - this.animatedScroll;
					e > this.limit / 2 ? f -= this.limit : e < -this.limit / 2 && (f += this.limit);
				}
			} else f = WS(0, f, this.limit);
			f === this.targetScroll ? (c?.(this), l?.(this)) : (this.userData = d ?? {}, n ? (this.animatedScroll = this.targetScroll = f, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), l?.(this), this.userData = {}, requestAnimationFrame(() => {
				this.dispatchScrollendEvent();
			})) : (i || (this.targetScroll = f), typeof o == "number" && typeof s != "function" ? s = nC : typeof s == "function" && typeof o != "number" && (o = 1), this.animate.fromTo(this.animatedScroll, f, {
				duration: o,
				easing: s,
				lerp: a,
				onStart: () => {
					r && (this.isLocked = !0), this.isScrolling = "smooth", c?.(this);
				},
				onUpdate: (e, t) => {
					this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = e - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = e, this.setScroll(this.scroll), i && (this.targetScroll = e), t || this.emit(), t && (this.reset(), this.emit(), l?.(this), this.userData = {}, requestAnimationFrame(() => {
						this.dispatchScrollendEvent();
					}), this.preventNextNativeScrollEvent());
				}
			})));
		}
	}
	preventNextNativeScrollEvent() {
		this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
			this._preventNextNativeScrollEvent = !1;
		});
	}
	hasNestedScroll(e, { deltaX: t, deltaY: n }) {
		let r = Date.now();
		e._lenis ||= {};
		let i = e._lenis, a, o, s, c, l, u, d, f, p, m;
		if (r - (i.time ?? 0) > 2e3) {
			i.time = Date.now();
			let t = window.getComputedStyle(e);
			if (i.computedStyle = t, a = [
				"auto",
				"overlay",
				"scroll"
			].includes(t.overflowX), o = [
				"auto",
				"overlay",
				"scroll"
			].includes(t.overflowY), l = ["auto"].includes(t.overscrollBehaviorX), u = ["auto"].includes(t.overscrollBehaviorY), i.hasOverflowX = a, i.hasOverflowY = o, !(a || o)) return !1;
			d = e.scrollWidth, f = e.scrollHeight, p = e.clientWidth, m = e.clientHeight, s = d > p, c = f > m, i.isScrollableX = s, i.isScrollableY = c, i.scrollWidth = d, i.scrollHeight = f, i.clientWidth = p, i.clientHeight = m, i.hasOverscrollBehaviorX = l, i.hasOverscrollBehaviorY = u;
		} else s = i.isScrollableX, c = i.isScrollableY, a = i.hasOverflowX, o = i.hasOverflowY, d = i.scrollWidth, f = i.scrollHeight, p = i.clientWidth, m = i.clientHeight, l = i.hasOverscrollBehaviorX, u = i.hasOverscrollBehaviorY;
		if (!(a && s || o && c)) return !1;
		let h = Math.abs(t) >= Math.abs(n) ? "horizontal" : "vertical", g, _, v, y, b, x;
		if (h === "horizontal") g = Math.round(e.scrollLeft), _ = d - p, v = t, y = a, b = s, x = l;
		else if (h === "vertical") g = Math.round(e.scrollTop), _ = f - m, v = n, y = o, b = c, x = u;
		else return !1;
		return !x && (g >= _ || g <= 0) || (v > 0 ? g < _ : g > 0) && y && b;
	}
	get rootElement() {
		return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
	}
	get limit() {
		return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
	}
	get isHorizontal() {
		return this.options.orientation === "horizontal";
	}
	get actualScroll() {
		let e = this.options.wrapper;
		return this.isHorizontal ? e.scrollX ?? e.scrollLeft : e.scrollY ?? e.scrollTop;
	}
	get scroll() {
		return this.options.infinite ? qS(this.animatedScroll, this.limit) : this.animatedScroll;
	}
	get progress() {
		return this.limit === 0 ? 1 : this.scroll / this.limit;
	}
	get isScrolling() {
		return this._isScrolling;
	}
	set isScrolling(e) {
		this._isScrolling !== e && (this._isScrolling = e, this.updateClassName());
	}
	get isStopped() {
		return this._isStopped;
	}
	set isStopped(e) {
		this._isStopped !== e && (this._isStopped = e, this.updateClassName());
	}
	get isLocked() {
		return this._isLocked;
	}
	set isLocked(e) {
		this._isLocked !== e && (this._isLocked = e, this.updateClassName());
	}
	get isSmooth() {
		return this.isScrolling === "smooth";
	}
	get prefersReducedMotion() {
		return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches;
	}
	get className() {
		let e = "lenis";
		return this.options.autoToggle && (e += " lenis-autoToggle"), this.isStopped && (e += " lenis-stopped"), this.isLocked && (e += " lenis-locked"), this.isScrolling && (e += " lenis-scrolling"), this.isScrolling === "smooth" && (e += " lenis-smooth"), e;
	}
	updateClassName() {
		this.cleanUpClassName(), this.className.split(" ").forEach((e) => {
			this.rootElement.classList.add(e);
		});
	}
	cleanUpClassName() {
		for (let e of Array.from(this.rootElement.classList)) (e === "lenis" || e.startsWith("lenis-")) && this.rootElement.classList.remove(e);
	}
};
//#endregion
//#region src/lib/env.ts
function iC(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function aC(e, t, n) {
	return e + (t - e) * n;
}
function oC(e, t, n, r) {
	return aC(e, t, 1 - Math.exp(-n * r));
}
function sC() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function cC(e) {
	try {
		return e.getContext("webgl2", {
			antialias: !1,
			alpha: !0
		});
	} catch {
		return null;
	}
}
function lC(e) {
	return Math.min(window.devicePixelRatio || 1, e);
}
//#endregion
//#region src/lib/sections.ts
function uC(e) {
	return e.map((e) => {
		let t = e.getBoundingClientRect();
		return {
			top: t.top,
			bottom: t.bottom
		};
	});
}
function dC(e, t) {
	let n = 0, r = Infinity;
	return e.forEach((e, i) => {
		let a = t < e.top ? e.top - t : t > e.bottom ? t - e.bottom : 0;
		a < r && (r = a, n = i);
	}), n;
}
function fC(e = document) {
	return b("[data-sheet]", e);
}
//#endregion
//#region src/lib/motion.ts
Li.registerPlugin(X);
var pC = .85, mC = 22;
function hC() {
	let e = sC(), t = y("[data-nav-progress]"), n = b("[data-palette-nav]"), r = fC(), i = -1, a = () => {
		let e = document.documentElement.scrollHeight - window.innerHeight, n = e > 0 ? iC(window.scrollY / e, 0, 1) : 0;
		t?.style.setProperty("--progress", n.toFixed(4));
	}, o = () => {
		if (r.length === 0) return;
		let e = dC(uC(r), window.innerHeight / 2);
		if (e === i) return;
		i = e;
		let t = r[e]?.id;
		for (let e of n) t && e.hash === `#${t}` ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current");
		document.dispatchEvent(new CustomEvent("mn:sectionchange", { detail: e }));
	};
	x(window, "scroll", () => {
		a(), o();
	}, { passive: !0 }), a(), o();
	let s = null;
	e || (s = new rC({
		duration: 1.05,
		touchMultiplier: 1.6
	}), s.on("scroll", X.update), Li.ticker.add((e) => s?.raf(e * 1e3)), Li.ticker.lagSmoothing(0), x(window, "load", () => X.refresh())), x(document, "click", (e) => {
		let t = e.target?.closest("a[href^=\"#\"]");
		if (!(t instanceof HTMLAnchorElement)) return;
		let n = document.querySelector(t.hash);
		if (n instanceof HTMLElement) {
			if (e.preventDefault(), s) {
				let e = -(y(".nav")?.offsetHeight ?? 0) - 8;
				s.scrollTo(n, {
					offset: e,
					duration: 1.1
				});
			} else n.scrollIntoView({ block: "start" });
		}
	});
	let c = b("[data-reveal]");
	if (e) for (let e of c) e.style.opacity = "1", e.style.clipPath = "none";
	else for (let e of c) {
		let t = e.dataset.reveal === "mask", n = {
			opacity: 0,
			y: t ? 0 : mC,
			clipPath: t ? "inset(0 0 100% 0)" : "none"
		}, r = {
			opacity: 1,
			y: 0,
			clipPath: t ? "inset(0 0 0% 0)" : "none"
		};
		Li.fromTo(e, n, {
			...r,
			duration: pC,
			ease: "expo.out",
			scrollTrigger: {
				trigger: e,
				start: "top 88%",
				once: !0
			}
		});
	}
}
//#endregion
//#region src/lib/palette.ts
var gC = 3, _C = 1, vC = .4;
function yC(e, t) {
	let n = e.trim().toLowerCase();
	if (n.length === 0) return 1;
	let r = t.toLowerCase(), i = 0, a = -1;
	for (let e of n) {
		let t = r.indexOf(e, a + 1);
		if (t === -1) return 0;
		i += t === a + 1 ? gC : _C, a = t;
	}
	return i;
}
function bC(e, t) {
	return e.map((e) => ({
		...e,
		score: Math.max(yC(t, e.label), yC(t, e.group) * vC)
	})).filter((e) => e.score > 0).sort((e, t) => t.score - e.score);
}
function xC(e) {
	let t = [];
	for (let n of b("[data-palette-nav]", e)) t.push({
		id: `nav:${n.hash || n.textContent}`,
		group: "Sections",
		label: (n.textContent ?? "").trim(),
		hint: "Jump to section",
		action: "navigate",
		value: n.hash
	});
	for (let n of b("[data-palette-link]", e)) t.push({
		id: `link:${n.href}`,
		group: n.dataset.paletteGroup ?? "Links",
		label: n.dataset.paletteLabel ?? (n.textContent ?? "").trim(),
		hint: n.dataset.paletteHint ?? "Open",
		action: "external",
		value: n.href
	});
	return t;
}
var SC = [
	{
		id: "cmd:theme",
		group: "Actions",
		label: "Toggle theme",
		hint: "Dark / light",
		action: "theme",
		value: ""
	},
	{
		id: "cmd:lang",
		group: "Actions",
		label: "Switch language",
		hint: "English / Italiano",
		action: "language",
		value: ""
	},
	{
		id: "cmd:email",
		group: "Actions",
		label: "Copy email address",
		hint: "mirconegri06@gmail.com",
		action: "email",
		value: "mirconegri06@gmail.com"
	},
	{
		id: "cmd:cv",
		group: "Actions",
		label: "Download CV",
		hint: "PDF",
		action: "external",
		value: "assets/CV_Mirco_Negri.pdf"
	}
], CC = 9;
function wC() {
	let e = y("[data-palette]"), t = y("[data-palette-open]");
	if (!e) return;
	let n = y("[data-palette-input]", e), r = y("[data-palette-list]", e), i = y("[data-palette-empty]", e);
	if (!n || !r) return;
	let a = [...SC, ...xC(document)], o = [], s = 0, c = (e) => {
		f(), e.action === "navigate" ? y(e.value)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		}) : e.action === "external" ? window.open(e.value, "_blank", "noopener") : e.action === "theme" ? y("[data-theme-toggle]")?.click() : e.action === "language" ? y("[data-lang-toggle]")?.click() : navigator.clipboard?.writeText(e.value);
	}, l = () => {
		r.replaceChildren(), o.forEach((e, t) => {
			let n = document.createElement("button");
			n.type = "button", n.className = "palette-item", n.setAttribute("role", "option"), n.setAttribute("aria-selected", String(t === s)), n.innerHTML = `<span class="row-index">${e.group}</span><span class="row-name">${e.label}</span><span class="row-meta">${e.hint}</span>`, n.addEventListener("click", () => c(e)), n.addEventListener("pointermove", () => {
				s = t, l();
			}), r.append(n);
		}), i && (i.hidden = o.length > 0);
	}, u = () => {
		o = bC(a, n.value).slice(0, CC), s = 0, l();
	}, d = () => {
		e.hidden = !1, u(), n.focus(), n.select();
	}, f = () => {
		e.hidden = !0, n.value = "";
	};
	t && x(t, "click", d), x(n, "input", u), x(n, "keydown", (e) => {
		let t = e.key;
		t === "ArrowDown" ? (e.preventDefault(), s = Math.min(s + 1, o.length - 1), l()) : t === "ArrowUp" ? (e.preventDefault(), s = Math.max(s - 1, 0), l()) : t === "Enter" && o[s] && (e.preventDefault(), c(o[s]));
	}), x(e, "click", (t) => {
		t.target === e && f();
	}), x(document, "keydown", (t) => {
		let n = t;
		n.key.toLowerCase() === "k" && (n.metaKey || n.ctrlKey) ? (n.preventDefault(), e.hidden ? d() : f()) : n.key === "Escape" && !e.hidden && f();
	});
}
//#endregion
//#region src/lib/strata.ts
var TC = 1.5, EC = 3.2, DC = .12, OC = .45, kC = .25, AC = 3, jC = 8, MC = "#version 300 es\nprecision highp float;\n\nvoid main() {\n  vec2 corner = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));\n  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);\n}\n", NC = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uAccent2;
uniform float uOffset;
uniform float uActive;
uniform float uYaw;
uniform float uPitch;
uniform float uTime;
uniform float uIsDark;

out vec4 fragColor;

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

// Distance to an icosahedral faceted polyhedron
float sdPolyhedron(vec3 p, float r) {
  const float phi = 1.61803398875;
  const vec3 n1 = normalize(vec3(phi, 1.0, 0.0));
  const vec3 n2 = normalize(vec3(0.0, phi, 1.0));
  const vec3 n3 = normalize(vec3(1.0, 0.0, phi));
  vec3 ap = abs(p);
  float d = dot(ap, n1);
  d = max(d, dot(ap, n2));
  d = max(d, dot(ap, n3));
  d = max(d, (ap.x + ap.y + ap.z) * 0.57735);
  return d - r;
}

// Distance to inner core
float sdCore(vec3 p, float r) {
  return length(p) - r;
}

// Scene SDF
float map(vec3 p, out float matId, out float edgeDist) {
  float ico = sdPolyhedron(p, 1.12);
  float core = sdCore(p, 0.38);

  // Approximate edge distance for wireframe glow
  const float phi = 1.61803398875;
  const vec3 n1 = normalize(vec3(phi, 1.0, 0.0));
  const vec3 n2 = normalize(vec3(0.0, phi, 1.0));
  const vec3 n3 = normalize(vec3(1.0, 0.0, phi));
  vec3 ap = abs(p);
  float d1 = dot(ap, n1);
  float d2 = dot(ap, n2);
  float d3 = dot(ap, n3);
  edgeDist = min(abs(d1 - d2), min(abs(d2 - d3), abs(d3 - d1)));

  if (ico < core) {
    matId = 1.0;
    return ico;
  } else {
    matId = 2.0;
    return core;
  }
}

vec3 calcNormal(vec3 p) {
  float dummyMat, dummyEdge;
  const vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    map(p + e.xyy, dummyMat, dummyEdge) - map(p - e.xyy, dummyMat, dummyEdge),
    map(p + e.yxy, dummyMat, dummyEdge) - map(p - e.yxy, dummyMat, dummyEdge),
    map(p + e.yyx, dummyMat, dummyEdge) - map(p - e.yyx, dummyMat, dummyEdge)
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  float aspect = uResolution.x / uResolution.y;

  vec3 ro = vec3(0.0, 0.0, ${EC});
  vec3 rd = normalize(vec3(uv, -1.8));

  // Kinetic rotation: mouse orientation + idle drift + scroll-driven spin
  float ry = uYaw + uTime * 0.16 + uOffset * 0.75;
  float rx = uPitch + sin(uTime * 0.22) * 0.09;

  ro.yz = rot(rx) * ro.yz;
  rd.yz = rot(rx) * rd.yz;
  ro.xz = rot(ry) * ro.xz;
  rd.xz = rot(ry) * rd.xz;

  float t = 0.0;
  float matId = 0.0;
  float hitMat = 0.0;
  float hitEdge = 0.0;
  float glowCore = 0.0;
  float glowEdge = 0.0;

  for (int i = 0; i < 54; i++) {
    vec3 p = ro + rd * t;
    float edgeD;
    float d = map(p, matId, edgeD);

    // Volumetric glow accumulation
    float dCenter = length(p) - 0.38;
    glowCore += 0.008 / (0.04 + dCenter * dCenter);
    glowEdge += 0.002 / (0.01 + edgeD * edgeD);

    if (d < 0.001) {
      hitMat = matId;
      hitEdge = edgeD;
      break;
    }
    t += d * 0.85;
    if (t > 6.5) break;
  }

  vec3 col = vec3(0.0);

  if (t < 6.5) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 v = -rd;
    float fresnel = pow(clamp(1.0 - dot(n, v), 0.0, 1.0), 2.2);

    if (hitMat < 1.5) {
      // Outer multifaceted polyhedron
      float wire = 1.0 - smoothstep(0.0, 0.035, hitEdge);
      vec3 facetEdge = mix(uAccent, uAccent2, 0.5 + 0.5 * sin(p.y * 3.5 + uTime * 0.5));
      
      vec3 darkSurface = mix(uInk * 0.06, uAccent * 0.12, fresnel);
      vec3 lightSurface = mix(vec3(0.92), uAccent * 0.3, fresnel);
      vec3 baseSurface = mix(lightSurface, darkSurface, uIsDark);

      col = mix(baseSurface, facetEdge, wire * 0.95);
      col += facetEdge * fresnel * 0.6;
    } else {
      // Inner glowing nucleus
      col = mix(uAccent, uAccent2, 0.6 + 0.4 * sin(uTime * 1.2));
    }
  }

  // Add ambient volumetric glow
  col += uAccent * (glowCore * 0.022);
  col += mix(uAccent, uAccent2, 0.5) * (glowEdge * 0.012);

  // Soft vignette fade at edges
  vec2 screen = gl_FragCoord.xy / uResolution;
  float vignette = smoothstep(0.0, 0.12, screen.x) * smoothstep(1.0, 0.88, screen.x) *
                   smoothstep(0.0, 0.12, screen.y) * smoothstep(1.0, 0.88, screen.y);

  float alpha = clamp(length(col) * 1.35, 0.0, 0.92) * vignette;
  fragColor = vec4(col, alpha);
}
`;
function PC(e, t, n) {
	let r = e.createShader(t);
	return r ? (e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (console.error("Polyhedron shader failed to compile", e.getShaderInfoLog(r)), e.deleteShader(r), null)) : null;
}
function FC(e) {
	let t = PC(e, e.VERTEX_SHADER, MC), n = PC(e, e.FRAGMENT_SHADER, NC);
	if (!t || !n) return null;
	let r = e.createProgram();
	if (!r) return null;
	if (e.attachShader(r, t), e.attachShader(r, n), e.linkProgram(r), e.deleteShader(t), e.deleteShader(n), !e.getProgramParameter(r, e.LINK_STATUS)) return console.error("Polyhedron program failed to link", e.getProgramInfoLog(r)), e.deleteProgram(r), null;
	let i = [
		"uResolution",
		"uInk",
		"uAccent",
		"uAccent2",
		"uOffset",
		"uActive",
		"uYaw",
		"uPitch",
		"uTime",
		"uIsDark"
	], a = {};
	for (let t of i) a[t] = e.getUniformLocation(r, t);
	return {
		program: r,
		uniforms: a
	};
}
function IC(e) {
	let t = e.trim(), n = t.match(/^#([0-9a-f]{3})$/i);
	if (n) return [
		0,
		1,
		2
	].map((e) => Number.parseInt(n[1][e].repeat(2), 16) / 255);
	let r = t.match(/^#([0-9a-f]{6})/i);
	if (r) return [
		0,
		2,
		4
	].map((e) => Number.parseInt(r[1].slice(e, e + 2), 16) / 255);
	let i = t.match(/-?\d*\.?\d+/g);
	if (i && i.length >= 3) {
		let [e, t, n] = i.slice(0, 3).map(Number);
		return [
			iC(e / 255, 0, 1),
			iC(t / 255, 0, 1),
			iC(n / 255, 0, 1)
		];
	}
	return [
		0,
		0,
		0
	];
}
function LC() {
	let e = y("[data-strata]"), t = document.documentElement;
	if (!e) return;
	let n = cC(e), r = n ? FC(n) : null;
	if (!n || !r) {
		t.classList.remove("strata-live");
		return;
	}
	t.classList.add("strata-live"), n.bindVertexArray(n.createVertexArray()), n.enable(n.BLEND), n.blendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA), n.useProgram(r.program);
	let i = sC(), a = fC(), o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = !document.hidden, h = !0, g = !0, _ = () => {
		let e = getComputedStyle(document.documentElement), t = IC(e.getPropertyValue("--line-strong").trim() || "#e9e7e2"), i = IC(e.getPropertyValue("--accent").trim() || "#ff5a2c"), a = IC(e.getPropertyValue("--accent-2").trim() || "#6fd3e0"), o = document.documentElement.dataset.theme === "light" ? 0 : 1;
		n.uniform3fv(r.uniforms.uInk ?? null, t), n.uniform3fv(r.uniforms.uAccent ?? null, i), n.uniform3fv(r.uniforms.uAccent2 ?? null, a), n.uniform1f(r.uniforms.uIsDark ?? null, o);
	}, v = () => {
		let t = lC(TC), i = Math.max(1, Math.round(e.clientWidth * t)), a = Math.max(1, Math.round(e.clientHeight * t));
		(e.width !== i || e.height !== a) && (e.width = i, e.height = a, n.viewport(0, 0, i, a), n.uniform2f(r.uniforms.uResolution ?? null, i, a));
	}, b = () => {
		g && a.length !== 0 && (g = !1, l = dC(uC(a), window.innerHeight / 2));
	}, S = () => !a.some((e) => {
		if (e.classList.contains("sheet--opaque")) return !1;
		let t = e.getBoundingClientRect();
		return t.top < window.innerHeight && t.bottom > 0;
	}), C = (e) => {
		f += e;
		let t = i ? 0 : u * OC + Math.sin(f * DC) * .08, a = i ? 0 : d * kC, p = l * .8;
		i ? (o = t, s = a, c = p) : (o = oC(o, t, 3, e), s = oC(s, a, 3, e), c = oC(c, p, AC, e)), n.uniform1f(r.uniforms.uOffset ?? null, c), n.uniform1f(r.uniforms.uActive ?? null, l), n.uniform1f(r.uniforms.uYaw ?? null, o), n.uniform1f(r.uniforms.uPitch ?? null, s), n.uniform1f(r.uniforms.uTime ?? null, f), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.drawArrays(n.TRIANGLES, 0, 3);
	}, w = performance.now(), T = (e) => {
		let t = Math.min(Math.max((e - w) / 1e3, 0), .05);
		w = e, p += 1, p % jC === 0 && (h = !S()), m && h && (b(), C(t)), requestAnimationFrame(T);
	};
	_(), v(), C(0), requestAnimationFrame(T), x(window, "resize", () => {
		v(), C(0);
	}), x(document, "scroll", () => {
		g = !0;
	}, { passive: !0 }), x(document, "visibilitychange", () => {
		m = !document.hidden;
	}), x(document, "mn:themechange", () => {
		_(), C(0);
	}), x(window, "pointermove", (e) => {
		let t = e;
		u = t.clientX / window.innerWidth * 2 - 1, d = t.clientY / window.innerHeight * 2 - 1;
	}, { passive: !0 });
}
//#endregion
//#region src/lib/world-geo.ts
var RC = {
	Jersey: [[
		[-2.019, 49.231],
		[-2.236, 49.176],
		[-2.221, 49.266],
		[-2.019, 49.231]
	]],
	Guernsey: [[
		[-2.512, 49.495],
		[-2.646, 49.468],
		[-2.512, 49.495]
	]],
	"Isle of Man": [[
		[-4.412, 54.185],
		[-4.785, 54.073],
		[-4.425, 54.407],
		[-4.412, 54.185]
	]],
	"United Kingdom": [
		[
			[-2.668, 51.623],
			[-3.293, 51.39],
			[-3.562, 51.414],
			[-3.891, 51.592],
			[-4.235, 51.569],
			[-4.091, 51.66],
			[-4.386, 51.741],
			[-4.902, 51.626],
			[-5.262, 51.88],
			[-4.149, 52.326],
			[-3.98, 52.542],
			[-4.101, 52.915],
			[-4.683, 52.806],
			[-4.269, 53.145],
			[-3.428, 53.341],
			[-3.098, 53.26],
			[-3.166, 53.395],
			[-3.065, 53.427],
			[-2.75, 53.31],
			[-3.065, 53.513],
			[-2.868, 54.177],
			[-3.166, 54.128],
			[-3.592, 54.564],
			[-3.465, 54.773],
			[-3.036, 54.953],
			[-3.55, 54.947],
			[-3.958, 54.781],
			[-4.818, 54.846],
			[-4.911, 54.689],
			[-5.135, 54.858],
			[-5.173, 54.986],
			[-5.056, 54.988],
			[-4.677, 55.501],
			[-4.892, 55.699],
			[-4.826, 55.93],
			[-4.584, 55.939],
			[-4.844, 56.051],
			[-4.8, 56.158],
			[-5.215, 55.889],
			[-5.223, 56.066],
			[-4.997, 56.233],
			[-5.383, 56.019],
			[-5.556, 55.39],
			[-5.768, 55.363],
			[-5.504, 55.802],
			[-5.623, 55.813],
			[-5.535, 56.251],
			[-5.188, 56.758],
			[-5.652, 56.532],
			[-6.133, 56.718],
			[-5.731, 56.853],
			[-5.861, 56.903],
			[-5.562, 57.233],
			[-5.795, 57.379],
			[-5.582, 57.547],
			[-5.745, 57.668],
			[-5.608, 57.881],
			[-5.157, 57.881],
			[-5.413, 58.07],
			[-5.338, 58.239],
			[-5.008, 58.263],
			[-5.017, 58.567],
			[-3.053, 58.635],
			[-3.212, 58.321],
			[-3.99, 57.959],
			[-4.036, 57.852],
			[-3.857, 57.819],
			[-4.135, 57.578],
			[-3.295, 57.71],
			[-1.867, 57.612],
			[-1.781, 57.474],
			[-2.501, 56.637],
			[-3.31, 56.363],
			[-2.885, 56.398],
			[-2.674, 56.253],
			[-3.362, 56.028],
			[-3.789, 56.095],
			[-2.147, 55.903],
			[-1.655, 55.57],
			[-1.232, 54.704],
			[-.084, 54.118],
			[-.206, 54.022],
			[.115, 53.609],
			[-.66, 53.724],
			[-.294, 53.692],
			[.271, 53.335],
			[.356, 53.16],
			[.046, 52.906],
			[.28, 52.809],
			[.559, 52.967],
			[1.056, 52.959],
			[1.716, 52.677],
			[1.747, 52.469],
			[1.559, 52.087],
			[1.232, 51.971],
			[1.188, 51.803],
			[.752, 51.73],
			[.898, 51.689],
			[.891, 51.571],
			[.425, 51.466],
			[1.415, 51.363],
			[1.398, 51.182],
			[.96, 50.926],
			[.205, 50.763],
			[-1.416, 50.897],
			[-1.334, 50.821],
			[-1.517, 50.747],
			[-2.031, 50.725],
			[-2.036, 50.603],
			[-2.999, 50.717],
			[-3.405, 50.632],
			[-3.68, 50.24],
			[-4.195, 50.393],
			[-4.817, 50.256],
			[-5.119, 50.038],
			[-5.622, 50.051],
			[-5.656, 50.132],
			[-4.894, 50.534],
			[-4.188, 51.189],
			[-3.136, 51.205],
			[-2.668, 51.623]
		],
		[
			[-4.197, 53.321],
			[-4.084, 53.264],
			[-4.373, 53.134],
			[-4.568, 53.386],
			[-4.197, 53.321]
		],
		[
			[-2.549, 59.231],
			[-2.407, 59.298],
			[-2.549, 59.231]
		],
		[
			[-1.043, 60.514],
			[-1.166, 60.604],
			[-1.093, 60.72],
			[-.992, 60.686],
			[-1.043, 60.514]
		],
		[
			[-1.308, 60.538],
			[-1.052, 60.444],
			[-1.299, 59.879],
			[-1.291, 60.153],
			[-1.664, 60.283],
			[-1.375, 60.333],
			[-1.572, 60.494],
			[-1.364, 60.61],
			[-1.308, 60.538]
		],
		[
			[-.774, 60.812],
			[-.922, 60.697],
			[-.916, 60.81],
			[-.774, 60.812]
		],
		[
			[-3.165, 58.794],
			[-3.395, 58.91],
			[-3.165, 58.794]
		],
		[
			[-2.929, 58.742],
			[-3.035, 58.823],
			[-2.896, 58.828],
			[-2.929, 58.742]
		],
		[
			[-3.057, 59.03],
			[-2.762, 58.956],
			[-3.201, 58.925],
			[-3.347, 58.987],
			[-3.31, 59.131],
			[-3.057, 59.03]
		],
		[
			[-2.729, 59.187],
			[-3.052, 59.324],
			[-2.729, 59.187]
		],
		[
			[-6.608, 56.585],
			[-6.484, 56.666],
			[-6.608, 56.585]
		],
		[
			[-5.105, 55.449],
			[-5.331, 55.481],
			[-5.371, 55.667],
			[-5.185, 55.691],
			[-5.105, 55.449]
		],
		[
			[-5.778, 56.344],
			[-6.313, 56.294],
			[-6.139, 56.491],
			[-6.32, 56.569],
			[-6.103, 56.646],
			[-5.761, 56.491],
			[-5.778, 56.344]
		],
		[
			[-6.129, 55.931],
			[-6.088, 55.658],
			[-6.305, 55.607],
			[-6.302, 55.781],
			[-6.491, 55.697],
			[-6.413, 55.855],
			[-6.129, 55.931]
		],
		[
			[-5.97, 55.815],
			[-6.072, 55.893],
			[-5.725, 56.119],
			[-5.97, 55.815]
		],
		[
			[-6.199, 58.363],
			[-6.555, 58.093],
			[-6.425, 58.021],
			[-6.957, 57.75],
			[-7.083, 57.814],
			[-6.857, 57.924],
			[-7.057, 58.003],
			[-7.028, 58.222],
			[-6.726, 58.189],
			[-6.776, 58.302],
			[-6.237, 58.503],
			[-6.199, 58.363]
		],
		[
			[-6.279, 56.965],
			[-6.433, 57.018],
			[-6.279, 56.965]
		],
		[
			[-6.145, 57.505],
			[-6.136, 57.314],
			[-5.672, 57.253],
			[-5.949, 57.045],
			[-6.034, 57.201],
			[-6.323, 57.202],
			[-6.761, 57.442],
			[-6.358, 57.667],
			[-6.145, 57.505]
		],
		[
			[-7.206, 57.683],
			[-7.093, 57.627],
			[-7.183, 57.533],
			[-7.515, 57.602],
			[-7.206, 57.683]
		],
		[
			[-7.25, 57.115],
			[-7.381, 57.131],
			[-7.411, 57.381],
			[-7.267, 57.372],
			[-7.25, 57.115]
		],
		[
			[-7.417, 56.965],
			[-7.543, 56.972],
			[-7.417, 56.965]
		],
		[
			[-6.218, 54.089],
			[-6.65, 54.059],
			[-7.008, 54.407],
			[-7.325, 54.133],
			[-7.607, 54.144],
			[-8.145, 54.454],
			[-7.754, 54.595],
			[-7.911, 54.698],
			[-7.55, 54.768],
			[-7.219, 55.092],
			[-6.129, 55.217],
			[-5.717, 54.817],
			[-5.879, 54.641],
			[-5.583, 54.663],
			[-5.47, 54.5],
			[-5.671, 54.55],
			[-5.607, 54.273],
			[-6.019, 54.051],
			[-6.218, 54.089]
		],
		[
			[-1.066, 50.69],
			[-1.251, 50.589],
			[-1.563, 50.666],
			[-1.313, 50.773],
			[-1.066, 50.69]
		]
	],
	Ukraine: [[
		[38.214, 47.091],
		[37.543, 47.075],
		[36.795, 46.714],
		[35.827, 46.624],
		[35.055, 46.104],
		[35.28, 46.279],
		[35.23, 46.441],
		[34.85, 46.19],
		[34.946, 45.729],
		[34.687, 45.977],
		[33.807, 46.208],
		[33.43, 46.058],
		[33.202, 46.176],
		[32.477, 46.084],
		[31.831, 46.282],
		[32.008, 46.43],
		[31.555, 46.554],
		[32.361, 46.475],
		[32.578, 46.616],
		[32.044, 46.642],
		[31.759, 47.213],
		[31.913, 46.926],
		[31.873, 46.65],
		[31.532, 46.665],
		[31.563, 46.777],
		[31.403, 46.629],
		[30.796, 46.552],
		[30.219, 45.867],
		[29.628, 45.722],
		[29.706, 45.26],
		[29.404, 45.42],
		[28.761, 45.234],
		[28.212, 45.45],
		[28.499, 45.518],
		[28.492, 45.666],
		[28.948, 46.05],
		[28.958, 46.458],
		[29.186, 46.524],
		[29.205, 46.379],
		[29.305, 46.467],
		[29.838, 46.351],
		[30.131, 46.423],
		[29.924, 46.539],
		[29.878, 46.829],
		[29.572, 46.964],
		[29.539, 47.271],
		[29.135, 47.49],
		[29.211, 47.775],
		[29.125, 47.965],
		[28.923, 47.951],
		[28.774, 48.12],
		[28.463, 48.091],
		[27.549, 48.478],
		[26.847, 48.387],
		[26.306, 48.204],
		[26.163, 47.993],
		[24.893, 47.718],
		[24.484, 47.947],
		[23.139, 48.087],
		[22.877, 47.947],
		[22.769, 48.11],
		[22.132, 48.405],
		[22.143, 48.569],
		[22.539, 49.073],
		[22.84, 49.039],
		[22.706, 49.171],
		[22.706, 49.606],
		[23.712, 50.377],
		[24.09, 50.53],
		[23.978, 50.786],
		[24.096, 50.873],
		[23.664, 51.31],
		[23.609, 51.61],
		[23.978, 51.591],
		[24.362, 51.868],
		[25.925, 51.914],
		[27.142, 51.752],
		[27.7, 51.478],
		[28.184, 51.608],
		[28.731, 51.433],
		[29.102, 51.628],
		[29.346, 51.383],
		[30.161, 51.478],
		[30.545, 51.265],
		[30.584, 51.689],
		[30.981, 52.046],
		[32.122, 52.051],
		[32.435, 52.307],
		[33.735, 52.345],
		[34.398, 51.78],
		[34.121, 51.679],
		[34.214, 51.255],
		[35.064, 51.203],
		[35.312, 51.044],
		[35.412, 50.54],
		[35.591, 50.369],
		[36.116, 50.409],
		[36.619, 50.209],
		[37.423, 50.411],
		[38.047, 49.92],
		[38.259, 50.052],
		[38.918, 49.825],
		[39.175, 49.856],
		[39.781, 49.572],
		[40.081, 49.577],
		[40.109, 49.252],
		[39.687, 49.008],
		[40.004, 48.822],
		[39.793, 48.808],
		[39.645, 48.591],
		[39.836, 48.543],
		[39.847, 48.303],
		[39.958, 48.269],
		[39.779, 47.888],
		[38.9, 47.855],
		[38.369, 47.61],
		[38.214, 47.091]
	], [
		[32.012, 46.204],
		[31.564, 46.258],
		[31.509, 46.373],
		[32.012, 46.204]
	]],
	Turkey: [
		[
			[25.97, 40.136],
			[25.669, 40.136],
			[25.918, 40.238],
			[25.97, 40.136]
		],
		[
			[41.51, 41.517],
			[42.466, 41.44],
			[42.788, 41.564],
			[43.632, 40.929],
			[43.723, 40.72],
			[43.569, 40.482],
			[43.666, 40.126],
			[44.4, 39.996],
			[44.817, 39.65],
			[44.587, 39.769],
			[44.389, 39.422],
			[44.023, 39.377],
			[44.272, 38.836],
			[44.299, 38.386],
			[44.45, 38.334],
			[44.211, 37.908],
			[44.561, 37.745],
			[44.574, 37.435],
			[44.797, 37.27],
			[44.765, 37.142],
			[44.606, 37.176],
			[44.282, 36.978],
			[44.114, 37.302],
			[43.676, 37.227],
			[42.775, 37.372],
			[42.359, 37.109],
			[42.203, 37.297],
			[41.516, 37.089],
			[40.706, 37.098],
			[39.357, 36.682],
			[38.767, 36.693],
			[38.192, 36.902],
			[37.436, 36.643],
			[36.659, 36.803],
			[36.538, 36.457],
			[36.637, 36.234],
			[36.375, 36.171],
			[36.127, 35.831],
			[35.893, 35.917],
			[35.811, 36.31],
			[36.188, 36.659],
			[36.049, 36.911],
			[35.393, 36.575],
			[34.704, 36.817],
			[33.695, 36.182],
			[32.795, 36.036],
			[31.353, 36.801],
			[30.644, 36.866],
			[30.446, 36.27],
			[29.689, 36.157],
			[29.224, 36.324],
			[28.97, 36.715],
			[28.304, 36.812],
			[28.019, 36.634],
			[28.084, 36.751],
			[27.454, 36.712],
			[28.005, 36.832],
			[28.242, 37.029],
			[27.263, 36.977],
			[27.3, 37.127],
			[27.535, 37.164],
			[27.068, 37.658],
			[27.224, 37.725],
			[27.232, 37.979],
			[26.291, 38.277],
			[26.416, 38.368],
			[26.441, 38.641],
			[26.674, 38.336],
			[27.144, 38.452],
			[26.907, 38.482],
			[26.764, 38.71],
			[27.014, 38.887],
			[26.815, 38.961],
			[26.854, 39.116],
			[26.682, 39.292],
			[26.899, 39.55],
			[26.113, 39.467],
			[26.181, 39.99],
			[26.738, 40.4],
			[27.285, 40.456],
			[27.728, 40.329],
			[27.849, 40.382],
			[27.732, 40.481],
			[27.875, 40.513],
			[27.99, 40.489],
			[27.963, 40.37],
			[29.007, 40.39],
			[28.788, 40.534],
			[28.958, 40.631],
			[29.849, 40.76],
			[29.114, 40.938],
			[29.148, 41.221],
			[31.255, 41.108],
			[32.306, 41.73],
			[33.285, 42.005],
			[34.75, 41.957],
			[35.006, 42.063],
			[35.155, 42.028],
			[35.209, 41.794],
			[35.558, 41.634],
			[36.052, 41.683],
			[36.405, 41.275],
			[36.778, 41.363],
			[37.066, 41.184],
			[38.381, 40.925],
			[39.426, 41.106],
			[40.265, 40.961],
			[41.51, 41.517]
		],
		[
			[28.014, 41.969],
			[28.198, 41.554],
			[29.057, 41.23],
			[28.956, 41.008],
			[28.172, 41.081],
			[27.499, 40.973],
			[27.258, 40.687],
			[26.772, 40.498],
			[26.203, 40.075],
			[26.254, 40.315],
			[26.792, 40.627],
			[26.105, 40.611],
			[26.039, 40.727],
			[26.331, 40.954],
			[26.331, 41.239],
			[26.625, 41.402],
			[26.581, 41.601],
			[26.327, 41.773],
			[26.615, 41.965],
			[27.244, 42.093],
			[27.535, 41.921],
			[28.014, 41.969]
		]
	],
	Switzerland: [[
		[9.524, 47.524],
		[9.626, 47.467],
		[9.488, 47.062],
		[10.133, 46.852],
		[10.349, 46.985],
		[10.455, 46.899],
		[10.431, 46.55],
		[10.087, 46.6],
		[10.128, 46.238],
		[9.939, 46.362],
		[9.529, 46.306],
		[9.304, 46.496],
		[8.954, 45.83],
		[8.819, 46.077],
		[8.458, 46.246],
		[8.423, 46.446],
		[7.788, 45.922],
		[7.056, 45.904],
		[6.772, 46.165],
		[6.758, 46.416],
		[6.429, 46.431],
		[6.199, 46.193],
		[5.971, 46.151],
		[6.161, 46.611],
		[6.952, 47.267],
		[6.9, 47.394],
		[7.053, 47.489],
		[8.454, 47.596],
		[8.567, 47.652],
		[8.403, 47.688],
		[8.573, 47.776],
		[9.524, 47.524]
	]],
	Sweden: [
		[
			[19.076, 57.836],
			[18.814, 57.706],
			[18.791, 57.483],
			[18.908, 57.398],
			[18.146, 56.921],
			[18.285, 57.083],
			[18.105, 57.272],
			[18.137, 57.557],
			[18.537, 57.831],
			[18.901, 57.915],
			[19.076, 57.836]
		],
		[
			[16.529, 56.291],
			[16.401, 56.311],
			[16.412, 56.569],
			[16.996, 57.318],
			[17.118, 57.32],
			[16.529, 56.291]
		],
		[
			[11.388, 59.037],
			[11.471, 58.91],
			[11.643, 58.926],
			[11.798, 59.29],
			[11.681, 59.592],
			[11.932, 59.864],
			[12.486, 60.107],
			[12.589, 60.451],
			[12.294, 61.003],
			[12.706, 61.06],
			[12.881, 61.352],
			[12.155, 61.721],
			[12.304, 62.286],
			[12.115, 62.592],
			[12.109, 62.919],
			[12.218, 63.001],
			[12, 63.292],
			[12.212, 63.492],
			[12.175, 63.596],
			[12.793, 64],
			[13.961, 64.014],
			[14.141, 64.174],
			[14.078, 64.464],
			[13.65, 64.582],
			[14.48, 65.301],
			[14.635, 65.793],
			[14.543, 66.129],
			[15.484, 66.306],
			[15.423, 66.49],
			[16.404, 67.055],
			[16.434, 67.155],
			[16.127, 67.426],
			[16.194, 67.505],
			[16.457, 67.552],
			[16.784, 67.895],
			[17.325, 68.104],
			[17.917, 67.965],
			[18.177, 68.201],
			[18.163, 68.528],
			[19.97, 68.356],
			[20.24, 68.478],
			[19.969, 68.542],
			[20.348, 68.849],
			[20.117, 69.021],
			[20.895, 68.98],
			[21.997, 68.521],
			[22.854, 68.367],
			[23.639, 67.954],
			[23.502, 67.875],
			[23.455, 67.46],
			[23.734, 67.423],
			[23.642, 67.129],
			[23.989, 66.811],
			[23.701, 66.481],
			[23.7, 66.253],
			[24.155, 65.805],
			[23.102, 65.735],
			[22.401, 65.862],
			[22.254, 65.598],
			[21.566, 65.408],
			[21.609, 65.261],
			[21.41, 65.317],
			[21.574, 65.126],
			[21.138, 64.809],
			[21.52, 64.463],
			[21.018, 64.178],
			[20.763, 63.868],
			[18.606, 63.178],
			[18.313, 62.996],
			[18.502, 62.989],
			[18.463, 62.896],
			[18.17, 62.789],
			[17.88, 62.873],
			[17.903, 62.659],
			[18.037, 62.601],
			[17.378, 62.463],
			[17.634, 62.233],
			[17.375, 61.866],
			[17.465, 61.684],
			[17.196, 61.725],
			[17.131, 61.576],
			[17.251, 60.701],
			[17.661, 60.535],
			[17.956, 60.59],
			[18.558, 60.254],
			[18.535, 60.153],
			[18.787, 60.079],
			[18.99, 59.828],
			[17.964, 59.359],
			[18.56, 59.394],
			[18.618, 59.327],
			[18.414, 59.29],
			[18.285, 59.109],
			[16.978, 58.654],
			[16.214, 58.637],
			[16.924, 58.493],
			[16.652, 58.434],
			[16.77, 58.214],
			[16.555, 57.812],
			[16.652, 57.501],
			[16.476, 57.265],
			[16.528, 57.068],
			[15.997, 56.223],
			[15.827, 56.125],
			[14.714, 56.134],
			[14.755, 56.033],
			[14.559, 56.049],
			[14.215, 55.833],
			[14.342, 55.528],
			[14.174, 55.397],
			[12.886, 55.411],
			[12.974, 55.748],
			[12.471, 56.291],
			[12.802, 56.264],
			[12.656, 56.441],
			[12.857, 56.452],
			[12.884, 56.618],
			[12.421, 56.906],
			[11.879, 57.679],
			[11.735, 57.718],
			[11.703, 57.973],
			[11.449, 58.118],
			[11.432, 58.34],
			[11.248, 58.369],
			[11.147, 58.989],
			[11.388, 59.037]
		],
		[
			[19.156, 57.923],
			[19.331, 57.963],
			[19.156, 57.923]
		],
		[
			[18.416, 59.029],
			[18.486, 59.105],
			[18.416, 59.029]
		],
		[
			[18.595, 59.47],
			[18.698, 59.535],
			[18.595, 59.47]
		]
	],
	Spain: [
		[
			[1.594, 38.672],
			[1.402, 38.711],
			[1.594, 38.672]
		],
		[
			[3.145, 39.79],
			[3.462, 39.698],
			[3.073, 39.301],
			[2.701, 39.542],
			[2.5, 39.478],
			[2.37, 39.572],
			[2.905, 39.908],
			[3.198, 39.961],
			[3.145, 39.79]
		],
		[
			[4.294, 39.842],
			[3.867, 39.959],
			[3.853, 40.063],
			[4.226, 40.032],
			[4.294, 39.842]
		],
		[
			[1.445, 38.919],
			[1.223, 38.904],
			[1.349, 39.081],
			[1.613, 39.087],
			[1.445, 38.919]
		],
		[
			[-1.794, 43.407],
			[-1.411, 43.24],
			[-1.429, 43.037],
			[-1.3, 43.101],
			[-.041, 42.689],
			[.632, 42.69],
			[.697, 42.845],
			[1.349, 42.691],
			[1.449, 42.437],
			[1.706, 42.503],
			[1.987, 42.358],
			[2.652, 42.34],
			[3.211, 42.431],
			[3.307, 42.289],
			[3.166, 42.256],
			[3.248, 41.944],
			[2.083, 41.287],
			[1.033, 41.062],
			[.715, 40.823],
			[.891, 40.722],
			[.596, 40.615],
			[-.327, 39.52],
			[-.205, 39.063],
			[.202, 38.759],
			[-.521, 38.317],
			[-.815, 37.77],
			[-.722, 37.631],
			[-1.328, 37.561],
			[-1.641, 37.387],
			[-2.112, 36.777],
			[-4.367, 36.718],
			[-4.674, 36.506],
			[-5.171, 36.424],
			[-5.361, 36.135],
			[-5.625, 36.026],
			[-6.041, 36.188],
			[-6.384, 36.637],
			[-6.217, 36.914],
			[-6.396, 36.832],
			[-6.864, 37.279],
			[-7.406, 37.179],
			[-7.444, 37.728],
			[-6.958, 38.188],
			[-7.106, 38.181],
			[-7.343, 38.457],
			[-6.998, 39.056],
			[-7.536, 39.662],
			[-6.975, 39.798],
			[-6.896, 40.022],
			[-7.033, 40.168],
			[-6.81, 40.343],
			[-6.916, 41.038],
			[-6.213, 41.532],
			[-6.542, 41.673],
			[-6.618, 41.942],
			[-7.147, 41.981],
			[-7.404, 41.834],
			[-8.152, 41.812],
			[-8.225, 41.896],
			[-8.13, 42.018],
			[-8.266, 42.137],
			[-8.852, 41.927],
			[-8.887, 42.105],
			[-8.691, 42.274],
			[-8.816, 42.285],
			[-8.73, 42.412],
			[-8.812, 42.64],
			[-9.033, 42.594],
			[-8.927, 42.799],
			[-9.235, 42.977],
			[-9.178, 43.174],
			[-8.249, 43.439],
			[-8.257, 43.58],
			[-7.698, 43.765],
			[-7.061, 43.554],
			[-5.847, 43.645],
			[-4.523, 43.416],
			[-3.605, 43.519],
			[-2.337, 43.328],
			[-1.794, 43.407]
		],
		[
			[-16.334, 28.38],
			[-16.418, 28.151],
			[-16.658, 28.007],
			[-16.905, 28.34],
			[-16.124, 28.576],
			[-16.334, 28.38]
		],
		[
			[-13.716, 28.911],
			[-13.86, 28.869],
			[-13.824, 29.013],
			[-13.464, 29.237],
			[-13.478, 29.007],
			[-13.716, 28.911]
		],
		[
			[-14.197, 28.169],
			[-14.492, 28.101],
			[-14.232, 28.216],
			[-14.003, 28.707],
			[-13.857, 28.738],
			[-13.928, 28.253],
			[-14.197, 28.169]
		],
		[
			[-15.401, 28.147],
			[-15.721, 28.064],
			[-15.401, 28.147]
		],
		[
			[-17.185, 28.022],
			[-17.325, 28.118],
			[-17.259, 28.203],
			[-17.104, 28.111],
			[-17.185, 28.022]
		],
		[
			[-17.834, 28.493],
			[-18.001, 28.758],
			[-17.929, 28.845],
			[-17.727, 28.724],
			[-17.834, 28.493]
		]
	],
	Slovakia: [[
		[22.539, 49.073],
		[22.111, 48.393],
		[21.721, 48.347],
		[21.451, 48.552],
		[20.49, 48.527],
		[20.334, 48.296],
		[19.899, 48.131],
		[19.625, 48.223],
		[18.792, 48],
		[18.724, 47.787],
		[17.635, 47.81],
		[17.086, 48.04],
		[16.865, 48.387],
		[17.136, 48.841],
		[17.758, 48.888],
		[18.596, 49.491],
		[19.149, 49.4],
		[19.442, 49.598],
		[19.774, 49.372],
		[19.802, 49.192],
		[20.058, 49.181],
		[20.363, 49.385],
		[20.947, 49.317],
		[21.35, 49.429],
		[22.539, 49.073]
	]],
	Slovenia: [[
		[16.516, 46.5],
		[16.321, 46.535],
		[16.227, 46.373],
		[15.636, 46.201],
		[15.652, 45.862],
		[15.277, 45.733],
		[15.339, 45.467],
		[15.242, 45.441],
		[14.793, 45.478],
		[14.569, 45.657],
		[14.37, 45.481],
		[13.615, 45.477],
		[13.875, 45.615],
		[13.488, 45.987],
		[13.633, 46.177],
		[13.378, 46.262],
		[13.7, 46.52],
		[14.55, 46.4],
		[14.893, 46.606],
		[15.958, 46.678],
		[16.093, 46.863],
		[16.284, 46.857],
		[16.516, 46.5]
	]],
	Serbia: [[
		[21.36, 44.827],
		[22.093, 44.542],
		[22.498, 44.706],
		[22.721, 44.606],
		[22.502, 44.49],
		[22.705, 44.238],
		[22.421, 44.007],
		[22.37, 43.781],
		[22.555, 43.454],
		[22.977, 43.188],
		[22.706, 42.884],
		[22.467, 42.842],
		[22.532, 42.481],
		[22.422, 42.329],
		[21.562, 42.248],
		[21.753, 42.67],
		[21.391, 42.751],
		[20.801, 43.261],
		[20.344, 42.828],
		[19.219, 43.45],
		[19.254, 43.584],
		[19.495, 43.643],
		[19.245, 43.965],
		[19.584, 44.043],
		[19.118, 44.36],
		[19.349, 44.881],
		[18.996, 44.904],
		[19.137, 45.196],
		[19.4, 45.212],
		[19.005, 45.4],
		[19.064, 45.515],
		[18.839, 45.836],
		[19.531, 46.155],
		[20.21, 46.126],
		[20.775, 45.75],
		[20.794, 45.468],
		[21.49, 45.148],
		[21.353, 45.009],
		[21.532, 44.901],
		[21.36, 44.827]
	]],
	"San Marino": [[
		[12.485, 43.901],
		[12.397, 43.935],
		[12.504, 43.99],
		[12.485, 43.901]
	]],
	Romania: [[
		[28.212, 45.45],
		[28.761, 45.234],
		[29.404, 45.42],
		[29.706, 45.26],
		[29.558, 44.843],
		[29.048, 44.758],
		[29.095, 44.975],
		[28.892, 44.919],
		[28.807, 44.565],
		[28.888, 44.575],
		[28.645, 44.296],
		[28.585, 43.742],
		[27.087, 44.167],
		[26.216, 44.007],
		[25.497, 43.671],
		[22.919, 43.834],
		[22.868, 43.948],
		[23.029, 44.078],
		[22.495, 44.435],
		[22.721, 44.606],
		[22.498, 44.706],
		[22.093, 44.542],
		[21.36, 44.827],
		[21.532, 44.901],
		[21.353, 45.009],
		[21.49, 45.148],
		[20.794, 45.468],
		[20.775, 45.75],
		[20.242, 46.109],
		[21.122, 46.282],
		[22, 47.505],
		[23.139, 48.087],
		[24.579, 47.931],
		[24.893, 47.718],
		[26.163, 47.993],
		[26.306, 48.204],
		[26.714, 48.263],
		[26.981, 48.155],
		[27.614, 47.341],
		[28.072, 46.978],
		[28.239, 46.641],
		[28.075, 45.599],
		[28.212, 45.45]
	]],
	Portugal: [
		[
			[-17.191, 32.869],
			[-16.693, 32.758],
			[-17.018, 32.663],
			[-17.226, 32.767],
			[-17.191, 32.869]
		],
		[
			[-8.777, 41.941],
			[-8.266, 42.137],
			[-8.13, 42.018],
			[-8.225, 41.896],
			[-8.152, 41.812],
			[-7.404, 41.834],
			[-7.147, 41.981],
			[-6.618, 41.942],
			[-6.542, 41.673],
			[-6.213, 41.532],
			[-6.916, 41.038],
			[-6.81, 40.343],
			[-7.033, 40.168],
			[-6.896, 40.022],
			[-6.975, 39.798],
			[-7.536, 39.662],
			[-6.998, 39.056],
			[-7.343, 38.457],
			[-7.106, 38.181],
			[-6.958, 38.188],
			[-7.444, 37.728],
			[-7.406, 37.179],
			[-7.834, 37.006],
			[-8.598, 37.121],
			[-8.998, 37.032],
			[-8.814, 37.431],
			[-8.881, 38.447],
			[-8.668, 38.424],
			[-8.799, 38.518],
			[-9.213, 38.448],
			[-9.25, 38.657],
			[-9.021, 38.747],
			[-8.792, 39.078],
			[-9.136, 38.743],
			[-9.474, 38.731],
			[-9.375, 39.338],
			[-8.838, 40.116],
			[-8.685, 40.753],
			[-8.755, 41.698],
			[-8.888, 41.765],
			[-8.777, 41.941]
		],
		[
			[-25.027, 36.96],
			[-25.198, 36.997],
			[-25.027, 36.96]
		],
		[
			[-27.075, 38.643],
			[-27.386, 38.766],
			[-27.127, 38.79],
			[-27.075, 38.643]
		],
		[
			[-27.778, 38.556],
			[-28.311, 38.744],
			[-27.778, 38.556]
		],
		[
			[-28.641, 38.525],
			[-28.842, 38.598],
			[-28.698, 38.638],
			[-28.641, 38.525]
		],
		[
			[-28.147, 38.453],
			[-28.454, 38.409],
			[-28.549, 38.519],
			[-28.147, 38.453]
		],
		[
			[-25.649, 37.841],
			[-25.182, 37.838],
			[-25.439, 37.715],
			[-25.734, 37.763],
			[-25.846, 37.894],
			[-25.649, 37.841]
		]
	],
	Poland: [[
		[23.605, 51.518],
		[24.096, 50.873],
		[23.978, 50.786],
		[24.09, 50.53],
		[23.409, 50.174],
		[22.649, 49.539],
		[22.81, 49.021],
		[21.64, 49.412],
		[20.868, 49.315],
		[20.363, 49.385],
		[20.058, 49.181],
		[19.757, 49.204],
		[19.774, 49.372],
		[19.442, 49.598],
		[18.968, 49.396],
		[18.562, 49.879],
		[17.627, 50.116],
		[17.702, 50.307],
		[17.415, 50.255],
		[16.88, 50.427],
		[16.99, 50.237],
		[16.639, 50.102],
		[16.21, 50.424],
		[16.42, 50.574],
		[16.282, 50.656],
		[16.007, 50.612],
		[14.994, 51.014],
		[14.983, 50.887],
		[14.809, 50.859],
		[15.017, 51.253],
		[14.602, 51.832],
		[14.753, 52.082],
		[14.555, 52.36],
		[14.619, 52.529],
		[14.129, 52.878],
		[14.411, 53.199],
		[14.259, 53.73],
		[14.583, 53.639],
		[14.558, 53.823],
		[14.198, 53.919],
		[16.186, 54.29],
		[16.56, 54.554],
		[18.086, 54.836],
		[18.759, 54.685],
		[18.436, 54.745],
		[18.67, 54.431],
		[18.976, 54.349],
		[19.604, 54.459],
		[22.894, 54.391],
		[23.454, 54.143],
		[23.887, 53.028],
		[23.901, 52.704],
		[23.411, 52.516],
		[23.175, 52.287],
		[23.652, 52.04],
		[23.605, 51.518]
	]],
	Norway: [
		[
			[20.622, 69.037],
			[20.117, 69.021],
			[20.348, 68.849],
			[19.969, 68.542],
			[20.24, 68.478],
			[19.97, 68.356],
			[18.303, 68.555],
			[18.163, 68.528],
			[18.177, 68.201],
			[17.917, 67.965],
			[17.325, 68.104],
			[16.784, 67.895],
			[16.586, 67.628],
			[16.127, 67.426],
			[16.434, 67.155],
			[16.404, 67.055],
			[15.423, 66.49],
			[15.484, 66.306],
			[14.543, 66.129],
			[14.635, 65.793],
			[14.48, 65.301],
			[13.65, 64.582],
			[14.078, 64.464],
			[14.063, 64.096],
			[12.793, 64],
			[12.175, 63.596],
			[12.212, 63.492],
			[12, 63.292],
			[12.218, 63.001],
			[12.109, 62.919],
			[12.115, 62.592],
			[12.304, 62.286],
			[12.155, 61.721],
			[12.881, 61.352],
			[12.706, 61.06],
			[12.294, 61.003],
			[12.589, 60.451],
			[12.486, 60.107],
			[11.932, 59.864],
			[11.681, 59.592],
			[11.798, 59.29],
			[11.643, 58.926],
			[11.471, 58.91],
			[11.366, 59.105],
			[10.834, 59.184],
			[10.645, 59.389],
			[10.595, 59.765],
			[10.57, 59.587],
			[10.398, 59.519],
			[10.431, 59.28],
			[10.179, 59.009],
			[9.843, 58.958],
			[9.557, 59.113],
			[9.657, 58.971],
			[8.166, 58.145],
			[7.005, 58.024],
			[6.877, 58.151],
			[6.591, 58.097],
			[6.66, 58.263],
			[6.055, 58.375],
			[5.517, 58.727],
			[5.612, 59.013],
			[6.099, 58.87],
			[6.363, 59.001],
			[6.099, 58.952],
			[5.889, 59.098],
			[5.952, 59.299],
			[6.404, 59.561],
			[5.362, 59.166],
			[5.132, 59.226],
			[5.305, 59.643],
			[6.217, 59.818],
			[5.73, 59.863],
			[6.141, 60.233],
			[6.518, 60.408],
			[6.527, 60.153],
			[6.72, 60.418],
			[6.996, 60.512],
			[6.153, 60.346],
			[5.146, 59.639],
			[5.206, 60.088],
			[5.689, 60.123],
			[5.286, 60.206],
			[5.137, 60.446],
			[5.648, 60.688],
			[5.116, 60.636],
			[5.009, 61.038],
			[6.778, 61.142],
			[7.039, 60.953],
			[7.04, 61.091],
			[7.604, 61.211],
			[7.347, 61.301],
			[7.443, 61.435],
			[7.174, 61.166],
			[6.6, 61.29],
			[6.383, 61.134],
			[5.107, 61.188],
			[5.003, 61.434],
			[5.339, 61.485],
			[4.928, 61.711],
			[4.93, 61.878],
			[6.016, 61.788],
			[6.731, 61.87],
			[5.267, 61.936],
			[5.096, 62.027],
			[5.143, 62.16],
			[5.908, 62.416],
			[6.58, 62.407],
			[6.136, 62.407],
			[6.353, 62.611],
			[7.57, 62.548],
			[7.691, 62.586],
			[7.538, 62.672],
			[8.096, 62.732],
			[6.735, 62.721],
			[6.94, 62.93],
			[7.572, 63.1],
			[8.101, 63.091],
			[8.623, 62.846],
			[8.158, 63.162],
			[8.636, 63.342],
			[8.361, 63.499],
			[8.576, 63.601],
			[9.136, 63.594],
			[9.156, 63.459],
			[9.697, 63.625],
			[10.021, 63.391],
			[10.76, 63.461],
			[10.725, 63.625],
			[11.371, 63.805],
			[11.176, 63.899],
			[11.429, 64.025],
			[11.075, 63.988],
			[10.914, 63.921],
			[11.047, 63.845],
			[10.935, 63.77],
			[10.055, 63.513],
			[9.595, 63.679],
			[9.615, 63.795],
			[10.566, 64.418],
			[11.524, 64.744],
			[11.297, 64.755],
			[11.489, 64.976],
			[12.738, 65.214],
			[12.916, 65.339],
			[12.418, 65.184],
			[12.122, 65.362],
			[12.689, 65.902],
			[13.033, 65.956],
			[12.784, 66.1],
			[14.034, 66.298],
			[13.119, 66.231],
			[13.068, 66.431],
			[13.211, 66.641],
			[13.959, 66.794],
			[13.652, 66.907],
			[14.109, 67.119],
			[15.416, 67.202],
			[14.442, 67.271],
			[14.962, 67.574],
			[15.594, 67.349],
			[15.692, 67.521],
			[15.249, 67.602],
			[15.304, 67.765],
			[14.855, 67.663],
			[14.799, 67.809],
			[15.134, 67.973],
			[15.621, 67.948],
			[15.316, 68.069],
			[16.008, 68.229],
			[16.312, 67.881],
			[16.259, 68.001],
			[16.392, 68.092],
			[16.204, 68.317],
			[17.553, 68.426],
			[16.514, 68.533],
			[17.391, 68.799],
			[17.705, 69.1],
			[18.101, 69.156],
			[18.079, 69.325],
			[18.26, 69.471],
			[18.859, 69.314],
			[18.614, 69.491],
			[18.991, 69.561],
			[19.197, 69.748],
			[19.687, 69.805],
			[19.642, 69.424],
			[19.961, 69.825],
			[20.324, 69.945],
			[20.338, 69.617],
			[20.107, 69.341],
			[20.487, 69.542],
			[20.739, 69.521],
			[20.533, 69.692],
			[20.622, 69.914],
			[21.163, 69.89],
			[21.433, 70.013],
			[21.975, 69.835],
			[21.803, 70.066],
			[21.356, 70.233],
			[22.685, 70.375],
			[23.354, 69.983],
			[23.379, 70.247],
			[24.42, 70.702],
			[24.263, 70.826],
			[24.658, 71.001],
			[25.768, 70.853],
			[25.274, 70.552],
			[24.994, 70.218],
			[25.044, 70.109],
			[25.212, 70.136],
			[26.507, 70.913],
			[26.734, 70.854],
			[26.558, 70.669],
			[26.645, 70.636],
			[26.585, 70.41],
			[26.989, 70.511],
			[27.184, 70.744],
			[27.546, 70.804],
			[27.235, 70.947],
			[27.597, 71.091],
			[28.392, 70.975],
			[28.327, 70.825],
			[27.898, 70.678],
			[28.272, 70.668],
			[28.193, 70.249],
			[28.832, 70.864],
			[29.738, 70.647],
			[30.065, 70.703],
			[30.213, 70.543],
			[30.926, 70.401],
			[30.944, 70.274],
			[30.263, 70.125],
			[28.781, 70.145],
			[29.601, 69.977],
			[29.636, 69.78],
			[29.792, 69.728],
			[30.088, 69.718],
			[30.238, 69.862],
			[30.428, 69.722],
			[30.87, 69.783],
			[30.861, 69.538],
			[30.18, 69.636],
			[30.087, 69.433],
			[29.388, 69.298],
			[28.966, 69.022],
			[28.846, 69.177],
			[29.333, 69.473],
			[29.142, 69.671],
			[27.748, 70.065],
			[27.128, 69.906],
			[26.525, 69.915],
			[26.072, 69.692],
			[25.767, 69.283],
			[25.748, 68.99],
			[24.941, 68.593],
			[23.854, 68.806],
			[23.324, 68.649],
			[22.411, 68.72],
			[21.594, 69.274],
			[21.066, 69.214],
			[21.066, 69.042],
			[20.622, 69.037]
		],
		[
			[4.959, 61.085],
			[4.799, 61.083],
			[4.824, 61.178],
			[4.959, 61.085]
		],
		[
			[5.086, 60.308],
			[4.997, 60.198],
			[4.957, 60.447],
			[5.086, 60.308]
		],
		[
			[29.956, 69.797],
			[29.744, 69.792],
			[29.836, 69.906],
			[30.055, 69.838],
			[29.956, 69.797]
		],
		[
			[11.968, 65.627],
			[11.765, 65.631],
			[11.968, 65.627]
		],
		[
			[8.471, 63.667],
			[8.809, 63.771],
			[8.471, 63.667]
		],
		[
			[8.103, 63.338],
			[7.804, 63.414],
			[8.074, 63.471],
			[8.103, 63.338]
		],
		[
			[23.441, 70.816],
			[22.829, 70.542],
			[22.359, 70.515],
			[21.995, 70.657],
			[23.441, 70.816]
		],
		[
			[25.586, 71.142],
			[26.147, 71.04],
			[25.582, 70.961],
			[25.315, 71.053],
			[25.586, 71.142]
		],
		[
			[23.615, 70.549],
			[23.641, 70.464],
			[23.271, 70.296],
			[22.918, 70.385],
			[23.547, 70.617],
			[23.615, 70.549]
		],
		[
			[24.018, 70.567],
			[23.827, 70.527],
			[23.663, 70.675],
			[23.956, 70.7],
			[24.078, 70.651],
			[24.018, 70.567]
		],
		[
			[13.873, 68.265],
			[14.119, 68.247],
			[14.029, 68.188],
			[13.229, 67.995],
			[13.3, 68.16],
			[13.873, 68.265]
		],
		[
			[12.972, 67.874],
			[12.824, 67.821],
			[12.958, 68.015],
			[13.123, 68.049],
			[12.972, 67.874]
		],
		[
			[15.207, 68.943],
			[15.397, 68.784],
			[15.222, 68.616],
			[14.373, 68.711],
			[14.802, 68.791],
			[15.038, 69.001],
			[15.207, 68.943]
		],
		[
			[19.767, 70.217],
			[20.088, 70.102],
			[19.781, 70.077],
			[19.599, 70.266],
			[19.767, 70.217]
		],
		[
			[20.779, 70.09],
			[20.405, 70.119],
			[20.655, 70.231],
			[20.819, 70.205],
			[20.779, 70.09]
		],
		[
			[19.255, 70.066],
			[19.592, 69.97],
			[18.785, 69.579],
			[18.062, 69.602],
			[18.674, 69.782],
			[18.687, 69.891],
			[19.051, 70.038],
			[19.133, 70.244],
			[19.255, 70.066]
		],
		[
			[12.51, 65.902],
			[12.43, 65.94],
			[12.549, 66.002],
			[12.779, 65.992],
			[12.51, 65.902]
		],
		[
			[12.42, 66.043],
			[12.327, 66.037],
			[12.461, 66.185],
			[12.621, 66.178],
			[12.42, 66.043]
		],
		[
			[11.231, 64.866],
			[10.74, 64.87],
			[11.021, 64.979],
			[11.231, 64.866]
		],
		[
			[17.503, 69.596],
			[18.004, 69.505],
			[18.077, 69.396],
			[17.951, 69.198],
			[17.488, 69.197],
			[17.083, 69.014],
			[16.81, 69.071],
			[16.972, 69.138],
			[17.002, 69.362],
			[17.361, 69.381],
			[17.23, 69.478],
			[17.503, 69.596]
		],
		[
			[15.76, 68.561],
			[16.151, 68.842],
			[16.48, 68.803],
			[16.519, 68.633],
			[15.975, 68.402],
			[14.258, 68.191],
			[14.586, 68.4],
			[15.095, 68.441],
			[15.413, 68.616],
			[15.564, 68.874],
			[15.444, 68.919],
			[15.483, 69.043],
			[15.965, 69.302],
			[16.115, 69.216],
			[15.812, 69.024],
			[15.928, 68.733],
			[15.76, 68.561]
		],
		[
			[-8.954, 70.839],
			[-8.344, 71.14],
			[-7.979, 71.117],
			[-8.954, 70.839]
		],
		[
			[19.219, 74.391],
			[18.797, 74.486],
			[19.183, 74.518],
			[19.219, 74.391]
		],
		[
			[23.117, 77.992],
			[24.902, 77.757],
			[22.802, 77.276],
			[22.427, 77.316],
			[22.685, 77.554],
			[20.928, 77.46],
			[20.873, 77.565],
			[21.201, 77.619],
			[21.653, 77.924]
		],
		[
			[18.431, 77.991],
			[18.299, 77.579],
			[17.623, 77.399],
			[17.153, 77.049],
			[17.249, 76.969],
			[16.977, 76.812],
			[17.063, 76.659],
			[16.7, 76.579],
			[14.366, 77.234],
			[13.996, 77.508],
			[14.695, 77.525],
			[14.921, 77.689],
			[17.033, 77.798],
			[16.914, 77.898],
			[14.604, 77.766],
			[14.09, 77.771],
			[13.714, 77.919]
		]
	],
	Netherlands: [
		[
			[5.994, 50.75],
			[5.639, 50.844],
			[5.796, 51.153],
			[5.214, 51.279],
			[5.031, 51.469],
			[4.503, 51.475],
			[4.374, 51.356],
			[3.449, 51.541],
			[4.274, 51.472],
			[4.005, 51.596],
			[4.183, 51.61],
			[3.947, 51.811],
			[4.483, 52.309],
			[4.769, 52.941],
			[5.061, 52.961],
			[5.874, 53.375],
			[6.816, 53.441],
			[7.197, 53.282],
			[7.033, 52.651],
			[6.692, 52.53],
			[7.002, 52.419],
			[7.02, 52.266],
			[6.725, 52.08],
			[6.742, 51.911],
			[5.949, 51.803],
			[6.199, 51.45],
			[6.13, 51.147],
			[5.858, 51.03],
			[6.048, 50.905],
			[5.994, 50.75]
		],
		[
			[4.226, 51.386],
			[3.902, 51.208],
			[3.433, 51.246],
			[3.35, 51.378],
			[4.226, 51.386]
		],
		[
			[6.333, 53.511],
			[6.159, 53.484],
			[6.333, 53.511]
		],
		[
			[5.929, 53.459],
			[5.654, 53.467],
			[5.929, 53.459]
		],
		[
			[5.109, 53.308],
			[4.908, 53.246],
			[5.109, 53.308]
		],
		[
			[5.326, 53.386],
			[5.583, 53.438],
			[5.326, 53.386]
		],
		[
			[4.886, 53.071],
			[4.709, 53.036],
			[4.886, 53.183],
			[4.886, 53.071]
		],
		[
			[3.949, 51.739],
			[4.075, 51.649],
			[3.951, 51.627],
			[3.699, 51.71],
			[3.949, 51.739]
		],
		[
			[6.735, 53.583],
			[6.642, 53.579],
			[6.735, 53.583]
		]
	],
	Montenegro: [[
		[19.194, 43.533],
		[19.614, 43.173],
		[20.348, 42.853],
		[20.054, 42.76],
		[20.064, 42.547],
		[19.788, 42.476],
		[19.654, 42.629],
		[19.281, 42.173],
		[19.342, 41.869],
		[18.438, 42.523],
		[18.546, 42.642],
		[18.46, 42.998],
		[18.624, 43.028],
		[18.851, 43.346],
		[19.027, 43.292],
		[18.951, 43.527],
		[19.194, 43.533]
	]],
	Moldova: [[
		[26.619, 48.26],
		[27.549, 48.478],
		[28.463, 48.091],
		[28.774, 48.12],
		[28.923, 47.951],
		[29.125, 47.965],
		[29.211, 47.775],
		[29.135, 47.49],
		[29.539, 47.271],
		[29.572, 46.964],
		[29.878, 46.829],
		[29.924, 46.539],
		[30.131, 46.423],
		[29.838, 46.351],
		[29.305, 46.467],
		[29.205, 46.379],
		[29.186, 46.524],
		[28.958, 46.458],
		[28.948, 46.05],
		[28.492, 45.666],
		[28.499, 45.518],
		[28.212, 45.45],
		[28.075, 45.599],
		[28.239, 46.641],
		[28.072, 46.978],
		[27.614, 47.341],
		[26.981, 48.155],
		[26.619, 48.26]
	]],
	Malta: [[
		[14.566, 35.853],
		[14.436, 35.822],
		[14.351, 35.978],
		[14.566, 35.853]
	], [
		[14.313, 36.028],
		[14.18, 36.06],
		[14.313, 36.028]
	]],
	"North Macedonia": [[
		[21.562, 42.248],
		[22.24, 42.358],
		[22.796, 42.026],
		[23.004, 41.74],
		[22.93, 41.356],
		[22.604, 41.14],
		[21.993, 41.131],
		[21.576, 40.869],
		[20.741, 40.905],
		[20.489, 41.273],
		[20.553, 41.862],
		[20.725, 41.874],
		[20.778, 42.071],
		[21.06, 42.171],
		[21.287, 42.1],
		[21.562, 42.248]
	]],
	Luxembourg: [[
		[6.117, 50.121],
		[6.205, 49.915],
		[6.487, 49.798],
		[6.344, 49.453],
		[5.79, 49.538],
		[5.88, 49.645],
		[5.744, 49.92],
		[5.976, 50.167],
		[6.117, 50.121]
	]],
	Lithuania: [[
		[20.958, 55.279],
		[21.115, 55.617],
		[20.958, 55.279]
	], [
		[22.766, 54.357],
		[22.684, 54.563],
		[22.825, 54.871],
		[22.567, 55.059],
		[21.236, 55.264],
		[21.046, 56.07],
		[21.654, 56.315],
		[22.876, 56.396],
		[24.121, 56.264],
		[24.841, 56.411],
		[25.07, 56.2],
		[25.663, 56.105],
		[26.594, 55.668],
		[26.458, 55.342],
		[26.776, 55.273],
		[25.859, 54.919],
		[25.547, 54.332],
		[25.748, 54.26],
		[25.681, 54.14],
		[25.51, 54.16],
		[25.461, 54.293],
		[24.87, 54.145],
		[24.768, 53.975],
		[23.559, 53.92],
		[23.37, 54.2],
		[22.766, 54.357]
	]],
	Liechtenstein: [[
		[9.58, 47.057],
		[9.479, 47.098],
		[9.528, 47.271],
		[9.58, 47.057]
	]],
	Latvia: [[
		[26.594, 55.668],
		[25.663, 56.105],
		[25.07, 56.2],
		[24.841, 56.411],
		[24.121, 56.264],
		[22.085, 56.407],
		[21.046, 56.07],
		[21.031, 56.637],
		[21.729, 57.571],
		[22.555, 57.724],
		[23.287, 57.09],
		[23.648, 56.971],
		[24.383, 57.25],
		[24.323, 57.871],
		[25.34, 58.039],
		[26.462, 57.544],
		[27.47, 57.524],
		[27.829, 57.293],
		[27.639, 56.846],
		[27.849, 56.853],
		[28.103, 56.546],
		[28.148, 56.143],
		[27.577, 55.799],
		[27.053, 55.831],
		[26.594, 55.668]
	]],
	Kosovo: [[
		[20.344, 42.828],
		[20.801, 43.261],
		[21.391, 42.751],
		[21.752, 42.652],
		[21.562, 42.248],
		[21.287, 42.1],
		[21.06, 42.171],
		[20.778, 42.071],
		[20.725, 41.874],
		[20.579, 41.866],
		[20.485, 42.223],
		[20.064, 42.547],
		[20.054, 42.76],
		[20.344, 42.828]
	]],
	Italy: [
		[
			[7.021, 45.926],
			[7.788, 45.922],
			[8.423, 46.446],
			[8.458, 46.246],
			[8.819, 46.077],
			[8.954, 45.83],
			[9.304, 46.496],
			[9.529, 46.306],
			[9.939, 46.362],
			[10.081, 46.228],
			[10.087, 46.6],
			[10.431, 46.55],
			[10.453, 46.865],
			[10.993, 46.777],
			[11.244, 46.976],
			[12.169, 47.082],
			[12.154, 46.935],
			[12.388, 46.703],
			[13.7, 46.52],
			[13.378, 46.262],
			[13.633, 46.177],
			[13.488, 45.987],
			[13.875, 45.615],
			[13.72, 45.588],
			[13.628, 45.771],
			[13.206, 45.771],
			[12.274, 45.446],
			[12.226, 45.242],
			[12.523, 44.968],
			[12.248, 44.723],
			[12.396, 44.224],
			[13.564, 43.571],
			[14.01, 42.69],
			[14.541, 42.244],
			[15.169, 41.934],
			[16.165, 41.896],
			[15.9, 41.512],
			[17.955, 40.655],
			[18.461, 40.221],
			[18.393, 39.904],
			[18.344, 39.821],
			[18.078, 39.937],
			[17.865, 40.28],
			[17.396, 40.34],
			[17.18, 40.503],
			[16.928, 40.458],
			[16.522, 39.748],
			[17.115, 39.381],
			[17.175, 38.998],
			[16.617, 38.8],
			[16.546, 38.409],
			[16.057, 37.942],
			[15.725, 37.939],
			[15.643, 38.175],
			[15.822, 38.303],
			[15.927, 38.672],
			[16.197, 38.759],
			[16.21, 38.941],
			[15.693, 39.99],
			[14.951, 40.239],
			[14.948, 40.469],
			[14.766, 40.668],
			[14.34, 40.599],
			[14.461, 40.729],
			[14.044, 40.812],
			[13.733, 41.236],
			[13.089, 41.244],
			[12.631, 41.47],
			[11.637, 42.288],
			[11.103, 42.417],
			[11.168, 42.535],
			[10.515, 42.968],
			[10.246, 43.852],
			[10.048, 44.02],
			[8.766, 44.422],
			[8.005, 43.877],
			[7.493, 43.767],
			[7.637, 44.165],
			[7.319, 44.138],
			[6.9, 44.336],
			[6.843, 44.511],
			[7.031, 44.717],
			[6.993, 44.827],
			[6.635, 45.068],
			[7.078, 45.24],
			[7.146, 45.382],
			[6.791, 45.741],
			[7.021, 45.926]
		],
		[
			[10.395, 42.858],
			[10.419, 42.713],
			[10.11, 42.785],
			[10.395, 42.858]
		],
		[
			[13.938, 40.706],
			[13.871, 40.762],
			[13.938, 40.706]
		],
		[
			[12.051, 36.757],
			[11.936, 36.829],
			[12.051, 36.757]
		],
		[
			[15.577, 38.22],
			[15.1, 37.459],
			[15.296, 37.055],
			[15.113, 36.688],
			[14.502, 36.799],
			[14.143, 37.104],
			[12.64, 37.594],
			[12.436, 37.82],
			[12.734, 38.183],
			[12.903, 38.035],
			[13.352, 38.181],
			[13.789, 37.981],
			[15.499, 38.291],
			[15.577, 38.22]
		],
		[
			[9.632, 40.882],
			[9.805, 40.5],
			[9.643, 40.268],
			[9.707, 40.017],
			[9.562, 39.166],
			[9.056, 39.239],
			[8.967, 38.964],
			[8.649, 38.927],
			[8.418, 39.206],
			[8.548, 39.839],
			[8.408, 39.917],
			[8.471, 40.293],
			[8.19, 40.652],
			[8.224, 40.913],
			[8.572, 40.85],
			[9.228, 41.257],
			[9.615, 41.017],
			[9.632, 40.882]
		],
		[
			[8.479, 39.068],
			[8.421, 38.969],
			[8.359, 39.099],
			[8.479, 39.068]
		],
		[
			[8.286, 41.04],
			[8.206, 40.997],
			[8.286, 41.04]
		]
	],
	Ireland: [[
		[-9.948, 53.913],
		[-10.266, 53.978],
		[-9.948, 53.913]
	], [
		[-7.219, 55.092],
		[-7.55, 54.768],
		[-7.911, 54.698],
		[-7.754, 54.595],
		[-8.145, 54.454],
		[-7.607, 54.144],
		[-7.325, 54.133],
		[-7.008, 54.407],
		[-6.65, 54.059],
		[-6.176, 54.054],
		[-6.348, 53.941],
		[-6.142, 53.578],
		[-6.027, 52.927],
		[-6.463, 52.345],
		[-6.325, 52.247],
		[-6.89, 52.159],
		[-6.966, 52.25],
		[-8.058, 51.826],
		[-8.409, 51.889],
		[-8.408, 51.712],
		[-9.296, 51.498],
		[-9.835, 51.483],
		[-9.58, 51.689],
		[-10.121, 51.601],
		[-9.599, 51.874],
		[-10.341, 51.799],
		[-9.91, 52.123],
		[-10.357, 52.207],
		[-9.772, 52.25],
		[-9.906, 52.404],
		[-9.632, 52.547],
		[-8.783, 52.68],
		[-8.99, 52.755],
		[-9.175, 52.635],
		[-9.917, 52.57],
		[-9.465, 52.823],
		[-9.299, 53.098],
		[-8.93, 53.207],
		[-10.091, 53.413],
		[-10.117, 53.549],
		[-9.721, 53.604],
		[-9.902, 53.727],
		[-9.578, 53.805],
		[-9.914, 53.864],
		[-9.856, 54.095],
		[-10.093, 54.156],
		[-10.056, 54.258],
		[-8.546, 54.241],
		[-8.623, 54.347],
		[-8.133, 54.641],
		[-8.764, 54.681],
		[-8.377, 54.889],
		[-8.275, 55.146],
		[-7.667, 55.256],
		[-7.557, 55.122],
		[-7.659, 54.971],
		[-7.478, 55.047],
		[-7.518, 55.248],
		[-7.309, 55.366],
		[-6.962, 55.238],
		[-7.219, 55.092]
	]],
	Iceland: [[
		[-15.543, 66.229],
		[-14.596, 66.382],
		[-15.116, 66.102],
		[-14.698, 66.02],
		[-14.827, 65.764],
		[-14.392, 65.787],
		[-14.318, 65.684],
		[-14.473, 65.575],
		[-14.167, 65.642],
		[-13.618, 65.519],
		[-13.805, 65.355],
		[-13.641, 65.275],
		[-13.755, 65.193],
		[-13.559, 65.125],
		[-13.599, 65.036],
		[-13.854, 64.993],
		[-14.044, 64.742],
		[-14.385, 64.745],
		[-14.433, 64.538],
		[-14.628, 64.416],
		[-15.833, 64.177],
		[-16.64, 63.865],
		[-17.816, 63.713],
		[-17.947, 63.536],
		[-18.654, 63.407],
		[-20.198, 63.556],
		[-20.494, 63.687],
		[-20.414, 63.805],
		[-20.651, 63.737],
		[-21.152, 63.945],
		[-22.652, 63.828],
		[-22.701, 64.083],
		[-22.188, 64.039],
		[-21.463, 64.379],
		[-22.053, 64.314],
		[-21.901, 64.392],
		[-22.001, 64.413],
		[-21.95, 64.515],
		[-21.591, 64.626],
		[-22.106, 64.533],
		[-22.467, 64.795],
		[-23.819, 64.739],
		[-24.026, 64.863],
		[-21.892, 65.049],
		[-21.78, 65.188],
		[-22.509, 65.197],
		[-21.844, 65.447],
		[-22.902, 65.58],
		[-23.9, 65.408],
		[-24.476, 65.525],
		[-24.249, 65.615],
		[-23.857, 65.538],
		[-24.093, 65.776],
		[-23.616, 65.68],
		[-23.285, 65.75],
		[-23.833, 65.849],
		[-23.525, 65.88],
		[-23.777, 66.018],
		[-23.434, 66.024],
		[-23.599, 66.109],
		[-23.453, 66.181],
		[-23.019, 65.982],
		[-22.66, 66.026],
		[-22.616, 65.867],
		[-22.442, 65.908],
		[-22.445, 66.07],
		[-22.948, 66.213],
		[-22.484, 66.266],
		[-23.117, 66.339],
		[-22.889, 66.441],
		[-22.426, 66.43],
		[-21.407, 66.026],
		[-21.517, 65.968],
		[-21.309, 65.895],
		[-21.375, 65.742],
		[-21.658, 65.724],
		[-21.365, 65.578],
		[-21.432, 65.474],
		[-21.13, 65.267],
		[-20.804, 65.636],
		[-20.455, 65.571],
		[-20.357, 66.033],
		[-20.208, 66.1],
		[-19.49, 65.768],
		[-19.383, 66.076],
		[-18.846, 66.184],
		[-18.142, 65.734],
		[-18.297, 66.157],
		[-17.907, 66.143],
		[-17.55, 65.964],
		[-17.153, 66.203],
		[-16.485, 66.196],
		[-16.541, 66.447],
		[-16.249, 66.523],
		[-15.985, 66.515],
		[-15.543, 66.229]
	]],
	Hungary: [[
		[22.132, 48.405],
		[22.769, 48.11],
		[22.877, 47.947],
		[22.038, 47.537],
		[21.265, 46.412],
		[20.614, 46.133],
		[19.613, 46.169],
		[18.437, 45.767],
		[17.807, 45.79],
		[16.516, 46.5],
		[16.284, 46.857],
		[16.093, 46.863],
		[16.453, 47.007],
		[16.443, 47.4],
		[16.677, 47.536],
		[16.421, 47.674],
		[17.067, 47.708],
		[17.147, 48.006],
		[17.762, 47.77],
		[18.724, 47.787],
		[18.792, 48],
		[19.625, 48.223],
		[19.899, 48.131],
		[20.334, 48.296],
		[20.49, 48.527],
		[21.451, 48.552],
		[21.721, 48.347],
		[22.132, 48.405]
	]],
	Greece: [
		[
			[27.86, 36.554],
			[27.786, 36.608],
			[27.86, 36.554]
		],
		[
			[20.612, 38.383],
			[20.761, 38.071],
			[20.353, 38.18],
			[20.563, 38.475],
			[20.612, 38.383]
		],
		[
			[20.888, 37.805],
			[20.994, 37.708],
			[20.819, 37.665],
			[20.62, 37.855],
			[20.692, 37.93],
			[20.888, 37.805]
		],
		[
			[20.687, 38.609],
			[20.555, 38.583],
			[20.694, 38.844],
			[20.687, 38.609]
		],
		[
			[20.759, 38.329],
			[20.624, 38.48],
			[20.759, 38.329]
		],
		[
			[20.078, 39.433],
			[19.884, 39.462],
			[19.646, 39.767],
			[19.926, 39.774],
			[19.847, 39.668],
			[20.078, 39.433]
		],
		[
			[23.415, 38.959],
			[23.525, 38.813],
			[24.128, 38.648],
			[24.276, 38.22],
			[24.563, 38.148],
			[24.579, 38.02],
			[24.359, 38.019],
			[24.04, 38.39],
			[23.651, 38.443],
			[23.252, 38.801],
			[22.881, 38.848],
			[23.258, 39.031],
			[23.415, 38.959]
		],
		[
			[23.78, 39.114],
			[23.594, 39.209],
			[23.78, 39.114]
		],
		[
			[23.888, 39.158],
			[23.971, 39.268],
			[23.888, 39.158]
		],
		[
			[24.675, 38.809],
			[24.541, 38.789],
			[24.486, 38.98],
			[24.675, 38.809]
		],
		[
			[24.774, 40.615],
			[24.517, 40.687],
			[24.719, 40.786],
			[24.774, 40.615]
		],
		[
			[23.551, 37.926],
			[23.419, 37.931],
			[23.551, 37.926]
		],
		[
			[23.054, 36.19],
			[22.911, 36.221],
			[22.95, 36.384],
			[23.054, 36.19]
		],
		[
			[27.176, 35.465],
			[27.071, 35.598],
			[27.223, 35.82],
			[27.176, 35.465]
		],
		[
			[27.02, 36.959],
			[26.889, 37.087],
			[27.02, 36.959]
		],
		[
			[26.95, 36.727],
			[27.352, 36.869],
			[26.95, 36.727]
		],
		[
			[25.546, 36.968],
			[25.362, 37.07],
			[25.525, 37.196],
			[25.546, 36.968]
		],
		[
			[25.279, 37.068],
			[25.105, 37.035],
			[25.235, 37.149],
			[25.279, 37.068]
		],
		[
			[25.482, 36.393],
			[25.371, 36.359],
			[25.409, 36.474],
			[25.482, 36.393]
		],
		[
			[25.382, 36.674],
			[25.26, 36.758],
			[25.382, 36.674]
		],
		[
			[26.824, 37.811],
			[27.055, 37.709],
			[26.581, 37.724],
			[26.824, 37.811]
		],
		[
			[26.029, 37.529],
			[26.351, 37.674],
			[26.029, 37.529]
		],
		[
			[25.859, 36.79],
			[26.064, 36.903],
			[25.859, 36.79]
		],
		[
			[26.461, 36.585],
			[26.27, 36.547],
			[26.461, 36.585]
		],
		[
			[24.356, 37.577],
			[24.277, 37.601],
			[24.379, 37.683],
			[24.356, 37.577]
		],
		[
			[24.436, 37.344],
			[24.431, 37.475],
			[24.436, 37.344]
		],
		[
			[24.536, 36.764],
			[24.326, 36.656],
			[24.536, 36.764]
		],
		[
			[24.943, 37.494],
			[24.912, 37.391],
			[24.943, 37.494]
		],
		[
			[24.992, 37.76],
			[24.7, 37.962],
			[24.956, 37.905],
			[24.992, 37.76]
		],
		[
			[25.256, 37.6],
			[25.156, 37.545],
			[24.996, 37.677],
			[25.256, 37.6]
		],
		[
			[24.721, 36.921],
			[24.681, 37.022],
			[24.721, 36.921]
		],
		[
			[26.094, 38.218],
			[25.892, 38.243],
			[25.991, 38.354],
			[25.846, 38.574],
			[26.16, 38.541],
			[26.094, 38.218]
		],
		[
			[26.41, 39.329],
			[26.596, 39.049],
			[26.469, 38.973],
			[26.108, 39.081],
			[26.273, 39.198],
			[26.072, 39.096],
			[25.844, 39.2],
			[26.165, 39.374],
			[26.41, 39.329]
		],
		[
			[25.686, 40.427],
			[25.448, 40.483],
			[25.686, 40.427]
		],
		[
			[25.438, 39.983],
			[25.357, 39.808],
			[25.062, 39.852],
			[25.058, 40],
			[25.438, 39.983]
		],
		[
			[25.403, 37.419],
			[25.313, 37.489],
			[25.403, 37.419]
		],
		[
			[24.524, 37.125],
			[24.441, 37.187],
			[24.524, 37.125]
		],
		[
			[27.843, 35.929],
			[27.716, 35.957],
			[27.716, 36.172],
			[28.232, 36.434],
			[28.088, 36.065],
			[27.843, 35.929]
		],
		[
			[23.852, 35.535],
			[24.166, 35.595],
			[24.109, 35.496],
			[24.354, 35.359],
			[25.73, 35.349],
			[25.791, 35.123],
			[26.32, 35.315],
			[26.166, 35.019],
			[24.8, 34.934],
			[24.464, 35.16],
			[23.593, 35.257],
			[23.57, 35.535],
			[23.737, 35.656],
			[23.852, 35.535]
		],
		[
			[26.321, 41.717],
			[26.581, 41.601],
			[26.625, 41.402],
			[26.331, 41.239],
			[26.354, 40.997],
			[26.109, 40.75],
			[25.104, 40.995],
			[24.793, 40.858],
			[24.477, 40.948],
			[24.082, 40.724],
			[23.763, 40.748],
			[23.867, 40.419],
			[24.213, 40.328],
			[24.343, 40.148],
			[23.913, 40.359],
			[23.728, 40.33],
			[23.967, 40.115],
			[23.947, 39.966],
			[23.665, 40.224],
			[23.426, 40.264],
			[23.433, 40.115],
			[23.674, 39.959],
			[23.396, 39.99],
			[23.312, 40.216],
			[22.896, 40.4],
			[22.922, 40.591],
			[22.629, 40.496],
			[22.592, 40.037],
			[23.328, 39.175],
			[23.155, 39.101],
			[23.162, 39.258],
			[22.921, 39.306],
			[22.886, 39.17],
			[23.067, 39.038],
			[22.569, 38.867],
			[23.967, 38.275],
			[24.055, 37.71],
			[23.502, 38.035],
			[23.036, 37.878],
			[23.489, 37.44],
			[23.162, 37.334],
			[22.725, 37.542],
			[23.16, 36.448],
			[22.717, 36.794],
			[22.428, 36.476],
			[22.08, 37.029],
			[21.956, 36.99],
			[21.892, 36.737],
			[21.738, 36.863],
			[21.583, 37.081],
			[21.679, 37.387],
			[21.125, 37.892],
			[21.404, 38.197],
			[21.953, 38.321],
			[22.92, 37.958],
			[22.893, 38.051],
			[23.183, 38.134],
			[22.422, 38.439],
			[21.473, 38.321],
			[21.331, 38.487],
			[21.183, 38.346],
			[20.769, 38.874],
			[21.112, 38.896],
			[21.118, 39.03],
			[20.78, 39.009],
			[20.301, 39.327],
			[20.001, 39.709],
			[20.248, 39.678],
			[20.382, 39.803],
			[20.311, 39.979],
			[20.657, 40.117],
			[21.031, 40.622],
			[20.964, 40.85],
			[21.576, 40.869],
			[21.993, 41.131],
			[22.604, 41.14],
			[22.784, 41.332],
			[24.056, 41.527],
			[24.518, 41.553],
			[24.774, 41.356],
			[25.251, 41.244],
			[25.923, 41.312],
			[26.135, 41.386],
			[26.107, 41.726],
			[26.321, 41.717]
		]
	],
	Germany: [
		[
			[9.524, 47.524],
			[8.573, 47.776],
			[8.403, 47.688],
			[8.567, 47.652],
			[8.454, 47.596],
			[7.565, 47.607],
			[7.617, 48.157],
			[8.135, 48.974],
			[7.451, 49.152],
			[6.735, 49.161],
			[6.344, 49.453],
			[6.487, 49.798],
			[6.256, 49.872],
			[6.108, 50.094],
			[6.364, 50.316],
			[6.341, 50.452],
			[5.858, 51.03],
			[6.13, 51.147],
			[6.199, 51.45],
			[5.949, 51.803],
			[6.742, 51.911],
			[6.725, 52.08],
			[7.02, 52.266],
			[7.002, 52.419],
			[6.692, 52.53],
			[7.033, 52.651],
			[7.179, 52.966],
			[7.197, 53.282],
			[7.053, 53.376],
			[7.206, 53.655],
			[8.009, 53.691],
			[8.167, 53.543],
			[8.108, 53.468],
			[8.245, 53.445],
			[8.334, 53.606],
			[8.495, 53.394],
			[8.619, 53.875],
			[9.206, 53.856],
			[9.784, 53.555],
			[8.978, 53.926],
			[8.907, 54.261],
			[8.645, 54.295],
			[8.957, 54.538],
			[8.67, 54.903],
			[9.616, 54.855],
			[10.022, 54.674],
			[9.869, 54.472],
			[10.732, 54.316],
			[11.013, 54.379],
			[11.009, 54.181],
			[10.811, 54.075],
			[10.918, 53.995],
			[11.4, 53.945],
			[12.111, 54.168],
			[12.575, 54.467],
			[13.029, 54.411],
			[13.448, 54.141],
			[13.724, 54.153],
			[13.866, 53.853],
			[14.259, 53.73],
			[14.411, 53.199],
			[14.129, 52.878],
			[14.619, 52.529],
			[14.555, 52.36],
			[14.753, 52.082],
			[14.602, 51.832],
			[14.725, 51.524],
			[14.936, 51.435],
			[14.964, 51.095],
			[14.767, 50.818],
			[14.32, 51.038],
			[14.369, 50.899],
			[13.557, 50.705],
			[12.943, 50.406],
			[12.549, 50.393],
			[12.277, 50.181],
			[12.09, 50.269],
			[12.512, 49.896],
			[12.391, 49.74],
			[12.632, 49.461],
			[13.77, 48.816],
			[13.785, 48.587],
			[13.487, 48.582],
			[13.375, 48.361],
			[12.76, 48.107],
			[12.954, 47.891],
			[12.898, 47.722],
			[13.054, 47.655],
			[13.014, 47.478],
			[12.686, 47.669],
			[12.209, 47.718],
			[12.186, 47.62],
			[11.042, 47.393],
			[10.439, 47.552],
			[10.183, 47.279],
			[9.972, 47.505],
			[9.524, 47.524]
		],
		[
			[13.709, 54.383],
			[13.707, 54.281],
			[13.364, 54.246],
			[13.162, 54.365],
			[13.177, 54.544],
			[13.423, 54.699],
			[13.658, 54.56],
			[13.58, 54.464],
			[13.709, 54.383]
		],
		[
			[14.211, 53.95],
			[13.926, 53.879],
			[13.828, 54.127],
			[14.211, 53.95]
		],
		[
			[11.283, 54.418],
			[11.012, 54.466],
			[11.283, 54.418]
		],
		[
			[8.308, 54.787],
			[8.405, 55.059],
			[8.38, 54.9],
			[8.63, 54.892],
			[8.308, 54.787]
		],
		[
			[8.588, 54.713],
			[8.4, 54.714],
			[8.588, 54.713]
		]
	],
	France: [
		[
			[9.48, 42.805],
			[9.551, 42.13],
			[9.186, 41.385],
			[8.808, 41.588],
			[8.887, 41.701],
			[8.622, 41.931],
			[8.701, 42.096],
			[8.566, 42.358],
			[8.815, 42.608],
			[9.313, 42.713],
			[9.363, 43.017],
			[9.48, 42.805]
		],
		[
			[7.616, 47.593],
			[7.343, 47.433],
			[6.968, 47.453],
			[6.9, 47.394],
			[7.001, 47.323],
			[6.456, 46.948],
			[5.97, 46.215],
			[6.199, 46.193],
			[6.429, 46.431],
			[6.776, 46.407],
			[6.772, 46.165],
			[7.021, 45.926],
			[6.791, 45.741],
			[7.153, 45.401],
			[7.078, 45.24],
			[6.635, 45.068],
			[6.993, 44.827],
			[7.031, 44.717],
			[6.843, 44.511],
			[6.9, 44.336],
			[7.319, 44.138],
			[7.637, 44.165],
			[7.493, 43.767],
			[6.57, 43.199],
			[6.116, 43.072],
			[5.407, 43.229],
			[5.06, 43.445],
			[4.712, 43.373],
			[3.911, 43.563],
			[3.259, 43.193],
			[3.052, 42.915],
			[3.211, 42.431],
			[2.033, 42.354],
			[1.706, 42.503],
			[1.71, 42.604],
			[.764, 42.838],
			[.632, 42.69],
			[-.041, 42.689],
			[-1.3, 43.101],
			[-1.461, 43.052],
			[-1.411, 43.24],
			[-1.794, 43.407],
			[-1.485, 43.564],
			[-1.246, 44.56],
			[-1.077, 44.69],
			[-1.153, 44.764],
			[-1.245, 44.667],
			[-1.081, 45.532],
			[-.548, 45.001],
			[-.791, 45.468],
			[-1.196, 45.714],
			[-1.032, 45.741],
			[-1.146, 46.311],
			[-1.787, 46.515],
			[-2.059, 46.81],
			[-2.019, 47.038],
			[-2.197, 47.163],
			[-2.028, 47.274],
			[-1.743, 47.216],
			[-2.503, 47.312],
			[-2.428, 47.471],
			[-2.77, 47.514],
			[-2.787, 47.626],
			[-4.312, 47.823],
			[-4.679, 48.04],
			[-4.329, 48.17],
			[-4.577, 48.29],
			[-4.241, 48.304],
			[-4.763, 48.45],
			[-4.531, 48.62],
			[-3.231, 48.841],
			[-2.692, 48.537],
			[-2.446, 48.648],
			[-2.004, 48.582],
			[-1.906, 48.697],
			[-1.376, 48.653],
			[-1.565, 48.806],
			[-1.583, 49.202],
			[-1.856, 49.684],
			[-1.259, 49.68],
			[-1.139, 49.388],
			[-.163, 49.297],
			[.417, 49.448],
			[.129, 49.508],
			[.187, 49.703],
			[1.246, 49.998],
			[1.593, 50.252],
			[1.672, 50.885],
			[2.525, 51.097],
			[2.759, 50.751],
			[3.107, 50.779],
			[3.273, 50.532],
			[3.595, 50.477],
			[3.689, 50.306],
			[4.175, 50.246],
			[4.176, 49.96],
			[4.545, 49.96],
			[4.819, 50.153],
			[4.868, 49.788],
			[5.507, 49.511],
			[6.242, 49.494],
			[6.534, 49.395],
			[6.735, 49.161],
			[7.451, 49.152],
			[8.135, 48.974],
			[7.617, 48.157],
			[7.529, 47.674],
			[7.616, 47.593]
		],
		[
			[-1.178, 45.904],
			[-1.214, 45.817],
			[-1.389, 46.05],
			[-1.178, 45.904]
		]
	],
	Åland: [
		[
			[19.99, 60.351],
			[20.24, 60.283],
			[20.195, 60.194],
			[19.746, 60.099],
			[19.687, 60.268],
			[19.848, 60.221],
			[19.823, 60.39],
			[19.99, 60.351]
		],
		[
			[19.662, 60.187],
			[19.519, 60.185],
			[19.662, 60.187]
		],
		[
			[20.611, 60.041],
			[20.398, 60.041],
			[20.611, 60.041]
		]
	],
	Finland: [
		[
			[24.155, 65.805],
			[23.7, 66.253],
			[23.701, 66.481],
			[23.989, 66.811],
			[23.642, 67.129],
			[23.734, 67.423],
			[23.455, 67.46],
			[23.502, 67.875],
			[23.639, 67.954],
			[22.854, 68.367],
			[21.997, 68.521],
			[20.622, 69.037],
			[21.066, 69.042],
			[21.066, 69.214],
			[21.594, 69.274],
			[22.411, 68.72],
			[23.324, 68.649],
			[23.854, 68.806],
			[24.941, 68.593],
			[25.748, 68.99],
			[25.767, 69.283],
			[26.012, 69.653],
			[26.525, 69.915],
			[27.89, 70.062],
			[29.142, 69.671],
			[29.333, 69.473],
			[28.846, 69.177],
			[28.966, 69.022],
			[28.414, 68.904],
			[28.778, 68.814],
			[28.471, 68.488],
			[28.685, 68.19],
			[29.344, 68.062],
			[29.988, 67.668],
			[29.066, 66.892],
			[30.087, 65.787],
			[30.095, 65.682],
			[29.716, 65.625],
			[29.819, 65.569],
			[29.608, 65.249],
			[29.827, 65.145],
			[29.604, 64.968],
			[30.11, 64.733],
			[29.987, 64.524],
			[30.488, 64.237],
			[30.526, 64.077],
			[29.992, 63.735],
			[31.181, 63.208],
			[31.534, 62.885],
			[31.187, 62.481],
			[27.798, 60.536],
			[26.535, 60.413],
			[26.569, 60.625],
			[26.378, 60.424],
			[25.956, 60.474],
			[26.036, 60.342],
			[25.758, 60.268],
			[25.656, 60.333],
			[24.446, 60.021],
			[23.464, 59.986],
			[22.964, 59.826],
			[23.198, 60.022],
			[22.867, 60.216],
			[22.75, 60.057],
			[22.463, 60.029],
			[22.585, 60.381],
			[21.436, 60.596],
			[21.361, 60.967],
			[21.565, 61.484],
			[21.498, 61.552],
			[21.606, 61.592],
			[21.256, 61.99],
			[21.343, 62.277],
			[21.104, 62.623],
			[21.474, 63.033],
			[21.651, 63.039],
			[21.545, 63.204],
			[22.32, 63.31],
			[22.243, 63.438],
			[22.532, 63.648],
			[23.599, 64.041],
			[24.558, 64.801],
			[25.288, 64.86],
			[25.348, 65.479],
			[24.675, 65.671],
			[24.628, 65.859],
			[24.155, 65.805]
		],
		[
			[21.994, 60.337],
			[21.827, 60.47],
			[21.994, 60.337]
		],
		[
			[21.218, 63.241],
			[21.422, 63.246],
			[21.253, 63.152],
			[21.084, 63.278],
			[21.218, 63.241]
		],
		[
			[22.175, 60.371],
			[22.416, 60.303],
			[22.313, 60.27],
			[22.361, 60.166],
			[22.077, 60.286],
			[22.175, 60.371]
		],
		[
			[21.451, 60.53],
			[21.3, 60.48],
			[21.215, 60.604],
			[21.451, 60.53]
		],
		[
			[21.833, 60.141],
			[21.695, 60.114],
			[21.833, 60.141]
		],
		[
			[21.628, 60.108],
			[21.486, 60.127],
			[21.628, 60.108]
		],
		[
			[24.848, 64.991],
			[24.577, 65.043],
			[24.971, 65.055],
			[24.848, 64.991]
		]
	],
	Estonia: [
		[
			[27.352, 57.528],
			[26.462, 57.544],
			[25.991, 57.838],
			[25.283, 58.048],
			[24.323, 57.871],
			[24.529, 58.354],
			[24.115, 58.266],
			[23.768, 58.361],
			[23.509, 58.659],
			[23.681, 58.787],
			[23.504, 58.79],
			[23.432, 58.921],
			[23.494, 59.196],
			[24.083, 59.292],
			[24.054, 59.372],
			[24.38, 59.473],
			[25.444, 59.521],
			[25.509, 59.639],
			[26.975, 59.451],
			[28.012, 59.484],
			[28.151, 59.374],
			[27.898, 59.278],
			[27.434, 58.787],
			[27.502, 58.221],
			[27.779, 57.871],
			[27.542, 57.799],
			[27.352, 57.528]
		],
		[
			[22.617, 58.621],
			[23.323, 58.451],
			[22.372, 58.217],
			[21.997, 57.931],
			[22.188, 58.154],
			[21.882, 58.262],
			[21.984, 58.387],
			[21.862, 58.497],
			[22.617, 58.621]
		],
		[
			[22.924, 58.827],
			[22.542, 58.69],
			[22.411, 58.863],
			[22.056, 58.944],
			[22.649, 59.087],
			[22.91, 58.991],
			[23.009, 58.834],
			[22.924, 58.827]
		],
		[
			[23.344, 58.55],
			[23.063, 58.611],
			[23.333, 58.649],
			[23.344, 58.55]
		]
	],
	"Faeroe Is.": [
		[
			[-6.623, 61.806],
			[-6.885, 61.899],
			[-6.623, 61.806]
		],
		[
			[-6.699, 61.445],
			[-6.935, 61.634],
			[-6.699, 61.445]
		],
		[
			[-7.187, 62.139],
			[-7.065, 62.073],
			[-7.179, 62.04],
			[-7.423, 62.14],
			[-7.187, 62.139]
		],
		[
			[-6.631, 62.228],
			[-6.656, 62.094],
			[-6.841, 62.119],
			[-6.725, 61.951],
			[-7.172, 62.286],
			[-6.631, 62.228]
		],
		[
			[-6.406, 62.259],
			[-6.544, 62.206],
			[-6.555, 62.356],
			[-6.406, 62.259]
		]
	],
	Denmark: [
		[
			[12.569, 55.785],
			[12.215, 55.467],
			[12.413, 55.286],
			[12.09, 55.188],
			[12.05, 54.815],
			[11.862, 54.773],
			[11.654, 55.187],
			[11.286, 55.204],
			[10.979, 55.722],
			[11.322, 55.753],
			[11.628, 55.957],
			[11.691, 55.729],
			[11.82, 55.698],
			[11.935, 55.896],
			[11.866, 55.968],
			[12.219, 56.119],
			[12.579, 56.064],
			[12.569, 55.785]
		],
		[
			[9.74, 54.826],
			[8.67, 54.903],
			[8.616, 55.418],
			[8.132, 55.6],
			[8.164, 56.607],
			[8.672, 56.496],
			[8.888, 56.735],
			[9.196, 56.702],
			[9.255, 57.012],
			[8.993, 57.016],
			[8.772, 56.725],
			[8.468, 56.665],
			[8.268, 56.754],
			[8.427, 56.984],
			[8.619, 57.111],
			[9.434, 57.174],
			[9.962, 57.581],
			[10.61, 57.737],
			[10.46, 57.615],
			[10.524, 57.243],
			[10.296, 56.999],
			[10.283, 56.621],
			[10.926, 56.443],
			[10.753, 56.242],
			[10.319, 56.213],
			[10.183, 55.865],
			[9.904, 55.843],
			[10.024, 55.761],
			[9.591, 55.493],
			[9.671, 55.266],
			[9.454, 55.04],
			[9.732, 54.968],
			[9.74, 54.826]
		],
		[
			[10.645, 55.61],
			[10.819, 55.322],
			[10.785, 55.133],
			[10.624, 55.052],
			[9.989, 55.163],
			[9.859, 55.357],
			[9.861, 55.515],
			[10.645, 55.61]
		],
		[
			[11.361, 54.892],
			[11.74, 54.807],
			[11.766, 54.679],
			[11.457, 54.629],
			[11.036, 54.773],
			[11.059, 54.941],
			[11.361, 54.892]
		],
		[
			[10.734, 54.751],
			[10.622, 54.851],
			[10.951, 55.156],
			[10.734, 54.751]
		],
		[
			[12.549, 54.966],
			[12.119, 54.914],
			[12.274, 55.064],
			[12.549, 54.966]
		],
		[
			[12.666, 55.597],
			[12.52, 55.615],
			[12.666, 55.597]
		],
		[
			[10.484, 54.848],
			[10.2, 54.963],
			[10.484, 54.848]
		],
		[
			[10.061, 54.886],
			[9.806, 54.906],
			[9.771, 55.06],
			[10.061, 54.886]
		],
		[
			[10.607, 55.783],
			[10.547, 55.992],
			[10.607, 55.783]
		],
		[
			[11.052, 57.253],
			[10.874, 57.262],
			[11.052, 57.253]
		],
		[
			[15.088, 55.022],
			[14.684, 55.102],
			[14.714, 55.238],
			[15.133, 55.145],
			[15.088, 55.022]
		]
	],
	Czechia: [[
		[18.832, 49.511],
		[18.161, 49.257],
		[18.086, 49.065],
		[17.758, 48.888],
		[17.136, 48.841],
		[16.953, 48.599],
		[16.544, 48.796],
		[16.057, 48.755],
		[14.993, 49.001],
		[14.923, 48.771],
		[14.691, 48.599],
		[14.19, 48.579],
		[12.681, 49.415],
		[12.391, 49.74],
		[12.512, 49.896],
		[12.09, 50.302],
		[12.277, 50.181],
		[12.549, 50.393],
		[12.943, 50.406],
		[13.557, 50.705],
		[14.369, 50.899],
		[14.283, 51.029],
		[14.546, 50.994],
		[14.723, 50.815],
		[14.983, 50.887],
		[14.994, 51.014],
		[16.007, 50.612],
		[16.36, 50.621],
		[16.21, 50.424],
		[16.639, 50.102],
		[16.99, 50.237],
		[16.88, 50.427],
		[17.415, 50.255],
		[17.702, 50.307],
		[17.627, 50.116],
		[18.562, 49.879],
		[18.832, 49.511]
	]],
	"N. Cyprus": [[
		[34.004, 35.065],
		[33.476, 35],
		[33.384, 35.163],
		[32.92, 35.088],
		[32.713, 35.171],
		[32.88, 35.181],
		[32.942, 35.39],
		[33.608, 35.354],
		[34.556, 35.662],
		[33.942, 35.292],
		[34.004, 35.065]
	]],
	Cyprus: [[
		[32.713, 35.171],
		[32.92, 35.088],
		[33.384, 35.163],
		[33.476, 35],
		[33.866, 35.094],
		[34.05, 34.988],
		[33.699, 34.97],
		[32.942, 34.576],
		[32.449, 34.729],
		[32.317, 34.953],
		[32.301, 35.083],
		[32.713, 35.171]
	]],
	Croatia: [
		[
			[13.578, 45.517],
			[14.37, 45.481],
			[14.569, 45.657],
			[14.793, 45.478],
			[15.339, 45.467],
			[15.277, 45.733],
			[15.652, 45.862],
			[15.609, 46.172],
			[16.227, 46.373],
			[16.321, 46.535],
			[16.748, 46.416],
			[17.807, 45.79],
			[18.358, 45.753],
			[18.905, 45.932],
			[18.839, 45.836],
			[19.064, 45.515],
			[19.005, 45.4],
			[19.401, 45.189],
			[19.137, 45.196],
			[19.085, 44.927],
			[18.941, 44.865],
			[18.663, 45.077],
			[17.813, 45.078],
			[16.919, 45.277],
			[16.531, 45.217],
			[16.293, 45.009],
			[16.028, 45.19],
			[15.788, 45.179],
			[15.737, 44.766],
			[16.103, 44.521],
			[16.3, 44.125],
			[17.274, 43.446],
			[17.65, 43.007],
			[17.585, 42.938],
			[16.903, 43.392],
			[15.986, 43.52],
			[15.186, 44.172],
			[15.123, 44.257],
			[15.471, 44.272],
			[14.981, 44.603],
			[14.855, 45.081],
			[14.55, 45.298],
			[14.313, 45.338],
			[13.861, 44.837],
			[13.629, 45.108],
			[13.578, 45.517]
		],
		[
			[16.651, 42.997],
			[17.188, 42.917],
			[16.651, 42.997]
		],
		[
			[17.194, 43.126],
			[16.376, 43.214],
			[17.194, 43.126]
		],
		[
			[16.785, 43.271],
			[16.423, 43.317],
			[16.602, 43.382],
			[16.834, 43.351],
			[16.785, 43.271]
		],
		[
			[15.231, 44.062],
			[15.066, 44.158],
			[15.231, 44.062]
		],
		[
			[14.81, 44.977],
			[14.438, 45.099],
			[14.571, 45.225],
			[14.81, 44.977]
		],
		[
			[14.831, 44.759],
			[14.66, 44.8],
			[14.831, 44.759]
		],
		[
			[15.188, 44.336],
			[14.742, 44.697],
			[15.188, 44.336]
		],
		[
			[15.189, 43.922],
			[14.865, 44.168],
			[15.189, 43.922]
		],
		[
			[15.371, 43.974],
			[15.27, 44.011],
			[15.371, 43.974]
		],
		[
			[14.488, 44.66],
			[14.312, 44.9],
			[14.331, 45.165],
			[14.488, 44.66]
		],
		[
			[17.608, 42.769],
			[17.344, 42.79],
			[17.608, 42.769]
		],
		[
			[18.436, 42.56],
			[18.517, 42.433],
			[17.824, 42.797],
			[17.045, 43.015],
			[17.802, 42.902],
			[18.436, 42.56]
		]
	],
	Bulgaria: [[
		[28.014, 41.969],
		[27.535, 41.921],
		[27.244, 42.093],
		[26.615, 41.965],
		[26.321, 41.717],
		[26.107, 41.726],
		[26.135, 41.386],
		[25.923, 41.312],
		[25.251, 41.244],
		[24.488, 41.555],
		[22.916, 41.336],
		[23.004, 41.74],
		[22.837, 41.994],
		[22.344, 42.314],
		[22.524, 42.441],
		[22.467, 42.842],
		[22.706, 42.884],
		[22.977, 43.188],
		[22.499, 43.519],
		[22.399, 43.97],
		[22.705, 44.238],
		[23.029, 44.078],
		[22.868, 43.948],
		[22.919, 43.834],
		[25.497, 43.671],
		[26.216, 44.007],
		[27.087, 44.167],
		[28.585, 43.742],
		[28.562, 43.501],
		[28.465, 43.389],
		[28.134, 43.396],
		[27.929, 43.186],
		[27.889, 42.75],
		[27.485, 42.468],
		[28.014, 41.969]
	]],
	"Bosnia and Herz.": [[
		[19.349, 44.881],
		[19.118, 44.36],
		[19.584, 44.043],
		[19.245, 43.965],
		[19.48, 43.595],
		[18.951, 43.527],
		[19.027, 43.292],
		[18.851, 43.346],
		[18.444, 42.968],
		[18.546, 42.642],
		[18.436, 42.56],
		[17.585, 42.938],
		[17.65, 43.007],
		[17.274, 43.446],
		[16.3, 44.125],
		[16.103, 44.521],
		[15.737, 44.766],
		[15.823, 45.203],
		[16.293, 45.009],
		[16.531, 45.217],
		[16.919, 45.277],
		[17.813, 45.078],
		[18.663, 45.077],
		[18.836, 44.883],
		[19.349, 44.881]
	]],
	Belgium: [[
		[4.226, 51.386],
		[5.031, 51.469],
		[5.214, 51.279],
		[5.827, 51.126],
		[5.639, 50.844],
		[6.236, 50.597],
		[6.168, 50.545],
		[6.364, 50.316],
		[6.117, 50.121],
		[5.976, 50.167],
		[5.744, 49.92],
		[5.88, 49.645],
		[5.815, 49.554],
		[5.507, 49.511],
		[4.868, 49.788],
		[4.819, 50.153],
		[4.545, 49.96],
		[4.176, 49.96],
		[4.175, 50.246],
		[3.689, 50.306],
		[3.595, 50.477],
		[3.273, 50.532],
		[3.107, 50.779],
		[2.84, 50.712],
		[2.597, 50.876],
		[2.525, 51.097],
		[3.225, 51.352],
		[3.902, 51.208],
		[4.226, 51.386]
	]],
	Belarus: [[
		[31.763, 52.101],
		[31.079, 52.077],
		[30.755, 51.895],
		[30.533, 51.596],
		[30.633, 51.355],
		[30.545, 51.265],
		[30.161, 51.478],
		[29.346, 51.383],
		[29.102, 51.628],
		[28.731, 51.433],
		[28.184, 51.608],
		[27.7, 51.478],
		[27.142, 51.752],
		[25.786, 51.924],
		[24.362, 51.868],
		[23.978, 51.591],
		[23.707, 51.641],
		[23.605, 51.518],
		[23.652, 52.04],
		[23.175, 52.287],
		[23.915, 52.77],
		[23.485, 53.94],
		[24.318, 53.893],
		[25.461, 54.293],
		[25.51, 54.16],
		[25.749, 54.157],
		[25.547, 54.332],
		[25.859, 54.919],
		[26.776, 55.273],
		[26.458, 55.342],
		[26.594, 55.668],
		[27.053, 55.831],
		[27.577, 55.799],
		[28.118, 56.146],
		[28.795, 55.943],
		[29.032, 56.022],
		[29.375, 55.939],
		[29.353, 55.784],
		[29.482, 55.685],
		[30.234, 55.845],
		[30.907, 55.57],
		[30.814, 55.279],
		[30.978, 55.05],
		[30.799, 54.783],
		[31.152, 54.625],
		[31.075, 54.492],
		[31.404, 54.196],
		[31.826, 54.031],
		[31.754, 53.81],
		[32.45, 53.693],
		[32.47, 53.547],
		[32.706, 53.419],
		[32.142, 53.091],
		[31.418, 53.196],
		[31.259, 53.017],
		[31.565, 52.759],
		[31.577, 52.312],
		[31.763, 52.101]
	]],
	Austria: [[
		[9.528, 47.271],
		[9.626, 47.467],
		[9.524, 47.524],
		[9.749, 47.576],
		[10.183, 47.279],
		[10.439, 47.552],
		[11.042, 47.393],
		[12.186, 47.62],
		[12.209, 47.718],
		[12.686, 47.669],
		[13.014, 47.478],
		[13.054, 47.655],
		[12.898, 47.722],
		[12.954, 47.891],
		[12.76, 48.076],
		[12.814, 48.161],
		[13.375, 48.361],
		[13.487, 48.582],
		[13.724, 48.542],
		[13.815, 48.767],
		[14.049, 48.602],
		[14.691, 48.599],
		[14.923, 48.771],
		[14.993, 49.001],
		[16.884, 48.704],
		[16.865, 48.387],
		[17.147, 48.006],
		[17.067, 47.708],
		[16.421, 47.674],
		[16.677, 47.536],
		[16.443, 47.4],
		[16.461, 47.022],
		[16.037, 46.845],
		[15.958, 46.678],
		[14.893, 46.606],
		[14.55, 46.4],
		[12.479, 46.673],
		[12.154, 46.935],
		[12.169, 47.082],
		[11.244, 46.976],
		[10.927, 46.769],
		[10.349, 46.985],
		[10.133, 46.852],
		[9.58, 47.057],
		[9.528, 47.271]
	]],
	Andorra: [[
		[1.706, 42.503],
		[1.449, 42.437],
		[1.415, 42.548],
		[1.568, 42.635],
		[1.706, 42.503]
	]],
	Albania: [[
		[19.342, 41.869],
		[19.281, 42.173],
		[19.703, 42.648],
		[19.788, 42.476],
		[20.064, 42.547],
		[20.523, 42.171],
		[20.489, 41.273],
		[20.709, 40.928],
		[20.959, 40.872],
		[21.031, 40.622],
		[20.657, 40.117],
		[20.311, 39.979],
		[20.382, 39.803],
		[20.207, 39.654],
		[20.001, 39.709],
		[19.852, 40.044],
		[19.322, 40.407],
		[19.459, 40.405],
		[19.337, 40.664],
		[19.576, 41.64],
		[19.578, 41.788],
		[19.342, 41.869]
	]]
}, zC = -25, BC = 34, VC = 72, HC = {
	top: 22,
	bottom: 22,
	left: 14,
	right: 14
}, UC = 2, WC = 3.6, GC = 15, KC = 28, qC = [
	{
		id: "castelmassa",
		lon: 11.3149,
		lat: 45.0223,
		label: "Castelmassa",
		note: "Hometown",
		kind: "home"
	},
	{
		id: "trento",
		lon: 11.1212,
		lat: 46.0664,
		label: "Trento",
		note: "BSc Computer Science",
		kind: "study"
	},
	{
		id: "dublin",
		lon: -6.2603,
		lat: 53.72,
		label: "Dublin",
		note: "English certificate, 2024",
		kind: "study"
	},
	{
		id: "trondheim",
		lon: 10.3951,
		lat: 63.4305,
		label: "Trondheim",
		note: "Erasmus, 2027",
		kind: "study"
	},
	{
		id: "palermo",
		lon: 13.3615,
		lat: 38.1157,
		label: "Palermo",
		note: "School trip, 2023",
		kind: "journey"
	},
	{
		id: "torino",
		lon: 7.6869,
		lat: 45.0703,
		label: "Turin",
		note: "School trip, 2024",
		kind: "journey"
	},
	{
		id: "barcelona",
		lon: 2.1686,
		lat: 41.3874,
		label: "Barcelona",
		note: "School trip, 2024",
		kind: "journey"
	},
	{
		id: "firenze",
		lon: 11.2558,
		lat: 43.7696,
		label: "Florence",
		note: "School trip, 2024",
		kind: "journey"
	},
	{
		id: "belfast",
		lon: -5.9301,
		lat: 54.5973,
		label: "Belfast",
		note: "Trip, 2024",
		kind: "journey"
	},
	{
		id: "milano",
		lon: 9.19,
		lat: 45.4642,
		label: "Milan",
		note: "Trip, 2024",
		kind: "journey"
	},
	{
		id: "rome",
		lon: 12.4964,
		lat: 41.9028,
		label: "Rome",
		note: "Trip, 2025",
		kind: "journey"
	},
	{
		id: "bucharest",
		lon: 26.1025,
		lat: 44.4268,
		label: "Bucharest",
		note: "Trip, 2025",
		kind: "journey"
	},
	{
		id: "brasov",
		lon: 25.591,
		lat: 45.658,
		label: "Brașov",
		note: "Trip, 2025",
		kind: "journey"
	},
	{
		id: "budapest",
		lon: 19.0402,
		lat: 47.4979,
		label: "Budapest",
		note: "Trip, 2025",
		kind: "journey"
	},
	{
		id: "venezia",
		lon: 12.3155,
		lat: 45.4408,
		label: "Venice",
		note: "Trip, 2025",
		kind: "journey"
	},
	{
		id: "bologna",
		lon: 11.3426,
		lat: 44.4949,
		label: "Bologna",
		note: "Trip, 2025",
		kind: "journey"
	},
	{
		id: "amsterdam",
		lon: 4.9041,
		lat: 52.3676,
		label: "Amsterdam",
		note: "Trip, 2026",
		kind: "journey"
	},
	{
		id: "bolzano",
		lon: 11.3548,
		lat: 46.4983,
		label: "Bolzano",
		note: "Trip, 2026",
		kind: "journey"
	},
	{
		id: "cinque-terre",
		lon: 9.728,
		lat: 44.127,
		label: "Cinque Terre",
		note: "Scout hike, 2022",
		kind: "journey"
	},
	{
		id: "wicklow",
		lon: -6.3298,
		lat: 52.85,
		label: "Wicklow Way",
		note: "Scout hike, 2023",
		kind: "journey"
	},
	{
		id: "rovereto",
		lon: 11.04,
		lat: 45.8904,
		label: "Rovereto",
		note: "Scout hike, 2023",
		kind: "journey"
	},
	{
		id: "sarajevo",
		lon: 18.4131,
		lat: 43.8563,
		label: "Sarajevo",
		note: "Scout service, 2024",
		kind: "journey"
	},
	{
		id: "tuzla",
		lon: 18.6735,
		lat: 44.5329,
		label: "Tuzla",
		note: "Scout service, 2024",
		kind: "journey"
	},
	{
		id: "black-forest",
		lon: 8.15,
		lat: 48.3,
		label: "Black Forest",
		note: "Scout hike, 2025",
		kind: "journey"
	},
	{
		id: "sondrio",
		lon: 9.8714,
		lat: 46.1708,
		label: "Sondrio",
		note: "Scout hike, 2025",
		kind: "journey"
	},
	{
		id: "loreto",
		lon: 13.6066,
		lat: 43.4393,
		label: "Loreto",
		note: "Scout service, 2026",
		kind: "journey"
	}
];
function JC(e, t, n, r) {
	return [HC.left + (e - zC) / 70 * (n - HC.left - HC.right), HC.top + (VC - t) / 38 * (r - HC.top - HC.bottom)];
}
function YC(e, t, n, r) {
	return [zC + (e - HC.left) / (n - HC.left - HC.right) * 70, VC - (t - HC.top) / (r - HC.top - HC.bottom) * 38];
}
function XC(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
	for (let a of e) for (let [e, o] of a) e < t && (t = e), o < n && (n = o), e > r && (r = e), o > i && (i = o);
	return [
		t,
		n,
		r,
		i
	];
}
function ZC(e, t, n) {
	let r = !1;
	for (let i = 0, a = n.length - 1; i < n.length; a = i, i += 1) {
		let [o, s] = n[i], [c, l] = n[a];
		s > t != l > t && e < (c - o) * (t - s) / (l - s) + o && (r = !r);
	}
	return r;
}
function QC(e) {
	return Object.entries(e).map(([e, t]) => ({
		name: e,
		rings: t,
		bounds: XC(t)
	}));
}
function $C(e, t, n) {
	for (let r of e) {
		let [e, i, a, o] = r.bounds;
		if (!(t < e || t > a || n < i || n > o)) {
			for (let e of r.rings) if (ZC(t, n, e)) return r.name;
		}
	}
	return null;
}
function ew(e, t, n, r, i, a = GC) {
	let o = -1;
	return e.forEach((e, s) => {
		let [c, l] = JC(e.lon, e.lat, r, i);
		Math.hypot(t - c, n - l) <= a && (o = s);
	}), o;
}
function tw() {
	let e = getComputedStyle(document.documentElement), t = (t, n) => e.getPropertyValue(t).trim() || n;
	return {
		ink: t("--text", "#e9e7e2"),
		grid: t("--grid-line", "rgba(233,231,226,.055)"),
		home: t("--accent", "#ff5a2c"),
		study: t("--accent-2", "#6fd3e0"),
		journey: t("--text-3", "#7e838c"),
		panel: t("--bg-elevated", "#13161a"),
		panelLine: t("--line-strong", "rgba(233,231,226,.2)")
	};
}
function nw(e, t) {
	return t === "home" ? e.home : t === "study" ? e.study : e.journey;
}
function rw() {
	let e = y("[data-terrain]"), t = e ? y("canvas", e) : null, n = t?.getContext("2d");
	if (!e || !t || !n) return;
	let r = QC(RC), i = qC.find((e) => e.kind === "home") ?? qC[0], a = n, o = tw(), s = 1, c = 1, l = -1, u = null, d = 0, f = !0, p = () => {
		let n = lC(UC);
		s = Math.max(1, e.clientWidth), c = Math.max(1, e.clientHeight), t.width = Math.round(s * n), t.height = Math.round(c * n), a.setTransform(n, 0, 0, n, 0, 0), f = !0;
	}, m = () => {
		a.save(), a.strokeStyle = o.grid, a.lineWidth = 1;
		for (let e = -20; e <= 40; e += 10) {
			let [t] = JC(e, BC, s, c);
			a.beginPath(), a.moveTo(t, 0), a.lineTo(t, c), a.stroke();
		}
		for (let e = 35; e <= 70; e += 5) {
			let [, t] = JC(zC, e, s, c);
			a.beginPath(), a.moveTo(0, t), a.lineTo(s, t), a.stroke();
		}
		a.restore();
	}, h = (e) => {
		for (let t of e) a.beginPath(), t.forEach(([e, t], n) => {
			let [r, i] = JC(e, t, s, c);
			n === 0 ? a.moveTo(r, i) : a.lineTo(r, i);
		}), a.closePath(), a.fill(), a.stroke();
	}, g = () => {
		for (let e of r) {
			let t = e.name === u;
			a.save(), a.fillStyle = t ? o.home : o.ink, a.strokeStyle = t ? o.home : o.ink, a.globalAlpha = t ? .18 : .05, a.lineWidth = t ? 1 : .6, h(e.rings), a.restore();
		}
	}, _ = () => {
		let [e, t] = JC(i.lon, i.lat, s, c);
		for (let n of qC) {
			if (n.id === i.id) continue;
			let [r, l] = JC(n.lon, n.lat, s, c);
			a.save(), a.beginPath(), a.moveTo(e, t), a.quadraticCurveTo((e + r) / 2, (t + l) / 2 - KC, r, l), a.strokeStyle = nw(o, n.kind), a.globalAlpha = .24, a.lineWidth = .8, a.setLineDash([3, 6]), a.stroke(), a.restore();
		}
	}, v = () => {
		let e = .5 + .5 * Math.sin(d * .06);
		qC.forEach((t, n) => {
			let [r, i] = JC(t.lon, t.lat, s, c), u = n === l, d = nw(o, t.kind);
			a.save(), u && (a.beginPath(), a.arc(r, i, GC * .7 + e * 4, 0, Math.PI * 2), a.strokeStyle = d, a.globalAlpha = .2 * e, a.lineWidth = 1, a.stroke()), a.shadowColor = d, a.shadowBlur = u ? 16 : 8, a.fillStyle = d, a.beginPath(), a.arc(r, i, u ? 5 : WC, 0, Math.PI * 2), a.fill(), a.restore();
		});
	}, b = (e) => {
		let [t, n] = JC(e.lon, e.lat, s, c);
		a.save(), a.font = "500 10.5px \"JetBrains Mono\", monospace";
		let r = a.measureText(e.label);
		a.font = "400 9.5px \"JetBrains Mono\", monospace";
		let i = a.measureText(e.note), l = t + 13, u = n - 12;
		a.fillStyle = o.panel, a.strokeStyle = o.panelLine, a.lineWidth = 1, a.beginPath(), a.roundRect(l - 5, u - 15, Math.max(r.width, i.width) + 20, 34, 2), a.fill(), a.stroke(), a.fillStyle = o.ink, a.font = "500 10.5px \"JetBrains Mono\", monospace", a.fillText(e.label, l, u), a.fillStyle = o.journey, a.font = "400 9.5px \"JetBrains Mono\", monospace", a.fillText(e.note, l, u + 13), a.restore();
	}, S = () => {
		a.clearRect(0, 0, s, c), m(), g(), _(), v(), l >= 0 && b(qC[l]);
	}, C = () => {
		f ? (S(), f = !1) : l >= 0 && (d += .6, S()), requestAnimationFrame(C);
	};
	x(t, "pointermove", (e) => {
		let n = e, i = t.getBoundingClientRect(), a = (n.clientX - i.left) * (s / (i.width || s)), o = (n.clientY - i.top) * (c / (i.height || c));
		l = ew(qC, a, o, s, c);
		let [d, p] = YC(a, o, s, c);
		u = l >= 0 ? null : $C(r, d, p), t.style.cursor = l >= 0 || u ? "pointer" : "default", f = !0;
	}), x(t, "pointerleave", () => {
		l = -1, u = null, f = !0;
	}), x(document, "mn:themechange", () => {
		o = tw(), f = !0;
	}), new ResizeObserver(p).observe(e), p(), document.fonts.ready.then(() => {
		f = !0;
	}), requestAnimationFrame(C);
}
//#endregion
//#region src/lib/theme.ts
var iw = "mn:theme";
function aw(e) {
	return e === "dark" || e === "light";
}
function ow(e) {
	let t = e.getItem(iw);
	return aw(t) ? t : null;
}
function sw(e, t) {
	return ow(e) ?? (t ? "light" : "dark");
}
function cw(e) {
	return e === "dark" ? "light" : "dark";
}
function lw(e, t) {
	e.dataset.theme = t;
	let n = y("meta[name=\"theme-color\"]");
	n && (n.content = t === "dark" ? "#08090b" : "#f3f1ec");
}
function uw() {
	let e = window.matchMedia("(prefers-color-scheme: light)").matches, t = aw(document.documentElement.dataset.theme) ? document.documentElement.dataset.theme : sw(localStorage, e);
	lw(document.documentElement, t);
	let n = y("[data-theme-toggle]");
	if (n) {
		let e = () => n.setAttribute("aria-label", `Switch to ${cw(document.documentElement.dataset.theme)} theme`);
		e(), x(n, "click", () => {
			let t = cw(document.documentElement.dataset.theme);
			localStorage.setItem(iw, t), lw(document.documentElement, t), e(), document.dispatchEvent(new CustomEvent("mn:themechange", { detail: t }));
		});
	}
	return t;
}
//#endregion
//#region src/main.tsx
function dw() {
	uw(), HS(), MS(), wC(), FS(), hC(), LC(), rw();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", dw, { once: !0 }) : dw();
//#endregion
