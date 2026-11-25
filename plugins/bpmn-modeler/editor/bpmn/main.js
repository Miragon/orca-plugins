const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../shared/lint-DsccugCZ.js","../shared/rolldown-runtime-DQp2zzRu.js","../shared/editorLayout-CIvAyzRC.js","../shared/src-BMjhMR6_.js","../shared/editorLayout-3p6pELEt.css","../shared/EscapeUtil-B1jzPlMc.js","../shared/ModelUtil-BGe9jbj7.js","../shared/moddle-utils-CKD1iZGs.js","../shared/dist-BWHN8Och.js","../shared/executionPlatformAttributes-ub_cH4Lg.js","../shared/lint-DoI7vgqE.css","../shared/viewer-VR61mcJV.js","../shared/createSurface-Dmq0QE2s.js","../shared/jsxRuntime.module-BqOdqqmT.js","../shared/index.esm-CNb8OxsT.js","../shared/provider-D1BM5n6p.js","../shared/index.esm-SjnojCF6.js","../shared/design-CS3jpbGM.js","../shared/reporting-pBZTmtBJ.js","../shared/clipboard-CB2-G70S.js","../shared/reporting-B1SMpZVh.css","../shared/lib-CFIIVJWT.js","../shared/design-5oiqdf5k.css","../shared/src-CV8cZyx0.js","../shared/src-CU_wPvE9.css"])))=>i.map(i=>d[i]);
import { _ as i18n, a as openOrcaSession, d as isBlankDocument, h as extras, i as followOrcaTheme, n as syncDocument, o as orcaLanguage, r as currentOrcaTheme, s as applyPageThemeScope, t as mountEditorLayout } from "../shared/editorLayout-CIvAyzRC.js";
import "../shared/src-BMjhMR6_.js";
// ../../libs/modeler-types/src/engine/domain/engine.ts
var ENGINES = ["c7", "c8"];
function isEngine(value) {
	return ENGINES.includes(value);
}
var ENGINE_EXECUTION_PLATFORM = {
	c7: "Camunda Platform",
	c8: "Camunda Cloud"
};
var ENGINE_CAPABILITIES = {
	c7: {
		verifiesDeployments: true,
		inlineScripting: true,
		transactionBoundaries: true,
		formReferenceStatus: false
	},
	c8: {
		verifiesDeployments: false,
		inlineScripting: false,
		transactionBoundaries: false,
		formReferenceStatus: true
	}
};
function engineSupports(engine, capability) {
	return engine !== void 0 && ENGINE_CAPABILITIES[engine][capability];
}
var MODELER_NAMESPACE_URI = "http://camunda.org/schema/modeler/1.0";
var MODELER_DEFAULT_PREFIX = "modeler";
var BYTE_ORDER_MARK = "﻿";
function detectEngine(xml) {
	const attributes = readDefinitionsStartTag(xml)?.attributes;
	if (!attributes) return;
	const names = executionPlatformAttributeNames(attributes);
	const executionPlatform = attributes.find((attribute) => attribute.name === names.platform)?.value;
	if (executionPlatform !== void 0) {
		for (const engine of Object.keys(ENGINE_EXECUTION_PLATFORM)) if (executionPlatform === ENGINE_EXECUTION_PLATFORM[engine]) return engine;
	}
	const versionMatch = (attributes.find((attribute) => attribute.name === names.version)?.value)?.match(/^([78])\./);
	if (versionMatch) return versionMatch[1] === "7" ? "c7" : "c8";
}
function executionPlatformAttributeNames(attributes) {
	const binding = attributes.find(({ name, value }) => name.startsWith("xmlns:") && value === "http://camunda.org/schema/modeler/1.0");
	const prefix = binding ? binding.name.slice(6) : MODELER_DEFAULT_PREFIX;
	return {
		namespace: `xmlns:${prefix}`,
		platform: `${prefix}:executionPlatform`,
		version: `${prefix}:executionPlatformVersion`
	};
}
function readDefinitionsStartTag(xml) {
	const tagStart = findRootTagStart(xml);
	if (tagStart === void 0) return;
	const startTag = readStartTag(xml, tagStart);
	return startTag && localName(startTag.name) === "definitions" ? startTag : void 0;
}
function readStartTag(xml, tagStart) {
	let cursor = tagStart + 1;
	const nameMatch = /^[^\s/>]+/.exec(xml.slice(cursor));
	if (!nameMatch) return;
	const name = nameMatch[0];
	cursor += name.length;
	const attributes = [];
	let attributesEnd = cursor;
	while (cursor < xml.length) {
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		if (cursor >= xml.length) return;
		const char = xml[cursor];
		if (char === ">") return {
			name,
			attributes,
			attributesEnd
		};
		if (char === "/") return xml[cursor + 1] === ">" ? {
			name,
			attributes,
			attributesEnd
		} : void 0;
		const attributeStart = cursor;
		const attributeNameMatch = /^[^\s=/>]+/.exec(xml.slice(cursor));
		if (!attributeNameMatch) return;
		const attributeName = attributeNameMatch[0];
		cursor += attributeName.length;
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		if (xml[cursor] !== "=") return;
		cursor++;
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		const quote = xml[cursor];
		if (quote !== "\"" && quote !== "'") return;
		const valueEnd = xml.indexOf(quote, cursor + 1);
		if (valueEnd === -1) return;
		attributesEnd = valueEnd + 1;
		attributes.push({
			name: attributeName,
			value: xml.slice(cursor + 1, valueEnd),
			start: attributeStart,
			end: attributesEnd
		});
		cursor = attributesEnd;
	}
}
function findRootTagStart(xml) {
	let cursor = xml.startsWith(BYTE_ORDER_MARK) ? 1 : 0;
	while (cursor < xml.length) {
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		if (cursor >= xml.length || xml[cursor] !== "<") return;
		if (xml.startsWith("<!--", cursor)) {
			const end = xml.indexOf("-->", cursor + 4);
			if (end === -1) return;
			cursor = end + 3;
		} else if (xml.startsWith("<![CDATA[", cursor)) {
			const end = xml.indexOf("]]>", cursor + 9);
			if (end === -1) return;
			cursor = end + 3;
		} else if (xml.startsWith("<?", cursor)) {
			const end = xml.indexOf("?>", cursor + 2);
			if (end === -1) return;
			cursor = end + 2;
		} else if (xml.startsWith("<!", cursor)) {
			const end = skipDoctype(xml, cursor);
			if (end === void 0) return;
			cursor = end;
		} else return cursor;
	}
}
function skipDoctype(xml, start) {
	let cursor = start + 2;
	while (cursor < xml.length) {
		const char = xml[cursor];
		if (char === "[") {
			const subsetEnd = xml.indexOf("]", cursor + 1);
			if (subsetEnd === -1) return;
			cursor = subsetEnd + 1;
		} else if (char === ">") return cursor + 1;
		else cursor++;
	}
}
function localName(qualifiedName) {
	const colon = qualifiedName.indexOf(":");
	return colon === -1 ? qualifiedName : qualifiedName.slice(colon + 1);
}
function isWhitespace(char) {
	return char === " " || char === "	" || char === "\n" || char === "\r";
}
// ../../libs/modeler-types/src/surface/domain/surfaceMode.ts
var SURFACE_MODES = [
	"view",
	"design",
	"implement"
];
var ENGINE_NEUTRAL = {
	engineProperties: false,
	elementTemplates: false,
	engineLintRules: false
};
var SURFACE_MODE_CAPABILITIES = {
	view: ENGINE_NEUTRAL,
	design: ENGINE_NEUTRAL,
	implement: {
		engineProperties: true,
		elementTemplates: true,
		engineLintRules: true
	}
};
function surfaceModeSupports(mode, capability) {
	return SURFACE_MODE_CAPABILITIES[mode][capability];
}
function parseEditableMode(setting) {
	return setting === "implement" ? "implement" : "design";
}
function isModeAvailable(mode, engine) {
	return mode === "implement" ? engine !== void 0 : true;
}
function defaultMode(engine, available = SURFACE_MODES) {
	const has = (mode) => available.includes(mode);
	if (engine !== void 0 && has("implement")) return "implement";
	if (has("design")) return "design";
	if (has("view")) return "view";
	return available[0] ?? "design";
}
function resolveInitialMode(requested, engine, available = SURFACE_MODES) {
	if (requested !== null && SURFACE_MODES.includes(requested) && available.includes(requested) && isModeAvailable(requested, engine)) return requested;
	return defaultMode(engine, available);
}
function planTransition(from, to, engine) {
	if (from === to) return "none";
	if (from !== "view" && to !== "view" && engine !== void 0) return "toggle";
	return "recreate";
}
// ../../packages/bpmn-modeler/src/modeSession/service/surfaceCapabilities.ts
function isModelerSurface(handle) {
	return "setMode" in handle;
}
function isEditableSurface(handle) {
	return "newDiagram" in handle;
}
function holdsPendingSave(handle) {
	return "flushContentSaved" in handle;
}
// ../../packages/bpmn-modeler/src/modeSession/domain/servingSurfaces.ts
function servingSurfaces(surfaces, engine) {
	const { view, design, implement } = surfaces;
	const onModeler = (mode) => engine !== void 0 && implement !== void 0 ? (context) => implement({
		...context,
		engine,
		mode
	}) : void 0;
	return {
		view,
		design: onModeler("design") ?? design,
		implement: onModeler("implement")
	};
}
// ../../packages/bpmn-modeler/src/modeSession/service/modeSession.ts
async function createModeSession(options) {
	const { container, engine, surfaces } = options;
	let theme = options.theme ?? "automatic";
	const serving = servingSurfaces(surfaces, engine);
	const available = SURFACE_MODES.filter((mode) => isModeAvailable(mode, engine) && serving[mode] !== void 0);
	if (available.length === 0) throw new Error("createModeSession: no surface factory is available for this engine — supply at least one of view / design / implement.");
	let busy = false;
	let disposed = false;
	const contentListeners = new Set();
	let stopForwardingEdits = () => void 0;
	function forwardEdits(surface) {
		stopForwardingEdits();
		stopForwardingEdits = isEditableSurface(surface) ? surface.onCommandStackChanged(() => {
			if (!disposed) contentListeners.forEach((listener) => listener());
		}) : () => void 0;
	}
	function bindSurface(surface, mode) {
		forwardEdits(surface);
		options.onSurfaceCreated?.(surface, mode);
	}
	let currentMode = resolveInitialMode(options.initialMode ?? null, engine, available);
	let handle = await buildSurface(currentMode);
	try {
		bindSurface(handle, currentMode);
	} catch (error) {
		stopForwardingEdits();
		handle.destroy();
		throw error;
	}
	let inFlight = null;
	function safeDestroy(surface) {
		try {
			surface?.destroy();
		} catch (error) {
			if (!disposed) options.onError?.(error);
		}
	}
	function buildSurface(mode) {
		return serving[mode]({
			container,
			engine,
			theme
		});
	}
	function isAvailable(mode) {
		return available.includes(mode);
	}
	async function requestMode(target) {
		if (disposed || !isAvailable(target) || busy) return;
		const kind = planTransition(currentMode, target, engine);
		if (kind === "none") return;
		if (kind === "toggle" && isModelerSurface(handle)) {
			handle.setMode(target);
			currentMode = handle.getMode();
			options.onModeChanged?.(currentMode, "toggle");
			return;
		}
		await recreate(target);
	}
	async function recreate(target) {
		busy = true;
		options.onSwitchStateChanged?.(true);
		inFlight = runSwitch(target);
		try {
			await inFlight;
		} finally {
			inFlight = null;
			busy = false;
			if (!disposed) options.onSwitchStateChanged?.(false);
		}
	}
	async function runSwitch(target) {
		const original = handle;
		let snapshot;
		let xml;
		try {
			if (isEditableSurface(original)) original.flushPendingInput();
			snapshot = original.captureViewState();
			xml = await original.exportDiagram();
			if (disposed) {
				safeDestroy(original);
				return;
			}
			if (holdsPendingSave(original)) await original.flushContentSaved();
			if (disposed) {
				safeDestroy(original);
				return;
			}
			await options.beforeDestroy?.();
			if (disposed) {
				safeDestroy(original);
				return;
			}
		} catch (error) {
			if (disposed) {
				safeDestroy(original);
				return;
			}
			options.onError?.(error);
			return;
		}
		stopForwardingEdits();
		original.destroy();
		let candidate = null;
		try {
			candidate = await buildSurface(target);
			if (disposed) {
				safeDestroy(candidate);
				return;
			}
			handle = candidate;
			currentMode = target;
			handle.setTheme(theme);
			bindSurface(handle, target);
			await handle.loadDiagram(xml);
			if (disposed) {
				safeDestroy(candidate);
				return;
			}
			handle.applyViewState(snapshot);
			options.onModeChanged?.(target, "recreate");
		} catch (error) {
			safeDestroy(candidate);
			if (disposed) return;
			options.onError?.(error);
			await buildFallback(xml);
		}
	}
	async function buildFallback(xml) {
		const fallback = defaultMode(engine, available);
		let surface = null;
		try {
			surface = await buildSurface(fallback);
			if (disposed) {
				safeDestroy(surface);
				return;
			}
			handle = surface;
			currentMode = fallback;
			handle.setTheme(theme);
			bindSurface(handle, fallback);
			await handle.loadDiagram(xml);
			if (disposed) {
				safeDestroy(surface);
				return;
			}
			options.onModeChanged?.(fallback, "fallback");
		} catch (error) {
			safeDestroy(surface);
			if (!disposed) options.onError?.(error);
		}
	}
	return {
		getMode: () => currentMode,
		getHandle: () => handle,
		availableModes: () => available,
		isAvailable,
		requestMode,
		flushPendingInput: () => {
			if (!disposed && isEditableSurface(handle)) handle.flushPendingInput();
		},
		onContentChanged: (listener) => {
			contentListeners.add(listener);
			return () => {
				contentListeners.delete(listener);
			};
		},
		setTheme: (next) => {
			if (disposed) return;
			theme = next;
			handle.setTheme(next);
		},
		destroy: async () => {
			if (disposed) return;
			disposed = true;
			stopForwardingEdits();
			if (inFlight) await inFlight;
			else handle.destroy();
		}
	};
}
// src/adapter/out/memoryClipboard.ts
function memoryClipboard() {
	let copied = "";
	return {
		requestClipboard: () => Promise.resolve(copied),
		writeClipboard: (text) => {
			copied = text;
		}
	};
}
// \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep, importerUrl) {
	return new URL(dep, importerUrl).href;
};
var seen = {};
var isCssPreloadUrl = function isCssPreloadUrl(url) {
	return url.pathname.endsWith(".css");
};
var preloadOnce = function preloadOnce(seen, href, preload) {
	if (href in seen) return seen[href];
	const promise = preload();
	if (!promise) {
		seen[href] = void 0;
		return;
	}
	const preloadPromise = promise.then(() => {
		seen[href] = void 0;
	}, (err) => {
		seen[href] = void 0;
		throw err;
	});
	seen[href] = preloadPromise;
	return preloadPromise;
};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		let preloadedHrefs;
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return new URL(import.meta.resolve(specifier));
			return new URL(specifier, import.meta.url);
		}
		promise = allSettled(deps.map((depString) => {
			depString = assetsURL(depString, importerUrl);
			const dep = importMetaResolve(depString);
			const isCss = isCssPreloadUrl(dep);
			return preloadOnce(seen, dep.href, () => {
				if (preloadedHrefs === void 0) {
					preloadedHrefs = {
						all: new Set(),
						styles: new Set()
					};
					const links = document.getElementsByTagName("link");
					for (let i = links.length - 1; i >= 0; i--) {
						const link = links[i];
						preloadedHrefs.all.add(link.href);
						if (link.rel === "stylesheet") preloadedHrefs.styles.add(link.href);
					}
				}
				if ((isCss ? preloadedHrefs.styles : preloadedHrefs.all).has(dep.href)) return;
				const link = document.createElement("link");
				link.rel = isCss ? "stylesheet" : scriptRel;
				if (!isCss) link.as = "script";
				link.crossOrigin = "";
				link.href = dep.href;
				if (cspNonce) link.setAttribute("nonce", cspNonce);
				document.head.appendChild(link);
				if (isCss) return new Promise((res, rej) => {
					const handleSettle = (e) => {
						link.removeEventListener("load", handleSettle);
						link.removeEventListener("error", handleSettle);
						if (e.type === "error") rej(new Error(`Unable to preload CSS for ${dep}`));
						else res(e);
					};
					link.addEventListener("load", handleSettle);
					link.addEventListener("error", handleSettle);
				});
			});
		}).filter((p) => p !== void 0));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
// src/adapter/out/bpmnCanvas.ts
function surfaceFactories(panelParent, clipboard) {
	const linting = async () => ({ linting: { module: await __vitePreload(() => import("../shared/lint-DsccugCZ.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]), import.meta.url) } });
	return {
		view: async ({ container, theme }) => {
			const { createViewer } = await __vitePreload(async () => {
				const { createViewer } = await import("../shared/viewer-VR61mcJV.js");
				return { createViewer };
			}, __vite__mapDeps([11,3,1,12,2,4,13,5,6,14,15,16,8]), import.meta.url);
			return createViewer(container, {
				theme,
				propertiesPanel: { parent: panelParent }
			});
		},
		design: async ({ container, theme }) => {
			const { createDesigner } = await __vitePreload(async () => {
				const { createDesigner } = await import("../shared/design-CS3jpbGM.js");
				return { createDesigner };
			}, __vite__mapDeps([17,2,3,1,4,18,12,13,5,6,19,20,15,16,8,21,14,22]), import.meta.url);
			return createDesigner(container, {
				theme,
				clipboard,
				propertiesPanel: { parent: panelParent },
				...await linting()
			});
		},
		implement: async ({ container, theme, mode, engine }) => {
			const { createModeler } = await __vitePreload(async () => {
				const { createModeler } = await import("../shared/src-CV8cZyx0.js");
				return { createModeler };
			}, __vite__mapDeps([23,2,3,1,4,18,12,13,5,6,19,20,9,24]), import.meta.url);
			return createModeler(container, {
				engine,
				mode,
				theme,
				clipboard,
				propertiesPanel: { parent: panelParent },
				...await linting()
			});
		}
	};
}
function createBpmnCanvas(options) {
	const { view, design, implement } = surfaceFactories(options.panelParent, { bridge: memoryClipboard() });
	const surfaces = options.readOnly ? { view } : {
		design,
		implement
	};
	const editListeners = new Set();
	let theme = options.theme;
	let engine;
	let session;
	const canvasFocus = () => session?.getHandle().getService("canvas");
	async function startSession(nextEngine) {
		await session?.destroy();
		engine = nextEngine;
		session = await createModeSession({
			container: options.container,
			engine,
			surfaces,
			theme
		});
		const liveSession = session;
		liveSession.onContentChanged(() => editListeners.forEach((listener) => listener()));
		return liveSession;
	}
	async function show(text) {
		const nextEngine = detectEngine(text);
		const surface = (session !== void 0 && nextEngine === engine ? session : await startSession(nextEngine)).getHandle();
		if (isBlankDocument(text) && isEditableSurface(surface)) {
			await surface.newDiagram();
			return;
		}
		await surface.reloadDiagram(text);
	}
	return {
		async importText(text) {
			try {
				await show(text);
				return true;
			} catch (error) {
				console.warn("Unable to open the BPMN diagram", error);
				return false;
			}
		},
		exportText: () => session.getHandle().exportDiagram(),
		applyPendingInput: () => session?.flushPendingInput(),
		onEdit: (listener) => {
			editListeners.add(listener);
			return () => editListeners.delete(listener);
		},
		setTheme: (next) => {
			theme = next;
			session?.setTheme(next);
		},
		focusCanvas: () => canvasFocus()?.focus(),
		isCanvasFocused: () => canvasFocus()?.isFocused() ?? false
	};
}
// src/composition/bpmnEditor.ts
async function startBpmnEditor(root) {
	i18n.extend(extras);
	i18n.setLanguage(orcaLanguage());
	const session = await openOrcaSession();
	const shortcuts = {};
	const layout = mountEditorLayout(root, "bpmn", {
		focusCanvas: () => shortcuts.target?.focusCanvas(),
		isCanvasFocused: () => shortcuts.target?.isCanvasFocused() ?? false
	});
	const canvas = createBpmnCanvas({
		container: layout.canvas,
		panelParent: layout.panelMount,
		readOnly: session.readOnly,
		theme: currentOrcaTheme()
	});
	followOrcaTheme((theme) => {
		applyPageThemeScope("data-bpmn-theme", theme);
		canvas.setTheme(theme);
	});
	shortcuts.target = canvas;
	return syncDocument(session, canvas);
}
// src/bpmn.ts
startBpmnEditor(document.getElementById("app"));
export { surfaceModeSupports as a, engineSupports as c, parseEditableMode as i, executionPlatformAttributeNames as l, isEditableSurface as n, ENGINE_EXECUTION_PLATFORM as o, isModelerSurface as r, MODELER_NAMESPACE_URI as s, __vitePreload as t, isEngine as u };

//# sourceMappingURL=main.js.map