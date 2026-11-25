import { a as __toESM, t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
// ../../node_modules/lodash/isObject.js
var require_isObject = __commonJSMin(((exports, module) => {
	function isObject(value) {
		var type = typeof value;
		return value != null && (type == "object" || type == "function");
	}
	module.exports = isObject;
}));
// ../../node_modules/lodash/_freeGlobal.js
var require__freeGlobal = __commonJSMin(((exports, module) => {
	module.exports = typeof global == "object" && global && global.Object === Object && global;
}));
// ../../node_modules/lodash/_root.js
var require__root = __commonJSMin(((exports, module) => {
	var freeGlobal = require__freeGlobal();
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	module.exports = freeGlobal || freeSelf || globalThis;
}));
// ../../node_modules/lodash/now.js
var require_now = __commonJSMin(((exports, module) => {
	var root = require__root();
	var now = function() {
		return root.Date.now();
	};
	module.exports = now;
}));
// ../../node_modules/lodash/_trimmedEndIndex.js
var require__trimmedEndIndex = __commonJSMin(((exports, module) => {
	var reWhitespace = /\s/;
	function trimmedEndIndex(string) {
		var index = string.length;
		while (index-- && reWhitespace.test(string.charAt(index)));
		return index;
	}
	module.exports = trimmedEndIndex;
}));
// ../../node_modules/lodash/_baseTrim.js
var require__baseTrim = __commonJSMin(((exports, module) => {
	var trimmedEndIndex = require__trimmedEndIndex();
	var reTrimStart = /^\s+/;
	function baseTrim(string) {
		return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
	}
	module.exports = baseTrim;
}));
// ../../node_modules/lodash/_Symbol.js
var require__Symbol = __commonJSMin(((exports, module) => {
	module.exports = require__root().Symbol;
}));
// ../../node_modules/lodash/_getRawTag.js
var require__getRawTag = __commonJSMin(((exports, module) => {
	var Symbol = require__Symbol();
	var objectProto = Object.prototype;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var nativeObjectToString = objectProto.toString;
	var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
	function getRawTag(value) {
		var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
		try {
			value[symToStringTag] = void 0;
			var unmasked = true;
		} catch (e) {}
		var result = nativeObjectToString.call(value);
		if (unmasked) {
			if (isOwn) value[symToStringTag] = tag;
			else delete value[symToStringTag];
		}
		return result;
	}
	module.exports = getRawTag;
}));
// ../../node_modules/lodash/_objectToString.js
var require__objectToString = __commonJSMin(((exports, module) => {
	var nativeObjectToString = Object.prototype.toString;
	function objectToString(value) {
		return nativeObjectToString.call(value);
	}
	module.exports = objectToString;
}));
// ../../node_modules/lodash/_baseGetTag.js
var require__baseGetTag = __commonJSMin(((exports, module) => {
	var Symbol = require__Symbol();
	var getRawTag = require__getRawTag();
	var objectToString = require__objectToString();
	var nullTag = "[object Null]";
	var undefinedTag = "[object Undefined]";
	var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
	function baseGetTag(value) {
		if (value == null) return value === void 0 ? undefinedTag : nullTag;
		return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}
	module.exports = baseGetTag;
}));
// ../../node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJSMin(((exports, module) => {
	function isObjectLike(value) {
		return value != null && typeof value == "object";
	}
	module.exports = isObjectLike;
}));
// ../../node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJSMin(((exports, module) => {
	var baseGetTag = require__baseGetTag();
	var isObjectLike = require_isObjectLike();
	var symbolTag = "[object Symbol]";
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
	}
	module.exports = isSymbol;
}));
// ../../node_modules/lodash/toNumber.js
var require_toNumber = __commonJSMin(((exports, module) => {
	var baseTrim = require__baseTrim();
	var isObject = require_isObject();
	var isSymbol = require_isSymbol();
	var NAN = NaN;
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	var reIsBinary = /^0b[01]+$/i;
	var reIsOctal = /^0o[0-7]+$/i;
	var freeParseInt = parseInt;
	function toNumber(value) {
		if (typeof value == "number") return value;
		if (isSymbol(value)) return NAN;
		if (isObject(value)) {
			var other = typeof value.valueOf == "function" ? value.valueOf() : value;
			value = isObject(other) ? other + "" : other;
		}
		if (typeof value != "string") return value === 0 ? value : +value;
		value = baseTrim(value);
		var isBinary = reIsBinary.test(value);
		return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}
	module.exports = toNumber;
}));
// ../../libs/modeler-types/src/lifecycle/service/asyncDebounce.ts
var import_debounce = __toESM(__commonJSMin(((exports, module) => {
	var isObject = require_isObject();
	var now = require_now();
	var toNumber = require_toNumber();
	var FUNC_ERROR_TEXT = "Expected a function";
	var nativeMax = Math.max;
	var nativeMin = Math.min;
	function debounce(func, wait, options) {
		var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
		if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
		wait = toNumber(wait) || 0;
		if (isObject(options)) {
			leading = !!options.leading;
			maxing = "maxWait" in options;
			maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
			trailing = "trailing" in options ? !!options.trailing : trailing;
		}
		function invokeFunc(time) {
			var args = lastArgs, thisArg = lastThis;
			lastArgs = lastThis = void 0;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}
		function leadingEdge(time) {
			lastInvokeTime = time;
			timerId = setTimeout(timerExpired, wait);
			return leading ? invokeFunc(time) : result;
		}
		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
			return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
		}
		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
			return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
		}
		function timerExpired() {
			var time = now();
			if (shouldInvoke(time)) return trailingEdge(time);
			timerId = setTimeout(timerExpired, remainingWait(time));
		}
		function trailingEdge(time) {
			timerId = void 0;
			if (trailing && lastArgs) return invokeFunc(time);
			lastArgs = lastThis = void 0;
			return result;
		}
		function cancel() {
			if (timerId !== void 0) clearTimeout(timerId);
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = void 0;
		}
		function flush() {
			return timerId === void 0 ? result : trailingEdge(now());
		}
		function debounced() {
			var time = now(), isInvoking = shouldInvoke(time);
			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;
			if (isInvoking) {
				if (timerId === void 0) return leadingEdge(lastCallTime);
				if (maxing) {
					clearTimeout(timerId);
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
			return result;
		}
		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}
	module.exports = debounce;
}))());
function asyncDebounce(func, wait, options) {
	let resolveSet = new Set();
	let rejectSet = new Set();
	const inFlight = new Set();
	const debounced = (0, import_debounce.default)((args) => {
		const runResolves = resolveSet;
		const runRejects = rejectSet;
		resolveSet = new Set();
		rejectSet = new Set();
		const run = func(...args);
		inFlight.add(run);
		const clearInFlight = () => {
			inFlight.delete(run);
		};
		run.then((...res) => {
			clearInFlight();
			runResolves.forEach((resolve) => resolve(...res));
		}).catch((...res) => {
			clearInFlight();
			runRejects.forEach((reject) => reject(...res));
		});
	}, wait, options);
	const wrapper = (...args) => new Promise((resolve, reject) => {
		resolveSet.add(resolve);
		rejectSet.add(reject);
		debounced(args);
	});
	wrapper.flush = async () => {
		debounced.flush();
		await Promise.all(inFlight);
	};
	wrapper.cancel = () => {
		debounced.cancel();
		resolveSet.forEach((resolve) => resolve(void 0));
		resolveSet = new Set();
		rejectSet = new Set();
	};
	wrapper.pending = () => resolveSet.size > 0 || inFlight.size > 0;
	return wrapper;
}
// ../../libs/modeler-types/src/lifecycle/service/flushableDebounceInput.ts
var MAX_FLUSH_PASSES = 10;
function createFlushableDebounceInput(delayMs) {
	const waiting = new Set();
	function debounceInput(apply) {
		const scheduled = (0, import_debounce.default)((...args) => {
			waiting.delete(input);
			apply(...args);
		}, delayMs);
		const input = Object.assign((...args) => {
			waiting.add(input);
			scheduled(...args);
		}, {
			flush: () => {
				scheduled.flush();
			},
			cancel: () => {
				waiting.delete(input);
				scheduled.cancel();
			}
		});
		return input;
	}
	return Object.assign(debounceInput, {
		hasPending: () => waiting.size > 0,
		flush: () => {
			const failures = [];
			for (let pass = 0; pass < MAX_FLUSH_PASSES && waiting.size > 0; pass++) for (const input of [...waiting]) try {
				input.flush();
			} catch (failure) {
				failures.push(failure);
			}
			if (failures.length > 0) throw failures[0];
		}
	});
}
// ../../libs/modeler-types/src/diff/domain/diffVocabulary.ts
var DIFF_CATEGORIES = [
	"added",
	"removed",
	"changed",
	"layoutChanged"
];
var DIFF_LEGEND_TEXTS = {
	changes: "Changes",
	added: "Added",
	removed: "Removed",
	changed: "Changed",
	moved: "Moved",
	previous: "Prev change",
	next: "Next change",
	swap: "Swap sides",
	none: "No changes",
	showAll: "Show all"
};
var DIFF_SIDE_TEXTS = {
	before: "Old version",
	after: "New version"
};
var DIFF_CATEGORY_LABELS = {
	added: DIFF_LEGEND_TEXTS.added,
	removed: DIFF_LEGEND_TEXTS.removed,
	changed: DIFF_LEGEND_TEXTS.changed,
	layoutChanged: DIFF_LEGEND_TEXTS.moved
};
[...Object.values(DIFF_LEGEND_TEXTS), ...Object.values(DIFF_SIDE_TEXTS)];
export { asyncDebounce as i, DIFF_CATEGORY_LABELS as n, createFlushableDebounceInput as r, DIFF_CATEGORIES as t };

//# sourceMappingURL=src-BMjhMR6_.js.map