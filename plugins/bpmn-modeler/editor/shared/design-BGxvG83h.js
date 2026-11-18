import { _ as _defineProperty, g as i18n, h as TranslateModule, m as extras } from "./editorLayout-Dxr4ugLL.js";
import { C as AppendMenuModule, M as modeler_default, P as Modeler, S as FlowNavigationModule, _ as buildLintModules, a as createSurfaceLintHandle, b as ElementIdsModule, c as proposeSurfaceElementIds, d as subscribeFormatted, f as wireContentSaved, i as cleanupSurfaceDiagram, l as renameSurfaceElementIds, m as createPopupMenuAnnotationsModule, n as applyElementIdSettings, o as formatSurfaceDiagram, r as applyFavouriteBpmnElements, s as installClipboardSupport, t as createReporter, u as subscribeCommandStackChanged, v as lintElementIdConvention, x as createBpmnLayoutModule, y as createDefinitionSearchModule } from "./reporting-Bgp2TgWv.js";
import { n as render_default, t as provider_default } from "./provider-CE2pkzJX.js";
import { pn as DisposableStore } from "./jsxRuntime.module-awBdvHUy.js";
import { a as exportSvg, f as CustomGroupsModule, i as exportFormattedXml, n as SurfaceCore, o as importDiagram, p as ModeFilterModule, s as createModelNavigationModule, t as createSurface } from "./createSurface-CzjA2jEt.js";
import { i as index$1, t as lib_default } from "./lib-CIY0Qhue.js";
import { t as index } from "./index.esm-CXJiDiAL.js";
// ../../packages/bpmn-modeler/src/design/designer.ts
var BpmnDesigner = class {
	constructor(container, options) {
		_defineProperty(this, "container", void 0);
		_defineProperty(this, "options", void 0);
		_defineProperty(this, "core", void 0);
		_defineProperty(this, "reporter", void 0);
		_defineProperty(this, "lintHandle", void 0);
		_defineProperty(this, "store", new DisposableStore());
		_defineProperty(this, "deliverPendingContentSave", () => Promise.resolve());
		this.container = container;
		this.options = options;
		this.core = new SurfaceCore(container, [container, options.propertiesPanel.parent]);
		this.reporter = createReporter({ onError: options.onError });
		this.lintHandle = createSurfaceLintHandle(this.core, this.reporter);
	}
	get viewport() {
		return this.core.viewport;
	}
	get selection() {
		return this.core.selection;
	}
	get rootElement() {
		return this.core.rootElement;
	}
	captureViewState() {
		return this.core.captureViewState();
	}
	applyViewState(state) {
		this.core.applyViewState(state);
	}
	async init() {
		const clipModules = installClipboardSupport(this.store, this.options.clipboard, [this.container, this.options.propertiesPanel.parent]);
		const extra = this.options.additionalModules ?? [];
		const { modelNavigation, definitionSearch } = this.options.capabilities ?? {};
		const capModules = [...modelNavigation ? [createModelNavigationModule(modelNavigation)] : [], ...definitionSearch ? [createDefinitionSearchModule(definitionSearch)] : []];
		this.core.allocate(this.store, () => this.constructModeler(clipModules, capModules, extra), {
			extraRoots: [this.options.propertiesPanel.parent],
			hasSearchPad: true
		});
		if (this.options.favouriteBpmnElements) this.setFavouriteBpmnElements(this.options.favouriteBpmnElements);
		const { elementIdSettings, linting } = this.options;
		this.setElementIdSettings({
			...elementIdSettings,
			convention: elementIdSettings?.convention ?? lintElementIdConvention(linting)
		});
		const onContentSaved = this.options.onContentSaved;
		if (onContentSaved) this.deliverPendingContentSave = wireContentSaved({
			store: this.store,
			eventBus: this.core.service("eventBus"),
			exportDiagram: () => this.exportDiagram(),
			onContentSaved,
			reporter: this.reporter
		});
	}
	constructModeler(clipModules, capModules, extra) {
		return new Modeler({
			container: this.container,
			propertiesPanel: {
				parent: this.options.propertiesPanel.parent,
				feelPopupContainer: this.container
			},
			minimap: { open: false },
			moddleExtensions: this.options.moddleExtensions,
			additionalModules: [
				TranslateModule,
				render_default,
				provider_default,
				ModeFilterModule,
				CustomGroupsModule,
				index$1,
				AppendMenuModule,
				createPopupMenuAnnotationsModule(),
				FlowNavigationModule,
				createBpmnLayoutModule(),
				ElementIdsModule,
				index,
				modeler_default,
				...buildLintModules(this.options.linting, {
					engine: void 0,
					mode: "design"
				}, {
					onLintResults: this.options.onLintResults,
					onLintingToggled: this.options.onLintingToggled
				}, { nudgeWhenOmitted: false }),
				...capModules,
				lib_default,
				...clipModules,
				...extra
			]
		});
	}
	async newDiagram() {
		const result = await this.core.instance.createDiagram();
		this.core.armInitialViewport();
		return result;
	}
	async loadDiagram(xml) {
		const result = await importDiagram(this.core.instance, xml);
		this.core.armInitialViewport();
		return result;
	}
	reloadDiagram(xml) {
		return this.core.keepViewAcross(() => this.loadDiagram(xml));
	}
	async exportDiagram() {
		return exportFormattedXml(this.core.instance);
	}
	async formatDiagram() {
		return formatSurfaceDiagram(this.core);
	}
	cleanupDiagram(options) {
		return cleanupSurfaceDiagram(this.core, options);
	}
	async getDiagramSvg() {
		return exportSvg(this.core.instance);
	}
	setFavouriteBpmnElements(types) {
		applyFavouriteBpmnElements(this.core, types);
	}
	setElementIdSettings(options) {
		applyElementIdSettings(this.core, options);
	}
	proposeElementIds(unchecked) {
		return proposeSurfaceElementIds(this.core, unchecked);
	}
	renameElementIds(unchecked) {
		return renameSurfaceElementIds(this.core, unchecked);
	}
	setTheme(theme) {
		this.core.setTheme(this.store, theme);
	}
	getService(name) {
		return this.core.service(name);
	}
	applyLintResults(results) {
		this.lintHandle.applyLintResults(results);
	}
	applyLintingDisabled() {
		this.lintHandle.applyLintingDisabled();
	}
	startInPageLinting(config, configToken) {
		this.lintHandle.startInPageLinting(config, configToken);
	}
	onCommandStackChanged(listener) {
		return subscribeCommandStackChanged(this.core, listener);
	}
	onFormatted(listener) {
		return subscribeFormatted(this.core, listener);
	}
	hasPendingInput() {
		return this.core.hasPendingInput();
	}
	flushPendingInput() {
		this.core.flushPendingInput();
	}
	flushContentSaved() {
		return this.deliverPendingContentSave();
	}
	destroy() {
		this.store.dispose();
		this.core.releaseManagers();
	}
};
// ../../packages/bpmn-modeler/src/design/createDesigner.ts
async function createDesigner(container, options) {
	i18n.extend(extras);
	return createSurface(() => new BpmnDesigner(container, options), async (designer) => {
		await designer.init();
		designer.setTheme(options.theme ?? "automatic");
		if (options.locale) i18n.setLanguage(options.locale);
	});
}
export { createDesigner };

//# sourceMappingURL=design-BGxvG83h.js.map